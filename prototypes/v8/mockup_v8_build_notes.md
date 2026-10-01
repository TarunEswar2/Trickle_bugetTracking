# Trickle v8 — Build notes (Phase 5 + 6)

Artifact: https://claude.ai/artifact/L2N64ytUW88JZ9dTNz3esF ("Trickle — v8"). Source: `/home/claude/v8/` (ledger.js, ui.js, app.js, flows.js, rhythm.js, style.css → build.py → trickle-final-v8.html; scratchpad copy too). Direction B · Tiles. No text-message tracking anywhere (grep = 0): linked UPI IDs or manual entry + statement import placeholder.

## What's in it
- **Onboarding (8 screens, one choice each):** welcome tiles → tracking (UPI / manual) → link UPI ID or manual demo + import → period weekly/monthly → fixed budget (₹500 tiles) → categories (auto-divided tiles) → first goal → first savings moment (allowance tiles split into budget + savings). "Skip, show me the demo" on screen 1; `#demo` deep link skips.
- **Home:** blurred tile glow (green "On pace" / amber "A bit fast", word always paired), Pay + Log cash (manual users: "Add a spend" primary), 3 recent spends with tile-size glyphs (amount on tap via detail), compact subscription tile card, pinned widgets (default Goa waffle + period strip), "Pin more visuals".
- **Pay:** payee → amount → auto-suggested category → category ₹100 tiles, this payment's tiles flash and fly out → "Food can cover this." or amber "Fun can cover ₹540 of this." + one list: next month / richest category / Rainy-day jar (or top goal) → UPI hand-off → savings moment + "Split it with friends".
- **Money:** balance (only number) + New-money banner when unsorted → accordion Income / Budget / Savings, one open, animated (closed bodies are visibility:hidden). Budget = category tile grids with amber dashed overflow + "next month starts lighter"; Move between categories (3 one-choice steps). Savings = goal waffles, Rainy-day jar, Owed to you (Remind share copies a message, Paid back), leftover Auto/Ask me, New goal.
- **Income arrival:** auto-fills each category to its fixed amount for the month, rest → top goal (capped at target, overflow → Rainy-day jar); confirm card with tile animation, Got it / Undo (money becomes New money, one-tap "Sort it").
- **Actions:** split to settle (Someone paid back → pick person → repayment returns to Food), categorise Paytm QR (suggested one tap, remembers payee), Spotify renews (Keep / I'll cancel), Monday check-in, leftover (manual sweep). Empty state "Nothing needs you."
- **Goals:** 10×10 waffle (1 tile = 1%), add ₹100/500/1,000, moves list, create (name → size → head start from Rainy-day jar), reached sheet (Use it / Keep saving).
- **Insights board:** 9 widgets (goal, period strip, where it went, small spends, savings growing, time of day, weekday pattern, subscriptions, owed); Pin to Home, Edit → reorder ↑↓ / Hide, hidden chips restore; state kept in localStorage.
- **Rhythm:** Monday check-in (3 cards), period story (4 cards ending "You saved ₹X") → Start October: sweep, clock moves, allowance auto-splits, glow tiles reset.
- **Drawer:** UPI IDs / link another, import (placeholder), period, fixed budget ±, categories, leftover, reduce motion, replay onboarding, prototype controls (glow Real/Calm/Fast, café pay arrives, check-in, end period).
- **Transactions:** filter chips, grouped by day with amounts; detail with category change, split, source.

## Data
v7 ledger model renamed: pools new_money · budget:cat · goal:id; invariant new_money + Σbudget + Σsavings == balance == Σflows, transfers balanced, owed outside. Seed (fixed today Mon 21 Sep 2026): budget ₹6,000 (Food 2,400 · Travel 900 · Fun 800 · Essentials 1,400), allowance ₹9,000, Jul–Sep history, Goa ₹4,200/8,000 + Rainy-day ₹878 (savings ₹5,078), balance ₹6,939, Pizza Hut split (₹900 owed), Spotify due Thu, Paytm QR uncategorised.

## Phase 6 results (validate.js)
- node --check OK; every data-a has a handler; no console errors; no horizontal overflow on any checked frame.
- Numbers visible on first load: Home 0, Money 2 (balance, "₹100 tiles" label), Actions 0, Insights 0 in first screen (3 on full scroll, all tile-unit captions).
- Flows verified with invariant after each (101 checks, all ok): pay overflow from jar, split after pay, pay overflow into next month, log cash, café income split → Undo → Sort it, settle (Food 630 → 930), categorise, check-in, goal create, goal reached + spend, move, pin/reorder/hide widget (pins → Home), period story + fresh start with manual sweep → leftover action, drawer period/glow, tx list/detail, both onboarding paths (UPI / manual, weekly, custom categories).
- prefers-reduced-motion: animations collapse to 1 ms (plus drawer toggle). No red on Home (computed colour scan). Every screenshot reviewed.

## Known issues / deviations
- Fonts (DM Sans, Fraunces) load from Google Fonts; offline shows Georgia/system fallback.
- Monday check-in lives in Actions (not on Home) to keep Home at zero prompts.
- Fresh start can fill Goa to 100% via the sweep without the "reached" sheet (it shows only when adding from goal detail).
- Recent-spend amounts on Home need a tap into detail (tile glyph gives size); UPI hand-off and QR scan are placeholders.
