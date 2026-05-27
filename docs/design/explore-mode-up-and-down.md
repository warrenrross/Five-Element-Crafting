# Explore-mode Up-and-Down — design note

Status: **ratified, not yet implemented**
Scope: **Explore mode only** — Balance-mode deltas untouched until this ships and playtests well.
Author: design pass 2026-05-26 (Warren + the agent)
Predecessor: `naming-ratification-overflow.md`, `game-interaction-grid.md` §3

## Goal in one sentence

The player should be able to climb each phase's concentration ladder *and* climb back down, using the same drag-onto grammar, predictable at a glance, without ever reading a recipe.

## The ladder, restated

Every pure-phase entity carries a `concentration` between 1 and 5. Five rungs, five phases:

| Concentration | Wood | Fire | Earth | Metal | Water |
|---|---|---|---|---|---|
| 1 (Phase)    | Wood   | Fire  | Earth | Metal | Water |
| 2 (Feeling)  | Anger  | Joy   | Worry | Grief | Fear  |
| 3 (Surge)    | Overgrowth | Restlessness | Stagnation | Rigidity | Flooding |
| 4 (Storm)    | Wind   | Heart | Mud   | Drought | Frost |
| 5 (Overflow) | Blight | Heatwave | Avalanche | Wasteland | Maelstrom |

Climbing (already shipped) sums concentrations and clamps at 5. This note adds descent.

## Six ratified decisions

### Decision 1 — Descent rule (the **Xie / weakening cycle**)

The reference article calls this the *mother-child weakening cycle* (Xie), also "cycle of exhaustion." The child element drains its mother: *metal is the child of earth; excessive extraction exhausts earth. Wood is the child of water; growing trees diminish water. The child weakens the parent.* See [fengshuinatural.com — five elements](https://www.fengshuinatural.com/en/five-elements.html).

**Rule:** Dropping a phase-pure **child** entity onto a phase-pure **parent** entity with concentration ≥ 2 decrements the parent by one rung.

Child → parent pairs (the Sheng cycle read backwards):

| Child phase | Parent phase | Reads as |
|---|---|---|
| Wood  | Water | trees drink the water |
| Fire  | Wood  | flames consume the wood |
| Earth | Fire  | ash buries the fire |
| Metal | Earth | mining exhausts the earth |
| Water | Metal | water dulls the blade |

**Cadence: one rung per drop.** Ratified. Higher-tier patients don't "fall further" per drop — Blight + a Wood-child takes four drops to clear, same number of moves as climbing took.

**Cue:** new color. Sheng is green, Ke is red, Self is gold, Insub is purple, Stage-2 is indigo. Xie should read as "draining" — propose **teal/cyan halo + downward pulse** (mirror of the green pulse-up that Sheng uses). Final color choice deferred to the implementation pass.

**Surface verb (inspect-copy):** **"weakens"** (from the article — "metal weakens earth," "wood weakens water"). Reads as a stative description, not a command, matching the rest of the inspect vocabulary.

### Decision 2 — Ke is *not* the descent mechanic

I floated Metal-onto-Anger → Wood last turn. We're not doing that. Ke stays as it is — a cross-phase control move that produces a stage-2 entity per `recipes.json` (`metal + wood → blade`, etc.). Descent comes from the Xie cycle, which is its own distinct relationship and didn't exist in our model before.

This is cleaner because:

- Ke and Xie are different cycles in the source tradition. Conflating them was an artifact of us not having read deeply enough.
- The cross-phase Ke recipes (Blade, Steam, Ash, etc.) already do interesting work and shouldn't be displaced.
- Xie has a perfect surface verb ("weaken") and a clear directional mapping (child → parent). It's a better fit for the "subtract" intuition.

### Decision 3 — Inspect copy stops naming "how you got there"

Per the player: *"the recipe shouldn't be how you got there, just how much of what you have that makes it what it is. Anger = wood 2, everything else 0."*

This is a real philosophical shift. Today's inspect drawer has a "Made by" section listing recipes that produce the entity. After this change, the inspect drawer shows **composition, not provenance**:

```
Anger
emoji: 🌿 (placeholder)

What it is:
  Wood: 2

True name: Liver Wind, mild (肝風微)
Surface: ...
```

For a stage-2 mixed-phase entity:

```
Kindling
emoji: 🔥

What it is:
  Wood: 0.5
  Fire: 0.5

True name: ...
Surface: ...
```

The `phase_weights × concentration` table is the entity's full identity at a glance. No recipe list. No "made by." Provenance is the player's job to remember — *"Remembering how you got there is part of the challenge"* (ratified in the previous session).

This is a one-section deletion in `inspect.js` and a re-render of the phase-weight chips to show whole-number multiples of concentration when present. The data model already supports this; nothing in entities.json or recipes.json needs to change for it.

### Decision 4 — Every drop must have an effect

Per the player: *"even if there is no recipe, there should be an affect. Each element will affect another element."*

This is the most ambitious of the four. Today, an undefined pair returns `{ ok: false, reason: "no-recipe" }` and the dropped tile snaps back with a "null" label for the first three null drops in a session. After this change, **there are no nulls in Explore mode** for pure-phase pairs — every combination of pure-phase entities resolves to *something*.

Resolution priority (proposed, to be tightened during implementation):

1. **Same phase** → existing concentration-additive rule (climb).
2. **Child-onto-parent (Xie)** with patient concentration ≥ 2 → decrement (descend). New.
3. **Sheng-cycle pair** (actor feeds patient) → existing recipe table. Examples: `wood + fire = kindling`.
4. **Ke-cycle pair** (actor controls patient) → existing recipe table. Examples: `metal + wood = blade`.
5. **Wu / Insub** (actor is controlled-by patient, i.e. reversed Ke) → existing recipe table.
6. **Anything still left over** → new "ambient affect" tier (see below). No more null.

**Ambient affect for un-recipe'd pairs.** When none of 1–5 fires, the engine should still produce *some* observable change. Options to evaluate during implementation:

- Patient nudges one rung toward its phase neutral (concentration toward 1 if ≥ 2, but doesn't change tier label). Visible as a brief saturation pulse. No new entity spawned, no discoveries-ledger entry.
- The actor's phase modulates the patient's `phase_weights` by a small amount (true subtraction at the weight level, not the tier level). Most interesting but adds floating-point state to entity records, which we haven't done yet.
- A two-second visual "interaction" (halo color, pulse) that communicates the relationship — Sheng-feed, Ke-control, Xie-weaken, Wu-harm — without producing a new entity. Cheapest and arguably the most honest: "every drop affects, but not every drop transforms."

Whichever we land on, **the snap-back animation goes away**. There are no "rejected" drops in Explore mode anymore.

## Examples to walk before coding

### Climb-and-descend, single phase

```
Wood + Wood    → Anger        (climb 1→2,   self)
Anger + Anger  → Wind         (climb 2→4,   self, skip)
Wood + Wind    → Blight       (climb 1→5,   self, catastrophe)
Fire + Blight  → Wind         (descend 5→4, xie: fire weakens wood)
Fire + Wind    → Overgrowth   (descend 4→3, xie)
Fire + Overgrowth → Anger     (descend 3→2, xie)
Fire + Anger   → Wood         (descend 2→1, xie)
```

Reads consistently: same-phase Wood-things go up, Fire-things (child of Wood) bring them down. Five climb moves to reach Blight, four descend moves to clear it. Asymmetric difficulty by design.

### Multi-phase weave

```
Wood + Water    → ...          (Sheng: water feeds wood — existing recipe)
Wood + Fire     → Kindling     (Sheng: wood feeds fire — existing recipe)
Fire + Earth    → ...          (Sheng: fire produces earth — existing recipe)

Earth + Fire    → Fire (conc=existing-1)
                               (Xie: earth weakens fire, descend)
```

### What happens at concentration 1

`Fire + Wood` (Xie pair, patient at conc 1) cannot descend further. Falls through to step 5 of the resolution priority — there's an existing recipe-table entry, so that fires instead. Predictable.

### What used to be null

`Anger + Joy` (Wood-feeling + Fire-feeling, mixed pure phases): no recipe today, returns null. After this change: falls to the ambient-affect tier. Plays the Sheng-feed cue (because Wood feeds Fire), no new entity, both tiles stay on the workspace.

## I Ching as future model — parking lot

The player flagged the I Ching's 64 hexagrams as a potentially useful underlying structure. Noting it here so it doesn't get lost; not part of this design pass.

The interesting properties of the hexagram system for our game:

- **Binary encoding.** Each hexagram is six yin/yang lines, i.e. a 6-bit integer (0–63). Maps cleanly to bitfields.
- **Wu Xing correspondences.** Every hexagram has a traditional five-element assignment. Several mappings exist (e.g., Najia, Bagua + element-of-the-trigram). [Wikipedia overview](https://en.wikipedia.org/wiki/I_Ching) is a starting point; primary sources include the *Yijing* itself and Wilhelm/Baynes translations.
- **Changing lines.** Hexagrams have a transformation grammar — a "moving" line flips yin↔yang, producing a related hexagram. This is itself a craft mechanic.
- **Lower and upper trigrams.** Each hexagram is two stacked trigrams (8 × 8 = 64). Trigrams correspond directly to the five phases plus the two extra Bagua elements (heaven, lake) which we currently don't model.

Possible future uses (do **not** implement yet, just parked):

- **Hexagram-as-recipe-key.** Instead of a flat `(actor, patient) → result` table, the actor's hexagram + the patient's hexagram could resolve via a transformation rule. This would generate recipes procedurally instead of curating 110 of them.
- **Hexagram-as-puzzle-target in Balance mode.** Target board states could be expressed as hexagrams instead of as five floats — closer to the source tradition.
- **Stage-3 mechanic.** A third tier of crafts using two-trigram (six-line) inputs. Currently we have stage-1 (single-phase) and stage-2 (mixed-phase). Stage-3 could be hexagram-keyed.
- **Naming source.** The 64 hexagrams already have names (*Qián*, *Kūn*, *Zhūn*, …) and rich surface lore. Future overflow / stage-3 entities could draw from this dictionary directly.

The two relevant ratified phrases:
- "The 64 hexagrams could be a useful mathematical model for underlying game mechanics."
- "Wu Xing elements have been associated throughout."

### Decision 5 — Strength resolves, drag direction is just selection

The current `resolve(actor, patient)` signature is order-sensitive: drag-from chooses actor, drag-onto chooses patient, and the recipe table is keyed on the ordered pair. This was an artifact of the early v1 design and doesn't reflect the source tradition. Wu Xing relationships are intrinsic to the *phases*, not to the *gesture*.

**Rule.** When two entities meet, the **stronger concentration acts on the weaker** through whatever cycle relationship their phases share. When concentrations are equal, **the cycle decides direction; drag is just selection**.

Concretely:

- Same phase — existing concentration-additive climb (unchanged).
- Different phase, **unequal concentration** — stronger is the effective actor. The cycle relationship from stronger→weaker phase determines the result. If the stronger phase Ke-controls the weaker, Ke fires. If the stronger phase is the Sheng-child of the weaker, Xie fires (weakening). If the stronger phase is the Wu-controlled-by (i.e. it was "supposed to be controlled" by the weaker but isn't because the weaker is too weak), Wu fires.
- Different phase, **equal concentration** — the cycle relationship between the two phases is intrinsic and direction-fixed in the source tradition: Wood→Fire is Sheng, Metal→Wood is Ke, etc. Drag direction is ignored. One outcome per **unordered** pair, not two.

**Insub stops being a separate cycle.** The Wu/insulting outcome auto-fires whenever a Ke-controller is dropped on a stronger same-Ke-axis patient. *"If the wood is very strong and metal is weak, the last mentioned will get damaged or will lose its original force when trying to control or 'cut' the wood"* ([fengshuinatural.com](https://www.fengshuinatural.com/en/five-elements.html)). The existing Insub recipes in `recipes.json` become the Wu *outcomes*, indexed by `{strong_phase, weak_phase, cycle: "wu"}` after the migration.

**Implementation impact when we get there.**

- `resolve()` adds a strength comparator and a `cycleBetween(strongPhase, weakPhase)` classifier returning `"sheng" | "ke" | "xie" | "wu" | "none"`.
- The recipes.json table gets re-keyed from ordered pairs to `{phases: [a, b], cycle: ...}`. Sheng and Ke rows stay; Insub rows merge into Wu rows; stage-2 (mixed-phase) rows are unaffected because they have no natural inverse.
- Estimated 3–4 hours engine + data, plus playtest. Smaller than it sounds because Decisions 1 and 4 haven't been built yet — if we ratify Decision 5 *before* implementing 1 and 4, no rework.

**Author Decisions 1 and 4 under the strength-resolution model from the start.** Even if Decision 5 is the last to actually ship, the new code for Xie and ambient-affect should call `cycleBetween(strong, weak)` instead of reasoning about actor/patient directly. Costs nothing in the short term, saves the migration later.

### Decision 6 — The Wu Xing pentagram is the legend

Ultimately the artwork in the crafting space will make the cycle obvious. A pentagram diagram drawn into the workspace background — five phase tiles arranged in a circle, Sheng arrows around the outside, Ke arrows crossing through the inside as a five-pointed star — lets the player read the cycle visually without text. This is the canonical Wu Xing diagram from the [feng shui article](https://www.fengshuinatural.com/en/five-elements.html) and across the tradition.

Deferred, but locked as the target visual language. When implemented it replaces (or augments) the right-hand phase-tile column in the current layout. The player drags phase tiles directly off the wheel into the workspace; the wheel itself remains visible as a legend.

This is the answer to "how does the player learn the cycle without reading recipes?" — the cycle is drawn into the table they're playing on. Hover states on the wheel can highlight which arrow a candidate drop sits on, telegraphing the relationship before commit.

Not in scope for the next implementation pass. Parked, but informs every design decision above: we can rely on visual disambiguation of the cycles, which means we don't need to over-explain them in inspect copy or tile labels.

## Order of work when this is greenlit

1. **Decision 3 first** (inspect-copy rewrite, no engine change). Easiest, lowest-risk, immediately validates the "composition not provenance" intuition. Maybe 30 minutes.
2. **Decision 5 ratified in code shape before any new mechanic ships.** Add a `cycleBetween(phaseA, phaseB)` helper and a strength comparator to the engine, even if `resolve()` doesn't use them yet. This is the scaffold every later decision sits on.
3. **Decision 1** (Xie descent rule), authored against the strength-resolution helpers. Needs a new `moveType: "xie"`, a halo color (open question), and the child→parent table. By this point Decision 3 has reshaped the inspect drawer so the Xie outcome reads naturally as a composition delta.
4. **Decision 4** (no more nulls). Visual-cue-only version first — every drop fires a halo that names the relationship, no new entity spawned for un-recipe'd pairs. Floating-weight version (true subtraction at the `phase_weights` level) deferred.
5. **Decision 5 migration** — re-key the existing `recipes.json` table from ordered pairs to unordered `{phases, cycle}`. Insub rows merge into Wu rows. This is the cleanup step that retires the actor-patient grammar from the data layer entirely.
6. **Decision 2** is a do-nothing — documents that Ke stays as a control move, doesn't decrement, doesn't conflate with Xie.
7. **Decision 6** (pentagram artwork) deferred to its own visual-design pass. Not blocking anything; informs the eventual layout overhaul.
8. Balance-mode integration of any of the above is deferred to a separate pass.

## Open questions for the next session

- **Color** for the new Xie cue. Teal? Cyan? Soft blue? Whatever it is, it has to be visually distinct from Sheng (green) and the cool-side phase tints (Water, Metal). Wu/Insub also needs a cue color once Decision 5 separates it from the existing Insub recipes — propose **deep red** (already used for Ke) at higher intensity, or a desaturated purple-red. Decide during implementation.
- **What exactly the ambient-affect cue looks like** for the five inter-phase relationships when no recipe produces a new entity. Sheng-feed, Ke-control, Xie-weaken, Wu-harm — four distinct directional halos? Or one universal "interaction registered" pulse? Note that Decision 6 (pentagram artwork) eventually makes the cycle visible by location, which may reduce how much the halo needs to communicate.
- **Should mixed-phase (stage-2) entities participate in Xie?** Kindling is half-Wood, half-Fire — does Fire-child weaken it? Probably no for v1 (only pure-phase entities have a clear "child phase"), but worth saying explicitly.
- **Does the discoveries ledger still record by entity, or also by relationship?** "First time you saw Xie" might be its own discovery.
- **Strength tiebreak when phases are unequal but concentrations are equal.** Decision 5 resolves this for *different* phases (cycle decides). For *same* phase the additive rule handles it. There's no remaining ambiguity but worth confirming during implementation.
