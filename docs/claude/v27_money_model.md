# The money model (v27, 11 Oct 2026): no balance, just money in and how long it lasts

**Tarun (11 Oct):**
- "Don't show balance, just calculate weekly allowance. Let the app not get into bank balance, just running income and how long they should last. Also savings don't need a deadline."
- "If a new balance sync is made, allow for the saving/spend split again. If savings can accommodate the new split, keep them as is, or just reduce savings accordingly."

## The system in simple terms
1. **You add income** (pocket money, stipend, anything) and say two things:
   - how much to keep aside;
   - how long the rest should last.
2. **What you keep aside goes to Savings.** Savings have no deadline: a goal shows how much is left to save ("₹4,700 to go"), never a date.
3. **The rest is your money to last.** Trickle cuts it into weeks:
   - **This week:** your weekly allowance, the big number on Home.
   - **Later weeks:** kept for the rest of the time you chose.
   - **Held for subscriptions:** bills due before it runs out.
   - **Not in any week:** money added without a plan. You choose: save it, or spread it over 4 weeks.
4. **Weekly allowance = (money left − subscriptions due) ÷ weeks left.**
   - It is worked out on Monday, and again when you add income, so that week gets a full share.
5. **A spend comes out of** this week, then later weeks, then savings, then below zero. Below zero, the app says so, and the next income pays it back first.
6. **Start again** is for when you have lost track. It has three questions:
   1. "How much do you have now?"
   2. "Keep some aside?" It starts at your savings as they are now.
   3. "How long should it last?"

   **The savings rule:**
   - **The split keeps as much as your savings or more:** your savings stay as they are, and the extra goes in as money not in a goal.
   - **The split keeps less:** savings go down by the difference. Money not in a goal goes first, then each goal by its share.

**Trickle never shows or asks for a bank balance.** It does keep a total inside: income minus spends. That total is only used to do the sums.

## What changed on screen
| Where | v26 | v27 |
|---|---|---|
| Home row | "Balance ₹4,200 · Savings · To spend" | "Money to last ₹2,100, until Sun 25 Oct · 4 weeks" |
| Balance screen | Balance, savings, weeks, checks with your bank | **Your money:** money to last, this week, later weeks, held for subscriptions, running income with dates |
| Button | Add to balance | Add income |
| Onboarding | "What's your bank balance?" | "How much money do you have to plan?" |
| Sync | "How much is in your bank now?" with "Trickle thinks ₹X", 2 steps | **Start again**, 3 steps with the split; no comparison with what Trickle expected |
| Checks with your bank (V26-1) | "−₹400 untracked" list | Removed (it needed a balance) |
| Paying more than you have | "That is more than your balance" | "₹X of it comes from savings", or "That is more than you have, savings included" |
| Goals | "Ready Aug 2027", "By when (optional)", "needs ₹X a month" | "₹X to go"; no date anywhere |
| Week end (old hand-tracking step) | "Does your balance still look right?" | Skipped |

## How it is checked
- **Scenarios:** `archive/session-workfiles/mockup27/tests/scenarios.js` has 9 scenarios, and all pass:
  - the six v26 gaps;
  - three "start again" cases:
    - **Savings as now:** goal ₹600 and ₹400 not in a goal stay; ₹2,000 to spend, ₹500 a week (the preview said ₹500).
    - **Keep ₹1,500:** the goal stays at ₹600; not in a goal goes from ₹400 to ₹900.
    - **Keep ₹700:** not in a goal goes from ₹400 to ₹100; the goal is untouched.
    - **Keep ₹200:** not in a goal goes to ₹0, and the goal goes from ₹600 to ₹200.
- **Random-action test:** `tests/model.js` now includes "start again with a random split". After each one it checks that savings equal the amount kept.
- **Results (11 Oct):** scenarios 9/9 pass. The random test found 0 failures on seeds 1, 2, 3, 5, 7, 11, 99, 4242 and 31337. The fuzz, panel, tips and scan5 screen tests pass.

## What it does not cover yet
- **Not tested with students.**
- **Money Trickle wasn't told about is not seen.** With no bank check, unlogged cash only shows when you start again.
- **"Saved this month" on Savings does not go down** when start-again lowers savings. Only the totals do.
- **Two copy choices are mine:** "Add income" (testers found "Add money" unclear) and "Money to last". Both are PROPOSED.
