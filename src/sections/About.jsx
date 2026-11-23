
import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Mono:wght@400;500&display=swap");

.ab-root {
  --ab-paper: #fff8ed;
  --ab-ink: #17121a;
  --ab-pink: #ff82bd;
  --ab-yellow: #ffe45c;
  --ab-lilac: #bda0ff;
  --ab-mint: #9ce9c9;
  --ab-line: 2.5px;
  --ab-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --ab-mono: "DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 3vw, 2.25rem);
  padding-top: clamp(4rem, 8vw, 8rem);
  box-sizing: border-box;
  font-family: var(--ab-display);
}

/* Main editorial shell */
.ab-shell {
  position: relative;
  overflow: hidden;
  overflow: clip;
  padding: clamp(1.1rem, 3vw, 2.5rem);
  border: var(--ab-line) solid var(--ab-ink);
  border-radius: 36px;
  color: var(--ab-ink);
  background-color: var(--ab-paper);
  background-image: radial-gradient(
    rgba(23, 18, 26, 0.12) 1.2px,
    transparent 1.2px
  );
  background-size: 22px 22px;
  box-shadow: 12px 12px 0 var(--ab-pink);
}

/* Header */
.ab-head {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  margin-bottom: clamp(2.5rem, 5vw, 4.5rem);
  padding: clamp(2rem, 5vw, 4.5rem);
  border: var(--ab-line) solid var(--ab-ink);
  border-radius: 26px;
  background: var(--ab-pink);
  box-shadow: 8px 8px 0 var(--ab-yellow);
}

.ab-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  width: fit-content;
  font-family: var(--ab-mono);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.ab-eyebrow::before {
  content: "";
  width: 30px;
  height: 3px;
  background: var(--ab-ink);
}

.ab-title {
  max-width: 900px;
  margin: 0;
  font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.065em;
  text-wrap: balance;
}

.ab-title-mark {
  display: inline-block;
  padding: 0.02em 0.16em 0.08em;
  border: 2px solid var(--ab-ink);
  border-radius: 10px;
  background: var(--ab-yellow);
  transform: rotate(-1.5deg);
}

.ab-header-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.2rem;
  padding-top: 1.1rem;
  border-top: 2px solid rgba(23, 18, 26, 0.35);
}

.ab-header-note {
  font-family: var(--ab-mono);
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ab-header-decoration {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  flex: none;
  border: 2px solid var(--ab-ink);
  border-radius: 50%;
  background: var(--ab-yellow);
  animation: ab-rotate 14s linear infinite;
}

.ab-header-decoration svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: var(--ab-ink);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Editorial introduction */
.ab-intro {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 0 2rem;
}

.ab-intro-number {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  flex: none;
  border: var(--ab-line) solid var(--ab-ink);
  border-radius: 17px;
  background: var(--ab-yellow);
  box-shadow: 4px 4px 0 var(--ab-pink);
  font-size: 1.8rem;
  font-weight: 800;
}

.ab-intro-line {
  flex: 1;
  height: 3px;
  background: var(--ab-ink);
}

.ab-intro-label {
  padding: 0.55rem 0.9rem;
  border: var(--ab-line) solid var(--ab-ink);
  border-radius: 999px;
  background: var(--ab-lilac);
  box-shadow: 3px 3px 0 var(--ab-yellow);
  font-family: var(--ab-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Blog-like article layout */
.ab-article {
  display: grid;
  gap: 1.8rem;
}

/* Article panels */
.ab-story {
  position: relative;
  display: grid;
  grid-template-columns: 105px minmax(0, 1fr);
  gap: clamp(1.2rem, 3vw, 2.5rem);
  align-items: start;
  padding: clamp(1.5rem, 3.5vw, 3rem);
  border: var(--ab-line) solid var(--ab-ink);
  border-radius: 24px;
  color: var(--ab-ink);
  box-shadow: 6px 6px 0 var(--ab-ink);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.ab-story:nth-child(1) {
  background: #ffe45c;
}

.ab-story:nth-child(2) {
  background: #ff82bd;
}

.ab-story:nth-child(3) {
  background: #bda0ff;
}

@media (hover: hover) {
  .ab-story:hover {
    transform: translateY(-5px);
    box-shadow: 9px 11px 0 var(--ab-ink);
  }
}

/* Icon column */
.ab-story-icon {
  position: sticky;
  top: 2rem;
  display: grid;
  place-items: center;
  width: 100px;
  height: 100px;
  border: 2.5px solid var(--ab-ink);
  border-radius: 23px;
  background: var(--ab-paper);
  box-shadow: 5px 5px 0 var(--ab-ink);
  transition: transform 0.3s ease;
}

.ab-story:nth-child(2) .ab-story-icon {
  background: var(--ab-yellow);
}

.ab-story:nth-child(3) .ab-story-icon {
  background: var(--ab-mint);
}

.ab-story:hover .ab-story-icon {
  transform: rotate(-6deg) scale(1.05);
}

.ab-story-icon svg {
  width: 46px;
  height: 46px;
  fill: none;
  stroke: var(--ab-ink);
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Article content */
.ab-story-content {
  min-width: 0;
}

.ab-story-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1rem;
}

.ab-story-number {
  font-family: var(--ab-mono);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
}

.ab-story-tag {
  padding: 0.38rem 0.8rem;
  border: 2px solid var(--ab-ink);
  border-radius: 999px;
  background: var(--ab-ink);
  color: white;
  font-family: var(--ab-mono);
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.ab-story-title {
  margin: 0;
  font-size: clamp(1.9rem, 3.4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.045em;
  color: var(--ab-ink);
}

.ab-story-divider {
  width: 65px;
  height: 4px;
  margin: 1.2rem 0;
  border-radius: 5px;
  background: var(--ab-ink);
}

.ab-story-text {
  max-width: 75ch;
  margin: 0;
  color: #211824;
  font-size: 25px;
  font-weight: 500;
  line-height: 1.7;
  letter-spacing: -0.015em;
}

/* Reveal animation */
.ab-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.ab-reveal[data-shown="true"] {
  opacity: 1;
  transform: translateY(0);
}

/* Decorative animation */
@keyframes ab-rotate {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 900px) {
  .ab-story {
    grid-template-columns: 75px minmax(0, 1fr);
    gap: 1.3rem;
  }

  .ab-story-icon {
    width: 72px;
    height: 72px;
    border-radius: 17px;
  }

  .ab-story-icon svg {
    width: 35px;
    height: 35px;
  }

  .ab-story-text {
    font-size: 21px;
  }
}

@media (max-width: 640px) {
  .ab-root {
    padding-top: 3.5rem;
  }

  .ab-shell {
    padding: 1rem;
    border-radius: 24px;
    box-shadow: 7px 7px 0 var(--ab-pink);
  }

  .ab-head {
    padding: 1.6rem;
    margin-bottom: 2.2rem;
    border-radius: 18px;
    box-shadow: 5px 5px 0 var(--ab-yellow);
  }

  .ab-title {
    font-size: clamp(2.5rem, 10vw, 3.8rem);
  }

  .ab-header-bottom {
    margin-top: 0.7rem;
  }

  .ab-header-note {
    font-size: 0.63rem;
  }

  .ab-header-decoration {
    width: 36px;
    height: 36px;
  }

  .ab-header-decoration svg {
    width: 19px;
    height: 19px;
  }

  .ab-intro {
    gap: 0.6rem;
    margin-bottom: 1.5rem;
  }

  .ab-intro-number {
    width: 46px;
    height: 46px;
    border-radius: 13px;
    font-size: 1.45rem;
  }

  .ab-intro-label {
    padding: 0.4rem 0.6rem;
    font-size: 0.61rem;
  }

  .ab-article {
    gap: 1.3rem;
  }

  .ab-story {
    grid-template-columns: 1fr;
    gap: 1.1rem;
    padding: 1.3rem;
    border-radius: 18px;
    box-shadow: 4px 4px 0 var(--ab-ink);
  }

  .ab-story-icon {
    position: static;
    width: 58px;
    height: 58px;
    border-radius: 14px;
    box-shadow: 3px 3px 0 var(--ab-ink);
  }

  .ab-story-icon svg {
    width: 30px;
    height: 30px;
  }

  .ab-story-title {
    font-size: 1.7rem;
  }

  .ab-story-divider {
    margin: 0.9rem 0;
    width: 48px;
  }

  .ab-story-text {
    font-size: 18px;
    line-height: 1.75;
  }

  .ab-story-meta {
    margin-bottom: 0.75rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .ab-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .ab-story,
  .ab-story-icon {
    transition: none;
  }

  .ab-header-decoration {
    animation: none;
  }
}
`;

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2.5" y="3.5" width="19" height="17" rx="2.5" />
    <path d="M2.5 8h19" />
    <path d="m9 12-3 2.5 3 2.5" />
    <path d="m15 12 3 2.5-3 2.5" />
  </svg>
);

const DevOpsIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h10a3 3 0 0 1 3 3v1" />
    <path d="m14 4 3 3-3 3" />
    <path d="M20 17H10a3 3 0 0 1-3-3v-1" />
    <path d="m10 20-3-3 3-3" />
    <circle cx="4" cy="7" r="1.5" />
    <circle cx="20" cy="17" r="1.5" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
    <path d="m9 12 2 2 4-4" />
    <path d="M12 7v1" />
  </svg>
);

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 2 1.8 7.2L21 12l-7.2 1.8L12 21l-1.8-7.2L3 12l7.2-2.8L12 2Z" />
    <path d="m19 14 1 3 2 1-2 1-1 3-1-3-2-1 2-1 1-3Z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="ab-reveal"
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Article content                                                     */
/* ------------------------------------------------------------------ */

const STORIES = [
  {
    number: "01",
    tag: "The Foundation",
    title: "Where It All Started",
    Icon: CodeIcon,
    text:
      "My journey started with web development, working with technologies such as React, Node.js, Express, and MongoDB to build web applications. As I gained experience, I became increasingly curious about what happens beyond the application itself — how systems operate behind the scenes, how applications are deployed, and how everything works together.",
  },
  {
    number: "02",
    tag: "The Exploration",
    title: "Discovering DevOps",
    Icon: DevOpsIcon,
    text:
      "This curiosity led me to explore DevOps, particularly CI/CD, automation, and infrastructure.",
  },
  {
    number: "03",
    tag: "The Next Dimension",
    title: "Understanding Reliability",
    Icon: ShieldIcon,
    text:
      "As I progressed through my engineering studies, I also discovered Site Reliability Engineering (SRE) and the importance of building and maintaining reliable systems. Today, I am focusing on developing my skills in DevOps and SRE, while building on my foundation in software development.",
  },
];

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

const About = () => {
  return (
    <section
      className="ab-root"
      id="about-me"
      aria-labelledby="ab-title"
    >
      <style>{STYLES}</style>

      <div className="ab-shell">
        <Reveal>
          <header className="ab-head">
            <span className="ab-eyebrow">About me / 01</span>

            <h2 className="ab-title" id="ab-title">
              Beyond{" "}
              <span className="ab-title-mark">
                Web Development
              </span>
            </h2>

            <div className="ab-header-bottom">
              <span className="ab-header-note">
                Software · Systems · Reliability
              </span>

              <span className="ab-header-decoration" aria-hidden="true">
                <SparkIcon />
              </span>
            </div>
          </header>
        </Reveal>

        <Reveal delay={100}>
          <div className="ab-intro">
            <span className="ab-intro-number">01</span>
            <span className="ab-intro-line" aria-hidden="true" />
            <span className="ab-intro-label">
              Professional Direction
            </span>
          </div>
        </Reveal>

        <div className="ab-article">
          {STORIES.map(({ number, tag, title, Icon, text }, index) => (
            <Reveal key={number} delay={160 + index * 140}>
              <article className="ab-story">
                <div className="ab-story-icon">
                  <Icon />
                </div>

                <div className="ab-story-content">
                  <div className="ab-story-meta">
                    <span className="ab-story-number">
                      CHAPTER {number}
                    </span>
                    <span className="ab-story-tag">{tag}</span>
                  </div>

                  <h3 className="ab-story-title">{title}</h3>

                  <div
                    className="ab-story-divider"
                    aria-hidden="true"
                  />

                  <p className="ab-story-text">{text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
