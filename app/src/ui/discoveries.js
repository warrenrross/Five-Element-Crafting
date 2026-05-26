/**
 * Left panel — discoveries ledger.
 * Per docs/design/ui-layout.md §4.
 *
 * Grouped by entity class with locked silhouettes for undiscovered entries.
 * Click on a discovered entry spawns a copy on the workspace.
 * Click also opens the inspect drawer.
 */

import {
  getAllEntities,
  isDiscovered,
  getDiscoveryCount,
  getDiscoveredCount,
} from "../engine/recipes.js";

const GROUP_DEFS = [
  { id: "phase",   label: "Phases" },
  { id: "sheng",   label: "Sheng" },
  { id: "ke",      label: "Ke" },
  { id: "feeling", label: "Feelings" },
  { id: "surge",   label: "Surges" },
  { id: "storm",   label: "Storms" },
  { id: "insub",   label: "Insubordinate" },
  { id: "stage2-sheng-sheng", label: "Sheng \u00d7 Sheng" },
  { id: "stage2-ke-ke",       label: "Ke \u00d7 Ke" },
  { id: "stage2-sheng-ke",    label: "Sheng \u00d7 Ke" },
  { id: "stage2-bridge",      label: "Mixed bridges" },
  { id: "refined",            label: "Refined variants" },
  { id: "catastrophe",        label: "Catastrophes" },
];

let containerEl = null;
let counterEl = null;
let onCellSpawn = null;
let onCellInspect = null;

export function initDiscoveries(opts) {
  containerEl = document.getElementById("discoveries-groups");
  counterEl = document.getElementById("discovery-counter");
  onCellSpawn = opts.onSpawn || (() => {});
  onCellInspect = opts.onInspect || (() => {});

  render();
}

export function refresh() {
  render();
}

function render() {
  if (!containerEl) return;
  const allEntities = getAllEntities();
  const total = allEntities.length;
  counterEl.textContent = `${getDiscoveredCount()} / ${total}`;

  containerEl.innerHTML = "";

  for (const def of GROUP_DEFS) {
    const groupEntities = allEntities.filter((e) => e.tier === def.id);
    if (groupEntities.length === 0) continue;

    const discoveredInGroup = groupEntities.filter((e) => isDiscovered(e.id)).length;

    const group = document.createElement("section");
    group.className = "discovery-group";
    group.innerHTML = `
      <div class="discovery-group-header">
        <span>${def.label}</span>
        <span class="group-count">${discoveredInGroup}/${groupEntities.length}</span>
      </div>
      <div class="discovery-list"></div>
    `;

    const list = group.querySelector(".discovery-list");

    for (const entity of groupEntities) {
      const cell = document.createElement("div");
      const discovered = isDiscovered(entity.id);
      cell.className = "discovery-cell" + (discovered ? "" : " locked");
      cell.dataset.entityId = entity.id;
      if (discovered) {
        cell.dataset.name = entity.name;
        cell.innerHTML = `
          <span class="discovery-emoji">${entity.emoji}</span>
          ${getDiscoveryCount(entity.id) > 1
            ? `<span class="discovery-count">${getDiscoveryCount(entity.id)}</span>`
            : ""}
        `;
        cell.addEventListener("click", (ev) => {
          // Single-click: spawn. Shift- or right-click: inspect only.
          if (ev.shiftKey || ev.button === 2) {
            onCellInspect(entity);
          } else {
            onCellSpawn(entity);
            onCellInspect(entity);
          }
        });
      }
      list.appendChild(cell);
    }

    containerEl.appendChild(group);
  }
}
