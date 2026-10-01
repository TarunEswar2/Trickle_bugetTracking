# Trickle v7 — Phase 2 Research & Widget Catalogue

Constraint: UPI linkage or manual entry (+ Excel/CSV import). No SMS, and no notification scraping.

## 1. Research findings (real sources)
| Source | Pattern | Take for Trickle v7 |
|---|---|---|
| YNAB, [Handling Overspending](https://support.ynab.com/en_us/overspending-in-ynab-a-guide-ryWoxEyi), [Moving Money](https://support.ynab.com/moving-money-in-your-plan-ryyCKbBJi), [Auto-Assign](https://support.ynab.com/en_us/auto-assign-a-guide-r1gBNbBJo), [Month Ahead](https://support.ynab.com/getting-a-month-ahead-HJidy13C5) | Income lands in Ready to Assign. Overspent categories go red and are covered by moving money from another category. Uncovered cash overspending is taken from next month's Ready to Assign. Auto-Assign presets (underfunded, last month) | To assign = inbox. The cover order is already agreed. Add "Assign like last period" and "Fill underfunded" quick buttons. Uncovered overspend reduces next period's To assign (to be confirmed with the user) |
| Goodbudget, [Fill from income](https://goodbudget.com/help/budgeting-with-goodbudget/fill-from-income/), [Available money](https://goodbudget.com/help/budgeting-with-goodbudget/what-is-available-money/) | Income is entered and then split across envelopes in one screen. A chosen envelope absorbs extras or deficits. Money can wait in "Available/Unallocated" | Split-on-arrival screen with an "extras go to →" picker (a default goal or Budget) |
| Monarch, [Flex budgeting](https://help.monarch.com/hc/en-us/articles/32125337244052-Using-Flex-Budgeting), [Reports](https://help.monarch.com/hc/en-us/articles/21846787088916-Using-Reports) | Fixed / Non-monthly / Flex groups. **One flex number** instead of per-category limits. Rollovers on fixed/non-monthly. Sankey cash-flow report | Home hero = one flexible number (safe to spend). Subs are the fixed group (W17 meter). Sankey W28 now has a true income source |
| Jupiter Pots, [jupiter.money/pots](https://jupiter.money/pots/), [UX write-up](https://www.nimkarkedar.com/p/pots-on-jupiter-designed-to-save), [community: round-ups](https://community.jupiter.money/t/introducing-roundups-or-rules-for-pots/18032) | Pot setup in under 30 s (category → name → done), move money any time, no lock-in, users asked for **self-lock**. Round-up rules were a community request | Goal create stays 3 fields. Optional "lock goal" makes a withdrawal need the PIN. Round-up is a sweep source |
| Fi Money, [FIT Rules](https://fi.money/features/fit-rules) | Rule bots: round up to ₹10/50/100, set aside ₹x per spend, recurring transfers. Destination = Jars / deposits | Rule builder = trigger (income arrives / period ends / each spend) + action (move ₹ or %) + destination (goal). Round-up step picker 10/50/100 |
| CSV import UX, [CSVBox flow](https://blog.csvbox.io/spreadsheet-import-ux/), [duplicates](https://blog.csvbox.io/csv-handle-duplicates/), [AppMaster mapping](https://appmaster.io/blog/csv-import-column-mapping-ui), [Dromo guide](https://dromo.io/blog/ultimate-guide-to-csv-imports) | file → map → validate → submit. Conservative auto-map on exact headers with manual remap. Preview before commit. Row-level errors. Idempotent re-import | Import: upload → map (Date, Amount, Description, Dr/Cr or sign, optional Category/UPI ref) → preview of 10 rows → dedupe flags (UPI ref, else date + amount + merchant within ±1 day) → rules auto-categorise → confirm. Batch log with undo |
| Widgets, [Apple HIG widgets](https://codershigh.github.io/guidelines/ios/human-interface-guidelines/extensions/widgets/index.html), [iOS widget sizes](https://github.com/simonbs/ios-widget-sizes), [Android sizing](https://developer.android.com/design/ui/mobile/guides/widgets/sizing), [flexible layouts](https://developer.android.com/develop/ui/views/appwidgets/layouts) | Fixed size classes (small, medium, large), one idea per widget, glanceable, tap → deep link, edit mode (jiggle) to add/remove/reorder, grid-cell sizing | Three fixed sizes: **S** = 1 cell square, **W** = 2×1 wide, **L** = 2×2 full-width. Edit mode on long-press: pin, hide, drag to reorder. Each widget has one question, tap → detail. Not-enough-data = a ghost of the chart + "Shows after N days/txns" |

## 2. Reference mapping
| Ref | What we take | Widgets |
|---|---|---|
| d3168b82 waffle 67% | 10×10 dot waffle + giant % on the left | W32 savings rate |
| 9d7536cf pill blocks | Rounded blocks, area = share, saturated colours on black | W09 category share, W20 income mix |
| 7447311e quarter-circle glyphs | 2×2 quarter-circle tiles as a glyph and progress system (each quarter = 25%) | W34 goal tiles; also pool/income-source icons |
| 41969c78 fitness bold cards | Saturated card with fill width = %, big % bottom-right | W04 category % cards; the Money tab stat tile row |
| 2a5aa968 activity + dashed calendar | Lime pill segmented control, calendar with dashed future days, lime today | W07 spend calendar, W21 payday calendar, period switcher |
| 70b9401f twitch 2×2 | 2×2 insight cards (big number + micro chart), half gauge | W42 grid, W14 peak hour, W01 gauge |
| 0485a569 telecom | Lime hero card with dotted ring countdown, dotted mini rings, line with tooltip + lime crosshair | W03 runway, W25 pool rings, W26 inbox, W27/W29 line tooltips |
| 830d5dcf lime candlestick | Per-day range bars, lime vs grey, dashed reference lines | W11 daily range (daily-allowance dashed line; no trading words) |
| 1c2f8b19 FreeDom bank | Gradient lime hero with big balance, giant % goal | W24 balance hero, W33 goal hero |

Visual direction (user decision): **near-black base + lime accent** only for actions, the primary number and "today". **Saturated category colours** (orange, blue, pink, teal, violet, amber) are used for category cards and charts. Status colours stay reserved and always come with an icon.

## 3. Widget catalogue — 42 widgets
Sizes: S square 1 cell · W wide 2×1 · L large full width 2×2. Tabs: H Home · M Money · S Savings · I Insights board · F flow/detail.
Count by tab: {'H': 7, 'I': 16, 'M': 11, 'S': 8}. (Subscriptions live on Home only: the W40 card + W41 detail.)

| ID | Widget | Question | Chart form | Size | Data fields | Tab | Default pinned | Not-enough-data rule |
|---|---|---|---|---|---|---|---|---|
| W01 | Safe to spend today | How much can I spend today and stay on plan? | Hero number + half gauge | W | budget.left, period.daysLeft, today.spent | H | Yes (#1) | Always shown; day 1 uses period budget ÷ days |
| W02 | Period pace | Am I ahead or behind for this budget period? | Pace bullet, elapsed tick, projection ghost | W | period.spent, period.budget, elapsed% | H | Yes (#2) | Needs ≥2 days of the period |
| W03 | Budget runway | At this rate, how many days does my budget last? | Dotted countdown ring, lime card | S | budget.left, 7-day avg spend | H | Yes (#3) | Needs ≥3 spend days |
| W04 | Category % cards | Which categories are near or over budget? | Bold coloured % bars (card = category, fill = used %) | L | cat.spent, cat.budget | H | Yes (#4) | Show once 1 category has spend |
| W05 | Today / period / last period | What did I spend lately? | 3 stat tiles + sparkline | W | totals by day | I | No | Needs 1 txn |
| W06 | Under-budget streak | How many days in a row have I stayed under? | Dot row (14 days) | W | daily spend vs daily allowance | I | No | Needs 3 days |
| W07 | Spend calendar | Which days ran hot, and is today normal? | Month calendar heatmap, dashed future days, today ring | L | daily totals, median | I | No | Needs 7 days |
| W08 | This vs last period | Which categories moved? | Dumbbell per category | L | cat spend p-1, p (same days) | I | No | Needs 1 full previous period |
| W09 | Category share | What % of spend goes where? | Rounded pill blocks (area = share), ≤6 + Other | S | cat spend | I | No | Needs 5 txns |
| W10 | Month by month | How did each category move over 6 months? | Pie w/ callouts + fill jars | L | cat spend by month, budget | I | No | Needs 2 months; jars show empty cells |
| W11 | Daily range | How wide was each day's spend vs daily allowance? | Range bars per day (low/high txn, close = day total) — lime under, grey over | W | txns by day | I | No | Needs 7 days |
| W12 | Repeat buys | Which small repeat purchases add up? | Pictogram rows + ₹/yr | W | merchant counts, avg | I | No | Needs a merchant with ≥3 buys |
| W13 | When I spend | What time of day does money leave? | 24h radial (toggle: part-of-day) | S | txn hour | I | No | Needs 15 txns |
| W14 | Peak hour | When is my riskiest hour today? | Big time + small arc (twitch 'followers online') | S | txn hour histogram | I | No | Needs 15 txns |
| W15 | Purchase sizes | Are my buys mostly small or big? | Histogram | W | txn amt buckets | I | No | Needs 20 txns |
| W16 | Top merchants | Who gets most of my money? | Ranked bars | W | merchant totals | I | No | Needs 3 merchants |
| W17 | Fixed vs flexible | How much of spend is committed? | 100% meter (Monarch fixed/flex) | S | subs + fixed cats vs rest | I | No | Needs 1 sub or fixed cat |
| W18 | 6-period trend | Is total spend rising? | Columns + budget line | W | period totals | I | No | Needs 2 periods |
| W19 | Income this period | How much came in, from where? | Stacked bar by source + total | W | income.amt, source | M | Yes | Needs 1 income |
| W20 | Income source mix | Which sources do I rely on? | Rounded pill blocks by source | S | income by source (3 mo) | M | No | Needs 2 sources |
| W21 | Payday calendar | When is the next money due? | Calendar, lime payday dots, dashed expected days | W | recurring income dates | M | Yes | Needs 1 recurring income |
| W22 | Expected vs received | Did income arrive as planned? | Paired bars per source | W | expected, received | M | No | Needs 1 recurring income in a closed period |
| W23 | In vs out | Did I spend more than came in? | Diverging bars per week/period | W | income, spend | M | No | Needs 2 weeks |
| W24 | Balance split | Where does my balance sit right now? | Big number + 3-segment pool bar (To assign / Budget / Savings) | W | pools | M | Yes (#1 on Money) | Always |
| W25 | Pool rings | How full is each pool? | 3 dotted rings with glyph icons | W | pools vs targets | M | No | Always |
| W26 | To assign inbox | Is there money waiting for a job? | Lime chip card + amount + Assign button | S | toAssign, savedFromBudget | H | Yes (auto when > 0) | Hidden when ₹0 |
| W27 | Balance history | How has my balance moved, by pool? | Stacked area (3 pools), scrub tooltip | L | daily pool snapshots | M | No | Needs 14 days |
| W28 | Money flow | Where did this period's money go? | Sankey: income sources → pools → categories/goals | L | income, transfers, spend | M | No | Needs 1 income + 5 txns |
| W29 | End-of-period forecast | Where will I end up? | Line to period end with range band + next payday | W | balance, avg spend, expected income | M | No | Needs 7 days |
| W30 | Transfers log | What moved between pools? | Timeline list, typed glyph per move | W | transfers[] | M | No | Needs 1 transfer |
| W31 | Overspend covers | What paid for overspending? | Stacked bar by cover source (To assign / category / goal / let go) | S | covers[] | I | No | Needs 1 cover |
| W32 | Savings rate | What share of income did I save? | Waffle 10×10 + big % | S | saved ÷ income | S | Yes | Needs 1 income |
| W33 | Goal hero | How close is my top goal? | Gradient hero, giant % | L | goal.saved/target | S | Yes | Needs 1 goal |
| W34 | Goal tiles | How are all goals doing? | Quarter-circle glyph tiles (quarters fill = 25% steps) + ring | W | goals[] | S | Yes | Needs 1 goal |
| W35 | Goal ETA | Will I hit the date? | Step-line + projection + target marker | W | contributions, byDate | S | No | Needs 3 contributions |
| W36 | Sweeps this period | How much leftover got swept? | Column per day/week, auto vs manual tone | W | sweeps[] | S | No | Needs 1 sweep |
| W37 | Saved from budget (pending) | What swept money is still waiting for a goal? | Chip card + pick-goal button | S | savedFromBudget | S | Auto when > 0 | Hidden when ₹0 or sweep=Auto |
| W38 | Contribution sources | What fills my savings? | 100% bar: income rule / sweep / round-up / manual | S | contributions by type | S | No | Needs 3 contributions |
| W39 | Withdrawals & slips | How often did I dip into goals? | Dot strip of withdrawals + goal slip days | W | withdraw/cover transfers | S | No | Needs 1 withdrawal |
| W40 | Subscriptions due | What's charging soon? | Compact card: next 3 with icon rings + due-soon chip | W | subs next due | H | Yes | Needs 1 sub |
| W41 | Subs detail: calendar + yearly | When do subs hit and what's the yearly cost? | Calendar dots + 12-cell pictogram (detail screen) | L | subs[] | H→F | n/a (screen) | Needs 1 sub |
| W42 | Insight 2×2 | What 4 things changed this week? | 2×2 small cards: big number + delta + micro chart | L | derived deltas | I | No | Each tile hides itself below its rule |

Default Home order: W01 Safe to spend (W) · W26 To assign inbox (S, only when > 0) + W03 Runway (S) · W02 Pace (W) · W04 Category % cards (L) · W40 Subs due (W). Every Insights-board widget can also be pinned to Home, up to 8 pins.

## 4. Open questions for the user
1. **Income categories:** go with Allowance, Stipend, Part-time, Freelance, Scholarship, Gift, Refund, Repayment, Other? Can users add their own?
2. **Leftover at period end with Manual sweep ignored:** does unswept leftover (a) roll into the next period's Budget, (b) auto-move to To assign as "saved from budget" after N days, or (c) stay stuck until the user acts?
3. **Import format:** do we assume bank-statement CSV/XLSX with one Amount column plus a Dr/Cr column (common in Indian bank exports), or also UPI-app statement PDFs (out of scope)? Is the date format DD/MM/YYYY by default?
4. **Friend repays you in UPI mode:** does the credit land in To assign as income ("Repayment"), or go back into the category it was spent from (reducing that category's spend)?
5. **Uncovered overspend ("let it go over"):** is it deducted from the next period's To assign (YNAB style), or does it only show as a red mark with no carry?
6. **Goal lock:** should a goal support a PIN "lock" (Jupiter users asked for it), and do covers from a locked goal need the PIN too?
