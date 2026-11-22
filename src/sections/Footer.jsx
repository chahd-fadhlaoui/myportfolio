import { navLinks } from "../constants/index.js";

/* Update these with your real links */
const CTA_HREF = "#contact";
const CTA_LABEL = "Let's talk";
const GITHUB_URL = "https://github.com/";
const LINKEDIN_URL = "https://www.linkedin.com/";
const TERMS_HREF = "/terms";
const PRIVACY_HREF = "/privacy";

const pad = (i) => String(i + 1).padStart(2, "0");

const Arrow = ({ up = false }) => (
  <svg
    className="nf-arrow"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={up ? { transform: "rotate(-90deg)" } : undefined}
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="nf" aria-label="Footer">
      <style>{`
        /* ---------- Theme tokens (same palette as the navbar) ---------- */
        .nf {
          --nf-fg: #f4eaf0;
          --nf-muted: rgba(244, 234, 240, 0.62);
          --nf-accent: #ffb6d5;
          --nf-line: rgba(255, 182, 213, 0.16);
          --nf-hover: rgba(255, 255, 255, 0.07);
          --nf-mark-from: #ffc9de;
          --nf-mark-to: #f4a6c3;
          --nf-mark-fg: #2a0f24;
          --nf-cta-bg: #ffb6d5;
          --nf-cta-fg: #2a0f24;
        }

        html.light .nf {
          --nf-fg: #3a1030;
          --nf-muted: rgba(58, 16, 48, 0.66);
          --nf-accent: #c9487f;
          --nf-line: rgba(214, 92, 148, 0.26);
          --nf-hover: rgba(58, 16, 48, 0.06);
          --nf-mark-from: #ff7eb6;
          --nf-mark-to: #c9487f;
          --nf-mark-fg: #ffffff;
          --nf-cta-bg: #c9487f;
          --nf-cta-fg: #ffffff;
        }

        .nf {
          position: relative;
          color: var(--nf-fg);
          padding: 4rem clamp(1.25rem, 5vw, 2rem) 1.5rem;
        }

        .nf::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--nf-accent), transparent);
          opacity: 0.55;
        }

        .nf-inner {
          max-width: 80rem;
          margin: 0 auto;
        }

        /* ---------- Top: statement + CTA ---------- */
        .nf-top {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid var(--nf-line);
        }

        @media (min-width: 768px) {
          .nf-top {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .nf-eyebrow {
          margin: 0 0 0.75rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--nf-accent);
        }

        .nf-title {
          margin: 0;
          max-width: 18ch;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.02em;
        }

        .nf-title em {
          font-style: normal;
          color: var(--nf-accent);
        }

        .nf-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: fit-content;
          padding: 0.85rem 1.4rem;
          border-radius: 999px;
          font-size: 1rem;
          font-weight: 600;
          color: var(--nf-cta-fg);
          background: var(--nf-cta-bg);
          text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .nf-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px -8px var(--nf-cta-bg);
        }

        .nf-arrow {
          transition: transform 0.25s ease;
        }

        .nf-cta:hover .nf-arrow {
          transform: translateX(3px);
        }

        /* ---------- Middle: brand / nav / socials ---------- */
        .nf-mid {
          display: grid;
          gap: 2.5rem;
          padding: 3rem 0;
          grid-template-columns: 1fr;
        }

        @media (min-width: 768px) {
          .nf-mid {
            grid-template-columns: 1.4fr 1fr 1fr;
          }
        }

        .nf-brand {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          color: var(--nf-fg);
          text-decoration: none;
        }

        .nf-mark {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border-radius: 11px;
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--nf-mark-fg);
          background: linear-gradient(135deg, var(--nf-mark-from), var(--nf-mark-to));
        }

        .nf-word {
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .nf-about {
          margin: 1rem 0 0;
          max-width: 28rem;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--nf-muted);
        }

        .nf-heading {
          margin: 0 0 1rem;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--nf-muted);
        }

        .nf-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .nf-link {
          display: inline-flex;
          align-items: baseline;
          gap: 0.6rem;
          padding: 0.2rem 0;
          font-size: 0.98rem;
          font-weight: 500;
          color: var(--nf-muted);
          text-decoration: none;
          transition: color 0.2s ease, transform 0.3s ease;
        }

        .nf-link:hover {
          color: var(--nf-fg);
          transform: translateX(4px);
        }

        .nf-num {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.65rem;
          color: var(--nf-accent);
          opacity: 0.7;
        }

        .nf-socials {
          display: flex;
          gap: 0.6rem;
        }

        .nf-social {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          color: var(--nf-fg);
          border: 1px solid var(--nf-line);
          text-decoration: none;
          transition: color 0.2s ease, background 0.2s ease, transform 0.25s ease, border-color 0.2s ease;
        }

        .nf-social:hover {
          color: var(--nf-accent);
          background: var(--nf-hover);
          border-color: var(--nf-accent);
          transform: translateY(-3px);
        }

        /* ---------- Bottom bar ---------- */
        .nf-bottom {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--nf-line);
          font-size: 0.85rem;
          color: var(--nf-muted);
        }

        .nf-legal {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nf-legal a {
          color: var(--nf-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .nf-legal a:hover {
          color: var(--nf-fg);
        }

        .nf-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.9rem;
          border: 1px solid var(--nf-line);
          border-radius: 999px;
          background: transparent;
          color: var(--nf-fg);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .nf-top-btn:hover {
          background: var(--nf-hover);
          border-color: var(--nf-accent);
        }

        .nf a:focus-visible,
        .nf button:focus-visible {
          outline: 2px solid var(--nf-accent);
          outline-offset: 3px;
          border-radius: 10px;
        }

        @media (prefers-reduced-motion: reduce) {
          .nf *,
          .nf *::before {
            transition: none !important;
          }
        }
      `}</style>

      <div className="nf-inner">
        {/* TOP */}
        <div className="nf-top">
          <div>
            <p className="nf-eyebrow">Available for work</p>
            <h2 className="nf-title">
              Let's build something <em>great</em> together.
            </h2>
          </div>

          <a href={CTA_HREF} className="nf-cta">
            {CTA_LABEL}
            <Arrow />
          </a>
        </div>

        {/* MIDDLE */}
        <div className="nf-mid">
          <div>
            <a href="/" className="nf-brand" aria-label="Home">
              <span className="nf-mark" aria-hidden="true">c</span>
              <span className="nf-word">chahd</span>
            </a>
            <p className="nf-about">
              Software engineering student focused on full-stack development,
              DevOps and SRE.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="nf-heading">Navigate</h3>
            <ul className="nf-list">
              {navLinks.map((item, i) => (
                <li key={item.id}>
                  <a href={item.href} className="nf-link">
                    <span className="nf-num" aria-hidden="true">{pad(i)}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="nf-heading">Find me</h3>
            <div className="nf-socials">
              <a
                href={GITHUB_URL}
                className="nf-social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
              <a
                href={LINKEDIN_URL}
                className="nf-social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="nf-bottom">
          <p style={{ margin: 0 }}>© {year} chahd fdh. All rights reserved.</p>

          <div className="nf-legal">
            <a href={TERMS_HREF}>Terms &amp; Conditions</a>
            <span aria-hidden="true">|</span>
            <a href={PRIVACY_HREF}>Privacy Policy</a>
          </div>

          <button
            type="button"
            className="nf-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
            <Arrow up />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;