# Five-Element-Crafting — v1 scaffold

A vanilla-JS, static-hosted prototype of the Wu-Xing crafting game described in [`docs/design/`](../docs/design/).

## Run it

This app uses ES modules and `fetch()` for its JSON data, so it must be served over HTTP — opening `index.html` with `file://` will not work.

From this directory:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

Any static server works (`npx serve`, `caddy file-server`, GitHub Pages, etc.). There is no build step.

The live version is at <https://warrenrross.github.io/Five-Element-Crafting/>.

## What works in v1

### Explore mode (the sandbox)

- Three-panel layout: discoveries on the left, free-placement workspace in the center, five phase tiles on the right (per [`docs/design/ui-layout.md`](../docs/design/ui-layout.md)).
- Drag a phase tile onto the workspace to spawn it.
- Drag one workspace entity onto another to craft. Ordered-pair lookup against `src/data/recipes.json` (110 recipes covering all 95 v1 entities).
- Move-type cues (`docs/design/ui-layout.md §3.3`):
  - Sheng → green halo + pulse-up ("Infuse")
  - Ke → red halo + press-down ("Consume")
  - Self → gold halo + brightness hold ("Concentrate")
  - Insub → purple halo + horizontal shake ("Disturb")
  - Stage-2 → neutral indigo + rotate
- Self-craft walks Feeling → Surge → Storm via a per-element counter (`engine/self-state.js`).
- Null drops snap back and show a label for the first three nulls in a session.
- Catastrophe drops trigger a ~2-second lockout overlay.
- Discoveries ledger persists in `localStorage` under `fec.discoveries.v1`.
- Clicking a discovered entry in the left panel spawns a copy on the workspace and opens inspect. Shift-click inspects without spawning.
- Inspect drawer shows Surface lore, true-name (literal Wu Xing reading), phase-weight chips, and "Made by" recipes.
- **Clear** button removes everything from the workspace. Discoveries stay.
- **Reset** button wipes the entire game state: workspace, discoveries ledger, self-stage counters, Balance-mode histogram, and any in-progress puzzle. Returns to Explore mode.

### Balance mode (the puzzle)

Per [`docs/design/balance-mode.md`](../docs/design/balance-mode.md).

- Mode toggle in the workspace header switches between Explore and Balance.
- On entry, the workspace seeds with the five phase entities placed at pentagram vertices.
- SVG pentagram readout draws Sheng (outer ring) and Ke (inner star) cycles, with phase-node radii scaled to current weight and an "in-band" highlight when a phase enters the win window.
- Budget counter ticks down on every craft (including nulls, per §11).
- Pathology tray fills as Insub moves spawn pathology tokens. The tray has M+1 = 4 slots; the fourth is a "danger" slot. Pathology tokens are draggable targets — drop the correct Ke-controller phase onto them to clear.
- Difficulty selector: Gentle / Steady / Sharp. Each tier sets K (budget), ε (win-window half-width), and a target canonical-path count. PCG (backward-chain) seeds puzzles to hit those targets.
- "New puzzle" button regenerates against the current difficulty.
- End overlay fires on win or loss, showing the generator's canonical path side-by-side with the player's actual path.
- Clear button is hidden in Balance mode (per spec §13).

### Cross-cutting

- **Touch support.** Phase tiles, workspace entities, and pathology tokens all accept touch drags via a Pointer Events layer (`ui/touch-drag.js`). The native HTML5 drag-drop path stays the canonical desktop path; the touch layer only fires for `pointerType !== "mouse"`.
- **Mobile layout.** Below 600px wide, panels stack vertically: phases → workspace → discoveries.
- **Skill catalog.** Recurring workflows are documented in [`docs/skills/`](../docs/skills/) (see [`SKILLS.md`](../SKILLS.md) at the repo root).

## Not in v1 (intentional)

- Reading-lore (long-form citation-rich text) — lives in `docs/design/inspect-copy.md`; not loaded into the JSON catalog yet. Deferred until Balance mode has been playtested. See `AGENT_NOTES.md`.
- Audio / haptics.
- Gesture input via [Hand_AI](https://github.com/warrenrross/Hand_AI).
- Persistent per-session histogram for Balance-mode distribution (currently in-memory only).

## Layout

```
app/
  index.html
  src/
    main.js                  # entry; wires panels, modes, modals
    engine/
      recipes.js             # data loader, resolve(), discoveries ledger
      self-state.js          # per-element self-stage counter
      balance.js             # BalanceSession class, deltas, pathologies, scoring
      pcg.js                 # backward-chain puzzle generator
    ui/
      phase-panel.js         # right panel
      workspace.js           # center; drag/drop, craft resolve, cues, lockouts
      discoveries.js         # left panel
      inspect.js             # slide-in drawer
      pentagram.js           # SVG Sheng/Ke readout
      balance-hud.js         # budget, pathology tray, difficulty, end overlay
      touch-drag.js          # Pointer Events drag-drop for touchscreens
    data/
      entities.json          # 95 entities
      recipes.json           # 110 ordered-pair recipes
      self_progression.json  # Phase → Feeling → Surge → Storm
      catastrophes.json      # IDs that trigger the lockout overlay
    styles/
      main.css               # all styles, including the 600px breakpoint
```

## Working on this app

See [`SKILLS.md`](../SKILLS.md) at the repo root for a catalog of recurring workflows: adding an entity, adding a recipe, mobile testing, tuning Balance mode, deploying, and more.
