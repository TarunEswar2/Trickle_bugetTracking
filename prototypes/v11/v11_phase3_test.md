# Trickle v11: Phase 3, Tile comprehension test

Test page (keep for Tarun + friends): https://claude.ai/artifact/GqCAwwW9LBbtFJ2jkeSZph
3 blocks (F, D, B) in random order. Each block shows the key once, then hides it for 12 timed tasks: tile value (1), what is this worth (3), which is more (3), how much is left with spent tiles outlined (3), and estimate to the nearest ₹500 (2). The page records accuracy and time for each task, keeps runs in the browser, and exports CSV.

## Simulated evaluation (no humans yet)
Read-time model: 0.5 s orientation; subitize ≤4 in 0.4 s; each visible group of 5 or row/block of 10 takes 0.3 s; loose items beyond 4 take 0.3 s each; a partial tile adds 0.4 s. Budget is ₹6,000 (day tile = ₹200).
| Scenario | ₹ | F tiles / s | D tiles / s | B tiles / s |
|---|---|---|---|---|
| Chai | 25 | 0.25 / 0.9 | 0.25 / 1.1 | 0.13 / 1.3 |
| Auto | 60 | 0.6 / 0.9 | 0.6 / 1.1 | 0.3 / 1.3 |
| Food order | 350 | 3.5 / 1.3 | 3.5 / 1.5 | 1.75 / 1.3 |
| Subscription | 499 | 4.99 / 1.3 | 4.99 / 1.5 | 2.5 / 1.3 |
| Week's spending | 1,200 | 12 / 1.2 | 12 / 1.4 | 6 / 1.5 |
| Food budget | 2,400 | 24 / 1.5 | 24 / 1.7 | 12 / 3.3 |
| Savings | 3,000 | 30 / 1.4 | 30 / 1.6 | 15 / 4.2 |
| Goal ₹8,000 at 52% | 4,160 | 41.6 / 2.5 | 41.6 / 2.7 | 20.8 / 6.1 |
| Budget | 6,000 | 60 / 2.3 | 60 / 2.5 | 30 / 8.7 |
| Income | 9,000 | 90 / 3.2 | 90 / 3.4 | 45 / 13.2 |
| **Avg** | | **1.6 s** | 1.9 s | 4.2 s |

S1 (tile value in ≤5 s): F and D state "₹100", a single round fact. B needs "budget ÷ 30" and fails whenever the budget changes. S2 (compare in ≤3 s): with F and D, comparison is by row count first and then by fives. B's ungrouped rows need counting above 4.

## Winner: F, "1 tile = ₹100; 10 tiles = a row = ₹1,000; 5|5 gap in each row"
Reasoning: it has the lowest modelled read time, a single glyph, and a value that never changes, and it reuses decimal place value that every student already knows. D is nearly as fast, but its 2×5 blocks wrap awkwardly in narrow cards and break the "row = ₹1,000" reading. B carries the most meaning per tile but repeats v9's moving-unit failure (S7). Sub-₹100 amounts become a partial tile filled from the bottom, never a new shape. This choice is provisional until at least 5 people run the test page. The switch rule: if F's accuracy on "which is more" is below 90% or its median time is above 3 s, re-test against D.
