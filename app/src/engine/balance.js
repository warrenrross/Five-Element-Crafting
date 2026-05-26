/**
 * Balance and Harmonize mode engine.
 * Per docs/design/balance-mode.md.
 *
 * Tracks a session-level pentagram vector (sum of phase_weights across all
 * workspace entities, normalized to sum to 1), a move budget, and a list of
 * pathology tokens. Exposes classify-move and apply-move helpers so the
 * workspace can pre-check costs and the UI can render the readout.
 *
 * Conventions:
 *   PHASES is the locked order [wood, fire, earth, metal, water].
 *   state is a Map<phaseId, weight>; weights sum to 1 (modulo float drift).
 */

import { getEntity, isCatastrophe, resolve } from "./recipes.js";

export const PHASES = ["wood", "fire", "earth", "metal", "water"];

export const TIERS = {
  gentle: { K: 8, epsilon: 0.05, pathTarget: [15, Infinity], magnitude: 0.15 },
  steady: { K: 6, epsilon: 0.03, pathTarget: [5, 10],        magnitude: 0.25 },
  sharp:  { K: 5, epsilon: 0.02, pathTarget: [1, 3],         magnitude: 0.35 },
};

// Default phase-weight deltas per balance-mode.md §5.5.
export const DELTAS = {
  sheng: 0.05,      // Δ — patient phase gain on a Sheng move
  ke: 0.05,         // Δ — patient phase loss on a Ke move
  keActor: 0.02,    // δ — actor phase gain on a Ke move
  self: 0.08,       // Δ_self — legacy default (used when result concentration unknown)
  insub: 0.02,      // δ_insub — patient phase shift on an Insub move
  pathClear: 0.02,  // +δ to the controlling phase when a pathology is cleared
};

// Δ_self by produced concentration — see balance-mode.md §5.3.
//   2 = Feeling   → 0.05
//   3 = Surge     → 0.10
//   4 = Storm     → 0.15
//   5 = Overflow  → 0.20
export const SELF_DELTA_BY_CONCENTRATION = {
  2: 0.05,
  3: 0.10,
  4: 0.15,
  5: 0.20,
};

// Pathology cap per §7.
export const MAX_PATHOLOGY = 3;

/**
 * Sheng cycle: actor generates patient.
 *   wood→fire→earth→metal→water→wood
 */
const SHENG_NEXT = {
  wood: "fire",
  fire: "earth",
  earth: "metal",
  metal: "water",
  water: "wood",
};

/**
 * Ke cycle: actor controls patient.
 *   wood→earth, earth→water, water→fire, fire→metal, metal→wood
 */
const KE_NEXT = {
  wood: "earth",
  earth: "water",
  water: "fire",
  fire: "metal",
  metal: "wood",
};

/**
 * Inverse Ke: which phase controls this one? Used for clearing pathology
 * tokens per §7. The clearer of a Wood-pathology is Metal, etc.
 */
const KE_CONTROLLER = {
  wood: "metal",
  fire: "water",
  earth: "wood",
  metal: "fire",
  water: "earth",
};

/**
 * Classify an ordered (actor, patient) pair as one of:
 *   "sheng" | "ke" | "self" | "insub" | "null"
 * Driven purely off the recipe table — if the recipe engine has no entry,
 * we treat it as a null. Otherwise we read move_type from the recipe.
 */
export function classifyMove(actorEntity, patientEntity) {
  if (!actorEntity || !patientEntity) return "null";
  const outcome = resolve(actorEntity.id, patientEntity.id);
  if (!outcome.ok) return "null";
  return outcome.moveType; // sheng / ke / self / insub / stage2
}

/**
 * Pure helper: classify a Sheng/Ke/Self/Insub move between two phase ids,
 * ignoring stage-2 results. Used by the PCG inverse-move walker which only
 * operates over the five primary phases.
 */
export function classifyPhasePair(actorPhase, patientPhase) {
  if (actorPhase === patientPhase) return "self";
  if (SHENG_NEXT[actorPhase] === patientPhase) return "sheng";
  if (KE_NEXT[actorPhase] === patientPhase) return "ke";
  return "insub";
}

/**
 * Pure helper: apply a phase-pair move to a vector and return a new vector.
 * Used by the PCG and the live engine. Does NOT clamp; the caller decides.
 */
export function applyPhaseMove(vec, actorPhase, patientPhase) {
  const next = { ...vec };
  const kind = classifyPhasePair(actorPhase, patientPhase);
  if (kind === "sheng") {
    next[patientPhase] += DELTAS.sheng;
  } else if (kind === "ke") {
    next[patientPhase] -= DELTAS.ke;
    next[actorPhase]   += DELTAS.keActor;
  } else if (kind === "self") {
    next[actorPhase]   += DELTAS.self;
  } else {
    // insub — patient drifts toward zero by δ_insub
    next[patientPhase] -= DELTAS.insub;
    next[actorPhase]   += DELTAS.insub;
  }
  // Renormalize defensively.
  return renormalize(next);
}

/**
 * Inverse phase-pair move (used by the backward-chain generator).
 * If the forward move added Δ to X, the inverse subtracts Δ from X.
 */
export function applyInversePhaseMove(vec, actorPhase, patientPhase) {
  const next = { ...vec };
  const kind = classifyPhasePair(actorPhase, patientPhase);
  if (kind === "sheng") {
    next[patientPhase] -= DELTAS.sheng;
  } else if (kind === "ke") {
    next[patientPhase] += DELTAS.ke;
    next[actorPhase]   -= DELTAS.keActor;
  } else if (kind === "self") {
    next[actorPhase]   -= DELTAS.self;
  } else {
    next[patientPhase] += DELTAS.insub;
    next[actorPhase]   -= DELTAS.insub;
  }
  return renormalize(next);
}

export function balancedState() {
  const v = {};
  for (const p of PHASES) v[p] = 0.2;
  return v;
}

export function score(vec) {
  let m = Infinity;
  for (const p of PHASES) m = Math.min(m, vec[p]);
  return m;
}

export function isWin(vec, epsilon) {
  return score(vec) >= 0.2 - epsilon;
}

/**
 * Renormalize a phase vector to sum to 1, clamping negatives to 0.
 */
function renormalize(vec) {
  let sum = 0;
  const cleaned = {};
  for (const p of PHASES) {
    cleaned[p] = Math.max(0, vec[p]);
    sum += cleaned[p];
  }
  if (sum === 0) {
    return balancedState();
  }
  for (const p of PHASES) cleaned[p] = cleaned[p] / sum;
  return cleaned;
}

// ============================================================
// BalanceSession — the live, mutable session bound to a puzzle.
// ============================================================

export class BalanceSession {
  /**
   * @param {Object} puzzle - { startingState, K, epsilon, difficulty, solution }
   */
  constructor(puzzle) {
    this.startingState = puzzle.startingState;
    this.state = { ...puzzle.startingState };
    this.budget = puzzle.K;
    this.budgetMax = puzzle.K;
    this.epsilon = puzzle.epsilon;
    this.difficulty = puzzle.difficulty;
    this.solution = puzzle.solution || [];
    this.pathologyTokens = []; // list of phaseId strings
    this.playerPath = [];      // list of {actor, patient, kind} for the fail overlay
    this.outcome = null;       // "won" | "lost" | null
  }

  /**
   * Apply a (actor, patient) craft. Returns:
   *   { ok: true,  kind, result, deltaState, outcome }
   *   { ok: false, kind: "null", outcome }
   * Both paths consume a budget point (§11 — null still costs).
   * `result` is the same entity that the recipe engine would produce in
   * Explore mode.
   */
  applyMove(actorEntity, patientEntity) {
    if (this.outcome) return { ok: false, kind: "blocked", outcome: this.outcome };

    const beforeState = { ...this.state };
    const outcome = resolve(actorEntity.id, patientEntity.id);
    const isNull = !outcome.ok;
    const kind = isNull ? "null" : outcome.moveType;

    // Budget is consumed on null too.
    this.budget -= 1;
    this.playerPath.push({
      actor: actorEntity.id,
      patient: patientEntity.id,
      kind,
    });

    let result = null;
    let deltaState = null;

    if (!isNull) {
      // Phase-weight shift driven by the entities' actual phase_weights,
      // scaled to the spec deltas. This is the simplest reading of §5 that
      // remains consistent with stage-2 entities whose weights are not 100%
      // single-phase: we treat the produced entity's phase_weights as the
      // signed contribution to the pentagram, then renormalize.
      result = outcome.result;
      this.state = applyEntityWeights(this.state, kind, actorEntity, patientEntity, result);
      deltaState = subtractVectors(this.state, beforeState);

      // Pathology token on Insub.
      if (kind === "insub") {
        this.pathologyTokens.push(actorEntity.phase_weights
          ? dominantPhase(actorEntity)
          : "wood");
      }

      // Catastrophes (and self-overflows) drain the budget down to a
      // 1-move minimum (§10 and §5.3).
      if (isCatastrophe(result.id) || result.tier === "overflow") {
        this.budget = Math.min(this.budget, 1);
      }
    } else {
      // Null — entity snaps back; no state change beyond the budget hit.
    }

    // Evaluate end conditions.
    if (isWin(this.state, this.epsilon)) {
      this.outcome = "won";
    } else if (this.pathologyTokens.length > MAX_PATHOLOGY) {
      this.outcome = "lost";
    } else if (this.budget <= 0) {
      this.outcome = "lost";
    }

    return {
      ok: !isNull,
      kind,
      result,
      deltaState,
      outcome: this.outcome,
    };
  }

  /**
   * Attempt to clear a pathology token by dragging the *controlling* phase
   * entity onto it. Returns:
   *   { ok: true,  cleared: phaseId }
   *   { ok: false, reason }
   * Pathology clearing also consumes one budget point (§7) — it is a move.
   */
  clearPathology(actorEntity, pathologyIndex) {
    if (this.outcome) return { ok: false, reason: "blocked" };
    if (pathologyIndex < 0 || pathologyIndex >= this.pathologyTokens.length) {
      return { ok: false, reason: "no-token" };
    }
    const pathPhase = this.pathologyTokens[pathologyIndex];
    const required = KE_CONTROLLER[pathPhase];
    const actorPhase = dominantPhase(actorEntity);
    if (actorPhase !== required) {
      return { ok: false, reason: "wrong-controller", required };
    }

    this.budget -= 1;
    this.pathologyTokens.splice(pathologyIndex, 1);
    // Controlling phase ticks up by +δ (§7).
    this.state[required] = (this.state[required] || 0) + DELTAS.pathClear;
    this.state = renormalize(this.state);

    if (isWin(this.state, this.epsilon)) this.outcome = "won";
    else if (this.budget <= 0)           this.outcome = "lost";

    return { ok: true, cleared: pathPhase };
  }

  /**
   * Reset to the starting state of the same puzzle. Used by the "retry"
   * button in the fail overlay.
   */
  reset() {
    this.state = { ...this.startingState };
    this.budget = this.budgetMax;
    this.pathologyTokens = [];
    this.playerPath = [];
    this.outcome = null;
  }
}

// ============================================================
// Helpers
// ============================================================

/**
 * Update the phase vector using the produced entity's phase_weights as the
 * signed contribution. We use the spec deltas as the *magnitude* of the
 * adjustment and shape it by the entity weights so that stage-2 results
 * still feel mechanically distinct.
 */
function applyEntityWeights(vec, kind, actorEntity, patientEntity, resultEntity) {
  const next = { ...vec };
  if (kind === "sheng") {
    // Patient phase gain Δ.
    const pPhase = dominantPhase(patientEntity);
    next[pPhase] = (next[pPhase] || 0) + DELTAS.sheng;
  } else if (kind === "ke") {
    const pPhase = dominantPhase(patientEntity);
    const aPhase = dominantPhase(actorEntity);
    next[pPhase] = (next[pPhase] || 0) - DELTAS.ke;
    next[aPhase] = (next[aPhase] || 0) + DELTAS.keActor;
  } else if (kind === "self") {
    const aPhase = dominantPhase(actorEntity);
    const conc = (resultEntity && resultEntity.concentration) || 2;
    const delta = SELF_DELTA_BY_CONCENTRATION[conc] || DELTAS.self;
    next[aPhase] = (next[aPhase] || 0) + delta;
  } else if (kind === "insub") {
    const pPhase = dominantPhase(patientEntity);
    const aPhase = dominantPhase(actorEntity);
    next[pPhase] = (next[pPhase] || 0) - DELTAS.insub;
    next[aPhase] = (next[aPhase] || 0) + DELTAS.insub;
  } else if (kind === "stage2") {
    // Stage-2: redistribute toward the result's phase_weights with a small
    // magnitude. Treated as a Sheng-flavor combine for scoring purposes.
    if (resultEntity && resultEntity.phase_weights) {
      for (const p of PHASES) {
        const w = resultEntity.phase_weights[p] || 0;
        next[p] = (next[p] || 0) + (w - 0.2) * DELTAS.sheng;
      }
    }
  }
  return renormalize(next);
}

export function dominantPhase(entity) {
  if (!entity || !entity.phase_weights) return "wood";
  let best = "wood";
  let bestW = -Infinity;
  for (const p of PHASES) {
    const w = entity.phase_weights[p] || 0;
    if (w > bestW) {
      best = p;
      bestW = w;
    }
  }
  return best;
}

function subtractVectors(a, b) {
  const out = {};
  for (const p of PHASES) out[p] = (a[p] || 0) - (b[p] || 0);
  return out;
}

/**
 * Look up the entity for a phase id. Used by the workspace when seeding
 * a Balance puzzle from a starting state.
 */
export function phaseEntity(phaseId) {
  return getEntity(phaseId);
}
