# Skill 4 — Regenerate data files

When the design grid in `docs/design/` is the source of truth and the JSON catalog has drifted, rebuild the catalog from the grid. Use this after any bulk edit (rename ratification, tier reshuffling, new stage-2 wave).

## Touchpoints

- `docs/design/stage-2-crafts.md` — entity definitions
- `docs/design/game-interaction-grid.md` — stage-1 recipe grid
- `docs/design/inspect-copy.md` — surface_lore strings
- `docs/design/naming-ratification.md` — final names
- `app/src/data/entities.json` — regenerated
- `app/src/data/recipes.json` — regenerated
- `tools/build_data.py` — the script (committed; previously lived in `/tmp/` and was lost between sessions)

## Procedure

### 1. Edit the design docs first

Make the change in the grid or table that the JSON is derived from. The design doc is the source of truth.

### 2. Run the regen script

```bash
cd /path/to/Five-Element-Crafting
python3 tools/build_data.py
```

The script:

- Parses entity rows out of `docs/design/stage-2-crafts.md` (markdown tables) and the stage-1 results in `game-interaction-grid.md`.
- Cross-references `docs/design/inspect-copy.md` for `surface_lore` and `true_name`.
- Validates that `phase_weights` rows sum to ~1.0 (warns on drift > 0.001).
- Writes `app/src/data/entities.json` and `app/src/data/recipes.json` with consistent ordering.

### 3. Diff before committing

```bash
git diff app/src/data/
```

You should see only the rows you intended to change. If the diff is noisy (whitespace, reorder), the script is doing too much — fix the script's ordering rather than committing churn.

### 4. Hard-refresh and verify

Smoke-test in the browser: discoveries panel renders with the right tier counts, a few representative recipes resolve correctly, Balance mode boots a puzzle without errors.

## If `tools/build_data.py` doesn't exist yet

It was originally written in `/tmp/build_data.py` during the v1 scaffold session and never committed. If you need to rebuild it from the current JSON state:

1. Read the entity tables out of `stage-2-crafts.md` and the stage-1 result grid in `game-interaction-grid.md` into Python dicts.
2. For each row, look up the corresponding `surface_lore` and `true_name` in `inspect-copy.md` (key by entity name).
3. Apply phase_weights using:
   - Phases: one-hot on their own phase.
   - Stage-1 Sheng/Ke/Insub results: 50/50 of the two input phases.
   - Stage-2: average of the input entities' weights.
   - Catastrophes: 100% on the actor's phase.
4. Validate sums; emit JSON with stable key order.

Commit the script as `tools/build_data.py` once you have it working. Future sessions will thank you.

## Gotchas

- **Never edit `entities.json` and the design doc independently.** They will diverge. Pick one as source of truth — currently the design doc is — and regenerate.
- **The regen script must be deterministic.** Two runs against the same input must produce byte-identical output, or git diffs become useless. Pin Python dict iteration order (sort keys explicitly), pin floating-point formatting (e.g. always 4 decimals), and don't include timestamps in the JSON.

## Related

- [skill 2](./02-add-entity.md) — single-entity workflow that bypasses the regen
- [skill 3](./03-add-recipe.md) — single-recipe workflow
