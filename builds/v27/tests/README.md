# v27 tests (Playwright, Chromium)
Run from `builds/v27/` after `python3 build.py`. Node needs Playwright (`/opt/node-tools/node_modules/playwright` in the cloud sessions). Paths are relative to this folder.

| File | What it does |
|---|---|
| `scenarios.js` | One scenario per money rule; prints PASS or FAIL with the numbers |
| `model.js` | 150 random actions on each of 7 starting points; after every action it checks the money arithmetic. `SEED=n node tests/model.js` |
| `fuzz.js` | Random taps over the profiles; fails on NaN, undefined or page errors |
| `panel.js` | Clicks every side-panel event and checks the tabs |
| `tips.js` | The first-time tips sequence |
| `scan5.js` | The scan flow with an unknown shop |
