# v28 "Paper": a new visual language (13 Oct 2026)

**Tarun (13 Oct, CONFIRMED):** "Change the complete visual language and style of the app and make it more interesting, satisfying and human made looking."

The money model is v27, unchanged. Only the look and the motion changed. Source: `builds/v28/ui28.js` (one file, loaded last).

## The idea
A paper notebook with stickers. Warm paper, ink outlines, hard offset shadows, slightly uneven corners, handwritten notes. It should look drawn by a person, not generated.

## Tokens
| Token | Value | Use |
|---|---|---|
| paper / paper2 / paper3 | #F5EDDD / #FFFAEE / #EDE2CC | page, cards, tracks |
| ink | #2A241C | text and every outline |
| leaf | #39A56F | good, on track, main buttons |
| sun / sun2 | #F5B73C / #FBE3A6 | highlight, active tab, chosen chip |
| tomato | #E8573F | warning, Restart budgeting |
| berry / berry2 | #4E78D8 / #C6D6F6 | savings, charts |
| peach | #F7CDAA | warm tile |
| shadow | 3px 4px 0 ink | the sticker shadow |
| fonts | Fraunces (numbers, titles), Figtree (body), Caveat (small notes) | |

## What changed
- **Look:** cards, tiles, sheets, chips, buttons and the tab bar have ink outlines, offset shadows and slightly irregular corners. Paper grain on the page.
- **Home hero:** tinted by state (green on track, sun when a bit fast, tomato when over).
- **Tab bar:** the active tab is a sun-coloured sticker.
- **Chips** tilt a little; the chosen one tilts more.
- **Motion** (satisfying, not busy): buttons press down into their shadow; when a screen first appears, the bar fills, the dots pop in and cards rise in order. Reduced-motion is respected.
- **Old inline dark colours** are converted to paper tones at run time (`recolor28`), so the older files stay untouched.

## Decisions
See V28-1…V28-4 in `v14_decisions.md`. All PROPOSED except the direction itself.

## What it does not cover yet
- **Not tested with students.** Whether it feels "human made" is Tarun's and testers' call.
- **Contrast** was checked by eye and by screenshot only, not measured for every pair.
- **Dark mode is gone** in this build.
- **Figma** is still the v27 dark look; a re-export is a separate step.
- Some charts still use plain beige bars (goal "added each month").
