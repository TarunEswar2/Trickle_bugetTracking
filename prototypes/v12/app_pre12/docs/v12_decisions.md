# Trickle v12 — Decisions log

Format: one row per decision. Status: open / decided / changed. Record Tarun's answer verbatim where possible.

STATUS (1 Oct): Phases 1–11 done. Phase 8 build plan signed off; Phase 9 build → prototype https://claude.ai/artifact/PuDjHposoni47zo1qzGxZr (#demo); Phase 10 validation 29/29 checks, 24/26 flows (claude/v12_phase10_validation.md); Phase 11 handoff → design system https://claude.ai/artifact/5wmMrG8kYqj3gLe2BGStNj (claude/v12_phase11_handoff.md, claude/mockup_v12_build_notes.md). Still open: P2-Q4 density (built as A behind one constant), P11-Q1/Q2 below. **Phase 12 (sounds & animations) next.**

## Phase 1 — Recovery audit
Source: claude/v12_phase1_recovery.md · Board: "Trickle v12 — Decision Board", Phase 1 section.

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| D1 | Tab structure | (new, from Tarun) | — | 5 tabs: Home · Income · Spending · Savings · Insights | decided | 2026-10-01 |
| Q1 | Where does the All spends list live? | A: Money › All spends / B: Inside each jar / C: Search | A | Spending tab holds the All spends list (filters + spend detail) | decided (changed) | 2026-10-01 |
| Q6 | "For you" card? | A: max one on Home / B: notifications / C: No | A | Replaced: Home bell = activity log of every action, items needing action on top; soft dot, no count badge | decided (changed) | 2026-10-01 |
| D2 | Tab onboarding | (new) | — | Every tab has a one-page intro: first visit, reopen via "?" | decided | 2026-10-01 |
| Q2 | "Next money in" card on Home? | A/B/C | A | A — default Home card, no ₹ | decided | 2026-10-01 |
| Q3 | Comparisons? | A: one "What changed" card / B / C | A | A — Insights; month-by-month one tap deeper | decided | 2026-10-01 |
| Q5 | Deep views (Sankey, range, time of day)? | A: Insights library / B / C | A | A — Insights library, not default | decided | 2026-10-01 |
| Q4 | Editing? | A: Full / B / C | A | A, extended: jars, budgets, period, savings share, subscriptions, UPI IDs — each in its tab's settings, one decision per screen | decided | 2026-10-01 |
| D3 | MUST / NICE / NO list | accept / adjust | accept | Accepted, remapped onto the 5 tabs | decided | 2026-10-01 |

## Phase 2 — Tile exploration
Source: claude/v12_phase2_tiles.md

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2-Q1 | Tile form | A: Merging rows / B: Dot glow / C: v11 grid | A | Tile = ₹100 everywhere; resolution handled in 2b | decided via P2b | 2026-10-01 |
| P2-Q2 | Large amounts | A: pills then ₹10,000 blocks / B / C | A | A | decided | 2026-10-01 |
| P2-Q3 | Dot-matrix glow | A: time/position only / B / C | A | A | decided | 2026-10-01 |
| P2-Q4 | Density levels | A: size follows surface / B: setting / C: one size | A | | open (built as A behind `DENSITY` constant) | |
| P2-Q5 | Key style | A: once per screen + tab intro / B / C | A | A | decided | 2026-10-01 |

## Phase 2b — Tile resolution (core of the app)
Source: claude/v12_phase2b_resolution.md

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2b-Q1 | Resolution system | A: Hybrid (crumb <₹100 → tile ₹100 → pill ₹1,000 → block ₹10,000; cup-fill remainder; snap motion; tap to zoom) / B / C / D | A | A — Hybrid | decided | 2026-10-01 |
| P2b-Q2 | Amounts below ₹100 | A: Cup fill / B: ₹25 quarters / C: fixed crumb | A | A — Cup fill | decided | 2026-10-01 |
| P2b-Q3 | Tap on tile visual | A: Zoom one level / B: tooltip / C: nothing | A | A | decided | 2026-10-01 |
| P2b-Q4 | One rule everywhere? | A: One rule / B: Round Savings/Income | A | A | decided | 2026-10-01 |

Note: cup fill shows small amounts as a partly filled tile; Tarun earlier said he didn't want "one tenth of a tile" for ₹10 — he chose cup fill knowingly after seeing the renders. Revisit if his sketches suggest otherwise. (Update 2d: the tile is now a dot; cup fill must read by area — see P2d-D1 / P2e-Q1.)

## Phase 2c — Money visualization research
Source: claude/v12_phase2c_money_viz_research.md (39 sources, 33 verified) · Board: Phase 2c section

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2c-Q1 | Numbers on Home? (research favoured "₹ left"/per-day; conflicts with no-budget-on-Home) | A: keep no numbers on Home; ₹/day only in Spending + pay moment / B: ₹ per day on Home / C: runway days | A | A — keep no numbers on Home; per-day figure lives in Spending and at the pay moment | decided | 2026-10-01 |
| P2c-Q2 | How spent money looks | A: outlined empty tiles / B: faded / C: removed | A | A — outlined (left = solid, spent = outline; whole stays visible) | decided | 2026-10-01 |
| P2c-Q3 | Equivalents unit | A: user's own frequent buys / B: fixed staples / C: none | A | A — user's own frequent buys ("≈ 14 of your chais") | decided | 2026-10-01 |
| P2c-Q4 | "Spent more than last week" | A: ghost of last week + hatched extra + one sentence / B: amber chip / C: Insights only | A | A — no red | decided | 2026-10-01 |
| P2c-Q5 | Money-as-time | A: days of a jar (library only) / B: hours of work / C: none | A | A — library only (via P3-Q4) | decided | 2026-10-01 |

## Phase 2d — Tarun's sketches (decisions after review)
Source: claude/v12_phase2d_sketch_concepts.md · follow-up work: claude/v12_phase2e_concepts.md · Board: Phase 2d + 2e sections

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2d-Q1 | What do red and green mean in the sketch? | A: red = spent, green = left / B: two jars / C: no meaning | — | A — red = spent, green = left. Keep the meaning but NO red: spent = outlined dots, left = solid | decided | 2026-10-01 |
| P2d-Q2 | Circles as the ₹100 unit? | A: circles everywhere / B: squares / C: circles on Home only | A | A — dots (circles) are the ₹100 unit, replacing square tiles, with small gaps so they are countable | decided | 2026-10-01 |
| P2d-Q3 | Fuse several ₹10,000 blocks? | A: separate, hairline gap / B: fuse / C: fuse, tap to split | A | A — blocks keep a hairline gap (no full fusing). Ladder: crumb <₹100 → dot ₹100 → pill ₹1,000 (row of 10 fuses) → block ₹10,000 | decided | 2026-10-01 |
| P2d-Q4 | Which new concept to test next to Merging Dots? | A: Day lanes / B: Hourglass / C: Ticket strip / D: none | A | Explore ALL: Day lanes, Glass columns, Bangles, Hourglass, Ticket strip, alongside Merging Dots (done in Phase 2e) | decided (changed) | 2026-10-01 |
| P2d-Q5 | Spent dots look | A: outline / B: dimmed fill / C: red | A | A — outline | decided | 2026-10-01 |
| P2d-D1 | Cup fill inside a circle | (new, from Tarun) | — | Must read by AREA, not height; show 2–3 options (Phase 2e: pie wedge / concentric core / area-true level) | decided (options in 2e) | 2026-10-01 |

## Phase 2e — Dot system + concept deep-dive
Source: claude/v12_phase2e_concepts.md · Board: Phase 2e section (6 concepts × 15 states)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2e-Q1 | Cup fill inside a dot | A: pie wedge / B: concentric core / C: area-true liquid level | A | A — pie wedge, clockwise from 12, area-true | decided | 2026-10-01 |
| P2e-Q2 | Colour for "left" | A: blue left, green saved / B: green left, new hue for saved / C: one ink, saved by ring | A | Changed — "left" money = category colour (each jar its own colour); green reserved for savings only | decided (changed) | 2026-10-01 |
| P2e-Q3 | Adopt the combination? | A: Merging Dots base + Day lanes in Spending / B: Merging Dots only / C: other | A | A — Merging Dots is the base unit on every tab; Spending also gets Day lanes (today / this week). Glass columns and Ticket strip parked | decided | 2026-10-01 |
| P2e-Q4 | Motions to borrow | A: Hourglass drop (pay) + Bangle close (complete) / B: Ticket tear / C: plain lift-out | A | A — pay motion = hourglass drop; goal-complete motion = bangle close | decided | 2026-10-01 |
| P2e-Q5 | Day lanes overspend | A: tomorrow's lane shortens / B: hatched extra only / C: re-spread across all days | C | C — re-spread remaining days (future lanes shrink slightly; no blame) | decided | 2026-10-01 |

## Phase 3 — Insight & visualization library
Source: claude/v12_phase3_insights.md · Board: Phase 3 section (31 insights × 2–3 forms, filter by tab, colour/B&W)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P3-Q1 | Insights default board: What changed · Category share · Small buys add up · Month story (equivalents as a line inside cards)? | A: yes / B: swap Month story for Top places / C: pick in onboarding | A | A — default four kept: What changed, Category share, Small buys add up, Month story | decided | 2026-10-01 |
| P3-Q2 | Time/position views (time of day, calendar, ETA, next money in) use glow, not dots? | A: glow only for time/position / B: dots everywhere / C: glow on Insights only | A | A — glow only for time/position views (already decided, P2-Q3) | decided | 2026-10-01 |
| P3-Q3 | Sankey form | A: dot-ribbon Sankey, spent ribbons outlined / B: two-column flow / C: three-step rows | A | Use the Phase 3 recommendation — A: dot-ribbon Sankey on the true ₹ scale, spent ribbons outlined (B as fallback if busy) | decided | 2026-10-01 |
| P3-Q4 | Money as time (P2c-Q5): days of a jar | A: library only / B: also a line at pay / C: drop | A | A — money-as-time in the library only | decided | 2026-10-01 |
| P3-D1 | Jars beyond 3 colour-safe hues | (new, from Tarun) | — | Jars 4+ reuse the same hues (amber, blue, plum; savings green reserved) with a stripe/dot pattern, and always show their name | decided | 2026-10-01 |
| P3-Q5 | Income colour | A: neutral ink shades / B: one new hue / C: green | A | A — income in neutral ink shades until it is split into jars | decided | 2026-10-01 |

## Phase 4 — Information architecture & disclosure layers
Source: claude/v12_phase4_structure.md · Board: Phase 4 — Structure section (tab map, 3 Home layouts, 4 Pay placements, 3 depth models, per-tab screen maps, intros, bell)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P4-Q1 | Home layout | A: Widget grid like the reference: wide Pace glow on top, then half and wide cards, add-widget tile / B: Big glow hero + three stacked cards / C: Single-column story (sentence + small visual) | A | A — widget grid: wide Pace glow card on top + widgets, no numbers | decided | 2026-10-01 |
| P4-Q2 | Where Pay lives | A: Round Pay button beside the floating tab pill. Tap = camera open (Scan); "Pay UPI ID" and "Log cash" sit under the viewfinder / B: Centre button inside the tab bar (6 slots) / C: Persistent three-part pill above the tab bar / D: Big Pay button on Home only | A | A — round Pay button beside the floating tab bar on every tab; tap opens camera (Scan = 1 tap); Pay UPI ID + Log cash as chips under the viewfinder (2 taps) | decided | 2026-10-01 |
| P4-Q3 | How deeper layers open | A: Hybrid — a card opens in place to explore (one open at a time), detail and settings push a new screen / B: Every layer is a new screen / C: Everything expands in place | A | A — hybrid: explore expands in place; detail and settings push a new screen | decided | 2026-10-01 |
| P4-Q4 | Where settings live | A: Gear in each tab header for that tab, avatar on Home for app-wide settings / B: One avatar drawer for everything / C: Drawer, with a shortcut from each tab | A | A — gear in each tab header for that tab; avatar on Home for app-wide settings | decided | 2026-10-01 |
| P4-Q5 | Customising widgets | A: Home: pin, hide, reorder (max 6). Insights: pin from the library. Other tabs: fixed order, can hide / B: Fixed everywhere / C: Every tab fully customisable | A | A — recommendation accepted: Home pin/hide/reorder (max 6); Insights pins from library; other tabs fixed | decided | 2026-10-01 |

## Phase 5 — Core flows
Source: claude/v12_phase5_flows.md · Board: Phase 5 — Core flows section (14 storyboards; variants for flows 1, 3, 4, 5, 9, 12)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P5-Q1 | Onboarding | A: one question per screen (7 taps) / B: starter month from student type, "Looks right" or change one thing (4) / C: learn from 30 days of UPI (3) | B | B — Starter month: pick student type → pre-filled month → "Looks right" / "Change one thing"; manual-only path asks "What comes in?" | decided | 2026-10-01 |
| P5-Q2 | Income split | A: ask once + undo; irregular income gets one "what is it for" question / B: silent auto-split / C: always ask | A | A — one confirm + undo for regular income; irregular income first asks "For this month / Keep for later / Friend paying back" | decided | 2026-10-01 |
| P5-Q3 | Jar at pay | A: guessed jar as a chip on the amount screen (2 taps to UPI) / B: jar first (3) / C: pause screen with per-day figure (3) | A | A — guessed jar chip on the amount screen (recommendation accepted) | decided | 2026-10-01 |
| P5-Q4 | Empty jar timing | A: ask once before UPI opens, then re-spread days / B: pay first, sort after | A | A — ask once before UPI opens, then re-spread days; if all jars empty → default "start next month lighter" | decided | 2026-10-01 |
| P5-Q5 | Month-end leftover | A: one choice (Savings default), story waits in Insights / B: auto-sweep / C: story first, choice last | A | A — one choice, Savings default; month story waits in Insights | decided | 2026-10-01 |
| P5-D1 | All other flow recommendations (claude/v12_phase5_flows.md) | accept / adjust | accept | All other flow recommendations accepted | decided | 2026-10-01 |

## Phase 6 — Visual identity
Source: claude/v12_phase6_identity.md · Board: Phase 6 — Visual identity section (4 directions × 4 screens + B&W, palettes + validator, type, logos, splash)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P6-Q1 | Style direction | A: Monochrome glow / B: Warm paper / C: Ink & dots / D: Soft night | A + C's 1.6px spent outlines + B palette as light companion | A — Monochrome glow (Geist / Geist Mono), borrowing C's 1.6px spent outlines and B's palette for light mode | decided | 2026-10-01 |
| P6-Q2 | Default appearance | A: dark default / B: follow phone / C: light default | B | B — appearance follows the phone (dark/light); B&W optional | decided | 2026-10-01 |
| P6-Q3 | Logo mark | L1 Dot + crumb / L2 Dot jar / L3 Trickle / L4 Pill + dot (t) | L1 | L3 — "Trickle" wordmark (not L1) | decided (changed) | 2026-10-01 |
| P6-Q4 | Numerals for ₹ | A: mono tabular / B: text face tabular / C: display face | B | B — recommendation: text face with tabular figures | decided | 2026-10-01 |
| P6-Q5 | Dot finish | A: flat + hairline highlight / B: embossed / C: flat | A | A — flat + hairline highlight | decided | 2026-10-01 |

## Phase 7 — Retention & emotional design
Source: claude/v12_phase7_retention.md · Board: Phase 7 — Retention section (loop map, first week, 3 notification / check-in / story / return variants, anxiety reducers, widgets, 14 principles)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P7-Q1 | Notifications | A Calm few: ≤1/day, ≤3/week, 5 types / B Event only (money moves) / C One Sunday digest | A | A — Calm few: max 1/day, 3/week, quiet 22:00–08:00; 5 types, one action each, each its own Android channel | decided | 2026-10-01 |
| P7-Q2 | Weekly check-in | A One card + "Start the new week" / B Three swipes / C Sunday card on Home | A | A — one card ending "Start the new week" | decided | 2026-10-01 |
| P7-Q3 | Month story | A Five cards ending on "You kept ₹X" / B One poster / C Letter | A | A — 5 cards ending "You kept ₹X" + opt-in share poster with amounts hidden | decided | 2026-10-01 |
| P7-Q4 | Coming back after a gap | A Welcome back + "Start from today" / B Catch-up sort first / C Silent resume | A | A — Welcome back: savings first, auto-sorted count, "Start from today" | decided | 2026-10-01 |
| P7-Q5 | Home-screen widgets at launch | A Pace 4×1 + Goal 2×2 + Pay 2×1 (Jar optional) / B Pace only / C No widgets in v12 | A | A — recommendation: Pace 4×1, Goal 2×2, Pay 2×1 at launch; Jar opt-in | decided | 2026-10-01 |

## Phase 8 — Build plan
Source: claude/v12_phase8_build_plan.md · Board: Phase 8 — Build plan section
Note (Phase 7 sources): Pielot et al. 2014 and Wohllebe et al. 2021 verified 2026-10-01; full citations fixed in claude/v12_phase7_retention.md.

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P8-Q1 | Sign off build scope (screens, widgets, flows, build order)? Anything to cut/add? | OK as is / cut / add | OK as is | Signed off — build as planned | decided | 2026-10-01 |

## Phases 9–11 — Build, validate, handoff
Source: claude/mockup_v12_build_notes.md, claude/v12_phase10_validation.md, claude/v12_phase11_handoff.md

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P11-Q1 | Pay UPI ID measured 4 taps (plan said 3) | A: recent payee chips under the viewfinder (3 taps) / B: keep as built | A | | open | |
| P11-Q2 | New goal measured 4 taps (plan said 2) vs "one step per screen" | A: keep three one-decision steps / B: name + amount on one screen | A | | open | |

## Phase 12 — Sounds & animations
| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
