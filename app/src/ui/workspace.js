/**
 * Workspace controller: drag-and-drop crafting on the center area.
 *
 * Handles three kinds of drags:
 *   1. Phase tile dragged from the right panel onto the workspace (spawn).
 *   2. Workspace entity dragged to a new position (move).
 *   3. Workspace entity dragged onto another workspace entity (craft).
 *
 * Crafting goes through the engine and emits move-type cues per
 * docs/design/ui-layout.md §3.3.
 */

import {
  resolve,
  recordDiscovery,
  isCatastrophe,
  getEntity,
} from "../engine/recipes.js";
import { getSelfStage, advanceSelfStage } from "../engine/self-state.js";

const NUDGE_LIMIT = 3;

// State
let workspaceEl = null;
let entitiesEl = null;
let nudgeEl = null;
let catastropheOverlayEl = null;
let nullCountThisSession = 0;
let nudgeTimer = null;
let onDiscovery = null;
let onCraftedEntityClick = null;
let lockoutActive = false;

// One unique DOM id per workspace entity
let nextEntityKey = 1;
function makeKey() {
  return `we-${nextEntityKey++}`;
}

export function initWorkspace(opts) {
  workspaceEl = document.getElementById("workspace");
  entitiesEl = document.getElementById("workspace-entities");
  nudgeEl = document.getElementById("nudge");
  catastropheOverlayEl = document.getElementById("catastrophe-overlay");
  onDiscovery = opts.onDiscovery || (() => {});
  onCraftedEntityClick = opts.onEntityClick || (() => {});

  workspaceEl.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  workspaceEl.addEventListener("drop", handleWorkspaceDrop);

  workspaceEl.addEventListener("click", (e) => {
    // Background click closes inspect via the global handler in main.js
  });
}

/**
 * Spawn an entity on the workspace. Returns the DOM element.
 * (x, y) are in workspace-relative pixels; defaults to a small jitter near
 * the center.
 */
export function spawnEntity(entity, x, y) {
  if (!entity) return null;

  const ws = workspaceEl.getBoundingClientRect();
  if (x == null) x = ws.width * 0.5 + (Math.random() - 0.5) * 80;
  if (y == null) y = ws.height * 0.5 + (Math.random() - 0.5) * 80;

  const el = document.createElement("div");
  el.className = "workspace-entity";
  el.dataset.entityId = entity.id;
  el.dataset.key = makeKey();
  el.style.left = `${clamp(x - 36, 0, ws.width - 72)}px`;
  el.style.top = `${clamp(y - 36, 0, ws.height - 72)}px`;
  el.draggable = true;

  el.innerHTML = `
    <div class="entity-emoji">${entity.emoji}</div>
    <div class="entity-name">${entity.name}</div>
  `;

  attachEntityDragHandlers(el);
  el.addEventListener("click", (ev) => {
    if (el.dataset.justDragged === "1") {
      el.dataset.justDragged = "0";
      return;
    }
    ev.stopPropagation();
    onCraftedEntityClick(entity);
  });

  entitiesEl.appendChild(el);
  return el;
}

function attachEntityDragHandlers(el) {
  let startX = 0, startY = 0;
  let origLeft = 0, origTop = 0;
  let movedSubstantially = false;

  el.addEventListener("dragstart", (ev) => {
    if (lockoutActive) {
      ev.preventDefault();
      return;
    }
    const rect = el.getBoundingClientRect();
    startX = ev.clientX;
    startY = ev.clientY;
    origLeft = parseFloat(el.style.left) || 0;
    origTop = parseFloat(el.style.top) || 0;
    movedSubstantially = false;
    el.classList.add("dragging");
    ev.dataTransfer.effectAllowed = "move";
    // Custom payload: workspace-entity key
    try {
      ev.dataTransfer.setData("text/x-fec-key", el.dataset.key);
    } catch {
      /* ignore */
    }
  });

  el.addEventListener("drag", (ev) => {
    if (Math.abs(ev.clientX - startX) > 4 || Math.abs(ev.clientY - startY) > 4) {
      movedSubstantially = true;
      el.dataset.justDragged = "1";
    }
  });

  el.addEventListener("dragend", (ev) => {
    el.classList.remove("dragging");
    // dragend fires after drop; if the drop landed on the workspace background
    // we update position. If it landed on another entity, handleEntityDrop has
    // already removed `el`, so the position update is moot.
    if (!el.isConnected) return;

    const ws = workspaceEl.getBoundingClientRect();
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    const newLeft = clamp(origLeft + dx, 0, ws.width - 72);
    const newTop  = clamp(origTop + dy,  0, ws.height - 72);
    el.style.left = `${newLeft}px`;
    el.style.top  = `${newTop}px`;
  });

  el.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
    el.classList.add("drop-target");
  });
  el.addEventListener("dragleave", () => {
    el.classList.remove("drop-target");
  });

  el.addEventListener("drop", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    el.classList.remove("drop-target");
    handleEntityDrop(el, ev);
  });
}

function handleWorkspaceDrop(ev) {
  ev.preventDefault();
  if (lockoutActive) return;

  // Two payload kinds:
  //   1. A phase id from the right panel: "text/x-fec-phase"
  //   2. A workspace entity key being moved: "text/x-fec-key" -- the
  //      dragend handler on the entity already updates position.
  const phaseId = ev.dataTransfer.getData("text/x-fec-phase");
  if (phaseId) {
    const ws = workspaceEl.getBoundingClientRect();
    const x = ev.clientX - ws.left;
    const y = ev.clientY - ws.top;
    const entity = getEntity(phaseId);
    if (entity) {
      spawnEntity(entity, x, y);
    }
  }
}

function handleEntityDrop(targetEl, ev) {
  if (lockoutActive) return;

  const actorKey = ev.dataTransfer.getData("text/x-fec-key");
  const phaseId = ev.dataTransfer.getData("text/x-fec-phase");

  // Case A: a phase dropped onto a workspace entity
  if (phaseId) {
    const actorEntity = getEntity(phaseId);
    if (!actorEntity) return;
    // Synthesize a transient actor DOM element so the resolve flow is uniform.
    // Use the patient entity's position as the resolve location.
    const patientEntity = getEntity(targetEl.dataset.entityId);
    resolveCraft({
      actorEntity,
      actorEl: null,
      patientEl: targetEl,
      patientEntity,
    });
    return;
  }

  if (!actorKey) return;
  const actorEl = entitiesEl.querySelector(`[data-key="${actorKey}"]`);
  if (!actorEl || actorEl === targetEl) return;

  const actorEntity = getEntity(actorEl.dataset.entityId);
  const patientEntity = getEntity(targetEl.dataset.entityId);

  resolveCraft({ actorEntity, actorEl, patientEntity, patientEl: targetEl });
}

function resolveCraft({ actorEntity, actorEl, patientEntity, patientEl }) {
  if (!actorEntity || !patientEntity) return;

  const stageCounter =
    actorEntity.id === patientEntity.id ? getSelfStage(actorEntity.id) : 0;
  const outcome = resolve(actorEntity.id, patientEntity.id, stageCounter);

  if (!outcome.ok) {
    handleNull(actorEl, patientEl);
    return;
  }

  // Successful craft. Advance self-stage if applicable.
  if (outcome.moveType === "self") {
    advanceSelfStage(actorEntity.id);
  }

  // Compute the position where the result appears (center of the patient).
  const rect = patientEl.getBoundingClientRect();
  const ws = workspaceEl.getBoundingClientRect();
  const x = rect.left + rect.width / 2 - ws.left;
  const y = rect.top + rect.height / 2 - ws.top;

  // Halo
  emitHalo(x, y, outcome.moveType);

  // Remove inputs
  if (actorEl && actorEl !== patientEl) actorEl.remove();
  patientEl.remove();

  // Spawn the result
  const resultEl = spawnEntity(outcome.result, x, y);
  if (resultEl) {
    const cue = `cue-${outcome.moveType}`;
    resultEl.classList.add(cue);
    setTimeout(() => resultEl.classList.remove(cue), 600);
  }

  // Record discovery
  const isNew = recordDiscovery(outcome.result.id);
  onDiscovery(outcome.result, isNew);

  // Catastrophe lockout (Explore mode)
  if (isCatastrophe(outcome.result.id)) {
    triggerCatastropheLockout(outcome.result);
  }
}

function handleNull(actorEl, patientEl) {
  // Snap-back animation for the actor entity
  if (actorEl) {
    actorEl.classList.add("snapping-back");
    setTimeout(() => actorEl.classList.remove("snapping-back"), 200);
  }

  // First three nulls show a label
  if (nullCountThisSession < NUDGE_LIMIT) {
    nullCountThisSession++;
    const rect = patientEl.getBoundingClientRect();
    const ws = workspaceEl.getBoundingClientRect();
    showNudge(
      "no recipe — try a different patient",
      rect.left - ws.left + rect.width / 2,
      rect.top - ws.top - 8
    );
  }
}

function showNudge(text, x, y) {
  if (!nudgeEl) return;
  nudgeEl.textContent = text;
  nudgeEl.style.left = `${x}px`;
  nudgeEl.style.top  = `${y}px`;
  nudgeEl.style.transform = "translate(-50%, -100%)";
  nudgeEl.classList.add("show");
  clearTimeout(nudgeTimer);
  nudgeTimer = setTimeout(() => nudgeEl.classList.remove("show"), 1000);
}

function emitHalo(x, y, moveType) {
  const halo = document.createElement("div");
  halo.className = "craft-halo show";
  halo.dataset.move = moveType;
  halo.style.left = `${x}px`;
  halo.style.top  = `${y}px`;
  document.getElementById("craft-feedback").appendChild(halo);
  setTimeout(() => halo.remove(), 700);
}

function triggerCatastropheLockout(entity) {
  lockoutActive = true;
  catastropheOverlayEl.innerHTML = `
    <div class="catastrophe-card">
      <div class="catastrophe-emoji">${entity.emoji}</div>
      <div class="catastrophe-name">${entity.name}</div>
      <div class="catastrophe-surface">${entity.surface_lore}</div>
    </div>
  `;
  catastropheOverlayEl.classList.remove("hidden");
  setTimeout(() => {
    catastropheOverlayEl.classList.add("hidden");
    lockoutActive = false;
  }, 2000);
}

export function clearWorkspace() {
  entitiesEl.innerHTML = "";
  nullCountThisSession = 0;
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}
