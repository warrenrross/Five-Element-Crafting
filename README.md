# Five-Element-Crafting

A crafting game in the lineage of [Infinite Craft](https://neal.fun/infinite-craft/), but with an underlying mechanism grounded in the **Wu Xing** (Five Phases) model from Chinese medicine: Wood, Fire, Earth, Metal, Water, related by the *Sheng* (generating) and *Ke* (controlling) cycles.

## Status

Early v1 scaffold. The design docs are complete enough to implement against, and a playable vanilla-JS prototype lives in [`app/`](./app/).

Game mechanics are still being refined; gesture input (via [Hand_AI](https://github.com/warrenrross/Hand_AI)) is deferred to a later phase. The current scaffold uses mouse drag-and-drop.

To try the prototype:

```bash
cd app && python3 -m http.server 8000
```

Then open http://localhost:8000. See [`app/README.md`](./app/README.md) for what works in v1.

## The idea in one paragraph

You drag elements from a right-side **building blocks** panel onto the workspace. The element you drag is the **actor**; the element it lands on is the **patient**. The ordered pair resolves to one of four interactions — *Sheng* (generating), *Ke* (controlling), *self* (same element on itself, which reveals emotion → excess → pathology in stages), or *insubordinate* (a pairing that violates both cycles, which produces the actor's pathology). The result becomes a new usable icon on the workspace. A left-side **discoveries** panel keeps score of everything you've ever produced, but those entries are display-only — only icons you've crafted in the current session are usable.

Two modes are planned:

- **Explore** — open-ended sandbox. Ship first.
- **Balance and Harmonize** — procedurally generated imbalance puzzles. Stretch goal.

## Where to start

- [`app/`](./app/) — the v1 scaffold (vanilla JS, no build step).
- [`docs/design/`](./docs/design/) — game mechanics, the 25-cell interaction grid, mode design, UI layout notes, ratified naming, inspect copy.
- [`docs/research/`](./docs/research/) — the Wu Xing source material and the Infinite Craft architecture reference that informs the backend shape.
- [`AGENT_NOTES.md`](./AGENT_NOTES.md) — session-to-session handoff notes, matching the convention in [Hand_AI](https://github.com/warrenrross/Hand_AI) and [gesture-detect-research](https://github.com/warrenrross/gesture-detect-research).

## Related repos

- [warrenrross/Hand_AI](https://github.com/warrenrross/Hand_AI) — gesture input layer. Eventual input source for this game.
- [warrenrross/gesture-detect-research](https://github.com/warrenrross/gesture-detect-research) — research on the next-generation gesture classifier.

## License

MIT. See [`LICENSE`](./LICENSE).
