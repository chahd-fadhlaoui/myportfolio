
import React, { useEffect, useRef, useState } from "react";
import { myProjects } from "../constants";

/* ------------------------------------------------------------------ */
/* Styles — scoped under .pj-root.                                    */
/* ------------------------------------------------------------------ */
const STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=DM+Mono:wght@400;500&display=swap");

.pj-root {
  --ed-paper: #f5f0e6;
  --ed-ink: #141414;
  --ed-pink: #ff4fa3;
  --ed-yellow: #ffe45c;
  --ed-mint: #a7efd3;
  --ed-lilac: #cfc2ff;
  --ed-line: 2.5px;
  --ed-pad: clamp(1rem, 3vw, 2.25rem);
  --ed-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --ed-mono: "DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
}

/* Poster-style shell */
.pj-shell {
  position: relative;
  overflow: hidden;
  overflow: clip;
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
.pj-head {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.9rem;
}

.pj-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--ed-mono);
  font-size: 20px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.pj-eyebrow::before {
  content: "";
  width: 28px;
  height: var(--ed-line);
  background: var(--ed-ink);
}

.pj-title {
  font-size: clamp(2.3rem, 6vw, 4.2rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.035em;
}

.pj-mark {
  background: linear-gradient(transparent 58%, var(--ed-yellow) 58%);
  padding: 0 0.1em;
}

.pj-intro {
  max-width: 54ch;
  font-size: 1.05rem;
  line-height: 1.6;
  opacity: 0.86;
}

/* Project stage */
.pj-panel {
  border-radius: 24px;
}

.pj-panel:focus-visible {
  outline: 3px solid var(--ed-pink);
  outline-offset: 10px;
}

.pj-stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.9rem;
  animation: pj-in-next 0.45s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  touch-action: pan-y;
}

.pj-stage[data-dir="prev"] {
  animation-name: pj-in-prev;
}

@keyframes pj-in-next {
  from {
    opacity: 0;
    transform: translateX(36px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes pj-in-prev {
  from {
    opacity: 0;
    transform: translateX(-36px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.pj-stage[data-tone="pink"] {
  --tone: var(--ed-pink);
}

.pj-stage[data-tone="yellow"] {
  --tone: var(--ed-yellow);
}

.pj-stage[data-tone="mint"] {
  --tone: var(--ed-mint);
}

.pj-stage[data-tone="lilac"] {
  --tone: var(--ed-lilac);
}

@media (min-width: 1024px) {
  .pj-stage {
    grid-template-columns: minmax(0, 8fr) minmax(0, 5fr);
    gap: 2.75rem;
    align-items: center;
  }
}

.pj-hint {
  margin-top: 1.4rem;
  font-family: var(--ed-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-align: right;
  opacity: 0.65;
}

/* Video frame */
.pj-frame {
  overflow: hidden;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 22px;
  background: var(--tone, var(--ed-yellow));
  box-shadow: 8px 8px 0 var(--ed-ink);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

@media (hover: hover) {
  .pj-frame:hover {
    transform: translate(-3px, -3px);
    box-shadow: 11px 11px 0 var(--ed-ink);
  }
}

.pj-bar {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.65rem 0.9rem;
  border-bottom: var(--ed-line) solid var(--ed-ink);
}

.pj-dots {
  display: flex;
  gap: 0.4rem;
}

.pj-dots > span {
  width: 12px;
  height: 12px;
  border: 2px solid var(--ed-ink);
  border-radius: 50%;
  background: #fff;
}

.pj-url {
  flex: 1;
  min-width: 0;
  padding: 0.2rem 0.8rem;
  overflow: hidden;
  border: 2px solid var(--ed-ink);
  border-radius: 999px;
  background: #fff;
  font-family: var(--ed-mono);
  font-size: 0.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pj-screen {
  position: relative;
  aspect-ratio: 16 / 10;
  background: #0b0b0b;
}

.pj-screen video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pj-screen video:fullscreen {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}

.pj-screen video:-webkit-full-screen {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}

.pj-fs {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border: 2px solid var(--ed-ink);
  border-radius: 999px;
  background: var(--ed-yellow);
  box-shadow: 3px 3px 0 var(--ed-ink);
  color: var(--ed-ink);
  font-family: var(--ed-mono);
  font-size: 0.72rem;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.pj-fs:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--ed-ink);
}

/* Previous / Next buttons below video */
.pj-video-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1.25rem;
}

.pj-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-width: 125px;
  padding: 0.7rem 1rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 14px;
  background: var(--ed-yellow);
  box-shadow: 4px 4px 0 var(--ed-ink);
  color: inherit;
  font-family: var(--ed-display);
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.pj-arrow:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--ed-ink);
}

.pj-arrow:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--ed-ink);
}

.pj-arrow span {
  font-size: 1.2rem;
}

/* Project details */
.pj-info {
  display: flex;
  flex-direction: column;
  gap: 1.05rem;
  min-width: 0;
}

.pj-meta {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.pj-logo {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 16px;
  background: var(--ed-ink);
  box-shadow: 3px 3px 0 var(--ed-ink);
}

.pj-logo img {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.pj-count {
  font-family: var(--ed-mono);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
}

.pj-name {
  font-size: clamp(1.9rem, 3.4vw, 2.7rem);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.035em;
  overflow-wrap: anywhere;
}

.pj-desc {
  font-size: clamp(1.05rem, 1.4vw, 1.18rem);
  line-height: 1.6;
}

.pj-sub {
  line-height: 1.65;
  opacity: 0.82;
}

.pj-kicker {
  margin-top: 0.3rem;
  font-family: var(--ed-mono);
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.pj-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pj-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.85rem 0.25rem 0.3rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 999px;
  background: #fff;
  font-family: var(--ed-mono);
  font-size: 0.78rem;
  transition: transform 0.2s ease, background 0.2s ease;
}

.pj-tag:hover {
  background: var(--ed-pink);
  transform: rotate(-3deg) translateY(-2px);
}

.pj-tag-ico {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--ed-ink);
}

.pj-tag-ico img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

/* GitHub link */
.pj-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 0.4rem;
}

.pj-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.1rem;
  border: var(--ed-line) solid var(--ed-ink);
  border-radius: 14px;
  background: #fff;
  box-shadow: 4px 4px 0 var(--ed-ink);
  color: inherit;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}

.pj-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--ed-ink);
}

.pj-btn:active {
  transform: translate(3px, 3px);
  box-shadow: 1px 1px 0 var(--ed-ink);
}

.pj-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Focus + reduced motion */
.pj-root :is(a, button):focus-visible {
  outline: 3px solid var(--ed-pink);
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .pj-arrow {
    min-width: 0;
    flex: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pj-stage {
    animation: none;
  }

  .pj-frame,
  .pj-tag,
  .pj-btn,
  .pj-arrow,
  .pj-fs {
    transition: none;
  }
}
`;

const TONES = ["pink", "yellow", "mint", "lilac"];

const pad = (n) => String(n).padStart(2, "0");

const codeOf = (p) => p.github || p.repo || p.source;

const logoBg = (p) => p.logoStyle?.backgroundColor || undefined;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const canFullscreen = () => {
  if (typeof document === "undefined") return false;
  const v = document.createElement("video");
  return !!(
    v.requestFullscreen ||
    v.webkitRequestFullscreen ||
    v.webkitEnterFullscreen
  );
};

/* Video component */
const ProjectVideo = ({ src, title }) => {
  const ref = useRef(null);
  const [reduce] = useState(prefersReducedMotion);
  const [fsOk] = useState(canFullscreen);

  useEffect(() => {
    const video = ref.current;

    if (!video || reduce || typeof IntersectionObserver === "undefined") {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );

    io.observe(video);

    return () => io.disconnect();
  }, [reduce, src]);

  const goFullscreen = async () => {
    const video = ref.current;
    if (!video) return;

    try {
      if (video.requestFullscreen) {
        await video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen could not be opened:", error);
    }
  };

  return (
    <>
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduce}
        aria-label={`${title} demo video`}
      />

      {fsOk && (
        <button
          type="button"
          className="pj-fs"
          onClick={goFullscreen}
          aria-label="View video in fullscreen"
        >
          <span aria-hidden="true">⤢</span> Full screen
        </button>
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */
const Projects = () => {
  const total = myProjects?.length || 0;

  const [{ index, dir }, setNav] = useState({
    index: 0,
    dir: "next",
  });

  const touchStart = useRef(null);

  const step = (delta) => {
    setNav((s) => ({
      index: (((s.index + delta) % total) + total) % total,
      dir: delta > 0 ? "next" : "prev",
    }));
  };

  const onKeys = (e) => {
    const delta =
      e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;

    if (!delta) return;

    e.preventDefault();
    step(delta);
  };

  const onTouchStart = (e) => {
    const t = e.touches[0];

    touchStart.current = {
      x: t.clientX,
      y: t.clientY,
    };
  };

  const onTouchEnd = (e) => {
    const s = touchStart.current;
    touchStart.current = null;

    if (!s) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      step(dx < 0 ? 1 : -1);
    }
  };

  if (!total) return null;

  const project = myProjects[index];
  const code = codeOf(project);
  const tags = project.tags || [];

  return (
    <section className="c-space my-20 pj-root" id="projects">
      <style>{STYLES}</style>

      <div className="pj-shell">
        <header className="pj-head">
          <span className="pj-eyebrow">
            {total === 1 ? "project" : "projects"}
          </span>

          <h2 className="pj-title">
            My Selected <span className="pj-mark">Work</span>
          </h2>

          <p className="pj-intro">
            Explore my projects, discover how they are built, and
            take a closer look at the technologies behind them.
          </p>
        </header>

        <div
          id="pj-panel"
          role="region"
          aria-label="Selected project"
          tabIndex={0}
          className="pj-panel"
          onKeyDown={onKeys}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            key={index}
            className="pj-stage"
            data-dir={dir}
            data-tone={TONES[index % TONES.length]}
          >
            <div className="pj-media">
              <div className="pj-frame">
                <div className="pj-bar" aria-hidden="true">
                  <span className="pj-dots">
                    <span />
                    <span />
                    <span />
                  </span>

                  <span className="pj-url">{project.title}</span>
                </div>

                <div className="pj-screen">
                  {project.texture && (
                    <ProjectVideo
                      src={project.texture}
                      title={project.title}
                    />
                  )}
                </div>
              </div>

              {/* Navigation directly below the video */}
              {total > 1 && (
                <div className="pj-video-nav">
                  <button
                    type="button"
                    className="pj-arrow"
                    onClick={() => step(-1)}
                    aria-label="Previous project"
                  >
                    <span aria-hidden="true">←</span>
                    Previous
                  </button>

                  <button
                    type="button"
                    className="pj-arrow"
                    onClick={() => step(1)}
                    aria-label="Next project"
                  >
                    Next
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              )}
            </div>

            <div className="pj-info">
              <div className="pj-meta">
                <span
                  className="pj-logo"
                  style={{ backgroundColor: logoBg(project) }}
                >
                  <img src={project.logo} alt="" />
                </span>

                <span className="pj-count">
                  {pad(index + 1)} / {pad(total)}
                </span>
              </div>

              <h3 className="pj-name">{project.title}</h3>

              {project.desc && (
                <p className="pj-desc">{project.desc}</p>
              )}

              {project.subdesc && (
                <p className="pj-sub">{project.subdesc}</p>
              )}

              {tags.length > 0 && (
                <>
                  <p className="pj-kicker">Built with</p>

                  <ul
                    className="pj-tags"
                    aria-label={`Technologies used in ${project.title}`}
                  >
                    {tags.map((tag, i) => (
                      <li
                        key={`${tag.name}-${i}`}
                        className="pj-tag"
                      >
                        <span className="pj-tag-ico">
                          <img src={tag.path} alt="" />
                        </span>
                        {tag.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {code && (
                <div className="pj-links">
                  <a
                    className="pj-btn"
                    href={code}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source code <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

    

        <p className="pj-sr" aria-live="polite">
          {`Project ${index + 1} of ${total}: ${project.title}`}
        </p>
      </div>
    </section>
  );
};

export default Projects;
