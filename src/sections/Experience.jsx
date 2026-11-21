import { useState } from 'react';

/* ─── hardcoded experience data (updated from CV) ───── */
/* `tone` maps to the .exp-tone-* classes in index.css, so each accent
   is theme-aware (readable in both dark and light mode). */
const experiences = [
  {
    id: 0,
    company: "Evast'in",
    logo: '/assets/evastin.svg',        /* swap to your real asset path */
    role: 'Full-Stack Developer (Internship)',
    period: '03/03/2025 – 17/06/2025',
    location: 'Ariana & Tunis',
    tone: 'violet',
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
    tone: 'teal',
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
    tone: 'lilac',
    description:
      'Discovered the server room environment and the principles of IT infrastructure management. Observed and understood the basics of computer networking (networking, equipment, architecture).',
    tags: ['IT Infrastructure', 'Networking', 'Server Management'],
  },
];

/* fallback: show first letter if a logo 404s */
const logoFallback = (company) => (e) => {
  e.target.style.display = 'none';
  e.target.parentNode.textContent = company[0];
  e.target.parentNode.style.fontSize = '1.1rem';
  e.target.parentNode.style.fontWeight = '700';
  e.target.parentNode.style.color = 'var(--acc)';
};

/* ─── main component ─────────────────────────────────── */
const Experience = () => {
  const [active, setActive] = useState(0);
  const current = experiences[active];

  return (
    <section className="c-space my-20" id="work">
      <p className="head-text">My Work Experience</p>
      <div className="head-rule" style={{ marginBottom: '2.5rem' }} />

      <div className="exp-grid">
        {/* ── LEFT: tab list ───────────────────────────── */}
        <div className="exp-list" role="list">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              type="button"
              role="listitem"
              aria-pressed={exp.id === active}
              onClick={() => setActive(exp.id)}
              className={`exp-tab exp-tone-${exp.tone}`}
            >
              <span className="exp-logo">
                <img src={exp.logo} alt={exp.company} onError={logoFallback(exp.company)} />
              </span>

              <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span className="exp-company">{exp.company}</span>
                <span className="exp-role">{exp.role}</span>
                <span className="exp-meta">{exp.location}</span>
              </span>

              <span className="exp-period">{exp.period}</span>
            </button>
          ))}
        </div>

        {/* ── RIGHT: detail card ───────────────────────── */}
        <article
          key={current.id}               /* remount → CSS animation replays */
          className={`exp-card exp-tone-${current.tone}`}
        >
          <div className="exp-card-head">
            <span className="exp-logo exp-card-logo">
              <img src={current.logo} alt={current.company} onError={logoFallback(current.company)} />
            </span>

            <div>
              <p className="exp-card-company">{current.company}</p>
              <p className="exp-card-role">{current.role}</p>
              <p className="exp-meta">{current.location}</p>
            </div>

            <span className="exp-card-badge">{current.period}</span>
          </div>

          <div className="exp-divider" />

          <p className="exp-desc">{current.description}</p>

          <div className="exp-tags">
            {current.tags.map((t) => (
              <span key={t} className="exp-tag">{t}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default Experience;