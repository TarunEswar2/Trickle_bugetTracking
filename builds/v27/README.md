# Trickle v27 build

- **Published:** https://claude.ai/artifact/9iayqqrRwrnV53oCzPemgo. Open it to see the phone with the side panel of demo profiles and events.
- **Built file:** `mockup27.html` (one self-contained page, about 611 KB).
- **Money model, in plain words:** `docs/claude/v27_money_model.md`.
- **Decisions:** V27-1 to V27-9 at the end of `docs/claude/v14_decisions.md`.

## What v27 is
- **Home:** this week's allowance and what is left. Nothing else about money.
- **Add income:** how much → keep some aside? → how long should it last?
- **Savings:** goals have no deadline ("₹4,700 to go").
- **Subscriptions:** adding, changing, pausing, cancelling or removing one takes it out of the spending money now and works the week out again.
- **Settings:** full screen. At the bottom is the only red button, **Restart budgeting**. It shows a warning, then the onboarding questions. Past spends stay logged.
  - If savings don't fit the new split, everything in savings goes down by the same percentage.
- **No bank balance** is shown or asked for.

## How to build
```
cd builds/v27
python3 build.py        # writes mockup27.html
```
`build.py` joins `shell.html` (markup and CSS), then the scripts in the order listed in it, then `panel.js`, into one `<script>`.

**Later files change earlier ones by wrapping or replacing functions.** So:
- the newest behaviour is in the last files;
- a top-level `const` that a later file needs to replace is written as `var`.

| Layer | Files | What it holds |
|---|---|---|
| Base | `ui_core.js` | Router (`SCREENS`, `SHEETS`, `FLOWS`, `POPUPS`), click handlers `H` via `data-a`, input handlers `HI` via `data-i`, `render()` |
| | `engine.js` | State, demo profiles, spends (`doPay`), moving money, bills, goals |
| | `ui_a.js` … `ui_g.js` | Screens, flows, settings, onboarding, subscriptions |
| v15 to v24 | `ui15*.js` … `ui24.js` | One layer per version. Each file says at its top what it changed, with a link to its plan doc |
| v25 | `ui25.js` | The single money model `M25()`, recomputed on every render from one ledger. The plans ("pools") hold the spending money; spends are allocated in time order |
| v26 | `ui26.js` | Subscriptions held ahead (`reserve26`), untracked weeks, ordering stamps |
| v27 | `ui27.js` | No balance on screen, goals without dates, full-screen settings, Restart budgeting, savings scaled by the same percentage (`cutSavings26`), subscriptions recalculate the week (`subRecalc27`) |
| Mockup only | `panel.js` | The side panel: profiles, time travel, events |

## The money rules (short)
1. **Spending money** = money added − savings kept aside − spends.
2. **This week** = (spending money left − subscriptions due before the plan ends) ÷ weeks left. It is worked out again:
   - on Monday;
   - when income is added;
   - on any subscription change;
   - on Restart.
3. **A spend comes out of** this week, then later weeks, then savings, then below zero. The next income pays back below zero first.
4. **Restart** sets the money you have now and the split again:
   - if the amount kept aside is at least your savings, savings stay and the extra goes in;
   - if it is less, every pot shrinks by the same percentage.
5. **A bought goal** comes out of its own savings. The week does not change.

## Tests
How to run them is in `tests/README.md`.

| Test | Result (12 Oct) |
|---|---|
| `scenarios.js` | 12/12 PASS: six v26 gaps; restart (as now, keep more, keep less with the same share, past spends kept); subscription added, subscription cancelled |
| `model.js` | 0 failures on seeds 1, 2, 3, 5, 7, 11, 99, 4242, 31337 (150 actions × 7 starts each, including restart with a random split, adding a subscription and cancelling one) |
| `fuzz.js`, `panel.js`, `tips.js`, `scan5.js` | Pass, no page errors |
| Random taps on every button | No crash in 5,000 taps (desktop and phone size) when checking the crash report of 12 Oct |

## Not covered
- **Not tested with students.**
- **The demo profiles are made up.** Their first plan is sized to their demo weekly amount (V27-9).
- **"Saved this month" does not go down** when a restart lowers savings.
- **The crash Tarun saw when adding (12 Oct) could not be reproduced.** It may have been the help sheet that covers the buttons after onboarding.
