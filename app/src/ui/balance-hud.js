/**
 * Balance-mode HUD.
 * Per docs/design/balance-mode.md §13.
 *
 * Surfaces:
 *   - Budget counter (top-right of workspace)
 *   - Pathology token tray (above workspace)
 *   - Difficulty selector + "New puzzle" button (top-left of workspace)
 *   - End-of-puzzle overlay showing win or loss + recorded solution path
 *     overlaid on the player's path.
 */

import { getEntity } from "../engine/recipes.js";
import { MAX_PATHOLOGY } from "../engine/balance.js";

const MOVE_LABELS = {
  sheng: "Infuse",
  ke:    "Consume",
  self:  "Concentrate",
  insub: "Disturb",
  null:  "Null",
};

let hostEl = null;
let budgetEl = null;
let trayEl = null;
let difficultyEl = null;
let endOverlayEl = null;

let onNewPuzzle = null;
let onModeExit = null;

export function initBalanceHud(opts) {
  hostEl = document.getElementById("balance-hud");
  budgetEl = document.getElementById("budget-counter");
  trayEl = document.getElementById("pathology-tray");
  difficultyEl = document.getElementById("difficulty-select");
  endOverlayEl = document.getElementById("balance-end-overlay");
  onNewPuzzle = opts.onNewPuzzle || (() => {});
  onModeExit = opts.onModeExit || (() => {});

  difficultyEl.addEventListener("change", () => {
    onNewPuzzle(difficultyEl.value);
  });
  document.getElementById("new-puzzle-btn").addEventListener("click", () => {
    onNewPuzzle(difficultyEl.value);
  });

  // Close-on-Escape from the end overlay.
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !endOverlayEl.classList.contains("hidden")) {
      hideEndOverlay();
    }
  });
}

export function showBalanceHud() {
  hostEl.classList.remove("hidden");
}
export function hideBalanceHud() {
  hostEl.classList.add("hidden");
  hideEndOverlay();
}

export function renderHud(session) {
  if (!session) return;
  budgetEl.textContent = `${session.budget} / ${session.budgetMax}`;
  budgetEl.dataset.low = session.budget <= 2 ? "1" : "0";

  // Pathology tray: render M+1 slots; the last is the "danger" slot.
  trayEl.innerHTML = "";
  for (let i = 0; i < MAX_PATHOLOGY + 1; i++) {
    const slot = document.createElement("div");
    const filled = i < session.pathologyTokens.length;
    slot.className = "path-slot" + (filled ? " filled" : "");
    if (i === MAX_PATHOLOGY) slot.classList.add("danger");
    if (filled) {
      const phase = session.pathologyTokens[i];
      slot.dataset.phase = phase;
      slot.title = `${phase} pathology — clear with ${controllerOf(phase)}`;
      slot.textContent = pathologyEmoji(phase);
    }
    trayEl.appendChild(slot);
  }
}

export function showEndOverlay(session, puzzle) {
  const won = session.outcome === "won";
  const heading = won ? "Restored." : "Out of moves.";
  const subhead = won
    ? `Solved in ${session.playerPath.length} of ${session.budgetMax} moves.`
    : "The pentagram is still out of balance.";

  // Solution overlay: list the generator's recorded solution and the
  // player's actual path side by side.
  const solutionList = puzzle.solution
    .map((m, i) => stepLine(m, i + 1, "soln"))
    .join("");
  const playerList = session.playerPath
    .map((m, i) => stepLine(m, i + 1, "play"))
    .join("");

  endOverlayEl.innerHTML = `
    <div class="end-card">
      <div class="end-heading ${won ? "won" : "lost"}">${heading}</div>
      <div class="end-subhead">${subhead}</div>
      <div class="end-columns">
        <div class="end-column">
          <div class="end-col-title">Generator's path</div>
          <ol class="end-list">${solutionList}</ol>
        </div>
        <div class="end-column">
          <div class="end-col-title">Your path</div>
          <ol class="end-list">${playerList || '<li class="end-empty">(no moves)</li>'}</ol>
        </div>
      </div>
      <div class="end-actions">
        <button id="end-retry" type="button">Another puzzle</button>
        <button id="end-exit" type="button">Exit Balance</button>
      </div>
    </div>
  `;
  endOverlayEl.classList.remove("hidden");

  document.getElementById("end-retry").addEventListener("click", () => {
    hideEndOverlay();
    onNewPuzzle(difficultyEl.value);
  });
  document.getElementById("end-exit").addEventListener("click", () => {
    hideEndOverlay();
    onModeExit();
  });
}

export function hideEndOverlay() {
  endOverlayEl.classList.add("hidden");
}

export function setDifficulty(diff) {
  difficultyEl.value = diff;
}

// ---- helpers ----

function stepLine(move, index, kind) {
  const actor = getEntity(move.actor);
  const patient = getEntity(move.patient);
  const moveLabel = MOVE_LABELS[move.kind] || move.kind;
  if (!actor || !patient) {
    return `<li class="step-${kind}"><span class="step-i">${index}</span>(missing entity)</li>`;
  }
  return `
    <li class="step-${kind}">
      <span class="step-i">${index}</span>
      ${actor.emoji} ${actor.name}
      <span class="step-arrow">&rarr;</span>
      ${patient.emoji} ${patient.name}
      <span class="step-kind step-kind-${move.kind}">${moveLabel}</span>
    </li>
  `;
}

const PATHOLOGY_EMOJI = {
  wood:  "🌿",
  fire:  "🔥",
  earth: "⛰️",
  metal: "⚔️",
  water: "🌊",
};
function pathologyEmoji(phase) {
  return PATHOLOGY_EMOJI[phase] || "?";
}

const CONTROLLER = {
  wood: "metal",
  fire: "water",
  earth: "wood",
  metal: "fire",
  water: "earth",
};
function controllerOf(phase) {
  return CONTROLLER[phase];
}
