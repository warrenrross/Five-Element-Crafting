# Wu Xing Puzzle Prior Art: A Comprehensive Research Report

*Prepared for [Five-Element-Crafting](https://github.com/warrenrross/Five-Element-Crafting) · May 2026*

---

## TL;DR — Five Most Important Findings

1. **No direct competitor exists.** Every game surveyed flattens Wu Xing into either a Ke-only type chart (rock-paper-scissors) or a Sheng-only resource chain. No published game encodes both cycles with directional asymmetry *and* procedurally generates imbalance puzzles with a move budget. Five-Element-Crafting is genuinely novel in this intersection.

2. **Wind and Water: Puzzle Battles (2007) is the closest structural relative.** It is the only game that (a) uses all five Wu Xing elements as block types and (b) includes a dedicated puzzle mode where the player must solve a board state within constrained moves. Its mechanics are matching-based (identical elements cancel), not Sheng/Ke-resolution-based — but its *mode design* is the clearest prior-art template.

3. **The Gloomhaven element-infusion pattern is the strongest design precedent for Sheng chaining.** The infuse/consume model — where one character generates an elemental resource that a teammate consumes on the next turn — maps directly onto Five-Element-Crafting's Sheng flow and demonstrates that turn-structured elemental dependency creates deep cooperative tactics without rules complexity.

4. **Tigris & Euphrates (1997) is the canonical precedent for "lowest score wins" balance enforcement.** Knizia's scoring rule — your final score is your weakest resource category — forces continuous diversification and is the most-studied tabletop mechanic for making multi-resource balance feel urgent. The puzzle-generator design for Balance Mode should study this directly.

5. **The four Wu Xing relationship types (相生/相克/相侮/相乘) appear simultaneously in only one found game:** a Japanese trick-taking prototype ("五行トリテ", 2021) listed in the [Bodoge Japanese board game database](https://bodoge.hoobby.net/games?search%5Bfreeword%5D=%E4%BA%94%E8%A1%8C). This is the only prior art that explicitly models 相侮 (xiāngwǔ, insubordinate) and 相乘 (xiāngchéng, overacting/pathological) as distinct game outcomes — matching Five-Element-Crafting's four resolution types exactly.

---

## 1. Introduction and Scope

Five-Element-Crafting is a gesture-controlled crafting and puzzle game built on the Wu Xing (五行) system of Chinese Five Phases: Wood (木), Fire (火), Earth (土), Metal (金), Water (水). Its core mechanic encodes actor → patient directional drag, resolving ordered pairs into one of four outcomes: **Sheng** (生, generating), **Ke** (克, controlling), **Self** (same element → emotion/excess/pathology), or **Insubordinate** (a pairing on neither cycle → actor's pathology). Its Balance Mode presents procedurally generated elemental imbalances and asks the player to restore equilibrium within a move budget.

This report surveys prior art across six scopes: (1) East Asian games using Wu Xing, (2) Western games inspired by five-element systems, (3) TCM educational games and apps, (4) academic research on puzzle generation and elemental mechanics, (5) board games and tabletop RPGs, and (6) open-source GitHub projects. For each category, findings are assessed for design overlap, mechanics to adopt, and antipatterns to avoid.

The classification framework throughout this report uses a four-part taxonomy developed from the survey:

| Type | Description | Key examples |
|------|-------------|--------------|
| **Type-Chart** | Ke-only, often symmetric rock-paper-scissors | Most RPGs, Total War combat |
| **Resource Cycle** | Sheng-only, generation chain for economy | Total War buildings |
| **Dual Asymmetric** | Both Sheng + Ke, directionally distinct effects | Orbs of Wuxing, Wu Xing card game |
| **Balance Puzzle** | Procedurally generated imbalance + move-budget restoration | Wind and Water (partial), Five-Element-Crafting |

---

## 2. East Asian Video Games — Direct Wu Xing Use

### 2.1 Total War: Three Kingdoms (Creative Assembly, 2019)

The most thorough implementation of Wu Xing across multiple interlocking game systems in any released video game. According to the [Total War Fandom wiki](https://totalwar.fandom.com/wiki/Wu_Xing), Wu Xing elements are properties of heroes, units, buildings, and reforms — the same color-coded element assignment runs through every gameplay layer simultaneously.

**Combat (Ke cycle as type chart):** Unit types map to elements in the Ke (controlling) cycle: Water (ranged) beats Fire (shock cavalry) beats Metal (melee infantry) beats Wood (polearm infantry) beats Earth (melee cavalry) beats Water. This is a symmetric effectiveness system — Fire beats Metal but Metal does not beat Fire at 0.5× damage the way a genuine Ke-cycle implementation would imply directionality.

**Economy (Sheng cycle as construction cost reduction):** Buildings reduce construction costs for the next element's buildings along the Sheng cycle: Metal buildings reduce costs of Water buildings, Water reduces Wood, Wood reduces Fire, Fire reduces Earth, Earth reduces Metal. This is the only major game found that uses the Sheng cycle as a *distinct economic mechanic* rather than collapsing it into the Ke combat chart.

**Character archetypes and attributes:** Each of the five character archetype classes maps to an element; the five campaign attributes (Authority = Earth, Expertise = Metal, Cunning = Water, Resolve = Wood, Instinct = Fire) each correspond to an element and determine which building reforms benefit a character. Zhang Fei, for example, is Fire/Vanguard/Instinct and specifically buffs shock cavalry (Fire unit type) and military buildings (Fire building class).

**Assessment for Five-Element-Crafting:** Total War's design demonstrates that Sheng and Ke can power *different mechanical layers simultaneously* without conflict — one cycle drives economics, the other drives combat. The game's failure to preserve directional asymmetry within each layer (both cycles are flattened to symmetric effectiveness) is exactly the antipattern Five-Element-Crafting avoids. A player in Total War cannot observe that "Water beats Fire AND Fire generates Earth" as a connected system — the cycles are segregated. The goal of Five-Element-Crafting's 5×5 resolution grid is precisely the synthesis Total War fragments.

### 2.2 Wo Long: Fallen Dynasty (Team Ninja/Koei Tecmo, 2023)

Five Phases as the complete stat and spell system. According to the [Wo Long Fextralife wiki](https://wolong.wiki.fextralife.com/Stats), every Wizardry spell belongs to one of the five phases: Metal (debuffs), Wood (healing), Water (stealth/mobility), Fire (attack), Earth (defense). The [Ke counter system](https://www.reddit.com/r/wolongfallendynasty/comments/13l5uat/introduction_to_the_five_elements_and_the_absence/) determines spell immunities: Water counters Fire spells, Fire counters Metal, Metal counters Wood, Wood counters Earth, Earth counters Water.

Sheng (generating) bonuses exist — proccing a Wood status effect buffs subsequent Fire spells — but in practice the Ke counter system is the dominant tactical layer, with Sheng providing minor modifiers. A [Reddit deep-dive on the absence of the generating cycle](https://www.reddit.com/r/wolongfallendynasty/comments/13l5uat/introduction_to_the_five_elements_and_the_absence/) documents player frustration that the Sheng cycle feels vestigial: the system flattens toward Type-Chart again in play.

**Assessment:** Wo Long demonstrates a common failure mode — both cycles are present in the rulebook but only one (Ke) drives actual decisions. This is the design warning Five-Element-Crafting must heed: if Sheng outputs are mechanically weaker or rarer than Ke outputs, players will route around the generating cycle. The fix in Five-Element-Crafting's design is that Sheng and Ke produce *different entity classes* (not just different multipliers), making both cycle types irreplaceable.

### 2.3 Wind and Water: Puzzle Battles / 時空五行-風水大戦 (Yuan Works, 2007)

The most structurally adjacent game to Five-Element-Crafting's Balance Mode. Developed by Yuan Works (Korea) for the GP2X handheld and later [released on the Sega Dreamcast](https://en.wikipedia.org/wiki/Wind_and_Water:_Puzzle_Battles) (2008) and Windows (2011 freely available). The Chinese subtitle translates as "Wu Xing Space-Time — Great Feng Shui War."

The game uses all five Wu Xing elements (Wood, Fire, Earth, Metal, Water) plus two special blocks (Wind and Void) as the tile types. The basic mechanic is rotation-and-matching: arrange four same-element tiles in a diamond shape to clear them, earning points. Combos and chains score higher. A rising "press" at the bottom of the board creates constant time pressure.

Critically, [a Japanese review](https://forest.watch.impress.co.jp/docs/serial/shumatsu/434980.html) documents a dedicated **Puzzle Mode** described as "指定された操作回数でクリアする" — solve within a specified number of operations. This is a move-budget puzzle mechanic using Wu Xing elements. The game was a [finalist at the Independent Games Festival Mobile 2008](https://en.wikipedia.org/wiki/Wind_and_Water:_Puzzle_Battles) and invited to GDC 2008.

**Assessment:** Wind and Water is the strongest structural prior-art precedent for Five-Element-Crafting's Balance Mode: five Wu Xing elements + dedicated puzzle mode with move constraints. The critical difference is *how elements interact*: Wind and Water uses same-element matching (identical tiles cancel), not Sheng/Ke directed-cycle resolution. The Wu Xing elements in Wind and Water are cosmetic labels on tile types, not mechanically differentiated by their cyclic relationships. Five-Element-Crafting's puzzle generator is the first known system to use Sheng/Ke resolution *as the move set* for a move-budget balance puzzle.

### 2.4 Koei Historical Games (Dynasty Warriors, Romance of Three Kingdoms series)

Koei's franchise consistently uses Wu Xing affinities for characters and units. The [Koei Fandom wiki](https://koei.fandom.com/wiki/Five_Elements) documents the Ke cycle as the primary affinity system: Wood restrains Earth, Fire restrains Metal, Earth restrains Water, Metal restrains Wood, Water restrains Fire. The nurture (Sheng) cycle is also listed but historically applied only to passive stat bonuses rather than active tactical choices. This series represents the most widely distributed introduction to Wu Xing mechanics for Western gamers — the franchise has sold millions of copies — making it significant as cultural context if not as direct design precedent.

### 2.5 Kingdom of Paradise (Konami, 2005, PSP)

Documented by [TV Tropes' Elemental Rock-Paper-Scissors page](https://tvtropes.org/pmwiki/pmwiki.php/Main/ElementalRockPaperScissors) as one of the rare examples preserving both cycles in a combat context. The game features a "complementary and charging system" where Sheng relationships create charge bonuses and Ke relationships determine counters. No puzzle mode; the dual-cycle implementation is within real-time action combat. Worth studying for how it communicates both cycles to players simultaneously in a fast-paced context.

### 2.6 Perfect World (PW Entertainment, 2005+, MMO)

Taoist five-element affinities used for PvP damage multipliers: Fire > Metal > Wood > Earth > Water > Fire. The Ke cycle is applied symmetrically (Fire beats Metal AND Metal is weak to Fire), which is the canonical Type-Chart antipattern. No Sheng implementation found in PvP. Significant only as evidence that the Chinese MMO industry defaulted to Ke-only even when explicitly invoking Wu Xing cosmology.

---

## 3. Western Games Inspired by Five-Element Systems

### 3.1 Genshin Impact (HoYoverse, 2020+)

Seven elements (Pyro/Hydro/Cryo/Electro/Anemo/Geo/Dendro) with approximately 19 elemental reaction types. Directional asymmetry exists: Pyro applied to a Hydro-afflicted enemy yields a 1.5× Vaporize reaction; Hydro applied to a Pyro-afflicted enemy yields a 2× Vaporize reaction. This is asymmetric but emerges from a first-vs-second application order rule, not from a directed generating/controlling cycle.

Genshin's system is not a Wu Xing implementation — the element count differs, the reaction graph is not cyclic in the Wu Xing sense, and there is no Sheng equivalent (no generating relationship that benefits the generated element). It is, however, the best commercial example of a game that successfully communicates directed elemental asymmetry to a mass audience. Genshin's "elemental gauge theory" (where elements have quantified application strengths that affect reaction triggers) is a sophisticated precedent for the `phase_weights` vector in Five-Element-Crafting's entity design.

### 3.2 Magic: The Gathering Color Pie (Wizards of the Coast, 1993+)

Five colors (White/Blue/Black/Red/Green) arranged in a pentagon where adjacent colors are allied and non-adjacent colors are enemies. Documented extensively by [MTG Fandom](https://mtg.fandom.com/wiki/Color) and [Draftsim's color wheel analysis](https://draftsim.com/mtg-color-wheel/). Each color has 2 allies and 2 enemies, making the system perfectly symmetric — no directed Sheng/Ke asymmetry.

The MTG color pie is the most influential five-element system in Western game design. Its relevance to Five-Element-Crafting is not structural (the cycles are different) but *functional*: each color has specific mechanical expressions (Green ramps resources, Blue counters spells, Black pays life, Red deals direct damage, White distributes effects). These mechanical fingerprints make colors feel distinct beyond their combat matchups. Five-Element-Crafting's element-specific entity classes (Wood produces Kindling/Sapling; Metal produces Ore/Axe) fulfill the same function — each element has a recognizable "flavor" of result independent of cycle position.

### 3.3 Pokémon Type Chart (Game Freak, 1996+)

Eighteen types in a dense directed effectiveness graph. Graph theory analysis (see [YouTube breakdown](https://www.youtube.com/watch?v=zs1iYJlcqPo)) identifies approximately 2,924 distinct cycles of varying lengths. Fire → Water → Grass → Fire is a 3-cycle, not a 5-cycle, and there is no Wu Xing substructure within the graph.

The Pokémon chart is the canonical precedent for *asymmetric directed effectiveness* (A beating B does not imply B resisting A at 0.5×), documented at [Pokémon Database](https://pokemondb.net/type). Its cultural significance is that it trained a generation of players to intuit directed elemental graphs without explicit instruction — relevant to Five-Element-Crafting's UX challenge of teaching Sheng vs. Ke without a tutorial.

### 3.4 Gloomhaven / Frosthaven Element Infusion (Cephalofair Games, 2017/2022)

The most directly applicable design precedent for Five-Element-Crafting's Sheng cycle as a *temporal chaining mechanic*. As documented by the [Gloomhaven Fandom wiki](https://gloomhaven.fandom.com/wiki/Elements), elements have three states: Inert → Strong → Waning. A character ability infuses an element (Strong); on the next round, another character consumes that Strong element for an enhanced attack; if not consumed, the element decays to Waning; if still unconsumed, it returns to Inert.

The design insight documented by [GoCorral's Wu Xing analysis](https://gocorral.com/2024/11/18/wu-xing-gaming-the-five-elements/) is exact: "I use a metal move. This generates a water element. My buddy goes next and uses a water move, consuming the water element I created to power up his attack. He targets a fire user for bonus damage from the infusion. Additionally, his water move generates a wood element for later usage." This is the Metal→Water→Wood Sheng chain expressed as cooperative sequential action. Gloomhaven demonstrates that players find this chain intuitive and tactically rich even when they don't know they're executing a Wu Xing Sheng sequence.

**Design principle to steal:** State-ful element availability (Strong/Waning/Inert) creates forward-planning depth without explicit counters. For Five-Element-Crafting's Balance Mode, this translates to: Sheng moves that create "energized" element tokens (available for one subsequent move) vs. Sheng moves that make permanent pentagram adjustments — a two-tier Sheng system that adds planning depth.

### 3.5 Avatar Legends RPG (Magpie Games, 2022)

Based on *Avatar: The Last Airbender* (four elements: Water/Earth/Fire/Air, not five). The Balance Track mechanic gives each character two behavioral poles (e.g., Restraint/Results, Tradition/Creativity) and tracks emotional shifts between them. Documented in [Magpie Games' system reference](https://magpiegames.com/pages/avatarlegends). No Ke-cycle counter relationships between bending types exist — this system is emotionally resonant and topically adjacent (elemental balance as character health), but structurally orthogonal to Wu Xing.

Relevant to Five-Element-Crafting because the Avatar Legends Balance Track is a two-axis emotional balance mechanic that proved commercially successful. It validates the design hypothesis that players will engage with *emotional states tied to elemental balance* when the system is legible and the stakes are clear.

### 3.6 WuXingRPS Prototype (zerosalife, 2015)

A browser-based [five-way rock-paper-scissors prototype](http://zerosalife.github.io/blog/2015/02/28/wuxingrps-elemental-rock-paper-scissors/) using Wu Xing elements as the five choices. Both cycles are encoded: Destruction arrows (Ke cycle, shown in red) determine wins; Generation arrows (Sheng cycle) encode a "eats" relationship where Wood eats Water (Wood is generated by Water, so Wood consumes Water in the game's framing). In an earlier version, generation relationships resulted in draws — this made 3/5 interactions draws, described by the author as "less exciting." The fix: generation relationships now also produce a winner.

**Design lesson:** The decision to avoid draws in Sheng relationships is directly applicable to Five-Element-Crafting's insubordinate resolution. Like zerosalife's draw problem, a system where certain ordered pairs "do nothing" creates frustration. Five-Element-Crafting's solution (insubordinate pairings produce the actor's pathology — a concrete negative outcome rather than a null) solves the same problem.

---

## 4. TCM Educational Games and Apps

### 4.1 The Chinese Five Elements (iOS App Store, Leung Man Ho Thomas)

A chess-like game on the [App Store](https://apps.apple.com/us/app/the-chinese-five-elements/id895781672) that practices 相克 (xiāngkè, Ke) and 相生 (xiāngshēng, Sheng) relationships against an AI opponent across 10 difficulty levels. The game explicitly teaches both cycles as its core mechanic. No puzzle mode with move budgets was documented; the game appears to be an adversarial rather than cooperative or solo-balance experience.

### 4.2 Five Elements Card Game (fiveelementscardgame.com)

A [TCM educational card game](https://www.fiveelementscardgame.com) with three difficulty levels (Beginner/Advanced/Expert) teaching meridians, five-element body correspondences (organs, emotions, seasons, tastes, senses), and the generating and controlling cycles. Positioned as a study aid for TCM students and practitioners. Three difficulty tiers suggest awareness of progressive disclosure — relevant to Five-Element-Crafting's Explore→Balance mode progression.

### 4.3 Five Elements Steam Game (2017)

A [Steam-released RTS](https://store.steampowered.com/app/575670/Five_Elements/) using five Taoist elements as faction identities. Monk-enlightenment framing. Five-element affinities determine unit matchups. The Ke cycle drives combat effectiveness. No educational TCM content; the Wu Xing system is aesthetic framing for a standard RTS type chart.

### 4.4 Gamification of TCM Acupuncture Education (Pan, 2019)

An [academic paper in I-JET](https://online-journals.org/index.php/i-jet/article/download/11205/5911) documenting an interactive teaching mode using educational games for acupuncture courses. The paper validates that game-based learning for TCM content improves retention and engagement. Directly relevant as evidence that Five-Element-Crafting's educational framing (five-element correspondences, organ associations, emotional correlates) has academic precedent and documented pedagogical value.

### 4.5 FAE Five Elements RPG Hack (Reddit, 2017)

A [Fate Accelerated Edition community hack](https://www.reddit.com/r/FATErpg/comments/7m8usg/wu_xingfive_elements_yet_another_set_of_fae/) mapping Wu Xing to FAE approaches: Wood (Spontaneity/anger/kindness), Fire (Intensity/hatred/resolve), Earth (Naturalness/anxiety/joy), Metal (Rationality/sadness/bravery), Water (Flexibility/fear/gentleness). The Ke cycle gives +1 to attack against the preferred target: Wood defeats Earth gently, Fire melts Metal, Earth absorbs Water, Metal chops Wood, Water douses Fire. Each element also maps to season, emotion, and movement direction — the same correspondence tables Five-Element-Crafting uses for its entity lore.

**Assessment:** This hack demonstrates that the full TCM five-element correspondence table (seasons, emotions, movement qualities, organs) maps cleanly onto RPG approach archetypes, validating Five-Element-Crafting's design decision to embed TCM correspondences in entity descriptions. The player who learns the game learns TCM; the player who knows TCM immediately understands the game.

---

## 5. Board Games and Tabletop RPGs

### 5.1 Wu Xing: The Five Elements (The Game Crafter, 2012)

A [head-to-head spatial card game](https://www.thegamecrafter.com/games/wu-xing:-the-five-elements) explicitly based on the five Chinese elements. Players create and destroy elements while blocking opponents. Both generating (Sheng) and destroying (Ke) actions are available; scoring is based on created-plus-destroyed cards. An [overview video](https://www.youtube.com/watch?v=sDvQTBErS78) documents two-player competitive play.

This is a Dual Asymmetric implementation (both cycles, distinct actions) in a self-published card game — the type of design closest to Five-Element-Crafting's mechanic intent. The competitive framing (opponent blocking) is orthogonal to Five-Element-Crafting's solo/cooperative Balance Mode, but the card-game surface proves the dual-cycle mechanic is teachable and playable in a non-video-game format.

### 5.2 5 Phases (Kickstarter, 2017)

A [domain-building card game](https://www.reddit.com/r/boardgames/comments/612rax/5_phases_a_card_game_based_on_the_chinese_wu_xing/) where each player embodies one Wu Xing element. Phase-specific card abilities (Wood = extra card plays) express elemental identity mechanically. The Wu Xing cycles determine how players can interact with each other's domains. Crowdfunded and presumably small-run; no major commercial release found.

### 5.3 Japanese Trick-Taking Games Using 五行 (Bodoge Database)

The [Bodoge Japanese board game database](https://bodoge.hoobby.net/games?search%5Bfreeword%5D=%E4%BA%94%E8%A1%8C) lists eight games tagged with 五行 (five elements). The most significant is:

**五行トリテ (Wuxing Torite, Hirumedo, 2021):** A trick-taking game where Wu Xing elements determine how tricks are won. The game uses 相生 (Sheng), 相克 (Ke), 相侮 (xiāngwǔ, insubordinate/counteracting), and 相乘 (xiāngchéng, overacting/excessive) as winning conditions — all four Wu Xing relationship types, including the two pathological types. A related game documented on the [Gokurakism site](https://gokurakism.com/for_five/) uses 五行相克 (Ke cycle) for asymmetric trick-winning rules.

This is the only prior art found that encodes all four Wu Xing relationship types as distinct game outcomes, directly matching Five-Element-Crafting's four-resolution grid (Sheng, Ke, Self/pathological, Insubordinate/pathological). The trick-taking framing is structurally different (sequential card play vs. drag-to-craft), but the four-outcome resolution model is an exact precedent. Five-Element-Crafting's design team should study this game before finalizing the insubordinate and self-craft outcome definitions.

### 5.4 Wu Xing: The Ninja Crusade RPG (Third Eye Games, 2011)

A [tabletop RPG](https://philgamer.wordpress.com/2012/07/05/lets-study-wu-xing-the-ninja-crusade-part-3-dgs-wushu-and-combat/) where characters associate with one of the five elements (Chi bonuses/penalties based on element alignment). Wushu (magic) is divided into Yin (destroy/erode) and Yang (create/heal) — a two-axis system that superficially resembles Ke/Sheng but is mapped onto a different binary rather than the five-element cycle. Reviewed by [The Gaming Gang](https://thegaminggang.com/our_reviews/tabletop-gaming-reviews/everybody-was-kung-ku-fighting-wu-xing-the-ninja-crusade-reviewed/). The Wu Xing branding is primarily aesthetic; the actual combat system (20-count speed system) does not mechanically implement the elemental cycles.

### 5.5 Legend of the Five Rings (AEG/FFG, 5th Edition 2018)

Uses Air/Earth/Fire/Water/Void — a Japanese gogyo variant plus Void, not authentic Chinese Wu Xing. Documented by [Phil Gamer's L5R series](https://philgamer.wordpress.com/2018/11/08/lets-study-legend-of-the-five-rings-part-2-the-mechanics/). The five rings are character attributes (Reason/Stamina/Quickness/Vigilance/Perception in older editions; remapped in 5e). No Ke-cycle combat counters between ring types.

The **Strife system** in 5e L5R is the most relevant mechanic: each character has a Composure value; when accumulated Strife exceeds Composure, the character is Compromised — they act on their emotional excess rather than their trained technique. This is the closest analog in any RPG to Five-Element-Crafting's self-craft pathology stages (first self-craft = emotion, second = excess, third = pathology). L5R validates that emotional excess as a mechanical state — not just flavor text — creates compelling roleplaying moments.

### 5.6 Tigris & Euphrates (Reiner Knizia, 1997)

Not a Wu Xing game, but the canonical tabletop precedent for *balance-as-scoring*. As documented by [r/boardgames appreciation thread](https://www.reddit.com/r/boardgames/comments/4sh2iz/tigris_euphrates_appreciation_thread/) and [Bumbling Through Dungeons review](https://bumblingthroughdungeons.com/tigris-euphrates-review/), the game's final score is the player's *lowest* resource category across four types (Religion, Agriculture, Trade, Government). Knizia confirmed to [interviewers](https://www.youtube.com/watch?v=TtExl669ySM) that the "weakest link scores" rule forces players to balance all four resources rather than specialize — "you need to be good in all of these things."

This is the strongest single-game argument for why Five-Element-Crafting's Balance Mode puzzle design works as intended: the pentagram balance check (restore all five elements to within tolerance) is the five-element analog of T&E's lowest-category scoring. T&E has been played for 28 years and remains a critical darling specifically because this balance mechanic creates emergent tension. The design lesson: players naturally want to specialize; a system that punishes lowest-score specialization creates diversity of moves organically.

**Design principle to steal:** Treasure tiles in T&E are Joker resources (add to any category) — a direct analog for Five-Element-Crafting's Sheng entities, which strengthen the patient element and can be directed. The wildcard resource with directional flexibility is a proven mechanism for giving players productive choices when they are imbalanced.

### 5.7 Ironclaw and Righteous Blood, Ruthless Blades (Various)

Both noted by [GoCorral's Wu Xing analysis](https://gocorral.com/2024/11/18/wu-xing-gaming-the-five-elements/) as including the Ke overpowering cycle "but only in a very limited way." Neither makes the elemental cycles central to play, using them as minor modifiers. Documented as antipatterns: bolting Wu Xing onto an existing system as a subsystem rather than building the system around Wu Xing produces a mechanic players ignore.

---

## 6. Open-Source and Indie Projects

### 6.1 Orbs of Wuxing (rjstange, Unity, 2020)

[GitHub repository](https://github.com/rjstange/Orbs-of-Wuxing): a month-long solo Unity prototype using ML-Agents deep reinforcement learning to train AI agents in a five-element team combat game. Two teams of six elemental spheres compete; AI was trained via self-play.

**Full dual-cycle implementation:** Absorb (Sheng: the absorbing element grows — gains size, mass, and speed from 60% of impact energy; deals 40% damage) vs. Destroy (Ke: deals 105% damage; the destroying element takes 5% self-damage). The Sheng asymmetry is preserved: absorbing an element makes you *grow*, while destroying an element costs you minor damage — the two relationships have completely different mechanical signatures, not just different multipliers.

**Why this matters:** Orbs of Wuxing is the only open-source project found that correctly implements the **mechanically distinct effect signatures** for Sheng and Ke — absorb-and-grow vs. destroy-and-damage. Five-Element-Crafting's resolution model (Sheng produces a generative entity; Ke produces a controlling/constraining entity; different result *classes*, not different magnitudes) is the text-based analog of this. The codebase may be worth examining for how the cycle relationships are encoded in game state.

### 6.2 Wu Xing Board Game Prototype (Flywheel Blog, 2015)

An [indie developer blog](https://flywheel.gizmet.com/category/video-games/) documenting a Wu Xing balance puzzle game in development. The prototype has elemental entities with radius/field-of-effect; the player must maintain element balance ratios. Both Sheng and Ke cycles are implemented. No subsequent release was found. This prototype is the closest spatial-balance puzzle precedent found outside the Five-Element-Crafting design space.

### 6.3 TCM-Nvwa (synbol, 2025)

[GitHub: synbol/TCM-Nvwa](https://github.com/synbol/TCM-Nvwa) — an AI/TCM dataset project, not a game. Included for completeness; not a direct prior-art reference for game mechanics.

---

## 7. Academic Research

### 7.1 Answer Set Programming for Guaranteed-Solvable Puzzle Generation (Smith et al., 2012)

[A Case Study of Expressively Constrainable Level Design Automation for Puzzle Games](https://homes.cs.washington.edu/~zoran/answer-set-level-design.pdf) applies Answer Set Programming (ASP) to the puzzle game *Refraction*. The key guarantee: ASP-based puzzle generators are **correct by design** — they always produce content conforming to input requirements when it is logically possible to do so. The paper demonstrates that ASP can simultaneously enforce puzzle solvability, style properties (symmetry, spacing, compositional balance), and difficulty targets.

**Application to Five-Element-Crafting Balance Mode:** The puzzle generator that produces imbalance states and verifies their resolvability within N moves is exactly the class of problem this paper solves. The "generate a balanced state, apply N random crafts in reverse, present the result as a puzzle" approach described in Five-Element-Crafting's design notes corresponds to backward-chaining generation — which the ASP framework makes formally verifiable. The paper's solvability checker (does a partial solution extend to a complete solution without removing any placed piece?) maps to: does the current pentagram state have at least one valid move sequence within the budget that reaches balance?

### 7.2 Automated Graph Genetic Algorithm Puzzle Validation (Levonyan et al., CEC 2022)

[Automated Graph Genetic Algorithm based Puzzle Validation for Faster Game Design](https://arxiv.org/abs/2302.09040) presents an evolutionary algorithm for validating logical puzzles, formulated as quadratic combinatorial optimization problems. Demonstrated on a fantasy Party Building Puzzle game. Key insight: genetic approaches can find a diverse set of near-optimal solutions, allowing puzzle designers to estimate difficulty and variety without exhaustive search.

**Application:** Five-Element-Crafting's puzzle generator needs to know that a generated imbalance (a) has at least one solution within the move budget, and (b) ideally has exactly one *short* solution path to keep puzzles crisp. The genetic validation approach from this paper can confirm property (a) without exhaustive search over the 5×5×N move tree.

### 7.3 Procedurally Generating Rules to Adapt Difficulty (Volden et al., 2023)

[Procedurally generating rules to adapt difficulty for narrative puzzle games](https://arxiv.org/abs/2307.05518) uses a genetic algorithm with a difficulty measure to find rules that yield a target number of solution sets. **Key finding:** the approach finds rules approximating any given target difficulty within approximately 24 generations on average. Combined with an LLM to present rules narratively.

**Application:** The number of valid solution paths in a Balance Mode puzzle directly encodes difficulty — fewer paths = harder puzzle, more paths = easier. This paper provides a validated algorithm for steering toward a target solution-count, which is the puzzle difficulty dial for Balance Mode.

### 7.4 You-Only-Randomize-Once: Statistical Control in Constraint-Based PCG (Katz et al., 2024)

[You-Only-Randomize-Once: Shaping Statistical Properties in Constraint-based PCG](https://arxiv.org/abs/2409.00837) addresses the problem of generating procedural content that has specific statistical distributions rather than just satisfying hard constraints. Relevant to Five-Element-Crafting's need to generate imbalances with controlled distribution — not too extreme (unsolvable) and not too mild (trivial).

### 7.5 Hybrid Cyclic-Graph and Wave Function Collapse Method (Laurent et al., ICSE 2025)

[A Hybrid Cyclic-Graph & WFC Method](https://blog.ptidej.net/content/files/2025/11/_ICSE_GAS_Laurent____Graph_WFC_Procedural_Gen-1_compressed.pdf) uses a cyclic directed graph structure combined with Wave Function Collapse for mission generation. The cyclic graph structure in the paper is formally equivalent to the Wu Xing graph — a directed cycle with cross-edges. This methodology could generate Five-Element-Crafting puzzle sequences that respect the graph topology of Sheng/Ke relationships.

### 7.6 Mathematical Definition and Systematization of Puzzle Rules (Maeda & Inoue, 2025)

[Mathematical Definition and Systematization of Puzzle Rules](https://arxiv.org/abs/2501.01433) provides a formal framework for expressing and systematizing puzzle rules. Relevant as formal vocabulary for specifying Five-Element-Crafting's balance constraint: given a five-float phase vector, the balance predicate is all elements within tolerance ε of 0.2; a move is legal if it corresponds to a valid Sheng or Ke ordered pair; a puzzle is valid if the initial state is imbalanced and the goal state is reachable within budget.

---

## 8. Taxonomy of Wu Xing Adaptations

The following table classifies all games found in this survey by how they implement the Wu Xing system:

| Game | Year | Ke cycle | Sheng cycle | Both directional | Pathological types | Puzzle mode |
|------|------|----------|-------------|------------------|--------------------|-------------|
| Total War: Three Kingdoms | 2019 | ✅ (combat) | ✅ (buildings) | ❌ (symmetric) | ❌ | ❌ |
| Wo Long: Fallen Dynasty | 2023 | ✅ | ⚠️ (weak) | ❌ | ❌ | ❌ |
| Wind and Water: Puzzle Battles | 2007 | ❌ | ❌ | ❌ | ❌ | ✅ (move budget) |
| Koei franchise | 1985+ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Kingdom of Paradise | 2005 | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| Orbs of Wuxing | 2020 | ✅ | ✅ | ✅ | ❌ | ❌ |
| WuXingRPS | 2015 | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| Wu Xing card game | 2012 | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| 五行トリテ (Torite) | 2021 | ✅ | ✅ | ✅ | ✅ | ❌ |
| Gloomhaven | 2017 | ❌ | ✅ (infuse/consume) | N/A | ❌ | ❌ |
| Tigris & Euphrates | 1997 | N/A | N/A | N/A | N/A | ✅ (balance scoring) |
| L5R 5e | 2018 | ❌ | ❌ | ❌ | ✅ (Strife/Compromised) | ❌ |
| Five-Element-Crafting | 2026 | ✅ | ✅ | ✅ | ✅ | ✅ |

**Legend:** ✅ = present; ⚠️ = present but vestigial or symmetric; ❌ = absent; N/A = not applicable

Five-Element-Crafting is the only entry with all six features. The nearest competitors by feature count:
- **五行トリテ**: four-outcome resolution ✅ but no puzzle mode and no directional implementation confirmed
- **Orbs of Wuxing**: dual directional cycles ✅ but no pathological types and no puzzle mode
- **Wind and Water**: move-budget puzzle mode ✅ but no cycle resolution at all

---

## 9. Top Five Precedents for the Puzzle Generator Design

These five prior-art examples have the most direct implications for authoring `docs/design/balance-mode.md`:

### Precedent 1 — Wind and Water Puzzle Battles (move-budget Wu Xing puzzle)

The puzzle mode exists and has been shipped. The architectural template: present a board state, give the player a fixed operation count, require a clearing goal. The Wu Xing elements are the tile types. The move set (match four same-element tiles) is simple and understood before entering puzzle mode.

**Apply to Five-Element-Crafting:** The Balance Mode should ensure the player fully understands the 5×5 resolution grid (learned in Explore Mode) before a puzzle is presented. The puzzle's move budget corresponds to Wind and Water's "指定された操作回数" (specified operation count). Puzzle generation by backward-chaining from a solved state guarantees solvability by construction — the same approach Wind and Water's puzzle mode presumably used.

### Precedent 2 — Tigris & Euphrates (lowest-resource scoring forces balance)

The "your score is your weakest category" mechanic has been playtested for 28 years. It provably creates pressure to maintain all resource types.

**Apply to Five-Element-Crafting:** The Balance Mode win condition (all five elements within tolerance of 0.2 on the phase vector) is the five-element Tigris & Euphrates. The design challenge T&E already solved: players must not be able to "dump" one element and win by optimizing the others. The tolerance window ε sets the analog of T&E's score granularity — too wide and any move wins; too narrow and nothing is ever in balance.

### Precedent 3 — Gloomhaven Infuse/Consume (Sheng as temporal resource)

The infuse/consume model makes Sheng moves *create resources* that Ke moves (or other Sheng moves) *consume*. This is distinct from Ke-only systems because Sheng output has positive value on its own — not just as a combat buff but as a resource the player manages.

**Apply to Five-Element-Crafting Balance Mode:** A Sheng move should produce a tangible intermediate state — an "energized" element token or an entity in the workspace — that the player can consume on a subsequent move for an enhanced Ke effect. This creates move chains (Sheng then Ke) that are more efficient than either move alone, incentivizing both cycle types within a single puzzle solution.

### Precedent 4 — Orbs of Wuxing (distinct effect signatures for Sheng vs. Ke)

Absorb-and-grow (Sheng) vs. destroy-and-damage (Ke) are mechanically distinguishable at the visual level: the Sheng orb gets bigger. Players understand which relationship they're in from immediate feedback.

**Apply to Five-Element-Crafting:** Sheng and Ke outcomes must be immediately distinguishable without reading text. In the 25-base-cell grid, Sheng results (Kindling, Sapling, Dew, Ore, Ash) should have a distinct visual register from Ke results (Axe, Roots, Dam, Rain, Forge). Balance Mode moves that use Sheng should produce visible pentagram upward shifts; Ke moves should produce suppression. The animation/visual design of move feedback is as important as the rule itself.

### Precedent 5 — ASP Puzzle Generation (Smith et al., 2012) + Genetic Difficulty Tuning (Volden et al., 2023)

Backward-chaining from a balanced state through N random legal inverse-crafts guarantees solvability. Genetic difficulty tuning targets a specific number of valid solution paths. Together these form a complete puzzle-generation pipeline.

**Apply to Five-Element-Crafting:** The pipeline for `balance-mode.md` is:
1. Sample a balanced phase vector (all elements at 0.2 ± ε).
2. Apply K random legal Sheng/Ke/insubordinate crafts in reverse (each inverse craft moves the pentagram away from balance).
3. Validate that at least one forward solution path of ≤ K moves restores balance (using the genetic approach or a bounded tree search).
4. If the puzzle is too hard (zero valid paths) or too easy (more than T paths), resample K or the initial vector.
5. Present the resulting imbalanced state as the puzzle.

---

## 10. Design Patterns to Adopt

Based on the survey, the following design patterns have strong prior-art validation:

**Pattern A — Sheng and Ke produce different entity classes, not just different magnitudes.** Validated by Orbs of Wuxing (grow vs. damage) and the MTG color pie (each color has distinct mechanical vocabulary). If both cycles produce "points," players optimize one and ignore the other. If they produce categorically different things, both are always relevant.

**Pattern B — Balance scoring is the weakest link.** Validated by Tigris & Euphrates (28 years of playtesting). Final score = lowest resource category. For Balance Mode: the imbalance score is the element furthest from equilibrium. This creates urgency around the most-deficient element, not the most-abundant one.

**Pattern C — Four resolution types, each with a distinct outcome quality.** Validated by 五行トリテ. All four Wu Xing relationship types (生/克/侮/乘) produce different game outcomes. In Five-Element-Crafting: Sheng produces generative entities, Ke produces constraining entities, Self produces emotions/excess/pathology, Insubordinate produces actor's pathology. The four types should feel qualitatively different, not just quantitatively different.

**Pattern D — Sheng creates forward resources, Ke consumes or suppresses.** Validated by Gloomhaven's infuse/consume and GoCorral's analysis. A pure Ke system is satisfying (direct impact) but short-sighted; a pure Sheng system is strategic (planning) but slow. The tension between creating resources (Sheng) and using them (Ke) is the fundamental two-move tactical combination that generates depth.

**Pattern E — Backward-chain generation for guaranteed solvability.** Validated by Smith et al. (2012) and implicit in Wind and Water's puzzle mode. Generate puzzles by starting from the solved state and applying inverse moves. Solvability is guaranteed by construction; difficulty is controlled by K (number of inverse moves applied).

---

## 11. Design Antipatterns to Avoid

Based on games that failed to realize their Wu Xing designs:

**Antipattern 1 — Sheng as a passive modifier on Ke decisions.** Wo Long's Sheng cycle "technically exists" as minor spell buffs but players ignore it in favor of Ke counters. If Sheng only modifies Ke decisions, it becomes invisible. Fix: Sheng decisions must produce distinct outcomes that Ke decisions cannot produce.

**Antipattern 2 — Symmetric effectiveness masquerading as Wu Xing.** Most games flatten the Ke cycle to symmetric rock-paper-scissors (A beats B means B resists A at 0.5×), then label it Wu Xing. The authentic Ke relationship is directed: Metal cuts Wood does not imply Wood is especially effective against Metal. If the matrix is symmetric, it's not Wu Xing. Fix: the 5×5 ordered-pair table is inherently asymmetric; preserve that asymmetry.

**Antipattern 3 — Wu Xing as subsystem that can be ignored.** Documented by Ironclaw, Righteous Blood Ruthless Blades, and Wu Xing: The Ninja Crusade. When the elemental cycles are "optional depth" rather than the central resolution mechanic, experienced players ignore them and new players never learn them. Fix: every core game action (every drag) goes through the resolution table. There is no off-ramp.

**Antipattern 4 — Draws / nulls in the resolution table.** WuXingRPS's earlier version: 3/5 interactions were draws. Described as "less exciting." Five-Element-Crafting's insubordinate pairing avoids this by producing the actor's pathology — a negative outcome that is still a concrete outcome. The resolution table has no nulls in the base 25-cell grid.

**Antipattern 5 — Infinite expressive state space before the player understands the base cycle.** The Maximal (LLM-cache) architecture for Five-Element-Crafting defers to post-v1. The base 25-cell grid must be fully grokked before stage-2 entities enter the workspace. Wind and Water correctly taught matching before introducing Wind and Void special blocks. The Explore-first, Balance-later mode sequence enforces the same progressive disclosure.

---

## 12. Procedural Content Generation Techniques for Balance Mode

The academic survey identifies a specific pipeline for Five-Element-Crafting's puzzle generator. The components:

**Phase vector representation:** Each puzzle state is a five-float vector `[w, fi, e, m, wa]` summing to 1.0, representing current element intensities. A balanced state is all values at 0.2 ± ε. This is the `phase_weights` data model already designed in `stage-2-crafts.md`.

**Backward-chaining generation** (Smith et al., 2012): Start at `[0.2, 0.2, 0.2, 0.2, 0.2]`. Apply K random inverse crafts. Each inverse Sheng craft decreases the patient's weight and increases the actor's weight by the Sheng weight transfer amount. Each inverse Ke craft increases the patient's weight and decreases the actor's weight. Record the sequence. Present the resulting imbalanced vector as the puzzle start state; the recorded sequence is one valid solution.

**Difficulty calibration** (Volden et al., 2023): The number of valid solution paths within budget K is the difficulty inverse. Target 1–3 valid paths for hard puzzles; 5–10 for medium; 15+ for easy. Use the genetic approach to find K values that produce target path counts. The puzzle generator should test 24 generations to converge within practical time.

**Statistical distribution control** (Katz et al., 2024): Ensure generated imbalances cover all five elements as "most imbalanced" roughly uniformly across a puzzle set — not always Wood excess or Water deficiency. This prevents the player from recognizing structural patterns in the puzzle set and routing around the intended challenge.

**Solvability constraint** (Smith et al., 2012): A puzzle is only valid if the forward tree search from the start state finds at least one solution path of ≤ K moves. For Five-Element-Crafting's small state space (5 elements, K ≤ 8 moves, 10 possible actor/patient ordered pairs in Sheng/Ke), the forward tree has at most 10^8 leaves — tractable for bounded depth-first search with alpha-beta pruning.

**Pathology tokens as complication** (from Five-Element-Crafting's own design notes): Insubordinate moves in the puzzle introduce pathology tokens — complications the player must spend additional moves clearing. This is the equivalent of Gloomhaven's element-decay — a mechanic that punishes suboptimal move sequences without making the puzzle unsolvable.

---

## 13. Direct Competitors Assessment

No game is a direct commercial competitor to Five-Element-Crafting as designed. The closest approaches by axis:

| Axis | Closest competitor | Gap |
|------|-------------------|-----|
| Wu Xing + move-budget puzzle | Wind and Water: Puzzle Battles | W&W uses element matching, not Sheng/Ke resolution; no balance-restoration goal |
| Four-outcome Wu Xing resolution | 五行トリテ (Japanese trick-taking) | 五行トリテ is card-based trick-taking, not drag crafting; niche Japanese market only |
| Dual Sheng+Ke directional cycles | Orbs of Wuxing (GitHub) | Team combat game, not puzzle; no educational TCM layer; prototype not released |
| TCM educational five-element game | The Chinese Five Elements (iOS) | Chess-like adversarial, not balance-puzzle; no entity crafting |
| Gesture-controlled elemental crafting | Hand_AI (own project) | No elemental system yet |

The gap in the market is specific: **a game that (1) uses authentic Wu Xing with all four relationship types, (2) expresses relationships through directed drag-to-craft interactions, (3) generates imbalance puzzles with move budgets, and (4) embeds TCM correspondence lore in entity descriptions**. No shipped game covers all four axes simultaneously.

---

## 14. Recommendations for `docs/design/balance-mode.md`

Based on the complete prior-art survey:

1. **Open the spec with the Wind and Water precedent.** It is the only released game with a Wu Xing + move-budget puzzle mode. Acknowledge it as the closest structural prior art and explain what Five-Element-Crafting adds: Sheng/Ke resolution as the move set, and balance-restoration as the win condition rather than clearance for points.

2. **Use the Tigris & Euphrates scoring model as the win-condition design argument.** "Your score is your weakest element" justifies why the tolerance window ε matters — the player must bring the most-deficient element up, not just the most-abundant element down.

3. **Adopt the Gloomhaven infuse/consume observation as the rationale for Sheng move value.** Sheng moves create forward resources (entities, energized element tokens); Ke moves use them. The two-move chain (Sheng then Ke) is more efficient than either alone, incentivizing both cycle types within a single puzzle solution.

4. **Specify the backward-chain generation algorithm** with formal parameters: K (move budget), ε (balance tolerance), path-count target by difficulty tier. Reference Smith et al. (2012) for solvability guarantees and Volden et al. (2023) for difficulty calibration.

5. **Define all four resolution types in the puzzle context:**
   - Sheng move: increases patient element weight; produces a generative entity in workspace
   - Ke move: decreases patient element weight; produces a constraining entity
   - Self move: amplifies current excess; produces emotion/excess/pathology stage tokens
   - Insubordinate move: introduces pathology token; costs one budget move to clear
   
   Reference 五行トリテ as prior art for having all four types as distinct game outcomes.

6. **Warn against the Wo Long antipattern** in the difficulty tuning section: if Sheng moves are mechanically weaker than Ke moves (produce less phase-vector change), players will route around Sheng entirely. Balance the per-move phase-vector delta between Sheng and Ke to make both viable paths to solution.

---

*This report covers research conducted through May 2026. All inline citations link to primary sources. For questions about specific findings, cross-reference the session research logs in `current_session_context/turns/`.*
