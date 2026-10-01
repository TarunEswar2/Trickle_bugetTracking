# Trickle v12 — Phase 7: Retention & emotional design

Date: 2026-10-01 · Board: Phase 7 section of "Trickle v12 — Decision Board" · Script: /home/claude/v12/phase7.py (direction A tokens from phase6.py)

Values held: savings motivates (not guilt); cash-like friction at pay; repeat-buy awareness; low anxiety; no red, no debt words, no badges/counts; no games/streaks; Home shows no numbers; bell holds actions + log.

## Loop map (converged)
Daily core: Pay → dots leave (hourglass drop) → Home/widget glow → next pay.
Monthly spine: Income day (Split it, 1 tap) → Subscription days (0 taps) → Weekly check-in ×4 (1 card) → Month-end (leftover → Savings default) → Month story (peak-end, Insights) → Fresh start.
Growth branch: goal milestones at 25/50/75/100%, bangle close at 100%.

| Loop | Trigger | Action | Reward | Taps | Guardrail |
|---|---|---|---|---|---|
| Daily glance | Habit; home-screen widget | Open Home (or just look at widget) | Pace glow word, savings dots | 0 | No numbers on Home (P2c-Q1) |
| Pay moment | Every UPI pay / Log cash | Amount + guessed jar chip | Hourglass drop; per-day line only if jar low; repeat line | 2 | Friction is the point (Soman 2003) |
| Income day | UPI credit | "Split it" | Savings dots drop in first | 1 | Push allowed |
| Subscription day | Due date | none | "Paid from what was held" | 0 | Heads-up push only the day before |
| Weekly check-in | Sunday 7:30 pm | Read one card | Fresh start + savings intact | 1 | Skipped 2 weeks in a row → stop pushing it |
| Month-end + story | Last day / income day | Leftover → Savings (default) | "You kept ₹X" last card | 1–2 | Peak-end; share opt-in |
| Goal milestones | 25 / 50 / 75 / 100% | none | Row fills; bangle close at 100% | 0 | No push except 100% |
| Repeat-buy awareness | 2nd+ same payee within the window | none | Neutral line at pay ("3rd chai this week") | 0 | Never a push |
| Friend pays back | Matching UPI credit | none (ask once if unsure) | Dashed dots fill | 0–1 | Log item in bell |

## First week (day 0–7)
- **Day 0 · Setup** — Starter month (4 taps). Savings dots already dropped in: progress starts at more than zero.
- **Day 1 · First pay** — Hourglass drop. One tip, once: "Spent dots stay as outlines, so you can see the whole month."
- **Day 2 · Return trigger** — Push at 7:30 pm: "Your first day in dots." Opens a one-card recap.
- **Day 3 · First repeat line** — Only if true: "2nd chai today." No push.
- **Day 4–5 · Silence** — Nothing is sent. The widget does the reminding.
- **Day 6 · Subscription heads-up** — Only if one is due tomorrow. Otherwise silent.
- **Day 7 · First check-in** — Sunday card ends on savings still intact. Offer: "Add a goal?" (first goal moves here from setup).
Return triggers: day 2 (first-day recap push), day 7 (first check-in), day 30 (month story). After 10 quiet days: one welcome-back push, then none for 30 days.

## Notification strategy — variants
- **A Calm few (recommended)** — Max 1 a day, 3 a week, nothing 22:00–08:00. Only five types: income split, subscription tomorrow, weekly check-in, month story, one welcome-back. Each one has one action.
- **B Event only** — No scheduled pushes at all. Notifies only when money moves (income, subscription). Check-in and story wait quietly in the bell. Lowest noise, weakest day-7 and day-30 return.
- **C Rhythm digest** — One fixed slot: Sunday 7:30 pm, one digest of the week. Income split still pings live. Predictable, but bundles unrelated news into one long notification.

| Type (own Android channel) | Example | When | Action |
|---|---|---|---|
| Income came in | Split it like last time? | yes, live | Split it / Later |
| Subscription tomorrow | Spotify comes out tomorrow. It is already held. | day before, 10:00 | — |
| Weekly check-in | Your week, in one card. | Sun 19:30 | Open |
| Month story | September is ready. You kept ₹2,640. | income day or 1st, 19:30 | Open |
| Goal reached | Goa trip is ready. | live (in quiet hours: next morning) | Open |
| Welcome back (once) | Your savings are where you left them. | after 10 quiet days, then never again for 30 days | Open |
Never: "You overspent" or any jar-empty push; Remaining-budget numbers in a notification; Streaks, "don't break your…", points, badges, app-icon counts; Multiple pushes in one day (income beats everything); Anything between 22:00 and 08:00; Guilt copy: "you were gone", "you missed", "only ₹X left".

## Weekly check-in — variants
- **A One card (recommended)** — One screen: a sentence, the ghost of last week for the jar that changed most, goal ETA, then "Start the new week". 1 tap to finish.
- **B Three swipes** — What changed · Little things · Savings. More to see, but three screens is where v9 check-ins were skipped.
- **C Home card on Sunday** — No separate screen: a dismissible card sits on top of Home for Sunday only. Lowest effort; easy to miss.

## Month-end story — variants
- **A Five cards, ends on savings (recommended)** — Big buy · Little things · Where it went · What changed · You kept. The last card is always the savings number (peak-end). Share is opt-in and shows dots, never amounts unless switched on.
- **B One poster** — The whole month on one card, built to share. Strong as a sharing object, but spent dots dominate the image.
- **C Letter** — A short paragraph plus one visual. Calmest, but text-heavy and nothing to swipe or share.

## Lapse / return (2 weeks away) — variants
- **A Welcome back + fresh start (recommended)** — Savings first, a plain count of what was auto-sorted, one button that re-spreads the month from today. No list of missed days, no "you were gone".
- **B Catch-up sort** — Opens straight into the unsorted payments. Fast to tidy, but the first thing after a gap is a chore.
- **C Silent resume** — Home as if nothing happened; anything unsorted sits in the bell. Zero friction but the month may look wrong with no explanation.

## Anxiety reducers
- Jar runs out: "Food is used up for this month. The other days get a little shorter." → Take from Fun / Leave it (at pay only, never push).
- Income late: "Allowance usually comes by the 1st. It is 2 days later than usual. Your jars stay as they are until it lands." → Got it / Change the date. Never guess why.
- Savings withdrawn: "₹1,000 moved out of Goa trip. That is what savings are for. Goa trip is still 35% there."

## Celebrations (calm)
Goal reached: bangle close + one soft tone, once. Each 25%: row fills, no push. Income split: savings dots drop first, "Savings sorted." Lighter week: one sentence in check-in, no score. Motion/sound finalised in Phase 12.

## Widgets (Android)
Pace 4×1 (month glow, one word), Goal 2×2 (saved solid / to-go outlined), Pay 2×1 (scan + Log cash; friction before UPI app); Jar 2×2 opt-in. No numbers.

## Sharing & personalisation
Opt-in share card from the last story card: dots + month name, amounts hidden by default; no friends list/leaderboard. Equivalents in the user's own buys. Check-in day/time, quiet hours, each notification channel editable.

## Principles (14)
1. **Savings shows up first** — Every loop that ends, ends on savings: income split, check-in, month story. (Thaler & Benartzi 2004; Kahneman et al. 1993 (peak-end))
2. **One tap per loop, two loops need none** — Retention comes from removing effort, not adding prompts. (Fogg 2009 B=MAP)
3. **Bad news only where it can be acted on** — Jar empty appears at the pay moment, never on open or as a push. (Karlsson, Loewenstein & Seppi 2009 (ostrich effect))
4. **Fresh starts are built in** — Sunday and the 1st reset the frame; returning after a gap is a fresh start too. (Dai, Milkman & Riis 2014)
5. **Progress starts above zero** — Setup drops savings dots in before the first spend. (Nunes & Drèze 2006 (endowed progress))
6. **No streaks, scores or badges** — Missed days are invisible, so there is nothing to break. (Polivy & Herman 1985 (what-the-hell effect); v8 research §14)
7. **Few, predictable notifications** — ≤1/day, ≤3/week, quiet 22:00–08:00, a channel per type the user can mute. (Android notification guidelines; Pielot, Church & de Oliveira 2014 — notification volume ↔ stress; Wohllebe et al. 2021 — +2.5 pp uninstalls per extra weekly push; both verified 2026-10-01)
8. **Every notification has one useful action** — If it has no action and no news, it is not sent. (Android notification guidelines)
9. **Feel the payment** — Dots leave at pay; the widget puts Pay before the UPI app. (Prelec & Loewenstein 1998; Soman 2003)
10. **Name the habit, never judge it** — Repeat buys as counts in the user's own units ("3rd chai"), no adjectives. (Soman 2001; P2c-Q3)
11. **Explain the unexpected calmly** — Late income, withdrawals and empty jars each get a sentence that says what happens next. (Shapiro & Burchell 2012 (financial anxiety))
12. **Calm celebration** — One motion, one soft tone, once. No confetti. (Weiser & Brown 1996 (calm technology))
13. **Sharing is opt-in and shows dots, not ₹** — Month story card can be shared; amounts hidden unless switched on. (Wrapped-style recap sharing; privacy line (Phase 1 #133))
14. **Ambient beats alerting** — The widget and Home glow carry the daily loop instead of pushes. (Weiser & Brown 1996; Ambient Orb (v8 research §12))

New sources: [Android Developers — Notifications design guidelines](https://developer.android.com/design/ui/mobile/guides/home-screen/notifications); [Wohllebe, Hübner, Radtke & Podruzsik 2021 — Mobile apps in retail: Effect of push notification frequency on app user behavior, Innovative Marketing 17(2):102–111, doi:10.21511/im.17(2).2021.10](https://doi.org/10.21511/im.17(2).2021.10) (verified 2026-10-01: each extra push per week raised uninstalls by 2.5 percentage points; direct open rate fell); [Pielot, Church & de Oliveira 2014 — An in-situ study of mobile phone notifications, MobileHCI '14, doi:10.1145/2628363.2628364](https://dl.acm.org/doi/10.1145/2628363.2628364) (verified 2026-10-01: 15 Android users, mean 65.3 notifications/day; more email/social notifications correlated with stress and feeling interrupted); [Dai, Milkman & Riis 2014 — The fresh start effect (Management Science)](https://doi.org/10.1287/mnsc.2014.1901); [Lee — Fintech nudges: overspending messages (SSRN)](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3390777); [Bitrián, Buil & Catalán 2021 — Gamification of personal finance apps](https://selfdeterminationtheory.org/wp-content/uploads/2024/03/2021_BitrianBuilCatalan_IJBM.pdf); [Spotify Wrapped as a shareable recap (NoGood case study)](https://nogood.io/blog/spotify-wrapped-marketing-strategy/). Also: [push stats roundup](https://www.businessofapps.com/marketplace/push-notifications/research/push-notifications-statistics/).

## Recommendations
Notifications A · Check-in A · Month story A (+ B poster as share card) · Return A · Widgets Pace + Goal + Pay (Jar opt-in).

## Questions for Tarun
- **P7-Q1 Notifications**: A Calm few: ≤1/day, ≤3/week, 5 types / B Event only (money moves) / C One Sunday digest — rec: A. Keeps day-7 and day-30 triggers without noise; each push has one action.
- **P7-Q2 Weekly check-in**: A One card + "Start the new week" / B Three swipes / C Sunday card on Home — rec: A. One screen, ends on savings; three-swipe check-ins were skipped in v9.
- **P7-Q3 Month story**: A Five cards ending on "You kept ₹X" / B One poster / C Letter — rec: A, with B's poster as the share card (dots only, ₹ hidden by default).
- **P7-Q4 Coming back after a gap**: A Welcome back + "Start from today" / B Catch-up sort first / C Silent resume — rec: A. Savings first, auto-sorted payments counted not listed, month re-spread from today.
- **P7-Q5 Home-screen widgets at launch**: A Pace 4×1 + Goal 2×2 + Pay 2×1 (Jar optional) / B Pace only / C No widgets in v12 — rec: A. The widget is the daily loop without a push; Pay widget adds friction before the UPI app.
