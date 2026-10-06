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
