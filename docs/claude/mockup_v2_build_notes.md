# Trickle Lo-Fi Prototype v2 — Build Notes

Rebuilt from scratch against the Figma file `Lofi Budget App`
(`ojbHyNY17bS8irUeSXTe4V`). Supersedes the earlier `trickle-onboarding`
artifact. Published as a separate artifact so the old one stays intact for
comparison.

## Key decisions

**No SMS anywhere.** Tracking is UPI-linked or manual entry only, per the
updated direction. The SMS rationale/denied screens from the previous build
were dropped entirely.

**Frame size: 412 x 915 (Pixel 8).** Content flows and scrolls inside the
frame rather than being absolutely positioned, so screens can't collide as
content grows. The Figma frames were 402 x 874 / 402 x 967.

**Onboarding step numbering fixed.** The Figma file labels both the
Categories screen and the Security PIN screen as "Step 2". The prototype
renumbers to four real steps — Method/UPI (1), Categories (2), PIN (3),
Permissions (4) — and the progress dots are computed from actual navigation
state rather than hardcoded per screen.

**Budget editing lives in Categories, not its own tab.** The five tabs are
Savings, Categories, Home (centre), Insight, Settings, matching the Figma
bottom nav component. The earlier build's separate Budget tab was retired
and its function folded into the Edit Budget overlay on Categories, which is
what the Figma `Lofi Edit Budget` overlay already showed.

**Friction screen is an overlay, not a full screen.** The Figma frame is 459
tall, i.e. a bottom sheet. It sits between Enter Amount and Payment
Confirmed in the real pay flow rather than existing as a standalone demo,
and shows balance-after-payment, the category weekly bar split into
spent / this purchase / remaining, and purchase counts for the day and week.

## Screens built (31 frames + 9 overlays)

Onboarding: splash, tracking method, UPI setup, categories, security PIN,
permissions, all set.

Home: account panel with weekly/daily spend and deltas, balance with eye
toggle, three payment tiles (UPI mode) or Enter Transaction (manual mode),
Small Purchases Trends card, Transaction History card. Camera and Contacts
permissions actually hide Scan QR and Pay Anyone when switched off.

Payment: Scan QR (with quick-category picker), Pay Anyone (searchable
contacts), Bank Transfer, Enter Amount, friction sheet, Payment Confirmed
with a savings-goal round-up sheet.

Transactions: full history with search and category filter, transaction
detail with recategorise, manual entry, accumulation list and per-merchant
detail.

Categories: period dropdown (daily/weekly/monthly), donut, category rows
with deltas, per-category detail with budget progress, Edit Budget and Edit
Categories overlays.

Savings: goals list, goal create/detail/celebration, subscriptions with next
due dates, subscription detail and manual add.

Settings: accounts, tracking method, categories, budgets, alerts, history,
PIN change, permissions, privacy statement, restart.

## Insights feed — eight cards

Budget pace (calendar week, Monday to today, against summed category
budgets); day-of-week spending across the last 30 days as a seven-bar Mon-Sun
chart with the heaviest day highlighted; biggest category mover vs last week;
accumulation spotlight on the top repeat merchant; biggest contributor as a
share of the month; total monthly subscription cost; primary savings goal
progress; week-on-week comparison. Every card taps through to the screen it
is about.

## Data model

One shared transaction store seeded across 35 days from a merchant table
(merchant, category, amount range, frequency per week), so accumulation,
category totals, the donut, the day-of-week chart, insights and the friction
check all read the same numbers instead of each screen inventing its own.
Amounts are randomised per session, so figures differ on each Restart.

## Validation

Static checks (JS syntax, tag balance, navigation targets, ids, duplicate
ids) plus a headless Playwright click-through covering the full onboarding
path, the complete payment flow through the friction sheet, all five tabs,
category drill-down, budget editing, insights rendering, savings goals and
subscriptions, manual-entry mode, accumulation and transaction search. No
console errors, no horizontal overflow on any frame.
