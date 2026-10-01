# Trickle v8 — Direction + Phase Plan

## Problem (from reviews)
"Too much information, I don't know what I'm looking at." Every screen is numbers. Budgeting feels tedious. Seeing "no budget left" on open causes panic → close app → churn.

## User's values
1. Budgeting is tedious — the app makes it easy.
2. Savings is the motivator, not guilt about spending.
3. Friction at payment so it feels like handing over cash.
4. Small-purchase accumulation + understanding your habits.
5. Income → budget/savings split must be understandable at a glance.
6. Visual, not numeric. Retention is the top goal.

## Reframe
From "a ledger you audit" to "a companion you glance at". Open → feel good (progress) → one small action → leave. Bad news is shown only when you can act on it (at payment), never as the first thing on open.

## Psychology to apply (to research + validate in Phase 2)
- Ostrich effect: people avoid money info that might be bad → Home never leads with a deficit.
- Pain of paying: cash hurts, UPI doesn't → payment friction shows what the spend costs your goal.
- Goal-gradient + endowed progress: progress bars that start partly filled and speed up near the end motivate.
- Mental accounting: people think in jars/pots → income split as jars, not ledger lines.
- Defaults / automation (Fogg B=MAP): fewer decisions → auto-split rules, smart auto-categories.
- Fresh-start effect: new week/month = reset moment.
- Progressive disclosure + cognitive load: 1 idea per screen, details on tap.
- Peak-end rule: end every session on a positive (saved, streak kept).
- Loss aversion framed around savings, not spend.
- Streaks/variable reward (Hook model, Duolingo) — with care to avoid streak anxiety.

## Phases
1. Understand + audit: synthesize reviews; audit v7 for cognitive load (numbers per screen, decisions per screen, taps to core jobs); define core jobs and the emotional arc of a session.
2. Research: behavioural finance + retention psychology (sources), apps that do this well (Cleo, Qapital, Digit, Monzo pots, Jupiter pots, Duolingo, Finch, Headspace), onboarding + habit loops.
3. Concepts: 2–3 low-fi directions for Home, the income split, and the pay friction moment; user picks.
4. Spec: IA (likely fewer tabs), "number budget" per screen (max 1–2 numbers visible, rest on tap), copy tone, visual metaphors, retention loop (daily glance, weekly check-in, month-end story).
5. Build v8.
6. Validate: numbers-per-screen audit, 5-second test per screen (can a new user say what it shows?), click-through, retention loop walkthrough.

## User decisions (Phase 2 → 3, authoritative)
- **Core philosophy:** the user makes ONE choice at a time. Minimal numbers. Visual, calm; savings motivates. No games, no streaks/badges.
- **Home:** NO budget number. Ambient background glow = pace over the user's chosen budget period (calm green on track, warm amber a bit fast, never red on Home). Below: Pay/tracking, past transactions, pinned visuals.
- **Money tab** (replaces Savings) = three collapsed sections: Income, Budget, Savings. Tap to expand with animation; one open at a time. Balance lives here. Tabs: Home | Money | Actions | Insights (no 5th tab needed so far).
- **Income split:** budget is basically fixed; everything above budget auto-flows to savings by rule; one glanceable confirm.
- **Payment friction:** NO timed pause. User picks a category, sees that category's budget as a visual, and watches this payment's chunk being taken out of it (animated). Only told how much the category can cover, no detailed split. If more than the category has: show the overflow visually with a single simple next choice.
- **Tracking:** no SMS. UPI linkage or manual entry only.

## Phase 3 status
Concepts delivered: see claude/v8_phase3_concepts.md (A Jars, B Tiles, C Orbs). Awaiting pick.
