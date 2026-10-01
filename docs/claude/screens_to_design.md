# Student Spending App — Features & Screens to Design

Derived from the feature priority list and build plan already in this project. Organized by feature, then rolled up into the two prototype phases so you know what to build when.

---

## Feature → Screens Map

### 1. Onboarding & Setup *(not a standalone "feature" in the priority list, but required to support all of them)*
- Welcome / value-prop screen (1–2 screens max — what the app does and why, no heavy KYC-style flow)
- Category setup — pick/customize spend categories (food, transport, college, fun, etc.)
- SMS permission rationale screen — explains *why* (auto-track UPI/bank debit SMS, nothing leaves the phone) shown right before the Android system dialog, not at first launch
- Android system permission dialog (native — not something you design, but the moment before/after it needs states: granted vs. denied)
- Denied-permission fallback state — graceful path into manual entry, not a dead end
- (Optional) Quick account/profile setup if you add any local profile concept

### 2. Automatic Transaction Tracking *(Core)*
- Manual-entry screen/form (the iOS/fallback path, and denied-permission fallback)
- Transaction detected/parsed confirmation (brief toast or inline card — not necessarily a full screen, but a state to design)
- Transaction detail view (single transaction: amount, merchant, category, source tag — auto vs. manual)
- Transaction list / history view (searchable/filterable log of all transactions)

### 3. Daily & Weekly Spending Overview *(Core)*
- Home screen — today's spend, this week's spend, amount "remaining" (this is your primary landing screen)
- Empty state for Home (no transactions yet — first-run state)
- Toggle/switch between "remaining" framing and "spent" framing if you decide to test both (per your Phase 1 validation question)

### 4. Category-wise Spending *(Core)*
- Category breakdown screen (spend grouped by category — likely a chart + list)
- Single-category drill-down (tap a category to see just its transactions)
- Category edit/manage screen (add, rename, recolor, or merge categories)

### 5. Small-Purchase Accumulation View *(Core — your key differentiator)*
- Accumulation surfacing screen or home-screen module ("Coffee: ₹40 today, ₹240 this week" style)
- Accumulation detail view (tap into a pattern to see the individual purchases behind it)
- This has no existing UX pattern to borrow from (per the research doc) — budget extra design iteration time here specifically

### 6. Pre-Spending Awareness *(High priority)*
- Pre-payment interstitial / check screen (remaining category budget, weekly spend, or goal impact) — **note the technical constraint from the research**: since UPI payments happen inside GPay/PhonePe/etc., this may need to be redesigned as:
  - A home-screen widget, or
  - A notification-based nudge, rather than a true blocking screen
  Design both a "true interstitial" concept (for Phase 1/2 prototype testing, where it's easiest to test the *idea*) and a fallback widget/notification concept (for what may actually ship)

### 7. Gentle Spending Alerts *(High priority)*
- Alert/notification design (in-app banner + push notification variant) — non-blocking, informative tone only
- Alert settings screen (let users configure thresholds/tone preferences, since tone was flagged as the highest-risk design element)
- Alert history/log (optional — a place to review past alerts rather than only seeing them as ephemeral notifications)

### 8. Purpose-Based Funds *(High priority)*
- Funds overview screen (all funds — food/transport/college/savings/fun — with allocated vs. spent per fund)
- Fund creation/setup screen (name, allocate amount)
- Fund detail screen (transactions within that fund, progress bar)
- Fund edit/reallocate screen

### 9. Savings Goals *(High priority)*
- Goals overview screen (list of active goals with progress)
- Goal creation screen (name, target amount, optionally link to a fund)
- Goal detail screen (progress, "₹30,000 of ₹50,000" style, contribution history)
- Goal-reached / celebration state (a specific state worth designing intentionally, not an afterthought)

### 10. Subscription / Recurring-Payment Detection *(Medium priority)*
- Subscriptions list screen (detected recurring charges, frequency, accumulated cost)
- Subscription detail screen (single subscription: history of charges, next expected date)
- Confirm/flag-as-subscription screen (since auto-detection needs lightweight human confirmation — per Rocket Money's pattern in the research)
- Missed/manually-add-subscription flow

### 11. Spending Behaviour Insights *(Medium priority)*
- Insights feed/screen (simple rule-based observations, e.g. "food spending up this week") — likely a scrollable card feed, not raw data
- Individual insight detail (if an insight deserves a tap-through, e.g. into the category or accumulation view it's about)

---

## Cross-Cutting / Shell Screens
These aren't tied to one feature but are needed to hold everything together:
- Bottom navigation / app shell (Home, Categories, Funds/Goals, Insights, Settings — or however you group the above)
- Settings screen (permissions, category management, alert tone, data/privacy controls — surface the "local-only, no cloud sync" stance here explicitly, since it's a stated trust differentiator)
- Search/filter across transactions (could live inside the transaction list rather than be separate)

---

## Mapped to Your Two Prototype Phases

### Phase 1 — Low-fidelity (core loop validation)
Per the build plan, only these four:
1. Onboarding — permission/category setup (simplified, grayscale)
2. Home / Daily & Weekly Overview
3. Category breakdown
4. Small-purchase accumulation view

*(This is intentionally narrow — the build plan is testing whether the core loop makes sense before you invest in the rest.)*

### Phase 2 — High-fidelity (full feature set)
Everything above, refined, plus:
5. Pre-spending awareness interstitial (+ widget/notification alternative)
6. Gentle spending alerts (in-app + notification + settings)
7. Purpose-based funds (overview, creation, detail, edit)
8. Savings goals (overview, creation, detail, goal-reached state)
9. Subscription detection (list, detail, confirm-flag)
10. Spending behaviour insights (feed + detail)

Plus, once you're building the full clickable prototype, the shell screens (nav, settings) and the fuller onboarding flow (permission rationale, denied-state fallback) should be designed here too, since Phase 1 only needed a stripped-down version of onboarding to test the core loop.

---

## Rough Screen Count
- Phase 1: **~6–7 screens/states** (onboarding simplified, home, category breakdown, category drill-down, accumulation view, accumulation detail, empty state)
- Phase 2 adds roughly **20–25 more screens/states** across funds, goals, subscriptions, insights, alerts, full onboarding, and settings

This is a lot of surface area for a solo MDes project — consistent with your stated preference for engaging with full complexity rather than a stripped-down MVP, but worth sequencing deliberately (Phase 1 first, gated by usability testing) rather than designing all ~30 screens at once.
