
import React, { useCallback, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

/* ------------------------------------------------------------------ */
/* Styles                                                             */
/* ------------------------------------------------------------------ */

const STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=DM+Mono:wght@400;500&display=swap");

.ed-root {
  --ed-paper: #fff8ed;
  --ed-ink: #17121a;
  --ed-pink: #ff82bd;
  --ed-pink-light: #ffc1df;
  --ed-yellow: #ffe45c;
  --ed-mint: #a7efd3;
  --ed-lilac: #d8c8ff;
  --ed-orange: #ffad79;
  --ed-line: 2.5px;
  --ed-pad: clamp(1rem, 3vw, 2.25rem);
  --ed-media-h: clamp(230px, 24vw, 320px);
  --ed-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --ed-mono: "DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  box-sizing: border-box;
}

/* Main shell */
.ed-shell {
  position: relative;
  overflow: hidden;
  overflow: clip;
  padding: var(--ed-pad);
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 36px;
  color: var(--ed-ink);
  font-family: var(--ed-display);
  background-color: var(--ed-paper);
  background-image: radial-gradient(rgba(23, 18, 26, 0.13) 1.2px, transparent 1.2px);
  background-size: 22px 22px;
  box-shadow: 12px 12px 0 var(--ed-pink);
}

/* Header */
.ed-head {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-bottom: 2.8rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 25px;
  background: var(--ed-pink);
  box-shadow: 7px 7px 0 var(--ed-yellow);
}

.ed-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--ed-mono);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.ed-eyebrow::before {
  content: "";
  width: 28px;
  height: 3px;
  background: var(--ed-ink);
}

.ed-title {
  font-size: clamp(2.5rem, 5.5vw, 4.8rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

.ed-mark {
  display: inline-block;
  background: var(--ed-yellow);
  padding: 0.02em 0.16em 0.08em;
  border: 2px solid var(--ed-ink);
  border-radius: 9px;
  transform: rotate(-2deg);
}

/* Layout */
.ed-layout {
  display: grid;
  gap: 2rem;
}

@media (min-width: 1280px) {
  .ed-layout {
    grid-template-columns: 230px minmax(0, 1fr);
    gap: 2.5rem;
    align-items: start;
  }
}

/* Navigation */
.ed-aside {
  display: grid;
  align-content: start;
}

.ed-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 1280px) {
  .ed-aside {
    position: sticky;
    top: 1.5rem;
  }

  .ed-nav {
    display: grid;
    gap: 0.7rem;
  }
}

.ed-nav a {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 0.9rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 13px;
  color: inherit;
  background: var(--ed-yellow);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.ed-nav li:nth-child(2) a {
  background: var(--ed-lilac);
}

.ed-nav a span {
  font-family: var(--ed-mono);
  font-size: 0.82rem;
}

.ed-nav a:hover {
  transform: translateX(4px);
  background: var(--ed-pink);
}

.ed-nav a[aria-current="true"] {
  background: var(--ed-ink);
  color: white;
}

/* Main content */
.ed-main {
  display: grid;
  gap: 3.5rem;
  min-width: 0;
  container-type: inline-size;
  container-name: ed-main;
}

/* Animated blocks */
.ed-block {
  min-width: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.ed-block[data-shown="true"] {
  opacity: 1;
  transform: none;
}

.ed-block-head {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1.8rem;
}

.ed-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  min-height: 58px;
  padding: 0.35rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 17px;
  background: var(--ed-yellow);
  box-shadow: 4px 4px 0 var(--ed-pink);
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}

.ed-rule {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: var(--ed-ink);
}

.ed-label {
  padding: 0.5rem 0.85rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-pink);
  box-shadow: 3px 3px 0 var(--ed-yellow);
  font-family: var(--ed-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Typography */
.ed-h3 {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.ed-h3--sm {
  font-size: clamp(1.6rem, 2.3vw, 2rem);
}

.ed-p {
  max-width: 62ch;
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.75;
  opacity: 0.9;
}

/* Timeline */
.ed-journey {
  display: grid;
  gap: 2rem;
}

.ed-timeline {
  position: relative;
  display: grid;
  gap: 1.7rem;
  padding-left: 1.5rem;
  border-left: 4px solid var(--ed-ink);
}

.ed-timeline-item {
  position: relative;
  display: grid;
  gap: 0.75rem;
  min-width: 0;
  padding: clamp(1.1rem, 2.5vw, 1.8rem);
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 20px;
  background: white;
  box-shadow: 5px 5px 0 var(--ed-ink);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.ed-timeline-item:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 var(--ed-ink);
}

.ed-timeline-item:nth-child(1) {
  background: var(--ed-yellow);
}

.ed-timeline-item:nth-child(2) {
  background: var(--ed-pink-light);
}

.ed-timeline-item:nth-child(3) {
  background: var(--ed-lilac);
}

.ed-timeline-item:nth-child(4) {
  background: var(--ed-mint);
}

.ed-timeline-item::before {
  content: "";
  position: absolute;
  top: 1.35rem;
  left: -2.05rem;
  width: 16px;
  height: 16px;
  border: 3px solid var(--ed-ink);
  border-radius: 50%;
  background: var(--ed-pink);
  box-shadow: 0 0 0 4px var(--ed-paper);
}

.ed-timeline-item[data-type="education"]::before {
  background: var(--ed-yellow);
}

.ed-timeline-item[data-type="internship"]::before {
  background: var(--ed-pink);
}

.ed-timeline-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.8rem;
  font-family: var(--ed-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ed-timeline-date {
  font-weight: 700;
}

.ed-timeline-tag {
  padding: 0.3rem 0.7rem;
  border: 2px solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-ink);
  color: white;
  font-size: 0.72rem;
}

.ed-timeline-item h4 {
  font-size: clamp(1.35rem, 2vw, 1.85rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.025em;
}

.ed-timeline-place {
  font-family: var(--ed-mono);
  font-size: 0.88rem;
  font-weight: 600;
}

.ed-timeline-description {
  font-size: 1rem;
  line-height: 1.75;
  opacity: 0.95;
}

.ed-timeline-description ul {
  display: grid;
  gap: 0.55rem;
  margin: 0.7rem 0 0;
  padding-left: 1.2rem;
  list-style: disc;
}

.ed-timeline-description li {
  padding-left: 0.2rem;
}

.ed-timeline-note {
  margin-top: 0.5rem;
  padding: 0.8rem 1rem;
  border: 2px solid var(--ed-ink);
  border-radius: 12px;
  background: var(--ed-yellow);
  font-family: var(--ed-mono);
  font-size: 0.78rem;
  line-height: 1.6;
}

.ed-timeline-item:nth-child(even) .ed-timeline-note {
  background: white;
}

/* Internship technologies */
.ed-tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 0.65rem;
}

.ed-tech-item {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.75rem;
  border: 2px solid var(--ed-ink);
  border-radius: 11px;
  background: white;
  box-shadow: 2px 2px 0 var(--ed-ink);
  font-family: var(--ed-mono);
  font-size: 0.78rem;
  font-weight: 500;
  transition: transform 0.2s ease, background 0.2s ease;
}

.ed-tech-item:nth-child(odd) {
  background: var(--ed-yellow);
}

.ed-tech-item:nth-child(even) {
  background: white;
}

.ed-tech-item:hover {
  background: var(--ed-pink);
  transform: translateY(-3px) rotate(-1deg);
}

.ed-tech-item img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

/* Location section */
.ed-split {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 2rem;
}

@container ed-main (min-width: 560px) {
  .ed-split {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
    gap: 2rem;
  }
}

.ed-globe-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--ed-media-h);
  overflow: hidden;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 24px;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 130, 189, 0.9), transparent 40%),
    radial-gradient(circle at 80% 85%, rgba(255, 228, 92, 0.85), transparent 45%),
    #17121a;
  box-shadow: 8px 8px 0 var(--ed-yellow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

@media (hover: hover) {
  .ed-globe-stage:hover {
    transform: translate(-3px, -3px);
    box-shadow: 11px 11px 0 var(--ed-pink);
  }
}

.ed-globe {
  width: min(100%, calc(var(--ed-media-h) - var(--ed-line) * 2));
  aspect-ratio: 1 / 1;
  cursor: grab;
}

.ed-globe:active {
  cursor: grabbing;
}

.ed-pin {
  position: absolute;
  left: 50%;
  bottom: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transform: translateX(-50%);
  padding: 0.4rem 0.9rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-yellow);
  color: var(--ed-ink);
  font-family: var(--ed-mono);
  font-size: 0.82rem;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 3px 3px 0 var(--ed-pink);
}

.ed-dot {
  position: relative;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #0a8f5a;
}

.ed-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: inherit;
  animation: ed-ping 1.8s ease-out infinite;
}

.ed-pin .ed-dot {
  background: var(--ed-pink);
}

.ed-split > div:last-child {
  padding: clamp(1.2rem, 3vw, 2rem);
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 20px;
  background: var(--ed-pink);
  box-shadow: 6px 6px 0 var(--ed-yellow);
}

.ed-split .ed-h3 {
  display: inline;
  background: var(--ed-yellow);
  padding: 0 0.15em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.ed-split .ed-p {
  font-weight: 500;
}

@keyframes ed-ping {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(3); opacity: 0; }
}

/* Ticker */
.ed-marquee {
  display: flex;
  margin: 2.5rem calc(var(--ed-pad) * -1) calc(var(--ed-pad) * -1);
  overflow: hidden;
  border-top: var(--ed-line) solid var(--ed-ink);
  background: var(--ed-pink);
  color: var(--ed-ink);
}

.ed-track {
  display: flex;
  flex: 0 0 auto;
  min-width: 100%;
  animation: ed-scroll 28s linear infinite;
}

.ed-marquee:hover .ed-track {
  animation-play-state: paused;
}

.ed-item {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.9rem 0 0.9rem 1.5rem;
  font-family: var(--ed-mono);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

.ed-item::after {
  content: "\\2733";
  color: var(--ed-ink);
  font-size: 1.2rem;
}

@keyframes ed-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

/* Responsive */
@media (max-width: 640px) {
  .ed-shell {
    border-radius: 24px;
    box-shadow: 7px 7px 0 var(--ed-pink);
  }

  .ed-head {
    border-radius: 18px;
    box-shadow: 4px 4px 0 var(--ed-yellow);
  }

  .ed-title {
    font-size: clamp(2.4rem, 11vw, 3.5rem);
  }

  .ed-main {
    gap: 2.5rem;
  }

  .ed-block-head {
    gap: 0.55rem;
  }

  .ed-num {
    min-width: 46px;
    min-height: 46px;
    border-radius: 13px;
    font-size: 1.6rem;
  }

  .ed-label {
    padding: 0.4rem 0.6rem;
    font-size: 0.65rem;
    letter-spacing: 0.04em;
  }

  .ed-timeline {
    padding-left: 1.2rem;
    gap: 1.5rem;
  }

  .ed-timeline-item {
    padding: 1rem;
    border-radius: 16px;
    box-shadow: 3px 3px 0 var(--ed-ink);
  }

  .ed-timeline-item::before {
    left: -1.72rem;
    width: 13px;
    height: 13px;
  }

  .ed-timeline-description {
    font-size: 0.95rem;
  }

  .ed-tech-item {
    font-size: 0.72rem;
  }

  .ed-tech-item img {
    width: 19px;
    height: 19px;
  }

  .ed-pin {
    font-size: 0.72rem;
  }
}

/* Focus and reduced motion */
.ed-root :is(a, button):focus-visible {
  outline: 3px solid var(--ed-pink);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .ed-block,
  .ed-tech-item,
  .ed-globe-stage,
  .ed-timeline-item {
    transition: none;
  }

  .ed-block {
    opacity: 1;
    transform: none;
  }

  .ed-track,
  .ed-dot::after {
    animation: none;
  }
}
  /* Space between Hero and About */
#about {
  padding-top: 100px;
  position: relative;
}

/* About section entrance animation */
.ed-shell {
  opacity: 0;
  transform: translateY(35px);
  animation: aboutEntrance 0.9s ease-out forwards;
}

@keyframes aboutEntrance {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Respect reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {
  .ed-shell {
    opacity: 1;
    transform: none;
    animation: none;
  }
}

@media (max-width: 768px) {
  #about {
    padding-top: 65px;
  }
}
`;

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const TUNISIA = { lat: 33.89, lng: 9.54 };

const ICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const TICKER = [
  "React",
  "Node.js",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "DevOps",
  "Site Reliability",
];

const SECTIONS = [
  { id: "ed-journey", n: "01", label: "Professional Background" },
  { id: "ed-remote", n: "02", label: "Location" },
];

/* ------------------------------------------------------------------ */
/* Reusable technology icons                                          */
/* ------------------------------------------------------------------ */

const technologies = {
  React: "react/react-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  Express: "express/express-original.svg",
  MongoDB: "mongodb/mongodb-original.svg",
};

const TechList = ({ items }) => (
  <div className="ed-tech-list" aria-label="Technologies used">
    {items.map((name) => (
      <span className="ed-tech-item" key={name}>
        {technologies[name] && (
          <img
            src={`${ICON_BASE}/${technologies[name]}`}
            alt=""
            width="23"
            height="23"
            loading="lazy"
          />
        )}
        {name}
      </span>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* Reusable animated block                                            */
/* ------------------------------------------------------------------ */

const Block = ({ id, n, label, children }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      id={id}
      ref={ref}
      data-shown={shown}
      aria-label={label}
      className="ed-block"
    >
      <div className="ed-block-head">
        <span className="ed-num">{n}</span>
        <span className="ed-rule" aria-hidden="true" />
        <span className="ed-label">{label}</span>
      </div>

      {children}
    </article>
  );
};

/* ------------------------------------------------------------------ */
/* Tunisia globe                                                      */
/* ------------------------------------------------------------------ */

const LocationGlobe = () => {
  const wrapRef = useRef(null);
  const globeRef = useRef(null);
  const [size, setSize] = useState(300);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(([entry]) => {
      setSize(Math.max(200, Math.round(entry.contentRect.width)));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const controls = globe.controls();
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 0.7;
    controls.enableZoom = false;

    globe.pointOfView({ ...TUNISIA, altitude: 2.1 }, 0);
  }, []);

  return (
    <div ref={wrapRef} className="ed-globe">
      <Globe
        ref={globeRef}
        width={size}
        height={size}
        onGlobeReady={handleReady}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#ffb5d8"
        atmosphereAltitude={0.18}
        showGraticules
        globeImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        pointsData={[TUNISIA]}
        pointColor={() => "#ffe45c"}
        pointAltitude={0.1}
        pointRadius={0.55}
        ringsData={[TUNISIA]}
        ringColor={() => (t) => `rgba(255,228,92,${1 - t})`}
        ringMaxRadius={5}
        ringPropagationSpeed={2}
        ringRepeatPeriod={1400}
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

const MyBackground = () => {
  const [active, setActive] = useState(SECTIONS[0].id);

  /* Highlight the section currently in view */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  const goTo = (e, id) => {
    e.preventDefault();

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <section
      className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 my-20 ed-root mt-20"
      id="about"
    >
      <style>{STYLES}</style>

      <div className="ed-shell">
        <header className="ed-head">
          <span className="ed-eyebrow">My Background</span>

          <h2 className="ed-title">
            Learn. Build.{" "}
            <span className="ed-mark">Grow.</span>
          </h2>
        </header>

        <div className="ed-layout">
          {/* Navigation */}
          <aside className="ed-aside">
            <ul className="ed-nav" aria-label="Jump to section">
              {SECTIONS.map(({ id, n, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => goTo(e, id)}
                    aria-current={active === id ? "true" : undefined}
                  >
                    <span>{n}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main content */}
          <div className="ed-main">

            {/* 01 — Professional Background */}
            <Block
              id="ed-journey"
              n="01"
              label="Professional Background"
            >
              <div className="ed-journey">
                <div className="ed-timeline">

                  {/* Current engineering studies */}
                  <article
                    className="ed-timeline-item"
                    data-type="education"
                  >
                    <div className="ed-timeline-meta">
                      <span className="ed-timeline-date">
                        2026 – Present
                      </span>

                      <span className="ed-timeline-tag">
                        Current studies
                      </span>
                    </div>

                    <h4>
                      Engineering Cycle in DevOps & Site Reliability Engineering
                    </h4>

                    <p className="ed-timeline-place">
                      Horizon Digital School · Sousse, Tunisia
                    </p>

                    <p className="ed-timeline-description">
                      Second-year Engineering student, currently building
                      advanced skills in DevOps practices, infrastructure
                      automation, CI/CD, containerization, and Site Reliability
                      Engineering.
                    </p>
                  </article>

                  {/* PawFriend internship */}
                  <article
                    className="ed-timeline-item"
                    data-type="internship"
                  >
                    <div className="ed-timeline-meta">
                      <span className="ed-timeline-date">
                        03/03/2025 – 17/06/2025
                      </span>

                      <span className="ed-timeline-tag">
                        Final-year internship
                      </span>
                    </div>

                    <h4>
                      Full-Stack Developer — PawFriend
                    </h4>

                    <p className="ed-timeline-place">
                      Evast'In · Tunis, Tunisia
                    </p>

                    <div className="ed-timeline-description">
                      <p>
                        Designed and developed PawFriend, a web platform
                        dedicated to pet adoption and appointment booking
                        with veterinarians and trainers.
                      </p>

                      <ul>
                        <li>
                          Developed a Full-Stack application using React,
                          Node.js, Express, and MongoDB.
                        </li>

                        <li>
                          Implemented role-based access control (RBAC)
                          for Administrators, Veterinarians, Trainers,
                          and Pet Owners.
                        </li>

                        <li>
                          Collaborated in a two-person team using
                          Agile/Scrum, organized into six sprints
                          with incremental releases.
                        </li>
                      </ul>
                    </div>

                    <TechList
                      items={["React", "Node.js", "Express", "MongoDB"]}
                    />

                    <p className="ed-timeline-note">
                      Final-year project completed as part of my Applied
                      Bachelor's degree at ISET Nabeul.
                    </p>
                  </article>

                  {/* Reference Print internship */}
                  <article
                    className="ed-timeline-item"
                    data-type="internship"
                  >
                    <div className="ed-timeline-meta">
                      <span className="ed-timeline-date">
                        01/2024 – 02/2024
                      </span>

                      <span className="ed-timeline-tag">
                        Improvement internship
                      </span>
                    </div>

                    <h4>
                      Full-Stack Web Developer
                    </h4>

                    <p className="ed-timeline-place">
                      Reference Print · Menzah 9, Tunisia
                    </p>

                    <div className="ed-timeline-description">
                      <p>
                        Developed a digital printing web platform using
                        the MERN stack.
                      </p>

                      <ul>
                        <li>
                          Built frontend interfaces using React.
                        </li>

                        <li>
                          Developed backend APIs using Node.js and Express.
                        </li>

                        <li>
                          Integrated MongoDB for application data management.
                        </li>
                      </ul>
                    </div>

                    <TechList
                      items={["React", "Node.js", "Express", "MongoDB"]}
                    />

                    <p className="ed-timeline-note">
                      Internship completed during my Applied Bachelor's
                      studies at ISET Nabeul.
                    </p>
                  </article>

                  {/* ISET degree */}
                  <article
                    className="ed-timeline-item"
                    data-type="education"
                  >
                    <div className="ed-timeline-meta">
                      <span className="ed-timeline-date">
                        2022 – 2025
                      </span>

                      <span className="ed-timeline-tag">
                        Bachelor's degree
                      </span>
                    </div>

                    <h4>
                      Applied Bachelor's Degree in Information Technologies
                    </h4>

                    <p className="ed-timeline-place">
                      Higher Institute of Technological Studies of Nabeul
                      (ISET) · Nabeul, Tunisia
                    </p>

                    <p className="ed-timeline-description">
                      Information Systems Development specialization.
                      Developed a solid foundation in software development,
                      database management, web technologies, and application
                      design.
                    </p>
                  </article>

                </div>
              </div>
            </Block>

            {/* 02 — Location */}
            <Block
              id="ed-remote"
              n="02"
              label="Location"
            >
              <div className="ed-split">
                <div className="ed-globe-stage">
                  <LocationGlobe />

                  <span className="ed-pin">
                    <span className="ed-dot" aria-hidden="true" />
                    Tunisia · UTC+1
                  </span>
                </div>

                <div>
                  <h3 className="ed-h3 ed-h3--sm">
                    Based in Tunisia
                  </h3>

                  <p className="ed-p">
                    I'm based in Tunisia and open to remote work
                    opportunities worldwide.
                  </p>
                </div>
              </div>
            </Block>

          </div>
        </div>

        {/* Ticker */}
        <div className="ed-marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="ed-track" key={copy}>
              {TICKER.map((word) => (
                <span className="ed-item" key={`${copy}-${word}`}>
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyBackground;
