# Trickle v12 — Phase 1: Recovery audit

Sources: v11_phase1_audit, build notes v6–v11, v7 widget catalogue, v9 spec, v11 viz + execution docs; builds v2–v11 opened in Playwright (412×860, `#demo`); new element shots of all 8 visible v9 Insights widgets plus crops of v7 Insights, v6 subscription detail and the v11 audit shots. Constraint held: UPI link or manual entry only; the lo-fi SMS screen is listed only as a NO.

## Counts
- Items inventoried: **152** (kept in v11: 46, partial: 23, dropped: 83)
- Recommendation: **MUST 78** (45 already in v11 + **33 to bring back**), **NICE 34**, **NO 40**
- Depth for returning MUSTs: Glance 3, Explore 16, Detail 14

## Principle for returning items
Nothing returns to Home as a number. Glance = a Home card or a moment that needs no reading; Explore = one tap (a card on Insights, a section on Money, a sheet); Detail = two taps or Settings. A returning insight must answer one question a student actually asks, and use the ₹100 tile, a word, or a position (calendar/time) — never a new chart vocabulary.

## Why v11 lost so much
1. The v11 rebuild started from the core loop (pay, glance, income, save) and stopped there: Actions tab, transactions list and goal detail were never rebuilt, not rejected.
2. Every widget that could not be drawn in ₹100 tiles was cut (time of day, month-by-month, ETA).
3. Editing (jars, periods, income sources, savings share) was folded into a 4-tap setup with no way back.
4. Some cuts were deliberate and stay cut: numbers on Home, red, cover sheets, streaks, sliders, chart-library breadth.


## Tracking
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Linked UPI IDs (more than one) | 2-10 | Which of my UPI apps is tracked? | Partial | v11 has one ID, no "link another" | L | **MUST** | Detail | Most students use 2 apps (GPay + PhonePe); one ID misses spends |
| 2 | Manual spend entry ("Log cash") | 2-10 | How do I add a cash spend? | Partial | only a setup pad; Pay assumes UPI | L | **MUST** | Glance | Constraint: manual must be as fast as UPI; one button beside Pay |
| 3 | Manual-only tracking path | 6-9 | Can I use Trickle without linking UPI? | Dropped | setup collapsed to 4 taps | M | **MUST** | Detail | Hard constraint says UPI or manual; both paths must exist |
| 4 | All spends list with filter chips | 2,6,7,8,9 | What did I actually buy? | Dropped | cut to keep numbers off screens | M | **MUST** | Explore | Basic trust: people check a list before trusting a chart |
| 5 | Spend detail (change jar, split, source) | 6-9 | Was this put in the right jar? | Dropped | no list, so no detail | M | **MUST** | Detail | Wrong categories poison every insight |
| 6 | Sort an unknown UPI payment (top 3 guesses) | 7,8,9 | What was "PAYTM*QR7731"? | Dropped | Actions tab removed | M | **MUST** | Explore | UPI merchant names are cryptic; one-tap guess keeps data clean |
| 7 | Remember payee to jar | 7,8 | Will it remember next time? | Dropped | not rebuilt | L | **MUST** | Detail | Invisible default; reduces sorting to near zero |
| 8 | Recent spends on Home (size glyph) | 2-10 | Did that payment go through? | Dropped | Home kept at 0 numbers | L | **NICE** | Glance | Reassurance; show 3 tile glyphs, amount on tap |
| 9 | Bank statement CSV/Excel import | 7,8 (placeholder) | Can I bring my last month in? | Dropped | never built | H | **NICE** | Detail | Fills week-1 empty state; complex mapping |
| 10 | UPI / Manual badge on rows | 6,7 | Where did this entry come from? | Dropped | noise | L | **NICE** | Detail | Only in spend detail |
| 11 | Linkage diagram and source share bar | 6,7 | How much is auto-tracked? | Dropped | numbers, low value | M | **NO** | — | Designer view, not a user question |
| 12 | Unknown credit question | 11 | Is this money in mine? | Kept | — | L | **MUST** | Explore | Kept |
| 13 | UPI AutoPay detection | 11 | Which charges repeat? | Kept | — | M | **MUST** | Detail | Kept (simulated) |
| 14 | Undo toast on money actions | 7-11 | Can I take that back? | Kept | — | L | **MUST** | Glance | Kept |
| 15 | Ledger invariant check | 7-11 | Are the numbers right? | Kept | — | M | **MUST** | Detail | Kept, internal |

## Paying
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 16 | Scan QR entry point | 6,7,8 | Pay a shop fast | Partial | Pay starts at "pick who" | L | **MUST** | Glance | The most common student payment; one tap from Pay |
| 17 | Pay contact / bank transfer screens | 6,7 | Pay a friend or account | Dropped | UPI app does this | M | **NO** | — | Hand-off to UPI app covers it |
| 18 | Category tiles leave at pay | 8-11 | What does this cost my jar? | Kept | — | M | **MUST** | Glance | Core v11 moment |
| 19 | Friction sheet with pace tick | 2,6 | Should I really buy this? | Dropped | replaced by tiles leaving | M | **NO** | — | Tiles leaving is the friction |
| 20 | "Food can cover this" line | 8-11 | Is there room? | Kept | — | L | **MUST** | Glance | Kept |
| 21 | Empty jar: take from another jar | 7,8,11 | What if the jar is empty? | Kept | — | M | **MUST** | Explore | Kept (P-05) |
| 22 | 4-option cover sheet with slip line | 7 | Where should overspend come from? | Dropped | 29 numbers, panic | H | **NO** | — | One preselected choice replaced it |
| 23 | "Next month starts a little lighter" | 8,11 | Can I borrow from next month? | Kept | — | L | **MUST** | Explore | Kept |
| 24 | Repeat line "3rd time this week" | 9,11 | Am I doing this a lot? | Kept | — | L | **MUST** | Glance | Kept |
| 25 | Round-up to savings at pay | 6,7 | Can small change save for me? | Dropped | extra decision | M | **NICE** | Detail | Opt-in setting; Fi/Jupiter users like it; off by default |
| 26 | Split at pay | 7-11 | Friends will pay me back | Kept | — | M | **MUST** | Explore | Kept |
| 27 | Suggested jar at pay | 8-11 | Which jar? | Kept | — | L | **MUST** | Glance | Kept |
| 28 | Live impact bullet on entry | 6,7 | How does this move my budget? | Dropped | numbers | M | **NO** | — | Tiles leaving shows it |
| 29 | Pre-pay interstitial (lo-fi) | Lo-fi | Pause before paying | Dropped | superseded | M | **NO** | — | Superseded by tile moment |

## Budgeting
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 30 | Jar tile bars | 8-11 | How much is left per jar? | Kept | — | M | **MUST** | Explore | Kept |
| 31 | Jar history (spends + weeks in jar detail) | 4-7 | Where did my Food money go? | Partial | M-02 shows tiles only | M | **MUST** | Detail | Answers "why is Food low" without a chart library |
| 32 | Category % cards on Home | 7 | Which jar is near empty? | Dropped | 75 numbers on Home | M | **NO** | — | Ostrich effect; budget stays off Home |
| 33 | Safe to spend today | 3-7 | How much today? | Dropped | number on Home caused panic | M | **NICE** | Detail | Only on tap inside Money, words first |
| 34 | Budget runway "lasts till ~28th" | 7 | Will it last the month? | Dropped | alarm framing | M | **NICE** | Explore | As words in jar detail: "Food lasts to about the 26th" |
| 35 | Pace projection bullet | 5,6,7 | Where will I end the month? | Partial | glow word only | M | **NICE** | Detail | Glow stays the glance; projection one tap deeper |
| 36 | Pace glow + word | 8-11 | Am I on track? | Kept | — | L | **MUST** | Glance | Kept |
| 37 | Move tiles between jars | 7,8,11 | Shift money between jars | Kept | — | M | **MUST** | Explore | Kept |
| 38 | Weekly period option | 7,8,9 | My allowance comes weekly | Dropped | monthly-only build | M | **MUST** | Detail | Many students get weekly money; setting, not setup |
| 39 | Payday-aligned period | 7 | Month starts on my payday | Dropped | monthly-only build | M | **NICE** | Detail | Same setting as weekly |
| 40 | Edit jars (add, rename, remove) | 6-9 | I spend on gym, not study | Dropped | fixed by student type | M | **MUST** | Detail | Fixed jars break for real users |
| 41 | Edit jar amount | 6-9 | Food needs more | Partial | only via move tiles | L | **MUST** | Detail | Direct edit is expected |
| 42 | Copy last month's budget | 7,11(notes) | Same as last month? | Partial | planned, not visible | L | **MUST** | Detail | Default at month start; zero effort |
| 43 | Fill underfunded first | 7 | Top up the empty ones | Dropped | jargon | L | **NO** | — | Auto-split already does it |
| 44 | Fixed vs flexible meter | 6,7 | How much is committed? | Partial | hatched subs block | L | **NO** | — | Hatched block already shows it |
| 45 | Red "Carried −₹240" | 7 | What did I overspend? | Dropped | debt framing | L | **NO** | — | Never again (no red) |
| 46 | Daily allowance number | 2,6 | Per-day budget | Dropped | numbers | L | **NO** | — | Glow covers pace |
| 47 | Gentle "jar nearly empty" nudge | 6,7 | Warn me before it runs out | Dropped | alerts dropped with red | M | **NICE** | Detail | Opt-in, worded softly, ≤1/day |
| 48 | Per-category rollover rules | 7 | Keep unused Food for next month | Dropped | complexity | M | **NO** | — | Left over → savings is simpler |

## Income
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 49 | Auto-split with undo | 8-11 | Where does new money go? | Kept | — | M | **MUST** | Explore | Kept |
| 50 | Income sources list | 7,8,9 | Allowance, café shift, stipend | Partial | unknown-credit question only | M | **MUST** | Explore | Students juggle 2–3 sources |
| 51 | Income source mix chart | 7 | Which source matters most? | Dropped | breadth | M | **NO** | — | A list answers it |
| 52 | Next money in (payday) | 7 | When does money come next? | Dropped | not rebuilt | L | **MUST** | Glance | Calming fact, no budget number: "Allowance in 9 days" |
| 53 | Expected vs received | 7 | Did it all arrive? | Dropped | breadth | M | **NO** | — | Edge case |
| 54 | In vs out by week | 7 | Did I spend more than came in? | Dropped | dense | M | **NICE** | Detail | Merged into month vs month |
| 55 | "To assign" inbox | 7 | Money waiting for a job | Dropped | jargon, chore | M | **NO** | — | Auto-split replaced it |
| 56 | New money sheet | 8-11 | Money landed | Kept | — | L | **MUST** | Glance | Kept (N-01) |
| 57 | Edit savings share of income | 7,8,11(setup) | Save more from each payment | Partial | only in setup | L | **MUST** | Detail | Needs a later edit point |
| 58 | Total balance | 2-11 | How much do I have? | Kept | — | L | **MUST** | Explore | Kept (Money, one number) |
| 59 | Balance split bar | 7,11 | Where is it sitting? | Kept | — | L | **MUST** | Explore | Kept |
| 60 | Balance history area | 7 | How has it moved? | Dropped | numbers | M | **NO** | — | Low action value |
| 61 | End-of-month forecast range | 7 | Where will I end up? | Dropped | numbers, alarm | M | **NICE** | Detail | As tile range "likely / possible" |
| 62 | Moves log | 7 | What moved between jars? | Dropped | breadth | L | **NICE** | Detail | Lives in All spends list |

## Savings & goals
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 63 | Goal tiles / waffle | 7,8,9,11 | How close is Goa? | Kept | — | M | **MUST** | Explore | Kept |
| 64 | Multiple goals | 6-11 | Goa and a laptop | Kept | — | L | **MUST** | Explore | Kept |
| 65 | Goal create with head start | 6-11 | Start a goal | Kept | — | L | **MUST** | Explore | Kept |
| 66 | Goal detail with contributions | 6-9 | What filled this goal? | Partial | rows only | M | **MUST** | Detail | Goal gradient needs a story of progress |
| 67 | Goal ETA ("on track for Dec") | 6,7,9 | When will I get there? | Dropped | not rebuilt | M | **MUST** | Explore | Strongest motivator; words + dot path |
| 68 | Goal reached moment | 6-11 | I made it | Kept | — | L | **MUST** | Glance | Kept |
| 69 | Rainy-day jar | 8,9 | Money for surprises | Partial | merged into savings | L | **NICE** | Explore | Students value a buffer; one fixed goal |
| 70 | Savings rate waffle | 7,9 | What share did I keep? | Dropped | library cut | L | **NICE** | Explore | Ratio, not ₹; pairs with story |
| 71 | Savings growing by month | 9 | Am I saving more over time? | Dropped | library cut | M | **MUST** | Explore | Peak-end: end the month on progress |
| 72 | Contribution sources bar | 6,7,9 | What fills my savings? | Dropped | breadth | M | **NO** | — | Goal detail list covers it |
| 73 | Withdrawals & slips | 7 | How often did I dip in? | Dropped | guilt | M | **NO** | — | Guilt framing |
| 74 | Goal lock | 7(question) | Stop me taking from Goa | Dropped | never built | M | **NICE** | Detail | Asked for by Jupiter users; opt-in |
| 75 | Leftover swept chart | 7 | How much got saved at month end? | Dropped | merged | L | **NO** | — | Savings growing shows it |
| 76 | Saved this month card | 11 | Did I save? | Kept | — | L | **MUST** | Glance | Kept |
| 77 | Quick add ₹100/₹500 to goal | 8,9 | Put a bit aside now | Partial | via move only | L | **MUST** | Explore | One-tap saving; matches tile unit |
| 78 | Goal milestones 25/50/75% | 9(sound) | Small wins | Dropped | not rebuilt | L | **NICE** | Explore | Goal gradient; chime + one line |

## Subscriptions
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 79 | Subscriptions list with due ring | 3-11 | What renews when? | Kept | — | M | **MUST** | Explore | Kept |
| 80 | "Next to come out" card | 11 | What leaves next? | Kept | — | L | **MUST** | Glance | Kept |
| 81 | Yearly cost (12-cell) | 6,7 | What does Spotify cost a year? | Dropped | not rebuilt | L | **MUST** | Explore | The eye-opener behind cancelling |
| 82 | Price change sheet | 6,11 | Netflix went up | Kept | — | L | **MUST** | Explore | Kept (N-02) |
| 83 | Price history line | 6 | How has it changed? | Dropped | numbers | L | **NO** | — | Sheet covers it |
| 84 | Subscriptions calendar | 6,7,9 | Which days do they hit? | Dropped | library cut | L | **NICE** | Explore | Month-so-far calendar can mark them |
| 85 | Renew reminder: Keep / I'll cancel | 8 | Cancel before it renews | Partial | stop tracking only | L | **MUST** | Explore | Real saving action, one day before |
| 86 | Add subscription (3 steps) | 6,7,11 | Track a new one | Kept | — | L | **MUST** | Detail | Kept |
| 87 | Subscription share donut | 6 | Which costs most? | Dropped | donut ban | L | **NO** | — | List sorted by cost does it |

## Splits & owed
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 88 | Friends owe you | 7-11 | Who owes me? | Kept | — | M | **MUST** | Explore | Kept |
| 89 | Remind (share message) | 7,8,9 | Nudge Arjun | Partial | button only | L | **MUST** | Explore | Copy/share text is the whole job |
| 90 | Paid back returns to jar | 7,8,9,11 | Where does repayment go? | Kept | — | M | **MUST** | Detail | Kept |
| 91 | Split later / pending split | 7 | Split this after dinner | Dropped | not rebuilt | M | **NICE** | Explore | Common: bill paid, people sorted later |
| 92 | I owe others | Expl (Split) | Who do I owe? | Dropped | never built | M | **NICE** | Detail | Completes the pair; outside budget |
| 93 | Group ledger app (Split concept) | Expl | Trip expenses | Dropped | separate app | H | **NO** | — | Splitwise exists |

## Repeat buys
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 94 | Little things Home card | 9,11 | What small things add up? | Kept | — | L | **MUST** | Glance | Kept |
| 95 | Repeat buys per place (×visits) | 9 | Where do I keep going? | Partial | 2 rows only | L | **MUST** | Explore | Direct differentiator |
| 96 | Repeat buys detail (₹ a year) | 6,9 | What does chai cost a year? | Dropped | not rebuilt | M | **MUST** | Explore | Annualised cost changes behaviour |
| 97 | "Skip 2 chais ≈ Goa 2 weeks sooner" | 9 | What if I cut back? | Dropped | not rebuilt | L | **MUST** | Explore | Links habit to goal without guilt |
| 98 | How often (dot grid) | 9 | Which days? | Dropped | library cut | L | **NICE** | Detail | Second-level detail |
| 99 | Trend word (fewer / more) | 9 | Is it growing? | Dropped | library cut | L | **NICE** | Explore | One word, no chart |
| 100 | Repeat threshold 3×/4×/5× | 9 | What counts as repeat? | Dropped | setting cut | L | **NICE** | Detail | Settings only |
| 101 | Accumulation 24h strip | 6 | When do I buy chai? | Dropped | dense | M | **NO** | — | Low value |

## Insights & charts
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 102 | Week vs last week | 8,11 | Better than last week? | Kept | — | L | **MUST** | Glance | Kept |
| 103 | Month-so-far calendar | 3,7,9,11 | Which days were heavy? | Kept | — | M | **MUST** | Explore | Kept |
| 104 | Where it went | 5-11 | What did I spend on? | Kept | — | L | **MUST** | Explore | Kept |
| 105 | Money flow (Sankey) | 6,7,9,10,11 | Where did all money go? | Partial | simplified to flow of tiles | H | **NICE** | Detail | v9 Sankey was the most-liked deep view |
| 106 | Spend range per week | 7,9,11(lib) | Steady or spiky? | Partial | library only | M | **NICE** | Detail | Keep in library |
| 107 | This vs last month by jar | 6,7,9 | Which jar changed? | Dropped | not rebuilt | M | **MUST** | Explore | The question users ask most after "where" |
| 108 | Month by month (6 months) | 4,6,7,9 | Long view | Dropped | not rebuilt | M | **MUST** | Detail | Needed once there is history |
| 109 | When you spend (time of day) | 5,6,7,9 | Evenings? | Dropped | leaves tile | M | **NICE** | Detail | Library; words "mostly evenings" |
| 110 | Weekday pattern | 3,5,9 | Weekends? | Dropped | low value | M | **NO** | — | Calendar already shows it |
| 111 | Top places | 6,7,9 | Who gets most of my money? | Dropped | not rebuilt | L | **MUST** | Explore | Big places, not only repeats |
| 112 | Purchase sizes histogram | 6,7,9 | Mostly small buys? | Dropped | low value | M | **NO** | — | Low action value |
| 113 | Biggest buy this week | 7 | What was the big one? | Dropped | breadth | L | **NICE** | Explore | One story card |
| 114 | "4 things changed" summary | 7 | What changed? | Dropped | numbers | M | **NICE** | Explore | One sentence insight per week in check-in |
| 115 | Late-night buys | 6,7 | Do I spend at night? | Dropped | breadth | L | **NICE** | Explore | One-line insight if true |
| 116 | Not-enough-data ghost state | 7 | Why is this empty? | Dropped | not rebuilt | L | **MUST** | Explore | Week 1 needs honest empty states |
| 117 | Text insight cards (8) | 2,5 | Facts as text | Dropped | text-heavy | L | **NO** | — | Rejected in v3 |
| 118 | Radar / bubble / radial arcs / scatter | 5,6 | Chart variety | Dropped | misleading | M | **NO** | — | Never again |
| 119 | Treemap | 6, redesign | Share by area | Dropped | dense | M | **NO** | — | Where it went covers it |
| 120 | Per-screen metaphors (road, iceberg…) | redesign | Emotional visuals | Dropped | nothing learnable | H | **NO** | — | Never again |
| 121 | MoM sparklines | 4 | Trend at a glance | Dropped | numbers | L | **NO** | — | Month by month replaces |
| 122 | Under-budget streak dots | 6,7 | Days in a row under | Dropped | streak ban | L | **NO** | — | Never again (streaks) |
| 123 | Overspend covers chart | 7 | What paid for overspend? | Dropped | debt framing | L | **NO** | — | Never again |
| 124 | Heatmap + range strip | 3,6 | Hot days | Partial | calendar | M | **NO** | — | Month-so-far calendar replaced |

## Settings
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 125 | Widget library: pin, reorder, hide | 7,8,9,11(add only) | Make Home mine | Partial | add only, no reorder | M | **NICE** | Explore | Cap Home at 5 cards |
| 126 | Per-widget ⚙ sheet | 9 | Tune a card | Dropped | chrome | L | **NO** | — | Too much control |
| 127 | Colour / B&W look | 9,10,11 | Calmer look | Kept | — | L | **MUST** | Detail | Kept |
| 128 | Sounds on/off | 9-11 | Mute | Kept | — | L | **MUST** | Detail | Kept |
| 129 | Less motion | 8-11 | Calmer motion | Kept | — | L | **MUST** | Detail | Kept |
| 130 | Dark / light theme | 2,11 | Theme | Kept | — | L | **MUST** | Detail | Kept |
| 131 | App PIN / lock | Lo-fi,6,7 | Keep my money private | Dropped | setup trimmed | M | **MUST** | Detail | Money app trust; offered after setup |
| 132 | Permissions screen | 6,7 | What can Trickle see? | Dropped | no SMS → little to ask | L | **NO** | — | Privacy line covers it |
| 133 | Privacy line (local-first) | 2-11 | Is my data safe? | Kept | — | L | **MUST** | Detail | Kept |
| 134 | Notification settings (caps, quiet hours) | Lo-fi,6,7,11(stated) | Control nudges | Partial | stated, not editable | L | **MUST** | Detail | Respect = retention |
| 135 | Plain-words glossary / help | 8 | What is a tile? | Partial | key only | L | **NICE** | Detail | One sheet |
| 136 | Prototype demo controls | 8,9,11 | Show a moment | Kept | — | L | **NICE** | Detail | Kept for testing |

## Onboarding
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 137 | Splash with tiles | 8-11 | What is this? | Kept | — | L | **MUST** | Glance | Kept |
| 138 | 4-tap setup with student type | 11 | Get started fast | Kept | — | M | **MUST** | Glance | Kept |
| 139 | Tile key taught once | 9-11 | What is ■? | Kept | — | L | **MUST** | Glance | Kept |
| 140 | Allocation pie + 7 sliders | 6,7 | Plan every jar | Dropped | 54 numbers | H | **NO** | — | Never again |
| 141 | Skip to demo | 8,9,11 | Look first | Kept | — | L | **MUST** | Glance | Kept |
| 142 | First goal in setup | 8 | Save for something | Dropped | one-decision rule | L | **NICE** | Explore | Offer after first week instead |
| 143 | Period choice in setup | 7,8 | Weekly or monthly | Dropped | extra step | L | **NO** | — | Settings, default monthly |
| 144 | SMS permission screen | Lo-fi | Read SMS | Dropped | constraint | M | **NO** | — | Hard constraint: never |

## Retention
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 145 | Weekly check-in | 8,9,11 | How did the week go? | Kept | — | M | **MUST** | Explore | Kept |
| 146 | Month story → fresh start | 8,9,11 | How did the month end? | Kept | — | M | **MUST** | Explore | Kept |
| 147 | Repeat buys card in check-in | 9 | Little things last week | Dropped | not rebuilt | L | **MUST** | Explore | Ties the differentiator to the weekly loop |
| 148 | Story card "Biggest buy" / "Little things pour" | 9 | Month highlights | Partial | 5 cards, fewer types | L | **NICE** | Explore | Variety keeps the story fresh |
| 149 | Savings / income sounds | 9,11 | Feel the win | Kept | — | L | **MUST** | Glance | Kept |
| 150 | One "for you" card (sort, settle, renew) | 7,8,9 | What needs me? | Dropped | inbox removed | M | **NICE** | Glance | At most one, no badge, no count |
| 151 | "N things need you" badge | 7 | To-do list | Dropped | anxiety | L | **NO** | — | Never again |
| 152 | Streaks / points | 6,7 | Gamification | Dropped | what-the-hell effect | L | **NO** | — | Never again |

## Questions for Tarun (Phase 1 decisions)

**Q1. Where does the All spends list live?**
- A · Money › "All spends" row (list + filters + spend detail)
- B · Inside each jar only
- C · Search from Insights
- Recommendation: **A** — Trust needs one plain list; Money already holds the numbers, Home stays clean.

**Q2. Can Home gain one calm fact card: "Next money in · Allowance in 9 days"?**
- A · Yes, default Home card (no ₹ until tap)
- B · Library only
- C · No
- Recommendation: **A** — A date, not a budget; it reduces anxiety near month end without breaking the no-budget rule.

**Q3. How do comparison insights return (this vs last month by jar, month by month, top places)?**
- A · One "What changed" card on Insights: words + tile rows, month-by-month one tap deeper
- B · Three separate library cards
- C · Keep them out
- Recommendation: **A** — One card, one question; depth carries the long view.

**Q4. How much editing comes back?**
- A · Edit jars (add/rename/amount), weekly or payday period, savings share, income sources — all in Money/Settings
- B · Only jar amounts
- C · None; setup again to change
- Recommendation: **A** — Real students differ from the 5 starter jars; editing lives one layer down so Home is untouched.

**Q5. Do the v9 deep views (Sankey flow, spend range, time of day) return?**
- A · Yes, in an Insights library, not on the default board
- B · Sankey only, as the month-story card
- C · No
- Recommendation: **A** — They were liked as discovery views; library keeps the default board at 3–4 cards.

**Q6. Should one "for you" card return (sort an unknown payment, settle a split, renewal tomorrow)?**
- A · Yes, max one at a time on Home, no badge or count
- B · Only as notifications
- C · No
- Recommendation: **A** — Unsorted payments silently break every insight; one card keeps the one-decision rule.


## Remap after Tarun's answers (2026-10-01)
Tabs are now **Home · Income · Spending · Savings · Insights** (Money tab is gone). Depth labels stay; locations move:
- **Home (Glance):** pace glow, little things, saved this month, next to come out, **Next money in** (no ₹), bell (activity log, action items on top, soft dot, no count). Log cash + Scan QR beside Pay. Recent-spend glyphs (NICE) also here.
- **Income:** auto-split + undo, new money sheet, income sources, unknown credit, total balance + split bar, next money in detail, forecast range (NICE). Settings: savings share, period (weekly/payday), income sources, UPI IDs + manual-only path.
- **Spending:** jar tile bars, move tiles, jar detail/history + runway words, **All spends list** + filters + spend detail (change jar, split, remember payee), sort unknown payments, subscriptions (list, due ring, yearly cost, renew Keep/Cancel, price change), splits/owed + remind, repeat buys (per place, ₹ a year, skip-to-goal). Settings: edit jars, amounts, copy last month, subscriptions, nudges.
- **Savings:** goals (tiles, multiple, create, detail + contributions, ETA, quick add ₹100/₹500, milestones, lock), saved this month, savings growing, rainy-day (NICE).
- **Insights:** where it went, week vs last week, calendar, top places, **What changed** (month-by-month one tap deeper), weekly check-in, month story, ghost states; library: Sankey, spend range, time of day, savings rate, late-night, biggest buy.
- **Global settings:** look (colour/B&W), theme, sounds, less motion, PIN, notifications, privacy, glossary. Every tab: first-visit intro, reopen via "?".
- "For you" card (#150) is replaced by the bell's action items; the activity log also absorbs the moves log (#62).

## Implications for Phase 2+
- Phase 2 tiles must cover: per-place repeat rows, yearly-cost 12-cell strip, ETA dot path, savings growing columns, what-changed rows.
- Phase 3 library: Sankey, range, time of day, calendar marks for subscriptions, goal ETA, month-by-month.
- Phase 4 IA must place: All spends list, edit points, one "for you" card, library.
