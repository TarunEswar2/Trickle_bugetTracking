# Trickle v12 — Phase 6: Visual identity (static)

Board: Phase 6 section of "Trickle v12 — Decision Board". Generator: /home/claude/v12/phase6.py. Validator log: p6_validate.txt.
Locked inputs: dot ladder (crumb pie-wedge <₹100, dot ₹100, pill ₹1,000, block ₹10,000), left = solid jar colour, spent = outline, savings green only, no red, amber/blue/plum + patterns for jar 4+, income neutral ink, glow only for time/position, colour default + B&W option, widget-grid Home, round Pay button beside floating tab bar.
Same data in every render: hostel student, ₹9,000 month (Food ₹4,000 · Travel ₹1,500 · Fun ₹1,500 · Savings ₹2,000), Goa goal ₹3,100 of ₹6,000. Screens: Home, Spending (day lanes), Savings goal, Pay amount, plus Home + Spending in B&W.

## Directions
| | A Monochrome glow | B Warm paper | C Ink & dots | D Soft night |
|---|---|---|---|---|
| Mode | dark (light companion) | light (dark companion) | light (dark companion) | dark (light companion) |
| bg / surface | #0b0b0c / #18181a | #ece6da / #fbf8f2 | #ffffff / #ffffff | #151922 / #1f2430 |
| ink / muted / lines | #f4f4f5 / #9a9aa0 / #2c2c30 | #29241b / #7a7163 / #ddd3c1 | #0b0b0b / #555 / #0b0b0b | #e6e9f0 / #8e96a8 / #30374a |
| amber / blue / plum / savings | #ad7c26 #5a8ae6 #b9407f #22a385 | #b07818 #2f63c9 #93306b #1f8f6e | #a86a00 #1f55c4 #8a2a6a #0f8a5f | #b27a28 #6b8be0 #b0508c #23a28f |
| glow | #ffffff | #e3a13a | #0b0b0b (halo) | #cfd8ff |
| Type (display/text/numerals) | Geist / Geist / Geist Mono | Bricolage Grotesque / Figtree / DM Mono | Archivo / Archivo / IBM Plex Mono | Sora / Nunito Sans / Sora |
| Cards | r24, 1px white 7%, gradient, no shadow | r18, 1px #e0d6c4, 1px under-shadow | r10, 1.5px black border | r22, no border, soft drop shadow |
| Dots | flat + hairline highlight | embossed press | flat, 1.6px outlines | soft matte, smaller |
| Icons | 1.75px rounded (ref) | 1.5px rounded | 2px square caps | 1.75px rounded |
| Tab bar + Pay | floating pill 5 icons + round ink Pay (scan) in all |
Light companions: A #b7791f #2f63c9 #93306b #1f9b84 on #f4f4f2 · B uses A-dark hues on #1d1b17 · C uses A-dark hues on #000 · D #a8721c #3e6ac4 #94407a #16917a on #eef0f4.
B&W (all): savings = full ink, Food mid grey (#a8a8a8 dark / #6b6b6b light), Travel 45° stripe, Fun dot pattern, names always shown.

## Validator (dataviz validate_palette.js, --pairs all)
All 8 sets PASS. WARN (legal with labels): Fun↔Savings deutan ΔE 7.6 (A/B/C dark), 6.8 (D dark). D's first muted try failed chroma + normal-vision floor (ΔE 11.5) and was re-stepped. B&W ordinal ramps PASS both modes. Full log on the board.

## Scores (legibility, calm, glance, CVD, ref fit)
A 4·5·5·4·5 = 23 · B 4·4·3·5·2 = 18 · C 5·2·4·5·2 = 18 · D 3·5·3·3·3 = 17.

## Recommendation
A Monochrome glow. Borrow C's 1.6px spent outlines and B's palette as light companion; Geist with tabular figures; logo L1.

## Logos
L1 Dot + crumb (rec) · L2 Dot jar · L3 Trickle (falling, shrinking dots) · L4 Pill + dot "t". Static splash = L1 + wordmark per direction.

## Questions
P6-Q1 direction (rec A + borrows) · P6-Q2 default appearance (rec follow phone) · P6-Q3 logo (rec L1) · P6-Q4 numerals (rec same face, tabular) · P6-Q5 dot finish (rec flat + hairline highlight).
