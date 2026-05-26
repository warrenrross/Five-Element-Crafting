# Game Interaction Grid

The playable surface of Five-Element-Crafting. Every drop of one element onto another resolves to exactly one cell here.

**This is the surface-language version.** It exists alongside [`interaction-grid.md`](./interaction-grid.md), which keeps the literal Wu Xing names (Liver Wind, Heart Heat, Dampness, Lung Dryness, Kidney Cold, etc.). This doc renames every result to something a player can read at a glance from an emoji-sized icon, with the original TCM reading preserved in the lore column for the eventual inspect panel.

## Naming rules

1. **One word where possible.** Player-readable at icon size.
2. **Every cell has a distinct name.** Each entity in the discoveries panel must be addressable on its own. This means the previous doc's collision of 10 insubordinate cells into 5 pathology names is undone — each insubordinate cell now has its own short name.
3. **No anatomical or clinical vocabulary as the surface label.** Liver, Lung, Kidney, Spleen, "pathology," "syndrome," "deficiency" all retreat into the lore string. The icon name shows up in the panel; the lore appears in inspect.
4. **Standard Unicode emoji only.** One per result. No flag sequences, no skin-tone modifiers, no PUA — those break across platforms.
5. **Substring rule preserved.** The result name never reuses the actor or patient name as a substring. Wood→Fire is not "Firewood."

## Cell-kind reminder

- **Sheng** — generating / nourishing (5 canonical edges).
- **Ke** — controlling / regulating (5 canonical edges).
- **Self** — actor and patient are the same element. Three-stage reveal: Feeling → Surge → Storm.
- **Insubordinate** — distinct elements, but the ordered pair is not on a Sheng or Ke edge. The actor is "acting out." Result is the actor's *misdirected* expression (a sibling to its Storm, but distinct).

Totals: **5 Sheng + 5 Ke + 5 Self (× 3 stages) + 10 Insubordinate = 25 cells, 30 distinct result names.**

## Matrix at a glance

|  | →Wood | →Fire | →Earth | →Metal | →Water |
|---|---|---|---|---|---|
| **Wood→** | self | **Sheng** | **Ke** | insub. | insub. |
| **Fire→** | insub. | self | **Sheng** | **Ke** | insub. |
| **Earth→** | insub. | insub. | self | **Sheng** | **Ke** |
| **Metal→** | **Ke** | insub. | insub. | self | **Sheng** |
| **Water→** | **Sheng** | **Ke** | insub. | insub. | self |

---

## 1. Sheng — 5 cells

Actor nourishes patient. Result is the small, concrete *thing produced* by that nourishment.

| # | Actor → Patient | Result | Emoji | Lore (for inspect panel) |
|---|---|---|---|---|
| 1 | **Wood → Fire** | **Kindling** | 🔥 | "Wood feeds Fire" — the canonical first step of the generating cycle ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Fire → Earth** | **Ash** | 🌋 | "Fire creates Earth" — combustion residue becomes soil ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 3 | **Earth → Metal** | **Ore** | ⛏️ | "Earth bears Metal" — metal is born from the ground ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 4 | **Metal → Water** | **Dew** | 💧 | "Metal enriches Water" — condensation on a cool blade ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 5 | **Water → Wood** | **Sapling** | 🌱 | "Water nourishes Wood" — water-fed growth ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |

---

## 2. Ke — 5 cells

Actor subdues patient. Result is the concrete *thing that does the subduing*.

| # | Actor → Patient | Result | Emoji | Lore (for inspect panel) |
|---|---|---|---|---|
| 6 | **Wood → Earth** | **Roots** | 🌿 | "Wood controls Earth" — roots bind and break soil ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 7 | **Earth → Water** | **Dam** | 🪨 | "Earth controls Water" — banks and dikes contain flow ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 8 | **Water → Fire** | **Rain** | 🌧️ | "Water controls Fire" — the most direct image in the controlling cycle ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). *Quench* in the literal grid; *Rain* reads better as a player-facing noun. |
| 9 | **Fire → Metal** | **Forge** | 🔨 | "Fire controls Metal" — heat shapes and softens metal ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 10 | **Metal → Wood** | **Axe** | 🪓 | "Metal controls Wood" — the blade is the canonical image ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |

---

## 3. Self — 5 elements × 3 stages

Same element on itself. Three-stage reveal per element, counter scoped to the current session:

- **Stage 1 — Feeling**: the calm emotional register of the phase.
- **Stage 2 — Surge**: the phase taking on too much of itself.
- **Stage 3 — Storm**: the phase manifesting at full intensity, named for its most recognizable natural form.

### 3.1 Wood → Wood

| Stage | Result | Emoji | Lore (for inspect panel) |
|---|---|---|---|
| 1 | **Anger** | 😠 | Wood's imbalanced emotion is irritability and anger; the linkage to the liver is named explicitly ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Overgrowth** | 🌳 | Wood's quality is growth and expansion ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess is uncontrolled spread. |
| 3 | **Wind** | 🌬️ | The classical "Liver Wind" pattern, surfaced under its natural-form name. Anchored in the liver–wood–anger linkage ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)) and the liver/gallbladder Yin–Yang pairing ([Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |

### 3.2 Fire → Fire

| Stage | Result | Emoji | Lore (for inspect panel) |
|---|---|---|---|
| 1 | **Joy** | 😄 | Balanced Fire brings joy and enthusiasm ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Restlessness** | ⚡ | Excess Fire produces restlessness and emotional instability ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 3 | **Heart** | ❤️ | The classical "Heart Heat" pattern, surfaced under its associated organ. Fire's Yin organ is the heart ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |

### 3.3 Earth → Earth

| Stage | Result | Emoji | Lore (for inspect panel) |
|---|---|---|---|
| 1 | **Worry** | 😟 | Earth's imbalanced emotion is worry / overthinking ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Stagnation** | 🟫 | Earth governs digestion and energy distribution ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess Earth means flow stops. |
| 3 | **Mud** | 🟤 | The classical "Dampness" pattern of the spleen, surfaced under its natural-form name. Spleen/stomach are Earth's Yin–Yang organ pair ([Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |

### 3.4 Metal → Metal

| Stage | Result | Emoji | Lore (for inspect panel) |
|---|---|---|---|
| 1 | **Grief** | 😢 | Grief is Metal's emotion; difficulty releasing emotions affects the lungs ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Rigidity** | 🗿 | Metal's quality is structure and clarity ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess is structure without flexibility. |
| 3 | **Drought** | 🏜️ | The classical "Lung Dryness" pattern, surfaced under its natural-form name. Metal governs respiration; lung/large-intestine are its Yin–Yang pair ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |

### 3.5 Water → Water

| Stage | Result | Emoji | Lore (for inspect panel) |
|---|---|---|---|
| 1 | **Fear** | 😨 | Fear / anxiety is Water's imbalanced emotion ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 2 | **Flooding** | 🌊 | Water governs fluid balance ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess is fluids out of balance. |
| 3 | **Frost** | ❄️ | The classical "Kidney Cold" pattern, surfaced under its natural-form name. Kidney/bladder are Water's Yin–Yang pair ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)). |

---

## 4. Insubordinate — 10 cells

Distinct elements, not on a Sheng or Ke edge. The actor is operating on a phase it has no canonical relationship with — sometimes pushing back against its own controller, sometimes reversing a Sheng arrow. The result is the actor's *misdirected* expression: a recognizable sibling of its Storm, but with its own distinct name and icon, so the discoveries panel resolves cleanly.

Two flavor strings are noted per cell:
- **Push-back**: the actor is resisting its own controller.
- **Reversal**: the actor is shoving energy back up the Sheng arrow it normally receives from.

### 4.1 Wood acting out

| # | Actor → Patient | Result | Emoji | Flavor | Lore (for inspect panel) |
|---|---|---|---|---|---|
| 11 | **Wood → Metal** | **Bramble** | 🌵 | Push-back | Wood resists the blade that normally cuts it. A thorny overgrowth — the same liver-Wind energy turned defensive ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 12 | **Wood → Water** | **Gale** | 💨 | Reversal | Wood pushes back up the Sheng arrow into its own source. Pent-up growth becomes a strong moving wind ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |

### 4.2 Fire acting out

| # | Actor → Patient | Result | Emoji | Flavor | Lore (for inspect panel) |
|---|---|---|---|---|---|
| 13 | **Fire → Wood** | **Wildfire** | 🔥 | Reversal | Fire turns on the source that feeds it. Energy meant to nourish is consumed instead ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Distinct from the **Kindling** result in §1 — both involve Wood and Fire, but here Fire is the actor and the arrow is reversed. |
| 14 | **Fire → Water** | **Steam** | ♨️ | Push-back | Fire pushes back against the only phase that controls it. Heat meets cold and rises as vapor ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |

### 4.3 Earth acting out

| # | Actor → Patient | Result | Emoji | Flavor | Lore (for inspect panel) |
|---|---|---|---|---|---|
| 15 | **Earth → Fire** | **Smoke** | 🌫️ | Reversal | Earth pushes back up its own Sheng arrow. The hearth chokes on its residue. Aligned with Earth's stagnation register ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 16 | **Earth → Wood** | **Quicksand** | 🟫 | Push-back | Earth resists the roots that normally bind it. The ground refuses to hold ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |

### 4.4 Metal acting out

| # | Actor → Patient | Result | Emoji | Flavor | Lore (for inspect panel) |
|---|---|---|---|---|---|
| 17 | **Metal → Earth** | **Rust** | 🟧 | Reversal | Metal pushes back up its Sheng arrow into its source. The structure degrades back toward the ground that bore it ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 18 | **Metal → Fire** | **Blade** | 🗡️ | Push-back | Metal resists the heat that normally shapes it. Hardened, sharpened, refusing the forge ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |

### 4.5 Water acting out

| # | Actor → Patient | Result | Emoji | Flavor | Lore (for inspect panel) |
|---|---|---|---|---|---|
| 19 | **Water → Earth** | **Erosion** | 🏞️ | Push-back | Water resists the dam that normally contains it. Steady pressure wears the bank away ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |
| 20 | **Water → Metal** | **Tide** | 🌊 | Reversal | Water pushes back up its Sheng arrow. Slow, unstoppable pressure against the metal that shed it ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). |

---

## 5. Distinct result names — summary

| Cell kind | Count | Result names |
|---|---|---|
| Sheng | 5 | Kindling, Ash, Ore, Dew, Sapling |
| Ke | 5 | Roots, Dam, Rain, Forge, Axe |
| Self stage 1 (Feeling) | 5 | Anger, Joy, Worry, Grief, Fear |
| Self stage 2 (Surge) | 5 | Overgrowth, Restlessness, Stagnation, Rigidity, Flooding |
| Self stage 3 (Storm) | 5 | Wind, Heart, Mud, Drought, Frost |
| Insubordinate | 10 | Bramble, Gale, Wildfire, Steam, Smoke, Quicksand, Rust, Blade, Erosion, Tide |
| **Total cells / distinct names** | **25 / 30** | |

Thirty distinct result names cover all 25 cells, with no name shared between cells. Compared to the literal grid, this version trades the "insubordinate collapses to pathology" collision (which saved authoring effort but was hard to read at icon size) for 5 extra named entities — Bramble, Gale, Wildfire, Quicksand, Rust — that each have their own readable image.

## 6. Relationship to the literal grid

Every renamed cell maps 1:1 back to a cell in [`interaction-grid.md`](./interaction-grid.md). The TCM-literal name lives in the lore string and will surface in the inspect panel as the "true reading." Examples:

- **Wind** in this doc = Liver Wind in the literal grid.
- **Heart** in this doc = Heart Heat in the literal grid.
- **Mud** in this doc = Dampness in the literal grid.
- **Drought** in this doc = Lung Dryness in the literal grid.
- **Frost** in this doc = Kidney Cold in the literal grid.

This separation means the player surface stays approachable while the underlying model stays defensible to anyone who knows Wu Xing — exactly the design constraint set in the brainstorm.

## 7. Open questions specific to this version

1. **Should Wind / Heart / Mud / Drought / Frost share an emoji with any Sheng/Ke result?** Currently no — every result has a unique emoji, but a few are close in shape (🌬️ for Wind vs. 💨 for Gale; 🌧️ for Rain vs. 🌊 for Tide). Worth a coherent pass once the discoveries panel is mocked up.
2. **Are Stage-1 Feelings panel-worthy on their own?** They might feel weightless next to Bramble, Erosion, Forge. One option: render them as small "mood" chips in the discoveries panel rather than full-size icons. Defer to UI layout doc.
3. **Insubordinate flavor in the lore string.** Each cell has Push-back vs. Reversal labeled. The inspect panel should read this aloud — e.g. "**Bramble** — Wood resists Metal's blade. *(Push-back: Wood pushing against its own controller.)*" Worth standardizing the sentence template before authoring inspect copy.
4. **Sheng/Ke results re-craftable?** Still open from the literal grid (its §6 question 1). Resolving this drives stage-2 design and is unchanged by the rename pass.

## 8. What this doc does not cover

- **Stage-2 crafting** (results combined with results). Future doc: `stage-2-crafts.md`.
- **Balance and Harmonize puzzle generation.** Future doc: `balance-mode.md`.
- **Inspect copy** (the long-form lore strings, including the "true Wu Xing reading" surfaced from this doc's lore columns). Future doc: `inspect-copy.md`.
- **UI layout** (right panel = blocks, left panel = discoveries, workspace center). Future doc: `ui-layout.md`.

See [`../../AGENT_NOTES.md`](../../AGENT_NOTES.md) for current open questions and the running "next session" list.
