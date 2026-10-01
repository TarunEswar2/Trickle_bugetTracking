# Trickle Visual Direction — Design Brief v3
*Research + synthesis pass. No HTML built. For approval before any mockup work starts.*

**Non-negotiable constraint, stated up front:** Trickle has no SMS-based tracking anywhere. Tracking is either UPI-linked (transactions pulled from linked UPI accounts) or fully manual entry. This brief and any build from it must not mention or imply SMS parsing. (Note: several project docs — `secondary_research_report.md`, `feature_gap_analysis.md`, `mockup_screen_plan.md` — were written under an earlier SMS-based premise and talk about "READ_SMS," "parsed transaction" toasts, and permission-rationale screens for SMS. Per your explicit correction, all of that is superseded: this brief treats UPI-linkage/manual entry as the only two tracking methods, matching what `mockup_v2_build_notes.md` already corrected trickle-v2 to.)

---

## 1. Critique of trickle-v2 (current canonical prototype)

trickle-v2 is functionally complete and well-built (35-day seeded transaction store, one source of truth across screens, validated navigation) — the gaps are almost entirely in information design, not missing functionality.

**Home.** The account panel is three stacked label:value text lines (Weekly spending, Daily spending, Balance) plus a small up/down delta glyph. This is the single biggest opportunity: three numbers that could be one glanceable stat-card triad (today / week / month, or spent / remaining / pace) are instead a vertical list that reads like a form. The "Small Purchases Trends" and "Transaction History" modules are both plain text rows inside a gray card — no visual differentiation between a repeat-merchant pattern and a generic transaction list.

**Categories.** Donut + legend + list-with-delta is reasonable, but every row is text-only (name, amount, % delta as a number). There's no at-a-glance budget-burn signal per category (e.g., a mini bar) without tapping into `categoryDetail` — the one place a bar chart *does* appear.

**Insights.** Per the build notes, 8 cards already exist conceptually (budget pace, day-of-week bar chart, biggest mover, accumulation spotlight, biggest contributor share, subscription total, savings goal progress, week-on-week). This is a good list — the problem is presentation: all 8 render as the same `.icard` text block (kicker + heading + subhead), so a day-of-week distribution and a single percentage stat get identical visual weight. Nothing here is forecast-forward (no explicit "at this pace you'll spend ₹X by month end") even though budget pace is one of the 8.

**Savings.** Goals and subscriptions are both present (good — base feature preserved) but subscriptions are a plain row list with a due-date substring; there's no at-a-glance "₹X/month recurring" or upcoming-charge urgency signal, and goal velocity (are you on track to hit the target by the stated date) isn't shown — only static % complete.

**Navigation.** Tab structure (Savings/Categories/Home/Insight/Settings) is sound and every base feature already has a home. The awkward taps are inside flows: category drill-down → budget edit is a sheet-within-a-tab (fine), but transaction recategorization requires a full screen navigation (transactions → detail → save) for what's a single-field edit.

**What's genuinely missing as content, not structure:** period-over-period comparison exists only as a single delta arrow on Home's two numbers; there's no explicit pace-to-budget forecast anywhere despite the "budget pace" insight card name; day-of-week/time-of-day pattern exists as one insight card but isn't cross-referenced anywhere else (e.g., accumulation view doesn't note *when* repeat purchases cluster); subscriptions are visually buried at the bottom of Savings with no home-screen or insight-feed surfacing despite being a "vivid pain point" per the research (Nishad's forgotten Coursera charge).

**trickle-visual-redesign.html** (the prior attempt) correctly identified the direction — dark theme, radial gauge for budget-used, isotype/icon rows for purchases, treemap for categories, "mountain climb" SVG for goals — but overcommits to a different bespoke metaphor per screen (gauge, road/pace illustration, isotype dots, treemap, coin-stack, conveyor belt, mountain). That's a lot of one-off chart types for a student to learn, and several (the road illustration, mountain climb, conveyor belt) are illustrative rather than data-dense — closer to the "trading dashboard skin-swap" trap than a systematized stat-card language. The reference artifact's power is a *small, repeated vocabulary* (stat-card triads, segmented bars, dot-matrix grids, sparklines) applied consistently — not a different metaphor per screen.

---

## 2. Reference artifact → budgeting-app translation

The reference (crypto/trading dashboard) is dense, dark, and repeats a small set of components across very different screens. What maps and what doesn't:

**Maps directly:**
- **Stat-card layout with triads** (e.g. today/month/year-style groupings, each with a big number, a label, and a small delta) → replaces Home's plain label:value list. Use for Home's spent/remaining/pace, and for Categories' per-category spent/budget/left.
- **Segmented/stacked bars** (the holders-analytics screen's breakdown bars) → replaces the current single-color budget-progress bar. A segmented bar showing spent (solid) / pending or projected (lighter shade) / remaining (track) in one bar is a direct upgrade to `categoryDetail`'s existing `.bar` and to the friction sheet's spent/this-purchase/remaining bar, which is already conceptually a segmented bar today, just under-styled.
- **GitHub-style heatmap calendar** → strong fit for a "spending intensity by day" view: replaces or supplements the day-of-week insight card, and is the natural home for day/time pattern insights the research flags as underused. Also usable inside category drill-down ("when do you spend on Food").
- **Dot-matrix / isotype grid** → good fit for the accumulation view specifically (one dot per purchase instance of a repeat merchant, e.g. 6 dots for 6 coffees this week) — this is more honest and countable than a bar, and matches the "Coffee: ₹40 today, ₹240 this week across 6 purchases" framing your own research already settled on as the differentiator.
- **Category pill filters with %change** → maps to the Categories tab's period selector + category rows: each category pill can carry its own vs-last-period delta the way the reference shows vs-last-period % on asset pills.
- **Sparkline mini-cards** (from the chat screen) → good fit for Insight-feed cards that are about a trend over time (week-on-week, category drift) — a small inline sparkline next to the headline number instead of, or alongside, the kicker/heading/subhead text block currently used for all 8 insight cards.
- **Dark-theme execution and density conventions generally** (tight stat-card padding, muted panel/border hierarchy, numeric tabular alignment) → apply system-wide.

**Does not translate — explicitly excluded:**
- **Candlestick charts** — priced-asset-specific (OHLC over time); nothing in a budgeting app has an open/high/low/close shape. Not used anywhere.
- **Long/short ratio area chart** — a trading-specific sentiment metric with no budgeting analog. Not used.
- **Holders/whale-distribution framing** — social/market-structure concept, no analog.
- Anything implying **price movement, volatility, or trading action** (buy/sell language, ticker-style flashing deltas) — a budgeting app showing a student's own spending should never read as a market to trade against. Deltas stay quiet, informational, non-alarming (per the project's own "gentle alerts, no guilt" research finding) — this is the single biggest thing to actively hold back from the reference artifact's tone, which is built for traders who *want* urgency.

---

## 3. Recommended information architecture

**Keep the existing 5-tab structure** (Home / Categories / Savings / Insights / Settings) — it already accommodates every base feature and the gap analysis confirms the grouping is sound. No merges or splits needed; the fix is what's *inside* each tab, not the tab count.

Confirming every base feature's placement (all preserved, none dropped):
- **Home** → tracking-method/account status (top of stat panel), small-purchase accumulation (dedicated card, upgraded to dot-matrix), transaction history (recent-activity card, upgraded to a denser row style with icon/category color)
- **Categories** → category-wise spending (segmented bars per category, replacing plain list) + per-category budget editing (unchanged interaction, restyled sheet)
- **Savings** → savings goals (progress + velocity) and subscriptions with due dates (upgraded to a due-soon-first list with visible monthly total) — both stay in this tab, not split out, since they're both "money set aside/committed" concepts a student thinks of together
- **Insights** → the 8-card feed, restyled per Section 4 below with a visual form chosen per insight rather than one repeated text template
- **Settings** → unchanged structurally; keep the explicit local-only/no-cloud-sync statement already present

One structural addition worth flagging for approval rather than assuming: promoting subscriptions' "next due" and total monthly cost into a small Home card (not a new tab — just a second glanceable module beside accumulation), since the research specifically calls this a vivid, currently-buried pain point (Nishad's forgotten ₹3,000/month autopay). This doesn't remove it from Savings — it just gives it a second, more visible surface, consistent with how accumulation already gets a Home card.

---

## 4. Insights to ship (grounded, not invented)

Drawing on the project's own secondary research (pain-of-paying, BCS HCI 2023 finding that budgeting apps track well but don't support behavior change) plus standard, well-established personal-finance UX patterns:

| Insight | Question it answers | Visual form | Why |
|---|---|---|---|
| **Pace-to-budget forecast** | "Am I on track to stay within budget this month/week?" | Burn-down / progress bar with a projected-end marker (segmented bar: spent so far vs. days elapsed vs. days remaining, with a marker showing where you'd land at current pace) | Well-supported pattern (PocketGuard "safe to spend," YNAB-style pacing); a gauge works too but a burn-down reads more honestly as "time vs money" rather than a single dial, and pairs with the segmented-bar component already adopted from the reference |
| **Category drift vs. prior period** | "Is Food creeping up compared to last week/month?" | Category pill with %change badge (direct reference-artifact pattern) inside Categories tab, one card in Insights spotlighting the single biggest mover | Directly evidenced: Harsh/Gautham wanted "where money went," and comparison is the natural next question after a static total |
| **Small-purchase accumulation** | "How much are my repeat small buys actually costing me?" | Dot-matrix grid, one dot per purchase instance, grouped by merchant | Already the project's stated headline differentiator; dot-matrix is more literal/countable than a bar and matches the "6 purchases this week" framing already settled on |
| **Day-of-week / time-of-day pattern** | "When do I spend the most?" | GitHub-style heatmap calendar (day cells shaded by spend intensity), replacing the current 7-bar chart | Heatmap generalizes better than a fixed 7-bar chart if later showing a full month, and is a direct, well-executed component from the reference artifact |
| **Subscription / recurring-charge visibility** | "What's committed and due soon?" | Compact list sorted by next-due date with a running monthly total stat-card, plus a due-in-N-days badge on the soonest one | Single-sourced but vivid pain point (forgotten Coursera autopay); the fix is visibility and urgency ordering, not a new chart type |
| **Biggest single-transaction outlier** | "What was my one unusually large purchase?" | Simple stat card: amount, merchant, category, with the rest of that day's spend shown small beside it for context | Standard, well-supported pattern (outlier flagging) missing entirely from trickle-v2 today — cheap to add, high perceived usefulness |
| **Savings-goal velocity** | "Am I actually going to hit this goal by when I said?" | Progress bar (existing) + one line of derived text ("at this rate, ~3 weeks to go") — no new chart type, just a computed projection added to the existing goal card | Currently only static %; the research's gamification citation (Bitrián et al. 2021) supports progress-toward-goal as motivating, but only if it feels attainable — a pace projection makes that concrete |
| **Discretionary vs. fixed/recurring split** | "How much of my spend is choices vs. commitments?" | Two-segment stacked bar or a single donut split (fixed = subscriptions + repeat-necessity categories, discretionary = everything else) on Insights, not Home (avoid duplicating the Categories donut) | Well-established budgeting-app pattern (distinguishing committed vs. flexible spend); currently absent, and directly useful for a student deciding what to cut |
| Peer/typical-student benchmark | — | *Not recommended for v1* | Flagged in Step 4 as speculative — no real dataset exists to ground it credibly, and a fabricated "average student spends ₹X" number risks eroding trust given the project's own local-first/no-data-sharing trust stance. Skip unless real benchmark data becomes available. |

Week-on-week comparison (already in trickle-v2's 8) stays, expressed as the delta badge pattern above rather than a standalone card, to avoid redundancy with category drift.

---

## 5. Visual system direction

**Dark theme parameters:** adopt the reference artifact's layered-dark approach — a near-black base (`ink`), one step up for cards (`surface`), a second step for nested/active elements (`surface2`), and a single accent color reserved for positive/primary emphasis (not multiple bright competing accents). Muted, low-contrast borders (not stark white outlines) to keep density from feeling cluttered — this is what lets the reference artifact pack in dot-matrices and heatmaps without visual noise.

**Stat-card conventions:** every stat card gets the same anatomy — a small uppercase label, a large tabular-numeral figure, and an optional small delta/context line — applied consistently across Home, Categories, and Insights so a student learns the pattern once. Triads (three related stats side by side, e.g. spent/pace/remaining) reused wherever three comparable numbers exist, directly borrowing the reference artifact's today/month/year-style groupings.

**Chart techniques to reuse:** segmented bars (budget burn, discretionary/fixed split), dot-matrix grid (accumulation), heatmap calendar (day/time pattern), sparkline (trend context inside insight cards and possibly goal velocity), pill filters with %change (category navigation). This is a deliberately small, repeated set — five chart types total, each used in 2+ places — rather than a bespoke visual per screen.

**What NOT to overdo:**
- No candlestick, long/short, or any chart implying tradeable price action — nothing in this app is a market.
- No ticker-style flashing/urgent color on deltas; keep tone matter-of-fact per the project's own non-punitive-alert research (NN/G tone-of-voice, PocketGuard reference) — red/green should read as "informational," not "alarm."
- No metaphor-per-screen illustration approach (avoid repeating trickle-visual-redesign's road/mountain/conveyor-belt pattern) — every screen should feel like it's drawing from the same small component kit, not a new idea each time.
- Don't let density become clutter: the reference artifact earns its density through hierarchy (large primary numbers, small secondary labels) — Trickle should match that discipline rather than just adding more panels.
- Keep copy and framing student-appropriate and gentle — this needs to read as a budgeting app *for a student*, not a shrunk-down trading terminal skin-swap. No jargon borrowed from trading (no "portfolio," "holders," "position") — use "spending," "budget," "goals," "categories."

---

*Deliverable is this brief only — no HTML/mockup was built in this task, per instruction.*
