// Headless smoke test for the concentration-additive resolver.
// Runs the resolve() logic against the on-disk JSON without a browser.

import { readFileSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DATA = resolvePath(__dirname, "..", "app", "src", "data");

const entities = JSON.parse(readFileSync(`${DATA}/entities.json`, "utf8"));
const recipes  = JSON.parse(readFileSync(`${DATA}/recipes.json`, "utf8"));
const selfTab  = JSON.parse(readFileSync(`${DATA}/self_progression.json`, "utf8"));

const byId = new Map(entities.map(e => [e.id, e]));
const recipeIndex = new Map(recipes.map(r => [`${r.actor}|${r.patient}`, r]));

function purePhase(e) {
  let hit = null;
  for (const k of Object.keys(e.phase_weights)) {
    const w = e.phase_weights[k];
    if (w === 1.0) { if (hit) return null; hit = k; }
    else if (w !== 0.0) return null;
  }
  return hit;
}

function resolveCraft(actorId, patientId) {
  const a = byId.get(actorId), p = byId.get(patientId);
  if (!a || !p) return { ok: false, reason: "missing-entity" };
  const aPhase = purePhase(a), pPhase = purePhase(p);
  if (aPhase && aPhase === pPhase) {
    const sum = Math.min((a.concentration || 1) + (p.concentration || 1), 5);
    const row = selfTab[aPhase];
    if (row) {
      const rid = row[String(sum)] || row["5"];
      return { ok: true, result: byId.get(rid), moveType: "self" };
    }
  }
  const rec = recipeIndex.get(`${actorId}|${patientId}`);
  if (!rec) return { ok: false, reason: "no-recipe" };
  return { ok: true, result: byId.get(rec.result), moveType: rec.move_type };
}

const cases = [
  ["wood", "wood", "anger",      "self"],   // 1+1=2 Feeling
  ["anger", "anger", "wind",     "self"],   // 2+2=4 Storm (skips Overgrowth)
  ["wood", "anger", "overgrowth","self"],   // 1+2=3 Surge
  ["wood", "overgrowth", "wind", "self"],   // 1+3=4 Storm
  ["wood", "wind", "blight",     "self"],   // 1+4=5 Overflow
  ["wind", "wind", "blight",     "self"],   // 4+4=8 -> clamp 5 Overflow
  ["anger", "overgrowth", "blight","self"], // 2+3=5 Overflow
  ["fire", "fire", "joy",        "self"],
  ["heart", "heart", "heatwave", "self"],   // 4+4 -> Heatwave
  ["earth", "earth", "worry",    "self"],
  ["metal", "metal", "grief",    "self"],
  ["water", "water", "fear",     "self"],
  ["frost", "frost", "maelstrom","self"],
  // Cross-phase still hits the recipe table:
  ["wood", "fire", "kindling",   "sheng"],
];

let fail = 0;
for (const [actor, patient, want, wantMove] of cases) {
  const r = resolveCraft(actor, patient);
  const got = r.ok ? r.result.id : `(null:${r.reason})`;
  const move = r.ok ? r.moveType : "-";
  const ok = got === want && move === wantMove;
  console.log(`${ok ? "PASS" : "FAIL"}  ${actor} + ${patient} -> ${got} [${move}]  (want ${want} [${wantMove}])`);
  if (!ok) fail++;
}

console.log(`\nTotal: ${cases.length - fail}/${cases.length} passed`);
process.exit(fail === 0 ? 0 : 1);
