# Skill 5 — Headless smoke test

A no-mouse, scriptable verification loop for non-trivial changes. Use this before pushing anything that touches the engine, the workspace, or the data files.

## Touchpoints

- A local server on `127.0.0.1:8765` (or whatever port — pick one and stick with it for the session)
- [Playwright](https://playwright.dev/) — the Node.js variant

## Procedure

### 1. Start a server

```bash
cd app && (nohup python3 -m http.server 8765 --bind 127.0.0.1 > /tmp/fec-server.log 2>&1 & echo $! > /tmp/fec-server.pid)
```

### 2. Run the smoke test

The minimum smoke check verifies that (a) the page loads with no console errors, (b) the discovery counter shows the expected initial state, (c) Balance mode toggles cleanly, and (d) a representative craft succeeds.

```js
const { chromium } = require('playwright');
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', e => errs.push('pageerror: ' + e.message));
p.on('console', x => { if (x.type() === 'error') errs.push('console: ' + x.text()); });

// 1. Load
await p.goto('http://127.0.0.1:8765/?_=' + Date.now(), { waitUntil: 'networkidle' });
await p.waitForTimeout(400);
console.log('counter:', await p.locator('#discovery-counter').textContent());

// 2. Toggle Balance
await p.locator('#mode-balance').click();
await p.waitForTimeout(600);
console.log('budget:', await p.locator('#budget-counter').textContent());

// 3. Sheng craft (wood onto fire)
await p.dragAndDrop(
  '#workspace-entities .workspace-entity[data-entity-id="wood"]',
  '#workspace-entities .workspace-entity[data-entity-id="fire"]',
  { force: true }
);
await p.waitForTimeout(400);
console.log('budget after craft:', await p.locator('#budget-counter').textContent());

// 4. Errors?
console.log('errs:', errs);
await browser.close();
```

Expected output:

```
counter: 5 / 95
budget: 6 / 6
budget after craft: 5 / 6
errs: []
```

### 3. Inspect via screenshot

When something looks wrong, screenshot before reading the DOM:

```js
await p.screenshot({ path: '/tmp/smoke.png', fullPage: true });
```

Then visually compare against `screenshots/` or a known-good baseline.

### 4. Stop the server

```bash
kill $(cat /tmp/fec-server.pid) && rm /tmp/fec-server.pid
```

## Mobile variant

Same flow with a touch-capable context. The dispatch calls are different because native HTML5 `dragAndDrop` doesn't fire on touch — see [skill 6](./06-mobile-and-touch.md).

## Gotchas

- **The `?_=` cache buster on the URL matters.** Without it, Playwright may serve a stale cached version of `main.js`.
- **`networkidle` is necessary, not optional.** The data fetch is async; without waiting for idle you'll race the entity catalog load.
- **The `headless: true` browser doesn't share localStorage between contexts** but does *persist* it within a context. If your test depends on a clean ledger, create a fresh context per assertion.
- **`p.dragAndDrop()` synthesizes a desktop drag-drop.** It does NOT exercise the touch path. To smoke-test touch, dispatch Pointer Events manually (see [skill 6](./06-mobile-and-touch.md)).
- **Console errors that don't crash the page still matter.** A 404 on a JSON file will only show as `errs`, not as a thrown exception. Always read `errs` at the end.

## Related

- [skill 1](./01-local-dev-loop.md) — the manual loop
- [skill 6](./06-mobile-and-touch.md) — touch-specific smoke tests
