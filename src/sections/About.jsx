import React, { useCallback, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

/* ------------------------------------------------------------------ */
/* Styles — scoped under .ed-root. Edit the tokens to change the look. */
/*                                                                    */
/* Everything is sized in `em`. On desktop the section's base size     */
/* follows the screen HEIGHT, so the whole thing shrinks or grows to   */
/* fit one screen without scrolling.                                   */
/* ------------------------------------------------------------------ */
const STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=DM+Mono:wght@400;500&display=swap");

.ed-root {
  --ed-paper: #f5f0e6;
  --ed-ink: #141414;
  --ed-pink: #ff90c6;
  --ed-yellow: #ffe45c;
  --ed-mint: #a7efd3;
  --ed-lilac: #cfc2ff;
  --ed-line: 2.5px;
  --ed-pad: clamp(0.9em, 2.2vw, 1.6em);
  --ed-media-h: 14em;
  --ed-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --ed-mono: "DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  font-size: 16px;
  width: 100%;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}
/* desktop: base size follows the screen height (13px–18px) */
@media (min-width: 1100px) {
  .ed-root { font-size: clamp(13px, 1.78vh, 18px); }
}

/* Poster-style shell */
.ed-shell {
  position: relative;
  overflow: hidden;
  padding: var(--ed-pad);
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 2.2em;
  color: var(--ed-ink);
  font-family: var(--ed-display);
  background-color: var(--ed-paper);
  background-image: radial-gradient(rgba(20, 20, 20, 0.12) 1px, transparent 1px);
  background-size: 22px 22px;
  box-shadow: 0.6em 0.6em 0 var(--ed-pink);
}

/* Header */
.ed-head {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-bottom: 1.2em;
}
.ed-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  font-family: var(--ed-mono);
  font-size: 0.85em;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.ed-eyebrow::before {
  content: "";
  width: 1.8em;
  height: var(--ed-line);
  background: var(--ed-ink);
}
.ed-title {
  font-size: clamp(2em, 3.4vw, 3em);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.035em;
  text-wrap: balance;
}
.ed-mark {
  background: linear-gradient(transparent 58%, var(--ed-yellow) 58%);
  padding: 0 0.1em;
}

/* Layout: all sections use the full width */
.ed-layout {
  display: grid;
  gap: 1.5em;
}
.ed-main {
  display: grid;
  align-content: start;
  gap: 1.6em;
  min-width: 0;
  container-type: inline-size;
  container-name: ed-main;
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
.ed-pin .ed-dot { background: var(--ed-pink); }
@keyframes ed-ping {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(3); opacity: 0; }
}

.ed-block[data-tone="yellow"] { --tone: var(--ed-yellow); }
.ed-block[data-tone="mint"] { --tone: var(--ed-mint); }
.ed-block[data-tone="lilac"] { --tone: var(--ed-lilac); }
.ed-block[data-tone="ink"] { --tone: var(--ed-pink); }

/* Section block: numbered header + scroll reveal */
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
  gap: 0.8em;
  margin-bottom: 0.7em;
}
.ed-num {
  font-size: 2em;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}
.ed-rule {
  flex: 1;
  height: var(--ed-line);
  border-radius: 2px;
  background: var(--ed-ink);
}
.ed-label {
  padding: 0.25em 0.75em;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-paper);
  font-family: var(--ed-mono);
  font-size: 0.78em;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Type */
.ed-h3 {
  font-size: clamp(1.7em, 2.6vw, 2.2em);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
}
.ed-h3--sm {
  font-size: clamp(1.2em, 1.6vw, 1.45em);
  line-height: 1.12;
}
.ed-p {
  max-width: 62ch;
  margin-top: 0.7em;
  font-size: 1em;
  line-height: 1.6;
  opacity: 0.86;
}
.ed-p--lead {
  font-size: 1.18em;
  line-height: 1.5;
  opacity: 1;
}
.ed-em {
  font-weight: 700;
  background: linear-gradient(transparent 62%, var(--ed-pink) 62%);
}

/* 01 Hello: lead on the left, details on the right when there is room */
.ed-hello { display: grid; }
.ed-hello-more .ed-p:first-child { margin-top: 0.7em; }
@container ed-main (min-width: 640px) {
  .ed-hello {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      "title more"
      "lead  more"
      "chips more";
    column-gap: 2em;
    align-items: start;
  }
  .ed-hello-title { grid-area: title; }
  .ed-hello-lead { grid-area: lead; }
  .ed-hello-chips { grid-area: chips; }
  .ed-hello-more {
    grid-area: more;
    padding-left: 1.8em;
    border-left: var(--ed-line) solid var(--ed-ink);
  }
  .ed-hello-more .ed-p:first-child { margin-top: 0; }
}

/* Chips */
.ed-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45em;
  margin: 1em 0 0;
  padding: 0;
  list-style: none;
}
.ed-chip {
  padding: 0.35em 0.8em;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: #fff;
  font-family: var(--ed-mono);
  font-size: 0.8em;
  transition: transform 0.2s ease, background 0.2s ease;
}
.ed-chip:hover {
  background: var(--ed-pink);
  transform: rotate(-3deg) translateY(-2px);
}

/* 02 + 03 share a row whenever the column has room, equal heights */
.ed-duo {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.6em;
}
@container ed-main (min-width: 600px) {
  .ed-duo {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.6em;
    align-items: stretch;
  }
}
.ed-duo > .ed-block {
  display: flex;
  flex-direction: column;
}

/* Tile: one framed card, media on top, text below */
.ed-tile {
  flex: 1;
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: hidden;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 1.4em;
  background: #fff;
  box-shadow: 0.4em 0.4em 0 var(--ed-ink);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
@media (hover: hover) {
  .ed-tile:hover {
    transform: translate(-3px, -3px);
    box-shadow: 0.6em 0.6em 0 var(--ed-ink);
  }
}
.ed-tile-body {
  padding: 1.1em 1.3em 1.4em;
  border-top: var(--ed-line) solid var(--ed-ink);
}
.ed-tile-body .ed-p { margin-top: 0.6em; }

/* Both media share one height so the row lines up */
.ed-panel,
.ed-globe-stage {
  min-height: var(--ed-media-h);
}
.ed-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2em;
  background: var(--tone, #fff);
}
.ed-icons {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1em 0.6em;
  width: 100%;
  margin: 0;
  padding: 0.2em;
  list-style: none;
}
.ed-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4em;
  font-family: var(--ed-mono);
  font-size: 0.78em;
  text-align: center;
}
.ed-icon img {
  width: 2.8em;
  height: auto;
  aspect-ratio: 1;
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.ed-icon:hover img { transform: translateY(-4px) rotate(-6deg) scale(1.1); }

/* Globe */
.ed-globe-stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(circle at 50% 45%, rgba(255, 79, 163, 0.35), transparent 68%), #0b0b0b;
}
.ed-globe {
  width: min(100%, calc(var(--ed-media-h) - var(--ed-line) * 2));
  aspect-ratio: 1 / 1;
  cursor: grab;
}
.ed-globe:active { cursor: grabbing; }
.ed-pin {
  position: absolute;
  left: 50%;
  bottom: 0.7em;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  transform: translateX(-50%);
  padding: 0.25em 0.75em;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-yellow);
  color: var(--ed-ink);
  font-family: var(--ed-mono);
  font-size: 0.78em;
  white-space: nowrap;
}

/* Ticker (hidden on short screens to keep everything in view) */
.ed-marquee {
  display: flex;
  margin: 1.4em calc(var(--ed-pad) * -1) calc(var(--ed-pad) * -1);
  overflow: hidden;
  border-top: var(--ed-line) solid var(--ed-ink);
  background: var(--ed-ink);
  color: var(--ed-paper);
}
@media (min-width: 1100px) and (max-height: 759px) {
  .ed-marquee { display: none; }
  .ed-shell { padding-bottom: var(--ed-pad); }
}
.ed-track {
  display: flex;
  flex: 0 0 auto;
  min-width: 100%;
  animation: ed-scroll 28s linear infinite;
}
.ed-marquee:hover .ed-track { animation-play-state: paused; }
.ed-item {
  display: inline-flex;
  align-items: center;
  gap: 1.5em;
  padding: 0.7em 0 0.7em 1.5em;
  font-family: var(--ed-mono);
  font-size: 0.9em;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
}
.ed-item::after {
  content: "\\2733";
  color: var(--ed-pink);
}
@keyframes ed-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

/* Focus + reduced motion */
.ed-root :is(a, button):focus-visible {
  outline: 3px solid var(--ed-pink);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .ed-block, .ed-chip, .ed-icon img, .ed-tile { transition: none; }
  .ed-block { opacity: 1; transform: none; }
  .ed-track, .ed-dot::after { animation: none; }
}
`;

const TUNISIA = { lat: 33.89, lng: 9.54 };

const FOCUS = [
  "DevOps",
  "Site Reliability",
  "CI/CD",
  "Deployment Automation",
  "Web & Mobile",
];

const ICON_BASE = "https://cdn.jsdelivr.net/npm/devicon@2.18.0/icons";
const TECH = [
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Express", slug: "express" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Docker", slug: "docker" },
  { name: "Kubernetes", slug: "kubernetes" },
];

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

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */
/* Reveals a block the first time it scrolls into view */
const Block = ({ id, n, label, tone = "yellow", children }) => {
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
      data-tone={tone}
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

/* Globe: responsive, auto-rotating, pinned on Tunisia */
const LocationGlobe = () => {
  const wrapRef = useRef(null);
  const globeRef = useRef(null);
  const [size, setSize] = useState(220);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      setSize(Math.max(160, Math.round(entry.contentRect.width)));
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
        atmosphereColor="#f7bfde"
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
/* About                                                               */
/* ------------------------------------------------------------------ */
const About = () => {
  return (
    <section
      className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 my-8 ed-root"
      id="about"
    >
      <style>{STYLES}</style>

      <div className="ed-shell">
        <header className="ed-head">
          <span className="ed-eyebrow">About me</span>
          <h2 className="ed-title">
            Build it. Ship it. <span className="ed-mark">Keep it reliable.</span>
          </h2>
        </header>

        <div className="ed-layout">
          {/* ---------- Numbered sections ---------- */}
          <div className="ed-main">
            <Block id="ed-hello" n="01" label="Hello" tone="yellow">
              <div className="ed-hello">
                <h3 className="ed-h3 ed-hello-title">Hi, I'm Chahd</h3>
                <p className="ed-p ed-p--lead ed-hello-lead">
                  I'm a Software Engineering student specializing in{" "}
                  <strong className="ed-em">
                    DevOps and Site Reliability Engineering
                  </strong>
                  , with a background in web and mobile application
                  development.
                </p>
                <div className="ed-hello-more">
                  <p className="ed-p">
                    I have hands-on experience building frontend and backend
                    applications, integrating REST APIs, and working with modern
                    technologies such as React, Node.js, and MongoDB.
                  </p>
                  <p className="ed-p">
                    Currently, I'm strengthening my infrastructure and
                    automation skills through practical projects involving
                    Docker, Kubernetes, CI/CD pipelines, deployment automation,
                    and software reliability.
                  </p>
                </div>
                <ul className="ed-chips ed-hello-chips" aria-label="Focus areas">
                  {FOCUS.map((item) => (
                    <li key={item} className="ed-chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Block>

            {/* 02 + 03 share a row when there is room */}
            <div className="ed-duo">
              <Block id="ed-stack" n="02" label="Tech stack" tone="mint">
                <div className="ed-tile">
                  <div className="ed-panel">
                    <ul className="ed-icons" aria-label="Technologies I use">
                      {TECH.map(({ name, slug }) => (
                        <li key={slug} className="ed-icon">
                          <img
                            src={`${ICON_BASE}/${slug}/${slug}-original.svg`}
                            alt=""
                            width="56"
                            height="56"
                            loading="lazy"
                          />
                          <span>{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ed-tile-body">
                    <h3 className="ed-h3 ed-h3--sm">Tech Stack</h3>
                    <p className="ed-p">
                      I specialize in a variety of languages, frameworks, and
                      tools that allow me to build robust and scalable
                      applications
                    </p>
                  </div>
                </div>
              </Block>

              <Block id="ed-remote" n="03" label="Remote" tone="ink">
                <div className="ed-tile">
                  <div className="ed-globe-stage">
                    <LocationGlobe />
                    <span className="ed-pin">
                      <span className="ed-dot" aria-hidden="true" />
                      Tunisia · UTC+1
                    </span>
                  </div>
                  <div className="ed-tile-body">
                    <h3 className="ed-h3 ed-h3--sm">
                      I'm very flexible with time zone communications &
                      locations
                    </h3>
                    <p className="ed-p">
                      I&apos;m based in Tunisia, and open to remote work
                      worldwide.
                    </p>
                  </div>
                </div>
              </Block>
            </div>
          </div>
        </div>

        {/* ---------- Ticker ---------- */}
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

export default About;