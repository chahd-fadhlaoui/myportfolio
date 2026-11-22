import { useEffect, useRef, useState } from "react";
import { navLinks } from "../constants/index.js";
import ThemeToggle from "../components/ThemeToggle";

/* Change these two if your contact section/label is different */
const CTA_HREF = "#contact";
const CTA_LABEL = "Let's talk";

const pad = (i) => String(i + 1).padStart(2, "0");

const Arrow = () => (
  <svg
    className="nb-arrow"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState("");
  const progressRef = useRef(null);

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  /* Scroll: hide on down, show on up, shrink + progress line */
  useEffect(() => {
    let last = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 16);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${
          max > 0 ? Math.min(1, y / max) : 0
        })`;
      }

      if (y < 80) setIsVisible(true);
      else if (y > last + 5) setIsVisible(false);
      else if (y < last - 5) setIsVisible(true);

      last = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section */
  useEffect(() => {
    const ids = navLinks
      .map((l) => l.href)
      .filter((h) => typeof h === "string" && h.startsWith("#") && h.length > 1)
      .map((h) => h.slice(1));

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Mobile menu: lock scroll, Escape to close, close when resized to desktop */
  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    const onResize = () => window.innerWidth >= 768 && setIsOpen(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  const isActive = (href) => !!active && href === `#${active}`;

  return (
    <>
      <style>{`
        /* ---------- Theme tokens ---------- */
        .nb-bar,
        .nb-overlay {
          --nb-fg: #f4eaf0;
          --nb-muted: rgba(244, 234, 240, 0.66);
          --nb-accent: #ffb6d5;
          --nb-bar-bg: rgba(36, 31, 46, 0.72);
          --nb-line: rgba(255, 182, 213, 0.16);
          --nb-overlay: rgba(26, 12, 30, 0.97);
          --nb-hover: rgba(255, 255, 255, 0.07);
          --nb-mark-from: #ffc9de;
          --nb-mark-to: #f4a6c3;
          --nb-mark-fg: #2a0f24;
          --nb-cta-bg: #ffb6d5;
          --nb-cta-fg: #2a0f24;
        }

        html.light .nb-bar,
        html.light .nb-overlay {
          --nb-fg: #3a1030;
          --nb-muted: rgba(58, 16, 48, 0.66);
          --nb-accent: #c9487f;
          --nb-bar-bg: rgba(255, 233, 241, 0.78);
          --nb-line: rgba(214, 92, 148, 0.26);
          --nb-overlay: rgba(255, 233, 241, 0.98);
          --nb-hover: rgba(58, 16, 48, 0.06);
          --nb-mark-from: #ff7eb6;
          --nb-mark-to: #c9487f;
          --nb-mark-fg: #ffffff;
          --nb-cta-bg: #c9487f;
          --nb-cta-fg: #ffffff;
        }

        /* ---------- Bar ---------- */
        .nb-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          color: var(--nb-fg);
          border-bottom: 1px solid transparent;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            background 0.3s ease, border-color 0.3s ease;
        }

        .nb-bar[data-hidden="true"] {
          transform: translateY(-100%);
        }

        .nb-bar[data-scrolled="true"] {
          background: var(--nb-bar-bg);
          border-bottom-color: var(--nb-line);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
        }

        .nb-bar[data-open="true"] {
          background: transparent;
          border-bottom-color: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .nb-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 80rem;
          height: 72px;
          margin: 0 auto;
          padding: 0 1.25rem;
          transition: height 0.3s ease;
        }

        .nb-bar[data-scrolled="true"] .nb-inner {
          height: 60px;
        }

        @media (min-width: 768px) {
          .nb-inner {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            padding: 0 2rem;
          }
        }

        .nb-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 2px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .nb-bar[data-scrolled="true"] .nb-progress {
          opacity: 1;
        }

        .nb-progress i {
          display: block;
          height: 100%;
          transform: scaleX(0);
          transform-origin: left;
          background: linear-gradient(90deg, var(--nb-mark-from), var(--nb-accent));
        }

        /* ---------- Brand ---------- */
        .nb-brand {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          justify-self: start;
          color: var(--nb-fg);
          text-decoration: none;
        }

        .nb-mark {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border-radius: 11px;
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--nb-mark-fg);
          background: linear-gradient(135deg, var(--nb-mark-from), var(--nb-mark-to));
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nb-brand:hover .nb-mark {
          transform: rotate(-8deg) scale(1.06);
        }

        .nb-word {
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        /* ---------- Desktop links ---------- */
        .nb-desktop {
          display: none;
        }

        @media (min-width: 768px) {
          .nb-desktop {
            display: block;
          }
        }

        .nb-list {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nb-link {
          position: relative;
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          padding: 0.55rem 0.9rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--nb-muted);
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .nb-num {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--nb-accent);
          opacity: 0.8;
          transition: opacity 0.25s ease;
        }

        .nb-link::after {
          content: "";
          position: absolute;
          left: 0.9rem;
          right: 0.9rem;
          bottom: 0.2rem;
          height: 2px;
          border-radius: 2px;
          background: var(--nb-accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nb-link:hover,
        .nb-link[data-active="true"] {
          color: var(--nb-fg);
        }

        .nb-link:hover .nb-num,
        .nb-link[data-active="true"] .nb-num {
          opacity: 1;
        }

        .nb-link:hover::after,
        .nb-link[data-active="true"]::after {
          transform: scaleX(1);
        }

        /* ---------- Right side ---------- */
        .nb-actions {
          display: flex;
          align-items: center;
          justify-self: end;
          gap: 0.6rem;
        }

        .nb-cta {
          display: none;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.1rem;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--nb-cta-fg);
          background: var(--nb-cta-bg);
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        @media (min-width: 768px) {
          .nb-cta {
            display: inline-flex;
          }
        }

        .nb-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 22px -6px var(--nb-cta-bg);
        }

        .nb-arrow {
          transition: transform 0.25s ease;
        }

        .nb-cta:hover .nb-arrow {
          transform: translateX(3px);
        }

        .nb-bar a:focus-visible,
        .nb-bar button:focus-visible,
        .nb-overlay a:focus-visible {
          outline: 2px solid var(--nb-accent);
          outline-offset: 3px;
          border-radius: 10px;
        }

        /* ---------- Burger (two lines -> X) ---------- */
        .nb-burger {
          position: relative;
          width: 44px;
          height: 44px;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: var(--nb-fg);
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .nb-burger:hover {
          background: var(--nb-hover);
        }

        @media (min-width: 768px) {
          .nb-burger {
            display: none;
          }
        }

        .nb-burger span {
          position: absolute;
          left: 11px;
          right: 11px;
          height: 2px;
          border-radius: 2px;
          background: currentColor;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nb-burger span:nth-child(1) { top: 17px; }
        .nb-burger span:nth-child(2) { top: 25px; }

        .nb-burger[aria-expanded="true"] span:nth-child(1) {
          top: 21px;
          transform: rotate(45deg);
        }

        .nb-burger[aria-expanded="true"] span:nth-child(2) {
          top: 21px;
          transform: rotate(-45deg);
        }

        /* ---------- Fullscreen mobile menu ---------- */
        .nb-overlay {
          position: fixed;
          inset: 0;
          z-index: 40;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 6rem clamp(1.5rem, 7vw, 3rem) 2.5rem;
          color: var(--nb-fg);
          background: var(--nb-overlay);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          clip-path: circle(0px at calc(100% - 2.6rem) 2.25rem);
          visibility: hidden;
          transition: clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1),
            visibility 0s linear 0.7s;
        }

        .nb-overlay[data-open="true"] {
          clip-path: circle(150vmax at calc(100% - 2.6rem) 2.25rem);
          visibility: visible;
          transition: clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1),
            visibility 0s;
        }

        .nb-ov-list {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nb-ov-item,
        .nb-ov-foot {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .nb-overlay[data-open="true"] .nb-ov-item,
        .nb-overlay[data-open="true"] .nb-ov-foot {
          opacity: 1;
          transform: none;
          transition: opacity 0.6s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: calc(0.3s + var(--i) * 0.07s);
        }

        .nb-ov-link {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--nb-line);
          font-size: clamp(2rem, 9vw, 3.25rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--nb-fg);
          text-decoration: none;
          transition: color 0.2s ease, padding-left 0.3s ease;
        }

        .nb-ov-link:hover,
        .nb-ov-link[data-active="true"] {
          color: var(--nb-accent);
          padding-left: 0.4rem;
        }

        .nb-ov-link .nb-num {
          font-size: 1.1rem;
          opacity: 1;
        }

        .nb-ov-foot {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }

        .nb-ov-foot .nb-cta {
          display: inline-flex;
          justify-content: center;
          padding: 0.9rem 1.2rem;
          font-size: 1rem;
        }

        .nb-ov-foot p {
          margin: 0;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--nb-muted);
          text-align: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .nb-bar,
          .nb-inner,
          .nb-overlay,
          .nb-ov-item,
          .nb-ov-foot,
          .nb-burger span,
          .nb-link,
          .nb-link::after {
            transition: none !important;
          }
        }
      `}</style>

      <header
        className="nb-bar"
        data-hidden={!isVisible && !isOpen ? "true" : undefined}
        data-scrolled={isScrolled ? "true" : undefined}
        data-open={isOpen ? "true" : undefined}
      >
        <div className="nb-inner">
          {/* LOGO */}
          <a href="/" className="nb-brand" aria-label="Home">
            <span className="nb-mark" aria-hidden="true">c</span>
            <span className="nb-word">chahd</span>
          </a>

          {/* DESKTOP MENU */}
          <nav className="nb-desktop" aria-label="Primary">
            <ul className="nb-list">
              {navLinks.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="nb-link"
                    data-active={isActive(item.href) ? "true" : undefined}
                    aria-current={isActive(item.href) ? "true" : undefined}
                  >
                    <span className="nb-num" aria-hidden="true">{pad(i)}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT SIDE */}
          <div className="nb-actions">
            <ThemeToggle />

            <a href={CTA_HREF} className="nb-cta">
              {CTA_LABEL}
              <Arrow />
            </a>

            <button
              type="button"
              onClick={toggleMenu}
              className="nb-burger"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="nb-overlay"
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className="nb-progress" aria-hidden="true">
          <i ref={progressRef} />
        </div>
      </header>

      {/* FULLSCREEN MOBILE MENU */}
      <div
        id="nb-overlay"
        className="nb-overlay"
        data-open={isOpen ? "true" : undefined}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Mobile">
          <ul className="nb-ov-list">
            {navLinks.map((item, i) => (
              <li key={item.id} className="nb-ov-item" style={{ "--i": i }}>
                <a
                  href={item.href}
                  className="nb-ov-link"
                  data-active={isActive(item.href) ? "true" : undefined}
                  onClick={closeMenu}
                >
                  <span className="nb-num" aria-hidden="true">{pad(i)}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nb-ov-foot" style={{ "--i": navLinks.length }}>
          <a href={CTA_HREF} className="nb-cta" onClick={closeMenu}>
            {CTA_LABEL}
            <Arrow />
          </a>
          <p>Software Engineering Student</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;