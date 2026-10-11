# The money model (v26, 11 Oct 2026): what you did is the truth, the bank is a check

**What changed from v25.** Tarun: "Remove balance is the master. Everything else v25 handles better."
- In v26 the record of what you did is the truth: money in, spends, bills, moves and goals bought.
- The bank balance is a **check**. When you sync, Trickle sets its balance to your bank's number, and it also **keeps a note of the difference** as "untracked". So you can see that ₹400 went somewhere Trickle didn't hear about.
- Everything else from v25 stays: one ledger, nothing stored twice, every number worked out fresh on every screen.
- v26 also closes the seven gaps found in the review of Tarun's system plan.

## The system in simple terms
1. **Your money has two parts: savings and to spend.** Savings + to spend = the balance Trickle expects in your bank.
2. **Everything you do is written down:**
   - money added;
   - a spend;
   - a bill paid;
   - money moved into or out of savings;
   - a goal bought.

   The expected balance is what you started with, plus money in, minus money out.
3. **"To spend" is split four ways:**
   - **This week:** what you can use now.
   - **Later weeks:** what is kept for the rest of your plan.
   - **Held for subscriptions:** bills due before your plan ends (Netflix, gym and so on), kept aside so they never eat a week.
   - **Not in any week:** money added without a plan, or left over when a plan ends. You choose: put it in savings, or spread it over 4 weeks.
4. **This week = (money left − subscriptions due) ÷ weeks left.**
   - It is worked out on Monday, and again when money comes in, so the week after money arrives gets a full share.
   - It does not change while you spend in the week.
5. **Each spend comes out in this order:**
   1. this week;
   2. later weeks;
   3. savings;
   4. below zero. Trickle says "You've spent ₹X more than you had", and the next money in pays that back first.
6. **Sync with your bank.** You type your real balance and Trickle compares it with what it expected:
   - **The same:** marked "matched".
   - **Less:** the gap is noted as "−₹X untracked" (cash, a payment you forgot to log). It comes out of to-spend money first. If the bank has less than your savings, savings shrink too: money not in a goal goes first, then each goal by its share.
   - **More:** noted as "+₹X untracked". The extra goes into the new plan.

## The seven gaps, and what v26 does
| # | Gap | v26 rule | Proof (`mockup26/tests/scenarios.js`) |
|---|---|---|---|
| 1 | Subscriptions counted twice: in the week, and again when paid | Bills due before the plan ends are **held** out of the weekly amount. Paying one uses the held money, so the week does not change | Netflix ₹199: held ₹199 → ₹0 after paying; this week ₹950 → ₹950 |
| 2 | Buying a goal broke the week | A bought goal comes out of that goal's savings only. The week and later weeks do not move | Week ₹1,575 → ₹1,575; balance ₹9,000 → ₹7,000; savings ₹2,700 → ₹700 |
| 3 | What happens below zero was undefined | The balance can go below zero and the screen says so. The next money in pays it back first, then fills the weeks | Overspend to −₹500; add ₹2,000 → balance ₹1,500, all ₹1,500 in weeks |
| 4 | No formula for a fresh week mid-week | When money comes in, this week starts again from that moment: money left ÷ weeks left, and "spent" counts from then | Money added mid-week: "₹975 of ₹975 left, ₹0 spent" |
| 5 | Which goal shrinks when the bank has less | Money not in a goal first, then each goal by its share | Goals ₹3,000 and ₹1,000, bank ₹2,000 → ₹1,500 and ₹500 |
| 6 | An untracked week was swept into savings as if it was saved | A week with no entries at all is not swept. Its money goes on to next week, and statistics skip it | Empty week: savings ₹0 → ₹0 |
| 7 | A sync difference was lost | Every sync is kept: expected, what you typed and the difference, shown on the Balance screen as "−₹X untracked" or "matched" | Expected ₹4,600, typed ₹4,000 → "−₹600 untracked" |

## How it is checked
- **Scenarios:** `tests/scenarios.js` has one scenario per gap. All 7 pass.
- **Random-action test:** `tests/model.js` runs 150 random actions on each of 7 starting points (the six demo profiles and a fresh ₹400 onboarding).
  - v26 adds two actions: a bill falling due and a bill being paid.
  - After every action it checks:
    - savings + to spend = balance;
    - savings ≤ balance;
    - this week + later + held + not in any week = to spend;
    - the balance moved by exactly the money in or out.
- **Results:** 0 failures on seeds 1, 2, 3, 5, 7, 11, 99, 4242 and 31337 (9,450 steps).
- **A bug the random test found:**
  - With the balance below zero, moving money into a goal could make the goal negative.
  - Fixed: a move never takes more than the to-spend money there is.
- **Earlier screen tests:** fuzz, panel, tips and scan5 pass.

## What it does not cover yet
- **Not tested with students.** These are rules and automatic checks only.
- **"Untracked" is only seen at a sync.** Trickle cannot know about cash it was not told about.
- **A week with no entries is treated as untracked.** A student who really spent nothing that week would have to log something, or the money rolls on instead of being saved.
- **Subscriptions are held from the bills Trickle knows about.** A new one is held only after it is added.
- **The demo profiles have no history of where their money came from.** As in v25, their balance becomes one 4-week plan when opened.
