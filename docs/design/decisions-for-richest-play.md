# Decisions for Richest, Most Intuitive Play

A reasoned pass through the open questions in [`open-questions.md`](./open-questions.md), making the call for each one. The tiebreaker throughout is a single principle:

> **The player should be able to predict, with reasonable accuracy, what their next drag will produce — without having read instructions.**

That's what made Infinite Craft viral and what most clones miss. Water + Fire = Steam is *guessable*. Anything requiring a manual loses the magic.

Two corollaries:

1. **Visual + verbal coherence wins.** Name and emoji together should suggest the *shape* of valid next combinations.
2. **Asymmetry is the feature, not the cost.** Wu Xing's directional cycles map to physical intuition (water quenches fire; fire doesn't quench water). The game should lean into that wherever possible.

The constraints from the locked Medium scope are taken as given:
**B (tier-gated)** + **Apply (results act on phases)** + **B-catastrophe (Storm × Storm = ~10 entries)** + **B-modifiers (Feelings attach as tokens)**, with v1 UI cloning the open-source Infinite Craft clone.

---

## Q4 tail — How Feelings work as modifier tokens

This is the highest-leverage question. The Infinite Craft UI has no modifier concept, so whatever we choose has to *fit inside* the dragged-icon paradigm we're cloning. Five sub-questions:

### Q4a. What does "attached" look like in the Infinite Craft UI?

**Decision: Feelings are *not* attached. They are *consumed by drop order*.**

A Feeling is just another icon on the workspace. To "modify" a craft, the player drops the Feeling onto the actor *before* the actor moves. The Feeling vanishes; the actor briefly glows; the next drop of that actor uses the modifier.

Why this beats true attachment:

- **Zero new UI.** Same drag, same drop, same icon set — no decorators, no badges, no slot manager.
- **It teaches itself.** A player who accidentally drops Anger on Wood will see the glow and notice the next Wood craft produced something different. Discovery loop, not tutorial.
- **The Infinite Craft clone's drop handler already supports it.** Drop A on B → check recipe. We just add a special case: if A is a Feeling and B is a phase/result, mark B as "charged" and remove A.

### Q4b. How many modifier slots per entity?

**Decision: One slot, replace on overflow.**

A second Feeling dropped on a charged entity replaces the first. The replaced Feeling vanishes with a small visual cue (no recovery — gone is gone).

Why one slot:

- **Predictability.** Stacking modifiers explodes the combinatorial surface and breaks the predict-your-next-craft principle.
- **Replacement is more intuitive than rejection.** A "this slot is full" error is friction. Replace is silent and lets the player experiment.
- **Five-by-five recipe surface stays tractable.** 5 Feelings × ~80 possible holders × Sheng/Ke/Self/Insub interactions is already plenty.

### Q4c. Does Joy modify opposite to Anger?

**Decision: Yes — each Feeling has a directional bias matched to its element.**

| Feeling | Element | Bias | What it does to the next craft of the charged entity |
|---|---|---|---|
| Anger | Wood | **Forceful** | Pushes the next craft one step *up* the cycle — i.e. it produces the next-tier result. A Wood→Earth normally produces Roots (Ke); charged with Anger it produces **Bramble** (the insubordinate-flavor result). |
| Joy | Fire | **Generative** | Pushes the next craft one step *toward Sheng*. Even a controlling pairing tries to nourish. A Fire→Metal normally produces Forge (Ke); charged with Joy it produces **a Sheng-flavored variant** (see §Stage-2 below). |
| Worry | Earth | **Stalling** | The next craft consumes the entity without producing a new one (it produces a Surge-tier result instead — Stagnation, Restlessness, etc.). Worry is hesitation. |
| Grief | Metal | **Releasing** | The next craft produces an *intermediate* result that decays back to a phase. Grief is letting go — it returns substance to its source. |
| Fear | Water | **Reversing** | The next craft is computed *with actor and patient swapped*. Fear inverts intent. |

Why these biases:

- **They are legible from the source material.** Anger = forceful, Joy = enthusiastic, Worry = stuck, Grief = letting go, Fear = retreat. A player who feels the emotion can guess the mechanic.
- **They cover the five interesting modifier behaviors a game like this needs:** intensify, soften, stall, decay, invert. Each is unique; none overlap.
- **Two of them are *negative-coded* in everyday life (Worry, Fear) but produce some of the most interesting craft results** — that's good design tension. The player who masters Fear unlocks the swap-pairs combinatorial layer.

### Q4d. Are Feelings consumed on next-craft, or persistent?

**Decision: Consumed on next craft of the charged entity, persistent until then.**

The Feeling icon disappears on drop (so the player commits to using it). The charge remains on the entity until that entity is next dragged onto something. If the entity is dragged onto an *invalid* target (nothing happens, snap back), the charge stays — only a *successful* craft spends it.

Why:

- **Spending it on a no-op would feel like the game cheating you.** Players will rage-quit over that.
- **Holding it until success makes the player plan ahead.** That's the interesting decision space: "I have Anger on Wood; what do I want to do with it?"
- **It limits how many simultaneously charged entities the workspace holds.** Practically capped by how many Feelings you've created.

### Q4e. Where do Feelings come from in v1, in practice?

**Decision: Feelings only come from Stage-1 self-crafts (Wood→Wood for Anger, etc.).** Authoring them as a separate source would clutter the right panel.

Implication: the player must commit a self-craft (which is a "wasted" move from a pure-discovery perspective) to gain a modifier. That's a *good* trade. It gives self-crafts an instrumental purpose beyond unlocking Surge and Storm.

---

## Q6 — Stage-2 failure state

The fully open stage-2 question.

**Decision: B (Nulls) for Explore mode. C (Loss) reserved for Balance/Harmonize.**

Why not A (failure-free):

- A "no valid recipe → make something up" rule pushes us toward LLM territory, which is the Maximal path. For Medium / hand-authored, that means authoring *every* possible pair, which contradicts the 65–85 entity ceiling.
- Failure-free also robs the player of meaningful learning. Every drop succeeding is no different from no drops mattering.

Why B over C in Explore:

- **B teaches recipe shape without punishment.** Snap-back says "not that, try something else."
- **C in a sandbox creates loss aversion that suppresses experimentation.** The opposite of what Explore mode is for.

Why C in Balance/Harmonize:

- That mode has a budget. Loss is the budget mechanic. Without it the puzzle is solveable by brute force.

Implementation detail to preserve intuition: when a snap-back happens, briefly highlight the *closest valid recipe* the player could have meant. Not a tutorial — just a "you're close" nudge. (Off by default; on for first three null events per session, then off.)

---

## Q1 tail — Are Self/Storm/Surge entities craftable in the Maximal version?

This is a v2 question but worth answering now so the v1 data model doesn't have to change later.

**Decision: Yes, Storms become craftable in Maximal. Surges and Feelings do not.**

Why:

- **Storms have natural-form names (Wind, Heart, Mud, Drought, Frost).** They behave like phases-of-phases. The LLM can confidently combine Wind × Frost = Blizzard because both are concrete physical phenomena.
- **Surges (Overgrowth, Restlessness, Stagnation, Rigidity, Flooding) are abstract excess states.** The LLM produces mush when asked to combine "Stagnation × Rigidity." Authoring them as terminal preserves the discoveries panel's signal-to-noise.
- **Feelings are modifier tokens, not nouns.** Combining them as entities breaks the modifier mechanic — what would it mean to combine Anger with Fear? They are *operators*, not values.

In v1, Surges and Feelings already are terminal except for the modifier behavior. So this decision keeps the v1 data model intact when v2 starts.

---

## Q2 tail — Does Reabsorb survive as a separate gesture/modifier?

**Decision: Drop it.**

The brainstorm imagined Axe-on-Metal returning to Metal. In practice:

- **It's anti-intuitive.** A player who has earned an Axe doesn't want to *lose* it by dropping it on Metal. The frustration of "I just deleted my Axe by accident" outweighs any mechanical depth gained.
- **It collides with the Apply posture.** If we say "results Apply to phases," then Axe-on-Metal should produce something new (a richer Metal? a sharpened Metal?), not undo the Axe.
- **The Maximal/LLM path makes it irrelevant.** Once everything combines with everything, "reabsorb" becomes just one possible result, and the LLM can decide when it fits.

Replacement design: results dropped on their *own origin* phase produce a **refined** variant. Axe on Metal = a Stage-2 entity (call it "Smithing" or "Whetstone" — author later). Always-additive, never-destructive.

---

## Q3 tail — Should some catastrophes trigger a phase reset side-effect?

**Decision: No. Catastrophes are terminal but *expensive to undo*.**

The C-style phase reset is tempting but breaks the discoveries panel: an entity that erases its own existence is hard to display, hard to remember producing, hard to attempt again deliberately.

Better mechanic: catastrophes **lock the workspace for a few seconds with a visual** (Inferno = screen-shake-and-glow, Blizzard = freeze overlay, etc.). The player can't drag during the lockout. This gives catastrophes weight without erasing them.

This also gives Balance/Harmonize mode something concrete to penalize: producing a catastrophe in puzzle mode costs N moves of the budget. In Explore it's just a moment of "ooh."

---

## Q7 — Hybrid entities and the pentagram

The pentagram isn't built in v1. But the data model is.

**Decision: B (Partial), encoded but not displayed in v1.**

Every entity in the recipe database carries a `phase_weights` field — a five-element vector summing to 1.0. Examples:

- **Wood**: `{wood: 1.0}`
- **Kindling** (Wood→Fire Sheng): `{wood: 0.5, fire: 0.5}` — both inputs contributed.
- **Axe** (Metal→Wood Ke): `{metal: 0.7, wood: 0.3}` — Ke results lean toward the actor (the one doing the controlling), since the controller is the dominant force in a Ke pair.
- **Wind** (Wood self-storm): `{wood: 1.0}` — Storms are pure expressions of their phase.
- **Bramble** (Wood→Metal insubordinate): `{wood: 0.9, metal: 0.1}` — the actor's pathology, lightly flavored by the target it acted on.

Why weighted this way:

- **Sheng = 50/50** because nourishment is mutual.
- **Ke = 70/30 toward the actor** because the controller dominates.
- **Storm = 100% actor's phase** because Storms are pure self-expression.
- **Insubordinate = 90/10 toward the actor** because the misdirected energy is still primarily the actor's.

Even though the pentagram isn't visible in v1, encoding the weights now means Balance/Harmonize mode can ship without a data migration.

---

## UI questions (Q8–Q15) — preliminary calls

The locked decision is "clone the open-source Infinite Craft UI first." That answers most of these by default. But if we're reasoning about *intuitive play*, here are the calls that should override the clone defaults:

### Q8. Right panel content — phases only? or also stage-1 results?

**Override: phases only.** Spawned-from-right, crafted-into-workspace. The right panel is the *periodic table*; the workspace is the *lab bench*. Putting crafted results in the right panel would conflate them. Infinite Craft does this too (its sidebar is the discoveries list, not a phases palette), but we have a stronger reason: with only 5 phases, a phases-only right panel stays beautifully simple.

### Q9. Left panel — flat, grouped, or Pokédex?

**Override: grouped by element with locked entries as silhouettes.** Five vertical columns (Wood, Fire, Earth, Metal, Water), each containing all entities whose dominant `phase_weight` matches that element. Locked entries show as gray silhouettes with a "?" — this *invites* the player to figure out what's missing without telling them how.

Why grouped by element rather than by class (Sheng/Ke/Self/Insub):

- **Class is meta-knowledge** the player learns over time.
- **Element is visible from the icon itself** and matches the right-panel mental model.
- **The visual rhythm of five filling columns** is a more satisfying progress feedback than a flat list ticking up.

### Q10. Workspace center — free, grid, or pentagram?

**Override: free placement, but with a soft pentagram center.** A faint pentagram graphic in the background of the workspace. Drag anywhere. No snapping. But the pentagram is *there* — it's a constant visual reminder of the underlying structure, and it makes the workspace feel like a craft space rather than a blank rectangle.

This is also where the pentagram readout (Q12) eventually lives — the faint background graphic gets a colored fill per element as Balance/Harmonize mode tracks weight.

### Q11. Inspect surface

**Override: hover tooltip in v1, side drawer in v2.** A tooltip shows: result name, emoji, one-line lore string (the surface reading). Click-and-hold or right-click opens a drawer with the full "true Wu Xing reading" — the literal-grid lore plus all the cell-citation copy.

Why tooltip first:

- **The clone scaffolding already has tooltips.** Drawer is custom work.
- **Casual players want the surface reading.** Deep players will click in.

### Q12. Pentagram readout placement

**Decision: hidden in v1, surfaced in Balance/Harmonize as the workspace-background fill.** The faint pentagram in Q10 lights up phase-by-phase as a puzzle progresses. No corner widget; no separate bar. The pentagram *is* the readout.

This requires zero new UI and reinforces the workspace as the locus of the game's underlying model.

### Q13. Mobile / touch

**Override: same layout, scaled.** Drag-direction is unambiguous on touch; the right→workspace and discoveries→left mental model holds at any size. Hover tooltip becomes long-press. Pentagram center becomes more important on mobile because it anchors the eye in a smaller space.

### Q14. Workspace clear

**Override: long-press anywhere on the workspace background → confirm → clear.** Plus an explicit small "clear" button bottom-right of the workspace.

Why both:

- The button is for the user who can't find the gesture.
- The long-press is for the user who's already comfortable.
- Neither is a footgun (confirm step), so no accidental loss.

The discoveries panel does *not* clear. Self-craft counters *do* reset (already locked).

### Q15. Discovered-icon click

**Override: re-spawn into workspace.** Click a discovered entity → it appears on the workspace at the cursor / center. This is the only way to "play with" an entity from a previous session, since the workspace clears but discoveries persist.

Locked entries (silhouettes) do nothing on click except show a tooltip: "Combine to discover."

---

## Summary table — what changes between now and v1

| Question | v1 Decision | New work it implies |
|---|---|---|
| Q4a (attach mechanism) | Feelings consumed by drop-order; glow on charged entity | One CSS animation, one boolean per entity |
| Q4b (slots) | One; replace on overflow | Trivial |
| Q4c (Feeling biases) | Anger forceful, Joy generative, Worry stalling, Grief releasing, Fear inverting | Five new recipe-resolution branches |
| Q4d (consume timing) | On successful craft only | Trivial |
| Q4e (source) | Stage-1 self-craft only | Already in design |
| Q6 (failure) | Nulls in Explore, Loss in Balance | Snap-back animation + nudge highlight |
| Q1 tail (Maximal) | Storms craftable; Surges and Feelings not | Forward-looking only |
| Q2 tail (Reabsorb) | Dropped; result-on-own-phase = refined variant | Adds ~5 Stage-2 entries |
| Q3 tail (catastrophe side-effect) | Lockout, not reset | Visual work in v2+ |
| Q7 (phase weights) | Encoded as float vector, not displayed in v1 | Database schema |
| Q8 (right panel) | Phases only | Already aligned |
| Q9 (left panel) | Five columns by element, silhouettes for locked | Layout change vs. clone default |
| Q10 (workspace) | Free placement, soft pentagram background | One SVG asset |
| Q11 (inspect) | Tooltip v1, drawer v2 | Already aligned with clone |
| Q12 (pentagram readout) | Hidden in v1, background fill in Balance mode | Future |
| Q13 (mobile) | Same layout, scaled | Already aligned |
| Q14 (clear) | Button + long-press, both with confirm | Small addition |
| Q15 (discovered click) | Re-spawn into workspace | Small addition |

The new authoring work this implies, beyond the existing 25-cell grid:

- ~30–50 stage-2 cells (the Medium target, unchanged).
- 10 catastrophe entries (unchanged).
- 5 "refined variant" entries (result-on-own-origin-phase — Smithing, etc.).
- Feeling-modifier resolution rules for each of the five biases — these are *transformations* of the base grid, not new entries, so they don't blow up the entity count.
- `phase_weights` per entity, which is metadata, not new entities.

Total: ~80 entities, comfortably inside the Medium ceiling.

---

## What stays open

- **The 10 catastrophe entities** themselves — need authoring. (Suggested: Wind+Frost = Blizzard, Wind+Heart = Inferno, Heart+Drought = Wildfire-Storm, Drought+Mud = CrackedEarth, Mud+Frost = Permafrost, Wind+Mud = Sandstorm, Heart+Frost = Steam-Storm, Heart+Mud = Eruption, Drought+Frost = Hardpack, Wind+Drought = DustBowl. Names to refine when stage-2 doc is written.)
- **Feeling-modifier resolution edge cases.** What does Fear (swap) do to a self-craft? (Trivial: a self-craft swapped is still a self-craft.) What does Worry (stall) do to an already-Surge-tier craft? (Probably: nothing — the craft completes normally, modifier wastes itself.) These are 5×4 = 20 edge cases to enumerate when authoring stage-2.
- **Refined-variant names** for the 5 result-on-own-origin cells.

Everything above is ready to go into [`stage-2-crafts.md`](./stage-2-crafts.md) when authoring begins.
