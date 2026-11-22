import { useEffect, useRef, useState } from "react";

/**
 * Sprite sheet layout — must match tools/build-sprite.sh.
 * 96 frames sampled evenly across the 240-frame clip, row-major, left→right then down.
 * A single 1-row strip would be 57,000+ px wide, past every browser/GPU limit,
 * so the frames wrap into a 7 × 14 grid with a 6 px gutter between cells.
 */
export const SPRITE = {
  url: "/assets/characterspritesheet.jpg", // public/assets/characterspritesheet.jpg
  cols: 7,
  rows: 14,
  frames: 96,
  frameW: 1004,
  frameH: 565,
  gutter: 6,
  idleFrame: 0,
};

/* ══════════════════════════════════════════════════════════════════════════
   FrameScrubber — framework-free frame engine (vanilla JS, no React inside)

   • pointer x (0..1 across the tracked element) → target frame index
   • a critically-damped spring (SmoothDamp) glides the playhead to the target:
     frame-rate independent, velocity-limited, no overshoot
   • neighbouring frames are cross-faded by the fractional part of the playhead,
     so slow movement is continuous instead of stepping at 24 fps
   • pointer leaves → the playhead eases home to the idle pose, a touch slower
     than tracking so it feels like settling, not snapping
   • the rAF loop only runs while something is moving; paused off-screen and
     in background tabs
   ══════════════════════════════════════════════════════════════════════════ */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Unity-style SmoothDamp: spring toward `target` with no overshoot.
function smoothDamp(current, target, velocity, smoothTime, maxSpeed, dt) {
  const omega = 2 / Math.max(0.0001, smoothTime);
  const x = omega * dt;
  const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const maxChange = maxSpeed * smoothTime;
  const change = clamp(current - target, -maxChange, maxChange);
  const goal = current - change;
  const temp = (velocity + omega * change) * dt;
  let nextVel = (velocity - omega * temp) * decay;
  let next = goal + (change + temp) * decay;
  if (target - current > 0 === next > target) {
    next = target; // never overshoot
    nextVel = 0;
  }
  return [next, nextVel];
}

const TRACK = { smoothTime: 0.11, maxSpeed: 520 }; // frames / second cap
const SETTLE = { smoothTime: 0.5, maxSpeed: 260 }; // slower, softer return
const TOUCH_HOLD_MS = 700; // touch keeps the pose briefly after lift-off
const MAX_BACKING_PX = 2560; // cap canvas backing store on huge displays

class FrameScrubber {
  constructor(canvas, opts) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.sprite = opts.sprite;
    this.fit = opts.fit || "cover";
    this.focus = opts.focus || { x: 0.5, y: 0.5 };
    this.maxDpr = opts.maxDpr || 2;
    this.onReady = opts.onReady;

    this.sheet = null;
    this.frame = this.sprite.idleFrame; // playhead (float)
    this.velocity = 0;
    this.target = this.sprite.idleFrame;
    this.tracking = false;

    this.raf = 0;
    this.lastT = 0;
    this.lastKey = -1;
    this.paused = false;
    this.destroyed = false;
    this.releaseTimer = 0;
    this.layout = null;
    this.hostRect = { left: 0, width: 1 };
    this.cleanups = [];

    this.tick = this.tick.bind(this);
    this.resize();
  }

  /* ── loading ───────────────────────────────────────────────────────────── */
  async load() {
    const img = new Image();
    img.decoding = "async";
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = this.sprite.url;
    });
    // decode up-front so the first scrub never janks on a lazy decode
    if (img.decode) await img.decode().catch(() => {});
    if (this.destroyed) return;
    this.sheet = img;
    this.render(true);
    this.onReady && this.onReady();
  }

  /* ── layout ────────────────────────────────────────────────────────────── */
  setLayout(fit, focus) {
    this.fit = fit;
    this.focus = focus;
    this.computeLayout();
    this.render(true);
  }

  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
    let w = rect.width * dpr;
    let h = rect.height * dpr;
    const k = Math.min(1, MAX_BACKING_PX / Math.max(w, h, 1));
    w = Math.max(1, Math.round(w * k));
    h = Math.max(1, Math.round(h * k));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
    this.computeLayout();
    this.render(true);
  }

  // where each frame lands on the canvas (source crop + destination rect)
  computeLayout() {
    const { frameW, frameH } = this.sprite;
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const frameRatio = frameW / frameH;
    const boxRatio = cw / ch;
    const inset = 0.5; // keeps bilinear taps inside the cell (no gutter bleed)

    if (this.fit === "cover") {
      let sw, sh;
      if (boxRatio > frameRatio) {
        sw = frameW;
        sh = frameW / boxRatio;
      } else {
        sh = frameH;
        sw = frameH * boxRatio;
      }
      const cropX = (frameW - sw) * clamp(this.focus.x, 0, 1);
      const cropY = (frameH - sh) * clamp(this.focus.y, 0, 1);
      this.layout = {
        sx: Math.max(inset, cropX),
        sy: Math.max(inset, cropY),
        sw: Math.min(sw, frameW - 2 * inset),
        sh: Math.min(sh, frameH - 2 * inset),
        dx: 0, dy: 0, dw: cw, dh: ch,
        clear: false,
      };
    } else {
      let dw, dh;
      if (boxRatio > frameRatio) {
        dh = ch;
        dw = ch * frameRatio;
      } else {
        dw = cw;
        dh = cw / frameRatio;
      }
      this.layout = {
        sx: inset, sy: inset, sw: frameW - 2 * inset, sh: frameH - 2 * inset,
        dx: (cw - dw) / 2, dy: (ch - dh) / 2, dw, dh,
        clear: true,
      };
    }
  }

  /* ── drawing ───────────────────────────────────────────────────────────── */
  drawCell(index, alpha) {
    const { cols, gutter, frameW, frameH } = this.sprite;
    const L = this.layout;
    const col = index % cols;
    const row = Math.floor(index / cols);
    const ox = col * (frameW + gutter);
    const oy = row * (frameH + gutter);
    this.ctx.globalAlpha = alpha;
    this.ctx.drawImage(this.sheet, ox + L.sx, oy + L.sy, L.sw, L.sh, L.dx, L.dy, L.dw, L.dh);
  }

  render(force = false) {
    if (!this.sheet || !this.layout) return;
    const last = this.sprite.frames - 1;
    const f = clamp(this.frame, 0, last);
    const key = Math.round(f * 40); // redraw only when the picture would change
    if (!force && key === this.lastKey) return;
    this.lastKey = key;

    let i0 = Math.floor(f);
    let blend = f - i0;
    if (blend > 0.97) { i0 = Math.min(i0 + 1, last); blend = 0; }
    // short, eased cross-fade through the middle of the gap (less ghosting)
    blend = blend < 0.3 ? 0 : blend > 0.7 ? 1 : (blend - 0.3) / 0.4;
    blend = blend * blend * (3 - 2 * blend);
    const i1 = Math.min(i0 + 1, last);

    const ctx = this.ctx;
    if (this.layout.clear) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    if (blend >= 1) { this.drawCell(i1, 1); }
    else {
      this.drawCell(i0, 1);
      if (blend > 0.03 && i1 !== i0) this.drawCell(i1, blend);
    }
    ctx.globalAlpha = 1;
  }

  /* ── motion ────────────────────────────────────────────────────────────── */
  setProgress(p) {
    clearTimeout(this.releaseTimer);
    this.tracking = true;
    // whole frames only: the playhead always comes to rest on a crisp frame,
    // never on a half-blend of two poses
    this.target = Math.round(clamp(p, 0, 1) * (this.sprite.frames - 1));
    this.kick();
  }

  release(delay = 0) {
    clearTimeout(this.releaseTimer);
    const go = () => {
      this.tracking = false;
      this.target = this.sprite.idleFrame;
      this.kick();
    };
    delay ? (this.releaseTimer = setTimeout(go, delay)) : go();
  }

  kick() {
    if (this.raf || this.paused || this.destroyed) return;
    this.lastT = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  tick(t) {
    this.raf = 0;
    const dt = Math.min((t - this.lastT) / 1000, 1 / 30);
    this.lastT = t;
    const p = this.tracking ? TRACK : SETTLE;
    [this.frame, this.velocity] = smoothDamp(
      this.frame, this.target, this.velocity, p.smoothTime, p.maxSpeed, dt || 1 / 60
    );
    this.render();

    const settled = Math.abs(this.target - this.frame) < 0.004 && Math.abs(this.velocity) < 0.05;
    if (settled) {
      this.frame = this.target;
      this.velocity = 0;
      this.render(true);
      return; // loop sleeps until the next pointer event
    }
    this.raf = requestAnimationFrame(this.tick);
  }

  /* ── input + lifecycle ─────────────────────────────────────────────────── */
  bind(host, { interactive = true } = {}) {
    const on = (el, type, fn, opts) => {
      el.addEventListener(type, fn, opts);
      this.cleanups.push(() => el.removeEventListener(type, fn, opts));
    };

    // resize + visibility are needed even when not interactive
    const parent = this.canvas.parentElement;
    const ro = new ResizeObserver(() => { this.resize(); this.measure(host); });
    ro.observe(parent);
    if (host && host !== parent) ro.observe(host);
    this.cleanups.push(() => ro.disconnect());

    let inView = true;
    const sync = () => {
      this.paused = document.hidden || !inView;
      if (this.paused) { cancelAnimationFrame(this.raf); this.raf = 0; }
      else { this.render(true); this.kick(); }
    };
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; sync(); });
    io.observe(this.canvas);
    this.cleanups.push(() => io.disconnect());
    on(document, "visibilitychange", sync);

    if (!interactive || !host) return;
    this.measure(host);

    on(host, "pointerenter", () => this.measure(host));
    on(host, "pointerdown", () => this.measure(host));
    on(host, "pointermove", (e) => {
      const { left, width } = this.hostRect;
      if (width > 0) this.setProgress((e.clientX - left) / width);
    }, { passive: true });
    on(host, "pointerleave", (e) => this.release(e.pointerType === "mouse" ? 0 : TOUCH_HOLD_MS));
    on(host, "pointercancel", () => this.release(TOUCH_HOLD_MS));
  }

  measure(host) {
    if (!host) return;
    const r = host.getBoundingClientRect();
    this.hostRect = { left: r.left, width: r.width };
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    clearTimeout(this.releaseTimer);
    this.cleanups.forEach((fn) => fn());
    this.cleanups = [];
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   React wrapper
   Props
     containerRef  element whose pointer movement drives the scrub (default:
                   this component's own wrapper) — pass the hero <section>
     fit           "cover" (full-bleed, crops overflow) | "contain" (letterbox)
     focus         {x,y} 0..1 — which part of the frame survives a "cover" crop;
                   {0.5, 0.5} keeps her centred
     label         accessible description of the scene
   ══════════════════════════════════════════════════════════════════════════ */
const CENTER = { x: 0.5, y: 0.5 };

function AnimatedCharacter({
  containerRef,
  className = "",
  fit = "cover",
  focus = CENTER,
  label = "Illustration of a woman at a pink desk, resting her chin on her hand",
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const scrubberRef = useRef(null);
  const [ready, setReady] = useState(false);

  // build the engine once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scrubber = new FrameScrubber(canvas, {
      sprite: SPRITE,
      fit,
      focus,
      onReady: () => setReady(true),
    });
    scrubberRef.current = scrubber;
    scrubber.bind(containerRef?.current || wrapperRef.current, {
      interactive: !reduceMotion,
    });

    // reduced motion: still loads (to draw the idle frame) but never tracks
    scrubber.load().catch(() => {});

    return () => {
      scrubber.destroy();
      scrubberRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  // fit / focus can change without reloading the sheet
  useEffect(() => {
    scrubberRef.current?.setLayout(fit, focus);
  }, [fit, focus.x, focus.y]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label={label}
      className={`relative w-full h-full overflow-hidden bg-black ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}

export default AnimatedCharacter;