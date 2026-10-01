# Trickle v12 — Phase 3: Insight & visualization library

Board: Phase 3 section (filter by tab, colour/B&W). Seed: ₹9,000 in (allowance 7,000 + café 2,000), day 18 of 30; jars Food 2,500 / Travel 1,500 / Fun 2,000; subs ₹499 held; Goa ₹4,160 of ₹8,000. Locked system per claude/v12_decisions.md (Merging Dots base, Day lanes in Spending, left = category colour, green = savings only, no red).

## Palette (validated, dataviz validator, all pairs)
- Light: Food #b7791f · Travel #2f63c9 · Fun #93306b · Savings #1f9b84 — all checks pass.
- Dark: Food #ad7c26 · Travel #5a8ae6 · Fun #b9407f · Savings #22a385 — pass; Fun↔Savings deutan ΔE 7.6 (floor band) so labels/position always accompany.
- Violet was rejected (protan ΔE 0.1 vs blue). Max 3 jar colours + green before a fourth hue fails; further jars need texture or labels. Income = neutral ink shades.

## Converge: 31 insights
| # | Insight | Question | Alternatives (A rec) | Tab | Depth | Default/Library | Home | Why |
|---|---|---|---|---|---|---|---|---|
| 1 | Pace / day allowance | Can I afford this today? | A: Day lanes (week) / B: Glow track + word / C: Runway dots | Spending | glance | default | yes (no ₹) | Per-day allowance is the most actionable framing (M3: YNAB 2016; Gigerenzer & Hoffrage 1995 natural frequencies). Day lanes were adopted for Spending; overspend re-spreads, no blame. On Home it drops to the glow word only. |
| 2 | Jar left | How much is left per jar? | A: Merging Dots per jar / B: Upright lanes / C: One combined row | Spending | glance | default | yes (no ₹) | Leftover-first with the whole visible (M1, M14: Olafsson & Pagel 2018; Heath & Soll 1996 mental accounts). Rows share a left edge so jars compare on a common baseline (Cleveland & McGill 1984). |
| 3 | Little things (Home) | What small things add up? | A: Wedges only, no ₹ / B: Wedges merging to dots | Home | glance | default | yes (no ₹) | Home carries no numbers (P2c-Q1). Pie wedges stacking show crumbs adding up by area alone (M4: Haroz 2015; Soman 2001). |
| 4 | Repeat buys | Where do I keep going? | A: Crumbs → dots / B: Visit tally / C: Year at this pace | Spending | explore | default | — | Crumbs merging into ₹100 dots make the accumulation visible in the one unit (M4: Kay et al. 2016; Haroz 2015). The yearly view is the detail layer (rec #96). |
| 5 | Small buys add up | Do little buys matter? | A: Crumb field → merged dots / B: Count share vs money share / C: Sentence | Insights | explore | default | — | Same mechanism as repeat buys but across all places; the merge is the insight (Soman 2001 payment transparency). |
| 6 | Category share | Where does most of it go? | A: 100-dot waffle / B: Split pill / C: Ranked rows | Insights | explore | default | — | A 100-dot waffle gives a frequency-format share ("46 of every 100", Gigerenzer & Hoffrage 1995; Garcia-Retamero 2010) and keeps the dot vocabulary; split pill loses countability. |
| 7 | What changed | What is different this week? | A: One change + ghost / B: All jars, change only / C: Chips | Insights | explore | default | — | One sentence + the ghost of last period with hatched extra (decided P2c-Q4; Lan et al. 2023 one-message charts). One change beats a list for low-load reading. |
| 8 | Category drift (month vs last) | Which jar changed? | A: Ghost + hatched per jar / B: Dumbbell positions / C: Word list | Insights | detail | library | — | Ghost-of-last-period is the locked comparison language; dumbbell uses position (allowed) but adds a second vocabulary. |
| 9 | Top places | Who gets most of my money? | A: Ranked merging rows / B: One dot field / C: Equivalent line | Spending | explore | library | — | Ranked rows on a shared baseline are the most accurate comparison (Cleveland & McGill 1984). |
| 10 | Time of day | When do I spend? | A: 24-slot glow strip / B: Four parts of day / C: 24h glow ring | Insights | detail | library | — | Time is position, so glow is allowed (P2-Q3). A straight strip beats a ring for reading order (v6 radial clock was hard to read); the word "mostly late evenings" carries it. |
| 11 | Weekday pattern | Which days are heavy? | A: 7 day lanes / B: Weekday glow / C: Sentence | Insights | detail | library | — | Day lanes are already the Spending view, so the usual week reuses them (one vocabulary, Neurath). |
| 12 | Calendar | Which days were heavy? | A: Glow calendar / B: ₹100 dots per day / C: 30 day lanes | Spending | explore | library | — | Calendar is position data: glow per day, today ringed. Dots-per-day is countable but dense at phone size. |
| 13 | Spend range | Steady or spiky? | A: Usual-week dot range / B: Frequency: 3 of 10 days / C: Glow strip | Insights | detail | library | — | Kay et al. 2016: discrete outcome dots beat intervals for lay readers (M12); M11 frequency is the alt sentence. |
| 14 | Big one-offs | What was the big one? | A: Big vs usual ghost / B: Top 3 list / C: Frequency line | Insights | explore | library | — | Perspective against the user's own usual buy (Barrio 2016; Riederer 2018). |
| 15 | Subscriptions held & next due | What leaves next? | A: Held dots + due track / B: Year at this rate / C: Due calendar | Spending | glance | default | yes (no ₹) | Held money as dashed dots inside the budget, next due as glow on the month track (time = glow). Home shows only the track. |
| 16 | Subscription yearly cost | What does it cost a year? | A: 12× pills / B: Due calendar | Spending | detail | library | — | Annualising is the eye-opener behind cancelling (rec #81); pills keep the ladder. |
| 17 | Income sources | Where does my money come from? | A: Merging Dots by source / B: Upright lanes | Income | explore | default | — | Part-to-whole pills (M7: Neurath; Park 2018). Income uses neutral ink shades, not green. |
| 18 | Next money in | When does money come next? | A: Month track position / B: Countdown marks / C: Sentence | Income | glance | default | yes (no ₹) | Time = position + glow; no ₹, so Home-eligible (decided Q2). |
| 19 | Income split | Where did new money go? | A: Part-to-whole pills / B: Hourglass drop | Income | glance | default | — | M7 part-to-whole; the hourglass drop is the pay motion, not the static view. |
| 20 | Money flow (Sankey) | Where did all money go? | A: Dot-ribbon Sankey / B: Two-column flow / C: Three steps | Insights | detail | library | — | v9's most-liked deep view; ribbon widths are on the same ₹ scale, nodes in category colour, spent ribbons outlined. |
| 21 | Savings rate | What share did I keep? | A: Ten dots / B: 100 dots / C: Sentence | Savings | explore | library | — | Ratio as "2 of 10" is a natural frequency (Gigerenzer & Hoffrage 1995); 10 dots read faster than 100. |
| 22 | Goal progress | How close is Goa? | A: Saved green, to-go outline / B: Bangles / C: Hourglass | Savings | glance | default | yes (no ₹) | M6 saved/to-go (Kivetz 2006 goal gradient). Bangles stay as the complete motion, not the static form. |
| 23 | Goal ETA | When will I get there? | A: Glow path by month / B: Projected lanes / C: Sentence | Savings | explore | default | — | Future-self path (M13: Hershfield 2011); time → glow allowed. |
| 24 | Savings growth | Am I saving more? | A: Monthly green lanes / B: Positions / C: Word | Savings | explore | default | — | Peak-end: end on progress (rec #71). Lanes are counted dots, comparable on a baseline. |
| 25 | Leftover rolled to savings | Where did last month's leftover go? | A: Jar dots → green / B: Goal with rolled part | Savings | explore | default | — | Colour change from category to green is the whole story (green = savings only, P2e-Q2). |
| 26 | Owed to you | Who owes me? | A: Dashed per friend / B: Total only | Spending | explore | default | — | Outside the budget, dashed (v7/v11 language). |
| 27 | Month story | How did the month end? | A: Story frames / B: One row | Insights | explore | default | — | Peak-end + fresh start (Dai et al. via v11); frames end on what you kept. |
| 28 | Equivalents | What does this mean in my terms? | A: Your chais (wedges) / B: Dots / C: Sentence | Insights | explore | default | — | Own frequent buys as the unit (M5: Barrio 2016; Riederer 2018; decided P2c-Q3). Used as the perspective line across cards. |
| 29 | Money as time (days of a jar) | How many days is this? | A: Day lanes of Food / B: Runway | Insights | detail | library | — | M10 days-of-jar avoids hours-of-work for non-earners (Whillans 2017). Still open (P2c-Q5): library only. |
| 30 | Month by month | Long view? | A: Six month lanes / B: Positions / C: Ghost | Insights | detail | library | — | Counted lanes on one baseline; current month in colour, past as outline. |
| 31 | Where money sits | How much do I have, where? | A: One row by place / B: One number | Income | explore | default | — | Balance split (rec #59) in the shared vocabulary: jars, held, saved, owed. |

## Default set per tab
- **Home**: Pace / day allowance, Jar left, Little things (Home), Subscriptions held & next due, Next money in, Goal progress
- **Income**: Income sources, Next money in, Income split, Where money sits
- **Spending**: Pace / day allowance, Jar left, Repeat buys, Subscriptions held & next due, Owed to you
- **Savings**: Goal progress, Goal ETA, Savings growth, Leftover rolled to savings
- **Insights**: Small buys add up, Category share, What changed, Month story, Equivalents
- **Insights library**: Category drift (month vs last), Top places, Time of day, Weekday pattern, Calendar, Spend range, Big one-offs, Subscription yearly cost, Money flow (Sankey), Savings rate, Money as time (days of a jar), Month by month

## Notable alternatives
- Calendar B (₹100 dots per day) is countable but too dense on a phone; glow calendar wins (time = position).
- Goal B (bangles) and Income split B (hourglass) are kept as motions (goal-complete, pay), not static forms.
- Sankey A draws ribbons on the true ₹ scale with spent ribbons outlined; B (two columns) is the fallback if A is busy.
- Category share: 100-dot waffle ("46 of every 100") beat the split pill, which loses countability.

## Questions for Tarun
| # | Question | Options | Recommended | Why |
|---|---|---|---|---|
| P3-Q1 | Insights default board: these four cards (equivalents appear as a line inside cards)? | A: What changed · Category share · Small buys add up · Month story / B: swap Month story for Top places / C: let me pick in onboarding | A | Covers change, where, habit and ending; everything else sits in the library one tap away. |
| P3-Q2 | Time and position views (time of day, calendar, ETA, next money in) use glow, not dots. Keep that split? | A: yes, glow only for time/position / B: dots everywhere, even calendars / C: glow on Insights only | A | Matches P2-Q3; dots per day get dense at phone width (see Calendar B). |
| P3-Q3 | Sankey form | A: dot-ribbon Sankey with spent ribbons outlined / B: two-column flow (in → where) / C: three-step rows | A | Keeps the v9 favourite but in the locked colours; B if A feels busy on a phone. |
| P3-Q4 | Money as time (P2c-Q5 still open): days of a jar in the library? | A: yes, library only / B: also as a line at pay / C: drop it | A | Useful perspective without hours-of-work for students with no wage. |
| P3-Q5 | Income colour: sources drawn in neutral ink shades (not green, not a jar colour). OK? | A: neutral ink for income / B: one new hue for income / C: green for income too | A | Green is reserved for savings; jar colours mean "left in a jar". |
