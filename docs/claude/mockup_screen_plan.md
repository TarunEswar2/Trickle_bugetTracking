# Mockup Build Plan — Screens to Add/Fix (from the Gap Analysis)

A concrete screen-by-screen plan for closing the gaps in `feature_gap_analysis.md`, sequenced in the order proposed there. Nothing here is built yet — this is the plan to approve before implementation starts. Each screen follows the mockup's existing conventions (lo-fi gray/black wireframe, `data-frame` + `go()` navigation, real wired function per the figma-to-clickable-mockup discipline) and uses the same seeded example data pattern already in place (SPEND_CATS, HOME_STATS) rather than inventing a new data model per screen.

---

## Batch 1 — Small-Purchase Accumulation (headline differentiator, Phase 1, currently zero)

1. **`accumulation` — Accumulation view**
   A home-screen-reachable screen (or module) listing recurring small purchases grouped by merchant/type, in the "Coffee — ₹40 today, ₹240 this week across 6 purchases" format. Reuses SPEND_CATS-style seeded data but at the *merchant* level (e.g. "Campus Coffee," "Zepto," "Cigarettes") rather than category level, since accumulation is about repeated small transactions, not category totals.
2. **`accumulationDetail` — Accumulation detail**
   Tap into one pattern (e.g. "Campus Coffee") to see the individual purchases behind it — a simple list of amount + date/time, all generated from the same seeded set as screen 1 so the numbers agree.
3. Wire an entry point: a module/card on Home (or a new Home section) surfacing the top 1–2 accumulation patterns, tapping through to screen 1.

## Batch 2 — Transactions as first-class objects (several other features silently depend on this)

4. **`manualEntry` — Manual transaction entry**
   The actual form behind "Manual Tracking" (currently a dead end that just routes to Categories). Amount, category picker, merchant/note, date — Add button writes into the same transaction store screens 5–6 read from.
5. **`transactions` — Transaction list/history**
   A searchable/filterable log of all transactions (auto + manual), reachable from Home and from category drill-down (screen 7). Each row: merchant, category, amount, source tag (Auto/Manual).
6. **`transactionDetail` — Single transaction detail**
   Tap a row in screen 5: amount, merchant, category, date, source tag, with an edit/recategorize action (addresses the "miscategorization is Mint's top complaint" note from your research).
7. **`categoryDrilldown` — Single-category transaction list**
   Tapping a category on the existing Categories tab currently does nothing; this screen shows just that category's transactions (a filtered view of screen 5).
8. Add a **parsed-transaction confirmation state**: a brief toast/inline card shown right after a simulated "new SMS parsed" event — doesn't need its own frame, just a small transient UI state layered onto Home.

## Batch 3 — Onboarding: SMS permission rationale (your best-evidenced research section, currently zero screens)

9. **`smsRationale` — Permission rationale screen**
   Inserted into onboarding between "Connect UPI"/method choice and the system dialog: explains why READ_SMS is needed (auto-track UPI/bank debit SMS, nothing leaves the phone), shown *just-in-time*, not at first launch — per Wijesekera/Bonné.
10. **`smsGranted` / `smsDenied` — Post-dialog states**
    Since there's no real OS dialog in a prototype, simulate it with two buttons ("Allow" / "Deny") on screen 9 that branch: Allow → continues the existing auto-tracking flow; Deny → routes to screen 11.
11. **Denied fallback** — routes straight into `manualEntry` (screen 4) as the graceful fallback path, rather than a dead end.

## Batch 4 — Pre-Spending Awareness (conceptually your most important feature, currently zero)

12. **`prePay` — Pre-payment interstitial (concept A)**
    A "true interstitial" screen — remaining category budget / weekly spend / goal impact — shown as if it appeared at the moment of payment. Good enough for prototype testing even though it likely can't ship this way (UPI payments happen inside GPay/PhonePe).
13. **`prePayWidget` — Widget/notification concept (concept B)**
    A second, smaller design: what a home-screen widget or notification-based nudge would look like instead, since that's the more realistic shipping shape per your research's own technical caveat. Doesn't need to be interactive — a static representative state is enough to test the idea.

## Batch 5 — Fill out the partially-built features

14. **Home empty state** — a first-run version of Home (no transactions yet) — a state on the existing `home` frame, not a new one, toggled by whether any transactions exist.
15. **Remaining-vs-spent toggle** — a switch on Home between "₹X remaining this week" and "₹X spent this week" framing — this is a named Phase 1 test question in your build plan, so it should exist as an actual toggle, not a design decision baked in silently.
16. **Alert content + settings**
    - `alertBanner` — an in-app banner example (non-punitive "safe to spend" tone, not "you overspent")
    - `alertSettings` — threshold/tone configuration screen, replacing the bare on/off toggle currently in Settings
17. **Funds overview / creation / detail** — `funds`, `fundCreate`, `fundDetail` — the actual "purpose-based funds" concept (named funds with allocated vs. spent, progress bar, own transaction feed), distinct from the existing Budget tab which stays as-is (per-category budget amounts).
18. **Savings goals — full flow** — `goals` (list, since there can be more than one), `goalCreate`, `goalDetail` (contribution history), `goalCelebration` (goal-reached state) — replacing the single hardcoded meter on Insight.
19. **Subscriptions** — `subscriptions` (list), `subscriptionDetail`, `subscriptionConfirm` (flag-as-subscription per the Rocket Money pattern), plus a manual-add path.
20. **Insights feed** — turn the two static Insight-tab callouts into a proper scrollable card feed (`insightsFeed`), each card tapping through to the category/accumulation view it's about.
21. **Settings: privacy statement** — add an explicit "your data stays on this device, nothing is synced to the cloud" line to Settings — one line, no new screen.

---

## Suggested sequencing

Batches are ordered by the priority the gap analysis already established: 1 (differentiator) → 2 (transactions foundation, several later features depend on it) → 3 (best-evidenced onboarding gap) → 4 (most important concept, currently zero) → 5 (rounding out partials, roughly in your existing Medium/High priority order).

Batch 2 is the biggest lift (4 new screens + a transient state) but also unblocks the most — screens 7, and later the transaction feeds inside Funds/Goals/Subscriptions, all read from the same store this batch creates.

Say go whenever you want me to start — happy to do all batches in one pass, or one batch at a time if you'd rather review as we go.
