# Trickle v12 — Phase 2c: Money visualization research

Goal: money that is easy to digest, low-anxiety, and makes "how much am I spending / losing" obvious — inside the locked tile ladder (crumb cup-fill <₹100 → tile ₹100 → pill ₹1,000 → block ₹10,000; tap zooms one level; one rule everywhere; glow only for time/position).

Sources: 39 (33 verified by opening the page, 6 UNVERIFIED). Methods: 20. Board: Phase 2c section.

## Three convergent rules
1. Show the whole, always — spent tiles stay as outlines (denominator neglect; Garcia-Retamero 2010).
2. Lead with what is left; no red, no alarm (ostrich effect; Olafsson & Pagel 2018; framing; Tversky & Kahneman 1981).
3. Translate into the student's own units with one perspective line (Barrio 2016; Riederer 2018).

## Annotated bibliography
Format: citation · URL · finding → design implication → Trickle application.

### Haroz et al. 2015
Haroz, Kosara & Franconeri. ISOTYPE Visualization: Working Memory, Performance, and Engagement with Pictographs. CHI 2015.  
https://eagereyes.org/publications/Haroz-CHI-2015
- Finding: Pictographs that ARE the data cause no performance cost and can help memory and engagement; decorative extra images distract.
- Implication: Every mark must be money; no decorative coins or mascots inside a chart.
- Trickle: The ₹100 tile is itself the datum, so it earns the Isotype benefit; keep illustrations out of tile areas.

### Park et al. 2018
Park, Drucker, Fernandez & Elmqvist. ATOM: A Grammar for Unit Visualizations. IEEE TVCG 24(12).  
https://www.microsoft.com/en-us/research/publication/atom-a-grammar-for-unit-visualizations/
- Finding: One mark per unit "minimizes the need for the user to consider data abstraction" and matches how novices build with physical tokens.
- Implication: Unit marks suit lay users; layouts can be recomposed (split, regroup) without changing the unit.
- Trickle: Tiles can regroup across Home/Spending/Income (split by jar, by day) and still be the same tiles.

### Neurath/Kinross 1995
Kinross, R. Archive: International Picture Language (Otto Neurath / Isotype). Eye no. 19, 1995.  
https://eyemagazine.com/feature/article/archive-international-picture-language
- Finding: Isotype rule: "in representing quantities, repeat a unit, don't enlarge it"; also "don't say more than you know".
- Implication: Never scale a single icon for size; repeat the unit.
- Trickle: Confirms the ladder: pills and blocks are merged repeats of tiles, never a bigger tile.

### Cleveland & McGill 1984
Cleveland & McGill. Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods. JASA 79(387).  
http://lenagroeger.s3.amazonaws.com/newschool/ClevelandMcGill.pdf
- Finding: Accuracy ranking: position on common scale > nonaligned position > length/direction/angle > area > volume/curvature > shading/saturation.
- Implication: Compare by aligned length/count, not area or colour intensity.
- Trickle: Align pills to a common left edge so comparisons are length on a common scale; never encode amount by colour depth.

### Kosara 2019
Kosara, R. Circular Part-to-Whole Charts Using the Area Visual Cue. EuroVis 2019 (short).  
https://media.eagereyes.org/papers/2019/Kosara-EuroVis-2019a.pdf
- Finding: Most area-based part-to-whole variants did worse than a pie; centred shapes hurt area judgement.
- Implication: Area alone is a weak cue; anchor parts to a shared edge.
- Trickle: Cup fill reads as a level from a shared floor (not a centred shrinking square) — keep it bottom-anchored.

### Redmond 2019
Redmond, S. Visual Cues in Estimation of Part-to-Whole Comparisons. arXiv:1908.00630.  
https://arxiv.org/pdf/1908.00630
- Finding: Bars with decile markers / scale beat plain bars for part-to-whole; pies have natural anchors at quarters.
- Implication: Visible reference marks (deciles) aid part-to-whole reading.
- Trickle: A pill is literally ten deciles; the gap after 5 tiles gives a halfway anchor.

### Garcia-Retamero et al. 2010
Garcia-Retamero, Galesic & Gigerenzer. Do Icon Arrays Help Reduce Denominator Neglect? Medical Decision Making 30(6).  
https://journals.sagepub.com/doi/10.1177/0272989X10369000
- Finding: People over-attend numerators; icon arrays showing the whole fix denominator neglect, for young and old.
- Implication: Always show the whole (budget/income) alongside the part.
- Trickle: Show spent tiles as outlines so ₹2,100 is always seen against ₹6,000.

### Garcia-Retamero & Cokely 2013
Garcia-Retamero & Cokely. Communicating Health Risks With Visual Aids. Current Directions in Psychological Science 22(5).  
https://journals.sagepub.com/doi/abs/10.1177/0963721413491570
- Finding: Well-designed visual aids are "highly effective, transparent, and ethically desirable", most for low-numeracy people.
- Implication: Visuals are a fairness tool, not decoration.
- Trickle: Tiles help the students who most avoid numbers; never hide them behind a toggle.

### Galesic et al. 2009 — UNVERIFIED
Galesic, Garcia-Retamero & Gigerenzer. Using Icon Arrays to Communicate Medical Risks: Overcoming Low Numeracy. Health Psychology 28(2).  
https://www.researchgate.net/publication/24205075_Using_Icon_Arrays_to_Communicate_Medical_Risks_Overcoming_Low_Numeracy
- Finding: (Abstract not opened — pages returned 403/429.) Widely cited for icon arrays improving accuracy for low-numeracy people.
- Implication: —
- Trickle: Supports M11; cite only alongside the verified 2010 paper.

### Gigerenzer & Hoffrage 1995
Gigerenzer & Hoffrage. How to Improve Bayesian Reasoning Without Instruction: Frequency Formats. Psychological Review 102(4).  
https://pages.ucsd.edu/~scoulson/203/GG_How_1995.pdf
- Finding: Natural frequencies roughly tripled correct reasoning (46–50% vs 16–28%) over probabilities.
- Implication: Say "3 of 10 days", not "30%".
- Trickle: Insights copy uses counts of days/tiles, never percentages.

### Kay et al. 2016
Kay, Kola, Hullman & Munson. When (ish) is My Bus? CHI 2016.  
https://www.mjskay.com/papers/chi_2016_uncertain_bus.pdf
- Finding: Quantile dotplots (~20 countable dots) beat density plots for lay mobile users; 100+ dots lose the benefit.
- Implication: Keep counts subitizable; under ~20 marks per glance.
- Trickle: Home cards stay under ~25 marks — pills keep ₹2,100 at 3 marks; a "usual week" range can be 20 dots.

### Barrio et al. 2016
Barrio, Goldstein & Hofman. Improving Comprehension of Numbers in the News. CHI 2016.  
https://www.microsoft.com/en-us/research/publication/improving-comprehension-of-numbers-in-the-news/
- Finding: Perspective sentences (ratios, ranks, unit changes) improved recall, estimation and error detection (n>3,200).
- Implication: Add one perspective clause to key numbers.
- Trickle: "₹2,100 — about a third of your month" under the Home tiles.

### Riederer et al. 2018
Riederer, Hofman & Goldstein. To Put That in Perspective. CHI 2018.  
https://www.dangoldstein.com/papers/Riederer_Hofman_Goldstein_Perspective_Analogies_CHI_2018.pdf
- Finding: Familiar references beat precise obscure ones; multipliers 1–10 (esp. 1, ½) work best; benefit lasts six weeks.
- Implication: Use the user's most familiar purchase as the unit and keep multipliers small.
- Trickle: Pick equivalents from the student's own frequent spends (their chai, their mess meal); prefer "2 dinners" over "0.17 of rent".

### Peters et al. 2006
Peters, Västfjäll, Slovic, Mertz, Mazzocco & Dickert. Numeracy and Decision Making. Psychological Science 17(5).  
https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01720.x
- Finding: Less numerate people are more swayed by framing and irrelevant affect.
- Implication: Framing choices matter most for the users who need help most.
- Trickle: Neutral, consistent frames (left / to go) protect low-numeracy students from alarm.

### Soman 2001
Soman, D. Effects of Payment Mechanism on Spending Behavior: The Role of Rehearsal and Immediacy of Payments. JCR 27(4).  
https://econpapers.repec.org/RePEc:oup:jconrs:v:27:y:2001:i:4:p:460-74
- Finding: Past payments curb later spending only when the amount is rehearsed and the wealth depletes immediately.
- Implication: Make the deduction immediate and visible at payment.
- Trickle: Pay moment (M2): tiles lift out of the balance the instant UPI confirms — rehearsal without a number to type.

### Knutson et al. 2007
Knutson, Rick, Wimmer, Prelec & Loewenstein. Neural Predictors of Purchases. Neuron 53(1).  
https://www.cmu.edu/dietrich/sds/docs/loewenstein/NeuralPredPuchase.pdf
- Finding: Excessive prices activated insula; price-period activity predicted purchase beyond self-report.
- Implication: Price salience at decision time is real and felt.
- Trickle: Show the tiles a spend will take before confirming (ghost tiles), not after.

### Prelec & Loewenstein 1998 — UNVERIFIED
Prelec & Loewenstein. The Red and the Black: Mental Accounting of Savings and Debt. Marketing Science 17(1). (Finding read via BehavioralEconomics.com summary.)  
https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/pain-of-paying/
- Finding: Pain of paying acts as self-regulation; less visible depletion (cards) dulls it.
- Implication: UPI is low-pain; the app can restore gentle visibility.
- Trickle: Tiles leaving = a soft pain-of-paying cue without red.

### Heath & Soll 1996
Heath & Soll. Mental Budgeting and Consumer Decisions. JCR 23(1).  
https://econpapers.repec.org/article/oupjconrs/v_3a23_3ay_3a1996_3ai_3a1_3ap_3a40-52.htm
- Finding: People set category budgets; budgets constrain category-typical purchases (sometimes under-consumption).
- Implication: Category jars work because people already think this way.
- Trickle: Jars as tile rows (M14); per-jar "left" is the main figure.

### Antonides et al. 2011
Antonides, de Groot & van Raaij. Mental Budgeting and the Management of Household Finance. J. Economic Psychology 32(4).  
https://ideas.repec.org/a/eee/joepsy/v32y2011i4p546-555.html
- Finding: Mental budgeters show better oversight of spending and accounts.
- Implication: Make budgeting the default mental model.
- Trickle: Supports jars and per-day allowance.

### Thaler 1999 — UNVERIFIED
Thaler, R. Mental Accounting Matters. J. Behavioral Decision Making 12(3).  
https://www.scienceopen.com/document?vid=c290009e-68a0-476a-b207-0875684e3c6c
- Finding: (Metadata verified; abstract not available on the page opened.) Foundational account of mental accounts.
- Implication: —
- Trickle: Background for jars.

### Olafsson & Pagel 2018
Olafsson & Pagel. The Ostrich in Us: Selective Attention to Financial Accounts, Income, Spending, and Liquidity. NBER WP 23945 (VoxEU column).  
https://cepr.org/voxeu/columns/ostrich-us-selective-attention-personal-finances
- Finding: People log in far less when balances are negative; logins jump when the balance turns positive.
- Implication: Bad-news screens drive avoidance; the app must stay safe to open.
- Trickle: Lead with what is left, not what is gone; no alarm colours on Home.

### Karlsson et al. 2009 — UNVERIFIED
Karlsson, Loewenstein & Seppi. The Ostrich Effect: Selective Attention to Information. J. Risk and Uncertainty 38(2).  
https://econpapers.repec.org/RePEc:kap:jrisku:v:38:y:2009:i:2:p:95-115
- Finding: (Not opened; search listing only.) Investors look up portfolios less in down markets.
- Implication: —
- Trickle: Corroborates Olafsson & Pagel.

### Tversky & Kahneman 1981
Tversky & Kahneman. The Framing of Decisions and the Psychology of Choice. Science 211(4481).  
https://eric.ed.gov/?id=EJ241077
- Finding: Same facts framed differently produce predictable preference shifts.
- Implication: Frame as remaining/gained, not lost.
- Trickle: "₹2,100 left", "₹3,840 to go" — never "you lost ₹3,900".

### Kivetz et al. 2006
Kivetz, Urminsky & Zheng. The Goal-Gradient Hypothesis Resurrected. J. Marketing Research 43(1).  
https://ideas.repec.org/p/feb/natura/00658.html
- Finding: Effort rises as the goal nears; illusory progress (bonus stamps) speeds completion.
- Implication: Show proportion remaining shrinking; start goals with visible progress.
- Trickle: Savings goal: outlined to-go tiles disappear; round-ups make first tiles fill fast.

### Hershfield et al. 2011
Hershfield, Goldstein, Sharpe, Fox, Yeykelsis, Carstensen & Bailenson. Increasing Saving Behavior Through Age-Progressed Renderings of the Future Self. JMR 48.  
https://www.halhershfield.com/research-blog/increasing-saving-behavior-through-age-progressed-renderings
- Finding: Seeing an aged future self increased preference for later rewards.
- Implication: Make the future concrete; students' horizon is weeks/months, not retirement.
- Trickle: Light version: the goal ETA dot on a month path ("you, in February, with ₹8,000").

### DeVoe & Pfeffer 2007 — UNVERIFIED
DeVoe & Pfeffer. When Time Is Money: The Effect of Hourly Payment on the Evaluation of Time. OBHDP 104(1).  
https://ideas.repec.org/a/eee/jobhdp/v104y2007i1p1-13.html
- Finding: (Metadata verified; no abstract on page.) Hourly pay makes people value time in money.
- Implication: Money-as-time framing is a real lens but cuts both ways.
- Trickle: Students rarely earn hourly; translate to "days of food money" instead of hours of work.

### Whillans et al. 2017
Whillans, Dunn, Smeets, Bekkers & Norton. Buying Time Promotes Happiness. PNAS 114(32).  
https://www.hbs.edu/faculty/Pages/item.aspx?num=52953
- Finding: Spending on time-saving purchases raised happiness more than material ones (n=6,271).
- Implication: Time is a meaningful unit for value judgements.
- Trickle: Support for days-based framing (M10) in the library, not Home.

### Li et al. 2010
Li, Dey & Forlizzi. A Stage-Based Model of Personal Informatics Systems. CHI 2010.  
https://ianli.owlstown.net/publications/17-a-stage-based-model-of-personal-informatics-systems
- Finding: Preparation → collection → integration → reflection → action; barriers cascade.
- Implication: UPI auto-collection removes the costliest stages; invest in reflection and action.
- Trickle: Every money view should end in a possible action (move tiles, lower a jar).

### Weiser & Brown 1995
Weiser & Brown. Designing Calm Technology. Xerox PARC.  
https://people.csail.mit.edu/rudolph/Teaching/weiser.pdf
- Finding: "Calm technology engages both the center and the periphery of our attention, and moves back and forth."
- Implication: Glanceable periphery, detail on demand.
- Trickle: Home = periphery (tiles + one word); tap-to-zoom = centre.

### Pousman et al. 2007 — UNVERIFIED
Pousman, Stasko & Mateas. Casual Information Visualization: Depictions of Data in Everyday Life. IEEE TVCG 13(6).  
https://dl.acm.org/doi/10.1109/TVCG.2007.70541
- Finding: (Not opened — 403.) Defines casual infovis for non-experts in everyday contexts.
- Implication: —
- Trickle: Background for ambient Home.

### Lan et al. 2023
Lan, Wu & Cao. Affective Visualization Design: Leveraging the Emotional Impact of Data. IEEE TVCG (VIS 2023). arXiv 2308.02831.  
https://arxiv.org/abs/2308.02831
- Finding: Review of 109 papers and 61 projects; emotion is a legitimate design target but the field lacks clear definitions.
- Implication: Design the feeling deliberately; it is part of the encoding.
- Trickle: Pick a single affect per surface: Home calm, Pay neutral, Savings warm.

### Kennedy & Hill 2018
Kennedy & Hill. The Feeling of Numbers: Emotions in Everyday Engagements with Data and Their Visualisation. Sociology 52(4).  
http://eprints.whiterose.ac.uk/106567/
- Finding: Emotions are "vital components of making sense of data" in everyday use.
- Implication: People feel numbers before they read them.
- Trickle: Red, shaking or alarm motion carries meaning beyond the amount; avoid.

### Boy et al. 2017
Boy, Pandey, Emerson, Satterthwaite, Nov & Bertini. Showing People Behind Data. CHI 2017.  
https://nyuscholars.nyu.edu/en/publications/showing-people-behind-data-does-anthropomorphizing-visualizations
- Finding: Anthropomorphic icons had no more effect on empathy than standard charts.
- Implication: Character icons do not add emotional power by themselves.
- Trickle: No cute coin characters inside tiles; save personality for copy and motion.

### YNAB 2016
Mecham, J. How Old Is Your Money? YNAB blog, 8 Jan 2016.  
https://www.ynab.com/blog/how-old-is-your-money
- Finding: Age of Money = days a rupee sits before use; higher means "your stress level will drop".
- Implication: Time-buffer metrics reframe money as calm runway.
- Trickle: Runway days (M9) as an Insights card.

### Monzo 2023
Monzo Community. "Left to spend" missing feature, Sep 2023.  
https://community.monzo.com/t/monzo-left-to-spend-missing-feature-old-monzo-design/153058
- Finding: Users missed "left to spend" and the "set to have £ left over" projection after its removal.
- Implication: Left-to-spend is a feature people notice when gone.
- Trickle: Leftover-first Home is validated by real use.

### Korostoff (n.d.)
Korostoff, M. Wealth, Shown to Scale (1-pixel-wealth).  
https://mkorostoff.github.io/1-pixel-wealth/
- Finding: Fixed unit ("10 px = $5M") plus relatable comparisons makes huge sums graspable.
- Implication: A fixed unit and familiar comparisons beat abstract numbers.
- Trickle: Same ₹100 tile everywhere + equivalents.

### Dear Data 2015
Lupi & Posavec. Dear Data (project site).  
http://www.dear-data.com/theproject
- Finding: Hand-drawn weekly personal data as "personal documentary"; slow, humane data.
- Implication: Personal data can be warm and reflective.
- Trickle: Weekly reflection card tone; tiles as a personal ledger, not a report.

### Fi Money 2026
ValueForStartups. Fi Money Investor Report 2026.  
https://valueforstartups.in/fi_money_investor_report
- Finding: FIT rules automated saving from behaviour; consumer app shut 11 Mar 2026.
- Implication: Rules-based nudges were a loved Indian pattern.
- Trickle: Rule-triggered tile moves (e.g. round-ups) fit Savings.

### Cleo (TME 2022)
TME.net. Cleo: The Budget Assistant App That 'Roasts' You. 2022, upd. 2023.  
https://tme.net/blog/cleo-budget-assistant-app/
- Finding: Opt-in "roast mode" shames spending with humour; default is not roast.
- Implication: Humour works only opt-in.
- Trickle: Avoid shame copy by default.

## Methods catalogue
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

## Top 8 to adopt in v12
1. M1 Leftover-first — Home hero, every jar.
2. M2 Pay moment tiles lift out — Pay confirmation (ghost tiles before confirm).
3. M3 Per-day allowance — Home second line.
4. M4 Crumbs stack into a tile — Spending (small-buy habit).
5. M5 Familiar equivalents from own spends — Spending detail, Insights.
6. M6 Goal saved/to-go — Savings.
7. M7 Income part-to-whole pills — Income.
8. M8 Ghost-of-last-week comparison — Insights "What changed".

Library (Insights, not default): M9 runway, M10 days-of-jar, M11 frequency format, M12 usual-week dots, M13 ETA path (glow OK — time), M14 jars side by side, M15 ratio line (also used on Home with M1), M16 ambient word.

## Avoid
- A1 Red for spent/over — triggers avoidance (ostrich effect), emotion overrides the number (Kennedy & Hill), and low-numeracy users are most swayed by affect (Peters 2006).
- A2 Enlarged icon for bigger amounts — breaks Isotype "repeat, don't enlarge" and area is poorly judged (Cleveland & McGill; Kosara 2019).
- A3 Shame/roast copy by default and "hours of work" for non-earners — Cleo keeps roast opt-in; students mostly have no hourly wage, so use days-of-jar instead.

## Questions for Tarun
| # | Question | Options | Recommended | Why |
|---|---|---|---|---|
| P2c-Q1 | What is the big number on Home? | A · ₹ left (₹2,100), tiles below / B · ₹ per day (₹175) / C · Runway days (6 days) | A | Left-to-spend is what people miss when gone (Monzo) and frames as remaining; per-day sits as the second line. |
| P2c-Q2 | How do spent rupees look? | A · Outlined empty tiles / B · Faded solid tiles / C · Removed entirely | A | Outlines keep the whole visible (denominator neglect) without red; removal hides the budget, fading reads as "still mine". |
| P2c-Q3 | Which equivalents unit? | A · From the student's own frequent spends (their chai, their meal) / B · Fixed staples (chai ₹25, thali ₹120) / C · No equivalents | A | Familiar references work best (Riederer 2018); fallback to B until two weeks of data exist. |
| P2c-Q4 | "You spent more than last week" — how loud? | A · Ghost of last week + hatched extra + one perspective sentence / B · Amber status chip / C · Only if asked in Insights | A | Shows the gap as countable tiles, no alarm hue; amber invites ostrich avoidance. |
| P2c-Q5 | Money-as-time framing? | A · Days of a jar ("1.2 days of food money") / B · Hours of work / C · None | A | Most students have no hourly wage; days-of-jar keeps the time lens without implying a job. Library only. |
