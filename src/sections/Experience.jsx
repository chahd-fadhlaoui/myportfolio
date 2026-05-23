import { useState } from 'react';

/* ─── hardcoded experience data (updated from CV) ───── */
const experiences = [
  {
    id: 0,
    company: "Evast'in",
    logo: '/assets/evastin.svg',        /* swap to your real asset path */
    role: 'Full-Stack Developer (Internship)',
    period: '03/03/2025 – 17/06/2025',
    location: 'Ariana & Tunis',
    accent: '#7c3de8',                 /* purple */
    accentAlpha: 'rgba(124,61,232,',
    description:
      'Designed and developed a web platform for animal adoption and veterinary appointment booking. Architected a Full-Stack application using React, Node.js, and Express. Implemented a secure multi-role authentication system. Designed and managed a MongoDB database. Enhanced the user interface by building a responsive and intuitive experience. Tested and optimized application performance and reliability.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Auth', 'Full-Stack'],
  },
  {
    id: 1,
    company: 'Reference Print',
    logo: '/assets/reference-print.svg',
    role: 'Developer (Internship)',
    period: '01/2024 – 02/2024',
    location: 'Manzah 9',
    accent: '#0fc4a0',                 /* turquoise */
    accentAlpha: 'rgba(15,196,160,',
    description:
      'Developed a digital printing web platform using the MERN stack (React, Node.js, Express, MongoDB). Implemented user interfaces and back-end APIs, ensuring complete integration of the full-stack system.',
    tags: ['MERN', 'React', 'Node.js', 'Express', 'MongoDB', 'API'],
  },
  {
    id: 2,
    company: 'Taoufik Hospitals Group',
    logo: '/assets/taoufik.svg',
    role: 'IT Internship',
    period: '01/2023 – 02/2023',
    location: 'Les Berges du Lac 2',
    accent: '#b47dff',                 /* lavender */
    accentAlpha: 'rgba(180,125,255,',
    description:
      'Discovered the server room environment and the principles of IT infrastructure management. Observed and understood the basics of computer networking (networking, equipment, architecture).',
    tags: ['IT Infrastructure', 'Networking', 'Server Management'],
  },
];

/* ─── tiny helpers ───────────────────────────────────── */
const Tag = ({ label, accent, accentAlpha }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '999px',
      fontSize: '0.72rem',
      fontWeight: 600,
      letterSpacing: '0.06em',
      background: `${accentAlpha}0.10)`,
      border: `1px solid ${accentAlpha}0.30)`,
      color: accent,
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </span>
);

/* ─── main component ─────────────────────────────────── */
const Experience = () => {
  const [active, setActive] = useState(0);
  const current = experiences[active];

  return (
    <section className="c-space my-20" id="work">
      <p className="head-text">My Work Experience</p>

      {/* gradient underline */}
      <div
        style={{
          width: 64, height: 3,
          background: 'linear-gradient(90deg, var(--pink), var(--teal))',
          borderRadius: 2,
          margin: '0.75rem 0 2.5rem',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT: tab list ───────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {experiences.map((exp) => {
            const isActive = exp.id === active;
            return (
              <button
                key={exp.id}
                onClick={() => setActive(exp.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  borderRadius: '14px',
                  border: `1px solid ${isActive ? `${exp.accentAlpha}0.40)` : 'var(--border-card)'}`,
                  background: isActive
                    ? `${exp.accentAlpha}0.08)`
                    : 'var(--bg-card)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive
                    ? `0 4px 20px ${exp.accentAlpha}0.18)`
                    : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* left accent bar */}
                <span
                  style={{
                    position: 'absolute',
                    left: 0, top: '20%', bottom: '20%',
                    width: 3,
                    borderRadius: '0 3px 3px 0',
                    background: isActive ? exp.accent : 'transparent',
                    transition: 'background 0.25s ease',
                  }}
                />

                {/* logo circle */}
                <span
                  style={{
                    width: 44, height: 44, minWidth: 44,
                    borderRadius: '12px',
                    background: isActive
                      ? `${exp.accentAlpha}0.15)`
                      : 'var(--bg-surface, rgba(80,40,140,0.06))',
                    border: `1px solid ${isActive ? `${exp.accentAlpha}0.30)` : 'var(--border-card)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    style={{ width: 26, height: 26, objectFit: 'contain' }}
                    onError={(e) => {
                      /* fallback: show first letter if logo 404 */
                      e.target.style.display = 'none';
                      e.target.parentNode.textContent = exp.company[0];
                      e.target.parentNode.style.fontSize = '1.1rem';
                      e.target.parentNode.style.fontWeight = '700';
                      e.target.parentNode.style.color = exp.accent;
                    }}
                  />
                </span>

                <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: isActive ? exp.accent : 'var(--headtext-color)',
                      transition: 'color 0.25s',
                    }}
                  >
                    {exp.company}
                  </span>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {exp.role}
                  </span>
                  <span
                    style={{
                      fontSize: '0.70rem',
                      color: 'var(--color-text-faint)',
                      fontWeight: 400,
                      marginTop: 2,
                    }}
                  >
                    {exp.location}
                  </span>
                </span>

                {/* period — pushed right */}
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '0.72rem',
                    color: isActive ? exp.accent : 'var(--color-text-faint)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    transition: 'color 0.25s',
                  }}
                >
                  {exp.period}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── RIGHT: detail card ───────────────────────── */}
        <div
          key={current.id}               /* remount → CSS animation replays */
          style={{
            padding: '2rem',
            borderRadius: '20px',
            border: `1px solid ${current.accentAlpha}0.28)`,
            background: `${current.accentAlpha}0.05)`,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: `0 8px 32px ${current.accentAlpha}0.14)`,
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeSlideIn 0.35s ease forwards',
          }}
        >
          {/* decorative corner glow */}
          <span
            style={{
              position: 'absolute',
              top: -60, right: -60,
              width: 180, height: 180,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${current.accentAlpha}0.18), transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
            {/* big logo */}
            <span
              style={{
                width: 56, height: 56, minWidth: 56,
                borderRadius: '16px',
                background: `${current.accentAlpha}0.12)`,
                border: `1px solid ${current.accentAlpha}0.32)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={current.logo}
                alt={current.company}
                style={{ width: 34, height: 34, objectFit: 'contain' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.textContent = current.company[0];
                  e.target.parentNode.style.fontSize = '1.4rem';
                  e.target.parentNode.style.fontWeight = '700';
                  e.target.parentNode.style.color = current.accent;
                }}
              />
            </span>

            <span>
              <p
                style={{
                  fontFamily: 'inherit',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--headtext-color)',
                  lineHeight: 1.2,
                }}
              >
                {current.company}
              </p>
              <p
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: current.accent,
                  marginTop: 3,
                }}
              >
                {current.role}
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-faint)',
                  marginTop: 3,
                }}
              >
                {current.location}
              </p>
            </span>

            {/* period badge */}
            <span
              style={{
                marginLeft: 'auto',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: `${current.accentAlpha}0.12)`,
                border: `1px solid ${current.accentAlpha}0.30)`,
                color: current.accent,
                whiteSpace: 'nowrap',
                alignSelf: 'flex-start',
              }}
            >
              {current.period}
            </span>
          </div>

          {/* divider */}
          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, ${current.accent}, transparent)`,
              opacity: 0.25,
              marginBottom: '1.25rem',
            }}
          />

          {/* description */}
          <p
            style={{
              fontSize: '0.93rem',
              lineHeight: 1.75,
              color: 'var(--exp-desc-color, var(--color-text-muted))',
              marginBottom: '1.5rem',
            }}
          >
            {current.description}
          </p>

          {/* tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {current.tags.map((t) => (
              <Tag
                key={t}
                label={t}
                accent={current.accent}
                accentAlpha={current.accentAlpha}
              />
            ))}
          </div>
        </div>
      </div>

      {/* keyframe for card entrance */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  );
};

export default Experience;