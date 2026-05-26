# Skill 1 — Local dev loop

The minimum setup to edit the app, see changes, and iterate.

## Touchpoints

- `app/index.html`, `app/src/**/*.js`, `app/src/styles/main.css`, `app/src/data/*.json`

## Procedure

### 1. Serve the app

The app uses ES modules and `fetch()` for its JSON data, so `file://` will not work. From the repo root:

```bash
cd app && python3 -m http.server 8000
```

Any static server is fine (`npx serve`, `caddy file-server`, etc.). There is no build step.

Open `http://localhost:8000`.

### 2. Edit, save, hard-refresh

The browser caches ES modules aggressively. After saving a `.js` file, do a **hard refresh** (Cmd/Ctrl + Shift + R) — a normal reload will silently serve stale code and give you misleading bugs.

### 3. Inspect state via the browser console

Helpful one-liners:

```js
// What's in the discovery ledger?
JSON.parse(localStorage.getItem("fec.discoveries.v1"))

// Wipe discoveries and reload
localStorage.removeItem("fec.discoveries.v1"); location.reload();

// Force-reveal everything (testing)
import("./src/engine/recipes.js").then(m => {
  for (const e of m.allEntities()) m.recordDiscovery(e.id);
  location.reload();
});
```

The Reset button in the workspace header does the same thing more cleanly — see `wireResetButton()` in `main.js`.

### 4. Check the console on every change

The app fails loud: data load errors and unhandled rejections surface as a red banner via `showFatal()` in `main.js`. If a change broke loading, the banner will tell you which file or fetch failed.

### 5. Stop the server

```bash
# Either Ctrl-C the foreground process, or:
kill $(cat /tmp/fec-server.pid) 2>/dev/null
```

## Gotchas

- **Module imports must use relative paths with `.js` extensions.** `import "./engine/recipes"` will fail in a browser; you need `./engine/recipes.js`.
- **JSON edits don't need a refresh of the *page* — they need a refresh of *fetch*.** `fetch()` caches aggressively too. Hard-refresh always.
- **`localStorage` is per-origin.** If you serve on port 8000 sometimes and 8765 others, you'll have separate discovery ledgers. Pick a port and stick with it for a given session.
- **The 600px breakpoint** in `main.css` is significant. If your edit looks fine at 1280px, also check at 600px and below. See [skill 6](./06-mobile-and-touch.md).

## Related

- [skill 5](./05-headless-smoke-test.md) for a no-mouse test loop
- [skill 6](./06-mobile-and-touch.md) for testing the touch path
