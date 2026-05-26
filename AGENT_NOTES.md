# AGENT_NOTES

Session-to-session handoff notes for Five-Element-Crafting. Matches the convention used in [Hand_AI](https://github.com/warrenrross/Hand_AI) and [gesture-detect-research](https://github.com/warrenrross/gesture-detect-research).

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
6. Begin `docs/design/stage-2-crafts.md` — combining results with results.

## 2026-05-25 (later) — Interaction grid authored

- Added `docs/design/interaction-grid.md` with all 25 cells: 5 Sheng, 5 Ke, 5 Self (three-stage), 10 Insubordinate.
- 20 distinct result names cover the 25 cells — the 10 insubordinate cells deliberately collide with the 5 Stage-3 self-craft pathologies, per the brainstorm decision that an insubordinate pair produces the actor's pathology.
- Confirmed Open Craft (YouTube `aqrPOPq1kP0`) is reference only, not a scaffold dependency. v1 will be built from scratch.
- Stage-2 crafting (results combined with results), inspect copy, UI layout, and Balance/Harmonize puzzle generation are all deferred to their own docs in `docs/design/`.
