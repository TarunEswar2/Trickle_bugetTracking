# The money model (v25, 11 Oct 2026): the balance is the master

**Why it changed.** In v24 you typed ₹400 and saw a balance of ₹1,001. The demo profile already held weekly money that came from nowhere, and the balance was kept as a separate number. In v25 there is one ledger, and every number on every screen is worked out from it, every time. Nothing is stored twice, so nothing can drift.

## The rules
| # | Rule |
|---|---|
| R1 | **Balance = start + money in − money out.** Only *money in* (Add to balance, onboarding) or a *sync* can raise it. Spends, bills and bought goals lower it. Moving money between savings and spending does not change it. |
| R2 | **Savings ≤ Balance.** "To spend" = Balance − Savings. The two always add up to the balance. |
| R3 | **To spend = this week + later weeks + not in any week.** A plan only divides money that exists; it never creates any. |
| R4 | **This week = each plan's money left ÷ its weeks left.** This is worked out on Monday, and again whenever money comes in, so after you add money this week gets a full share. Spends before that moment have already left the bank. |
| R5 | **A spend comes out of this week first, then later weeks** (the plan that ends soonest goes first). Past all of "to spend" it comes out of savings. Past savings, the balance goes below zero and the app says "You have spent ₹X more than you had". The next money in pays that back first. |
| R6 | **Sync = start from scratch.** The number you type becomes the balance. Savings stay inside it, and only go down if the bank has less than them (money not in a goal first, then goals). Everything else becomes one new plan from today, until the date you choose. |
| R7 | **Leftover money never disappears.** When a plan ends with money left, or money is added without a plan, it shows as "Not in any week yet" with two choices: Put in savings, or Spread over 4 weeks. |

## Your case
You type ₹400 in onboarding and keep 20% aside, over 5 weeks:
- **Balance:** ₹400.
- **Savings:** ₹80.
- **To spend:** ₹320, which is ₹64 this week and ₹256 in later weeks.
- **After a ₹50 chai:** the balance is ₹350, savings are still ₹80, ₹14 is left this week, and later weeks are unchanged.

## How it is checked
`archive/session-workfiles/mockup25/tests/model.js` runs 150 random actions on each of 7 starting points:
- **Starting points:** the six demo profiles, ₹3k to ₹25k, plus a fresh onboarding with ₹400.
- **Actions:** spend (₹20 to ₹6,000, including more than you have), add with a plan, add without a plan, move money into a goal, take money out of savings, buy a goal, pass days, end a week and save the rest, sync above or below savings, and act on leftover money.

**After every action it checks:**
- savings + to spend = balance;
- savings ≤ balance;
- this week ≤ to spend;
- this week + later + not in a week = to spend;
- plans never hold more than "to spend";
- the balance changed by exactly the money in or out (or equals the typed number after a sync).

**Result:** 0 failures in 4,200 steps across four seeds (11 Oct). Run `SEED=5 node tests/model.js` for another seed.

## What it does not cover yet
- Bills are counted when they are paid, not reserved ahead.
- Several plans running at once each keep their own end date. "This week" is the sum of their shares.
- The demo profiles have no record of where their money came from. Their bank balance (or savings + this week) becomes one 4-week plan when they open.
