# Naming Ratification — stage-2 §3.3 and §5

Second-pass naming review of the two sections flagged as "open" in [`stage-2-crafts.md`](./stage-2-crafts.md) §9 — the 5 mixed-element bridges (§3.3) and the 10 Storm-pair catastrophes (§5). All other stage-2 names (Sheng × Sheng, Ke × Ke, Sheng × Ke main diagonals, refined variants) are kept as authored.

## Criteria

The ratification pass tests every name against four rules, in this order:

1. **Predict-your-next-drag** — when the player sees the two inputs, can they reasonably guess the output? The name has to feel like the obvious noun for what the inputs would produce in the real world.
2. **One real English word** wherever possible. Hyphens and invented compounds are last-resort.
3. **No conflict** with any other entity in the 85-entity v1 set (stage-1 Sheng/Ke results, Self stages, insubordinates, stage-2 §1–§5, refined variants). Also no substring collision (e.g. "Steam-Storm" containing "Steam" — the insubordinate).
4. **Readable at icon size** — the name has to work when rendered next to a single emoji in a discoveries panel.

The two design constraints from earlier locked decisions stay in force:

- **No clinical / anatomical surface vocabulary.** Liver, Lung, Spleen, "pathology" all stay in the lore string.
- **No substring reuse** of either input name in the result name.

## Verdict format

For each entity:

- **Keep** — name is strong, no change.
- **Rename → X** — replace with X. Reason follows.
- The lore stays as authored unless explicitly noted.

---

## §3.3 — Mixed-element bridges

| # | Inputs | Current name | Verdict | Final name | Reason |
|---|---|---|---|---|---|
| 56 | Forge → Sapling | Inlay | Rename | **Brand** | "Inlay" requires craft-knowledge (decorative metalwork) — the player who has just dropped a forge onto a sapling will not predict it. "Brand" is the canonical single-word English noun for hot metal pressed into wood (livestock branding, branding irons, the verb "to brand"). It is also free of conflict with any other entity in the set. |
| 57 | Rain → Ore | Rust-Ore | Rename | **Patina** | "Rust-Ore" is hyphenated and collides conceptually with the insubordinate **Rust** (cell #17, Metal → Earth). Player will read it as a duplicate. **Patina** is the precise English word for the oxidation layer that forms on raw metal exposed to weather; it is distinct from "rust" in everyday register (rust is destructive, patina is the natural pre-rust state of unworked ore in the ground). Single word, no conflict, no substring reuse. |
| 58 | Dam → Kindling | Pyre | Keep | **Pyre** | Single word, real English, immediately evokes "contained fire with fuel," no conflict, no substring reuse. Lore should clarify that Pyre is *not* a Storm — it is intentionally contained. |
| 59 | Roots → Dew | Spring-Well | Rename | **Wellspring** | "Spring-Well" is hyphenated *and* collides with **Spring** (cell #49, Dew → Roots). Player cannot tell the two apart from the panel name alone. **Wellspring** is the actual single-word English noun for "an underground source of water" — it carries exactly the right image (roots finding the water source), and the inverted compound makes the name visually distinct from #49 Spring while keeping the lineage obvious. |
| 60 | Axe → Dew | Frost-Edge | Rename | **Rime** | "Frost-Edge" is hyphenated and invented. **Rime** is the precise meteorological term for ice deposited on a cold surface from atmospheric moisture — the exact image we want (a cold blade picking up condensate). Single word, no conflict with **Frost** (the Water Storm, cell #20 in the literal grid — different register, different role), no substring reuse. |

**Section summary.** Four renames, one keep. All renames replace hyphenated invented compounds with single English words. After this pass the §3.3 names are:

| # | Inputs | Final |
|---|---|---|
| 56 | Forge → Sapling | **Brand** |
| 57 | Rain → Ore | **Patina** |
| 58 | Dam → Kindling | **Pyre** |
| 59 | Roots → Dew | **Wellspring** |
| 60 | Axe → Dew | **Rime** |

---

## §5 — Storm × Storm catastrophes

| # | Inputs | Current name | Verdict | Final name | Reason |
|---|---|---|---|---|---|
| 71 | Wind + Heart | Firestorm | Keep | **Firestorm** | Single word, immediately readable as "wind-driven inferno," no conflict. |
| 72 | Wind + Mud | Sandstorm | Keep | **Sandstorm** | Single word, immediately readable, no conflict. |
| 73 | Wind + Drought | Dustbowl | Keep | **Dustbowl** | Recognized term ("Dust Bowl" of the 1930s). One word in the entity table; the lore can refer to the historical event. |
| 74 | Wind + Frost | Blizzard | Keep | **Blizzard** | Single word, the universal noun for wind-plus-cold. |
| 75 | Heart + Mud | Eruption | Keep | **Eruption** | Single word, the precise noun for heat-trapped-under-earth-bursts. No conflict. |
| 76 | Heart + Drought | Wildstorm | Rename | **Conflagration** | "Wildstorm" is an invented compound *and* collides phonetically with the insubordinate **Wildfire** (cell #13, Fire → Wood) and conceptually with the refined Fire variant **Inferno** (cell #69). Three near-duplicates in the Fire family is too many. **Conflagration** is the canonical English word for a large destructive fire across dry country — single word, distinct from both Wildfire (one cell, one element acting out) and Inferno (still-contained working-fire compounded). Longer than ideal at five syllables, but readable at icon size and unambiguous in the panel. |
| 77 | Heart + Frost | Steam-Storm | Rename | **Geyser** | "Steam-Storm" is hyphenated *and* contains the insubordinate **Steam** (cell #14, Fire → Water) as a literal substring — direct violation of the no-substring rule. **Geyser** is the single-word English noun for a sudden eruption of boiling water and steam from the ground; physically captures Fire-meets-Water at maximum scale and is visually distinct from the insubordinate Steam. No conflict. |
| 78 | Mud + Drought | Cracked-Earth | Rename | **Fissure** | "Cracked-Earth" is hyphenated and contains the phase name **Earth** as a substring. **Fissure** is the canonical single-word geological term for a deep crack in the ground; single word, no conflict, no substring reuse, more catastrophic in tone than "Cracked-Earth" (which reads almost gentle). |
| 79 | Mud + Frost | Permafrost | Keep | **Permafrost** | Real single word, immediately readable as "ground frozen permanently," no conflict. |
| 80 | Drought + Frost | Hardpack | Rename | **Tundra** | "Hardpack" is a real word but reads as ski-snow jargon, not catastrophe. **Tundra** is the canonical single-word biome name for cold, dry, treeless land — exactly the image of Metal-Water excess at full scale. Single word, no conflict, no substring reuse. The catastrophe naming convention also now reads cleaner: every catastrophe is either a recognized weather event (Firestorm, Sandstorm, Blizzard, Geyser), a recognized geological event (Eruption, Fissure, Permafrost), or a recognized landscape (Dustbowl, Tundra, Conflagration zone). |

**Section summary.** Four renames, six keeps. All renames replace hyphenated or invented compounds with single recognized English words. After this pass the §5 names are:

| # | Inputs | Final |
|---|---|---|
| 71 | Wind + Heart | **Firestorm** |
| 72 | Wind + Mud | **Sandstorm** |
| 73 | Wind + Drought | **Dustbowl** |
| 74 | Wind + Frost | **Blizzard** |
| 75 | Heart + Mud | **Eruption** |
| 76 | Heart + Drought | **Conflagration** |
| 77 | Heart + Frost | **Geyser** |
| 78 | Mud + Drought | **Fissure** |
| 79 | Mud + Frost | **Permafrost** |
| 80 | Drought + Frost | **Tundra** |

---

## Net changes (8 renames)

| # | Was | Now |
|---|---|---|
| 56 | Inlay | **Brand** |
| 57 | Rust-Ore | **Patina** |
| 59 | Spring-Well | **Wellspring** |
| 60 | Frost-Edge | **Rime** |
| 76 | Wildstorm | **Conflagration** |
| 77 | Steam-Storm | **Geyser** |
| 78 | Cracked-Earth | **Fissure** |
| 80 | Hardpack | **Tundra** |

The 8 renames are all motivated by one of four problems with the original names:

1. **Hyphenated or invented compound** (Rust-Ore, Spring-Well, Frost-Edge, Steam-Storm, Cracked-Earth, Wildstorm, Hardpack).
2. **Substring violation** — name contains another entity's name as a literal substring (Steam-Storm contains "Steam," Cracked-Earth contains "Earth").
3. **Conceptual collision with a sibling entity** in the same elemental family (Wildstorm with Wildfire and Inferno).
4. **Requires specialist knowledge to predict** (Inlay needs decorative-metalwork familiarity; Hardpack reads as ski jargon).

Every replacement is a single recognized English word; none introduce new conflicts.

## What stays open

- **Bonfire / Inferno / Wildfire / Firestorm / Conflagration overlap.** Five Fire-heavy entities across stage-2 sections, all named after large fires. Each has a precise role (Bonfire = refined contained Fire; Inferno = refined Fire compounded; Wildfire = Fire's insubordinate-on-Wood; Firestorm = Wind + Heart catastrophe; Conflagration = Heart + Drought catastrophe). Worth a discoverability check during playtest — is the family too crowded, or do the distinct roles read clearly through inspect copy?
- **Storm catastrophes' phase weights** stay 50/50 per the rule in `stage-2-crafts.md` §5. The renames do not change the math.

## Action items

This doc is the source-of-truth for the 8 renames. The next commit should:

1. Apply the renames inline in [`stage-2-crafts.md`](./stage-2-crafts.md) §3.3 and §5 (entity tables, section observations, and any cross-references).
2. Update the open-questions tail in `stage-2-crafts.md` §9 to mark §3.3 and §5 naming as ratified.
3. Carry the final names into [`inspect-copy.md`](./inspect-copy.md) when authored.
4. Carry the final names into the recipe-table JSON when the v1 scaffold is built.

See [`../../AGENT_NOTES.md`](../../AGENT_NOTES.md) for the running session log.
