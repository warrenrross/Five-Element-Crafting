# Interaction Grid

The full surface of `(actor, patient)` interactions in Five-Element-Crafting. Every drop of one element onto another resolves to exactly one cell in this grid.

## How to read this doc

- The element being **dragged** is the **actor**.
- The element it lands on is the **patient**.
- Order matters. `Wood → Fire` (Wood feeds Fire) is a different cell from `Fire → Wood` (Fire scorches Wood).
- Every cell is one of four kinds:
  - **Sheng** — generating / nourishing. One of the five canonical generating edges.
  - **Ke** — controlling / regulating. One of the five canonical controlling edges.
  - **Self** — actor and patient are the same element. Three-stage reveal: emotion → excess → pathology.
  - **Insubordinate** — an ordered pair that violates both the Sheng and Ke directions. Produces the actor's pathology because the actor is "acting out."

Totals: **5 Sheng + 5 Ke + 5 Self + 10 Insubordinate = 25 cells.**

## The matrix at a glance

|  | →Wood | →Fire | →Earth | →Metal | →Water |
|---|---|---|---|---|---|
| **Wood→** | self | **Sheng** | **Ke** | insub. | insub. |
| **Fire→** | insub. | self | **Sheng** | **Ke** | insub. |
| **Earth→** | insub. | insub. | self | **Sheng** | **Ke** |
| **Metal→** | **Ke** | insub. | insub. | self | **Sheng** |
| **Water→** | **Sheng** | **Ke** | insub. | insub. | self |

Generated using the canonical cycles in [Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/) and [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements). Self-cells run down the diagonal; Sheng forms one off-diagonal pentagon; Ke forms the other.

---

## 1. Sheng cycle — 5 cells

The generating cycle. Actor nourishes patient. Result is an entity that captures the *fruit of nourishment* — typically an organ relationship, a seasonal transition, or a body fluid handed from one phase to the next.

| # | Actor → Patient | Result | Emoji | Class | Authoring rationale |
|---|---|---|---|---|---|
| 1 | **Wood → Fire** | **Kindling** | 🔥 | Transition | "Wood feeds Fire" is the textbook image of Sheng; *Kindling* names the act of nourishment itself, not either input. Grounded in the Sheng list ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Fire → Earth** | **Ash** | 🌋 | Substance | "Fire creates Earth" — the residue of fire becomes soil ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Ash is the smallest noun phrase that captures it without reusing either input. |
| 3 | **Earth → Metal** | **Ore** | ⛏️ | Substance | "Earth bears Metal" — Metal is born from Earth ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Ore is unrefined Metal still inside Earth, capturing the moment of generation. |
| 4 | **Metal → Water** | **Dew** | 💧 | Substance | "Metal enriches Water" — classically rendered as condensation forming on cool metal ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 5 | **Water → Wood** | **Sapling** | 🌱 | Living form | "Water nourishes Wood" — water-fed growth ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Sapling captures young, water-driven Wood without using either input word. |

**Naming rule applied throughout this section:** the result name never reuses the actor or patient name as a substring. This is the same anti-laziness constraint Infinite Craft's prompt enforces server-side, applied here at authoring time.

---

## 2. Ke cycle — 5 cells

The controlling cycle. Actor subdues patient. Result captures the *regulating action* — typically a constraint, a containment, or a quenching.

| # | Actor → Patient | Result | Emoji | Class | Authoring rationale |
|---|---|---|---|---|---|
| 6 | **Wood → Earth** | **Roots** | 🌿 | Constraint | "Wood controls Earth" — roots break up and bind soil ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 7 | **Earth → Water** | **Dam** | 🪨 | Constraint | "Earth controls Water" — banks and dikes contain flow ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 8 | **Water → Fire** | **Quench** | 💨 | Action | "Water controls Fire" — the most direct image in the Ke list ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 9 | **Fire → Metal** | **Forge** | 🔨 | Action | "Fire controls Metal" — heat shapes and softens metal ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 10 | **Metal → Wood** | **Axe** | 🪓 | Tool | "Metal controls Wood" — the cutting blade is the canonical image ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |

---

## 3. Self cycle — 5 cells, three stages each

When the actor and patient are the same element, the result depends on how many times you've crafted that self-pair before in the current session. This is the primary discovery hook discussed in the design brainstorm.

Stage progression per element:

- **Stage 1 — Emotion**: the calm/balanced emotional register associated with the phase. Unlocks the emotion as a craftable entity in later versions.
- **Stage 2 — Excess**: the functional imbalance pattern. The phase has too much of itself.
- **Stage 3 — Pathology**: a classical TCM syndrome name. The named manifestation of the excess.

Counter resets at the start of each session (and on workspace clear in Explore mode).

### 3.1 Wood → Wood

| Stage | Result | Emoji | Class | Authoring rationale |
|---|---|---|---|---|
| 1 | **Anger** | 😠 | Emotion | Wood's emotion when out of balance is anger / irritability / frustration; the liver–anger linkage is named explicitly ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Overgrowth** | 🌳 | Excess | Wood's quality is growth and expansion ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess of that quality is uncontrolled spread. |
| 3 | **Liver Wind** | 🌬️ | Pathology | Classical Wood-excess syndrome. Anchored in the liver-Wood-anger linkage and the wood-anger correspondence ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)) and the liver/gallbladder Yin–Yang pairing for Wood ([Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |

### 3.2 Fire → Fire

| Stage | Result | Emoji | Class | Authoring rationale |
|---|---|---|---|---|
| 1 | **Joy** | 😄 | Emotion | Balanced Fire brings joy and enthusiasm ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Restlessness** | ⚡ | Excess | Excess Fire produces restlessness, anxiety, and emotional instability ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 3 | **Heart Heat** | ❤️‍🔥 | Pathology | Classical Fire-excess syndrome of the Heart, the Yin organ for Fire ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |

### 3.3 Earth → Earth

| Stage | Result | Emoji | Class | Authoring rationale |
|---|---|---|---|---|
| 1 | **Worry** | 😟 | Emotion | Earth's imbalanced emotion is worry / overthinking ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Stagnation** | 🟫 | Excess | Earth governs digestion and energy distribution ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess Earth means flow stops. |
| 3 | **Dampness** | 💧 | Pathology | Classical Earth/Spleen syndrome arising from impaired transformation; coheres with the spleen/stomach Yin–Yang pairing for Earth ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |

### 3.4 Metal → Metal

| Stage | Result | Emoji | Class | Authoring rationale |
|---|---|---|---|---|
| 1 | **Grief** | 😢 | Emotion | Grief is the Metal emotion; difficulty releasing emotions affects the lungs ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Rigidity** | 🗿 | Excess | Metal's quality is structure and clarity ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess is structure without flexibility. |
| 3 | **Lung Dryness** | 🍂 | Pathology | Classical Metal/Lung syndrome. Anchored in Metal governing respiration and the lung/large-intestine Yin–Yang pairing ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |

### 3.5 Water → Water

| Stage | Result | Emoji | Class | Authoring rationale |
|---|---|---|---|---|
| 1 | **Fear** | 😨 | Emotion | Fear / anxiety is Water's imbalanced emotion ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Flooding** | 🌊 | Excess | Water governs fluid balance ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess is fluids out of balance. |
| 3 | **Kidney Cold** | 🥶 | Pathology | Classical Water/Kidney syndrome. Anchored in Water governing essential energies and the kidney/bladder Yin–Yang pairing ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |

---

## 4. Insubordinate cycle — 10 cells

Any ordered pair of distinct elements that is **not** on a Sheng edge and **not** on a Ke edge. The actor is "acting out" — operating on a phase it has no canonical relationship with. The result is the **actor's pathology**, the same Stage-3 result the player would reach by repeated self-crafting.

This collapses each element's four insubordinate-outbound entries to a single memorable result per element. The patient flavors the lore copy (for the future inspect feature) but does not change the named result.

### 4.1 Wood acting out

| # | Actor → Patient | Result | Why this pairing is insubordinate |
|---|---|---|---|
| 11 | **Wood → Metal** | **Liver Wind** | Wood does not generate or control Metal; Metal controls Wood, so Wood "pushing back" on its own controller is pathological. |
| 12 | **Wood → Water** | **Liver Wind** | Wood does not generate or control Water; Water generates Wood, so the actor reversing the Sheng arrow is pathological. |

### 4.2 Fire acting out

| # | Actor → Patient | Result | Why this pairing is insubordinate |
|---|---|---|---|
| 13 | **Fire → Wood** | **Heart Heat** | Fire does not generate or control Wood; Wood generates Fire, so the actor reversing the Sheng arrow is pathological. |
| 14 | **Fire → Water** | **Heart Heat** | Fire does not generate or control Water; Water controls Fire, so the actor pushing back on its own controller is pathological. |

### 4.3 Earth acting out

| # | Actor → Patient | Result | Why this pairing is insubordinate |
|---|---|---|---|
| 15 | **Earth → Fire** | **Dampness** | Earth does not generate or control Fire; Fire generates Earth, so the actor reversing the Sheng arrow is pathological. |
| 16 | **Earth → Wood** | **Dampness** | Earth does not generate or control Wood; Wood controls Earth, so the actor pushing back on its own controller is pathological. |

### 4.4 Metal acting out

| # | Actor → Patient | Result | Why this pairing is insubordinate |
|---|---|---|---|
| 17 | **Metal → Earth** | **Lung Dryness** | Metal does not generate or control Earth; Earth generates Metal, so the actor reversing the Sheng arrow is pathological. |
| 18 | **Metal → Fire** | **Lung Dryness** | Metal does not generate or control Fire; Fire controls Metal, so the actor pushing back on its own controller is pathological. |

### 4.5 Water acting out

| # | Actor → Patient | Result | Why this pairing is insubordinate |
|---|---|---|---|
| 19 | **Water → Earth** | **Kidney Cold** | Water does not generate or control Earth; Earth controls Water, so the actor pushing back on its own controller is pathological. |
| 20 | **Water → Metal** | **Kidney Cold** | Water does not generate or control Metal; Metal generates Water, so the actor reversing the Sheng arrow is pathological. |

---

## 5. Summary count

| Cell kind | Count | Distinct result names |
|---|---|---|
| Sheng | 5 | Kindling, Ash, Ore, Dew, Sapling |
| Ke | 5 | Roots, Dam, Quench, Forge, Axe |
| Self stage 1 (Emotion) | 5 | Anger, Joy, Worry, Grief, Fear |
| Self stage 2 (Excess) | 5 | Overgrowth, Restlessness, Stagnation, Rigidity, Flooding |
| Self stage 3 (Pathology) | 5 | Liver Wind, Heart Heat, Dampness, Lung Dryness, Kidney Cold |
| Insubordinate | 10 | (collapses to the 5 Stage-3 pathologies) |
| **Total cells / distinct names** | **25 / 25** | |

Twenty distinct result names cover the 25 base cells, because the 10 insubordinate cells share names with the 5 Stage-3 self-craft pathologies. That deliberate collision is the mechanism described in the brainstorm: a player can reach a given pathology either through repeated self-craft *or* through a misdirected ordered pair, and the resulting entity is the same thing.

---

## 6. Open authoring questions

To resolve before stage-2 crafting (combining results with results) is designed:

1. **Should Sheng/Ke results be re-craftable?** E.g. can `Ash → Ore` (Earth-class result acting on Earth-class result) do something? Leaning yes, and that's where stage-2 lives.
2. **Should self-craft stage results persist into the discoveries panel even on workspace clear?** The session-resets-counter rule means a returning player might lose the Stage-3 unlock on refresh. Leaning: discoveries panel persists; counter does not.
3. **Insubordinate flavor copy.** Each insubordinate cell shares a result with a Stage-3 self-craft, but the *lore* shown in a future inspect panel should differ — e.g. `Wood → Metal` reads as "the liver pushes against its constraint," whereas `Wood → Wood ×3` reads as "the liver overgrows on its own." Worth authoring two flavor strings per pathology when the inspect copy doc is built.
4. **Emoji audit.** A few choices duplicate across the grid (💧 for both Dew and Dampness; 💨 for Quench). Acceptable for a v1 since they live in different classes, but worth a pass once we have the discoveries panel design in hand.

## 7. What this doc does not cover

- **Stage-2 crafting** (results combined with results). Future doc: `stage-2-crafts.md`.
- **Balance and Harmonize puzzle generation.** Future doc: `balance-mode.md`.
- **Inspect copy** (the lore strings that explain each icon). Future doc: `inspect-copy.md`.
- **UI layout** (right panel = blocks, left panel = discoveries, workspace center). Future doc: `ui-layout.md`.

See [`../../AGENT_NOTES.md`](../../AGENT_NOTES.md) for current open questions and the running "next session" list.
