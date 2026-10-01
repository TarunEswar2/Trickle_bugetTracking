# Trickle v12 — Phase 4: Structure (information architecture & disclosure layers)

Board: Phase 4 section of "Trickle v12 — Decision Board". Locked inputs: 5 tabs Home · Income · Spending · Savings · Insights; Home has no numbers and a bell (needs-you on top + activity log, soft dot, no count); one-page intro per tab, reopened via "?"; Pay (Scan / UPI ID / Log cash) reachable fast; full editing in each tab's settings, one decision per screen; Phase 3 default widgets per tab. Reference mood: monochrome widget dashboard.

## Diverge
### Home layouts
- H1 Widget grid (ref): wide Pace glow + word, half cards (Goa, Next money in, Subscriptions), wide Jars, add-widget tile. 0 numbers, ≤25 marks per card. **Recommended.**
- H2 Big glow hero + 3 stacked cards: strongest "am I OK" signal, but hero takes half the screen.
- H3 Single-column story (sentence + small visual per line): calm but long, hard to customise.

### Pay placement
- A Round Pay button beside the floating tab pill on every tab. Tap = camera already open (Scan, 1 tap); "Pay UPI ID" and "Log cash" chips under the viewfinder (2 taps). **Recommended.**
- B Centre button inside the tab bar: 6 slots, uneven 2 | Pay | 3.
- C Persistent three-part pill above the tab bar: all 1 tap, but costs a row on every screen.
- D Big Pay button on Home only: 2 taps from other tabs.

### Depth models
- M1 Push screens for every layer. M2 Expand in place for every layer. **M3 Hybrid (recommended):** explore opens in place (one card open at a time), detail and every settings step push a screen.

### Other choices
| Choice | A | B | C | Rec |
|---|---|---|---|---|
| Settings / drawer | A: gear per tab + avatar on Home for app-wide | B: one avatar drawer | C: drawer + tab shortcut | A |
| Bell placement | A: Home header only; full screen, "Needs you" on top, activity below; soft dot, no count | B: bell on every tab header | C: bottom sheet over Home | A |
| Bell behaviour | A: Needs-you items leave when done; activity kept 90 days, filter by tab | B: everything stays until swiped | C: activity only, actions as push | A |
| Widget customisation | A: Home pin/hide/reorder (max 6) · Insights pin from library · others fixed, can hide | B: fixed everywhere | C: all tabs customisable | A |
| Intro page | A: one page, one visual, 3 lines, Got it; ? in header | B: 3-step carousel | C: coach marks on real UI | A |

## Screen map per tab (glance / explore / detail / settings)
- **Home** — Glance: H-01 Home board (widgets, bell, avatar) · Explore: H-02 Bell: needs-you + activity log; H-03 Edit board (pin · hide · reorder) · Detail: Tap a widget → that tab, card opened · Settings/intro: H-00 Intro
- **Income** — Glance: I-01 Income: next money in · split · sources · where money sits · Explore: Expand: this split (pills); Expand: sources; Expand: where money sits · Detail: I-02 Source detail (paydays); I-03 Payday detail (where it went, undo); I-04 New money sheet (split, one tap) · Settings/intro: I-S1 Sources; I-S2 Savings share; I-S3 Split order; I-S4 Period (week / month / payday); I-00 Intro
- **Spending** — Glance: S-01 Spending: day lanes · jars · held · owed · repeat buys · Explore: Expand: a jar (this week); Expand: subscriptions; Expand: owed; S-02 All spends list (filters) · Detail: S-03 Jar detail (history); S-04 Spend detail (jar, split, source); S-05 Subscription detail (year cost, keep / cancel); S-06 Friend detail (remind); S-07 Sort unknown payment · Settings/intro: S-S1 Jars (add · rename · remove); S-S2 Jar amount; S-S3 Move dots; S-S4 Copy last month; S-S5 Subscriptions; S-S6 Remember payee; S-00 Intro
- **Savings** — Glance: V-01 Savings: goal · ETA · growth · leftover rolled · Explore: Expand: goal (quick add ₹100 / ₹500); Expand: growth by month; V-02 All goals · Detail: V-03 Goal detail (contributions); V-04 Goal complete (bangle close) · Settings/intro: V-S1 New goal (one step per screen); V-S2 Goal order; V-S3 Leftover rule; V-00 Intro
- **Insights** — Glance: N-01 Board: What changed · Category share · Small buys · Month story · Explore: Expand: any card (one more layer); N-02 Library (12 views) · Detail: N-03 Library view (Sankey, calendar, time of day …); N-04 Month story (swipe frames); N-05 Weekly check-in · Settings/intro: N-S1 Pin / hide cards; N-S2 Check-in day; N-00 Intro
- **Global (avatar)** — Glance: — · Explore: — · Detail: — · Settings/intro: G-S1 Look (colour / B&W, dark / light); G-S2 Linked UPI IDs; G-S3 Notifications (caps, quiet hours); G-S4 Sounds & motion; G-S5 App lock; G-S6 Data & export
- **Pay (from any tab)** — Glance: P-01 Scan (camera open) · Explore: P-02 Pay UPI ID; P-03 Log cash · Detail: P-04 Pick jar (suggested); P-05 Hourglass drop + done; P-06 Empty jar: take from another; P-07 Split at pay · Settings/intro: —

Screen counts (excluding in-place expands and settings): Home 3, Income 4, Spending 7, Savings 4, Insights 5, Global (avatar) 0, Pay (from any tab) 7; total 30. Settings screens: Income 4, Spending 6, Savings 3, Insights 2, Global 6. Plus 5 tab intros.

## Converge — why
- Cognitive load: Home stays a calm periphery (Weiser & Brown 1995) with few countable marks per card (Kay et al. 2016) and no ₹ (P2c-Q1; Olafsson & Pagel 2018 leftover-first). Exact figures live one layer down.
- One decision at a time: every settings step and every detail is its own pushed screen; explore opens in place so the board stays in view (Sweller 1988).
- Reach: Scan is 1 tap from every tab; UPI ID / Log cash are 2 taps on the same screen.
- Settings: per-tab gear matches the locked rule; app-wide items (look, UPI IDs, notifications, lock, sounds, data) sit behind the Home avatar.
- Customisation: Home pin/hide/reorder (max 6), Insights pin from library; Income/Spending/Savings fixed order (can hide) so the money story reads in → spend → keep and intros stay true.
- Bell: Home header only, full screen; needs-you items leave when done; activity kept and filterable by tab; ₹ allowed there because it is a record, not Home.

## Tab intros (copy)
- Home: "Your month at a glance" — glow = pace; each card is a tab; the bell keeps everything and what needs you.
- Income: "Where money comes from" — grey until split; savings first, then jars; tap a source for paydays.
- Spending: "One dot is ₹100" — solid left, outline spent; a lane per day, today ringed; every spend in the list.
- Savings: "Green is only for savings" — solid saved, outline to go; leftover can roll in; add a little from a goal.
- Insights: "Four cards, more on tap" — one question per card; library for deeper views; pin favourites.

## Questions for Tarun
| # | Question | Options | Recommended | Why |
|---|---|---|---|---|
| P4-Q1 | Home layout | A: Widget grid like the reference: wide Pace glow on top, then half and wide cards, add-widget tile / B: Big glow hero + three stacked cards / C: Single-column story (sentence + small visual) | A | Grid is the most scannable and the user owns the order. Every card is a doorway to a tab, so Home stays at about 6 marks per card and no numbers (Kay 2016: few countable marks; Weiser & Brown: calm periphery). C reads well once but gets long and is harder to customise. |
| P4-Q2 | Where Pay lives | A: Round Pay button beside the floating tab pill. Tap = camera open (Scan); "Pay UPI ID" and "Log cash" sit under the viewfinder / B: Centre button inside the tab bar (6 slots) / C: Persistent three-part pill above the tab bar / D: Big Pay button on Home only | A | A keeps Scan at 1 tap from every tab and the other two at 2 taps on one screen. B makes an odd 2 | Pay | 3 bar. C costs a row of screen on every tab. D is 2 taps from any other tab. |
| P4-Q3 | How deeper layers open | A: Hybrid — a card opens in place to explore (one open at a time), detail and settings push a new screen / B: Every layer is a new screen / C: Everything expands in place | A | Opening in place keeps the context (Sweller 1988: less to hold in mind); pushing for detail and settings keeps "one decision per screen" and a clear back path. C gets long and loses the back button. |
| P4-Q4 | Where settings live | A: Gear in each tab header for that tab, avatar on Home for app-wide settings / B: One avatar drawer for everything / C: Drawer, with a shortcut from each tab | A | Matches the locked rule that editing lives in each tab. App-wide items (look, UPI IDs, notifications, lock) have no tab, so they go behind the avatar. |
| P4-Q5 | Customising widgets | A: Home: pin, hide, reorder (max 6). Insights: pin from the library. Other tabs: fixed order, can hide / B: Fixed everywhere / C: Every tab fully customisable | A | Home and Insights are where taste differs. Fixed order in Income, Spending and Savings keeps the money story in one order (in → spend → keep) and makes the intros stay true. |
