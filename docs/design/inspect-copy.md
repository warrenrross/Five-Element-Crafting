# Inspect Copy

The long-form lore strings that surface in the inspect panel for every entity in v1. One block per entity, structured into three fields:

- **Surface** — what the player sees when they hover (1 sentence, plain language, no clinical vocabulary).
- **Reading** — the deeper TCM / natural-world explanation that appears when the player opens inspect (2–3 sentences).
- **True name** — the literal Wu Xing reading (clinical / pattern vocabulary), shown as small italic-disabled text under the icon name. For entities with no TCM-literal name, this field reads `—`.

Every entity in v1's 85-entity set has a block here. Stage-1 entities draw their copy from [`game-interaction-grid.md`](./game-interaction-grid.md) and [`interaction-grid.md`](./interaction-grid.md), with the surface/reading split spelled out. Stage-2 entities draw their copy from [`stage-2-crafts.md`](./stage-2-crafts.md) with the same split. Catastrophes draw from §5 of that doc. Eight names are the ratified ones from [`naming-ratification.md`](./naming-ratification.md).

## Voice rules

1. **Surface** stays under 100 characters where possible. It is the line that has to make the player nod and say "yes, that's what this is."
2. **Reading** expands the surface line into the Wu Xing context: which arrow, which cycle, what the entity *means* in the system. 2–3 sentences. Cited sources allowed where they ground a specific TCM claim.
3. **True name** is the clinical / pattern phrase from the literal Wu Xing grid. Examples: "Liver Wind," "Heart Heat," "Spleen Dampness," "Lung Dryness," "Kidney Cold." Entities outside the self-storm column get `—`.
4. **No anatomical vocabulary in Surface.** Liver, lung, kidney, spleen, "pathology," "syndrome," "deficiency" — all stay in Reading or True name.
5. **No emoji in copy.** The emoji lives next to the icon name in the UI; the copy itself stays plain text.
6. **No second-person.** The copy describes the entity, not the player. "Wood feeds Fire," not "You've just made the canonical first step."

## Entity index

Numbers match the canonical IDs used in [`stage-2-crafts.md`](./stage-2-crafts.md) and the recipe table.

- **Phases (5)** — entries P1–P5
- **Sheng results (5)** — entries 1–5
- **Ke results (5)** — entries 6–10
- **Insubordinate (10)** — entries 11–20
- **Self stage 1: Feelings (5)** — entries F1–F5
- **Self stage 2: Surges (5)** — entries S1–S5
- **Self stage 3: Storms (5)** — entries T1–T5
- **Sheng × Sheng (10)** — entries 26–35
- **Ke × Ke (10)** — entries 36–45
- **Sheng × Ke (15)** — entries 46–60
- **Refined variants (10)** — entries 61–70
- **Catastrophes (10)** — entries 71–80

Total: 85.

---

## Phases (5)

### P1. Wood 🌳
- **Surface:** The growing principle — sap rising, roots spreading, branches reaching.
- **Reading:** Wood is the start of the Sheng cycle. It feeds Fire and controls Earth. In the system its season is spring, its direction is east, its quality is upward expansion ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)).
- **True name:** Wood (木).

### P2. Fire 🔥
- **Surface:** The transforming principle — light, heat, the act of becoming-something-else.
- **Reading:** Fire is the apex of the Sheng cycle's first half. It is fed by Wood and produces Earth as residue; it is controlled by Water. Its season is summer, its direction is south, its quality is radiance ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)).
- **True name:** Fire (火).

### P3. Earth 🟫
- **Surface:** The supporting principle — ground, foundation, the place everything rests on.
- **Reading:** Earth sits at the Sheng cycle's center in some traditions, at the third position in others. It is fed by Fire (as ash) and produces Metal; it is controlled by Wood (as roots). Its season is late summer, its direction is center, its quality is groundedness ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)).
- **True name:** Earth (土).

### P4. Metal ⚙️
- **Surface:** The structuring principle — edge, clarity, the line that separates one thing from another.
- **Reading:** Metal is the contraction phase of the Sheng cycle. It is fed by Earth (as ore) and produces Water (as condensate); it is controlled by Fire (as forge-heat). Its season is autumn, its direction is west, its quality is refinement ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)).
- **True name:** Metal (金).

### P5. Water 💧
- **Surface:** The yielding principle — flow, depth, the thing that finds its level.
- **Reading:** Water closes the Sheng cycle and returns it to Wood. It is fed by Metal and produces Wood; it is controlled by Earth (as dam). Its season is winter, its direction is north, its quality is stillness in motion ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)).
- **True name:** Water (水).

---

## Sheng — generating cycle (5)

### 1. Kindling 🔥
- **Surface:** Dry wood ready to catch fire.
- **Reading:** Wood feeds Fire — the canonical first step of the Sheng cycle. Kindling is the small, concrete thing that act produces: not the tree, not the flame, but the fuel poised between them.
- **True name:** —.

### 2. Ash 🌋
- **Surface:** What remains after the fire burns down.
- **Reading:** Fire creates Earth — combustion residue becomes soil ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Ash is the gift Fire leaves behind for what comes next in the cycle.
- **True name:** —.

### 3. Ore ⛏️
- **Surface:** Raw, unworked metal still half in the ground.
- **Reading:** Earth bears Metal — metal is born from the ground ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Ore is the moment of emergence: visible enough to recognize, raw enough to still need working.
- **True name:** —.

### 4. Dew 💧
- **Surface:** Cool condensate gathered on a cold surface.
- **Reading:** Metal enriches Water — condensation on a cool blade ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The cleanest version of how metal can produce water without intent.
- **True name:** —.

### 5. Sapling 🌱
- **Surface:** A young tree breaking ground.
- **Reading:** Water nourishes Wood — water-fed growth ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The cycle closes: Water becomes Wood again, and a new turn begins.
- **True name:** —.

---

## Ke — controlling cycle (5)

### 6. Roots 🌿
- **Surface:** Tendrils binding and breaking through soil.
- **Reading:** Wood controls Earth — roots bind and crack the ground they grow in ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The most visible image of one element regulating another.
- **True name:** —.

### 7. Dam 🪨
- **Surface:** An earthen wall holding back the flow.
- **Reading:** Earth controls Water — banks and dikes contain flow ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The structural image of one element setting the terms for another.
- **True name:** —.

### 8. Rain 🌧️
- **Surface:** Falling water that puts out the fire.
- **Reading:** Water controls Fire — the most direct image in the controlling cycle ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The literal grid names this *Quench*; Rain reads better at icon size and carries the same meaning.
- **True name:** —.

### 9. Forge 🔨
- **Surface:** Heat softening metal until it can be shaped.
- **Reading:** Fire controls Metal — heat shapes and softens metal ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The single most human-scale image in the Ke cycle: it is what a smith does.
- **True name:** —.

### 10. Axe 🪓
- **Surface:** A blade that cuts the tree down.
- **Reading:** Metal controls Wood — the blade is the canonical image ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The cycle closes back to Wood with the most decisive image in the set.
- **True name:** —.

---

## Insubordinate (10)

### 11. Bramble 🌵
- **Surface:** Thorny overgrowth pushing back against the blade.
- **Reading:** Wood acting on Metal — push-back. Wood resists the controller that normally cuts it; the result is defensive overgrowth ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The same liver-Wind energy turned outward as armor.
- **True name:** Wood insulting Metal (木侮金).

### 12. Gale 💨
- **Surface:** A strong wind from a tree that was supposed to be still.
- **Reading:** Wood acting on Water — reversal. Wood pushes back up the Sheng arrow into the source that normally feeds it; pent-up growth becomes a moving wind ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The same liver-Wind register, surfaced as weather.
- **True name:** Wood counter-acting Water (木侮水).

### 13. Wildfire 🔥
- **Surface:** Fire turning on the wood that fed it.
- **Reading:** Fire acting on Wood — reversal. Energy meant to nourish is consumed instead ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Distinct from cell #1 Kindling: there Wood feeds Fire; here Fire turns on Wood.
- **True name:** Fire counter-acting Wood (火侮木).

### 14. Steam ♨️
- **Surface:** Heat rising as vapor where it meets cold.
- **Reading:** Fire acting on Water — push-back. Fire pushes back against the only phase that controls it; heat meets cold and rises ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Distinct from the §5 catastrophe Geyser: this is one element acting out, not two Storms colliding.
- **True name:** Fire insulting Water (火侮水).

### 15. Smoke 🌫️
- **Surface:** A choking cloud from a hearth that won't draw.
- **Reading:** Earth acting on Fire — reversal. Earth pushes back up its own Sheng arrow into the source ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Aligned with Earth's stagnation register: the cycle gums up.
- **True name:** Earth counter-acting Fire (土侮火).

### 16. Quicksand 🟫
- **Surface:** Ground that refuses to hold what stands on it.
- **Reading:** Earth acting on Wood — push-back. Earth resists the roots that normally bind it; the ground refuses to hold ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The most unstable single image in the insubordinate set.
- **True name:** Earth insulting Wood (土侮木).

### 17. Rust 🟧
- **Surface:** Metal degrading back toward the ground that bore it.
- **Reading:** Metal acting on Earth — reversal. Metal pushes back up its Sheng arrow into the source ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Distinct from §3.3 Patina, which is the natural pre-rust state of unworked ore.
- **True name:** Metal counter-acting Earth (金侮土).

### 18. Blade 🗡️
- **Surface:** Hardened, sharpened, refusing the heat.
- **Reading:** Metal acting on Fire — push-back. Metal resists the heat that normally shapes it ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). The image of finished, set, unalterable metal.
- **True name:** Metal insulting Fire (金侮火).

### 19. Erosion 🏞️
- **Surface:** Steady pressure wearing the bank away.
- **Reading:** Water acting on Earth — push-back. Water resists the dam that normally contains it; over time the bank yields ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Slow, unstoppable.
- **True name:** Water insulting Earth (水侮土).

### 20. Tide 🌊
- **Surface:** Unstoppable pressure rising against the metal that shed it.
- **Reading:** Water acting on Metal — reversal. Water pushes back up its Sheng arrow ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Slow, periodic, larger than any single dam.
- **True name:** Water counter-acting Metal (水侮金).

---

## Self stage 1: Feelings (5)

Feelings are operator tokens, not panel values — they attach to the next entity the player charges. See [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q4 for the modifier mechanic.

### F1. Anger 😠
- **Surface:** A flash of irritation.
- **Reading:** Wood on itself — calm register. Wood's imbalanced emotion is irritability and anger; the linkage to the liver is explicit in the classical correspondences ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). As a modifier: forceful bias on the next craft.
- **True name:** Wood emotion (怒).

### F2. Joy 😄
- **Surface:** A spark of warmth and enthusiasm.
- **Reading:** Fire on itself — calm register. Balanced Fire brings joy and enthusiasm ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). As a modifier: generative bias on the next craft.
- **True name:** Fire emotion (喜).

### F3. Worry 😟
- **Surface:** A quiet hum of overthinking.
- **Reading:** Earth on itself — calm register. Earth's imbalanced emotion is worry and rumination ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). As a modifier: stalling bias on the next craft.
- **True name:** Earth emotion (思).

### F4. Grief 😢
- **Surface:** A held breath that wants to release.
- **Reading:** Metal on itself — calm register. Grief is Metal's emotion; difficulty releasing it affects the lungs in the classical correspondences ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). As a modifier: releasing bias on the next craft.
- **True name:** Metal emotion (悲).

### F5. Fear 😨
- **Surface:** A cold tightening at the base.
- **Reading:** Water on itself — calm register. Fear and anxiety are Water's imbalanced emotion ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). As a modifier: inverting bias on the next craft (actor and patient swap).
- **True name:** Water emotion (恐).

---

## Self stage 2: Surges (5)

Surges are the phase taking on too much of itself — the warning state before a Storm. Terminal in v1: produced by self-craft, not combined further.

### S1. Overgrowth 🌳
- **Surface:** Wood expanding past the space it has.
- **Reading:** Wood's quality is growth and expansion ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); the second stage of self-craft is that quality run past its sustainable limit. The pause before the Storm.
- **True name:** Wood excess (木盛).

### S2. Restlessness ⚡
- **Surface:** Energy that can't sit still.
- **Reading:** Excess Fire produces restlessness and emotional instability ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)). Fire compounded but not yet broken into Storm.
- **True name:** Fire excess (火盛).

### S3. Stagnation 🟫
- **Surface:** Ground that's stopped passing things through.
- **Reading:** Earth governs digestion and energy distribution in the classical correspondences ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess Earth means flow stops. The image: a settling that has gone too far.
- **True name:** Earth excess (土盛).

### S4. Rigidity 🗿
- **Surface:** Structure that won't yield to anything.
- **Reading:** Metal's quality is structure and clarity ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess is structure without flexibility. Strong, brittle, dangerous to itself.
- **True name:** Metal excess (金盛).

### S5. Flooding 🌊
- **Surface:** Water that has lost its boundaries.
- **Reading:** Water governs fluid balance ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)); excess is fluids out of every banks. The pause before the Storm-form Frost.
- **True name:** Water excess (水盛).

---

## Self stage 3: Storms (5)

Storms are the phase at full intensity, named for the most recognizable natural form. Terminal in v1; in Maximal scope they will craft further.

### T1. Wind 🌬️
- **Surface:** The phase as moving air — the wind that moves everything else.
- **Reading:** The classical "Liver Wind" pattern surfaced under its natural-form name. Anchored in the liver–Wood–anger linkage ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/)) and the liver/gallbladder Yin–Yang pairing ([Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)).
- **True name:** Liver Wind (肝風).

### T2. Heart ❤️
- **Surface:** The phase as steady center — the rhythm that keeps everything else moving.
- **Reading:** The classical "Heart Heat" pattern surfaced under its associated organ. Fire's Yin organ is the heart ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)).
- **True name:** Heart Heat (心熱).

### T3. Mud 🟤
- **Surface:** The phase as saturated ground — heavy, holding, slow.
- **Reading:** The classical "Spleen Dampness" pattern surfaced under its natural-form name. Spleen and stomach are Earth's Yin–Yang organ pair ([Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)).
- **True name:** Spleen Dampness (脾濕).

### T4. Drought 🏜️
- **Surface:** The phase as parched country — clarity past the point of dryness.
- **Reading:** The classical "Lung Dryness" pattern surfaced under its natural-form name. Metal governs respiration; lung and large-intestine are its Yin–Yang pair ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)).
- **True name:** Lung Dryness (肺燥).

### T5. Frost ❄️
- **Surface:** The phase as winter at its hardest — water stopped where it stood.
- **Reading:** The classical "Kidney Cold" pattern surfaced under its natural-form name. Kidney and bladder are Water's Yin–Yang pair ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)).
- **True name:** Kidney Cold (腎寒).

---

## Sheng × Sheng (10)

The 10 unordered pairs of Sheng results — additive, organic, generative.

### 26. Hearth 🪵
- **Surface:** Contained, productive fire indoors.
- **Reading:** Kindling + Ash — Fire's fuel and Fire's residue, reunited under one roof. The hearth is the human image of Fire put to use.
- **True name:** —.

### 27. Charcoal ⬛
- **Surface:** Wood burned slow under earth.
- **Reading:** Kindling + Ore — the substances at opposite poles of the Sheng cycle's first half. The slow-burn product that bridges them.
- **True name:** —.

### 28. Sap 🍯
- **Surface:** A sticky, life-carrying substance.
- **Reading:** Kindling + Dew — Wood's fuel meets Metal's condensate. The tree's own circulation — Wood and Water moving inside it.
- **True name:** —.

### 29. Grove 🌲
- **Surface:** A young stand of trees fed by what makes fire possible.
- **Reading:** Kindling + Sapling — Sheng energy doubled within one phase. The grove is Wood compounded.
- **True name:** —.

### 30. Slag 🪨
- **Surface:** Smelting residue.
- **Reading:** Ash + Ore — Fire's child meets Earth's child; the unwanted byproduct is the truth of metallurgy.
- **True name:** —.

### 31. Lye 🧴
- **Surface:** The oldest cleansing agent.
- **Reading:** Ash + Dew — wood-ash steeped in water. A substance born of generation, used for purification.
- **True name:** —.

### 32. Loam 🟫
- **Surface:** Burned ground rich enough to grow on.
- **Reading:** Ash + Sapling — Fire's gift to Earth, made fertile by Water's gift to Wood. The fullest organic soil.
- **True name:** —.

### 33. Vein 💠
- **Surface:** A seam of unmined metal threaded with groundwater.
- **Reading:** Ore + Dew — Earth's product and Metal's product, still in the ground. The image of metallurgy not yet started.
- **True name:** —.

### 34. Root-Ore 🌱
- **Surface:** A sapling's roots cracking raw ore.
- **Reading:** Ore + Sapling — the interface between Wood seeking nourishment and Metal still in its raw form. Two parts of the cycle meeting in dirt.
- **True name:** —.

### 35. Bud 🌿
- **Surface:** Morning dew on new growth.
- **Reading:** Dew + Sapling — both products meet at the boundary where Water becomes Wood. The Sheng loop closing on itself in miniature.
- **True name:** —.

---

## Ke × Ke (10)

The 10 unordered pairs of Ke results — regulating, structural, human-made.

### 36. Levee 🚧
- **Surface:** Roots binding an earthen dam.
- **Reading:** Roots + Dam — two Ke constraints stacked: Wood holds Earth holds Water. The compounded image of containment.
- **True name:** —.

### 37. Marsh 🪻
- **Surface:** Where roots tangle in rain-soaked ground.
- **Reading:** Roots + Rain — the Ke-on-Earth and Ke-on-Fire products meeting in waterlogged land.
- **True name:** —.

### 38. Charwood 🪵
- **Surface:** Wood gripped by the forge.
- **Reading:** Roots + Forge — the smith's working stock. Bound, controlled, ready to be acted on.
- **True name:** —.

### 39. Stump 🪵
- **Surface:** What an axe leaves of a tree's roots.
- **Reading:** Roots + Axe — the Ke pair where Metal subdues Wood, with Wood's own grip on the ground still visible. The unfinished aftermath.
- **True name:** —.

### 40. Reservoir 🌊
- **Surface:** Rain caught and held.
- **Reading:** Dam + Rain — the two Ke products that both involve Water meet to *contain* water. The classical image of human water management.
- **True name:** —.

### 41. Furnace 🏭
- **Surface:** A contained, fueled heat.
- **Reading:** Dam + Forge — the earthen vessel and the working heat. The first thing in the stage-2 set humans built deliberately rather than found.
- **True name:** —.

### 42. Wedge 🪓
- **Surface:** A splitting tool.
- **Reading:** Dam + Axe — the bank and the blade, miniaturized to a single working edge.
- **True name:** —.

### 43. Quench-Bath 💧
- **Surface:** The water bath used to harden hot metal.
- **Reading:** Rain + Forge — Water's Ke act meets Fire's Ke act in the smith's tempering step. The defining moment in steel-making.
- **True name:** —.

### 44. Whetstone 🪨
- **Surface:** The stone that sharpens a blade.
- **Reading:** Rain + Axe — Water and a blade together produce the sharpening stone. Both Ke products that act *against* things, here serving to maintain a tool.
- **True name:** —.

### 45. Anvil ⚒️
- **Surface:** The smith's working anchor.
- **Reading:** Forge + Axe — two Metal-heavy Ke products compounded into the heaviest tool in the game.
- **True name:** —.

---

## Sheng × Ke main diagonals (10)

### 46. Bellows 🔥
- **Surface:** Fuel feeding the working fire.
- **Reading:** Kindling → Forge — Kindling is the food of Forge; Bellows is the act of feeding it. The Ke purpose dominates because the actor is feeding into it.
- **True name:** —.

### 47. Mortar 🧱
- **Surface:** Lime ash bound into an earthen wall.
- **Reading:** Ash → Dam — Fire's product reinforces Earth's regulating act. The first binder in the catalog of building materials.
- **True name:** —.

### 48. Hilt 🔱
- **Surface:** Raw metal finished into the axe's grip.
- **Reading:** Ore → Axe — Ore feeding the tool it will eventually become. The acting party is becoming part of the patient.
- **True name:** —.

### 49. Spring 💧
- **Surface:** A water source feeding the binding roots.
- **Reading:** Dew → Roots — the cleanest "Sheng feeds Ke" image in the cycle: condensate finds the root-system that needs it. Distinct from #59 Wellspring, where the roots are seeking the source.
- **True name:** —.

### 50. Canopy 🌳
- **Surface:** Young growth catching the falling water.
- **Reading:** Sapling → Rain — Sheng product meets Ke product in the literal interception of weather. The forest taking the rain before the ground does.
- **True name:** —.

### 51. Tinder 🔥
- **Surface:** Dry root-fibers as fire-starter.
- **Reading:** Roots → Kindling — Roots act on Kindling to make it ready to burn. Ke acting on Sheng to *accelerate* Sheng.
- **True name:** —.

### 52. Brick 🧱
- **Surface:** Fired earth shaped for stacking.
- **Reading:** Dam → Ash — earthen wall acting on ashen residue produces fired brick. The Ke product dominates because it is doing the acting.
- **True name:** —.

### 53. Bloom 🌸
- **Surface:** A young tree flowering after rain.
- **Reading:** Rain → Sapling — Ke acting on Sheng to accelerate Sheng. The rarest and richest combination in the cycle: regulating *causing* generation rather than blocking it.
- **True name:** —.

### 54. Ingot 🟨
- **Surface:** Smelted, refined metal.
- **Reading:** Forge → Ore — the single act that makes metallurgy possible. Fire shapes Ore into a workable form.
- **True name:** —.

### 55. Plank 🪵
- **Surface:** Worked wood, ready to build with.
- **Reading:** Axe → Sapling — the Axe acts on the Sapling to produce lumber. The canonical "Metal controls Wood" outcome turned productive.
- **True name:** —.

---

## Sheng × Ke mixed bridges (5)

The five renamed bridges from [`naming-ratification.md`](./naming-ratification.md). These are the discovery delights — combinations the player would not predict but feel *right* on reveal.

### 56. Brand 🪵
- **Surface:** Hot metal pressed into wood as a mark.
- **Reading:** Forge → Sapling — the act of branding. The mark of ownership, the signature burned in. Three-phase blend: Fire and Metal pressing into Wood.
- **True name:** —.

### 57. Patina 🟧
- **Surface:** The natural oxidation layer on unworked ore exposed to weather.
- **Reading:** Rain → Ore — rain meeting raw metal in the ground. Distinct from cell #17 Rust: Rust is the destructive decay of *finished* metal; Patina is the natural pre-rust state of *unworked* ore. Same chemistry, different register.
- **True name:** —.

### 58. Pyre 🔥
- **Surface:** A contained fire built with fuel and walls.
- **Reading:** Dam → Kindling — the Dam's containment turned to burning. Intentionally not a Storm: the containment is still holding. Four-phase blend, the most balanced bridge in the set.
- **True name:** —.

### 59. Wellspring 💧
- **Surface:** An underground water source the roots have found.
- **Reading:** Roots → Dew — the binding roots seeking the source. Distinct from cell #49 Spring (Dew → Roots): there the source is feeding the roots; here the roots are searching it out.
- **True name:** —.

### 60. Rime 🗡️
- **Surface:** Ice deposited on a cold blade from atmospheric moisture.
- **Reading:** Axe → Dew — an edged tool used in cold conditions, picking up frozen condensate. The single coldest entity in the game outside the catastrophes.
- **True name:** —.

---

## Refined variants (10)

A stage-1 result dropped back onto its origin phase intensifies into the highest-purity version of that phase outside the phase itself. Sheng-derived refined variants carry 0.7 weight on the origin phase; Ke-derived variants carry 0.85.

### 61. Bonfire 🔥
- **Surface:** A larger, sustained, communal fire.
- **Reading:** Kindling → Fire — kindling thrown back into its source. Productive, communal, the upper end of "still controlled" Fire.
- **True name:** —.

### 62. Topsoil 🟫
- **Surface:** The agriculturally richest version of Earth.
- **Reading:** Ash → Earth — ash worked back into the ground. The soil layer everything grows in.
- **True name:** —.

### 63. Bullion 🟨
- **Surface:** Raw ore refined into pure stock.
- **Reading:** Ore → Metal — the wealth-form of Metal. Compact, pure, the highest-purity Metal entity in the game.
- **True name:** —.

### 64. Spring-Water 💧
- **Surface:** Condensate returned to its source.
- **Reading:** Dew → Water — the purest drinking form of Water. Distinct from #49 Spring and #59 Wellspring: this is Water itself, not the source-image.
- **True name:** —.

### 65. Orchard 🌳
- **Surface:** A cultivated stand of trees.
- **Reading:** Sapling → Wood — a young tree returned to its element compounds into many. The cultivated form of Wood.
- **True name:** —.

### 66. Heartwood 🪵
- **Surface:** The densest, most centered form of Wood.
- **Reading:** Roots → Wood — a Ke product fed back into its actor phase. The part of the trunk too deep to rot. Reads slightly different from the others: the Ke product turning *inward* rather than producing residue.
- **True name:** —.

### 67. Bedrock ⛰️
- **Surface:** Earth fortified into its load-bearing form.
- **Reading:** Dam → Earth — Earth fed back into its actor phase. The base layer beneath every structure.
- **True name:** —.

### 68. Monsoon 🌧️
- **Surface:** Rain compounded into a seasonal pattern.
- **Reading:** Rain → Water — sustained, defining, the canonical seasonal water event. Distinct from §5 catastrophe Blizzard: Monsoon is productive at its peak; Blizzard is destructive.
- **True name:** —.

### 69. Inferno 🔥
- **Surface:** Working-fire compounded, approaching but not yet catastrophe.
- **Reading:** Forge → Fire — Fire fed back into its source as the most refined high-heat state. Still controlled, still purposive. Distinct from §5 catastrophe Conflagration, which is uncontained.
- **True name:** —.

### 70. Whetted-Steel 🗡️
- **Surface:** The blade sharpened to its theoretical edge.
- **Reading:** Axe → Metal — the Axe fed back into Metal, sharpened to its theoretical edge. The highest-purity tool in the game.
- **True name:** —.

---

## Catastrophes (10)

The 10 unordered Storm-pairs. Terminal in v1, brief workspace lockout on production. Every catastrophe is 50/50 across its two parent phases — the most efficient way to unbalance the pentagram, and therefore the most expensive things to produce in Balance/Harmonize mode.

### 71. Firestorm 🌪️
- **Surface:** A wind-driven inferno.
- **Reading:** Wind + Heart — the classical liver-heat-with-wind pattern, surfaced as the natural disaster it produces. Cited indirectly via Wood (liver/anger) and Fire (heart) correspondences ([Aetherium](https://aetheriumhealth.com/understanding-the-five-elements-in-chinese-medicine-a-guide-to-health-and-harmony/), [Healthline](https://www.healthline.com/health/mind-body/what-are-the-five-elements)).
- **True name:** Wood-Fire excess.

### 72. Sandstorm 🌪️
- **Surface:** Wind carrying loosened earth.
- **Reading:** Wind + Mud — the dust-bowl pattern, scaled up. Wood-Earth at full collision.
- **True name:** Wood-Earth excess.

### 73. Dustbowl 🏜️
- **Surface:** Wind across parched land.
- **Reading:** Wind + Drought — the most arid catastrophe in the set. The historical 1930s Dust Bowl named the pattern; the system makes it the Wood-Metal collision.
- **True name:** Wood-Metal excess.

### 74. Blizzard 🌨️
- **Surface:** Wind plus cold at full intensity.
- **Reading:** Wind + Frost — the Wood-Water collision surfaced as winter at its worst.
- **True name:** Wood-Water excess.

### 75. Eruption 🌋
- **Surface:** Heat trapped under earth, bursting.
- **Reading:** Heart + Mud — Fire-Earth at full collision. The most violent terrestrial catastrophe in the set.
- **True name:** Fire-Earth excess.

### 76. Conflagration 🔥
- **Surface:** Uncontrolled fire across dry country.
- **Reading:** Heart + Drought — Fire-Metal at full collision. Distinct from the insubordinate Wildfire (one element acting out) and from the refined Inferno (still contained).
- **True name:** Fire-Metal excess.

### 77. Geyser ♨️
- **Surface:** Boiling water and steam erupting from the ground.
- **Reading:** Heart + Frost — Fire-Water at full collision. Distinct from the insubordinate Steam: this is two Storms colliding at scale, not one element acting out.
- **True name:** Fire-Water excess.

### 78. Fissure 🪨
- **Surface:** A deep crack in dampness baked then split open.
- **Reading:** Mud + Drought — Earth-Metal at full collision. The ground losing its integrity.
- **True name:** Earth-Metal excess.

### 79. Permafrost ❄️
- **Surface:** Saturated ground frozen solid.
- **Reading:** Mud + Frost — Earth-Water at full collision. Locked, immovable.
- **True name:** Earth-Water excess.

### 80. Tundra 🏔️
- **Surface:** Cold, dry, treeless land.
- **Reading:** Drought + Frost — Metal-Water at full collision. The bottom of winter as a biome. The most "settled" catastrophe in the set — it doesn't move, it just *is*.
- **True name:** Metal-Water excess.

---

## Notes for the inspect panel

- **Field order in the UI:** Icon + Name on top. Surface as the primary visible string. Reading expands on hover/click. True name shown as a small label under the name (or hidden behind a "deeper reading" disclosure for entities where it adds nothing — e.g. all the stage-2 cells where True name = `—`).
- **Length budget per block:** Surface ≤ 100 chars; Reading 2–3 sentences; True name ≤ 20 chars. The blocks above all sit inside this budget.
- **Citation handling:** Links go in Reading, never in Surface or True name. They appear inline as natural anchor text (`Aetherium`, `Healthline`), not as parenthesized URLs.
- **Future Maximal-scope additions** will add new Surface/Reading blocks under the existing structure. The doc shape (one section per entity class, three fields per entity) is forward-compatible.

## What this doc does not cover

- The Feeling-modifier *resolution* rules (when a charged Feeling acts on a stage-2 cell) — see [`stage-2-crafts.md`](./stage-2-crafts.md) §6.
- The pentagram math (how `phase_weights` blend in Balance mode) — see [`balance-mode.md`](./balance-mode.md).
- The UI surface itself (where the inspect panel lives, how it opens) — see `ui-layout.md`.

See [`../../AGENT_NOTES.md`](../../AGENT_NOTES.md) for the running session log.
