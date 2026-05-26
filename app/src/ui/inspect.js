/**
 * Inspect drawer.
 * Per docs/design/ui-layout.md §5 and docs/design/inspect-copy.md.
 *
 * Renders the Surface lore and True-name (when present) from entities.json,
 * plus phase-weight chips and any recipes that produce this entity.
 *
 * Close behaviour: click outside the drawer, press Escape, or click the
 * close button.
 */

import {
  getEntity,
  getRecipesProducing,
  isCatastrophe,
  isDiscovered,
} from "../engine/recipes.js";

const PHASE_ORDER = ["wood", "fire", "earth", "metal", "water"];
const PHASE_LABELS = {
  wood: "Wood",
  fire: "Fire",
  earth: "Earth",
  metal: "Metal",
  water: "Water",
};

const MOVE_LABELS = {
  sheng: "Infuse (Sheng)",
  ke: "Consume (Ke)",
  self: "Concentrate (Self)",
  insub: "Disturb (Insub)",
  stage2: "Combined craft (Stage 2)",
};

let drawerEl = null;
let contentEl = null;
let closeBtnEl = null;
let keydownHandler = null;
let outsideClickHandler = null;

export function initInspect() {
  drawerEl = document.getElementById("inspect-drawer");
  contentEl = document.getElementById("inspect-content");
  closeBtnEl = document.getElementById("inspect-close");

  closeBtnEl.addEventListener("click", closeInspect);

  keydownHandler = (ev) => {
    if (ev.key === "Escape" && !drawerEl.classList.contains("hidden")) {
      closeInspect();
    }
  };
  document.addEventListener("keydown", keydownHandler);

  outsideClickHandler = (ev) => {
    if (drawerEl.classList.contains("hidden")) return;
    if (drawerEl.contains(ev.target)) return;
    // Ignore clicks on entities/cells that triggered the open in the same tick
    if (ev.target.closest(".discovery-cell, .workspace-entity, .phase-tile")) return;
    closeInspect();
  };
  // Capture phase so we run before downstream stopPropagation handlers.
  document.addEventListener("mousedown", outsideClickHandler, true);
}

export function openInspect(entity) {
  if (!entity) return;
  if (!drawerEl) return;
  render(entity);
  drawerEl.classList.remove("hidden");
  drawerEl.setAttribute("aria-hidden", "false");
}

export function closeInspect() {
  if (!drawerEl) return;
  drawerEl.classList.add("hidden");
  drawerEl.setAttribute("aria-hidden", "true");
}

function render(entity) {
  const tierLabel = formatTier(entity.tier);
  const isCata = isCatastrophe(entity.id);
  const discovered = isDiscovered(entity.id);

  const weightsHtml = renderPhaseWeights(entity.phase_weights);
  const recipesHtml = renderRecipes(entity.id);
  const trueNameHtml = entity.true_name
    ? `<div class="inspect-true-name">${escapeHtml(entity.true_name)}</div>`
    : "";

  contentEl.innerHTML = `
    <div class="inspect-header">
      <div class="inspect-emoji">${entity.emoji}</div>
      <div class="inspect-headtext">
        <div class="inspect-name">${escapeHtml(entity.name)}</div>
        <div class="inspect-tier">
          ${escapeHtml(tierLabel)}
          ${isCata ? '<span class="inspect-badge cata">catastrophe</span>' : ""}
          ${!discovered ? '<span class="inspect-badge locked">undiscovered</span>' : ""}
        </div>
        ${trueNameHtml}
      </div>
    </div>

    <section class="inspect-section">
      <h4>Surface</h4>
      <p class="inspect-surface">${escapeHtml(entity.surface_lore || "")}</p>
    </section>

    <section class="inspect-section">
      <h4>Phase weights</h4>
      <div class="phase-weights">${weightsHtml}</div>
    </section>

    ${recipesHtml}
  `;
}

function renderPhaseWeights(weights) {
  if (!weights) return "";
  return PHASE_ORDER.map((p) => {
    const v = weights[p] || 0;
    if (v <= 0) return "";
    const pct = Math.round(v * 100);
    return `
      <span class="phase-chip phase-${p}" title="${PHASE_LABELS[p]} ${pct}%">
        <span class="phase-chip-dot"></span>
        ${PHASE_LABELS[p]}
        <span class="phase-chip-value">${pct}%</span>
      </span>
    `;
  }).join("");
}

function renderRecipes(entityId) {
  const recipes = getRecipesProducing(entityId);
  if (recipes.length === 0) {
    // For pure phases there's no upstream recipe — show a hint instead.
    const entity = getEntity(entityId);
    if (entity && entity.tier === "phase") {
      return `
        <section class="inspect-section">
          <h4>Origin</h4>
          <p class="inspect-origin">A primal phase. Drag from the right panel.</p>
        </section>
      `;
    }
    return "";
  }

  const items = recipes.map((rec) => {
    const actor = getEntity(rec.actor);
    const patient = getEntity(rec.patient);
    if (!actor || !patient) return "";
    const moveLabel = MOVE_LABELS[rec.move_type] || rec.move_type;
    const stageNote =
      rec._selfStage != null
        ? ` <span class="recipe-stagenote">(stage ${rec._selfStage + 1})</span>`
        : "";
    return `
      <li class="recipe-item">
        <span class="recipe-actor">${actor.emoji} ${escapeHtml(actor.name)}</span>
        <span class="recipe-arrow" aria-hidden="true">&rarr;</span>
        <span class="recipe-patient">${patient.emoji} ${escapeHtml(patient.name)}</span>
        <span class="recipe-move recipe-move-${rec.move_type}">${moveLabel}${stageNote}</span>
      </li>
    `;
  }).join("");

  return `
    <section class="inspect-section">
      <h4>Made by</h4>
      <ul class="recipe-list">${items}</ul>
    </section>
  `;
}

function formatTier(tier) {
  switch (tier) {
    case "phase":   return "Phase";
    case "sheng":   return "Sheng (Generative)";
    case "ke":      return "Ke (Controlling)";
    case "insub":   return "Insubordinate";
    case "feeling": return "Feeling (Self stage 1)";
    case "surge":   return "Surge (Self stage 2)";
    case "storm":   return "Storm (Self stage 3)";
    case "stage2-sheng-sheng": return "Stage 2 — Sheng \u00d7 Sheng";
    case "stage2-ke-ke":       return "Stage 2 — Ke \u00d7 Ke";
    case "stage2-sheng-ke":    return "Stage 2 — Sheng \u00d7 Ke";
    case "stage2-bridge":      return "Stage 2 — Mixed bridge";
    case "refined":            return "Refined variant";
    case "catastrophe":        return "Catastrophe";
    default: return tier || "";
  }
}

function escapeHtml(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
