# Trickle v12 — Decisions log

Format: one row per decision. Status: open / decided / changed. Record Tarun's answer verbatim where possible.

STATUS (1 Oct): PAUSED after Phase 2b at Tarun's request — he is doing his own concept sketches before Phase 3. Phase 2c (money visualization research) added as research only; its questions are open.

## Phase 1 — Recovery audit
Source: claude/v12_phase1_recovery.md · Board: "Trickle v12 — Decision Board", Phase 1 section. Tarun answered 2026-10-01; his answers replace the original Q1–Q6 framing (5 tabs instead of Money/Insights only).

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| D1 | Tab structure | (new, from Tarun) | — | 5 tabs: Home · Income · Spending · Savings · Insights | decided | 2026-10-01 |
| Q1 | Where does the All spends list live? | A: Money › All spends / B: Inside each jar / C: Search from Insights | A | Spending tab holds the All spends list (filters + spend detail) | decided (changed: Spending, not Money) | 2026-10-01 |
| Q6 | Should one "for you" card return? | A: max one card on Home / B: notifications only / C: No | A | Replaced: Home bell = activity log of every action (income split, sweeps, subscriptions paid, moves, splits); the few items needing action sit at the top; soft dot, no count badge | decided (changed) | 2026-10-01 |
| D2 | Tab onboarding | (new, from Tarun) | — | Every tab has a one-page intro: shown on first visit, reopenable via a small "?" | decided | 2026-10-01 |
| Q2 | "Next money in" card on Home? | A: Yes, default, no ₹ / B: Library / C: No | A | A — default Home card, no ₹ | decided | 2026-10-01 |
| Q3 | How do comparisons return? | A: One "What changed" card / B: Three cards / C: Out | A | A — one "What changed" card in Insights; month-by-month one tap deeper | decided | 2026-10-01 |
| Q5 | Do deep views (Sankey, spend range, time of day) return? | A: Insights library / B: Sankey only / C: No | A | A — Insights library, not default | decided | 2026-10-01 |
| Q4 | How much editing comes back? | A: Full / B: Jar amounts / C: None | A | A, extended: jars, budgets, period, savings share, subscriptions, UPI IDs — each in its own tab's settings, one decision per screen | decided | 2026-10-01 |
| D3 | MUST / NICE / NO list | accept / adjust | accept | Accepted as recommended, with depth, remapped onto the 5 tabs (see remap in v12_phase1_recovery.md) | decided | 2026-10-01 |

## Phase 2 — Tile exploration
Source: claude/v12_phase2_tiles.md

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2-Q1 | Which tile form should v12 use? | A: Merging rows (G5) / B: Dot-matrix glow (G1) everywhere / C: Keep v11 grid (F) | A | Tile = ₹100, consistent everywhere; no 500 tiles for ₹50,000 and no tenth-of-a-tile for ₹10 → resolved in Phase 2b | decided via P2b | 2026-10-01 |
| P2-Q2 | How do large amounts collapse? | A: pills then ₹10,000 blocks / B: number above 100 tiles / C: proportion strip | A | A — pills, then ₹10,000 blocks | decided | 2026-10-01 |
| P2-Q3 | Where does the dot-matrix glow belong? | A: Only time/position views / B: As money tile / C: Nowhere | A | A — glow only on time/position views | decided | 2026-10-01 |
| P2-Q4 | Which density levels should ship? | A: Size follows surface / B: User setting / C: One size | A | | open | |
| P2-Q5 | Key style? | A: once per screen + tab intro / B: every card / C: onboarding only | A | A — key once per screen + tab intro | decided | 2026-10-01 |

## Phase 2b — Tile resolution (the core of the app)
Source: claude/v12_phase2b_resolution.md · Board: Phase 2b section (14 systems × 12 scenarios + Try-it playground)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2b-Q1 | Which resolution system? | A: Hybrid — crumb→tile→pill→block ladder (₹<100 / ₹100 / ₹1,000 / ₹10,000), cup-fill remainder, snap motion, tap to zoom / B: Crumb dots / C: Zoom-first / D: Rounded | A | A — Hybrid | decided | 2026-10-01 |
| P2b-Q2 | How do amounts below ₹100 look? | A: Cup fill / B: ₹25 quarters / C: fixed crumb, exact on tap | A | A — Cup fill | decided | 2026-10-01 |
| P2b-Q3 | What does tapping a tile visual do? | A: Zoom one level (block → pills → tiles → exact ₹) / B: ₹ tooltip / C: Nothing | A | A — Zoom one level | decided | 2026-10-01 |
| P2b-Q4 | One rule everywhere or round Savings/Income? | A: One rule / B: Round | A | A — One rule everywhere | decided | 2026-10-01 |

Note: cup fill shows small amounts as a partly filled tile; Tarun earlier said he didn't want "one tenth of a tile" for ₹10 — he chose cup fill knowingly after seeing the renders. Revisit if his sketches suggest otherwise.

## Phase 2c — Money visualization research
Source: claude/v12_phase2c_money_viz_research.md · Board: Phase 2c section (20 methods drawn on the tile ladder, 39 source cards)

| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|
| P2c-Q1 | Big number on Home? | A: ₹ left / B: ₹ per day / C: runway days | A (per-day as second line) | | open | |
| P2c-Q2 | How do spent rupees look? | A: outlined empty tiles / B: faded solid / C: removed | A | | open | |
| P2c-Q3 | Equivalents unit? | A: own frequent spends / B: fixed staples / C: none | A (B until 2 weeks of data) | | open | |
| P2c-Q4 | "Spent more than last week" loudness? | A: ghost + hatched extra + sentence / B: amber chip / C: Insights only | A | | open | |
| P2c-Q5 | Money-as-time? | A: days of a jar / B: hours of work / C: none | A (library only) | | open | |

## Phase 3 — Insight & visualization library
| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|

## Phase 4 — Information architecture
| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|

## Phase 5 — Core flows
| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|

## Phase 6 — Visual identity
| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|

## Phase 7 — Retention & emotional design
| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|

## Phase 8 — Build plan
| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|

## Phase 12 — Sounds & animations
| # | Question | Options | Recommended | Tarun's answer | Status | Date |
|---|---|---|---|---|---|---|

