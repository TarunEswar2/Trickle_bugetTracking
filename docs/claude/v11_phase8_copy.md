# Trickle v11: Phase 8, Microcopy

## Tone rules
1. Talk like a friend who is good with money, not a bank. Second person, short sentences.
2. Name things by what students say: "spending money", not "budget allocation".
3. Never: over, overspent, deficit, carried, debt, cover, sweep, pool, assign, invariant, warning, alert, failed, "you should".
4. Facts, then one choice. No exclamation marks except on savings milestones (max one).
5. Numbers: ₹ with Indian grouping (₹1,400), no decimals; tiles written "■ = ₹100".
6. Buttons say what happens ("Split it", "Take from Fun"), never "OK/Submit".

## Glossary
| Concept | Word in app |
|---|---|
| Income | Money in |
| Savings | Savings |
| Budget | Spending money |
| Category | Jar (in copy), name only in UI (Food, Travel…) |
| Subscription | Subscriptions ("comes out on its own") |
| Reserved | Set aside |
| Leftover | Left over |
| Reallocate | Move tiles |
| Owed to you | Friends owe you |
| Period | This month |
| Tile | Tile (■ = ₹100) |
| Pace | How it's going |

## Strings
**Splash/Setup**: "Trickle" / "Money you can see." · S1 "What comes in each month?" sub "We found ₹9,000 from your linked UPI." btn "That's right" link "Change" · S2 "Which is most like you?" cards Hostel / Day scholar / Renting / Earning, sub "We'll start your jars from this." · S3 "Put this much away first?" key "■ = ₹100" btns "−" "+" primary "Save ₹1,400" · S4 "Your month" legend Savings / Set aside for subscriptions / Food / Travel / Study / Fun / Other; btn "Start" link "Skip for now".
**Home**: "Hi Tarun" · pace words: Calm / Steady / Slow down a little · card titles "Saved this month", "Next to come out" (sub "Spotify · Friday"), "This week", "Little things" (sub "Chai ×4 ≈ 1 tile"), "Add a card".
**Pay**: "Pay" · "Who's it for?" · "Which jar?" · done "Paid ₹60 · Travel" btn "Done" toast "Undo" · repeat line "3rd chai this week." · split "Split with friends?" btns "Split" "Just me".
**Overspend**: "Food is empty." sub "Take ₹200 from Fun?" primary "Take from Fun" link "Pick another jar" · whole budget: "Your spending money is used up this month." sub "Next month can start ₹200 lighter, or use savings." primary "Start next month lighter" link "Use savings".
**Income**: "₹9,000 came in." sub "Split it like last time?" primary "Split it" toast "Split. Undo" · unknown credit "Is this money for your month, or a friend paying you back?" btns "For my month" "Friend paying back".
**Subscriptions**: add "What's it called?" / "How much?" / "Which day does it come out?" · due tomorrow "Spotify comes out tomorrow. ₹119 is already set aside." · paid "Spotify paid." · price change "Spotify now costs ₹139 (was ₹119)." primary "Take ₹20 from Other" · stop "Stop tracking".
**Money**: "Money in", "Savings", "Spending money", "Subscriptions", "Jars", "Move tiles", "Friends owe you", edit hint "Drag tiles from one jar to another. The total stays the same."
**Insights**: "This week", "Where it went", "Month so far", "Little things", story titles "Your month in tiles", "The little things", "Where it went", "Left over", "You saved ₹2,150".
**Weekly check-in**: "A fresh week." sub "Last week you spent 2 tiles less than the week before."
**Empty states**: Home no payments "Your tiles are all here. Pay with UPI and watch them go." · Friends owe you "Nobody owes you anything. Nice." · Insights week 1 "Come back Sunday for your first week in tiles." · Goals "What are you saving for?" btn "Add a goal".
**Errors**: UPI link failed "Couldn't reach your UPI app. Check you're online and try again." btn "Try again" · amount 0 "Type an amount above ₹0." · duplicate "This payment is already here." 
**Nudges (push)**: day 2 "Day one in tiles: you saved them all. See how it went." · lapsed "Your savings are right where you left them." · story "Your September story is ready."
**Settings**: "Look" (Colour / Black & white) · "Theme" (Dark / Light) · "Sounds" · "Less motion" · "Linked UPI IDs: tarun@okaxis" · privacy "Your money data stays on this phone. We never read your messages."
