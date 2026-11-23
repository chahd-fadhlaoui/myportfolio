import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Styles                                                             */
/* ------------------------------------------------------------------ */

const STYLES = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=DM+Mono:wght@400;500&display=swap");

.bw-root {
  --bw-paper: #fff8ed;
  --bw-ink: #17121a;
  --bw-pink: #ff82bd;
  --bw-pink-light: #ffc1df;
  --bw-yellow: #ffe45c;
  --bw-mint: #a7efd3;
  --bw-lilac: #d8c8ff;
  --bw-orange: #ffad79;
  --bw-line: 2.5px;
  --bw-pad: clamp(1rem, 3vw, 2.25rem);
  --bw-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --bw-mono: "DM Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  box-sizing: border-box;
  color: var(--bw-ink);
  font-family: var(--bw-display);
}

.bw-root *,
.bw-root *::before,
.bw-root *::after {
  box-sizing: border-box;
}

/* Shell */
.bw-shell {
  position: relative;
  overflow: hidden;
  overflow: clip;
  padding: var(--bw-pad);
  border: var(--bw-line) solid var(--bw-ink);
  border-radius: 36px;
  background-color: var(--bw-paper);
  background-image: radial-gradient(rgba(23, 18, 26, 0.13) 1.2px, transparent 1.2px);
  background-size: 22px 22px;
  box-shadow: 12px 12px 0 var(--bw-pink);
  opacity: 0;
  transform: translateY(32px);
  animation: bw-entrance 0.9s ease-out forwards;
}

@keyframes bw-entrance {
  to {
    opacity: 1;
    transform: none;
  }
}

/* ---------------------------------------------------------------- */
/* Header                                                            */
/* ---------------------------------------------------------------- */

.bw-head {
  position: relative;
  display: grid;
  gap: 1.9rem;
  margin-bottom: 2.6rem;
  padding: clamp(1.35rem, 3.4vw, 2.8rem);
  border: var(--bw-line) solid var(--bw-ink);
  border-radius: 26px;
  background: var(--bw-mint);
  box-shadow: 7px 7px 0 var(--bw-yellow);
}

@media (min-width: 900px) {
  .bw-head {
    grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
    align-items: center;
    gap: 2.6rem;
  }
}

.bw-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--bw-mono);
  font-size: 0.86rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.bw-eyebrow::before {
  content: "";
  width: 28px;
  height: 3px;
  background: var(--bw-ink);
}

.bw-title {
  margin-top: 0.7rem;
  font-size: clamp(2.35rem, 5vw, 4.4rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

.bw-mark {
  display: inline-block;
  padding: 0.02em 0.16em 0.08em;
  border: 2px solid var(--bw-ink);
  border-radius: 10px;
  background: var(--bw-yellow);
  transform: rotate(-1.6deg);
}

.bw-lead {
  max-width: 56ch;
  margin-top: 1.15rem;
  font-size: clamp(1rem, 0.55vw + 0.9rem, 1.14rem);
  line-height: 1.72;
}

.bw-lead strong {
  font-weight: 600;
  background: linear-gradient(transparent 62%, var(--bw-pink-light) 62%);
}

.bw-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.bw-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.42rem 0.8rem;
  border: 2px solid var(--bw-ink);
  border-radius: 999px;
  background: var(--bw-paper);
  box-shadow: 2px 2px 0 var(--bw-ink);
  font-family: var(--bw-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.bw-tag i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--bw-pink);
}

.bw-tag:nth-child(1) i { background: var(--bw-pink); }
.bw-tag:nth-child(2) i { background: #2f9e6f; }
.bw-tag:nth-child(3) i { background: #6c5ce7; }
.bw-tag:nth-child(4) i { background: var(--bw-orange); }

/* ---------------------------------------------------------------- */
/* Orbit panel (animated icon ring)                                  */
/* ---------------------------------------------------------------- */

.bw-orbit {
  --bw-is: clamp(34px, 4.2vw, 46px);
  position: relative;
  height: clamp(245px, 27vw, 330px);
  overflow: hidden;
  border: var(--bw-line) solid var(--bw-ink);
  border-radius: 24px;
  background:
    radial-gradient(circle at 22% 18%, rgba(255, 130, 189, 0.8), transparent 42%),
    radial-gradient(circle at 82% 86%, rgba(255, 228, 92, 0.75), transparent 46%),
    #17121a;
  box-shadow: 6px 6px 0 var(--bw-ink);
  isolation: isolate;
}

.bw-orbit-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  aspect-ratio: 1 / 1;
  border: 1.5px dashed rgba(255, 248, 237, 0.28);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.bw-orbit-ring--outer { height: 74%; }
.bw-orbit-ring--inner { height: 52%; }

.bw-orbit-layer {
  position: absolute;
  inset: 0;
}

.bw-orbit-layer--outer { animation: bw-orbit-cw 44s linear infinite; }
.bw-orbit-layer--inner { animation: bw-orbit-ccw 32s linear infinite; }

.bw-orbit-slot {
  position: absolute;
  inset: 0;
  transform: rotate(var(--bw-a)) translateY(calc(var(--bw-r) * -1));
}

.bw-orbit-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  display: grid;
  place-items: center;
  width: var(--bw-is);
  height: var(--bw-is);
  margin: calc(var(--bw-is) / -2) 0 0 calc(var(--bw-is) / -2);
  border: 2px solid var(--bw-ink);
  border-radius: 50%;
  background: var(--bw-paper);
  box-shadow: 0 3px 0 rgba(23, 18, 26, 0.85);
}

.bw-orbit-layer--outer .bw-orbit-icon { animation: bw-counter-cw 44s linear infinite; }
.bw-orbit-layer--inner .bw-orbit-icon { animation: bw-counter-ccw 32s linear infinite; }

.bw-orbit-icon img {
  width: 58%;
  height: 58%;
  object-fit: contain;
  animation: bw-bob 3.4s ease-in-out infinite;
  animation-delay: var(--bw-d, 0s);
}

.bw-orbit-core {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 3;
  display: grid;
  gap: 0.1rem;
  place-items: center;
  padding: 0.55rem 0.8rem;
  border: 2px solid var(--bw-ink);
  border-radius: 14px;
  background: var(--bw-yellow);
  box-shadow: 3px 3px 0 var(--bw-pink);
  color: var(--bw-ink);
  font-family: var(--bw-mono);
  font-size: 0.62rem;
  line-height: 1.4;
  letter-spacing: 0.1em;
  text-align: center;
  text-transform: uppercase;
  transform: translate(-50%, -50%);
}

.bw-orbit-core b {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.14em;
}

@keyframes bw-orbit-cw {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bw-orbit-ccw {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@keyframes bw-counter-cw {
  from { transform: rotate(calc(var(--bw-a) * -1)); }
  to { transform: rotate(calc(var(--bw-a) * -1 - 360deg)); }
}

@keyframes bw-counter-ccw {
  from { transform: rotate(calc(var(--bw-a) * -1)); }
  to { transform: rotate(calc(var(--bw-a) * -1 + 360deg)); }
}

@keyframes bw-bob {
  0%, 100% { transform: translateY(1.5px); }
  50% { transform: translateY(-1.5px); }
}

/* ---------------------------------------------------------------- */
/* Layout + navigation                                               */
/* ---------------------------------------------------------------- */

.bw-layout {
  display: grid;
  gap: 2rem;
}

@media (min-width: 1280px) {
  .bw-layout {
    grid-template-columns: 230px minmax(0, 1fr);
    gap: 2.5rem;
    align-items: start;
  }
}

.bw-aside {
  display: grid;
  align-content: start;
}

.bw-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 1280px) {
  .bw-aside {
    position: sticky;
    top: 1.5rem;
  }

  .bw-nav {
    display: grid;
    gap: 0.7rem;
  }
}

.bw-nav a {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 0.9rem;
  border: var(--bw-line) solid var(--bw-ink);
  border-radius: 13px;
  background: var(--bw-yellow);
  color: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.bw-nav li:nth-child(2) a { background: var(--bw-lilac); }
.bw-nav li:nth-child(3) a { background: var(--bw-pink-light); }

.bw-nav a span {
  font-family: var(--bw-mono);
  font-size: 0.78rem;
  font-weight: 500;
}

.bw-nav a:hover {
  background: var(--bw-pink);
  transform: translateX(4px);
}

.bw-nav a[aria-current="true"] {
  background: var(--bw-ink);
  color: var(--bw-paper);
}

/* ---------------------------------------------------------------- */
/* Blocks                                                            */
/* ---------------------------------------------------------------- */

.bw-main {
  display: grid;
  gap: 3.2rem;
  min-width: 0;
  container-type: inline-size;
  container-name: bw-main;
}

.bw-block {
  min-width: 0;
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.bw-block[data-shown="true"] {
  opacity: 1;
  transform: none;
}

.bw-block-head {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1.6rem;
}

.bw-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  min-height: 58px;
  padding: 0.35rem;
  border: var(--bw-line) solid var(--bw-ink);
  border-radius: 17px;
  background: var(--bw-yellow);
  box-shadow: 4px 4px 0 var(--bw-pink);
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}

.bw-rule {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: var(--bw-ink);
}

.bw-label {
  padding: 0.5rem 0.85rem;
  border: var(--bw-line) solid var(--bw-ink);
  border-radius: 999px;
  background: var(--bw-pink);
  box-shadow: 3px 3px 0 var(--bw-yellow);
  font-family: var(--bw-mono);
  font-size: 0.76rem;
  font-weight: 500;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
}

.bw-h3 {
  font-size: clamp(1.9rem, 3.2vw, 2.6rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
}

.bw-p {
  max-width: 62ch;
  margin-top: 0.9rem;
  font-size: 1.05rem;
  line-height: 1.72;
  opacity: 0.9;
}

/* Shared animated icon stroke style */
.bw-svg {
  width: 34px;
  height: 34px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.bw-fill { fill: currentColor; stroke: none; }

/* ---------------------------------------------------------------- */
/* 01 — Journey steps                                                */
/* ---------------------------------------------------------------- */

.bw-steps {
  display: grid;
  gap: 1.15rem;
}

@container bw-main (min-width: 760px) {
  .bw-steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.bw-step {
  position: relative;
  display: grid;
  gap: 0.65rem;
  align-content: start;
  min-width: 0;
  padding: 1.25rem;
  border: var(--bw-line) solid var(--bw-ink);
  border-radius: 20px;
  background: #fff;
  box-shadow: 5px 5px 0 var(--bw-ink);
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.bw-step:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 var(--bw-ink);
}

.bw-step:nth-child(1) { background: var(--bw-yellow); }
.bw-step:nth-child(2) { background: var(--bw-pink-light); }
.bw-step:nth-child(3) { background: var(--bw-lilac); }

.bw-step-icon {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border: 2px solid var(--bw-ink);
  border-radius: 16px;
  background: var(--bw-paper);
  box-shadow: 3px 3px 0 var(--bw-ink);
}

.bw-step-kicker {
  font-family: var(--bw-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.75;
}

.bw-step h4 {
  font-size: clamp(1.25rem, 1.7vw, 1.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.025em;
}

.bw-step p {
  font-size: 0.95rem;
  line-height: 1.68;
}

.bw-step-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.2rem;
}

.bw-step-tags span {
  padding: 0.28rem 0.6rem;
  border: 2px solid var(--bw-ink);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  font-family: var(--bw-mono);
  font-size: 0.68rem;
  letter-spacing: 0.03em;
}

/* Icon animation keyframes */
.bw-gear {
  transform-origin: 24px 24px;
  animation: bw-spin 8s linear infinite;
}

.bw-draw {
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  animation: bw-draw 3.2s ease-in-out infinite;
}

.bw-draw--2 { animation-delay: 0.35s; }
.bw-draw--3 { animation-delay: 0.7s; }

.bw-ecg {
  stroke-dasharray: 72;
  stroke-dashoffset: 72;
  animation: bw-ecg 2.6s cubic-bezier(0.6, 0, 0.4, 1) infinite;
}

.bw-blink {
  animation: bw-blink 2.4s steps(2, end) infinite;
  transform-origin: center;
}

@keyframes bw-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bw-draw {
  0%, 100% { stroke-dashoffset: 30; }
  40%, 70% { stroke-dashoffset: 0; }
}

@keyframes bw-ecg {
  0% { stroke-dashoffset: 72; }
  55%, 100% { stroke-dashoffset: 0; }
}

@keyframes bw-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0.15; }
}

/* ---------------------------------------------------------------- */
/* 02 — Toolkit                                                      */
/* ---------------------------------------------------------------- */

.bw-groups {
  display: grid;
  gap: 1.15rem;
}

@container bw-main (min-width: 880px) {
  .bw-groups {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.bw-group {
  display: grid;
  gap: 0.85rem;
  align-content: start;
  min-width: 0;
  padding: 1.15rem;
  border: var(--bw-line) solid var(--bw-ink);
  border-radius: 20px;
  background: #fff;
  box-shadow: 5px 5px 0 var(--bw-orange);
}

.bw-group-top {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px dashed rgba(23, 18, 26, 0.28);
}

.bw-group-badge {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 2px solid var(--bw-ink);
  border-radius: 12px;
  background: var(--bw-mint);
  box-shadow: 2px 2px 0 var(--bw-ink);
}

.bw-group:nth-child(2) .bw-group-badge { background: var(--bw-lilac); }
.bw-group:nth-child(3) .bw-group-badge { background: var(--bw-pink-light); }

.bw-group-badge .bw-svg {
  width: 24px;
  height: 24px;
}

.bw-group h4 {
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.bw-group small {
  display: block;
  margin-top: 0.1rem;
  font-family: var(--bw-mono);
  font-size: 0.68rem;
  letter-spacing: 0.04em;
  opacity: 0.65;
}

.bw-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.bw-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.7rem;
  border: 2px solid var(--bw-ink);
  border-radius: 11px;
  background: var(--bw-paper);
  box-shadow: 2px 2px 0 var(--bw-ink);
  font-family: var(--bw-mono);
  font-size: 0.73rem;
  font-weight: 500;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}

.bw-chip img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.3, 1.6);
}

.bw-chip:hover {
  background: var(--bw-yellow);
  transform: translateY(-3px) rotate(-1deg);
  box-shadow: 3px 5px 0 var(--bw-ink);
}

.bw-chip:hover img {
  transform: scale(1.18) rotate(9deg);
}

.bw-block[data-shown="true"] .bw-chip {
  animation: bw-pop 0.55s cubic-bezier(0.2, 0.8, 0.3, 1.4) backwards;
  animation-delay: var(--bw-d, 0ms);
}

@keyframes bw-pop {
  from { opacity: 0; transform: scale(0.7) translateY(8px); }
  to { opacity: 1; transform: none; }
}

/* ---------------------------------------------------------------- */
/* 03 — Focus + pipeline                                             */
/* ---------------------------------------------------------------- */

.bw-focus {
  display: grid;
  gap: 1.6rem;
}

@container bw-main (min-width: 720px) {
  .bw-focus {
    grid-template-columns: minmax(0, 1.05fr) minmax(240px, 0.95fr);
    align-items: stretch;
    gap: 1.8rem;
  }
}

.bw-focus-list {
  display: grid;
  gap: 0.85rem;
  align-content: start;
  margin-top: 1.35rem;
}

.bw-focus-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.85rem;
  padding: 0.9rem 1rem;
  border: 2px solid var(--bw-ink);
  border-radius: 14px;
  background: #fff;
  transition: transform 0.2s ease, background 0.2s ease;
}

.bw-focus-item:hover {
  background: var(--bw-mint);
  transform: translateX(4px);
}

.bw-focus-item .bw-svg {
  width: 26px;
  height: 26px;
}

.bw-focus-item strong {
  display: block;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.015em;
}

.bw-focus-item span {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.92rem;
  line-height: 1.6;
  opacity: 0.85;
}

.bw-flow-panel {
  display: grid;
  gap: 0.9rem;
  align-content: start;
  padding: 1.1rem;
  border: var(--bw-line) solid var(--bw-ink);
  border-radius: 22px;
  background:
    radial-gradient(circle at 85% 8%, rgba(255, 130, 189, 0.6), transparent 44%),
    radial-gradient(circle at 10% 92%, rgba(167, 239, 211, 0.42), transparent 46%),
    #17121a;
  color: var(--bw-paper);
  box-shadow: 7px 7px 0 var(--bw-yellow);
}

.bw-flow-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.7rem;
  border-bottom: 1.5px dashed rgba(255, 248, 237, 0.3);
  font-family: var(--bw-mono);
  font-size: 0.7rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.bw-flow-head .bw-flow-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--bw-mint);
  box-shadow: 0 0 0 0 rgba(167, 239, 211, 0.6);
  animation: bw-ping 2s ease-out infinite;
}

.bw-flow-head em {
  margin-left: auto;
  padding: 0.15rem 0.45rem;
  border: 1.5px solid rgba(255, 248, 237, 0.55);
  border-radius: 999px;
  font-size: 0.62rem;
  font-style: normal;
  letter-spacing: 0.1em;
}

.bw-flow {
  position: relative;
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0.15rem 0;
  list-style: none;
}

.bw-flow::before {
  content: "";
  position: absolute;
  left: 9px;
  top: 14px;
  bottom: 14px;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 248, 237, 0.42) 0 5px,
    transparent 5px 10px
  );
}

.bw-flow::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 12px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--bw-yellow);
  box-shadow: 0 0 12px 3px rgba(255, 228, 92, 0.65);
  animation: bw-flow-run 3.6s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}

.bw-flow-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.3rem 0;
  font-family: var(--bw-mono);
  font-size: 0.74rem;
  letter-spacing: 0.04em;
}

.bw-flow-bulb {
  position: relative;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  border: 1.5px solid rgba(255, 248, 237, 0.75);
  border-radius: 50%;
  background: #17121a;
  z-index: 1;
}

.bw-flow-bulb::after {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--bw-mint);
  animation: bw-flow-bulb 3.6s ease-in-out infinite;
  animation-delay: calc(var(--bw-i) * 0.55s);
}

.bw-flow-label {
  font-family: var(--bw-display);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0;
}

.bw-flow-state {
  margin-left: auto;
  padding: 0.1rem 0.4rem;
  border-radius: 5px;
  background: rgba(255, 248, 237, 0.12);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.8;
}

.bw-flow-foot {
  padding-top: 0.7rem;
  border-top: 1.5px dashed rgba(255, 248, 237, 0.3);
  font-family: var(--bw-mono);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  opacity: 0.75;
}

@keyframes bw-flow-run {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(150px); opacity: 0; }
}

@keyframes bw-flow-bulb {
  0%, 100% { background: var(--bw-mint); box-shadow: 0 0 0 0 rgba(167, 239, 211, 0.5); }
  50% { background: var(--bw-yellow); box-shadow: 0 0 0 5px rgba(255, 228, 92, 0.18); }
}

@keyframes bw-ping {
  0% { box-shadow: 0 0 0 0 rgba(167, 239, 211, 0.55); }
  100% { box-shadow: 0 0 0 9px rgba(167, 239, 211, 0); }
}

/* ---------------------------------------------------------------- */
/* Ticker                                                            */
/* ---------------------------------------------------------------- */

.bw-marquee {
  display: flex;
  margin: 2.5rem calc(var(--bw-pad) * -1) calc(var(--bw-pad) * -1);
  overflow: hidden;
  border-top: var(--bw-line) solid var(--bw-ink);
  background: var(--bw-pink);
  color: var(--bw-ink);
}

.bw-track {
  display: flex;
  flex: 0 0 auto;
  min-width: 100%;
  animation: bw-scroll 30s linear infinite;
}

.bw-marquee:hover .bw-track {
  animation-play-state: paused;
}

.bw-item {
  display: inline-flex;
  align-items: center;
  gap: 1.4rem;
  padding: 0.85rem 0 0.85rem 1.4rem;
  font-family: var(--bw-mono);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

.bw-item::after {
  content: "\\2733";
  font-size: 1.15rem;
}

@keyframes bw-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

/* ---------------------------------------------------------------- */
/* Responsive                                                        */
/* ---------------------------------------------------------------- */

@media (max-width: 640px) {
  .bw-shell {
    border-radius: 24px;
    box-shadow: 7px 7px 0 var(--bw-pink);
  }

  .bw-head {
    border-radius: 18px;
    box-shadow: 4px 4px 0 var(--bw-yellow);
  }

  .bw-orbit {
    box-shadow: 4px 4px 0 var(--bw-ink);
  }

  .bw-main { gap: 2.4rem; }

  .bw-block-head { gap: 0.55rem; }

  .bw-num {
    min-width: 46px;
    min-height: 46px;
    border-radius: 13px;
    font-size: 1.6rem;
  }

  .bw-label {
    padding: 0.4rem 0.6rem;
    font-size: 0.64rem;
    letter-spacing: 0.04em;
  }

  .bw-step, .bw-group { box-shadow: 3px 3px 0 var(--bw-ink); }
  .bw-group { box-shadow: 3px 3px 0 var(--bw-orange); }
  .bw-flow-panel { box-shadow: 4px 4px 0 var(--bw-yellow); }
}

/* Focus + reduced motion */
.bw-root :is(a, button):focus-visible {
  outline: 3px solid var(--bw-pink);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .bw-shell {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .bw-block,
  .bw-step,
  .bw-chip,
  .bw-focus-item {
    transition: none;
  }

  .bw-block { opacity: 1; transform: none; }

  .bw-track,
  .bw-orbit-layer,
  .bw-orbit-icon,
  .bw-orbit-icon img,
  .bw-gear,
  .bw-draw,
  .bw-ecg,
  .bw-blink,
  .bw-flow::after,
  .bw-flow-bulb::after,
  .bw-flow-head .bw-flow-dot {
    animation: none;
  }

  .bw-draw, .bw-ecg { stroke-dashoffset: 0; }

  .bw-block[data-shown="true"] .bw-chip { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const SECTIONS = [
  { id: "bw-journey", n: "01", label: "The Journey" },
  { id: "bw-toolkit", n: "02", label: "Toolkit" },
  { id: "bw-focus", n: "03", label: "Focus" },
];

const TECH_ICONS = {
  React: "react/react-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  Express: "express/express-original.svg",
  MongoDB: "mongodb/mongodb-original.svg",
  Git: "git/git-original.svg",
  Docker: "docker/docker-original.svg",
  Kubernetes: "kubernetes/kubernetes-original.svg",
  Jenkins: "jenkins/jenkins-original.svg",
  Terraform: "terraform/terraform-original.svg",
  Ansible: "ansible/ansible-original.svg",
  Linux: "linux/linux-original.svg",
  Nginx: "nginx/nginx-original.svg",
  Prometheus: "prometheus/prometheus-original.svg",
  Grafana: "grafana/grafana-original.svg",
  Bash: "bash/bash-original.svg",
  "GitHub Actions": "github/github-original.svg",
};

const JOURNEY = [
  {
    kicker: "Step 01",
    title: "Web Development",
    text: "I started by building full-stack applications — React interfaces, Node.js and Express APIs, MongoDB for data. End to end, from an idea to something that runs.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    kicker: "Step 02",
    title: "DevOps",
    text: "Shipping real applications made me curious about what sits behind them: how code is built, tested, containerised and deployed — and how much of that can be automated.",
    tags: ["CI/CD", "Docker", "Automation", "IaC"],
  },
  {
    kicker: "Step 03",
    title: "Site Reliability",
    text: "Where my focus is today: reliability, observability and the practices that keep a system dependable while it grows.",
    tags: ["SLOs", "Monitoring", "Uptime", "Incidents"],
  },
];

const GROUPS = [
  {
    key: "code",
    title: "Development",
    hint: "the foundation",
    items: ["React", "Node.js", "Express", "MongoDB", "Git"],
  },
  {
    key: "gear",
    title: "DevOps & Automation",
    hint: "building & delivery",
    items: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Ansible", "Linux", "Nginx"],
  },
  {
    key: "shield",
    title: "Reliability",
    hint: "keeping it healthy",
    items: ["Prometheus", "Grafana", "Bash", "GitHub Actions"],
  },
];

const FOCUS = [
  {
    key: "loop",
    title: "CI/CD & automation",
    text: "Turning manual release steps into pipelines that build, test and deploy on every commit.",
  },
  {
    key: "layers",
    title: "Infrastructure as code",
    text: "Reproducible environments defined in files, not remembered in someone's head.",
  },
  {
    key: "pulse",
    title: "Reliability & observability",
    text: "Metrics, logs, traces and SLOs — seeing problems before users report them.",
  },
];

const PIPELINE = ["Commit", "Build", "Test", "Deploy", "Observe"];

const TICKER = [
  "React",
  "Node.js",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Infrastructure as Code",
  "Observability",
  "Site Reliability",
];

const ORBIT_OUTER = ["React", "Docker", "Kubernetes", "Node.js", "Terraform"];
const ORBIT_INNER = ["Prometheus", "MongoDB", "Grafana"];

/* ------------------------------------------------------------------ */
/* Animated inline icons                                              */
/* ------------------------------------------------------------------ */

const IconWeb = () => (
  <svg className="bw-svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect x="5" y="8" width="38" height="32" rx="5" />
    <path d="M5 16.5h38" />
    <circle className="bw-fill" cx="10.5" cy="12.3" r="1.5" />
    <circle className="bw-fill" cx="16" cy="12.3" r="1.5" />
    <circle className="bw-fill" cx="21.5" cy="12.3" r="1.5" />
    <path className="bw-draw" d="M17.5 24.5l-5 4.5 5 4.5" />
    <path className="bw-draw bw-draw--2" d="M26.5 24.5l5 4.5-5 4.5" />
    <path className="bw-draw bw-draw--3" d="M19.5 36l4-14" />
  </svg>
);

const IconDevOps = () => (
  <svg className="bw-svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <g className="bw-gear">
      <circle cx="24" cy="24" r="6.5" />
      <path d="M24 7v5.5M24 35.5V41M7 24h5.5M35.5 24H41M12 12l3.9 3.9M32.1 32.1L36 36M36 12l-3.9 3.9M15.9 32.1L12 36" />
    </g>
    <circle className="bw-fill" cx="24" cy="24" r="2.2" />
  </svg>
);

const IconSRE = () => (
  <svg className="bw-svg" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path d="M24 5.5l15 5.6v11.1C39 32.4 32.4 39.5 24 43.5 15.6 39.5 9 32.4 9 22.2V11.1z" />
    <path className="bw-ecg" d="M12.5 23.5h6.3l3.2-6.6 4.7 13.2 3.2-6.6h5.6" />
  </svg>
);

const IconCode = () => (
  <svg className="bw-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
  </svg>
);

const IconGear = () => (
  <svg className="bw-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <g className="bw-gear">
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 3v2.6M12 18.4V21M3 12h2.6M18.4 12H21M5.6 5.6l1.9 1.9M16.5 16.5l1.9 1.9M18.4 5.6l-1.9 1.9M7.5 16.5l-1.9 1.9" />
    </g>
  </svg>
);

const IconShield = () => (
  <svg className="bw-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 2.6l8 3v6.1c0 5.4-3.5 8.9-8 10.3-4.5-1.4-8-4.9-8-10.3V5.6z" />
    <path className="bw-ecg" d="M6.6 12.2h3l1.6-3.2 2.3 6.4 1.6-3.2h2.9" />
  </svg>
);

const IconLoop = () => (
  <svg className="bw-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M20 12a8 8 0 0 1-13.6 5.7L4 15.4" />
    <path d="M4 12a8 8 0 0 1 13.6-5.7L20 8.6" />
    <path d="M4 20v-4.6h4.6M20 4v4.6h-4.6" />
  </svg>
);

const IconLayers = () => (
  <svg className="bw-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 3l9 4.7-9 4.7-9-4.7z" />
    <path d="M3 12.4l9 4.7 9-4.7" />
    <path d="M3 16.9l9 4.7 9-4.7" />
  </svg>
);

const IconPulse = () => (
  <svg className="bw-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M2 12.5h4.5l2.4-5.4 3.4 10.4 2.4-5h7.3" />
    <circle className="bw-fill bw-blink" cx="21" cy="12.5" r="1.8" />
  </svg>
);

const GROUP_ICONS = { code: IconCode, gear: IconGear, shield: IconShield };
const FOCUS_ICONS = { loop: IconLoop, layers: IconLayers, pulse: IconPulse };

/* ------------------------------------------------------------------ */
/* Shared pieces                                                      */
/* ------------------------------------------------------------------ */

const useReveal = () => {
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
      { threshold: 0.14 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, shown];
};

const Block = ({ id, n, label, children }) => {
  const [ref, shown] = useReveal();

  return (
    <article
      id={id}
      ref={ref}
      data-shown={shown}
      aria-label={label}
      className="bw-block"
    >
      <div className="bw-block-head">
        <span className="bw-num">{n}</span>
        <span className="bw-rule" aria-hidden="true" />
        <span className="bw-label">{label}</span>
      </div>

      {children}
    </article>
  );
};

const TechChip = ({ name, delay = 0 }) => {
  const path = TECH_ICONS[name];

  return (
    <span className="bw-chip" style={{ "--bw-d": `${delay}ms` }}>
      {path && (
        <img
          src={`${ICON_BASE}/${path}`}
          alt=""
          width="20"
          height="20"
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}
      {name}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/* Orbit panel                                                        */
/* ------------------------------------------------------------------ */

const OrbitPanel = () => {
  const rings = [
    { layer: "outer", items: ORBIT_OUTER, radius: "37%", step: 72 },
    { layer: "inner", items: ORBIT_INNER, radius: "26%", step: 120 },
  ];

  return (
    <div
      className="bw-orbit"
      role="img"
      aria-label="Technology orbit: React, Docker, Kubernetes, Node.js, Terraform, Prometheus, MongoDB and Grafana"
    >
      <span className="bw-orbit-ring bw-orbit-ring--outer" aria-hidden="true" />
      <span className="bw-orbit-ring bw-orbit-ring--inner" aria-hidden="true" />

      {rings.map(({ layer, items, radius, step }) => (
        <div
          key={layer}
          className={`bw-orbit-layer bw-orbit-layer--${layer}`}
          aria-hidden="true"
        >
          {items.map((name, i) => (
            <span
              key={name}
              className="bw-orbit-slot"
              style={{
                "--bw-a": `${i * step}deg`,
                "--bw-r": radius,
              }}
            >
              <span className="bw-orbit-icon">
                <img
                  src={`${ICON_BASE}/${TECH_ICONS[name]}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ "--bw-d": `${i * 0.45}s` }}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </span>
            </span>
          ))}
        </div>
      ))}

      <span className="bw-orbit-core">
        <b>DevOps × SRE</b>
        <span>always learning</span>
      </span>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

const About = () => {
  const [active, setActive] = useState(SECTIONS[0].id);

  /* Scroll spy */
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

  const goTo = (event, id) => {
    event.preventDefault();

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="about"
      className="bw-root w-full px-4 sm:px-8 lg:px-12 xl:px-16 my-20"
    >
      <style>{STYLES}</style>

      <div className="bw-shell">
        {/* Header */}
        <header className="bw-head">
          <div>
            <span className="bw-eyebrow">About · Beyond Web Development</span>

            <h2 className="bw-title">
              Beyond the <span className="bw-mark">browser</span>.
            </h2>

            <p className="bw-lead">
              My journey started with web development — React, Node.js, Express
              and MongoDB — building applications end to end. That work left me
              curious about everything behind the application: how systems are
              deployed, how they are automated, and how they stay reliable.{" "}
              <strong>
                Today I'm building on that foundation in DevOps and Site
                Reliability Engineering.
              </strong>
            </p>

            <div className="bw-tags">
              <span className="bw-tag">
                <i aria-hidden="true" />
                Software Engineering
              </span>
              <span className="bw-tag">
                <i aria-hidden="true" />
                DevOps
              </span>
              <span className="bw-tag">
                <i aria-hidden="true" />
                SRE
              </span>
              <span className="bw-tag">
                <i aria-hidden="true" />
                Automation
              </span>
            </div>
          </div>

          <OrbitPanel />
        </header>

        <div className="bw-layout">
          {/* Side navigation */}
          <aside className="bw-aside">
            <ul className="bw-nav" aria-label="Jump to section">
              {SECTIONS.map(({ id, n, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(event) => goTo(event, id)}
                    aria-current={active === id ? "true" : undefined}
                  >
                    <span>{n}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="bw-main">
            {/* 01 — Journey */}
            <Block id="bw-journey" n="01" label="The Journey">
              <h3 className="bw-h3">From interfaces to infrastructure.</h3>
              <p className="bw-p">
                One path, three layers — each step grew out of the one before it.
              </p>

              <div className="bw-steps" style={{ marginTop: "1.5rem" }}>
                {JOURNEY.map((step, index) => {
                  const Icon = [IconWeb, IconDevOps, IconSRE][index];

                  return (
                    <article className="bw-step" key={step.title}>
                      <span className="bw-step-icon" aria-hidden="true">
                        <Icon />
                      </span>

                      <span className="bw-step-kicker">{step.kicker}</span>
                      <h4>{step.title}</h4>
                      <p>{step.text}</p>

                      <div className="bw-step-tags">
                        {step.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </Block>

            {/* 02 — Toolkit */}
            <Block id="bw-toolkit" n="02" label="Toolkit">
              <h3 className="bw-h3">A foundation, extended.</h3>
              <p className="bw-p">
                The same stack that builds the application now also ships it,
                watches it and keeps it healthy.
              </p>

              <div className="bw-groups" style={{ marginTop: "1.5rem" }}>
                {GROUPS.map((group) => {
                  const Icon = GROUP_ICONS[group.key];

                  return (
                    <section className="bw-group" key={group.title}>
                      <div className="bw-group-top">
                        <span className="bw-group-badge" aria-hidden="true">
                          <Icon />
                        </span>
                        <h4>
                          {group.title}
                          <small>{group.hint}</small>
                        </h4>
                      </div>

                      <div className="bw-chips">
                        {group.items.map((item, i) => (
                          <TechChip key={item} name={item} delay={i * 70} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </Block>

            {/* 03 — Focus */}
            <Block id="bw-focus" n="03" label="Focus">
              <div className="bw-focus">
                <div>
                  <h3 className="bw-h3">Where I'm heading.</h3>
                  <p className="bw-p">
                    Reliability is a habit, not a final state. Right now I'm
                    practising it on every layer of the delivery path.
                  </p>

                  <div className="bw-focus-list">
                    {FOCUS.map((item) => {
                      const Icon = FOCUS_ICONS[item.key];

                      return (
                        <div className="bw-focus-item" key={item.title}>
                          <span aria-hidden="true">
                            <Icon />
                          </span>
                          <span>
                            <strong>{item.title}</strong>
                            <span>{item.text}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bw-flow-panel">
                  <div className="bw-flow-head">
                    <span className="bw-flow-dot" aria-hidden="true" />
                    delivery pipeline
                    <em>auto</em>
                  </div>

                  <ol className="bw-flow">
                    {PIPELINE.map((step, i) => (
                      <li
                        className="bw-flow-item"
                        key={step}
                        style={{ "--bw-i": i }}
                      >
                        <span className="bw-flow-bulb" aria-hidden="true" />
                        <span className="bw-flow-label">{step}</span>
                        <span className="bw-flow-state">
                          {i === PIPELINE.length - 1 ? "watch" : "run"}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <p className="bw-flow-foot">
                    commit → build → test → deploy → observe
                  </p>
                </div>
              </div>
            </Block>
          </div>
        </div>

        {/* Ticker */}
        <div className="bw-marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="bw-track" key={copy}>
              {TICKER.map((word) => (
                <span className="bw-item" key={`${copy}-${word}`}>
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