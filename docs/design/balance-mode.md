# Balance and Harmonize Mode

The puzzle mode of Five-Element-Crafting. Where Explore is open-ended discovery, **Balance and Harmonize** presents a procedurally-generated imbalance and asks the player to restore the five phases to equilibrium inside a move budget.

This doc is the design spec for the puzzle generator, the win condition, the failure model, and the move semantics that distinguish Balance mode from Explore. It builds on:

- [`game-interaction-grid.md`](./game-interaction-grid.md) — the 25-cell base surface.
- [`stage-2-crafts.md`](./stage-2-crafts.md) — the 55 stage-2 entities and the `phase_weights` schema this mode uses for scoring.
- [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) — the locked failure-model split (nulls in Explore, *loss* in Balance) and the Feeling-modifier rules.
- [`../research/wu-xing-puzzle-prior-art.md`](../research/wu-xing-puzzle-prior-art.md) — prior-art survey whose §14 recommendations frame this entire spec.

---

## 1. Prior-art framing

The mode's structural ancestor is **Yuke's *Wind and Water: Puzzle Battles* (2007, Neo Geo Pocket)** — the only released game combining Wu Xing tiles with a move-budgeted puzzle mode. Five-Element-Crafting diverges in two ways: the moves are *Sheng/Ke resolutions* on ordered pairs, not tile-match clears; and the win condition is *balance restoration*, not clearance for points.

Three other precedents shape the spec:

- **Reiner Knizia's *Tigris & Euphrates*** — the canonical "lowest score wins" balance-enforcement mechanic. A player who optimizes any single dimension *loses*. This becomes our scoring model (§4).
- **Isaac Childres's *Gloomhaven* infuse/consume** — Sheng *infuses* an element token into a shared pool; Ke *consumes* it. Two-move chains (Sheng then Ke on the same element) are more efficient than either alone. This becomes our move-value rationale (§5) and the *vocabulary* we use to describe what each move feels like.
- ***五行トリテ (Gogyo Trick)***, Yamamoto, 2021 — the only prior art with all four Wu Xing relationship types (生 / 克 / 侮 / 乘) as distinct game outcomes. This validates that our four-way resolution model holds up in a competitive context, not just a sandbox.

The full survey is in [`../research/wu-xing-puzzle-prior-art.md`](../research/wu-xing-puzzle-prior-art.md). Its §14 lists six concrete recommendations; this doc implements all six.

---

## 2. The puzzle, in one paragraph

The player opens Balance mode and sees the workspace populated with a starting state: a few entities already placed on the board, the pentagram background showing a visible imbalance (one phase glowing brighter than the others, one phase dim). A **move budget** is displayed in the corner — say, 6 moves. The player has the same drag-to-craft interface as Explore mode, but every craft costs one move from the budget. **Win**: the pentagram returns to balance (all five phases within tolerance ε of equal). **Lose**: budget hits zero with the pentagram still imbalanced, or the player accumulates more than M pathology tokens. A short ceremonial animation plays on either outcome and the player can request a new puzzle.

---

## 3. The state representation

Every puzzle state is the pentagram vector — a five-float tuple summing to 1.0:

```
state = (w_wood, w_fire, w_earth, w_metal, w_water)
```

Computed at any moment as the sum of `phase_weights` across all entities currently on the workspace, normalized to 1.0. This is the same `phase_weights` schema already defined in [`stage-2-crafts.md`](./stage-2-crafts.md) §7 — Balance mode does not introduce a new data structure, it just displays and scores what's already there.

The **balanced state** is `(0.2, 0.2, 0.2, 0.2, 0.2)`. The tolerance window `ε` defines when the player has won — see §4.

The pentagram background graphic from [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q10/Q12 visualizes this vector directly: each of the five points fills with color proportional to its weight. Hidden in Explore; the *primary* HUD in Balance.

---

## 4. The win condition — Tigris & Euphrates scoring

**Your score is your weakest element.**

```
score(state) = min(w_wood, w_fire, w_earth, w_metal, w_water)
```

A balanced state scores 0.2 (the max possible). An imbalanced state scores whatever the most-deficient phase is, which can be much less. **Win condition**: `score(state) ≥ 0.2 − ε` for some small tolerance ε (proposed default: ε = 0.03, giving a 17%–23% range per phase).

This is Knizia's insight applied directly to Wu Xing. It enforces two design properties that no flatter scoring model would:

1. **You cannot win by dumping** the most-abundant element into a single sink phase. The pentagram is a *floor* problem, not a ceiling problem — you have to bring the lowest phase up, not just push the highest phase down. A player who only knows the Ke cycle (which *reduces*) will lose to puzzles requiring Sheng (which *generates*).
2. **The four-way resolution model becomes mechanically necessary**, not decorative. Sheng moves *increase* a phase weight; Ke moves *decrease* it. Both are required tools. Self moves shift weight within a phase (Surge entities are pure actor-phase, so self-crafting concentrates rather than redistributes). Insubordinate moves *introduce pathology tokens* (§7), which is a cost rather than a benefit.

### 4.1 Why ε = 0.03

Three reasons for the default:

- **Floating-point friendly**: `phase_weights` are floats; an ε wider than the smallest legal weight-delta means a single Sheng craft can flip win/lose.
- **Generous enough to be solvable** without forcing the player to find exactly one solution. The PCG pipeline (§8) targets 1–3 valid paths for hard puzzles, 5–10 for medium — ε in that range produces those path counts.
- **Visible on the pentagram readout** at typical UI scale. Each of the five points fills at 17%–23%. A player can eyeball the win state.

Tunable in difficulty modes: easier puzzles may use ε = 0.05; ranked or daily puzzles may tighten to ε = 0.02.

---

## 5. Move semantics — the Gloomhaven framing

Every move in Balance mode is one of four types, costing exactly one budget point. The *feel* of each is borrowed from Gloomhaven's infuse/consume vocabulary:

### 5.1 Sheng move — *Infuse*

Drag actor onto patient where the pair is a Sheng edge. The patient's phase weight increases by the Sheng transfer amount (default `Δ = 0.05`); the actor's weight stays unchanged (Sheng nourishes the next phase, not at the source's expense). A generative entity appears on the workspace, carrying the resulting `phase_weights` per [`stage-2-crafts.md`](./stage-2-crafts.md) (50/50 actor/patient for stage-1 Sheng).

Player-facing copy: **"Wood infuses Fire. +0.05 Fire."**

### 5.2 Ke move — *Consume*

Drag actor onto patient where the pair is a Ke edge. The patient's weight decreases by `Δ = 0.05`. The actor's weight increases by a smaller amount (default `δ = 0.02`) — the controller draws strength from the act of controlling. A constraining entity appears on the workspace (70/30 actor/patient `phase_weights`).

Player-facing copy: **"Metal consumes Wood. −0.05 Wood, +0.02 Metal."**

### 5.3 Self move — *Concentrate*

Drag actor onto itself. The actor's weight increases by a larger amount (`Δ_self = 0.08`), because the entity produced is a pure actor-phase entity (Surge or Storm, both 100% actor's phase per [`stage-2-crafts.md`](./stage-2-crafts.md) §7). **Self moves do not redistribute** — they concentrate. Useful in Balance only when one phase is critically deficient and no Sheng path exists. Otherwise it makes the imbalance worse.

Player-facing copy: **"Wood concentrates. +0.08 Wood."**

The three-stage reveal (emotion → surge → storm) from [`game-interaction-grid.md`](./game-interaction-grid.md) §3 still triggers — Balance mode counts self-crafts per session like Explore does. In Balance this matters because Stage-3 Storms unlock catastrophes, which are usually a losing move (see §7).

### 5.4 Insubordinate move — *Disturb*

Drag actor onto patient where the pair is on neither cycle. The patient's weight changes by `±δ_insub = 0.02` in the direction *away* from balance, and a **pathology token** is added to the workspace (§7). The actor's named pathology variant (Bramble, Gale, Wildfire, etc., per [`game-interaction-grid.md`](./game-interaction-grid.md) §4) appears, contributing 90/10 actor/patient `phase_weights`.

Insubordinate moves are *almost never useful* in Balance. They cost a budget move, introduce a pathology token that costs *another* budget move to clear, and they push the pentagram in the wrong direction. The PCG pipeline (§8) deliberately avoids generating puzzles whose only solution requires an insubordinate move; their role in Balance is as a *mistake the player makes when they misread the cycle*.

Player-facing copy: **"Wood disturbs Metal. +1 pathology token."**

### 5.5 Why the Δ / δ / Δ_self numbers

Picked so that a balanced budget of 6 moves can solve a typical generated puzzle:

- **Sheng Δ = 0.05** gives 6 moves a 0.30 total swing capacity in one direction (enough to lift the lowest phase from a starting 0.05 to 0.35, well past the win threshold).
- **Ke Δ = 0.05 / δ = 0.02** means a Ke move has a 0.07 net swing (−0.05 patient + 0.02 actor). Slightly more *efficient per move* than Sheng if you need to both lower one and raise another simultaneously.
- **Self Δ_self = 0.08** is the largest single-move delta, but only useful when *concentration* is wanted. Almost never in Balance.

The combination of Sheng-mostly and Ke-occasionally is the intended solution shape for most puzzles, which is what the PCG pipeline (§8) generates.

The Wo Long antipattern from the prior-art survey (§14 recommendation 6) warns: if Sheng is mechanically weaker than Ke, players route around Sheng. The Δ/δ split here keeps them roughly equal in per-move power. Subject to playtest tuning.

---

## 6. Move budget and difficulty tiers

Three difficulty modes for v1:

| Mode | Budget K | Tolerance ε | Target valid solution paths | Starting imbalance magnitude |
|------|----------|-------------|------------------------------|------------------------------|
| **Gentle** | 8 | 0.05 | 15+ paths | ‖state − balanced‖ ≤ 0.15 |
| **Steady** | 6 | 0.03 | 5–10 paths | ‖state − balanced‖ ≤ 0.25 |
| **Sharp** | 5 | 0.02 | 1–3 paths | ‖state − balanced‖ ≤ 0.35 |

The path-count targets come directly from Volden et al. (2023) via the prior-art survey §12. The generator (§8) tunes the inverse-craft sequence length to hit these targets.

A fourth mode — **Daily Puzzle** — is the same as Steady, but a single puzzle is generated server-side per day, identical for all players, with a leaderboard for fewest moves used. (Daily mode is a v2 feature; spec'd here for forward-compat.)

---

## 7. Pathology tokens

When an insubordinate move is made, a **pathology token** is added to the workspace as a visible icon (the actor's pathology variant from [`game-interaction-grid.md`](./game-interaction-grid.md) §4: Bramble, Gale, Wildfire, Steam, Smoke, Quicksand, Rust, Blade, Erosion, Tide).

**Clearing a pathology token** costs one budget move. To clear, the player drags the *element that controls* the actor's phase onto the pathology token. (Wood-pathology → Metal clears; Fire-pathology → Water clears; Earth-pathology → Wood clears; Metal-pathology → Fire clears; Water-pathology → Earth clears. The Ke cycle, repurposed as a "diagnosis" mechanic.) The token disappears, the workspace cost goes away, and `phase_weights` rebalance slightly (the controlling phase ticks up by `+δ = 0.02`).

**Lose condition**: more than `M = 3` simultaneous pathology tokens. The puzzle ends in failure regardless of remaining budget. This caps the cost of cascading mistakes.

**Why this design**:

- Pathology tokens make insubordinate moves *mechanically costly* without making them illegal. The player learns the cycles by feeling the cost.
- The clearing rule reinforces the Ke cycle. A player who can't remember which phase controls Wood will struggle to clear a Bramble, and will reach for the inspect tooltip — exactly the desired learning loop.
- Gloomhaven's element-decay (per prior-art survey §10) is the structural inspiration. A mechanic that punishes suboptimal sequences without making puzzles unsolvable.

---

## 8. The puzzle generator — backward-chain PCG

The full pipeline implements the prior-art survey §12 recommendations. Four stages.

### 8.1 Backward-chain generation (Smith et al., 2012)

```
1. seed ← (0.2, 0.2, 0.2, 0.2, 0.2)     # balanced state
2. solution ← []                          # the recorded solution path
3. for k in 1..K:                         # K = move budget
4.   choose a random Sheng or Ke move m
5.   apply m^(-1) to seed                 # inverse craft
6.   prepend m to solution                # record forward move
7. starting_state ← seed                  # imbalanced puzzle state
8. return (starting_state, solution)
```

Inverse crafts are straightforward because Sheng/Ke moves are linear updates to the phase-weight vector:

- **Inverse Sheng** of `actor → patient` with delta Δ: subtract Δ from patient, leave actor unchanged.
- **Inverse Ke** of `actor → patient` with delta Δ, δ: add Δ to patient, subtract δ from actor.

The recorded solution is *one* valid path. The generator does not guarantee it's the *only* path — the difficulty calibration step measures that.

### 8.2 Solvability constraint (Smith et al., 2012)

Before serving a puzzle, run a bounded forward-tree search from the starting state to verify at least one solution of length ≤ K exists. The state space is small enough to brute-force:

- 5 phases × 5 phases = 25 ordered pairs per move, of which 10 are Sheng+Ke moves and the rest are self/insubordinate. Practically, the player has ~10 meaningful move options at each step.
- Depth K ≤ 8. Tree size ≤ 10^8 nodes worst case, well under 10^4 with alpha-beta pruning against the `min` scoring objective.

If the tree search fails to find any solution within K (which shouldn't happen given the generator constructed one by reverse-walk, but rounding errors and tolerance mismatches could in principle conspire), reject the puzzle and regenerate.

### 8.3 Difficulty calibration (Volden et al., 2023)

For each generated puzzle, count the number of distinct solution paths of length ≤ K within tolerance ε. This is the **difficulty inverse** — fewer paths = harder puzzle.

Target distributions per difficulty tier are in §6's table. If the path count for a generated puzzle is outside the target band for its declared difficulty, mutate K or the inverse-craft sequence and retry. Volden et al. report convergence in ~24 generations, which fits inside a one-second client-side puzzle-generation budget.

### 8.4 Statistical distribution control (Katz et al., 2024)

Over a session of, say, 20 puzzles, ensure the *identity of the most-imbalanced phase* is roughly uniform across the five phases. Without this control, a generator using uniform random move-selection in §8.1 will produce statistical clustering (Wood-excess and Water-deficiency are more common starting states because they're at the ends of the Sheng cycle and accumulate weight asymmetrically under random walks).

Implementation: track the histogram of "most-imbalanced phase" across the player's recent puzzles. Bias the inverse-craft selection in §8.1 to under-represented phases until the histogram flattens. Reset the histogram when the player switches difficulty mode.

This prevents the player from learning "always assume Wood is too high" as a meta-strategy that routes around the intended challenge.

---

## 9. The four-outcome model — Gogyo Trick validation

The prior-art survey §9 identifies *Gogyo Trick* (2021, Yamamoto) as the only prior art with all four Wu Xing relationship types as *distinct game outcomes*. In Balance mode each of our four resolution types is mechanically distinct in the same way:

| Resolution | Phase-weight effect | Entity produced | Pathology token? | Strategic role in Balance |
|------------|--------------------|----|------------------|---------------------------|
| **Sheng** (Infuse) | Patient +Δ | Generative stage-1 result | No | Lift the deficient phase. The most common puzzle move. |
| **Ke** (Consume) | Patient −Δ, Actor +δ | Constraining stage-1 result | No | Lower the excess phase. Cleanest "two-birds" move. |
| **Self** (Concentrate) | Actor +Δ_self | Surge or Storm | No (but Storm × Storm = catastrophe, see §10) | Rare. Only when a deficient phase needs a fast lift and no Sheng path exists. |
| **Insubordinate** (Disturb) | Patient ±δ_insub away from balance | Pathology variant | Yes — costs +1 token | Always a mistake in Balance. |

The Gogyo Trick precedent matters because it validates that *four* distinct outcomes is a workable design rather than excessive — Yamamoto's game-of-the-year-nominated trick-taker shipped this exact distinction and players learned it. Our puzzle mode is asking the same cognitive lift of its players.

---

## 10. Catastrophes in Balance mode

Storm × Storm catastrophes from [`stage-2-crafts.md`](./stage-2-crafts.md) §5 are terminal entities with a brief workspace lockout in Explore. In Balance they have an additional cost: **producing a catastrophe consumes the remaining budget down to 1 move minimum.**

Rationale: a 50/50 catastrophe (every catastrophe has perfectly even phase weights between its parent Storms per [`stage-2-crafts.md`](./stage-2-crafts.md) §5) actually contributes neutrally to the pentagram total. But the *visual lockout* and the budget consumption together make catastrophes a near-instant loss in Balance. This is intentional. It teaches the player that the most powerful entities in the game are also the most disruptive — exactly the Wu Xing reading the lore is meant to convey.

The catastrophe cost is *not* a hard loss because the player may still have 1 move and a workable position. But it's almost always fatal.

---

## 11. Failure model — explicit losses

Per [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q6, Balance mode runs the **Loss** failure model (vs. Explore's Nulls):

- A craft that would produce a *null* entity (no recipe in the table) **consumes a budget move and produces nothing**. The dragged entity snaps back. The player has paid for a mistake.
- The "close-to-recipe" nudge that fires for the first three nulls per session in Explore mode is **disabled in Balance**. The player is expected to know the recipes; the puzzle's challenge presumes that knowledge.
- Pathology-token accumulation beyond `M = 3` ends the puzzle in failure regardless of budget.
- Budget reaching 0 with the pentagram still outside tolerance ε ends the puzzle in failure.

A failed puzzle shows: the pentagram in its final state, the solution path the generator recorded, and the player's actual moves overlaid. No score is recorded, but no penalty either — the player can immediately request a new puzzle of the same difficulty.

---

## 12. Feeling modifiers in Balance

Feelings are produced by Stage-1 self-crafts (per [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q4e). In Explore they're a flavor mechanic. In Balance they become *strategic resources*:

- A Self move costs one budget point, produces a Surge or Storm, **and** produces the Stage-1 Feeling for that phase (if not yet produced this session).
- The five Feeling biases (Anger=forceful, Joy=generative, Worry=stalling, Grief=releasing, Fear=swap-actor-and-patient) survive into Balance unchanged.
- Strategic use case: **Fear** (swap actor and patient) is especially valuable in Balance because it lets a single Feeling charge convert a Ke move into its mirror Ke move (e.g. Metal→Wood becomes Wood→Metal), which can be exactly the swap a tight puzzle requires.
- A Feeling charge that resolves into a *null* (per §11 above) still consumes the budget move *and* spends the charge. Combined with the "no nudge" rule, this is the harshest interaction in Balance — and the one most likely to teach a player to plan ahead.

---

## 13. UI for Balance mode

Inherits the v1 UI clone of Open Craft per [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q8–Q15, with these additions:

- **Pentagram readout** (the soft pentagram background graphic) is *always visible* in Balance, with the five points filled per current phase weights. In Explore it stays hidden.
- **Budget counter** in a top-right corner widget: "5 / 6 moves remaining."
- **Pathology token tray** above the workspace, showing 0–3 token icons. Slot 4 glows red as a warning.
- **Solution-revealed-on-fail overlay** showing the generator's recorded path step-by-step, with the player's chosen path overlaid.
- **No** "clear workspace" affordance during a Balance puzzle. Clearing would let the player reset state without spending budget, which breaks the puzzle. The workspace clears automatically on puzzle resolution (win or lose).
- **Daily Puzzle** (v2) gets a separate entry from the main menu and a small leaderboard component.

---

## 14. Implementation surface

The Balance-mode engine is a thin layer on top of the recipe table:

```
class BalanceSession:
  state: PhaseVector            # current phase weights
  budget: int                   # remaining moves
  pathology_tokens: list        # current tokens on workspace
  workspace: list[Entity]       # placed entities
  solution: list[Move]          # generator's recorded solution
  difficulty: "gentle" | "steady" | "sharp"

  def apply_move(actor, patient) -> MoveResult:
    # 1. classify the (actor, patient) pair (Sheng/Ke/Self/Insub/null)
    # 2. recipe lookup from stage-1/stage-2 tables
    # 3. update phase vector per §5
    # 4. update pathology tokens per §7
    # 5. decrement budget
    # 6. evaluate win/lose conditions per §11

  def check_win(self) -> bool:
    return min(self.state) >= 0.2 - epsilon

  def check_lose(self) -> bool:
    return self.budget <= 0 or len(self.pathology_tokens) > 3
```

The PCG pipeline (§8) is implemented separately:

```
def generate_puzzle(difficulty) -> Puzzle:
  K, epsilon, path_count_target, magnitude = TIERS[difficulty]
  for generation in 1..24:
    starting_state, solution = backward_chain(K)
    if not solvable_within(K, starting_state, epsilon):
      continue
    actual_path_count = count_solution_paths(starting_state, K, epsilon)
    if actual_path_count in path_count_target:
      return Puzzle(starting_state, solution, K, epsilon)
  return fallback_puzzle(difficulty)
```

Both pieces are pure-Python (or pure-JS) over the recipe table from [`stage-2-crafts.md`](./stage-2-crafts.md) §8 — no backend required, no LLM. The entire Balance mode adds maybe 400 lines of code on top of the Explore engine.

---

## 15. CPS alignment notes

This section reflects on alignment between the **CPS Framework** (Construct → Procedure → Script) the project owner uses for technical wikis and the Balance-mode mechanics defined above. CPS is being applied as a *tiebreaker* — only where alignment is genuine; otherwise as background consideration.

### 15.1 Strong alignment

**Constructs** map cleanly to the five phases and the four resolution rules. Both:

- Appear inside every Procedure (every puzzle solve invokes them).
- Have no "steps to follow" — understanding means recognizing which variant applies.
- Are parametrically variable (Sheng is the same idea whether the pair is Wood→Fire or Water→Wood).
- Connect otherwise-unrelated material (one Sheng rule explains five generative recipes, ten Sheng-only stage-2 entities, and the entire Sheng arm of the catastrophe table).

Wiki implication accepted: the inspect-panel copy for the phases and the four resolution types deserves the highest investment, because every Balance-mode puzzle is built on them. This aligns with Meyer & Land's *threshold concepts* — once a player genuinely understands Sheng vs. Ke as directional asymmetric relations, every recipe in the game becomes derivable rather than memorizable.

**Procedures** map cleanly to **solving a puzzle**. A Balance puzzle requires:

- Identifying which phase is most deficient (calling on the pentagram-readout Construct).
- Choosing among Sheng/Ke/Self/Insubordinate moves (conditional reasoning over the four resolution Constructs).
- Sequencing moves to maximize `min(state)` within K (a multi-step plan, not a single action).

Wiki implication accepted: if we ever author a "how to play Balance mode" page, it should be structured as a Procedure — "When you see imbalance type X, consider move sequence Y." Not "the rules are A, B, C."

### 15.2 Speculative alignment, worth flagging

**Scripts** could map to **named puzzle openings** the player learns through repetition. The same way a chess player knows "when Black plays the Sicilian Defense, you respond with..." a Balance player might learn:

- *"Wood-excess, Earth-deficient" → Roots (Wood→Earth Ke move) first, then a Sheng on Earth.*
- *"Water-deficient, Metal-excess" → Dew (Metal→Water Sheng) first, then a Self-Water if budget permits.*

This is speculative because we don't yet have playtest data showing whether real puzzles cluster around recognizable openings. But the difficulty progression — Gentle → Steady → Sharp — could *manufacture* Scripts: Gentle puzzles repeatedly exercise the same 5–10 opening patterns, building automaticity, while Sharp puzzles require novel combinations.

If this pans out in playtest, the inspect-panel could include a "common openings" section per puzzle type. **Flag for post-playtest review** — do not author Script content speculatively.

### 15.3 Weak or forced alignment — left as notes only

A few CPS mappings that suggested themselves but don't earn a place in the mechanics:

- *The four resolution types as a "knowledge dimension"* — tempting to call Sheng/Ke "Conceptual" and Self/Insub "Factual" knowledge in Anderson's terms. Doesn't add anything; the mechanics already treat them as four distinct outcomes per §9.
- *Phase weights as Construct-with-slots* — the float vector summing to 1.0 is parametrically variable, but it's a data structure, not a learnable concept. Calling it a Construct would dilute the term.
- *Catastrophes as anti-Scripts* — the "Storm × Storm = workspace lockout" sequence is highly stereotyped, but it's an *outcome*, not something the player executes by rote. Doesn't fit Script semantics.

These are noted here so future design sessions don't re-litigate them.

### 15.4 Cognitive Load Theory cross-check

Sweller's intrinsic/extraneous/germane load framework gives the Balance-mode UI two specific design constraints:

- **The pentagram readout must be processable at a glance.** A visible-but-confusing pentagram increases *extraneous* load. The proposed five-points-filling-with-color design from [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q10 satisfies this if the colors are well-chosen.
- **The four resolution types should be visually distinguishable in animation.** Currently §5 specifies different player-facing copy per type (Infuse / Consume / Concentrate / Disturb). The animation distinguishing them — different glow color or motion vector per resolution — is *germane* load: it builds the player's schema of which move did which thing. Worth investing in.

This is the kind of cross-check CPS earns its place for: it surfaced a concrete UI requirement (visual distinction between the four move types) that wasn't obvious from the mechanics alone.

---

## 16. What this doc does not cover

- **Final values for Δ, δ, Δ_self, ε, M.** These are reasoned defaults requiring playtest validation. Subject to tuning in a `balance-tuning.md` doc once v1 is playable.
- **Solver implementation details.** §8 specifies the algorithm at the level of "bounded forward-tree search with alpha-beta pruning"; the actual implementation choices (recursion vs. iteration, hash-cons of states for memoization, etc.) belong in code review, not design.
- **Daily Puzzle infrastructure.** Mentioned in §6 and §13 for forward-compat. Spec'd in a future `daily-puzzle.md`.
- **Leaderboard and social features.** Out of scope for v1 entirely.
- **The LLM-cache architecture for Maximal scope.** Balance mode in Maximal could feature generated puzzles with novel entities, but the v2 spec is a separate doc.

See [`../../AGENT_NOTES.md`](../../AGENT_NOTES.md) for the running session log and [`open-questions.md`](./open-questions.md) for any unresolved tail questions.

---

## 17. Open tail questions

1. **Sheng-vs-Ke per-move power balance** — is Sheng Δ=0.05 and Ke (Δ=0.05, δ=0.02) the right ratio? The Wo Long antipattern from the prior-art survey §14 says "make Sheng and Ke roughly equal in per-move power or players route around the weaker one." But "roughly equal" is a tunable, not a constant. Decide after the first 20–30 generated puzzles.
2. **Should Feelings persist across puzzles in Balance mode?** Per [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q4d Feelings are consumed only on successful craft. If a puzzle ends with an unused Feeling charge, does it carry into the next puzzle? Leaning *no* — each puzzle should be a clean slate. Confirm.
3. **The catastrophe budget consumption rule (§10).** Is it too harsh? Specifically: does "consumes budget down to 1 minimum" punish a player who *accidentally* combines two Storms they wanted to keep for inspecting later? Possible mitigation: a "you're about to make a catastrophe" pre-confirm. Leaning *no confirm* — Wu Xing should feel like a system with real consequences — but flag for playtest.
4. **Pathology cap M = 3.** Anchored at three because four-token configurations rarely have win-states. But playtest may show three is too tight on Gentle and too loose on Sharp. Worth a per-difficulty value.
5. **Daily Puzzle determinism.** When v2 ships Daily, the puzzle must be identical for all players. The PCG pipeline needs a seeded RNG mode. Spec'd as future work, not blocking.
