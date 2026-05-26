/**
 * Recipe engine.
 *
 * Loads the entity catalog and recipe table from src/data/, exposes lookup
 * and self-stage-progression helpers, and tracks the discoveries ledger
 * in localStorage.
 */

const DATA_BASE = new URL("../data/", import.meta.url);

let entities = null;
let entitiesById = null;
let recipes = null;
let recipeIndex = null; // key = "actor|patient" -> recipe entry
let selfProgression = null;
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
  selfProgression = selfProg;
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
 * Return the list of recipes that produce a given entity. Used by the
 * inspect drawer to show "how it was made".
 *
 * For self-stage entities (Feeling/Surge/Storm) the recipes table only stores
 * the stage-1 (Feeling) result, so we also walk selfProgression to find any
 * stages that resolve to the requested id.
 */
export function getRecipesProducing(entityId) {
  if (!recipes) return [];
  const direct = recipes.filter((r) => r.result === entityId);
  if (direct.length > 0) return direct;

  // Look for a self-progression result that lands on this id.
  for (const [elemId, stages] of Object.entries(selfProgression)) {
    const idx = stages.indexOf(entityId);
    if (idx >= 0) {
      const selfRec = recipes.find(
        (r) => r.actor === elemId && r.patient === elemId && r.move_type === "self"
      );
      if (selfRec) {
        return [{ ...selfRec, result: entityId, _selfStage: idx }];
      }
    }
  }
  return [];
}

/**
 * Resolve an ordered-pair craft. Returns either:
 *   { ok: true,  result: <entity>, moveType: <string> }
 *   { ok: false, reason: "no-recipe" }
 *
 * Self-craft is special: the recipe table stores the stage-1 (Feeling) result,
 * but the engine walks Feeling -> Surge -> Storm based on a per-element
 * counter held by the caller. The counter is incremented externally.
 */
export function resolve(actorId, patientId, selfStageCounter) {
  const key = `${actorId}|${patientId}`;
  const rec = recipeIndex.get(key);
  if (!rec) return { ok: false, reason: "no-recipe" };

  let resultId = rec.result;

  // Self-stage progression
  if (rec.move_type === "self") {
    const stages = selfProgression[actorId];
    if (stages) {
      const stageIdx = Math.min(selfStageCounter, stages.length - 1);
      resultId = stages[stageIdx];
    }
  }

  return {
    ok: true,
    result: entitiesById.get(resultId),
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
