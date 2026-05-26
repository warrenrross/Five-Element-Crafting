/**
 * Tracks the per-element self-craft counter for the three-stage reveal
 * (Feeling -> Surge -> Storm). Session-scoped: resets when the page loads.
 *
 * The counter advances on each successful self-craft. Stage 0 = Feeling,
 * Stage 1 = Surge, Stage 2 = Storm. After the Storm is produced, the counter
 * stays at 2 (Storms are terminal in v1 — further self-crafts of the same
 * element keep producing the Storm).
 */

const counters = {
  wood: 0,
  fire: 0,
  earth: 0,
  metal: 0,
  water: 0,
};

export function getSelfStage(elementId) {
  return counters[elementId] || 0;
}

export function advanceSelfStage(elementId) {
  if (counters[elementId] == null) return 0;
  counters[elementId] = Math.min(counters[elementId] + 1, 2);
  return counters[elementId];
}

export function resetSelfStages() {
  for (const k of Object.keys(counters)) counters[k] = 0;
}
