# Mockup → Figma export (Night mockup)

Figma file: https://www.figma.com/design/b9MRkClYToyPjpMcDaPbeT (Page 1, 13 sections, 86 frames).

How it works: `cap.js` drives the built Night mockup (`../mockup/mockup.html`) with Playwright, sets each state listed in
`frames.js`, and `extract.js` walks the DOM into a compact tree (boxes, text, 10x10 grids, SVG). `pack.js` dedupes styles.
`mkcall.js N` writes `call.js` (builder + data for batch N) which is pasted into the Figma `use_figma` tool.
Output is plain editable frames, text, rectangles and vectors (no auto-layout or components yet).
Fonts: Bricolage Grotesque and Figtree. Run `node cap.js` from a folder that holds these files plus a `shots/` dir.

## Update: bare-minimum mode (B-9…B-15)
The Figma file now has 15 sections: `01 Onboarding` was replaced (24 frames: every step skippable, short questions, "Just start tracking", no-balance path),
`14 Pop-ups` (11 ask cards over the track-mode Home) and `15 Track mode` (10 screens) were added. Sources: `frames2.js` (states), `mkcall2.js`
(pop-up cards are cloned from the first frame and only the card is rebuilt, which keeps each call under the 50k limit). `extract.js` now keeps the
underlying screen when the open pop-up is an ask card (`UI.popup.id==='ask'`). To rerun: copy these into a folder with `shots/`, change `cap.js` to read `frames2.js`, run `node cap.js`, then `node mkcall2.js`.
