# Trickle v9 — Phase 1: Audit (v8 visuals, v7 visuals, small purchases)

Inputs: v8 build (`/home/claude/v8/`, trickle-final-v8.html, `#demo`), v8 Phase 4 spec, v8 research, v7 build notes and Phase 3 spec, reference image (monochrome widget dashboard). Screenshots: `/home/claude/v8/shots9/{home,money,actions,insights,pay}.png` (Playwright/Chromium, 412×860, no console errors, no overflow).
Hard constraint unchanged: **no SMS tracking** — linked UPI IDs or manual entry.

## Headlines
1. v8's tile language is strong, but **tiles have three unrelated units** (₹100 budget, ₹500 income/savings, 1% goals, and "1 spend" in the small-spend jar), and **only 2 of 9 widgets state their unit** ("Each tile is ₹100…", "Each lime tile is ₹500…"). The reader has to guess what a tile is worth everywhere else.
2. **Fixed ₹100 units overflow**: "Where it went" draws up to 120 tiles (sliced at 120 — values above ₹12,000 are silently dropped); Food alone is 24 tiles. Past ~50 tiles the grid reads as texture, not quantity.
3. **Two widgets are not tiles at all** (Time of day, Weekday pattern use grey bars) and one is not a chart (Owed = avatars). The tile identity breaks mid-board.
4. **Unnecessary tiles**: Period strip uses 30 tiles to say one thing (day X of 30 + pace colour) — the reference's glowing dot-matrix month does this better and lighter. Subscriptions widget = 3 same-size tiles carrying no amount. Recent-spend glyphs cap at 12 tiles/6 per row with no unit.
5. **v7 had range and flow that v8 dropped**: daily range bars (W11), this-vs-last dumbbell (W08), Sankey (W28), spend calendar (W07), 24h radial (W13), repeat buys (W12), top merchants (W16), 6-period trend (W18), goal ETA (W35). v8 has no view of *spread*, *comparison over time*, or *where money flows*.
6. **Small purchases are one widget** (count of spends < ₹100, no ₹, no merchant, no trend). The richest behavioural signal for students is barely used.
7. No motion vocabulary beyond pay tile pop / income fly; **no sound**; no monochrome option.

## A. v8 visual inventory
| # | Visual | Where | Form | Unit shown? | Problem | v9 verdict |
|---|---|---|---|---|---|---|
| 1 | Home glow | Home bg | blurred tile field, green/amber + word chip | n/a (ambient) | fine | **Keep**; add slow glow-shift motion |
| 2 | Recent spend tile glyphs | Home recent rows | 1–12 tiles, ₹100 each | No | unit unlabeled, cap 12 hides size | Replace with **size dot** (1–5 dots on ₹50/100/250/500/1k+ scale) + key in section header |
| 3 | Subscriptions compact card | Home | 1 tile per sub | No | tiles carry no value | Keep as row, tiles → **one glowing dot per sub on a month ring** (due date) |
| 4 | Goal waffle 10×10 | Home pin, Insights, Money | 1 tile = 1% | No (implicit) | unlabeled; 100 tiles | Keep 10×10 (it *is* a %); label "1 tile = 1% · ₹80" |
| 5 | Period strip | Home pin, Insights | 30 tiles = days | No | 30 tiles for one fact | Redraw as **dot-matrix month** (ref style: glowing dot = spend day, brightness = amount) |
| 6 | Where it went | Insights | ₹100 tiles by category, up to 120 | Yes (caption) | too many tiles; truncation bug | Adaptive unit (₹250 → 24 tiles) + key |
| 7 | Small spends jar | Insights | 1 tile = 1 spend <₹100 | Yes (count) | count only, no ₹, no merchant | Replace with **small-purchase suite** (§C) |
| 8 | Savings growing | Insights | ₹500 lime stacks × 3 months | Yes | only 3 months, no cumulative | Keep; adaptive unit; add cumulative "stack" view |
| 9 | Time of day | Insights | 4 grey bars | No | not tile language | Redraw as **24-dot clock strip** (dot brightness = ₹) |
| 10 | Weekday pattern | Insights | 7 grey bars | No | not tiles | Redraw as **7 tile columns** with unit |
| 11 | Subscriptions | Insights | 1 tile/sub | No | no ₹ | Merge into Subs widget with ₹ tiles per sub/month |
| 12 | Owed to you | Insights, Money | avatars | n/a | fine as list | Keep; outlined (not filled) tiles per person, same unit |
| 13 | Budget category grids | Money › Budget, Pay | ₹100 tiles (24/9/8/14) | "₹100 tiles" label on Money only | Food 24 fine; OK but fixed unit | Adaptive (≤30 per category) + key |
| 14 | Pay tiles step | Pay | ₹100 tiles, payment pops | Implicit | fine | Keep; add key; add pour + chime |
| 15 | Income split | Money › Income, confirm card | ₹500 tiles (18) | No | unlabeled | Keep; key; **Sankey** becomes the "where did it go" deep view |
| 16 | Rainy-day jar | Money › Savings | ₹100 tiles (9) | "₹100 tiles" | ok | Keep; key |
| 17 | Period story cards | Rhythm | tile cards | partial | ok | Keep; add Sankey card + chime |
| 18 | Check-in cards | Actions | tile cards | partial | ok | Keep; add small-purchase card |

Numbers visible on first load in v8: Home 0, Money 2, Actions 0, Insights 0 — v9 must keep these budgets (keys like "1 tile = ₹250" are captions, not headline numbers; they are allowed but set in `--text3` 11px).

## B. v7 visual inventory and verdicts
Target screen: H Home, M Money, I Insights, G Goal/Savings, P Pay.

| v7 | Visual | Verdict | Reason | v9 target |
|---|---|---|---|---|
| W01 | Safe-to-spend hero + gauge | Skip | v8 rule: no budget figure on Home | — |
| W26 | To assign | Skip | "New money" banner already covers it | — |
| W03 | Runway dotted ring | Skip | a budget number in disguise | — |
| W02 | Period pace bullet | Redraw | pace is useful; as dot-matrix month + glow | H/I "This month" dots |
| W04 | Category % cards | Redraw in tiles | per-category tile grid with over in amber dashed | M Budget |
| W05 | Recent totals | Skip | redundant with Recent list | — |
| W40/41 | Subs + calendar | Redraw | ring of 30 dots, subs glow on due day | H/I Subscriptions |
| W06 | Under-budget streak | Skip | streaks banned (v8 research §14) | — |
| W07 | Spend calendar (dashed future) | **Bring back** as dot matrix | exactly the reference's glowing month | I "Spend calendar" |
| W08 | This vs last (dumbbell) | Redraw in tiles | two tile rows per category, last = outlined | I "This vs last" |
| W09 | Category share pills | Skip | duplicate of Where it went | — |
| W10 | Month by month | Redraw | 3 small tile stacks per month | I "Month by month" |
| W11 | **Daily range bars** | **Bring back** as dot columns | user asked for range; min–max per week | I "Spend range" |
| W12 | Repeat buys pictogram | **Bring back** in small-purchase suite | repeats per merchant | I Small buys |
| W13 | 24h radial | Redraw | 24-dot clock ring | I "When you spend" |
| W14 | Peak hour | Skip | folded into 24h ring highlight | — |
| W15 | Purchase sizes | **Bring back** | size buckets show the small-buy share | I Small buys |
| W16 | Top merchants | Redraw | tile row per merchant | I "Top places" |
| W17 | Fixed vs flexible | Skip | low value for students | — |
| W18 | 6-period trend | Redraw | 6 tile columns, current glowing | I "6 months" |
| W31 | Overspend covers | Skip | frames overspend; v8 avoids | — |
| W42 | Insight 2×2 | Skip | Numbers-heavy | — |
| W24 | Balance split | Redraw | balance as one tile bar (budget/savings/new) | M |
| W43 | Owed to you | Keep (v8 has it) | outlined tiles | M/I |
| W44 | Splits settled/pending | Skip | niche | — |
| W19 | Income this period | Merge into Sankey | — | M |
| W21 | Payday calendar | Skip | one allowance date; shown on Money | — |
| W23 | In vs out | Redraw | mirrored tile columns per week | I "In vs out" (hidden default) |
| W28 | **Sankey** | **Bring back, redrawn** | user request | M Income + I + period story |
| W30 | Transfers log | Skip | list, not a visual | — |
| W27 | Balance history | Skip | a number-y line | — |
| W29 | Forecast | Skip | budget-left projection = anxiety | — |
| W20 | Source mix | Merge into Sankey left column | — | — |
| W25 | Pool rings | Skip | duplicate | — |
| W22 | Expected vs received | Skip | niche | — |
| W33 | Goal hero | Keep as waffle | v8 already | G |
| W34 | Goal tiles | Keep | v8 goals list | G |
| W32 | Savings rate waffle | **Bring back** | savings as motivator; 10×10, 1 tile = 1% of income kept | I/G |
| W38 | Contribution sources | Redraw | tile row coloured by source (allowance/leftover/shift) | G detail |
| W37/W36 | Sweeps | Skip | internal mechanics | — |
| W35 | Goal ETA | **Bring back** | "reached by ~Dec" dot path | G detail |
| W39 | Withdrawals & slips | Skip | negative framing | — |

Summary: bring back / redraw 17 (W02, W04, W07, W08, W10, W11, W12, W13, W15, W16, W18, W23, W24, W28, W32, W35, W38, W40), skip the rest (budget-number, streak, or redundant).

## C. Small-purchase tracking gaps (v8)
| Gap | v8 today | Needed |
|---|---|---|
| Definition | hard-coded `< ₹100` | one threshold, default **≤ ₹150** (drawer: ₹100/150/200) |
| Amount | count only | ₹ total "these added up to ₹X" (tap reveals) |
| Frequency | none | per-week count, per-day dots |
| Repeats per merchant | none | top repeat merchants (Chai Tapri ×14) with tile per visit |
| Weekly accumulation | none | stacked accumulation week by week, adaptive unit |
| Trend | none | this month vs last 2 (↑/↓ word, not red) |
| Equivalence | none | "= 38% of your Goa goal gap" — savings-framed, optional |
| Pay moment | none | on Pay step 3, a small line "3rd chai this week" when payee repeats |
| Check-in | none | Monday card "Small buys: 11 last week" |
| Period story | 1 card (count) | card with accumulation pour + ₹ |

## D. Other gaps
- No sound; motion limited to pay pop, income fly, accordion; reduced-motion = collapse to 1ms (good; keep).
- No black-and-white mode; category identity relies on hue only in "Where it went".
- Food `#E8743B` fails the dark lightness band (L 0.685) in the dataviz validator; Travel↔Essentials collapse under protan all-pairs (ΔE 0.6) — acceptable only because they are never adjacent and always labelled.
- Tiles are rendered by `tg()` with no value metadata; the unit must become part of the tile component.
