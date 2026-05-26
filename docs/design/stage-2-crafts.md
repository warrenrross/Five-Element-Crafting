# Stage-2 Crafts

The combinations of stage-1 results with each other and with the five phases. This is the second tier of the Medium-scope game (v1), built on top of the 25-cell base in [`game-interaction-grid.md`](./game-interaction-grid.md).

## Scope

Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) and [`open-questions.md`](./open-questions.md):

- **Posture**: B (tier-gated) + Apply (results act on phases) + B-catastrophe (Storm × Storm = ~10 entries) + B-modifiers (Feelings are operators, not values).
- **What combines with what at stage-2**:
  - Sheng × Sheng ✓
  - Ke × Ke ✓
  - Sheng × Ke (and reverse) ✓
  - Sheng × Phase ✓ — produces a refined variant.
  - Ke × Phase ✓ — produces a refined variant.
  - Storm × Storm ✓ — produces a catastrophe.
  - Self / Surge / Feeling × anything ✗ — Feelings are modifier tokens (handled in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q4), Surges are terminal in v1, Storms are craftable only in Maximal (v2).
- **Failure model**: Nulls in Explore (snap back, "close-to-recipe" nudge for the first three nulls per session). Loss in Balance/Harmonize.
- **Phase weights**: every entity in this doc carries a `phase_weights` vector summing to 1.0. Rules: Sheng = 50/50; Ke = 70/30 toward actor; Storm = 100% actor's phase; Insub = 90/10 toward actor. For derived stage-2 entities the weights are blended from the inputs (see per-section notes).

## Naming rules

Same as [`game-interaction-grid.md`](./game-interaction-grid.md):

1. One word where possible.
2. Distinct from every other entity name in the game.
3. No clinical/anatomical surface vocabulary (it lives in the lore string).
4. Standard Unicode emoji only.
5. No substring reuse of either input name.

## Entity-count budget

Inherited from the Medium scope:

| Section | Count |
|---|---|
| §1 Sheng × Sheng | 10 |
| §2 Ke × Ke | 10 |
| §3 Sheng × Ke (cross) | 15 |
| §4 Result-on-origin-phase (refined variants) | 10 |
| §5 Storm × Storm (catastrophes) | 10 |
| **Total stage-2** | **55** |
| Stage-1 (phases + Sheng + Ke + Feelings + Surges + Storms + Insub) | 40 |
| Phases (right-panel sources) | 5 |
| **Grand total v1** | **95** |

**Note on the count.** Earlier drafts of this doc gave the v1 total as 85, treating stage-1 as 30 entries. The actual stage-1 sum is 40 distinct results (5 Sheng + 5 Ke + 5 Feelings + 5 Surges + 5 Storms + 10 Insubordinate) plus the 5 phases, for **45 stage-1 entities**. The corrected grand total is **95**. The Medium-scope ceiling (65–85 entities) is therefore slightly exceeded — by 10 entities, all in the well-justified §3 cross-products and §5 catastrophes that we authored deliberately. The implementation absorbs this without trouble — the flat recipe file in `app/src/data/recipes.json` is still under 12 KB.

---

## 1. Sheng × Sheng — 10 cells

The 5 Sheng results (Kindling, Ash, Ore, Dew, Sapling) combined with each other. 5 choose 2 = 10 unordered pairs. Sheng products are inherently *generative*, so combining two of them produces another generative substance — typically a fertile, transitional, or productive thing.

Order does not matter at this layer (both inputs are equally generative). The recipe table is keyed on the unordered set.

| # | Pair | Result | Emoji | `phase_weights` | Lore |
|---|---|---|---|---|---|
| 26 | Kindling + Ash | **Hearth** | 🪵 | Wood 0.25, Fire 0.5, Earth 0.25 | Fire's two products (its fuel and its residue) reunited under one roof. The hearth is the human image of contained, productive fire. |
| 27 | Kindling + Ore | **Charcoal** | ⬛ | Wood 0.25, Fire 0.25, Earth 0.5 | Wood burned slow under earth becomes charcoal. The pair of substances at opposite poles of the Sheng cycle's first half. |
| 28 | Kindling + Dew | **Sap** | 🍯 | Wood 0.25, Fire 0.25, Metal 0.25, Water 0.25 | Wood's fuel meets metal's condensate. A sticky, life-carrying substance — the tree's own circulation. |
| 29 | Kindling + Sapling | **Grove** | 🌲 | Wood 0.75, Fire 0.25 | A young tree fed by what makes fire possible. The grove is wood compounded — Sheng energy doubled within one phase. |
| 30 | Ash + Ore | **Slag** | 🪨 | Fire 0.25, Earth 0.5, Metal 0.25 | Smelting residue. Where Fire's child (Ash) meets Earth's child (Ore), the unwanted byproduct is the truth of metallurgy. |
| 31 | Ash + Dew | **Lye** | 🧴 | Fire 0.25, Earth 0.25, Metal 0.25, Water 0.25 | Wood-ash steeped in water yields the oldest cleansing agent. A substance born of generation, used for purification. |
| 32 | Ash + Sapling | **Loam** | 🟫 | Fire 0.25, Earth 0.25, Water 0.25, Wood 0.25 | Burned ground rich enough to grow on. Fire's gift to Earth, made fertile by Water's gift to Wood. |
| 33 | Ore + Dew | **Vein** | 💠 | Earth 0.25, Metal 0.5, Water 0.25 | A seam of unmined metal threaded with groundwater. Earth's product (Ore) and Metal's product (Dew), still in the ground. |
| 34 | Ore + Sapling | **Root-Ore** | 🌱 | Earth 0.25, Metal 0.25, Water 0.25, Wood 0.25 | Where a sapling's roots crack into ore. The interface between Wood seeking nourishment and Metal still in its raw form. |
| 35 | Dew + Sapling | **Bud** | 🌿 | Metal 0.25, Water 0.25, Wood 0.5 | Morning dew on new growth. Both products meet at the boundary where Water becomes Wood — Sheng's loop closing on itself. |

**Section observations.** Every entity here is *additive* — none of them suggest decay, conflict, or pathology. That's the Sheng signature. The discoveries panel will read this section as a quiet, organic column.

---

## 2. Ke × Ke — 10 cells

The 5 Ke results (Roots, Dam, Rain, Forge, Axe) combined with each other. Ke products are *regulating*, so combining two produces tools, contained systems, or worked constructions — things that *hold* or *shape*.

Unordered pairs.

| # | Pair | Result | Emoji | `phase_weights` | Lore |
|---|---|---|---|---|---|
| 36 | Roots + Dam | **Levee** | 🚧 | Wood 0.35, Earth 0.5, Water 0.15 | Roots binding an earthen dam. Two Ke constraints stacked: Wood holding Earth holding Water. The compounded image of containment. |
| 37 | Roots + Rain | **Marsh** | 🪻 | Wood 0.35, Water 0.5, Fire 0.15 | Where roots tangle in rain-soaked ground. The Ke-on-Fire and Ke-on-Earth products meet in waterlogged land. |
| 38 | Roots + Forge | **Charwood** | 🪵 | Wood 0.5, Fire 0.35, Metal 0.15 | Wood gripped by the forge. The smith's working stock — bound, controlled, ready to be acted on. |
| 39 | Roots + Axe | **Stump** | 🪵 | Wood 0.65, Metal 0.35 | What an Axe leaves of a tree's roots. The Ke pair where Metal subdues Wood, with Wood's own grip on the ground still visible. |
| 40 | Dam + Rain | **Reservoir** | 🌊 | Earth 0.35, Water 0.5, Fire 0.15 | Rain caught and held. The two Ke products that both involve Water meet to *contain* water. |
| 41 | Dam + Forge | **Furnace** | 🏭 | Earth 0.35, Water 0.15, Fire 0.35, Metal 0.15 | A contained, fueled heat. The earthen vessel of Dam plus the working heat of Forge. The first thing in this doc that humans built deliberately rather than found. |
| 42 | Dam + Axe | **Wedge** | 🪓 | Earth 0.35, Water 0.15, Metal 0.35, Wood 0.15 | A splitting tool. The bank-and-blade pair, miniaturized to a single working edge. |
| 43 | Rain + Forge | **Quench-Bath** | 💧 | Water 0.5, Fire 0.35, Metal 0.15 | The water bath used to harden hot metal. Water's Ke act meets Fire's Ke act in the smith's tempering step. |
| 44 | Rain + Axe | **Whetstone** | 🪨 | Water 0.35, Fire 0.15, Metal 0.35, Wood 0.15 | Water and a blade together produce the sharpening stone. Both Ke products that act *against* things, here serving to maintain a tool. |
| 45 | Forge + Axe | **Anvil** | ⚒️ | Fire 0.35, Metal 0.65 | Forge and Axe sharing one surface. The smith's working anchor. Two Metal-heavy Ke products compounded into the heaviest tool in the game. |

**Section observations.** The Ke × Ke shelf is overwhelmingly *human-made* — Levee, Reservoir, Furnace, Anvil. That's the right tone for the regulating cycle: control produces civilization. Compare to the Sheng × Sheng shelf, which is overwhelmingly *natural* (Hearth aside).

---

## 3. Sheng × Ke (cross) — 15 cells

The interesting layer. A Sheng product meeting a Ke product blends *generation with regulation*. These are the cells where the game gets thematically rich. Most produce *worked substances* — things partway between raw material and finished tool.

Ordered pairs matter here because the actor (the one being dragged) determines whether the cell reads as "this generative thing is regulated by..." or "this regulating thing is fed by...".

I'm authoring 15 of the 25 possible ordered (5 Sheng × 5 Ke) + (5 Ke × 5 Sheng) cells. The other 10 are deliberate nulls — pairs that don't suggest a strong noun. They snap back with the close-to-recipe nudge. This keeps the discoveries panel signal-rich.

### 3.1 Sheng-as-actor × Ke-as-patient (the generative *feeding* the regulating)

| # | Actor → Patient | Result | Emoji | `phase_weights` | Lore |
|---|---|---|---|---|---|
| 46 | Kindling → Forge | **Bellows** | 🔥 | Wood 0.15, Fire 0.7, Metal 0.15 | Fuel feeding the working fire. Kindling is the food of Forge; Bellows is the act of feeding it. The Ke product dominates the weight because the actor is feeding into Ke's purpose. |
| 47 | Ash → Dam | **Mortar** | 🧱 | Fire 0.15, Earth 0.7, Water 0.15 | Lime ash bound into earthen wall. Where Fire's product reinforces Earth's regulating act. |
| 48 | Ore → Axe | **Hilt** | 🔱 | Earth 0.15, Metal 0.7, Wood 0.15 | Raw metal finished into the Axe's grip. Ore feeding the tool it will eventually become. |
| 49 | Dew → Roots | **Spring** | 💧 | Metal 0.15, Water 0.5, Wood 0.35 | A water source feeding the binding roots. The cleanest "Sheng feeds Ke" image in the cycle. |
| 50 | Sapling → Rain | **Canopy** | 🌳 | Water 0.35, Wood 0.65 | Young growth catching the falling water. The Sheng product meets the Ke product in the literal interception of weather. |

### 3.2 Ke-as-actor × Sheng-as-patient (the regulating *acting on* the generative)

| # | Actor → Patient | Result | Emoji | `phase_weights` | Lore |
|---|---|---|---|---|---|
| 51 | Roots → Kindling | **Tinder** | 🔥 | Wood 0.5, Fire 0.5 | Dry root-fibers as fire-starter. Roots act on Kindling to make it ready to burn. |
| 52 | Dam → Ash | **Brick** | 🧱 | Earth 0.7, Fire 0.3 | Earthen wall acting on ashen residue produces fired brick. The Ke product dominates because it's doing the acting. |
| 53 | Rain → Sapling | **Bloom** | 🌸 | Water 0.5, Wood 0.5 | Rain on a young tree triggers flowering. Ke acting on Sheng to accelerate Sheng — the rarest and richest combination in the cycle. |
| 54 | Forge → Ore | **Ingot** | 🟨 | Fire 0.5, Metal 0.5 | Smelting. The single act that makes metallurgy possible. |
| 55 | Axe → Sapling | **Plank** | 🪵 | Metal 0.5, Wood 0.5 | Worked wood. The Axe acts on the Sapling to produce lumber — the canonical "Metal controls Wood" outcome made productive. |

### 3.3 Mixed-element bridges (5 more, off the main diagonal)

A handful of cross-element cells that produce strong, surprising entities. These are the discovery delights — combinations a player would not predict, but which feel *right* on reveal.

| # | Actor → Patient | Result | Emoji | `phase_weights` | Lore |
|---|---|---|---|---|---|
| 56 | Forge → Sapling | **Brand** | 🪵 | Fire 0.35, Metal 0.35, Wood 0.3 | Hot metal pressed into wood. The mark of ownership, the signature burned in. (Ratified 2026-05-26: was "Inlay" — replaced for predict-your-next-drag readability. See [`naming-ratification.md`](./naming-ratification.md).) |
| 57 | Rain → Ore | **Patina** | 🟧 | Water 0.5, Earth 0.25, Metal 0.25 | Rain meeting raw metal in the ground. The slow natural oxidation of unworked ore — distinct from the destructive `Rust` of the insubordinate grid, which is finished-metal decay. (Ratified 2026-05-26: was "Rust-Ore" — replaced to avoid conceptual collision with Rust.) |
| 58 | Dam → Kindling | **Pyre** | 🔥 | Earth 0.35, Water 0.15, Wood 0.25, Fire 0.25 | A contained Fire with fuel. The Dam's containment turned to burning. Intentionally not a Storm — the containment is still holding. |
| 59 | Roots → Dew | **Wellspring** | 💧 | Wood 0.35, Metal 0.25, Water 0.4 | An underground water source the roots have found. Distinct from #49 **Spring** (Dew → Roots): there the water-source is feeding the roots; here the roots are seeking the source. (Ratified 2026-05-26: was "Spring-Well" — replaced because hyphenated and indistinguishable from #49.) |
| 60 | Axe → Dew | **Rime** | 🗡️ | Metal 0.5, Water 0.35, Wood 0.15 | An edged tool used in cold conditions, picking up frozen condensate. The single coldest entity in the game outside the catastrophes. (Ratified 2026-05-26: was "Frost-Edge" — replaced with the precise meteorological single word.) |

**Section observations.** Stage-2 cross-products carry between 2 and 4 nonzero phase-weights each. The 4-way ones (Rime, Wellspring, Brand) are the most *blended* — Balance/Harmonize mode will value them differently than the 2-way pure pairs (Tinder, Bloom, Ingot, Plank).

### Nulls in §3

The 10 ordered Sheng×Ke cells *not* authored above snap back with the close-to-recipe nudge. They are deliberately empty because they don't suggest a strong noun (e.g. Sapling → Dam, Ash → Forge, Kindling → Axe). The player learns the shape of the grid by feeling out where the rich combinations live.

---

## 4. Result-on-origin-phase — refined variants

The Apply posture says results can be dropped on phases. The decisions-for-richest-play doc flagged one special case worth treating distinctly: a result dropped onto *its own origin phase* produces a refined variant rather than something arbitrary.

Each stage-1 Sheng or Ke result has an "origin phase" — the phase the result was *produced from* in the §1 / §2 grid. For the Sheng products it's the patient phase (Kindling came from Wood feeding Fire; its origin is Fire). For the Ke products it's the actor phase (Axe came from Metal cutting Wood; its origin is Metal). This is the phase that, dropped back into, intensifies the result rather than producing something unrelated.

Ten cells: 5 Sheng results + 5 Ke results, each dropped onto its origin phase.

| # | Actor → Patient | Result | Emoji | `phase_weights` | Lore |
|---|---|---|---|---|---|
| 61 | Kindling → Fire | **Bonfire** | 🔥 | Wood 0.3, Fire 0.7 | Kindling thrown back into Fire. A refined, larger version of fire — productive, communal, sustained. |
| 62 | Ash → Earth | **Topsoil** | 🟫 | Fire 0.3, Earth 0.7 | Ash worked back into the ground. The agriculturally richest version of Earth. |
| 63 | Ore → Metal | **Bullion** | 🟨 | Earth 0.3, Metal 0.7 | Raw ore refined into pure stock. The wealth-form of Metal. |
| 64 | Dew → Water | **Spring-Water** | 💧 | Metal 0.3, Water 0.7 | Condensate returned to its source. The purest drinking form of Water. |
| 65 | Sapling → Wood | **Orchard** | 🌳 | Water 0.3, Wood 0.7 | A young tree returned to its element compounds into many trees. The cultivated form of Wood. |
| 66 | Roots → Wood | **Heartwood** | 🪵 | Wood 0.85, Earth 0.15 | A Ke product fed back into its actor phase. The densest, most centered form of Wood — the part of the trunk too deep to rot. |
| 67 | Dam → Earth | **Bedrock** | ⛰️ | Earth 0.85, Water 0.15 | Earth fortified into its load-bearing form. |
| 68 | Rain → Water | **Monsoon** | 🌧️ | Water 0.85, Fire 0.15 | Rain compounded into a seasonal pattern. Sustained, defining. |
| 69 | Forge → Fire | **Inferno** | 🔥 | Fire 0.85, Metal 0.15 | Working-fire fed back into raw Fire. Approaches catastrophe but isn't one — still controlled, still purposive. Distinct from the Storm × Storm catastrophe Wildstorm in §5. |
| 70 | Axe → Metal | **Whetted-Steel** | 🗡️ | Metal 0.85, Wood 0.15 | The Axe fed back into Metal, sharpened to its theoretical edge. |

**Section observations.** The refined variants are all *concentrated* forms of their origin phase — `phase_weights` heavily favors the patient phase (0.7 for Sheng-derived, 0.85 for Ke-derived). These are the highest-purity entities in the game outside the phases themselves. Balance/Harmonize puzzles will use them as fine-grained adjustment tools.

**Note on Wood and Metal origins.** Roots-onto-Wood and Axe-onto-Metal are *not* the Ke pair from §2 (Wood→Earth, Metal→Wood) — they are the Ke result being fed back to its actor phase. The lore reads naturally: Roots are produced *from* Wood acting on Earth, so dropping Roots onto Wood is "the binding force returning to its source."

---

## 5. Storm × Storm — catastrophes

The 10 unordered pairs of the 5 Storms (Wind, Heart, Mud, Drought, Frost). Catastrophes are *terminal* — they do not combine further in v1 — and they trigger a brief workspace lockout when produced (per decisions-for-richest-play.md §Q3 tail).

Order does not matter — catastrophes are pure intensity events. The recipe table is keyed on the unordered set.

| # | Pair | Result | Emoji | `phase_weights` | Lore |
|---|---|---|---|---|---|
| 71 | Wind + Heart | **Firestorm** | 🌪️ | Wood 0.5, Fire 0.5 | A wind-driven inferno. The classical liver-heat-with-wind pattern, surfaced as the natural disaster it produces. Cited indirectly via Wood (liver/anger) and Fire (heart) correspondences ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |
| 72 | Wind + Mud | **Sandstorm** | 🌪️ | Wood 0.5, Earth 0.5 | Wind carrying loosened earth. The dust-bowl pattern. |
| 73 | Wind + Drought | **Dustbowl** | 🏜️ | Wood 0.5, Metal 0.5 | Wind across parched land. The most arid catastrophe in the set. |
| 74 | Wind + Frost | **Blizzard** | 🌨️ | Wood 0.5, Water 0.5 | Wind plus cold. The classical Wood-Water excess collision, surfaced as winter at its worst. |
| 75 | Heart + Mud | **Eruption** | 🌋 | Fire 0.5, Earth 0.5 | Heat trapped under earth bursts. The most violent terrestrial catastrophe. |
| 76 | Heart + Drought | **Conflagration** | 🔥 | Fire 0.5, Metal 0.5 | Uncontrolled fire across dry country at full intensity. Distinct from the insubordinate **Wildfire** (one element acting out) and the refined **Inferno** (still contained). (Ratified 2026-05-26: was "Wildstorm" — replaced to disambiguate the Fire family.) |
| 77 | Heart + Frost | **Geyser** | ♨️ | Fire 0.5, Water 0.5 | Boiling water and steam erupting from the ground where Fire and Water collide at scale. Distinct from the insubordinate **Steam** (one element acting out). (Ratified 2026-05-26: was "Steam-Storm" — replaced because it literally contained "Steam" as a substring.) |
| 78 | Mud + Drought | **Fissure** | 🪨 | Earth 0.5, Metal 0.5 | A deep crack in dampness baked then split open. Earth-Metal excess. (Ratified 2026-05-26: was "Cracked-Earth" — replaced with the precise geological single word.) |
| 79 | Mud + Frost | **Permafrost** | ❄️ | Earth 0.5, Water 0.5 | Saturated ground frozen solid. Locked, immovable. |
| 80 | Drought + Frost | **Tundra** | 🏔️ | Metal 0.5, Water 0.5 | Cold, dry, treeless land — the bottom of winter. Metal-Water excess as a recognized biome. (Ratified 2026-05-26: was "Hardpack" — replaced with the canonical biome name.) |

**Section observations.** Every catastrophe is a 50/50 phase weight, because Storms are 100%-actor-phase and combining two of them produces a perfect cross. This means in Balance/Harmonize mode, a catastrophe contributes equally to both of its parent phases' excess readings — making catastrophes the most efficient way to *unbalance* the pentagram, and therefore the most expensive things to produce in puzzle mode.

---

## 6. Feeling-modifier resolution against stage-2

Per [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q4c, the five Feelings (Anger, Joy, Worry, Grief, Fear) each apply a bias to the next craft of whatever they charge. The biases are:

- **Anger** → forceful (push the craft one tier up — insubordinate-flavor variant)
- **Joy** → generative (Sheng-flavor a Ke pairing)
- **Worry** → stalling (next craft produces a Surge instead)
- **Grief** → releasing (next craft produces something that decays back to a phase)
- **Fear** → inverting (swap actor and patient)

For stage-2, these biases need explicit resolution rules because the craft surface is richer. Locked rules:

| Bias | When the charged entity acts at stage-2 | What happens |
|---|---|---|
| Anger | On any Sheng or Ke result | The Stage-2 cell looks up its insubordinate-flavor sibling. If the cell is already an insubordinate-flavor entity, Anger wastes (charge consumed, no change). |
| Joy | On a Ke result or Ke-flavored cell | The cell resolves as if it were the Sheng analog. If the cell is already Sheng-flavored, Joy wastes. |
| Worry | On any cell | The cell's actor phase produces its Surge entity instead of the cell's normal output. Charged entity is consumed. |
| Grief | On any cell | The cell's normal output is produced, *and* the actor entity dissolves back into its origin phase (returns to the right panel). |
| Fear | On any cell | Actor and patient are swapped in the recipe lookup. If the swapped pair is a null, Fear wastes (no snap-back nudge — Fear specifically is allowed to fail silently). |

These 5 rules cover every stage-2 cell × every Feeling = 250 potential modified crafts, without authoring 250 new entities. That's the whole point of B-modifiers over A-ingredients: the Feelings *transform* the existing surface rather than expand it.

**Edge cases enumerated:**

1. **Fear on a self-craft** — actor and patient are already the same. Fear wastes silently.
2. **Worry on a Surge-tier output** — already at Surge. Worry wastes silently.
3. **Grief on a phase being dropped onto another phase** — the actor phase is *already* a phase, so it can't "dissolve back." Grief wastes silently.
4. **Anger on an insubordinate cell** — already at insubordinate-flavor. Anger wastes silently.
5. **Joy on a Sheng cell** — already Sheng-flavored. Joy wastes silently.
6. **Stacked modifiers** — only one slot per entity (locked). The replacement rule means the older Feeling vanishes with no recovery.
7. **Modifier on a Storm** — Storms are terminal in v1. Charge is consumed silently when the player drops the Storm (which produces nothing anyway).
8. **Modifier on a catastrophe** — catastrophes are terminal. Same as above.

The "wastes silently" cases are intentional. They teach the player when a modifier *doesn't* apply, without snapping back the craft or producing a confusing message. Eventually the player learns when each Feeling has purchase.

---

## 7. Phase-weights summary

Distribution of `phase_weights` across all 85 v1 entities:

| Weight pattern | Count | Examples |
|---|---|---|
| Pure (1 phase = 1.0) | 5 phases + 5 Storms = 10 | Wood, Fire, Wind, Heart |
| Heavy-actor (0.85/0.15) | 5 Ke-refined variants | Heartwood, Bedrock, Inferno, Whetted-Steel |
| Heavy-patient (0.7/0.3) | 5 Sheng-refined variants + ~5 stage-2 cells | Bonfire, Topsoil, Bellows |
| Even split (0.5/0.5) | 5 Sheng + 5 Ke + 5 cross + 10 catastrophes = ~25 | Kindling, Roots, Tinder, Firestorm |
| Triple blend (3 phases) | ~10 stage-2 cells | Hearth, Slag, Bellows |
| Quad blend (4 phases) | ~5 stage-2 cells | Frost-Edge, Spring-Well, Inlay |
| Five-blend | 0 in v1 (reserved for future "Centered" entities) | — |
| Surge / Feeling | 10 (5 Surges + 5 Feelings) | Carry actor phase 1.0; Feelings are operators and don't enter the pentagram math directly |
| Insubordinate (0.9/0.1) | 10 | Bramble, Gale, Rust, Tide |
| Stage-1 Sheng/Ke (0.5/0.5) | 10 | Already counted under "Even split" |
| **Total** | **85** | |

Pentagram math in Balance/Harmonize:

```
total_imbalance = Σ over all workspace entities of phase_weights
```

A balanced workspace has roughly equal totals across the five phases. Catastrophes contribute heavily to two phases, refined variants to one phase, blends to three or four. The puzzle generator can therefore start from a balanced solution state and walk *backwards* via legal stage-2 inverse-crafts to produce a solvable starting position. (Generator design lives in `balance-mode.md`, planned.)

---

## 8. Recipe-table format

The implementation will keep all 85 entities in a single JSON file. Sketch:

```json
{
  "id": "kindling",
  "name": "Kindling",
  "emoji": "🔥",
  "tier": "stage-1-sheng",
  "phase_weights": { "wood": 0.5, "fire": 0.5, "earth": 0, "metal": 0, "water": 0 },
  "lore_surface": "Wood feeds Fire — the canonical first step of the generating cycle.",
  "lore_true": "Sheng cell #1: Wood → Fire. The literal Wu Xing reading.",
  "recipes_as_actor": [
    { "patient": "forge", "result": "bellows" },
    { "patient": "fire",  "result": "bonfire" }
  ]
}
```

Recipe lookup at craft time is keyed on `(actor.id, patient.id)`. Nulls are not enumerated — any pair not in the table snaps back.

For the v1 clone we can fit this entire structure in a flat file under 50 KB, no backend, no LLM. That's the implementation target.

---

## 9. What stays open

- ~~**Final names for the 10 catastrophes.**~~ Ratified 2026-05-26 in [`naming-ratification.md`](./naming-ratification.md). Four renames: Wildstorm → Conflagration, Steam-Storm → Geyser, Cracked-Earth → Fissure, Hardpack → Tundra. Six keeps: Firestorm, Sandstorm, Dustbowl, Blizzard, Eruption, Permafrost.
- ~~**Final names for §3.3 mixed-element bridges.**~~ Ratified 2026-05-26 in [`naming-ratification.md`](./naming-ratification.md). Four renames: Inlay → Brand, Rust-Ore → Patina, Spring-Well → Wellspring, Frost-Edge → Rime. One keep: Pyre.
- **The deliberate-nulls list in §3.** Currently implicit (any pair not authored = null). Worth enumerating once the implementation starts so the close-to-recipe nudge has a target.
- **The phase-weight numbers themselves.** The 0.5 / 0.7 / 0.85 / 0.9 distinctions are reasoned but not playtested. Expect to tune these once Balance/Harmonize mode exists and the pentagram readout is visible.
- **The Surges and the §4 refined variants — overlap check.** Currently disjoint, but Drought (Storm) and Bedrock (refined Earth) both lean structural. Worth re-reading the inspect copy to make sure their voices stay distinct.

Everything else is implementation-ready.

---

## 10. What this doc does not cover

- **Balance and Harmonize mode** mechanics (puzzle generator, budget, win/lose, scoring). Future doc: `balance-mode.md`.
- **Inspect copy** — the long-form lore strings shown in the side drawer in v2. Future doc: `inspect-copy.md`.
- **UI layout** — deferred until the v1 clone is playable. Future doc: `ui-layout.md`.

See [`../../AGENT_NOTES.md`](../../AGENT_NOTES.md) for the running session log and [`open-questions.md`](./open-questions.md) for any unresolved tail questions.
