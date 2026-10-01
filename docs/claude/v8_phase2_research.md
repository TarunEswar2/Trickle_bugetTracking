# Trickle v8 — Phase 2: Research

Each principle: **evidence → design rule for Trickle → screen**. Hard constraint: no SMS tracking (UPI linkage or manual entry + import).
Note on sources: peer-reviewed papers are cited by author/year/venue; industry examples are product patterns, not evidence of effect.

## A. Principles

### 1. Ostrich effect (information avoidance)
- **Evidence:** Karlsson, Loewenstein & Seppi (2009, *J. Risk and Uncertainty*) — investors check portfolios more after market rises and less after falls. Sicherman, Loewenstein, Seppi & Utkus (2016, *Review of Financial Studies*, "Financial Attention") — in ~1.1M Vanguard accounts, logins drop after market declines. [RFS](https://academic.oup.com/rfs/article-abstract/29/4/863/1896505) · [CMU summary](https://www.cmu.edu/news/stories/archives/2015/december/ostrich-effect.html)
- **Rule:** Home never opens on a figure that can be bad. Pace is shown as an ambient colour (calm green / warm amber; never red). Deficits live only where they can be acted on.
- **Screen:** Home, app open, notifications.

### 2. Pain of paying / payment coupling
- **Evidence:** Prelec & Loewenstein (1998, *Marketing Science*, "The Red and the Black") — paying produces immediate pain that curbs consumption; decoupling payment from consumption weakens it. Raghubir & Srivastava (2008, *J. Exp. Psych: Applied*, "Monopoly Money") — people spend more with cards/gift cards than cash. [APA PDF](https://www.apa.org/pubs/journals/releases/xap143213.pdf). India: Dev et al. (2024, arXiv 2401.09937) survey — 74.2% of UPI users reported spending more after adopting UPI, citing reduced guilt vs cash. [arXiv](https://arxiv.org/html/2401.09937v3)
- **Rule:** Re-couple at the pay moment: one short pause screen showing the amount as a physical share of what's left this week (a jar visibly emptying) and what it means for the top goal in time ("≈ 1 day later for Goa"). One number (budget left) appears here by design.
- **Screen:** Pay → amount → pause → UPI handoff.

### 3. Commitment devices / pause before purchase
- **Evidence:** Ashraf, Karlan & Yin (2006, *QJE*) — a voluntary locked savings product (SEED) raised savings; people choose to bind themselves. "Cooling-off" and friction reduce impulse buying (Thaler & Sunstein, *Nudge*, 2008). Pattern: bank apps let users block categories or add delays (e.g. Monzo gambling block).
- **Rule:** User opts in once to "pause when I pay over ₹X or over my pace". The pause is 2–3 s, skippable, never a block. Optional "wait 10 minutes" reminder for large non-essential spends.
- **Screen:** Pay pause, Budget tab settings.

### 4. Mental accounting
- **Evidence:** Thaler (1985, *Marketing Science*; 1999, *J. Behavioral Decision Making*, "Mental Accounting Matters") — people treat money as non-fungible, labelled accounts; labels change spending. Monzo Pots / Salary Sorter and Jupiter Pots productise this. [Monzo Salary Sorter](https://monzo.com/blog/2019/09/26/introducing-salary-sorter-and-bills-pots)
- **Rule:** Only two top-level jars the user sees: **Spending** (fixed) and **Savings** (everything else). Goals are sub-jars inside Savings. Categories stay, but as a lens inside Budget, not as more jars to fund.
- **Screen:** income split, Budget, Savings.

### 5. Defaults and automation
- **Evidence:** Madrian & Shea (2001, *QJE*) — auto-enrolment raised 401(k) participation dramatically. Thaler & Benartzi (2004, *JPE*, "Save More Tomorrow") — pre-committed escalation raised savings rates from 3.5% to 13.6% over 40 months. Digit/Qapital/Plum automate small transfers by rule. [Qapital on IFTTT](https://ifttt.com/qapital)
- **Rule:** Income split is a default rule set once: budget is fixed; everything above it flows to savings (to the top goal) automatically, with a single "Got it" confirmation card and 1-tap undo. Month-end leftover also auto-flows. No "To assign" state by default.
- **Screen:** onboarding, income arrival, month-end.

### 6. Goal-gradient + endowed progress
- **Evidence:** Kivetz, Urminsky & Zheng (2006, *JMR*) — effort accelerates as people near a reward. Nunes & Drèze (2006, *JCR*) — a 10-stamp card with 2 pre-filled completed 34% vs 19% for an 8-stamp card with none.
- **Rule:** Savings visuals always show progress already made (never an empty bar); new goals start with the first auto-flow counted. Near the end, show "almost there" granularity (last 10% in finer steps).
- **Screen:** Home pinned goal, Savings.

### 7. Fresh-start effect
- **Evidence:** Dai, Milkman & Riis (2014, *Management Science*) — goal pursuit (gym visits, searches for "diet", commitments) spikes after temporal landmarks: new week, month, birthdays.
- **Rule:** Every week/month is a clean slate: amber never carries into a new week's glow; last week's overspend is described once as "next week starts ₹X lighter" on Budget only. Monday + 1st of month = the check-in moments.
- **Screen:** weekly check-in, month-end story.

### 8. Fogg Behavior Model (B = MAP)
- **Evidence:** Fogg (2009, *Persuasive Technology* conf.) — behaviour happens when motivation, ability and a prompt converge; raising ability (simplicity) is more reliable than raising motivation.
- **Rule:** Make the core actions tiny: pay is 1 tap from Home; logging cash is amount → done (category guessed); prompts piggyback on moments the user already has (paying, payday) rather than new nags.
- **Screen:** Home, Pay, Log spend, notifications.

### 9. Peak-end rule
- **Evidence:** Kahneman, Fredrickson, Schreiber & Redelmeier (1993, *Psychological Science*) — remembered experience is dominated by the peak and the end.
- **Rule:** Every flow ends on a savings/progress line (payConfirm: "Goa still 64% · on pace"), never on a remaining-budget figure. Month-end story ends on "saved this month".
- **Screen:** payConfirm, logSpend done, month-end.

### 10. Cognitive load + progressive disclosure
- **Evidence:** Sweller (1988, *Cognitive Science*) — working memory is limited; Miller (1956). NN/g, "Progressive Disclosure" (Nielsen, 2006) — show the few most important options first, defer the rest to secondary screens. [NN/g](https://www.nngroup.com/articles/progressive-disclosure/)
- **Rule:** One idea per screen section; numbers appear after a tap (tap-to-reveal on any visual). Insights board becomes 3 cards/week, full library behind "More".
- **Screen:** all.

### 11. Financial anxiety
- **Evidence:** Shapiro & Burchell (2012, *Int. J. Cognitive Therapy*, "Measuring Financial Anxiety") — financial anxiety predicts avoidance of financial information, like other anxieties. Archuleta et al. (2013, *J. Financial Counseling and Planning*) — financial anxiety common among college students. [ResearchGate](https://www.researchgate.net/publication/254734180_Measuring_Financial_Anxiety)
- **Rule:** Reduce uncertainty (one pace state, not three "left" numbers); use supportive, non-judgmental copy; never a count of problems. Show an explicit "you're okay" state.
- **Screen:** Home, Budget.

### 12. Calm technology / ambient displays
- **Evidence:** Weiser & Brown (1996, "Designing Calm Technology", *PowerGrid Journal*) — good tech moves between the periphery and centre of attention; the periphery informs without overburdening. Ambient Orb (Ambient Devices, 2002) conveyed stock/weather state by colour.
- **Rule:** Home background glow is the periphery channel: 2 states (green, amber), slow transition, readable in 0.5 s, with a one-line caption for accessibility (colour never the only cue).
- **Screen:** Home.

### 13. Colour and emotion (avoid red)
- **Evidence:** Elliot, Maier et al. (2007, *J. Exp. Psych: General*) — brief red exposure impaired performance and triggered avoidance motivation. Mehta & Zhu (2009, *Science*) — red evokes avoidance/vigilance, blue approach.
- **Rule:** No red on Home, pay pause, or Savings. Amber for "a bit fast"; red reserved (if at all) for errors (failed payment) and optional deep-dive charts on Budget.
- **Screen:** global palette.

### 14. Retention without gamification; streak critique
- **Evidence:** Streaks drive short-term return but a broken streak can trigger "what-the-hell" abandonment (Polivy & Herman's abstinence violation / "what-the-hell effect"; cf. Cochran & Tesser 1996). Commentary on "streak anxiety" (e.g. [Habit Doom](https://habitdoom.com/blog/streak-anxiety-habit-trackers)). Product patterns: Headspace (gentle daily reminders, "run streak" de-emphasised), Finch (self-care pet, forgiving), Monzo (instant spend notifications + pots), Cleo (conversational, candid tone), Qapital (rules), Digit (auto-save), Jupiter (pots), Plum (auto-save AI) — retention through automation and a sense of progress, not points.
- **Rule:** No streaks, points, badges or leaderboards. Retention comes from: savings growing on its own, a genuinely useful daily glance, and a weekly/month-end story. Missed days are invisible.
- **Screen:** all.

## B. Retention loop (no games)
```
 DAILY GLANCE ──► AT-PAYMENT MOMENT ──► (auto-save runs) ──► WEEKLY CHECK-IN ──► MONTH-END STORY ──┐
   calm glow        pause: cost as        income & leftover      Mon: 3 cards          1st: "you saved ₹X"   │
   1 goal visual    share of week +       flow to savings        "small things added   fresh start, goal   │
   0 numbers        goal-time; 1 number   (1 confirm card)        up to…" 1 tip        moved closer          │
   ◄───────────────────────────────────────────────────────────────────────────────────────────────────────┘
```
- **Trigger:** paying (existing habit), payday, Monday, 1st of month. Notifications only for: income sorted, weekly check-in ready, month-end story. Never "you overspent".
- **Action:** tiny (glance, pay, "Got it").
- **Reward:** savings visibly rises (variable but real; not points).
- **Investment:** goals created, rules set, habits named — reasons to return.

## C. Design rules for v8
1. **Home shows 0 money figures by default** (max 1: the top goal %); pace is colour + one plain sentence.
2. **Never red on Home, Pay pause, or Savings.** Green = on pace, amber = a bit fast.
3. **Numbers appear only after a tap, at payment, or on the Budget tab.** Every visual reveals its value on tap.
4. **The budget number appears exactly twice in the app:** the pay pause and the Budget tab.
5. **Every flow ends on savings progress**, not on what's left.
6. **Two jars only:** Spending (fixed) and Savings (the rest, auto). Goals live inside Savings.
7. **Income is split by rule, confirmed with one card** ("₹8,000 in → Spending topped up · ₹1,200 to Goa"), with undo. No "To assign".
8. **At most one prompt on Home**; the rest wait in Actions with no badge count.
9. **Max 3 cards per Insights week view**; full widget library behind "More".
10. **Categories are guessed; the user corrects, never chooses from scratch.**
11. **No streaks, points, badges, or leaderboards.** Missed days leave no trace.
12. **Plain-language labels** replace jargon:
    | v7 | v8 |
    |---|---|
    | To assign | New money (auto-sorted) |
    | Pools | Spending · Savings |
    | Transfer / Move money | Move to savings / Take from savings |
    | Sweep | Month-end top-up |
    | Cover / let it go over | Use from… / Borrow from next week |
    | Carried from Aug | Next month starts a little lighter |
    | Settle / IOU | Paid back · Friends owe you |
    | Safe to spend / runway | Pace |

## D. Open questions for Tarun
1. **Pace period:** should the Home glow track pace against the week or the month? (Weekly is kinder and gives more fresh starts; monthly matches allowance timing.)
2. **Where does balance/income live** — inside Budget, inside Savings, or a small "Money" view in the drawer?
3. **Overspend beyond budget:** when the budget is empty, should the pause screen offer "Take from savings" at all, or only "Borrow from next week" (protecting savings as the motivator)?
4. **Pay pause strength:** always shown, only over a threshold (e.g. ₹200), or only when pace is amber?
5. **Irregular income** (part-time, gifts): does all of it go to savings by rule, or should part-time pay top up the budget first?
6. **Splits and IOUs:** keep them as a full feature behind Actions, or reduce to "Friends owe you" with a single Remind?
