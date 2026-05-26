# Skill 3 — Add or modify a recipe

Wire an ordered actor/patient pair to a result.

## Touchpoints

- `docs/design/game-interaction-grid.md` or `docs/design/stage-2-crafts.md` — design source of truth for what should combine into what
- `app/src/data/recipes.json` — runtime recipe table
- `app/src/engine/recipes.js` — `resolve()` reads the table; no change usually needed

## Procedure

### 1. Pick the move type

Every recipe has a `move_type` that drives the cue animation. The six valid values:

| move_type | When | Cue |
|---|---|---|
| `sheng` | Actor's phase generates the patient's phase | green halo + pulse-up |
| `ke` | Actor's phase controls the patient's phase | red halo + press-down |
| `self` | Actor and patient share the same pure phase (any tier) | gold halo + brightness hold |
| `insub` | Actor's phase is controlled-by the patient's (reversed Ke) | purple halo + horizontal shake |
| `stage_2` | A result combining a stage-1 entity with another input | neutral indigo + rotate |
| *(absent)* | The pair is undefined → null result | (no result, snap-back animation) |

The first four are determined by phase relationship. Stage-2 is anything that produces a tier-2 entity. Nulls are *not* in the table — they're the absence of a recipe.

**Self moves are special.** They do not live in `recipes.json` at all. The engine inspects both inputs' `phase_weights`; if they share a pure phase, it sums their `concentration` values and looks up the result in `app/src/data/self_progression.json` (a `phase × concentration` table). Anger (2) + Anger (2) → the row at `wood.4`, which is Wind. Concentration ≥5 caps at 5 (the self-overflow). You should not add per-pair self rows; instead, add or edit a row in `self_progression.json`.

### 2. Add the row

Append to `app/src/data/recipes.json`:

```json
{
  "actor": "wood",
  "patient": "fire",
  "result": "kindling",
  "move_type": "sheng"
}
```

The table is ordered by tier of result, then alphabetical by actor. Keep the convention.

### 3. Hard-refresh and verify

Drag actor onto patient. You should see:

- The correct halo cue
- The result icon spawned where the patient was
- The patient (and the actor, if it came from the workspace) removed
- A new Discoveries cell unlocked (or a `+1` badge if it's a repeat)
- In Balance mode: the budget tick down by 1, the pentagram weights update

### 4. Double-check the inverse

If your new recipe is `wood + fire → kindling` (Sheng), the inverse pair `fire + wood` is *not* automatically defined. Decide whether `fire + wood` should:

- **Be the same Sheng result** (symmetric Sheng — rare, document if so).
- **Be an Insub** if `fire` is controlled-by `wood`. (It isn't, in this case.)
- **Be a null.** Most reverse-direction Sheng pairs are nulls in v1.

Whatever you decide, write down the reasoning in `docs/design/decisions-for-richest-play.md` if it sets a new precedent.

## Gotchas

- **`resolve()` is ordered.** The actor is whatever was dragged; the patient is whatever it was dropped on. Swapping them gives a different (or null) result. This is intentional — see `docs/design/decisions-for-richest-play.md` on directional Sheng.
- **`move_type` must match the actual phase relationship.** If you set `sheng` on a pair that isn't actually a Sheng arrow, the cue will fire but the Balance-mode delta will silently apply the Sheng delta (`+0.05` to the patient phase), which will desync the pentagram from the design intent. The engine doesn't currently validate this.
- **No two recipes can share the same `(actor, patient)` ordered pair.** Last one wins, silently. If you're iterating, hard-refresh after every edit.
- **Stage-2 recipes can have any input type.** A common pattern is `(stage1, phase) → stage2`. Don't constrain this artificially.

### 5. Editing same-phase outcomes

To change what Wood + Wood (or Anger + Anger, or any same-phase combination) produces, edit `app/src/data/self_progression.json`:

```json
{
  "wood":  {"2": "anger",  "3": "overgrowth", "4": "wind",   "5": "blight"},
  "fire":  {"2": "joy",    "3": "restlessness", "4": "heart", "5": "heatwave"},
  ...
}
```

The key is the **sum of the two inputs' concentrations** (clamped to 5). Adding a new tier in between (say a `surge2` at concentration 3.5) is not currently supported — the table only handles integer steps and the resolver clamps to 5.

## Related

- [skill 2](./02-add-entity.md) — define the result before you recipe it
- [skill 4](./04-regenerate-data.md) — bulk regenerate from design docs
- [skill 8](./08-tune-balance.md) — Balance-mode delta tuning
