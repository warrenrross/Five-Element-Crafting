# UI Layout

The v1 visual surface. Three-panel layout cloned from Open Craft (Vue + Mistral, YouTube `aqrPOPq1kP0`) — used as reference only, not as a code dependency — with the overrides locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) and the move-type requirement raised by [`balance-mode.md`](./balance-mode.md) §15.4.

## 1. The three-panel frame

```
┌──────────────────────────┬───────────────────────────────────────┬──────────────────┐
│                          │                                       │                  │
│   LEFT: Discoveries      │   CENTER: Workspace                   │   RIGHT: Blocks  │
│   (score / dex)          │   (drag and drop area)                │   (phases only)  │
│   display-only           │   pentagram background (Balance only) │   spawn-from-here│
│                          │                                       │                  │
└──────────────────────────┴───────────────────────────────────────┴──────────────────┘
```

- **Right panel** — the only place an entity *originates*. In v1 this panel contains exactly the five phases (Wood, Fire, Earth, Metal, Water) as draggable tokens. Every workspace entity is downstream of a phase the player dragged out of this panel.
- **Center workspace** — the drag-and-drop area. Phases dragged from the right land here; entities crafted here stay here until cleared. A faint pentagram occupies the background in Balance mode; in Explore mode the background is plain.
- **Left panel** — the **discoveries** ledger. Every distinct entity the player has ever produced (in this session or across sessions, see §6) is recorded here. Display-only — items in this panel cannot be dragged to the workspace. Clicking an entry re-spawns it on the workspace (this is the only "shortcut" path; see §3.2 for why).

The frame is symmetric in width by default. The center workspace expands or contracts based on viewport; the side panels keep fixed widths until the viewport drops below the mobile breakpoint (see §7).

## 2. Right panel — Blocks

### 2.1 What appears

Five entries only in v1: Wood, Fire, Earth, Metal, Water.

That is the entire right panel. Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §UI-1. Stage-1 results (Kindling, Roots, etc.) and everything downstream do **not** appear here — they live in the left panel as discoveries, and the only way to use them in the workspace is to either craft them again or click-respawn from the left panel.

Reason: the right panel doubles as the player's mental model of "what the game is made of." Five things, arranged in pentagram order. Anything richer (a tabbed inventory, a search bar, a category tree) defeats the predict-your-next-drag principle by inviting the player to *plan* rather than *try*.

### 2.2 Visual

Five large square tiles, one per phase. Each tile shows:

- The phase emoji (🌳 🔥 🟫 ⚙️ 💧) at large size.
- The phase name beneath the emoji in plain text.
- A faint outline keyed to a phase color (Wood = green, Fire = red, Earth = ochre, Metal = silver-gray, Water = blue). Color is decoration only — the game does not depend on color for resolution.

### 2.3 Spawn behavior

Drag from a tile in the right panel → a draggable copy of that phase appears on the workspace under the cursor. The source tile remains in the panel and is immediately re-grabbable. There is no inventory count.

### 2.4 Order

Pentagram order, top to bottom: Wood, Fire, Earth, Metal, Water. This matches the Sheng cycle read clockwise around the classical pentagram and matches the order used in every preceding doc. It is the order the player will internalize.

## 3. Center workspace

### 3.1 Free placement

Entities can be placed anywhere on the workspace. There is no snap grid in v1. Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §UI-3.

Reason: predict-your-next-drag relies on the player being able to set up "I will drop X onto Y" geometrically. Snap grids force pre-arranged columns that don't track the player's actual intent.

### 3.2 Drag-onto-entity = craft

Dropping one workspace entity onto another resolves the recipe table:

1. The dragged entity is the **actor**.
2. The entity being dropped onto is the **patient**.
3. The recipe table is queried for `(actor.id, patient.id)`.
4. If a match is found: a small craft animation fires (see §3.3), the actor and patient are removed, and the result entity appears in their place. The result is added to the discoveries ledger if it is new this session.
5. If no match: the actor snaps back to its previous position (see §3.4 for the close-to-recipe nudge).

### 3.3 Craft animation — move-type distinction

The four move types must be visually distinguishable at craft time, per [`balance-mode.md`](./balance-mode.md) §15.4. The player has to be able to read "what kind of move did I just make?" without opening inspect.

Locked icon vocabulary (consistent across Explore and Balance):

| Move type | Vocabulary | Animation cue | Color cue |
|---|---|---|---|
| Sheng | **Infuse** | The actor pulses outward into the patient; result appears with a brief upward shimmer. | Green halo (Wood's tint, the cycle's starting color) |
| Ke | **Consume** | The actor contracts and is drawn into the patient; result appears with a brief downward press. | Red halo (Fire's tint, the controlling color) |
| Self | **Concentrate** | Actor and patient overlap and brighten; result appears in-place with a held glow. | Gold halo (intensity color) |
| Insub | **Disturb** | Actor and patient flicker against each other; result appears with a brief shake. | Purple halo (the off-cycle color) |

These cues are the *only* place color does semantic work in the game. Everywhere else color is decoration.

### 3.4 Snap-back + close-to-recipe nudge

When a craft has no match in the table, the actor returns to its prior position with a quick easing animation (~150ms). For the first three nulls of a session, a small inline label appears under the actor for ~1s reading "no recipe — try a different patient." After three, the label stops appearing. Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q2.

Reason: the first three nudges teach the player that nulls exist. After that, the player has internalized the model and the nudges become noise.

### 3.5 Pentagram background

In Balance mode only, the workspace background shows a faint pentagram with the five phases marked at the vertices. The pentagram dynamically reflects the workspace's current `phase_weights` totals — each vertex's fill level shows that phase's contribution to the workspace.

In Explore mode the pentagram is hidden. Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §UI-6.

Reason: the pentagram readout is the *win signal* for Balance and the *score signal* for Harmonize. Exposing it in Explore mode invites the player to optimize when the design intent is to encourage open exploration.

### 3.6 Catastrophe lockout

When a Storm × Storm catastrophe is produced (Firestorm, Sandstorm, etc., per [`stage-2-crafts.md`](./stage-2-crafts.md) §5), the workspace briefly locks for ~2s with a tinted overlay matching the catastrophe's dominant phases. The catastrophe entity appears at the center of the workspace; no other crafts are accepted during the lockout. Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q3-tail.

In Balance mode the catastrophe production rules differ — see [`balance-mode.md`](./balance-mode.md) §10. Briefly: catastrophes are forbidden moves; attempting one burns the move and adds a Disturb token.

### 3.7 Clear behavior

The workspace can be cleared via a small "Clear" button in the workspace corner. Tapping it brings up a one-second confirmation modal ("Clear workspace? — Confirm / Cancel"). Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §UI-7.

A long-press on the workspace background (~500ms) triggers the same modal as an alternative on touch devices.

Reason: clearing is destructive (you lose your laid-out plan), but routine enough that hiding it in a menu would be annoying. The confirm makes accidental clears recoverable.

## 4. Left panel — Discoveries

### 4.1 Layout

The discoveries panel is grouped by element class, with a header per group:

- **Phases** — the 5 phase tokens (always full once the player has dragged any one out).
- **Sheng** — the 5 stage-1 Sheng results.
- **Ke** — the 5 stage-1 Ke results.
- **Feelings** — the 5 stage-1 self-craft Feelings.
- **Surges** — the 5 stage-2 self-craft Surges.
- **Storms** — the 5 stage-3 self-craft Storms.
- **Insubordinate** — the 10 insubordinate cells.
- **Stage-2 entities** — collapsible groups for Sheng×Sheng, Ke×Ke, Sheng×Ke, Mixed bridges, Refined variants, Catastrophes.

Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §UI-2.

### 4.2 Locked silhouettes

Entries not yet discovered render as a gray silhouette of the entity's icon shape (no name, no emoji). Discovered entries show their full icon and name. Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §UI-2.

Reason: the player can *count* how many entities in each class remain undiscovered without knowing what they are. This produces the right kind of curiosity (which gap to chase next?) without spoiling the contents.

### 4.3 Hover tooltip

Hovering over a discovered entry shows a tooltip with the entity's name and surface lore string (per [`inspect-copy.md`](./inspect-copy.md)). Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §UI-5.

Click opens the full inspect panel (see §5).

### 4.4 Click-respawn

Clicking a discovered entry in the left panel spawns a copy of it at the center of the workspace. This is the *only* affordance that lets the player re-introduce a non-phase entity to the workspace without re-crafting it. Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §UI-8.

Reason: re-crafting a deep stage-2 entity from phases is a five-step minimum. After the player has discovered it once, that long path is no longer informative. Click-respawn keeps puzzles solvable without flattening the early-game tension.

### 4.5 Counter / dex behavior

Each discovered entry shows a small badge with the number of times the player has crafted it (across sessions). No badge for entries discovered exactly once. Counters persist via localStorage. Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q7.

## 5. Inspect panel

### 5.1 Surface

A side drawer that slides in from the right (occluding the right panel) when the player clicks a discoveries entry or a workspace entity. Shows the entity's full inspect copy block ([`inspect-copy.md`](./inspect-copy.md)):

- Icon and name at the top.
- True name (clinical / pattern phrase) in small text below the name.
- **Surface** — the one-sentence summary.
- **Reading** — the 2–3 sentence expanded explanation, with inline links to citations.
- **Recipes** — a section listing the ordered pairs that produce this entity (if any), and the ordered pairs *this entity* can act in (as actor or patient) if those pairs have been discovered. Undiscovered pairs render as silhouettes per §4.2.

### 5.2 v1 vs. v2

In v1 the inspect drawer can be opened only from the left panel or by clicking an entity on the workspace. The hover tooltip on the workspace is read-only (it shows the name only — full inspect requires a click). Locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §UI-5: tooltip in v1, drawer in v2 is the longer path; for v1 the drawer is the only inspect surface, accessible by click.

### 5.3 Close

Click outside the drawer, hit Escape, or click the drawer's own close affordance.

## 6. Persistence

### 6.1 What persists

Across sessions (localStorage in v1, accountless):

- **Discoveries ledger** — every entity the player has ever produced.
- **Discovery counts** — per §4.5.
- **First-discovery timestamps** — for an eventual "first discovered on X" line in the inspect panel (deferred to v2).

What does **not** persist:

- The workspace contents. Closing the tab clears the workspace. (v2 may save an in-progress workspace; v1 does not.)
- The current Feeling charge (per [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §Q4: Feelings are session-scoped operators).
- Balance mode puzzle state — each Balance puzzle is fresh per session start.

### 6.2 Reset

A small "Reset discoveries" affordance lives in a settings drawer (not on the main UI). Triggers a confirm modal listing exactly what will be cleared. Locked behavior, not yet a v1 priority — can ship in v1.1.

## 7. Mobile

Mobile uses the same three-panel layout, with these adjustments:

- **Panel widths shrink proportionally** until the viewport hits ~600px wide.
- **Below 600px** — the side panels collapse into bottom-sheet drawers, each opened by a tab at the screen edge. The workspace fills the screen between.
- **Touch craft target** is larger than mouse (~64px effective hit area vs. ~48px) — locked in [`decisions-for-richest-play.md`](./decisions-for-richest-play.md) §UI-9.
- **No hover.** Tooltips are replaced by long-press preview (~300ms hold shows the surface lore line; release closes).
- **Pentagram readout** in Balance mode shrinks proportionally with the workspace; vertex labels collapse to single letters (W F E M Wa for clarity vs. Water).

The pentagram readout's vertex labels are the only place mobile diverges from desktop in *content*; everything else is just layout.

## 8. Modes — Explore vs. Balance

### 8.1 Mode switcher

A small toggle in the top corner of the workspace. Two states:

- **Explore** — default. No win/lose. No pentagram readout. No move budget. The discoveries ledger is the only progression surface. This is the mode v1 ships first; Balance mode comes online once balance-mode.md's PCG pipeline is implemented.
- **Balance** — the puzzle mode per [`balance-mode.md`](./balance-mode.md). Pentagram readout visible. Move-budget counter visible in the workspace's top edge. Pathology-token counter visible alongside.

### 8.2 What stays consistent

The four move-type cues (§3.3) are identical across both modes. The discoveries ledger (left panel) is identical across both modes. The right panel (phases) is identical across both modes.

### 8.3 What differs

Only the workspace itself changes between modes:

| Element | Explore | Balance |
|---|---|---|
| Pentagram background | Hidden | Visible, dynamic |
| Move-budget counter | Hidden | Visible (K remaining) |
| Pathology counter | Hidden | Visible (Disturb tokens 0–3) |
| Catastrophe production | Allowed, ~2s lockout | Forbidden, burns move + Disturb token |
| Snap-back nudge | First three nulls show label | All nulls show label (puzzle clarity matters more here) |
| Win/lose state | None | Win at `min(phase_weights) ≥ 0.2 − ε`; lose at K=0 or Disturb=3 |

## 9. v1 implementation order

In order of build:

1. **Right panel + workspace + craft loop.** Player can drag phases out, drop them on each other, and stage-1 results appear. Recipe table consumed from a flat JSON.
2. **Left panel + discoveries ledger.** Discoveries record. Silhouettes for undiscovered.
3. **Move-type cues** (§3.3) on the craft animation. The four halos must be in from the start — they teach the player the resolution model implicitly.
4. **Inspect panel.** Click-from-left-panel and click-from-workspace. Full inspect copy.
5. **Click-respawn from discoveries.** Player can re-introduce discovered entities.
6. **Stage-2 crafts.** Recipe table grows to all 85 entities.
7. **Mobile breakpoint** and touch-target sizing.
8. **Persistence** (discoveries + counts via localStorage).
9. **Mode switcher + pentagram readout** — the seam between Explore (shipped) and Balance (forthcoming).

After step 9, Balance mode plugs in as a PCG pipeline behind the mode toggle — see [`balance-mode.md`](./balance-mode.md) §8.

## 10. What this doc does not cover

- **Specific pixel sizes, font choices, or color hex values.** Those live in the implementation, not this design doc. The doc fixes affordances and information architecture; the implementation picks the visual style.
- **The PCG pipeline** for Balance mode — see [`balance-mode.md`](./balance-mode.md) §§7–8.
- **Inspect copy strings themselves** — see [`inspect-copy.md`](./inspect-copy.md).
- **Recipe lookup format** — see [`stage-2-crafts.md`](./stage-2-crafts.md) §8.

## 11. Open questions tail

- **Discoveries-panel sort within a group.** Currently implicit: discovery order. Worth testing alphabetical, or grouped by which phase the entity is heaviest in, once the panel is populated past ~30 entries.
- **Feeling-charge indicator.** Where does the visible "I have a Feeling primed for the next craft" cue live? Candidates: a small badge on the charged entity in the workspace; a banner along the workspace top. Defer to first build — the cue has to work but its exact placement is taste-driven.
- **Animation timing.** All durations above (150ms snap-back, 2s catastrophe lockout, 300ms long-press) are placeholders for playtest tuning.
- **Reduced-motion fallback.** The §3.3 craft cues all use motion. A reduced-motion setting should fall back to color-and-position cues only, with no animation. Implementation TBD.

See [`../../AGENT_NOTES.md`](../../AGENT_NOTES.md) for the running session log.
