
import React, { useCallback, useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import Button from "../components/Button";

/* ------------------------------------------------------------------ */
/* Styles — scoped under .ed-root. Edit the tokens to change the look. */
/* ------------------------------------------------------------------ */
const STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=DM+Mono:wght@400;500&display=swap");

.ed-root {
  --ed-paper: #f5f0e6;
  --ed-ink: #141414;
  --ed-pink: #ff4fa3;
  --ed-yellow: #ffe45c;
  --ed-mint: #a7efd3;
  --ed-lilac: #cfc2ff;
  --ed-blush: #ffc2de;
  --ed-line: 2.5px;
  --ed-pad: clamp(1rem, 3vw, 2.25rem);
  --ed-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --ed-mono: "DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  width: 100%;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

/* Poster-style shell */
.ed-shell {
  position: relative;
  overflow: hidden;
  padding: var(--ed-pad);
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 36px;
  color: var(--ed-ink);
  font-family: var(--ed-display);
  background-color: var(--ed-paper);
  background-image: radial-gradient(rgba(20, 20, 20, 0.12) 1px, transparent 1px);
  background-size: 22px 22px;
  box-shadow: 10px 10px 0 var(--ed-pink);
}

/* Header */
.ed-head {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-bottom: 2.25rem;
}
.ed-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--ed-mono);
  font-size: 0.95rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.ed-eyebrow::before {
  content: "";
  width: 28px;
  height: var(--ed-line);
  background: var(--ed-ink);
}
.ed-title {
  max-width: 16ch;
  font-size: clamp(2.3rem, 6vw, 4.6rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.035em;
}
.ed-mark {
  background: linear-gradient(transparent 58%, var(--ed-yellow) 58%);
  padding: 0 0.1em;
}

/* Layout */
.ed-layout {
  display: grid;
  gap: 1.75rem;
}
@media (min-width: 1280px) {
  .ed-layout {
    grid-template-columns: 390px minmax(0, 1fr);
    gap: 3rem;
    align-items: start;
  }
}
.ed-aside {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
@media (min-width: 1280px) and (min-height: 860px) {
  .ed-aside {
    position: sticky;
    top: 1.5rem;
  }
}
.ed-main {
  display: grid;
  gap: 3rem;
  min-width: 0;
}

/* Open rows: no outer boxes, only the media is framed */
.ed-card {
  position: relative;
  display: grid;
  gap: 1.5rem;
}
.ed-block[data-tone="yellow"] { --tone: var(--ed-yellow); }
.ed-block[data-tone="mint"] { --tone: var(--ed-mint); }
.ed-block[data-tone="lilac"] { --tone: var(--ed-lilac); }
.ed-block[data-tone="ink"] { --tone: var(--ed-pink); }

/* Section block: numbered header + scroll reveal */
.ed-block {
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
  margin-bottom: 1.1rem;
}
.ed-num {
  font-size: clamp(2rem, 4vw, 2.8rem);
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
  padding: 0.3rem 0.8rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-paper);
  font-family: var(--ed-mono);
  font-size: 0.85rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* Type */
.ed-h3 {
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
}
.ed-h3--sm {
  font-size: clamp(1.7rem, 2.5vw, 2.1rem);
}
.ed-p--lead {
  max-width: 62ch;
  font-size: clamp(1.3rem, 1.8vw, 1.55rem);
  line-height: 1.7;
}
.ed-p--body {
  max-width: 62ch;
}
.ed-p {
  margin-top: 1rem;
  font-size: 1.2rem;
  line-height: 1.8;
  opacity: 0.86;
}

/* Chips */
.ed-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 1.4rem 0 0;
  padding: 0;
  list-style: none;
}
.ed-chip {
  padding: 0.4rem 0.9rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: #fff;
  font-family: var(--ed-mono);
  font-size: 0.9rem;
  transition: transform 0.2s ease, background 0.2s ease;
}
.ed-chip:hover {
  background: var(--ed-pink);
  transform: rotate(-3deg) translateY(-2px);
}

/* Split layout: media + text */
.ed-split { grid-template-columns: 1fr; }
@media (min-width: 700px) {
  .ed-split {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 2rem;
  }
}
.ed-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.1rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 22px;
  background: var(--tone, #fff);
  box-shadow: 6px 6px 0 var(--ed-ink);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
@media (hover: hover) {
  .ed-card:hover .ed-panel {
    transform: translate(-3px, -3px);
    box-shadow: 9px 9px 0 var(--ed-ink);
  }
}
.ed-icons {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem 1rem;
  width: 100%;
  margin: 0;
  padding: 0.5rem;
  list-style: none;
}
.ed-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--ed-mono);
  font-size: 0.95rem;
  text-align: center;
}
.ed-icon img {
  width: clamp(38px, 5vw, 52px);
  height: auto;
  aspect-ratio: 1;
  transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.ed-icon:hover img { transform: translateY(-4px) rotate(-6deg) scale(1.1); }

/* Globe */
.ed-globe-stage {
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 22px;
  background: radial-gradient(circle at 50% 45%, rgba(255, 79, 163, 0.35), transparent 68%), #0b0b0b;
  box-shadow: 6px 6px 0 var(--ed-pink);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
@media (hover: hover) {
  .ed-card:hover .ed-globe-stage {
    transform: translate(-3px, -3px);
    box-shadow: 9px 9px 0 var(--ed-pink);
  }
}
.ed-globe {
  width: 100%;
  max-width: 460px;
  aspect-ratio: 1 / 1;
  cursor: grab;
}
.ed-globe:active { cursor: grabbing; }
.ed-pin {
  position: absolute;
  left: 50%;
  bottom: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transform: translateX(-50%);
  padding: 0.3rem 0.85rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-yellow);
  color: var(--ed-ink);
  font-family: var(--ed-mono);
  font-size: 0.9rem;
  white-space: nowrap;
}

/* Profile (aside) */
.ed-profile {
  display: grid;
  gap: 1.1rem;
}
.ed-photo {
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 1.4rem;
  overflow: hidden;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 22px;
  background: var(--ed-pink);
  box-shadow: 6px 6px 0 var(--ed-ink);
}
.ed-photo img {
  width: 100%;
  max-width: 270px;
  max-height: 280px;
  object-fit: contain;
}
.ed-sticker {
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  padding: 0.2rem 0.65rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-yellow);
  box-shadow: 3px 3px 0 var(--ed-ink);
  font-family: var(--ed-mono);
  font-size: 0.85rem;
  transform: rotate(-6deg);
}
.ed-name {
  font-size: 2.2rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}
.ed-role {
  margin-top: 0.4rem;
  font-family: var(--ed-mono);
  font-size: 0.95rem;
}
.ed-status {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  align-self: flex-start;
  padding: 0.35rem 0.85rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-mint);
  font-family: var(--ed-mono);
  font-size: 0.9rem;
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

/* Section nav (desktop only) */
.ed-nav {
  display: none;
  margin: 0;
  padding: 0.9rem 0 0;
  list-style: none;
  border-top: var(--ed-line) solid var(--ed-ink);
}
@media (min-width: 1280px) {
  .ed-nav { display: grid; gap: 0.3rem; }
}
.ed-nav a {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.4rem 0.65rem;
  border: var(--ed-line) solid transparent;
  border-radius: 12px;
  color: inherit;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.ed-nav a span {
  font-family: var(--ed-mono);
  font-size: 0.85rem;
}
.ed-nav a:hover { border-color: var(--ed-ink); }
.ed-nav a[aria-current="true"] {
  background: var(--ed-ink);
  color: var(--ed-paper);
}

/* Contact */
.ed-contact {
  display: grid;
  gap: 0.2rem;
  padding-top: 1.5rem;
  border-top: var(--ed-line) solid var(--ed-ink);
}
.ed-kicker {
  font-family: var(--ed-mono);
  font-size: 0.9rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.ed-copy {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 0.7rem;
  width: 100%;
  margin-top: 0.7rem;
  padding: 0.7rem 0.9rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 14px;
  background: var(--ed-yellow);
  box-shadow: 4px 4px 0 var(--ed-ink);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease, background 0.2s ease;
}
.ed-copy:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--ed-ink);
}
.ed-copy:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--ed-ink);
}
.ed-copy.is-done { background: var(--ed-mint); }
.ed-copy-icon {
  grid-row: span 2;
  width: 22px;
  height: 22px;
}
.ed-copy-email {
  overflow-wrap: anywhere;
  font-size: 1.05rem;
  font-weight: 700;
}
.ed-copy-hint {
  font-family: var(--ed-mono);
  font-size: 0.8rem;
}
.ed-mail {
  align-self: flex-start;
  margin-top: 0.9rem;
  color: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
.ed-mail:hover { background: var(--ed-yellow); }

/* Ticker */
.ed-marquee {
  display: flex;
  margin: 2.5rem calc(var(--ed-pad) * -1) calc(var(--ed-pad) * -1);
  overflow: hidden;
  border-top: var(--ed-line) solid var(--ed-ink);
  background: var(--ed-ink);
  color: var(--ed-paper);
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
  gap: 1.5rem;
  padding: 0.9rem 0 0.9rem 1.5rem;
  font-family: var(--ed-mono);
  font-size: 1rem;
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
  .ed-block, .ed-card, .ed-chip, .ed-icon img, .ed-copy { transition: none; }
  .ed-block { opacity: 1; transform: none; }
  .ed-track, .ed-dot::after { animation: none; }
}
`;

const EMAIL = "chahdfadhlaoui87@gmail.com";
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

const SECTIONS = [
  { id: "ed-hello", n: "01", label: "Hello" },
  { id: "ed-stack", n: "02", label: "Tech stack" },
  { id: "ed-remote", n: "03", label: "Remote" },
];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */
const CopyIcon = () => (
  <svg
    className="ed-copy-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="ed-copy-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

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
  const [size, setSize] = useState(380);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      setSize(Math.max(220, Math.round(entry.contentRect.width)));
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
        atmosphereColor="#fe2aa2"
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
  const [hasCopied, setHasCopied] = useState(false);
  const [active, setActive] = useState(SECTIONS[0].id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      return;
    }
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  /* highlight the section that is currently in view */
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
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <section
      className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 my-20 ed-root"
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
          {/* ---------- Sticky profile ---------- */}
          <aside className="ed-aside">
            <div className="ed-profile">
              <div className="ed-photo">
                <img src="assets/me3.png" alt="Portrait of Chahd" />
                <span className="ed-sticker">SWE student</span>
              </div>

              <div>
                <h3 className="ed-name">Chahd</h3>
                <p className="ed-role">DevOps · SRE · Web & Mobile</p>
              </div>

              <span className="ed-status">
                <span className="ed-dot" aria-hidden="true" />
                Open to remote work
              </span>

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
            </div>

            <div className="ed-contact">
              <p className="ed-kicker">Contact me</p>

              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy email address"
                className={`ed-copy ${hasCopied ? "is-done" : ""}`}
              >
                {hasCopied ? <CheckIcon /> : <CopyIcon />}
                <span className="ed-copy-email">{EMAIL}</span>
                <span className="ed-copy-hint" aria-live="polite">
                  {hasCopied ? "Copied!" : "Click to copy"}
                </span>
              </button>

              <a className="ed-mail" href={`mailto:${EMAIL}`}>
                Or send an email directly →
              </a>
            </div>
          </aside>

          {/* ---------- Numbered sections ---------- */}
          <div className="ed-main">
            <Block id="ed-hello" n="01" label="Hello" tone="yellow">
              <div className="ed-card">
                <div>
                  <h3 className="ed-h3">Hi, I'm Chahd</h3>
                  <p className="ed-p ed-p--lead">
                    I'm a Software Engineering student specializing in DevOps
                    and Site Reliability Engineering, with a background in web
                    and mobile application development.
                  </p>
                  <p className="ed-p ed-p--body">
                    I have hands-on experience building frontend and backend
                    applications, integrating REST APIs, and working with modern
                    technologies such as React, Node.js, and MongoDB.
                  </p>
                  <p className="ed-p ed-p--body">
                    Currently, I'm strengthening my infrastructure and
                    automation skills through practical projects involving
                    Docker, Kubernetes, CI/CD pipelines, deployment automation,
                    and software reliability.
                  </p>
                  <ul className="ed-chips" aria-label="Focus areas">
                    {FOCUS.map((item) => (
                      <li key={item} className="ed-chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Block>

            <Block id="ed-stack" n="02" label="Tech stack" tone="mint">
              <div className="ed-card ed-split">
                <div className="ed-panel">
                  <ul className="ed-icons" aria-label="Technologies I use">
                    {TECH.map(({ name, slug }) => (
                      <li key={slug} className="ed-icon">
                        <img
                          src={`${ICON_BASE}/${slug}/${slug}-original.svg`}
                          alt=""
                          width="52"
                          height="52"
                          loading="lazy"
                        />
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
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
              <div className="ed-card ed-split">
                <div className="ed-globe-stage">
                  <LocationGlobe />
                  <span className="ed-pin">
                    <span className="ed-dot" aria-hidden="true" />
                    Tunisia · UTC+1
                  </span>
                </div>
                <div>
                  <h3 className="ed-h3 ed-h3--sm">
                    I'm very flexible with time zone communications & locations
                  </h3>
                  <p className="ed-p">
                    I&apos;m based in Tunisia, and open to remote work
                    worldwide.
                  </p>
                  <Button
                    name="Contact Me"
                    isBeam
                    containerClass="w-full mt-8"
                  />
                </div>
              </div>
            </Block>
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
