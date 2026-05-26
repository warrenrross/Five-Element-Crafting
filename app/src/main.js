/**
 * Entry point.
 *
 * Loads data, wires up the three panels, the inspect drawer, the Clear
 * button, the Explore/Balance mode toggle, and the Balance HUD.
 * See docs/design/ui-layout.md and docs/design/balance-mode.md.
 */

import {
  loadData,
  ensureLedger,
  isDiscovered,
  recordDiscovery,
  resetLedger,
  getEntity,
} from "./engine/recipes.js";
import { initPhasePanel } from "./ui/phase-panel.js";
import { initDiscoveries, refresh as refreshDiscoveries } from "./ui/discoveries.js";
import {
  initWorkspace,
  spawnEntity,
  clearWorkspace,
  setBalanceSession,
  clearBalanceSession,
} from "./ui/workspace.js";
import { initInspect, openInspect } from "./ui/inspect.js";
import { initPentagram, renderPentagram, showPentagram, hidePentagram } from "./ui/pentagram.js";
import {
  initBalanceHud,
  showBalanceHud,
  hideBalanceHud,
  renderHud,
  showEndOverlay,
  hideEndOverlay,
  setDifficulty,
} from "./ui/balance-hud.js";
import { BalanceSession, PHASES } from "./engine/balance.js";
import { generatePuzzle, resetSessionHistogram } from "./engine/pcg.js";

let currentMode = "explore";          // "explore" | "balance"
let currentPuzzle = null;             // last generated puzzle (for end overlay)
let currentBalanceSession = null;

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
  for (const phaseId of PHASES) {
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
      // In Balance mode, spawning entities from the discoveries panel would
      // break the puzzle (it bypasses the move budget). Disable it during a
      // live puzzle. The inspect drawer still opens.
      if (currentMode === "balance") {
        openInspect(entity);
        return;
      }
      spawnEntity(entity);
    },
    onInspect: (entity) => openInspect(entity),
  });

  initWorkspace({
    onDiscovery: (entity, isNew) => {
      refreshDiscoveries();
      if (isNew) openInspect(entity);
    },
    onEntityClick: (entity) => openInspect(entity),
  });

  initPentagram();

  initBalanceHud({
    onNewPuzzle: (difficulty) => startNewPuzzle(difficulty),
    onModeExit: () => setMode("explore"),
  });

  wireClearButton();
  wireResetButton();
  wireModeToggle();
}

function wireModeToggle() {
  document.getElementById("mode-explore").addEventListener("click", () => {
    setMode("explore");
  });
  document.getElementById("mode-balance").addEventListener("click", () => {
    setMode("balance");
  });
}

function setMode(mode) {
  if (mode === currentMode) return;
  currentMode = mode;

  const exploreBtn = document.getElementById("mode-explore");
  const balanceBtn = document.getElementById("mode-balance");
  exploreBtn.classList.toggle("active", mode === "explore");
  balanceBtn.classList.toggle("active", mode === "balance");

  const footerMode = document.getElementById("footer-mode");
  if (footerMode) {
    footerMode.textContent = mode === "balance" ? "Balance mode" : "Explore mode";
  }

  const clearBtn = document.getElementById("clear-btn");

  if (mode === "balance") {
    clearBtn.classList.add("hidden"); // per balance-mode.md §13
    showBalanceHud();
    showPentagram();
    resetSessionHistogram();
    startNewPuzzle("steady");
  } else {
    clearBtn.classList.remove("hidden");
    hideBalanceHud();
    hidePentagram();
    hideEndOverlay();
    clearBalanceSession();
    currentBalanceSession = null;
    currentPuzzle = null;
    clearWorkspace();
  }
}

function startNewPuzzle(difficulty) {
  clearWorkspace();
  const puzzle = generatePuzzle(difficulty);
  currentPuzzle = puzzle;

  const session = new BalanceSession(puzzle);
  currentBalanceSession = session;
  setBalanceSession(session, {
    onUpdate: () => {
      renderHud(session);
      renderPentagram(session.state, puzzle.epsilon);
    },
    onEnd: () => showEndOverlay(session, puzzle),
  });

  setDifficulty(difficulty);

  // Seed the workspace with one starting entity per phase, scaled by the
  // starting weights. This visualizes the imbalance directly: the deficient
  // phase has fewer (or no) entities, the excess has more.
  seedWorkspaceFromState(puzzle.startingState);

  renderPentagram(session.state, puzzle.epsilon);
  renderHud(session);
}

/**
 * Place 5 phase entities on the workspace, one per phase, at the pentagram
 * vertex positions. The actual phase-vector accounting is held by the
 * session — these are visual anchors and drag-from sources.
 */
function seedWorkspaceFromState(state) {
  const ws = document.getElementById("workspace").getBoundingClientRect();
  // Phase positions in pentagram order, scaled inward so they don't
  // overlap the HUD chrome.
  const cx = ws.width / 2;
  const cy = ws.height / 2;
  const r = Math.min(ws.width, ws.height) * 0.28;
  const angles = {
    wood:  -Math.PI / 2,
    fire:  -Math.PI / 2 + (2 * Math.PI) / 5,
    earth: -Math.PI / 2 + (4 * Math.PI) / 5,
    metal: -Math.PI / 2 + (6 * Math.PI) / 5,
    water: -Math.PI / 2 + (8 * Math.PI) / 5,
  };
  for (const p of PHASES) {
    const a = angles[p];
    spawnEntity(getEntity(p), cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
}

function wireClearButton() {
  const btn = document.getElementById("clear-btn");
  const modal = document.getElementById("clear-modal");
  const confirmBtn = document.getElementById("clear-confirm");
  const cancelBtn = document.getElementById("clear-cancel");

  const open = () => modal.classList.remove("hidden");
  const close = () => modal.classList.add("hidden");

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

/**
 * Reset the whole game board: workspace, discoveries ledger, self-stage
 * counters, Balance session, mode, and any open overlays. Phases are
 * re-recorded so the left panel doesn't start with locked phase cells —
 * matches the first-load behavior in main().
 */
function wireResetButton() {
  const btn = document.getElementById("reset-btn");
  const modal = document.getElementById("reset-modal");
  const confirmBtn = document.getElementById("reset-confirm");
  const cancelBtn = document.getElementById("reset-cancel");

  const open = () => modal.classList.remove("hidden");
  const close = () => modal.classList.add("hidden");

  btn.addEventListener("click", open);
  cancelBtn.addEventListener("click", close);
  confirmBtn.addEventListener("click", () => {
    resetGame();
    close();
  });
  modal.addEventListener("click", (ev) => {
    if (ev.target === modal) close();
  });
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && !modal.classList.contains("hidden")) close();
  });
}

function resetGame() {
  // 1. End any Balance session and snap back to Explore (uses the existing
  //    setMode teardown, which clears the workspace, hides HUD/pentagram/
  //    end-overlay, and drops the BalanceSession reference).
  if (currentMode === "balance") {
    setMode("explore");
  } else {
    clearWorkspace();
  }

  // 2. Wipe persistent state.
  resetLedger();
  resetSessionHistogram();

  // 3. Re-seed the phases as discovered (parity with first-load).
  for (const phaseId of PHASES) {
    if (!isDiscovered(phaseId)) recordDiscovery(phaseId);
  }

  // 4. Repaint the discoveries panel so the counter and locked cells refresh.
  refreshDiscoveries();
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
