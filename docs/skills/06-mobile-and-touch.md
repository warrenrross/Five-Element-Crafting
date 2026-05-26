# Skill 6 — Mobile and touch testing

How to exercise the touch-drag path and the mobile breakpoints. Use this after any change to drag-drop, layout, or HUD chrome.

## Touchpoints

- `app/src/ui/touch-drag.js` — Pointer Events drag-drop module
- `app/src/ui/workspace.js` — `dispatchPhaseDrop`, `dispatchEntityDrop`, `dispatchPathologyDrop`
- `app/src/ui/phase-panel.js`, `workspace.js` — wire `makeTouchDraggable()` onto each source element
- `app/src/styles/main.css` — `.touch-drag-ghost`, `.dragging`, the 600px breakpoint
- `app/index.html` — `<meta name="viewport">` settings

## How the touch path works

The native HTML5 drag-and-drop API does not fire on touchscreens. We work around this with a Pointer Events layer that runs alongside (not in place of) the desktop drag-drop:

1. `makeTouchDraggable(el, opts)` attaches `pointerdown` to a source element.
2. After a 6px move or a 180ms long-press, it arms a drag: a ghost clone follows the finger, `.drop-target` is applied to whatever's underneath via `document.elementFromPoint()`.
3. On `pointerup`, `opts.dispatch(payload, { clientX, clientY, targetEl })` is called.
4. The dispatcher (defined in `workspace.js`) mirrors the desktop drop handlers' business logic, so no behavior is duplicated.

Mouse pointers are filtered out (`touchOnly: true` by default) so the native HTML5 drag-drop keeps owning mouse.

## Procedure

### 1. Visual check at multiple widths

Open the local server (see [skill 1](./01-local-dev-loop.md)). In Chrome DevTools device-toolbar, cycle through:

- 320px (smallest common phone, iPhone SE)
- 375px (iPhone 13 mini, common reference)
- 414px (iPhone 14 Plus)
- 600px (the breakpoint itself)
- 1280px (desktop baseline)

Look for:

- HUD chrome (mode-toggle, Reset, Clear) overlapping the right phase rail
- Pentagram + balance HUD chrome overlapping each other in Balance mode
- Phase tiles too small to tap reliably (target: 44×44pt minimum)
- Text wrapping breaking mid-word in the inspect drawer or end overlay

### 2. Headless touch smoke test

Playwright doesn't auto-synthesize Pointer Events from `touchscreen.tap()`. Dispatch them manually:

```js
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 ...) Mobile/15E148 Safari/604.1',
});
const p = await ctx.newPage();
await p.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle' });

// Touch-drag a phase tile onto the workspace
await p.evaluate(() => {
  function firePtr(type, x, y, target) {
    target.dispatchEvent(new PointerEvent(type, {
      pointerType: 'touch', clientX: x, clientY: y,
      bubbles: true, cancelable: true, isPrimary: true,
    }));
  }
  function fireWinPtr(type, x, y) {
    window.dispatchEvent(new PointerEvent(type, {
      pointerType: 'touch', clientX: x, clientY: y,
      bubbles: true, cancelable: true, isPrimary: true,
    }));
  }
  const tile = document.querySelector('#phase-tiles [data-phase="wood"]');
  const r = tile.getBoundingClientRect();
  const sx = r.left + r.width / 2, sy = r.top + r.height / 2;
  const ex = 200, ey = 400;
  firePtr('pointerdown', sx, sy, tile);
  fireWinPtr('pointermove', sx + 20, sy + 20);
  fireWinPtr('pointermove', ex, ey);
  fireWinPtr('pointerup', ex, ey);
});

await p.waitForTimeout(400);
console.log('ws entities:', await p.locator('#workspace-entities .workspace-entity').count());
```

A touch-drag from phase tile to workspace should produce one entity.

A touch-drag from one workspace entity to another should run a craft (decrementing budget in Balance mode, ticking the discoveries counter in Explore mode).

### 3. Verify the desktop path still works

Always smoke-test the desktop drag-drop in a separate, non-touch context after touch changes. The coexistence is fragile — if `touchOnly` ever flips to `false` accidentally, both paths will fire and you'll get double-crafts.

## Gotchas

- **`document.elementFromPoint()` returns the ghost itself unless you hide it.** The touch-drag module hides the ghost (`visibility: hidden`) before each `elementFromPoint` call, then restores it. Don't break that pattern when extending.
- **`body.touchAction = "none"` during a drag is required** to stop iOS from scrolling the page underneath. The module sets and restores it; if a drag is cancelled by an exception, the body stays unscrollable. Wrap any future extensions in try/finally.
- **The 6px move threshold is intentional.** Touch users have unsteady fingers — a plain tap easily moves 2-3px. Don't lower the threshold without testing taps still work on shift-click and the click-to-spawn affordance.
- **Long-press (180ms) is shorter than iOS's text-callout timer** so we win the gesture before the OS shows the copy/paste menu. If you raise this above 250ms, the callout will start to leak through.
- **The viewport meta has `maximum-scale=1`** to block pinch-zoom on double-tap during multi-finger drags. This also disables manual zoom, which is an accessibility tradeoff. Note in `open-questions.md` if a user reports trouble.

## Related

- [skill 1](./01-local-dev-loop.md) — the basic dev loop
- [skill 5](./05-headless-smoke-test.md) — desktop smoke test variant
- [skill 7](./07-add-ui-surface.md) — when adding a new draggable surface
