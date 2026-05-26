# AGENT_NOTES

Session-to-session handoff notes for Five-Element-Crafting. Matches the convention used in [Hand_AI](https://github.com/warrenrross/Hand_AI) and [gesture-detect-research](https://github.com/warrenrross/gesture-detect-research).

## 2026-05-26 (latest+3) — Skills catalog landed; READMEs refreshed

Shipped this session:

1. **New `SKILLS.md` at repo root + `docs/skills/` directory.** Eleven skill files, one per recurring workflow: local dev loop, add entity, add recipe, regenerate data, headless smoke test, mobile + touch testing, add UI surface, tune Balance, deploy to Pages, AGENT_NOTES handoff, add mechanic. Each skill is prescriptive: touchpoints → procedure → gotchas → related. The catalog index at `SKILLS.md` includes a quick reference table, a where-things-live map, and the project conventions that hold across every skill (predict-your-next-drag principle, design-docs-as-source-of-truth, no-build-step, etc.).
2. **`app/README.md` refreshed.** Previously claimed Balance mode and Reset and touch-drag were "not in v1". Now accurately documents all three, plus the touch-drag layer, the 600px breakpoint, and links to the skill catalog.
3. **Root `README.md` updated** to point at `SKILLS.md` and `docs/skills/` from the where-to-start list.
4. **Verified zero broken markdown links** across the whole repo (Python script in this session, not committed).

**Deferred — pending need**:

- **`tools/build_data.py` regeneration script.** Skill 4 documents what it should do and how to reconstruct it if missing. The script itself was written in `/tmp/` during the v1 scaffold session and never committed. Future contributors will need to either reconstruct it (skill 4 has the recipe) or accept that bulk entity/recipe changes get edited by hand. Not blocking until we actually need a bulk regen.
- **Persistent Balance-mode histogram.** Currently in-memory only. Persisting to localStorage would give long-term distribution control across sessions, but adds a migration concern and isn't needed until playtest data demands it.

## 2026-05-26 (latest+2) — Touch-drag layer for mobile

*(Previously: "Reset button added")*

This entry covers two earlier sessions that didn't get logged at the time:

1. **Reset button.** Distinct from Clear: wipes workspace + discoveries ledger + self-stage counters + Balance-mode session histogram + any in-progress puzzle, returns to Explore mode. Red-tinted border, confirm modal, re-seeds the five phase entities as discovered to match first-load. See `wireResetButton()` and `resetGame()` in `main.js`.
2. **Touch-drag.** New `app/src/ui/touch-drag.js` provides a `makeTouchDraggable()` helper using Pointer Events. Coexists with HTML5 drag-drop (only fires for `pointerType !== "mouse"`). Workspace.js exports `dispatchPhaseDrop`, `dispatchEntityDrop`, `dispatchPathologyDrop` so the touch path reuses the same business logic as the desktop drop handlers. 6px move threshold + 180ms long-press, `body.touchAction = "none"` during drags, ghost element follows the finger. Verified end-to-end on synthetic iPhone 13 viewport including Balance-mode crafts and Reset.

## 2026-05-26 (latest+1) — Balance mode landed, mobile pass, Pages deploy

Shipped this session:

1. **Balance mode is now implemented in the scaffold.** New engine modules `app/src/engine/balance.js` (BalanceSession class, phase deltas, scoring, win/lose checks, pathology clearing) and `app/src/engine/pcg.js` (backward-chain PCG with `PATH_COUNT_CAP=200`, solvability check, session histogram). New UI modules `app/src/ui/pentagram.js` (SVG pentagram readout with phase-node radii scaled to weight, in-band highlight) and `app/src/ui/balance-hud.js` (budget counter, pathology tray, difficulty selector, end overlay with side-by-side generator vs. player paths). Workspace controller is now mode-aware: when a `BalanceSession` is set, crafts route through `session.applyMove()`, Insub spawns a draggable pathology token, nulls still cost budget per spec §11, and the Clear button is hidden per §13. Mode toggle in the workspace header switches between Explore (sandbox, free spawn) and Balance (puzzle, fixed seed).
2. **Mobile pass.** Verified the 600px breakpoint with headless Playwright. Layout stacks cleanly: Phases → Workspace → Discoveries. Balance HUD, pentagram, pathology tray, and MOVES counter all fit in 600px width. Footer mode label now reflects current mode (`Explore mode` / `Balance mode`) instead of being hard-coded.
3. **GitHub Pages deploy.** Repo is configured to serve from `/app/` on `main`. Live URL: https://warrenrross.github.io/Five-Element-Crafting/.

**Deferred — pending playtest**:

- **Reading-lore wiring into the inspect drawer.** `docs/design/inspect-copy.md` carries the long-form citation-rich text per entity, but v1 inspect still shows only Surface + True-name + phase-weights + recipes. Adding `reading_lore` to the entity JSON and rendering it as a third drawer section is a small change, but we want to playtest the current inspect surface first — the predict-your-next-drag principle argues for keeping inspect lean until we see whether players actually open it during a Balance puzzle. Revisit after playtesting Balance mode end-to-end.

## 2026-05-26 — v1 scaffold, naming ratified, inspect/layout docs landed

Three shipped this session:

1. **Naming ratification** — `docs/design/naming-ratification.md` documents 8 renames against the predict-your-next-drag principle. Mixed bridges (§3.3): Inlay→Brand, Rust-Ore→Patina, Spring-Well→Wellspring, Frost-Edge→Rime (Pyre kept). Catastrophes (§5): Wildstorm→Conflagration, Steam-Storm→Geyser, Cracked-Earth→Fissure, Hardpack→Tundra (Firestorm, Sandstorm, Dustbowl, Blizzard, Eruption, Permafrost kept). Renames applied inline to `docs/design/stage-2-crafts.md`. Entity count corrected from 85 to **95** (5 phases + 5 Sheng + 5 Ke + 10 Insub + 5 Feeling + 5 Surge + 5 Storm + 55 stage-2).
2. **Design docs** — `docs/design/inspect-copy.md` (598 lines, all 95 entities with Surface/Reading/True-name structure, citations to Aetherium and Healthline) and `docs/design/ui-layout.md` (258 lines, three-panel spec with move-type animation vocabulary, free-placement workspace, snap-back nudge, catastrophe lockout, mobile breakpoint at 600px).
3. **v1 scaffold** — `app/` directory, vanilla JS, no build step. Serves over `python3 -m http.server`. Implements the four move types with their animation cues (Infuse/Consume/Concentrate/Disturb + stage-2 rotate), self-stage progression, discoveries ledger in localStorage, inspect drawer with phase-weight chips and "Made by" recipes, Clear + confirm modal, catastrophe lockout overlay. Three-panel layout matches `ui-layout.md`. JSON data files (95 entities, 110 recipes, self-progression, 10 catastrophes) generated from `stage-2-crafts.md` §8 by a build script kept in `/tmp/build_data.py` (not committed; re-run only when the entity table changes).

**Move-type animation vocabulary** is now locked in three places: `balance-mode.md` §15.4, `ui-layout.md` §3.3, and the CSS `.cue-*` classes in `app/src/styles/main.css`. Any new UI surface should reuse the same halo colors and motion verbs:
- Sheng = **Infuse**: green halo + pulse-up
- Ke = **Consume**: red halo + press-down
- Self = **Concentrate**: gold halo + brightness hold
- Insub = **Disturb**: purple halo + horizontal shake
- Stage-2 = neutral indigo + rotate

Open items for the next session:
- Balance mode is fully spec'd in `docs/design/balance-mode.md` but not implemented in the scaffold. The workspace already has a hidden `#pentagram-background` placeholder to extend into.
- Reading-lore (the long-form, citation-rich text from `inspect-copy.md`) is intentionally **not** in the JSON yet — v1 inspect shows only Surface + True-name + phase weights + recipes. If we want Reading-lore in-app, add a `reading_lore` field to entities and load `inspect-copy.md` excerpts.
- Mobile testing has not been performed. CSS includes a 600px breakpoint but it has not been exercised.
- The discoveries panel currently treats phases as auto-discovered on first load so the cells aren't locked at start. Consider whether that's the right default once Balance mode lands.
- Deploy: GitHub Pages would work — the repo is public and the app is fully static. Set Pages to serve from `/app/` on main.


## 2026-05-25 — Repo bootstrap

Repo created from a brainstorming session. Decisions locked so far:

- **Mechanism**: ordered-pair crafting `(actor, patient)` over the five Wu Xing phases. Drag direction encodes which is which — the element being dragged is the actor; the element it lands on is the patient. This is the key divergence from Infinite Craft, whose pair function is symmetric.
- **Interaction grid**: 25 cells total — 5 Sheng edges, 5 Ke edges, 5 self-on-self, 10 insubordinate. Hand-authored, finite, tractable.
- **Self-on-self** has a three-stage reveal: emotion → excess pattern → pathology. This is the primary discovery hook.
- **Insubordinate pairings** (e.g. Wood → Metal, which violates both Sheng and Ke directions) produce the *actor's* pathology, collapsing each element's four insubordinate-outbound entries to one memorable result per element.
- **UI**: right panel = building blocks (spawn from here), left panel = discoveries (score / dex, display-only). Only icons crafted in the current session are usable on the workspace.
- **Inspect feature** is on the roadmap; for now we keep notes on what each icon means so the future inspect panel has copy to draw from.
- **Modes**: Explore (sandbox, ship first) and Balance and Harmonize (puzzle mode, later). Naming locked.
- **Gestures**: deferred. v1 is mouse/touch only. We will copy/reference the open-source Infinite Craft clone for the underlying drag-and-drop scaffolding and rebuild the recipe engine on top.

## Open questions to revisit

- Discoveries panel — flat list or grouped by class (Phases / Emotions / Excess / Pathology / Syndromes / Organs)?
- Are stage-1 craft results panel entries or transient events? Hybrid leaning: panel entry on first occurrence, transient effect on repeat.
- When we add gestures, which two unwired Hand_AI gestures (Fist, Thumbs-up) bind to what? Leading candidate: mode toggle and submit-answer (in Balance/Harmonize mode).
- LLM-backed "infinite" extension for an eventual v3 — does it stay strictly inside Wu Xing semantics, or can it generate outside the TCM register?

## What to do next session

1. ~~Stand up the 25-cell interaction table in `docs/design/interaction-grid.md`.~~ Done 2026-05-25.
2. ~~Sketch the self-on-self three-stage table per element.~~ Done — folded into `interaction-grid.md` §3.
3. Add a brief `docs/research/open-craft-reference.md` noting that Open Craft (Vue + Mistral, YouTube `aqrPOPq1kP0`) is **reference only**, not a code dependency — confirmed in the 2026-05-25 follow-up.
4. Decide on the technology baseline (vanilla JS like Hand_AI, or a small framework). Default: vanilla JS, static hosting on GitHub Pages, matching the rest of the project family.
5. Resolve the four open authoring questions at the end of `interaction-grid.md` (re-craftable Sheng/Ke results; counter persistence; insubordinate flavor copy; emoji audit).
6. ~~Begin `docs/design/stage-2-crafts.md` — combining results with results.~~ Done 2026-05-25. 55 stage-2 entities authored; v1 grand total 85 entities. Tail: naming pass on catastrophes and mixed bridges; explicit nulls list; phase-weight tuning post-Balance-mode.
7. Review `docs/design/open-questions.md` when ready — Q6 (stage-2 failure state) is the only un-locked stage-2 question; everything else either has a Medium-version answer or is explicitly UI-deferred.
8. ~~Review and ratify `docs/design/decisions-for-richest-play.md`.~~ Answered all of `open-questions.md` against the predict-your-next-drag principle. Stage-2 authoring is now unblocked.
9. ~~Research prior art for Wu Xing puzzle mechanics.~~ Done 2026-05-26. See `docs/research/wu-xing-puzzle-prior-art.md`.
10. ~~Author `docs/design/balance-mode.md` using the prior-art report §14 recommendations as the baseline.~~ Done 2026-05-26.
11. Naming-ratification pass on stage-2 catastrophes (§5 of `stage-2-crafts.md`) and mixed bridges (§3.3).
12. Begin v1 implementation scaffold — vanilla JS, static-hosted, mirroring the Open Craft (Vue + Mistral, YouTube `aqrPOPq1kP0`) drag-and-drop surface. The recipe engine consumes the 85-entity recipe table from `stage-2-crafts.md` §8.
13. Draft `docs/design/inspect-copy.md` (lore strings per icon) and `docs/design/ui-layout.md` (right/left/workspace panels) once the v1 clone is playable enough to compare against.

## 2026-05-26 (latest) — Balance and Harmonize mode authored

Added `docs/design/balance-mode.md` (~390 lines). The doc opens with the user-supplied frame — Tigris & Euphrates lowest-score-wins, Smith et al. backward-walk PCG, Gloomhaven Infuse/Consume vocabulary, Gogyo Trick four-outcome validation — then carries the CPS Construct/Procedure/Script framework only into §15 as a tiebreaker, per the user's instruction. Highlights:

- **Win condition** — `score = min(phase_weights)`, win when `score ≥ 0.2 − ε` (ε = 0.03 default). Lowest-element-wins maps Tigris & Euphrates' four-color floor directly onto the five-phase floor without remixing the metaphor.
- **Move semantics** — each of the four resolution types gets a Gloomhaven-style verb: Sheng = **Infuse** (+Δ patient), Ke = **Consume** (−Δ patient, +δ actor), Self = **Concentrate** (+Δ_self actor), Insub = **Disturb** (pathology token, no phase shift). Defaults: Δ = 0.05, δ = 0.02, Δ_self = 0.08.
- **Difficulty tiers** — Gentle (K=8, ε=0.05, 15+ solution paths), Steady (K=6, ε=0.03, 5–10 paths), Sharp (K=5, ε=0.02, 1–3 paths). Volden et al. genetic-PCG run = 24 generations target.
- **Pathology token cap M = 3.** Insubordinate moves are sometimes optimal (free actor boost-by-omission), but the third Disturb token loses the puzzle. Mirrors Gogyo Trick's 侮 outcome.
- **PCG pipeline** — Smith et al. backward-chain from a balanced terminal state → solvability check → Volden et al. genetic calibration to the target tier → Katz et al. statistical distribution control across a session.
- **Catastrophes integrate cleanly.** Storm × Storm results are forbidden moves in Balance mode (the brief workspace lockout that Explore mode uses doesn't make sense here); attempting one consumes the move and adds a Disturb token.
- **§15 CPS alignment** — **Strong**: phases + rules = Constructs, the puzzle loop = Procedure. **Speculative**: named opening lines as Scripts (flagged for playtest, not v1). **Weak**: left as notes only. §15.4 surfaces a UI requirement the framework made obvious — the four move types need visually distinct icons or animations so the player can read "what kind of move did I just make?" without inspecting.
- **Failure surface validated against Gogyo Trick's four outcomes** — successful Sheng, successful Ke, Self-overload, and Insubordinate-pathology each have a distinct mode-end state in our model. The full mapping is in §9.

Open tail items (§17): the move-budget K curve across a session, whether Feelings carry over from Explore into Balance, and whether the Sharp tier should ever require an Insubordinate move (currently no — Disturb is always sub-optimal).

## 2026-05-26 — Wu Xing puzzle prior-art research landed

Added `docs/research/wu-xing-puzzle-prior-art.md` (410 lines, ~50 KB). Deep-research dive into prior art across six scopes: East Asian games (Chinese/Japanese/Korean/Vietnamese), Western five-element games, TCM educational apps, board/tabletop RPGs, open-source GitHub projects, and academic PCG literature. Read this before authoring `docs/design/balance-mode.md`.

Key findings:

- **No direct competitor** covers all four resolution types (Sheng/Ke/Self/Insub) *plus* a move-budget balance puzzle. The closest structural relative is *Wind and Water: Puzzle Battles* (2007), which used Wu Xing tiles in a dedicated puzzle mode with move counts.
- **五行トリテ / Gogyo Trick** (2021, Japan) is the only prior art with all four Wu Xing relationship types (生 / 克 / 䫦 / 乘) as distinct game outcomes — an exact four-outcome match to our resolution model.
- **Gloomhaven's infuse/consume** is the strongest Sheng-chaining precedent worth studying.
- **Tigris & Euphrates** "lowest score wins" is the canonical balance-enforcement mechanic.
- The report includes a **12-game taxonomy table** with Five-Element-Crafting as the only entry rated ✅ on all six design axes.
- A **full PCG pipeline spec** is included (backward-chain generation → genetic difficulty calibration → solvability constraint → statistical distribution control), backed by Smith et al., Levonyan et al., Volden et al., and Katz et al. academic citations.
- The report's §14 lays out 6 concrete recommendations for `docs/design/balance-mode.md`.

Next-session work: author `docs/design/balance-mode.md` using the prior-art report as the design baseline.

## 2026-05-25 (latest+2) — Stage-2 authored

Added `docs/design/stage-2-crafts.md`. Authored all 55 stage-2 entities:

- **§1 Sheng × Sheng (10)** — organic, additive substances. Hearth, Charcoal, Sap, Grove, Slag, Lye, Loam, Vein, Root-Ore, Bud.
- **§2 Ke × Ke (10)** — human-made constructions. Levee, Marsh, Charwood, Stump, Reservoir, Furnace, Wedge, Quench-Bath, Whetstone, Anvil.
- **§3 Sheng × Ke cross (15)** — the thematically richest layer. Bellows, Mortar, Hilt, Spring, Canopy, Tinder, Brick, Bloom, Ingot, Plank, Inlay, Rust-Ore, Pyre, Spring-Well, Frost-Edge. The 10 unauthored ordered pairs are deliberate nulls.
- **§4 Result-on-origin-phase refined variants (10)** — highest-purity entities outside phases. Bonfire, Topsoil, Bullion, Spring-Water, Orchard (Sheng-refined); Heartwood, Bedrock, Monsoon, Inferno, Whetted-Steel (Ke-refined).
- **§5 Storm × Storm catastrophes (10)** — 50/50 phase-weight terminal events with brief workspace lockout. Firestorm, Sandstorm, Dustbowl, Blizzard, Eruption, Wildstorm, Steam-Storm, Cracked-Earth, Permafrost, Hardpack.
- **§6 Feeling-modifier resolution** — 5 bias rules cover all 250 (50 cells × 5 Feelings) modified-craft cases without expanding the entity count. Eight "wastes silently" edge cases enumerated.
- **§7 `phase_weights` distribution** across all 85 v1 entities tabulated.
- **§8 Recipe-table JSON shape** sketched. Target: single flat file under 50 KB.

Grand total v1: **85 entities** — right at the top of the 65–85 Medium ceiling. Implementation is now spec-complete for the recipe engine. Outstanding tail items: final naming pass on §5 catastrophes and §3.3 mixed bridges; explicit nulls enumeration in §3; phase-weight tuning once Balance/Harmonize mode exists.

## 2026-05-25 (latest+1) — Decisions-for-richest-play pass

Reasoned through every open question in `open-questions.md` against the principle "the player should be able to predict, with reasonable accuracy, what their next drag will produce." Results in `docs/design/decisions-for-richest-play.md`. Highlights:

- **Feelings as modifiers** — consumed by drop order (drop Feeling on target, target glows, next craft of target uses the bias). One slot, replace on overflow. Five distinct biases keyed to each Feeling's source element: Anger=forceful, Joy=generative, Worry=stalling, Grief=releasing, Fear=swap-actor-and-patient. Consumed only on successful craft (no-ops keep the charge). Sourced only from Stage-1 self-crafts.
- **Failure model** — Nulls in Explore (snap back, with a 3-first-events "close to a recipe" nudge), Loss in Balance/Harmonize.
- **Maximal-version forward-compat** — Storms become craftable; Surges and Feelings stay terminal (Feelings are operators, not values).
- **Reabsorb dropped.** Result dropped on its own origin phase produces a refined variant (~5 new entries).
- **Catastrophes** — terminal, with a brief workspace lockout instead of any phase-reset side effect.
- **`phase_weights` schema** — every entity carries a float vector summing to 1.0 (Sheng=50/50, Ke=70/30 toward actor, Storm=100% actor, Insub=90/10 toward actor). Encoded in v1, displayed only in Balance/Harmonize.
- **v1 UI overrides on the Infinite Craft clone**: phases-only right panel; left panel grouped by element with silhouettes for locked entries; free workspace placement on a faint pentagram background; hover tooltip for inspect (drawer in v2); pentagram readout = workspace-background fill, hidden until Balance/Harmonize; same layout on mobile; clear via button-or-long-press with confirm; click-discovered = re-spawn.
- **Total v1 entity count** projected at ~80, comfortably inside the Medium ceiling.

Stage-2 authoring (`docs/design/stage-2-crafts.md`) is now fully unblocked.

## 2026-05-25 (latest) — Stage-2 scope locked, UI deferred

Grill-me session on stage-2 mechanics and UI layout. Decisions:

- **v1 = Medium scope, hand-authored, no LLM.** Postures: **B (tier-gated stage-1 results)** + **Apply (results act on phases)** + **B-catastrophe (Storm × Storm = ~10 catastrophe entries)** + **B-modifiers (Feelings attach as modifier tokens)**. Target entity count: 65–85 total (~25 base + 30–50 stage-2 + 10 catastrophes).
- **v2 = Maximal scope, LLM-backed.** ~175+ entities. This is the version that earns the Infinite Craft–style cache architecture. Not started.
- **v1 UI = clone the open-source Infinite Craft UI** (Open Craft, Vue + Mistral, YouTube `aqrPOPq1kP0`). All deeper UI decisions (right-panel content, left-panel layout, workspace shape, inspect surface, pentagram placement, mobile, clear behavior, discoveries-click) defer until the v1 clone is playable and we have something to compare to.
- Added `docs/design/open-questions.md` as the review-when-ready parking lot. Captures the full 15-question grill (Stage-2 Q1–Q7, UI Q8–Q15) verbatim, with the locked postures noted per question and tail questions called out where the lock only partially resolves a question.

Next-session work flows from this: begin `docs/design/stage-2-crafts.md` authoring the 30–50 stage-2 cells + 10 catastrophes for the Medium scope, plus a short `docs/research/open-craft-reference.md` clarifying the UI-clone reference.

## 2026-05-25 (later still) — Player-surface rename pass

- Added `docs/design/game-interaction-grid.md` as the **playable** version of the grid. Same 25 cells, but every result renamed to a simple noun a player can read at icon size (Wind, Heart, Mud, Drought, Frost for the five Stage-3 entries; Bramble, Gale, Wildfire, Steam, Smoke, Quicksand, Rust, Blade, Erosion, Tide for the 10 insubordinate cells).
- The literal-Wu-Xing grid (`interaction-grid.md`) is retained as the canonical reference for inspect-panel "true reading" copy.
- Trade-off accepted: surface grid now has 30 distinct result names (vs. 20 in the literal grid), because the previous trick of collapsing 10 insubordinate cells into 5 pathology names was unreadable at icon size. Discoveries panel now resolves cleanly — every cell has its own addressable entity.
- `docs/design/README.md` updated to flag `game-interaction-grid.md` as the implementation source of truth.

## 2026-05-25 (later) — Interaction grid authored

- Added `docs/design/interaction-grid.md` with all 25 cells: 5 Sheng, 5 Ke, 5 Self (three-stage), 10 Insubordinate.
- 20 distinct result names cover the 25 cells — the 10 insubordinate cells deliberately collide with the 5 Stage-3 self-craft pathologies, per the brainstorm decision that an insubordinate pair produces the actor's pathology.
- Confirmed Open Craft (YouTube `aqrPOPq1kP0`) is reference only, not a scaffold dependency. v1 will be built from scratch.
- Stage-2 crafting (results combined with results), inspect copy, UI layout, and Balance/Harmonize puzzle generation are all deferred to their own docs in `docs/design/`.
