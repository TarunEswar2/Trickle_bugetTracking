# Trickle v6 — Build notes (Phase 4 + 5)

Artifact: https://claude.ai/artifact/Gf27yHr1G8noAVqVWe6s2M ("Trickle — v6"). Source: scratchpad `trickle-final-v6.html` (~163 KB, single file, no libraries). Modular sources in `scratchpad/v6/` (data, charts, core, onb, home, cats, pay, insights, savings, settings, boot; `build.py` concatenates them). `#demo` / `#demo:<frame>` skip onboarding (UPI path).

Tracking is UPI linking or manual entry only. The file contains no SMS feature, copy, field or comment: `grep -i sms` returns 0.

## Seed data (deterministic, mulberry32 seed 42; goals seed 7)
- Window from 1 Apr 2026 to "today", fixed at 24 Sep 2026 18:30, giving 455 transactions. Each transaction has `{id, merchant, cat, amt, ts, source, account, payeeType, sub?}`. `account` is null exactly when the source is Manual.
- Split: 82.6% UPI and 17.4% Manual. Of UPI transactions, about 73/27 go to nishad@oksbi and nishad@ybl.
- Hour-of-day comes from each merchant's profile (Campus Coffee, JD Canteen, RV Shop, Metro, Zepto, BigBasket weekends, and others). Night purchases (22:00–01:00) are 7.0% of transactions.
- Monthly shape: May Stationery ×2.5; June Food ×0.6 and Transport ×1.45; Aug Groceries ×1.2. Seven category-months go over budget (Buffer in Apr and Jul because of the quarterly gym charge, Stationery in May, Transport in Jun, Snacks in Jul, Groceries in Aug).
- Contacts: 6–10 P2P payments a month, filed under Buffer or Transport. One bank transfer a month.
- Goals: Motorcycle (14 dated contributions), Goa (8), and Headphones (reached 20 Jul, 7 contributions).
- Subscriptions carry billing cycles and price history (Spotify went from ₹99 to ₹119 on 3 Jul). Every charge is also a transaction.
- Balance = 6,000 + 6 × 8,000 − spend − contributions, which gives ₹3,152.

## Screens and charts
- **Onboarding (8 frames):** splash (demo concentric rings); method (two-lane flow diagram plus Home thumbnails); upiSetup (phone → IDs → Trickle node diagram); onbCategories (live ghost rings); onbAllocate (allowance input, pie with callouts, slider per category, "Unassigned" slice); pin (two dot rows on a custom keypad, turn accent on match, shake on mismatch); permissions (toggles wired to a miniature Home); allSet (ghost rings, half-donut, linkage diagram). A step-arc progress indicator appears on steps 1–5.
- **Home:** half-donut "Safe to spend today"; Today/Week/Month tiles with sparklines; 14-day streak dots; pictogram rows for repeat purchases; Sankey-lite that starts from month spend, with right-hand labels wrapped to 2 lines; subscriptions-due chips with icon rings; recent rows with UPI/Manual badges; pay tiles, which grey out when their permission is off.
- **Accumulation:** ranked pictogram with ₹/yr. **Accumulation detail:** 24h area strip plus purchase dots, and an annualised bullet.
- **Transactions:** 30-day column strip that updates with the filter; tap a column to jump to that day. **Transaction detail:** merchant range strip, 24h tick clock, category-budget bullet, recategorise. **Manual entry:** live impact bullet with pace tick and status.
- **Categories Share:** concentric radial arcs (common 270° scale, % label and icon at the ring start, largest ring outermost), ranked rows with a bullet and status icon each. **Categories Monthly:** pie with callouts (5 slices + Other) and fill jars (6 months × category, ▲ notch when over, % label on top). **Category detail:** area chart with budget dashline and scrub, tone-step treemap, stat triad. **Sheets:** budget (linked monthly/weekly/daily fields plus live 100% allocation bar), edit categories (slot swatches), period (₹ totals), quick category.
- **Payment:** scan; pay anyone (micro bars); bank transfer (account outflow micro bar); pay amount (live bullet); friction sheet (3-segment bullet with pace tick, "Spent before this", purchase dot rows, status); confirm (balance delta bar, round-up ring); savings sheet (goal rings with a ghost round-up).
- **Insights (11 cards in 4 sections):** budget-pace bullet with projection; dumbbell comparing the same days of Aug and Sep; fixed vs discretionary meter; 6-month columns with budget line; 24h radial; 4 part-of-day gauges; heatmap plus range strip; ranked merchant bars; histogram; radar (share ÷ max share); subscription calendar with dots sized by amount.
- **Savings:** icon-centre goal rings with ETA; subscription donut plus next-due list. **Goal create:** stepped weekly-pace columns. **Goal detail:** cumulative step-line with projection, target and today markers, and contribution dots by type; stacked area of round-up vs manual. **Goal reached:** ring with dated contribution ticks. **Subscription detail:** 12-cell pictogram, price step-line, share meter. **Subscription add:** live 12-cell preview.
- **Settings:** linkage diagram plus UPI/manual 100% bar; tracking sheet (two lanes); account sheet (micro bars); alerts (bullet with threshold tick); PIN change (visual dots); permissions (same diagram as onboarding).

Interaction: tapping a mark dims its siblings and shows a tooltip chip above it (below it if it's near the top of the card). Line charts can be scrubbed by hover or drag. Double-tapping a ring, slice or Sankey flow opens the category.

## Deviations
- Coursera costs ₹399/mo instead of ₹2,500. At ₹2,500 it would take 31% of an ₹8,000 allowance and make the balance negative.
- Subscription charges are counted inside category budgets (Coursera in Necessities; Gym, Spotify, Cloud and Prime in Buffer).
- The 24h radial and part-of-day gauges leave out autopay charges. Autopay runs at 9:00 and created a false 9 am spike.
- Treemap tiles filter transactions on double-tap, not tap, because a single tap shows the tooltip.
- The subscription donut uses a ranked sequential blue scale, since subscriptions aren't categories.
- In the manual path, the seeded history is converted to Manual entries so that `account` is null.

## Validation (Playwright, Chromium)
- `node --check` passes.
- Every `go()` and `openSheet()` target exists: 32 frames and 8 sheets.
- Click-throughs completed with 0 console errors:
  - UPI onboarding: invalid ID error, add, suggestion chip, category add/remove, slider (clamped to the allowance), PIN mismatch then match, permission toggle.
  - Manual onboarding.
  - Payment through Pay Anyone → friction sheet → confirm → round-up.
  - Manual entry.
  - Tooltip.
- No horizontal page overflow on any frame or sheet. The only element wider than the screen is the transaction filter chip row, which scrolls inside its own container on purpose.
- Every frame was screenshotted and reviewed. Fixed after review: pie labels clipped at the edge, notches hidden under the cell above, the half-donut end label overlapping the arc, truncated inner-ring names (now dropped rather than cut), the onboarding pie folding categories into Other, the 9 am autopay spike, a negative balance, and dateless transaction rows.

## Known issues
- Inner-ring labels drop the category name when there's no room; the row list still shows it.
- Subscription donut labels on the left side are truncated with "…".
- Callout labels crowd a little on the left of the allocation pie (8 slices).
- Contribution ticks on the goal-reached ring are narrow tap targets.
