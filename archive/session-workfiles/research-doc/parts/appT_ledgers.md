## Appendix T. Glossary, hypotheses ledger and open questions

### T.1 Glossary (the project's own vocabulary, and how new users are likely to read it)
| Term | What it means in the project | Where it appears | Risk for a new user |
|---|---|---|---|
| Box / tile | One cell of the 10×10 grid; 1% of the thing the grid shows | Home, category, goal, income split, week compare | Reads as a rupee unit; differs per grid |
| Grid, gauge, fuel gauge | The 10×10 fill display of money left | Everywhere | "Gauge" is a designer word |
| Liquid | The lit part of the grid; money left | Specs | Not visible to users |
| Ghost | Dashed outline of boxes that just left | Pay | Unexplained until the first payment |
| Crumble / fade | The pay animation (boxes fade out in order) | V2 | Not a user word |
| Pace | The share of the week's money spent compared with the share of the week gone | Home | Jargon (Part 12) |
| On pace / ahead of pace | Green / amber state | Home, tips | Jargon |
| Plan | A weekly amount built from income or typed, split across categories | Home, Money | Ambiguous (a fitness plan?) |
| Income | Money that arrives and is split into saving and spending, with a date range | Money | Different from "one-off money" |
| One-off money | Money received that is not income (friend pays back) | Money | Hard to tell apart from income |
| One-off payment | A payment outside the weekly plan (a laptop repair) | Pay | "Outside your plan" |
| Split | Dividing income between saving and spending | Money, tips | Divide with a friend? |
| Buffer | The part of the weekly money not given to a category; also the first source for overspending | Plan | Rarely shown, still explained in copy |
| Fixed reserve / set-aside | Money held each week for subscriptions | Plan | Hidden mostly |
| Subscription | A repeated payment (formerly "fixed bill") | Spending, Plan | Familiar |
| Category | A named bucket of spending | Everywhere | Familiar after a prompt |
| Limit | A category's weekly amount | Spending | Never set by most users |
| Cascade | Order in which an overspend is covered | Specs | Hidden |
| Look-back | Compare a category with the same moment of an earlier period | V1 | Replaced in v15 by Vs last week |
| Hotspot / hot grid | A calendar-like grid whose cells glow by spend | Insights | Designer word |
| Repeat | Same place or kind, 3+ times in 30 days | Insights | Not the same as "small" |
| Week review | The recap when a week ends | Home | Fine |
| Tier 1, 2, 3 | Proposed visibility tiers (Part 10.3) | Docs | n/a |
| Track / limits / plan | The three levels a user can sit at (B-7) | Docs | Hidden |
| Bare-minimum mode | Only category tracking required (B-1 to B-8) | Docs | Hidden |
| Parked | Built, not reachable in v15 | Docs | n/a |
| Delegated | A decision Claude made on Tarun's instruction, open to override | Logs | n/a |
| Tip | A one-time explanation card (V15-19) | App | Fine |
| Ask | A one-question pop-up (B-12) | App | Fine |
| Unsorted | A detected payment with no category yet | Spending, Home | Fine |
| Credit / waiting money | Money detected on the account and awaiting assignment | Home | Fine |

### T.2 Hypotheses ledger
Everything below is currently an assumption or a design inference, not a finding. "Evidence" is the strongest support in the repo. "Test" names the part of Appendix P that would settle it.

| # | Hypothesis | Evidence | Against | Test | If false |
|---|---|---|---|---|---|
| H1 | Showing a payment's effect at the moment of paying raises awareness | Soman 2001; Prelec & Loewenstein; one uncoded remark (Vaishak) | Nothing contradicts it; no test | P.5 test B; P.8 diary | The signature feature is decoration |
| H2 | Students will let Trickle start the payment (scan in Trickle, then hand off) | None | Habit of paying in GPay | Step 1 spike; P.4 q18 | Friction at pay must come after the payment, from a notification |
| H3 | UPI spends can be read without SMS through an Account Aggregator | Framework exists (Sahamati) | Needs a regulated partner; narration data is coarse | Step 1 spike | Manual-first product; import as the "auto" path |
| H4 | A weekly period fits how students think about money | Two interviewees check weekly or daily | Nobody asked how they plan | P.4 q11; P.8 day-7 | Show the weekly engine in the user's unit (month or "until allowance") |
| H5 | Students want a plan at all | Harsh (one) hints at category budgets | Four of six have none; they use mental limits | P.8 q3 | Tracking and patterns only (the bare-minimum mode becomes the product) |
| H6 | The 10×10 grid is readable without teaching | Literature on icon arrays and fill levels | Reviewers cannot read it; 2.8 score; unit differs per grid | P.5 test A | Replace on Home (Part 11.7) |
| H7 | A number on Home does not cause avoidance (the ostrich effect) for "left this week" | None for this framing | Principle 3; Olafsson & Pagel | P.5 test A (number-first variant) and P.4 | Remove the number or reframe as days |
| H8 | Awareness, not spending less, is the right outcome | Apps move perception more than behaviour (RCT snippets, 3.3) | None found | O1 in P.8 | The product needs a different promise |
| H9 | Repeat purchases are the right proxy for "small purchases adding up" | Tarun's v9 redefinition | A one-off ₹30 snack is small and not a repeat | P.4 q10 | Add a "small" view (under ₹100 count, sum) |
| H10 | Savings goals motivate saving | Yash (one) | Weak | P.4 q13 | Remove goals from Tier 1 |
| H11 | Automatic leftover-to-savings at week end is wanted | Design reasoning (B-32) | Could feel like money vanishing | P.6 task 8 probe; P.8 | Offer a choice again |
| H12 | Subscriptions need a set-aside | Nishad's Coursera story | Single source | P.6 task 7 | Subscriptions become a list with reminders |
| H13 | Design-student feedback predicts non-design students' comprehension | None | Different familiarity with dense visuals | P.1 mix | Re-weigh all review evidence |
| H14 | First-time tips improve understanding | Progressive-disclosure literature (off-domain) | Tips are one more thing to read; the project's pattern is "explain by adding" | P.6 with and without tips | Remove tips, fix the screens |
| H15 | The product is better in v15 than v14 | Density audit; Tarun's reaction | "Losing functionality" (Tarun's intuition) | P.6 on both builds, same tasks | Revisit the tier split |
| H16 | Dark, gradient, calm visual identity supports the "no guilt" aim | Tarun's taste; calm-tech essay | Not tested | Short mood question after the first open | Neutral theme |
| H17 | Local-first is a selling point | Vaishak (one) | No evidence it affects choice | P.4 q17 | Drop it from the pitch |

### T.3 Open questions register
**Research**
1. Who were the six interviewees (age, institution, income, UPI use)? Where are the transcripts and the survey?
2. What did the pre-payment friction remark say, exactly, and in what context?
3. How many people have seen each build, and what did each say? (Step 0b)
4. Do students think in days, weeks, months or "until the next allowance"?
5. How do students feel about a number on Home?
6. Which situations (friends, travel, offers) cause the surprises, and is there anything the app can do in those moments?

**Technical**
7. Which Account Aggregator route is available to a student project, and what does a real UPI debit look like in it?
8. Can a Trickle-initiated payment (QR in Trickle, intent hand-off) be built, and will users do it?
9. Is notification reading an acceptable fallback, and does it count as inside the no-SMS rule?
10. What does CSV or PDF statement import look like for the main Indian banks?

**Product**
11. Is a plan part of the first release, or does it wait for the diary results?
12. What is the first-run goal, and what is the first thing a user should see?
13. Does Home need a picture at all?
14. Should leftovers roll into next week by default?
15. How should a future-dated income (allowance on the 1st) work?
16. How should "small" (not repeated) purchases be defined and shown?

**Design**
17. One direction for fills (lit = left) everywhere, and how to treat savings (Part 11.7).
18. A colour contract with one meaning per hue.
19. A copy standard for questions (Part 12.3) and a lint for jargon.
20. How should the grid be taught: percent or rupees?

**Process**
21. Who decides, and how are decisions reviewed? (Part 8.6)
22. What is the stopping rule for design work before the next test round?
23. Where do reviewer notes live, and who is responsible for recording them?

**From the earlier docs, still open (not answered anywhere):** density levels (P2-Q4); statement import format; large incomes (₹50k and above) on the dot ladder (retired); whether "small purchases" and "repeat purchases" are the same (9 above); Income that starts in the future; leftover rolling; detection merge window (not built).
