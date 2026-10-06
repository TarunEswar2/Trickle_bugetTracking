## 13. The Architecture & Strategy Document (6 Oct 2026): what it says, what we applied, what stays open

Tarun uploaded "Trickle: Strategic Architecture Document & Action Plan" (6 pages, `Overcoming Convergence Issues & Re-anchoring Product Mission via Visual Representation & Information Architecture`) and asked for v15 to be updated with its findings. This part records it, checks each claim against the rest of this record, and says what was built.

### 13.1 What the document says
**Thesis.** Stop working on backend routes (Account Aggregator, background reading of payments) and work on visual representation and information architecture. Make Trickle the point where a payment starts, so the gap between paying and perceiving the effect closes without scraping a bank.
**Eight causes of non-convergence and the fix for each:**
| # | Cause | Fix in the document |
|---|---|---|
| 1 | Outcomes were directions, feedback was never captured | An outcome matrix: **O1 Awareness** (80% or more estimate the week's spending within ±20% without checking the balance), **O2 Effort** (no logging for wallet payments; manual cash entry at most 2 taps and 5 seconds), **O3 Comprehension** (80% or more understand the Home state in a 5-second test, unprompted), **O4 Calmness** (0% "judged" or "anxious" answers after an overspend) |
| 2 | 66.7% of interviewees use no budget, yet 94% of decisions were about budgets and categories | Freeze category budget set-up; default onboarding becomes **Allowance Allocation**: one weekly discretionary amount; categories classify spends afterwards |
| 3 | Reviewers asked for less, designer intuition kept restoring things | Three tiers: **Tier 1** always visible (1 hero visual, weekly balance, the pay action, 20 words or fewer), **Tier 2** one tap away (history, category breakdown, subscriptions), **Tier 3** deep (multi-month, goals, export); the **one-in-one-out rule** for Tier 1 |
| 4 | The unit per box changed from screen to screen | **Fixed unit**: 100 marks = 100% of this week's amount, in 5 blocks of 20 so it can be read without counting; rupees only as a subtitle ("1 mark ≈ ₹15"); the grid only empties |
| 5 | Decisions were logged without evidence | Every decision gets: ID, target domain, evidence source (primary or a paper), validation gate |
| 6 | Delegated decisions blurred ownership | Two stages: **PROPOSED** (Claude or collaborators) until **CONFIRMED** by the lead designer |
| 7 | Jargon ("Pace", "Plan", "Boxes") | Visual descriptors: "Weekly remaining allowance", "Spent marks", "Log expense" |
| 8 | 80% of titles relied on jargon or lacked context | Name the object and the purpose: "How many days should this allowance last?" instead of "Until when?" |
**Also in the document:** ghosted spent marks (outlines stay), a micro-transaction rollup (spends under 1% collect silently until they equal one mark), ten references, and an action plan: freeze features at v15; build "Model B" (Home gauge plus a prominent "Scan & Pay via Wallet" button); run **Test A** (5-second gauge test), **Test B** (taps and time to start a purchase in Trickle vs GPay) and **Test C** (5 students, 7 days, manual wallet diary; Week-1 retention and awareness variance).

### 13.2 How it fits the record
| Document claim | Check against this record | Verdict |
|---|---|---|
| 66.7% use no budget | 4 of 6 interviewees (Part 2, interviews); the same fact as Part 0 | Matches |
| 94% of decisions about budgets | Part 1 measured about 6% of v14 and v15 decision IDs on the payment moment; same direction | Matches |
| "Reviewers want less; designer intuition restores functionality" | Parts 8.3 and 8.4 separate the two | Matches |
| Unit changed per screen | Part 11.3 problems 1 and 2; the unit changed six times since v8 | Matches |
| Questions rely on jargon (80%) | Part 12.2: 32 of 40 depend on unstated context | Matches |
| Grid must always empty | Part 11.3 problem 1 (direction flips) and 11.7 | Matches; applied to spending. Savings and goals still fill, because something is being built |
| 5 blocks of 20 | Kay et al. 2016 (about 20 countable marks); Part 11.3 problem 3 | Plausible; untested (Test A) |
| Rupees only as a subtitle | Part 11.3 problem 2 (a percent gauge dressed as rupees) | Fits; Tarun had earlier decided "rupees only in Insights" (V15-20) |
| Stop work on data routes | Part 10 Step 1 argued the opposite (run the feasibility spike first) | **Conflict, kept open**: the document assumes that Trickle can start a payment; this is H2 in Appendix T and has no evidence yet |
| "Immediate depletion feedback at the point of sale reduces overspending" (Soman 2001) | Part 3 treats Soman as support for the idea, not proof; the paper studies payment mechanism and rehearsal | Overstated; keep as [S-U] until the papers are read |
| Karlsson et al. 2009 | Cited in the O4 row, not in the reference list | Gap in the document |
| Outcome targets O1 to O4 | Part 1.3 (outcome ladder) and Appendix P decision rules (4 of 5) | Adopted as PROPOSED thresholds, and mapped to the tests below |

### 13.3 What was built (v15.3, decisions V15-21 to V15-30, all PROPOSED)
1. **Weekly amount first.** A third, skippable onboarding question and "Set your weekly amount" on Home; categories hold no limits in this mode (wallet mode, `S.wallet`).
2. **Tier 1 Home.** Hero "₹N left this week", gauge, chip, an action row only when something needs doing, one button. Removed from Home: date, the "On pace" sentence, the plan-health row.
3. **Fixed gauge.** 5 blocks of 20, spent marks as faint outlines, one direction, "1 mark = 1% ≈ ₹N".
4. **Rollup** of spends under 1%, shown on tap.
5. **Plain language** (V15-27) and "mark" in place of "box" everywhere.
6. **Model B switch** in the panel: "Scan & pay" button and a simulated scan step, for Test B only.
7. **Process:** the decision log now uses the five-column format and the PROPOSED/CONFIRMED status; a freeze on new features until the tests are done.
Measured: Home states 11 to 23 words (6 of 7 meet the 20-word Tier 1 limit), whole-app average 22.7 words, 17 of 55 states over 25. The fuzz test (60 random taps over 7 profiles and fresh accounts) and the tips test both pass.

### 13.4 Mapping the document's tests onto Appendix P
| Document | Existing protocol | What to add |
|---|---|---|
| Test A, 5-second gauge test | P.5 (five variants of Home) | Add the numeric rule O3 (80%) and the new gauge as the baseline "Grid"; the Bar, Days and Words variants stay in the panel for comparison |
| Test B, tap-and-time test vs GPay | P.4 question 18 and the feasibility spike | Record taps and seconds; Model B is a stand-in, so this tests willingness, not feasibility |
| Test C, 7-day wallet diary | P.8 diary | Add O1 (estimate this week's total within ±20% without looking) at day 3 and day 7 |
| O4 calmness | P.6 probes after an overspend | Code answers "judged" or "anxious" |

### 13.5 What this part adds to the diagnosis
The document repeats the three causes of Part 11 and 12 (picture, words, sequence) and adds a fourth, which this record had only touched on: **the product's centre was the wrong object.** Four in six students have no budget, and v14 and v15 still made category budgets the first thing a new user does. The weekly amount is a smaller ask. It is also a hypothesis: H5 in Appendix T ("students want a plan at all") is what Test C is meant to settle. The document is not evidence of its own claims; it is a proposal, and its numbers are targets. The one claim to be careful with is that the problem can be solved without the data route (H2 and H3).

