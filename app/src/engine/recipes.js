/**
 * Recipe engine.
 *
 * Loads the entity catalog and recipe table from src/data/, exposes lookup
 * and self-craft resolution, and tracks the discoveries ledger in
 * localStorage.
 *
 * Self-craft uses a concentration-additive rule (no session counter):
 *   - Every entity carries a `concentration` value (1 phase, 2 feeling,
 *     3 surge, 4 storm, 5 overflow).
 *   - When two entities of the same pure phase are combined, the produced
 *     concentration is the sum (clamped at 5) and the named result is
 *     looked up by phase x concentration in self_progression.json.
 *   - All other crafts fall back to the recipes.json table.
 *
 * See docs/design/game-interaction-grid.md sec 3 for the design.
 */

const DATA_BASE = new URL("../data/", import.meta.url);

let entities = null;
let entitiesById = null;
let recipes = null;
let recipeIndex = null; // key = "actor|patient" -> recipe entry
let selfTable = null;   // phase -> { "2": id, "3": id, "4": id, "5": id }
let catastropheIds = null;

async function fetchJson(name) {
  const url = new URL(name, DATA_BASE);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${name}: ${res.status}`);
  }
  return res.json();
}

export async function loadData() {
  const [ents, recs, selfProg, cats] = await Promise.all([
    fetchJson("entities.json"),
    fetchJson("recipes.json"),
    fetchJson("self_progression.json"),
    fetchJson("catastrophes.json"),
  ]);

  entities = ents;
  entitiesById = new Map(entities.map((e) => [e.id, e]));
  recipes = recs;
  recipeIndex = new Map();
  for (const rec of recipes) {
    recipeIndex.set(`${rec.actor}|${rec.patient}`, rec);
  }
  selfTable = selfProg;
  catastropheIds = new Set(cats);

  return { entities, entitiesById, recipes };
}

export function getEntity(id) {
  return entitiesById.get(id) || null;
}

export function getAllEntities() {
  return entities;
}

export function isCatastrophe(id) {
  return catastropheIds.has(id);
}

/**
 * Return the pure phase id for an entity whose phase_weights are
 * concentrated on a single phase (weight 1.0). Returns null if the entity
 * is mixed or has no phase weight info.
 */
function purePhase(entity) {
  const w = entity && entity.phase_weights;
  if (!w) return null;
  let hit = null;
  for (const k of Object.keys(w)) {
    if (w[k] === 1.0) {
      if (hit) return null; // more than one full-weight phase = mixed
      hit = k;
    } else if (w[k] !== 0.0) {
      return null; // partial weights = mixed
    }
  }
  return hit;
}

/**
 * Return the list of recipes that produce a given entity. Used by the
 * inspect drawer to show "how it was made".
 *
 * For self-table entities, synthesize the recipe row from selfTable so the
 * UI can still show "Wood + Anger = Overgrowth" etc.
 */
export function getRecipesProducing(entityId) {
  if (!recipes) return [];
  const direct = recipes.filter((r) => r.result === entityId);
  if (direct.length > 0) return direct;

  // Walk selfTable: for each phase, find the concentration row that lands
  // on entityId and emit one synthetic recipe with the canonical actor and
  // patient (the entities whose concentrations sum to the row's
  // concentration). For C=2 (1+1), C=3 (1+2), C=4 (1+3 and 2+2), C=5 (1+4,
  // 2+3) we surface a single canonical pair per row.
  const out = [];
  for (const [phaseId, row] of Object.entries(selfTable)) {
    for (const [concStr, resId] of Object.entries(row)) {
      if (resId !== entityId) continue;
      const conc = Number(concStr);
      const pair = canonicalSelfPair(phaseId, conc);
      if (pair) {
        out.push({
          actor: pair.actor,
          patient: pair.patient,
          result: entityId,
          move_type: "self",
          _selfConcentration: conc,
        });
      }
    }
  }
  return out;
}

/**
 * Pick the canonical "how was it made" input pair for a phase + target
 * concentration. We prefer phase + (target-1)-concentration entity so the
 * answer reads as a single-step craft.
 */
function canonicalSelfPair(phaseId, targetConc) {
  if (targetConc < 2) return null;
  const row = selfTable[phaseId];
  if (!row) return null;
  // Lower-tier id is phase (conc 1) when target=2; selfTable[phaseId][target-1] otherwise.
  if (targetConc === 2) {
    return { actor: phaseId, patient: phaseId };
  }
  const prev = row[String(targetConc - 1)];
  if (prev) return { actor: phaseId, patient: prev };
  return null;
}

/**
 * Resolve an ordered-pair craft. Returns either:
 *   { ok: true,  result: <entity>, moveType: <string> }
 *   { ok: false, reason: "no-recipe" }
 *
 * Same-phase self-craft is computed from concentrations; everything else
 * is a table lookup.
 */
export function resolve(actorId, patientId) {
  const actor = entitiesById.get(actorId);
  const patient = entitiesById.get(patientId);
  if (!actor || !patient) return { ok: false, reason: "no-recipe" };

  const actorPhase = purePhase(actor);
  const patientPhase = purePhase(patient);

  // Same pure phase: concentration-additive resolution.
  if (actorPhase && actorPhase === patientPhase) {
    const sum = Math.min(
      (actor.concentration || 1) + (patient.concentration || 1),
      5
    );
    const row = selfTable[actorPhase];
    if (row) {
      const resultId = row[String(sum)] || row["5"];
      const result = entitiesById.get(resultId);
      if (result) {
        return { ok: true, result, moveType: "self" };
      }
    }
  }

  // Fallback: ordered-pair table.
  const rec = recipeIndex.get(`${actorId}|${patientId}`);
  if (!rec) return { ok: false, reason: "no-recipe" };
  return {
    ok: true,
    result: entitiesById.get(rec.result),
    moveType: rec.move_type,
  };
}

// ------------------------------------------------------------
// Discoveries ledger (localStorage)
// ------------------------------------------------------------

const LS_KEY = "fec.discoveries.v1";

function loadLedger() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { entries: {}, firstSeen: {} };
  } catch {
    return { entries: {}, firstSeen: {} };
  }
}

function saveLedger(ledger) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(ledger));
  } catch {
    /* localStorage may be disabled — fail soft */
  }
}

let ledger = null;

export function ensureLedger() {
  if (!ledger) ledger = loadLedger();
  return ledger;
}

export function recordDiscovery(entityId) {
  ensureLedger();
  const isNew = !ledger.entries[entityId];
  ledger.entries[entityId] = (ledger.entries[entityId] || 0) + 1;
  if (isNew) {
    ledger.firstSeen[entityId] = Date.now();
  }
  saveLedger(ledger);
  return isNew;
}

export function getDiscoveryCount(entityId) {
  ensureLedger();
  return ledger.entries[entityId] || 0;
}

export function getDiscoveredCount() {
  ensureLedger();
  return Object.keys(ledger.entries).length;
}

export function isDiscovered(entityId) {
  ensureLedger();
  return Boolean(ledger.entries[entityId]);
}

export function resetLedger() {
  ledger = { entries: {}, firstSeen: {} };
  saveLedger(ledger);
}
