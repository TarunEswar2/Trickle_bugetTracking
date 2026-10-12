# The money model (v27, 12 Oct 2026): very simple

**Tarun:**
- **11 Oct:** "Don't show balance, just calculate weekly allowance. Let the app not get into bank balance, just running income and how long they should last. Also savings don't need a deadline."
- **12 Oct:** "Remove this money to last and all that, very simple."
  - Settings full screen.
  - At the bottom, Restart budgeting, the only red button: a warning, then the same onboarding.
  - Past events stay logged.
  - Allow the split. If savings can't be accommodated, reallocate in the same percentage.
- **12 Oct:** "When a subscription is added, deduct it from the spendable money and recalculate the weekly allowance. If it is cancelled, do the same."

## The system in simple terms
1. **You add income** (pocket money, stipend, anything). You say how much to keep aside and how long the rest should last.
2. **What you keep aside goes to Savings.** Savings have no deadline: a goal shows "₹4,700 to go", never a date.
3. **The rest is spending money, cut into weeks.** Home shows one thing: this week's allowance and what is left of it.
4. **Weekly allowance = (spending money left − subscriptions due before it runs out) ÷ weeks left.** It is worked out again:
   - every Monday;
   - when you add income;
   - when you add, change, pause, cancel or remove a subscription.
5. **Subscriptions are taken out of the spending money up front, not from the week they fall due.**
   - Adding Netflix ₹200 with 4 weeks left turns ₹1,000 a week into ₹950.
   - Cancelling it gives the ₹50 back.
   - The message says the new week ("Netflix added. Your week is now ₹950.").
6. **A spend comes out of** this week, then later weeks, then savings, then below zero. The next income pays back below zero first.
7. **Restart budgeting** (Settings, at the bottom, red):
   1. A warning: "Restart your budget?" with Continue or Cancel.
   2. The onboarding questions again: how much money you have to plan, keep some aside, how long it should last.
   3. Past spends stay logged.

   **The savings check:**
   - **The amount kept aside is at least your savings:** savings stay as they are, and the extra goes in.
   - **It is less:** everything in savings goes down by the same percentage, so each goal keeps its share. Example: a goal of ₹600 and ₹400 not in a goal, keep ₹700. Everything goes down 30%, to ₹420 and ₹280.
8. **Money outside every week** (added with "Just add it, no plan", or left when a plan ends) shows as one small card on Home, only when it exists: Put in savings, or Spread over 4 weeks.

Trickle never shows or asks for a bank balance. Inside, it keeps income minus spends, only to do the sums.

## What changed on screen
| Where | v26 | v27 |
|---|---|---|
| Home | Balance row | Weekly allowance only (no "Money to last") |
| Balance / Your money screen | Balance, savings, weeks, bank checks | Removed |
| Button | Add to balance | Add income |
| Onboarding | "What's your bank balance?" | "How much money do you have to plan?" |
| Settings | Sheet from the bottom | Full screen; red "Restart budgeting" at the bottom |
| Sync with bank | Two steps, compared with what Trickle expected | Restart budgeting: warning, then the 3 onboarding questions with the split |
| Subscriptions | Held from the week's start | Taken out now; week worked out again on add, change, pause, cancel or remove |
| Goals | "Ready Aug 2027", "By when", "needs ₹X a month" | "₹X to go" |

## How it is checked
**Scenarios** (`builds/v27/tests/scenarios.js`):
- the six v26 gaps;
- restart with savings as now;
- restart, keeping more;
- restart, keeping less (same share each);
- restart keeps past spends;
- subscription added;
- subscription cancelled.

**Random test** (`tests/model.js`): random actions across the six demo profiles and a fresh start, including restart with a random split, adding a subscription and cancelling one. After every action it checks the arithmetic.

Results are in `builds/v27/README.md`.

## What it does not cover yet
- **Not tested with students.**
- **Money Trickle wasn't told about is not seen** until you restart.
- **"Saved this month" on Savings does not go down** when a restart lowers savings.
- **Changing a subscription restarts the week** from that moment, the same as adding income.
