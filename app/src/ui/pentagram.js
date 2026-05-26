/**
 * Pentagram readout for Balance mode.
 * Per docs/design/ui-layout.md and docs/design/balance-mode.md §3, §13.
 *
 * Renders five points around a circle, each filled proportional to its phase
 * weight. Always-on in Balance, hidden in Explore.
 *
 * The pentagram is drawn into the #pentagram-background element that already
 * exists in index.html. We draw via inline SVG so weights animate cleanly.
 */

import { PHASES } from "../engine/balance.js";

const PHASE_COLORS = {
  wood:  "#6fb86b",
  fire:  "#d96c5b",
  earth: "#c8a165",
  metal: "#c9c9d2",
  water: "#4d8fc7",
};

// Phase positions in the locked order, starting at the top and going
// clockwise. Wood at top, Fire upper-right, Earth lower-right, Metal
// lower-left, Water upper-left. Per ui-layout.md §3.
const PHASE_ANGLES = {
  wood:  -Math.PI / 2,
  fire:  -Math.PI / 2 + (2 * Math.PI) / 5,
  earth: -Math.PI / 2 + (4 * Math.PI) / 5,
  metal: -Math.PI / 2 + (6 * Math.PI) / 5,
  water: -Math.PI / 2 + (8 * Math.PI) / 5,
};

let containerEl = null;
let svgEl = null;

export function initPentagram() {
  containerEl = document.getElementById("pentagram-background");
  containerEl.innerHTML = "";
  // Build the SVG scaffold once. Sized via viewBox; CSS scales it.
  svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgEl.setAttribute("viewBox", "-110 -110 220 220");
  svgEl.setAttribute("class", "pentagram-svg");
  svgEl.setAttribute("aria-hidden", "true");

  // Outer ring
  const ring = svgEl.appendChild(svgEl.ownerDocument.createElementNS(
    "http://www.w3.org/2000/svg", "circle"));
  ring.setAttribute("r", "100");
  ring.setAttribute("cx", "0");
  ring.setAttribute("cy", "0");
  ring.setAttribute("class", "pentagram-ring");

  // Sheng pentagon (connecting adjacent points around the circle)
  const shengPath = makePolygon(["wood", "fire", "earth", "metal", "water"]);
  shengPath.setAttribute("class", "pentagram-sheng");
  svgEl.appendChild(shengPath);

  // Ke star (connecting every-other point)
  const kePath = makePolygon(["wood", "earth", "water", "fire", "metal"]);
  kePath.setAttribute("class", "pentagram-ke");
  svgEl.appendChild(kePath);

  // One labelled node per phase
  for (const p of PHASES) {
    const { x, y } = phasePoint(p, 100);
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", `pentagram-node phase-${p}`);
    g.dataset.phase = p;

    // Outer light ring (full size, low opacity)
    const outer = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    outer.setAttribute("cx", x);
    outer.setAttribute("cy", y);
    outer.setAttribute("r", "16");
    outer.setAttribute("class", "pentagram-node-outer");
    outer.style.fill = PHASE_COLORS[p];
    g.appendChild(outer);

    // Inner filled circle (scaled by weight 0..0.4 maps to radius 0..16)
    const inner = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    inner.setAttribute("cx", x);
    inner.setAttribute("cy", y);
    inner.setAttribute("r", "0");
    inner.setAttribute("class", "pentagram-node-inner");
    inner.style.fill = PHASE_COLORS[p];
    g.appendChild(inner);

    // Numeric weight label
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const tx = x * 1.32;
    const ty = y * 1.32 + 5;
    text.setAttribute("x", tx);
    text.setAttribute("y", ty);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("class", "pentagram-label");
    text.textContent = "0%";
    g.appendChild(text);

    svgEl.appendChild(g);
  }

  containerEl.appendChild(svgEl);
}

/**
 * Update the pentagram fill state from a phase-vector and optional
 * tolerance epsilon (which renders the win band as a faint ring).
 */
export function renderPentagram(vec, epsilon = 0.03) {
  if (!svgEl) return;
  for (const p of PHASES) {
    const w = (vec && vec[p]) || 0;
    // Map 0..0.4 → 0..16 radius so 0.2 is mid-range, 0.4 is full.
    const r = Math.max(0, Math.min(16, w * 40));
    const g = svgEl.querySelector(`.pentagram-node[data-phase="${p}"]`);
    if (!g) continue;
    const inner = g.querySelector(".pentagram-node-inner");
    inner.setAttribute("r", r.toFixed(2));
    const text = g.querySelector(".pentagram-label");
    text.textContent = `${Math.round(w * 100)}%`;

    // Highlight phase nodes inside the win window.
    if (w >= 0.2 - epsilon && w <= 0.2 + epsilon) {
      g.classList.add("in-band");
    } else {
      g.classList.remove("in-band");
    }
  }
}

export function showPentagram() {
  if (!containerEl) return;
  containerEl.classList.remove("hidden");
}
export function hidePentagram() {
  if (!containerEl) return;
  containerEl.classList.add("hidden");
}

// -------- helpers --------

function phasePoint(phaseId, r) {
  const a = PHASE_ANGLES[phaseId];
  return { x: Math.cos(a) * r, y: Math.sin(a) * r };
}

function makePolygon(order) {
  const points = order.map((p) => {
    const { x, y } = phasePoint(p, 100);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  poly.setAttribute("points", points);
  return poly;
}
