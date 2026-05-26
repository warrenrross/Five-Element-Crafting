/**
 * Entry point.
 *
 * Loads data, wires up the three panels, the inspect drawer, and the
 * Clear button. See docs/design/ui-layout.md for the panel layout.
 */

import {
  loadData,
  ensureLedger,
  isDiscovered,
  recordDiscovery,
} from "./engine/recipes.js";
import { initPhasePanel } from "./ui/phase-panel.js";
import { initDiscoveries, refresh as refreshDiscoveries } from "./ui/discoveries.js";
import { initWorkspace, spawnEntity, clearWorkspace } from "./ui/workspace.js";
import { initInspect, openInspect, closeInspect } from "./ui/inspect.js";

async function main() {
  try {
    await loadData();
  } catch (err) {
    showFatal(err);
    return;
  }

  ensureLedger();

  // Phases count as "discovered" so they render filled in the left panel
  // from the very first run.
  for (const phaseId of ["wood", "fire", "earth", "metal", "water"]) {
    if (!isDiscovered(phaseId)) recordDiscovery(phaseId);
  }

  // Inspect drawer first — the other modules call openInspect from their
  // event handlers.
  initInspect();

  initPhasePanel({
    onInspect: (entity) => openInspect(entity),
  });

  initDiscoveries({
    onSpawn: (entity) => {
      spawnEntity(entity);
    },
    onInspect: (entity) => {
      openInspect(entity);
    },
  });

  initWorkspace({
    onDiscovery: (entity, isNew) => {
      refreshDiscoveries();
      if (isNew) {
        openInspect(entity);
      }
    },
    onEntityClick: (entity) => {
      openInspect(entity);
    },
  });

  wireClearButton();
}

function wireClearButton() {
  const btn = document.getElementById("clear-btn");
  const modal = document.getElementById("clear-modal");
  const confirmBtn = document.getElementById("clear-confirm");
  const cancelBtn = document.getElementById("clear-cancel");

  const open = () => {
    modal.classList.remove("hidden");
  };
  const close = () => {
    modal.classList.add("hidden");
  };

  btn.addEventListener("click", open);
  cancelBtn.addEventListener("click", close);
  confirmBtn.addEventListener("click", () => {
    clearWorkspace();
    close();
  });
  modal.addEventListener("click", (ev) => {
    if (ev.target === modal) close();
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !modal.classList.contains("hidden")) close();
  });
}

function showFatal(err) {
  const body = document.body;
  const banner = document.createElement("div");
  banner.style.cssText = `
    position: fixed; inset: 0; display: grid; place-items: center;
    background: rgba(0,0,0,0.85); color: #f8e3a0;
    font-family: system-ui, sans-serif; padding: 24px; z-index: 9999;
  `;
  banner.innerHTML = `
    <div style="max-width: 480px; text-align: center;">
      <h2 style="margin-bottom: 12px;">Failed to load game data</h2>
      <p style="margin-bottom: 12px;">${escapeHtml(err.message || String(err))}</p>
      <p style="font-size: 0.85em; opacity: 0.7;">
        This app uses ES modules and fetches JSON. It must be served over HTTP,
        not opened with file://. From <code>app/</code> run
        <code>python3 -m http.server 8000</code> and open
        <code>http://localhost:8000</code>.
      </p>
    </div>
  `;
  body.appendChild(banner);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

main();
