# Student Spending App — Build Plan

Three phases: two prototypes (validate the design direction before writing production code) and then a full cross-platform build. Every phase maps back to the research conclusion — *spending is easy → tracking is difficult → awareness comes late* — so nothing in the plan should exist unless it earns its place against that.

---

## Phase 1 — Prototype 1: Low-fidelity, core flow validation

**Goal:** Test whether the *core loop* (automatic-feeling tracking → visibility → accumulation → decision) actually makes sense to a student before investing in visual design.

**Build:** Grayscale/low-fidelity wireframes in Figma. No brand styling, no real data — just structure and flow.

**Screens to wireframe (only the four Core features):**
1. Onboarding — connect/simulate transaction source, set up categories
2. Home / Daily & Weekly Overview — today's spend, week's spend, amount "remaining"
3. Category breakdown — spend grouped by category
4. Small-purchase accumulation view — "Coffee: ₹40 today, ₹240 this week" style surfacing

**Test with:** 4–6 people, ideally including some of your original six interviewees (Nishad, Yash, Gautham, Harsh, Vaishak, plus 1–2 new). Reuse the interview questions as task framing — e.g. hand them a scenario ("you just bought coffee 5 times this week") and watch whether the accumulation view actually produces the "oh, that's more than I thought" reaction you're designing for.

**What you're validating, not just usability:**
- Does surfacing accumulated small purchases actually shift perception, or does it feel like nagging? (Watch for the guilt reaction Vaishak and Yash both flagged — reject any version that reads as scolding.)
- Is "remaining" framing (money left) clearer than "spent" framing, or vice versa?
- Do people understand category grouping without explanation?

**Output:** A short findings note (keep it to the same Bryman-style rigor you used for the interviews — don't skip documenting this just because it's your own project) and a prioritized list of what changes before Prototype 2.

---

## Phase 2 — Prototype 2: High-fidelity, full feature set

**Goal:** A polished, interactive Figma prototype covering all 10 features, refined from Phase 1 feedback, tested well enough that you'd be comfortable committing engineering time to it.

**Build:** Full visual design system (color, type, components) applied to all screens, connected into a clickable prototype with realistic sample data.

**Screens/flows to add on top of Phase 1:**
5. Pre-spending awareness — the payment-moment check, based on Vaishak's "remind me before I'm paying" / "friction before paying" request: a lightweight interstitial showing remaining category budget, weekly spend, or goal impact right before a purchase is logged
6. Gentle spending alerts — non-blocking, informative tone only (explicitly not the "you spent too much" scold pattern participants rejected)
7. Purpose-based funds — allocate money across food/transport/college/savings/fun
8. Savings goals — goal creation + progress (the "laptop, ₹30,000 of ₹50,000" pattern)
9. Subscription/recurring-payment detection — surfaced list with frequency + accumulated cost
10. Spending behaviour insights — simple generated observations, not raw transaction dumps

**Test with:** Same or expanded group, this time with a full task flow across a week or a simulated week ("here's a week of transactions, use the app to understand what happened"). Also worth testing the *tone* of alerts and category-limit warnings specifically, since survey responses were mixed (motivation vs. guilt vs. neutral) — this is the highest-risk part of the design to get wrong.

**Decision gate before moving to Phase 3:** Don't start the full build until Prototype 2 usability testing shows the core loop and at least the Very High / High priority features are clear and well-received. If something's still confusing, iterate in Figma — it's much cheaper to fix there than in code.

---

## Phase 3 — Full Build

### Stack

- **Frontend:** React Native (Expo-managed workflow to start — eject to bare workflow later only if you need a native module Expo doesn't support)
- **Navigation:** React Navigation
- **State management:** Zustand or Redux Toolkit (Zustand is lighter and fine for this app's scope)
- **Local storage:** SQLite (via `expo-sqlite` or WatermelonDB) as the source of truth for transaction data
- **Backend:** Start local-first, no mandatory account/cloud sync for v1. This directly answers Vaishak's stated distrust of cloud-based tracking apps ("some local only app might be fine... you don't wanna trust cloud-based apps for some of your private things"). If you add sync later, make it opt-in and clearly explained, not default-on.
- **Charts/visuals:** Victory Native or React Native SVG-based custom components for the spending overview, category breakdown, and goal progress

### The automatic-tracking problem (read this before building)

Feature #1 (Automatic Transaction Tracking) is your highest-priority feature and also your biggest technical risk, because **automatic tracking works differently — or not at all — depending on platform:**

- **Android:** You can request `READ_SMS` permission and parse UPI/bank debit SMS notifications to auto-log transactions without manual entry. This is the realistic path to true "automatic" tracking and is what most Indian expense-tracking apps (the ones your participants compared you to, like Jupiter and PayTM) actually do.
- **iOS:** Apple does not allow SMS access. There is no automatic-tracking equivalent — Apple Pay/UPI-adjacent auto-capture isn't available to third-party apps the way it is on Android.

Because you chose React Native (cross-platform), decide explicitly now rather than discovering this mid-build: either (a) ship Android-only for v1 with real automatic tracking, since that's where the actual feature value is and where your interview participants live, or (b) ship both platforms with automatic tracking as Android-only and a fast manual-entry flow (quick-add, recent-amount chips, voice-to-log) as the iOS fallback. Given the research, (a) is the more honest MVP — don't let cross-platform ambition quietly turn your #1 feature into a manual-entry app on half your platforms.

### Data model (starting point)

- `Transaction` — id, amount, category, timestamp, source (`sms_auto` | `manual`), merchant/note, recurring flag
- `Category` — id, name, monthly allocation (nullable — supports the "not a fixed budget, mental thing" pattern several participants described), icon/color
- `Fund` — id, name (food/transport/college/savings/fun), allocated amount, spent amount (Purpose-based Funds feature)
- `Goal` — id, name, target amount, saved amount, linked fund (Savings Goals feature)
- `Subscription` — id, merchant, amount, frequency, detected-from transaction ids (Subscription Detection feature)
- `AlertRule` — category/fund id, threshold %, tone setting (Gentle Spending Alerts feature — keep alert copy configurable/testable, since tone was flagged as sensitive)

### Build order (map features to sprints)

**Sprint 1–2 — Core loop, Android automatic tracking**
- SMS permission flow + parser for common UPI/bank formats
- Transaction storage, manual-entry fallback
- Home screen: daily/weekly overview
- Category-wise spending screen

**Sprint 3 — The differentiator**
- Small-purchase accumulation view (this is your most evidenced, most distinctive feature — don't rush it)

**Sprint 4 — Purpose and motivation**
- Purpose-based funds (allocation UI)
- Savings goals (creation + progress UI)

**Sprint 5 — The payment-moment feature**
- Pre-spending awareness interstitial (the Vaishak-derived feature) — this needs to hook into wherever a transaction is about to be logged, so build it after the core transaction pipeline is stable, not before

**Sprint 6 — Secondary features**
- Gentle spending alerts (tone-tested copy from Phase 2 prototype testing)
- Subscription/recurring-payment detection
- Spending behaviour insights (simple rule-based observations to start; no ML needed for v1)

**Sprint 7 — Polish and QA**
- Apply final visual design from Prototype 2 exactly (don't let implementation drift from what was tested)
- Edge cases: no transactions yet, permission denied, malformed SMS, negative balances
- Performance pass on SMS parsing (don't block the UI thread)

### Testing before launch

- Usability re-test the built app against the same tasks used in Phase 1/2 testing — confirm the real thing produces the same reactions the prototype did
- Privacy/permission-flow test specifically — SMS permission requests are a common drop-off point; the ask needs to clearly explain *why* (tie it back to the automatic-tracking value prop) or users will decline it

---

## Summary timeline

| Phase | Output | Gate to move on |
|---|---|---|
| 1. Low-fi prototype | Core-loop wireframes, tested with 4–6 users | Core loop is understood and doesn't feel like nagging |
| 2. Hi-fi prototype | All 10 features, full visual design, tested | Testers succeed at realistic weekly-usage tasks |
| 3. Full build | Working Android-first (iOS-optional) app | Re-tested against same tasks, matches prototype behavior |

The through-line to hold onto at every phase: the app's job is to close the gap between the moment of payment and the moment of realization — not to add friction or guilt. Every feature and every build decision (local-first storage, non-blocking alerts, Android-first automatic tracking) should be traceable back to something a specific participant said.
