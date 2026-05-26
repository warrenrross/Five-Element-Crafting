# Design notes

Game mechanics, interaction surface, and UI structure. Source of truth for what the game *is*.

## Documents

- [`game-interaction-grid.md`](./game-interaction-grid.md) — **the playable surface.** Same 25 cells, but every result renamed to a simple, relatable noun (Wind, Heart, Mud, Bramble, Erosion, etc.) with the TCM-literal reading preserved in the lore column. **This is the doc the implementation should follow.**
- [`interaction-grid.md`](./interaction-grid.md) — the literal-Wu-Xing version of the grid. Result names use clinical/pathology vocabulary (Liver Wind, Heart Heat, Dampness, Lung Dryness, Kidney Cold). Kept as the canonical reference for the inspect-panel "true reading," but **not** the surface labels.
- [`stage-2-crafts.md`](./stage-2-crafts.md) — the 55 stage-2 entities for v1: 10 Sheng×Sheng, 10 Ke×Ke, 15 Sheng×Ke cross-products, 10 result-on-origin-phase refined variants, 10 Storm×Storm catastrophes. Plus Feeling-modifier resolution rules for stage-2 and the v1 recipe-table JSON shape. Brings v1 total to **85 entities**, at the top of the Medium-scope ceiling.
- *(planned)* `balance-mode.md` — Balance and Harmonize puzzle generation.
- *(planned)* `inspect-copy.md` — lore strings for each icon (for the future inspect panel).
- *(planned)* `ui-layout.md` — right-panel blocks, left-panel discoveries, workspace center. **Deferred until v1 (which mirrors the open-source Infinite Craft clone) is playable** — see `open-questions.md` Q8–Q15.
- [`open-questions.md`](./open-questions.md) — parking lot for unresolved design questions raised in brainstorming. Stage-2 grill (Q1–Q7) and UI grill (Q8–Q15) live here until each is answered in the appropriate design doc.
- [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) — reasoned answers to every open question from `open-questions.md`, optimizing for intuitive play. Locks the Feeling-modifier mechanic, the failure model, hybrid `phase_weights`, and v1 UI overrides on top of the Infinite Craft clone.

## Related

- [`../research/`](../research/) — source material and prior-art references that ground these mechanics.
- [`../../AGENT_NOTES.md`](../../AGENT_NOTES.md) — current open questions and what's next.
