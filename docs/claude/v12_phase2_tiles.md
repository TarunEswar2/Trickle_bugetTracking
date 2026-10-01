# Trickle v12 — Phase 2: Tile exploration

Board: Trickle v12 — Decision Board, Phase 2 section (https://claude.ai/artifact/7pWwnVcSLcG1RYB9WuwcYD). Same 6 scenarios in every option: ₹25 chai, ₹350 meal, ₹6,000 budget, ₹9,000 income (₹3,000 savings + ₹6,000 budget), ₹499 subscription (reserved), goal ₹8,000 at 52%. Every option also renders in B&W. Palette validated with the dataviz checker (light #2f63c9/#1f9b84, dark #5a8ae6/#22a385: all checks pass).

Rules kept from the audit: one unit (₹100), no shape denominations, no red, no numbers on Home.

## Options

- **F v11 baseline · ₹100 grid**: Rows of 10, gap after 5. The reference everything else is judged against.
- **G1 Dot-matrix glow**: Lit dot = ₹100 on a dark matrix of unlit dots; recent dots glow brighter. From the Workouts reference.
- **G2 Tile bar**: One continuous bar per ₹1,000 line with ₹100 ticks; a longer tick marks ₹500.
- **G3 Tile jar**: Tiles stack bottom-up inside a jar outline, 6 wide; the jar is the category.
- **G4 Isometric stacks**: 3D cubes; one column of 10 = ₹1,000. Height reads as amount.
- **G5 Merging rows**: Tiles as today, but a complete ₹1,000 row fuses into one pill (notch at ₹500). Loose tiles stay tiles.
- **G6 Tile + one number**: The ₹ figure leads; up to ₹1,000 the tiles show it, above that a 10-cell strip shows proportion only.
- **G7 Day-tiles**: 1 tile = 1 day of budget (₹6,000 ÷ 30 = ₹200), rows of 7 = a week.
- **G8 Liquid-fill tiles**: ₹100 tiles; partials fill like liquid with a soft wave top, a natural home for pour animations.
- **G9 Rounded pills**: ₹100 pills, rows of 10 with gap after 5; softer, reads as coins on a counter.
- **G10 Ten-frames**: 2×5 frames of ₹100, each frame = ₹1,000; the maths-class shape for "ten".
- **G11 Abacus beads**: Beads on rods; one rod = ₹1,000, beads slide right as money arrives.
- **G12 Density · compact**: Same ₹100 grid at 6px for Insights and dense lists (density is a setting: compact / regular / airy).
- **G13 Density · airy**: Same grid at 14px rounded for Home cards and the pay moment.

## Score matrix (1–5; weights L20 G20 H15 S15 Calm10 Motion10 Fit10)
| Option | Learn | Glance | Honest | Scale | Calm | Motion | Fit | Weighted | Reasoning |
|---|---|---|---|---|---|---|---|---|---|
| G5 Merging rows | 5 | 5 | 5 | 5 | 4 | 5 | 5 | **4.90** | Keeps F's unit and counting, cuts visual noise by up to 90%; rows split into tiles on touch or pay. |
| G1 Dot-matrix glow | 4 | 4 | 5 | 3 | 5 | 5 | 4 | **4.20** | Same counting as F, calmer and prettier on dark; partials become dimmer dots (less exact); weak in light/B&W. |
| G13 Density · airy | 4 | 5 | 5 | 2 | 5 | 4 | 4 | **4.15** | Not a form, a size: best for Home ≤30 tiles and the pay moment. |
| F v11 baseline · ₹100 grid | 5 | 4 | 5 | 3 | 4 | 3 | 4 | **4.10** | Proven in v11; scale stops at ~₹10k and 90 loose tiles get busy. |
| G2 Tile bar | 4 | 5 | 4 | 4 | 4 | 3 | 4 | **4.10** | Fast length read, but ticks are harder to count than tiles; loses the "pick up a tile" feeling. |
| G6 Tile + one number | 5 | 5 | 4 | 4 | 4 | 2 | 3 | **4.10** | Very glanceable but puts ₹ back on surfaces; above ₹1,000 the tiles stop being ₹100. |
| G8 Liquid-fill tiles | 4 | 4 | 5 | 3 | 4 | 5 | 4 | **4.10** | F with a friendlier partial; wave is only visible on the last tile. |
| G9 Rounded pills | 4 | 4 | 5 | 3 | 5 | 4 | 4 | **4.10** | Softer, coin-like; wider rows (1.8×) cost horizontal space on 360px phones. |
| G12 Density · compact | 4 | 3 | 5 | 5 | 4 | 2 | 4 | **3.90** | Not a form, a size: needed for Insights where 100+ tiles appear. |
| G11 Abacus beads | 3 | 4 | 5 | 3 | 4 | 5 | 3 | **3.80** | Lovely sliding motion; beads read as discrete, partial bead is odd. |
| G10 Ten-frames | 4 | 4 | 5 | 3 | 3 | 3 | 3 | **3.70** | Familiar ten, but frames wrap 3-across and break "row = ₹1,000". |
| G3 Tile jar | 4 | 3 | 4 | 2 | 4 | 4 | 3 | **3.40** | Great metaphor for Spending jars; space-hungry, cannot hold income or 9k. |
| G7 Day-tiles | 2 | 3 | 3 | 3 | 4 | 3 | 2 | **2.80** | Meaningful ("3 days of money") but the unit moves with the budget; v9 failure. |
| G4 Isometric stacks | 2 | 3 | 2 | 3 | 3 | 4 | 2 | **2.65** | Pretty, but 3D distorts area and partials are unreadable; violates honesty. |

## Recommendation
- **Primary: G5, merging rows.** ₹100 tiles, rows of 10 with a 5|5 gap. A complete ₹1,000 row fuses into one pill with a notch at ₹500. On pay the pill cracks into tiles and some leave.
- **Alternative: G8, liquid-fill tiles**, with the G1 dot-matrix glow kept for position views (calendar, time of day, pace) either way.
- **Collapse:** below ₹1,000 loose tiles; ₹1,000–₹10,000 pills + tiles; above ₹10,000 one ₹10,000 square (10 rows) + pills + tiles; tap expands.
- **Key:** "■ = ₹100" once per screen on the first tile visual, repeated in every tab's "?" intro along with "a full row = ₹1,000".
- **Density by surface:** airy on Home and pay, regular in tabs, compact in Insights.
- Rejected: G4 isometric (3D distorts area), G7 day-tiles (moving unit, the v9 failure), G6 hybrid (puts ₹ back on surfaces, and its tiles stop being ₹100 above ₹1,000).

## Questions for Tarun

**P2-Q1. Which tile form should v12 use?**
- A · Merging rows (G5): ₹100 tiles, and a complete ₹1,000 row fuses into one pill
- B · Dot-matrix glow (G1) everywhere
- C · Keep the v11 grid (F) as it is
- Recommendation: **A**: It keeps the learned ₹100 unit and counting but cuts visual noise, and rows splitting back into tiles gives motion a job.

**P2-Q2. How do large amounts collapse?**
- A · Full ₹1,000 rows merge into pills; above ₹10,000, 10 rows become one ₹10,000 square
- B · No merging; above 100 tiles show the number only
- C · Switch to a proportion strip (G6) above ₹1,000
- Recommendation: **A**: The same tile unit at every scale, with no second glyph: a pill is a row and a square is ten rows, both visibly made of tiles.

**P2-Q3. Where does the dot-matrix glow belong?**
- A · Only on position views (calendar, time of day, Home pace), never as money
- B · As the money tile in the B&W/dark look
- C · Nowhere
- Recommendation: **A**: It is beautiful on dark, but its partials are vague. Keeping it for dates and pace also keeps "position views look different from tiles" (a v11 rule).

**P2-Q4. Which density levels should ship?**
- A · Size follows the surface: airy on Home and the pay moment, regular in tabs, compact in Insights
- B · A user setting (compact / regular / airy)
- C · One size everywhere
- Recommendation: **A**: Home holds 30 tiles or fewer and Insights needs 100 or more. The surface decides the size, which saves the user a setting.

**P2-Q5. Key style?**
- A · "■ = ₹100" once per screen on the first tile visual, plus a line in each tab's "?" intro
- B · A tiny persistent key in every card corner
- C · Taught in onboarding only
- Recommendation: **A**: It worked in v11. The new tab intros are a natural second place for it, so cards stay clean.
