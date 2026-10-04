# Mockup → Figma export (Night mockup)

Figma file: https://www.figma.com/design/b9MRkClYToyPjpMcDaPbeT (Page 1, 13 sections, 86 frames).

How it works: `cap.js` drives the built Night mockup (`../mockup/mockup.html`) with Playwright, sets each state listed in
`frames.js`, and `extract.js` walks the DOM into a compact tree (boxes, text, 10x10 grids, SVG). `pack.js` dedupes styles.
`mkcall.js N` writes `call.js` (builder + data for batch N) which is pasted into the Figma `use_figma` tool.
Output is plain editable frames, text, rectangles and vectors (no auto-layout or components yet).
Fonts: Bricolage Grotesque and Figtree. Run `node cap.js` from a folder that holds these files plus a `shots/` dir.
