# Trickle v12 — Phase 2b: Tile resolution

Board: Trickle v12 — Decision Board, Phase 2b section (https://claude.ai/artifact/7pWwnVcSLcG1RYB9WuwcYD). Problem: 1 tile = ₹100 everywhere, but ₹50,000 must not be 500 tiles and ₹10 must not vanish. 14 systems × 12 scenarios (₹10, ₹25, ₹99, ₹350, ₹1,250, ₹6,350, ₹9,000 income split 1,400/7,600, ₹50,000, ₹1,23,000, goal ₹8,000 at 52%, 4×₹25 accumulating [animated], pay ₹350 from ₹1,500 [animated]). Colour + B&W, board size + Home airy size, tap-to-zoom on R3, and a "Try it" playground (any amount, pay/receive) for the top 3. Mark counts are computed from the drawings. Palette reused from Phase 2 (validated).

## Systems (one-sentence rule)

- **R1 Crumb · Tile · Pill · Block**: "A square is ₹100; a bar is ten of them, a big square is a hundred; a dot is loose change."
- **R2 Snapping crumbs**: "Small change shows as quarter-squares; four quarters snap into a full ₹100 square."
- **R3 Semantic zoom**: "Cards show bars and blocks; tap to see the squares; tap again to see the last square in ₹10s."
- **R4 Cup tile (fill level)**: "A ₹100 square fills like a cup; a half-full square is ₹50."
- **R5 Ten-frame tile**: "A ₹100 square has ten ₹10 dots; lit dots are what you have."
- **R6 Stacked 3D (Dienes cubes)**: "Small cube ₹100, tower ₹1,000, slab ₹10,000, big cube ₹1,00,000."
- **R7 Rounded + exact on tap**: "Each square is ₹100, rounded to the nearest one; tap for the exact amount."
- **R8 Count label hybrid**: "Squares up to ₹1,000; above that one bar or block with a ×count."
- **R9 Container icons**: "Square ₹100, box ₹1,000, crate ₹10,000."
- **R10 Log-scaled single tile**: "Bigger square, more money (roughly)."
- **R11 Context-adaptive**: "Spending shows change; savings and income round to whole squares."
- **R12 Cash notes**: "Draw the notes and coins you would hand over."
- **R13 Lego bricks**: "A 1-stud brick is ₹100, a 10-stud brick ₹1,000, a plate ₹10,000."
- **R14 Abacus place value**: "Each rod is a place (₹10 … ₹1L); beads count that digit."

## Score matrix (1–5; weights Learn 20 · Honest 15 · Marks 15 · Crumb 15 · Motion 10 · ₹100 consistency 15 · Home fit 10)
| System | Learn | Honest | Marks | Crumb | Motion | ₹100 | Fit | Max marks | Score | Why |
|---|---|---|---|---|---|---|---|---|---|---|
| R4 Cup tile (fill level) | 5 | 5 | 4 | 5 | 5 | 5 | 4 | 18 | **4.75** | "A cup of ₹100" reads instantly, remainder legible as a level, fill/drain is natural motion. |
| R2 Snapping crumbs | 4 | 5 | 4 | 4 | 5 | 5 | 4 | 18 | **4.40** | Quarters make change countable and give the best accumulate animation; ₹10 still a sliver. |
| R1 Crumb · Tile · Pill · Block | 5 | 5 | 4 | 3 | 4 | 5 | 4 | 18 | **4.35** | One sentence, area honest at every level; the ₹10 dot is a near-invisible speck. |
| R3 Semantic zoom | 4 | 4 | 5 | 4 | 4 | 4 | 5 | 16 | **4.25** | Calmest cards (≤13 marks) and exactness on demand; level 0 hides the ₹100 tile above ₹1,000. |
| R13 Lego bricks | 4 | 5 | 3 | 3 | 4 | 5 | 3 | 18 | **3.90** | R1 with play value; studs double the visual noise on blocks. |
| R11 Context-adaptive | 3 | 4 | 4 | 4 | 4 | 4 | 4 | 18 | **3.80** | Sensible per surface, but two rules to learn and the same ₹ looks different on two tabs. |
| R7 Rounded + exact on tap | 5 | 4 | 4 | 1 | 3 | 4 | 4 | 18 | **3.65** | Simplest, but ₹10, ₹25 vanish and ₹99 rounds up: chai spends disappear from the picture. |
| R5 Ten-frame tile | 3 | 4 | 4 | 3 | 3 | 5 | 3 | 18 | **3.60** | Exact to ₹10, but the frame needs a 16px+ tile; at card size it is noise. |
| R8 Count label hybrid | 4 | 2 | 5 | 4 | 2 | 3 | 5 | 16 | **3.60** | Compact, but ×count is a number on Home and the icon no longer has area. |
| R6 Stacked 3D (Dienes cubes) | 3 | 2 | 5 | 2 | 4 | 3 | 4 | 18 | **3.20** | Fewest marks and fun to build, but volume is misjudged ~3×; breaks "1 tile = ₹100" visually. |
| R9 Container icons | 4 | 1 | 4 | 2 | 3 | 3 | 4 | 18 | **3.00** | Friendly icons, but a crate looks ~3× a box, not 10×. Isotype rule broken. |
| R14 Abacus place value | 2 | 1 | 4 | 3 | 3 | 1 | 4 | 26 | **2.45** | Exact and compact, but a bead is worth 10× its neighbour: place value, not area. |
| R12 Cash notes | 4 | 2 | 1 | 4 | 3 | 1 | 1 | 246 | **2.40** | Instantly familiar, but six shapes and 246 notes for ₹1,23,000. |
| R10 Log-scaled single tile | 2 | 1 | 5 | 1 | 2 | 1 | 5 | 2 | **2.30** | Always fits, never honest: ₹1,23,000 looks ~3× ₹1,250. Kept as the warning case. |

## Top 3
- **R4 Cup tile (4.75)**: one sentence ("₹100 square fills like a cup"), remainder readable as a level, fill/drain is natural motion. Con: ₹10 is a thin line.
- **R2 Snapping crumbs (4.40)**: ₹25 quarters snap into a tile; the best accumulate story. Con: a second sub-unit; ₹10/₹99 get odd partial quarters.
- **R1 Crumb · Tile · Pill · Block (4.35)**: Tarun's favourite, pure base-10, area-honest. Con: an area-true ₹10 dot is about 1px, and ₹25 and ₹50 dots are hard to tell apart.
- Next: R3 Semantic zoom (4.25). It has the calmest cards, but the ₹100 tile is hidden above ₹1,000, so it is better used as an interaction than as the static form.

## Recommendation (hybrid)
Use R4 cup tiles on R1's crumb → tile → pill → block ladder as the single static rule. R2's snap becomes motion: cups merge into a tile at ₹100, and 10 tiles fuse into a pill. R3's tap to zoom (block → tiles → ₹10s) is how users get exact amounts, with no numbers on cards. Rejected: R10 log (dishonest), R12 cash (246 marks for ₹1,23,000), R9 icons and R14 abacus (marks not sized to value), R6 3D (volume misjudged).

## Questions for Tarun

**P2b-Q1. Which resolution system should v12 use?**
- A · Cup tiles (R4) + snapping motion (R2) + tap to zoom (R3)
- B · Crumb dots (R1), greedy, no zoom
- C · Zoom-first (R3): cards show bars and blocks only
- D · Rounded (R7): whole tiles, exact on tap
- Recommendation: **A**: One sentence ("a square is ₹100, it fills like a cup"), area-honest at every level, and both animations come for free.

**P2b-Q2. How exact are amounts below ₹100?**
- A · Exact cup fill (₹10 = a thin floor line)
- B · ₹25 quarters (₹10 rounds up to one quarter)
- C · No crumbs; exact ₹ only on tap
- Recommendation: **A**: Chai-sized spends are the habit Trickle exists for; they must stay visible.

**P2b-Q3. What does tapping a tile visual do?**
- A · Zooms one level: block → tiles → ₹10s
- B · Shows the exact ₹ in a tooltip
- C · Nothing (opens detail screen)
- Recommendation: **A**: Zoom keeps the tile language when you want detail; the ₹ figure sits in the zoomed view.

**P2b-Q4. Should Savings and Income round to whole tiles while Spending stays exact (R11)?**
- A · No: one rule everywhere
- B · Yes: savings/income round, spending exact
- Recommendation: **A**: Two rules cost learnability; at ≥₹1,000 the cup remainder is already small next to the bars.
