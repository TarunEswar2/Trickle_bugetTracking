# Trickle v11: Phase 2, Tile system

Artifact: https://claude.ai/artifact/L1g2BaZ91zsRC2odWShBbe

## Diverge: research
- **Isotype (Neurath)**: show more by repeating a symbol, never by enlarging it. This supports one fixed unit plus counting and rules out scaled or denominated glyphs (v10).
- **Unit visualization**: Park et al., "ATOM: A Grammar for Unit Visualizations" (IEEE TVCG 2018). One mark per unit keeps area proportional to value and supports grouping by layout alone.
- **Waffle vs pie**: Hill 2025 (Information Visualization, doi 10.1177/14738716241259432) and practitioner comparisons: part-to-whole judgements are more accurate on grids and bars than on angles. Waffles win when the cell value is fixed and known.
- **Subitizing**: people read up to about 4 items instantly (Kaufman et al. 1949; en.wikipedia.org/wiki/Subitizing). Above that they count at roughly 250–350 ms per item. Weber's law: comparing 37 with 41 loose items is hard, but 3 rows + 7 against 4 rows + 1 is easy, because rows turn the comparison into place value.
- **Ten-frames, tally marks, abacus** (early maths practice, e.g. guidedmath.wordpress.com, mathcoachscorner.com): children read 5 and 10 at a glance when they are laid out as 5|5 frames. Tallies bundle in 5s. An abacus rod is one decimal place.
- **Cash**: ₹100 is the everyday note, and students already think in "hundreds". Denominations work in a wallet because the value is printed on each note, which is not true of shapes (v10).
- **GitHub grid / progress blocks**: fine for presence and intensity by date, but the unit is ambiguous. Useful as a time layout, not as a money unit.
- **Time as the unit ("days of spending")**: meaningful, but the value moves whenever the budget changes (see v9 adaptive unit).

## Candidates (10)
A ₹100 flat · B 1 tile = 1 day of budget · C 1% of budget · D ten-frame 2×5 blocks of ₹100 · E personal unit set at onboarding · **F ₹100 tile, rows of 10 split 5|5, row = ₹1,000** · G ₹50 flat · H ₹10 flat · I ₹100 tile + ₹1,000 bar · J coin/note glyphs.

## Converge: weighted matrix (1–5)
Weights: Learn 25 · Glance 20 · Honest 15 · Scale 15 · Load 15 · Fit 10.
| Cand | L | G | H | S | CL | Fit | Total |
|---|---|---|---|---|---|---|---|
| F | 5 | 5 | 5 | 4 | 5 | 5 | **4.85** |
| D | 4 | 4 | 5 | 4 | 4 | 5 | 4.25 |
| A | 5 | 2 | 5 | 3 | 3 | 4 | 3.70 |
| I | 3 | 4 | 4 | 4 | 3 | 4 | 3.60 |
| B | 3 | 4 | 5 | 3 | 3 | 2 | 3.40 |
| E | 3 | 3 | 5 | 3 | 3 | 3 | 3.30 |
| G | 4 | 2 | 5 | 2 | 2 | 4 | 3.15 |
| C | 2 | 3 | 5 | 2 | 3 | 3 | 2.90 |
| J | 2 | 3 | 3 | 3 | 2 | 3 | 2.60 |
| H | 4 | 1 | 5 | 1 | 1 | 3 | 2.55 |

**Top 3 to test: F, D, B.** A is F without grouping, so it would add nothing to the test. I uses a second glyph, which is a denomination system and is on the NEVER AGAIN list. B goes in as the strongest different concept (time as the unit), so the test checks it on evidence rather than dismissing it on paper.
