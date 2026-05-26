# Skill 11 — Add a new mechanic

Introducing a new move type, a new state-vector dimension, a new resolution rule, or any other change that touches the core engine. This is the heaviest workflow in the catalog — use it deliberately.

## Touchpoints

- `docs/design/balance-mode.md`, `docs/design/decisions-for-richest-play.md`, `docs/design/ui-layout.md` — design source of truth across mechanics, philosophy, and UI
- `app/src/engine/balance.js`, `recipes.js`, `pcg.js` — engine layer
- `app/src/ui/workspace.js`, `pentagram.js`, `balance-hud.js` — UI layer
- `app/src/data/*.json` — data layer
- `app/src/styles/main.css` — cue animations

## Procedure

### 1. Write down the mechanic first

Before opening any code, write a one-page spec for the mechanic. Cover:

- **What** — the rule, stated precisely.
- **Why** — what does this add to play that the current six move types don't? (The current types are Sheng, Ke, Self, Insub, Stage-2, Null.)
- **Predict-your-next-drag impact** — can a player tell what this does without instructions? If not, redesign.
- **Interaction with Balance mode** — what state vector dimension does it touch? What's the budget cost? Does it interact with pathologies?
- **Interaction with Explore mode** — is it always available, or gated?
- **The UI cue** — halo color, motion vocabulary, sound (deferred). Must be distinct from the existing five.
- **The failure case** — what happens if the rule's preconditions aren't met?

Put this in `docs/design/balance-mode.md` (if Balance-relevant) or a new doc under `docs/design/`. Get the design committed before touching code.

### 2. Update the move-type vocabulary

The move-type animation vocabulary is locked in three places:

1. `docs/design/balance-mode.md §15.4`
2. `docs/design/ui-layout.md §3.3`
3. `app/src/styles/main.css` — `.cue-sheng`, `.cue-ke`, `.cue-self`, `.cue-insub`, `.cue-stage_2`

If your mechanic introduces a new cue, update all three. If you skip one, the vocabulary drifts and the spec lies.

### 3. Add the move_type value

The valid `move_type` values are enumerated in:

- `recipes.json` rows
- `recipes.js` `resolve()` return shape
- `balance.js applyMove()` switch / lookup
- `workspace.js resolveCraft()` cue dispatch
- `pentagram.js` weight update (if the move affects the state vector)

All five must learn about the new value. The engine doesn't enforce enum completeness; adding a value in `recipes.json` alone will silently fall through and produce no visible effect.

### 4. Add the delta (Balance mode)

If the mechanic affects the phase state vector, add a delta to `balance.js DELTAS` and route it through `applyMove()`:

```js
const DELTAS = {
  // existing ...
  myNewMove: 0.04,
};
```

Then in `applyMove()`:

```js
case "my_new_move":
  this.state[actor.phase] += DELTAS.myNewMove;
  break;
```

Don't forget to **clamp** the state vector. The existing code clamps to `[0, 1]` after every update — follow the pattern.

### 5. Add the cue CSS

```css
.cue-my-new-move {
  /* halo color */
  box-shadow: 0 0 20px <color>;
  /* motion */
  animation: my-new-cue-anim 600ms ease-out;
}

@keyframes my-new-cue-anim { ... }
```

Reference the existing cues for tempo and intensity. The 600ms duration is the convention.

### 6. PCG awareness

If the new move type is meant to be part of canonical solution paths, update `pcg.js` to consider it during backward chain expansion. The existing path counter treats only Sheng and Ke as canonical (Self and Insub exist but don't count). Decide where your move fits.

If you don't update PCG, the move is "available but uncounted" — fine for some mechanics (like Insub today) but not for others.

### 7. End-overlay representation

The end overlay in `balance-hud.js` shows the generator's canonical path and the player's actual path. If your new move can appear in either path, make sure the overlay renders it with the correct cue/icon. Mismatches here are subtle bugs that erode trust in the overlay.

### 8. Smoke test broadly

A new mechanic touches the engine, the UI, the data, and the state. The smoke test must cover all four:

- Engine: unit-style — call `resolve()` and `applyMove()` directly via the browser console with known inputs.
- Data: a representative recipe with the new `move_type` resolves correctly.
- UI: the cue fires, the pentagram updates if applicable, the budget ticks correctly.
- Mode interactions: Explore-mode behavior, Balance-mode behavior, Reset behavior, mode-switch behavior.

See [skill 5](./05-headless-smoke-test.md) and [skill 6](./06-mobile-and-touch.md).

### 9. Log in AGENT_NOTES

A new mechanic always deserves an `AGENT_NOTES.md` entry. Cross-link the design doc section.

## Gotchas

- **Don't add a mechanic to fix a tuning problem.** If Balance feels too easy, try [skill 8](./08-tune-balance.md) first. A new mechanic is a much bigger commitment than turning a knob.
- **The engine doesn't validate enum completeness.** A typo in `move_type` ("seng" instead of "sheng") silently produces a null. Always grep across the codebase after introducing a new move_type to ensure all switches handle it.
- **The pentagram, the HUD, and the end overlay all read from the same source of truth (`session.state`).** If you forget to update `session.state` for the new move, all three will silently desync.
- **Mode-conditional mechanics are a code smell.** If your new move only fires in Balance, ask whether the design really requires that, or whether it could also be available in Explore (it usually can). The orthogonality of mechanic ↔ mode keeps the engine simple.

## Related

- [skill 3](./03-add-recipe.md) — when the mechanic is just a new recipe row
- [skill 7](./07-add-ui-surface.md) — when the mechanic needs a new UI surface
- [skill 8](./08-tune-balance.md) — try tuning before mechanic addition
