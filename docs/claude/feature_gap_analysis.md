# Prototype Gap Analysis — Lo-fi Mockup vs. Research + Feature Priority List

Cross-referencing the current clickable mockup (`Trickle Onboarding` artifact) against `updated_feature_priority_list.md`, `screens_to_design.md`, and `secondary_research_report.md`. Organized by feature priority, each item marked **Built**, **Partial**, or **Missing**, with why it matters pulled from the research.

---

## Core features (Very High priority — corroborated across nearly all 6 interviews)

### 1. Automatic Transaction Tracking — **Partial, and the weakest link**
- Built: the onboarding choice between "Connect UPI" and "Manual Tracking."
- Missing: the actual **manual-entry form** (the fallback path, and what a denied-permission user lands on) doesn't exist — "Manual Tracking" currently just routes straight to Categories with nothing behind it.
- Missing: **transaction detected/parsed confirmation** state (a toast or inline card when an SMS gets auto-parsed).
- Missing: **transaction detail view** (single transaction: amount, merchant, category, auto vs. manual source tag).
- Missing: **transaction list/history view** — there is currently no screen anywhere in the prototype that shows a log of individual transactions. Everything downstream (category breakdown, insights, accumulation) is aggregate-only.
- This is priority #1 in the feature list and the one most under-built relative to its evidence strength.

### 2. Daily & Weekly Spending Overview — **Partial**
- Built: Home screen shows weekly spend, daily spend, and balance.
- Missing: **empty state** for Home (first-run, before any transactions exist) — right now Home always shows populated numbers.
- Missing: the **toggle between "remaining" and "spent" framing** that the build plan flags as an actual Phase 1 validation question, not just a nice-to-have — this is a hypothesis you're supposed to be testing, and there's currently no UI for either variant to be compared.

### 3. Category-wise Spending — **Partial**
- Built: Category breakdown screen (donut/wheel chart + list) on the Categories tab.
- Missing: **single-category drill-down** — tapping a category currently does nothing; there's no screen showing just that category's transactions.
- Missing: **category edit/manage screen** as its own destination — Settings routes "Categories" back to the onboarding categories screen, which lets you add/remove but not rename, recolor, or merge categories.

### 4. Small-Purchase Accumulation View — **Missing entirely**
- This is flagged in your own research as *the* key differentiator — the strongest and most distinctive finding in the whole study (Tarun/coffee, Nishad/cigarettes, Yash/quick-commerce, Harsh/food, Vaishak/food), and confirmed as genuine white space with no existing UX pattern to copy.
- Nothing in the current mockup surfaces small recurring purchases as an accumulated pattern (e.g., "Coffee — ₹40 today, ₹240 this week across 6 purchases").
- Also missing: the **accumulation detail view** (tap into a pattern to see the individual purchases behind it).
- Given this is your headline differentiator and the research explicitly says it needs extra design iteration time (no prior art to lean on), this is the single highest-priority gap to close next.

---

## High-priority supporting features

### 5. Pre-Spending Awareness — **Missing entirely**
- Conceptually the most important feature (the actual fix for "awareness comes late"), and now has a concrete shape from Vaishak's interview: a lightweight check *at the moment of payment* showing remaining category budget / weekly spend / goal impact.
- Nothing like this exists in the mockup. Given the research's own technical caveat — UPI payments happen inside GPay/PhonePe, so a true blocking interstitial may not be buildable — you need **two** designs here: a "true interstitial" concept (fine for prototype testing) and a fallback widget/notification concept (for what might actually ship). Neither exists yet.

### 6. Gentle Spending Alerts — **Partial, and currently the wrong shape**
- Built: a bare on/off Notifications toggle in Settings.
- Missing: any actual **alert/notification content design** — an in-app banner and a push-notification variant, written in the non-punitive "safe to spend" tone your own research (NN/G, PocketGuard, Lee/SSRN) says is essential.
- Missing: an **alert settings screen** with threshold/tone configuration — your research flags tone as the single highest-risk design element, which argues for giving users real control over it, not just a global on/off switch.
- Missing: alert history/log (optional per the screen list, but worth a placeholder).

### 7. Purpose-Based Funds — **Missing (the Budget tab is a different thing)**
- What exists is a Budget tab: daily/weekly cadence toggle + an editable budget number per category, compared against spend. That's useful but it is not the same concept as "purpose-based funds" — named funds (food/transport/college/savings/fun) with an allocated amount, a progress bar, and their own transaction feed, which is what Nishad's three-separate-accounts pattern and Vaishak's "buffer" concept describe.
- Missing: funds overview screen, fund creation/setup, fund detail (with progress bar + transactions), fund edit/reallocate.
- Evidence caveat noted in your own list (only strongly sourced from 2 participants) — reasonable to sequence this after the four core features and pre-spending awareness.

### 8. Savings Goals — **Partial, and currently just one generic meter**
- Built: a single savings-goal progress bar on the Insight tab (hardcoded to one goal).
- Missing: **goals overview** (a list of active goals, since presumably there can be more than one), **goal creation** screen (name, target amount, optionally linked to a fund), **goal detail** (contribution history, "₹30,000 of ₹50,000" style), and — worth calling out specifically since your own screen list flags it as a state to design intentionally — a **goal-reached / celebration state**. None of the multi-goal structure or the creation/detail flow exists yet.

---

## Secondary features (Medium priority)

### 9. Subscription / Recurring-Payment Detection — **Missing entirely**
- Single-sourced (Nishad's forgotten ₹3,000/month Coursera autopay) but a vivid, concrete pain point.
- Missing: subscriptions list (detected recurring charges + frequency + accumulated cost), subscription detail (charge history, next expected date), and — per the Rocket Money pattern your research explicitly recommends — a **confirm/flag-as-subscription** step, since auto-detection needs lightweight human confirmation to avoid false positives. Also missing a manual-add path for subscriptions the system doesn't catch.

### 10. Spending Behaviour Insights — **Partial**
- Built: the Insight tab's "highest contributor" callout and "other categories combined" total are a reasonable start at rule-based observations.
- Missing: this isn't yet a proper **insights feed** (a scrollable card list of simple factual observations like "food spending up this week") with individual insight detail/tap-through into the category or accumulation view it references. Right now it's two static callouts, not a feed.

---

## Onboarding & setup — the other major gap

This isn't in the priority list as its own numbered feature, but `screens_to_design.md` calls it out as required to support everything else, and your research's strongest, most rigorously-sourced section (7.5, two USENIX/SOUPS papers) is entirely about this:

- **Missing: SMS permission rationale screen.** Nothing in the current flow explains *why* the app needs READ_SMS access before an Android system dialog would appear. This is a real gap given it's the best-evidenced part of your whole research doc — Wijesekera et al. and Bonné et al. both point specifically at contextual, just-in-time explanation as the thing that determines whether users trust and grant the request.
- **Missing: granted vs. denied states**, and specifically a **graceful denied-permission fallback** into manual entry — right now there's no consequence modeled for declining, so there's also no fallback path to design against (see the missing manual-entry form under Feature 1).

---

## Cross-cutting / shell gaps

- **Bottom nav** — built, and matches the proposed grouping (Budget/Categories/Home/Insight/Settings) reasonably well.
- **Settings** — built, but missing the one thing your research explicitly says should live there: an explicit statement of the **local-only, no-cloud-sync stance**. This is called out twice in your research (the local-first trust differentiator, and the "app selling user stress data" cautionary case) as something to surface directly to users, not just implement silently.
- **Search/filter across transactions** — missing, but this is a consequence of the transaction list itself not existing yet (Feature 1). Once that list exists, this can live inside it rather than as a separate screen.

---

## Where this leaves you against your own two-phase plan

Your build plan's **Phase 1** (core loop validation) is meant to be just four things: onboarding, Home/overview, category breakdown, and the accumulation view. Against that narrower bar:

- Onboarding: solid on the "choose a tracking method → categories → PIN" mechanics, but missing the permission-rationale screen and denied-state fallback that your research says are the highest-stakes part of onboarding.
- Home/overview: built, with layout bugs now fixed, but still missing the empty state and the remaining-vs-spent framing toggle you're supposed to be testing.
- Category breakdown: built.
- **Accumulation view: not built at all** — and this is the one Phase-1 screen your own research says has no prior art to copy, meaning it needs the most original design time, not the least.

So even scoped down to just Phase 1, the accumulation view is the one clear must-build-next item — it's both your headline differentiator and currently a zero.

**Suggested next-build order**, given all of the above: (1) small-purchase accumulation view + detail, since it's Phase 1, unbuilt, and your key differentiator; (2) manual-entry screen + transaction list/detail, since several other features silently depend on transactions existing as first-class objects; (3) SMS permission rationale + denied fallback, since it's your best-evidenced research section and currently has zero screens; (4) pre-spending awareness (interstitial + widget/notification alternative); (5) the rest of the High/Medium features in the order your priority list already gives them.
