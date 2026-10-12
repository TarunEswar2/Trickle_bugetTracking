# v27 → Figma export

**Result:** Figma file https://www.figma.com/design/b9MRkClYToyPjpMcDaPbeT, page **"v27 · all screens"**. 108 frames in 13 sections, every layer editable (frames, text in Manrope, vectors; no screenshots).

| Section | Frames |
|---|---|
| 01 Onboarding | 7 |
| 02 Home (six demo profiles + after onboarding) | 7 |
| 03 Pay a spend | 8 |
| 04 Add income | 3 |
| 05 Spending | 6 |
| 06 Savings and goals | 8 |
| 07 Insights | 5 |
| 08 Settings, restart, subscriptions | 12 |
| 09 Messages and toasts | 7 |
| 10 Prompts and asks | 15 |
| 11 Tips (coach marks) | 14 |
| 12 Widgets | 2 |
| 13 Cards and components | 14 |

## Files
- `frames27.js`: every state to capture (a setup string each). Add a state here, then re-run.
- `extract.js`: runs in the page; turns the DOM into a compact tree (boxes, text, SVG).
- `pack.js`: shares fills, shadows and text styles inside a frame.
- `cap27.js`: `python3 ../build.py`, then `node cap27.js [id,id]` writes `captured27.json` (it merges, so a partial run keeps the rest) and screenshots to `/tmp/claude-0/v27/fig`.
- `builder27.js` + `inflate.js`: the code that builds the tree in Figma. It is stored once in a hidden text layer named `HELPER_SRC` on the Figma page, so each later call only carries data.
- `mk27d.js id,id,...`: writes `call27_N.js` files, each a small paste-able `use_figma` call (data as plain JSON with a checksum). The old compressed route (`mk27.js`, `mk27b.js`, `mk27c.js`) is kept but unreliable to paste by hand: base64 got altered in transit.

## How the frames are made
- Full screens are built as absolutely positioned frames, text and vectors (not auto-layout).
- **Overlay frames** (asks, tips, toasts, sheets over Home) clone the Home frame already in Figma and add only the overlay layers. This keeps the data small and the underlay editable.
- **Component frames** (section 13) are single elements cut out of the app, on a dark background.

## Known gaps
- No auto-layout and no Figma components or variants yet. Section 13 is a visual kit, not a component library.
- The striped "subscriptions" piece in the onboarding picture is a solid colour.
- Text wraps by the width measured in a headless browser, so a few multi-line texts can differ slightly in Figma's Manrope.
- Only the screens listed here. Other states (every profile on every tab) are not included.
- Page 1 still has the v14 export and the first single-screen export "v27 · 01 Onboarding · Picture"; `01 Onboarding` on the new page replaces it.
