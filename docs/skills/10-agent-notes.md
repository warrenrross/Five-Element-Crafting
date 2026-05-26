# Skill 10 — AGENT_NOTES handoff

`AGENT_NOTES.md` is the session-to-session memory of the project. Every working session ends with an entry. This is the single biggest force multiplier for future-you (or another contributor).

The convention matches [Hand_AI](https://github.com/warrenrross/Hand_AI) and [gesture-detect-research](https://github.com/warrenrross/gesture-detect-research).

## Touchpoints

- `AGENT_NOTES.md` at repo root

## Structure of an entry

Each entry starts with a date heading and a one-line summary:

```markdown
## 2026-05-26 (latest+1) — Balance mode landed, mobile pass, Pages deploy
```

The `(latest+1)` qualifier disambiguates multiple sessions in the same day. The newest entry sits at the top. Older entries stay; do not edit them retroactively except for clear typos.

The entry body has three sections:

### 1. Shipped this session

A numbered list of concrete things that changed. Each item:

- Names the file(s) or module(s) touched.
- Summarizes the behavior change in one or two sentences.
- References the design doc section that informed the change.

Example:

> 1. **Balance mode is now implemented in the scaffold.** New engine modules `app/src/engine/balance.js` (BalanceSession class, phase deltas, scoring, win/lose checks, pathology clearing) and `app/src/engine/pcg.js` (backward-chain PCG with `PATH_COUNT_CAP=200`, solvability check, session histogram). [...] per spec §11 and §13.

### 2. Deferred — pending playtest

Anything you considered but explicitly chose not to do. Each deferred item explains:

- What it would take to do.
- Why you're not doing it now (usually: needs playtest first, or depends on something not yet decided).
- When to revisit.

Example:

> - **Reading-lore wiring into the inspect drawer.** `docs/design/inspect-copy.md` carries the long-form citation-rich text per entity, but v1 inspect still shows only Surface + True-name + phase-weights + recipes. Adding a `reading_lore` field on the entity JSON and rendering it as a third drawer section is a small change. We want to playtest the current inspect surface first — the predict-your-next-drag principle argues for keeping inspect lean until we see whether players actually open it during a Balance puzzle. Revisit after playtesting Balance mode end-to-end.

### 3. (Optional) Open questions raised

If the session surfaced questions that need design resolution, drop them in `docs/design/open-questions.md` and reference here. Do not let questions languish in AGENT_NOTES — that's not a parking lot for unresolved design.

## Procedure at session end

### 1. Reflect

Before opening `AGENT_NOTES.md`, list mentally:

- What did I change? (Look at `git log` for the session if you forget.)
- What did I almost change but didn't, and why?
- What did I learn about the codebase that future-me should know?

### 2. Add a top entry

```bash
# Open the file and insert a new entry at the top, below the H1 + intro paragraph.
```

Match the heading style of the most recent entry. Use `(latest+N)` if there's already a session today.

### 3. Cross-link

If your session resolved or raised an open question, also update `docs/design/open-questions.md`. If you ratified a name, update `docs/design/naming-ratification.md`. AGENT_NOTES is a log, not a substitute for the canonical docs.

### 4. Commit AGENT_NOTES separately if the rest of the session was already pushed

```bash
git -c user.email="warren.r.ross@gmail.com" -c user.name="Warren Ross" \
  commit -am "AGENT_NOTES: log session"
git push origin main
```

Or fold it into the main commit if it's all going up together.

## Gotchas

- **Don't summarize.** Be specific. "Fixed bug" tells future-you nothing. "Fixed `getDiscoveredCount()` returning 0 when called before `ensureLedger()` had been awaited" tells you everything.
- **Don't editorialize about effort.** "This was hard" is not useful to future-you. "Took three tries because the headless browser didn't expose Pointer Events synthesis" is.
- **Don't promise the next session.** "Next time I'll do X" decays. Write deferred items into the entry under section 2 with explicit revisit triggers.
- **Entries don't need to be polished prose.** Bullet lists, file paths in backticks, section refs in `§N` form. Future-you will skim, not read.

## Related

- [skill 4](./04-regenerate-data.md) — data regen sessions especially need entries (drift is silent)
- [skill 8](./08-tune-balance.md) — tuning sessions should log the playtest delta in the entry
