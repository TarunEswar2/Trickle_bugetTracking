# Trickle — Project Master Synthesis

Compiled 2 Oct 2026 from all 70 docs in the Student_Budget_Management project, read oldest to newest (`claude/updated_feature_priority_list.md`, 10 Sep, through `claude/v13_decisions.md`, 2 Oct). Each point names its source doc. Tags: **[P]** primary research, **[S-V]** verified secondary source, **[S-U]** unverified secondary source, **[T]** Tarun's explicit statement or decision, **[C]** Claude's inference or proposal.

---

## 1. Primary research

### 1.1 What exists in the project, and what doesn't
- The raw interview transcripts, the survey data and the Bryman-style coding/analysis **are not in the project**. All primary findings below are second-hand: summaries written into `claude/updated_feature_priority_list.md` (10 Sep) and restated in `claude/build_plan.md`. Nothing can be re-checked against source.
- Six interviews: Tarun (himself), Nishad, Yash, Gautham, Harsh, Vaishak, plus a survey (sample size and questions not recorded). (`updated_feature_priority_list.md`)
- Vaishak's transcript was only partly coded (about 11 statements). His remarks on monthly category allocation, pre-payment friction and privacy were added later by hand. (`updated_feature_priority_list.md`, "Open Item")
- No usability test, tile test or 5-second test with real people has ever been run. Every later "validation" doc is scripted or simulated (`v11_phase3_test.md`, `v11_phase11_validation.md` "S1, S2, S13 need people", `v12_phase11_handoff.md`).

### 1.2 Findings, with who and how strong
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

### 1.3 The research conclusion as originally stated
"Spending is easy → tracking is difficult → awareness comes late." The app's job "is not to tell students to spend less. It's to close the gap between the moment of payment and the moment of realization." Loop: **Automatic tracking → Spending visibility → Accumulation → Purpose → Decision.** (`updated_feature_priority_list.md`, Core Design Direction)

### 1.4 Things later docs present as user facts but which have no primary source
- User profile "18–24, ₹3k–15k/month, money-anxious, allowance sometimes late" (`v11_phase0_brief.md`). Not traceable to interviews.
- "Reviews": "too much information, I don't know what I'm looking at", "every screen is numbers", "panic on open → quit" (`v8_phase_plan.md`, `v8_phase1_audit.md`). The docs never say who the reviewers were or how many. Treat as Tarun's or reviewers' feedback on the v7 prototype, not as research.
- "Shapes are not working" on v10 is Tarun's own judgement (`v11_phase_plan.md`, `v11_phase1_audit.md`).

---

## 2. Secondary research

### 2.1 Peer-reviewed or verifiable (status as given in the docs)
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

### 2.2 Unverified or marketing-grade claims
- "~67% quit budgeting apps within 30 days" and "68% never finish signup": blog statistics, **not verified**, explicitly not to be cited as fact (`secondary_research_report.md` §6, §7.3; `v11_phase1_audit.md`).
- "Latte factor": popular-finance term, **no academic construct**. Small-purchase accumulation is confirmed white space in shipped products and literature (`secondary_research_report.md` §3, §7.4).
- Budgeting-app "selling stress data" story: a single news-aggregator link, low quality (`secondary_research_report.md`).

### 2.3 Competitive and product findings
- India already has auto-tracking (Jupiter, Money View, INDmoney, Walnut, CRED via Account Aggregator). Automatic tracking alone is not a differentiator. Differentiation must come from small-purchase accumulation, non-guilt tone and local-first privacy (`secondary_research_report.md` §1; `v6_phase2_catalogue.md`).
- **UPI payments happen inside GPay/PhonePe, so a true pre-payment interstitial may not be technically possible**; likely needs a widget or notification (`secondary_research_report.md` §5; `screens_to_design.md` §6). Later versions assumed Trickle itself starts the payment and hands off to the UPI app; this was never re-examined.
- Mint shutdown (users valued auto-categorisation; complained of miscategorisation): design for easy correction. PocketGuard "safe to spend" is the best non-punitive alert reference. Rocket Money: auto-detect subscriptions, then confirm. Goodbudget redesign: what not to do (`secondary_research_report.md`).
- YNAB/Goodbudget: income lands in "ready to assign" and is split; Monarch: one flex number; Jupiter Pots: under 30 s setup, users asked for a self-lock; Fi FIT rules: rule-based auto-saving (Fi consumer app shut 11 Mar 2026) (`v7_phase2_catalogue.md`, `v12_phase2c`).
- Monzo users missed "left to spend" when it was removed: leftover-first is a feature people notice when gone (`v12_phase2c`).
- Cleo keeps "roast mode" opt-in; shame copy is not a default (`v12_phase2c`).
- Data Viz Catalogue: radial bars mislead (outer rings look longer) (`v6_phase2_catalogue.md`).

### 2.4 What the secondary research implies, net
1. Pain of paying and the tracking-vs-budgeting gap are solid. 2. Ostrich effect, mental accounting, defaults and goal gradient are solid and drove most good later decisions. 3. Unit charts and icon arrays are well supported, **but only with a fixed, known unit and ≲20–25 marks**. 4. No-red, no-streak and calm-tech rules are cheap, sensible and weakly evidenced; keep them but don't call them proven. 5. The pre-payment moment is technically constrained on UPI.

---

## 3. Original intent

### 3.1 Core thesis
Close the gap between the moment of payment and the moment of realisation, without guilt or blocking friction. Not "spend less" (`updated_feature_priority_list.md`; `build_plan.md` closing line). Every feature should be "traceable back to something a specific participant said" (`build_plan.md`).

### 3.2 Original feature priority list (10 Sep)
- **Very High (core):** 1 Automatic transaction tracking · 2 Daily and weekly spending overview · 3 Category-wise spending · 4 Small-purchase accumulation (the differentiator).
- **High:** 5 Pre-spending awareness (Vaishak's payment-moment check) · 6 Gentle, non-blocking alerts · 7 Purpose-based funds (evidence caveat) · 8 Savings goals (evidence caveat).
- **Medium:** 9 Subscription/recurring detection · 10 Spending behaviour insights.
- Open item: privacy/local-only not yet in the list. (`updated_feature_priority_list.md`)

### 3.3 Original screens and onboarding (20–22 Sep)
- Onboarding: 1–2 welcome screens, category setup, permission rationale shown just before the system dialog, denied-permission fallback into manual entry. (Written for SMS; SMS was then dropped.) (`screens_to_design.md`)
- Home: today's spend, week's spend, amount "remaining", empty state, and a remaining-vs-spent toggle to test. Categories with drill-down and edit. Accumulation view and detail ("Coffee — ₹40 today, ₹240 this week across 6 purchases"). Pre-pay interstitial plus a widget/notification fallback. Alerts with tone settings. Funds, goals (incl. celebration), subscriptions with confirm step, insights feed. Settings stating local-only data. (`screens_to_design.md`, `mockup_screen_plan.md`)
- Gap analysis on the first lo-fi Figma build ("Trickle Onboarding" artifact): accumulation view missing entirely; no transaction list; remaining-vs-spent toggle missing. Suggested order: accumulation → transactions → permission rationale → pre-spend → rest (`feature_gap_analysis.md`).

### 3.4 Original prototype-phase plan and validation questions (`build_plan.md`)
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

## 4. Tarun's stated decisions and values, chronological

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

## 5. Version history v2 → v13

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

## 6. What worked, what failed, and why it drifted

### 6.1 What worked repeatedly
- **No SMS, UPI link or manual** — held from v2 to v13 without regression.
- **No budget number on Home + glow/word pace** (v8 on). Directly answers the ostrich effect and the "panic on open" feedback.
- **One decision per screen with a default preselected** (v8 on).
- **Payment visibly leaving a category** (v2 friction sheet → v8 tiles → v12 hourglass). This is the one through-line from Vaishak's quote to the latest build.
- **Shared seeded ledger with invariants** (v2 store, v7 invariant). Made every prototype internally consistent.
- **Repeat buys / accumulation**, once built (v9 on), with neutral "3rd chai this week" copy.
- **Subscriptions as a fixed, held chunk** (Nishad's Coursera story).
- **Owed to you outside the balance** (v7 on).

### 6.2 What failed repeatedly
- **Visual breadth as a goal.** v4–v7 added chart forms and widgets each round (17 forms, ~45 charts, 44 widgets). Each was reversed.
- **Unit instability.** Tiles meant four things (v8), then an adaptive ladder (v9), then six shapes (v10), then fixed squares (v11), then dots with pills/blocks (v12). Every change was re-learning.
- **Accounting models in the UI** (v7 pools, To assign, sweeps, covers, inbox). Correct, unfamiliar.
- **Simplify, then re-expand.** v8 and v11 cut hard; v9 and v12 restored breadth (20 widgets; 75 frames, 31 insights).
- **Validation by script only.** Every "PASS" since v2 checks rules Claude wrote (numbers per screen, red pixels, taps), not whether students understand or keep using it.

### 6.3 Root causes of drift
1. **The testing gates in `build_plan.md` were skipped.** No Phase 1 user test, no Phase 2 test, no tile test with people. Without user evidence, each version answered the previous version's critique instead of the research.
2. **Reference-driven iteration.** Crypto dashboards, infographic sheets, fitness and telecom apps, "Zentra" onboarding: direction often came from the look of a reference rather than a research finding.
3. **Process inflation.** 5-, 6- and 12-phase plans, decision boards and ~60 decisions in a day. The process produced decisions faster than any could be tested, and Tarun mostly accepted recommendations.
4. **Feature scope moved away from evidence.** Income, pools, transfers, sweeps, splits, widget boards, Sankey and sound have little or no primary support. Weakly evidenced items (funds, goals) became the backbone ("savings motivates") while the strongest finding (small-purchase accumulation) was missing until v9 and then redefined.
5. **The core question was answered by literature, not users.** "Remaining vs spent" and "what does a student want on Home" were settled by papers and Claude's recommendation.
6. **Unchecked premise:** that Trickle initiates UPI payments (Scan / Pay buttons, hand-off). The research flagged that payment happens inside other UPI apps; this was never revisited.
7. **Delegation at the end.** v13 is entirely Claude's decisions on Tarun's request.

---

## 7. Open questions and never-tested hypotheses

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

## 8. Facts to build on

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
