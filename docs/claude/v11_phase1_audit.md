# Trickle v11 — Phase 1: Audit of v2 → v10 and all research

Sources: 16 builds opened in Playwright (412×860; v6+ via #demo), 38 screenshots in `scratchpad/v11/audit_shots/`; all 35 project docs read. Constraint check: early docs (secondary_research_report, feature_gap_analysis, screens_to_design, mockup_screen_plan, build_plan) assume **SMS parsing / READ_SMS**; `trickle-onboarding.html` still has a "Read your transaction SMS?" screen. That premise was **reversed** at v2 (UPI link or manual only) and must never return. Explorations-2 had "auto-detect from GPay / notification access" copy — also dropped (v7).

## 1. Timeline v2 → v10
| Ver | Concept | Trigger for next change |
|---|---|---|
| Lo-fi onboarding | Figma lo-fi, SMS rationale, funds, pre-pay interstitial | SMS dropped; rebuild from Figma |
| v2 (+dark A/B/C) | 5 tabs, text stats (weekly/daily/balance), 8 text insight cards, friction sheet | "text-heavy, reads like a form" (brief v3) |
| Explorations 1–2 (A–C, D–I) | 3 dark directions; 6 IA concepts (Envelope, Pulse, Ledger, Timeline, Forecast, Split) | exploration only; notification-access copy flagged |
| Visual redesign | metaphor per screen (gauge, road, mountain, iceberg, conveyor, coin stack, treemap) | brief v3: "too many one-off metaphors" |
| v3 | dark stat-card system, 5 reusable components, heatmap, dot-matrix | "push everything to be visual" |
| v4 | sparklines, area+projection, MoM, 68-day seed | "more visual" |
| v5 | 17 chart forms, 16 insight cards | v6 audit: 60% frames chartless, duplicates, radar/bubble bugs |
| v6 | every frame visual, 45 charts, radial arcs, onboarding allocation pie | user wants income/pools/balance |
| v7 | To assign → Budget + Savings pools, 44 widgets, inbox, covers, splits, ledger invariant | "too much information, every screen is numbers, panic on open" (Home 75 numbers, >900 app-wide) |
| v8 | calm reframe: 4 tabs, glow pace, no budget on Home, tiles, one choice/step | tiles had 3 units, only 2/9 widgets labelled; lost v7 range/flow |
| v9 | adaptive tile ladder ₹10–2,500 with keys, 20 widgets, Sankey, repeat buys, sound, B&W | unit changes per card → still hard to read |
| v10 | 6-shape denomination ladder (dot ₹10 … star ₹5,000), mixed piles, breaking change | **"shapes are not working"** |

## 2. Per version (diverge)
**Lo-fi onboarding** — + covered every feature on paper (funds, alerts, pre-pay widget). − SMS premise; grey wireframes; Home had 5 numbers. Reversed: SMS → UPI/manual.
**v2 / dark A–C** — + one shared seeded store; friction sheet at pay; accumulation list; working flows. − label:value lists, 8 identical text cards, balance + weekly + daily numbers on Home. Dark A–C only re-tokened.
**Explorations** — + wide IA range; Pulse's single "₹1,610 remaining" hero; Split owe-list; Timeline stream. − each a separate app; notification-access copy. Kept: pace idea, envelopes → categories.
**Visual redesign** — + first truly visual attempt; goal climb emotional. − bespoke metaphor per screen, low data density, nothing learnable. Reversed in v3.
**v3** — + small repeated vocabulary (stat triad, segmented bar, dot-matrix, heatmap, pill); subs on Home. − still numeric-first (Home 3-number triad + balance).
**v4** — + real MoM, goal projection. − density up, no simplification.
**v5** — + honest fit/no-fit plan per chart. − 17 forms; radar, bubble overlap, scatter; 16 flat cards; "chart library" not product.
**v6** — + onboarding visual, tooltips everywhere, validated palette, rich seed. − ~45 charts; duplicates; status red; radial arcs mislead (outer rings longer).
**v7** — + real money model, ledger invariant, splits/IOU, subscriptions, widget pinning. − Home 75 numbers, red "Carried −₹240", "5 things need you" badge, 4-option cover sheet (29 numbers), 7-slider allocation (54 numbers), jargon (To assign, sweep, cover, pools). Triggered v8's reframe.
**v8** — + best UX principles: no budget on Home, glow + word, one choice per step, pay tiles pop out, auto income split + undo, goal waffle, story, no red, no streaks. − ₹100/₹500/1%/count units mixed and unlabelled; 120-tile grids; bar widgets break tile language; dropped range/flow.
**v9** — + a key on every card, caps, repeat buys (3× in 30 days) pinned, Sankey, sound, B&W, dot-matrix month. − **adaptive unit** means a tile is ₹50 on one card and ₹250 on the next: the reader must read the key every time, defeating glance. 20 widgets again.
**v10** — + clean glyph craft, logo B, splash, B&W-safe. − 6 denominations to memorise, greedy mixed piles need mental arithmetic, "breaking change" animation is clever but slow, partial glyph clipping; tile ≠ amount at a glance. **Rejected by Tarun.**

## 3. Research audit
| Claim / principle | Source | Verified? | Verdict |
|---|---|---|---|
| Pain of paying; cashless raises spend | Prelec & Loewenstein 1998; Soman 2003; Raghubir & Srivastava 2008; cashless meta-analysis 2024 | peer-reviewed | **Held up** (effect modest but robust) |
| UPI users spend more | Dev et al. 2024 arXiv (74.2% self-report); CHI EA '24 | preprint/extended abstract, self-report | **Weak-moderate**; use as context |
| Apps track well, budget poorly | BCS HCI 2023 | peer-reviewed | **Held up**; core thesis |
| 67% quit in 30 days | SpendTrak/Strategia-X blogs | unverified | **Weak**; don't cite as fact |
| Manual tracking kills retention → SMS auto-tracking | blogs + interviews | partial | **Contradicted by constraint**; answer is UPI link + 2-tap manual |
| Ostrich effect | Karlsson et al. 2009; Sicherman et al. 2016 RFS | peer-reviewed | **Held up**; drove "no budget on Home" |
| Mental accounting / jars | Thaler 1985/1999 | peer-reviewed | **Held up**; matches confirmed model |
| Defaults / automation | Madrian & Shea 2001; Thaler & Benartzi 2004 | peer-reviewed | **Held up**; auto-split, suggested budget |
| Goal gradient, endowed progress | Kivetz et al. 2006; Nunes & Drèze 2006 | peer-reviewed | **Held up** |
| Fresh start | Dai, Milkman & Riis 2014 | peer-reviewed | **Held up**; weekly/monthly reset |
| Peak-end | Kahneman et al. 1993 | peer-reviewed (pain context) | **Plausible transfer**; end on savings |
| Cognitive load / progressive disclosure | Sweller 1988; Miller 1956; NN/g | peer-reviewed + practice | **Held up; under-applied until v8** |
| Red → avoidance | Elliot et al. 2007; Mehta & Zhu 2009 | peer-reviewed, replication mixed | **Moderate**; keep no-red as low-cost rule |
| Streaks cause what-the-hell drop-off | Polivy & Herman; commentary | indirect | **Weak but safe**; no streaks |
| Financial anxiety → avoidance | Shapiro & Burchell 2012; Archuleta 2013 | peer-reviewed | **Held up** |
| Calm tech / ambient display | Weiser & Brown 1996 | essay | **Design principle**, not evidence; glow is fine |
| Guilt framing backfires | NN/G tone; Lee SSRN | practice + working paper | **Moderate** |
| Small-purchase accumulation is white space | secondary report | search-based | **Held up** (no prior art) — differentiator |
| Isotype/unit charts readable | (Phase 2 to research) | — | **Unverified**; Phase 2/3 must test |
| Radial bars mislead | Data Viz Catalogue | practice | **Held up**; dropped |
| Denomination shapes learnable | none (v10 assumption) | none | **Contradicted** by Tarun's test |
| Adaptive units readable | none (v9 assumption) | none | **Contradicted** in use (key must be read each time) |

## 4. Recurring root causes of dissatisfaction
1. **Every fix added a new thing to learn** (chart forms → widgets → tile units → shapes). Visual ≠ simple; a visual still costs learning.
2. **Unit instability.** Tiles meant ₹100, ₹500, 1%, a count, then an adaptive ₹10–2,500, then 6 shapes. The eye can never trust a tile.
3. **Numbers-first defaults.** Balance, safe-to-spend, "left" appeared on Home in v2–v7 → anxiety and avoidance.
4. **Decision load.** Allocation sliders, cover sheets with 4 options, inbox items, sweep Auto/Manual, widget curation.
5. **Breadth over depth.** 44 widgets / 20 widgets / 17 forms; the core loop (pay, glance, income, save) got less polish than the long tail.
6. **Debt/alarm framing** (red, "carried", "over").
7. **Designer logic over user logic** (To assign, pools, sweeps, breaking change) — correct accounting, unfamiliar language.

## 5. Decision log (converge)
### KEEP
| Item | Reason | From |
|---|---|---|
| No budget number on Home; pace = glow + word | ostrich effect; fixed the panic complaint | v8 |
| One decision per screen, default preselected | Fogg ability; tedium complaint | v8 |
| Pay: category tiles, payment tiles leave | cash-like friction without a timed pause | v8/v9 |
| Income auto-split, one confirm + undo | defaults; no "To assign" chore | v8 |
| Money tab accordion Income / Budget / Savings | maps 1:1 to confirmed model | v8 |
| Goal waffle 10×10 with head start | goal gradient + endowed progress | v8 |
| Repeat buys (3× in 30 days), pay-moment line "3rd time…" | differentiator, neutral tone | v9 |
| Weekly check-in + period story ending "You saved ₹X" | fresh start, peak-end, return triggers | v8/v9 |
| Key on every visual + exact ₹ on tap | legibility, progressive disclosure | v9 |
| Ledger invariant validator | trustworthy numbers | v7 |
| Subscriptions as fixed chunk with due ring | vivid pain point (Coursera) | v3/v9 |
| Plain-language glossary (New money, Savings, "starts a little lighter") | anxiety, jargon | v8 |
| Soft sound (mutable), reduced motion, B&W with pattern | delight + accessibility | v9 |
| Splits → "Friends owe you", outside balance | real student need | v7/v8 |
| Tabs Home · Money · Actions · Insights + drawer | fewer tabs, proven | v8 |
| Seeded deterministic data with repeat habits | demos read true | v6/v9 |
| Local-first/privacy line | trust (Vaishak) | v2 |
### DROP
| Item | Reason |
|---|---|
| Adaptive unit ladder (v9) | unit changes per card; can't glance |
| Shape denominations & mixed piles, breaking change (v10) | rejected; arithmetic in the head |
| Sankey as a main view | powerful but dense; at most one Insights deep view |
| 20-widget board as default | breadth; keep ≤3 visible + library |
| Spend range / 24h ring / weekday / purchase-size widgets on default board | low value per learning cost; library only |
| Actions inbox with many cards | to-do list about money |
| Leftover Auto/Manual choice | extra decision; default auto to savings |
| Balance as headline on Money | a number users don't act on; tap to reveal |
| Onboarding allocation pie + sliders | 54 numbers |
| Period strip of 30 tiles | one fact, 30 marks |
### NEVER AGAIN
1. More than **one** tile unit app-wide, or a unit that changes by card.
2. Shape/denomination systems that need memorising.
3. A new metaphor per screen (road, mountain, iceberg, conveyor, jars + orbs + tiles mixed).
4. Budget / safe-to-spend / balance numbers on Home.
5. Red deficits and debt words ("carried", "over budget", "cover", slip markers).
6. >2 numbers on a screen's first view; stat triads.
7. Badge counts / "N things need you".
8. Multi-slider allocation or multi-option cover sheets.
9. Chart-library breadth (radar, bubble, scatter, radial arcs, 2-slice donut).
10. Streaks, points, badges.
11. SMS or notification-scraping copy or logic.
12. Accounting jargon (To assign, pools, sweep, invariant) in UI.

## 6. Implications for Phase 2
The tile must be a **fixed, round, memorable value** (candidates: ₹100 always; 1 tile = 1 day of budget; ₹50) with a single key taught once, and large totals handled by **grouping (rows of 10)** rather than bigger units or shapes. Test comprehension (S1, S2) before building anything.
