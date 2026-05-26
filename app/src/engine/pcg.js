/**
 * Procedural puzzle generator for Balance mode.
 * Per docs/design/balance-mode.md §8.
 *
 * Pipeline:
 *   1. Backward-chain from the balanced state (§8.1).
 *   2. Verify solvability within K (§8.2).
 *   3. Difficulty-calibrate by counting distinct solution paths (§8.3).
 *   4. Statistical distribution control over a session (§8.4).
 *
 * The generator operates over the five primary phases only — it does NOT
 * touch the stage-2 entity table. The live BalanceSession can still produce
 * stage-2 entities during play; the generator just constructs a starting
 * pentagram vector and one valid solution path.
 */

import {
  PHASES,
  TIERS,
  DELTAS,
  balancedState,
  classifyPhasePair,
  applyPhaseMove,
  applyInversePhaseMove,
  isWin,
  score,
} from "./balance.js";

const MAX_GENERATIONS = 24;
const FALLBACK_MAX_TRIES = 80;

// Session-scoped histogram for §8.4. Resets when the difficulty changes.
let sessionHistogram = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
let sessionDifficulty = null;

export function resetSessionHistogram() {
  sessionHistogram = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
}

/**
 * Generate a puzzle for the requested difficulty tier.
 * Returns:
 *   {
 *     startingState: { wood, fire, earth, metal, water },
 *     solution:      [{ actor, patient, kind }, ...],
 *     K:             number,
 *     epsilon:       number,
 *     difficulty:    "gentle" | "steady" | "sharp",
 *     pathCount:     number,         // exact count up to depth K
 *   }
 */
export function generatePuzzle(difficulty = "steady") {
  if (sessionDifficulty !== difficulty) {
    resetSessionHistogram();
    sessionDifficulty = difficulty;
  }
  const tier = TIERS[difficulty];
  if (!tier) throw new Error(`Unknown difficulty: ${difficulty}`);

  let best = null;
  let bestPathCount = -1;

  for (let gen = 0; gen < MAX_GENERATIONS; gen++) {
    const candidate = backwardChain(tier.K, sessionHistogram);
    if (!candidate) continue;

    if (!isStateSolvable(candidate.startingState, tier.K, tier.epsilon)) {
      continue;
    }

    const pathCount = countSolutionPaths(
      candidate.startingState,
      tier.K,
      tier.epsilon,
    );

    if (inRange(pathCount, tier.pathTarget)) {
      // Bookkeeping for §8.4.
      sessionHistogram[mostImbalancedPhase(candidate.startingState)] += 1;
      return {
        ...candidate,
        K: tier.K,
        epsilon: tier.epsilon,
        difficulty,
        pathCount,
      };
    }

    // Keep the closest candidate as a fallback.
    if (Math.abs(pathCount - midpoint(tier.pathTarget)) <
        Math.abs(bestPathCount - midpoint(tier.pathTarget)) || best === null) {
      best = candidate;
      bestPathCount = pathCount;
    }
  }

  // Fallback: take the closest near-miss, or synthesize a simple one-move
  // puzzle as a last resort.
  if (best) {
    sessionHistogram[mostImbalancedPhase(best.startingState)] += 1;
    return {
      ...best,
      K: tier.K,
      epsilon: tier.epsilon,
      difficulty,
      pathCount: bestPathCount,
    };
  }
  return fallbackPuzzle(difficulty);
}

// ============================================================
// §8.1 Backward chain
// ============================================================

function backwardChain(K, histogram) {
  // Bias the initial perturbation phase toward under-represented phases.
  const biasedPhases = bySessionHistogramBias(histogram);

  let state = balancedState();
  const solution = [];

  for (let k = 0; k < K; k++) {
    // Choose a Sheng or Ke move (avoid Self/Insub in the generator per §8.1).
    const move = chooseGeneratorMove(state, biasedPhases, k === 0);
    if (!move) break;
    state = applyInversePhaseMove(state, move.actor, move.patient);
    solution.unshift(move); // record forward order
  }

  // Reject degenerate puzzles (no perturbation away from balance).
  if (l1(state, balancedState()) < 0.01) return null;

  return { startingState: state, solution };
}

function chooseGeneratorMove(state, biasedPhases, isFirst) {
  // Enumerate all Sheng + Ke ordered pairs.
  const candidates = [];
  for (const a of PHASES) {
    for (const b of PHASES) {
      if (a === b) continue;
      const kind = classifyPhasePair(a, b);
      if (kind !== "sheng" && kind !== "ke") continue;
      candidates.push({ actor: a, patient: b, kind });
    }
  }
  if (candidates.length === 0) return null;

  // On the first inverse step, bias by the histogram so that the under-
  // represented phase becomes the most-imbalanced one.
  if (isFirst && biasedPhases.length > 0) {
    const target = biasedPhases[0];
    // Prefer a move whose inverse would push `target` away from 0.2.
    const preferred = candidates.filter((m) =>
      m.kind === "sheng"
        ? m.patient === target
        : (m.patient === target || m.actor === target)
    );
    if (preferred.length > 0) return randomChoice(preferred);
  }
  return randomChoice(candidates);
}

// ============================================================
// §8.2 Solvability check + §8.3 path counting
// ============================================================

function isStateSolvable(startingState, K, epsilon) {
  return countSolutionPaths(startingState, K, epsilon, true) > 0;
}

/**
 * Bounded DFS that counts distinct solution paths of length ≤ K within
 * tolerance ε. If `earlyExit` is true, returns 1 as soon as any solution
 * is found (used by §8.2).
 *
 * Path-counting rules (aligned with balance-mode.md §8.3):
 *   - Only Sheng + Ke moves are counted as canonical solution paths.
 *     Self and Insub moves are *available to the player* but they aren't
 *     considered part of the solution-path measure that defines difficulty.
 *   - No state revisits within the same trace (path-level visited set).
 *     Without this the count is effectively infinite for any K≥6.
 *   - We cap the total count at PATH_COUNT_CAP so generation stays under
 *     a one-second budget even on Gentle.
 */
const PATH_COUNT_CAP = 200;

function countSolutionPaths(startingState, K, epsilon, earlyExit = false) {
  let count = 0;
  const visited = new Set();
  visited.add(quantize(startingState));

  function dfs(state, depth) {
    if (isWin(state, epsilon)) {
      count += 1;
      return earlyExit || count >= PATH_COUNT_CAP;
    }
    if (depth >= K) return false;

    for (const a of PHASES) {
      for (const b of PHASES) {
        if (a === b) continue;
        const kind = classifyPhasePair(a, b);
        // Canonical solutions use Sheng/Ke only.
        if (kind !== "sheng" && kind !== "ke") continue;
        const next = applyPhaseMove(state, a, b);
        const key = quantize(next);
        if (visited.has(key)) continue;
        visited.add(key);
        const stop = dfs(next, depth + 1);
        visited.delete(key);
        if (stop) return true;
      }
    }
    return false;
  }

  dfs(startingState, 0);
  return count;
}

function quantize(state) {
  return PHASES.map((p) => Math.round(state[p] * 100)).join(",");
}

// ============================================================
// §8.4 Distribution control helpers
// ============================================================

function mostImbalancedPhase(state) {
  // Phase whose deviation from 0.2 is largest in absolute value.
  let worst = "wood";
  let worstDev = -Infinity;
  for (const p of PHASES) {
    const dev = Math.abs((state[p] || 0) - 0.2);
    if (dev > worstDev) {
      worst = p;
      worstDev = dev;
    }
  }
  return worst;
}

function bySessionHistogramBias(histogram) {
  // Return phases ordered ascending by count (under-represented first).
  return PHASES.slice().sort((a, b) => (histogram[a] || 0) - (histogram[b] || 0));
}

// ============================================================
// Helpers
// ============================================================

function inRange(value, [lo, hi]) {
  return value >= lo && value <= hi;
}

function midpoint([lo, hi]) {
  if (!isFinite(hi)) return lo;
  return (lo + hi) / 2;
}

function l1(a, b) {
  let s = 0;
  for (const p of PHASES) s += Math.abs((a[p] || 0) - (b[p] || 0));
  return s;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Fallback puzzle: a hand-built single-move imbalance for the requested
 * difficulty. Only used if the generator fails to produce a candidate in
 * MAX_GENERATIONS — which should be rare.
 */
function fallbackPuzzle(difficulty) {
  const tier = TIERS[difficulty];
  // Push wood up by Δ, fire down by Δ — one Wood→Fire Sheng inverse would
  // produce this; the forward solve is Wood→Fire (Sheng) which adds Δ to
  // Fire and renormalizes.
  const state = balancedState();
  state.wood += DELTAS.sheng;
  state.fire -= DELTAS.sheng;
  // Renormalize (sum still 1).
  return {
    startingState: state,
    solution: [{ actor: "wood", patient: "fire", kind: "sheng" }],
    K: tier.K,
    epsilon: tier.epsilon,
    difficulty,
    pathCount: -1,
  };
}
