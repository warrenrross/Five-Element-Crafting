# Skill 8 — Tune Balance mode

Adjusting the Balance-mode scoring, deltas, difficulty bands, or PCG biases. Use this when playtest reveals that puzzles feel too easy, too hard, or that one phase is consistently overweight.

## Touchpoints

- `docs/design/balance-mode.md` — the spec; *always read this first*
- `app/src/engine/balance.js` — `DELTAS`, `TIERS`, `MAX_PATHOLOGY`, scoring
- `app/src/engine/pcg.js` — backward-chain PCG, `PATH_COUNT_CAP`, session histogram
- `app/src/ui/pentagram.js` — visual representation (rarely changes)
- `app/src/ui/balance-hud.js` — end overlay, difficulty selector

## Procedure

### 1. Read the spec

Before changing any number, re-read the relevant section of `balance-mode.md`:

- §5 — phase-delta values
- §6 — difficulty tier table (K, ε, target path count)
- §7 — pathology cap M
- §8 — PCG pipeline and the §8.4 distribution bias
- §10 — catastrophe budget drain
- §11 — nulls cost budget

If your tuning intuition disagrees with the spec, update the spec first. The spec drives the implementation, not vice versa.

### 2. Common knobs

#### Phase deltas (`balance.js DELTAS`)

```js
const DELTAS = {
  sheng: 0.05,       // generative — actor gives, patient receives
  ke: 0.05,          // controlling — actor takes from patient
  keActor: 0.02,     // ke actor gains a small amount
  self: 0.08,        // self-craft concentrates the phase
  insub: 0.02,       // insub disturbs the actor's phase
  pathClear: 0.02,   // clearing a pathology gives the controller +δ
};
```

Symptoms → knob:

- *Puzzles feel sluggish — too many moves to swing a phase* → raise sheng/ke deltas.
- *Single self-crafts dominate* → lower `self`.
- *Pathologies are trivial to ignore* → raise `pathClear` so clearing becomes a deliberate move.

#### Difficulty tiers (`balance.js TIERS`)

```js
const TIERS = {
  gentle: { K: 8, epsilon: 0.05, targetPaths: 15 },
  steady: { K: 6, epsilon: 0.03, targetPaths: 8  },
  sharp:  { K: 5, epsilon: 0.02, targetPaths: 2  },
};
```

- `K` — move budget. Lower = harder.
- `epsilon` — the win window's half-width around `0.2`. Larger = more forgiving.
- `targetPaths` — how many distinct canonical (Sheng+Ke) paths reach a win. Lower = the player has to find the right move.

#### Path counting (`pcg.js PATH_COUNT_CAP`)

The path counter explores paths up to `K` moves deep, with Self and Insub *not* counted (they're available but don't count toward "canonical" paths). The cap exists because Gentle puzzles with K=8 can have millions of paths and you'd run out of memory. Default `200`.

If Gentle puzzles feel too easy, lower the cap — but verify Steady and Sharp still hit their target bands.

### 3. Tune iteratively

Don't change three knobs at once. Pick one, generate 20 puzzles per difficulty, eyeball the path-count distribution:

```js
// In the browser console with Balance mode loaded:
import("./src/engine/pcg.js").then(m => {
  const counts = { gentle: [], steady: [], sharp: [] };
  for (const d of ["gentle", "steady", "sharp"]) {
    for (let i = 0; i < 20; i++) {
      const puzzle = m.generatePuzzle(d);
      counts[d].push(puzzle.pathCount);
    }
  }
  console.log(counts);
});
```

The §8.4 session histogram nudges the generator toward underrepresented phases as you play. If your distribution looks wrong, check that `resetSessionHistogram()` isn't being called somewhere it shouldn't be.

### 4. Update the spec

When a knob change sticks (i.e. survives playtest), update the relevant number in `balance-mode.md`. If you don't, the spec drifts and future contributors will be confused.

### 5. Smoke test

A complete Balance-mode smoke test:

- Enter Balance mode at each difficulty
- Verify path count falls in the target band
- Run the generator's canonical solution as the player; should reach a win
- Drop one null mid-puzzle; budget should tick down
- Trigger one catastrophe; budget should drop to 1
- Force one Insub; verify a pathology token spawns
- Clear the pathology with the correct Ke-controller; verify it disappears

## Gotchas

- **The §8.4 distribution bias only works within a session.** Reload clears the histogram. If you want long-term distribution control, persist the histogram to `localStorage` — currently it isn't.
- **`PATH_COUNT_CAP=200` capping at exactly 200 means "≥ 200".** Don't interpret 200 as the actual count. If you need exact counts for tuning, raise the cap to e.g. 10000 temporarily.
- **The pentagram only updates after a successful craft.** If you change which move types affect which phases, the pentagram will silently desync. The mapping is in `pentagram.js#updatePentagram()` and must stay in lockstep with the deltas in `balance.js`.
- **The end overlay's "generator path" is the canonical solution found by the PCG**, not "the optimal solution." If a player finds a shorter path you didn't anticipate, that's fine and intended.
- **Catastrophes drain budget to 1, not 0.** Spec §10. So a player can still attempt one final clearing move. Don't change this without re-reading §10.

## Related

- [skill 3](./03-add-recipe.md) — when adding moves to the table
- [skill 11](./11-add-mechanic.md) — adding a new move type entirely
