# Skill 7 — Add a UI surface

Adding a new panel, drawer, overlay, modal, or HUD element. Use this when extending the UI beyond what's already in the three-panel frame.

## Touchpoints

- `app/index.html` — DOM markup
- `app/src/styles/main.css` — desktop + mobile styles
- `app/src/ui/<new-module>.js` — surface-specific logic
- `app/src/main.js` — initialization + mode wiring
- `docs/design/ui-layout.md` — design source of truth; update first

## Procedure

### 1. Update the design doc first

Add the surface to `docs/design/ui-layout.md`. Specify:

- What it shows
- What triggers it (mode entry, click, keyboard, drag)
- How it dismisses (Escape, backdrop click, explicit button)
- How it behaves at the 600px mobile breakpoint
- Whether it's mode-specific (Explore-only, Balance-only, both)

Do not skip this step. The UI is small enough that the design doc is still the right place to think about a new surface.

### 2. Mount the DOM

Add the markup in `app/index.html` near related surfaces. For overlays and modals, follow the existing pattern:

```html
<div id="my-modal" class="modal hidden" role="dialog" aria-labelledby="my-modal-title">
  <div class="modal-body">
    <h3 id="my-modal-title">Title</h3>
    <p>Description.</p>
    <div class="modal-actions">
      <button id="my-confirm" type="button">Confirm</button>
      <button id="my-cancel" type="button">Cancel</button>
    </div>
  </div>
</div>
```

The `hidden` class is toggled by JS. The modal pattern includes backdrop dismiss and Escape-key dismiss — see `wireResetButton()` in `main.js` for the canonical implementation.

### 3. Style at desktop and mobile

In `main.css`, define the surface's desktop layout first, then any 600px breakpoint overrides:

```css
.my-surface { /* desktop */ }

@media (max-width: 600px) {
  .my-surface { /* mobile overrides */ }
}
```

Test at 320, 375, 600, and 1280px (see [skill 6](./06-mobile-and-touch.md)).

### 4. Write the module

New UI logic goes in `app/src/ui/<name>.js`. Pattern:

```js
/**
 * <name>.js — one-line description.
 *
 * Longer description of what this surface does and how it's
 * triggered. Reference docs/design/ui-layout.md §X.
 */

export function initMySurface(opts = {}) {
  // Cache DOM references
  const el = document.getElementById("my-surface");
  // Wire events
  // Expose a small API the rest of the app can call
}

export function showMySurface(data) { ... }
export function hideMySurface() { ... }
```

Keep the module's surface area small. Expose only the functions `main.js` needs.

### 5. Wire it from `main.js`

```js
import { initMySurface } from "./ui/my-surface.js";

// In main():
initMySurface({
  onSomething: (...) => { ... },
});
```

If the surface is mode-specific, also wire mode transitions in `setMode()`:

```js
if (mode === "balance") {
  showMySurface();
} else {
  hideMySurface();
}
```

### 6. Decide on Reset behavior

Will `resetGame()` need to clear or hide your surface? If so, add it to the `resetGame()` function in `main.js`. See [skill 10](./10-agent-notes.md) for what to note about the decision.

### 7. Smoke test

Both desktop and mobile, both modes if the surface isn't mode-specific. See [skill 5](./05-headless-smoke-test.md) and [skill 6](./06-mobile-and-touch.md).

## Gotchas

- **Don't add another absolute-positioned button to `position: absolute; top: 16px; right: 16px;`** without offsetting it. The Clear and Reset buttons are stacked horizontally with explicit right offsets — follow that pattern.
- **The inspect drawer is the only "slide-in" surface.** Modals are centered and have backdrops; drawers slide. Don't mix idioms — pick one for your new surface and look at `inspect.js` or the modal CSS in `main.css` for the existing patterns.
- **Z-index discipline matters.** The current stacking order is:
  - 1: workspace background
  - 2: pentagram SVG
  - 3: workspace entities
  - 4: catastrophe overlay
  - 5: HUD chrome (balance-hud, mode-toggle, buttons)
  - 6: nudge labels
  - 10: inspect drawer
  - 20: modals
  - 9999: touch-drag ghost (always on top)
- **Mode-specific surfaces must hide cleanly on mode exit.** Test by entering the mode, opening the surface, exiting the mode. The surface must not bleed into the other mode.
- **Accessibility:** modals need `role="dialog"`, `aria-labelledby`, focus trap on open, focus restore on close, and Escape dismiss. The Clear/Reset modals don't yet have a focus trap — note this as a known issue if you copy the pattern.

## Related

- [skill 6](./06-mobile-and-touch.md) — mobile testing
- [skill 11](./11-add-mechanic.md) — when the surface introduces new game mechanics
