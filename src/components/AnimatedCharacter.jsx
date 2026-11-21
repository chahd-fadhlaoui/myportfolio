import { useEffect, useRef, useState } from "react";

// Served straight from /public — Vite doesn't let you `import` files that
// live in public/, so this is a plain root-relative URL, not a module import.
const spriteSheetUrl = "/assets/character-spritesheet.jpg";

// Sprite sheet layout — must match the sheet in /assets
const COLS = 12;
const ROWS = 8;
const TOTAL_FRAMES = 96;
const FRAME_W = 800;
const FRAME_H = 450;
// Gutter baked into the sheet between cells (ffmpeg tile's `padding`) so
// JPEG compression can't blur one frame's edge into its neighbour's.
const CELL_GUTTER = 6;
const STRIDE_X = FRAME_W + CELL_GUTTER;
const STRIDE_Y = FRAME_H + CELL_GUTTER;
const IDLE_FRAME = 0; // frame she eases back to when the pointer leaves

/**
 * Cursor-tracking animated character, built from a sprite sheet.
 *
 * This source clip has a real (non-flat) background, so there's no
 * chroma-keying here — frames are drawn straight from the loaded sheet
 * image. That also means there's no giant offscreen canvas to rasterize,
 * which sidesteps the mobile-Safari canvas-area ceiling entirely; only the
 * small on-screen canvas needs a real backing store.
 *
 * - Maps horizontal pointer position (relative to `containerRef`, or this
 *   component's own wrapper if omitted) to a frame index, and eases the
 *   current frame toward that target every animation tick for a smooth
 *   scrub instead of a hard jump-cut.
 * - Eases back to IDLE_FRAME when the pointer leaves the tracked area.
 * - Respects prefers-reduced-motion (renders the idle frame, no tracking).
 */
function AnimatedCharacter({ containerRef, className = "", fit = "contain", card = true }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const rafRef = useRef(null);
  const currentFrame = useRef(IDLE_FRAME);
  const targetFrame = useRef(IDLE_FRAME);
  const trackingRef = useRef(false);
  const lastDrawnRef = useRef(-1);
  const fitRef = useRef(fit);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fitRef.current = fit;
  }, [fit]);

  const draw = (frameFloat) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");

    const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameFloat)));
    const col = idx % COLS;
    const row = Math.floor(idx / COLS);
    const sx = col * STRIDE_X;
    const sy = row * STRIDE_Y;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    const frameRatio = FRAME_W / FRAME_H;
    const boxRatio = cw / ch;

    if (fitRef.current === "cover") {
      // fill the box completely, cropping whichever axis overflows —
      // this is what lets the scene act as a full-bleed background
      let sw, sh, cropX, cropY;
      if (boxRatio > frameRatio) {
        sw = FRAME_W;
        sh = FRAME_W / boxRatio;
        cropX = 0;
        cropY = (FRAME_H - sh) / 2;
      } else {
        sh = FRAME_H;
        sw = FRAME_H * boxRatio;
        cropY = 0;
        cropX = (FRAME_W - sw) / 2;
      }
      ctx.drawImage(img, sx + cropX, sy + cropY, sw, sh, 0, 0, cw, ch);
    } else {
      // letterbox the frame into the canvas, preserving its aspect ratio
      let dw, dh, dx, dy;
      if (boxRatio > frameRatio) {
        dh = ch;
        dw = dh * frameRatio;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        dw = cw;
        dh = dw / frameRatio;
        dx = 0;
        dy = (ch - dh) / 2;
      }
      ctx.drawImage(img, sx, sy, FRAME_W, FRAME_H, dx, dy, dw, dh);
    }
  };

  // load the sheet once
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      imgRef.current = img;
      setReady(true);
    };
    img.src = spriteSheetUrl;
    return () => {
      cancelled = true;
    };
  }, []);

  // size the visible canvas to its parent box (handles resize, DPR, and
  // any layout shift after mount — e.g. a web font swapping in and
  // changing how much space this box actually gets)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      draw(currentFrame.current);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [ready]);

  // eased animation loop
  useEffect(() => {
    if (!ready) return;
    const tick = () => {
      const ease = trackingRef.current ? 0.14 : 0.06;
      currentFrame.current += (targetFrame.current - currentFrame.current) * ease;
      const rounded = Math.round(currentFrame.current);
      if (rounded !== lastDrawnRef.current) {
        draw(currentFrame.current);
        lastDrawnRef.current = rounded;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ready]);

  // pointer tracking, scoped to containerRef if given, else this wrapper
  useEffect(() => {
    const target = containerRef?.current || wrapperRef.current;
    if (!target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const handleMove = (clientX) => {
      const rect = target.getBoundingClientRect();
      let nx = (clientX - rect.left) / rect.width;
      nx = Math.max(0, Math.min(1, nx));
      targetFrame.current = nx * (TOTAL_FRAMES - 1);
      trackingRef.current = true;
    };
    const handleLeave = () => {
      trackingRef.current = false;
      targetFrame.current = IDLE_FRAME;
    };
    const onMouseMove = (e) => handleMove(e.clientX);
    const onTouchMove = (e) => e.touches?.[0] && handleMove(e.touches[0].clientX);

    target.addEventListener("mousemove", onMouseMove);
    target.addEventListener("mouseleave", handleLeave);
    target.addEventListener("touchmove", onTouchMove, { passive: true });
    target.addEventListener("touchend", handleLeave);

    return () => {
      target.removeEventListener("mousemove", onMouseMove);
      target.removeEventListener("mouseleave", handleLeave);
      target.removeEventListener("touchmove", onTouchMove);
      target.removeEventListener("touchend", handleLeave);
    };
  }, [containerRef, ready]);

  return (
    <div ref={wrapperRef} className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {card && (
        <div
          className="absolute inset-[-6%] pointer-events-none rounded-[28px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(254,42,162,0.16), rgba(254,42,162,0) 72%)",
            filter: "blur(10px)",
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        className={`relative w-full h-full transition-all duration-700 ease-out ${card ? "rounded-3xl" : ""} ${
          ready ? "opacity-100 scale-100" : "opacity-0 scale-[0.985]"
        }`}
        style={card ? { filter: "drop-shadow(0 18px 34px rgba(33,31,59,0.25))" } : undefined}
        aria-hidden="true"
      />
    </div>
  );
}

export default AnimatedCharacter;