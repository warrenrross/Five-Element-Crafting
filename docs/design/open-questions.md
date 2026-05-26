# Open Questions

Parking lot for design questions raised in brainstorming but not yet decided. Anything resolved here gets promoted to the relevant design doc (e.g. `stage-2-crafts.md`, `ui-layout.md`) and struck through below with a one-line link to where it was answered.

This doc is **review-when-ready** — not blocking on a session-by-session basis.

---

## Locked decisions (for context)

These are not open. They frame the questions below.

- **Stage-2 scope target — Medium first, Maximal later.** (2026-05-25)
  - **v1 — Medium**: ~25 base + 30–50 stage-2 + 10 catastrophes = **65–85 entities total.** Hand-authored, finite, no LLM. Built to see how the mechanics feel before committing to scale.
  - **v2 (eventual) — Maximal**: ~25 base + 150+ stage-2 = **175+ entities.** This is the version that earns the Infinite Craft–style LLM-cache architecture from `docs/research/` (planned).
  - Medium-version postures locked from the grill: **B + Apply + B-catastrophe + B-modifiers** (see Stage-2 §Q1, Q2, Q3, Q4 below for definitions).
- **v1 UI baseline — mirror the open-source Infinite Craft clone.** (2026-05-25)
  - Decisions about right-panel content, left-panel layout, workspace shape, inspect surface, pentagram placement, mobile, clear, and discoveries-click behavior all defer until v1 is playable and we have something to compare to.
  - Reference repo for the UI scaffolding: Open Craft (Vue + Mistral, YouTube `aqrPOPq1kP0`). See `docs/research/open-craft-reference.md` (planned).

---

## Stage-2 questions (grill-me, 2026-05-25)

Raised in the brainstorming grill on stage-2 mechanics. Some are partially resolved by the Medium-first lock above; the unresolved tails are noted per question.

### Q1. Are Sheng/Ke results craftable at all?

The 10 stage-1 results (Kindling, Ash, Ore, Dew, Sapling, Roots, Dam, Rain, Forge, Axe) are the smaller, "earned" entities. Three possible postures:

- **A. Fully craftable** — anything drops on anything. ~30² = 900 possible ordered pairs at the surface layer alone.
- **B. Tier-gated** — stage-1 results combine only with other stage-1 results or with the five phases. Self/Storm/Surge entities stay terminal.
- **C. Class-gated** — combinable by class (Substance, Constraint, Tool, Emotion, Surge, Storm). Each class only interacts with certain others.

**Status — partially resolved.** Medium-version answer is **B**. Maximal version revisits as **A**. Tail question: when we move to Maximal, do Self/Storm/Surge entities also become craftable, or do they stay terminal even then?

### Q2. What does it mean to drop a *result* onto a *phase*?

Say the player drops **Axe** (a Ke result) onto **Wood** (a phase). Three readings:

- **Apply** — the result acts on the phase. Axe on Wood = chopped wood, produces something new (Plank).
- **Reabsorb** — the phase consumes its tool. Axe on Metal (its origin) = back to Metal, Axe disappears.
- **Forbidden** — results can only act on results. Phases stay pristine source material.

Matters because it changes whether the right side panel is *static* (always 5 phases) or *consumable*.

**Status — partially resolved.** Locked to **Apply** for v1. Tail question: does Reabsorb show up later as a separate gesture/modifier (e.g. drag-with-shift), or is it dropped entirely from the design?

### Q3. Storm × Storm — sixth-element-feeling thing?

If the player creates Wind, Heart, Mud, Drought, Frost and combines two:

- **A. Nothing** — Storms are terminal.
- **B. Catastrophe entity** — Wind × Frost = Blizzard, Wind × Heart = Inferno, Drought × Mud = Cracked Earth. ~10 entries.
- **C. Phase reset** — combining two Storms purges both and resets the pentagram. A "controlled burn" mechanic.

**Status — partially resolved.** Locked to **B (Catastrophe)** for v1, ~10 catastrophe entries to author. Tail question: should some catastrophes also trigger the C-style phase reset as a side effect (e.g. Inferno clears Fire from the workspace because it has spent itself)?

### Q4. The Feelings (Anger, Joy, Worry, Grief, Fear) — ingredients or tokens?

- **A. Ingredients** — Feeling × Phase produces something. 25+ new cells.
- **B. Modifier tokens** — Feelings attach to other entities and change their behavior on the next craft. Anger attached to Wood makes the next Wood→anything more intense.
- **C. Score chips only** — display-only in discoveries, never usable.

**Status — partially resolved.** Locked to **B (Modifier tokens)** for v1. Tail questions:

- What does "attached" mean visually in a clone of the Infinite Craft UI, which has no equivalent concept?
- How many modifier slots can an entity hold at once? One? One per Feeling? Unlimited?
- Does Joy modify in the opposite direction from Anger (calming next craft), or do all Feelings just intensify in different flavors?
- Are Feelings consumed on next-craft, or persistent until manually cleared?

### Q5. Stage-2 result count

Where on the scale do we want to land?

- **Minimal**: ~40 entities total.
- **Medium**: ~65–85 entities total.
- **Maximal**: ~175+ entities total.

**Status — resolved.** Medium for v1, Maximal as the eventual target once the LLM-cache architecture is in.

### Q6. Stage-2 failure state?

- **A. Failure-free** — every drop produces something.
- **B. Nulls** — some combinations produce nothing; the dragged item snaps back.
- **C. Loss** — bad combinations consume the entity. Only meaningful with a budget (i.e. Balance/Harmonize mode).

**Status — open.** No decision yet. Probably A or B for Explore mode; C reserved for Balance/Harmonize.

### Q7. Pentagram readout × stage-2 entities

How do hybrid entities (e.g. Plank = Wood/Metal blend) move the pentagram needle?

- **A. Not at all** — only phases and Storms count.
- **B. Partial** — Plank contributes 0.5 Wood + 0.5 Metal.
- **C. Dominant-class only** — Plank is +1 Wood because Wood was the patient.

**Status — open.** Likely defers entirely until the pentagram readout is actually built — which is itself deferred behind the v1 UI clone (which has no pentagram). Effectively a Balance/Harmonize-mode question.

---

## UI questions (grill-me, 2026-05-25)

All UI questions below are **deferred until v1 is playable**. We will clone the open-source Infinite Craft UI as the baseline, see how it feels with the Wu Xing mechanics in place, and then revisit each of these against the working baseline.

### Q8. Right panel content

Does it show only the 5 phases, or also any stage-1 results you've created? Affects whether crafting depletes the right panel or only the workspace.

### Q9. Left panel (discoveries) layout

- Flat list, grouped by class, or grouped by element?
- Persistent across sessions, or session-only?
- Locked entries as silhouettes (Pokédex-style), or only revealed ones?

### Q10. Workspace center

Free placement (drag anywhere), grid-snap, or pentagram-shaped? Pentagram is gorgeous but constraining.

### Q11. Inspect surface

Modal overlay, side drawer, or hover tooltip? How much room does the "true Wu Xing reading" need?

### Q12. Pentagram readout placement

Corner widget, full-screen toggle, or always-visible bar? Visible in Explore, or only in Balance/Harmonize?

### Q13. Mobile / touch

Same layout scaled down, or a separate stacked layout? Drag-direction (actor → patient) needs to feel right on a phone.

### Q14. Workspace clear

Explicit button, gesture (later), automatic at some threshold, or never? Affects whether the player can "reset and try again" in Explore.

### Q15. Discovered-icon click in left panel

Does nothing? Opens inspect? Re-spawns into the workspace?

---

## Earlier open questions

Carried forward from the two interaction-grid docs. Still open unless noted.

### From `interaction-grid.md` §6

1. **Should Sheng/Ke results be re-craftable?** — superseded by Stage-2 Q1 above.
2. **Should self-craft stage results persist into the discoveries panel even on workspace clear?** The session-resets-counter rule means a returning player might lose the Stage-3 unlock on refresh. Leaning: discoveries panel persists; counter does not.
3. **Insubordinate flavor copy.** Each insubordinate cell shares a result with a Stage-3 self-craft *in the literal grid*. The lore shown in a future inspect panel should differ between the two paths to the same result. (In `game-interaction-grid.md` the names are already distinct, so this question simplifies — but the lore-template question survives.)
4. **Emoji audit.** Pass once the discoveries panel design is in hand.

### From `game-interaction-grid.md` §7

1. **Emoji collisions across cells.** A few results have visually close emoji (🌬️ Wind vs. 💨 Gale; 🌧️ Rain vs. 🌊 Tide / Flooding). Worth a coherent pass with the panel mock.
2. **Are Stage-1 Feelings panel-worthy as full icons?** Or should they render as smaller "mood chips" in the discoveries panel? — folded into Stage-2 Q4 above.
3. **Insubordinate flavor template** — standardize the "**Bramble** — Wood resists Metal's blade. *(Push-back.)*" sentence shape before authoring inspect copy.
4. **Sheng/Ke results re-craftable?** — superseded by Stage-2 Q1.

---

## How to use this doc

- When a question gets answered in a real design doc, replace the bullet here with a strikethrough and link to where it was decided.
- Don't decide questions inline in this doc — decide them where they get *built into the game*, and treat this as the queue.
- New grill-me sessions should append a new dated section, not edit old ones.
