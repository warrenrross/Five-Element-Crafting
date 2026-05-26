# Design notes

Game mechanics, interaction surface, and UI structure. Source of truth for what the game *is*.

## Documents

- [`game-interaction-grid.md`](./game-interaction-grid.md) — **the playable surface.** Same 25 cells, but every result renamed to a simple, relatable noun (Wind, Heart, Mud, Bramble, Erosion, etc.) with the TCM-literal reading preserved in the lore column. **This is the doc the implementation should follow.**
- [`interaction-grid.md`](./interaction-grid.md) — the literal-Wu-Xing version of the grid. Result names use clinical/pathology vocabulary (Liver Wind, Heart Heat, Dampness, Lung Dryness, Kidney Cold). Kept as the canonical reference for the inspect-panel "true reading," but **not** the surface labels.
- *(planned)* `stage-2-crafts.md` — combining results with results.
- *(planned)* `balance-mode.md` — Balance and Harmonize puzzle generation.
- *(planned)* `inspect-copy.md` — lore strings for each icon (for the future inspect panel).
- *(planned)* `ui-layout.md` — right-panel blocks, left-panel discoveries, workspace center.

## Related

- [`../research/`](../research/) — source material and prior-art references that ground these mechanics.
- [`../../AGENT_NOTES.md`](../../AGENT_NOTES.md) — current open questions and what's next.
