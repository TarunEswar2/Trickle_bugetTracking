# Mockup tests (Playwright, Chromium)
Run from `archive/session-workfiles/mockup16/` after `python3 build.py`. Node needs Playwright (`/opt/node-tools/node_modules/playwright` in the cloud sessions).
| File | What it does |
|---|---|
| `fuzz.js` | 60 random taps over 7 profiles plus fresh and track-only accounts; fails on NaN, undefined, page errors |
| `panel.js` | clicks every side-panel event on four profiles and checks the four tabs for NaN or undefined |
| `tips.js` | first-time tips sequence (onboarding by hand, first spend, plan) |
| `scan5.js` | scan flow with an unknown shop: amount, combined confirm, pick a category, hand-off, result |
Density: `node ../audit/density.js mockup16.html ../audit/frames15.js out.json`.
Paths inside the scripts are absolute (`/home/user/Trickle_bugetTracking/...`); edit them if the repo lives elsewhere. Screenshots go to `/tmp`; do not commit them.
