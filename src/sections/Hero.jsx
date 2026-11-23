
import { useEffect, useRef, useState } from "react";
import AnimatedCharacter from "../components/AnimatedCharacter";
import Button from "../components/Button";

function Hero() {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const copyRef = useRef(null);

  const [isTouch] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
  );

  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    const copy = copyRef.current;

    if (!hero || !glow) return;

    if (reduceMotion) {
      glow.style.setProperty("--gx", "68%");
      glow.style.setProperty("--gy", "30%");
      return;
    }

    const clamp = (v) => Math.max(0, Math.min(1, v));

    let tx = 0.68, ty = 0.3;
    let cx = tx, cy = ty;
    let lastInput = -Infinity;
    let raf = 0;
    let running = false;
    let engagedTimer = 0;

    const setTarget = (clientX, clientY) => {
      const r = hero.getBoundingClientRect();
      tx = clamp((clientX - r.left) / r.width);
      ty = clamp((clientY - r.top) / r.height);
      lastInput = performance.now();

      if (!hero.dataset.engaged && !engagedTimer) {
        engagedTimer = window.setTimeout(() => {
          hero.dataset.engaged = "true";
        }, 2200);
      }
    };

    const onPointerMove = (e) =>
      setTarget(e.clientX, e.clientY);

    const onTouch = (e) => {
      const t = e.touches && e.touches[0];
      if (t) setTarget(t.clientX, t.clientY);
    };

    const onLeave = () => {
      lastInput = -Infinity;
    };

    const tick = (t) => {
      if (t - lastInput > 2500) {
        tx = 0.5 + 0.3 * Math.cos(t / 4200);
        ty = 0.42 + 0.2 * Math.sin(t / 5300);
      }

      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;

      glow.style.setProperty("--gx", (cx * 100).toFixed(2) + "%");
      glow.style.setProperty("--gy", (cy * 100).toFixed(2) + "%");

      if (copy) {
        copy.style.transform = `translate3d(${
          ((0.5 - cx) * 14).toFixed(2)
        }px, ${((0.5 - cy) * 8).toFixed(2)}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    let inView = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        inView && !document.hidden ? start() : stop();
      },
      { threshold: 0 }
    );

    io.observe(hero);

    const onVis = () =>
      document.hidden || !inView ? stop() : start();

    document.addEventListener("visibilitychange", onVis);

    hero.addEventListener("pointermove", onPointerMove, {
      passive: true,
    });
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("touchstart", onTouch, {
      passive: true,
    });
    hero.addEventListener("touchmove", onTouch, {
      passive: true,
    });
    hero.addEventListener("touchend", onLeave);

    return () => {
      stop();
      io.disconnect();
      clearTimeout(engagedTimer);
      document.removeEventListener("visibilitychange", onVis);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("touchstart", onTouch);
      hero.removeEventListener("touchmove", onTouch);
      hero.removeEventListener("touchend", onLeave);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Introduction"
      className="hero-bloom min-h-screen w-full relative overflow-hidden"
    >
      <style>{`
        .hero-bloom {
          --hb-bg: #241f2e;
          --hb-tint: linear-gradient(180deg, rgba(244,166,195,0.06), rgba(244,166,195,0.02));
          --hb-top-v: linear-gradient(to bottom, rgba(26,12,30,0.80) 0%, rgba(26,12,30,0.42) 55%, rgba(26,12,30,0) 100%);
          --hb-top-h: linear-gradient(100deg, rgba(26,12,30,0.74) 0%, rgba(26,12,30,0.40) 30%, rgba(26,12,30,0) 56%);
          --hb-bottom: linear-gradient(to top, rgba(26,12,30,0.80) 0%, rgba(26,12,30,0.62) 45%, rgba(26,12,30,0) 100%);
          --hb-greet: #ffc9de;
          --hb-title: #ffffff;
          --hb-title-shadow: 0 4px 18px rgba(0,0,0,0.45);
          --hb-glow-core: rgba(255,182,213,0.34);
          --hb-glow-mid: rgba(244,166,195,0.14);
          --hb-glow-blend: screen;
          --hb-pill-bg: rgba(26,12,30,0.62);
          --hb-pill-fg: #ffd9e8;
          --hb-pill-ring: rgba(255,182,213,0.30);
          --hb-dot: #ffb6d5;
          --hb-accent: #ffb6d5;
          background: var(--hb-bg);
        }

       
html.light .hero-bloom {
  --hb-bg: #241f2e;

  /* Almost transparent: preserve the animated scene */
  --hb-tint: linear-gradient(
    180deg,
    rgba(255, 214, 231, 0.025),
    rgba(255, 233, 241, 0.015)
  );

  /* Minimal overlays so the character stays visible */
  --hb-top-v: linear-gradient(
    to bottom,
    rgba(26, 12, 30, 0.18) 0%,
    rgba(26, 12, 30, 0.06) 55%,
    transparent 100%
  );

  --hb-top-h: linear-gradient(
    100deg,
    rgba(26, 12, 30, 0.30) 0%,
    rgba(26, 12, 30, 0.10) 30%,
    transparent 56%
  );

  --hb-bottom: linear-gradient(
    to top,
    rgba(26, 12, 30, 0.48) 0%,
    rgba(26, 12, 30, 0.20) 45%,
    transparent 100%
  );

  --hb-greet: #fe76b8;
  --hb-title: #ffffff;
  --hb-title-shadow: 0 3px 14px rgba(0, 0, 0, 0.45);

  /* Original pink glow, reduced intensity */
  --hb-glow-core: rgba(255, 182, 213, 0.20);
  --hb-glow-mid: rgba(244, 166, 195, 0.07);
  --hb-glow-blend: screen;

  --hb-pill-bg: rgba(26, 12, 30, 0.72);
  --hb-pill-fg: #ffd9e8;
  --hb-pill-ring: rgba(255, 182, 213, 0.35);

  --hb-dot: #ffb6d5;
  --hb-accent: #ffb6d5;
}


        .hero-bloom .hb-tint,
        .hero-bloom .hb-top,
        .hero-bloom .hb-bottom,
        .hero-bloom .hb-glow {
          position: absolute;
          pointer-events: none;
        }

        .hero-bloom .hb-tint {
          inset: 0;
          z-index: 5;
          background: var(--hb-tint);
        }

        .hero-bloom .hb-glow {
          inset: 0;
          z-index: 6;
          background: radial-gradient(
            clamp(320px, 42vw, 760px) circle at var(--gx, 68%) var(--gy, 30%),
            var(--hb-glow-core) 0%,
            var(--hb-glow-mid) 42%,
            transparent 72%
          );
          mix-blend-mode: var(--hb-glow-blend);
        }

        .hero-bloom .hb-top {
          inset: 0 0 auto 0;
          height: 18%;
          z-index: 10;
          background: var(--hb-top-v);
        }

        @media (min-width: 900px) {
          .hero-bloom .hb-top {
            height: 52%;
            background: var(--hb-top-h);
            -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 45%, transparent 100%);
            mask-image: linear-gradient(to bottom, #000 0%, #000 45%, transparent 100%);
          }
        }

        .hero-bloom .hb-bottom {
          inset: auto 0 0 0;
          height: 24rem;
          z-index: 10;
          background: var(--hb-bottom);
        }

        @media (min-width: 640px) {
          .hero-bloom .hb-bottom {
            height: 11rem;
          }
        }

        .hero-bloom .hb-greet {
          color: #ffc9de;
          font-size: 50px;
          font-weight: 700;
        }

        .hero-bloom .hb-title {
          color: #ffffff;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.3);
        }

        .hero-bloom .hb-subtitle {
          color: #ffb6d5;
          font-size: 20px;
          font-weight: 600;
        }

        .hero-bloom .hb-description {
          color: #f4eaf0;
          font-size: clamp(26px, 3vw, 26px);
          font-weight: 500;
          line-height: 1.4;
          max-width: 46rem;
          text-shadow: 0 1px 8px rgba(0,0,0,0.12);
        }

        /* Pink underline highlight, matching the About section */
        .hero-bloom .hb-description .hb-em {
          font-weight: 600;
          background: linear-gradient(transparent 62%, #ff35a4 62%);
          padding: 0 0.1em;
        }

        html.light .hero-bloom .hb-title {
          color: #ff4bae;
          text-shadow: none;
        }

        html.light .hero-bloom .hb-subtitle {
          color: #ff2e8c;
        }

        html.light .hero-bloom .hb-description {
          color: #ffffff;
          text-shadow: none;
        }

        html.light .hero-bloom .hb-description .hb-em {
          background: linear-gradient(transparent 62%, #ff90c6 62%);
        }

        html.light .hero-bloom .hb-greet {
          color: #fe76b8;
          font-size: 50px;
          font-weight: 700;
        }

        .hero-bloom .hb-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 1.05rem;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--hb-pill-fg);
          background: var(--hb-pill-bg);
          border: 1px solid var(--hb-pill-ring);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .hero-bloom .hb-hint-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--hb-dot);
          box-shadow: 0 0 0 0 var(--hb-dot);
          animation: hbPulse 2.2s ease-out infinite;
        }

        .hero-bloom[data-engaged="true"] .hb-hint {
          animation: hbHintOut 0.8s ease forwards;
        }

        @keyframes hbHintOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        .hero-bloom a:focus-visible {
          outline: 2px solid var(--hb-accent);
          outline-offset: 4px;
          border-radius: 12px;
        }

        @keyframes hbPulse {
          0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-dot) 55%, transparent); }
          70% { box-shadow: 0 0 0 9px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }

        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-bloom .hero-anim {
          opacity: 0;
          animation: heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-bloom .hero-anim {
            animation: none;
            opacity: 1;
          }
          .hero-bloom .hb-hint-dot {
            animation: none;
          }
        }
      `}</style>

      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <AnimatedCharacter containerRef={heroRef} fit="cover" card={false} />
      </div>

      {/* Pink visual effects */}
      <div className="hb-tint" aria-hidden="true" />
      <div ref={glowRef} className="hb-glow" aria-hidden="true" />
      <div className="hb-top" aria-hidden="true" />
      <div className="hb-bottom" aria-hidden="true" />

      {/* Hero introduction */}
      <div className="absolute inset-x-0 z-20 bottom-44 sm:bottom-auto sm:top-0 sm:pt-28">
        <div style={{ paddingInline: "clamp(1.5rem, 5vw, 7rem)" }}>
          <div
            ref={copyRef}
            className="mr-auto flex flex-col items-start text-left gap-4
            max-w-xs sm:max-w-2xl will-change-transform"
          >
            <p
              className="hero-anim hb-greet text-lg sm:text-[22px]
              font-medium font-generalsans"
              style={{ animationDelay: "0.1s" }}
            >
              Hi, I'm Chahd Fadhlaoui
            </p>

            <h1
              className="hero-anim hb-title text-2xl sm:text-4xl
              font-bold leading-[1.08] tracking-tight
              font-generalsans"
              style={{ animationDelay: "0.28s" }}
            >
              Software Engineering
              <br />
              Student
            </h1>

            <p
              className="hero-anim hb-subtitle text-[13px] sm:text-[20px]
              font-semibold tracking-[0.08em]"
              style={{ animationDelay: "0.38s" }}
            >
              FULL-STACK DEVELOPMENT <span>·</span> DEVOPS <span>·</span> SRE
            </p>

            {/* Updated professional introduction */}
            <p
              className="hero-anim hb-description font-normal"
              style={{ animationDelay: "0.48s" }}
            >
              I'm a Software Engineering student specializing in{" "}
              <strong className="hb-em">
                DevOps and Site Reliability Engineering
              </strong>
              , with a background in{" "}
              <strong className="hb-em">
                web and mobile application development
              </strong>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Interaction hint and CTA */}
      <div className="absolute inset-x-0 bottom-8 sm:bottom-12 z-20 flex flex-col items-center gap-4 px-6">
        {!reduceMotion && (
          <p
            className="hero-anim hb-hint pointer-events-none whitespace-nowrap"
            style={{ animationDelay: "0.65s" }}
          >
            <span className="hb-hint-dot" aria-hidden="true" />
            {isTouch
              ? "Drag across the scene — go on."
              : "Move your cursor around — go on."}
          </p>
        )}

        <a
          href="#work"
          className="w-fit hero-anim"
          style={{ animationDelay: "0.5s" }}
        >
        </a>
      </div>
    </section>
  );
}

export default Hero;
