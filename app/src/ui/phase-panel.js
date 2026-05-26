/**
 * Right panel — five phases, draggable.
 * Per docs/design/ui-layout.md §2.
 */

import { getEntity } from "../engine/recipes.js";

const PHASE_ORDER = ["wood", "fire", "earth", "metal", "water"];

export function initPhasePanel(opts = {}) {
  const onInspect = opts.onInspect || (() => {});
  const container = document.getElementById("phase-tiles");
  container.innerHTML = "";

  for (const id of PHASE_ORDER) {
    const entity = getEntity(id);
    if (!entity) continue;

    const tile = document.createElement("div");
    tile.className = "phase-tile";
    tile.dataset.phase = id;
    tile.draggable = true;
    tile.innerHTML = `
      <div class="tile-emoji">${entity.emoji}</div>
      <div class="tile-name">${entity.name}</div>
    `;

    tile.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.effectAllowed = "copy";
      try {
        ev.dataTransfer.setData("text/x-fec-phase", id);
        // Provide a fallback for safety
        ev.dataTransfer.setData("text/plain", id);
      } catch {
        /* ignore */
      }
      tile.dataset.justDragged = "1";
    });

    // Shift-click opens inspect without spawning. Plain click is reserved
    // for drag-affordance discoverability; we ignore it here.
    tile.addEventListener("click", (ev) => {
      if (tile.dataset.justDragged === "1") {
        tile.dataset.justDragged = "0";
        return;
      }
      if (ev.shiftKey) {
        ev.stopPropagation();
        onInspect(entity);
      }
    });

    container.appendChild(tile);
  }
}
