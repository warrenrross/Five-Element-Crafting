# Skill 2 — Add a new entity

A new craftable noun (Sheng result, Ke result, Feeling, Surge, Storm, stage-2, or catastrophe). This is the most common kind of game-content change.

## Touchpoints

- `docs/design/stage-2-crafts.md` or `docs/design/game-interaction-grid.md` — design source of truth
- `docs/design/inspect-copy.md` — lore strings
- `docs/design/naming-ratification.md` — if the name is at all ambiguous
- `app/src/data/entities.json` — runtime catalog
- `app/src/ui/discoveries.js` — if you're adding a whole new *tier* (rare)

## Procedure

### 1. Design first

Decide the entity by writing it down. For each new entity you need:

- `id` — `kebab-case`. Stable forever; the recipe table refers to it.
- `name` — display label. Must pass the predict-your-next-drag principle.
- `emoji` — a single grapheme. Test on iOS and Android since some emojis render very differently across platforms.
- `tier` — one of `phase`, `sheng`, `ke`, `feeling`, `surge`, `storm`, `insub`, `stage_2_sheng_sheng`, `stage_2_ke_ke`, `stage_2_sheng_ke`, `stage_2_refined`, `stage_2_catastrophe`.
- `phase_weights` — five floats `{wood, fire, earth, metal, water}` summing to 1.0. Determines the Balance-mode score contribution. For stage-2 entities, the default rule is the inherited average of inputs; deviate only when you have a real reason.
- `surface_lore` — one short sentence in the inspect-drawer voice. Concrete, no jargon. Drawn from the lore column in `game-interaction-grid.md` and expanded into the inspect-panel voice per `inspect-copy.md`.
- `true_name` — the literal Wu Xing reading with the original Chinese (e.g. `"Wood (木)"`, `"Liver Wind (肝風)"`). Surfaced in the inspect drawer's "Reading" section.

If the name doesn't pass predict-your-next-drag at a glance, run it through `naming-ratification.md` first — add a §X entry, lock the rename there, then propagate the chosen name to the design docs.

### 2. Update the design doc

Add the entity row to `stage-2-crafts.md` (or `game-interaction-grid.md` for stage-1 results). The grid in those docs is what the JSON catalog is generated from.

### 3. Add to the runtime catalog

Append to `app/src/data/entities.json`:

```json
{
  "id": "your-id",
  "name": "Your Name",
  "emoji": "🌟",
  "tier": "stage_2_sheng_sheng",
  "phase_weights": {
    "wood": 0.5,
    "fire": 0.0,
    "earth": 0.0,
    "metal": 0.0,
    "water": 0.5
  },
  "surface_lore": "Short concrete description.",
  "true_name": "Reading (字)"
}
```

The order within the file is by tier, then alphabetical. Keep the convention.

### 4. Update the entity total

If you've changed the count, update the totals in:

- `app/README.md` (currently "95 entities")
- `README.md` (mentions of the count)
- `docs/design/stage-2-crafts.md` §0 if the tier breakdown changed
- `app/src/ui/discoveries.js` — group caps (`5/5`, `10/10`, etc.) are derived from the tier counts; only touch if you've added a whole new tier

### 5. Wire it as a recipe result

A new entity is useless without recipes that produce it. See [skill 3](./03-add-recipe.md).

### 6. Hard-refresh and verify

The new entity should:

- Show as a locked `?` cell in the appropriate Discoveries group on load
- Render correctly in inspect once discovered (emoji, name, surface lore, true_name)
- Have its phase_weights chips display the correct percentages

## Gotchas

- **Don't change an existing `id`.** If you rename, change `name` only. IDs are referential — every recipe pointing at the entity would break.
- **`phase_weights` must sum to ~1.0.** The code doesn't currently enforce this, but Balance-mode scoring assumes it. If you skew, document why in the lore field.
- **The Reset button re-seeds only the five `phase` tier entities** as initially-discovered. If you're adding a new entity that should be available at start (rare), update the `PHASES` import in `main.js`.
- **Emoji width varies.** A flag or compound emoji can blow out the tile grid. Test on the smallest viewport before committing.

## Related

- [skill 3](./03-add-recipe.md) — wire the entity as a recipe result
- [skill 4](./04-regenerate-data.md) — bulk regenerate from design docs
