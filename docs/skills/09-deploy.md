# Skill 9 — Deploy to GitHub Pages

Publish changes to the live site at [warrenrross.github.io/Five-Element-Crafting](https://warrenrross.github.io/Five-Element-Crafting/).

## Touchpoints

- `app/` — what gets served
- `index.html` at repo root — meta-refresh redirect to `/app/`
- GitHub Pages configuration on the repo

## How the deploy works

The app is fully static — no build step, no server-side logic. GitHub Pages serves the repo root on `main`. The root `index.html` is a one-line meta-refresh redirect to `/app/`, where the real entry point lives. This is because GitHub Pages only supports `/` or `/docs` as the source path, not arbitrary subdirectories.

When you push to `main`, Pages rebuilds automatically and the live site updates in ~30-60 seconds.

## Procedure

### 1. Pre-flight checks

- [ ] Local smoke test passes (see [skill 5](./05-headless-smoke-test.md))
- [ ] Mobile smoke test passes (see [skill 6](./06-mobile-and-touch.md))
- [ ] No console errors in dev tools at the relevant viewport widths
- [ ] No commits with `console.log()` or `debugger;` left over

### 2. Commit and push

```bash
git status                    # what's changed
git diff                      # any noise?
git add -A
git -c user.email="warren.r.ross@gmail.com" -c user.name="Warren Ross" commit -m "<descriptive message>"
git push origin main
```

Commit messages should:

- Start with a verb in imperative ("Add", "Fix", "Refactor")
- Explain *why*, not just *what*
- Reference the relevant skill or design doc section if non-obvious

### 3. Wait for Pages to rebuild

Poll the status:

```bash
gh api /repos/warrenrross/Five-Element-Crafting/pages | jq .status
```

Wait until it returns `"built"`. Usually 30-60 seconds.

### 4. Verify live

```bash
curl -sL https://warrenrross.github.io/Five-Element-Crafting/ -o /dev/null -w "%{http_code}\n"
curl -sL https://warrenrross.github.io/Five-Element-Crafting/app/ -o /dev/null -w "%{http_code}\n"
curl -sL https://warrenrross.github.io/Five-Element-Crafting/app/src/data/entities.json -o /dev/null -w "%{http_code}\n"
```

All three should return `200`. Visit the live URL and do a 30-second sanity check: load, toggle Balance, do one craft, click Reset.

## First-time Pages enable

If Pages isn't yet enabled on a fork or new clone:

```bash
gh api -X POST /repos/<owner>/<repo>/pages \
  -f 'source[branch]=main' \
  -f 'source[path]=/'
```

`source[path]` must be `/` or `/docs`. The root-level `index.html` redirect handles the `/app/` indirection.

## Rollback

```bash
git revert <bad-sha>
git push origin main
```

Pages will rebuild from the reverted state in another 30-60 seconds. There is no faster way — Pages doesn't support point-in-time pinning.

## Gotchas

- **Pages caches aggressively.** A user who visited recently may still see the old version for up to an hour even after Pages rebuilds. Add a cache-busting query parameter (e.g. `?v=2`) to the entry URL when you need to force a refresh for testing.
- **Don't push a broken main.** There's no preview or staging — main is production. If you're unsure, branch off and PR.
- **The `gh` CLI uses the `github` API credential preset**, not your local `~/.config/gh` token. Use `api_credentials=["github"]` in any bash tool call that needs `gh`.
- **404 on a JSON file post-deploy** = check that the file is committed AND not gitignored. `.gitignore` doesn't apply to the live site, but if a file isn't in the commit, Pages won't serve it.
- **The 30-second rebuild window is empirical.** Sometimes Pages takes 5+ minutes (during GitHub maintenance, for example). If it's been longer than 10 minutes, check [GitHub's status page](https://www.githubstatus.com/).

## Related

- [skill 5](./05-headless-smoke-test.md) — pre-flight
- [skill 10](./10-agent-notes.md) — log the deploy in AGENT_NOTES if it included anything noteworthy
