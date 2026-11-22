import { useEffect, useRef } from 'react';

/**
 * StarField
 * Drop once inside your App (before <header>). All colours are set via
 * CSS variables defined in index.css, so they flip automatically when
 * ThemeToggle switches html.dark ↔ html.light — no JS changes needed.
 *
 * Usage in App.jsx (or wherever your root layout lives):
 *   import StarField from './components/StarField';
 *   ...
 *   <StarField />
 *   <Navbar />
 *   ...
 */
const StarField = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = [];

    /* ── Twinkling dots ─────────────────────────────────
       [left%, top%, sizePx, durSec, delaySec, extraClass] */
    const dots = [
      [8,  12, 2,   3.0, 0,    ''],
      [18, 58, 1.5, 4.2, 0.6,  'accent1'],
      [27, 7,  2.5, 3.8, 1.3,  'accent2'],
      [38, 80, 1,   2.4, 0.2,  ''],
      [50, 35, 2,   5.1, 1.9,  'accent1'],
      [61, 62, 1.5, 3.6, 0.8,  'accent2'],
      [70, 18, 1,   4.8, 0.4,  ''],
      [78, 75, 2,   3.1, 1.5,  'accent1'],
      [87, 44, 1.5, 2.9, 0.7,  'accent2'],
      [94, 88, 1,   4.0, 1.2,  ''],
      [4,  50, 1.5, 5.5, 2.1,  'accent1'],
      [14, 30, 2,   3.3, 0.3,  ''],
      [33, 68, 1,   4.5, 1.0,  'accent2'],
      [55, 22, 2,   2.7, 0.5,  ''],
      [66, 90, 1.5, 3.9, 1.7,  'accent1'],
      [82, 10, 1,   5.0, 0.1,  'accent2'],
      [46, 55, 2,   3.5, 2.3,  ''],
      [23, 42, 1,   6.0, 1.8,  'accent1'],
      [90, 30, 1.5, 4.3, 0.9,  'accent2'],
      [73, 82, 2,   2.6, 1.4,  ''],
    ];

    dots.forEach(([x, y, size, dur, delay, cls]) => {
      const s = document.createElement('div');
      s.className = `star${cls ? ' ' + cls : ''}`;
      s.style.cssText =
        `left:${x}%;top:${y}%;width:${size}px;height:${size}px;` +
        `--dur:${dur}s;--delay:${delay}s;animation-delay:${delay}s;`;
      el.appendChild(s);
      nodes.push(s);
    });

    /* ── Sparkle crosses ────────────────────────────────
       [left%, top%, sizePx, durSec, delaySec] */
    const crosses = [
      [15, 20, 14, 5.2, 0.4 ],
      [40, 10, 10, 6.8, 1.9 ],
      [68, 65, 12, 4.6, 0.2 ],
      [83, 28, 8,  7.2, 2.6 ],
      [28, 85, 16, 5.7, 1.1 ],
      [58, 42, 10, 6.3, 0.7 ],
      [6,  72, 12, 4.9, 2.0 ],
    ];

    crosses.forEach(([x, y, size, dur, delay]) => {
      const sp = document.createElement('div');
      sp.className = 'sparkle';
      sp.style.cssText =
        `left:${x}%;top:${y}%;width:${size}px;height:${size}px;` +
        `--size:${size}px;--dur:${dur}s;--delay:${delay}s;animation-delay:${delay}s;`;
      el.appendChild(sp);
      nodes.push(sp);
    });

    return () => nodes.forEach(n => n.remove());
  }, []);

  return (
    <>
      {/* Blurred floating orbs — colour via --orb1/2/3 CSS vars */}
      <div className="orb orb-1" style={{ '--dur': '14s', '--delay': '0s'   }} />
      <div className="orb orb-2" style={{ '--dur': '10s', '--delay': '3s'   }} />
      <div className="orb orb-3" style={{ '--dur': '16s', '--delay': '1.5s' }} />

      {/* Star dots + sparkles container */}
      <div ref={ref} className="star-field" aria-hidden="true" />
    </>
  );
};

export default StarField;