# Skills

Recurring workflows for working on Five-Element-Crafting. Each skill is a self-contained markdown file under [`docs/skills/`](./docs/skills/) that walks through the procedure, the files it touches, and the gotchas to watch for.

Think of these as "how-to bookmarks for your future self." When you sit down to make a change to this repo, look here first.

## Quick reference

| # | Skill | When to use |
|---|---|---|
| 1 | [Local dev loop](./docs/skills/01-local-dev-loop.md) | Every time you sit down to edit the app |
| 2 | [Add a new entity](./docs/skills/02-add-entity.md) | Introducing a new craftable result, a new phase modifier, etc. |
| 3 | [Add or modify a recipe](./docs/skills/03-add-recipe.md) | Wiring an actor/patient pair to a result |
| 4 | [Regenerate data files](./docs/skills/04-regenerate-data.md) | After bulk-editing the design docs that drive the JSON |
| 5 | [Headless smoke test](./docs/skills/05-headless-smoke-test.md) | Before pushing anything non-trivial |
| 6 | [Mobile and touch testing](./docs/skills/06-mobile-and-touch.md) | After touching any drag-drop, layout, or HUD code |
| 7 | [Add a UI surface](./docs/skills/07-add-ui-surface.md) | New panel, drawer, overlay, or HUD chrome |
| 8 | [Tune Balance mode](./docs/skills/08-tune-balance.md) | Adjusting deltas, difficulty bands, PCG bias |
| 9 | [Deploy to GitHub Pages](./docs/skills/09-deploy.md) | Publishing changes |
| 10 | [AGENT_NOTES handoff](./docs/skills/10-agent-notes.md) | At the end of every working session |
| 11 | [Add a new mechanic](./docs/skills/11-add-mechanic.md) | New move type, new state-vector dimension, or new resolution rule |

## Where things live

A one-line map so you can find what you need without searching.

```
five-element-crafting/
  README.md                       # Project overview
  SKILLS.md                       # This file
  AGENT_NOTES.md                  # Session-to-session handoff log

  app/                            # The playable v1 scaffold (vanilla JS, no build step)
    index.html                    # Single page, three-panel layout
    src/
      main.js                     # Entry point; wires panels, modes, modals
      engine/
        recipes.js                # Data loader, resolve() (ordered-pair table + concentration-additive self-rule), discoveries ledger
        balance.js                # BalanceSession class, phase deltas, win/lose, pathologies
        pcg.js                    # Backward-chain puzzle generator with difficulty tiers
      ui/
        phase-panel.js            # Right panel — five phase tiles
        workspace.js              # Center — drag-drop, craft resolve, cues, lockouts
        discoveries.js            # Left panel — discovered entities grouped by tier
        inspect.js                # Right-edge slide-in drawer with entity lore
        pentagram.js              # SVG Sheng/Ke readout for Balance mode
        balance-hud.js            # Budget counter, pathology tray, difficulty selector, end overlay
        touch-drag.js             # Pointer-event based drag-drop for touchscreens
      data/
        entities.json             # 100 entities (id, name, emoji, tier, concentration, phase_weights, lore)
        recipes.json              # 110 ordered-pair recipes (cross-phase results)
        self_progression.json     # Phase × concentration → result lookup (replaces stage-counter)
        catastrophes.json         # IDs that trigger the lockout overlay (Stage-2 catastrophes + 5 self-overflows)
      styles/
        main.css                  # All styles, including the 600px breakpoint

  docs/
    design/                       # Game mechanics and UI spec (source of truth for what the game *is*)
    research/                     # Wu Xing source material and prior-art references
    skills/                       # This catalog (one file per recurring workflow)
```

## Conventions

A few things that hold across every skill:

- **The design docs are the source of truth.** When `docs/design/*` and the implementation disagree, fix the implementation. If the design is wrong, update the doc *first*, then the code.
- **The predict-your-next-drag principle**, from `docs/design/decisions-for-richest-play.md`, governs every UI and naming call: "The player should be able to predict, with reasonable accuracy, what their next drag will produce, without having read instructions."
- **No build step.** Edit, save, hard-refresh. If you find yourself wanting to add a bundler, write down why in `docs/design/open-questions.md` first.
- **No new vocabulary without ratification.** Renames go through `docs/design/naming-ratification.md` against the predict-your-next-drag principle.
- **The move-type animation vocabulary is locked** in three places (`balance-mode.md §15.4`, `ui-layout.md §3.3`, CSS `.cue-*`). If you change it, update all three.
- **Session work always ends with an `AGENT_NOTES.md` entry** — see [skill 10](./docs/skills/10-agent-notes.md).
