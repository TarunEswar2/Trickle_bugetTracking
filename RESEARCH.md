# Trickle: research and decision record, v1 to v15

Compiled 6 Oct 2026. This file is generated: the analysis (Parts 0 to 12, about 1,000 lines) is written in `archive/session-workfiles/research-doc/main_new.md` and `parts/`; the appendices (about 4,400 lines) are measurements taken from the builds and verbatim copies of the project docs, so the whole record is in one place. Rebuild with `python3 compose.py` in that folder. This is the single document that holds what is known about the project: the research, every version, every decision, the data the app needs, and a diagnosis of why fifteen versions have not converged on the outcome the research asked for.

**Sources read for this record:** `docs/research/brymans_analysis_interviews.md` (the only primary data in the repo), `docs/claude/project_master_synthesis.md` (70 earlier docs digested), `secondary_research_report.md`, the decision logs for v12, v13 and v14/v15, `HANDOVER.md`, `weekly_budget_validation.md`, `v14_stage2_representation.md`, `v12_phase1_recovery.md`, git history (126 commits, 1 to 6 Oct), build sizes of every version, the density audit of v14 and v15 (`archive/session-workfiles/audit/`), and a new round of web research on 6 Oct (Part 3.3).

**Evidence tags used throughout**
- **[P]** primary research (the six interviews). **[S-V]** secondary source verified in the project docs. **[S-U]** secondary source unverified or blog-grade. **[T]** Tarun's explicit statement or decision. **[C]** Claude's inference, proposal or delegated decision. **[M]** measured from the repo or the builds. **[N]** new on 6 Oct, found by search and not read in full.
- "Tested" always means *with real students*. Scripted checks, scores and simulated tests are listed as what they are.

---

## Contents
**Main body**
0. The short version
1. The outcome the project is meant to reach, and why it has never been measurable
2. Primary research
3. Secondary research, including the 6 Oct round
4. Version history v1 to v15 (with scope, size and the pendulum)
5. Decision register and visualisation register
6. Data requirements: what the app needs to know
7. Traceability: research to features, and features with no evidence
8. Why the work is not converging on the outcome
9. Contradictions, regressions and integrity problems in the record
10. What to do next: research plan, decision rules, gates
11. Are the visualisations wrong?
12. What will a new user do, and can they understand what they are asked?
13. The Architecture & Strategy Document (6 Oct): what it says, what was applied, what stays open

**Appendices (reference material; most are generated from the repo or copied verbatim, with their source named)**
A. Boards and artifacts · B. File map · C. Quote bank · D. Source list · E. Density audit
F. Feedback ledger (Tarun's requests and reviews, v14 to v15)
G. Screen inventory with density measurements (v15 and v14)
H. Copy inventory: every visible string in v15, titles and questions in v14, jargon counts
I. Build notes for v2 to v13 (verbatim)
J. The interview coding in full (verbatim)
K. The v12 recovery audit: 152 features inventoried (verbatim)
L. Money representation: stage 2 scoring, Viz 1 reasoning, v12 visualisation research (verbatim)
M. Secondary research report (verbatim)
N. Decision logs v12, v13 and v14/v15 in full (verbatim)
O. Project master synthesis (verbatim)
P. Research protocols and materials for the next round
Q. The money engine as built: state, rules, formulas
R. Inventory of screens, sheets, flows, pop-ups, tips, profiles (generated from the build)
S. Git timeline (every commit)
T. Glossary, hypotheses ledger, open questions

---

## 0. The short version

**The outcome the research asks for.** Students pay by UPI so easily that the cost of a payment only registers later, when they look at a balance and are surprised. The job of the app is to close the gap between *making a payment* and *feeling what it did*, without guilt, restriction or a tracking chore. [P, S-V]

**Where the work is.** Between 10 Sep and 6 Oct the project produced 14 clickable builds, about **340 logged decisions** since 1 Oct (v12: 71, v13: 18, v14 and v15: 251), about 80 docs and 128,000 words. **Every build has been shown to people, informally, and those showings are the project's best evidence**: they are how the real flaws were found. Reviewers, mostly design students, say the same thing every time: "too much information, what do I look at, I can't understand". ("Lost functionality" is Tarun's own intuition, a separate signal.). What does not exist is a **structured, recorded test**: set tasks, noted outcomes, who the people were, saved in the repo. So the only recorded "passes" are scripts, scores and judgements written by the side that made the thing, and the showings cannot be compared from one build to the next.

**Why it is not leading to the outcome, in eight lines** (evidence in Part 8)
1. **The outcome was never turned into something measurable, and the feedback that does exist was never captured.** Showings happened for every build and drove every swing, but who saw it, what they did and what they said is not recorded. With no target for "awareness" or "effort" and no comparable record, no version could be shown to be better than the last, only reacted to.
2. **The product drifted from awareness to budgeting.** Four of six participants have *no budget* [P]; the app is built around a plan, income splits, categories with limits, weekly resets and a week review. About 6% of the v14/v15 decisions concern the payment moment, which is the research's centre.
3. **The reviewers say one thing and the design intuition says the opposite.** Reviewers (mostly design students) have said the same thing for the whole project: *too much information, what do I look at, I can't understand*. "Lost functionality" is **Tarun's own intuition**, not a reviewer's complaint. The builds listened to reviewers by cutting now and then (v8, v11, v15) and to intuition by adding almost all the time: of roughly 45 change requests in v14 and v15, about five removed anything. Nothing ranks what *must* be on the first screen, so each cut gets undone.
4. **The size of the build is a sawtooth**: 270 KB (v7) → 98 → 145 → 160 → 84 → 179 → 190 → 228 → 271 KB (v15). Each cut, made because reviewers could not follow it, was followed by a restore driven by the designer's intuition that functionality was lost. That is the pendulum, and v15 has just started the next swing (the "I'm losing functionality" note on v15 was Tarun's own, and much of it was restored within the day).
5. **The evidence is thin and second-hand**: six interviews, one of them the researcher, coded by one person; the transcripts and the survey are not in the repo. The payment-friction idea, which is the product's signature, rests mainly on one uncoded remark by one participant.
6. **The decision process outran any possibility of testing**: about 60 logged decisions a day, most accepted from Claude's recommendation, many made by Claude under delegation. Decisions were never tagged with the evidence behind them or the test that would confirm them.
7. **The unit of money has changed six times since v8** and v14's 10×10 grid brought back the very problem that sank v9: a different ₹ per box on every screen. The project's own scoring ranked a 10×10 waffle last of 15 systems (2.8 of 5), and it was chosen anyway from a reference image.
8. **Two assumptions that the whole app depends on were never checked**: that a student's UPI spends can be read without SMS, and that Trickle can sit in front of a payment that happens inside GPay or PhonePe.

**What the reviewers' comments point to (6 Oct).** Tarun: the comments are mostly *not constructive*; they say the questions are hard to understand, ask what a new user is supposed to do, and say the grid is hard to understand, so *maybe the visualisations are wrong*. Parts 11 and 12 test that. Short answer: the grid is probably wrong **in breadth** (its meaning flips between screens, its unit differs on every grid, it ranked last in the project's own scoring), the **words** are wrong in a way the project's rules did not catch (every question is short; 32 of 40 depend on something the screen does not say), and the **first run** delivers nothing to read until after three screens of setup. A test that separates the three is already built (the side-panel "Home picture" switch) and scripted (Appendix P).

**What to do.** Stop adding. Define the outcome as numbers. Freeze v15 as the test build. Run the five-student round in Part 10 (a 5-second grid test, six task tests, and a one-week manual-tracking diary) before any new decision is logged. Keep a decision only if it has a quote or a test behind it.

---

## 1. The outcome the project is meant to reach

### 1.1 What the project says it wants
- **Thesis [P, T].** "The key challenge is the gap in making a payment and perceiving its accumulative impact… Students need a way to understand their spending more easily and maintain control without feeling restricted." Pattern: *spending is easy → tracking is difficult → awareness comes late.*
- **Not** "spend less". The app must "close the gap between the moment of payment and the moment of realisation". Every feature should trace to something a participant said (`build_plan.md`).
- **Tarun's six values (30 Sep) [T]:** budgeting is tedious, make it easy; savings motivates, not guilt; friction at payment so it feels like handing over cash; small-purchase accumulation and understanding habits; income → budget/savings readable at a glance; visual, not numeric. Retention is the top goal.
- **Seven principles (2 Oct) [T]:** awareness not restriction; show money at the moment it matters; gentle on open; zero-effort tracking; mental limits over rigid budgets; savings is what unspent money becomes; patterns over raw history.

### 1.2 Why this is not yet an outcome
An outcome is something that can be seen to happen or not. The statements above are a direction. Nowhere in 79 docs is there:
- a definition of *awareness* that could be measured (for example "can state this week's spend within 20% without opening a bank app");
- a target for tracking effort (seconds per spend, or percent of spends that need no input);
- a retention target or a benchmark for day 7 / day 30;
- a comparison of any two builds on the same task;
- a statement of what result would make the team stop and change course.

The original plan did contain this (`build_plan.md`: low-fi Phase 1 with 4 screens, 4 to 6 people including the interviewees, three validation questions, a gate before building). **It was never run as a structured test.** Informal showings of every build did happen (Tarun), and they are the source of the reviews quoted in Part 4 and 8.4. What is missing is the record: tasks, outcomes, participants, notes (Part 8.1).

### 1.3 A proposed outcome ladder (a proposal [C], to be accepted or changed by Tarun)
| # | Outcome | How it could be measured with five to eight students | Proposed pass mark (not evidence-based; a starting line) |
|---|---|---|---|
| O1 | **Awareness**: the student knows what a payment did to their week | After using the build for a week, ask for this week's total and top category without looking; compare with the ledger | within 20% for at least 4 of 5 (Tarun's own gap was 2.5× to 3×: expected ₹100 to 150 a day, actual ₹350 to 400 [P]) |
| O2 | **Effort**: tracking costs almost nothing | Time and taps to log one spend by hand; share of spends that arrive without input (UPI) | manual add ≤ 10 s and ≤ 4 taps; or ≥ 80% of spends auto-detected |
| O3 | **Comprehension**: the picture is read correctly with no explanation | 5-second test of the Home grid: "what does this tell you?" and "about how much is left?" | ≥ 4 of 5 right, unprompted |
| O4 | **Calm**: no guilt or panic | After first open and after an over-budget moment: "how did that feel?" coded for judged / anxious / neutral | no "judged" or "panicked" coding |
| O5 | **Return**: they come back | Opens on days 2, 7, 14, 28 in the diary week and a follow-up | ≥ 3 of 5 still opening on day 14 (benchmark unverified) |
| O6 | **Setup**: starting is easy | Time from install to first tracked spend; share who skip each step | ≤ 60 s to first spend; no step skipped by more than half |

Without something like this every future decision can only be judged by taste. That is the situation now.

---

## 2. Primary research

### 2.1 What exists
- `docs/research/brymans_analysis_interviews.md`: **71 coded statements** from **six** participants (Tarun 11, Nishad 12, Yash 15, Gautham 11, Harsh 11, Vaishak 11), grouped into six themes by Bryman's four-step coding. This is the only primary data in the repo.
- **Not in the repo:** the interview transcripts, the interview guide, the survey (size and questions unrecorded), the participant profiles (age, institution, income source, UPI app use), and any note on how participants were recruited. [M]
- The first participant is **the researcher and designer himself**. All coding was done by one person. Several statements are crossed out in the source ("lack of income", "Financial Awareness", "offers affect decision purchasing"), so the coding was revised by hand.
- Vaishak's transcript was coded only partly (11 statements); remarks on payment friction, privacy and monthly allocation were added later by hand and are **not in the coded file**. [P, per synthesis]

### 2.2 The six themes
| Theme | Participants (coded) | What it says |
|---|---|---|
| 1 Varied approaches to spending and money management | Tarun, Nishad, Yash, Gautham, Vaishak | No planning; mental limits; purpose accounts; money set aside |
| 2 Spending is influenced by the situation | Tarun, Nishad, Yash, Gautham, Vaishak | Social outings and travel, quick-commerce add-ons, free-delivery thresholds, impulse, big episodes |
| 3 Small everyday purchases become significant through accumulation | Tarun, Nishad, Yash, Harsh, Vaishak | Coffee, cigarettes and confectionery, quick-commerce extras, food |
| 4 Spending awareness comes after the money is spent | Tarun, Yash, Nishad, Harsh, Vaishak | "I check my balance and go: what happened?" |
| 5 Tracking takes too much effort; students want control without losing discretionary spending | Tarun, Nishad, Yash, Gautham, Vaishak | Tedious, time-consuming, subscriptions hard to track, want it automatic |
| 6 Developing awareness and control | Tarun, Nishad, Yash, Harsh, Vaishak | Wants awareness; estimates balance mentally; weekly or daily balance checks; goals; category budgets; compensating after a big spend |

### 2.3 Participant by participant
| Participant | Budget? | Checks balance | What stands out | Statement numbers |
|---|---|---|---|---|
| **Tarun** | None | "check my balance and go: what happened?" | Coffee five times for ₹100; expects ₹100 to 150 a day, actual ₹350 to 400; tracking by UPI app "way too tedious"; asks parents for money | 1 to 11 |
| **Nishad** | Sets money aside for casual use; three purpose accounts | Once a week; estimates mentally | Subscriptions hard to track; cigarettes and confectionery untracked; spends more when travelling or with friends; offers push buying; earning "justifies" spending | 1 to 12 |
| **Yash** | None; "maybe up to a thousand", a mental limit | Not stated | Quick commerce, free-delivery threshold, "I started adding, adding, adding"; "no physical cash constraint"; **a goal would motivate saving** | 1 to 15 |
| **Gautham** | None; "it's all in my mind" | **Every day**; "sometimes it does stop me from spending" | Food and drinks, YouTube or music subscription; the balance check itself is a brake | 1 to 11 |
| **Harsh** | Thinks category-level budgets are possible ("you can have a fixed budget for everything individually"), not clearly practised | Not stated | Problem is "knowing where I want to spend", not overspending; ₹3 to 4k dinners, then compensates by spending nothing | 1 to 11 |
| **Vaishak** | None | Not stated | "Too tedious"; **"I want it to be automatic… take it from my GPay"**; UPI "has made it easier to spend"; used to keep a buffer, now ₹0 | 1 to 11 |

### 2.4 What the data actually supports (strength)
| # | Finding | Support | Strength |
|---|---|---|---|
| P1 | Manual tracking is tedious and gets dropped | Tarun 9, Yash 15, Vaishak 5 to 7, theme 5 (5 of 6 coded) | **Strong** |
| P2 | Awareness comes after the spend | Tarun 7, Nishad 6, Harsh 8, Vaishak 9, Yash 13, theme 4 | **Strong** |
| P3 | Small everyday purchases add up unnoticed | Tarun 4, Nishad 5, Harsh 7, Vaishak 3, Yash 10 | **Strong, most distinctive** |
| P4 | **Most have no formal budget**; mental limits instead | Tarun 1, Yash 7 to 9, Gautham 1 and 5, Vaishak 1 (**4 of 6**) | **Strong, and not designed for** (see 8.2) |
| P5 | Where the money went matters (categories) | Harsh 5 and 6, Nishad 3, survey (not in repo) | Moderate |
| P6 | Situation drives spending (social, travel, offers, speed) | Nishad 10 and 11, Yash 3 to 12, Gautham 11 | Moderate to strong |
| P7 | Seeing the balance can act as a brake | **Gautham 10** only | Weak (one statement) |
| P8 | Goals could motivate saving | **Yash 14** only | Weak |
| P9 | Subscriptions are hard to track | Nishad 4, Gautham 7 | Weak to moderate (the ₹3,000 Coursera story is in the synthesis, not the coded file) |
| P10 | Friction or a reminder *before paying* | **Not in the coded file.** Vaishak remarks are in `updated_feature_priority_list.md` (uncoded, added by hand) | **Single source, uncoded** |
| P11 | Guilt framing rejected | Vaishak, Yash (per synthesis; not in the coded file) | Weak to moderate |
| P12 | Privacy: prefers local-only | Vaishak (per synthesis; not in the coded file) | Weak |
| P13 | Weekly or daily balance checking | Gautham 8 (daily), Nishad 8 (weekly) | **Two people; says nothing about *planning* weekly** |

### 2.5 Limits that matter for design decisions
1. **n = 6, researcher included**, no stated sampling frame; likely all design students from one network. Fine for forming hypotheses, not for choosing a budget period, a unit or a tab structure.
2. **The interviews asked about habits, not about the interface.** There is no evidence on whether people want weekly planning, category limits, goals, income splitting or any of the tabs.
3. **Nobody was asked how they plan** across a month, how they get income (allowance, parents, part-time), or what they do at the moment of paying.
4. **The two most-used design ideas have the thinnest support:** friction before paying (P10) and savings goals as the motivator (P8, one person each).
5. **The survey** is cited in later docs and is not in the repo.
6. **The reviewers of the builds were mostly design students** (Tarun, 6 Oct). The interview participants probably came from the same network (the sampling frame is not recorded). Part 8.4 explains how to weigh this.

---

## 3. Secondary research

### 3.1 Verified or cited in the project (condensed from `project_master_synthesis.md` §2)
| Area | Source | Finding | Status | What it justifies |
|---|---|---|---|---|
| Pain of paying | Prelec & Loewenstein 1998; Soman 2001, 2003; Raghubir & Srivastava 2008 | Cashless payment dulls the pain of paying and raises spending modestly | [S-V] | "awareness comes late" |
| UPI in India | CHI EA '24 (abstract); Dev et al. 2024 (arXiv, 74.2% self-report spending more) | UPI raises spending; weak to moderate | [S-V] abstract / preprint | context only |
| Apps track, not budget | BCS HCI 2023 | Commercial apps support tracking far better than budgeting decisions | [S-V] | differentiate on decisions |
| Ostrich effect | Karlsson 2009; Sicherman 2016; Olafsson & Pagel 2018 | People avoid bad news; logins drop with negative balances | [S-V] | no bad number on open |
| Mental accounting | Thaler 1985/99; Heath & Soll 1996; Antonides 2011 | Budgets by category constrain spending | [S-V] | categories |
| Defaults and goals | Madrian & Shea 2001; Thaler & Benartzi 2004; Kivetz 2006; Nunes & Drèze 2006; Ashraf 2006 | Defaults and progress that starts above zero raise saving | [S-V] | auto-split, goal progress |
| Unit visuals | Haroz 2015; Park 2018; Neurath/Kinross; Cleveland & McGill 1984; Kay 2016 (~20 countable dots work; 100+ do not); Garcia-Retamero 2010; Gigerenzer & Hoffrage 1995 | Fixed unit, repeated not enlarged; aligned length beats area; natural frequencies beat percentages | [S-V] | the grid idea, **with a caveat on 100 marks** |
| Notification load | Pielot 2014; Wohllebe 2021 | More pushes, more stress and uninstalls | [S-V] | ≤1/day |
| Cognitive load | Sweller 1988; Miller 1956; NN/g | Progressive disclosure | accepted | one idea per screen |
| Colour and streaks | Elliot 2007; Mehta & Zhu 2009; Polivy & Herman | Red → avoidance; broken streaks → abandonment | moderate, replication mixed / indirect | no-red, no-streak rules are low-cost, not proven |
| Unverified | "~67% quit budgeting apps in 30 days", "68% never finish signup", "latte factor" | blog statistics, no academic construct | [S-U] | **do not cite** |

Competitive facts: India already has automatic tracking (Jupiter, Money View, INDmoney, Walnut) so automation alone is not a differentiator; the small-purchase rollup is an empty space in shipped products; Mint's shutdown showed users value auto-categorisation and easy correction; PocketGuard's "In My Pocket" is the best non-punitive reference. [S-V]

### 3.2 What the secondary research does **not** say
- It does not say **100 marks** read well. Kay 2016 found about 20 countable marks work for lay users. A 10×10 gauge is read as a proportion (like a progress bar) rather than counted, which may be fine, but it is not what the cited studies tested. v14's own scoring put a 10×10 waffle last (S9, 2.8 of 5) and it still became the gauge (Part 9).
- It does not say a **weekly budget** works. See 3.3.
- It does not establish that apps change *behaviour*. See 3.3.

### 3.3 New research round, 6 Oct 2026 [N]
Searches were run for six open questions. Results are **search-result summaries, not full readings**. Two PDF fetches were blocked by the network proxy, so nothing below is verified at the source. Anything marked "read before citing" needs a proper read.

| Question | What was found | Reliability | What it means for Trickle |
|---|---|---|---|
| **Can a third-party app read UPI spends without SMS?** | The RBI Account Aggregator framework gives consent-based, revocable, **read-only** access to financial data; it cannot move money. UPI spends then arrive as bank-account transactions (narration), not as app-level data. Sahamati lists AA apps; India's expense apps use it. | Blog and industry pages; the framework itself is real | "Link UPI" in the mockup is really "link a **bank account** through an Account Aggregator". It needs a regulated partner (a registered financial-information user, or an aggregator's SDK). **Not examined in the project.** This is the single biggest feasibility question for P1. |
| **Can an app sit in front of a UPI payment?** | NPCI rules require UPI apps to answer *intent* calls from other apps; third-party app providers are capped at 30% volume. Nothing found about a sanctioned pre-payment hook. | Legal summaries; not about interception | A pre-payment screen is plausible only if **Trickle starts the payment** (scan the QR in Trickle, show the friction, hand off by UPI intent). A student who already pays inside GPay would have to change habit. **Never validated.** |
| **Do weekly allowances beat monthly ones?** | Several blogs cite "a University of Chicago study" that weekly allowances led to less spending. **No primary paper found.** Related and real: Heath & Soll 1996 (mental budgeting), and a PNAS 2022 paper on framing amounts in commonly used budgeting periods (title only; read before citing). | **Unverified claim; do not cite** | The weekly engine is a **design hypothesis**, not a finding (as `weekly_budget_validation.md` already says). The PNAS paper suggests the *display* period matters and may favour monthly framing. |
| **Do budgeting or tracking apps change student behaviour?** | A mobile-app budget-recording tool tested with students over 27 weeks (financial diaries study, JEBO 2023). A 4-week RCT with 177 university students: financial **satisfaction and perception improved, behaviours and objective wellness did not**. A UK RCT: apps improved knowledge, skills and attitudes. Another snippet reports app compliance falling from 79% to 64% with 62 of 203 dropping out (study not confirmed). | Snippet level; ERIC and GFLEC PDFs blocked | Plan on **awareness and perceived control** as the realistic outcome, not "spent less". This supports defining outcome O1 as awareness (1.3) and not as savings. |
| **How many students to test?** | NN/g: about five users find roughly 85% of the problems in one qualitative round; run several small rounds; individual five-user samples ranged from 55% to 99%. Quantitative claims need many more. | Well known, NN/g | Five students, three rounds, fix between rounds. This matches Part 10. |
| **Does progressive disclosure help?** | A 2026 ACM paper (Anik & Bunt) found it improved perceived learning, but about explanations of AI training data. Vendor blogs claim 53% vs 75% onboarding completion for contextual vs linear onboarding. | Academic piece is off-domain; vendor numbers are marketing | Supports the principle, **not the size of the effect**. |

**Open feasibility questions this round opened (not answered):** (1) Which Account Aggregator route can a student project use, and what does the data actually contain per transaction (merchant name, time, UPI ID)? (2) Is a Trickle-initiated payment (QR in Trickle, intent hand-off) acceptable to users who currently open GPay or PhonePe? (3) Is a notification-listener or statement-import route acceptable as the "auto" path while AA is unavailable?

---

## 4. Version history, v1 to v15

### 4.1 Timeline and scope
Sizes are the final built HTML of each prototype [M]. "Screens" are as reported in the build notes or counted in the repo.

| Ver | Dates | What it was | Size | Scope marker | How it ended | Evidence it rested on |
|---|---|---|---|---|---|---|
| **v1** (lo-fi) | to 21 Sep | Tarun's Figma "Lofi Budget App" and a "Trickle Onboarding" artifact; SMS rationale screens; budget tab, donut, one savings meter | n/a | Feature gap analysis found the accumulation view, transaction list and remaining/spent toggle missing | **SMS dropped** (hard rule, held since) | Interviews; feature priority list |
| **v2** | 22 Sep | Rebuilt from Figma; no SMS; 31 frames; friction screen as a sheet in the pay flow; shared 35-day seed | n/a | 5 tabs: Savings / Categories / Home / Insight / Settings | "Reads like a form" | Priority list |
| **v3** | 23 Sep | Dark stat-card system from a crypto-dashboard reference; 5 reusable components | 128 KB | 8 insights | Tarun: "push everything to be visual" | Reference image |
| **v4** | 23 Sep | More charts; 68-day seed | 142 KB | MoM, area, goal projection, rings | Tarun: even more visual | Tarun's request |
| **v5** | 23 Sep | "Visualization library": 17 chart forms, 16 insight cards | 159 KB | radar, bubble, scatter, Sankey-lite | "Chart library, not product" | Chart catalogues |
| **v6** | 23 Sep | Every frame visual (about 45 charts); onboarding allocation pie and 7 sliders; tooltips everywhere | 159 KB | **54 numbers in onboarding**; red status | Misleading radial arcs; overload | Tarun's radial-arc and pie+jar references |
| **v7** | 23 to 24 Sep | New money model (To assign → Budget + Savings pools), income, transfers, sweeps, overspend cover, splits, Actions inbox; 44 widgets; 57 frames | **270 KB (peak)** | **Home: 75 numbers; over 900 numbers app-wide**; red "Carried −₹240" | "Too much information… panic on open" | Tarun's detailed v7 decisions |
| **v8** | 30 Sep | **The calm reframe.** 4 tabs, no budget number on Home, glow + word, one choice per step, two jars, no red, no streaks. Tarun set the six values and picked Tiles | 98 KB (−64%) | 4 tabs | Tiles meant ₹100, ₹500, 1% and "1 spend" in different places | Six values; reviews on v7 |
| **v9** | 30 Sep | Adaptive tile ladder ₹10 to ₹2,500 with a key on every card; 20 widgets; Sankey back; repeat-buys suite; sound | 145 KB | "Small purchases" redefined as **repeat purchases** | The unit changes per card, so the key must be read every time | v8 critique |
| **v10** | 30 Sep | Six-shape denomination ladder; logo B; splash | 160 KB | six shapes | **Rejected: "shapes are not working"** | Design taste |
| **v11** | 30 Sep to 1 Oct | Full 12-phase process; fixed ₹100 tile; rows of 10 split 5 and 5; confirmed money model; 4-tap starter month | **84 KB (−48%)** | 25 frames; Home 0 numbers; 44/44 scripted checks | Clear, but "lost a lot of functionality and insights" (Tarun's own view, not a reviewer's) | Literature; a **simulated** comprehension test |
| **v12** | 1 Oct | Recovery audit: **152 items inventoried, 33 brought back**; 5 tabs; Tarun's dot ladder (crumb/dot/pill/block); Day lanes; 31 insights; 20 flows | 179 KB | **75 frames; about 60 decisions in one day**; 37/37 scripted checks | Visual identity next | Literature (39 sources, 33 verified) |
| **v13** | 1 to 2 Oct | Identity pass. Tarun: "make your own decisions". Mesh gradients, "Zentra" onboarding template, dot-ladder logo | 190 KB | 41/41 scripted checks; **every decision Claude's** | Tarun: project "has swayed far from the intended" → reset | Reference images |
| **v14a** | 2 Oct | **The reset: facts first, one visualisation at a time.** Stage 0 facts and 7 principles; 11 visualisation boards (V1 to V11); 28 onboarding decisions | boards | 5 tabs; 10×10 grid | Tarun decided each viz; then delegated the rest | Interviews; Tarun's references |
| **v14b** | 2 to 5 Oct | Blueprint (69 screens, 23 flows), design system "Trickle Night", clickable mockup with live ledger, 6 profiles, simulator, then B-1 to B-52 (bare-minimum mode, plan vs income, date ranges, subscriptions, pace colours, week review, UPI split, six-month account, categories) | **228 KB; 116 screens** | 36 delegated rules (D-1 to D-36), 52 B-decisions | Reviews: "very hard to follow, too much info on every screen" | User comments on each build |
| **v15** | 5 to 6 Oct | Audit; density budget; 4 tabs; onboarding of 2 questions; Pay in 3 screens; Insights as its own tab; one-off payments; grid teaching; first-time tips; rupees-only Insights | **271 KB** (includes unreachable parked code) | 55 core states; avg 22 words, 8 taps (v14: 56 and 12) | Tarun's own note: "I'm losing functionality" → much of it restored the same day | Density audit; Tarun's comments |

### 4.2 The pendulum, as numbers
```
v3  128 ████████████████
v4  142 ██████████████████
v5  159 ████████████████████
v6  159 ████████████████████
v7  270 ██████████████████████████████████  ← reviewers: "too much information, panic on open"
v8   98 ████████████                         ← cut (answering reviewers)
v9  145 ██████████████████                   ← restore breadth (designer's intuition)
v10 160 ████████████████████
v11  84 ██████████                           ← cut hard (answering reviewers)
v12 179 ██████████████████████               ← Tarun: "lost functionality": restore (33 items back)
v13 190 ████████████████████████
v14 228 █████████████████████████████        ← mockup, 116 screens
v15 271 ██████████████████████████████████   ← size again equals v7 (parked code included)
```
Three cuts (v8, v11, v15) were each followed within a build or a day by a restore (v9, v12, v15.1). The cuts answered **reviewers** ("too much, what do I look at, I can't understand"); the restores answered the **designer's intuition** ("lost functionality"). These are not two audiences disagreeing: it is one consistent outside signal against one inside instinct, and the project has never decided **what must be on the first screen and what may live one tap away**, so the instinct wins each round. Part 10.3 proposes a three-tier answer.

### 4.3 Four long-running threads
**Tabs**
| Ver | Tabs |
|---|---|
| v2 | Savings, Categories, Home, Insight, Settings |
| v7 | Home, Money, Actions, Savings, Insights (+ drawer) |
| v8 | Home, Money, Actions, Insights (4) |
| v11 | Home, Money, [+ Pay], Insights (profile in a header button) |
| v12, v14 | **Home, Income, Spending, Savings, Insights (5)** |
| v15 | Home, Spending, Money (3), then **Home, Spending, Money, Insights (4)** |

**The unit of money (the representation)**
| Ver | Unit | Why it ended |
|---|---|---|
| v2 to v7 | Numbers and many chart forms | Overload |
| v8 | Tiles (₹100, ₹500, 1%, "1 spend" in different places) | Inconsistent |
| v9 | Adaptive ladder ₹10 to ₹2,500 | Key must be read every time |
| v10 | Six shapes | "Not working" |
| v11 | Fixed ₹100 square | Large amounts impossible; lost insights |
| v12 to v13 | Dot ₹100 + pill ₹1,000 + block ₹10,000, cup fill below ₹100 | Tarun: "1 dot is easy, the problem is combining" |
| v14 | **10×10 boxes where 100 boxes = this budget** (box = budget ÷ 100) | Every grid has a different ₹ per box (the v9 problem again) |
| v15 | Same, plus a tappable "1 box ≈ ₹N" chip, a sheet, and "N boxes go" at payment | Not tested |

**Onboarding length**
v6: 54 numbers; v11 and v12: 4 taps (scripted 0.5 s, human assumed 15 to 25 s); v14: up to **12 screens** (PIN, link, balance, permissions, categories, plan, subscriptions, split, goals); v14 with bare-minimum mode: 4 to 8, all skippable; v15: **2 questions**, everything else asked when needed.

**Home**
v7: 75 numbers; v8 to v13: no number, glow plus word; v14: sentence + one grid, no ₹ (V11-3); v14b: "left this week" and "box" chip on request (B-48); v15: one sentence, the grid, "₹N left" and a chip, Pay, at most one next-thing row.

### 4.4 Build and validate loop
| What was checked | By whom | How |
|---|---|---|
| v11: 44 of 44 checks; comprehension test | Claude | Scripts and a **simulated** test |
| v12: 37 of 37 checks; 24 of 26 flows | Claude | Scripts |
| v13: 41 of 41 checks | Claude | Scripts |
| v14b: 60-step random-tap run per profile (no NaN, no negatives) | Claude | Script |
| v15: density of 55 core states; same fuzz | Claude | Script |
| **Informal showings of every build to people** | Tarun | Conversation; the comments were relayed, not recorded (who, how many, which task) |
| **A structured, recorded task test** (set tasks, noted outcomes, saved notes) | nobody | **none on record** |

---

## 5. Decision register

All decisions are in the logs. This part groups them by domain so a decision can be found by topic, with its status in v15. IDs and prefixes: **V** = visualisation, **F** = pay and move-money flows, **O** = onboarding, **D** = delegated rules, **DS** = design system, **M** = mockup, **B** = bare-minimum and refinement decisions, **V15** = v15. Tags: [T] Tarun decided, [C] Claude decided (delegated or proposed), **S** stands, **R** reversed, **Sup** superseded, **P** parked.

### 5.1 Counts [M]
v12: 71 rows. v13: 18. **v14 and v15 log: 251 IDs** (B 52, D 36, O 28, V4 21, V15 20, V1 15, V3 11, V5 10, DS 10, F 7, M 6, DS2 6, V2 5, V6 5, V8 4, V9 3, V10 3, V11 3, M2 3, V7 2, X 1). About **340 decisions in six days**, none put through a structured test. Per prefix tags (Tarun or Claude) are inconsistent in the log: 28 rows are marked "(Tarun)", 23 "(delegated)", 3 "(Tarun asked, Claude designed)". The rest have no marker in the row, which is part of the problem (Part 9).

### 5.2 Who decided what
| Phase | Decider | Notes |
|---|---|---|
| v2 to v7 | Tarun gave direction and references; Claude built | Several detailed Tarun decisions in v7 (tabs, cover order, owed money); most reversed in v8 |
| v8 | Tarun set six values; picked Tiles over the recommended Jars | |
| v11, v12 | Claude proposed, Tarun accepted nearly all (~60 in one day) | The recommended option was chosen almost every time |
| v13 | **All Claude** (Tarun: "make your own decisions") | |
| v14a | Tarun decided each visualisation after seeing Claude's options | The only phase run as intended in `CLAUDE.md` |
| v14b | Tarun requested; Claude designed and logged (D-1 to D-36, M, DS, B-29 onward, all delegated) | Open to override, in practice rarely overridden |
| v15 | Claude (audit), with Tarun's reviews triggering each change | Delegated and open to override |

### 5.3 Domain register
Status is as of v15 (6 Oct).

#### Principles and values
| Decision | Source | Status |
|---|---|---|
| No SMS anywhere; tracking is UPI link or manual (plus CSV import placeholder) | [T] v2 | **S** (every build) |
| Six values (easy, savings motivates, friction at pay, small-purchase accumulation, income split readable, visual not numeric; retention top) | [T] 30 Sep | **S**, but "visual not numeric" is strained (Part 9) |
| One decision at a time; calm; no games, streaks, badges | [T] | **S** |
| Seven principles (awareness not restriction, money at the moment it matters, gentle on open, zero-effort tracking, mental limits over rigid budgets, savings is what unspent becomes, patterns over history) | [T] 2 Oct | **S** in text; P3 and P5 weakened in practice |
| The user can always say no; every question short and plain (B-9, B-10) | [T] | **S** |
| Bare minimum: category tracking only; balance and budget optional (B-1 to B-8) | [C] from user feedback | **S**; B-16 (never ask the balance) [T]; **B-39 reintroduced balance** after UPI link, optional |

#### Money model and plan
| Decision | Source | Status |
|---|---|---|
| Income → Savings + Budget; Budget = Subscriptions + Categories (v11) | [T] 1 Oct | **S** |
| Weekly engine, Monday to Sunday; monthly = weekly × 4.3 (D-1, D-2, D-5) | [C] | **S**; **unvalidated** (`weekly_budget_validation.md`) |
| Pots invariant: every rupee in exactly one pot (D-3) | [C] | **S** |
| Plan and income are different things; making a plan = adding income with an end date (B-17 to B-24, V15-7) | [T] / [C] | **S** |
| Several incomes, each with a date range; plan is the sum of running incomes; snaps to Sunday (B-22 to B-24, B-34) | [T] | **S**; the engine rule stays, the explaining notes were removed in v15 |
| Overspend cascade: buffer, then other categories equally, then savings (O-23, D-22) | [T] / [C] | **S**; never shown on first screen |
| Week end: leftover moves to savings by itself (B-32) | [C] | **S**; needs a test |
| Fixed reserve and subscriptions taken off the top (D-7, B-25 to B-27, B-33) | [C] / [T] | **S** |
| Goals: name, target, optional date, ETA, states Active/Reached/Done (D-20, D-21) | [C] | **S** |
| One-off money outside the plan (B-28); one-off payment outside the week (V15-15) | [T] / [T asked] | **S** |

#### Tabs and information architecture
| Decision | Source | Status |
|---|---|---|
| 5 tabs Home, Income, Spending, Savings, Insights | [T] 1 and 2 Oct | **Sup** by v15's four |
| v15: Home (am I okay), Spending (where did it go), Money (what comes in and what is saved), Insights (when, repeats, vs last week) (V15-2, V15-13) | [C], Tarun asked for Insights back | Open to override |
| Density budget: 25 words, one hero, ≤ 3 ₹ values, ≤ 4 taps, never taller than a phone (V15-1) | [C] | New; measured |
| Home: one sentence + one grid; this week; no ₹ (V1-5, V11-3) | [T] | **Partly R** by B-48 (₹ left shown) |
| First-time tips (V15-19) | [T asked] | New |

#### Representation (the visualisation queue)
See 5.4.

#### Pay and flows
| Decision | Source | Status |
|---|---|---|
| Friction without a timed pause: pick category, see the payment leave it (v8; V2-1 to V2-5) | [T] | **S**; the core idea |
| Paying toward a goal = spending the goal's money, chosen like a category (F-1) | [T] | **S** |
| "How much" and "What for" merged, tabs Budget/Savings (F-2) | [T] | **Sup** by V15-8 (three screens) |
| Pay screen handles all overspend cases (F-3); success/failure screen (F-4); "where it comes from" visual (F-6, F-7) | [T] | **S** |
| Move money out of savings (F-5) | [T] | **P** (reachable from a goal) |
| Pay = hand-off to the UPI app, then confirm on the link (D-10) | [C] | **S**; **feasibility unchecked** (Part 3.3) |
| Payments outside Trickle arrive as Detected; unsorted ones are charged to the buffer (D-11, D-12) | [C] | **S** |

#### Onboarding
| Decision | Source | Status |
|---|---|---|
| O-1 to O-28: title, PIN, link/manual, permissions, balance split, budget by category with sliders, 50 categories with search, goals with dates, buffer, equal/manual split | [T] | **Sup**; v15 asks two questions |
| B-9 to B-15 (skippable everything), B-16 (never ask balance), B-35 (Figma look), B-39 (UPI balance split, optional), B-50 to B-52 | [T] | **S** in part |
| v15: two questions; PIN, plan, subscriptions, goals asked later (V15-6) | [C] | New |

#### Subscriptions
V8-1 to V8-4 (calendar of what is due), D-8 (proposed from repeats), B-25 to B-27 (custom, pause, spotted), B-31 (health lines), V15-9 (three screens). **S**.

#### Visual identity
DS-1 to DS-10 (Trickle Night), DS2 (Instrument, alternate), M2-3 (Tarun chose Night), B-35 and B-43 (Figma blur look, per-tab colours). **S**. No red; amber for "ahead". [T]

#### Process
`CLAUDE.md` rules, the one-visualisation-at-a-time process, D-series delegation. See Part 8 and Part 9.

### 5.4 Visualisation register (V1 to V11, plus what v15 did with each)
| Viz | What it is | Key decisions [T] | Data it needs | v15 |
|---|---|---|---|---|
| **V1 Budget gauge** | 10×10 boxes filled from the bottom; liquid = money left; scale "1 box = ₹X"; nested rings for the Spending tab; look-back slider 1 to 12 periods | V1-1 to V1-15 | category weekly amount, left, week history | Gauge kept; **rings dropped**; look-back reachable via Insights → Vs last week |
| **V2 Pay / friction** | Paid boxes fade out in order, dashed ghost stays | V2-1 to V2-5 | category left, cascade result | Kept (plus "N boxes go") |
| **V3 Income split** | Bands from the bottom: savings below, spending above; biggest five categories coloured, rest "others"; labels as two drop-downs; gap between bands; scale chip on every grid screen | V3-1 to V3-11 | income, saving share, subscriptions, category amounts | Kept as the Money in screen (two bands) |
| **V4 Savings goals** | Full segmented ring sized by target; goal rows are text; stats By month (amber taken out, green added, halo on top 3) and By day (weeks as rows); celebration screen | V4-1 to V4-21 | goals, targets, saved, 12-month history, day history | Ring kept; By month/By day **removed from the goal screen** (one gauge instead) |
| **V5 Unspent → saved** | Week-end pop-up on Home; amber boxes become green; choose goals; "move to next week" option; "Let's do better" when nothing left | V5-1 to V5-10 | unspent per category, goals | Replaced by auto-move (B-32) plus a two-screen review |
| **V6 Repeat purchases** | Habit list with ×counts → calendar hotspots; **box-fills-per-repeat withdrawn ("not working at all")** | V6-1 to V6-5 | transactions with payee, time, amount; repeat = same place 3+ times in 30 days | Insights → Repeats (rupees only) |
| **V7 Time patterns** | All spending by time of day as hotspot grids; plain sentence (X-1) | V7-1, V7-2, X-1 | transaction timestamps | Insights → When (week default, rupees only) |
| **V8 Subscriptions coming up** | Calendar of due dates; list with amounts | V8-1 to V8-4 | bills, due dates | List only; calendar dropped |
| **V9 This week vs last** | Two grids side by side, last faded; category list on tap | V9-1 to V9-3 | same-day-of-week spend, both weeks | Insights → Vs last week |
| **V10 History** | Day-grouped list, filter chips (category, range), name/amount/time | V10-1 to V10-3 | all transactions | Spending → History (latest 8, "Show all"; filters dropped) |
| **V11 Exact amounts on tap** | One tap pattern: a line under the picture; Home shows no ₹ | V11-1 to V11-3 | none | Pattern kept; Home rule relaxed |

**Visualisation lessons:** four of the eleven were revised after Tarun saw them (V1 rings, V4 three times, V6 withdrawn, V5 amber for red). Two had to be cut for v15 because they added a second thing to a screen. **None went through a structured comprehension test** (informal reactions drove each revision).

---

## 6. Data requirements: what the app needs to know

This part answers "what data does Trickle need, from v1 to v15?" It separates what is **required for the outcome** from what the budgeting machinery added, so a build can be as small as the research allows.

### 6.1 The minimum dataset (enough to deliver outcomes O1 to O3)
| Entity | Fields | Source | Why it is enough |
|---|---|---|---|
| **Spend** | when, amount, payee (if known), category (can start as "unsorted") | UPI link or one manual add | Awareness needs only *what left, when, for what* [P2, P3] |
| **Category** | name (editable list, six defaults, search or create) | Defaults + user | Where the money went [P5] |
| Week | Monday to Sunday boundaries (derived) | Clock | "This week" is Home's timeframe (decided) |

Everything below is **optional layering**. B-1 to B-8 and B-16 state the same rule: balance, budget and plan are never required.

### 6.2 Entity dictionary (as built in `engine.js`)
| Entity | Fields | Filled by | Needed for | Required? |
|---|---|---|---|---|
| **Profile** | mode (upi / manual), track vs plan, PIN, notification prefs, fingerprint | Onboarding or Settings | Lock, reminders | No |
| **Account link** | bank, UPI IDs, status (ok, lost, slow, declined), last sync | Link flow | Auto spends | No (manual works) |
| **Transaction** | id, time, payee, amount, **kind** (cat, fixed, goal, unsorted, oneoff), ref (category, bill or goal id), via (trickle, manual, detected), src (cascade: from category, buffer, others, savings), week index | Pay flow, detection, manual add | Everything | Yes |
| **Category** | id, name, colour slot, order, weekly amount (`amt`), left, full-week amount (`full`) | User; defaults; plan | Gauges, limits | Name only |
| **Buffer** | amount, left, full-week amount | Plan | Overspend cascade | Only with a plan |
| **Subscription (bill)** | name, amount, every (week, month, 3 months, year), due day, next due, reserve, paused, paid dates | User, or proposed from repeats | Fixed set-aside, due soon | No |
| **Income** | amount, saving part, spending part, start, end (snapped to Sunday) | User | Weekly plan, savings | No |
| **Money-in log** | label, amount, note | Income and one-off money | Audit trail | No |
| **Waiting credit** | amount, from | Detected on a linked account | Assign as income / one-off / not mine | No |
| **Goal** | name, target, saved, by months, state (active, reached, done), 12-month history, celebrated flag | User | Savings ring, ETA | No |
| **Free savings** | one number (`S.free`) | Income splits, week-end moves | Pay from savings, one-off from savings | No |
| **Plan** | weekly total `W`, fixed part `fixedW`, flexible part `flexW`, plan flags (`planSet`, `planFromIncome`), `weekScale` (first-week fraction) | Derived from incomes or typed | Gauge scale, pace | No |
| **Pending week review** | week, snapshot of category amounts, buffer, leftover moved | Engine at week end | Review screens | No |
| **Memory** | payee → category | Learned from sorting | Auto-sort | No |
| **Asked / tips seen** | flags and timestamps per prompt and per tip | App | Do not ask twice | No |
| **Event log** | readable lines of what happened | Engine | Ledger panel and tests | No (prototype only) |

**Ledger invariants** (the reason every prototype is internally consistent): income = savings + budget; budget = fixed reserve + categories + buffer; savings = goals + free savings; owed money sits outside the balance; every rupee is in exactly one pot (D-3).

### 6.3 What the user is asked for (v15)
| Input | When | Skippable | Evidence it is needed |
|---|---|---|---|
| How to see spends (link or by hand) | Onboarding, step 1 | Yes | P1, P10 |
| Categories | Onboarding, step 2 | Yes (six basics) | P5 |
| A payment (amount, category) | Each spend | n/a | Core |
| Income (amount, how much to save, until when) | When the user chooses "Make your plan" or "Add income" | Yes | **No interview evidence** (Part 7) |
| Subscriptions (which, how much, when) | On detection or by choice | Yes | P9 (weak) |
| Goals | From Money | Yes | P8 (weak) |
| PIN, notifications | After the third spend, or in Settings | Yes | Privacy P12 (weak) |
| Balance | **Never asked** (B-16); optional split after UPI link (B-39) | Yes | None |

### 6.4 Derived values (formulas as built)
| Value | Rule | Used by |
|---|---|---|
| Box value | category or week amount ÷ 100, shown as "1 box ≈ ₹N" | every grid |
| Left this week | sum of category left + buffer left | Home |
| Weekly plan | sum over running incomes of (spending part ÷ days in range) × 7 | gauge scale |
| First-week scale | days left in this week ÷ 7 for a new income | first-week amounts |
| Pace | share of the week's money spent vs share of the week gone, with 10 points of slack: on pace (green) or ahead (amber) | Home colour and sentence |
| Fixed set-aside | monthly bills ÷ 4.3 per week; yearly ÷ 52; reserve drains when a bill is paid | plan |
| Overspend cascade | category, then buffer, then other categories equally, then savings (free first, then goals in proportion) | pay screen |
| Repeat purchase | same place or kind, 3 or more times in 30 days, any amount | Repeats |
| Time-of-day bucket | morning 5 to 12, afternoon 12 to 17, evening 17 to 21, night 21 to 5 | When |
| Same-day comparison | this week Monday to today vs last week Monday to the same day | Vs last week |
| Goal ETA | average of the last 3 months' actual pace, else planned pace; needed per month = target ÷ months left | Savings |
| Rounding | whole rupees internally; shown to ₹5 under ₹1,000 and ₹10 above; Indian digit grouping | all amounts |

### 6.5 Data by visualisation
See the "Data it needs" column in 5.4. In short: V1 to V3 and V5 need the plan (amounts, left); V4 needs goal history; V6 to V10 need only **transaction timestamp, amount, payee and category**; V11 needs nothing. **Seven of eleven visualisations run on the minimum dataset**, which is a useful result: the plan machinery is needed for fewer screens than it has taken to build.

### 6.6 Data the outcome needs that the app does not yet collect
| For outcome | Data | How |
|---|---|---|
| O1 awareness | A user's own weekly estimate vs the ledger | Prompt once per week: "About how much did you spend?" (an optional card), stored locally for the study |
| O2 effort | Seconds and taps per manual add; share of spends auto-detected | Event timings in the build, in test builds only |
| O3 comprehension | Answers to grid questions | Run by hand in a session (Part 10) |
| O4 calm | Self-report after open and after over | Session question |
| O5 return | Open days | Test build counter, stored on the device |
| O6 setup | Time to first spend; step skips | Test build counter |

### 6.7 Constraints on the data
- **Local-first**, no cloud: P12 is one person, but the secondary research supports local-first as a trust point. Export as CSV; delete everything in Settings → Data (D-31). Amounts never appear in notifications (D-28).
- **No SMS.** Never read, simulated or implied (hard rule).
- **What UPI/AA data actually contains is unknown**: merchant naming, time, UPI IDs per transaction have not been checked against a real aggregator sample. Merchant memory and the "unsorted" tray were designed for *cryptic* names (a real concern in the v12 audit item 6).
- **Weeks are Monday to Sunday**, weeks per month 4.3, and a plan snaps to Sunday so there are no part-weeks (D-1, D-2, B-24).

### 6.8 Data to collect in the next research round
Income source (allowance, parents, part-time); frequency of income; how they think about money (per day, week, month, until a date); which UPI apps and how many; how often they check; apps tried and why they left; what they do at the moment of paying; last "surprise" and what it was; whether they would link a bank account and what would stop them; whether they pay inside GPay or would scan inside another app; their daily and weekly estimates vs reality.

---

## 7. Traceability: research to features

### 7.1 Matrix (v15)
| Research finding | Feature in v15 | Gap |
|---|---|---|
| P1 tedious tracking | UPI link (assumed), manual add in 3 screens, defaults, unsorted tray | **UPI route unverified**; manual add is 3 screens, not 1 |
| P2 awareness late | "N boxes go" at pay; Home grid and pace colour; week review | Never measured whether it shifts awareness |
| P3 small purchases | Repeats (Insights); "Most goes out on…" | Repeat definition ≠ "small"; a one-off ₹30 snack is small but not repeated (open since v9) |
| P4 no budget, mental limits | Tracking mode; optional limits | The default product still centres on a weekly plan |
| P5 where it went | Categories list and gauges; History | OK |
| P6 situations (social, offers, travel) | None | **No feature addresses situations** (a tag such as "with friends" is not designed) |
| P7 balance check as a brake | Pay confirm shows what is left | Closest thing to the pre-pay moment |
| P8 goals motivate | Goals, ring, ETA, reach celebration | One participant |
| P9 subscriptions | Add, detect, set aside, due-soon row | Nishad and Gautham only |
| P10 friction before paying | Trickle's own pay screen | Depends on **Trickle initiating the payment** (unverified) |
| P11 no guilt | Copy, amber instead of red, no streaks | OK; untested |
| P12 privacy | Local-first, no ₹ in notifications | One participant |
| P13 weekly check habit | Weekly engine, week review | **Checking is not planning** (`weekly_budget_validation.md`) |

### 7.2 Features with no interview evidence
Income splitting with date ranges and multiple incomes; the weekly plan as a product (versus tracking); buffer and overspend cascade; fixed reserve; weekly category budgets; week-end move to savings; one-off money and one-off payments; first-time tips; 3 or 4 tabs; the grid itself (a 10×10 waffle is not something any participant asked for); the six-month demo; per-tab colours; the Figma export pipeline. Some are reasonable inferences ([C]); none has been tested.

### 7.3 Research findings with no feature
Situations (P6), the accumulation of **small** (not repeated) purchases, "expected vs actual per day" (Tarun's own gap, the clearest measurable awareness gap in the data), purpose-based accounts (Nishad), and compensating after a big spend (Harsh, quote 10: "I have to sometimes compensate by not spending anything at all"). These are the places the research points and the product does not.

---

## 8. Why the work is not converging on the outcome

Evidence for each is in the earlier parts. The causes are ordered by how much they explain.

### 8.1 No measurable outcome, and feedback that is real but not captured (the root)
Tarun's own account is the key evidence here: **every version has been shown to people, and that is how the gaps and flaws were found.** That is real user contact, repeated fourteen times, and it is why the diagnosis in this document can be trusted: the same complaints keep coming back. The gap is in what happens to that feedback.
- **It is not recorded.** The docs never say who saw each build, how many, what they were asked to do, or what they said word for word. Several were evidently design-literate friends or reviewers, and none is logged against a screen.
- **It is not ranked against the designer's own view.** Reviewers said "too much information" (v7), "what do I look at, I can't understand" (v14 and since). "Lost functionality" (v11, v15) is Tarun's intuition. Both are valid, but only one comes from people using the product, and nothing says which things must stay on the first screen.
- **It is not turned into a target.** Without something like the outcome ladder in 1.3, a showing can only produce a reaction ("fix that") and never a result ("4 of 5 could do X in under a minute").
- **The original structured test was never run** (`build_plan.md`: low-fi Phase 1, 4 screens, 4 to 6 people, three validation questions). Informal showings replaced it, and they have more reach and less discipline.
Every scripted "validation" checks rules the builder wrote: numbers per screen, red pixels, tap counts, 44/44, 37/37, 41/41. Those pass by construction. After 14 builds the informal showings say clearly **that** it is not working, and cannot say **which** change would fix it or whether the last change helped.

### 8.2 The product drifted from awareness to budgeting
- The research is about **a gap in perception at the moment of paying**. Four of six participants have no budget at all [P4].
- The product built over fourteen builds is a **budgeting system**: income, splits, date ranges, weekly plan, categories with limits, buffer, cascade, fixed reserve, week-end review, goals.
- Of 251 v14 and v15 decision IDs, about 15 (V2, F-1 to F-7, D-10 to D-12) concern the payment moment, **about 6%**. Principle 5 ("mental limits over rigid budgets") says one thing, the structure says another. The "bare minimum" mode (B-1 to B-8) was the right correction and was then followed by B-17 to B-52, which rebuilt the plan machinery on top of it.
- The strongest finding (small purchases adding up) did not exist in the app until v9, was redefined as repeats, and in v14 sits one tap deeper than the plan.

### 8.3 Reviews asked for less, the design intuition asked for more, and more won
Counting the change requests in the v14 and v15 conversations (my count, about 45): roughly five removed anything (never ask the balance; move the "two quick things" screen; Insights rupees only; and the reviews that led to v15). The rest asked for more: tile meaning, left amount, more categories, popups, one-off, tips, restored functionality, more Insights. These were Tarun's design requests (several themselves answers to a reviewer's "I don't understand", such as showing the box meaning and the amount left) and Claude built each one. Each was reasonable alone. Even the fixes for "I can't understand" were additions (a chip, a sheet, a tip, a number) instead of removals. Without a ranking of what **must** be on the first screen, adding is always the easiest way to answer anything, and the product grows until the next reviewer says "too much". This is the pendulum in 4.2.

### 8.4 What the reviewers said, and what is intuition
**From reviewers (Tarun, 6 Oct): mostly design students, and most of what they said was "too much information, what do I look at, I can't understand".** Three separate complaints are folded in that sentence:
- *Too much information:* density, the number of things on a screen.
- *What do I look at:* hierarchy, no single hero or starting point.
- *I can't understand:* vocabulary and meaning (what is a box, what do these numbers refer to, what is a plan versus income).
All three have been repeated across builds (v7, then v14 and v15). This is the project's strongest user evidence and it points one way.

**The reviews are diagnostic, not constructive** (Tarun, 6 Oct): they name symptoms (hard to understand, what do I look at, what does a new user do) and never a remedy. That is why re-reading them does not produce a design, and why the plan is a diagnostic test (Appendix P) rather than another build. The same symptoms appear in Tarun's own messages about the build (Appendix F): he could not tell what a tile was, what + and − referred to, what "2 times of 7" counted, or whether a chip was selected.

**From Tarun's own intuition: "lost functionality" (v11 and v15).** This is a designer's judgement about what a complete product should contain. It may well be right, and it is **not** a finding: no reviewer asked for functionality back, and the interviews do not show students asking for most of it (Part 7.2). Treat it as a hypothesis to be tested, and satisfy it with Tier 2 (one tap away, Part 10.3) rather than by putting things back on the first screen.

**How to weigh the reviewers.**
- *Stronger than it looks:* design students are the most tolerant audience for dense visuals and new vocabulary. If they say "very hard to follow", students outside design will find it harder. The "too much" signal is a floor.
- *Weaker than it looks:* design reviewers judge craft and hierarchy well, and are not the target on money habits (income from parents, quick commerce, no budget, GPay as the only payment app). They say little about which features matter.
- *Missing entirely:* anyone using it with real money for a week. Showing a prototype and watching someone try it for real are different tests.
So treat design-student feedback as strong evidence on **clarity and density**, and as weak evidence on **which features matter**. The first recorded test rounds should recruit mostly **non-design** students (Part 10, Steps 2 to 5).

### 8.5 Thin, second-hand evidence carrying heavy decisions
n = 6; researcher included; no transcripts or survey in the repo; the pre-payment idea (value 3, the product's signature) rests on one uncoded remark. Decisions about weekly budgeting, tabs, a unit and a tone were made on this base. The right use of this evidence is to choose *questions*, not answers.

### 8.6 Decision inflation and delegation
About 340 decisions in six days; v12 alone had about 60 in one day, almost all accepting Claude's recommendation. In v13 and again in the delegated phase (D-1 to D-36, the mockup, the design system, B-29 onward, all of v15) most decisions were Claude's. `CLAUDE.md` says "Tarun makes every decision". In practice the project moved from *Tarun decides* (v14a, the only phase run that way) to *Claude decides, Tarun reviews*, and reviews came at the end of a build, not before each decision. A decision the owner has not seen cannot be an informed choice, so a log of 340 mostly unreviewed decisions is closer to a long list of hypotheses.

### 8.7 The unit of money kept changing
Six changes since v8 (4.3). Each time the previous unit was blamed for a real problem, and each new one had its own. The current grid fixes "dots cannot combine" by making **100 boxes always equal 100% of whatever is being shown**. That means the ₹ per box differs on every screen: Home, each category, each goal, the income split. This is the same trouble that ended v9 (the key must be re-read every time), now covered by a chip and a tip. A genuine alternative was never tested: teach the grid as **percent** ("100 boxes = your week, each box is 1%") and show ₹ only on tap (that is how it is drawn, but it is explained as ₹).

### 8.8 Two unchecked assumptions underneath everything
(a) **Data in:** reading UPI spends without SMS has never been examined; the New round says the real route is Account Aggregator, which needs a regulated partner and gives bank-level narrations. (b) **Friction before the payment:** UPI payments happen inside other apps; the product assumes Trickle starts the payment. If neither holds, the first and signature job (zero-effort tracking and friction at pay) cannot be delivered as designed.

### 8.9 Process cost went to polish and export, not to learning
Three full Figma re-exports (116 frames each), two design systems, eight named gradients, a motion and sound lab, a Sankey and a logo exploration were built between showings, before any structured test was designed. Each is a reasonable activity. Together they used the time that a recorded test round needs.

### 8.10 The record itself became unreliable
- The V2 and V3 sections and a parked Savings requirement were **deleted from the decision log by accident** (commit 836e0fe, while logging V1-10) and went unnoticed for five days. Restored from git on 6 Oct.
- The log has no status column, no evidence column and no "reviewed by" field; decisions "stand as drawn" by default when unanswered.
- `CLAUDE.md` and `HANDOVER.md` still point at the v14 Night mockup link as the current build.
- Some decisions contradict earlier ones without being marked (Part 9).

### 8.11 What is *not* the cause
- The visual quality of the builds; every review praises the look.
- Missing ideas: the project has more ideas than it can test.
- The research direction: *awareness at the moment of paying, no guilt, low effort* is a coherent, differentiated target (secondary research agrees, Part 3.1).

---

## 9. Contradictions, regressions and integrity problems

| # | What | Where | Why it matters |
|---|---|---|---|
| 1 | **Home was meant to carry no big number** (P3, V1-5, V11-3, P2c-Q1). v14b and v15 show "₹N left". | B-48, V15-5 | The change was made because the grid was not understood, so a number was added instead of teaching the grid. The tension is acknowledged in the v15 spec and not resolved. |
| 2 | **Mental limits over rigid budgets** (principle 5) vs a weekly plan with category limits | D-1 to D-7, B-17 to B-34 | 4 of 6 have no budget [P4]. |
| 3 | **The 10×10 waffle scored 2.8 of 5, last of 15**, then became the gauge; 100 marks vs Kay's "about 20 countable" | `v14_stage2_representation.md`; V1-1 | The decision followed a reference image, not the project's own analysis. It may still be fine, as a proportion read, but this has not been tested. |
| 4 | **Different ₹ per box on every grid** | V1-2, D-35, V3-11, V15-14 | Reintroduces the v9 problem. |
| 5 | **One visualisation per screen** implemented as stacked scroll; V4-12 put two on one page | Spending tab was 7 phone-heights tall; Insights 2 | The rule held in each board and failed at tab level. v15 corrects this for most tabs. |
| 6 | **Tarun makes every decision** vs v13 and the D, M, DS, B-29 onward and V15 series | `CLAUDE.md` | See 8.6. |
| 7 | **Six values say "visual, not numeric"**; v14b and v15 added many numbers and then tooltip-like explanations | B-48 | Part of the same drift. |
| 8 | **Zero-effort tracking** vs three-screen manual add and an unverified link | P1, P10 | Effort is the biggest finding and the least solved. |
| 9 | **Wordmark chosen in v12; a mark added in v13** | v12 P6-Q3, D13-5 | Small, but shows decisions reopened without being recorded as such. |
| 10 | **Weekly planning is a hypothesis** (no evidence) and the whole engine and every screen assume it | `weekly_budget_validation.md` | Needs the five-student test described there. |
| 11 | **Parked, not deleted** code remains in the v15 build (271 KB, same size as v7) | v15 | The build is not simpler than v7; the reachable app is. Treat size as scope. |
| 12 | **Decision tags** are inconsistent ("Tarun", "delegated", "Tarun asked, Claude designed", none) | v14 log | It is impossible to count what Tarun himself chose. |
| 13 | **Defaults stand silently** ("not explicitly answered… stand as drawn") | V1, V3, V5 to V11 | A decision that was never asked is recorded as decided. |
| 14 | **Stale pointers**: `CLAUDE.md` "Next up" still names the v14 Night mockup as current | `CLAUDE.md` | A new session would start from the wrong build. |

---

## 10. What to do next

### 10.1 Principle: learn before adding
The project has enough ideas and builds, and it has plenty of informal feedback. What it lacks is a stable definition of success and a record of the feedback that makes it comparable across builds. The next three weeks should produce **evidence, not features**.

### 10.2 Plan
**Step 0 (one day): decide the outcome and freeze.** Tarun accepts or edits O1 to O6 with pass marks (1.3). v15 (this build) becomes the test build; **no new features and no new decisions** are logged until Step 3 is done, other than fixes found in tests.

**Step 0b (one hour, highest value for the effort): harvest what the showings already told you.** Tarun lists, per version, who saw it (even just "a design classmate", "a mentor"), what they were doing, and what they said, as close to word for word as memory allows. Tag each comment with the screen it was about and one of: *too much*, *what do I look at* (hierarchy), *can't understand* (meaning), *liked*, *wanted X*. Keep Tarun's own "lost functionality" notes in a separate column, so reviewer evidence and intuition stay apart. This turns fourteen informal rounds into a dataset and shows which complaints repeat across people, which is the ranking that has been missing (Tier 1 vs Tier 2, 10.3).

**Step 1 (two to three days): feasibility spike on how spends get in.** Output: one page with a go or no-go on each route.
1. **Account Aggregator** through an aggregator partner or sandbox: what does one real UPI debit look like (merchant, time, UPI ID, category)?
2. **Trickle-initiated payment**: scan a UPI QR in Trickle, show the friction, hand off by UPI intent. Will a student do this instead of paying in GPay?
3. **Statement or CSV import** as the honest "auto" fallback.
4. **Notification reading** (Android) as a possible fallback, with an explicit decision from Tarun on whether it counts as covered by the no-SMS rule.

**Step 2 (one week): structured five-second and first-click tests, five students, recorded.** The mockup already has a side-panel switch, "Home picture", that draws the same Home state as the grid, a bar, days of spending, or words (Part 11.5); the full script is in Appendix P.5. Recruit **at least three of the five from outside design** (engineering, commerce, science, arts), because most feedback so far came from design students; keep one or two design students so the results can be compared with earlier reviews.
- Home grid for 5 seconds: "What does this tell you?" "About how much is left?" "What would you do next?"
- Pay confirm: "What happens when you tap Pay?" "What is a box?"
- Insights hero: "What does this say?"
- Pass: at least 4 of 5 answer correctly without help (O3). Also test the **percent teaching** (box = 1%) against the **rupee teaching** (box ≈ ₹N) with different students.

**Step 3 (two weeks): recorded task tests of v15, five students, three rounds, fix between rounds** (NN/g: about five users per round, several small rounds).
Tasks: start from nothing and log a first spend; find where most of last week's money went; make a plan; add a subscription; record a one-off; understand an over-budget week; add a goal; set up with UPI link (simulated). Capture success, time, errors, quotes and the standard 10-item usability scale. Run a **"what does this mean?"** probe on every number and word on screen (it is how "2 times of 7" would have been caught).

**Step 4 (one week, in parallel): one-week diary with five students.** Use the manual path (no UPI needed). Day 0 interview: how they get and plan money, their estimate of a normal week. Daily: log spends and answer one question. Day 7: "How much did you spend this week? Top category?" against the ledger (O1). Also ask whether they would have made a plan, and in which units they think (day, week, month, until a date), which settles the weekly question with data.

**Step 5: interview round 2 (6 to 8 participants).** New guide (6.8). Record with consent and **store transcripts and coding in the repo** so findings can be re-checked.

### 10.3 Three tiers to end the pendulum
Agree this before anything is added, so "too much" and "lost functionality" can both be answered.
| Tier | Rule | Examples now |
|---|---|---|
| **1: always visible** | Needed for the outcome; ≤ 25 words; one hero | Sentence and grid, Pay, categories list, History, "when you spend" finding |
| **2: one tap away** | Valuable, optional, asked when it matters | Plan and income, subscriptions, goals, one-offs, Repeats and Vs last week, tips |
| **3: hidden or parked** | Needs a test or a real user before it returns | Nested rings, move money between categories, hot-hour calendar, month navigation, Sankey, sound, per-tab colours as scope |

### 10.4 Decision and build rules
1. **Every decision row carries its evidence**: [P#] a participant statement, [S] a verified source, [Test #] a test result, or **Hypothesis**. At most five open hypotheses at a time.
2. **Subtraction rule:** adding anything to Tier 1 requires removing something from Tier 1.
3. **Density check** (`archive/session-workfiles/audit/density.js`) before any build is shared.
4. **No full Figma re-export until after Step 3.** Export the winner once.
5. **One build per test round.** The build changes only what the findings say.
6. **Record every review as a dated note** with the screen, the task and the person (or "Tarun's own view").
7. **Fix the log**: add status and evidence columns; stop treating unasked defaults as decisions; point `CLAUDE.md` and `HANDOVER.md` to v15.

### 10.5 How success would show
After Step 3 and Step 4 the project can answer, for the first time: Do students understand the grid? Does it change what they know about their week? Do they make a plan at all? Does tracking by hand survive a week? Which of the 340 decisions did students never touch? Those answers, not another build, decide what v16 contains.

---

## 11. Are the visualisations wrong?

Tarun's reading of the reviews (6 Oct): the feedback is "mostly that the questions are hard to understand, or what will a new user do; the grid is hard to understand. Maybe the visualisations are wrong." This part treats that as a hypothesis and tests it against everything in the record.

### 11.1 What the feedback is, and is not
- The reviews are **symptom reports about comprehension**, not design suggestions: "I can't understand", "what do I look at", "too much". They do not say what to change. That is normal for informal showings, and it means no amount of re-reading them will produce the fix. A **diagnostic test** is needed to locate the cause.
- Three candidate causes fit the symptoms equally well today:
  1. **H-VIZ: the representation is wrong.** The picture (the 10×10 grid and its siblings) cannot be read without learning.
  2. **H-WORDS: the language is wrong.** The questions and labels use ideas the user does not have yet (plan, income, split, box, pace).
  3. **H-ORIENT: the sequence is wrong.** A new user is not told what the app is for or what to do first, so any screen looks like noise.
- These are not exclusive. The evidence below says H-VIZ is plausible, H-WORDS is certain (Part 12), and H-ORIENT is likely (Part 12). The test in 11.6 separates H-VIZ from the other two.

### 11.2 What the visualisations are asked to do
| # | Job | Question the student is answering | Representation used in v14 / v15 |
|---|---|---|---|
| J1 | State of the week | "Am I okay?" | 10×10 grid, lit boxes = money left (Home) |
| J2 | State of one category | "How much of Food is left?" | Same grid, category colour; thin bar in the Spending list (v15) |
| J3 | Compare categories | "Where did it go?" | Nested rings (v14, V1); ranked rows with thin bars (v15) |
| J4 | Effect of a payment | "What does this payment do?" | Dashed ghost boxes where the payment leaves (V2); "N boxes go" (v15) |
| J5 | Split of income | "What is saved and what is spent?" | Two-band grid, savings below, spending above (V3) |
| J6 | Progress to a goal | "How close am I?" | Segmented ring (V4); grid on the goal screen (v15) |
| J7 | When I spend | "At what time or day does it go?" | Hot grid (calendar heatmap) (V7, V6) |
| J8 | This week against last | "Am I spending more?" | Two grids side by side, last faded (V9) |
| J9 | Repeats | "What do I buy again and again?" | Habit list then calendar hot grid (V6) |
| J10 | What is due | "What is coming out?" | Calendar of due dates, list (V8; v15 list only) |
| J11 | What happened | "What did I buy?" | Day-grouped list (V10) |

**Count of visual grammars a student must learn in v14:** the fill grid (liquid, left), the ghost-and-fade (loss at pay), the nested rings, the segmented ring, the band grid (income), the hot grid (intensity of spend), the waffle by goal and month (V4), the due-date calendar. **Eight.** v15 cut this to **five** (fill grid with ghost boxes, band grid, segmented ring, hot grid, thin bars). This follows an explicit Tarun decision on 2 Oct: *"every kind of information gets its own specific representation (no single universal unit)."* That decision is the root of the learning burden: each new job is a new picture to decode. The research the project cites points the other way (fixed unit, repeated, never enlarged; Neurath/Kinross, Haroz 2015; Part 3.1).

### 11.3 Seven structural problems with the picture, found by reading the build
1. **The meaning of "full" flips between screens.**
   - Home and category grids: lit boxes = money **left**, so the grid *empties* as you spend; full is good.
   - Savings and goals: lit = money **saved**, so the grid *fills* as you save; full is good.
   - No-plan Home (track mode): lit boxes = money **spent**, so the grid *fills* as you spend; full is neutral.
   - Insights hot grid: bright = **more spending**; bright is "more", not good or bad.
   - A student who learns "lit = good" on Home meets lit = more spending on Insights, and a Home that changes direction the day they make a plan. (Verified in `ui15.js`: plan Home uses `gridHtml(left share)`; track Home uses `multiGrid(spent parts)`.)
2. **The unit differs on every grid.** 100 boxes always equal 100% of whatever the grid shows (the week, a category, a goal), so "1 box ≈ ₹16" on Home, "₹5" on Food, "₹300" on a laptop goal. This is the v9 failure (the key must be re-read on every card), now behind a chip. It is a *percent* gauge dressed as a *rupee* gauge.
3. **100 marks.** Kay et al. (2016) found about 20 countable dots work for lay users; the stage-2 analysis scored the 10×10 waffle last of 15 (2.8 of 5). A fill level is read like a progress bar (perceived by edge position, not by counting), so the 100-mark objection may not apply, but this is an untested assumption.
4. **Colour carries too many meanings.** Green means "on pace" on Home, "savings" in Money, "added" in goals and "less than last week" in Insights. Amber means "ahead of pace", "over", "taken from savings" and the unsorted marker. Orange means "spending" in Money and "category" in the ring slots. The design system says colour never carries meaning alone (D-33), yet the same hue is reused across jobs.
5. **Which direction is bad?** Home shows green when the grid has plenty left and amber when it is nearly empty, but also shows *more boxes lit* as "better". A drained grid is "worse" while amber means "careful", and the sentence under it ("On pace.") must disambiguate. The sentence is doing the real work.
6. **The grid carries no information a number does not.** On Home the grid says the same thing as "₹796 left" (which was added back at Tarun's request). If a reader needs the number to confirm the grid, the grid is decoration, not instrument.
7. **The most distinctive use of the grid is the loss at payment (V2), not the state on Home.** The project's first decision on 2 Oct was: *"squares and circles are used ONLY to show loss, at the pay screen."* The same day the Viz 1 board made the 10×10 grid the general budget gauge. These two decisions pull in opposite directions (Part 9).

### 11.4 Evidence that supports the grid, so the verdict is fair
- Icon arrays and unit charts help low-numeracy readers (Garcia-Retamero & Cokely 2013; Haroz 2015) when the unit is **fixed and known**.
- A fill level is a position-along-a-scale encoding, among the most accurate ones (Cleveland & McGill 1984).
- The pay-moment ghost (J4) is a genuinely good fit for Soman's "rehearsal and immediate depletion" (2001).
- Reviewers were design students who may have *liked* the look; the complaint is comprehension, not taste, and there are no recorded comments praising the meaning.
- The grid is the product's most recognisable visual and Tarun's decision (V1). Changing it has a cost in identity and in the eleven visualisation boards (V1 to V11).

### 11.5 Candidate alternatives for the Home job (J1)
All draw the **same state** (₹796 left of ₹1,626 on Friday of a week). The first four are built behind the side-panel switch "Home picture (for 5-second tests)" in the v15 mockup.
| Option | What the student sees | What they must learn | Honest proportion | Uses the "₹100 to 150 a day" finding [P] | Pay-moment friction | My expectation [C] |
|---|---|---|---|---|---|---|
| **Grid** (current) | 100 boxes, lit = left, pace colour, "₹796 left", chip | box = 1% (or ₹16), lit = left, colour = pace | Yes | No | Strong (ghost boxes) | Reads slowly for new users |
| **Bar** | One rounded bar filled by the share left, "₹796 left" | Left to right = used to left | Yes | No | Weak | Fast; identical to a progress bar everyone knows; loses the identity |
| **Days** | "Lasts all week" or "Lasts until Thursday" with seven day tiles for the days the money covers at the planned daily rate | One tile = one day | Indirect | **Yes** (money as days of usual spending) | Medium ("this uses a day") | Likely the easiest for "can I spend this today?"; needs a stable "usual day" |
| **Words** | "About half the week is left." plus "₹796 left" | Nothing | No | No | Weak | Calmest; matches principle 3; cannot carry patterns |
| **Number first** | "₹796 left. About ₹114 a day." | Nothing | No | Yes | Weak | Fastest; conflicts with "no big number on Home" (V11-3), which was a hypothesis about the ostrich effect, not a finding about students |
| Dots ₹100 (v12) | Dots, pills, blocks | combining rules | Yes | No | Strong | Retired for combining problems |
| Ranked bars per category (S8) | Names on bars, no colour key | Nothing | Yes | No | n/a | Good for J3 |

Stage-2's own scoring (judgement, not users; `v14_stage2_representation.md`): Fixed dots 4.3, Relative words 4.1, Days of spending 4.0, Label-first ranked bars 3.9, Proportional bar 3.9, Fuel gauge 3.4, **Waffle 10×10 2.8**. The three highest-scoring simple options (words, days, bar) are the ones Tarun did not choose.

### 11.6 A decisive test (uses what is already built)
**Question:** does the picture, on its own, let a first-time student say how much is left and whether it will last?
**Design:** 5 participants, mostly non-design students (Part 10). Each sees **five** Home screens for 5 seconds each, one per variant, in a rotated order, each with a different state (so no memory of the answer) drawn from a set of five states (plenty, half, low, empty, plan not started). Nothing is explained beforehand.
After each screen ask: (1) "What is this telling you?" (free text); (2) "About how much is left: a lot, half, a little, none?"; (3) "Could you buy lunch for ₹150 today?"; (4) confidence 1 to 5. Record time to first answer.
**Scoring:** correct on (2) and (3); free-text coded as *state understood*, *wrong*, *asks what a box is* (a comprehension question).
**Decision rule (a starting line):** a variant "reads" if at least 4 of 5 answer (2) correctly and none asks what the shapes mean. If the grid fails and one of Days, Bar or Words passes, the Home gauge changes and the grid is kept for the pay moment (J4) and the category screens only. If all fail, the cause is not the picture (H-WORDS or H-ORIENT, Part 12).
**Second test:** a 5-second test of the **Insights hot grid** with the hero sentence covered and then uncovered.

### 11.7 A way to simplify without discarding the grid
1. **One direction everywhere:** lit = money left in anything that drains; a *bar or ring that fills* only where something is being built (savings), always green, never reused for spend.
2. **One unit per screen, said in a sentence:** "100 boxes = your week" first, "each box ≈ ₹16" second; ₹ only on tap (this is how it is drawn, but it is explained as rupees).
3. **At most three grammars:** state (bar or grid), time (hot grid), and building (ring).
4. **Colour contract:** green = money you have (left, saved); amber = careful or over; orange is not used for state; one hue per category with names always shown.
5. **The grid's strongest job is the payment:** keep ghost boxes at pay and on the category screen; test whether Home needs it at all.

### 11.8 Verdict
**Probably partly wrong, and the wrong part is its breadth, not its form.** Evidence: reviewers cannot read it (the strongest datum); the direction flips between screens; the unit is different on every grid; the project's own analysis ranked it last; and a number was needed beside it. Evidence against: the form has support in the literature when used with a fixed unit, and nobody has yet tried the simplest fix (teach it as 100% and keep one direction). **Confidence: moderate.** The five-second test in 11.6 would move this to high in either direction within a week.

---

## 12. What will a new user do, and can they understand what they are asked?

Two parts of the feedback point here: "the questions are hard to understand" and "what will a new user do". This part examines the language (H-WORDS) and the first-run sequence (H-ORIENT) using the strings measured in the v15 build (Appendix H).

### 12.1 What the measurement says about the words
Counted from the rendered builds (`archive/session-workfiles/research-doc/copy.js`; tables in Appendix H):
| Measure | v14 (116 states) | v15 (55 core states) |
|---|---|---|
| Visible text strings (excluding bare numbers) | 2079 | 539 |
| Strings per state | 17.9 | 9.8 |
| Average words per string | 2.7 | 2.3 |
| Strings longer than 8 words | 3% | 3% |
| Titles and questions | 184 | 60 |
| Average words in a title or question | 2.7 | 3.0 |
| Titles or questions longer than 8 words (the project's own rule, B-10) | 0 | 0 |


**Finding: length is not the problem.** The project's rule B-10 (a question of about eight words or fewer, one per screen, no jargon) is met everywhere: no title or question in v14 or v15 is longer than eight words, and the average is 2.7 to 3 words. Yet reviewers say the questions are hard to understand. The conclusion is that **B-10 optimised the wrong variable.** Very short questions lose their object and their context ("Until when?", "Which one?", "Paid from?"), and the words they keep are the model's words (plan, income, split, box, pace). The questions are short and still need a mental model the new user has not got.

Terms the user must already understand to read the screens (number of visible strings that contain each):
| Term the user must understand | Strings in v14 | Strings in v15 |
|---|---|---|
| box | 36 | 13 |
| category | 31 | 8 |
| plan | 24 | 11 |
| income | 30 | 3 |
| upi | 21 | 8 |
| savings | 20 | 9 |
| pace | 18 | 7 |
| subscription | 18 | 2 |
| subscriptions | 16 | 3 |
| buffer | 16 | 1 |
| goal | 11 | 5 |
| split | 14 | 1 |
| one-off | 6 | 7 |
| weekly | 10 | 3 |
| link | 9 | 3 |
| budget | 12 | 0 |
| categories | 5 | 6 |
| limit | 5 | 2 |
| boxes | 0 | 4 |
| unsorted | 3 | 0 |
| limits | 0 | 3 |
| goals | 2 | 0 |
| detected | 1 | 1 |
| fixed | 1 | 0 |


### 12.2 Question audit: v15 titles and questions, one by one
Rating: **Clear** (can be answered with no context), **Needs context** (depends on a previous screen or an unstated object), **Vague** (several valid readings), **Jargon** (needs a defined term). "Likely reading" is a prediction [C] to be checked in the "what does this mean?" probe (Part 10, Step 3), not data.

| # | Screen | Text | What it assumes | Likely misreading | Rating | Direction for a fix |
|---|---|---|---|---|---|---|
| 1 | Onboarding 1 | "How should we see your spends?" with *Link UPI / I'll add them / Skip* | That "see" means "track", that "we" is Trickle, that linking is safe | "See" is vague; "Link UPI" sounds like linking the UPI app, not a bank account; no hint of what is read or by whom | Vague | "How does Trickle find your payments?" with "Read them from my bank (read only)" and "I'll type them in" |
| 2 | Onboarding bank | "Choose your bank" | That the next step is bank access | Lists UPI IDs and bank names together | Needs context | One line saying what is read and that money cannot be moved |
| 3 | Onboarding verify | "Approve in your UPI app" | That the consent happens in a UPI app | In an aggregator flow the consent is in the aggregator, not GPay | Vague, possibly wrong | Depends on the feasibility spike (Part 10, Step 1) |
| 4 | Onboarding categories | "What do you spend on?" chips with × on chosen and + on others | That a category is a bucket of spending; that × on a chosen chip means "selected" | × reads as "remove", so the selected state looks like a delete control | Needs context | Check-marks for chosen, plain chips otherwise, one line "These are your buckets" |
| 5 | Home | "On pace." / "A bit ahead of pace." | "Pace" of what | Pace of walking? of spending? against what | Jargon | "You're spending steadily." / "Spending a bit fast this week." |
| 6 | Home, no plan | "A fresh week." over an empty grid | That an empty grid is "fresh" | A broken or empty screen | Needs context | A sentence that says what the grid will show and one action ("Add your first spend") |
| 7 | Home | "₹796 left" and chip "1 box ≈ ₹16 ⓘ" | Left of *what* (this week's money), box meaning | "Left in my account" | Needs context | "₹796 left this week" |
| 8 | Home | "Make your plan" | That a plan is a weekly allowance built from income | A fitness plan; a money plan for the month | Jargon | "Set a weekly amount" or "Add your money" |
| 9 | Home | "Gone over a little." | That over means over the week's amount | Over the bank balance | Needs context | "You've spent this week's amount." |
| 10 | Home row | "2 payments need a category" | Category is a bucket | Fine after step 4 | Clear | Keep |
| 11 | Pay | "How much?" | The amount | Fine | Clear | Keep |
| 12 | Pay | "For what?" with a dashed "One-off / outside your plan" tile | That plan and "one-off" are defined | "Outside your plan" means nothing without the plan | Jargon | "Not part of your week" |
| 13 | Pay confirm | "₹182 over." then a sentence | Over the category | Over my balance | Needs context | "₹182 more than Food has left." |
| 14 | Pay confirm | "62 boxes go · 1 box ≈ ₹5" | The box concept | "Which boxes" | Needs context | "That takes 62 of Food's 100 boxes" |
| 15 | One-off | "What was it?" | That the previous tile was "One-off" | A repeat of "For what?" | Needs context | "What's this one-off for?" |
| 16 | One-off | "Paid from?" | A source of funds | My bank? my UPI app? | Vague | "Take it from your savings?" |
| 17 | Plan 1 | "How much came in?" | An income | Fine for allowance; unclear for one-off | Clear | Keep |
| 18 | Plan 2 | "How much to save?" (the explanatory subtitle was removed in v15) | Save *of what*; that the rest is for spending | A savings goal | Needs context | "How much of the ₹9,000 do you want to keep?" |
| 19 | Plan 3 | "Until when?" | That this is how long the money has to last | Until when what? | Vague | "How long does this money have to last?" |
| 20 | UPI split | "How long should it last?" | The money | Fine | Clear | Keep |
| 21 | Money | "Money in." / "Add it, split it." | "Split" | Divide with a friend | Jargon | "Add money you get. Choose how much to keep." |
| 22 | Money | "₹900 a week to spend." with bands "Saving 14% / Spending 86%" | That the weekly figure and the percent describe different things | Contradictory numbers | Needs context | One figure and one caption |
| 23 | Money | "₹23,600 saved." with a ring | What is counted | Total in my bank | Needs context | "₹23,600 set aside" + "in goals" / "not in a goal" |
| 24 | Spending | "low left" / "some left" per category | A weekly limit exists | "Low left" is unusual English | Needs context | "Nearly used up" / "Plenty left" |
| 25 | Spending | "Edit weekly limits" | That limits exist | I never set limits | Jargon | "Change how much each gets" |
| 26 | Insights | tabs "When · Repeats · Vs last week" | "Vs" | Versus what | Jargon | "This week and last week" |
| 27 | Insights | "You spend most on Tue afternoon" over a grid whose rows have no labels (v15 added a caption) | Rows are times | Rows are categories | Needs context | Label rows morning to night |
| 28 | Insights | "Most goes out on the 2nd" | "The 2nd" of the month | A second | Vague | "Your biggest day this month was the 2nd" |
| 29 | Insights | "The spend that repeats most: Maggi Point, ₹215 in 30 days" | Repeat = same place | Fine after the label | Clear | Keep |
| 30 | Insights | "₹330 more than last week." with "Same days of the week." | The two weeks are compared up to the same weekday | Whole last week | Clear | Keep |
| 31 | Week review | "You stayed on pace. ₹184 moved to savings." | That unspent money is moved automatically | "Why did my money move" | Needs context | "₹184 was unspent, so it went to savings." (first time only) |
| 32 | Week review | "By category" then "Plan and actual" | That the white line is the plan | A chart of what? | Needs context | "What you planned and what you spent" |
| 33 | Subscription | "Which one?" | Which subscription | Which what? | Vague | "Which subscription?" |
| 34 | Subscription | "How much?" with Weekly, Monthly, Every 3 months, Yearly | The amount per payment | The total | Needs context | "How much each time?" |
| 35 | Subscription | "When is it due?" | The next payment | Fine | Clear | Keep |
| 36 | Pop-up | "Make a plan?" | Same as 8 | Same as 8 | Jargon | As 8 |
| 37 | Pop-up | "Lock Trickle with a PIN?" | PIN | Fine | Clear | Keep |
| 38 | Tip | "Amber means ahead of pace." | Pace | Same as 5 | Jargon | "Amber means you're spending fast." |
| 39 | Tip | "Income is split." | Split | Same as 21 | Jargon | "Part is kept, the rest is for spending." |
| 40 | Tip | "That is one spend." | Why it is said | Condescending | Needs context | "Added. It took 12 boxes." |

**Tally of the 40 rows:** 8 clear, 17 need context, 6 are vague or possibly wrong, 9 use jargon. **32 of 40 (80%)** depend on something the screen does not say. This is the quantified version of "the questions are hard to understand".

### 12.3 Principles for the questions (a proposal to replace B-10's length rule)
B-10 stays as a **ceiling** (no long questions) and gains four **floors**:
1. **Name the object.** A question must say what it is about: "How long does this money have to last?", not "Until when?".
2. **Say why in one line** when the answer changes something the user cannot see: "This sets your weekly amount."
3. **Show an example answer** for any number (placeholder values or presets with meaning: "A month", "Until next allowance").
4. **No model words without a sentence.** Plan, income, split, buffer, reserve, pace, box, limit, one-off need either a replacement or a one-line definition the first time they appear.
5. **A question may not depend on the previous screen** to make sense (a screen is shown on its own in a notification, a deep link, or after a back button).
Each floor can be checked automatically in part (a lint over the copy table; the jargon table above is the start of it).

### 12.4 The first-run sequence, as built, step by step
| # | Screen | What the user sees | What a new user probably does | Problem |
|---|---|---|---|---|
| 1 | Title | Three-cell logo, "Spend calm. See where your money goes. No guilt." | Reads one line | No statement of what the app *does* in the user's terms (it shows, it does not tell) |
| 2 | Q1 | "How should we see your spends?" | Taps "I'll add them" (the lower-friction choice) or Skip | Unclear choice (12.2 #1), and the UPI route is unverified |
| 3 | Q2 | "What do you spend on?" six chips already chosen | Taps Next | Does not know why categories matter |
| 4 | Home | "A fresh week." an empty dark grid, a green "Make your plan" card, an "Add a spend" button | Looks at the grid; may try tapping it; taps "Add a spend" or "Make your plan" | **There is nothing to read yet**, and the strongest element on screen (Make your plan) asks for the thing the research says students do not do (plan) |
| 5 | Add a spend | "How much?" keypad | Types a number | Fine |
| 6 | For what? | A grid of categories and a dashed One-off tile | Picks a category | "One-off" appears before they have a plan |
| 7 | Confirm and tip | "That is one spend." sheet, then "How to read it" sheet | Closes two sheets in a row | Two explanations back to back; neither is a result |
| 8 | Home | A grid with a few coloured boxes and "₹120 so far" | ? | The value arrives after **three screens of setup and two of explanation** |

**The first-run goal is unstated.** The research suggests the first useful thing is *awareness*: "here is what you spent". A new user gets that only after typing a payment, by hand.

### 12.5 Alternatives for the first sixty seconds [C], each a hypothesis
| Idea | What it does | Needs | Risk |
|---|---|---|---|
| **A. Instant look-back** | After linking, show the last 7 to 30 days: "Last week you spent ₹X. Most on Food. Chai 5 times." | A working data route (Account Aggregator or import) | Depends on feasibility; real merchant names may be cryptic |
| **B. Guided first spend** | Home's only element is "Add your first spend" with an example ("A chai, ₹20"); the grid appears after | Nothing new | Feels like a chore; no result |
| **C. See an example week** | A button "See how it looks" opens a seeded week with the explanations as a short guided tour, then returns to empty | Existing profiles | Another explanation, but with a *result* in front of it |
| **D. Remembered spends** | "Add the last three things you bought" with chips for common items | Defaults | Memory-dependent, but fast and gives an immediate non-empty grid |
| **E. Import first** | Offer a statement import before anything else | CSV import (placeholder only today) | Heavy for students |
| **F. Say what it is for** | Title becomes "See what each payment does to your week." | Copy | Does not change behaviour on its own |
Test A to D as first-click and think-aloud tasks (Part 10, Step 3, task 1). The most informative single measure: **time from install to the first moment the user says "oh, I see"**.

### 12.6 What this part adds to the diagnosis
H-WORDS is confirmed by measurement: four in five core questions depend on unstated context. H-ORIENT is likely: the first useful output arrives late and the loudest element on the empty Home asks for a plan. H-VIZ is plausible (Part 11). A fix that touches only the picture would leave two of the three causes in place; the plan in Part 10 tests all three.

---

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

---

## Appendix A. Boards and artifacts
(These are published artifacts from the logs; open with the Artifact tool or in claude.ai.)

| What | Link |
|---|---|
| v15 mockup (current) | https://claude.ai/artifact/XmxrV3ZoboyDBF52Hvc2GB |
| v14 Night mockup (full flows) | https://claude.ai/artifact/F5iDLzVpmpKw8dSwUWkSU9 |
| v14 Instrument mockup | https://claude.ai/artifact/GMby4zaz4J8ZanziKiLBKM |
| Whole-app blueprint (69 screens, 23 flows) | https://claude.ai/artifact/RVjueXaXCsmCKyF6UUEErj |
| Design system Trickle Night | https://claude.ai/artifact/3vrR99iZ8rmzw51MeFRXde |
| Stage 2 representation (15 systems) | https://claude.ai/artifact/VYX5h82WLtxEyrgFtS2S1s |
| V1 budget gauge | https://claude.ai/artifact/AcKnP1FTzaAuGwsqiXWLgM |
| V2 pay / friction | https://claude.ai/artifact/Fsvd6fogygvPdtsrHsqMyN |
| V3 income split | https://claude.ai/artifact/KHq3fHEr8sebrJzRksghMQ |
| V4 savings goals | https://claude.ai/artifact/X9aNwLv6pGGZb5sFcxiXEm |
| V5 weekly savings | https://claude.ai/artifact/N3Lg6rmjweszAX6owzt5Eu |
| V6 repeat purchases | https://claude.ai/artifact/AbKgJ6jeARMKgeGMdtLGox |
| V7 when you spend | https://claude.ai/artifact/FdbjxsRYHqwkQ5hgxcCBzV |
| V8 fixed bills | https://claude.ai/artifact/4Py7ojfodqGQ6hcaLd42fZ |
| V9 week vs last | https://claude.ai/artifact/7HMcsvp68aqLTVr33y37sG |
| V10 history | https://claude.ai/artifact/8LxmrXkdZfEGbp9H6uE8kZ |
| V11 amounts on tap | https://claude.ai/artifact/RsXokgbfEjVoyKyb3pX7Zc |
| Onboarding board | https://claude.ai/artifact/16Z1Z4yx1VDWk3AT7rYP6j |
| Pay flow board | https://claude.ai/artifact/LhuVGnFaj29oBbg3cYoX3u |
| Moving money board | https://claude.ai/artifact/H8t1Ep7UbonszCB2kbk4Xn |
| v13 prototype / design system | https://claude.ai/artifact/7p8hkxT1Bucq76CySm5DEF · https://claude.ai/artifact/A5xYpgoLKZwngjH2uV36FT |
| v12 prototype / design system | https://claude.ai/artifact/PuDjHposoni47zo1qzGxZr · https://claude.ai/artifact/5wmMrG8kYqj3gLe2BGStNj |
| Figma export (v14 look) | https://www.figma.com/design/b9MRkClYToyPjpMcDaPbeT |
| Tarun's own Figma copy | https://www.figma.com/design/ZTVrdudzkDV9bytBceDD5s |

## Appendix B. File map
| Path | Contents |
|---|---|
| `RESEARCH.md` | This document |
| `CLAUDE.md`, `HANDOVER.md` | Standing rules; where the last session stopped |
| `docs/research/brymans_analysis_interviews.md` | The primary data (6 interviews, coded) |
| `docs/claude/project_master_synthesis.md` | Everything before v14, digested, with evidence tags |
| `docs/claude/v14_stage0_facts.md`, `v14_decisions.md` | Facts, principles, and the decision log (v14 and v15) |
| `docs/claude/v12_decisions.md`, `v13_decisions.md` | Earlier decision logs |
| `docs/claude/v12_phase1_recovery.md` | The 152-item recovery audit |
| `docs/claude/v14_stage2_representation.md` | 15 representation systems, scored |
| `docs/claude/weekly_budget_validation.md` | Why weekly is a hypothesis and how to test it |
| `docs/claude/v15_audit.md`, `v15_spec.md` | The v15 diagnosis and design |
| `archive/session-workfiles/mockup15/` | v15 source; `build.py` assembles `mockup15.html` |
| `archive/session-workfiles/mockup/` | v14 mockup |
| `archive/session-workfiles/audit/` | `density.js`, per-screen measurements (v14, v15) |
| `archive/session-workfiles/figma-export/` | The DOM-to-Figma pipeline |
| `prototypes/v7` to `v13` | Earlier prototype sources |

## Appendix C. Quote bank (from the coded interviews, numbered as in the source)
| ID | Quote | Theme |
|---|---|---|
| T-1 | "I don't have a budget" | no planning |
| T-4 | "I bought coffee 5 times that 100 rupees" | accumulation |
| T-7 | "I check my balance and then I go 'What happened? How did I even spend that much'" | awareness late |
| T-8 | "I expect to spend 100 to 150 a day but it might be closer to 350 to 400" | expected vs actual |
| T-9 | "It's way too tedious to keep track of spending using UPI apps" | tracking |
| N-4 | "It's very hard to keep track of certain subscriptions" | subscriptions |
| N-5 | "Cigarettes, confectionery and other small refreshments… I don't keep track of them" | accumulation |
| N-8 | "I don't really have a fear of checking my balance. I check it once a week." | weekly check |
| N-11 | "When I'm travelling and when I'm with my friends I spend more than normal" | situation |
| Y-4 | "I started, adding, adding, adding" | situation |
| Y-8, Y-9 | "Maybe I'll just go up to thousand rupees… It's not a fixed budget, I do have the mental thing" | mental limit |
| Y-13 | "I don't have to worry about how much money my wallet is having" | no cash constraint |
| Y-14 | "If there was a goal… that will help me have motivation to save money" | goals |
| G-5 | "It's all in my mind" | mental tracking |
| G-8, G-10 | "I check my balance every day… Sometimes it does stop me from spending" | balance as friction |
| H-5 | "My problem… is with knowing where I want to spend" | clarity |
| H-7 | "Food is this thing where you make small purchases and it keeps adding up" | accumulation |
| H-10 | "I have to sometimes compensate for it by not spending anything at all" | compensation |
| V-5 to V-7 | "It is too tedious… I want it to be automatic… Take it from my GPAY" | automatic tracking |
| V-8 | "UPI has made it easier to spend" | cashless effect |
| V-10, V-11 | "I used to have a buffer… Nowadays it's just zero rupees" | buffer |

Researcher's own note in the source: "I cannot measure impact from paying and its cumulative impact." and "Students want to understand patterns and maintain control without feeling restricted in their every choices."

## Appendix D. Source list
**Project docs:** see Appendix B and the source list at the top.
**Peer-reviewed, as cited in the project docs:** Prelec & Loewenstein 1998 (*Marketing Science*); Soman 2001 (*JCR*), 2003 (*Marketing Letters*); Raghubir & Srivastava 2008; Heath & Soll 1996 (*JCR* 23, 40 to 52); Thaler 1985, 1999; Kay et al. 2016 (CHI); Haroz et al. 2015 (CHI); Park et al. 2018; Cleveland & McGill 1984; Garcia-Retamero et al. 2010; Gigerenzer & Hoffrage 1995; Pielot 2014; Wohllebe 2021; BCS HCI 2023.
**New on 6 Oct (search-result level; read before citing):**
- Account Aggregator framework and Sahamati: https://sahamati.org.in/aa-apps/ · https://www.idfcfirst.bank.in/account-aggregator
- NPCI UPI TPAP guidelines: https://razorpay.com/blog/all-you-need-to-know-about-upi-third-party-apps-tpaps/ · https://www.thequint.com/tech-and-auto/npci-issues-sops-for-upi-apps-will-this-move-help-small-players
- Mental budgeting: https://www.insead.edu/faculty-research/publications/journal-articles/mental-budgeting-and-consumer-decisions
- Budget period framing (title only): https://www.pnas.org/doi/10.1073/pnas.2205877119
- Student financial-diary app trial (JEBO 2023, title only): https://www.sciencedirect.com/science/article/abs/pii/S0167268123002950
- 177-student RCT of budgeting tools: https://files.eric.ed.gov/fulltext/EJ1280271.pdf (blocked from this environment)
- UK RCT on financial capability apps: https://pureadmin.qub.ac.uk/ws/files/175760516/French_McKillop_and_Stewart_1_.pdf
- NN/g, why five users: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
- Progressive disclosure study (ACM 2026): https://dl.acm.org/doi/10.1145/3742413.3789087
- **Unverified claim not to be cited:** "a University of Chicago study found weekly allowances reduce spending" (blogs only; no primary source found).

## Appendix E. Density audit (the first measured evidence about the interface)
Measured with `archive/session-workfiles/audit/density.js` over screen states rendered in a browser at phone size.
| | v14 (116 screens) | v15 (55 core states) |
|---|---|---|
| Average words on a screen | 56 | 22 |
| Screens over 25 words | 68 | 15 of 55 (lists, Insights grids, calendar, pay confirm) |
| Average tappable things | 12 | 8 |
| Screens taller than one phone | 21 | 0 |
| Worst screen | Spending, 538 words, 84 ₹ values, **7 phone-heights** | Insights hot grid, 36 words |
| Number of tabs | 5 | 4 |
| Onboarding screens | up to 12 | 2 |
The measure counts words, not clarity: it did not catch "2 times of 7" or an unlabelled row axis. Only students can.


---

## Appendix F. Feedback ledger: Tarun's requests and reviews in the v14 to v15 sessions

This is the part of the feedback record that exists in writing: the messages Tarun sent while v14 and v15 were being built (2 to 6 Oct), as reconstructed from the conversation record, with what each was, what it was answered with, and whether the answer added or removed content on screen. It is **not** the reviewers' own words; those were never recorded (Part 8.4). Earlier requests (v2 to v13) are in `project_master_synthesis.md` §4. Visualisation decisions V1 to V11 and O-1 to O-28 (2 Oct) were made one at a time with Tarun and are in the decision log.

**Type key.** *Add* = asks for more on screen or a new capability. *Remove* = asks for less, or for something to be optional. *Clarify* = says something is not understandable (a comprehension complaint). *Fix* = a bug or visual defect. *Look* = a visual-style request. *Process* = about the work, not the product. *Evidence* = about the evidence itself.

| # | Message (condensed, close to verbatim) | Type | Answered with | Net effect on screen content |
|---|---|---|---|---|
| 1 | The user should be able to use the app without inputting a budget or a balance; the bare minimum must still track categories. What inputs are there and how can the app still function without them? | Remove | B-1 to B-8: three levels (track, limits, plan); only category tracking required | Less asked at the start |
| 2 | Every question has to be very simple and short; the user can always say no to anything. | Remove / Clarify | B-9, B-10, B-11 (short, skippable questions) | Shorter questions; Skip everywhere |
| 3 | Generate pop-ups as well. | Add | B-12: 11 pop-ups | More surfaces |
| 4 | Even the PIN can be skipped. | Remove | B-13 | Less required |
| 5 | Re-export to Figma. | Process | Full export | None |
| 6 | (Screenshot) I don't need to know what is in the account. I only need to know how much someone will spend in a week while making a plan. | Remove | B-16: balance never asked | Fewer questions |
| 7 | Making a plan and adding income are two different things; onboarding needs neither balance nor income; Home holds "Make a plan" until one is set; Income holds splitting; after a week or a month, ask "here is how you spend, want a plan?" | Add / restructure | B-17 to B-20 | Plan moved out of onboarding; two new offers |
| 8 | Make this a slider. | Clarify | Slider for the saving split | Same content, different control |
| 9 | If I add an income and split it I should also be able to split for categories, and that becomes my plan. | Add | B-21 | More steps |
| 10 | How long should it last needs to be specific: from a few days to 2 years, maybe a calendar. Multiple incomes with different date ranges; the weekly plan made automatically; leftovers go to savings. Now the subscriptions: is this system good? | Add (three requests) | B-22, B-23 | Date ranges, calendar, income list |
| 11 | I need flexibility to type my own subscriptions, duration and due date; recommended ones stay. Let's make the plan snap to weeks so I don't face mid-week issues. Friend money too. Yes, use that system. | Add / Remove | B-24 (snap, simplifies), B-25 to B-28 | Net more |
| 12 | Let's only go by weekly budgeting. Is there a good reason? I need to validate this. Fix flaws and logical gaps. | Process / Evidence | `weekly_budget_validation.md`, B-29 to B-33 | Edge-case rules |
| 13 | (Figma link) Look at this file and update my mockup. If income is added mid-week split it day-wise and add only this week's share. Use these kinds of gradients. Green or amber gradient for on pace or overspending. End of week: show ideal category-wise vs actual. The PIN keypad should be at the bottom. | Look / Add / Fix | B-34 to B-38 | More states, more explanation |
| 14 | If UPI is connected in onboarding, prompt a split of the balance and ask how long it should last. When UPI is linked, incoming money waits in the Income tab to be assigned. There's a rectangle behind Pay. Give me an account with six months of data. | Add / Fix | B-39 to B-42 | More |
| 15 | The colour can also differ; the other screens seem to be from the last iteration, not the new gradient system. Finally go through and fix all logical issues and (message cut off) | Look / Fix | B-43, B-44 | Per-tab colours; logic fixes |
| 16 | It's not evident that the + and − relate to last week. The "you spend most around" insight should be more prominent. I can flip through other months, which is very important, but I can't tell what date, month or day I'm on. How can I assign a category if there are only these seven? I need search and custom categories. | **Clarify** x2, Add | B-45 to B-47 (labels, nav, search) | More text and controls added to explain |
| 17 | Update Figma. | Process | Partial then full export | None |
| 18 | The main problem on the main page: I can't see what 1 tile means, and I don't know how much I have left for the week. Both have to be there and emphasised. For a new user who hasn't set anything up, "Make your plan" has to be emphasised; if no budget is set, show how much is spent. "Make your plan" is the same as new income. Add cross marks for the defaults; I can't tell if they're selected or deselected. | **Clarify** x3 | B-48 to B-50 (a big number, a chip, ×/+ marks) | Three additions to explain the grid and the chips |
| 19 | Why is this interrupting setting a budget? Let this be the end. | Remove | B-51 (move "two quick things" to the end) | Reordered |
| 20 | I should be able to add more categories here if I want. | Add | B-52 | More |
| 21 | Push the update to Figma. | Process | Partial export | None |
| 22 | The constant reviews I'm getting: very hard to follow, too much info in every screen. Where am I going wrong? Audit and make v15 on what you learn. Something about the information architecture isn't working. | **Evidence** (reviewers) | `v15_audit.md`, v15 (V15-1 to V15-12) | Large reduction |
| 23 | How do we make someone understand the grid well? Insights can be its own tab with the v14 visuals improved. There's no way to input a one-off payment. This is great but I'm losing functionality, and every screen needs better visual hierarchy. Fix logical flaws. | **Clarify** (grid), Add x2, Restore, Look, Fix | V15-13 to V15-18 | Net more, in return for hierarchy |
| 24 | What does "2 times of 7" even mean? | **Clarify** | Rewording, row hint | Slightly more text |
| 25 | Add pop-ups the first time anything happens, to make the user understand. | **Clarify** answered with Add | V15-19 (tips) | 14 new tip surfaces |
| 26 | Make it simple: only rupees makes sense, not times, in Insights. | Remove | V15-20 | Less |
| 27 | Another round of thorough research; all decisions and viz data; a comprehensive doc of everything v1 to v15 and why my working is not leading to the outcome. Put it in the main folder. | Process | `RESEARCH.md` | Document |
| 28 | The point that no version was put in front of students is wrong. I know it's not working because every version has been shown to people, and that is how I know the gaps. | Evidence | Part 8.1 rewritten | None |
| 29 | It was mostly design students and most reviews said "too much information, what do I look at, I can't understand". The reviews about losing functionality are mine, my intuition speaking. | Evidence | Part 8.4 rewritten | None |
| 30 | Nothing is really constructive; it's mostly that the questions are hard to understand or "what will a new user do"; the grid is hard to understand. Maybe the viz are wrong. The research doc can be even more comprehensive, about 5000 lines. | Evidence / Clarify | Parts 11 and 12; this appendix; a test harness for the Home picture | Document, plus a test switch |

### F.1 Tally (my count)
- **Requests that added** something visible or a capability: 20 (rows 3, 7, 9, 10, 11, 13, 14, 16, 18, 20, 23, 25 and sub-requests).
- **Requests that removed** or made something optional: 8 (rows 1, 2, 4, 6, 11 in part, 19, 22, 26).
- **Comprehension complaints raised by Tarun himself about the build** (rows 16, 18, 23, 24, 25, 30): **6 messages containing 9 separate complaints**, and **every one was answered by adding something** (a label, a chip, a number, a sheet, a tip). None was answered by removing the thing that was unclear.

### F.2 What the ledger shows
1. **Tarun's own use of the product reproduces the reviewers' problem.** He could not tell what a tile meant, whether chips were selected, what "+" and "−" referred to, what "2 times of 7" counted, or what date range he was looking at. That is the same class of complaint as "what do I look at, I can't understand", from the person who designed it, which is strong evidence that the problem is real and not about the reviewers.
2. **"Explain by adding" is the response pattern.** A comprehension problem was met with more text, more chips, more tips. Each addition made the next screen heavier and moved the project back towards "too much information".
3. **Requests that removed content were the ones that reduced the first-run load** (rows 1, 2, 4, 6, 19). Those were the most successful changes by the reviewers' own measure.
4. **No row asks "who is this for".** There is no message about a specific student, a task, or a moment of use.
5. **Intuition requests ("I'm losing functionality") arrive immediately after a reduction** (row 23 follows row 22) and the response was to restore much of it the same day.


---

## Appendix G. Screen inventory with density measurements
Measured by `archive/session-workfiles/audit/density.js` in a browser at phone size, with first-time tips off. *Words* are all visible words on the screen (grid cell labels and day numbers count), *₹ values* is the number of rupee amounts shown, *Taps* is the number of visible tappable elements (including the tab bar and keypad keys), *Phone-heights* is how many phone screens tall the content is. Targets set in v15 (V15-1): at most 25 words, 3 ₹ values, 4 taps outside the keypad and tab bar, 1 phone-height.

### G.1 v15 core states (55)
| ID | Section | Screen | Words | ₹ values | Taps | Phone-heights |
|---|---|---|---|---|---|---|
| o1 | v15 | Onboarding · start | 8 | 0 | 2 | 1 |
| o2 | v15 | Onboarding · how to see spends | 18 | 0 | 4 | 1 |
| o3 | v15 | Onboarding · bank | 21 | 0 | 7 | 1 |
| o4 | v15 | Onboarding · approve | 20 | 0 | 4 | 1 |
| o5 | v15 | Onboarding · categories | 40 | 0 | 10 | 1 |
| h1 | v15 | Home · on pace | 13 | 2 | 4 | 1 |
| h2 | v15 | Home · ahead of pace | 16 | 2 | 4 | 1 |
| h3 | v15 | Home · unsorted | 22 | 2 | 5 | 1 |
| h4 | v15 | Home · week used up | 15 | 2 | 4 | 1 |
| h5 | v15 | Home · six months | 19 | 3 | 5 | 1 |
| h6 | v15 | Home · no plan, with spends | 16 | 0 | 2 | 1 |
| h7 | v15 | Home · no plan, fresh | 14 | 0 | 4 | 1 |
| s1 | v15 | Spending · categories | 36 | 0 | 11 | 1 |
| s2 | v15 | Spending · categories (no plan) | 18 | 4 | 8 | 1 |
| s3 | v15 | Spending · history | 30 | 8 | 11 | 1 |
| n1 | v15 | Insights · when | 39 | 2 | 36 | 1 |
| n2 | v15 | Insights · when (week) | 39 | 2 | 36 | 1 |
| n3 | v15 | Insights · repeats | 35 | 5 | 8 | 1 |
| n4 | v15 | Insights · vs last week | 33 | 5 | 7 | 1 |
| n5 | v15 | Insights · empty | 25 | 0 | 8 | 1 |
| q1 | v15 | Grid · how to read | 13 | 2 | 4 | 1 |
| q2 | v15 | Grid · how to read (no plan) | 20 | 2 | 5 | 1 |
| q3 | v15 | Pay · one-off name | 15 | 1 | 9 | 1 |
| q4 | v15 | Pay · one-off paid from | 10 | 1 | 2 | 1 |
| q5 | v15 | Pay · for what (one-off picked) | 27 | 1 | 12 | 1 |
| q6 | v15 | UPI · how much to save | 16 | 3 | 3 | 1 |
| q7 | v15 | UPI · how long | 29 | 1 | 10 | 1 |
| s7 | v15 | Spending · category | 14 | 2 | 3 | 1 |
| s8 | v15 | Spending · category (no plan) | 12 | 2 | 2 | 1 |
| s9 | v15 | Spending · subscriptions | 36 | 0 | 11 | 1 |
| m1 | v15 | Money · no income | 18 | 0 | 4 | 1 |
| m2 | v15 | Money · income | 21 | 1 | 5 | 1 |
| m3 | v15 | Money · savings, none | 14 | 0 | 3 | 1 |
| m4 | v15 | Money · savings | 17 | 1 | 6 | 1 |
| m5 | v15 | Money · incomes list | 21 | 1 | 5 | 1 |
| p1 | v15 | Pay · how much | 18 | 1 | 13 | 1 |
| p2 | v15 | Pay · for what | 28 | 1 | 12 | 1 |
| p3 | v15 | Pay · confirm | 36 | 4 | 4 | 1 |
| p4 | v15 | Pay · no plan, for what | 25 | 1 | 10 | 1 |
| i1 | v15 | Plan · how much came in | 23 | 1 | 14 | 1 |
| i2 | v15 | Plan · how much to save | 23 | 4 | 4 | 1 |
| i3 | v15 | Plan · until when | 25 | 1 | 9 | 1 |
| i4 | v15 | Plan · pick a date | 70 | 1 | 41 | 1 |
| w1 | v15 | Week review | 11 | 1 | 2 | 1 |
| a1 | v15 | Ask · PIN | 16 | 0 | 2 | 1 |
| a2 | v15 | Ask · make a plan | 21 | 0 | 2 | 1 |
| u1 | v15 | Add subscription | 14 | 0 | 10 | 1 |
| u2 | v15 | Subscription detail | 36 | 0 | 11 | 1 |
| g1 | v15 | Goal | 12 | 2 | 3 | 1 |
| g2 | v15 | Add a goal | 13 | 1 | 5 | 1 |
| v1 | v15 | Sort your payments | 24 | 2 | 3 | 1 |
| v2 | v15 | Sort · pick | 24 | 2 | 3 | 1 |
| t1 | v15 | Payment detail | 28 | 2 | 3 | 1 |
| l1 | v15 | Lock | 17 | 0 | 12 | 1 |
| z1 | v15 | Settings | 13 | 2 | 4 | 1 |

### G.2 v14 states (116)
| ID | Section | Screen | Words | ₹ values | Taps | Phone-heights |
|---|---|---|---|---|---|---|
| o01 | 01 Onboarding | 1 · Title | 8 | 0 | 2 | 1 |
| o02 | 01 Onboarding | 2 · PIN (skippable) | 25 | 0 | 12 | 1 |
| o03 | 01 Onboarding | 2b · Type it again | 25 | 0 | 13 | 1 |
| o04 | 01 Onboarding | 2c · PIN mismatch | 28 | 0 | 13 | 1 |
| o05 | 01 Onboarding | 3 · How Trickle sees your money | 29 | 0 | 4 | 1 |
| o06 | 01 Onboarding | 3a · Choose your bank (UPI) | 21 | 0 | 7 | 1 |
| o07 | 01 Onboarding | 3b · Approve in UPI | 27 | 0 | 4 | 1 |
| o08 | 01 Onboarding | 3c · Link did not go through | 28 | 0 | 3 | 1 |
| o09 | 01 Onboarding | UPI · Balance found, how much to save | 33 | 3 | 4 | 1 |
| o10 | 01 Onboarding | UPI · How long should it last | 112 | 4 | 42 | 1.2 |
| o11 | 01 Onboarding | 4 · Two quick things (last step) | 35 | 0 | 6 | 1 |
| o12 | 01 Onboarding | 3 · What do you spend on | 61 | 0 | 18 | 1 |
| o13 | 01 Onboarding | 3 · Category search (no match) | 43 | 0 | 11 | 1 |
| o14 | 01 Onboarding | Plan · Any subscriptions | 27 | 5 | 7 | 1 |
| o15 | 01 Onboarding | Plan · Add your own subscription | 88 | 7 | 48 | 1.4 |
| o16 | 01 Onboarding | Plan · How much for each (equal) | 79 | 15 | 18 | 1.6 |
| o17 | 01 Onboarding | Plan · How much for each (my way) | 71 | 13 | 20 | 1.6 |
| o18 | 01 Onboarding | All set (with a plan) | 25 | 3 | 1 | 1 |
| o19 | 01 Onboarding | All set (just tracking) | 22 | 0 | 1 | 1 |
| l01 | 02 Lock | Locked | 17 | 0 | 12 | 1 |
| l02 | 02 Lock | Wrong PIN | 18 | 0 | 12 | 1 |
| h01 | 03 Home | Home · on pace (green) | 22 | 3 | 2 | 1 |
| h02 | 03 Home | Home · ahead of pace (amber) | 29 | 3 | 2 | 1 |
| h03 | 03 Home | Home · unsorted payment + subscription due | 40 | 3 | 4 | 1.1 |
| h04 | 03 Home | Home · link needs refresh | 34 | 3 | 3 | 1 |
| h05 | 03 Home | Home · week used up | 26 | 3 | 2 | 1 |
| h06 | 03 Home | Home · six months in | 28 | 3 | 3 | 1 |
| h07 | 03 Home | Home · plan is about to drop | 39 | 4 | 4 | 1.1 |
| p01 | 04 Pay | 1 · Amount and what for | 57 | 1 | 30 | 1 |
| p02 | 04 Pay | 1 · Amount typed, category chosen | 57 | 1 | 30 | 1 |
| p03 | 04 Pay | 1 · Savings tab | 34 | 1 | 22 | 1 |
| p04 | 04 Pay | 2 · Pay screen (within budget) | 24 | 3 | 3 | 1 |
| p05 | 04 Pay | 2 · Pay screen (over a budget) | 32 | 4 | 4 | 1 |
| p06 | 04 Pay | 2 · Where it comes from | 38 | 7 | 4 | 1 |
| p07 | 04 Pay | 2 · Goal is short | 36 | 4 | 4 | 1 |
| p08 | 04 Pay | 3 · Approve in UPI | 20 | 1 | 2 | 1 |
| p09 | 04 Pay | 3 · Waiting for the bank | 19 | 0 | 2 | 1 |
| p10 | 04 Pay | 4 · Paid | 39 | 4 | 1 | 1 |
| p11 | 04 Pay | 4 · Failed | 33 | 1 | 2 | 1 |
| p12 | 04 Pay | 1 · Other category (search) | 57 | 1 | 30 | 1 |
| m01 | 05 Move money | Move · from free savings | 57 | 4 | 23 | 1 |
| m02 | 05 Move money | Move · to a category | 56 | 4 | 23 | 1 |
| m03 | 05 Move money | Move · done | 25 | 2 | 1 | 1 |
| i01 | 06 Income | Income · six months in | 117 | 16 | 8 | 1.9 |
| i02 | 06 Income | Income · money waiting, what is this | 117 | 16 | 8 | 1.9 |
| i03 | 06 Income | Add money · what kind | 117 | 16 | 8 | 1.9 |
| i04 | 06 Income | Add income · how much came in | 23 | 1 | 14 | 1 |
| i05 | 06 Income | Add income · how much to save (slider) | 32 | 4 | 4 | 1 |
| i06 | 06 Income | Add income · until when | 128 | 5 | 41 | 1.3 |
| i07 | 06 Income | Income detail | 117 | 16 | 8 | 1.9 |
| i08 | 06 Income | Change the end date | 77 | 2 | 40 | 1 |
| i09 | 06 Income | One-off money · where does it go | 37 | 1 | 5 | 1 |
| i10 | 06 Income | Income · none yet (tracking) | 37 | 0 | 2 | 1 |
| i11 | 06 Income | Income · plan from a weekly amount | 22 | 2 | 4 | 1 |
| s01 | 07 Spending | Spending (scroll) | 533 | 84 | 90 | 7.2 |
| s02 | 07 Spending | Category · Food | 48 | 5 | 8 | 1.1 |
| s03 | 07 Spending | Everything else | 18 | 0 | 3 | 1 |
| s04 | 07 Spending | Repeat spend | 69 | 2 | 41 | 1 |
| s05 | 07 Spending | Payment detail | 28 | 1 | 3 | 1 |
| s06 | 07 Spending | Re-file a payment | 28 | 1 | 3 | 1 |
| s07 | 07 Spending | Sort your payments | 24 | 2 | 3 | 1 |
| s08 | 07 Spending | Sort · pick a category | 19 | 1 | 2 | 1 |
| s11 | 07 Spending | Share out your week (budget) | 48 | 11 | 15 | 1.6 |
| s13 | 07 Spending | Fit to my real weeks | 48 | 11 | 15 | 1.6 |
| g01 | 08 Savings | Savings | 20 | 0 | 3 | 1 |
| g02 | 08 Savings | Goal · Laptop | 42 | 4 | 18 | 1 |
| g03 | 08 Savings | Free savings | 25 | 1 | 2 | 1 |
| g04 | 08 Savings | Edit a goal | 42 | 4 | 18 | 1 |
| g05 | 08 Savings | Add a goal | 20 | 0 | 3 | 1 |
| n01 | 09 Insights | Insights · day | 155 | 18 | 36 | 1.9 |
| n02 | 09 Insights | Insights · week | 147 | 18 | 40 | 2 |
| n03 | 09 Insights | Insights · last month | 173 | 18 | 42 | 2 |
| w01 | 10 Week review | Week review · six months in | 85 | 16 | 1 | 1.1 |
| w02 | 10 Week review | Week review · on pace | 90 | 17 | 1 | 1.1 |
| w03 | 10 Week review | Week review · over | 84 | 16 | 1 | 1.1 |
| c01 | 11 Goal reached | Goal reached | 13 | 1 | 2 | 1 |
| c02 | 11 Goal reached | Goal done | 10 | 1 | 1 | 1 |
| t01 | 12 Settings | Settings | 22 | 3 | 2 | 1 |
| t02 | 12 Settings | Account and linking | 22 | 3 | 2 | 1 |
| t03 | 12 Settings | Notifications | 22 | 3 | 2 | 1 |
| t04 | 12 Settings | PIN and lock | 22 | 3 | 2 | 1 |
| t05 | 12 Settings | Change PIN | 22 | 3 | 2 | 1 |
| t06 | 12 Settings | Data | 22 | 3 | 2 | 1 |
| t07 | 12 Settings | Import a spreadsheet | 22 | 3 | 2 | 1 |
| t08 | 12 Settings | Delete everything | 22 | 3 | 2 | 1 |
| k01 | 13 Pop-ups | Link UPI? | 15 | 0 | 2 | 1 |
| k02 | 13 Pop-ups | Add a spend? | 13 | 0 | 2 | 1 |
| k03 | 13 Pop-ups | Payments need a place | 14 | 0 | 2 | 1 |
| k04 | 13 Pop-ups | Set a limit? | 15 | 2 | 2 | 1 |
| k05 | 13 Pop-ups | Make a plan? | 21 | 0 | 2 | 1 |
| k06 | 13 Pop-ups | Add your income? | 15 | 0 | 2 | 1 |
| k07 | 13 Pop-ups | Add a goal? | 14 | 0 | 2 | 1 |
| k08 | 13 Pop-ups | Remind about bills? | 13 | 0 | 2 | 1 |
| k09 | 13 Pop-ups | Add a PIN? | 16 | 0 | 2 | 1 |
| k10 | 13 Pop-ups | Bring in older spends? | 15 | 0 | 2 | 1 |
| k11 | 13 Pop-ups | Week recap (no budget) | 10 | 2 | 1 | 1 |
| k12 | 13 Pop-ups | Is Netflix a subscription? | 14 | 1 | 2 | 1 |
| r01 | 14 Track mode | Home · fresh week | 31 | 1 | 3 | 1 |
| r02 | 14 Track mode | Home · with spends and nudges | 37 | 2 | 4 | 1.1 |
| r03 | 14 Track mode | Add a spend (search categories) | 58 | 2 | 26 | 1.2 |
| r04 | 14 Track mode | Spending | 94 | 16 | 17 | 1.6 |
| r05 | 14 Track mode | Category · no limit | 36 | 6 | 5 | 1.1 |
| r06 | 14 Track mode | Category · with a limit | 45 | 8 | 6 | 1.2 |
| r07 | 14 Track mode | Sort your payments | 24 | 2 | 3 | 1 |
| r08 | 14 Track mode | Income · none yet | 37 | 0 | 2 | 1 |
| r09 | 14 Track mode | Savings · no goals yet | 25 | 0 | 1 | 1 |
| r10 | 14 Track mode | Insights | 145 | 15 | 35 | 1.8 |
| u01 | 15 Subscriptions | Add a subscription | 88 | 7 | 48 | 1.4 |
| u02 | 15 Subscriptions | Add a subscription · filled in | 88 | 7 | 48 | 1.4 |
| u03 | 15 Subscriptions | Add a subscription · takes too much | 105 | 10 | 48 | 1.5 |
| u04 | 15 Subscriptions | Subscription | 533 | 84 | 90 | 7.2 |
| u05 | 15 Subscriptions | Subscription · paused | 533 | 84 | 90 | 7.2 |
| v01 | 16 Categories | Sort a payment · pick a category | 24 | 2 | 3 | 1 |
| v02 | 16 Categories | Sort a payment · create your own | 24 | 2 | 3 | 1 |
| v03 | 16 Categories | Sort a payment · search | 24 | 2 | 3 | 1 |
| v04 | 16 Categories | Change a payment’s category | 28 | 1 | 3 | 1 |


---

## Appendix H. Copy inventory
Every visible text string, extracted from the rendered screens (`copy.js`). Bare numbers, currency amounts and symbols are left out. *Jargon terms* are the words from the project's own vocabulary that appear in the string (Appendix T.1).

### H.1 Summary
| Measure | v14 (116 states) | v15 (55 core states) |
|---|---|---|
| Visible text strings (excluding bare numbers) | 2079 | 539 |
| Strings per state | 17.9 | 9.8 |
| Average words per string | 2.7 | 2.3 |
| Strings longer than 8 words | 3% | 3% |
| Titles and questions | 184 | 60 |
| Average words in a title or question | 2.7 | 3.0 |
| Titles or questions longer than 8 words (the project's own rule, B-10) | 0 | 0 |

### H.2 Terms the user must understand
| Term the user must understand | Strings in v14 | Strings in v15 |
|---|---|---|
| box | 36 | 13 |
| category | 31 | 8 |
| plan | 24 | 11 |
| income | 30 | 3 |
| upi | 21 | 8 |
| savings | 20 | 9 |
| pace | 18 | 7 |
| subscription | 18 | 2 |
| subscriptions | 16 | 3 |
| buffer | 16 | 1 |
| goal | 11 | 5 |
| split | 14 | 1 |
| one-off | 6 | 7 |
| weekly | 10 | 3 |
| link | 9 | 3 |
| budget | 12 | 0 |
| categories | 5 | 6 |
| limit | 5 | 2 |
| boxes | 0 | 4 |
| unsorted | 3 | 0 |
| limits | 0 | 3 |
| goals | 2 | 0 |
| detected | 1 | 1 |
| fixed | 1 | 0 |

### H.3 v15: every string, by screen
| State | String | Words | Jargon terms |
|---|---|---|---|
| o1 Onboarding · start | Trickle | 1 |  |
| o1 Onboarding · start | Spend calm. | 2 |  |
| o1 Onboarding · start | Get started | 2 |  |
| o1 Onboarding · start | Just start tracking | 3 |  |
| o2 Onboarding · how to see spends | ‹ Back | 1 |  |
| o2 Onboarding · how to see spends | Step 1 of 2 | 4 |  |
| o2 Onboarding · how to see spends | How should we see your spends? | 6 |  |
| o2 Onboarding · how to see spends | Link UPI | 2 | link, upi |
| o2 Onboarding · how to see spends | I'll add them | 3 |  |
| o2 Onboarding · how to see spends | Skip | 1 |  |
| o3 Onboarding · bank | ‹ Back | 1 |  |
| o3 Onboarding · bank | Choose your bank | 3 |  |
| o3 Onboarding · bank | Enter UPI ID | 3 | upi |
| o3 Onboarding · bank | Detected UPI | 2 | detected, upi |
| o3 Onboarding · bank | user1@oksbi | 2 |  |
| o3 Onboarding · bank | user2@axis | 2 |  |
| o3 Onboarding · bank | user3@okhdfc | 2 |  |
| o3 Onboarding · bank | user4@oksbi | 2 |  |
| o3 Onboarding · bank | user5@oksbi | 2 |  |
| o4 Onboarding · approve | ‹ Back | 1 |  |
| o4 Onboarding · approve | Approve in your UPI app | 5 | upi |
| o4 Onboarding · approve | It cannot move money. | 4 |  |
| o4 Onboarding · approve | Approve in UPI | 3 | upi |
| o4 Onboarding · approve | Not now | 2 |  |
| o4 Onboarding · approve | Simulate: bank says no | 4 |  |
| o5 Onboarding · categories | ‹ Back | 1 |  |
| o5 Onboarding · categories | Step 2 of 2 | 4 |  |
| o5 Onboarding · categories | What do you spend on? | 5 |  |
| o5 Onboarding · categories | Tap a few. Add your own. | 6 |  |
| o5 Onboarding · categories | Food × | 1 |  |
| o5 Onboarding · categories | Travel × | 1 |  |
| o5 Onboarding · categories | Phone & data × | 2 |  |
| o5 Onboarding · categories | + College & study | 2 |  |
| o5 Onboarding · categories | + Snacks | 1 |  |
| o5 Onboarding · categories | + Chai & coffee | 2 |  |
| o5 Onboarding · categories | Next | 1 |  |
| o5 Onboarding · categories | Skip, use the basics | 4 |  |
| h1 Home · on pace | Fri, 2 Oct | 3 |  |
| h1 Home · on pace | On pace. | 2 | pace |
| h1 Home · on pace | left | 1 |  |
| h1 Home · on pace | 1 box ≈ ₹16 ⓘ | 3 | box |
| h1 Home · on pace | Pay | 1 |  |
| h2 Home · ahead of pace | Fri, 2 Oct | 3 |  |
| h2 Home · ahead of pace | A bit ahead of pace. | 5 | pace |
| h2 Home · ahead of pace | left | 1 |  |
| h2 Home · ahead of pace | 1 box ≈ ₹16 ⓘ | 3 | box |
| h2 Home · ahead of pace | Pay | 1 |  |
| h3 Home · unsorted | Fri, 2 Oct | 3 |  |
| h3 Home · unsorted | A bit ahead of pace. | 5 | pace |
| h3 Home · unsorted | left | 1 |  |
| h3 Home · unsorted | 1 box ≈ ₹16 ⓘ | 3 | box |
| h3 Home · unsorted | 1 payment needs a category | 5 | category |
| h3 Home · unsorted | Pay | 1 |  |
| h4 Home · week used up | Fri, 2 Oct | 3 |  |
| h4 Home · week used up | Gone over a little. | 4 |  |
| h4 Home · week used up | left | 1 |  |
| h4 Home · week used up | 1 box ≈ ₹16 ⓘ | 3 | box |
| h4 Home · week used up | Pay | 1 |  |
| h5 Home · six months | Fri, 2 Oct | 3 |  |
| h5 Home · six months | On pace. | 2 | pace |
| h5 Home · six months | left | 1 |  |
| h5 Home · six months | 1 box ≈ ₹7 ⓘ | 3 | box |
| h5 Home · six months | ₹200 came in from Rahul | 5 |  |
| h5 Home · six months | Pay | 1 |  |
| h6 Home · no plan, with spends | Safety | 1 |  |
| h6 Home · no plan, with spends | Lock Trickle with a PIN? | 5 |  |
| h6 Home · no plan, with spends | You can add it any time. | 6 |  |
| h6 Home · no plan, with spends | Add PIN | 2 |  |
| h6 Home · no plan, with spends | No thanks | 2 |  |
| h7 Home · no plan, fresh | Fri, 2 Oct | 3 |  |
| h7 Home · no plan, fresh | A fresh week. | 3 |  |
| h7 Home · no plan, fresh | Make your plan | 3 | plan |
| h7 Home · no plan, fresh | Add a spend | 3 |  |
| s1 Spending · categories | Categories | 1 | categories |
| s1 Spending · categories | History | 1 |  |
| s1 Spending · categories | Food | 1 |  |
| s1 Spending · categories | low left | 2 |  |
| s1 Spending · categories | Outings | 1 |  |
| s1 Spending · categories | some left | 2 |  |
| s1 Spending · categories | Travel | 1 |  |
| s1 Spending · categories | Snacks | 1 |  |
| s1 Spending · categories | Chai & coffee | 2 |  |
| s1 Spending · categories | College & study | 2 |  |
| s1 Spending · categories | Phone & data | 2 |  |
| s1 Spending · categories | plenty left | 2 |  |
| s1 Spending · categories | Subscriptions | 1 | subscriptions |
| s1 Spending · categories | Edit weekly limits | 3 | limits, weekly |
| s2 Spending · categories (no plan) | Categories | 1 | categories |
| s2 Spending · categories (no plan) | History | 1 |  |
| s2 Spending · categories (no plan) | College & study | 2 |  |
| s2 Spending · categories (no plan) | Food | 1 |  |
| s2 Spending · categories (no plan) | Travel | 1 |  |
| s2 Spending · categories (no plan) | Phone & data | 2 |  |
| s2 Spending · categories (no plan) | Snacks | 1 |  |
| s2 Spending · categories (no plan) | Chai & coffee | 2 |  |
| s3 Spending · history | Categories | 1 | categories |
| s3 Spending · history | History | 1 |  |
| s3 Spending · history | Today | 1 |  |
| s3 Spending · history | Snack Corner | 2 |  |
| s3 Spending · history | Yesterday | 1 |  |
| s3 Spending · history | Bakery | 1 |  |
| s3 Spending · history | Canteen | 1 |  |
| s3 Spending · history | Cafe Coffee Corner | 3 |  |
| s3 Spending · history | Wed, 30 Sept | 3 |  |
| s3 Spending · history | PVR Cinemas | 2 |  |
| s3 Spending · history | Auto | 1 |  |
| s3 Spending · history | Mess | 1 |  |
| s3 Spending · history | Uber | 1 |  |
| s3 Spending · history | Show all | 2 |  |
| n1 Insights · when | When | 1 |  |
| n1 Insights · when | Repeats | 1 |  |
| n1 Insights · when | Vs last week | 3 |  |
| n1 Insights · when | You spend most on | 4 |  |
| n1 Insights · when | Tue afternoon | 2 |  |
| n1 Insights · when | ₹95 of ₹280 this week | 5 |  |
| n1 Insights · when | This week | 2 |  |
| n1 Insights · when | M | 1 |  |
| n1 Insights · when | T | 1 |  |
| n1 Insights · when | W | 1 |  |
| n1 Insights · when | F | 1 |  |
| n1 Insights · when | S | 1 |  |
| n1 Insights · when | Top to bottom: morning to night. Tap a spot. | 9 |  |
| n1 Insights · when | Day | 1 |  |
| n1 Insights · when | Week | 1 |  |
| n1 Insights · when | Month | 1 |  |
| n2 Insights · when (week) | When | 1 |  |
| n2 Insights · when (week) | Repeats | 1 |  |
| n2 Insights · when (week) | Vs last week | 3 |  |
| n2 Insights · when (week) | You spend most on | 4 |  |
| n2 Insights · when (week) | Tue afternoon | 2 |  |
| n2 Insights · when (week) | ₹95 of ₹280 this week | 5 |  |
| n2 Insights · when (week) | This week | 2 |  |
| n2 Insights · when (week) | M | 1 |  |
| n2 Insights · when (week) | T | 1 |  |
| n2 Insights · when (week) | W | 1 |  |
| n2 Insights · when (week) | F | 1 |  |
| n2 Insights · when (week) | S | 1 |  |
| n2 Insights · when (week) | Top to bottom: morning to night. Tap a spot. | 9 |  |
| n2 Insights · when (week) | Day | 1 |  |
| n2 Insights · when (week) | Week | 1 |  |
| n2 Insights · when (week) | Month | 1 |  |
| n3 Insights · repeats | When | 1 |  |
| n3 Insights · repeats | Repeats | 1 |  |
| n3 Insights · repeats | Vs last week | 3 |  |
| n3 Insights · repeats | The spend that repeats most | 5 |  |
| n3 Insights · repeats | Maggi Point | 2 |  |
| n3 Insights · repeats | ₹215 in 30 days | 4 |  |
| n3 Insights · repeats | Xerox Shop | 2 |  |
| n3 Insights · repeats | Cafe Coffee Corner | 3 |  |
| n3 Insights · repeats | Snack Corner | 2 |  |
| n3 Insights · repeats | Sharma Tea Stall | 3 |  |
| n3 Insights · repeats | See Maggi Point by day | 5 |  |
| n4 Insights · vs last week | When | 1 |  |
| n4 Insights · vs last week | Repeats | 1 |  |
| n4 Insights · vs last week | Vs last week | 3 |  |
| n4 Insights · vs last week | ₹330 more than last week. | 5 |  |
| n4 Insights · vs last week | Same days of the week. | 5 |  |
| n4 Insights · vs last week | Last | 1 |  |
| n4 Insights · vs last week | This | 1 |  |
| n4 Insights · vs last week | Food | 1 |  |
| n4 Insights · vs last week | ↑ ₹75 | 1 |  |
| n4 Insights · vs last week | Travel | 1 |  |
| n4 Insights · vs last week | ↑ ₹40 | 1 |  |
| n4 Insights · vs last week | College & study | 2 |  |
| n4 Insights · vs last week | ↓ ₹25 | 1 |  |
| n4 Insights · vs last week | Chai & coffee | 2 |  |
| n5 Insights · empty | When | 1 |  |
| n5 Insights · empty | Repeats | 1 |  |
| n5 Insights · empty | Vs last week | 3 |  |
| n5 Insights · empty | Nothing in this week. | 4 |  |
| n5 Insights · empty | This week | 2 |  |
| n5 Insights · empty | Top to bottom: morning to night. Tap a spot. | 9 |  |
| n5 Insights · empty | Day | 1 |  |
| n5 Insights · empty | Week | 1 |  |
| n5 Insights · empty | Month | 1 |  |
| q1 Grid · how to read | Fri, 2 Oct | 3 |  |
| q1 Grid · how to read | On pace. | 2 | pace |
| q1 Grid · how to read | left | 1 |  |
| q1 Grid · how to read | 1 box ≈ ₹16 ⓘ | 3 | box |
| q1 Grid · how to read | Pay | 1 |  |
| q1 Grid · how to read | How to read it | 4 |  |
| q1 Grid · how to read | 100 boxes. That is your week. | 6 | boxes |
| q1 Grid · how to read | Each box is about ₹16. Spend ₹160 and the dashed 10 boxes go. | 13 | box, boxes |
| q1 Grid · how to read | Got it | 2 |  |
| q2 Grid · how to read (no plan) | Fri, 2 Oct | 3 |  |
| q2 Grid · how to read (no plan) | ₹915 so far. | 3 |  |
| q2 Grid · how to read (no plan) | spent this week | 3 |  |
| q2 Grid · how to read (no plan) | 1 box ≈ ₹10 ⓘ | 3 | box |
| q2 Grid · how to read (no plan) | Make your plan | 3 | plan |
| q2 Grid · how to read (no plan) | Pay | 1 |  |
| q2 Grid · how to read (no plan) | How to read it | 4 |  |
| q2 Grid · how to read (no plan) | Boxes fill as you spend. | 5 | boxes |
| q2 Grid · how to read (no plan) | Each box is about ₹10. Add a spend and a box fills. | 12 | box |
| q2 Grid · how to read (no plan) | Got it | 2 |  |
| q3 Pay · one-off name | ‹ Back | 1 |  |
| q3 Pay · one-off name | ₹4,000 · one-off | 3 | one-off |
| q3 Pay · one-off name | What was it? | 3 |  |
| q3 Pay · one-off name | Trip | 1 |  |
| q3 Pay · one-off name | Gift | 1 |  |
| q3 Pay · one-off name | Repair | 1 |  |
| q3 Pay · one-off name | Fees | 1 |  |
| q3 Pay · one-off name | Medical | 1 |  |
| q3 Pay · one-off name | Event | 1 |  |
| q3 Pay · one-off name | Skip | 1 |  |
| q4 Pay · one-off paid from | ‹ Back | 1 |  |
| q4 Pay · one-off paid from | ₹4,000 · Repair | 3 |  |
| q4 Pay · one-off paid from | Paid from? | 2 |  |
| q4 Pay · one-off paid from | Outside my plan | 3 | plan |
| q5 Pay · for what (one-off picked) | ‹ Back | 1 |  |
| q5 Pay · for what (one-off picked) | For what? | 2 |  |
| q5 Pay · for what (one-off picked) | Food | 1 |  |
| q5 Pay · for what (one-off picked) | Outings | 1 |  |
| q5 Pay · for what (one-off picked) | Travel | 1 |  |
| q5 Pay · for what (one-off picked) | Chai & coffee | 2 |  |
| q5 Pay · for what (one-off picked) | Snacks | 1 |  |
| q5 Pay · for what (one-off picked) | Phone & data | 2 |  |
| q5 Pay · for what (one-off picked) | College & study | 2 |  |
| q5 Pay · for what (one-off picked) | One-off | 1 | one-off |
| q5 Pay · for what (one-off picked) | outside your plan | 3 | plan |
| q5 Pay · for what (one-off picked) | + Other | 1 |  |
| q5 Pay · for what (one-off picked) | From savings | 2 | savings |
| q5 Pay · for what (one-off picked) | Next | 1 |  |
| q6 UPI · how much to save | ₹6,500 in your account | 5 |  |
| q6 UPI · how much to save | How much to save? | 4 |  |
| q6 UPI · how much to save | Saving · | 1 |  |
| q6 UPI · how much to save | 20% | 1 |  |
| q6 UPI · how much to save | Spending | 1 |  |
| q6 UPI · how much to save | Next | 1 |  |
| q6 UPI · how much to save | Skip | 1 |  |
| q7 UPI · how long | ‹ Back | 1 |  |
| q7 UPI · how long | How long should it last? | 5 |  |
| q7 UPI · how long | 1 week | 2 |  |
| q7 UPI · how long | 1 month | 2 |  |
| q7 UPI · how long | 3 months | 2 |  |
| q7 UPI · how long | 6 months | 2 |  |
| q7 UPI · how long | 1 year | 2 |  |
| q7 UPI · how long | 2 years | 2 |  |
| q7 UPI · how long | Pick a date | 3 |  |
| q7 UPI · how long | a week to spend | 4 |  |
| q7 UPI · how long | Next | 1 |  |
| q7 UPI · how long | Skip | 1 |  |
| s7 Spending · category | ‹ Spending | 1 |  |
| s7 Spending · category | Food | 1 |  |
| s7 Spending · category | Running low. | 2 |  |
| s7 Spending · category | ₹130 left · box ≈ ₹5 | 4 | box |
| s7 Spending · category | Pay | 1 |  |
| s7 Spending · category | Change limit | 2 | limit |
| s8 Spending · category (no plan) | ‹ Spending | 1 |  |
| s8 Spending · category (no plan) | Food | 1 |  |
| s8 Spending · category (no plan) | ₹275 this week. | 3 |  |
| s8 Spending · category (no plan) | box ≈ ₹3 | 2 | box |
| s8 Spending · category (no plan) | Set a limit | 3 | limit |
| s9 Spending · subscriptions | Categories | 1 | categories |
| s9 Spending · subscriptions | History | 1 |  |
| s9 Spending · subscriptions | Food | 1 |  |
| s9 Spending · subscriptions | low left | 2 |  |
| s9 Spending · subscriptions | Outings | 1 |  |
| s9 Spending · subscriptions | some left | 2 |  |
| s9 Spending · subscriptions | Travel | 1 |  |
| s9 Spending · subscriptions | Snacks | 1 |  |
| s9 Spending · subscriptions | Chai & coffee | 2 |  |
| s9 Spending · subscriptions | College & study | 2 |  |
| s9 Spending · subscriptions | Phone & data | 2 |  |
| s9 Spending · subscriptions | plenty left | 2 |  |
| s9 Spending · subscriptions | Subscriptions | 1 | subscriptions |
| s9 Spending · subscriptions | Edit weekly limits | 3 | limits, weekly |
| s9 Spending · subscriptions | Found in your UPI payments. About ₹74 a week comes off first. | 12 | upi |
| s9 Spending · subscriptions | Spotify | 1 |  |
| s9 Spending · subscriptions | every month | 2 |  |
| s9 Spending · subscriptions | Netflix | 1 |  |
| s9 Spending · subscriptions | + Add a subscription | 3 | subscription |
| m1 Money · no income | Money in | 2 |  |
| m1 Money · no income | Savings | 1 | savings |
| m1 Money · no income | Money in. | 2 |  |
| m1 Money · no income | Add it, split it. Only if you want. | 8 | split |
| m1 Money · no income | Add income | 2 | income |
| m1 Money · no income | One-off money | 2 | one-off |
| m2 Money · income | Money in | 2 |  |
| m2 Money · income | Savings | 1 | savings |
| m2 Money · income | ₹900 a week to spend. | 5 |  |
| m2 Money · income | Saving 14% | 2 |  |
| m2 Money · income | Spending 86% | 2 |  |
| m2 Money · income | Add income | 2 | income |
| m2 Money · income | Your incomes | 2 |  |
| m2 Money · income | One-off money | 2 | one-off |
| m3 Money · savings, none | Money in | 2 |  |
| m3 Money · savings, none | Savings | 1 | savings |
| m3 Money · savings, none | Saving for something? | 3 |  |
| m3 Money · savings, none | Name it. Pick an amount. | 5 |  |
| m3 Money · savings, none | Add a goal | 3 | goal |
| m4 Money · savings | Money in | 2 |  |
| m4 Money · savings | Savings | 1 | savings |
| m4 Money · savings | ₹23,600 saved. | 3 |  |
| m4 Money · savings | Laptop | 1 |  |
| m4 Money · savings | 36% | 1 |  |
| m4 Money · savings | Goa trip | 2 |  |
| m4 Money · savings | 62% | 1 |  |
| m4 Money · savings | Emergency fund | 2 |  |
| m4 Money · savings | 46% | 1 |  |
| m4 Money · savings | + Add a goal | 3 | goal |
| m5 Money · incomes list | Money in | 2 |  |
| m5 Money · incomes list | Savings | 1 | savings |
| m5 Money · incomes list | ₹900 a week to spend. | 5 |  |
| m5 Money · incomes list | Saving 14% | 2 |  |
| m5 Money · incomes list | Spending 86% | 2 |  |
| m5 Money · incomes list | Add income | 2 | income |
| m5 Money · incomes list | Your incomes | 2 |  |
| m5 Money · incomes list | One-off money | 2 | one-off |
| m5 Money · incomes list | running | 1 |  |
| m5 Money · incomes list | 28 Sept to 27 Dec · ₹8,500 to spend, ₹1,500 saved | 12 |  |
| m5 Money · incomes list | Adds about ₹655 a week to your plan | 8 | plan |
| m5 Money · incomes list | 6 Jul to 29 Nov · ₹5,200 to spend, ₹800 saved | 11 |  |
| m5 Money · incomes list | Adds about ₹250 a week to your plan | 8 | plan |
| m5 Money · incomes list | ended | 1 |  |
| m5 Money · incomes list | 6 Apr to 27 Sept · ₹14,400 to spend, ₹3,600 saved | 12 |  |
| p1 Pay · how much | ‹ Close | 1 |  |
| p1 Pay · how much | Pay | 1 |  |
| p1 Pay · how much | How much? | 2 |  |
| p1 Pay · how much | ⌫ | 0 |  |
| p1 Pay · how much | Next | 1 |  |
| p2 Pay · for what | ‹ Back | 1 |  |
| p2 Pay · for what | For what? | 2 |  |
| p2 Pay · for what | Food | 1 |  |
| p2 Pay · for what | Outings | 1 |  |
| p2 Pay · for what | Travel | 1 |  |
| p2 Pay · for what | Chai & coffee | 2 |  |
| p2 Pay · for what | Snacks | 1 |  |
| p2 Pay · for what | Phone & data | 2 |  |
| p2 Pay · for what | College & study | 2 |  |
| p2 Pay · for what | One-off | 1 | one-off |
| p2 Pay · for what | outside your plan | 3 | plan |
| p2 Pay · for what | + Other | 1 |  |
| p2 Pay · for what | From savings | 2 | savings |
| p2 Pay · for what | Pick one | 2 |  |
| p3 Pay · confirm | ‹ Close | 1 |  |
| p3 Pay · confirm | Paying | 1 |  |
| p3 Pay · confirm | ₹312 · Food | 2 |  |
| p3 Pay · confirm | To Canteen | 2 |  |
| p3 Pay · confirm | 62 boxes go · 1 box ≈ ₹5 | 6 | box, boxes |
| p3 Pay · confirm | ₹182 over. | 2 |  |
| p3 Pay · confirm | Buffer used up. The rest comes from your other categories. | 10 | buffer, categories |
| p3 Pay · confirm | Where it comes from › | 4 |  |
| p3 Pay · confirm | Back | 1 |  |
| p3 Pay · confirm | Pay ₹312 | 2 |  |
| p4 Pay · no plan, for what | ‹ Back | 1 |  |
| p4 Pay · no plan, for what | For what? | 2 |  |
| p4 Pay · no plan, for what | Food | 1 |  |
| p4 Pay · no plan, for what | Travel | 1 |  |
| p4 Pay · no plan, for what | Phone & data | 2 |  |
| p4 Pay · no plan, for what | College & study | 2 |  |
| p4 Pay · no plan, for what | Snacks | 1 |  |
| p4 Pay · no plan, for what | Chai & coffee | 2 |  |
| p4 Pay · no plan, for what | One-off | 1 | one-off |
| p4 Pay · no plan, for what | outside your plan | 3 | plan |
| p4 Pay · no plan, for what | + Other | 1 |  |
| p4 Pay · no plan, for what | Pick one | 2 |  |
| i1 Plan · how much came in | ‹ Close | 1 |  |
| i1 Plan · how much came in | Money in | 2 |  |
| i1 Plan · how much came in | How much came in? | 4 |  |
| i1 Plan · how much came in | ⌫ | 0 |  |
| i1 Plan · how much came in | Next | 1 |  |
| i1 Plan · how much came in | Not now | 2 |  |
| i2 Plan · how much to save | ‹ Back | 1 |  |
| i2 Plan · how much to save | ₹9,000 came in | 4 |  |
| i2 Plan · how much to save | How much to save? | 4 |  |
| i2 Plan · how much to save | Saving · | 1 |  |
| i2 Plan · how much to save | 20% | 1 |  |
| i2 Plan · how much to save | Spending | 1 |  |
| i2 Plan · how much to save | Nothing | 1 |  |
| i2 Plan · how much to save | All of it | 3 |  |
| i2 Plan · how much to save | Next | 1 |  |
| i2 Plan · how much to save | Just add ₹9,000 | 4 |  |
| i3 Plan · until when | ‹ Back | 1 |  |
| i3 Plan · until when | Until when? | 2 |  |
| i3 Plan · until when | 1 week | 2 |  |
| i3 Plan · until when | 1 month | 2 |  |
| i3 Plan · until when | 3 months | 2 |  |
| i3 Plan · until when | 6 months | 2 |  |
| i3 Plan · until when | 1 year | 2 |  |
| i3 Plan · until when | 2 years | 2 |  |
| i3 Plan · until when | Pick a date | 3 |  |
| i3 Plan · until when | a week to spend | 4 |  |
| i3 Plan · until when | Done | 1 |  |
| i4 Plan · pick a date | ‹ Back | 1 |  |
| i4 Plan · pick a date | Until when? | 2 |  |
| i4 Plan · pick a date | 1 week | 2 |  |
| i4 Plan · pick a date | 1 month | 2 |  |
| i4 Plan · pick a date | 3 months | 2 |  |
| i4 Plan · pick a date | 6 months | 2 |  |
| i4 Plan · pick a date | 1 year | 2 |  |
| i4 Plan · pick a date | 2 years | 2 |  |
| i4 Plan · pick a date | Pick a date | 3 |  |
| i4 Plan · pick a date | ₹1,325 a week · until 8 Nov 2026 | 8 |  |
| i4 Plan · pick a date | October 2026 | 2 |  |
| i4 Plan · pick a date | M | 1 |  |
| i4 Plan · pick a date | T | 1 |  |
| i4 Plan · pick a date | W | 1 |  |
| i4 Plan · pick a date | F | 1 |  |
| i4 Plan · pick a date | S | 1 |  |
| i4 Plan · pick a date | Done | 1 |  |
| w1 Week review | You stayed on pace. | 4 | pace |
| w1 Week review | ₹184 moved to savings. | 4 | savings |
| w1 Week review | Done | 1 |  |
| w1 Week review | By category | 2 | category |
| a1 Ask · PIN | Safety | 1 |  |
| a1 Ask · PIN | Lock Trickle with a PIN? | 5 |  |
| a1 Ask · PIN | You can add it any time. | 6 |  |
| a1 Ask · PIN | Add PIN | 2 |  |
| a1 Ask · PIN | No thanks | 2 |  |
| a2 Ask · make a plan | Plan | 1 | plan |
| a2 Ask · make a plan | Make a plan? | 3 | plan |
| a2 Ask · make a plan | Say what you spend in a week. Trickle splits it by category. | 12 | category |
| a2 Ask · make a plan | Make a plan | 3 | plan |
| a2 Ask · make a plan | Not now | 2 |  |
| u1 Add subscription | ‹ Close | 1 |  |
| u1 Add subscription | Which one? | 2 |  |
| u1 Add subscription | Spotify | 1 |  |
| u1 Add subscription | Netflix | 1 |  |
| u1 Add subscription | Wi-Fi | 1 |  |
| u1 Add subscription | Hostel fee | 2 |  |
| u1 Add subscription | Gym | 1 |  |
| u1 Add subscription | Prime | 1 |  |
| u1 Add subscription | YouTube Premium | 2 |  |
| u1 Add subscription | Next | 1 |  |
| u2 Subscription detail | Categories | 1 | categories |
| u2 Subscription detail | History | 1 |  |
| u2 Subscription detail | Food | 1 |  |
| u2 Subscription detail | low left | 2 |  |
| u2 Subscription detail | Outings | 1 |  |
| u2 Subscription detail | some left | 2 |  |
| u2 Subscription detail | Travel | 1 |  |
| u2 Subscription detail | Snacks | 1 |  |
| u2 Subscription detail | Chai & coffee | 2 |  |
| u2 Subscription detail | College & study | 2 |  |
| u2 Subscription detail | Phone & data | 2 |  |
| u2 Subscription detail | plenty left | 2 |  |
| u2 Subscription detail | Subscriptions | 1 | subscriptions |
| u2 Subscription detail | Edit weekly limits | 3 | limits, weekly |
| u2 Subscription detail | Subscription | 1 | subscription |
| u2 Subscription detail | Spotify | 1 |  |
| u2 Subscription detail | Amount | 1 |  |
| u2 Subscription detail | How often | 2 |  |
| u2 Subscription detail | every month | 2 |  |
| u2 Subscription detail | Next payment | 2 |  |
| u2 Subscription detail | Mon, 5 Oct · in 3 days | 6 |  |
| u2 Subscription detail | Set aside each week | 4 |  |
| u2 Subscription detail | about ₹28 | 2 |  |
| u2 Subscription detail | Pay it now | 3 |  |
| u2 Subscription detail | Change | 1 |  |
| u2 Subscription detail | Pause | 1 |  |
| u2 Subscription detail | Remove | 1 |  |
| g1 Goal | ‹ Money | 1 |  |
| g1 Goal | Laptop | 1 |  |
| g1 Goal | Ready Feb 2028. | 3 |  |
| g1 Goal | ₹10,500 of ₹30,000 | 5 |  |
| g1 Goal | Add money | 2 |  |
| g1 Goal | Edit | 1 |  |
| g2 Add a goal | Money in | 2 |  |
| g2 Add a goal | Savings | 1 | savings |
| g2 Add a goal | ₹14,700 saved. | 3 |  |
| g2 Add a goal | Laptop | 1 |  |
| g2 Add a goal | 35% | 1 |  |
| g2 Add a goal | Trip | 1 |  |
| g2 Add a goal | 70% | 1 |  |
| g2 Add a goal | + Add a goal | 3 | goal |
| g2 Add a goal | Add a goal | 3 | goal |
| g2 Add a goal | Phone | 1 |  |
| g2 Add a goal | Bike | 1 |  |
| g2 Add a goal | Course | 1 |  |
| g2 Add a goal | By when | 2 |  |
| g2 Add a goal | 6 months | 2 |  |
| g2 Add a goal | 1 year | 2 |  |
| g2 Add a goal | 2 years | 2 |  |
| g2 Add a goal | No date | 2 |  |
| g2 Add a goal | Save about ₹500 a month to get there. | 8 |  |
| g2 Add a goal | ⌫ | 0 |  |
| g2 Add a goal | Add goal | 2 | goal |
| v1 Sort your payments | ‹ Back | 1 |  |
| v1 Sort your payments | Sort your payments | 3 |  |
| v1 Sort your payments | Pick a category once and Trickle remembers the place. | 9 | category |
| v1 Sort your payments | Print Hub | 2 |  |
| v1 Sort your payments | 5:30 pm | 3 |  |
| v1 Sort your payments | Blue Tokai | 2 |  |
| v2 Sort · pick | ‹ Back | 1 |  |
| v2 Sort · pick | Sort your payments | 3 |  |
| v2 Sort · pick | Pick a category once and Trickle remembers the place. | 9 | category |
| v2 Sort · pick | Print Hub | 2 |  |
| v2 Sort · pick | 5:30 pm | 3 |  |
| v2 Sort · pick | Blue Tokai | 2 |  |
| v2 Sort · pick | Blue Tokai · ₹180 | 3 |  |
| v2 Sort · pick | Which category? | 2 | category |
| v2 Sort · pick | Food | 1 |  |
| v2 Sort · pick | low | 1 |  |
| v2 Sort · pick | Travel | 1 |  |
| v2 Sort · pick | some | 1 |  |
| v2 Sort · pick | Outings | 1 |  |
| v2 Sort · pick | plenty | 1 |  |
| v2 Sort · pick | College & study | 2 |  |
| v2 Sort · pick | Chai & coffee | 2 |  |
| v2 Sort · pick | Snacks | 1 |  |
| v2 Sort · pick | Phone & data | 2 |  |
| v2 Sort · pick | Or start a new one | 5 |  |
| v2 Sort · pick | + Personal care | 2 |  |
| v2 Sort · pick | + Other basics | 2 |  |
| v2 Sort · pick | + Groceries | 1 |  |
| v2 Sort · pick | + Eating out | 2 |  |
| v2 Sort · pick | + Food delivery | 2 |  |
| v2 Sort · pick | + Petrol | 1 |  |
| t1 Payment detail | ‹ Back | 1 |  |
| t1 Payment detail | Snack Corner | 2 |  |
| t1 Payment detail | Category | 1 | category |
| t1 Payment detail | Snacks | 1 |  |
| t1 Payment detail | When | 1 |  |
| t1 Payment detail | Fri, 2 Oct, 4:50 pm | 6 |  |
| t1 Payment detail | How | 1 |  |
| t1 Payment detail | Seen on your UPI link | 5 | link, upi |
| t1 Payment detail | Habit | 1 |  |
| t1 Payment detail | ₹235 in 30 days | 4 |  |
| t1 Payment detail | Change category | 2 | category |
| t1 Payment detail | Not mine | 2 |  |
| l1 Lock | Locked | 1 |  |
| l1 Lock | Enter your PIN. | 3 |  |
| l1 Lock | ⌫ | 0 |  |
| l1 Lock | Use fingerprint | 2 |  |
| z1 Settings | Fri, 2 Oct | 3 |  |
| z1 Settings | On pace. | 2 | pace |
| z1 Settings | left | 1 |  |
| z1 Settings | 1 box ≈ ₹16 ⓘ | 3 | box |
| z1 Settings | Pay | 1 |  |
| z1 Settings | Settings | 1 |  |
| z1 Settings | Account & linking | 2 |  |
| z1 Settings | UPI link › | 2 | link, upi |
| z1 Settings | Notifications | 1 |  |
| z1 Settings | Week-end wrap-up, bill heads-up › | 4 |  |
| z1 Settings | PIN & lock | 2 |  |
| z1 Settings | 4 digits, fingerprint › | 3 |  |
| z1 Settings | Data | 1 |  |
| z1 Settings | Import, export, delete › | 3 |  |
| z1 Settings | No amounts ever appear in a notification. Your data stays on this phone. | 13 |  |

### H.4 v14: every title and question, by screen
| State | Title or question | Words | Jargon terms |
|---|---|---|---|
| o02 2 · PIN (skippable) | Lock Trickle with a PIN? | 5 |  |
| o03 2b · Type it again | Type it once more. | 4 |  |
| o04 2c · PIN mismatch | Type it once more. | 4 |  |
| o05 3 · How Trickle sees your money | How should we see your spends? | 6 |  |
| o05 3 · How Trickle sees your money | Link UPI | 2 | link, upi |
| o05 3 · How Trickle sees your money | I'll add them | 3 |  |
| o06 3a · Choose your bank (UPI) | Choose your bank | 3 |  |
| o07 3b · Approve in UPI | Approve in your UPI app | 5 | upi |
| o08 3c · Link did not go through | That did not go through | 5 |  |
| o09 UPI · Balance found, how much to save | ₹6,500 is in your account. | 6 |  |
| o09 UPI · Balance found, how much to save | ₹1,300 | 2 |  |
| o09 UPI · Balance found, how much to save | ₹5,200 | 2 |  |
| o10 UPI · How long should it last | How long should it last? | 5 |  |
| o11 4 · Two quick things (last step) | Two quick things | 3 |  |
| o11 4 · Two quick things (last step) | Remind you about bills? | 4 |  |
| o11 4 · Two quick things (last step) | Open with your fingerprint? | 4 |  |
| o12 3 · What do you spend on | What do you spend on? | 5 |  |
| o13 3 · Category search (no match) | What do you spend on? | 5 |  |
| o14 Plan · Any subscriptions | Any subscriptions? | 2 | subscriptions |
| o15 Plan · Add your own subscription | Add your own | 3 |  |
| o16 Plan · How much for each (equal) | How much for each? | 4 |  |
| o17 Plan · How much for each (my way) | How much for each? | 4 |  |
| h01 Home · on pace (green) | On pace. | 2 | pace |
| h01 Home · on pace (green) | ₹796 | 1 |  |
| h02 Home · ahead of pace (amber) | A bit ahead of pace. | 5 | pace |
| h02 Home · ahead of pace (amber) | ₹267 | 1 |  |
| h03 Home · unsorted payment + subscription due | A bit ahead of pace. | 5 | pace |
| h03 Home · unsorted payment + subscription due | ₹346 | 1 |  |
| h04 Home · link needs refresh | On pace. | 2 | pace |
| h04 Home · link needs refresh | ₹796 | 1 |  |
| h05 Home · week used up | Gone over a little. | 4 |  |
| h05 Home · week used up | ₹0 | 1 |  |
| h06 Home · six months in | On pace. | 2 | pace |
| h06 Home · six months in | ₹184 | 1 |  |
| h07 Home · plan is about to drop | On pace. | 2 | pace |
| h07 Home · plan is about to drop | ₹184 | 1 |  |
| p01 1 · Amount and what for | ₹ 0 | 2 |  |
| p02 1 · Amount typed, category chosen | ₹ 312 | 2 |  |
| p03 1 · Savings tab | ₹ 500 | 2 |  |
| p04 2 · Pay screen (within budget) | ₹60 · Chai & coffee | 3 |  |
| p05 2 · Pay screen (over a budget) | ₹700 · Outings | 2 |  |
| p05 2 · Pay screen (over a budget) | ₹590 over. | 2 |  |
| p06 2 · Where it comes from | ₹700 · Outings | 2 |  |
| p06 2 · Where it comes from | ₹590 over. | 2 |  |
| p07 2 · Goal is short | ₹20,000 · Laptop | 3 |  |
| p07 2 · Goal is short | ₹9,500 short. | 3 |  |
| p08 3 · Approve in UPI | ₹312 | 1 |  |
| p09 3 · Waiting for the bank | Waiting for your bank | 4 |  |
| p10 4 · Paid | Paid | 1 |  |
| p10 4 · Paid | ₹312 | 1 |  |
| p11 4 · Failed | Not paid | 2 |  |
| p11 4 · Failed | ₹312 | 1 |  |
| p12 1 · Other category (search) | ₹ 120 | 2 |  |
| p12 1 · Other category (search) | Which category? | 2 | category |
| m01 Move · from free savings | ₹ 200 | 2 |  |
| m02 Move · to a category | ₹ 500 | 2 |  |
| m03 Move · done | Moved | 1 |  |
| m03 Move · done | ₹500 | 1 |  |
| i01 Income · six months in | Where your money went | 4 |  |
| i02 Income · money waiting, what is this | Where your money went | 4 |  |
| i02 Income · money waiting, what is this | What is this? | 3 |  |
| i03 Add money · what kind | Where your money went | 4 |  |
| i03 Add money · what kind | What kind of money? | 4 |  |
| i04 Add income · how much came in | How much came in? | 4 |  |
| i05 Add income · how much to save (slider) | How much to save? | 4 |  |
| i05 Add income · how much to save (slider) | ₹1,800 | 2 |  |
| i05 Add income · how much to save (slider) | ₹7,200 | 2 |  |
| i06 Add income · until when | Until when? | 2 |  |
| i07 Income detail | Where your money went | 4 |  |
| i07 Income detail | ₹6,000 | 2 |  |
| i08 Change the end date | Until when? | 2 |  |
| i09 One-off money · where does it go | Where does it go? | 4 |  |
| i09 One-off money · where does it go | Save it | 2 |  |
| i09 One-off money · where does it go | Back into a category | 4 | category |
| i09 One-off money · where does it go | Just note it | 3 |  |
| i10 Income · none yet (tracking) | No income added. | 3 | income |
| i11 Income · plan from a weekly amount | Where your money went | 4 |  |
| s01 Spending (scroll) | Your week | 2 |  |
| s01 Spending (scroll) | Small buys that add up | 5 |  |
| s01 Spending (scroll) | What is due | 3 |  |
| s01 Spending (scroll) | Every payment | 2 |  |
| s02 Category · Food | Food | 1 |  |
| s03 Everything else | Everything else | 2 |  |
| s04 Repeat spend | Sharma Tea Stall | 3 |  |
| s05 Payment detail | ₹45 | 1 |  |
| s06 Re-file a payment | ₹45 | 1 |  |
| s06 Re-file a payment | Which category? | 2 | category |
| s07 Sort your payments | Sort your payments | 3 |  |
| s08 Sort · pick a category | Sort your payments | 3 |  |
| s08 Sort · pick a category | Which category? | 2 | category |
| s11 Share out your week (budget) | Share out your week | 4 |  |
| s13 Fit to my real weeks | Share out your week | 4 |  |
| s13 Fit to my real weeks | Fit it to how you really spend? | 7 |  |
| g01 Savings | Saving well | 2 |  |
| g02 Goal · Laptop | Laptop | 1 |  |
| g02 Goal · Laptop | ₹10,500 | 2 |  |
| g02 Goal · Laptop | took out ₹650 | 3 |  |
| g03 Free savings | Not given to a goal | 5 | goal |
| g03 Free savings | ₹600 | 1 |  |
| g04 Edit a goal | Laptop | 1 |  |
| g04 Edit a goal | ₹10,500 | 2 |  |
| g04 Edit a goal | took out ₹650 | 3 |  |
| g05 Add a goal | Saving well | 2 |  |
| g05 Add a goal | Add a goal | 3 | goal |
| n01 Insights · day | When you spend | 3 |  |
| n01 Insights · day | This week vs last | 4 |  |
| n02 Insights · week | When you spend | 3 |  |
| n02 Insights · week | This week vs last | 4 |  |
| n03 Insights · last month | When you spend | 3 |  |
| n03 Insights · last month | This week vs last | 4 |  |
| w01 Week review · six months in | A bit over this week. | 5 |  |
| w02 Week review · on pace | You stayed on pace. | 4 | pace |
| w03 Week review · over | You stayed on pace. | 4 | pace |
| c01 Goal reached | Trip is saved | 3 |  |
| c02 Goal done | Trip is done | 3 |  |
| t01 Settings | On pace. | 2 | pace |
| t01 Settings | ₹796 | 1 |  |
| t01 Settings | Settings | 1 |  |
| t02 Account and linking | On pace. | 2 | pace |
| t02 Account and linking | ₹796 | 1 |  |
| t02 Account and linking | Account & linking | 2 |  |
| t03 Notifications | On pace. | 2 | pace |
| t03 Notifications | ₹796 | 1 |  |
| t03 Notifications | Notifications | 1 |  |
| t04 PIN and lock | On pace. | 2 | pace |
| t04 PIN and lock | ₹796 | 1 |  |
| t04 PIN and lock | PIN & lock | 2 |  |
| t05 Change PIN | On pace. | 2 | pace |
| t05 Change PIN | ₹796 | 1 |  |
| t05 Change PIN | New PIN | 2 |  |
| t06 Data | On pace. | 2 | pace |
| t06 Data | ₹796 | 1 |  |
| t06 Data | Data | 1 |  |
| t07 Import a spreadsheet | On pace. | 2 | pace |
| t07 Import a spreadsheet | ₹796 | 1 |  |
| t07 Import a spreadsheet | Import a spreadsheet | 3 |  |
| t08 Delete everything | On pace. | 2 | pace |
| t08 Delete everything | ₹796 | 1 |  |
| t08 Delete everything | Delete everything? | 2 |  |
| k01 Link UPI? | See your spends automatically? | 4 |  |
| k02 Add a spend? | Add a spend you made? | 5 |  |
| k03 Payments need a place | 2 payments need a place. | 5 |  |
| k04 Set a limit? | A weekly limit for Food? | 5 | limit, weekly |
| k05 Make a plan? | Make a plan? | 3 | plan |
| k06 Add your income? | Add your income? | 3 | income |
| k07 Add a goal? | Saving for something? | 3 |  |
| k08 Remind about bills? | Remind you about bills? | 4 |  |
| k09 Add a PIN? | Lock Trickle with a PIN? | 5 |  |
| k10 Bring in older spends? | Bring in older spends? | 4 |  |
| k11 Week recap (no budget) | You spent ₹1,030. | 4 |  |
| k12 Is Netflix a subscription? | Is Netflix a subscription? | 4 | subscription |
| r01 Home · fresh week | ₹0 | 1 |  |
| r02 Home · with spends and nudges | ₹1,030 | 2 |  |
| r03 Add a spend (search categories) | How much? | 2 |  |
| r04 Spending | Your week | 2 |  |
| r05 Category · no limit | Food | 1 |  |
| r06 Category · with a limit | Food | 1 |  |
| r07 Sort your payments | Sort your payments | 3 |  |
| r08 Income · none yet | No income added. | 3 | income |
| r09 Savings · no goals yet | Saving for something? | 3 |  |
| r10 Insights | When you spend | 3 |  |
| r10 Insights | This week vs last | 4 |  |
| u01 Add a subscription | Add your own | 3 |  |
| u02 Add a subscription · filled in | Add your own | 3 |  |
| u03 Add a subscription · takes too much | Add your own | 3 |  |
| u04 Subscription | Your week | 2 |  |
| u04 Subscription | Small buys that add up | 5 |  |
| u04 Subscription | What is due | 3 |  |
| u04 Subscription | Every payment | 2 |  |
| u04 Subscription | Spotify | 1 |  |
| u05 Subscription · paused | Your week | 2 |  |
| u05 Subscription · paused | Small buys that add up | 5 |  |
| u05 Subscription · paused | What is due | 3 |  |
| u05 Subscription · paused | Every payment | 2 |  |
| u05 Subscription · paused | Spotify | 1 |  |
| v01 Sort a payment · pick a category | Sort your payments | 3 |  |
| v01 Sort a payment · pick a category | Which category? | 2 | category |
| v02 Sort a payment · create your own | Sort your payments | 3 |  |
| v02 Sort a payment · create your own | Which category? | 2 | category |
| v03 Sort a payment · search | Sort your payments | 3 |  |
| v03 Sort a payment · search | Which category? | 2 | category |
| v04 Change a payment’s category | ₹45 | 1 |  |
| v04 Change a payment’s category | Which category? | 2 | category |


---

## Appendix I. Build notes for v2 to v13
The notes written when each version was built, in order. v14 and v15 are covered by the decision logs (Appendix N), `v15_audit.md` and `v15_spec.md`.

### v2 (22 Sep)
*Verbatim from `docs/claude/mockup_v2_build_notes.md`: Trickle Lo-Fi Prototype v2 — Build Notes. Headings demoted; nothing else changed.*


Rebuilt from scratch against the Figma file `Lofi Budget App`
(`ojbHyNY17bS8irUeSXTe4V`). Supersedes the earlier `trickle-onboarding`
artifact. Published as a separate artifact so the old one stays intact for
comparison.

##### Key decisions

**No SMS anywhere.** Tracking is UPI-linked or manual entry only, per the
updated direction. The SMS rationale/denied screens from the previous build
were dropped entirely.

**Frame size: 412 x 915 (Pixel 8).** Content flows and scrolls inside the
frame rather than being absolutely positioned, so screens can't collide as
content grows. The Figma frames were 402 x 874 / 402 x 967.

**Onboarding step numbering fixed.** The Figma file labels both the
Categories screen and the Security PIN screen as "Step 2". The prototype
renumbers to four real steps — Method/UPI (1), Categories (2), PIN (3),
Permissions (4) — and the progress dots are computed from actual navigation
state rather than hardcoded per screen.

**Budget editing lives in Categories, not its own tab.** The five tabs are
Savings, Categories, Home (centre), Insight, Settings, matching the Figma
bottom nav component. The earlier build's separate Budget tab was retired
and its function folded into the Edit Budget overlay on Categories, which is
what the Figma `Lofi Edit Budget` overlay already showed.

**Friction screen is an overlay, not a full screen.** The Figma frame is 459
tall, i.e. a bottom sheet. It sits between Enter Amount and Payment
Confirmed in the real pay flow rather than existing as a standalone demo,
and shows balance-after-payment, the category weekly bar split into
spent / this purchase / remaining, and purchase counts for the day and week.

##### Screens built (31 frames + 9 overlays)

Onboarding: splash, tracking method, UPI setup, categories, security PIN,
permissions, all set.

Home: account panel with weekly/daily spend and deltas, balance with eye
toggle, three payment tiles (UPI mode) or Enter Transaction (manual mode),
Small Purchases Trends card, Transaction History card. Camera and Contacts
permissions actually hide Scan QR and Pay Anyone when switched off.

Payment: Scan QR (with quick-category picker), Pay Anyone (searchable
contacts), Bank Transfer, Enter Amount, friction sheet, Payment Confirmed
with a savings-goal round-up sheet.

Transactions: full history with search and category filter, transaction
detail with recategorise, manual entry, accumulation list and per-merchant
detail.

Categories: period dropdown (daily/weekly/monthly), donut, category rows
with deltas, per-category detail with budget progress, Edit Budget and Edit
Categories overlays.

Savings: goals list, goal create/detail/celebration, subscriptions with next
due dates, subscription detail and manual add.

Settings: accounts, tracking method, categories, budgets, alerts, history,
PIN change, permissions, privacy statement, restart.

##### Insights feed — eight cards

Budget pace (calendar week, Monday to today, against summed category
budgets); day-of-week spending across the last 30 days as a seven-bar Mon-Sun
chart with the heaviest day highlighted; biggest category mover vs last week;
accumulation spotlight on the top repeat merchant; biggest contributor as a
share of the month; total monthly subscription cost; primary savings goal
progress; week-on-week comparison. Every card taps through to the screen it
is about.

##### Data model

One shared transaction store seeded across 35 days from a merchant table
(merchant, category, amount range, frequency per week), so accumulation,
category totals, the donut, the day-of-week chart, insights and the friction
check all read the same numbers instead of each screen inventing its own.
Amounts are randomised per session, so figures differ on each Restart.

##### Validation

Static checks (JS syntax, tag balance, navigation targets, ids, duplicate
ids) plus a headless Playwright click-through covering the full onboarding
path, the complete payment flow through the friction sheet, all five tabs,
category drill-down, budget editing, insights rendering, savings goals and
subscriptions, manual-entry mode, accumulation and transaction search. No
console errors, no horizontal overflow on any frame.

### v3 (23 Sep)
*Verbatim from `docs/claude/mockup_v3_build_notes.md`: Trickle Mockup v3 — Build Notes. Headings demoted; nothing else changed.*


**Artifact:** https://claude.ai/artifact/L9VJo936ykgGhfuzaA5BUw ("Trickle — Final Redesign")
**Source file:** `trickle-final-v3.html`, built on the functional base of `trickle-v2.html` (same data model: `TXNS`/`CATS`/`GOALS`/`SUBS`/`ACCOUNTS`, `esc()`, `money()`, date helpers, `go(name)` nav, `openSheet()`/`closeSheet()` overlays, `renderAll()`).

##### What changed vs. trickle-v2

- **Visual system**: full dark-theme rewrite (`--ink`/`--surface`/`--surface2`/`--surface3` layering, single accent `#5bb98c`, muted non-alarming deltas — no red flashing anywhere). All colors defined as CSS custom properties.
- **Categorical palette**: the dataviz-skill validated 8-hue dark categorical order (`#3987e5, #d95926, #199e70, #c98500, #d55181, #2fae2f, #9085e9, #e66767`), assigned by fixed category index (never re-cycled) and reused for the donut, category dots, segmented bars, and transaction-row dots.
- **IA unchanged**: still 5 tabs (Home / Categories / Savings / Insights / Settings), no merges or splits, per the brief.
- **New Home surface**: a "Subscriptions Due" card (due-sorted, badge on soonest, monthly total) added beside the existing accumulation card, per the brief's flagged addition.
- **No SMS tracking anywhere** — confirmed by grep; the app is UPI-linkage or manual entry only, matching the non-negotiable constraint.

##### The 5 reusable components (each used on 2+ screens)

1. **Stat-card triad** (label + big number + small delta) — Home hero (Today/This Week/This Month), Category detail (Spent/Budget/Left), Subscriptions-due stat card in Insights, Savings subscription summary.
2. **Segmented/stacked bar** — Category rows (spend-relative-to-max bar), the Insights discretionary-vs-fixed split, and the existing friction-sheet bar (restyled, not rebuilt).
3. **Dot-matrix grid** — Home accumulation card (repeat-purchase count) and the Insights accumulation-spotlight card.
4. **GitHub-style heatmap calendar** — Insights "day of the week" card, replacing the old 7-bar chart; 5-week, Monday-first grid with a sequential blue ramp and a low→high legend.
5. **Pill w/ %change + sparkline** — `pctPill()` used in Category rows and the Insights category-drift card; `sparkline()` helper included for trend-at-a-glance use (wired for future goal/category trend cards).

##### The 8 insights (visual form as specified in the brief)

1. Pace-to-budget forecast → burn-down bar with a pace marker (vertical tick at "steady pace" position) + projected week-end total.
2. Category drift vs. prior period → pill with %change.
3. Small-purchase accumulation → dot-matrix grid, one dot per purchase instance.
4. Day/time spending pattern → heatmap calendar (replaced the old bar chart).
5. Subscriptions due → due-sorted list + monthly/yearly/next-due stat triad.
6. Biggest single-transaction outlier → stat card (merchant, category, amount, rest-of-day context).
7. Savings goal velocity → progress bar + computed projected-completion-date text (`goalVelocity()`, using each goal's contribution history to derive a daily rate).
8. Discretionary vs. fixed/recurring split → two-segment stacked bar (fixed = subscription categories + Necessities/Groceries/Rent).

All values are computed live from the seeded 35-day transaction store — nothing is hardcoded.

##### Explicitly excluded (per brief)

No candlestick charts, no long/short-style charts, no holders/whale framing, no peer/benchmark insight, no trading jargon ("portfolio," "holders," "position" do not appear), no flashing/urgent deltas.

##### Screens left close to trickle-v2's simpler treatment

Payment flow (scan / pay-anyone / bank-transfer / amount / confirm), Settings, and onboarding — restyled to the dark theme but structurally unchanged, per the brief's guidance that the redesign focus is Home/Categories/Insights/Savings.

##### Validation

- `node --check` on the extracted `<script>` block: passes.
- Every `go(...)` target has a matching `data-frame`; every `openSheet(...)` target has a matching `data-sheet` (32 frames, 8 sheets, no mismatches).
- Playwright smoke test: splash → onboarding (UPI path and manual path both tested) → home (subscriptions-due card and dot-matrix both render with real data) → categories (7 segmented bars, 7 pills) → insights (all 8 cards render, 1 heatmap, 1 dot-matrix) → savings (goal velocity text confirmed, e.g. "At ₹458/day, about 33 days to go — around 26 Oct.") → settings → full payment flow (scan → amount → friction sheet → confirmed). No console/page errors, no horizontal overflow (documentElement.scrollWidth === window.innerWidth).

##### Known deviations / notes

- Home's "This Month" stat originally had a month-over-month delta, but the 35-day seed depth makes a prior-month comparison unreliable (too little prior data) — replaced with an honest "avg ₹X/day" context line instead of a misleading percentage.
- The category segmented bar is spend-relative-to-the-largest-category (a proportional bar), not a spent/budget/remaining three-segment bar — the latter is preserved as-is on Category Detail's existing progress bar and the friction sheet, which already carried that exact framing in trickle-v2.

### v4 (23 Sep)
*Verbatim from `docs/claude/mockup_v4_build_notes.md`: Trickle v4 — Build Notes (Visualization-First). Headings demoted; nothing else changed.*


Artifact: https://claude.ai/artifact/8JEJ2hnQ34rUvXxNc4yfjr
Base file: `trickle-final-v3.html` → `trickle-final-v4.html` (extended in place, not rewritten)

##### Why
User feedback on v3: "push the visual aspect and data visualisation... push everything to be visual." v4 keeps v3's IA (5 tabs), constraints (no SMS tracking — UPI-linked or manual only), and all 8 original insights intact, and pushes visualization density and precision across every data-facing screen.

##### Research applied
Looked at sparkline/micro-chart technique, radial/gauge progress, richer calendar heatmaps, small multiples, diverging bars, area-with-projection-band forecasting, and how Copilot Money / Monarch / YNAB-style apps layer visualization without becoming unreadable. Applied via the `dataviz` skill's guidance: fixed categorical hue order (`SERIES` array, unchanged from v3, reused everywhere so a category's color is constant across Home/Categories/Insights), sequential blue ramp for heat intensity, gradient-filled area marks with an explicit stroke, dashed reference/target lines instead of second solid series, and center-stat donuts instead of plain segmented bars where a single ratio is the point.

##### Seed-data extension
`seedTransactions()` window extended from 35 days to **68 days** (`for(var d=67; d>=0; d--)`). This makes a real trailing-30-vs-prior-30 comparison possible for the first time, which directly closes the v3 gap noted in `mockup_v3_build_notes.md` (Home's "This Month" stat previously showed an avg-₹/day workaround because there wasn't a full prior month of data).

##### Screen-by-screen changes vs v3

**Home**
- "This Month" stat card now shows a real month-over-month % delta (`deltaHtml(monthTot, prevMonthTot)`) instead of the avg-₹/day fallback.
- New "Where Money Goes" card: a compact radial ring (`drawMiniRing`) showing last-30-day category composition, with a legend listing top 4 categories by %. Uses the same category color mapping as everywhere else.

**Categories**
- Each category row now carries a 6-week mini sparkline (`weeklyTrend()` + existing `sparkline()` helper) under the segmented bar, so trend is visible without opening the row.
- Category Detail gets a new gradient-filled area chart (`drawCatArea`) of daily spend over a fixed trailing 21-day window, with a dashed daily-budget reference line — independent of the Today/Week/Month toggle so it never degenerates to a single point.

**Insights** (flagship; kept all 8 original cards, upgraded 3, added 1 new)
- Card 1 (Pace to budget): added a shaded projection band from current pace to projected week-end spend, alongside the existing pace marker.
- Card 2 (Day of week heatmap): added a 5-week weekly-total sparkline strip beneath the heatmap grid.
- Card 8 (Discretionary vs. fixed): upgraded from a plain stacked bar to a donut with a centered "% fixed" stat.
- New card 9 (Month over month): a diverging bar pair (`divergingPair`) comparing the last 30 days to the prior 30 days — a genuinely new insight enabled by the extended seed window, not a swap for anything removed.

**Savings**
- Goal Detail gets a projection area chart (`drawGoalProjection`): solid gradient area for saved-so-far, a dotted forecast line from "today" to the dashed target line, using the existing `goalVelocity()` pace math.
- Savings tab gets a 4-week upcoming-charges timeline strip (`sub-timeline`) bucketing subscription due-dates into weekly bars.

**Settings / payment flow**
- Left close to functional/plain as instructed — no visualization added.

##### Validation
- `node --check` on the extracted `<script>` passed clean.
- Every `go(...)` target matched to a `data-frame`, every `openSheet(...)` matched to a `data-sheet` (scripted check, zero mismatches).
- Playwright smoke test (420×900 viewport): onboarding→home, Where Money Goes, Categories→category detail, Insights (scrolled through all 9 cards), Savings→goal detail, Settings. Zero console errors, zero horizontal overflow across all frames.
- Spot-checked computed values against seed data: this-month vs prior-month totals differ meaningfully (~309–320 seeded transactions across 68 days depending on run), discretionary/fixed donut and MoM diverging bars matched the underlying `sum()`/`txnsBetween()` calls.

##### Constraint check
No SMS-based tracking anywhere — all new visualizations derive from the existing UPI-linked/manual transaction data model (`TXNS`, `CATS`, `SUBS`, `GOALS`); nothing new was introduced that implies SMS parsing.

### v5 (23 Sep)
*Verbatim from `docs/claude/mockup_v5_build_notes.md`: Trickle v5 — Build Notes. Headings demoted; nothing else changed.*


##### What v5 is
v5 extends v4's approved app (same 5-tab IA — Home / Categories / Savings /
Insights / Settings — same data model, same UPI-linked-or-manual constraint,
no SMS tracking anywhere) with a much larger, curated library of chart forms
and insights. It is one cohesive app, not an explorations file. Full artifact:
"Trickle — v5 (Visualization Library)".

##### Process
1. Read v4 in full plus the design brief / build notes for continuity.
2. Wrote `claude/v5_visualization_plan.md` first — for every candidate chart
   type from the reference sheets (Information Is Beautiful poster, dark
   chart-type grid, etc.), judged fit/no-fit against Trickle's actual data
   (transactions, categories, budgets, goals, subscriptions), and for every
   fit, named the specific screen/insight and the seeded field driving it.
3. Built screen by screen, checking each before moving on: new SVG chart
   functions first, then wired into Categories, Home, Savings, and the
   Insights feed.
4. Validated: extracted `<script>` and ran `node --check` (passes), verified
   every `go(...)` target has a matching `data-frame` and every
   `openSheet(...)` a matching `data-sheet` (all resolve), and ran a
   Playwright smoke test through onboarding (manual path) → Home → Categories
   → category detail → Insights (scrolled through all 16 cards) → Savings →
   goal detail → Settings. Zero console errors, no horizontal overflow.
   Screenshots confirm each new chart renders with real computed values.

##### What's new vs. v4, screen by screen
- **Home:** "Where Money Goes" card now shows a **sankey-lite flow diagram**
  (balance → top 4 categories by 30-day spend → "Saved") instead of the
  compact radial ring, giving a real money-flow read. Everything else on
  Home (stat triad, dot-matrix accumulation, subscriptions-due list, recent
  transactions) is unchanged.
- **Categories:** each category row now carries a **bullet graph** (spend vs.
  budget for the active period) directly under the existing segmented bar,
  in addition to the kept sparkline — a precise, compact budget-vs-actual
  read per row without a chart-per-category detail screen.
- **Category detail:** unchanged (area chart + budget dashline).
- **Insights:** grew from v4's 9 cards to **16 cards**. The 9 v4 cards are
  kept as-is (pace-to-budget, day/time heatmap, category drift, accumulation,
  subscriptions due, biggest outlier, savings velocity, discretionary/fixed
  donut, month-over-month). Seven new cards were added: transaction-size
  **histogram**, spending-shape **radar chart** (this week vs. 4-week
  average), small-purchase **waffle/pictogram** spotlight, top-merchant
  **bubble chart**, 30-day **range indicator** (min/median/max + today),
  14-day **diverging bar-per-day** chart, and an amount-vs-hour-of-day
  **scatter plot**.
- **Savings:** each goal card now also shows a **bullet graph** (saved vs.
  target) beside the existing rounded progress bar. The subscriptions
  "upcoming charges" strip was upgraded from 4 week-buckets to a proper
  **date-axis timeline** with exact due dates plotted on a 30-day axis.
- **Settings:** untouched, as directed.

##### Seed data
No extension was required. v4's existing 68-day transaction history, 8-ish
category set, goals and subscriptions were rich enough to drive every new
form with genuine computed values (30-day histogram buckets, 4-week radar
average, top-6 merchant totals, 30-day min/median/max, 14-day diverging
deltas, hour-of-day scatter, sankey-lite category/savings split).

##### Full list of distinct visual forms used, and where
1. Donut (with center stat) — Categories tab spend donut; Insights
   discretionary/fixed-split card.
2. Segmented/stacked bar — Categories tab per-row budget track.
3. **Bullet graph** *(new)* — Categories tab per-row (budget vs. actual);
   Savings per-goal (saved vs. target).
4. Dot-matrix grid — Home accumulation card; Insights accumulation card.
5. Calendar heatmap — Insights day/time pattern card.
6. Sparkline — Categories tab per-row trend; Insights weekly-total strip.
7. Area chart + dashed budget line — Category detail; Savings goal
   projection.
8. Diverging bar pair — Insights month-over-month card.
9. **Histogram** *(new)* — Insights transaction-size card.
10. **Radar/spider chart** *(new)* — Insights spending-shape card.
11. **Waffle/pictogram row** *(new)* — Insights small-purchase spotlight.
12. **Bubble chart (proportional area)** *(new)* — Insights top-merchants
    card.
13. **Range indicator (min/median/max)** *(new)* — Insights daily-range
    card.
14. **Diverging bar-per-day** *(new)* — Insights above/below-typical card.
15. **Sankey-lite flow diagram** *(new)* — Home "Where Money Goes" card.
16. **Date-axis timeline** *(new)* — Savings subscriptions card.
17. **Scatter plot** *(new)* — Insights "when you spend" card.

17 distinct forms, roughly 2.5x v4's count, each backing a specific,
computed insight (see `claude/v5_visualization_plan.md` for the full
fit/no-fit reasoning, including 15+ chart types explicitly excluded with
their reasons).

##### Validation results
- `node --check` on the extracted `<script>` block: **pass**.
- Every `go('...')` target resolves to a `data-frame`; every
  `openSheet('...')` target resolves to a `data-sheet`: **pass** (checked
  programmatically).
- Playwright smoke test (manual-tracking onboarding path → Home →
  Categories → category detail → Insights, scrolled through all cards →
  Savings → goal detail → Settings): **zero console errors, no
  pageerrors, no horizontal overflow**.
- Spot-checked computed values against seed data (e.g. category
  spend-vs-budget bullet graphs, histogram bucket counts, sankey category/
  saved totals) — all sane and consistent with the existing 68-day seed.

##### Artifact
Published as "Trickle — v5 (Visualization Library)" via the Artifact tool.

### v6 (23 Sep)
*Verbatim from `docs/claude/mockup_v6_build_notes.md`: Trickle v6 — Build notes (Phase 4 + 5). Headings demoted; nothing else changed.*


Artifact: https://claude.ai/artifact/Gf27yHr1G8noAVqVWe6s2M ("Trickle — v6"). Source: scratchpad `trickle-final-v6.html` (~163 KB, single file, no libraries). Modular sources in `scratchpad/v6/` (data, charts, core, onb, home, cats, pay, insights, savings, settings, boot; `build.py` concatenates them). `#demo` / `#demo:<frame>` skip onboarding (UPI path).

Tracking is UPI linking or manual entry only. The file contains no SMS feature, copy, field or comment: `grep -i sms` returns 0.

##### Seed data (deterministic, mulberry32 seed 42; goals seed 7)
- Window from 1 Apr 2026 to "today", fixed at 24 Sep 2026 18:30, giving 455 transactions. Each transaction has `{id, merchant, cat, amt, ts, source, account, payeeType, sub?}`. `account` is null exactly when the source is Manual.
- Split: 82.6% UPI and 17.4% Manual. Of UPI transactions, about 73/27 go to nishad@oksbi and nishad@ybl.
- Hour-of-day comes from each merchant's profile (Campus Coffee, JD Canteen, RV Shop, Metro, Zepto, BigBasket weekends, and others). Night purchases (22:00–01:00) are 7.0% of transactions.
- Monthly shape: May Stationery ×2.5; June Food ×0.6 and Transport ×1.45; Aug Groceries ×1.2. Seven category-months go over budget (Buffer in Apr and Jul because of the quarterly gym charge, Stationery in May, Transport in Jun, Snacks in Jul, Groceries in Aug).
- Contacts: 6–10 P2P payments a month, filed under Buffer or Transport. One bank transfer a month.
- Goals: Motorcycle (14 dated contributions), Goa (8), and Headphones (reached 20 Jul, 7 contributions).
- Subscriptions carry billing cycles and price history (Spotify went from ₹99 to ₹119 on 3 Jul). Every charge is also a transaction.
- Balance = 6,000 + 6 × 8,000 − spend − contributions, which gives ₹3,152.

##### Screens and charts
- **Onboarding (8 frames):** splash (demo concentric rings); method (two-lane flow diagram plus Home thumbnails); upiSetup (phone → IDs → Trickle node diagram); onbCategories (live ghost rings); onbAllocate (allowance input, pie with callouts, slider per category, "Unassigned" slice); pin (two dot rows on a custom keypad, turn accent on match, shake on mismatch); permissions (toggles wired to a miniature Home); allSet (ghost rings, half-donut, linkage diagram). A step-arc progress indicator appears on steps 1–5.
- **Home:** half-donut "Safe to spend today"; Today/Week/Month tiles with sparklines; 14-day streak dots; pictogram rows for repeat purchases; Sankey-lite that starts from month spend, with right-hand labels wrapped to 2 lines; subscriptions-due chips with icon rings; recent rows with UPI/Manual badges; pay tiles, which grey out when their permission is off.
- **Accumulation:** ranked pictogram with ₹/yr. **Accumulation detail:** 24h area strip plus purchase dots, and an annualised bullet.
- **Transactions:** 30-day column strip that updates with the filter; tap a column to jump to that day. **Transaction detail:** merchant range strip, 24h tick clock, category-budget bullet, recategorise. **Manual entry:** live impact bullet with pace tick and status.
- **Categories Share:** concentric radial arcs (common 270° scale, % label and icon at the ring start, largest ring outermost), ranked rows with a bullet and status icon each. **Categories Monthly:** pie with callouts (5 slices + Other) and fill jars (6 months × category, ▲ notch when over, % label on top). **Category detail:** area chart with budget dashline and scrub, tone-step treemap, stat triad. **Sheets:** budget (linked monthly/weekly/daily fields plus live 100% allocation bar), edit categories (slot swatches), period (₹ totals), quick category.
- **Payment:** scan; pay anyone (micro bars); bank transfer (account outflow micro bar); pay amount (live bullet); friction sheet (3-segment bullet with pace tick, "Spent before this", purchase dot rows, status); confirm (balance delta bar, round-up ring); savings sheet (goal rings with a ghost round-up).
- **Insights (11 cards in 4 sections):** budget-pace bullet with projection; dumbbell comparing the same days of Aug and Sep; fixed vs discretionary meter; 6-month columns with budget line; 24h radial; 4 part-of-day gauges; heatmap plus range strip; ranked merchant bars; histogram; radar (share ÷ max share); subscription calendar with dots sized by amount.
- **Savings:** icon-centre goal rings with ETA; subscription donut plus next-due list. **Goal create:** stepped weekly-pace columns. **Goal detail:** cumulative step-line with projection, target and today markers, and contribution dots by type; stacked area of round-up vs manual. **Goal reached:** ring with dated contribution ticks. **Subscription detail:** 12-cell pictogram, price step-line, share meter. **Subscription add:** live 12-cell preview.
- **Settings:** linkage diagram plus UPI/manual 100% bar; tracking sheet (two lanes); account sheet (micro bars); alerts (bullet with threshold tick); PIN change (visual dots); permissions (same diagram as onboarding).

Interaction: tapping a mark dims its siblings and shows a tooltip chip above it (below it if it's near the top of the card). Line charts can be scrubbed by hover or drag. Double-tapping a ring, slice or Sankey flow opens the category.

##### Deviations
- Coursera costs ₹399/mo instead of ₹2,500. At ₹2,500 it would take 31% of an ₹8,000 allowance and make the balance negative.
- Subscription charges are counted inside category budgets (Coursera in Necessities; Gym, Spotify, Cloud and Prime in Buffer).
- The 24h radial and part-of-day gauges leave out autopay charges. Autopay runs at 9:00 and created a false 9 am spike.
- Treemap tiles filter transactions on double-tap, not tap, because a single tap shows the tooltip.
- The subscription donut uses a ranked sequential blue scale, since subscriptions aren't categories.
- In the manual path, the seeded history is converted to Manual entries so that `account` is null.

##### Validation (Playwright, Chromium)
- `node --check` passes.
- Every `go()` and `openSheet()` target exists: 32 frames and 8 sheets.
- Click-throughs completed with 0 console errors:
  - UPI onboarding: invalid ID error, add, suggestion chip, category add/remove, slider (clamped to the allowance), PIN mismatch then match, permission toggle.
  - Manual onboarding.
  - Payment through Pay Anyone → friction sheet → confirm → round-up.
  - Manual entry.
  - Tooltip.
- No horizontal page overflow on any frame or sheet. The only element wider than the screen is the transaction filter chip row, which scrolls inside its own container on purpose.
- Every frame was screenshotted and reviewed. Fixed after review: pie labels clipped at the edge, notches hidden under the cell above, the half-donut end label overlapping the arc, truncated inner-ring names (now dropped rather than cut), the onboarding pie folding categories into Other, the 9 am autopay spike, a negative balance, and dateless transaction rows.

##### Known issues
- Inner-ring labels drop the category name when there's no room; the row list still shows it.
- Subscription donut labels on the left side are truncated with "…".
- Callout labels crowd a little on the left of the allocation pie (8 slices).
- Contribution ticks on the goal-reached ring are narrow tap targets.

### v7 (23 to 24 Sep)
*Verbatim from `docs/claude/mockup_v7_build_notes.md`: Trickle v7: Build notes (Phase 4 + 5). Headings demoted; nothing else changed.*


Artifact: https://claude.ai/artifact/HJDxehfotaDXEwPk9KwNHH ("Trickle — v7"). Source: scratchpad `trickle-final-v7.html` (~276 KB, one file, no libraries; Inter from Google Fonts with a system fallback). Modular sources are in `scratchpad/v7/` (data, ledger, charts, charts2, core, onb, onb2, widgets, home, actions, pay, money, savings, insights, settings, boot); `build.py` concatenates them. `#demo` skips onboarding (UPI path), `#demo-manual` uses the manual path, and `#demo-<frame>` opens a frame directly. The stage header has a "Demo: close Sep" button that runs the period-end sweep.

Tracking is linked UPI or manual entry, and Excel import is a placeholder. `grep -i sms` on the output returns 0.

##### Money model and ledger
- Pools: `to_assign`, `budget:<cat>` and `goal:<id>`. Pools are never stored; they are replayed from `TX`. Balance = To assign + Σ Budget + Σ Savings.
- Transaction types: opening, income, spend, transfer (multi-source/multi-destination; reasons assign, sweep, cover, move, withdraw), settle (returns[] to pools) and carry (a marker only: a negative category balance carries forward on its own).
- Every money action runs through `commit()`: snapshot → action → invariant check → toast with 5 s Undo. `commit()` rolls back any action that would leave To assign or a goal below ₹0.
- `checkInvariant()` checks three things: pools sum to balance; balance equals opening + income − spend + settle, computed from flows alone; and every split's shares and every transfer's source and destination totals match. It runs `console.assert` and writes to a hidden `#inv` element (`data-ok`). Owed (open IOUs) is reported separately and never enters a pool.
- Settling an IOU: a goal-covered share returns pro rata to that goal. The rest returns to the spend's category while that period is open, otherwise to To assign (Resolved #1).

##### Seed data (deterministic: mulberry32 seed 42 for spends, 99 for shift amounts)
- 1 Apr – 24 Sep 2026, about 500 transactions. Spends come from the v6 generator with a Sep thinning pass. Opening balance ₹6,000.
- Income: Allowance ₹8,000 × 6, split by rule into ₹6,800 across categories plus ₹1,200 to Goa, Motorcycle and General. Part-time × 11 (85/15 rule); the last one (₹1,500, 23 Sep) is unassigned. Gift × 2, Freelance ₹3,000, Scholarship ₹5,000, Refund ₹349.
- Transfers: assigns for every income, 4 June moves from General to Budget, and Headphones funding and withdrawal. Sweeps at the end of Apr and May were Auto (to Goa). Jun–Aug were Manual: 50% assigned the next day, the Aug remainder calibrated. There are 2 calibration moves on 1 Sep that hit the target figures.
- Splits (9): 6 settled groups (11 settling transactions: one after the period closed goes to To assign, and the BookMyShow shares go back to the Goa goal), 2 open groups (Pizza Hut 17 Sep: Arjun ₹400, Meera ₹360, Kabir ₹240; Uber 20 Sep: Riya ₹160) for **₹1,160 owed**, and 1 pending_setup (Pizza Hut ₹960, 22 Sep).
- Covers: 7 at spend time plus 1 goal cover (from To assign, from Food/Transport leftover, and 1 from Goa with a slip). Aug Snacks −₹240 was let go, so Sep carryIn = ₹240. Sep Snacks now sits at −₹240, which creates the "carried to Oct" item.
- Goals: Goa ₹5,120 of ₹8,000 (64%), Motorcycle ₹18,731 of ₹25,000, General ₹760, Headphones reached 20 Jul.
- Today's pools: **To assign ₹1,820 · Budget ₹1,598 · Savings ₹24,611 → Balance ₹28,029.** Owed ₹1,160 sits outside the balance.
- Inbox at today, 5 items: assign ₹1,500 Part-time · Snacks ₹240 over · split ₹960 Pizza Hut · Spotify ₹119 due 27 Sep · PAYTM*QR7731 ₹85 uncategorised. The manual path has 4 (it has no uncategorised UPI item). The Done list has 12 seeded items.

##### Screens (57 frames + 8 sheets)
- **Onboarding (11):** splash (3 dotted pool rings), method (2 lanes), upiSetup, period (3 cards + calendar window), income (chips + custom + pill-block mix), categories, allocate (85/15 split slider, pie with callouts incl. Savings and To assign, per-category sliders), sweepSplit (Auto/Manual flow diagram, Equal/Custom, reminder days), PIN, permissions, allSet (ghost hero, pool bar, "1 thing needs you" chip).
- **Home:** lime hero (safe today, half gauge, red "Carried from Aug −₹240" row) · "N things need you" chip · Pay row · **4 pinned widgets** (default W26, W03, W02, W04; W05 fills the slot when W26 hides) · Small purchases · Subscriptions card W40 → subsList, subDetail, subAdd · Recent activity (category dot, UPI/Manual badge, ↓ ⇄ ⅟ glyphs).
- **Money:** W24 balance split + 3 bold pool % tiles → poolDetail · W43 Owed to you (dashed person pills, Remind share sheet) → owedList (outlined waffle, pending with Mark repaid, settled with "→ returned to" chips) · W19, W21, W23, W28 Sankey (settling link dashed), W30, W29, W20, W25 · incomeSources · transactions (filter chips, diverging 30-day strip) · transactionDetail (spend, income, transfer and settle variants).
- **Actions:** Add grid (Log spend, Add income, Move money, Import Excel placeholder) · inbox cards with a one-tap lime primary, a "…" full flow and "Later" (snooze sheet) · live tab badge and Home chip · Done list. Flows: assignIncome (rule chip, "like last period", "fill underfunded first", live pool bar), settleSplit (people + "Someone else" picker, Equal/Custom, live sum check), overspendResolve, sweepLeftover (goal tiles with before → after %, or keep in To assign), subDue, categorise (top 3 guesses + always-rule), logSpend (keypad, Split toggle with Equal/Custom/Settle later, live impact bullet), addIncome (8 categories + custom, recurring, then Assign now or Later), moveMoney (pool picker, swap, before/after bars, goal slip).
- **Pay:** scan / payContact / bankTransfer → payAmount (Split toggle) → coverSheet (To assign → other category → goal with slip step-line → let it go over, with a next-period notch bar; the first option with enough money is preselected) → upiHandoff → payConfirm (pool bar after, split owed line, round-up ring).
- **Savings:** Goa lime hero (64%), sweep Auto/Manual card (goalPicker when Auto), W34 goal tiles, W32 waffle, W38, W37 (only when saved-from-budget > 0), W36, W35, W39 · goalCreate, goalDetail (step-line with contributions coloured by type and ▼ slip markers), goalReached.
- **Insights:** filter chips; every non-fixed widget from all tabs; pin icon on each; edit mode (jiggle, ⋮⋮ drag, ↑ ↓, − hide, "On Home" preview strip); widget library (grouped by tab, size badge, Add/Hide); not-enough-data state (ghost block + progress ring + caption).
- **Drawer + settings:** profile, 10 rows, Help, Log out · settingsPeriod, Categories, Income, Rules (list + builder + split slider), Accounts (linkage diagram + UPI/manual bar), Splits, Alerts (threshold bullet), PIN change, Permissions.

##### Widgets (44)
W01 · W26 · W03 · W02 · W04 · W05 · W40 · W41 · W06 · W07 · W08 · W09 · W10 · W11 · W12 · W13 · W14 · W15 · W16 · W17 · W18 · W31 · W42 · W24 · W43 · W44 · W19 · W21 · W23 · W28 · W30 · W27 · W29 · W20 · W25 · W22 · W33 · W34 · W32 · W38 · W37 · W36 · W35 · W39. All charts are SVG built from ledger data, and tapping a mark shows its exact value; line and area charts scrub. W14, W15, W44, W27 and W22 are hidden by default (they are in the library).

##### Deviations (with reasons)
- **Pool totals differ from the spec's ₹9,860.** The spec's own goal figures (Goa 64% of ₹8,000 plus Motorcycle 38% of ₹25,000) already add up to more than its Savings total of ₹3,900. I kept To assign ₹1,820, Goa 64%, General ₹760, carry ₹240 and Owed ₹1,160 exactly, and let Budget and Savings come out of the replayed ledger. Motorcycle ends at 75%.
- Safe to spend today is ₹155 (the spec shows ₹318). It is derived: (Budget left + spent today) ÷ 7 days incl. today − spent today.
- Covers: 8, where the spec says 5, because the generator's over-budget months each need one. The mix still includes To assign, category and goal sources.
- The Money period switcher is an inline segmented control, not a separate sheet, and the charts stay on their own time ranges. There is no periodSwitch sheet; peoplePicker, goalPicker, poolPicker, snooze, quickCat, assignNow and remind are present.
- A spend cover covers only the new overage. An existing carried negative stays until the inbox item is resolved.
- Seeded history always uses the 7 starter categories. Categories added in onboarding get ₹0 budgets.
- Period choice (weekly/payday) is saved and previewed, but the seeded prototype runs on monthly periods.

##### Validation
- `node --check` passes. Nav audit: 57 frames; every `go()` and `openSheet()` target exists.
- Playwright (Chromium 1194) click-through, 0 console errors (the only failures were blocked Google Font requests offline): UPI onboarding (invalid ID error, suggestion chip, Match payday, custom income, Auto sweep, PIN mismatch then match), manual onboarding (all transactions Manual, account null), UPI payment ₹450 Snacks → cover from To assign → handoff → confirm, manual ₹300 Food spend with a 3-way split → cover sheet → saved (owed +₹200), settle the pending split with Custom (gap chip shown, then 4 × ₹240, owed +₹720), Mark repaid (balance +₹400, returned to Food), Remind sheet, assign income with Fill underfunded, one-tap overspend cover, sub Looks right, categorise with always-rule, period close + sweep to a goal, move money (an overdraw is blocked), withdraw from a goal (slip line), add income → Later, Undo, pinning W13 → shown on Home, edit mode reorder/hide/library add.
- **The invariant held after every one of the 20+ checked actions** (`ok:true`). Owed stayed separate and changed only through splits and settles.
- No horizontal overflow on any frame or sheet (the filter chip rows scroll inside their own containers). Every frame was screenshotted and reviewed. Fixed after review: pool-bar labels colliding (moved to a legend row), the badge showing 4 instead of 5 (due-date day comparison), W37 empty state on the board, the fill-jar budgets for past months, the edit-mode Hide button colliding with the pin, and To assign going negative when assigning income after covers had used it (now capped, plus a guard in `commit`).

##### Known issues
- Allocation pie callouts crowd on the left with 7 categories + Savings + To assign.
- Sankey labels on the left column sit over the flows, and very thin category nodes lose their labels (the tooltip still has them).
- The slip step-line on the cover sheet is subtle when the pace is low.
- The transaction detail's impact bullet shows the category's current state, not the state at the time of that purchase.
- The "Move ↑/↓" buttons reorder the board. The Home pin order changes only when both swapped widgets are pinned.
- Opening the Money tab with the "Last" or "6 mo" period doesn't re-scope every widget.

### v8 (30 Sep)
*Verbatim from `docs/claude/mockup_v8_build_notes.md`: Trickle v8 — Build notes (Phase 5 + 6). Headings demoted; nothing else changed.*


Artifact: https://claude.ai/artifact/L2N64ytUW88JZ9dTNz3esF ("Trickle — v8"). Source: `/home/claude/v8/` (ledger.js, ui.js, app.js, flows.js, rhythm.js, style.css → build.py → trickle-final-v8.html; scratchpad copy too). Direction B · Tiles. No text-message tracking anywhere (grep = 0): linked UPI IDs or manual entry + statement import placeholder.

##### What's in it
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

##### Data
v7 ledger model renamed: pools new_money · budget:cat · goal:id; invariant new_money + Σbudget + Σsavings == balance == Σflows, transfers balanced, owed outside. Seed (fixed today Mon 21 Sep 2026): budget ₹6,000 (Food 2,400 · Travel 900 · Fun 800 · Essentials 1,400), allowance ₹9,000, Jul–Sep history, Goa ₹4,200/8,000 + Rainy-day ₹878 (savings ₹5,078), balance ₹6,939, Pizza Hut split (₹900 owed), Spotify due Thu, Paytm QR uncategorised.

##### Phase 6 results (validate.js)
- node --check OK; every data-a has a handler; no console errors; no horizontal overflow on any checked frame.
- Numbers visible on first load: Home 0, Money 2 (balance, "₹100 tiles" label), Actions 0, Insights 0 in first screen (3 on full scroll, all tile-unit captions).
- Flows verified with invariant after each (101 checks, all ok): pay overflow from jar, split after pay, pay overflow into next month, log cash, café income split → Undo → Sort it, settle (Food 630 → 930), categorise, check-in, goal create, goal reached + spend, move, pin/reorder/hide widget (pins → Home), period story + fresh start with manual sweep → leftover action, drawer period/glow, tx list/detail, both onboarding paths (UPI / manual, weekly, custom categories).
- prefers-reduced-motion: animations collapse to 1 ms (plus drawer toggle). No red on Home (computed colour scan). Every screenshot reviewed.

##### Known issues / deviations
- Fonts (DM Sans, Fraunces) load from Google Fonts; offline shows Georgia/system fallback.
- Monday check-in lives in Actions (not on Home) to keep Home at zero prompts.
- Fresh start can fill Goa to 100% via the sweep without the "reached" sheet (it shows only when adding from goal detail).
- Recent-spend amounts on Home need a tap into detail (tile glyph gives size); UPI hand-off and QR scan are placeholders.

### v9 (30 Sep)
*Verbatim from `docs/claude/mockup_v9_build_notes.md`: Trickle v9 — Build notes (Phases 3–5). Headings demoted; nothing else changed.*


Artifact: https://claude.ai/artifact/5T3ob4cTpukfmmJts9ayA7 ("Trickle — v9"). Source: `/home/claude/v9/` (ledger.js, ui.js, sound.js, viz.js, app.js, flows.js, rhythm.js, style.css → build.py → trickle-final-v9.html; scratchpad copy too). Validator: validate9.js. No text-message tracking (grep -i sms = 0): linked UPI IDs or manual entry.

##### What's new
- **Tile unit engine** (`unitFor`, `tiles`, `tkey`): ladder ₹10–2,500, caps 30 (S / per-category) and 50 (W/L), partial tile in quarter steps, "1 tile = ₹X" key on every tiled card.
- **Home:** glow + words (B&W: brightness), size-dot recent rows with key, subscription mini dot ring, pinned Goal jar + This month (3-month glowing dot matrix) + Repeat buys, Add widget tile.
- **Pay:** adaptive unit on the tiles step (₹50 for chai), repeat line "3rd time at Chai Tapri this week", fly-out, soft tone on overflow, pay + savings chime on done.
- **Money:** Income = Sankey (sources → Budget/Savings → categories, Left in budget, goals; tile-quantised nodes, animated bands, savings last + chime); Budget grids share one unit + key; Savings adds Savings rate, Savings growing, Rainy-day jar with key, Owed outlined tiles.
- **Insights:** 20 widgets in ref-style cards (title, settings icon, key, tap → exact ₹): Money flow, Where it went, Repeat buys ×4, Spend range, This vs last month, When you spend (24-dot ring), Savings growing (visible); Goal jar, This month, Purchase sizes, Month by month, Savings rate, Weekday pattern, Top places, Subscriptions, Owed to you, Goal ETA (in Add widget). Settings sheet: pin/unpin, move earlier/later, hide, look.
- **Repeat buys detail**, 4th check-in card (repeat buys last week), 5-card period story (Spent in tiles, The little things pour + count-up, Sankey, Leftover, You saved + chime), goal detail with contribution sources + ETA dot path.
- **Drawer:** Look (Colour / B&W), Sounds (On/Off), Count as repeat (3×/4×/5×), Reduce motion.
- **B&W:** black ground, grey ramp + pattern per category (solid / 45° / dots / 135°), savings white glow, pace by words + dashed.
- **Motion:** tile pop (spring, 18 ms stagger ≤600 ms), pour, column rise, dot light-up, Sankey node pop + band draw, glow cross-fade, count-up; entrance animations skip on in-place actions; reduced motion → final state.
- **Sound:** WebAudio, lowpass 2.4 kHz + compressor, per-voice peak ≤0.15 (max measured 0.12), tile tick 0.018 throttled, `save` ≤1 per 1.5 s, unlock on first gesture, mute persisted.

##### Validation (validate9.js, Chromium 412×860)
node --check OK; all data-a handlers exist; no console errors; no overflow. Numbers on first screen (keys excluded): Home 0, Money 1, Actions 0, Insights 0. All 20 widgets in colour and B&W: every tiled card has a key, max 44 tiles (waffles 100). Sankey: middle nodes in = out, sources ₹9,300 = destinations, 10 bands. Flows with invariant after each (124 checks, all ok): pay with repeat line, overflow from jar, split, log cash, café income → Undo → Sort it, settle (Food 580→880), categorise, 4-card check-in, goal create/reached, move, pin/reorder/hide/add widget, story + fresh start + leftover, drawer (B&W, sounds, repeat 4×, weekly, fast glow), both onboarding paths. Reduced motion: tile and band animations 1 ms. Screenshots reviewed (colour + B&W).

##### Deviations / known issues
- Month by month shows 3 months (seed history starts in July), not 6.
- Insights isn't split into section headers; order is user-controlled instead.
- Widget settings have no per-widget unit override or range toggle (Sankey is month only).
- Spend range is dominated by two big days (charger, Pizza Hut split); honest but squashes the other weeks.
- Seed now includes repeat habits (Chai Tapri, Campus Coffee, Metro card), so balances differ slightly from v8.

### v10 (30 Sep)
*Verbatim from `docs/claude/mockup_v10_build_notes.md`: Trickle v10 — Build notes (shape money). Headings demoted; nothing else changed.*


Artifact: https://claude.ai/artifact/VNvhCh4BANCLMjwSC5ewkN ("Trickle — v10"). Source: /home/claude/v10/app/ (ledger, ui, glyph, sound, viz, app, flows, rhythm .js + style.css → build.py → trickle-final-v10.html; scratchpad copy too). Validators: validate9.js (v9 flows + invariant) and v10check.js (shape rules). No text-message tracking: linked UPI IDs or manual entry.

##### What changed
- **glyph.js:** six-glyph ladder (dot ₹10, square ₹50, triangle ₹100, diamond ₹500, coin ₹1000, star ₹5000) from the concept board; `breakdown` (greedy, ₹10 rounding, <₹5 → hollow dot), `pileSpecs`, `pkey` (pile key + "tap for exact ₹"), `goalPile` (saved filled, rest outlined), logo B, splash, onboarding ladder.
- **ui.js `tg`:** every money grid now draws glyph SVGs (min 14px). Single-shape unit engine: UNITS = ladder, ≤40 per chart, key "▲ = ₹100". Specs without a shape (days, hours, visits, % of income) render as plain dots.
- **Splash (first run, not #demo):** six shapes fall into the jar biggest first with ₹ labels and one note each; "Each shape is an amount."; tap/Skip; auto-continues; reduced motion shows the final frame. Onboarding step 1 teaches the ladder.
- **Home:** logo B mark opens the drawer; recent rows show mixed piles (≤8 glyphs, 14px) with a pile key; goal jar is a shape pile.
- **Pay:** category balance as a mixed pile; paying outlines and flies out the leaving glyphs; if change is needed the big glyph breaks ("A ₹500 diamond breaks into change", new change glyphs burst in). Overspend as dashed warm outlines. Notes per leaving glyph (≤6).
- **Money:** balance as pile + key. Income: green new-money shapes fall and recolour into Budget and Savings jars (notes ≤6); Sankey moved out ("See the full flow in Insights"). Savings: goal piles, rainy-day jar pile ("almost empty" under ₹5). Budget grids stay one shape per chart.
- **Income sheet:** green glyphs move into Budget / goal slots and recolour.
- **Insights:** all money widgets use glyphs; Sankey nodes are shape stacks in the chart unit.
- **Drawer:** logo + wordmark, Sound on / Mute, Colour / B&W (shape unchanged in B&W).

##### Validation
node --check OK; all data-a targets exist; v9 flow suite (invariant after each action, colour + B&W, both onboarding paths, reduced motion) no errors; v10check: every glyph grid has a key or tap total, single-shape charts use one shape and ≤40 glyphs, min glyph 14px, invariant + no overflow on every tab/sheet/story card in colour and B&W; splash reduced motion = final frame; grep -i sms = 0. Screenshots reviewed at 1x and 2x.

##### Deviations / known issues
- Spend range stays a dot/line chart with a gridline key (not glyphs).
- Income-arrived sheet uses one shape per unit, not a mixed pile, so it can animate slot by slot.
- Partial single-shape glyphs are clipped from the bottom (reads OK for triangle/diamond, weaker for dot).
- Money › Income jars show one month; big months cap at 24 glyphs per jar.

### v11 (30 Sep to 1 Oct)
*Verbatim from `docs/claude/mockup_v11_build_notes.md`: Trickle v11: Build notes (Phase 10). Headings demoted; nothing else changed.*


Artifact: https://claude.ai/artifact/4UpBjSSpxPXQiTjT9e7wGc ("Trickle — v11"). Add `#demo` to skip setup (loads Tarun, hostel, ₹9,000, 12 September). Source is in /home/claude/v11/app/: store.js, tiles.js, sound.js, app.js and style.css, bundled by build.py into trickle-final-v11.html (a copy is in the scratchpad).

##### Build order followed (Phase 9)
1. **Store and ledger** (store.js): one store and one set of reads (`left`, `catsTotal`, `savingsTotal` and so on), so screens never compute their own totals. It covers the Phase 5 setup (A+F+E hybrid, type mixes, rounded to tiles, remainder to Other), income split with undo, pay and undo, move tiles, starting lighter, using savings, splits and pay-backs, subscriptions (due, price change, add, stop tracking), goals, and month close (left over → savings, or kept if the setting is on). `checkLedger()` implements checks 1–8 and also runs after every render. The seed reproduces Food 3,100 / Travel 1,000 / Study 700 / Fun 1,400 / Other 752, subscriptions 648 and savings 1,400.
2. **tiles.js v2**: mode F only, with `UNIT=100` defined once. It draws rows of 10 with a 5|5 gap, a partial tile filled from the bottom, 10×10 squares above 100 tiles, and four states (fill, outlined, hatched, dashed). It has drop and leave animations, B&W pattern definitions, and legend swatches.
3. **Shell and tokens**: dark first, with light and B&W. The widget grid uses S, W and L sizes. The pill tab bar is Home · Money · Pay · Insights, and settings sits in a header button. Screens pad 120 px at the bottom so the tab bar never clips content.
4. **Setup S-00 to S-04**: the splash drops tiles into a two-row jar and shows the tile-and-drip logo (v10 timing). S-01 has the detected UPI amount or a manual pad, S-02 picks a type, S-03 has the savings stepper, and S-04 shows the split bar with a legend. With defaults that is 4 taps.
5. **Home H-01**: pace glow with a word, Saved this month, Next to come out, This week, Little things, plus Add a card (library: Goal rows, Month so far, Where it went, Friends owe you, Spend range). It shows 0 numbers, and exact ₹ appear on tap.
6. **Pay P-01 to P-06**: pick who → jar (preselected) → "Pay ₹X with UPI" → tiles leave and the UPI hand-off appears → done, with the repeat line, split and undo. P-05 handles an empty jar ("Take from …") and the case where all spending money is used up (start lighter or use savings). P-06 is the split.
7. **Money M-01 to M-06**: overview with a split bar and one number, jar detail, subscriptions (with a 3-step add and stop tracking), savings and goal rows, move tiles, and friends owe you.
8. **Sheets N-01 and N-02**: money in ("Split it", Undo for 8 s, plus the unknown-credit question) and price change.
9. **Insights I-01 to I-03 and N-03**: week against last week, month-so-far calendar (not in tile units, no key), where it went, little things, the 5-card story ending "You saved ₹X" → Start a fresh month, a flow-of-tiles view, and the weekly check-in.
10. **Sound and motion**: the v9 WebAudio engine (2.4 kHz lowpass, compressor, peak ≤0.15), plus a thud and a swish (tile ticks capped at 10). Honours `prefers-reduced-motion` and the Less motion setting.
11. **Settings X-01**: Look (Colour / B&W), Theme, Sounds, Less motion, Keep left over, linked UPI (tarun@okaxis), the privacy line, **Try a moment** (10 simulated notifications from Phase 7), and Start setup again.
12. **Validation**: see v11_phase11_validation.md.

##### Deviations
- Home "Little things" shows "Chai this week" as the subtitle. "Chai ×4 ≈ 1 tile" appears on tap, so Home keeps 0 numbers.
- Price change takes the difference from the jar with the most tiles left, as the Phase 5 rule says. The Phase 8 example says "Other"; the seed gives Food.
- The pace glow is neutral (Phase 6), not green or amber (Phase 0).
- Story amounts are computed rather than hardcoded (the seed gives ₹5,682 at day 12, not ₹2,150).
- M-05 uses From/To chips with a tile stepper instead of drag. Drag is not built.
- The notification caps (≤1 a day, quiet hours) are stated in the UI but not enforced by a clock.
- UPI hand-off, AutoPay detection and incoming credits are simulated.

### v12 (1 Oct)
*Verbatim from `docs/claude/mockup_v12_build_notes.md`: Trickle v12 — build notes (Phase 9). Headings demoted; nothing else changed.*


Prototype: https://claude.ai/artifact/PuDjHposoni47zo1qzGxZr · file /home/claude/v12/app/trickle-final-v12.html (copy in scratchpad) · design system: https://claude.ai/artifact/5wmMrG8kYqj3gLe2BGStNj

##### Deep links
`#demo` seed (Tarun, hostel, Chennai, Wed 14 Oct 2026, UPI tarun@okaxis) · no hash / `#fresh` onboarding · `#frame=<id>` or `#<id>` any of the 75 frames · `#demo&seed=day1|lapse|monthend|bigincome|emptyjars` scenarios (lapse opens R-01, monthend opens R-02).

##### Files (/home/claude/v12/app)
| File | Role |
|---|---|
| store.js | One ledger: months map (May–Sep closed, Oct open), derived reads, 30 actions through `act()` (snapshot undo + one bell log entry + checkLedger), 12 invariants, demo seed (6-month mulberry32(42) history, see below), Starter-month seeds for 4 student types, `A.tick()` day advance (held subs → paid, 0 taps) |
| dots.js | Ladder renderer: crumb wedge (clockwise from 12, area-true) → dot → pill → block (1-unit hairline gap); states solid / out 1.6px / held / owed dashed / ghost / hatch; jar-4 stripe pattern; zoom one level; `key()`; `glowTrack()`; `DENSITY` constant (size follows surface) |
| motion.js | Phase 12: `MS` engine behind `fx()` — WAAPI moments, hybrid WebAudio sound, haptics, screen/sheet transitions, press feedback, `reduced()` |
| app.js | Shell: header (?, gear, bell soft dot, avatar), floating 5-icon pill + round Pay, router (`go/back/toTab`, tab intros on first visit), sheets over base frames, toasts with Undo, `fx(name,el)` motion/sound hook with reduced-motion fallback |
| screens1–3.js | 75 frames (onboarding 6, Home 5, Income 10, Spending 15, Savings 8, Insights 9, Pay 8, app-wide 6, retention/system 8) |
| actions.js | UI handlers, `notifSim(days)` (≤1/day, ≤3/week, quiet 22–08) |
| style.css | Direction A tokens dark + light companion, `data-mode` override, `.bw` patterns, reduced motion |
| build12.py | Bundles to trickle-final-v12.html + t12.html (validator copy) + all.js |
| validate12.js | Phase 10 validator; shot.js + sheet.py for contact sheets |

##### Per tab
- **Home** — widget grid: Pace (word + glow), Jar left, Little things, Subscriptions next due, Next money in, Goal; add tile; 0 numbers. Bell: needs-you (sort with 3 jar chips, refund, split it) above a 90-day log with tab filters. Edit board (reorder/hide, max 6) + widget library of number-free forms.
- **Income** — next money in (glow), this split (green savings first, ink budget), sources, where money sits (jars + held dashed, savings, owed dashed outside). Demo chips trigger I-04 (one confirm + Undo) and I-05 (irregular: for this month / keep for later / friend paying back). Settings: sources, savings share, split order, period.
- **Spending** — "₹X a day for the rest of October", day lanes (today ringed with glow, future re-spread), one card per jar (expand in place: exact ₹ + per day), held subscriptions, owed, repeat buys. All spends with filters; jar detail with ghost of last month + hatched extra; spend detail (change jar, split); subscription year cost; friend remind with UPI pay link; sort sheet. Settings S-S1…S-S7 (import is a disabled placeholder).
- **Savings** — goal (saved solid / to go outline), ETA glow, growth by month, leftover rolled; all goals + general; add ₹100/₹500, withdraw sheet; bangle close on completion (auto V-04). New goal 3 steps, goal order, leftover rule.
- **Insights** — What changed (ghost + hatch), Category share, Small buys add up (own-chai equivalent), Month story; library of 12 views (dot-ribbon Sankey with two-column fallback, glow calendar and time of day, drift, weekday, range, big one-offs, subscription year cost, savings rate, money as time, month by month); 5-card story + share poster (amounts hidden by default); weekly check-in.
- **Pay** — round button on every tab → camera (tap frame to simulate scan), Pay UPI ID, Log cash; amount screen with guessed jar chip, repeat line, per-day line only when the jar runs low, split toggle; empty jar asks once before UPI (take from a jar / start lighter / use savings); hourglass placeholder then toast + Undo back on the tab you came from.

##### Notes
- No SMS string anywhere in the bundle (grep = 0). Manual-only onboarding links no UPI IDs.
- Geist loads from Google Fonts; the validator sandbox blocks it, so screenshots show the system fallback.
- All motion goes through `fx()` → motion.js (see Motion + sound below).

##### 6-month seed (applied 2026-10-01)
`#demo` now carries May–Oct 2026 (was Jul–Oct), fixed RNG mulberry32(42). Every month: ₹9,000 allowance split ₹2,000 savings (₹1,000 Goa + ₹1,000 phone) / ₹7,000 budget; Spotify ₹119, Google One ₹130, Prime Video ₹179 → ₹299 from August (price change; Study jar absorbs the difference); daily Ramu chai (~55% of days) plus generated spends from student places; leftover rolled to Goa at month-end.
- **May** — calm mess-canteen month, daytime hours; Amma birthday gift ₹2,000 (kept for later); Book Palace ₹540; kept ₹820.
- **Jun** — exams: late-night Swiggy; Travel ran long → ₹300 taken from Fun, Study topped up ₹200 from Food; semester textbooks ₹780; freelance ₹2,500; kept ₹50.
- **Jul** — weekend PVR heavy; Saravana Bhavan ₹1,600 split 4 ways, all paid back; concert ₹650; birthday treat ₹250 started Aug lighter; kept ₹0.
- **Aug** — weekend metro; Food → Fun ₹250; Zomato ₹840 split with 2 (repaid); Decathlon refund ₹899 to savings; kept ₹600.
- **Sep** — early-morning chai month; bus to Madurai ₹620; freelance ₹1,800; allowance late (3rd); kept ₹640.
- **Oct** — unchanged open month (owed, refund pending, unsorted QR).
Goa target raised to ₹14,000 (now ₹8,110); phone ₹6,000/15,000; general savings ₹8,699. Savings "Growth by month" now renders as one card per 3 months so each card stays ≤30 marks. Ledger invariants hold for all months and all 5 scenario seeds; validate12.js 37/37 checks (flows 24/26: F4u and F11 are tap-count targets, unrelated to the seed).

##### Motion + sound (Phase 12, applied 2026-10-01)
Decisions P12-Q1…Q5 (claude/v12_decisions.md); specs from claude/v12_phase12_motion_sound.md; ported from the lab's "Recommended" pane.

**Engine (motion.js).** The rendered DOM is always the final state; WAAPI animations run *from* a start state (`fill:'backwards'`), so a skipped, cancelled or reduced animation can never leave a stuck state. Only transform, opacity, stroke-dashoffset (and fill-opacity on the pay outline) animate; ≤30 marks per moment; no per-frame JS. Calm = cubic-bezier(.4,0,.2,1) 480 ms, enter (.2,.8,.2,1), stagger 60. Tactile = spring k320 c26 pre-sampled into CSS `linear()` (fallback overshoot bezier), gravity ease-in (.55,0,1,.45) for drops, press .94.

| Moment | Hook | Motion | Sound (hybrid) | Haptic |
|---|---|---|---|---|
| Splash | `splash.trickle` | wordmark 500 ms, 5 dots trickle 520 ms, stagger 120 (calm) | chimes (after first tap) | — |
| Pay | `pay.hourglass` (P-05) | up to 4 marks drop 620 ms gravity + landing squash, then turn to 1.6px outlines | coin `leave` | [8,60,8,60,14] |
| Crumb snap | `crumbs.snap` (Home after a non-₹100 pay) | ≤4 crumbs spring-snap (tactile) | coin `snap` | [4,30,4,30,4,30,18] |
| Income + split | `savings.drop` (I-04, O-03), `income.split` | savings marks fade-rise first, jars 480 ms later (calm) | chimes `arrive` → `split` | [10] |
| Empty-jar question | P-06 / P-06b sheet, `jar.respread` | card rises 320 ms calm; no shake, no warning colour | wooden `ask`, `drop` | [6] |
| Goal milestones + bangle | `goal.bangle` (V-04), `goal.add` | ring fills 480 ms per 25% step, close 900 ms + 1.04 halo | chimes milestone ×n, `complete` | [8], [20,80,20] |
| Month-end → story | `monthend.sweep`, `story.frame` | kept dots glide in on card 1; cards fade-rise 420 ms | chimes `sweep`; last card `kept` | [10] |
| Chart draw-ins | Insights, Spending, Savings, Income on navigation | first chart's marks fill (stagger 18), others fade 700 ms | silent | — |
| Tap-zoom | `dots.merge` | zoomed marks spring in, stagger 14, ≤30 | wooden `zoom` | [8] |
| Home glow shift | H-01 once per app open | "now" glow glides + cross-fades 1.6 s ease-in-out (mono) | silent | — |
| Sheets / tabs / push | render() | sheet springs up (calm for P-06, R-02); closes as an inert clone 240 ms gravity; tab fade 200 ms; push slide 16 px | wooden `sheetUp`/`sheetDown`/`tab` | [6] on sheet |
| Button press | pointerdown on buttons, chips, list rows, tabs, Pay | .94 spring back | wooden `press` | [8] |

**Sound rules.** WebAudio only: master 0.9 → lowpass 5 kHz → compressor (−24 dB, 4:1) → limiter (−3 dB, 20:1); each voice ≤0.15; unlocks on the first tap/key; max 1 sound per 300 ms — a higher-priority sound ducks the earlier one to 30%, an equal/lower one is dropped. On by default.

**Settings (G-S4 Sounds and motion, from avatar → app settings).** Sounds on/off · Haptics on/off · Phone on silent (demo; real build reads ringer mode — no sound, haptics allowed) · Motion: Follow phone (default) / Reduce / Full. Prefs: `sound:true, haptics:true, silent:false, motion:'system'`.

**Reduced motion.** `reduced()` = override or `prefers-reduced-motion`; no animation is created at all (final states shown), sounds still play, CSS animations/transitions off.

**Test hooks.** `MS.log` (sound/haptic results), `MS.snd(evt)`, `MS.anims`, `MS.running()`.

### v13 (1 to 2 Oct)
*Verbatim from `docs/claude/mockup_v13_build_notes.md`: Trickle v13 — mockup build notes. Headings demoted; nothing else changed.*


Prototype: https://claude.ai/artifact/7p8hkxT1Bucq76CySm5DEF (open with #demo to skip onboarding; #fresh for onboarding; scenario seeds #seed=lapse, monthend, bigincome, emptyjars, day1 as in v12).
Design system: https://claude.ai/artifact/A5xYpgoLKZwngjH2uV36FT · Decisions: claude/v13_decisions.md

##### Source (/home/claude/v13/app)
- Copied from v12: store.js (6-month seed May–Oct 2026, today 14 Oct), dots.js, app.js, motion.js, screens1–3.js, actions.js, style.css.
- New: id13.js (gradient library GRAD, PACE scale, mark(), lockup(), zt() template, zbtn/zlink, homeGlow(), gradient-depth defs GRDEFS injected into PATDEFS), theme13.css (v13 tokens, gradient marks, Home glow, template styles, light/B&W handling, Grove Pay button).
- Changed: screens1.js (O-00…O-04 and the 5 intros rebuilt on zt(); Home gets homeGlow()), screens3.js (R-01 on zt()), app.js (header wordmark carries the mark), motion.js (splash motion targets the template headline).
- Build: python3 build13.py → trickle-final-v13.html (+ t13.html, all.js). Validate: node validate13.js → val13.txt / val13.json, screenshots shots/val13/ (incl. tpl-*.png for every template screen, dark and light).

##### Validation (2 Oct 2026)
CHECKS 41/41, FLOWS 24/26 (same two accepted v12 deviations: F4u Pay UPI ID 4 taps, P11-Q1; F11 new goal 4 taps, P11-Q2).
All v12 checks re-run and passing: ledger invariants after every render and 150 random actions, ≤2 numbers per screen (Home 0), dot ladder/crumb/fusing, key once per screen, no red (4 looks × 75 frames), no SMS, no guilt words, themes, B&W patterns, reduced motion, 44px targets, no overflow, P12 motion + sound, 0 console errors.
New v13 checks:
- 12 template screens × dark/light match the Zentra template (glow at top ≥280px, mark + wordmark, ≥30px 2-line headline with accent phrase in a colour ≠ ink, subline, step dots with ≥16px pill, full-width accent button, no button + options together); 7 gradients in use.
- Each tab intro uses its own gradient (grove · payday · cool · savings · tide).
- Home pace glow: Ember for Quick (demo), Grove otherwise.
- Solid marks use gradient-depth fills.

##### Known issues
- Home pace glow is mostly visible behind the header; cards cover the rest (by design, like v10).
- Light-mode glows are paler (55%) and accent text is darkened with a CSS filter rather than separate tokens.
- Month story / goal-complete screens keep v12 styling; the Month Story and Goal Reached gradients are defined in the library but not yet applied to those screens.
- Figma: Income and Insights key screens not rebuilt in Figma (prototype only); crumb wedge in the Figma dot-system board is drawn as a half arc.


---

## Appendix J. The interview coding in full
The only primary data in the repo (Part 2).
### Bryman four-step coding, six interviews
*Verbatim from `docs/research/brymans_analysis_interviews.md`: Bryman's 4 step analysis. Headings demoted; nothing else changed.*


##### Page 1

###### Tarun

| # | Statement | Code |
|---|---|---|
| 1 | I don't have a budget | no planning |
| 2 | I make a lot of purchases in one go | Multiple purchases at once |
| 3 | I buy coffee, tea, snacks and atleast one meal a day | Food, Snacks and Refreshments |
| 4 | I bought coffee 5 times that 100 rupees | Small purchases adding up |
| 5 | I did not plan to make these unplanned purchases | Unplanned purchases |
| 6 | I think about value addition when making big purchases | Value based purchase decision |
| 7 | I check my balance and then I go "What happened? How did I even spend that much" | Surprised by accumulated spending |
| 8 | I expect to spend 100 to 150 a day but it might be closer to 350 to 400 | Expected vs actual spending |
| 9 | It's way too tedious to keep track of spending using UPI apps | Tedious manual spending tracking |

##### Page 2

###### Tarun

| # | Statement | Code |
|---|---|---|
| 10 | I ask my parents for money | [crossed out: lack of income] — Relies on parents for money |
| 11 | I want to be more aware of spending and the purchases I'm making | [crossed out: Financial Awareness] — Desire for spending awareness |

###### Nishad

| # | Statement | Code |
|---|---|---|
| 1 | I some money aside for casual use and save the rest | Allocates money for casual spending |
| 2 | I have three different accounts which serve different accounts | Purpose based account separation |
| 3 | I spend on food, beverages, stationeries | Food, necessities and beverages |
| 4 | It's very hard to keep track of certain subscriptions | Difficulty tracking subscriptions |
| 5 | Cigarettes, confectionery and other small refreshments are possible and I don't keep track of them | Untracked small purchases |
| 6 | I used to check of my balance and get surprised before but recently I don't feel like I spent enough | Surprised by spending |

##### Page 3

###### Nishad

| # | Statement | Code |
|---|---|---|
| 7 | I guess and estimate my balance | Estimate balance mentally |
| 8 | I don't really have a fear of checking my balance. I check it once a week. | Weekly balance checking |
| 9 | I usually have money set aside for my generous purchases. | Money reserved for discretionary purchase |
| 10 | When there is an offer, I buy things because I don't want to wait for a long time for the offer to come back. | Offer driven purchasing |
| 11 | When I'm travelling and when I'm with my friends I spend more than normal | High spending in social situations |
| 12 | I'm earning money so this give a good justification for me to spend some money. | Income based spending justification |

##### Page 4

###### Yash

| # | Statement | Code |
|---|---|---|
| 1 | I usually spend my money over quick commerce apps | Use quick commerce for purchases |
| 2 | I do very impulsive ordering in quick commerce | Impulsive quick commerce ordering |
| 3 | If I order upto this amount then I'll get free delivery | Free delivery threshold |
| 4 | I started, adding, adding, adding | Checkout recommendations influence purchase |
| 5 | They recommend things when your ordering | Checkout recommendations influence purchase |
| 6 | I end up adding all irrelevant things in | Adds unnecessary items |
| 7 | I usually don't have a fixed budget | No fixed spending budget |
| 8 | Maybe I'll just go upto thousand rupees | Uses mental spending limits |
| 9 | It's not a fixed budget, I do have the mental thing | Flexible mental spending limit |
| 10 | I'm buying one item, but I end up adding three, four more | Adds multiple items to one purchase |
| 11 | The discounts thing catches my attention | Discounts attract attention |

##### Page 5

###### Yash

| # | Statement | Code |
|---|---|---|
| 12 | If you order within 15mins, you get 200 off | Limited time offer creates urgency |
| 13 | I don't have to worry about how much money my wallet is having | No physical cash constraint |
| 14 | If there was a goal I would spend towards that will help me have motivation to save money | Goal based saving motivation |
| 15 | It takes a lot of time to track everything | Time consuming spending tracking |

###### Gautham

| # | Statement | Code |
|---|---|---|
| 1 | I don't | No formal budgeting |
| 2 | I tend to be impulsive sometimes with money | Occasional impulsive spending |
| 3 | I just try to avoid situations like that | Avoids spending triggers |
| 4 | Do I really need it? I don't | Questions purchase necessity |
| 5 | It's all in my mind | Relies on mental tracking |
| 6 | Mostly food and beverages | Food and beverage spending |
| 7 | YouTube subscription or music | Subscription spending |
| 8 | I check my balance everyday | Daily balance checking |

##### Page 6

###### Gautham

| # | Statement | Code |
|---|---|---|
| 9 | I'm very aware of how much money I have | High balance awareness |
| 10 | Sometimes it does stop me from spending | Balance checking creates spending friction |
| 11 | I want this right now, let's get it | Immediate desire overrides restraint |

###### Harsh

| # | Statement | Code |
|---|---|---|
| 1 | I try to make good decisions with my money | Deliberate money decisions |
| 2 | I usually don't spend wastefully | Avoids wasteful spending |
| 3 | I end up saving some money in the end | Retains money through spending restraint |
| 4 | My problem is not very specifically with overspending | Does not identify overspending as main problem |
| 5 | It's with knowing where I want to spend | Wants clarity about spending priorities |
| 6 | You can have a fixed budget for everything individually | Category level budgeting |
| 7 | Food is this thing where you make small purchase and it keeps adding up | Small food purchases accumulate |
| 8 | Sometimes I am surprised by spending | Occasional spending surprise |

##### Page 7

###### Harsh

| # | Statement | Code |
|---|---|---|
| 9 | The bills shot up to 3-4k even for a single dinner | High spending episode |
| 10 | I have to sometimes compensate for it by not spending anything at all | Reduces later spending after high expenditure |
| 11 | I'm mostly very mindful of my purchases | Mindful purchase behaviour |

###### Vaishak

| # | Statement | Code |
|---|---|---|
| 1 | No budgeting. No set amounts | No formal budgeting |
| 2 | I don't do that. Used to do that | Previously tracked spending |
| 3 | Food, food food. only food | Predominantly food spending |
| 4 | Monthly, some big purchase. shoes | Occasional large purchase |
| 5 | It is too tedious | Tedious spending tracking |
| 6 | I want it to be automatic | Wants automated tracking |
| 7 | Take it from my GPAY | Wants automatic transaction tracking |
| 8 | UPI has made it easier to spend | Digital payments make spending easier |
| 9 | Sometimes I am shocked by spending | Occasional spending surprise |
| 10 | I used to have a buffer which I did not touch | Maintains spending buffer |
| 11 | Nowadays its just zero rupees | Buffer depletion |

##### Page 8

#### Developing theme

###### Group 1

1. no planning
2. unplanned purchases
3. value based purchase decisions
4. Allocates money for purchases
5. Money reserved for discretionary purchases
6. No formal budgeting
7. Deliberate money

**Participants:** Tarun, Nishad, Yash, Gautham's, Vaishak

**Theme:** Varied approaches to spending and money management

###### Group 2

1. Multiple purchases at once
2. [crossed out] offers affect decision purchasing
3. High spending in Social situations
4. Use quick commerce for purchases
5. Impulsive quick commerce ordering
6. Free delivery threshold
7. occasional impulsive spending
8. Immediate desire overrides restraint
9. High spending episodes
10. No previous spending issue
11. Occasional large purchase

**Participants:** Tarun, Nishad, Yash, Gautham, Vaishak

**Theme:** Spending decisions are influenced by the situation

##### Page 9

###### Developing theme

###### Group 3

1. Food, snacks and beverages
2. Small purchases adding up
3. Untracked small purchases
4. Small food purchases accumulate

**Participants:** Tarun, Nishad, Yash, Harsh, Vaishak

**Theme:** Small everyday purchases become significant through accumulation

###### Group 4

1. Surprised by accumulated spending
2. Expected vs actual spending
3. Surprised by spending
4. No physical cash constraint
5. Occasional spending surprise

**Participants:** Tarun, Yash, Nishad, Harsh, Vaishak

**Theme:** Spending awareness comes late after the money has already spent

##### Page 10

###### Group 5

1. Tedious manual spending tracking
2. Purpose based account separation
3. Difficulty tracking subscriptions
4. No fixed budget for spending
5. Uses mental spending limits
6. Time consuming spending tracking
7. Tedious spending tracking
8. Wants automated tracking
9. Maintains spending buffer

**Participants:** Tarun, Nishad, Yash, Gautham, Vaishak

**Theme:** Tracking requires too much effort and students want control without diminishing discretionary spending

###### Group 6

1. Relies on Parents for money
2. Desire for spending awareness
3. Estimate balance mentally
4. Weekly balance checking
5. Income based spending justification
6. Goal based spending motivation
7. Question purchase necessity
8. Daily balance checking
9. Wants clarity about spending
10. Category level budgeting
11. Reduce later spending

**Participants:** Tarun, Nishad, Yash, Harsh, Vaishak

**Theme:** Developing awareness and control over spending

##### Page 11

#### Themes

1. Varied approaches to spending and money management
2. Spending decisions are influenced by the situation
3. Small everyday purchases become significant through accumulation
4. Spending awareness comes after money is already spent
5. Challenges with tracking and wanting control without eliminating discretionary spending
6. Developing awareness and control over spending

###### Notes / insights

I cannot measure impact from paying and its cumulative impact

Digital payments and situation payment (unusual) and compelling

Just do hard to break old habits

Students want to understand patterns and maintain control without feeling restricted in their every choices

##### Page 12

###### Pattern

**Spending is easy**

↓

**Tracking is difficult**

↓

**Awareness comes late**

#### Conclusion

The key conclusion indicates that the key challenge in student spending is the gap in making a payment and perceiving its accumulative impact. Digital payments make everyday spending convenient and students find themselves in situations where they spend more than usual. This is accompanied by the difficulty of tracking and make awareness high-upside. Students therefore need a way to understand their spending more easily and maintain control without feeling restricted in their daily choices.


---

## Appendix K. The v12 recovery audit
The inventory of 152 items built across v2 to v11, with what v11 dropped and what was brought back (Part 4).
### Recovery audit
*Verbatim from `docs/claude/v12_phase1_recovery.md`: Trickle v12 — Phase 1: Recovery audit. Headings demoted; nothing else changed.*


Sources: v11_phase1_audit, build notes v6–v11, v7 widget catalogue, v9 spec, v11 viz + execution docs; builds v2–v11 opened in Playwright (412×860, `#demo`); new element shots of all 8 visible v9 Insights widgets plus crops of v7 Insights, v6 subscription detail and the v11 audit shots. Constraint held: UPI link or manual entry only; the lo-fi SMS screen is listed only as a NO.

##### Counts
- Items inventoried: **152** (kept in v11: 46, partial: 23, dropped: 83)
- Recommendation: **MUST 78** (45 already in v11 + **33 to bring back**), **NICE 34**, **NO 40**
- Depth for returning MUSTs: Glance 3, Explore 16, Detail 14

##### Principle for returning items
Nothing returns to Home as a number. Glance = a Home card or a moment that needs no reading; Explore = one tap (a card on Insights, a section on Money, a sheet); Detail = two taps or Settings. A returning insight must answer one question a student actually asks, and use the ₹100 tile, a word, or a position (calendar/time) — never a new chart vocabulary.

##### Why v11 lost so much
1. The v11 rebuild started from the core loop (pay, glance, income, save) and stopped there: Actions tab, transactions list and goal detail were never rebuilt, not rejected.
2. Every widget that could not be drawn in ₹100 tiles was cut (time of day, month-by-month, ETA).
3. Editing (jars, periods, income sources, savings share) was folded into a 4-tap setup with no way back.
4. Some cuts were deliberate and stay cut: numbers on Home, red, cover sheets, streaks, sliders, chart-library breadth.


##### Tracking
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Linked UPI IDs (more than one) | 2-10 | Which of my UPI apps is tracked? | Partial | v11 has one ID, no "link another" | L | **MUST** | Detail | Most students use 2 apps (GPay + PhonePe); one ID misses spends |
| 2 | Manual spend entry ("Log cash") | 2-10 | How do I add a cash spend? | Partial | only a setup pad; Pay assumes UPI | L | **MUST** | Glance | Constraint: manual must be as fast as UPI; one button beside Pay |
| 3 | Manual-only tracking path | 6-9 | Can I use Trickle without linking UPI? | Dropped | setup collapsed to 4 taps | M | **MUST** | Detail | Hard constraint says UPI or manual; both paths must exist |
| 4 | All spends list with filter chips | 2,6,7,8,9 | What did I actually buy? | Dropped | cut to keep numbers off screens | M | **MUST** | Explore | Basic trust: people check a list before trusting a chart |
| 5 | Spend detail (change jar, split, source) | 6-9 | Was this put in the right jar? | Dropped | no list, so no detail | M | **MUST** | Detail | Wrong categories poison every insight |
| 6 | Sort an unknown UPI payment (top 3 guesses) | 7,8,9 | What was "PAYTM*QR7731"? | Dropped | Actions tab removed | M | **MUST** | Explore | UPI merchant names are cryptic; one-tap guess keeps data clean |
| 7 | Remember payee to jar | 7,8 | Will it remember next time? | Dropped | not rebuilt | L | **MUST** | Detail | Invisible default; reduces sorting to near zero |
| 8 | Recent spends on Home (size glyph) | 2-10 | Did that payment go through? | Dropped | Home kept at 0 numbers | L | **NICE** | Glance | Reassurance; show 3 tile glyphs, amount on tap |
| 9 | Bank statement CSV/Excel import | 7,8 (placeholder) | Can I bring my last month in? | Dropped | never built | H | **NICE** | Detail | Fills week-1 empty state; complex mapping |
| 10 | UPI / Manual badge on rows | 6,7 | Where did this entry come from? | Dropped | noise | L | **NICE** | Detail | Only in spend detail |
| 11 | Linkage diagram and source share bar | 6,7 | How much is auto-tracked? | Dropped | numbers, low value | M | **NO** | — | Designer view, not a user question |
| 12 | Unknown credit question | 11 | Is this money in mine? | Kept | — | L | **MUST** | Explore | Kept |
| 13 | UPI AutoPay detection | 11 | Which charges repeat? | Kept | — | M | **MUST** | Detail | Kept (simulated) |
| 14 | Undo toast on money actions | 7-11 | Can I take that back? | Kept | — | L | **MUST** | Glance | Kept |
| 15 | Ledger invariant check | 7-11 | Are the numbers right? | Kept | — | M | **MUST** | Detail | Kept, internal |

##### Paying
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 16 | Scan QR entry point | 6,7,8 | Pay a shop fast | Partial | Pay starts at "pick who" | L | **MUST** | Glance | The most common student payment; one tap from Pay |
| 17 | Pay contact / bank transfer screens | 6,7 | Pay a friend or account | Dropped | UPI app does this | M | **NO** | — | Hand-off to UPI app covers it |
| 18 | Category tiles leave at pay | 8-11 | What does this cost my jar? | Kept | — | M | **MUST** | Glance | Core v11 moment |
| 19 | Friction sheet with pace tick | 2,6 | Should I really buy this? | Dropped | replaced by tiles leaving | M | **NO** | — | Tiles leaving is the friction |
| 20 | "Food can cover this" line | 8-11 | Is there room? | Kept | — | L | **MUST** | Glance | Kept |
| 21 | Empty jar: take from another jar | 7,8,11 | What if the jar is empty? | Kept | — | M | **MUST** | Explore | Kept (P-05) |
| 22 | 4-option cover sheet with slip line | 7 | Where should overspend come from? | Dropped | 29 numbers, panic | H | **NO** | — | One preselected choice replaced it |
| 23 | "Next month starts a little lighter" | 8,11 | Can I borrow from next month? | Kept | — | L | **MUST** | Explore | Kept |
| 24 | Repeat line "3rd time this week" | 9,11 | Am I doing this a lot? | Kept | — | L | **MUST** | Glance | Kept |
| 25 | Round-up to savings at pay | 6,7 | Can small change save for me? | Dropped | extra decision | M | **NICE** | Detail | Opt-in setting; Fi/Jupiter users like it; off by default |
| 26 | Split at pay | 7-11 | Friends will pay me back | Kept | — | M | **MUST** | Explore | Kept |
| 27 | Suggested jar at pay | 8-11 | Which jar? | Kept | — | L | **MUST** | Glance | Kept |
| 28 | Live impact bullet on entry | 6,7 | How does this move my budget? | Dropped | numbers | M | **NO** | — | Tiles leaving shows it |
| 29 | Pre-pay interstitial (lo-fi) | Lo-fi | Pause before paying | Dropped | superseded | M | **NO** | — | Superseded by tile moment |

##### Budgeting
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 30 | Jar tile bars | 8-11 | How much is left per jar? | Kept | — | M | **MUST** | Explore | Kept |
| 31 | Jar history (spends + weeks in jar detail) | 4-7 | Where did my Food money go? | Partial | M-02 shows tiles only | M | **MUST** | Detail | Answers "why is Food low" without a chart library |
| 32 | Category % cards on Home | 7 | Which jar is near empty? | Dropped | 75 numbers on Home | M | **NO** | — | Ostrich effect; budget stays off Home |
| 33 | Safe to spend today | 3-7 | How much today? | Dropped | number on Home caused panic | M | **NICE** | Detail | Only on tap inside Money, words first |
| 34 | Budget runway "lasts till ~28th" | 7 | Will it last the month? | Dropped | alarm framing | M | **NICE** | Explore | As words in jar detail: "Food lasts to about the 26th" |
| 35 | Pace projection bullet | 5,6,7 | Where will I end the month? | Partial | glow word only | M | **NICE** | Detail | Glow stays the glance; projection one tap deeper |
| 36 | Pace glow + word | 8-11 | Am I on track? | Kept | — | L | **MUST** | Glance | Kept |
| 37 | Move tiles between jars | 7,8,11 | Shift money between jars | Kept | — | M | **MUST** | Explore | Kept |
| 38 | Weekly period option | 7,8,9 | My allowance comes weekly | Dropped | monthly-only build | M | **MUST** | Detail | Many students get weekly money; setting, not setup |
| 39 | Payday-aligned period | 7 | Month starts on my payday | Dropped | monthly-only build | M | **NICE** | Detail | Same setting as weekly |
| 40 | Edit jars (add, rename, remove) | 6-9 | I spend on gym, not study | Dropped | fixed by student type | M | **MUST** | Detail | Fixed jars break for real users |
| 41 | Edit jar amount | 6-9 | Food needs more | Partial | only via move tiles | L | **MUST** | Detail | Direct edit is expected |
| 42 | Copy last month's budget | 7,11(notes) | Same as last month? | Partial | planned, not visible | L | **MUST** | Detail | Default at month start; zero effort |
| 43 | Fill underfunded first | 7 | Top up the empty ones | Dropped | jargon | L | **NO** | — | Auto-split already does it |
| 44 | Fixed vs flexible meter | 6,7 | How much is committed? | Partial | hatched subs block | L | **NO** | — | Hatched block already shows it |
| 45 | Red "Carried −₹240" | 7 | What did I overspend? | Dropped | debt framing | L | **NO** | — | Never again (no red) |
| 46 | Daily allowance number | 2,6 | Per-day budget | Dropped | numbers | L | **NO** | — | Glow covers pace |
| 47 | Gentle "jar nearly empty" nudge | 6,7 | Warn me before it runs out | Dropped | alerts dropped with red | M | **NICE** | Detail | Opt-in, worded softly, ≤1/day |
| 48 | Per-category rollover rules | 7 | Keep unused Food for next month | Dropped | complexity | M | **NO** | — | Left over → savings is simpler |

##### Income
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 49 | Auto-split with undo | 8-11 | Where does new money go? | Kept | — | M | **MUST** | Explore | Kept |
| 50 | Income sources list | 7,8,9 | Allowance, café shift, stipend | Partial | unknown-credit question only | M | **MUST** | Explore | Students juggle 2–3 sources |
| 51 | Income source mix chart | 7 | Which source matters most? | Dropped | breadth | M | **NO** | — | A list answers it |
| 52 | Next money in (payday) | 7 | When does money come next? | Dropped | not rebuilt | L | **MUST** | Glance | Calming fact, no budget number: "Allowance in 9 days" |
| 53 | Expected vs received | 7 | Did it all arrive? | Dropped | breadth | M | **NO** | — | Edge case |
| 54 | In vs out by week | 7 | Did I spend more than came in? | Dropped | dense | M | **NICE** | Detail | Merged into month vs month |
| 55 | "To assign" inbox | 7 | Money waiting for a job | Dropped | jargon, chore | M | **NO** | — | Auto-split replaced it |
| 56 | New money sheet | 8-11 | Money landed | Kept | — | L | **MUST** | Glance | Kept (N-01) |
| 57 | Edit savings share of income | 7,8,11(setup) | Save more from each payment | Partial | only in setup | L | **MUST** | Detail | Needs a later edit point |
| 58 | Total balance | 2-11 | How much do I have? | Kept | — | L | **MUST** | Explore | Kept (Money, one number) |
| 59 | Balance split bar | 7,11 | Where is it sitting? | Kept | — | L | **MUST** | Explore | Kept |
| 60 | Balance history area | 7 | How has it moved? | Dropped | numbers | M | **NO** | — | Low action value |
| 61 | End-of-month forecast range | 7 | Where will I end up? | Dropped | numbers, alarm | M | **NICE** | Detail | As tile range "likely / possible" |
| 62 | Moves log | 7 | What moved between jars? | Dropped | breadth | L | **NICE** | Detail | Lives in All spends list |

##### Savings & goals
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 63 | Goal tiles / waffle | 7,8,9,11 | How close is Goa? | Kept | — | M | **MUST** | Explore | Kept |
| 64 | Multiple goals | 6-11 | Goa and a laptop | Kept | — | L | **MUST** | Explore | Kept |
| 65 | Goal create with head start | 6-11 | Start a goal | Kept | — | L | **MUST** | Explore | Kept |
| 66 | Goal detail with contributions | 6-9 | What filled this goal? | Partial | rows only | M | **MUST** | Detail | Goal gradient needs a story of progress |
| 67 | Goal ETA ("on track for Dec") | 6,7,9 | When will I get there? | Dropped | not rebuilt | M | **MUST** | Explore | Strongest motivator; words + dot path |
| 68 | Goal reached moment | 6-11 | I made it | Kept | — | L | **MUST** | Glance | Kept |
| 69 | Rainy-day jar | 8,9 | Money for surprises | Partial | merged into savings | L | **NICE** | Explore | Students value a buffer; one fixed goal |
| 70 | Savings rate waffle | 7,9 | What share did I keep? | Dropped | library cut | L | **NICE** | Explore | Ratio, not ₹; pairs with story |
| 71 | Savings growing by month | 9 | Am I saving more over time? | Dropped | library cut | M | **MUST** | Explore | Peak-end: end the month on progress |
| 72 | Contribution sources bar | 6,7,9 | What fills my savings? | Dropped | breadth | M | **NO** | — | Goal detail list covers it |
| 73 | Withdrawals & slips | 7 | How often did I dip in? | Dropped | guilt | M | **NO** | — | Guilt framing |
| 74 | Goal lock | 7(question) | Stop me taking from Goa | Dropped | never built | M | **NICE** | Detail | Asked for by Jupiter users; opt-in |
| 75 | Leftover swept chart | 7 | How much got saved at month end? | Dropped | merged | L | **NO** | — | Savings growing shows it |
| 76 | Saved this month card | 11 | Did I save? | Kept | — | L | **MUST** | Glance | Kept |
| 77 | Quick add ₹100/₹500 to goal | 8,9 | Put a bit aside now | Partial | via move only | L | **MUST** | Explore | One-tap saving; matches tile unit |
| 78 | Goal milestones 25/50/75% | 9(sound) | Small wins | Dropped | not rebuilt | L | **NICE** | Explore | Goal gradient; chime + one line |

##### Subscriptions
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 79 | Subscriptions list with due ring | 3-11 | What renews when? | Kept | — | M | **MUST** | Explore | Kept |
| 80 | "Next to come out" card | 11 | What leaves next? | Kept | — | L | **MUST** | Glance | Kept |
| 81 | Yearly cost (12-cell) | 6,7 | What does Spotify cost a year? | Dropped | not rebuilt | L | **MUST** | Explore | The eye-opener behind cancelling |
| 82 | Price change sheet | 6,11 | Netflix went up | Kept | — | L | **MUST** | Explore | Kept (N-02) |
| 83 | Price history line | 6 | How has it changed? | Dropped | numbers | L | **NO** | — | Sheet covers it |
| 84 | Subscriptions calendar | 6,7,9 | Which days do they hit? | Dropped | library cut | L | **NICE** | Explore | Month-so-far calendar can mark them |
| 85 | Renew reminder: Keep / I'll cancel | 8 | Cancel before it renews | Partial | stop tracking only | L | **MUST** | Explore | Real saving action, one day before |
| 86 | Add subscription (3 steps) | 6,7,11 | Track a new one | Kept | — | L | **MUST** | Detail | Kept |
| 87 | Subscription share donut | 6 | Which costs most? | Dropped | donut ban | L | **NO** | — | List sorted by cost does it |

##### Splits & owed
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 88 | Friends owe you | 7-11 | Who owes me? | Kept | — | M | **MUST** | Explore | Kept |
| 89 | Remind (share message) | 7,8,9 | Nudge Arjun | Partial | button only | L | **MUST** | Explore | Copy/share text is the whole job |
| 90 | Paid back returns to jar | 7,8,9,11 | Where does repayment go? | Kept | — | M | **MUST** | Detail | Kept |
| 91 | Split later / pending split | 7 | Split this after dinner | Dropped | not rebuilt | M | **NICE** | Explore | Common: bill paid, people sorted later |
| 92 | I owe others | Expl (Split) | Who do I owe? | Dropped | never built | M | **NICE** | Detail | Completes the pair; outside budget |
| 93 | Group ledger app (Split concept) | Expl | Trip expenses | Dropped | separate app | H | **NO** | — | Splitwise exists |

##### Repeat buys
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 94 | Little things Home card | 9,11 | What small things add up? | Kept | — | L | **MUST** | Glance | Kept |
| 95 | Repeat buys per place (×visits) | 9 | Where do I keep going? | Partial | 2 rows only | L | **MUST** | Explore | Direct differentiator |
| 96 | Repeat buys detail (₹ a year) | 6,9 | What does chai cost a year? | Dropped | not rebuilt | M | **MUST** | Explore | Annualised cost changes behaviour |
| 97 | "Skip 2 chais ≈ Goa 2 weeks sooner" | 9 | What if I cut back? | Dropped | not rebuilt | L | **MUST** | Explore | Links habit to goal without guilt |
| 98 | How often (dot grid) | 9 | Which days? | Dropped | library cut | L | **NICE** | Detail | Second-level detail |
| 99 | Trend word (fewer / more) | 9 | Is it growing? | Dropped | library cut | L | **NICE** | Explore | One word, no chart |
| 100 | Repeat threshold 3×/4×/5× | 9 | What counts as repeat? | Dropped | setting cut | L | **NICE** | Detail | Settings only |
| 101 | Accumulation 24h strip | 6 | When do I buy chai? | Dropped | dense | M | **NO** | — | Low value |

##### Insights & charts
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 102 | Week vs last week | 8,11 | Better than last week? | Kept | — | L | **MUST** | Glance | Kept |
| 103 | Month-so-far calendar | 3,7,9,11 | Which days were heavy? | Kept | — | M | **MUST** | Explore | Kept |
| 104 | Where it went | 5-11 | What did I spend on? | Kept | — | L | **MUST** | Explore | Kept |
| 105 | Money flow (Sankey) | 6,7,9,10,11 | Where did all money go? | Partial | simplified to flow of tiles | H | **NICE** | Detail | v9 Sankey was the most-liked deep view |
| 106 | Spend range per week | 7,9,11(lib) | Steady or spiky? | Partial | library only | M | **NICE** | Detail | Keep in library |
| 107 | This vs last month by jar | 6,7,9 | Which jar changed? | Dropped | not rebuilt | M | **MUST** | Explore | The question users ask most after "where" |
| 108 | Month by month (6 months) | 4,6,7,9 | Long view | Dropped | not rebuilt | M | **MUST** | Detail | Needed once there is history |
| 109 | When you spend (time of day) | 5,6,7,9 | Evenings? | Dropped | leaves tile | M | **NICE** | Detail | Library; words "mostly evenings" |
| 110 | Weekday pattern | 3,5,9 | Weekends? | Dropped | low value | M | **NO** | — | Calendar already shows it |
| 111 | Top places | 6,7,9 | Who gets most of my money? | Dropped | not rebuilt | L | **MUST** | Explore | Big places, not only repeats |
| 112 | Purchase sizes histogram | 6,7,9 | Mostly small buys? | Dropped | low value | M | **NO** | — | Low action value |
| 113 | Biggest buy this week | 7 | What was the big one? | Dropped | breadth | L | **NICE** | Explore | One story card |
| 114 | "4 things changed" summary | 7 | What changed? | Dropped | numbers | M | **NICE** | Explore | One sentence insight per week in check-in |
| 115 | Late-night buys | 6,7 | Do I spend at night? | Dropped | breadth | L | **NICE** | Explore | One-line insight if true |
| 116 | Not-enough-data ghost state | 7 | Why is this empty? | Dropped | not rebuilt | L | **MUST** | Explore | Week 1 needs honest empty states |
| 117 | Text insight cards (8) | 2,5 | Facts as text | Dropped | text-heavy | L | **NO** | — | Rejected in v3 |
| 118 | Radar / bubble / radial arcs / scatter | 5,6 | Chart variety | Dropped | misleading | M | **NO** | — | Never again |
| 119 | Treemap | 6, redesign | Share by area | Dropped | dense | M | **NO** | — | Where it went covers it |
| 120 | Per-screen metaphors (road, iceberg…) | redesign | Emotional visuals | Dropped | nothing learnable | H | **NO** | — | Never again |
| 121 | MoM sparklines | 4 | Trend at a glance | Dropped | numbers | L | **NO** | — | Month by month replaces |
| 122 | Under-budget streak dots | 6,7 | Days in a row under | Dropped | streak ban | L | **NO** | — | Never again (streaks) |
| 123 | Overspend covers chart | 7 | What paid for overspend? | Dropped | debt framing | L | **NO** | — | Never again |
| 124 | Heatmap + range strip | 3,6 | Hot days | Partial | calendar | M | **NO** | — | Month-so-far calendar replaced |

##### Settings
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 125 | Widget library: pin, reorder, hide | 7,8,9,11(add only) | Make Home mine | Partial | add only, no reorder | M | **NICE** | Explore | Cap Home at 5 cards |
| 126 | Per-widget ⚙ sheet | 9 | Tune a card | Dropped | chrome | L | **NO** | — | Too much control |
| 127 | Colour / B&W look | 9,10,11 | Calmer look | Kept | — | L | **MUST** | Detail | Kept |
| 128 | Sounds on/off | 9-11 | Mute | Kept | — | L | **MUST** | Detail | Kept |
| 129 | Less motion | 8-11 | Calmer motion | Kept | — | L | **MUST** | Detail | Kept |
| 130 | Dark / light theme | 2,11 | Theme | Kept | — | L | **MUST** | Detail | Kept |
| 131 | App PIN / lock | Lo-fi,6,7 | Keep my money private | Dropped | setup trimmed | M | **MUST** | Detail | Money app trust; offered after setup |
| 132 | Permissions screen | 6,7 | What can Trickle see? | Dropped | no SMS → little to ask | L | **NO** | — | Privacy line covers it |
| 133 | Privacy line (local-first) | 2-11 | Is my data safe? | Kept | — | L | **MUST** | Detail | Kept |
| 134 | Notification settings (caps, quiet hours) | Lo-fi,6,7,11(stated) | Control nudges | Partial | stated, not editable | L | **MUST** | Detail | Respect = retention |
| 135 | Plain-words glossary / help | 8 | What is a tile? | Partial | key only | L | **NICE** | Detail | One sheet |
| 136 | Prototype demo controls | 8,9,11 | Show a moment | Kept | — | L | **NICE** | Detail | Kept for testing |

##### Onboarding
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 137 | Splash with tiles | 8-11 | What is this? | Kept | — | L | **MUST** | Glance | Kept |
| 138 | 4-tap setup with student type | 11 | Get started fast | Kept | — | M | **MUST** | Glance | Kept |
| 139 | Tile key taught once | 9-11 | What is ■? | Kept | — | L | **MUST** | Glance | Kept |
| 140 | Allocation pie + 7 sliders | 6,7 | Plan every jar | Dropped | 54 numbers | H | **NO** | — | Never again |
| 141 | Skip to demo | 8,9,11 | Look first | Kept | — | L | **MUST** | Glance | Kept |
| 142 | First goal in setup | 8 | Save for something | Dropped | one-decision rule | L | **NICE** | Explore | Offer after first week instead |
| 143 | Period choice in setup | 7,8 | Weekly or monthly | Dropped | extra step | L | **NO** | — | Settings, default monthly |
| 144 | SMS permission screen | Lo-fi | Read SMS | Dropped | constraint | M | **NO** | — | Hard constraint: never |

##### Retention
| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 145 | Weekly check-in | 8,9,11 | How did the week go? | Kept | — | M | **MUST** | Explore | Kept |
| 146 | Month story → fresh start | 8,9,11 | How did the month end? | Kept | — | M | **MUST** | Explore | Kept |
| 147 | Repeat buys card in check-in | 9 | Little things last week | Dropped | not rebuilt | L | **MUST** | Explore | Ties the differentiator to the weekly loop |
| 148 | Story card "Biggest buy" / "Little things pour" | 9 | Month highlights | Partial | 5 cards, fewer types | L | **NICE** | Explore | Variety keeps the story fresh |
| 149 | Savings / income sounds | 9,11 | Feel the win | Kept | — | L | **MUST** | Glance | Kept |
| 150 | One "for you" card (sort, settle, renew) | 7,8,9 | What needs me? | Dropped | inbox removed | M | **NICE** | Glance | At most one, no badge, no count |
| 151 | "N things need you" badge | 7 | To-do list | Dropped | anxiety | L | **NO** | — | Never again |
| 152 | Streaks / points | 6,7 | Gamification | Dropped | what-the-hell effect | L | **NO** | — | Never again |

##### Questions for Tarun (Phase 1 decisions)

**Q1. Where does the All spends list live?**
- A · Money › "All spends" row (list + filters + spend detail)
- B · Inside each jar only
- C · Search from Insights
- Recommendation: **A** — Trust needs one plain list; Money already holds the numbers, Home stays clean.

**Q2. Can Home gain one calm fact card: "Next money in · Allowance in 9 days"?**
- A · Yes, default Home card (no ₹ until tap)
- B · Library only
- C · No
- Recommendation: **A** — A date, not a budget; it reduces anxiety near month end without breaking the no-budget rule.

**Q3. How do comparison insights return (this vs last month by jar, month by month, top places)?**
- A · One "What changed" card on Insights: words + tile rows, month-by-month one tap deeper
- B · Three separate library cards
- C · Keep them out
- Recommendation: **A** — One card, one question; depth carries the long view.

**Q4. How much editing comes back?**
- A · Edit jars (add/rename/amount), weekly or payday period, savings share, income sources — all in Money/Settings
- B · Only jar amounts
- C · None; setup again to change
- Recommendation: **A** — Real students differ from the 5 starter jars; editing lives one layer down so Home is untouched.

**Q5. Do the v9 deep views (Sankey flow, spend range, time of day) return?**
- A · Yes, in an Insights library, not on the default board
- B · Sankey only, as the month-story card
- C · No
- Recommendation: **A** — They were liked as discovery views; library keeps the default board at 3–4 cards.

**Q6. Should one "for you" card return (sort an unknown payment, settle a split, renewal tomorrow)?**
- A · Yes, max one at a time on Home, no badge or count
- B · Only as notifications
- C · No
- Recommendation: **A** — Unsorted payments silently break every insight; one card keeps the one-decision rule.


##### Remap after Tarun's answers (2026-10-01)
Tabs are now **Home · Income · Spending · Savings · Insights** (Money tab is gone). Depth labels stay; locations move:
- **Home (Glance):** pace glow, little things, saved this month, next to come out, **Next money in** (no ₹), bell (activity log, action items on top, soft dot, no count). Log cash + Scan QR beside Pay. Recent-spend glyphs (NICE) also here.
- **Income:** auto-split + undo, new money sheet, income sources, unknown credit, total balance + split bar, next money in detail, forecast range (NICE). Settings: savings share, period (weekly/payday), income sources, UPI IDs + manual-only path.
- **Spending:** jar tile bars, move tiles, jar detail/history + runway words, **All spends list** + filters + spend detail (change jar, split, remember payee), sort unknown payments, subscriptions (list, due ring, yearly cost, renew Keep/Cancel, price change), splits/owed + remind, repeat buys (per place, ₹ a year, skip-to-goal). Settings: edit jars, amounts, copy last month, subscriptions, nudges.
- **Savings:** goals (tiles, multiple, create, detail + contributions, ETA, quick add ₹100/₹500, milestones, lock), saved this month, savings growing, rainy-day (NICE).
- **Insights:** where it went, week vs last week, calendar, top places, **What changed** (month-by-month one tap deeper), weekly check-in, month story, ghost states; library: Sankey, spend range, time of day, savings rate, late-night, biggest buy.
- **Global settings:** look (colour/B&W), theme, sounds, less motion, PIN, notifications, privacy, glossary. Every tab: first-visit intro, reopen via "?".
- "For you" card (#150) is replaced by the bell's action items; the activity log also absorbs the moves log (#62).

##### Implications for Phase 2+
- Phase 2 tiles must cover: per-place repeat rows, yearly-cost 12-cell strip, ETA dot path, savings growing columns, what-changed rows.
- Phase 3 library: Sankey, range, time of day, calendar marks for subscriptions, goal ETA, month-by-month.
- Phase 4 IA must place: All spends list, edit points, one "for you" card, library.


---

## Appendix L. Money representation: the research and the scoring behind the grid
### Stage 2: fifteen ways to represent money, scored
*Verbatim from `docs/claude/v14_stage2_representation.md`: Trickle v14 — Stage 2: Representing money. Headings demoted; nothing else changed.*


Artifact: https://claude.ai/artifact/VYX5h82WLtxEyrgFtS2S1s (15 systems × 10 scenarios, colour + B&W toggle, disclosure strips, score matrix, top 4, recommendation, decisions; Stage 2b section added 2 Oct). Explorations only; Tarun decides.

##### Problem (Tarun)
"1 dot = ₹100 is easy, but the problem comes with them combining into a line and a box. The biggest problem with not combining is larger amounts become harder to represent." / "₹6,000, ₹600 for food, ₹500 for tea — all these numbers are too much." Colour-coded categories are hard to memorise; progressive disclosure is key; income = spending + savings; unspent = saved.

##### Scenarios (6-month seed)
₹25 chai · ₹350 meal · ₹9,000 income (₹2,000 save / ₹7,000 spend) · week ₹1,750, ₹1,050 left · month ₹7,000, ₹2,600 left · Food 2,800 / Travel 1,200 / Fun 1,000 / Study 600 / Subs 548 · ₹45,000 laptop goal · goal ₹14,000, ₹8,110 saved · four ₹25 chais · night spending.

##### Systems (one-sentence rule · avg score /5)
- S1 Fixed dots, changing scale of view — "1 dot = ₹100 this week; zoom out and 1 dot = ₹1,000." · 4.3
- S2 ₹100 dots + count label — "past ten we tell you how many." · 3.6
- S3 Days of spending — "one block = one day of your usual ₹200." · 4.0
- S4 One proportional bar — "the filled part is what's left." · 3.9
- S5 Fuel gauge — weekly tank. · 3.4
- S6 Weekly envelopes — 4 envelopes per month. · 3.7
- S7 Relative words — "tap to see the rupees." · 4.1
- S8 Label-first ranked bars — names on bars, no colour key. · 3.9
- S9 Waffle 10×10 (1% each). · 2.8
- S10 Notes & coins (pay moment). · 3.0
- S11 Time strips (hour/calendar). · 3.1
- S12 Own equivalents ("≈ 14 chais"). · 3.4
- S13 Tally bundles of five. · 3.2
- S14 Tens-stacks (v12 combine baseline). · 3.6
- S15 Recommended hybrid. · 4.7

Criteria: learnable in one sentence, glance ≤3s, honest proportion, ₹25→₹45,000, no colour memorising, no big number on Home, friction at pay, awareness patterns, low load. Judgement scores, not user-tested.

Research: Kay 2016 (~20 countable marks); Gigerenzer & Hoffrage 1995 (counts over %); Barrio 2016 / Riederer 2018 (familiar perspective, small multipliers); Olafsson & Pagel 2018 (ostrich effect); Garcia-Retamero 2010 (show the whole); Neurath (repeat, don't enlarge); Cleveland & McGill 1984 (aligned length); Soman 2001 (rehearsal at payment).

##### Top 4
1. S1 Fixed dots, changing scale — one shape, never merges, ≤20 marks per view; con: unit must always be written.
2. S7 Relative words — calmest Home, carries patterns; con: no proportion alone, weak pay friction.
3. S8 Label-first ranked bars — no colour key, most accurate comparison; con: shows ₹, tab-level only.
4. S3 Days of spending — uses "₹100–150/day" finding, scales to months; con: needs an agreed "usual day".

##### Recommended hybrid (S15)
Home: one sentence in words + this week as 17½ ₹100 dots (filled = left, outline = spent), no ₹ figure. Pay: dots the payment will take turn dashed before confirm; chai = ¼ dot, four fill one. Spending tab: label-first ranked bars; month dots at ₹1,000 with the unit written. Savings/big goals: ₹5,000 dots + a days/months line ("≈ 6 months of saving"). Detail: exact ₹, own equivalents, hour strip for night spending. Dots never merge; large amounts handled by stated unit, not new shapes.

##### Decisions for Tarun
- D1 Big amounts: A unit changes by view (S1) · B count label · C merge into tens · D days/months. Suggested A (+D as perspective line).
- D2 Home glance: A words + week dots · B words only · C dots only · D envelope. Suggested A.
- D3 Home timeframe: A week · B month · C today. Suggested A.
- D4 Categories without colour: A name on bar, ranked · B icon + name · C colour + legend. Suggested A or B.
- D5 Perspective unit: A days/months · B own buys · C both by size · D none. Suggested C.
- D6 Under ₹100: A partial dot (cup fill) · B rounded, exact on tap. Suggested A.

##### Decided 2 Oct
- D1: The dot is central and consistent app-wide; it acts like a COIN you can physically lose. 1 dot = ₹100 always. Big amounts = small cluster of dots followed by a count label (e.g. "×60"). Needs validation with people. (Supersedes S1's changing unit.)
- D2: Home glance = one sentence + this week's dots, no ₹.
- D3: Home timeframe = this week.
- D4 (OPEN): categories are many (could be 20+) and users create custom ones with custom icons; icons alone won't work at 20; colour memorising doesn't work; representation must stay consistent everywhere. Needs ideation. → explored in claude/v14_stage2b_coins_categories.md.

### Viz 1: the budget gauge, how it was reasoned
*Verbatim from `docs/claude/v14_viz1_budget_gauge.md`: Trickle v14 — Viz 1: Budget gauge (2 Oct 2026). Headings demoted; nothing else changed.*


Board: https://claude.ai/artifact/AcKnP1FTzaAuGwsqiXWLgM ("Trickle v14 — Viz 1: Budget gauge"). Options only; Tarun decides. Base: claude/v14_decisions.md, claude/v14_stage0_facts.md, research/brymans_analysis_interviews.md.

##### Logged before drawing (2 Oct, in v14_decisions.md)
1. Budgets = 10×10 grid of rounded boxes filling from the bottom like liquid; ALWAYS 10×10; scale always shown ("1 box = ₹X").
2. One visualisation per screen; scroll down for the next.
3. Inspiration: Apple Fitness rings (nested rings, week strip of day minis, "750/500" stat) and a dark waffle-grid slide (rounded squares filled from the bottom, grey empties, big % + one line).

##### References — what was taken
- Waffle slide: rounded boxes, bottom fill, quiet grey empties, one line of words, dark ground, single fill colour. Changed: always 10×10 (slide is 8 wide, ragged top row). Left out: the big %.
- Apple rings: tried as Home ring (D2), nested category rings (C4), week strip (D3/D4). "750/500" pattern kept for the tap layer ("₹140 left of ₹400"). Caution: that screen shows four visualisations at once and relies on memorised colours.

##### Student pool used (all six, every option)
| Type | Money | Cats | Period | Using | State drawn | Featured budget |
|---|---|---|---|---|---|---|
| Vaishak | irregular, ₹3,000 this month | 2 | month | month 3 | nearly empty, buffer zero | Food ₹2,400, ₹168 left |
| Gautham | ₹4,000/mo | 3 | week | week 1 | start of week | Food & drinks ₹652, ₹571 left |
| Tarun | ₹6,000/mo, no budget | 4 | week | week 1 | mid-week | Coffee & snacks ₹400, ₹140 left |
| Yash | ₹9,000/mo, goal | 7 | week | month 6 | mental limit nearly used | Quick-commerce ₹1,000, ₹90 left |
| Nishad | earns ₹25,000 | 12 | month | month 6 | mid-month | Food & beverages ₹6,000, ₹2,910 left |
| Harsh | ₹12,000/mo | 18 (Gym, Bike EMI, Gifts…) | month | month 6 | Eating out ₹1,900 over after ₹3,500 dinner | Mess & meals ₹2,400, ₹700 left |

##### A — What the liquid means
- A1 Left (drains): full bright grid at the start, dark quiet grid at the worst; a payment removes boxes (friction; links to Viz 2 crumble).
- A2 Spent (rises): Gautham's best moment is a blank screen; Vaishak (almost broke) gets the fullest, brightest grid; paying adds boxes; "over" = more liquid than the grid holds. Rising suits accumulation (Viz 6), not the budget.
- Leaning: A1.

##### B — Scale and top edge
- B1 exact (budget ÷ 100): grid always = whole budget. Values can be fussy: ₹6.52 (₹652), ₹9.20 (₹920), ₹0.68 (₹68 subscription budget). ₹25,000 → ₹250/box.
- B2 round box (₹5/₹10/₹25/₹100) with unused boxes dotted: ₹652 → 66 boxes in use (a full budget looks two-thirds full; 65.2 boxes so the 66th is part-real); ₹6,000 → 60 boxes. Two kinds of empty box; the whole is no longer the grid.
- Third way: budgets set in ₹100 steps so B1's box is whole rupees; derived odd budgets read "1 box is about ₹6.50".
- Top edge: even level across the row (flat or with meniscus) vs box by box (whole boxes + one box with its own liquid level). Box by box = at most one partial box, a payment is N boxes (₹20 chai at ₹4/box = 5 boxes), matches Viz 2. Even level is the more literal liquid but leaves ten part-filled boxes and cannot be checked against the scale.
- Scale wording drawn: box glyph + "1 box = ₹60"; glyph + "= ₹60"; "1 box is about ₹6.50".
- Problem: at ₹250/box a ₹20 chai moves the monthly gauge <0.1 box → no visible drop, no friction at that level (category and week gauges do show it).
- Leaning: B1 + ₹100 budget steps, glyph + "1 box = ₹X", box by box (close call).

##### C — Many categories (2, 3, 4, 7, 12, 18)
- C1 one grid per screen, snap scroll, emptiest first (position rail + "next: name"): ideal at 2–4; at 18 = 17 swipes, no way to find Gym.
- C2a index with tiny bars → tap for grid: 18 bars = 18 small gauges in a second form → breaks one-visualisation-per-screen; invites comparing unlike budgets.
- C2b index with words only ("nearly empty", "most left") → tap for grid: a list, not a chart; same at 2 and 18; custom names equal to defaults.
- C3 one grid, a band per category: fine at 2–4; at 7 half the bands are too thin to name, at 12/18 nearly all; needs band tones (colour-coded categories were rejected); cannot show a gone-over category (Harsh's Eating out disappears).
- C4 nested rings top 3 + others: second form; needs a legend without memorised colours; "others" hides 15 of 18.
- Problem: fixed bills (rent, EMI, gym, phone) go full → empty in one payment and top an "emptiest first" sort; drawn as "paid" and sorted last. May belong to Viz 8.
- Leaning: C2b → C1 (skip the index at ≤4 categories).

##### D — Home gauge (sentence + one gauge, no ₹)
- D1 grid: same form as categories. D2 ring: friendly, but a second form and has no boxes for the scale rule.
- D3/D4 with week strip of day minis: 7 minis + main gauge = 8 gauges → violates one-per-screen; minis too small to read. Plain day letters with today marked = navigation, OK. Week day-by-day as its own screen one scroll down (overlaps Viz 9).
- Conflict 1: "scale always shown" vs "no ₹ on Home" (drawn as "1 box = 1% of this week"; alternatives: ₹ scale anyway, or on tap).
- Conflict 2: Home = this week, but Nishad/Harsh/Vaishak run monthly or irregular; their week must be derived and can disagree with the month (Vaishak: month nearly empty, week "most left").
- Leaning: D1, no strip.

##### E — States
Full, half, nearly empty, empty (dim grid + word "empty", no red/number), gone over ×3, ghost line.
- E5 hatched boxes below the floor: shows size but only for small overs (Harsh = 95 boxes under → capped at 2 rows + "and 75 more boxes").
- E6 amber floor line + "gone over": any size, calm, amount on tap; says less at a glance.
- E7 hatched inside grid from the top: busy, second liquid, breaks past 100%.
- E8 ghost line (last week/month at this point): useful but a second mark on the glance layer.
- Leaning: E6 at glance, amount on tap; ghost line on the tap layer.

##### F — Progressive disclosure
F1 glance (grid, name, words, scale) → F2 tap ("₹140 left of ₹400", "about ₹35 a day for 4 days", last period at this point, ghost line) → F3 detail (grid shrinks, transactions list).
Problem: per-day pace is bleak when money is low (Yash "about ₹30 a day"); may switch to words below a level.

##### G — Motion
Settle on open (~2 s, one slosh, flattens to a faint meniscus, never loops); payment (~1.1 s drop with small overshoot, the part that left stays pale ~1.5 s, no red/shake); reduced motion = no animation; box-by-box variant empties boxes one by one (~40 ms apart). Live demo + 6 static frames on the board.

##### Scores (judgement, not tested; /30: 3-s read, honest, ₹652 & ₹25,000, 18 categories, low anxiety, consistent)
A1 29 · A2 23 | B1 27 · B1+₹100 steps 28 · B2 21 · even level 27 · box by box 28 | C1 26 · C2a 24 · C2b 28 · C3 14 · C4 17 | D1 29 · D2 25 · D3 25 · D4 22 | E5 23 · E6 27 · E7 20.

Research used: Garcia-Retamero & Cokely (icon arrays: the whole must be visible); Kay et al. 2016 (~20 countable marks → 100 boxes read as a level, not a count; scale label gives magnitude); ostrich effect (Karlsson, Loewenstein & Seppi 2009 → empty/over must stay calm).

##### Decisions for Tarun
1. Liquid: A left (suggested) · B spent.
2. Scale: A exact, any value · B exact + budgets in ₹100 steps (suggested) · C round box with dotted leftovers.
3. Top edge: A even level with meniscus · B box by box with liquid in the last box (suggested) · C whole boxes only.
4. Many categories: A snap scroll only · B words-only index → grid → snap (suggested) · C index with tiny bars · D layered grid / rings. Plus: fixed bills — gauge, "paid", or move to Viz 8?
5. Home gauge: A grid, no strip (suggested) · B ring · C either with week strip. Plus: scale on Home — hidden until tap, "1 box = 1%", or ₹ scale?
6. Gone over: A boxes below the floor (capped) · B amber floor line + words (suggested) · C hatched inside. Plus: ghost line on glance, on tap, or not here?

Open, not in the six: what the "whole" is for a student with no budget (Tarun-type, week 1); how Home's week is derived for monthly/irregular money.

### v12 phase 2c: money visualisation research (39 sources)
*Verbatim from `docs/claude/v12_phase2c_money_viz_research.md`: Trickle v12 — Phase 2c: Money visualization research. Headings demoted; nothing else changed.*


Goal: money that is easy to digest, low-anxiety, and makes "how much am I spending / losing" obvious — inside the locked tile ladder (crumb cup-fill <₹100 → tile ₹100 → pill ₹1,000 → block ₹10,000; tap zooms one level; one rule everywhere; glow only for time/position).

Sources: 39 (33 verified by opening the page, 6 UNVERIFIED). Methods: 20. Board: Phase 2c section.

##### Three convergent rules
1. Show the whole, always — spent tiles stay as outlines (denominator neglect; Garcia-Retamero 2010).
2. Lead with what is left; no red, no alarm (ostrich effect; Olafsson & Pagel 2018; framing; Tversky & Kahneman 1981).
3. Translate into the student's own units with one perspective line (Barrio 2016; Riederer 2018).

##### Annotated bibliography
Format: citation · URL · finding → design implication → Trickle application.

###### Haroz et al. 2015
Haroz, Kosara & Franconeri. ISOTYPE Visualization: Working Memory, Performance, and Engagement with Pictographs. CHI 2015.  
https://eagereyes.org/publications/Haroz-CHI-2015
- Finding: Pictographs that ARE the data cause no performance cost and can help memory and engagement; decorative extra images distract.
- Implication: Every mark must be money; no decorative coins or mascots inside a chart.
- Trickle: The ₹100 tile is itself the datum, so it earns the Isotype benefit; keep illustrations out of tile areas.

###### Park et al. 2018
Park, Drucker, Fernandez & Elmqvist. ATOM: A Grammar for Unit Visualizations. IEEE TVCG 24(12).  
https://www.microsoft.com/en-us/research/publication/atom-a-grammar-for-unit-visualizations/
- Finding: One mark per unit "minimizes the need for the user to consider data abstraction" and matches how novices build with physical tokens.
- Implication: Unit marks suit lay users; layouts can be recomposed (split, regroup) without changing the unit.
- Trickle: Tiles can regroup across Home/Spending/Income (split by jar, by day) and still be the same tiles.

###### Neurath/Kinross 1995
Kinross, R. Archive: International Picture Language (Otto Neurath / Isotype). Eye no. 19, 1995.  
https://eyemagazine.com/feature/article/archive-international-picture-language
- Finding: Isotype rule: "in representing quantities, repeat a unit, don't enlarge it"; also "don't say more than you know".
- Implication: Never scale a single icon for size; repeat the unit.
- Trickle: Confirms the ladder: pills and blocks are merged repeats of tiles, never a bigger tile.

###### Cleveland & McGill 1984
Cleveland & McGill. Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods. JASA 79(387).  
http://lenagroeger.s3.amazonaws.com/newschool/ClevelandMcGill.pdf
- Finding: Accuracy ranking: position on common scale > nonaligned position > length/direction/angle > area > volume/curvature > shading/saturation.
- Implication: Compare by aligned length/count, not area or colour intensity.
- Trickle: Align pills to a common left edge so comparisons are length on a common scale; never encode amount by colour depth.

###### Kosara 2019
Kosara, R. Circular Part-to-Whole Charts Using the Area Visual Cue. EuroVis 2019 (short).  
https://media.eagereyes.org/papers/2019/Kosara-EuroVis-2019a.pdf
- Finding: Most area-based part-to-whole variants did worse than a pie; centred shapes hurt area judgement.
- Implication: Area alone is a weak cue; anchor parts to a shared edge.
- Trickle: Cup fill reads as a level from a shared floor (not a centred shrinking square) — keep it bottom-anchored.

###### Redmond 2019
Redmond, S. Visual Cues in Estimation of Part-to-Whole Comparisons. arXiv:1908.00630.  
https://arxiv.org/pdf/1908.00630
- Finding: Bars with decile markers / scale beat plain bars for part-to-whole; pies have natural anchors at quarters.
- Implication: Visible reference marks (deciles) aid part-to-whole reading.
- Trickle: A pill is literally ten deciles; the gap after 5 tiles gives a halfway anchor.

###### Garcia-Retamero et al. 2010
Garcia-Retamero, Galesic & Gigerenzer. Do Icon Arrays Help Reduce Denominator Neglect? Medical Decision Making 30(6).  
https://journals.sagepub.com/doi/10.1177/0272989X10369000
- Finding: People over-attend numerators; icon arrays showing the whole fix denominator neglect, for young and old.
- Implication: Always show the whole (budget/income) alongside the part.
- Trickle: Show spent tiles as outlines so ₹2,100 is always seen against ₹6,000.

###### Garcia-Retamero & Cokely 2013
Garcia-Retamero & Cokely. Communicating Health Risks With Visual Aids. Current Directions in Psychological Science 22(5).  
https://journals.sagepub.com/doi/abs/10.1177/0963721413491570
- Finding: Well-designed visual aids are "highly effective, transparent, and ethically desirable", most for low-numeracy people.
- Implication: Visuals are a fairness tool, not decoration.
- Trickle: Tiles help the students who most avoid numbers; never hide them behind a toggle.

###### Galesic et al. 2009 — UNVERIFIED
Galesic, Garcia-Retamero & Gigerenzer. Using Icon Arrays to Communicate Medical Risks: Overcoming Low Numeracy. Health Psychology 28(2).  
https://www.researchgate.net/publication/24205075_Using_Icon_Arrays_to_Communicate_Medical_Risks_Overcoming_Low_Numeracy
- Finding: (Abstract not opened — pages returned 403/429.) Widely cited for icon arrays improving accuracy for low-numeracy people.
- Implication: —
- Trickle: Supports M11; cite only alongside the verified 2010 paper.

###### Gigerenzer & Hoffrage 1995
Gigerenzer & Hoffrage. How to Improve Bayesian Reasoning Without Instruction: Frequency Formats. Psychological Review 102(4).  
https://pages.ucsd.edu/~scoulson/203/GG_How_1995.pdf
- Finding: Natural frequencies roughly tripled correct reasoning (46–50% vs 16–28%) over probabilities.
- Implication: Say "3 of 10 days", not "30%".
- Trickle: Insights copy uses counts of days/tiles, never percentages.

###### Kay et al. 2016
Kay, Kola, Hullman & Munson. When (ish) is My Bus? CHI 2016.  
https://www.mjskay.com/papers/chi_2016_uncertain_bus.pdf
- Finding: Quantile dotplots (~20 countable dots) beat density plots for lay mobile users; 100+ dots lose the benefit.
- Implication: Keep counts subitizable; under ~20 marks per glance.
- Trickle: Home cards stay under ~25 marks — pills keep ₹2,100 at 3 marks; a "usual week" range can be 20 dots.

###### Barrio et al. 2016
Barrio, Goldstein & Hofman. Improving Comprehension of Numbers in the News. CHI 2016.  
https://www.microsoft.com/en-us/research/publication/improving-comprehension-of-numbers-in-the-news/
- Finding: Perspective sentences (ratios, ranks, unit changes) improved recall, estimation and error detection (n>3,200).
- Implication: Add one perspective clause to key numbers.
- Trickle: "₹2,100 — about a third of your month" under the Home tiles.

###### Riederer et al. 2018
Riederer, Hofman & Goldstein. To Put That in Perspective. CHI 2018.  
https://www.dangoldstein.com/papers/Riederer_Hofman_Goldstein_Perspective_Analogies_CHI_2018.pdf
- Finding: Familiar references beat precise obscure ones; multipliers 1–10 (esp. 1, ½) work best; benefit lasts six weeks.
- Implication: Use the user's most familiar purchase as the unit and keep multipliers small.
- Trickle: Pick equivalents from the student's own frequent spends (their chai, their mess meal); prefer "2 dinners" over "0.17 of rent".

###### Peters et al. 2006
Peters, Västfjäll, Slovic, Mertz, Mazzocco & Dickert. Numeracy and Decision Making. Psychological Science 17(5).  
https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01720.x
- Finding: Less numerate people are more swayed by framing and irrelevant affect.
- Implication: Framing choices matter most for the users who need help most.
- Trickle: Neutral, consistent frames (left / to go) protect low-numeracy students from alarm.

###### Soman 2001
Soman, D. Effects of Payment Mechanism on Spending Behavior: The Role of Rehearsal and Immediacy of Payments. JCR 27(4).  
https://econpapers.repec.org/RePEc:oup:jconrs:v:27:y:2001:i:4:p:460-74
- Finding: Past payments curb later spending only when the amount is rehearsed and the wealth depletes immediately.
- Implication: Make the deduction immediate and visible at payment.
- Trickle: Pay moment (M2): tiles lift out of the balance the instant UPI confirms — rehearsal without a number to type.

###### Knutson et al. 2007
Knutson, Rick, Wimmer, Prelec & Loewenstein. Neural Predictors of Purchases. Neuron 53(1).  
https://www.cmu.edu/dietrich/sds/docs/loewenstein/NeuralPredPuchase.pdf
- Finding: Excessive prices activated insula; price-period activity predicted purchase beyond self-report.
- Implication: Price salience at decision time is real and felt.
- Trickle: Show the tiles a spend will take before confirming (ghost tiles), not after.

###### Prelec & Loewenstein 1998 — UNVERIFIED
Prelec & Loewenstein. The Red and the Black: Mental Accounting of Savings and Debt. Marketing Science 17(1). (Finding read via BehavioralEconomics.com summary.)  
https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/pain-of-paying/
- Finding: Pain of paying acts as self-regulation; less visible depletion (cards) dulls it.
- Implication: UPI is low-pain; the app can restore gentle visibility.
- Trickle: Tiles leaving = a soft pain-of-paying cue without red.

###### Heath & Soll 1996
Heath & Soll. Mental Budgeting and Consumer Decisions. JCR 23(1).  
https://econpapers.repec.org/article/oupjconrs/v_3a23_3ay_3a1996_3ai_3a1_3ap_3a40-52.htm
- Finding: People set category budgets; budgets constrain category-typical purchases (sometimes under-consumption).
- Implication: Category jars work because people already think this way.
- Trickle: Jars as tile rows (M14); per-jar "left" is the main figure.

###### Antonides et al. 2011
Antonides, de Groot & van Raaij. Mental Budgeting and the Management of Household Finance. J. Economic Psychology 32(4).  
https://ideas.repec.org/a/eee/joepsy/v32y2011i4p546-555.html
- Finding: Mental budgeters show better oversight of spending and accounts.
- Implication: Make budgeting the default mental model.
- Trickle: Supports jars and per-day allowance.

###### Thaler 1999 — UNVERIFIED
Thaler, R. Mental Accounting Matters. J. Behavioral Decision Making 12(3).  
https://www.scienceopen.com/document?vid=c290009e-68a0-476a-b207-0875684e3c6c
- Finding: (Metadata verified; abstract not available on the page opened.) Foundational account of mental accounts.
- Implication: —
- Trickle: Background for jars.

###### Olafsson & Pagel 2018
Olafsson & Pagel. The Ostrich in Us: Selective Attention to Financial Accounts, Income, Spending, and Liquidity. NBER WP 23945 (VoxEU column).  
https://cepr.org/voxeu/columns/ostrich-us-selective-attention-personal-finances
- Finding: People log in far less when balances are negative; logins jump when the balance turns positive.
- Implication: Bad-news screens drive avoidance; the app must stay safe to open.
- Trickle: Lead with what is left, not what is gone; no alarm colours on Home.

###### Karlsson et al. 2009 — UNVERIFIED
Karlsson, Loewenstein & Seppi. The Ostrich Effect: Selective Attention to Information. J. Risk and Uncertainty 38(2).  
https://econpapers.repec.org/RePEc:kap:jrisku:v:38:y:2009:i:2:p:95-115
- Finding: (Not opened; search listing only.) Investors look up portfolios less in down markets.
- Implication: —
- Trickle: Corroborates Olafsson & Pagel.

###### Tversky & Kahneman 1981
Tversky & Kahneman. The Framing of Decisions and the Psychology of Choice. Science 211(4481).  
https://eric.ed.gov/?id=EJ241077
- Finding: Same facts framed differently produce predictable preference shifts.
- Implication: Frame as remaining/gained, not lost.
- Trickle: "₹2,100 left", "₹3,840 to go" — never "you lost ₹3,900".

###### Kivetz et al. 2006
Kivetz, Urminsky & Zheng. The Goal-Gradient Hypothesis Resurrected. J. Marketing Research 43(1).  
https://ideas.repec.org/p/feb/natura/00658.html
- Finding: Effort rises as the goal nears; illusory progress (bonus stamps) speeds completion.
- Implication: Show proportion remaining shrinking; start goals with visible progress.
- Trickle: Savings goal: outlined to-go tiles disappear; round-ups make first tiles fill fast.

###### Hershfield et al. 2011
Hershfield, Goldstein, Sharpe, Fox, Yeykelsis, Carstensen & Bailenson. Increasing Saving Behavior Through Age-Progressed Renderings of the Future Self. JMR 48.  
https://www.halhershfield.com/research-blog/increasing-saving-behavior-through-age-progressed-renderings
- Finding: Seeing an aged future self increased preference for later rewards.
- Implication: Make the future concrete; students' horizon is weeks/months, not retirement.
- Trickle: Light version: the goal ETA dot on a month path ("you, in February, with ₹8,000").

###### DeVoe & Pfeffer 2007 — UNVERIFIED
DeVoe & Pfeffer. When Time Is Money: The Effect of Hourly Payment on the Evaluation of Time. OBHDP 104(1).  
https://ideas.repec.org/a/eee/jobhdp/v104y2007i1p1-13.html
- Finding: (Metadata verified; no abstract on page.) Hourly pay makes people value time in money.
- Implication: Money-as-time framing is a real lens but cuts both ways.
- Trickle: Students rarely earn hourly; translate to "days of food money" instead of hours of work.

###### Whillans et al. 2017
Whillans, Dunn, Smeets, Bekkers & Norton. Buying Time Promotes Happiness. PNAS 114(32).  
https://www.hbs.edu/faculty/Pages/item.aspx?num=52953
- Finding: Spending on time-saving purchases raised happiness more than material ones (n=6,271).
- Implication: Time is a meaningful unit for value judgements.
- Trickle: Support for days-based framing (M10) in the library, not Home.

###### Li et al. 2010
Li, Dey & Forlizzi. A Stage-Based Model of Personal Informatics Systems. CHI 2010.  
https://ianli.owlstown.net/publications/17-a-stage-based-model-of-personal-informatics-systems
- Finding: Preparation → collection → integration → reflection → action; barriers cascade.
- Implication: UPI auto-collection removes the costliest stages; invest in reflection and action.
- Trickle: Every money view should end in a possible action (move tiles, lower a jar).

###### Weiser & Brown 1995
Weiser & Brown. Designing Calm Technology. Xerox PARC.  
https://people.csail.mit.edu/rudolph/Teaching/weiser.pdf
- Finding: "Calm technology engages both the center and the periphery of our attention, and moves back and forth."
- Implication: Glanceable periphery, detail on demand.
- Trickle: Home = periphery (tiles + one word); tap-to-zoom = centre.

###### Pousman et al. 2007 — UNVERIFIED
Pousman, Stasko & Mateas. Casual Information Visualization: Depictions of Data in Everyday Life. IEEE TVCG 13(6).  
https://dl.acm.org/doi/10.1109/TVCG.2007.70541
- Finding: (Not opened — 403.) Defines casual infovis for non-experts in everyday contexts.
- Implication: —
- Trickle: Background for ambient Home.

###### Lan et al. 2023
Lan, Wu & Cao. Affective Visualization Design: Leveraging the Emotional Impact of Data. IEEE TVCG (VIS 2023). arXiv 2308.02831.  
https://arxiv.org/abs/2308.02831
- Finding: Review of 109 papers and 61 projects; emotion is a legitimate design target but the field lacks clear definitions.
- Implication: Design the feeling deliberately; it is part of the encoding.
- Trickle: Pick a single affect per surface: Home calm, Pay neutral, Savings warm.

###### Kennedy & Hill 2018
Kennedy & Hill. The Feeling of Numbers: Emotions in Everyday Engagements with Data and Their Visualisation. Sociology 52(4).  
http://eprints.whiterose.ac.uk/106567/
- Finding: Emotions are "vital components of making sense of data" in everyday use.
- Implication: People feel numbers before they read them.
- Trickle: Red, shaking or alarm motion carries meaning beyond the amount; avoid.

###### Boy et al. 2017
Boy, Pandey, Emerson, Satterthwaite, Nov & Bertini. Showing People Behind Data. CHI 2017.  
https://nyuscholars.nyu.edu/en/publications/showing-people-behind-data-does-anthropomorphizing-visualizations
- Finding: Anthropomorphic icons had no more effect on empathy than standard charts.
- Implication: Character icons do not add emotional power by themselves.
- Trickle: No cute coin characters inside tiles; save personality for copy and motion.

###### YNAB 2016
Mecham, J. How Old Is Your Money? YNAB blog, 8 Jan 2016.  
https://www.ynab.com/blog/how-old-is-your-money
- Finding: Age of Money = days a rupee sits before use; higher means "your stress level will drop".
- Implication: Time-buffer metrics reframe money as calm runway.
- Trickle: Runway days (M9) as an Insights card.

###### Monzo 2023
Monzo Community. "Left to spend" missing feature, Sep 2023.  
https://community.monzo.com/t/monzo-left-to-spend-missing-feature-old-monzo-design/153058
- Finding: Users missed "left to spend" and the "set to have £ left over" projection after its removal.
- Implication: Left-to-spend is a feature people notice when gone.
- Trickle: Leftover-first Home is validated by real use.

###### Korostoff (n.d.)
Korostoff, M. Wealth, Shown to Scale (1-pixel-wealth).  
https://mkorostoff.github.io/1-pixel-wealth/
- Finding: Fixed unit ("10 px = $5M") plus relatable comparisons makes huge sums graspable.
- Implication: A fixed unit and familiar comparisons beat abstract numbers.
- Trickle: Same ₹100 tile everywhere + equivalents.

###### Dear Data 2015
Lupi & Posavec. Dear Data (project site).  
http://www.dear-data.com/theproject
- Finding: Hand-drawn weekly personal data as "personal documentary"; slow, humane data.
- Implication: Personal data can be warm and reflective.
- Trickle: Weekly reflection card tone; tiles as a personal ledger, not a report.

###### Fi Money 2026
ValueForStartups. Fi Money Investor Report 2026.  
https://valueforstartups.in/fi_money_investor_report
- Finding: FIT rules automated saving from behaviour; consumer app shut 11 Mar 2026.
- Implication: Rules-based nudges were a loved Indian pattern.
- Trickle: Rule-triggered tile moves (e.g. round-ups) fit Savings.

###### Cleo (TME 2022)
TME.net. Cleo: The Budget Assistant App That 'Roasts' You. 2022, upd. 2023.  
https://tme.net/blog/cleo-budget-assistant-app/
- Finding: Opt-in "roast mode" shames spending with humour; default is not roast.
- Implication: Humour works only opt-in.
- Trickle: Avoid shame copy by default.

##### Methods catalogue
| ID | Method | Sample sentence | Evidence | Anxiety risk | Comprehension | Tile fit | Sources | Verdict |
|---|---|---|---|---|---|---|---|---|
| M1 | Leftover-first (left solid, spent as outlines) | ₹2,100 left of ₹6,000 | Strong | Low | High | Native | Olafsson & Pagel 2018; Heath & Soll 1996; Tversky & Kahneman 1981 | ADOPT |
| M2 | Pay moment: tiles lift out | Paying ₹350 takes 3½ tiles. ₹1,750 left. | Strong | Low–med | High | Native | Soman 2001; Knutson et al. 2007; Prelec & Loewenstein 1998 | ADOPT |
| M3 | Per-day allowance | ₹175 a day for the next 12 days | Moderate | Low | High | Good | YNAB 2016; Monzo 2023; Gigerenzer & Hoffrage 1995 | ADOPT |
| M4 | Crumbs stack into a tile | Four chais this week made one tile | Moderate | Low | High | Native | Haroz et al. 2015; Kay et al. 2016; Soman 2001 | ADOPT |
| M5 | Familiar equivalents (your own units) | ₹350 ≈ 14 of your chais | Strong | Low–med | High | Good | Barrio et al. 2016; Riederer et al. 2018 | ADOPT |
| M6 | Goal: saved solid, to-go outlined | ₹4,160 saved. ₹3,840 to go. | Strong | Low | High | Native | Kivetz et al. 2006; Tversky & Kahneman 1981 | ADOPT |
| M7 | Income as part-to-whole pills | ₹9,000 in: 3 saved, 2.1 left, 3.9 spent | Strong | Low | High | Native | Neurath/Kinross 1995; Garcia-Retamero et al. 2010; Park et al. 2018 | ADOPT |
| M8 | Week vs last week: ghost under solid | ₹600 more than last week, about two dinners | Moderate | Medium | High | Good | Garcia-Retamero et al. 2010; Barrio et al. 2016; Lan et al. 2023 | ADOPT |
| M9 | Runway days | ₹2,100 lasts about six days at ₹350 a day | Moderate | Medium | Med | Good | YNAB 2016; Hershfield et al. 2011 | LIBRARY |
| M10 | Money as days of a jar | ₹350 is 1.2 days of food money | Moderate | Medium | Med | OK | DeVoe & Pfeffer 2007; Whillans et al. 2017 | LIBRARY |
| M11 | Frequency format | 3 of your last 10 days went over ₹300 | Strong | Low | High | Good | Gigerenzer & Hoffrage 1995; Galesic et al. 2009 | LIBRARY |
| M12 | Usual-week dot range | This week sits inside your usual range | Strong | Low | Med | OK (dots = position) | Kay et al. 2016 | LIBRARY |
| M13 | Future-self ETA path | At this pace you reach ₹8,000 around February | Moderate | Low | Med | Good (glow allowed: time) | Hershfield et al. 2011; Kivetz et al. 2006 | LIBRARY |
| M14 | Jars side by side | Food ₹900 · Travel ₹700 · Fun ₹500 left | Strong | Low | High | Native | Heath & Soll 1996; Antonides et al. 2011; Thaler 1999 | LIBRARY |
| M15 | Ratio perspective sentence | You have about a third of your month left | Strong | Low | High | Good | Barrio et al. 2016; Riederer et al. 2018 | LIBRARY |
| M16 | Ambient state word | Steady | Weak–mod | Very low | Med | Good | Weiser & Brown 1995; Pousman et al. 2007; Li et al. 2010 | LIBRARY |
| M17 | Single tile tally | ₹350 meal | Strong | Low | High | Native | Haroz et al. 2015; Park et al. 2018 | BASE |
| A1 | Spent shown in red | Red ₹3,900 spent | Strong (against) | High | Med | Breaks calm | Olafsson & Pagel 2018; Karlsson et al. 2009; Kennedy & Hill 2018 | AVOID |
| A2 | Enlarged icon instead of repeated tiles | Big square for big money | Strong (against) | Low | Low | Breaks ladder | Neurath/Kinross 1995; Cleveland & McGill 1984; Kosara 2019 | AVOID |
| A3 | Roast copy and hours-of-work for non-earners | Wow. ₹3,900 gone. Again? | Moderate (against) | High | Low | Breaks tone | Cleo (TME 2022); Olafsson & Pagel 2018; DeVoe & Pfeffer 2007 | AVOID |

##### Top 8 to adopt in v12
1. M1 Leftover-first — Home hero, every jar.
2. M2 Pay moment tiles lift out — Pay confirmation (ghost tiles before confirm).
3. M3 Per-day allowance — Home second line.
4. M4 Crumbs stack into a tile — Spending (small-buy habit).
5. M5 Familiar equivalents from own spends — Spending detail, Insights.
6. M6 Goal saved/to-go — Savings.
7. M7 Income part-to-whole pills — Income.
8. M8 Ghost-of-last-week comparison — Insights "What changed".

Library (Insights, not default): M9 runway, M10 days-of-jar, M11 frequency format, M12 usual-week dots, M13 ETA path (glow OK — time), M14 jars side by side, M15 ratio line (also used on Home with M1), M16 ambient word.

##### Avoid
- A1 Red for spent/over — triggers avoidance (ostrich effect), emotion overrides the number (Kennedy & Hill), and low-numeracy users are most swayed by affect (Peters 2006).
- A2 Enlarged icon for bigger amounts — breaks Isotype "repeat, don't enlarge" and area is poorly judged (Cleveland & McGill; Kosara 2019).
- A3 Shame/roast copy by default and "hours of work" for non-earners — Cleo keeps roast opt-in; students mostly have no hourly wage, so use days-of-jar instead.

##### Questions for Tarun
| # | Question | Options | Recommended | Why |
|---|---|---|---|---|
| P2c-Q1 | What is the big number on Home? | A · ₹ left (₹2,100), tiles below / B · ₹ per day (₹175) / C · Runway days (6 days) | A | Left-to-spend is what people miss when gone (Monzo) and frames as remaining; per-day sits as the second line. |
| P2c-Q2 | How do spent rupees look? | A · Outlined empty tiles / B · Faded solid tiles / C · Removed entirely | A | Outlines keep the whole visible (denominator neglect) without red; removal hides the budget, fading reads as "still mine". |
| P2c-Q3 | Which equivalents unit? | A · From the student's own frequent spends (their chai, their meal) / B · Fixed staples (chai ₹25, thali ₹120) / C · No equivalents | A | Familiar references work best (Riederer 2018); fallback to B until two weeks of data exist. |
| P2c-Q4 | "You spent more than last week" — how loud? | A · Ghost of last week + hatched extra + one perspective sentence / B · Amber status chip / C · Only if asked in Insights | A | Shows the gap as countable tiles, no alarm hue; amber invites ostrich avoidance. |
| P2c-Q5 | Money-as-time framing? | A · Days of a jar ("1.2 days of food money") / B · Hours of work / C · None | A | Most students have no hourly wage; days-of-jar keeps the time lens without implying a job. Library only. |


---

## Appendix M. Secondary research report
### Secondary research report (Sept 2026)
*Verbatim from `docs/claude/secondary_research_report.md`: Secondary Research Report: Student Spending/Budgeting App. Headings demoted; nothing else changed.*


##### 1. Executive Summary

- **Manual tracking is the single biggest failure mode of budgeting apps.** Multiple sources (churn analyses, product retrospectives) cite roughly two-thirds of new users abandoning a budgeting app within the first 30 days, almost always because logging every transaction by hand is tedious — this directly validates the project's automatic SMS-parsing approach as the core differentiator. [SpendTrak — Why People Quit Budgeting Apps](https://spendtrak.app/blog/why-people-quit-budgeting-apps), [Strategia-X — Why Budgeting Apps Fail](https://www.strategia-x.com/blog/2026-04-12-why-budgeting-apps-fail-30-days-fintech-ux-data/), [Beaverise — Why Budgeting Apps Don't Work](https://beaverise.com/blog/why-budgeting-apps-dont-work)
- **"Pain of paying" is real and cashless/UPI payments numb it.** Behavioral-economics research (Prelec & Loewenstein's original theory, plus newer neuroeconomic work) shows that frictionless, cashless payment methods reduce the psychological discomfort of spending, which is exactly why small UPI purchases go unnoticed until later — strong academic backing for the app's "awareness comes late" thesis. See Section 7 for the actual peer-reviewed papers.
- **Guilt/shame framing in financial nudges backfires** and drives disengagement — UX and behavioral-finance writeups consistently recommend neutral, observational, non-judgmental copy over "you overspent" scolding, validating the project's explicit rejection of guilt-based alerts. [NN/G — Tone of Voice Dimensions](https://www.nngroup.com/articles/tone-of-voice-dimensions/), [Eleven Space — Designing for Financial Behavior](https://www.elevenspace.co/blog/designing-for-financial-behavior-ux-that-builds-better-money-habits)
- **No major consumer app appears to ship a dedicated "small-purchase accumulation" rollup view** ("Coffee: ₹40 today, ₹240 this week") — searches turned up only generic "latte factor" *personal-finance advice content*, not a shipped UX pattern, and (per Section 7) no genuine academic literature treats "latte factor" as a formal construct either. This confirms the feature is genuinely under-served and a real differentiation opportunity, but also means there's little prior art to borrow from — treat it as a from-scratch design problem grounded in pain-of-paying mechanics instead. [Receiptix — Latte Factor blog](https://receiptix.io/blog/2024/12/16/small-purchases-big-impact-understanding-the-latte-factor), [Becoming Minimalist — The Latte Factor](https://www.becomingminimalist.com/latte-factor/)
- **SMS/sensitive-permission requests should be just-in-time and explained, never front-loaded at first launch** — this is now backed by real usable-security research (Wijesekera et al. 2015, Bonné et al. 2017 — see Section 7), not just design guidance: users' comfort with a permission request depends heavily on the *context* in which it's asked, not just which permission it is. [NN/G — 3 Design Considerations for Mobile Permission Requests](https://www.nngroup.com/articles/permission-requests/), [Android Developers — Request runtime permissions](https://developer.android.com/training/permissions/requesting)
- **Mint's 2023 shutdown is a useful cautionary case study** — not for build strategy, but for what users valued/mourned (free automatic aggregation, category auto-tagging, simple dashboards) and what they complained about even while using it (ads, no envelope budgeting, feeling "abandoned" after the Credit Karma acquisition). Good competitive-positioning ammunition. [CNBC — Mint shutting down](https://www.cnbc.com/2023/11/07/budgeting-app-mint-is-shutting-down-users-are-disappointed.html), [LogRocket — Why is Mint shutting down](https://blog.logrocket.com/product-management/why-is-the-mint-app-shutting-down/)
- **India-specific auto-tracking competitors (Jupiter, Money View, INDmoney) already do SMS/account-aggregator-based auto-tracking**, so this isn't technically novel in the Indian market — differentiation has to come from the small-purchase/accumulation lens, non-guilt tone, and local-first privacy stance, not from automatic tracking alone. [Jupiter — Best Expense Tracker Apps in India](https://jupiter.money/blog/best-expense-tracker-app/), [Money View — Best PFM Apps in India](https://moneyview.in/insights/best-personal-finance-management-apps-in-india)
- **Local-first/no-mandatory-cloud-sync is a genuine trust differentiator**, not just a technical choice — India-focused fintech UX writeups repeatedly flag data-privacy anxiety as a trust barrier, and a reported case of a budgeting app "selling user stress data" underscores why participants' distrust of cloud sync is well-founded, not paranoid. [Bishopstrow — Budgeting app selling user stress data](https://www.bishopstrow.com/17-165286-a-popular-budgeting-app-was-quietly-selling-user-stress-data-to-third-parties-trending/)
- **A genuine academic finding worth building the design brief around** — a peer-reviewed evaluation of commercial budgeting apps (BCS HCI 2023, Section 7) found they're much stronger at *tracking* spend than at actually supporting *budgeting* decisions or behavior change. This is precisely the gap the app's accumulation view + pre-spending awareness features are designed to close — cite this paper directly in the design rationale.

---

##### 2. Spending Habits & Psychology Research

###### Pain of Paying / Spending Awareness
- **Pain of paying (Prelec & Loewenstein)**: psychological discomfort felt at the moment of spending, acting as a natural brake on consumption. Cashless/abstracted payment methods (cards, UPI, tap-to-pay) measurably reduce this discomfort, increasing spending and reducing memory/salience of the transaction afterward — the core mechanism behind "spending is easy, tracking is difficult." See Section 7 for the primary source.
- **Consumer Reports**: lay-audience summary of how payment method changes how much people spend. [Consumer Reports](https://www.consumerreports.org/shopping-retail/how-you-pay-can-affect-how-much-you-spend/)
- **Cashless transactions and purchase pain**: directly relevant to UPI-first contexts. [Illinois Extension](https://extension.illinois.edu/blogs/finding-financial-balance/2023-10-11-do-you-experience-purchase-pain-cashless-transactions)
- **BNPL & digital temptation**: connects frictionless digital payment to financial stress in young people — supporting context for the payment/realization gap being a recognized phenomenon. [APA Monitor](https://www.apa.org/monitor/2026/04-05/financially-stressed-digitally-tempted)

###### Why Manual Tracking / Budgeting Apps Fail
- **~67% of budgeting-app users quit within 30 days** (cited stat, source-quality caveat in Section 6) — friction of manual logging, not lack of desire to budget, given as the cause. [Strategia-X](https://www.strategia-x.com/blog/2026-04-12-why-budgeting-apps-fail-30-days-fintech-ux-data/), [SpendTrak](https://spendtrak.app/blog/why-people-quit-budgeting-apps)
- Peer-reviewed confirmation (not just blog claims): the BCS HCI 2023 paper (Section 7) empirically shows commercial budgeting apps support tracking far better than budgeting/behavior change — a more defensible academic version of the same point.
- Manual tracking increasingly framed as obsolete industry-wide in favor of automatic bank/SMS-linked tracking — meaning SMS-parsing is table stakes, and differentiation must come from what's done with the data. [BudgetSmart](https://budgetsmart.io/blog/automated-budget-tracking-apps), [Finny](https://getfinny.app/blog/manual-expense-tracking-dead-2026)
- Counter-perspective (minority pattern): some people deliberately prefer manual/paper tracking because the friction itself forces reflection. [FFBKC](https://www.ffbkc.com/blogs/managing-money/ditch-the-app-budget-by-hand/)

###### Guilt-Based Alerts vs. Gentle Nudges
- NN/G's tone-of-voice framework is directly applicable to non-punitive spend alerts — recommendation for financial/sensitive topics is serious, respectful, matter-of-fact. [NN/G — Tone of Voice](https://www.nngroup.com/articles/tone-of-voice-dimensions/)
- **PocketGuard's "In My Pocket" alerting** — positively framed (what's safe to spend, not what was overspent) — is one of the closer existing examples of non-punitive spend-awareness messaging. [PocketGuard — Alerts](https://pocketguard.com/alerts/)
- Academic field-experiment work on overspending-message framing exists — see Lee (SSRN) in Section 7.

---

##### 3. Competitor App Landscape

| App | What it does | Automatic tracking approach | Documented problems / complaints | Link |
|---|---|---|---|---|
| **Jupiter (India)** | Neobank + money-manager combining UPI/cards, budgeting, expense tracking | Reads UPI/bank SMS and linked-account transactions automatically; auto-categorizes | Full neobank onboarding (KYC, account opening) is heavier than a pure tracker | [Jupiter blog](https://jupiter.money/blog/best-expense-tracker-app/), [Money Manager](https://jupiter.money/money/), [Play Store](https://play.google.com/store/apps/details?id=money.jupiter&hl=en_IN) |
| **Money View (India)** | Expense tracker + lending/PFM app | SMS-based automatic transaction capture, India-focused | Accurate SMS parsing, but pushes loan products aggressively inside the tracking experience | [Money View](https://moneyview.in/insights/best-personal-finance-management-apps-in-india) |
| **INDmoney (India)** | "Super app": expense tracking, investments, net worth | Account-aggregator + SMS/bank-linked auto-tracking | Complexity/feature bloat, customer-support issues (per reviews) | [MouthShut reviews](https://www.mouthshut.com/product-reviews/indmoney-reviews-926025315), [TechCrunch](https://techcrunch.com/2022/01/17/indmoney-super-app-finance-funding) |
| **Walnut / Fold (India)** | Early Indian SMS-based auto-expense tracker (later pivoted to lending) | One of the first apps to popularize SMS-parsing auto-tracking in India | Limited current documentation; useful as early prior-art that SMS parsing is proven in India | [CB Insights](https://www.cbinsights.com/investor/walnut) |
| **Mint (discontinued Jan 2024)** | Free US budgeting app: auto-aggregated accounts, auto-categorization, dashboards | Bank-API aggregation (not SMS — not relevant to India) | Ads, miscategorization needing manual correction, no true envelope budgeting, users felt "abandoned" after Credit Karma acquisition | [CNBC](https://www.cnbc.com/2023/11/07/budgeting-app-mint-is-shutting-down-users-are-disappointed.html), [LogRocket](https://blog.logrocket.com/product-management/why-is-the-mint-app-shutting-down/) |
| **YNAB** | Zero-based/envelope budgeting | Bank-sync (supported regions) + strong manual-entry culture | Steep learning curve, ~$99/yr subscription — a real barrier for students | [Ramsey comparison](https://www.ramseysolutions.com/budgeting/budgeting-apps-comparison), [NerdWallet](https://www.nerdwallet.com/finance/learn/best-budget-apps) |
| **PocketGuard** | "In My Pocket" — safe-to-spend after bills/goals/savings | Bank-linked auto-tracking + bill detection | Sync/categorization errors, premium subscription cost; good non-punitive reference for framing | [App Store reviews](https://apps.apple.com/us/app/pocketguard-budget-planner-app/id949414211?see-all=reviews), [Alerts](https://pocketguard.com/alerts/) |
| **Goodbudget** | Digital envelope budgeting (manual, classic cash-envelope method) | Fully manual — no bank/SMS linking | Dated, confusing interface for fund allocation; dedicated redesign case study exists | [Redesign case study](https://medium.com/@ayushnandanwar13/revamping-a-budgeting-app-goodbudget-a-ux-ui-case-study-eaf0ef928222) |
| **Rocket Money (formerly Truebill)** | Bill/subscription tracking + budgeting, known for subscription cancellation | Bank-linked scanning to auto-detect recurring charges | Missed/misidentified subscriptions requiring manual confirmation; best prior art for subscription-detection UX | [Managing subscriptions](https://help.rocketmoney.com/en/articles/2185531-managing-your-bills-and-subscriptions), [Missing subscriptions](https://help.rocketmoney.com/en/articles/934383-missing-subscriptions) |
| **Unnamed app — data-selling incident** | N/A (cautionary case) | N/A | Reported quietly selling user "stress data" to third parties — concrete justification for local-first, no-mandatory-cloud-sync | [Bishopstrow](https://www.bishopstrow.com/17-165286-a-popular-budgeting-app-was-quietly-selling-user-stress-data-to-third-parties-trending/) |

###### "Latte Factor" / Small-Purchase Accumulation — Prior Art Gap
Confirmed genuine white space both in shipped products and in academic literature (Section 7) — no peer-reviewed treatment of "latte factor" as a formal construct exists. Design this feature from pain-of-paying/mental-accounting theory, not from a competitor benchmark.
- [Receiptix — Small Purchases, Big Impact](https://receiptix.io/blog/2024/12/16/small-purchases-big-impact-understanding-the-latte-factor)
- [Splitty — The Latte Factor Is Wrong](https://splittyapp.com/learn/latte-factor-is-wrong/) (caution: keep the feature informational, not moralizing)

---

##### 4. Onboarding UX Research

###### Permission-Request UX (Critical for READ_SMS)
- **NN/G's 3 core recommendations**: explain why before the OS dialog, time the request contextually (right before the feature that needs it), make declining graceful with a fallback. [NN/G — Mobile Permission Requests](https://www.nngroup.com/articles/permission-requests/)
- Android's own guidance: request runtime permissions in context, ask only for what's needed, provide rationale. [Android Developers — Requesting permissions](https://developer.android.com/training/permissions/requesting), [Best practices](https://developer.android.com/training/permissions/usage-notes)
- **Now backed by real usable-security research** — see Wijesekera et al. 2015 and Bonné et al. 2017 in Section 7, both from top security venues, showing empirically that context (not just which permission) drives whether users trust and grant a request. This is the strongest evidence base in the whole report for the READ_SMS onboarding design.

###### General Fintech Onboarding / Trust-Building
- High drop-off in finance-app signup flows (one source cites 68% never finishing signup) — argues for lightweight onboarding. [Design Your Way](https://www.designyourway.net/blog/finance-app-design/)
- Trust-building patterns (transparent data-use messaging, progressive disclosure). [Eleken](https://www.eleken.co/blog-posts/modern-fintech-design-guide)

---

##### 5. Feature-by-Feature UX Implementation Research

**Automatic Transaction Categorization UI** — Draw on Jupiter/Money View/INDmoney (auto-categorize from SMS text, one-tap re-categorization) and Mint's legacy pattern (design for easy correction — miscategorization was Mint's most common complaint). [LogRocket](https://blog.logrocket.com/product-management/why-is-the-mint-app-shutting-down/)

**Daily/Weekly Overview & Category Breakdown Visualizations** — Donut/pie for category share, bar for daily/weekly trend; simplicity over dense data-viz. [Phenomenon Studio](https://phenomenonstudio.com/article/fintech-design-breakdown-the-most-common-design-patterns/). Case studies: [Vivian Lim](https://medium.com/@vivianlimsq/ux-case-study-budgeting-mobile-app-for-beginners-a6d2e920986b), [Tubik Studio](https://blog.tubikstudio.com/case-study-home-budget-app-ui-for-finance/)

**Small-Purchase Accumulation / Rollup View** — No existing shipped or academic pattern (Sections 3, 7). Frame as neutral pattern-recognition ("Coffee — ₹240 this week across 6 purchases"), grounded in pain-of-paying/mental-accounting theory.

**Pre-Payment / Point-of-Sale Friction Screens** — Friction should be informational, not blocking. [Digia — In-App Nudges](https://www.digia.tech/post/in-app-nudges/), [ACM — Design Friction and Digital Nudging](https://dl.acm.org/doi/fullHtml/10.1145/3591156.3591183). **Implementation constraint**: UPI payments happen inside third-party apps (GPay, PhonePe, etc.), so a true pre-payment interstitial may not be technically possible — likely needs to be a widget/notification-based nudge instead.

**Non-Punitive Alert/Notification Copy** — PocketGuard's "safe to spend" framing is the best reference. [PocketGuard Alerts](https://pocketguard.com/alerts/). Academic grounding: Lee's SSRN fintech-nudges paper (Section 7) on overspending-message framing.

**Fund/Envelope-Budgeting Allocation UI** — Goodbudget is the closest direct analog; its UX redesign case study is a useful "what not to do" reference. [Redesign case study](https://medium.com/@ayushnandanwar13/revamping-a-budgeting-app-goodbudget-a-ux-ui-case-study-eaf0ef928222)

**Savings Goals with Progress Tracking** — Chase savings-goals redesign case study. [Casey Duong](https://medium.com/@ckduong14/ux-ui-case-study-chase-saving-goals-9287827fc90c). Academic grounding for goal/progress-bar motivation: the gamification papers in Section 7 (self-determination theory).

**Subscription/Recurring-Payment Detection UI** — Rocket Money: auto-detect, then require lightweight human confirmation to avoid false positives. [Managing subscriptions](https://help.rocketmoney.com/en/articles/2185531-managing-your-bills-and-subscriptions)

**Lightweight Behavioral-Insight Surfacing (Rule-Based, Not ML)** — Insights should read as simple, factual observations rather than predictions or judgments — consistent with the nudge-framing literature in Section 7.

---

##### 6. Note on Source Quality (Web/Blog Sources)

This is a fast-moving, SEO-heavy content space — many "budgeting-app" blog posts (SpendTrak, Strategia-X, BudgetSmart, Finny, etc.) are marketing-adjacent content rather than peer-reviewed research, and specific statistics they cite (e.g. "67% quit in 30 days," "68% never finish signup") could not be independently verified against a primary source — treat these as directionally useful, citable-with-caveats claims rather than hard facts. Section 7 below is the peer-reviewed literature that should anchor any formal design-rationale or thesis writing; the rest of this document is supporting/competitive context.

---

##### 7. Academic Literature Review (Peer-Reviewed / Verifiable Sources Only)

Found via Google Scholar, SSRN, PubMed, ACM Digital Library, ScienceDirect, USENIX, and university repositories. Fabricated or unverifiable citations are excluded — where a topic had no solid peer-reviewed hit, that gap is stated honestly rather than padded.

###### 7.1 Pain of Paying — Foundational & Follow-up

**Prelec, D., & Loewenstein, G. (1998). "The Red and the Black: Mental Accounting of Savings and Debt." *Marketing Science*, 17(1), 4–28.**
Finding: introduces "pain of paying" — payment decoupled in time/form from consumption (e.g. credit) reduces the aversive experience of spending, increasing consumption. This is the foundational citation for the app's entire "awareness comes late" thesis.
- Open access PDF: https://www.researchgate.net/publication/227358519_The_Red_and_the_Black_Mental_Accounting_of_Savings_and_Debt
- Publisher (paywalled): https://pubsonline.informs.org/doi/10.1287/mksc.17.1.4

**Soman, D. (2003). "The Effect of Payment Transparency on Consumption: Quasi-Experiments from the Field." *Marketing Letters*, 14(3), 173–183.**
Finding: less "transparent" payment methods (e.g. pre-paid cards, checks vs. cash) reduce the salience of the outflow, leading to greater subsequent spending — directly analogous to UPI.
- Open access PDF (author's own site): https://www-2.rotman.utoronto.ca/facbios/file/transparency.pdf
- Publisher (paywalled): https://link.springer.com/article/10.1023/A:1027444717586

**Raghubir, P., & Srivastava, J. (2008). "Monopoly Money: The Effect of Payment Coupling and Form on Spending Behavior." *Journal of Experimental Psychology: Applied*, 14(3), 213–225.**
Finding: non-cash payment forms increase spending because they create a weaker mental representation of money value — relevant to why UPI purchases feel "less real."
- Open access PDF: https://www.apa.org/pubs/journals/releases/xap143213.pdf

###### 7.2 Mobile Payments / UPI / Cashless Effect

**Digital Payments and Overspending: A Study of Payment Biases and Spending Behaviour Using Mental Accounting Perspective. *International Journal of Finance & Economics* (Wiley, 2025).**
Finding: digital payment biases (mental accounting) associate with higher overspending propensity.
- Paywalled: https://onlinelibrary.wiley.com/doi/10.1002/ijfe.70053

**Does mobile payment use lead to overspending? The moderating role of financial knowledge. *Computers in Human Behavior* (Elsevier, 2022).**
Finding: mobile payment use associates with overspending, but the effect is weaker among users with higher financial literacy — implies an in-app financial-literacy or awareness nudge could offset the cashless effect.
- Paywalled: https://www.sciencedirect.com/science/article/abs/pii/S0747563222001418

**Less cash, more splash? A meta-analysis on the cashless effect. (2024, meta-analysis synthesizing many prior studies.)**
Finding: confirms a robust, if modest, cashless-payment spending increase across the literature — good for citing an overall effect size rather than one study.
- Paywalled: https://www.sciencedirect.com/science/article/pii/S0022435924000216
- Plain-language summary: https://cashessentials.org/publication/less-cash-more-splash-a-meta-analysis-on-the-cashless-effect/

**"From Cash to Cashless: UPI's Impact on Spending Behavior among Indian Users." *Extended Abstracts, CHI Conference on Human Factors in Computing Systems (CHI EA '24)*, ACM.**
Finding: HCI-venue empirical study of UPI adoption's effect on spending behavior among Indian users — the single most directly on-topic academic paper found (India + UPI + spending, from a top-tier HCI venue).
- ACM Digital Library: https://dl.acm.org/doi/full/10.1145/3613905.3651050

###### 7.3 Budgeting App Effectiveness (HCI)

**Evaluating Budgeting Apps: Limited Support for Budgeting Compared to Tracking. *Proceedings of the 36th International BCS Human-Computer Interaction Conference (BCS HCI 2023)*.**
Finding: a systematic empirical evaluation of commercial budgeting apps found they are much stronger at expense *tracking* than at actually supporting *budgeting* decisions or behavior change — this is the strongest single citation for the whole project's core thesis (that tracking apps exist but don't close the awareness gap).
- Publisher (BCS eWiC, likely open access): https://dl.acm.org/doi/10.14236/ewic/BCSHCI2023.1
- ResearchGate mirror: https://www.researchgate.net/publication/377242109_Evaluating_Budgeting_Apps_Limited_Support_for_Budgeting_Compared_to_Tracking

Honest gap: no CHI/CSCW mainline paper specifically isolating budgeting-app churn/attrition rates was found with high confidence — the widely-cited "67% quit in 30 days" figure (Section 1/6) remains an unverified blog statistic, not an academic finding.

###### 7.4 Nudges / Framing in Fintech

**Lee, S. K. "Fintech Nudges: Overspending Messages and Personal Finance Management." (NYU Stern Fubon Center doctoral research / SSRN working paper.)**
Finding: field-experiment-style study of push notifications nudging users about overspending in a personal finance app, examining message-framing effects on subsequent spending — directly relevant to designing this app's alert copy.
- Open access (SSRN): https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3390777

**Bitrián, P., Buil, I., & Catalán, S. (2021). "Making finance fun: the gamification of personal financial management apps." *International Journal of Bank Marketing*.**
Finding: applies self-determination theory to explain how gamification elements (points, goals, progress) in finance apps affect engagement and intrinsic motivation — relevant to the savings-goals and progress-tracking feature design.
- Open access PDF: https://selfdeterminationtheory.org/wp-content/uploads/2024/03/2021_BitrianBuilCatalan_IJBM.pdf

**Can gamification improve financial behavior? The moderating role of app expertise.**
Finding: gamification's effect on actual financial behavior change is moderated by users' prior app expertise — a caution against over-gamifying goals/progress features for less tech-savvy users.
- https://www.researchgate.net/publication/331415336_Can_gamification_improve_financial_behavior_The_moderating_role_of_app_expertise

Honest gap: "latte factor" (Section 3) has no genuine peer-reviewed treatment — it's a popular-finance term (David Bach), not an academic construct. Cite the pain-of-paying / cashless-effect literature above instead when grounding the accumulation-view feature academically.

###### 7.5 Android Permission-Request UX (Usable Security/Privacy)

**Wijesekera, P., Baokar, A., Hosseini, A., Egelman, S., Wagner, D., & Beznosov, K. (2015). "Android Permissions Remystified: A Field Study on Contextual Integrity." *USENIX Security Symposium 2015*.**
Finding: users' comfort with a permission request depends heavily on the *context* (when/why the app asks), not just which permission is requested — the strongest evidence base for asking READ_SMS access contextually, at the point of setup, with a clear reason, rather than upfront.
- Open access: https://www.usenix.org/system/files/conference/usenixsecurity15/sec15-paper-wijesekera.pdf
- Also on arXiv: https://arxiv.org/abs/1504.03747

**Bonné, B., et al. (2017). "Exploring Decision Making with Android's Runtime Permission Dialogs Using In-Context Surveys." *SOUPS 2017 (USENIX Symposium on Usable Privacy and Security)*.**
Finding: in-context surveys at the moment of a runtime permission dialog reveal that trust in the app and perceived necessity drive allow/deny decisions — directly informs how to word and time the SMS-read rationale screen.
- Open access: https://www.usenix.org/system/files/conference/soups2017/soups2017-bonne.pdf

**Prange, S., et al. "Understanding Users' Awareness and Control of Privacy..." *SOUPS 2024*.**
Finding: recent (2024) study on user awareness/control of app privacy and permissions — a good up-to-date citation alongside the 2015/2017 papers above.
- Open access: https://www.usenix.org/system/files/soups2024-prange.pdf

###### 7.6 Summary Table — Confidence & Access

| Paper | Access | Use for |
|---|---|---|
| Prelec & Loewenstein 1998 | Open (mirror) | Core thesis grounding |
| Soman 2003 | Open (author PDF) | UPI/payment-transparency grounding |
| Raghubir & Srivastava 2008 | Open (APA PDF) | Cashless spending mechanism |
| Wijesekera et al. 2015 (USENIX) | Open | READ_SMS permission UX |
| Bonné et al. 2017 (SOUPS) | Open | Permission dialog wording/timing |
| Prange et al. 2024 (SOUPS) | Open | Up-to-date permission-UX citation |
| Bitrián et al. 2021 | Open | Savings-goals gamification |
| Lee (SSRN, NYU Stern) | Open | Alert/nudge message framing |
| BCS HCI 2023 (budgeting apps) | Likely open | Core thesis — tracking vs. budgeting gap |
| CHI EA '24 (UPI spending, India) | Paywalled (ACM DL) | India/UPI-specific spending behavior |
| Computers in Human Behavior 2022 | Paywalled | Mobile payment + financial literacy |
| Cashless-effect meta-analysis 2024 | Paywalled (summary open) | Overall effect-size citation |

**Genuine gaps** (searched but not found in peer-reviewed literature): budgeting-app churn/attrition rate studies, "latte factor" as an academic construct, and CHI-caliber papers isolating envelope-budgeting or goal-progress-bar UI effectiveness specifically. Where the report cites numbers for these (e.g. "67% quit within 30 days"), that remains a blog-sourced claim, not an academic one — flag this explicitly if used in formal thesis writing.


---

## Appendix N. Decision logs in full
The three logs as written, so every decision can be read in one place. Counts and a domain view are in Part 5.
### v12 decision log
*Verbatim from `docs/claude/v12_decisions.md`: Trickle v12 — Decisions log. Headings demoted; nothing else changed.*


Format: one row per decision. Status: open / decided / changed. Record Tarun's answer verbatim where possible.

STATUS (1 Oct): **v12 complete.** Phases 1–12 done. Prototype https://claude.ai/artifact/PuDjHposoni47zo1qzGxZr (#demo) now carries Phase 12 motion + sound; validation re-run 37/37 checks, 24/26 flows (2 accepted tap deviations P11-Q1/Q2) — claude/v12_phase10_validation.md. Design system https://claude.ai/artifact/5wmMrG8kYqj3gLe2BGStNj has a Motion + sound section. P2-Q4 density still open on paper and built as A "size follows surface" behind the `DENSITY` constant.

##### Phase 1 — Recovery audit
Source: claude/v12_phase1_recovery.md · Board: "Trickle v12 — Decision Board", Phase 1 section.

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| D1 | Tab structure | (new, from Tarun) | — | 5 tabs: Home · Income · Spending · Savings · Insights | decided | 2026-10-01 |
| Q1 | Where does the All spends list live? | A: Money › All spends / B: Inside each jar / C: Search | A | Spending tab holds the All spends list (filters + spend detail) | decided (changed) | 2026-10-01 |
| Q6 | "For you" card? | A: max one on Home / B: notifications / C: No | A | Replaced: Home bell = activity log of every action, items needing action on top; soft dot, no count badge | decided (changed) | 2026-10-01 |
| D2 | Tab onboarding | (new) | — | Every tab has a one-page intro: first visit, reopen via "?" | decided | 2026-10-01 |
| Q2 | "Next money in" card on Home? | A/B/C | A | A — default Home card, no ₹ | decided | 2026-10-01 |
| Q3 | Comparisons? | A: one "What changed" card / B / C | A | A — Insights; month-by-month one tap deeper | decided | 2026-10-01 |
| Q5 | Deep views (Sankey, range, time of day)? | A: Insights library / B / C | A | A — Insights library, not default | decided | 2026-10-01 |
| Q4 | Editing? | A: Full / B / C | A | A, extended: jars, budgets, period, savings share, subscriptions, UPI IDs — each in its tab's settings, one decision per screen | decided | 2026-10-01 |
| D3 | MUST / NICE / NO list | accept / adjust | accept | Accepted, remapped onto the 5 tabs | decided | 2026-10-01 |

##### Phase 2 — Tile exploration
Source: claude/v12_phase2_tiles.md

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2-Q1 | Tile form | A: Merging rows / B: Dot glow / C: v11 grid | A | Tile = ₹100 everywhere; resolution handled in 2b | decided via P2b | 2026-10-01 |
| P2-Q2 | Large amounts | A: pills then ₹10,000 blocks / B / C | A | A | decided | 2026-10-01 |
| P2-Q3 | Dot-matrix glow | A: time/position only / B / C | A | A | decided | 2026-10-01 |
| P2-Q4 | Density levels | A: size follows surface / B: setting / C: one size | A | | open (built as A behind `DENSITY` constant) | |
| P2-Q5 | Key style | A: once per screen + tab intro / B / C | A | A | decided | 2026-10-01 |

##### Phase 2b — Tile resolution (core of the app)
Source: claude/v12_phase2b_resolution.md

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2b-Q1 | Resolution system | A: Hybrid (crumb <₹100 → tile ₹100 → pill ₹1,000 → block ₹10,000; cup-fill remainder; snap motion; tap to zoom) / B / C / D | A | A — Hybrid | decided | 2026-10-01 |
| P2b-Q2 | Amounts below ₹100 | A: Cup fill / B: ₹25 quarters / C: fixed crumb | A | A — Cup fill | decided | 2026-10-01 |
| P2b-Q3 | Tap on tile visual | A: Zoom one level / B: tooltip / C: nothing | A | A | decided | 2026-10-01 |
| P2b-Q4 | One rule everywhere? | A: One rule / B: Round Savings/Income | A | A | decided | 2026-10-01 |

Note: cup fill shows small amounts as a partly filled tile; Tarun earlier said he didn't want "one tenth of a tile" for ₹10 — he chose cup fill knowingly after seeing the renders. Revisit if his sketches suggest otherwise. (Update 2d: the tile is now a dot; cup fill must read by area — see P2d-D1 / P2e-Q1.)

##### Phase 2c — Money visualization research
Source: claude/v12_phase2c_money_viz_research.md (39 sources, 33 verified) · Board: Phase 2c section

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2c-Q1 | Numbers on Home? (research favoured "₹ left"/per-day; conflicts with no-budget-on-Home) | A: keep no numbers on Home; ₹/day only in Spending + pay moment / B: ₹ per day on Home / C: runway days | A | A — keep no numbers on Home; per-day figure lives in Spending and at the pay moment | decided | 2026-10-01 |
| P2c-Q2 | How spent money looks | A: outlined empty tiles / B: faded / C: removed | A | A — outlined (left = solid, spent = outline; whole stays visible) | decided | 2026-10-01 |
| P2c-Q3 | Equivalents unit | A: user's own frequent buys / B: fixed staples / C: none | A | A — user's own frequent buys ("≈ 14 of your chais") | decided | 2026-10-01 |
| P2c-Q4 | "Spent more than last week" | A: ghost of last week + hatched extra + one sentence / B: amber chip / C: Insights only | A | A — no red | decided | 2026-10-01 |
| P2c-Q5 | Money-as-time | A: days of a jar (library only) / B: hours of work / C: none | A | A — library only (via P3-Q4) | decided | 2026-10-01 |

##### Phase 2d — Tarun's sketches (decisions after review)
Source: claude/v12_phase2d_sketch_concepts.md · follow-up work: claude/v12_phase2e_concepts.md · Board: Phase 2d + 2e sections

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2d-Q1 | What do red and green mean in the sketch? | A: red = spent, green = left / B: two jars / C: no meaning | — | A — red = spent, green = left. Keep the meaning but NO red: spent = outlined dots, left = solid | decided | 2026-10-01 |
| P2d-Q2 | Circles as the ₹100 unit? | A: circles everywhere / B: squares / C: circles on Home only | A | A — dots (circles) are the ₹100 unit, replacing square tiles, with small gaps so they are countable | decided | 2026-10-01 |
| P2d-Q3 | Fuse several ₹10,000 blocks? | A: separate, hairline gap / B: fuse / C: fuse, tap to split | A | A — blocks keep a hairline gap (no full fusing). Ladder: crumb <₹100 → dot ₹100 → pill ₹1,000 (row of 10 fuses) → block ₹10,000 | decided | 2026-10-01 |
| P2d-Q4 | Which new concept to test next to Merging Dots? | A: Day lanes / B: Hourglass / C: Ticket strip / D: none | A | Explore ALL: Day lanes, Glass columns, Bangles, Hourglass, Ticket strip, alongside Merging Dots (done in Phase 2e) | decided (changed) | 2026-10-01 |
| P2d-Q5 | Spent dots look | A: outline / B: dimmed fill / C: red | A | A — outline | decided | 2026-10-01 |
| P2d-D1 | Cup fill inside a circle | (new, from Tarun) | — | Must read by AREA, not height; show 2–3 options (Phase 2e: pie wedge / concentric core / area-true level) | decided (options in 2e) | 2026-10-01 |

##### Phase 2e — Dot system + concept deep-dive
Source: claude/v12_phase2e_concepts.md · Board: Phase 2e section (6 concepts × 15 states)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2e-Q1 | Cup fill inside a dot | A: pie wedge / B: concentric core / C: area-true liquid level | A | A — pie wedge, clockwise from 12, area-true | decided | 2026-10-01 |
| P2e-Q2 | Colour for "left" | A: blue left, green saved / B: green left, new hue for saved / C: one ink, saved by ring | A | Changed — "left" money = category colour (each jar its own colour); green reserved for savings only | decided (changed) | 2026-10-01 |
| P2e-Q3 | Adopt the combination? | A: Merging Dots base + Day lanes in Spending / B: Merging Dots only / C: other | A | A — Merging Dots is the base unit on every tab; Spending also gets Day lanes (today / this week). Glass columns and Ticket strip parked | decided | 2026-10-01 |
| P2e-Q4 | Motions to borrow | A: Hourglass drop (pay) + Bangle close (complete) / B: Ticket tear / C: plain lift-out | A | A — pay motion = hourglass drop; goal-complete motion = bangle close | decided | 2026-10-01 |
| P2e-Q5 | Day lanes overspend | A: tomorrow's lane shortens / B: hatched extra only / C: re-spread across all days | C | C — re-spread remaining days (future lanes shrink slightly; no blame) | decided | 2026-10-01 |

##### Phase 3 — Insight & visualization library
Source: claude/v12_phase3_insights.md · Board: Phase 3 section (31 insights × 2–3 forms, filter by tab, colour/B&W)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P3-Q1 | Insights default board: What changed · Category share · Small buys add up · Month story (equivalents as a line inside cards)? | A: yes / B: swap Month story for Top places / C: pick in onboarding | A | A — default four kept: What changed, Category share, Small buys add up, Month story | decided | 2026-10-01 |
| P3-Q2 | Time/position views (time of day, calendar, ETA, next money in) use glow, not dots? | A: glow only for time/position / B: dots everywhere / C: glow on Insights only | A | A — glow only for time/position views (already decided, P2-Q3) | decided | 2026-10-01 |
| P3-Q3 | Sankey form | A: dot-ribbon Sankey, spent ribbons outlined / B: two-column flow / C: three-step rows | A | Use the Phase 3 recommendation — A: dot-ribbon Sankey on the true ₹ scale, spent ribbons outlined (B as fallback if busy) | decided | 2026-10-01 |
| P3-Q4 | Money as time (P2c-Q5): days of a jar | A: library only / B: also a line at pay / C: drop | A | A — money-as-time in the library only | decided | 2026-10-01 |
| P3-D1 | Jars beyond 3 colour-safe hues | (new, from Tarun) | — | Jars 4+ reuse the same hues (amber, blue, plum; savings green reserved) with a stripe/dot pattern, and always show their name | decided | 2026-10-01 |
| P3-Q5 | Income colour | A: neutral ink shades / B: one new hue / C: green | A | A — income in neutral ink shades until it is split into jars | decided | 2026-10-01 |

##### Phase 4 — Information architecture & disclosure layers
Source: claude/v12_phase4_structure.md · Board: Phase 4 — Structure section (tab map, 3 Home layouts, 4 Pay placements, 3 depth models, per-tab screen maps, intros, bell)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P4-Q1 | Home layout | A: Widget grid like the reference: wide Pace glow on top, then half and wide cards, add-widget tile / B: Big glow hero + three stacked cards / C: Single-column story (sentence + small visual) | A | A — widget grid: wide Pace glow card on top + widgets, no numbers | decided | 2026-10-01 |
| P4-Q2 | Where Pay lives | A: Round Pay button beside the floating tab pill. Tap = camera open (Scan); "Pay UPI ID" and "Log cash" sit under the viewfinder / B: Centre button inside the tab bar (6 slots) / C: Persistent three-part pill above the tab bar / D: Big Pay button on Home only | A | A — round Pay button beside the floating tab bar on every tab; tap opens camera (Scan = 1 tap); Pay UPI ID + Log cash as chips under the viewfinder (2 taps) | decided | 2026-10-01 |
| P4-Q3 | How deeper layers open | A: Hybrid — a card opens in place to explore (one open at a time), detail and settings push a new screen / B: Every layer is a new screen / C: Everything expands in place | A | A — hybrid: explore expands in place; detail and settings push a new screen | decided | 2026-10-01 |
| P4-Q4 | Where settings live | A: Gear in each tab header for that tab, avatar on Home for app-wide settings / B: One avatar drawer for everything / C: Drawer, with a shortcut from each tab | A | A — gear in each tab header for that tab; avatar on Home for app-wide settings | decided | 2026-10-01 |
| P4-Q5 | Customising widgets | A: Home: pin, hide, reorder (max 6). Insights: pin from the library. Other tabs: fixed order, can hide / B: Fixed everywhere / C: Every tab fully customisable | A | A — recommendation accepted: Home pin/hide/reorder (max 6); Insights pins from library; other tabs fixed | decided | 2026-10-01 |

##### Phase 5 — Core flows
Source: claude/v12_phase5_flows.md · Board: Phase 5 — Core flows section (14 storyboards; variants for flows 1, 3, 4, 5, 9, 12)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P5-Q1 | Onboarding | A: one question per screen (7 taps) / B: starter month from student type, "Looks right" or change one thing (4) / C: learn from 30 days of UPI (3) | B | B — Starter month: pick student type → pre-filled month → "Looks right" / "Change one thing"; manual-only path asks "What comes in?" | decided | 2026-10-01 |
| P5-Q2 | Income split | A: ask once + undo; irregular income gets one "what is it for" question / B: silent auto-split / C: always ask | A | A — one confirm + undo for regular income; irregular income first asks "For this month / Keep for later / Friend paying back" | decided | 2026-10-01 |
| P5-Q3 | Jar at pay | A: guessed jar as a chip on the amount screen (2 taps to UPI) / B: jar first (3) / C: pause screen with per-day figure (3) | A | A — guessed jar chip on the amount screen (recommendation accepted) | decided | 2026-10-01 |
| P5-Q4 | Empty jar timing | A: ask once before UPI opens, then re-spread days / B: pay first, sort after | A | A — ask once before UPI opens, then re-spread days; if all jars empty → default "start next month lighter" | decided | 2026-10-01 |
| P5-Q5 | Month-end leftover | A: one choice (Savings default), story waits in Insights / B: auto-sweep / C: story first, choice last | A | A — one choice, Savings default; month story waits in Insights | decided | 2026-10-01 |
| P5-D1 | All other flow recommendations (claude/v12_phase5_flows.md) | accept / adjust | accept | All other flow recommendations accepted | decided | 2026-10-01 |

##### Phase 6 — Visual identity
Source: claude/v12_phase6_identity.md · Board: Phase 6 — Visual identity section (4 directions × 4 screens + B&W, palettes + validator, type, logos, splash)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P6-Q1 | Style direction | A: Monochrome glow / B: Warm paper / C: Ink & dots / D: Soft night | A + C's 1.6px spent outlines + B palette as light companion | A — Monochrome glow (Geist / Geist Mono), borrowing C's 1.6px spent outlines and B's palette for light mode | decided | 2026-10-01 |
| P6-Q2 | Default appearance | A: dark default / B: follow phone / C: light default | B | B — appearance follows the phone (dark/light); B&W optional | decided | 2026-10-01 |
| P6-Q3 | Logo mark | L1 Dot + crumb / L2 Dot jar / L3 Trickle / L4 Pill + dot (t) | L1 | L3 — "Trickle" wordmark (not L1) | decided (changed) | 2026-10-01 |
| P6-Q4 | Numerals for ₹ | A: mono tabular / B: text face tabular / C: display face | B | B — recommendation: text face with tabular figures | decided | 2026-10-01 |
| P6-Q5 | Dot finish | A: flat + hairline highlight / B: embossed / C: flat | A | A — flat + hairline highlight | decided | 2026-10-01 |

##### Phase 7 — Retention & emotional design
Source: claude/v12_phase7_retention.md · Board: Phase 7 — Retention section (loop map, first week, 3 notification / check-in / story / return variants, anxiety reducers, widgets, 14 principles)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P7-Q1 | Notifications | A Calm few: ≤1/day, ≤3/week, 5 types / B Event only (money moves) / C One Sunday digest | A | A — Calm few: max 1/day, 3/week, quiet 22:00–08:00; 5 types, one action each, each its own Android channel | decided | 2026-10-01 |
| P7-Q2 | Weekly check-in | A One card + "Start the new week" / B Three swipes / C Sunday card on Home | A | A — one card ending "Start the new week" | decided | 2026-10-01 |
| P7-Q3 | Month story | A Five cards ending on "You kept ₹X" / B One poster / C Letter | A | A — 5 cards ending "You kept ₹X" + opt-in share poster with amounts hidden | decided | 2026-10-01 |
| P7-Q4 | Coming back after a gap | A Welcome back + "Start from today" / B Catch-up sort first / C Silent resume | A | A — Welcome back: savings first, auto-sorted count, "Start from today" | decided | 2026-10-01 |
| P7-Q5 | Home-screen widgets at launch | A Pace 4×1 + Goal 2×2 + Pay 2×1 (Jar optional) / B Pace only / C No widgets in v12 | A | A — recommendation: Pace 4×1, Goal 2×2, Pay 2×1 at launch; Jar opt-in | decided | 2026-10-01 |

##### Phase 8 — Build plan
Source: claude/v12_phase8_build_plan.md · Board: Phase 8 — Build plan section
Note (Phase 7 sources): Pielot et al. 2014 and Wohllebe et al. 2021 verified 2026-10-01; full citations fixed in claude/v12_phase7_retention.md.

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P8-Q1 | Sign off build scope (screens, widgets, flows, build order)? Anything to cut/add? | OK as is / cut / add | OK as is | Signed off — build as planned | decided | 2026-10-01 |

##### Phases 9–11 — Build, validate, handoff
Source: claude/mockup_v12_build_notes.md, claude/v12_phase10_validation.md, claude/v12_phase11_handoff.md

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P11-Q1 | Pay UPI ID measured 4 taps (plan said 3) | A: recent payee chips under the viewfinder (3 taps) / B: keep as built | A | B — 4 taps accepted; the plan's target of 3 was miscounted | decided | 2026-10-01 |
| P11-Q2 | New goal measured 4 taps (plan said 2) vs "one step per screen" | A: keep three one-decision steps / B: name + amount on one screen | A | A — keep one decision per screen; 4 taps accepted | decided | 2026-10-01 |

Note: Tarun's message numbered these the other way round (Q1 = new goal, Q2 = Pay UPI ID); answers are recorded against the matching question text.

##### Phase 12 — Sounds & animations
| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P12-Q1 | Motion language | A: Calm base + Tactile at touch (pay, crumbs, zoom, sheets, press) / B: Calm everywhere / C: Tactile everywhere / D: Playful | A | A — Calm base + Tactile springs only where the finger acts (pay, crumb snap, zoom, sheets, press); Playful out | decided | 2026-10-01 |
| P12-Q2 | Sound palette | A: Hybrid — coin at pay + crumb snap, chimes for good news, wooden for UI, charts/glow/story cards silent / B: Chimes only / C: Wooden only / D: Coin only | A | A — Hybrid: coin plink at pay + crumb snap; chimes only for good news (income, savings, goal milestones / bangle close, month-end kept); wooden clicks for UI; charts, glow, story cards silent | decided | 2026-10-01 |
| P12-Q3 | Sounds on by default (re-confirm v9) | A: on, soft, mute toggle / B: on only for pay + savings moments / C: off until turned on | A | A — on by default, soft (each voice ≤0.15), mute toggle, respect silent mode, unlock on first tap, max 1 sound / 300 ms | decided | 2026-10-01 |
| P12-Q4 | Haptics default | A: on, light, only pay/snap/milestones/press / B: on for everything that moves / C: off | A | A — on, light, key moments only (pay, snap, milestones, press) via navigator.vibrate where available | decided | 2026-10-01 |
| P12-Q5 | Which moments animate | A: all 12 in the lab (glow = 1.6 s cross-fade on app open only) / B: drop chart draw-ins / C: Tarun names cuts | A | A — all 12 lab moments (recommendation) | decided | 2026-10-01 |
| P12-D1 | Reduced motion | (from brief) | — | Reduced motion → final states, no motion; follows the phone, with an in-app override (Follow phone / Reduce / Full) | decided | 2026-10-01 |
| P12-D2 | Applied to app (part 2) | — | — | Applied to the v12 prototype; validator re-run 37/37 checks (claude/v12_phase10_validation.md, Phase 12 re-run) | done | 2026-10-01 |

Source: claude/v12_phase12_motion_sound.md · Lab: https://claude.ai/artifact/Ap3fww8xv5auAqFNtUE2Zf

### v13 decision log
*Verbatim from `docs/claude/v13_decisions.md`: Trickle v13 — Decisions log. Headings demoted; nothing else changed.*


Tarun said "make your own decisions" (1–2 Oct 2026). Every v13 decision below was made by Claude, with the reasoning. All v12 decisions (claude/v12_decisions.md) stand unless a row says otherwise.

Links: prototype https://claude.ai/artifact/7p8hkxT1Bucq76CySm5DEF · design system https://claude.ai/artifact/A5xYpgoLKZwngjH2uV36FT · Figma page "v13 Design System" (node 23:36) in Trickle-Explorations (jaa1XnsKBLGcDLj5hYxpBr), boards 24:2 Identity, 25:2 Tokens/dots/components, 26:2 Onboarding template + screens (template component 26:5).

##### Inputs found
| # | Finding | Effect |
|---|---|---|
| IN-1 | The 17-tile Gradients section (15:2) no longer exists in Tarun's Color Scheme frame (9:2). He replaced it with three hero mesh gradients (image 18:154): yellow→green→teal, coral→blue→teal, orange→yellow. | These three became the core of the identity: Grove, Tide, Ember. |
| IN-2 | Tarun added dot-ladder sketches with gradient-filled marks (Rs 50 = half dot, Rs 100 dot, Rs 1000 pill, Rs 10000 block, Rs 20000 two blocks) and an Income (grey) → Spending (red/pink/purple) + Saving (green) split. | Adopted the gradient depth on marks and the ₹50 half-dot in the logo. Kept no-red (v12 P2d-Q1): spending stays jar hues + outline. |

##### Identity
| # | Decision | Reasoning |
|---|---|---|
| D13-1 | Green→amber is the brand and pace gradient. Grove (Tarun's yellow→green→teal) = on pace, logo, splash, Home intro, Pay button. Ember (his orange→yellow) = "a bit fast". | Tarun liked v10's green→amber pace transition; his own hero gradients already form that pair. |
| D13-2 | Gradient library of 10 named gradients mapped to moments: Grove (brand/on pace), Ember (a bit fast, onboarding step 2), Tide (Insights intro, night), Payday (Income intro, manual income), Savings Grove (Savings intro), Cool (Spending intro, Link UPI), Goal Reached, Fresh Start (Welcome back), Month Story, B&W. Each has an accent token. | Gives every big moment its own colour while staying inside his palette; accents carry the key phrase and button as in the Zentra reference. |
| D13-3 | Tide's warm corner moved from Tarun's coral (#DE4F45, hue 4°) to his "a bit fast" orange #F68E4F. | Keeps the no-red rule (validator scans h<12 or >348). |
| D13-4 | Gradients appear only as glows behind content, never as fills on data. Exception: marks get a subtle depth gradient (light corner → hue → darker corner) from Tarun's Dot-depth swatches. | Keeps data colour = identity; depth matches his sketches without changing hue meaning. |
| D13-5 | Logo mark: the dot ladder trickling down (pill ₹1,000 → dot ₹100 → half-dot crumb ₹50) in Grove gradient; wordmark "Trickle" Geist Bold −4% kept. App icon: Grove glow squircle + white mark; mono version for themed icons. | v12 P6-Q3 chose the wordmark; the brief allowed adding a mark. Built from the app's own unit so the logo teaches the system. |
| D13-6 | Typography: keep Geist (UI, tabular figures) + Geist Mono (eyebrows, key). Display 32/36 SemiBold −3% for onboarding/intro headlines, Title 24, Lead 20, Body 15, Sub 13.5, Eyebrow mono 11 +8%. | v12 P6 decided Geist; Zentra-style headlines need only a larger size and tighter tracking, not a new face. |
| D13-7 | Ground changes to #121318 (Zentra near-black), card #1B1C22, raised #26272E. | Matches the onboarding reference so glows fade into the same ground in-app. |
| D13-8 | Jar hues re-tuned and validated with the dataviz validator: dark #B8862A #4F8CEB #B9459A #2AA67A on #17181C → PASS all checks (v12 dark set failed: amber too light, savings↔plum ΔE 7.0 deutan). Light #B7791F #2F63C9 #93306B #1F9B84 on #F4F4F2 → PASS (worst ΔE 14.1). | Palette must be computed, not eyeballed. |
| D13-9 | Dark is the look the identity is designed in; appearance still follows the phone (v12 P6-Q2) with Light and B&W available. Light mode keeps the glows at ~55% opacity and darkens accents for contrast; B&W turns glows grey and underlines accent phrases. | v12 decision kept; brief's "dark default" satisfied because the demo/screens are dark-first. |
| D13-10 | Pay button uses the Grove gradient on every tab (ink in B&W). | It is the brand action; green elsewhere still only means savings in data. |

##### Screens
| # | Decision | Reasoning |
|---|---|---|
| D13-11 | One template (Zentra style) for onboarding O-00…O-04, all five tab intros and Welcome back R-01: glow top ~half, mark + wordmark, 2-line headline with accent phrase, grey subline, step dots (active = pill), full-width accent button, text link. Interactive content (chips, keypad, options, starter-month cards) sits between subline and dots; on long screens the glow shrinks to 300px ("tall"). | Brief requirement; keeps one decision per screen. |
| D13-12 | Step dots: onboarding 3 steps (Link UPI / type / starter month); intros show tab position 1–5. Tab intro gradients: Home Grove, Income Payday, Spending Cool, Savings Savings Grove, Insights Tide. | Each tab gets its own colour identity. |
| D13-13 | O-02 (student type) keeps the four options as the decision and has no extra button. | Adding "Continue" would add a tap to the 4-tap onboarding (v12 F1). |
| D13-14 | Splash is the template with "Get started" + "See a demo month instead"; tapping anywhere still advances, and it auto-advances after 1.4 s as in v12. | Keeps F1 tap count and splash motion. |
| D13-15 | Home gets a v10-style pace glow behind the header: Grove when Easy/Steady, Ember when Quick. Home still shows no numbers. | v10 look Tarun liked; glow = position in the month, consistent with P2-Q3. |
| D13-16 | v10's shape/coin denomination system is not used. | Rejected by Tarun. |

##### Figma
| # | Decision | Reasoning |
|---|---|---|
| D13-17 | New page "v13 Design System"; Tarun's Page 1 frames untouched. 23 new v13/* variables added to "Trickle colours" (Dark/Light/B&W) and 11 paint styles "Trickle v13 / Gradient / …". | Extend, don't overwrite. |
| D13-18 | Screens in Figma are rebuilt natively (not screenshots): 12 template screens + Home dark/light, Spending, Savings. | Image upload to Figma was blocked by the network proxy; native frames are editable anyway. Income and Insights key screens exist only in the prototype. |

### v14 and v15 decision log
*Verbatim from `docs/claude/v14_decisions.md`: Trickle v14 — Decisions log (Tarun decides everything). Headings demoted; nothing else changed.*


Base: claude/v14_stage0_facts.md (facts + 7 approved principles), research/brymans_analysis_interviews.md.

##### Decided
| Date | Decision |
|---|---|
| 2 Oct | 7 principles approved as written. |
| 2 Oct | 5 tabs: Home · Income · Spending · Savings · Insights. |
| 2 Oct | Home timeframe = this week. Home shows one sentence + ONE overall fuel gauge, no ₹. |
| 2 Oct | NO coins/dots as the general money representation (reverses the dot = ₹100 system and the "coin + ×N" idea). |
| 2 Oct | Squares/circles are used ONLY to show loss: at the pay/friction screen the amount being paid crumbles away. |
| 2 Oct | Categories are shown as FUEL GAUGES. Categories are many (20+ possible), user-created, custom icons possible — representation must stay consistent. |
| 2 Oct | Every kind of information gets its own specific representation (no single universal unit). |
| 2 Oct | Stop designing for one seed with 5 fixed categories. Test every idea against a POOL of students based on the six interviewees (Tarun, Nishad, Yash, Gautham, Harsh, Vaishak types), varying income (₹3k–25k), category count (2–20), period, and month 1 vs month 6. |
| 2 Oct | Process: go ONE visualisation / widget at a time. Tarun provides pictures/inspiration at each step. Claude draws options across the student pool; Tarun decides; then next. |
| 2 Oct | **Budget gauge form:** 10×10 grid of rounded boxes that fills from the bottom like liquid. ALWAYS 10×10. Scale always shown ("1 box = ₹X"). |
| 2 Oct | **One visualisation per screen:** never more than one at a time; scroll down for the next. |

###### Viz 1 — Budget gauge (DECIDED 2 Oct) — see claude/v14_viz1_budget_gauge.md, board https://claude.ai/artifact/AcKnP1FTzaAuGwsqiXWLgM
| # | Decision |
|---|---|
| V1-1 | The liquid shows money LEFT; it drains as you spend. |
| V1-2 | Scale: budgets are set in ₹100 steps, so 1 box = budget ÷ 100 is always whole rupees and the grid = the whole budget. |
| V1-3 | Many categories: a words-only list of names (with a word like plenty / low / empty, no mini charts) → tap opens that category's grid → swipe to the next. |
| V1-4 | Gone over: empty grid + amber floor line + words ("a little over — taken from next week"); amount on tap; no red. |
| V1-5 | Home gauge: the same 10×10 grid, with NO scale on Home (keeps Home ₹-free); scale appears once you tap in. |
| V1-6 | Home gauge covers this week's share of the budget for everyone (monthly budgets split into weeks; irregular income sets the week when money arrives). |
| V1-7 | Fixed bills (rent, EMI, subscriptions) are a separate "Fixed" group — shown as paid / due soon, not as liquid gauges. Only flexible spending gets grids. |
| V1-8 | No budget set: the app suggests one from 2 weeks of spending; until then the grid's full level = "your usual week". |
Open inside Viz 1: top edge of the liquid (box-by-box vs even level), last week's ghost line — default to recommendation (box-by-box; ghost line on tap) unless Tarun says otherwise.

###### Viz 1 — follow-up from Tarun on the nested rings (C4), 2 Oct
| # | Decision |
|---|---|
| V1-9 | Rings view: each category gets its own colour. No "outer / 2nd / 3rd" tags and no numbers or word-states beside the rings. Tapping a category opens its detail (F3: grid + scale + transactions). |
| V1-10 | **The nested rings are the main view of the Spending tab** (Tarun, 2 Oct). Tapping a category opens either a drop-down or a screen with more details (F3: grid, scale chip, transactions). Replaces the earlier default that put the rings beside the words-only list (V1-3) — the rings are now the Spending-tab overview. Drop-down vs full screen not yet chosen. |

| V1-11 | Tapping a ring / category opens a **full screen** (F3: its grid, scale chip, transactions), not a drop-down. |
| V1-12 | The rings are **colour-coded**: each category its own colour, no labels like "outer" or numbers on the rings (V1-9). |
| V1-13 | Inside a category there is a **"show previous week / month / period"** control with a **slider from 1 to 12 periods back**. It shows the category's grid **as it was at the same day of that earlier period** (a like-for-like view). Not the same as the old single "ghost line"; this is the full grid, any of the last 12 periods. |
| V1-14 | Now and previous are shown **side by side**: two 10x10 grids, "Then" and "Now" (option A). The overlay options (ghost, another colour) are dropped. |
| V1-15 | The **previous period's grid is slightly faded** so it reads as "then" and the current one as "now". |
Defaults, not explicitly answered for V1-13: the slider appears after tapping "Compare with earlier weeks/months"; a dashed line on the earlier grid marks where this period is now; periods with no data are dimmed and cannot be picked; a new user (month 1) sees "No earlier weeks yet". "At that day" read as the same day-position within the period (e.g. Thursday of the week, the 17th of the month), not the end of the period.

Defaults, not explicitly answered: rings show the biggest five budgets and the rest as one "Others" ring (matches V3-7), same colours as the Income grid; a name list with swatches sits under the rings; the detail grid's liquid is the category's colour; Fixed bills are one row under the list.

Earlier defaults, now partly superseded by V1-10: (a) a ring's name appears when you press/tap it; rings show the biggest few and the rest group as "others", tap opens the full list. (b) ~~rings beside the words list~~ — rings are now the Spending tab's main view; the words-only list (V1-3) remains the fallback question for 12–18 categories.

(Restored 6 Oct 2026: the Viz 2 and Viz 3 sections and the parked Savings requirement were deleted by accident in commit 836e0fe when V1-10 was logged. Recovered verbatim from git history.)

###### Viz 2 — Pay / friction (answers 2 Oct; options board not drawn yet)
| # | Decision |
|---|---|
| V2-1 | What crumbles: boxes from the category's own 10x10 grid (same object as Viz 1). |
| V2-2 | When: "crumble away and indicate a ghost of what left, before paying" - the crumble plays on the pay screen before the payment is confirmed, leaving a ghost of what left. (My reading: boxes crumble out of the grid as a preview; can still back out - confirm with Tarun.) |
| V2-3 | Sting: "indicate what left until we move to the next screen" - the ghost of the departed boxes stays visible until the user moves on; no red/shake/sound drama. |
| V2-4 | Crumble = **D, fade in order**: the paid boxes fade out one by one, top first, no pieces (~1.5 s). |
| V2-5 | Ghost = **G2, dashed outline** where the liquid was, kept until the user moves on. |
Defaults on my recommendation, not explicitly answered (change any time): payments under one box crumble at true size; going over carries V1-4 to the pay screen (everything left fades, then amber floor line + words, no red); the ghost updates live as the amount or category changes and snaps back if you back out.
Board: https://claude.ai/artifact/Fsvd6fogygvPdtsrHsqMyN (source archive/session-workfiles/viz2/viz2-pay-friction.html). No inspiration images were needed.

###### Viz 3 — Income split (Tarun's structure, 2 Oct; options board drawn)
| # | Decision |
|---|---|
| V3-1 | Income splits into spending and savings. Spending splits into budget and subscriptions. Savings splits into goals. |
| V3-2 | All of it is drawn from the same grid (the 10x10 box grid). |
| V3-3 | Colours: income grey, spending orange, savings green; the budget's categories are different colours (matches V1-9). |
| V3-4 | Layout: **bands from the bottom** (not columns). |
| V3-5 | **Savings at the bottom**, spending on top. |
| V3-6 | Go deeper **level by level**, each step with a slow, smooth delay (my reading: the same grid splits in place, one step at a time). |
| V3-7 | **Biggest five categories coloured, the rest shared as "others".** |
| V3-8 | Labels must be separated and differentiated better: savings and spending were run together in one list. Resolved by V3-9 and V3-10. |
| V3-9 | Labels = **L2, drop-downs after the split**: two collapsed lines, "Savings" and "Spending", each opens into its own list. |
| V3-10 | A **visible gap between the savings band and the spending band inside the grid** (not only in the labels). |
| V3-11 | **App-wide rule:** the scale line ("1 box = ₹120") must carry visual hierarchy so people don't miss it — a prominent chip, not small grey text, on every screen that shows it (Viz 1 gauge, Viz 2 pay screen, Viz 3 income). Applied to the Viz 2 and Viz 3 boards; the Viz 1 board still has the old small line and gets it in the build. |
Viz 3 closed by Tarun ("done viz 3"). Defaults that stand, not explicitly answered: the stepped edge in the split row (spending boxes sit higher than savings boxes beside them); a group with nothing in it (no subscriptions / no goals) is not drawn; budget is light orange and subscriptions hatched orange.
Board (updated): https://claude.ai/artifact/KHq3fHEr8sebrJzRksghMQ (source archive/session-workfiles/viz3/viz3-income-split.html).

###### Parked requirement (Tarun, 2 Oct) — Savings tab
In the Savings tab the user must be able to **add goals**, **make a payment toward a goal**, and see **a few completed goals**. Not for now ("this happens later"); belongs with visualisation 4 (savings goal) and the Savings-tab screens. Keep track of it.

###### Viz 4 — Savings goals (Tarun, 2 Oct; board published)
References he sent: iOS year-progress waffle (green filled grid, "299d left · 18%"), a segmented half-ring gauge ("74%"), a GitHub-style day heatmap in green glow.
| # | Decision |
|---|---|
| V4-1 | Goals fill **from the bottom like Viz 1**, and each goal shows its **ETA at the bottom**. |
| V4-2 | **No rings** (rings belong to spending). A **half fuel gauge**, with each goal's smaller gauge **stacked below**. The goals are a **collapsible list**. |
| V4-3 | The **first Savings page shows only this fuel-gauge visualisation**. Tapping a goal goes into **statistics**. |
| V4-4 | **Goal completion is pushed as an intro-style celebration screen** wherever the completing action happens: shows **how many days it took** and **how much is saved**. Finished goals go into a **Completed** category. |
| V4-5 | A goal's statistics offer a **day-wise split** option. |
| V4-6 | **Month view uses amber and green boxes**: **amber = deducted from savings**, **green = added to savings**; **the more a box glows, the more was saved** (or taken). |
| V4-7 | **Pay out of savings**: when paying, the user can choose a goal like choosing a category. **Screens and flow are for later**; only the data visualisation is for now. |
| V4-8 | **No visualisation next to any goal** on the Savings page: a goal row is text (name, how far, ETA). |
| V4-9 | The **main savings visualisation is a segmented ring**. With two goals the ring is **split into two sections sized by their amounts**, and each section is **filled in its own shade of green** by how much is saved. |
| V4-10 | **"By day" is removed.** Statistics show **months only**, with a **toggle to move through the months** and see each one. |
| V4-11 | Also show the **most saved months**. **Every visualisation is progressive**: one per screen, the next reached by scrolling. |
| V4-12 | **The day-wise visualisation comes back** (supersedes the "By day removed" part of V4-10). A goal's statistics page runs top to bottom: the **month stepper and all month boxes**, then **below them a day-by-day visualisation for the selected month**, where you **move through the months and every day is shown** (the GitHub-style weeks-by-weekday grid he sent, green added / amber taken out, glowing by amount). |
| V4-13 | **Most saved months are visualised, not written**: the separate "Most saved months" screen and text are gone. The biggest months show it through the glow of their boxes. |
| V4-14 | **Statistics go back to the earlier "By month / By day" toggle** (supersedes the scroll-below layout of V4-12). The **month stepper stays only in By month**. **By day has no month toggle**: the days are shown as **columns (weeks) by weekday**, like his reference, across the last twelve weeks, each day a box. |
| V4-15 | **The month toggle moves from By month to By day** (amends V4-14). **By month** has no stepper: just every month box (biggest months haloed). **By day** has the **month stepper** and shows **that month's days as week columns**. My reading: tapping a month box selects it, and By day then opens on that month. |
| V4-16 | **In By day the days are columns, not rows** (amends V4-14/V4-15): Monday to Sunday run **across the top as seven columns**, the **weeks stack down as rows**, like a calendar. Replaces the weeks-as-columns layout. |
Note: V4-12 puts two visualisations on one scrolling page. Kept to the one-visualisation-per-screen rule by having the day grid sit a scroll below the months (each is alone on screen). Board's "today" is now 28 October 2026 so the current month has days to show.
| V4-17 | **Full segmented ring** for the Savings page (not the half ring). Supersedes the half-gauge form in V4-2 for the main visualisation. |
| V4-18 | Ring sections are **sized by each goal's target amount**. |
| V4-19 | Goal rows keep the **colour dot** that matches their ring section. |
| V4-20 | The **halo stays on the three biggest months** in By month. |
| V4-21 | By month and By day **share the selected month**: the month tapped in By month is the month By day opens on. |
Board: https://claude.ai/artifact/X9aNwLv6pGGZb5sFcxiXEm (source archive/session-workfiles/viz4/viz4-savings-goals.html).
Interpretation to confirm: the top gauge is all savings together, goals stacked below it; "fill from the bottom" on a half gauge means filling up from the arc's lower ends, or a half-height grid (two forms drawn).

###### Flows (Tarun, 2 Oct)
| # | Decision |
|---|---|
| F-1 | **"Pay toward a goal" means using the saved money to actually pay for, buy or experience the goal** (e.g. paying for the trip), **not a separate contribution payment.** It is **handled like categories while paying**: on the pay screen the goal is chosen the way a category is. This **merges two parked items** (pay toward a goal + V4-7 pay out of savings) into one flow. Money goes *into* goals through the splits (setup, week-end pop-up, new income), not through a payment flow. |
| F-2 | **"How much" and "What is it for" are merged into one screen.** What it is for is shown in **two tabs, Budget / Savings** (layout C), with **categories and goals drawn as boxes** (tiles). This settles the step-order and chooser-layout questions on the pay flow board. |
| F-3 | **The pay screen handles all overspending and not-enough-money edge cases** (no separate steps or screens for them). Drawn: over a category (buffer, then other categories equally, then savings, per O-23), a goal with too little saved (same order), and a low account balance as a warning; "Where it comes from" opens the split. |
| F-4 | **A final, nice confirmation screen with all the relevant data, shown as a success or a failure.** Drawn: amount, to whom, what for, where it came from, when, UPI reference; success green, failure amber with the reason and "nothing was taken from your budget". |
| F-5 | **The user can move money out of savings to other parts**: to **another savings goal**, to **categories**, to **the buffer**, "etc". A **Move money** flow, separate from paying. My reading, to confirm: it is reached from a goal's screen; "etc" also covers free (unassigned) savings and moving between other pots. |
| F-6 | **The "Where it comes from" breakdown on the pay screen is a visual, not a list of numbers.** Drawn: a strip of 25 boxes coloured by source (the category, the buffer, the other categories, savings in amber); tap a colour for its amount (V11). To confirm: strip form. |
| F-7 | **Show the amount for each source below the visual** (amends F-6: amounts are no longer only on tap). Drawn as name + amount pairs under the strip; a source that gives nothing is left out. This is a deliberate exception to V11's "amounts on tap", because the panel only opens when the user taps "Where it comes from". |

Pay screen flow board (2 Oct): https://claude.ai/artifact/LhuVGnFaj29oBbg3cYoX3u (source `archive/session-workfiles/flow1/pay-flow-1.html`). Board updated for F-2, F-3, F-4. Questions still waiting (eight on the board): what Pay does (hand-off to the UPI app assumed), box layout (2 columns), the goal pay screen look, not-enough-saved handling, when a goal is finished, money left in a finished goal.

Moving money board (2 Oct): https://claude.ai/artifact/H8t1Ep7UbonszCB2kbk4Xn (source `archive/session-workfiles/flow2/moving-money-1.html`). Six questions waiting: where Move money lives, what can be the source, money into a category (this week vs weekly amount), emptying a goal, what the confirmation says about dates, how moves show in the month view.

###### Parked for the flow stage (after the visualisation queue; Tarun confirmed "we will work on the flow later")
- Savings tab: add a goal (done, O-14), show completed goals (V4-4).
- ~~Make a payment toward a goal~~ and ~~pay from savings by choosing a goal like a category (V4-7)~~ are one flow: **spend a goal's money to pay for it, chosen like a category (F-1)**. Screens still to draw.
- Celebration screen triggers: wherever a goal is completed (pay screen, income arriving, manual top-up).

###### Viz 5 — Unspent → saved (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V5-1 | It happens **at the end of every week**, as a **pop-up screen on Home**. |
| V5-2 | The pop-up **shows a grid with red boxes that turn green** (the unspent money moving into savings). |
| V5-3 | He can **choose which goals the money goes into**. |
| V5-4 | It then **shows the updated savings ring** (the full segmented ring, V4-17). |
| V5-5 | Add **"Move it to next week's budget"** next to the savings option (this is the skip). |
| V5-6 | **Split equally into all categories.** My reading: when money goes to **next week's budget** it is split equally across **all budget categories**; when it goes to **savings** it is split equally across the goals picked. To confirm. |
| V5-7 | **Amber, not red**, for the unspent boxes (removes the red exception; the no-red rule stands). |
| V5-8 | **Show how much was left, in rupees, in step 1 itself** (overrides the earlier default of no ₹ on step 1); the scale chip comes with it. |
| V5-9 | A week with **nothing left or overspent** shows **boxes filled from the top, not the bottom**, with an **alert: "Let's do better this week"** and a **reminder of the savings goals**. |
| V5-10 | **The overspend amount is shown in emphasis**: large, bold amber ("₹300 over") under the grid, with "taken from next week" below it; on a week with nothing left the same slot reads "Nothing left". |
Board: https://claude.ai/artifact/N3Lg6rmjweszAX6owzt5Eu (source archive/session-workfiles/viz5/viz5-weekly-savings.html).
Viz 5 closed by Tarun ("done next"). The defaults below stand as drawn: default selection is all goals; boxes filled from the top = how far over (a week with exactly nothing left has no boxes from the top, just the alert); the alert's goal reminder is text rows with ETAs (no visualisation next to goals, V4-8); the next-week result is a plain list of categories and amounts.

###### Viz 6 — Small / repeat purchases (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V6-1 | What counts: **the same place or kind, 3 or more times in 30 days, any amount** (the v9 definition). |
| V6-2 | It is **a view inside the Spending tab**, reached by scrolling (one visualisation per screen). |
| V6-3 | ~~The unit is a box that fills with each repeat.~~ **WITHDRAWN 2 Oct**: Tarun: "this is not working at all". |
| V6-4 | Repeat purchases must communicate **how much and how many times, per day, per week and per month**, using **calendar hotspots** (glowing calendar cells, the style of the savings By-day grid). |
Board: https://claude.ai/artifact/AbKgJ6jeARMKgeGMdtLGox (source archive/session-workfiles/viz6/viz6-repeat-purchases.html).
| V6-5 | **The habit list is the starting screen** of the repeats view: each habit with its **repeat count (x22, x12, x7…)**, **ordered by most repeats**. **No "All repeats"** entry. Tapping a habit opens its hotspot calendar. |
Viz 6 closed by Tarun ("done"). The defaults below stand as drawn: three scales on a habit's calendar, Day (hours of a typical day), Week (weekday by time of day), Month (the last 30 days), opening on Month; a Times / ₹ switch for the glow; spending-orange glow; numbers on tap; fewer than 3 repeats shows an empty state.

###### Viz 7 — Time patterns (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V7-1 | It shows **all spending by time of day** (one hotspot view of everything, by hour and weekday), so "you spend more at night" shows across all categories, not one habit. |
| V7-2 | It lives in the **Insights tab**. |
Board: https://claude.ai/artifact/FdbjxsRYHqwkQ5hgxcCBzV (source archive/session-workfiles/viz7/viz7-when-you-spend.html).
Viz 7 closed by Tarun ("done with viz 7"). The defaults below stand as drawn: the same hotspot grids as Viz 6 (Day = hours of a typical day, Week = weekday by time of day, Month = the last 30 days) with a Times / ₹ switch and spending-orange glow; opens on Day; a calm sentence in words at the top ("A fair bit happens after 9 pm"), no scolding; a new user with few days gets a "fills in as you go" note.

###### Cross-cutting (Tarun, 2 Oct) — plain-language sentence under hotspots
| # | Decision |
|---|---|
| X-1 | **Viz 6 and Viz 7 each carry a plain sentence** saying **the time of day, the day of the week, and which part of the month the user tends to spend more**, "just in case the user finds the visualisation hard to understand". It follows the scale on screen (Day, Week, Month) and the Times / ₹ switch. |
Drawn as: Day, "You spend most around 4 to 6 pm, and again around 10 pm."; Week, "You spend most on weekdays, in the afternoon."; Month, "You spend most in the middle of the month, around the 7th to 13th." Computed from the data. In Viz 6 the subject is the habit.

###### Viz 8 — Subscriptions coming up (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V8-1 | It lives in the **Spending tab, in the Fixed group** (V1-7: rent, EMI, subscriptions as paid / due soon), a scroll below the rings and repeats. |
| V8-2 | It is **a calendar of what is due**: days with a payment due glow, so "in 2 days" is a spot you can see (same hotspot-calendar language as repeats). |
| V8-3 | **When, not how much, until you tap**: the glance says which bill and when; the amount is one tap in. |
| V8-4 | **The list under the calendar shows the amount too**: each row is the bill, its amount and when ("Coursera ₹999 in 2 days"). Amends V8-3: the calendar spots still carry no amount; the list does. |
Board: https://claude.ai/artifact/4Py7ojfodqGQ6hcaLd42fZ (source archive/session-workfiles/viz8/viz8-fixed-bills.html).
Viz 8 closed by Tarun ("next"). The defaults below stand as drawn: the calendar runs from the start of this week for six weeks; glow shows status (due soon, later), not amount; past dues show as paid ticks; a plain sentence under the heading says what is next (X-1); the bills as text rows under the calendar with name, amount and "in N days" (V8-4); no Home heads-up (not chosen).

###### Viz 9 — This week vs last (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V9-1 | It lives in the **Insights tab**. |
| V9-2 | It compares **all spending first, then by category on tap**; a category's own then-and-now is its look-back (V1-13..V1-15, already decided). |
| V9-3 | The form is **two grids side by side, last week faded** (the same form as the category look-back, V1-14/V1-15). |
Board: https://claude.ai/artifact/7HMcsvp68aqLTVr33y37sG (source archive/session-workfiles/viz9/viz9-week-vs-last.html).
Viz 9 closed by Tarun ("next"). The defaults below stand as drawn: the weeks are compared **at the same point** (e.g. Monday to Thursday); each grid shows money left (V1-1); a plain sentence says more, less or the same, in words, no red (X-1); the by-category list shows the change in rupees on the tap layer, biggest change first, amber for more and green for less (not good or bad, just direction); a student in his first week has no last week and sees only this week with a note.

###### Viz 10 — Transaction history (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V10-1 | The history is **a list grouped by day** (Today, Yesterday, Mon 27 Oct…). |
| V10-2 | You find a purchase with **filter chips: category and a day range**. |
| V10-3 | Each row says **name, amount, time** (with a category colour dot). Everything else is one tap in. |
Board: https://claude.ai/artifact/8LxmrXkdZfEGbp9H6uE8kZ (source archive/session-workfiles/viz10/viz10-history.html).
Viz 10 closed by Tarun ("okay next"). The defaults below stand as drawn: it is the last screen of the Spending tab (Tarun's Spending tab: budget setting, how much spent, transaction history); a day header carries the day's total; ranges are Today, 7 days, 30 days, All; category chips use the ring colours; tapping a row opens a detail (category, when, how it was paid, and the habit it belongs to); an empty filter says so calmly; editing a transaction is a later flow.

###### Viz 11 — Exact amounts on tap (Tarun, 2 Oct; board published)
| # | Decision |
|---|---|
| V11-1 | The deliverable is **both a rules table and one standard tap pattern**. |
| V11-2 | A tap on a spot, box or day reveals its exact amount as **a line under the picture** (the pattern used on every board so far). |
| V11-3 | **Home shows no ₹ at all.** (The end-of-week pop-up is his own exception, V5-8/V5-10.) |
Not chosen by Tarun, listed in the table as what the drawn boards do (to confirm): no numbers on the marks of grids and rings (the scale chip is the only figure); the Savings page shows no amounts until a goal is opened; over / nothing-left is words first.
Three kinds of tap outcome, as drawn: a spot, box or day gives **a line under the picture**; a category, habit, goal or purchase opens **its own full screen**; the weekly pop-up is **a pop-up on Home**.
Board: https://claude.ai/artifact/RsXokgbfEjVoyKyb3pX7Zc (source `archive/session-workfiles/viz11/viz11-amounts-on-tap.html`). Still to confirm on the board: marks rule, Savings page amounts, over/nothing-left words first, rows that carry amounts, where the rules live.

##### Onboarding — DONE (Tarun, 2 Oct; final board: https://claude.ai/artifact/16Z1Z4yx1VDWk3AT7rYP6j, source `archive/session-workfiles/onb1/onboarding-1.html`)
Board: https://claude.ai/artifact/16Z1Z4yx1VDWk3AT7rYP6j (source `archive/session-workfiles/onb1/onboarding-1.html`).
| # | Decision |
|---|---|
| O-1 | Order: **title screen → PIN setting → UPI linkage and manual tracking → app permissions → budget setting.** |
| O-2 | Budget step opens with **whatever balance the account has; the user first splits it into savings and budget.** |
| O-3 | Two ways to set the budget: **"I have no particular budget in mind"**, or **choose categories and assign each an individual budget.** |
| O-4 | People may not know how much to spend, so the input is **how much they are comfortable spending every week, per category.** |
| O-5 | **A list of 50 categories** to pick from; **a recommended set is already chosen**; the user can **create their own.** |
| O-6 | The weekly amount per category is set with **a slider that can be adjusted** (not typed, not fixed). |
| O-7 | **If a budget is already set, the categories are limited to that much**, and **each time something is assigned it is coloured and shown in the grid** (the same 10x10 grid as everywhere else). |
| O-8 | **Choosing how to set the budget (old 5b) comes before splitting the balance (old 5a).** |
| O-9 | If **"no budget in mind"** is chosen, the flow **focuses on savings and goals**. |
| O-10 | **Step 6 is savings and goals setting, with the same grid visualisation.** |
| O-11 | **Set PIN asks for reconfirmation** (enter it twice). |
| O-12 | **Setting a goal also asks by when it should happen.** Having no particular goal is fine (goals are optional). My reading: the date is optional too ("No date"); to confirm. |
| O-13 | **The balance split has no 10% / 20% / 30% quick stops** (and no other presets): the slider alone. |
| O-14 | **Add a goal must be in a much more intuitive and easily reachable spot** (not a small top-right link). Drawn: at the bottom beside Finish, and a large card when there are no goals; the exact spot is on the board for confirmation. |
| O-15 | **When a new income arrives it follows the same split-balance process** (split, weekly sliders, goals). Drawn starting from last time's choices; the Home prompt carries no ₹ (V11-3). |
| O-16 | **There is always a buffer category** in the weekly budget. Drawn: grey, pinned, it is whatever is not given to the other categories (starts at about 10%); whether it has its own slider is a question on the board. |
| O-17 | **The spending (budget) is split in one of three ways: already-set amounts/percentages (preset), split equally, or manual** — in manual the user uses sliders or **directly edits the money** (types the amount). |
| O-18 | **Preset is not available during onboarding** (amends O-17): setup offers Equal and Manual only. Drawn: Preset appears after setup, as the user's own last split, first used when new income arrives. |
| O-19 | **If manual tracking is chosen, just ask for the balance** (one question). |
| O-20 | **Subscriptions are tracked automatically through UPI, or entered by hand if manual.** They are shown **in the budget handling screen** (drawn as "Fixed bills", taken off the week first). |
| O-21 | **If "no budget in mind" is chosen, ask a few questions** (such as how much they would like to spend in a week) **and create the budget for them in onboarding** (help set the budget). |
| O-22 | **Do not show "2 months late" or anything like it in onboarding.** Goals just show **how much must be saved a month (or week) to reach the goal.** |
| O-23 | **Overspending flow:** take it from the **buffer**; if the buffer is used up, **remove equally from the other categories**; if those are also used up, **remove it from savings.** |
| O-24 | **Do not show all 50 categories.** Recommended shows **food, travel and other basic needs**; the rest are **found by search**; if search finds nothing, **create a new one for the user.** |
| O-25 | **"Sort out anything that I didn't handle":** delegated to Claude. Defaults drawn on board 3 and marked to confirm: change-the-amount link on the balance, "Is this income?" on a new credit (UPI) and an Add-income action (manual), forgot PIN through the phone's own lock, first week prorated by days left, tap a box for its category name, a calm "goals need more than you set aside" screen, bank-pick / link-failed / notifications-declined screens, an "All set" screen, and savings in the no-budget path = what is left after the weekly budget. |
| O-26 | **New income is never auto-detected.** No "Is it income?" prompt (replaces that part of O-25 and O-15's Home prompt). **The user adds money by hand where it belongs**, e.g. a friend paying back ₹200 goes into the right place, not into income. Drawn: Income tab → Add money → "Where does it belong?" (new income / back into a category / the buffer; my reading, to confirm); new income then follows the same split (O-15). |
| O-27 | **Search sits below the six basic categories, and "+ Add your own" category sits beside it.** (A search with no match still offers to create it, O-24.) |
| O-28 | **"Everything else is fine":** the nine defaults drawn for O-25 are confirmed as drawn (six basics; Change link on balance; added money goes to new income / a category / the buffer; forgot PIN via the phone's lock; prorated first week; "goals need more" screen; savings in no-budget = what is left; overspending shrinks goals proportionally; colours). The earlier unanswered drafts (title screen, 4-digit PIN, notifications + fingerprint only, savings slider starts at 0, Equal as the default split) stand as drawn. **Onboarding is done.** |
Drawn as first drafts, NOT decided (superseded by board 3's nine confirm-questions, O-25): title screen content; 4-digit PIN with an amber mismatch line; link/manual as two equal cards with Excel/CSV import as a small placeholder line; permissions = notifications + fingerprint/face only (no SMS, per hard rule); savings split as a slider only, starting share 0; weekly sliders cap at what is left (nothing-left line, no auto-take from others); unassigned boxes are 'spare'; step 6 savings are monthly so each goal shows an ETA, and compares it with the chosen date (in time, or amber 'N months late'), goals skippable; 'no budget' path = savings split, step 6, tracks four weeks then offers a weekly budget; recommended eight (Canteen & mess, Chai & coffee, Snacks, Bus & metro, Auto & cab, Mobile recharge, Outings, Stationery); (going-over wording dropped: sliders now stop at the budget, O-7). The 50 names are a draft list (8 groups); fixed bills/subscriptions live in the Fixed group (V8), not the list.

##### Delegated phase — "figure out the entire app" (Tarun, 2 Oct)
Tarun's instruction: fix logic gaps, complete all other flows, figure out the whole app, skip the grey-mockup stage, arrange data, screens and flows into one tabbed artifact; then visualisation, then mockup; do not ask or wait for decisions, keep him updated. **Everything below is Claude's decision under that delegation (status: delegated, open to override).** Source: the Blueprint artifact https://claude.ai/artifact/RVjueXaXCsmCKyF6UUEErj (`archive/session-workfiles/blueprint/blueprint.html`).
| # | Decision (delegated) |
|---|---|
| D-1 | A week runs **Monday to Sunday**, local time; weekly amounts reset Monday 00:00. |
| D-2 | **Weeks per month = 4.3** for conversions. Internally money is whole rupees; amounts shown round to ₹5 under ₹1,000 and ₹10 above; Indian digit grouping (₹1,50,000). |
| D-3 | **Pots invariant:** income = budget + savings; budget = fixed reserve + categories + buffer; savings = goals + free savings. Every rupee is in exactly one pot. |
| D-4 | **How long the money lasts** is asked on the split screen (1 week, 2 weeks, a month (default), until next allowance). Weekly budget = budget part ÷ weeks it lasts. With several incomes, the weekly budget is the sum of each income's weekly share until it runs out. |
| D-5 | **Reconciles V1-6:** weekly budget is primary; monthly figures are weekly × 4.3. **Reconciles V1-8:** everyone has a budget from onboarding; after 4 weeks Trickle offers "Re-fit from your weeks" in budget handling. |
| D-6 | **Week-end:** unspent = categories' remainders + buffer's remainder (not the fixed reserve). Choices (V5): savings (goals equally by default; free savings if no goals) or next week's budget (equally across all categories **including the buffer**). Missed weeks queue newest first; "Do this for earlier weeks too" applies one choice. |
| D-7 | **Fixed reserve** (reconciles V1-7 with O-20): each week one 4.3rd of the monthly bills is set aside; paying a bill drains the reserve; unspent reserve stays reserved and is never part of week-end unspent. Irregular bills (3-monthly, yearly) reserve amount ÷ weeks in the period. A shortfall follows the O-23 cascade and says so. |
| D-8 | UPI-detected repeating payments (same merchant, similar amount, about a month apart, twice) are **proposed** as fixed bills with a quiet card; Ignore is remembered. |
| D-9 | **Home heads-up for a fixed bill:** one words-only line under the sentence when a bill is due within 2 days ("Spotify is due tomorrow"); no ₹ (V11-3); tap opens the Fixed calendar. |
| D-10 | **What "Pay" does:** Trickle's pay screen → opens the user's UPI app with amount and payee filled → on return Trickle looks for the payment on the account link. Found = success. Not found in 60 s = third state "Waiting for your bank" with "Check again" and "It did not go through". Manual mode asks "Did it go through?". |
| D-11 | **Payments made outside Trickle** (UPI linked) arrive as Detected; category guessed from merchant memory, else Unsorted. Unsorted payments are charged to the buffer until sorted. Home shows a words-only line ("2 payments need a category") opening the Sort tray. |
| D-12 | A payment seen twice (Trickle Pay + detection) is merged by amount + payee + a 10-minute window. |
| D-13 | **Credits are never auto-income** (O-26): detected credits wait passively in an "Unsorted money in" tray in the Income tab, no prompt, no Home line. |
| D-14 | **Editing a transaction:** category, amount, note, time; delete for manual entries; "Not mine" hides a detected one (restorable). Edits in a past week change that week's history only and never re-open week-end decisions. |
| D-15 | **Manual mode** weekly check at week end: "Does your balance still look right?"; a difference becomes an Unsorted "unlogged spends" entry charged to the buffer. |
| D-16 | **Split payments are out of scope** for v1: a friend's repayment is handled by Add money → back into a category (O-26). |
| D-17 | **Budget edit mid-week:** the weekly total stays; sliders redistribute inside it (Equal / Manual / Preset / From my weeks). A category's slider cannot go below what it has already spent. Raising the total = Move money from savings or Add money. |
| D-18 | **Categories:** adding mid-week starts at ₹0 and is funded from the buffer; deleting returns its remainder to the buffer and asks to move its history to another category or keep it archived; merging sums history and amounts; max 30 active categories. |
| D-19 | **Add money destinations:** new income (split), back into a category, the buffer, free savings. New income offers "Remind me monthly" → a gentle reminder "Did your allowance come?" (no ₹). |
| D-20 | **Goals:** name, target, optional date, saved. Needed-per-month = target ÷ months left (up to ₹10). ETA = average of the last 3 months' actual pace, else the planned pace. Free savings is a pot shown as "Not given to a goal". |
| D-21 | **Goal states:** Active → Reached (saved ≥ target; celebration fires once, offers "Mark done" or "Keep going") → Done/Completed. Paying from a goal then "Yes, done" also completes it (celebration once if not already played). Leftover on completion returns to free savings. Deleting a goal returns its money to free savings after a confirm. |
| D-22 | **Overspending that reaches savings** takes free savings first, then goals in proportion to what each holds (O-28). |
| D-23 | **Celebration triggers:** the pay confirmation, the week-end pop-up, add money / new income, a move, or a manual top-up, shown on the next screen open, never mid-flow. |
| D-24 | **Category look-back from week-vs-last:** tapping a category row opens its detail with compare preset to 1 period back. |
| D-25 | **Linking:** unlink stops detection and keeps history; switching to manual asks for the balance; relinking offers to import the last 30 days as Unsorted. Settings → Account & linking. |
| D-26 | **Excel/CSV import** (placeholder, no SMS): pick file → map date / amount / name columns → preview → import as Unsorted. |
| D-27 | **PIN:** 4 digits; 5 wrong tries → 30 s wait, doubling; biometric optional; forgot PIN resets through the phone's lock, data stays; auto-lock after 1 minute in background; hidden in the app switcher. |
| D-28 | **Notifications:** week-end wrap-up (Sunday 8 pm, changeable), bill heads-up (a day before), a monthly allowance reminder, at most one other a day; quiet hours 10 pm to 8 am; **never any ₹ in a notification**; gentle tone. |
| D-29 | **Settings** lives behind a gear on Home: Account & linking, PIN & lock, Notifications, Budget, Categories, Data (import, export, delete), About & privacy. |
| D-30 | **Pay entry:** a Pay button on Home and in Spending; manual users get "Add a spend" on the same merged screen with "I already paid". |
| D-31 | **Privacy:** data stays on the phone (local-first); export as CSV; delete everything in Settings → Data. Notifications and the app switcher hide amounts. |
| D-32 | **First-run states:** Home "Your week starts now" with a full grid; rings full; History "Nothing yet"; Insights "fills in as you go" (V7, V9 defaults); Repeats needs 3 repeats. |
| D-33 | **Accessibility:** colour never carries meaning alone (names accompany every colour); 44-pt touch targets; reduced motion respected; every box has a screen-reader label; amounts read in words. |
| D-34 | **Savings rows and the Insights tab:** Insights holds "When you spend" and "This week vs last" only for now (V7, V9); a Sankey stays parked (HANDOVER). |
| D-35 | **Scale rounding** (reconciles V1-2 with sliders in ₹5 steps): category amounts move in ₹5 steps; 1 box = amount ÷ 100, shown as "1 box = ₹X", rounded to the nearest rupee with "≈" when not whole. A goal's grid is its target ÷ 100. |
| D-36 | **The Home grid covers the week's flexible money** (all categories plus the buffer, money left). Fixed bills are not in it. No scale on Home. |

##### Design system (Tarun, 2 Oct)
Tarun's request: "nice gradients and colors … research well, collect refs, make a design system", with two reference images (a purple goals app with gradient ground and gradient rings; his Figma colour sheet). Built as the **Trickle Night** design system: https://claude.ai/artifact/3vrR99iZ8rmzw51MeFRXde (source `archive/session-workfiles/designsystem/`, rebuild with `python3 build.py`; reference images in `references/inspiration/ds/`). Research sources are listed in its References tab.
| # | Decision (delegated unless noted) |
|---|---|
| DS-1 | **Dark-first system called Trickle Night**; Day (light) theme from the v12 Figma tokens is a later mapping. Tarun asked for it; the contents are delegated. |
| DS-2 | **Ground:** a near-black blue (#05070B base) with two faint blooms (plum top-left, teal top-right), like his purple reference; four surface levels (#05070B, #0B0E14, #12161E, #1A1F29), hairline #262C37. Never pure black. |
| DS-3 | **Ink:** #F5F7FA / #A3ABB8 / #6E7685 (muted is non-text only). All text pairs pass AA; computed live on the Colour tab. |
| DS-4 | **Meaning colours kept** and given depth gradients (highlight → shade, made in OKLCH): spend #F08A3C, save #62DCB4, amber #E3A43F, buffer #9AA4B0, fixed #8D7A66, income #C9CDD6; goals greens #62DCB4 / #3FAE8C / #9BE8CF. **No red** (his sheet's "sketch red" is retired). |
| DS-5 | **Category colour change:** cat/2 moves from #B48CFF to **#CDB6FF** (under deuteranopia the old violet was almost identical to the blue, distance 0.8 → 12.4). Other four unchanged (#5AA9FF, #FF7EB6, #F2D65B, #4FD1E6; rest #F6B27C). |
| DS-6 | **Three kinds of gradient:** liquid (box fills), glow (hotspot halos), mesh (a few big moments). Mesh recipe = his Figma squircle tile (base sweep, four blooms, bottom fade, haze) + grain. Eight named meshes (Savings Grove, Goal Reached, Payday, Ember, Dusk, Night Glow, Fresh Start, Month Story). One mesh per screen at most; never behind data; never behind small text without a scrim. |
| DS-7 | **Type:** Bricolage Grotesque (display) + Figtree (body), tabular numerals, Indian digit grouping; scale 48/34/22/16/14/12.5. |
| DS-8 | **Depth by light:** lighter with height, a thin top highlight, soft dark shadows; no hard offsets (the CRED NeoPOP look is rejected as it fights the soft grid). Radius: chip 10, tile 14, card 18, sheet 28, button 16. |
| DS-9 | **Components and data visuals specified** (buttons, segmented, chips, box tiles, list rows, banner, amount field, keypad, slider, switch, tab bar, scale chip, confirmation records; fuel grid, nested rings with glowing caps, segmented ring, hotspots, month boxes, source strip, income split). |
| DS-10 | **Motion tokens:** 120 / 200 / 320 / 600 / 1300 ms; crumble 18 ms per box; celebration once; reduced motion shows the finished state; no shake or pulse on warnings. |

##### Mockup (Tarun, 2 Oct)
Tarun's request: "mockup now, along with a way to switch profiles and simulate different events". Built as a clickable high-fidelity prototype: https://claude.ai/artifact/RuuvM1tyRSEj8fKvQrkLmZ (source `archive/session-workfiles/mockup/`, rebuild with `python3 build.py`). Visualisation was folded into the mockup (composition decided while building). Decisions below are delegated.
| # | Decision (delegated) |
|---|---|
| M-1 | **One engine, no painted numbers:** every figure on screen comes from a live ledger (pots, the O-23 cascade, week-end, fixed reserve, goals, moves). A Ledger panel shows the pots and a balance check. |
| M-2 | **Six profiles** from the student pool (Vaishak manual and 2 categories; Gautham week 1 with no history; Tarun; Yash; Nishad 12 categories and big bills; Harsh 18 categories and 3 goals), each with seeded history. Switching resets that profile. |
| M-3 | **Simulator events:** time (+1 day, +3 days, Sunday 8 pm week-end, new week); payments seen on the link (known and unknown places); spends (small, over budget, all the way to savings, use up the week); credits (income-sized, friend's ₹200); bills (due tomorrow, due now); goals (reaches target, +₹500); switches (bank declines, bank slow, low account balance, link lost). |
| M-4 | **Covered screens:** Home, Spending (rings, repeats, fixed bills, history, category detail with compare, habit calendar, transaction detail and re-file, budget handling, sort tray), Income (split grid in three levels, add money, unsorted credits), Savings (ring, goal statistics by month and by day, add goal, edit, move money, free savings), Insights (when you spend, this week vs last), Pay (merged screen, crumble pay screen with all over-budget cases, hand-off, waiting, confirmation, failure, "Is it done?"), week-end pop-up, goal celebration, settings. |
| M-5 | **Left out of this pass:** onboarding (has its own board), PIN and lock, import wizard, notifications screens; settings rows other than account and linking are stubs. |
| M-6 | **Category colours follow size:** the five biggest categories take the five category colours in size order; the rest share peach. |

##### Design system B — Instrument (delegated, open to override)
Second visual direction from Tarun's hardware-instrument moodboard. Published beside Night (DS-1…DS-10); Tarun picks. Source: `archive/session-workfiles/designsystem2/`.
- DS2-1: One flat colour field per tab: Home carbon #0E0E10, Spending signal #FF6A1A, Income bone #E9E5DC, Savings moss #2F9D5A, Insights mustard #FFC20A. No gradients or meshes.
- DS2-2: Data sits on black LCD panels; amounts in Barlow Condensed, labels Space Mono, body Inter Tight.
- DS2-3: Own 5x7 bitmap dot-matrix font for short words and numbers only (CALM, DONE, amount on Pay). Never a money unit; money stays the 10x10 cell grid.
- DS2-4: Moodboard vermilion retuned to orange (hue 23) to honour the no-red rule. Warnings are amber LED on black only. Ink on colour is always #0E0E10 (white on signal fails contrast).
- DS2-5: Controls are keys (2px press) and dials with detent ticks; savings is a segmented dial by goal; goal reached uses a dot grille.
- DS2-6: Motion mechanical and quiet (cell 45ms stagger, dial tick 25ms); reduced motion jumps to end state.

- M2-1: Instrument mockup built from the Night mockup (same engine, profiles, events, flows). Only the skin changed: colour field per tab, LCD panels for grids/dials, dial-tick rings, dot-matrix status word on Home and amount on Pay, keys, moss goal-reached screen. Source `archive/session-workfiles/mockup2/`. Delegated, open to override.

- M2-2: Full-flow mockup. The Instrument mockup now opens on onboarding (title, PIN set and confirm, UPI link with soft failure or manual balance, permissions, category path with split slider, or the no-budget three questions, categories with search and create, equal or manual share with fixed bills and buffer, goals with dates, all set) and builds a live ledger from the answers. Added PIN lock screen, Settings sub-screens (notifications, PIN and lock, data: import placeholder, export, delete) and a re-fit-to-real-weeks sheet. Known gap: first week is not prorated. Delegated, open to override.

- M2-3: Tarun chose the first design system (Night) to build on. The full flows (onboarding, lock, settings sub-screens, import, re-fit, flicker and scroll fixes) were ported into the Night mockup (`archive/session-workfiles/mockup/`, published at https://claude.ai/artifact/F5iDLzVpmpKw8dSwUWkSU9). Instrument stays as an alternate (`designsystem2/`, `mockup2/`).

##### Bare-minimum mode (user feedback: no budget or balance required) — delegated, open to override
- B-1: **Only category tracking is required.** Balance and budget are optional and can be added at any moment. The product is a ledger of spends by category first; budgeting and balance layer on top.
- B-2: **Required inputs: none beyond a way to see spends** — UPI link, or manual add. PIN, permissions, bank, balance, budget, split, bills, goals, categories-with-amounts are all skippable ("Skip, I'll start tracking").
- B-3: **Categories seed from defaults** (six basics, editable). Unsorted payments sit in an "Unsorted" tray; the user sorts them with one tap. Custom categories can be created in the moment of sorting.
- B-4: **No budget → no gauges that "run out".** Each category shows what was spent this week/month as a 10×10 grid scaled to its own recent average (week 1: scaled to the biggest category). No "left", no overspend, no cascade, no buffer, no week-end pop-up pressure; the week-end card becomes a neutral recap ("You spent ₹X, mostly on Food").
- B-5: **No balance → no balance anywhere**, no low-balance warning, no "weeks left". Home shows the spend total and the top categories only.
- B-6: **Soft prompts, never gates.** After ~1 week of data Trickle offers "Set a limit for Food? You usually spend about ₹X" (per category, optional, one tap to accept the suggestion). Balance is offered once when the user taps "how long will my money last". Each category can have a limit on its own; the full budget (pots, buffer, savings) appears only when the user turns it on in Settings.
- B-7: **Three levels the user can sit at:** 1 Track (spends by category), 2 Limits (some categories have limits, gauges drain for those only), 3 Full plan (income, budget, savings, goals, cascade as in the blueprint). Moving up never loses history.
- B-8: Engine: `S.mode` = track | limits | plan; `S.bal` and `S.income` may be null; cascade runs only for categories with `amt`; a category with no `amt` records spend but never overspends.
- B-9: **The user can always say no.** Every question, prompt and setup step has a visible "Not now" / "Skip" that is as easy to tap as the main answer. Skipping never blocks, nags or locks a feature; the app uses a sensible default and asks again only when the answer would help (and never twice in a row). Applies to onboarding, in-app prompts, permissions, PIN, balance, budget, goals, bills.
- B-10: **Every question is short and plain.** One question per screen, asked the way a friend would: at most ~8 words, no jargon (no "budget method", "pots", "cascade"), a one-line hint at most. Answers are big taps, not forms. Example: not "How would you like Trickle to track your money?" but **"How should we see your spends?"** with **"Link UPI"** / **"I'll add them"** / **"Skip"**. Other rewrites: "Set your account balance" becomes "How much is in your account?" (skip: "Not now"); "Choose a budget method" becomes "Want weekly limits?" ("Yes" / "Not now"); "Allocate weekly amounts to categories" becomes "How much a week for Food?"; "Enable notifications" becomes "Remind you about bills?".
- B-11: Copy review: every existing onboarding and prompt string is rewritten to B-10 and checked for a Skip before the mockup, blueprint and Figma are updated.

- B-12: **Pop-up set built in the Night mockup** (`ui_e.js`, one bottom card each, one question, big yes, equally easy no): Link UPI? · Add a spend? · Payments need a place · Set a limit for [Category]? (suggests last week's average) · How much is in your account? (four quick amounts) · Want a full plan? · Saving for something? · Remind you about bills? · Lock with a PIN? · Bring in older spends? · Last-week recap (no budget, no "no" button, just OK). All in the Simulate panel under "Pop-ups (always skippable)". Answers are remembered so a "no" is not asked again straight away.

- B-13: **Built in the Night mockup (onboarding + track mode).** Onboarding is rewritten to B-10 and every step is skippable, including the PIN: Title (Get started / **Just start tracking**) → PIN? (Skip) → How should we see your spends? (Link UPI / I'll add them / Skip) → How much is in your account? (Not now) → Two quick things (reminders, fingerprint) → What do you spend on? (Skip, use the basics) → Want weekly limits? (Yes / Not now) → [with a balance: How much to save? → How much for each? → Saving for something? (Skip)] [without a balance: About how much a week? → Any monthly bills? → How much for each?] → All set. "Just start tracking" goes straight to the end with defaults.
- B-14: **Track mode in the app** (`ui_f.js`): Home shows one grid of this week's spends by category, scaled to last week (or the week so far, min ₹100), headline "Mostly Food.", and at most two soft nudges that vanish after a "no". Spending lists categories with this week's amount; a category screen shows this week, last week and an optional limit (set or remove any time). Pay becomes "How much? / For what?" with no cascade. Income and Savings show an invite ("No plan yet." / "Saving for something?") instead of numbers. Week-end becomes a one-line recap with only OK. Lock is off until a PIN is added (Settings, or the PIN pop-up).
- B-15: **Moving up keeps history.** "Want a full plan?" re-opens the budget steps (balance, save, share-out, goals), each skippable, and carries over all spends and the remembered places; spends in categories the user dropped become unsorted. A limit-only user without a balance never sees income or a balance.

- B-16 (Tarun): **Trickle never asks for the account balance.** The only money number it asks for, and only when the user chooses "Yes, set limits", is how much they spend in a week ("About how much do you spend in a week?", quick amounts or Other). Removed: the balance step, the "How much to save?" step, the balance pop-up and the "How long will my money last?" nudge. Goals and savings are added later, in the app, never in setup. This supersedes the balance parts of B-5, B-6, B-13 and B-15.

- B-17 (Tarun): **A plan and income are two different things.** A plan is what you spend in a week, split by category. Income is money you get, and it can be split any way into saving and spending. Neither is asked in onboarding: onboarding is only PIN (skippable), how to see spends, two small permissions, and categories. Balance is never asked (B-16).
- B-18 (Tarun): **Home holds "Make a plan" until a plan is set.** Tapping it runs the plan steps (weekly spend, monthly bills, how much for each category). Spends already tracked carry over.
- B-19 (Tarun): **Income tab holds income and the split.** Empty state: "No income added." → "Add income" → "How much came in?" → "How much to save?" (a slider from 0 to 100 percent in steps of 5, rest is spending). The saving part goes to savings. Income is independent of the plan and can be added with or without one.
- B-20 (Tarun): **After about a week of tracking Trickle asks once:** "Here is how you spend. Want to make a plan?" with the top three categories. If the answer is no, it asks again after four weeks.

- B-21 (Tarun): **Income can become the plan.** After the saving/spending slider (B-19), if no plan exists Income offers "Next": "How long should it last?" (a month, 2 months or 3 months), which turns the spending part into a weekly amount. "Make my plan" then continues to monthly bills and how much for each category, and that split becomes the plan. "Just add the income" skips the plan. Once a plan exists, adding income only splits saving and spending. The plan can still be made from Home without any income (B-18).

- B-22 (Tarun): **An income covers a date range.** "How long should it last?" is now "Until when?": quick picks (1 week to 2 years) or any day on a calendar from today up to two years out. The screen shows the weekly amount for that range (a range shorter than a week counts as one week).
- B-23 (Tarun): **Several incomes, one weekly plan.** Each income keeps its own saving/spending split and date range. The weekly plan is the sum of the spending parts of every income that is still running, divided over its own weeks. Adding an income to an existing plan raises the weekly amount and the category amounts scale with it. When an income's range ends, the plan drops by that income's share. Money left over is moved to savings. Open (delegated): whether the leftover moves on its own at week-end or after one tap, as it does now.

- B-24 (Tarun): **The plan snaps to whole weeks (Monday to Sunday).** An income's end date snaps to the Sunday of the week picked, the current week counts as week 1, and the weekly amount is the spending part divided by that whole number of weeks. Quick picks are 1 week, 1 month (4 weeks), 3 months (13), 6 months (26), 1 year (52) and 2 years (104). No part-weeks.
- B-25 (Tarun): **Subscriptions replace "fixed bills", and the user can type their own.** Popular ones stay as one-tap suggestions (Spotify, Netflix, Wi-Fi, Hostel fee, Gym, Prime, YouTube Premium). "Add your own" takes a name, an amount, how often (weekly, monthly, every 3 months, yearly) and the next payment date from a calendar. It is available in the plan steps, in Spending, and in track mode (without a plan a subscription is just listed and reminded).
- B-26 (Tarun, "use that system"): Subscriptions come off the top of the weekly plan before categories. Each one can be changed, paused or removed; a paused or removed subscription gives its weekly share back to the buffer. If subscriptions take more than the plan has, the category amounts shrink to fit.
- B-27 (Tarun, "use that system"): **Repeat payments are spotted.** If the same place charges about the same amount twice, about a month (or a week, 3 months, a year) apart, Trickle asks "Is Netflix a subscription?" once. "Not now" means it is never asked about that place again.
- B-28 (Tarun): **One-off money (a friend paying back, a gift) sits outside income and the plan.** It shows on Home as "₹200 from Rahul, where does it go?" and can be saved, put back into a category (when there is a plan) or just noted. It is also available from the Income tab as "Add one-off money".

- B-29 (delegated, open to override): **Weekly stays the engine, not the only language.** Evidence for weekly is thin (see `docs/claude/weekly_budget_validation.md`): the interviews show weekly *checking*, not weekly *planning*. Inputs are taken in the units people think in (monthly income, monthly or yearly subscriptions, a date range), converted to weeks, and the monthly equivalent is shown beside the weekly amount. A 5-student test is proposed in the memo.
- B-30 (delegated): Quick picks are calendar months, snapped to the Sunday of that week; the number of weeks is counted as whole Monday-Sunday weeks (an off-by-one that divided plans by one week too many is fixed).
- B-31 (delegated): **Plan health is said on Home, before it happens:** "Plan drops to ₹X a week after 8 Nov" (within 14 days), "No income covers this week", "Subscriptions take ₹X of your ₹Y a week". The plan steps warn when subscriptions leave almost nothing for categories.
- B-32 (delegated, supersedes the open part of B-23): **Left-over money moves to savings by itself at week end**, with a one-line recap ("₹1,150 moved to savings"). The three-step week-end pop-up is no longer shown to people with a plan; moving it back is done in Move money. Needs a student test (see memo).
- B-33 (delegated): **A subscription never raids other categories.** If its set-aside is short when it falls due, the order is its set-aside, then the buffer, then savings.

- B-34 (Tarun): **An income added mid-week is split day by day and this week only gets its own days.** The range runs from today to the chosen Sunday; the weekly amount is the spending part divided by the days times 7; the current week gets only the days that are left in it (for example 3 of 7 days, so 43% of a full week). Category amounts and the buffer are scaled for that first week and go back to full from the next Monday. This replaces the "first week is not pro-rated" gap and B-24's "the current week counts as week 1".
- B-35 (Tarun): **The look follows his Figma file (`TrickleMockup`).** Blurred blue, violet and teal colour at the bottom of every onboarding screen (top and bottom on the title), a title with three gradient cells (white, orange, green) over "Trickle" in mint, "STEP n OF 4" captions and four step dots (current dot mint, the rest orange), and his copy on the link cards. "Choose your bank" now lists "Enter UPI ID" and the detected UPI IDs.
- B-36 (Tarun): **Home shows pace.** Green gradient (cells and a green glow at the bottom) when the week is on pace; amber gradient when spending is ahead of an even burn, with the sentence "A bit ahead of pace." Pace compares the share of the week's money spent with the share of the week gone (from the first day the plan covers), with 10 points of slack.
- B-37 (Tarun): **End of week shows the ideal next to the actual.** A review screen gives, per category, a bar with the ideal marked and the spend filled green up to it and amber beyond it, plus a line chart of cumulative spending against an even week (the even line starts on the first covered day). It also says how much was left over and moved to savings.
- B-38 (Tarun): **The PIN keypad sits at the bottom of the screen**, within thumb reach, on setup, confirm and lock. Amount keypads elsewhere are unchanged for now.

- B-39 (Tarun): **When UPI is linked in onboarding, Trickle can read the balance, so it offers to split it.** Right after approval: "₹6,500 is in your account. How much of it do you want to save?" (slider), then "How long should it last?" (quick picks or calendar, ending on a Sunday). Both have "Not now". Saying yes makes that balance the first income and the setup continues into categories, subscriptions and the category split, so the user ends onboarding with a plan. Without UPI nothing about money is asked (B-16/B-17 still hold).
- B-40 (Tarun): **Money that arrives on a linked UPI waits in the Income tab until it is assigned.** A card "₹200 from Rahul. Came in on your UPI. Tell Trickle what it is." sits at the top of Income and a dot shows on the tab. Tapping it asks "What is this?": Income (split and optional plan), One-off money (outside the plan) or Not mine. Home no longer carries these.
- B-41: Fixed: a dark rectangle behind the Pay button (the old fade behind the sticky button) is removed.
- B-42: **A six-month demo account exists** ("Meera", first button in the side panel): 26 weeks of spends, three incomes with different date ranges (two ended or running out, one just started), four subscriptions including a yearly one, three goals, a running plan, a waiting ₹200 credit and two payments to sort.

- B-43 (Tarun): **Each tab has its own blurred colour, from the Figma gradient system.** Home is green or amber by pace (blue until there is a plan), Income blue, Spending rose, Savings teal, Insights violet (its heat cells are violet too). Pay, Add income, One-off money and Move money also get the blurred colour behind them. Cell gradients stay the white, orange and green family from the title.
- B-44 (delegated): **Logic fixes from an audit** (a scripted run of 60 random actions on every profile and on three fresh accounts, checking totals, negative amounts and NaN on every tab; nothing else broke):
  1. The Income tab now lists every income with its dates, status (running, ended), progress and weekly share. Tapping one shows it and allows **changing the end date** or **removing** it; the plan follows.
  2. "+ Add money" on Income no longer opens the old single-income flow that disagreed with the new model; it asks Income or One-off money.
  3. Editing category amounts (Budget screen, Fit to my real weeks, a limit) now also updates the full-week amount, so a new week no longer snaps back to the old numbers.
  4. If the plan was typed by hand and a first income is added, the screen says "This replaces your weekly amount" before it happens.
  5. A subscription that would take more than 60% of the weekly plan says so in the form.
  6. The first-week scaling resets cleanly at every week change; Back from "Two quick things" returns to the UPI split screens.

- B-45 (Tarun): **"This week vs last" says what is being compared.** It states the same days in both weeks ("Monday to Fri"), the sentence now names the amount ("₹180 more than last week at this point"), and each category line reads "last week, then this week, then the difference" with an arrow and words ("↑ ₹75 more", "↓ ₹25 less"). Amber for more, green for less (no red).
- B-46 (Tarun): **"When you spend" leads with its finding and always says which day, week or month it shows.** A large card gives the answer ("Today, you spend most around 12 pm", "Tue afternoon", "the 6th"). Under the Day, Week and Month buttons there is a title with the exact period and arrows to flip back through earlier days, weeks and months (stopping at the first month with data). The month view is a real calendar with weekday letters; future days are dim.
- B-47 (Tarun): **Categories can be searched and created anywhere one is chosen.** Sorting a payment, changing a payment's category, Add a spend and Pay all show a search box, the categories you have, ideas from the library, and "+ Create 'Gaming'". A new category starts at ₹0 and uses the buffer until it is given an amount (D-18); the limit is 30.
- B-48 (Tarun): **Home always shows what a box means and how much is left.** With a plan: big "Left this week" with "of ₹W" and "1 box ≈ ₹N" beside it. With no plan: "Spent this week" in big type and the box chip says what it counts.
- B-49 (Tarun): **"Make your plan" is the same as adding income.** On Home it is the main button until a plan exists. It opens the income flow (amount, how much to save, until when) and the weekly plan comes from that. The older separate plan questionnaire is no longer reached from Home or pop-ups.
- B-50 (Tarun): **Chosen categories in onboarding show a ×, unchosen show a +,** so selected and not selected are obvious.
- B-51 (Tarun): **Bill reminders and fingerprint ("Two quick things") come last in onboarding,** after the budget questions, so nothing interrupts setting up categories and a plan. Order: PIN, how to see spends, categories, plan questions, then those two, then All set.
- B-52 (Tarun): **Categories can be added or removed on the "How much for each?" screen too,** not only on the category step. A dashed "+ Add a category" opens the same search-or-create field; each row has a × to remove it.

##### Visualisation queue (one at a time)

1. Budget gauge — DONE
2. Pay / friction: amount crumbling away — DONE
3. Income split (spending vs savings) — DONE (V3-1…V3-11)
4. Savings goal (how much, by when, actually saved) — DONE (V4-1…V4-21); also: add goal, pay into a goal, completed goals (parked requirement above)
5. Unspent → saved — DONE (V5-1…V5-10)
6. Small / repeat purchases — DONE (V6-1, V6-2, V6-4, V6-5; V6-3 withdrawn)
7. Time patterns (e.g. nights) — DONE (V7-1, V7-2, X-1)
8. Subscriptions coming up (Fixed group) — DONE (V8-1…V8-4)
9. This week vs last — DONE (V9-1…V9-3)
10. Transaction history — DONE (V10-1…V10-3)
11. Exact amounts on tap (progressive disclosure rules) — DONE (V11-1…V11-3; the 5 'still to confirm' points stand as the board's defaults, unanswered)

##### Parked / superseded
- Coin test (V4 vs V1) and name-rows vs families category ideas (claude/v14_stage2b_coins_categories.md) — superseded.

##### v15 (5 Oct 2026): information-architecture reset, all delegated and open to override
Triggered by repeated reviews saying screens are hard to follow with too much information. Audit: `v15_audit.md`. Spec and measured result: `v15_spec.md`. Build: `archive/session-workfiles/mockup15/`.
- V15-1 (delegated): **Density budget.** At most 25 words, one hero, 3 ₹ values, 4 taps per screen, never taller than a phone (History aside). Checked by `archive/session-workfiles/audit/density.js`. Anything added must remove something.
- V15-2 (delegated): **Three tabs for three questions.** Home (am I okay), Spending (where did it go), Money (what comes in, what is saved). Replaces the 5 tabs; open to override.
- V15-3 (delegated): **Insights becomes Patterns** inside Spending: three findings, one per screen (when you spend, what repeats, this week vs last).
- V15-4 (delegated): **Spending is three one-screen views** (Categories, History, Patterns), not one long scroll. Rings dropped; each category row has a thin gauge.
- V15-5 (delegated): **Home holds one thing.** Sentence, the grid, one caption (`₹607 left · box ≈ ₹11`), Pay, and at most one ranked "next thing" row.
- V15-6 (delegated): **Onboarding is two questions** (how to see spends, what you spend on). PIN, plan, subscriptions, goals, balance split are asked when they matter.
- V15-7 (delegated): **Making a plan is adding income** and ends there; the plan is built silently (equal split, rest is buffer).
- V15-8 (delegated): **Pay is three screens** (how much, for what, confirm). Payee, budget/savings switch and "I already paid" leave the main path.
- V15-9 (delegated): **Subscriptions are three screens** (which, how much and how often, when).
- V15-10 (delegated): **Week review is two screens** (what happened; by category on request).
- V15-11 (delegated): **Engine notes removed from screens** (mid-week split, weekly scale, replace-weekly-amount). The engine behaves the same; the explaining text is gone.
- V15-12 (delegated): **Parked, not deleted:** one-off money, move money, the incoming-credit explainer, nested rings, hot-hour calendar, month navigation.
- V15-13 (Tarun asked, Claude designed): **Insights is its own tab again** (4 tabs). Three views: When, Repeats, Vs last week; finding first, controls last. Spending keeps Categories and History.
- V15-14 (delegated): **The grid is taught three ways:** a tappable `1 box ≈ ₹N ⓘ` chip with "₹N left" beside it, a one-time "How to read it" sheet with dashed ghost boxes, and "N boxes go" on the pay confirm.
- V15-15 (Tarun asked, Claude designed): **One-off payments** are a tile in Pay > For what?, then What was it?, then Paid from? (outside the plan or savings). They never count in the week, the review or Insights.
- V15-16 (delegated): **One-off money is reachable** from Money in, plus the balance split after UPI link, edit all limits, plan-drops row.
- V15-17 (delegated): **Visual hierarchy system:** one hero, quiet underline tabs, one primary action, text-style secondary actions, controls after the finding.
- V15-18 (delegated): **Logic fixes** listed in `v15_spec.md` (monthly vs weekly figures, ended incomes, one-offs excluded from the week, pay from free savings).
- V15-19 (Tarun asked, Claude designed): **First-time tips.** One short card the first time each thing happens (first spend, unsorted payment, credit, plan, income, one-off, subscription, goal, amber, over) or each area is first opened (grid, Spending, Money, Insights, a category). Once each, one at a time, never during a flow. Panel can reset or turn them off.
- V15-20 (Tarun): **Insights is rupees only.** No Times/₹ toggle, no "N times" anywhere. Hot grids, the hero and Repeats all show amounts.


##### v15.3 (6 Oct 2026): changes from the "Architecture & Strategy Document" (Tarun's upload)
New format, as that document asks: **ID | Target domain | Evidence source | Validation gate | Status.** Status is **PROPOSED** (made by Claude or a collaborator, open to override) until Tarun signs it off (**CONFIRMED**). Tarun's own decisions are CONFIRMED. Every earlier delegated entry (D-1…D-36, V15-1…V15-18) is treated as PROPOSED from now on. Evidence tags: [P] primary interviews, [S-U] cited by the document, not yet verified by us, [M] measured in the build.

| ID | Domain | Decision | Evidence | Validation gate | Status |
|---|---|---|---|---|---|
| V15-21 | Onboarding, Home | **Weekly amount first.** One extra skippable question ("How much can you spend each week?") and "Set your weekly amount" on Home. The weekly amount is one wallet; categories no longer carry limits in this mode, they classify spends after the fact. Income-based planning stays under Money. | [P] 4 of 6 interviewees have no budget; [S-U] Heath & Soll 1996, Thaler 1999 | Test C diary: share who set an amount on day 1 and still use it on day 7 | PROPOSED |
| V15-22 | Home (Tier 1) | **Home shows one number, one gauge, one button.** Removed: date line, the "On pace" sentence, the plan-health row. Kept: hero "₹N left this week", gauge, chip "1 mark = 1% ≈ ₹N", action row only when something needs doing, button. | Reviews "too much / what do I look at" [P-informal]; [M] density.js | Test A (5-second test) and density.js ≤25 words | PROPOSED |
| V15-23 | Gauge | **Fixed unit:** 100 marks always equal 100% of this week's amount, drawn in 5 blocks of 20; rupees only as a subtitle. | [S-U] Kay et al. 2016, Cleveland & McGill 1984 | Test A | PROPOSED |
| V15-24 | Gauge | **Spent marks stay as faint outlines** (ghosts) instead of going dark, so the whole week stays visible. | [S-U] Soman 2001 (rehearsal, depletion) | Test A | PROPOSED |
| V15-25 | Gauge | **One direction:** the Home gauge only empties. With no weekly amount it shows an empty outlined gauge and the sentence "Nothing logged yet", not a grid that fills with spend. Savings still fill (it is something being built). | [M] direction flip found in Part 11.3 | Test A | PROPOSED |
| V15-26 | Gauge | **Small spends roll up quietly:** spending is rounded down to whole marks, so spends under 1% wait in a buffer (shown on tap) until they add up to one mark. | [S-U] document 2.1 | P.6 probe: does it feel like cheating or like calm? | PROPOSED |
| V15-27 | Copy | **Plain words:** "marks" not boxes, "Log expense" not Pay/Add a spend, "weekly amount" not plan, "Last week" not Vs last week, "How many days should this money last?" not Until when?, "Not part of your week" not outside your plan, "spending fast" not pace. | [M] 32 of 40 questions depend on unstated context (Part 12.2) | Copy lint, then the "what does this mean?" probe | PROPOSED |
| V15-28 | Pay | **Model B switch:** panel option "Scan & pay (Model B)" changes the Home button and adds a simulated QR-scan step before "How much?". Nothing is scanned. Default stays "Log expense". | [S-U] Soman 2001, Prelec & Loewenstein 1998; H2 is unverified | Feasibility spike (can Trickle start a UPI payment?) and Test B (taps and seconds vs GPay) | PROPOSED |
| V15-29 | Process | **Two-stage decisions:** Claude's entries stay PROPOSED until Tarun confirms; every new entry carries the five columns above. | The document, root cause 5 and 6 | Review of this log before each build | PROPOSED |
| V15-30 | Process | **Freeze.** After v15.3 no new screens or features until Tests A, B and C are done (document, Part 4). The one-in-one-out rule applies to Tier 1. | Same; RESEARCH.md Part 10 | Tarun | PROPOSED |


---

## Appendix O. Project master synthesis
The digest of the first 70 docs (10 Sep to 2 Oct), with evidence tags. Verbatim.
### Project master synthesis
*Verbatim from `docs/claude/project_master_synthesis.md`: Trickle — Project Master Synthesis. Headings demoted; nothing else changed.*


Compiled 2 Oct 2026 from all 70 docs in the Student_Budget_Management project, read oldest to newest (`claude/updated_feature_priority_list.md`, 10 Sep, through `claude/v13_decisions.md`, 2 Oct). Each point names its source doc. Tags: **[P]** primary research, **[S-V]** verified secondary source, **[S-U]** unverified secondary source, **[T]** Tarun's explicit statement or decision, **[C]** Claude's inference or proposal.

---

##### 1. Primary research

###### 1.1 What exists in the project, and what doesn't
- The raw interview transcripts, the survey data and the Bryman-style coding/analysis **are not in the project**. All primary findings below are second-hand: summaries written into `claude/updated_feature_priority_list.md` (10 Sep) and restated in `claude/build_plan.md`. Nothing can be re-checked against source.
- Six interviews: Tarun (himself), Nishad, Yash, Gautham, Harsh, Vaishak, plus a survey (sample size and questions not recorded). (`updated_feature_priority_list.md`)
- Vaishak's transcript was only partly coded (about 11 statements). His remarks on monthly category allocation, pre-payment friction and privacy were added later by hand. (`updated_feature_priority_list.md`, "Open Item")
- No usability test, tile test or 5-second test with real people has ever been run. Every later "validation" doc is scripted or simulated (`v11_phase3_test.md`, `v11_phase11_validation.md` "S1, S2, S13 need people", `v12_phase11_handoff.md`).

###### 1.2 Findings, with who and how strong
| # | Finding | Who (as reported) | Evidence strength | Source |
|---|---|---|---|---|
| P1 | Manual tracking is tedious and gets abandoned | "Nearly every participant" | Strongest: corroborated across nearly all 6 | `updated_feature_priority_list.md` §1 |
| P2 | Awareness comes late: the "surprise" ("what happened, how did I spend this much") arrives when checking balance after the fact | Every participant | Strongest | same, §2 |
| P3 | People want to know *where* money went (categories), not just how much | Harsh, Gautham, survey respondents | Strong | same, §3 |
| P4 | Small purchases accumulate unnoticed. Tarun: coffee. Nishad: cigarettes and confectionery. Yash: quick-commerce add-ons. Harsh: food. Vaishak: food | 5 of 6, independently | **Strongest and most distinctive finding** of the study | same, §4 |
| P5 | Vaishak wants "an app to remind me before I'm paying", to "see your balance before payment", and "some friction before paying" | Vaishak only | Single source, but direct quote | same, §5 |
| P6 | Guilt-based or restrictive framing is rejected; alerts must inform, not scold | Vaishak, Yash (explicit) | Moderate (2) | same, §6 |
| P7 | Survey responses on alert tone were mixed: motivation vs guilt vs neutral | Survey | Moderate, unquantified | `build_plan.md` Phase 2 |
| P8 | Purpose-based funds: three separate accounts by purpose | Nishad (strong); Vaishak "buffer" (loose) | Weak (1–2) | `updated_feature_priority_list.md` §7 |
| P9 | Savings goals motivate more than restriction ("human nudge"): Yash's motorcycle goal | Essentially Yash alone, one vivid story | Weak; "don't overstate" | same, §8 |
| P10 | Forgotten subscription: ₹3,000/month Coursera autopay unnoticed for three months | Nishad only | Single-sourced, vivid | same, §9 |
| P11 | Want simple pattern observations ("food spending up this week") rather than raw history | General | Moderate | same, §10 |
| P12 | Privacy: "some local only app might be fine… you don't wanna trust cloud-based apps for some of your private things" | Vaishak only | Single source, direct quote | `build_plan.md` Phase 3; `updated_feature_priority_list.md` Open Item |
| P13 | Budgets are often "not a fixed budget, a mental thing" | "Several participants" | Moderate, paraphrase only | `build_plan.md` data model note |
| P14 | Monthly category allocation mentioned | Vaishak (uncoded remark) | Weak | `updated_feature_priority_list.md` Open Item |
| P15 | Participants compared the idea to Jupiter and PayTM | Unspecified | Context | `build_plan.md` |

###### 1.3 The research conclusion as originally stated
"Spending is easy → tracking is difficult → awareness comes late." The app's job "is not to tell students to spend less. It's to close the gap between the moment of payment and the moment of realization." Loop: **Automatic tracking → Spending visibility → Accumulation → Purpose → Decision.** (`updated_feature_priority_list.md`, Core Design Direction)

###### 1.4 Things later docs present as user facts but which have no primary source
- User profile "18–24, ₹3k–15k/month, money-anxious, allowance sometimes late" (`v11_phase0_brief.md`). Not traceable to interviews.
- "Reviews": "too much information, I don't know what I'm looking at", "every screen is numbers", "panic on open → quit" (`v8_phase_plan.md`, `v8_phase1_audit.md`). The docs never say who the reviewers were or how many. Treat as Tarun's or reviewers' feedback on the v7 prototype, not as research.
- "Shapes are not working" on v10 is Tarun's own judgement (`v11_phase_plan.md`, `v11_phase1_audit.md`).

---

##### 2. Secondary research

###### 2.1 Peer-reviewed or verifiable (status as given in the docs)
| Source | Finding | Status | Implication | Doc |
|---|---|---|---|---|
| Prelec & Loewenstein 1998, *Marketing Science* | Pain of paying; decoupled payment dulls it | Verified in `secondary_research_report.md` §7; marked UNVERIFIED in `v12_phase2c` (read via summary only) | Foundation of "awareness comes late" and pay-moment friction | both |
| Soman 2003, *Marketing Letters* | Less transparent payment → more spending | Verified (author PDF) | UPI analogue | `secondary_research_report.md` |
| Soman 2001, *JCR* | Past payments curb spending only if rehearsed and depletion is immediate | Verified | Show deduction at the pay moment | `v12_phase2c` |
| Raghubir & Srivastava 2008 | Non-cash forms increase spending | Verified (APA PDF) | Same | `secondary_research_report.md` |
| Cashless-effect meta-analysis 2024 | Robust but modest effect | Paywalled; summary open | Use for overall effect size | same |
| CHI EA '24, UPI's impact on spending in India | Most on-topic paper found | Paywalled; abstract-level | India/UPI grounding | same |
| Dev et al. 2024, arXiv | 74.2% of UPI users self-report spending more | Preprint, self-report: **weak–moderate** | Context only | `v8_phase2_research.md`, `v11_phase1_audit.md` |
| Computers in Human Behavior 2022 | Mobile payment ↔ overspending, weaker with financial literacy | Paywalled | Awareness nudges may offset | `secondary_research_report.md` |
| BCS HCI 2023, "Limited support for budgeting compared to tracking" | Apps track well, support budgeting poorly | Verified, "strongest single citation for the core thesis" | Differentiate on decisions, not tracking | same; held up in `v11_phase1_audit.md` |
| Lee (SSRN) fintech nudges | Overspending message framing affects spending | Working paper | Alert copy | same |
| Bitrián et al. 2021 | Gamification via self-determination theory | Verified | Goals/progress | same |
| Gamification × app expertise | Effect moderated by expertise | Listed | Don't over-gamify | same |
| Wijesekera 2015 (USENIX), Bonné 2017 (SOUPS), Prange 2024 (SOUPS) | Permission trust depends on context | Verified | Was for READ_SMS; now only relevant to UPI-link / camera / notification asks | same |
| Karlsson et al. 2009; Sicherman et al. 2016 (RFS) | Ostrich effect: people look less after bad news | Verified in v8; Karlsson marked UNVERIFIED in v12 2c | No bad-news figure on open | `v8_phase2_research.md`, `v12_phase2c` |
| Olafsson & Pagel 2018 (NBER/VoxEU) | Logins drop when balances are negative | Verified | Same | `v12_phase2c` |
| Thaler 1985/1999 | Mental accounting | Metadata verified, abstract not read (v12) | Jars/categories | `v8_phase2_research.md`, `v12_phase2c` |
| Heath & Soll 1996; Antonides et al. 2011 | Mental budgets constrain category spending; budgeters have better oversight | Verified | Jars | `v12_phase2c` |
| Madrian & Shea 2001; Thaler & Benartzi 2004 | Defaults and pre-commitment raise saving | Cited, accepted | Auto-split, suggested budget | `v8_phase2_research.md` |
| Ashraf, Karlan & Yin 2006 | Commitment devices raise saving | Cited | Optional pause/lock | same |
| Kivetz et al. 2006; Nunes & Drèze 2006 | Goal gradient, endowed progress | Verified | Goals start above zero | `v8`, `v12_phase2c` |
| Dai, Milkman & Riis 2014 | Fresh-start effect | Cited | Weekly/monthly resets | `v8` |
| Kahneman et al. 1993 | Peak-end | Cited, "plausible transfer" | End flows on savings | `v8`, `v11_phase1_audit.md` |
| Sweller 1988; Miller 1956; NN/g | Cognitive load, progressive disclosure | Accepted | One idea per screen | `v8` |
| Shapiro & Burchell 2012; Archuleta 2013 | Financial anxiety → avoidance; common in students | Cited | Low-anxiety design | `v8` |
| Elliot 2007; Mehta & Zhu 2009 | Red → avoidance | "Moderate, replication mixed" | No-red rule is low-cost, not proven | `v11_phase1_audit.md` |
| Polivy & Herman (what-the-hell) | Broken streaks → abandonment | "Weak but safe", indirect | No streaks | same |
| Weiser & Brown 1995/96 | Calm technology | Essay, design principle not evidence | Ambient glow | same |
| Fogg 2009 | B = MAP | Conference paper | Make actions tiny | `v8` |
| Haroz et al. 2015 (CHI) | Pictographs that are the data cost nothing, help memory | Verified | The unit mark itself is valid | `v12_phase2c` |
| Park et al. 2018 (ATOM) | Unit visualisations suit novices | Verified | Same | `v11_phase2`, `v12_phase2c` |
| Neurath/Kinross 1995 | Repeat the unit, don't enlarge it | Verified | Rules out scaled shapes | `v12_phase2c` |
| Cleveland & McGill 1984 | Position/length beat area/colour | Verified | Common baseline for comparisons | same |
| Kosara 2019; Redmond 2019; Hill 2025 | Area is weak; decile markers help; grids beat angles | Verified | Bottom/edge-anchored fills, grouping in fives | `v12_phase2c`, `v11_phase2` |
| Garcia-Retamero 2010, 2013 | Icon arrays fix denominator neglect, help low numeracy most | Verified | Show the whole; spent as outline | `v12_phase2c` |
| Galesic 2009 | Icon arrays for low numeracy | UNVERIFIED | Cite only with 2010 | same |
| Gigerenzer & Hoffrage 1995 | Natural frequencies beat percentages | Verified | "3 of 10 days" | same |
| Kay et al. 2016 (CHI) | ~20 countable dots work for lay users; 100+ don't | Verified | ≤~25 marks per glance | same |
| Barrio 2016; Riederer 2018 (CHI) | Perspective sentences and familiar equivalents improve comprehension | Verified | "≈ 14 of your chais" | same |
| Peters et al. 2006 | Low numeracy → more swayed by framing | Verified | Neutral frames | same |
| Knutson et al. 2007 | Price salience felt at decision time | Verified | Show cost before confirm | same |
| Tversky & Kahneman 1981 | Framing | Verified | "Left", not "lost" | same |
| Hershfield 2011; Whillans 2017; Li 2010; Lan 2023; Kennedy & Hill 2018; Boy 2017 | Future self; time-buying; personal-informatics stages; affective vis; feeling numbers; anthropomorphic icons add nothing | Verified | ETA path, money-as-time in library, end views in an action, no mascots | same |
| DeVoe & Pfeffer 2007; Pousman 2007 | Hourly pay → time valued as money; casual infovis | UNVERIFIED | Background only | same |
| Kaufman 1949 (subitizing ≤4) | Instant count up to ~4 | Cited via Wikipedia | Group in fives/tens | `v11_phase2_tile_system.md` |
| Pielot 2014 (MobileHCI); Wohllebe 2021 | More notifications ↔ stress; +2.5 pp uninstalls per extra weekly push | Verified 1 Oct | ≤1/day, ≤3/week | `v12_phase7_retention.md` |

###### 2.2 Unverified or marketing-grade claims
- "~67% quit budgeting apps within 30 days" and "68% never finish signup": blog statistics, **not verified**, explicitly not to be cited as fact (`secondary_research_report.md` §6, §7.3; `v11_phase1_audit.md`).
- "Latte factor": popular-finance term, **no academic construct**. Small-purchase accumulation is confirmed white space in shipped products and literature (`secondary_research_report.md` §3, §7.4).
- Budgeting-app "selling stress data" story: a single news-aggregator link, low quality (`secondary_research_report.md`).

###### 2.3 Competitive and product findings
- India already has auto-tracking (Jupiter, Money View, INDmoney, Walnut, CRED via Account Aggregator). Automatic tracking alone is not a differentiator. Differentiation must come from small-purchase accumulation, non-guilt tone and local-first privacy (`secondary_research_report.md` §1; `v6_phase2_catalogue.md`).
- **UPI payments happen inside GPay/PhonePe, so a true pre-payment interstitial may not be technically possible**; likely needs a widget or notification (`secondary_research_report.md` §5; `screens_to_design.md` §6). Later versions assumed Trickle itself starts the payment and hands off to the UPI app; this was never re-examined.
- Mint shutdown (users valued auto-categorisation; complained of miscategorisation): design for easy correction. PocketGuard "safe to spend" is the best non-punitive alert reference. Rocket Money: auto-detect subscriptions, then confirm. Goodbudget redesign: what not to do (`secondary_research_report.md`).
- YNAB/Goodbudget: income lands in "ready to assign" and is split; Monarch: one flex number; Jupiter Pots: under 30 s setup, users asked for a self-lock; Fi FIT rules: rule-based auto-saving (Fi consumer app shut 11 Mar 2026) (`v7_phase2_catalogue.md`, `v12_phase2c`).
- Monzo users missed "left to spend" when it was removed: leftover-first is a feature people notice when gone (`v12_phase2c`).
- Cleo keeps "roast mode" opt-in; shame copy is not a default (`v12_phase2c`).
- Data Viz Catalogue: radial bars mislead (outer rings look longer) (`v6_phase2_catalogue.md`).

###### 2.4 What the secondary research implies, net
1. Pain of paying and the tracking-vs-budgeting gap are solid. 2. Ostrich effect, mental accounting, defaults and goal gradient are solid and drove most good later decisions. 3. Unit charts and icon arrays are well supported, **but only with a fixed, known unit and ≲20–25 marks**. 4. No-red, no-streak and calm-tech rules are cheap, sensible and weakly evidenced; keep them but don't call them proven. 5. The pre-payment moment is technically constrained on UPI.

---

##### 3. Original intent

###### 3.1 Core thesis
Close the gap between the moment of payment and the moment of realisation, without guilt or blocking friction. Not "spend less" (`updated_feature_priority_list.md`; `build_plan.md` closing line). Every feature should be "traceable back to something a specific participant said" (`build_plan.md`).

###### 3.2 Original feature priority list (10 Sep)
- **Very High (core):** 1 Automatic transaction tracking · 2 Daily and weekly spending overview · 3 Category-wise spending · 4 Small-purchase accumulation (the differentiator).
- **High:** 5 Pre-spending awareness (Vaishak's payment-moment check) · 6 Gentle, non-blocking alerts · 7 Purpose-based funds (evidence caveat) · 8 Savings goals (evidence caveat).
- **Medium:** 9 Subscription/recurring detection · 10 Spending behaviour insights.
- Open item: privacy/local-only not yet in the list. (`updated_feature_priority_list.md`)

###### 3.3 Original screens and onboarding (20–22 Sep)
- Onboarding: 1–2 welcome screens, category setup, permission rationale shown just before the system dialog, denied-permission fallback into manual entry. (Written for SMS; SMS was then dropped.) (`screens_to_design.md`)
- Home: today's spend, week's spend, amount "remaining", empty state, and a remaining-vs-spent toggle to test. Categories with drill-down and edit. Accumulation view and detail ("Coffee — ₹40 today, ₹240 this week across 6 purchases"). Pre-pay interstitial plus a widget/notification fallback. Alerts with tone settings. Funds, goals (incl. celebration), subscriptions with confirm step, insights feed. Settings stating local-only data. (`screens_to_design.md`, `mockup_screen_plan.md`)
- Gap analysis on the first lo-fi Figma build ("Trickle Onboarding" artifact): accumulation view missing entirely; no transaction list; remaining-vs-spent toggle missing. Suggested order: accumulation → transactions → permission rationale → pre-spend → rest (`feature_gap_analysis.md`).

###### 3.4 Original prototype-phase plan and validation questions (`build_plan.md`)
- **Phase 1, low-fi, 4 screens only** (onboarding, Home overview, category breakdown, accumulation view), tested with 4–6 people including original interviewees, using scenario tasks ("you just bought coffee 5 times this week").
- Questions to validate:
  1. Does surfacing accumulated small purchases shift perception, or feel like nagging?
  2. **Is "remaining" framing clearer than "spent" framing, or vice versa?**
  3. Do people understand category grouping without explanation?
- Output: a Bryman-style findings note and a prioritised change list.
- **Phase 2, hi-fi, all 10 features**, tested on a simulated week, especially alert tone. **Gate:** don't build until testers succeed and the core loop is clear.
- **Phase 3, build:** React Native/Expo, SQLite local-first, Android-first, sprint order core loop → accumulation → funds/goals → pre-spend → secondary → polish.
- **None of the Phase 1 or Phase 2 testing ever happened.** The remaining-vs-spent question was later settled by literature (leftover-first, `v12_phase2c` P2c-Q1/Q2), not by users.

---

##### 4. Tarun's stated decisions and values, chronological

| When | Decision / value [T] | Later status | Source |
|---|---|---|---|
| Pre-10 Sep | Prefers full complexity over a stripped MVP | Stands; arguably fed scope growth | `screens_to_design.md` |
| ~21–22 Sep (v2) | **No SMS anywhere.** Tracking = UPI linkage or manual entry only | Stands, enforced in every later build | `mockup_v2_build_notes.md`, `design_brief_v3.md` |
| v2 | Rebuild from his Figma "Lofi Budget App": 5 tabs Savings / Categories / Home / Insight / Settings; friction screen as a bottom sheet in the pay flow; budget editing inside Categories | Tabs reversed v7, v8, v11, v12 | `mockup_v2_build_notes.md` |
| 23 Sep (v3) | Dark direction from a crypto-dashboard reference | Dark-first survives to v13 | `design_brief_v3.md` |
| 23 Sep (v4) | "Push the visual aspect and data visualisation… push everything to be visual" | **Reversed in v8** (too much information) | `mockup_v4_build_notes.md` |
| 23 Sep (v6) | Assigned refs: concentric radial arcs → category %; pie + fill jars → month-wise; every screen incl. onboarding visual | Radial arcs dropped v7; pie/jars dropped by v11 | `v6_phase_plan.md` |
| 23 Sep (v7) | Add income, pools, balance; Excel/CSV import (placeholder only) | Pools and "To assign" dropped v8 | `v7_proposal.md`, `v7_phase_plan.md` |
| 24 Sep (v7) | Tabs Home / Money / Actions / Savings / Insights + drawer; Actions = to-do inbox + Add; overspend cover order (To assign → other category → goal → let it go over, deducted next period); no goal PIN lock; splits with "Owed to you" outside balance; subscriptions on Home only; income categories list; period chosen at onboarding; visual mix: near-black + lime | Inbox, badges, 4-option cover, lime all **reversed in v8**; Owed outside balance stands | `v7_phase_plan.md`, `v7_phase3_spec.md` §7 |
| 24 Sep (v7) | Split repaid after period closes → To assign; Home shows 4 pinned widgets; unresolved sweep stays indefinitely; Remind = share sheet with UPI link; "pin" means pin to Home, no PIN code | Share-sheet remind stands | `v7_phase3_spec.md` §7 |
| 30 Sep (v8) | **Six values:** (1) budgeting is tedious, make it easy; (2) savings motivates, not guilt; (3) friction at payment so it feels like handing over cash; (4) small-purchase accumulation + understanding habits; (5) income → budget/savings split understandable at a glance; (6) visual, not numeric; retention is the top goal | The most stable statement of intent in the project | `v8_phase_plan.md` |
| 30 Sep (v8) | **One choice at a time; minimal numbers; calm; no games, streaks, badges** | Stands | same |
| 30 Sep (v8) | **Home: no budget number**; ambient glow green/amber, never red | Stands (glow colour changed v11 → neutral, v13 → green/amber gradient) | same |
| 30 Sep (v8) | Money tab (Income/Budget/Savings accordion) replaces Savings; tabs Home / Money / Actions / Insights | Replaced v11, v12 | same |
| 30 Sep (v8) | Income split: budget basically fixed, everything above auto-flows to savings, one confirm | Softened v11/v12 to "split like last time?" | same |
| 30 Sep (v8) | **Payment friction: no timed pause.** Pick category, watch this payment leave the category visually; if over, one simple next choice | Stands | same |
| 30 Sep (v8) | Picked **Direction B (Tiles)** over Jars and Orbs (recommendation was Jars) | Tiles → shapes → tiles → dots | `v8_phase4_spec.md` |
| 30 Sep (v9) | "Small purchases" redefined as **repeat purchases**: same place/kind 3+ times in 30 days, any amount; ₹150 threshold dropped; repeat buys pinned to Home; B&W optional, colour default; sounds on by default; every tiled card shows "1 tile = ₹X" | Repeat-buy definition stands | `v9_phase2_spec.md` Resolved |
| 30 Sep (v10) | Six-shape denomination ladder, logo B, splash | **Rejected by Tarun 1 Oct: "shapes are not working"** | `v10_shape_system.md`, `v11_phase_plan.md` |
| 1 Oct (v11) | Need a very easily learnable tile system; budget setting must be easy | Led to fixed ₹100 tile | `v11_phase_plan.md` |
| 1 Oct (v11) | **Money model confirmed:** Income → Savings + Budget; Budget = Subscriptions (fixed, auto-deducted on due dates) + Categories (each with its own budget) | Stands | same |
| 1 Oct (v11) | **Fewer decisions; one decision at a time; very low cognitive load** | Stands | same |
| 1 Oct (v12) | v11 "lost a lot of functionality and insights"; bring them back without losing clarity | Drove v12 scope back up to 75 frames | `v12_phase_plan.md` |
| 1 Oct (v12) | Tabs **Home · Income · Spending · Savings · Insights**; bell = activity log + needs-you, no count; every tab has a one-page intro; full editing in each tab's settings | Stands | `v12_decisions.md` D1, Q1, Q6, D2, Q4 |
| 1 Oct (v12) | Tile ₹100; large amounts as pills (₹1,000) and blocks (₹10,000); cup-fill below ₹100; tap zooms one level; one rule everywhere; glow only for time/position | Stands | `v12_decisions.md` P2/P2b |
| 1 Oct (v12) | Keep **no numbers on Home**; per-day figure only in Spending and at pay; spent = outline; equivalents in user's own buys; "more than last week" = ghost + hatch, no red | Stands | P2c-Q1…Q5 |
| 1 Oct (v12) | **His own sketch:** red = spent, green = left; circles (dots) are the ₹100 unit; blocks keep a gap; explore all six concepts | Red dropped (no-red), dots kept | P2d |
| 1 Oct (v12) | Pie-wedge cup fill; **left = category colour; green only for savings**; Merging Dots base + Day lanes in Spending; hourglass drop at pay, bangle close at goal; overspend re-spreads remaining days | Stands | P2e |
| 1 Oct (v12) | Jars 4+ reuse hues with patterns; income in neutral ink | Stands | P3 |
| 1 Oct (v12) | Widget-grid Home; round Pay button beside tab bar (camera open); hybrid depth; gear per tab + avatar | Stands | P4 |
| 1 Oct (v12) | Starter-month onboarding from student type; income one confirm + undo; guessed jar chip at pay; empty jar asked once before UPI; month-end one choice, Savings default | Stands | P5 |
| 1 Oct (v12) | Monochrome glow direction; follow phone; **wordmark L3 "Trickle"** (not the recommended L1) | v13 added a mark anyway | P6 |
| 1 Oct (v12) | Calm notifications (≤1/day, ≤3/week); one-card check-in; 5-card story ending "You kept ₹X"; welcome back; Android widgets | Stands | P7 |
| 1 Oct (v12) | Calm + tactile motion; hybrid sound (coin at pay, chimes for good news); haptics light | Stands | P12 |
| 1–2 Oct (v13) | "**Make your own decisions**" | Every v13 decision was Claude's | `v13_decisions.md` |
| 1–2 Oct (v13) | Figma inputs: three hero mesh gradients; dot sketches with gradient fills, ₹50 half-dot, Income grey → Spending + Saving green; liked v10's green→amber pace transition | Interpreted by Claude | `v13_decisions.md` IN-1, IN-2, D13-1 |

---

##### 5. Version history v2 → v13

**Lo-fi (pre-v2).** Figma lo-fi and a "Trickle Onboarding" artifact with SMS rationale screens, a Budget tab, donut categories, one savings meter. Gap analysis found the accumulation view, transaction list and remaining/spent toggle missing (`feature_gap_analysis.md`). Kept: tab idea, onboarding mechanics. Dropped: SMS.

**v2 (22 Sep).** Rebuilt from Tarun's "Lofi Budget App" Figma. No SMS. 31 frames: onboarding, Home with weekly/daily/balance, Scan QR / Pay Anyone / Bank Transfer, friction bottom sheet, accumulation list, transactions, categories donut, savings goals, subscriptions, 8 text insight cards, one shared 35-day seed. This is the closest build to the original feature list. Kept: shared data store, friction sheet in pay flow. Critiqued as "reads like a form" (`mockup_v2_build_notes.md`, `design_brief_v3.md`).

**v3 (23 Sep).** Dark stat-card system from a crypto-dashboard reference; 5 reusable components (stat triad, segmented bar, dot-matrix for accumulation, heatmap, pill+sparkline); 8 insights incl. pace forecast; subscriptions card on Home. Kept: small repeated vocabulary idea. Tarun: "push everything to be visual" (`mockup_v3_build_notes.md`).

**v4 (23 Sep).** More charts: MoM, area + projection, goal projection, "Where money goes" ring, 68-day seed. Tarun asked for even more visual (`mockup_v4_build_notes.md`).

**v5 (23 Sep).** "Visualization library": 17 chart forms, 16 insight cards (radar, bubble, scatter, histogram, Sankey-lite…). Later judged "chart library, not product"; radar and bubble buggy (`v5_visualization_plan.md`, `v6_phase1_audit.md`).

**v6 (23 Sep).** Every frame visual (~45 charts), Tarun's radial-arc and pie+jar refs, visual onboarding with allowance allocation pie and 7 sliders, tooltips everywhere, validated palette, 6-month seed. Kept: palette discipline, seed generator. Later: red status, misleading radial arcs, 54 numbers in onboarding (`mockup_v6_build_notes.md`).

**v7 (23–24 Sep).** New money model (To assign → Budget + Savings pools), income, transfers, sweeps, overspend cover sheet, splits/IOUs, Actions inbox with badge, 44 widgets, 57 frames, ledger invariant. Tarun made many detailed decisions. Result: Home 75 numbers, >900 app-wide, red "Carried −₹240", "5 things need you". Feedback: "too much information… panic on open". Kept: ledger invariant, Owed outside balance, splits, subscriptions model (`mockup_v7_build_notes.md`, `v8_phase1_audit.md`).

**v8 (30 Sep).** The calm reframe. 4 tabs, no budget on Home, glow + word, one choice per step, two jars, auto income split + undo, pay tiles pop out, weekly check-in and month story, no red, no streaks. Tarun set the six values and picked Tiles. Problem: tiles meant ₹100, ₹500, 1% and "1 spend" in different places, mostly unlabelled; range and flow views lost (`v8_*`, `v9_phase1_audit.md`).

**v9 (30 Sep).** Adaptive tile ladder ₹10–₹2,500 with a key on every card, 20 widgets, Sankey back, repeat-buys suite (Tarun redefined small purchases as repeats), sound, B&W. Problem: the unit changes per card, so the key must be read every time (`mockup_v9_build_notes.md`, `v11_phase1_audit.md`).

**v10 (30 Sep).** Six-shape denomination ladder (dot ₹10 … star ₹5,000), mixed piles, "breaking change" animation, logo B, splash. **Rejected by Tarun: "shapes are not working."** Kept: splash timing (`mockup_v10_build_notes.md`).

**v11 (30 Sep–1 Oct).** Full 12-phase process. Fixed ₹100 tile, rows of 10 split 5|5 (scored, then "won" a **simulated** comprehension test). Confirmed money model. 4-tap setup from student type. 25 frames, Home 0 numbers, 44/44 scripted checks. Tarun: clear, but "lost a lot of functionality and insights" (`v11_*`, `v12_phase_plan.md`).

**v12 (1 Oct).** Recovery audit of 152 items (33 brought back); 5 tabs; tile → Tarun's dot ladder (crumb wedge / dot / pill / block), Day lanes, leftover-first literature, 31 insights, 75 frames, 20 flows, 6-month seed, motion and sound lab. ~60 decisions in one day, nearly all accepting Claude's recommendation. 37/37 scripted checks; no human tests (`v12_*`).

**v13 (1–2 Oct).** Identity pass. Tarun said "make your own decisions". Claude adopted his mesh gradients (Grove, Tide, Ember), a "Zentra" onboarding template, green→amber pace glow, a dot-ladder logo mark (although v12 chose the wordmark), retuned palette. 41/41 scripted checks (`v13_decisions.md`, `mockup_v13_build_notes.md`).

---

##### 6. What worked, what failed, and why it drifted

###### 6.1 What worked repeatedly
- **No SMS, UPI link or manual** — held from v2 to v13 without regression.
- **No budget number on Home + glow/word pace** (v8 on). Directly answers the ostrich effect and the "panic on open" feedback.
- **One decision per screen with a default preselected** (v8 on).
- **Payment visibly leaving a category** (v2 friction sheet → v8 tiles → v12 hourglass). This is the one through-line from Vaishak's quote to the latest build.
- **Shared seeded ledger with invariants** (v2 store, v7 invariant). Made every prototype internally consistent.
- **Repeat buys / accumulation**, once built (v9 on), with neutral "3rd chai this week" copy.
- **Subscriptions as a fixed, held chunk** (Nishad's Coursera story).
- **Owed to you outside the balance** (v7 on).

###### 6.2 What failed repeatedly
- **Visual breadth as a goal.** v4–v7 added chart forms and widgets each round (17 forms, ~45 charts, 44 widgets). Each was reversed.
- **Unit instability.** Tiles meant four things (v8), then an adaptive ladder (v9), then six shapes (v10), then fixed squares (v11), then dots with pills/blocks (v12). Every change was re-learning.
- **Accounting models in the UI** (v7 pools, To assign, sweeps, covers, inbox). Correct, unfamiliar.
- **Simplify, then re-expand.** v8 and v11 cut hard; v9 and v12 restored breadth (20 widgets; 75 frames, 31 insights).
- **Validation by script only.** Every "PASS" since v2 checks rules Claude wrote (numbers per screen, red pixels, taps), not whether students understand or keep using it.

###### 6.3 Root causes of drift
1. **The testing gates in `build_plan.md` were skipped.** No Phase 1 user test, no Phase 2 test, no tile test with people. Without user evidence, each version answered the previous version's critique instead of the research.
2. **Reference-driven iteration.** Crypto dashboards, infographic sheets, fitness and telecom apps, "Zentra" onboarding: direction often came from the look of a reference rather than a research finding.
3. **Process inflation.** 5-, 6- and 12-phase plans, decision boards and ~60 decisions in a day. The process produced decisions faster than any could be tested, and Tarun mostly accepted recommendations.
4. **Feature scope moved away from evidence.** Income, pools, transfers, sweeps, splits, widget boards, Sankey and sound have little or no primary support. Weakly evidenced items (funds, goals) became the backbone ("savings motivates") while the strongest finding (small-purchase accumulation) was missing until v9 and then redefined.
5. **The core question was answered by literature, not users.** "Remaining vs spent" and "what does a student want on Home" were settled by papers and Claude's recommendation.
6. **Unchecked premise:** that Trickle initiates UPI payments (Scan / Pay buttons, hand-off). The research flagged that payment happens inside other UPI apps; this was never revisited.
7. **Delegation at the end.** v13 is entirely Claude's decisions on Tarun's request.

---

##### 7. Open questions and never-tested hypotheses

**Never tested with people**
- Does "1 dot = ₹100" (or any unit) read in under 5 s, and does "which is more" work in under 3 s? (S1, S2; `v11_phase0_brief.md`)
- Does surfacing accumulated small/repeat purchases change perception or feel like nagging? (original Phase 1 Q1)
- Remaining vs spent framing (original Phase 1 Q2), now resolved only by literature.
- Do students understand categories/jars without explanation? (original Phase 1 Q3)
- Does Home with zero numbers reassure, or frustrate students who want a figure?
- Does the 4-tap starter month produce a budget students accept? Does a student-type default fit?
- Is a 30-second onboarding real (scripted 0.5 s; human 15–25 s assumed)?
- Alert/notification tone (the "highest-risk part" in `build_plan.md`).
- Retention: day-2/7/30 loops are designed, never observed.

**Technical/product assumptions**
- Can a third-party app read UPI transactions (UPI linkage, AutoPay mandates) without SMS? Account Aggregator is the precedent noted in v6, not examined.
- Can Trickle sit before the payment (pre-pay), given UPI happens in GPay/PhonePe? Widget/notification fallback was planned (`screens_to_design.md`) and dropped.
- Is "savings motivates" true for students whose essentials are family-paid? (Evidence: one participant.)

**Still open on paper**
- Density levels (P2-Q4, `v12_decisions.md`).
- Statement import format (placeholder since v7).
- Large incomes (₹50k+) with the dot ladder tested only by script.
- Whether "small purchases" (the research finding) and "repeat purchases" (v9 definition) are the same thing: a one-off ₹30 snack is a small purchase but not a repeat.

---

##### 8. Facts to build on

Only items backed by primary research [P], verified secondary research [S-V], or Tarun's explicit statements [T].

1. Students find manual tracking tedious and abandon it. [P, nearly all 6]
2. The overspend realisation comes after the fact, when checking balance. [P, all 6]
3. Small purchases accumulate unnoticed; 5 of 6 named their own item (coffee, cigarettes/confectionery, quick-commerce add-ons, food). This is the most distinctive finding and an empty space in shipped apps. [P; S-V]
4. Students want to see where money went by category. [P: Harsh, Gautham, survey]
5. Guilt or scolding framing is rejected. [P: Vaishak, Yash]
6. One participant asked for a reminder and some friction before paying. [P: Vaishak]
7. One participant distrusts cloud apps for private data; local-first is a trust point. [P: Vaishak]
8. Forgotten subscriptions are real but single-sourced. [P: Nishad]
9. Cashless payment reduces the pain of paying and raises spending modestly. [S-V]
10. Apps support tracking far better than budgeting decisions. [S-V, BCS HCI 2023]
11. People avoid financial information that may be bad (ostrich effect). [S-V]
12. Unit/icon visuals work for lay users when the unit is fixed and marks stay around 20 or fewer; repeat the unit, never enlarge it. [S-V]
13. Defaults and automation raise saving; progress that starts above zero motivates. [S-V]
14. Auto-tracking via SMS/Account Aggregator already exists in India; it is not a differentiator. [S-V/competitive]
15. UPI payment happens inside third-party apps; a pre-payment screen is technically constrained. [secondary, technical]
16. No SMS; tracking is UPI linkage or manual entry. [T]
17. Money model: Income → Savings + Budget; Budget = Subscriptions (fixed, auto-deducted) + Categories with their own budgets. [T, 1 Oct]
18. Values: easy budgeting; savings motivates, not guilt; cash-like friction at payment; small-purchase/habit awareness; income split readable at a glance; visual, not numeric; retention first. [T, 30 Sep]
19. One decision at a time, low cognitive load, no games/streaks/badges. [T]
20. No budget number on Home; no timed pause at payment. [T]
21. Denomination shapes (v10) did not work for Tarun. [T]
22. Tarun's own visual: a ₹100 dot that fuses into ₹1,000 pills and ₹10,000 blocks. [T, sketch]

**Suggested restart point [C]:** run the original `build_plan.md` Phase 1 test (4 screens, 4–6 students, including original interviewees) on the smallest build that expresses facts 1–22, before adding anything else.


---

## Appendix P. Research protocols and materials for the next round

Everything needed to run Part 10 without further preparation. Written 6 Oct 2026 [C]; edit freely. All pass marks are starting lines, not findings.

### P.0 Plan at a glance
| Step | What | Who | Time | Output |
|---|---|---|---|---|
| 0 | Accept outcome ladder O1 to O6; freeze v15 | Tarun | 1 day | Signed-off ladder |
| 0b | Harvest past reviews into the review sheet (P.9) | Tarun | 1 hour | Dataset of past feedback |
| 1 | Feasibility spike: how spends get in | Tarun, Claude | 2 to 3 days | One page, go or no-go per route |
| 2 | 5-second tests (Home picture, grid at pay, Insights hero) | 5 students | 1 week | Scored sheets |
| 3 | Recorded task tests, 3 rounds, fix between | 5 students per round | 2 weeks | Findings and a fix list per round |
| 4 | One-week diary (manual tracking) | 5 students | 1 week, parallel | Estimates vs ledger |
| 5 | Interview round 2 | 6 to 8 new people | 1 week | Transcripts and coding in repo |

### P.1 Who to recruit
- **Target:** students in India, 18 to 24, who pay by UPI at least five times a week. Income may be allowance, parents, part-time or stipend.
- **Mix for 5 participants:** at least 3 who do **not** study design; at least 1 who has never used a budgeting app; at least 1 who uses a single UPI app; at least 1 whose money comes mainly from parents; at least 1 who earns.
- **Exclude:** anyone who has seen a Trickle build before; anyone who works in finance or product.
- **Do not use** classmates from Tarun's studio for rounds 2 and 3 (they have seen earlier builds and are design-literate). They are useful for the harvest (Step 0b) and for pilot sessions.
- **Where:** other departments, hostel mess, campus clubs, a sibling's college, an online student group. Offer a small thank-you (₹200 to 300 or equivalent) so participation is not limited to friends.

### P.2 Screener (ask before booking)
1. Which UPI apps do you use? (Record; accept GPay, PhonePe, Paytm, CRED, others.)
2. About how many UPI payments do you make in a week? (0 to 4 / 5 to 10 / more than 10) Need "5 or more".
3. What do you study? (Record. Quota: at least 3 of 5 non-design.)
4. Where does most of your money come from? (Allowance / parents when asked / part-time / stipend / other.)
5. Have you ever used an app to track spending or budget? Which? What happened? (Record; no wrong answer.)
6. Are you comfortable being recorded (screen and voice) for 30 to 40 minutes? (Need "yes"; otherwise take notes only.)
7. Have you seen an app called Trickle before? (Need "no".)

### P.3 Consent and ethics (read aloud; also give in writing)
- "I am testing an app idea, not testing you. There are no wrong answers. If something is confusing, that is the app's problem and it helps me to hear it."
- "I will record your voice and the screen. Recordings are only used by me and the team to learn, are stored on a private drive, and are deleted after the project is written up. Your name will not appear anywhere."
- "No real bank or money details will be asked. The app uses made-up data."
- "You can stop any time, or skip any question, without giving a reason."
- Ask them to say "I agree" on the recording. Keep a name-free ID (P1 to P5).
- Do not collect phone numbers beyond booking. Delete booking details after the session.

### P.4 Interview guide, round 2 (45 to 60 minutes; for Step 5, also used as the Day 0 and Day 7 conversations)
Open, then follow the participant. Probe with "tell me about the last time".
**A. Warm-up (5 min)**
1. What do you spend money on in a normal week?
2. Where does your money come from, and how often?
3. Who else pays for things for you?
**B. The moment of paying (10 min)** [the research's centre]
4. Tell me about the last thing you paid for with UPI. Where were you? What happened before and after?
5. Do you look at anything before you pay? What?
6. When did you last feel "that was more than I meant to spend"? What was it? When did you notice?
7. What would have changed what you did, if anything?
**C. Knowing where it went (10 min)**
8. How do you know how much you have left? How often do you check?
9. Right now, without looking: how much did you spend this week? (Record the guess, then check against their app if they agree.)
10. Which spends do you think add up without you noticing?
**D. Planning (10 min)** [the thing never asked]
11. Do you set a limit, a budget, or an amount for yourself? In your head, on paper, or in an app? Per day, week, month, or "until something"?
12. When your allowance or pay arrives, what do you do in the first hour? The first day?
13. Do you save? How do you decide how much? Do you have something you are saving for?
14. What happens in the last week before money arrives?
**E. Tools tried (5 min)**
15. Have you used any app or sheet to track money? Which? What did you like? Why did you stop?
16. What would make you open an app like this every day? What would make you delete it?
**F. Trust and data (5 min)**
17. Would you give an app access to read your bank transactions? Under what conditions? What would stop you?
18. Would you pay inside a different app if it showed you something before you paid? What would it have to show?
**G. Close (3 min)**
19. If you could change one thing about how you handle money, what would it be?
20. Is there anything I should have asked?
**Notes for the interviewer:** do not explain Trickle in this round; do not mention budgeting before section D; ask about the last time, not about habits in general; write down their words, not summaries.

### P.5 Five-second tests (Step 2)
**Materials:** the v15 mockup `mockup15.html#demo`, profile Yash; the side-panel switch "Home picture" (Grid, Bar, Days, Words); `window.TIPS=false` in the console before the session; a screen recorder.
**Set-up per screen:** put the app on the Home tab, load the state, show it for 5 seconds, hide it (cover the phone or press Lock).
**Test A: Home picture (five variants, rotated per participant)**
1. "What is this telling you?" (free text, record).
2. "About how much of the week's money is left: a lot, about half, a little, none?"
3. "Could you buy lunch for ₹150 today?"
4. "How sure are you? 1 to 5."
5. Observer notes: first thing looked at, time to first answer, any "what is…" question.
**States to use (one per variant, rotated):** plenty left (80%), about half, low (20%), empty, no plan yet.
**Scoring per variant:** correct on Q2 and Q3 = 1; confidence; count of "what is…" questions.
**Test B: Grid at the moment of paying**
1. Show the Pay confirm screen. "What will happen when you tap Pay?"
2. "What do the dashed boxes mean?" (Do not pre-teach.)
3. "Is that a lot or a little for this category?"
**Test C: Insights hero**
1. Show Insights, "When", with the hero sentence covered: "What does this picture tell you?"
2. Uncover: "Does the sentence match what you saw?"
3. Show "Vs last week": "Am I spending more or less than last week?"
**Pass marks:** variant reads if at least 4 of 5 are correct on Q2 and Q3 and none asks what the shapes mean. Test B passes if 4 of 5 state that money will leave the category, without being told.

### P.6 Task test script (Step 3; 30 to 40 minutes; think aloud; screen and voice recorded)
**Set-up:** `mockup15.html` (not `#demo` for tasks 1 and 7), tips ON, fresh account for tasks 1 to 3, profile Yash for tasks 4 to 8. Start recording. Read: "I'd like you to talk through what you're thinking as you go. I can't answer questions about the app until the end, but I'll note them."
**Tasks** (read one at a time; do not use the app's words in the task)
| # | Task | Success | Probes (after the task) |
|---|---|---|---|
| 1 | "You've just installed this app. Set it up the way you'd like, then tell me what you think it's for." | Reaches Home; states the purpose in their own words | "What do you think happened to your data?" "What was the second question asking you?" |
| 2 | "You just bought a chai for ₹20. Add it." | Spend recorded in ≤ 4 taps and ≤ 20 s | "What did the app show you afterwards?" |
| 3 | "You want to know how you're doing this week. Tell me." | States left/over correctly | "Point to where you got that." "What is a box?" |
| 4 | "Find out where most of last week's money went." | Names the top category from Spending or Insights | "What does this picture show?" |
| 5 | "You paid ₹4,000 for a laptop repair. It's a one-time thing. Record it." | One-off recorded outside the week | "What happened to your week?" |
| 6 | "You get ₹9,000 a month from home. Use it to set up a weekly amount." | Plan made, weekly figure stated | "How is the weekly figure worked out?" "What would you change?" |
| 7 | "Netflix charges ₹199 every month. Make sure the app knows." | Subscription added | "When will it take the money?" |
| 8 | "Imagine you've spent more than planned this week. What would the app do? Show me." | Finds the over-state or explains it | "How does that make you feel?" |
**For every screen with a number or a word, ask once:** "What does this mean to you?" This is the probe that would have caught "2 times of 7".
**Observation sheet columns:** task, success (yes / partial / no), time, taps, errors (wrong tap), hesitation (>5 s), quote, severity.
**Severity:** 0 not a problem; 1 cosmetic; 2 slows them; 3 blocks or misleads; 4 causes a wrong decision.
**After the tasks:** the 10-item usability scale (P.7), then 4 questions: "What was clearest?" "What was most confusing?" "Would you use it next week? Why?" "What is missing?"
**Rounds:** run 5 participants per round; fix the severity 3 and 4 items; run the next round with 5 new participants. Stop when a round has no new severity 3 or 4 issue, or after three rounds.

### P.7 Usability scale (SUS), scoring
Ask each statement on a 1 (strongly disagree) to 5 (strongly agree) scale.
1. I think that I would like to use this app frequently.
2. I found the app unnecessarily complex.
3. I thought the app was easy to use.
4. I think that I would need the support of a technical person to be able to use this app.
5. I found the various functions in this app were well integrated.
6. I thought there was too much inconsistency in this app.
7. I would imagine that most people would learn to use this app very quickly.
8. I found the app very cumbersome to use.
9. I felt very confident using the app.
10. I needed to learn a lot of things before I could get going with this app.
**Scoring:** odd items: score − 1; even items: 5 − score; sum all ten; multiply by 2.5 to get 0 to 100. A score near 68 is average for software; anything under 50 is poor. With five participants the score is directional only.

### P.8 One-week diary (Step 4)
**Aim:** test whether tracking survives a week, what people estimate vs what happens (O1), and in what units they think about money.
**Day 0 (30 min):** consent; the interview guide sections A to D; take their guess for "a normal week's spending"; install the v15 build on their phone (or a private link); show only how to add a spend.
**Days 1 to 6:** each day, one message at an agreed time: "Anything to add from today? One thing that surprised you?" Keep nudges to one a day. They may add spends by hand at any time.
**Data captured:** spends logged, time of day, what they skipped logging and why; the daily surprise.
**Day 7 (30 min):**
1. "How much do you think you spent this week? Which was your biggest category?" (before opening the app)
2. Open the app; compare. Record the gap (O1).
3. "Did you ever want to make a plan? What would you have wanted it to be?" (units: day, week, month, until a date)
4. "What did you stop doing? What did you keep doing?"
5. "Would you carry on? What would make you?"
**Outputs:** per participant: entries logged, days with ≥ 1 entry, estimate vs ledger, surprises, quotes, whether they made a plan and in what unit.

### P.9 Review sheet (Step 0b and every future showing)
| Date | Build | Who (first name or ID, role, studies) | What they were doing | Screen | Their words | Type: too much / what do I look at / can't understand / liked / wanted X | Tarun's own note (kept separate) |
|---|---|---|---|---|---|---|---|
(One row per comment. "Tarun's own note" is where "lost functionality" and similar intuitions go, so they are never mistaken for reviewer evidence.)

### P.10 Analysis plan
- **Per session:** within 24 hours, write 5 bullets: what was clear, what was confusing, quotes, surprises, severity 3 and 4 issues.
- **Coding:** tag each observation with a screen, a task, and a cause: *picture*, *words*, *orientation*, *data*, *missing feature*. Count by cause across participants. This directly separates H-VIZ, H-WORDS and H-ORIENT (Part 11 and 12).
- **Affinity map** after five sessions: group by cause, then by screen.
- **Decision rules:** a problem seen by 3 of 5 is fixed before the next round; 1 of 5 is logged; 2 of 5 is judged by severity. A variant passes the five-second test at ≥ 4 of 5.
- **Reporting template (one page per round):** what we tested; who (counts, mix); five findings with quotes; what we change; what we will retest; what we are unsure about.

### P.11 Instrumentation for test builds (a small build task, not product features)
Events to log to the device only, exportable at the end of a session: screen shown (id, time), tap target (data-a), time between a screen being shown and the first tap, flow started and completed (pay, plan, subscription, one-off), step skipped, tip shown and dismissed, the Home picture variant, the first spend time (install to first spend).
Do not log amounts or names beyond what the participant types in the session.

### P.12 Pilot and logistics checklist
1. Pilot the script with one design classmate; fix wording.
2. Test recording, screen sharing, and that the build loads on a phone and a laptop.
3. Reset the app between participants (`#demo` for profile tasks; refresh for a new account).
4. Have printed copies of the tasks, the consent text, the SUS and the observation sheet.
5. Book sessions 45 minutes apart; leave 15 minutes between for notes.
6. After each round: write the one-page report within two days and change only what it says.

### P.13 Ethics and safety notes
- Students and money: never ask for real balances or account numbers. If a participant volunteers financial distress, stop and offer campus support resources; do not probe.
- Do not present the app as financial advice.
- Do not leave participants feeling judged about spending; avoid any question that implies waste.
- Keep recordings private; delete on schedule.


---

## Appendix Q. The money engine, as built: state, rules and formulas

Source: `archive/session-workfiles/mockup15/engine.js` and the plan, week and pace logic in `ui_d.js`, `ui_f.js`, `ui_g.js` (v15). This is the part of the product that behaves the same in v14 and v15; only what is shown changed. Written so that a developer can rebuild it without the prototype.

### Q.1 Constants and helpers
| Name | Value or rule | Notes |
|---|---|---|
| `DAY` | 86,400,000 ms | |
| `weeksPer` | 4.3 | Weeks in a month for every conversion (D-2). A real month is 4.33 weeks, so 4.3 under-counts by about 0.7% |
| `startOfWeek(d)` | Monday 00:00 local of the week containing `d` | Weeks run Monday to Sunday (D-1) |
| `r5(x)` | round to the nearest ₹5 | |
| `r5b(x)` | `max(0, round(x/5)*5)` | |
| Display rounding | Whole rupees internally; shown to ₹5 under ₹1,000 and ₹10 above; Indian digit grouping | D-2 |
| `NOW0` | Fri 2 Oct 2026, 17:30 | The prototype's fixed "now"; advanced by the simulator |
| Box value | amount ÷ 100, shown "1 box ≈ ₹N" | D-35 |
| Max categories | 30 | D-18 |

### Q.2 State shape (`S`)
```
S.key, S.p            profile key and profile record (name, mode: 'upi'|'manual', seeds)
S.now                 simulated clock
S.cats[]              {id, name, amt (this week), left, full (full-week amount), order}
S.bufAmt, S.bufLeft, S.bufFull        buffer this week, left, full-week
S.bills[]             {id, name, amt, every, dueDay, nextDue, reserve, paid[], paused}
S.goals[]             {id, name, target, saved, byMonths, state, hist[12], celebrated, reachedOn, doneOn}
S.free                free (unassigned) savings
S.txns[]              {id, t, payee, amt, kind, ref, via, src, week}
S.unsorted[]          ids of unsorted transactions
S.credits[]           {id, t, from, amt} waiting for assignment
S.incomes[]           {id, amt, sav, sp, start, end}
S.moneyIn[]           audit trail of income and one-off money
S.pending[]           week reviews waiting {un, week, touched, touchedAmt, snap, bufAmt, from}
S.memory              payee -> category id (learned)
S.W, S.fixedW, S.flexW    weekly plan total, fixed part, flexible part
S.planSet, S.planFromIncome, S.track, S.noInc, S.noBal    mode flags
S.weekScale, S.weekFrom   first-week scaling and the first day the plan covers
S.touched, S.touchedAmt   savings were used to cover overspend this week
S.flags               {bankDecline, bankSlow, lowBalance, linkLost}
S.asked, S.askedAt    pop-ups answered "no" and when
S.log[], S.toasts[], S.celebrate[]
```
`kind` of a transaction is one of `cat`, `fixed`, `goal`, `unsorted`, `oneoff`. `via` is `trickle` (paid through the app), `manual` (typed in) or `detected` (seen on the link). `src` records where the money came from when a payment overran its category (see the cascade).

### Q.3 Invariants (the ledger)
1. income = savings + budget
2. budget = fixed reserve + categories + buffer
3. savings = goals + free savings
4. every rupee is in exactly one pot (D-3)
5. owed or waiting money sits outside the balance (credits wait in a tray until assigned)
A "Ledger" panel in the side panel checks these live.

### Q.4 Weekly plan formulas
Per bill `b`: `billWeekly(b) = 0` if paused, else `b.amt ÷ N` where N = 1 (weekly), 4.3 (monthly), 13 (every 3 months) or 52 (yearly).
Fixed part: `fixedW = round(Σ billWeekly)`. Flexible part: `flexW = W − fixedW`. Buffer: `bufAmt = flexW − Σ category amounts`.
Per income `i` over its date range: days = number of days from `start` to `end` inclusive (`end` snapped to the Sunday of the chosen week); `perDay(i) = i.sp ÷ days`; weekly share = `perDay × 7`.
Weekly plan from incomes: `planRate = Σ over running incomes (end + 1 day > now) of perDay(i) × 7`; `W = r5b(planRate)`.
First-week scale: for the current week [Monday, Sunday], `num = Σ perDay(i) × (days of i inside this week)`, `den = Σ perDay(i) × 7`, `weekScale = min(1, num ÷ den)`. Category and buffer amounts for this week are `full × weekScale` (min ₹5 if the category is funded) and return to `full` on Monday.
Recompute: when `W` changes, each category's full amount is scaled by `(flexW × 0.85) ÷ Σ old full` (the 15% remainder becomes buffer); `S.flexW = max(Σ, flex)`; `bufFull = flexW − Σ`.
Make a plan from an income in v15: the income's weekly share `wk = max(5, r5b(sp ÷ days × 7))` becomes the weekly total; `balN = round(wk × 4.3)`, `lasts = 4.3`, `sav = 0`; categories share it equally after fixed bills and a buffer of `max(5, r5b(flex × 0.15))`; each category gets `r5b((flex − buffer) ÷ n)`.

### Q.5 The cascade (what happens when a payment is larger than its category), O-23 and D-22
```
cascade(amount, target):
  1. take from the target (category left, bill reserve, goal saved, free, or buffer)
  2. then from the buffer (unless the target was a bill: then buffer after the reserve, never other categories)
  3. then from the other categories, equally: repeatedly give each remaining category an equal share until the amount is covered or all are empty
  4. then from savings: free savings first, then goals in proportion to what each holds (goals other than the target)
  5. anything still unfunded is recorded as `unfunded`
returns {amt, target, buffer, others, savings, unfunded, othersDetail, savingsDetail}
```
An unsorted payment is charged to the buffer until it is sorted (D-11); sorting refunds the buffer and charges the chosen category. If the cascade reaches savings, `S.touched` is set and the week review reports that savings covered the rest.
`previewCascade` runs the same function on a deep copy, so the pay confirm can show the result before it happens.

### Q.6 Paying
`doPay({amt, target, payee, paid})`: runs the cascade; inserts a transaction `{kind: target.type, ref: target.id, via: paid ? 'manual' : 'trickle', src: result}` at the top of `txns`; if savings were used, marks `touched`; checks whether any goal is now reached (celebration once); logs a line.
Track mode (no plan) uses a simpler version: the transaction is recorded against the category with no cascade.
**One-off payment** (v15): `kind: 'oneoff'`, `ref: null`, `src.fromSavings = min(amt, free)` if paid from savings (and `free` is reduced); excluded from `weekSpentAll`, `spentThisWeek`, the week review and Insights; `removeTxn` returns the savings.
**Detected payment:** `detectPayment(payee, amt)` files it under `memory[payee]` if known, otherwise `unsorted` (charged to the buffer). **Merge rule (D-12):** a payment seen twice (through Trickle and through the link) is merged by amount, payee and a 10-minute window (specified; not implemented in the prototype).

### Q.7 Week end
At the first tick into a new Monday (`advanceDays`): `un = Σ category left + bufLeft` is pushed to `pending` with a snapshot of category amounts; amounts reset to `full`; `weekScale = 1`; each bill's reserve is topped up by `billWeekly` (capped at 1.2 × amount).
With a plan, v15 moves the leftover to savings automatically (B-32) and opens the review: `applyPending(..., {to: 'savings'})` splits `un` equally across active goals (the last goal takes the remainder), or into free savings if there are no goals. Without a plan (track mode) the week end is a neutral recap. A plan-less user never sees leftovers.
"To next week" (V5-5) is still in the engine (`weekEnd` with `to: 'next'`): the leftover is split equally across all categories **including the buffer** (D-6) but is no longer offered by default.

### Q.8 Subscriptions
Added by the user or proposed when the same payee charges about the same amount twice, about a period apart (D-8, B-27). `reserve` starts at `3 × billWeekly`. When due: UPI mode pays by cascade from the reserve and logs a `fixed` transaction; manual mode raises `dueNow` and asks. Paused bills have `billWeekly = 0` and their share goes back to the buffer (B-26). If subscriptions exceed 60% of the plan, the form and Home say so (B-31, B-44).
Next due: weekly +7 days; every 3 months +3 calendar months; yearly +1 year; monthly the next `dueDay`.

### Q.9 Goals
`needed per month = ceil(target ÷ byMonths ÷ 10) × 10` (D-20). ETA is the average of the last three months' actual pace, else planned pace. States: Active → Reached (saved ≥ target; celebration once; offer "Mark done" or "Keep going") → Done (saved returns to free savings). Paying from a goal is spending its money (F-1). Moving money between goals, free savings, the buffer and categories is `moveMoney` (limited to what the source holds).

### Q.10 Pace (Home colour and sentence)
`ideal = (now − from) ÷ (end of week − from)` clamped to [0, 1], where `from = weekFrom` (first day the plan covers) or Monday; `spent = 1 − left ÷ total`; **over** if `left ≤ 0`, or `touched`, or `spent > ideal + 0.10`.
Green gradient and "On pace." when not over; amber and "A bit ahead of pace." when over; "Gone over a little." when the week's money is empty or savings were touched.
**Known weakness:** the ideal is linear in time, so it ignores weekends, bills and the fact that students spend unevenly (Nishad, Yash); a Monday-morning purchase can show amber. Pace has not been validated against how students think about "too fast".

### Q.11 Plan-health messages (Home next-thing row)
| Condition | Message |
|---|---|
| An income's range ends within 14 days | "Plan drops to ₹X a week after D Mon" |
| All incomes ended | "No income covers this week" with "Add income" |
| Subscriptions ≥ 50% of the weekly plan | "Subscriptions take ₹X of your ₹Y a week" |
| Priority order of the Home row | Link lost; last week ready; credit waiting; payments to sort; bill due; plan-health; make your plan |

### Q.12 Onboarding to state
Two questions (how to see spends; categories). The outcome is `S` with `track = true`, six default categories (or the chosen ones) at ₹0, no buffer, no bills, no goals, `planSet = false`. "Make your plan" adds an income and runs the plan builder (Q.4), carrying every spend, income, goal, memory and unsorted payment over (spends in categories the user dropped become unsorted).

### Q.13 Tips and asks
`TS` records which of 14 tips have been shown (once per page load). Pop-up asks (`ASKS`): link, add, pin, notif, sort, limit, plan, income, planoffer, goal, recap, weekmoved, subfound, import. "No" is remembered (`askedAt`) so it is not asked again straight away; a plan offer repeats after four weeks.

### Q.14 Known rule gaps (from the memo, the audit and the code)
1. Incomes that start in the future are not supported ("add it when the money arrives").
2. Week-to-month conversion uses 4.3, so a "monthly equivalent" is about 0.7% low.
3. The 10-minute merge window for duplicate payments is specified and not coded.
4. Pace is linear in time (Q.10).
5. The 15% buffer on a new plan is a default, not derived from anything.
6. Over-covering by savings has no cap or confirmation; a large one-off from savings is allowed when savings exist.
7. A category's weekly amount may be ₹0 (new category), so it records spend but cannot overspend.
8. Leftover rolling into next week is reachable only through Move money.
9. No partial-week handling for plans that end mid-week (they snap to Sunday, so none are needed).
10. Time zones are the device's; there is no travel or daylight-saving logic.


---

## Appendix R. Inventory of the build
Generated from the running v14 mockup and the v15 mockup (`inv.js`). Names are the identifiers used in the code.
### R.1 Counts
| | v14 | v15 |
|---|---|---|
| screens | 14 | 15 |
| sheets | 13 | 16 |
| flows | 9 | 9 |
| popups | 4 | 4 |
| asks | 14 | 14 |
| tips | 0 | 14 |
| action handlers | 161 | 189 |
| input handlers | 15 | 16 |

### R.2 Screens
v15: `home`, `spending`, `cat`, `others`, `habit`, `txn`, `sort`, `budget`, `income`, `savings`, `free`, `goal`, `insights`, `tcat`, `money`

v14: `home`, `spending`, `cat`, `others`, `habit`, `txn`, `sort`, `budget`, `income`, `savings`, `free`, `goal`, `insights`, `tcat`

### R.2 Sheets (bottom cards)
v15: `refile`, `bill`, `addbill`, `sortpick`, `billsum`, `goaledit`, `addgoal`, `settings`, `refit`, `assign`, `addmoney`, `incd`, `catpick`, `v15inc`, `gridhow`, `tip`

v14: `refile`, `bill`, `addbill`, `sortpick`, `billsum`, `goaledit`, `addgoal`, `settings`, `refit`, `assign`, `addmoney`, `incd`, `catpick`

### R.2 Flows (full-screen)
v15: `money`, `move`, `pay`, `onb`, `lock`, `inc`, `subadd`, `oneoff`, `incend`

v14: `money`, `move`, `pay`, `onb`, `lock`, `inc`, `subadd`, `oneoff`, `incend`

### R.2 Pop-ups
v15: `cele`, `weekend`, `ask`, `weekreview`

v14: `cele`, `weekend`, `ask`, `weekreview`

### R.2 Ask cards (one question each)
v15: `link`, `add`, `pin`, `notif`, `sort`, `limit`, `plan`, `income`, `planoffer`, `goal`, `recap`, `weekmoved`, `subfound`, `import`

v14: `link`, `add`, `pin`, `notif`, `sort`, `limit`, `plan`, `income`, `planoffer`, `goal`, `recap`, `weekmoved`, `subfound`, `import`

### R.2 First-time tips
v15: `paid`, `unsorted`, `credit`, `plan`, `income`, `oneoff`, `bill`, `goal`, `ahead`, `over`, `spending`, `money`, `insights`, `cat`

v14: 

### R.3 Demo profiles (the student pool, M-2)
- `V: Vaishak - ₹3k a month · 2 categories · tracks by hand`
- `G: Gautham - ₹4k a month · week 1, nothing tracked yet`
- `T: Tarun - ₹6k a month · 7 categories · month 6`
- `Y: Yash - ₹9k a month · 7 categories · 2 goals`
- `N: Nishad - ₹25k a month · 12 categories · big bills`
- `H: Harsh - ₹12k a month · 18 categories · 3 goals`
- `M: Meera - Six months in · 3 incomes · subscriptions · 3 goals`


---

## Appendix S. Git timeline
Every commit in the repository (UTC). Work before 1 Oct is in the imported project docs.

| Commit | When (UTC) | What |
|---|---|---|
| c5b54a3 | 2026-10-02 03:26 | Import Trickle project |
| 444e5f1 | 2026-10-02 03:42 | Import Trickle project |
| 1d4194f | 2026-10-01 22:16 | Log V1-9: nested rings use one colour per category, tap opens detail |
| 419cbff | 2026-10-01 22:18 | Viz 1 closed with default answers for ring open points |
| 9a6e6d9 | 2026-10-01 22:20 | Log Viz 2 answers (V2-1..V2-3) |
| d9efd96 | 2026-10-01 22:26 | Add Viz 2 pay-friction options board and link it in the decisions log |
| 235ed65 | 2026-10-01 22:29 | Log Viz 2 decisions V2-4/V2-5 (fade in order, dashed-outline ghost); Viz 3 next |
| 77c7a94 | 2026-10-01 22:34 | Log Viz 3 structure and colours (V3-1..V3-3) |
| d2a0287 | 2026-10-01 22:35 | Add Viz 3 income-split options board |
| e6a3ca7 | 2026-10-01 22:43 | Log V3-4..V3-8 and park Savings-tab goal requirement |
| 7faeb69 | 2026-10-01 22:44 | Update Viz 3 board: bands only, level-by-level demo, two label options |
| 9c01775 | 2026-10-01 22:48 | Log V3-9..V3-11 (L2 labels, gap in grid, scale-line hierarchy) |
| d0a3d95 | 2026-10-01 22:50 | Viz 3: gap between bands, L2 drop-down labels, prominent scale chip (also on Viz 2) |
| 54fdd48 | 2026-10-01 22:51 | Close Viz 3; Viz 4 (savings goal) is next |
| 836e0fe | 2026-10-01 22:54 | Log V1-10: nested rings are the main Spending-tab view |
| 8619f19 | 2026-10-01 22:56 | Log V1-11/V1-12: full-screen detail, colour-coded rings |
| 6a59d98 | 2026-10-01 22:58 | Add Spending-tab rings board (V1-10..V1-12) |
| 4663a60 | 2026-10-01 23:03 | Log V1-13: previous-period slider (1-12) inside a category |
| d72d47d | 2026-10-01 23:04 | Spending rings board: previous-period slider (V1-13) |
| e152bd0 | 2026-10-01 23:08 | Spending rings board: three ways to show now and previous together; log V1-14 (open) |
| fea8a44 | 2026-10-01 23:09 | Spending rings: then/now side by side with faded previous (V1-14, V1-15) |
| 428e620 | 2026-10-02 07:57 | Log V4-1..V4-7 (savings goals) and parked flows |
| ef0344a | 2026-10-02 08:01 | Add Viz 4 savings-goals options board |
| 5c06209 | 2026-10-02 08:15 | Log V4-8..V4-11 (text-only goal rows, segmented ring by goal, months only, most saved) |
| 7125e99 | 2026-10-02 08:21 | Viz 4 board: segmented ring split by goal, text-only goal rows, months-only stats with stepper, most saved months |
| 0f69313 | 2026-10-02 08:26 | Log V4-12/V4-13: day grid back under the months, most saved shown by glow |
| a1c6e69 | 2026-10-02 08:27 | Viz 4: day-by-day grid under the months, shared stepper, most saved shown by halo (V4-12, V4-13) |
| db6a49e | 2026-10-02 08:49 | Log V4-14: back to By month / By day toggle, days as week columns |
| 1445e6c | 2026-10-02 08:50 | Viz 4: By month / By day toggle, days as week columns, no stepper on days (V4-14) |
| 4290c66 | 2026-10-02 08:51 | Log V4-15: month stepper moves to By day |
| 2727ff8 | 2026-10-02 08:51 | Viz 4: month stepper moves to By day; By month is just the boxes (V4-15) |
| 9f1b708 | 2026-10-02 08:52 | Log V4-16: days as columns in By day |
| aa179e5 | 2026-10-02 08:52 | Viz 4: By day as weekday columns, weeks as rows (V4-16) |
| 068f5dd | 2026-10-02 08:54 | Close Viz 4 (V4-17..V4-21); Viz 5 is next |
| 22c793a | 2026-10-02 08:59 | Log V5-1..V5-4 (weekly unspent-to-savings pop-up) |
| b45a980 | 2026-10-02 09:01 | Add Viz 5 weekly unspent-to-savings board |
| 923b746 | 2026-10-02 09:06 | Log V5-5..V5-9 (next-week option, amber, rupees in step 1, top-filled over week) |
| 647683d | 2026-10-02 09:07 | Viz 5: amber, rupees in step 1, next-week option, top-filled weeks with goal reminder (V5-5..V5-9) |
| 73a31b6 | 2026-10-02 09:10 | Viz 5: emphasise overspend amount (V5-10) |
| c777d84 | 2026-10-02 09:12 | Close Viz 5; Viz 6 (small / repeat purchases) is next |
| 4b28ba1 | 2026-10-02 09:14 | Log V6-1..V6-3 (repeat purchases: definition, Spending view, filling box) |
| 8ecfef6 | 2026-10-02 09:16 | Add Viz 6 repeat-purchases board |
| 36da681 | 2026-10-02 09:26 | Withdraw V6-3 (filling boxes); log V6-4 (calendar hotspots for how much and how many) |
| ea44202 | 2026-10-02 09:27 | Viz 6 redrawn: calendar hotspots by day, week and month, Times/rupees switch, habit picker (V6-4) |
| b5ed81f | 2026-10-02 09:31 | Log V6-5: habit list with x-counts is the starting screen, no All repeats |
| 9628034 | 2026-10-02 09:31 | Viz 6: habit list with x-counts as the starting screen, no All repeats (V6-5) |
| 9e34900 | 2026-10-02 09:33 | Close Viz 6; Viz 7 (time patterns) is next |
| a8322aa | 2026-10-02 09:34 | Log V7-1, V7-2 (all spending by time of day, in Insights) |
| 071b8ab | 2026-10-02 09:35 | Add Viz 7 time-patterns board (all spending by time of day, Insights) |
| 1a5a747 | 2026-10-02 09:38 | Log X-1: plain sentence under hotspots in Viz 6 and Viz 7 |
| 9a6eb6c | 2026-10-02 09:39 | Viz 6 and Viz 7: plain sentence under the hotspots saying when you spend most (X-1) |
| e8dd578 | 2026-10-02 09:41 | Close Viz 7; Viz 8 (subscriptions coming up) is next; handover refreshed |
| fedb2e5 | 2026-10-02 10:11 | Log V8-1..V8-3 (Fixed calendar in Spending, when not how much) |
| 3e106d8 | 2026-10-02 10:13 | Add Viz 8 fixed-bills calendar board |
| abfbd35 | 2026-10-02 10:15 | Log V8-4: amounts on the Fixed list rows |
| fbba09f | 2026-10-02 10:16 | Viz 8: amounts on the Fixed list rows (V8-4) |
| a83a833 | 2026-10-02 10:19 | Close Viz 8; Viz 9 (this week vs last) is next |
| 52f10a2 | 2026-10-02 10:19 | Log V9-1..V9-3 (this week vs last: Insights, all then category, side-by-side grids) |
| 9522606 | 2026-10-02 10:24 | Add Viz 9 this-week-vs-last board |
| 7124465 | 2026-10-02 10:26 | Close Viz 9; Viz 10 (transaction history) is next |
| 7a5ccb8 | 2026-10-02 10:28 | Log V10-1..V10-3 (history: day-grouped list, filter chips, name/amount/time) |
| 06ae9c5 | 2026-10-02 10:29 | Add Viz 10 transaction-history board |
| 35a6156 | 2026-10-02 10:37 | Close Viz 10; Viz 11 (exact amounts on tap) is next |
| 1ae433a | 2026-10-02 10:41 | Log V11-1..V11-3 (rules table + one tap pattern, line under the picture, no rupees on Home) |
| 80328c5 | 2026-10-02 10:43 | Viz 11 board: amounts on tap (rules table + standard tap pattern) |
| ac1f39a | 2026-10-02 10:45 | Close visualisation queue (Viz 1-11); next is flows |
| aae8c47 | 2026-10-02 11:27 | Onboarding board 1 and decisions O-1..O-5 |
| 0b66caf | 2026-10-02 11:37 | Onboarding board 2: PIN confirm, slider+grid budget, step 6 goals; log O-6..O-11 |
| 0e7b1f0 | 2026-10-02 11:41 | Onboarding: goal dates, remove split presets; log O-12, O-13 |
| 7f6bc9d | 2026-10-02 11:48 | Onboarding: add-goal at bottom, new-income flow; log O-14, O-15 |
| 812ec55 | 2026-10-02 11:56 | Onboarding: buffer category, preset/equal/manual split; log O-16, O-17 |
| db022a6 | 2026-10-02 12:01 | Onboarding: no Preset during setup; log O-18 |
| c4e1996 | 2026-10-02 12:16 | Onboarding board 3: manual balance, fixed bills, guided budget, basics+search categories, goal amounts, overspend rule; log O-19..O-25 |
| efd5f47 | 2026-10-02 12:20 | Onboarding: new income added by hand, no auto prompt; log O-26 |
| 8733df6 | 2026-10-02 12:36 | Onboarding done: search below basics + add-your-own; log O-27, O-28 |
| d8c4446 | 2026-10-02 12:42 | Log F-1: paying toward a goal = spending it, chosen like a category |
| 9c0710a | 2026-10-02 12:46 | Flows board 1: pay screen flow (goals like categories) |
| 280fc1d | 2026-10-02 13:02 | Pay flow: merge amount and what-for, Budget/Savings tabs with boxes; log F-2 |
| 6b9350c | 2026-10-02 13:21 | Pay flow: pay screen handles every case, confirmation screen; log F-3, F-4 |
| fe93840 | 2026-10-02 13:31 | Flows board 2: moving money out of savings; log F-5 |
| 122e1d1 | 2026-10-02 13:33 | Pay screen: where-it-comes-from as a box strip; log F-6 |
| a78098d | 2026-10-02 13:35 | Pay screen: amounts under the split strip; log F-7 |
| ec9f72d | 2026-10-02 13:41 | Log delegated decisions D-1..D-34 (whole-app logic gaps and flows) |
| 7b8172c | 2026-10-02 13:46 | Whole-app blueprint artifact (screens, flows, model, rules, decisions, gaps); D-35, D-36; docs updated |
| 10bd08c | 2026-10-02 14:09 | Trickle Night design system (tokens, gradients, components, data visuals, motion, references); DS-1..DS-10 |
| ef6d895 | 2026-10-02 14:27 | Clickable mockup with live ledger, six profiles and event simulator; log M-1..M-6 |
| e178c91 | 2026-10-02 14:34 | Add Trickle Instrument design system (DS2-1..6) |
| 0002078 | 2026-10-02 14:42 | Add Instrument-skinned mockup (M2-1) |
| 344ba7c | 2026-10-02 14:43 | Instrument mockup: stop pop-up flicker and scroll resets on every tap |
| 05a02db | 2026-10-02 14:49 | Full-flow Instrument mockup: onboarding, lock, settings, import, re-fit (M2-2) |
| 7c1a2d2 | 2026-10-04 06:05 | Port full flows into Night mockup (M2-3) |
| 35366e7 | 2026-10-04 06:05 | Fix Night mockup link in docs |
| 8749fb7 | 2026-10-04 07:30 | Export Night mockup screens to Figma as editable layers; add export tooling |
| 90edbb2 | 2026-10-04 15:29 | Log bare-minimum mode decisions B-1..B-8 (budget and balance optional) |
| ac2dc9c | 2026-10-04 15:35 | v14: user can always say no, every question short and plain (B-9..B-11) |
| b1306c4 | 2026-10-04 15:35 | v14: log B-9..B-11 (always skippable, short plain questions); restore queue heading |
| 8c994c2 | 2026-10-04 15:39 | Mockup: add 11 skippable ask pop-ups (B-12) |
| 1763868 | 2026-10-04 15:45 | Mockup: short skippable onboarding, Just start tracking, track mode, upgrade path (B-13..B-15) |
| c177c4a | 2026-10-04 16:22 | Figma: re-export onboarding, add Pop-ups and Track mode sections; save tooling |
| 9a907ce | 2026-10-04 16:25 | Mockup: drop balance question; ask weekly spend only (B-16) |
| 3a5aa90 | 2026-10-04 16:30 | Mockup: plan and income are separate; Home Make a plan card; income split flow; plan offer after a week (B-17..B-20) |
| 3df7a1a | 2026-10-04 16:31 | Mockup: income split is a slider |
| ac3ed6c | 2026-10-04 16:34 | Mockup: income flow can continue into the plan (B-21) |
| ee1de4d | 2026-10-04 16:38 | Mockup: income date range calendar, several incomes feed one weekly plan (B-22, B-23) |
| 03174e6 | 2026-10-04 16:46 | Mockup: plan snaps to weeks; custom subscriptions with repeat detection, pause/remove; one-off money (B-24..B-28) |
| 240a628 | 2026-10-04 16:58 | Weekly budget validation memo; fix week count, calendar-month presets, plan-health lines, auto leftover to savings, subscription shortfall rule (B-29..B-33) |
| d47436f | 2026-10-04 17:12 | Mockup follows Figma look; income split by day mid-week; pace gradients; week review; bottom PIN keypad (B-34..B-38) |
| 33a7281 | 2026-10-04 17:24 | UPI onboarding offers balance split and duration; credits wait in Income; fix Pay rectangle; six-month demo account (B-39..B-42) |
| d053a83 | 2026-10-04 17:32 | Per-tab blurred colour system; income list with change end date; logic audit fixes (B-43, B-44) |
| 301c73c | 2026-10-04 17:42 | Insights: clear comparison, prominent finding, period navigation; searchable and custom categories (B-45..B-47) |
| 3d978b4 | 2026-10-04 18:05 | Figma export tooling: frames3, blur support, batch planner |
| b25d720 | 2026-10-04 19:00 | Home: left-this-week and box meaning, Make your plan opens income flow, category chips show x/+ (B-48..B-50) |
| 0a3311c | 2026-10-04 19:01 | Onboarding: move bill reminders/fingerprint to the end (B-51) |
| 1fd578a | 2026-10-04 19:04 | Onboarding: add/remove categories on the share screen (B-52) |
| 275b8b0 | 2026-10-04 19:20 | Figma export notes and frame names for the B-48..B-52 re-export |
| 37d1611 | 2026-10-05 11:24 | v15: audit of v14 information architecture, density budget, three-tab mockup (V15-1..V15-12) |
| 4657685 | 2026-10-05 11:41 | v15.1: Insights tab, grid teaching, one-off payments, restored functionality, hierarchy pass, logic fixes (V15-13..V15-18) |
| f4108c2 | 2026-10-05 11:47 | Insights: plain 'N spends this week' wording, row hint, fit controls |
| d82f511 | 2026-10-05 11:52 | v15.2: first-time tips (V15-19) |
| 745720b | 2026-10-05 12:07 | Insights: rupees only (V15-20) |
| c72d404 | 2026-10-05 12:09 | Fix startup error from rupees default (UI not yet created) |
| 18bff5e | 2026-10-06 05:16 | RESEARCH.md: research and decision record v1-v15, data requirements, diagnosis, research plan; restore V2/V3 decisions to the log |
| 1ed4218 | 2026-10-06 05:19 | RESEARCH.md: correct the claim about student contact (builds were shown to people informally; what is missing is a recorded test) |
| 224d924 | 2026-10-06 05:21 | RESEARCH.md: record that reviewers were mostly design students and how to weigh it |
| 84034f1 | 2026-10-06 05:24 | RESEARCH.md: separate reviewer feedback (too much, what do I look at, can't understand) from Tarun's own 'lost functionality' intuition |
| 7897163 | 2026-10-06 05:24 | RESEARCH.md: fix Part 0 attribution |


---

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
