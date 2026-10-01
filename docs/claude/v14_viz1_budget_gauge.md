# Trickle v14 — Viz 1: Budget gauge (2 Oct 2026)

Board: https://claude.ai/artifact/AcKnP1FTzaAuGwsqiXWLgM ("Trickle v14 — Viz 1: Budget gauge"). Options only; Tarun decides. Base: claude/v14_decisions.md, claude/v14_stage0_facts.md, research/brymans_analysis_interviews.md.

## Logged before drawing (2 Oct, in v14_decisions.md)
1. Budgets = 10×10 grid of rounded boxes filling from the bottom like liquid; ALWAYS 10×10; scale always shown ("1 box = ₹X").
2. One visualisation per screen; scroll down for the next.
3. Inspiration: Apple Fitness rings (nested rings, week strip of day minis, "750/500" stat) and a dark waffle-grid slide (rounded squares filled from the bottom, grey empties, big % + one line).

## References — what was taken
- Waffle slide: rounded boxes, bottom fill, quiet grey empties, one line of words, dark ground, single fill colour. Changed: always 10×10 (slide is 8 wide, ragged top row). Left out: the big %.
- Apple rings: tried as Home ring (D2), nested category rings (C4), week strip (D3/D4). "750/500" pattern kept for the tap layer ("₹140 left of ₹400"). Caution: that screen shows four visualisations at once and relies on memorised colours.

## Student pool used (all six, every option)
| Type | Money | Cats | Period | Using | State drawn | Featured budget |
|---|---|---|---|---|---|---|
| Vaishak | irregular, ₹3,000 this month | 2 | month | month 3 | nearly empty, buffer zero | Food ₹2,400, ₹168 left |
| Gautham | ₹4,000/mo | 3 | week | week 1 | start of week | Food & drinks ₹652, ₹571 left |
| Tarun | ₹6,000/mo, no budget | 4 | week | week 1 | mid-week | Coffee & snacks ₹400, ₹140 left |
| Yash | ₹9,000/mo, goal | 7 | week | month 6 | mental limit nearly used | Quick-commerce ₹1,000, ₹90 left |
| Nishad | earns ₹25,000 | 12 | month | month 6 | mid-month | Food & beverages ₹6,000, ₹2,910 left |
| Harsh | ₹12,000/mo | 18 (Gym, Bike EMI, Gifts…) | month | month 6 | Eating out ₹1,900 over after ₹3,500 dinner | Mess & meals ₹2,400, ₹700 left |

## A — What the liquid means
- A1 Left (drains): full bright grid at the start, dark quiet grid at the worst; a payment removes boxes (friction; links to Viz 2 crumble).
- A2 Spent (rises): Gautham's best moment is a blank screen; Vaishak (almost broke) gets the fullest, brightest grid; paying adds boxes; "over" = more liquid than the grid holds. Rising suits accumulation (Viz 6), not the budget.
- Leaning: A1.

## B — Scale and top edge
- B1 exact (budget ÷ 100): grid always = whole budget. Values can be fussy: ₹6.52 (₹652), ₹9.20 (₹920), ₹0.68 (₹68 subscription budget). ₹25,000 → ₹250/box.
- B2 round box (₹5/₹10/₹25/₹100) with unused boxes dotted: ₹652 → 66 boxes in use (a full budget looks two-thirds full; 65.2 boxes so the 66th is part-real); ₹6,000 → 60 boxes. Two kinds of empty box; the whole is no longer the grid.
- Third way: budgets set in ₹100 steps so B1's box is whole rupees; derived odd budgets read "1 box is about ₹6.50".
- Top edge: even level across the row (flat or with meniscus) vs box by box (whole boxes + one box with its own liquid level). Box by box = at most one partial box, a payment is N boxes (₹20 chai at ₹4/box = 5 boxes), matches Viz 2. Even level is the more literal liquid but leaves ten part-filled boxes and cannot be checked against the scale.
- Scale wording drawn: box glyph + "1 box = ₹60"; glyph + "= ₹60"; "1 box is about ₹6.50".
- Problem: at ₹250/box a ₹20 chai moves the monthly gauge <0.1 box → no visible drop, no friction at that level (category and week gauges do show it).
- Leaning: B1 + ₹100 budget steps, glyph + "1 box = ₹X", box by box (close call).

## C — Many categories (2, 3, 4, 7, 12, 18)
- C1 one grid per screen, snap scroll, emptiest first (position rail + "next: name"): ideal at 2–4; at 18 = 17 swipes, no way to find Gym.
- C2a index with tiny bars → tap for grid: 18 bars = 18 small gauges in a second form → breaks one-visualisation-per-screen; invites comparing unlike budgets.
- C2b index with words only ("nearly empty", "most left") → tap for grid: a list, not a chart; same at 2 and 18; custom names equal to defaults.
- C3 one grid, a band per category: fine at 2–4; at 7 half the bands are too thin to name, at 12/18 nearly all; needs band tones (colour-coded categories were rejected); cannot show a gone-over category (Harsh's Eating out disappears).
- C4 nested rings top 3 + others: second form; needs a legend without memorised colours; "others" hides 15 of 18.
- Problem: fixed bills (rent, EMI, gym, phone) go full → empty in one payment and top an "emptiest first" sort; drawn as "paid" and sorted last. May belong to Viz 8.
- Leaning: C2b → C1 (skip the index at ≤4 categories).

## D — Home gauge (sentence + one gauge, no ₹)
- D1 grid: same form as categories. D2 ring: friendly, but a second form and has no boxes for the scale rule.
- D3/D4 with week strip of day minis: 7 minis + main gauge = 8 gauges → violates one-per-screen; minis too small to read. Plain day letters with today marked = navigation, OK. Week day-by-day as its own screen one scroll down (overlaps Viz 9).
- Conflict 1: "scale always shown" vs "no ₹ on Home" (drawn as "1 box = 1% of this week"; alternatives: ₹ scale anyway, or on tap).
- Conflict 2: Home = this week, but Nishad/Harsh/Vaishak run monthly or irregular; their week must be derived and can disagree with the month (Vaishak: month nearly empty, week "most left").
- Leaning: D1, no strip.

## E — States
Full, half, nearly empty, empty (dim grid + word "empty", no red/number), gone over ×3, ghost line.
- E5 hatched boxes below the floor: shows size but only for small overs (Harsh = 95 boxes under → capped at 2 rows + "and 75 more boxes").
- E6 amber floor line + "gone over": any size, calm, amount on tap; says less at a glance.
- E7 hatched inside grid from the top: busy, second liquid, breaks past 100%.
- E8 ghost line (last week/month at this point): useful but a second mark on the glance layer.
- Leaning: E6 at glance, amount on tap; ghost line on the tap layer.

## F — Progressive disclosure
F1 glance (grid, name, words, scale) → F2 tap ("₹140 left of ₹400", "about ₹35 a day for 4 days", last period at this point, ghost line) → F3 detail (grid shrinks, transactions list).
Problem: per-day pace is bleak when money is low (Yash "about ₹30 a day"); may switch to words below a level.

## G — Motion
Settle on open (~2 s, one slosh, flattens to a faint meniscus, never loops); payment (~1.1 s drop with small overshoot, the part that left stays pale ~1.5 s, no red/shake); reduced motion = no animation; box-by-box variant empties boxes one by one (~40 ms apart). Live demo + 6 static frames on the board.

## Scores (judgement, not tested; /30: 3-s read, honest, ₹652 & ₹25,000, 18 categories, low anxiety, consistent)
A1 29 · A2 23 | B1 27 · B1+₹100 steps 28 · B2 21 · even level 27 · box by box 28 | C1 26 · C2a 24 · C2b 28 · C3 14 · C4 17 | D1 29 · D2 25 · D3 25 · D4 22 | E5 23 · E6 27 · E7 20.

Research used: Garcia-Retamero & Cokely (icon arrays: the whole must be visible); Kay et al. 2016 (~20 countable marks → 100 boxes read as a level, not a count; scale label gives magnitude); ostrich effect (Karlsson, Loewenstein & Seppi 2009 → empty/over must stay calm).

## Decisions for Tarun
1. Liquid: A left (suggested) · B spent.
2. Scale: A exact, any value · B exact + budgets in ₹100 steps (suggested) · C round box with dotted leftovers.
3. Top edge: A even level with meniscus · B box by box with liquid in the last box (suggested) · C whole boxes only.
4. Many categories: A snap scroll only · B words-only index → grid → snap (suggested) · C index with tiny bars · D layered grid / rings. Plus: fixed bills — gauge, "paid", or move to Viz 8?
5. Home gauge: A grid, no strip (suggested) · B ring · C either with week strip. Plus: scale on Home — hidden until tap, "1 box = 1%", or ₹ scale?
6. Gone over: A boxes below the floor (capped) · B amber floor line + words (suggested) · C hatched inside. Plus: ghost line on glance, on tap, or not here?

Open, not in the six: what the "whole" is for a student with no budget (Tarun-type, week 1); how Home's week is derived for monthly/irregular money.
