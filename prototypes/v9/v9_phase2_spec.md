# Trickle v9 — Phase 2: Spec

Base: v8 (tiles, blurred glow, one choice per step, Home ≤2 numbers and 0 by default, savings as motivator, no games). Reference: monochrome widget dashboard — black rounded widget tiles, one big number per card, glowing dot-matrix months, per-widget settings icon, "add widget" tile.
Hard constraint: **no SMS tracking**. UPI linkage or manual entry.

---
## 1. Tile value system

### 1.1 Unit selection rule
Units ladder `U = [10, 50, 100, 250, 500, 1000, 2500]` (₹). For a chart whose **largest single tiled quantity** is `Vmax` and whose **total tiles drawn** would be `Σv/u`:
1. `u = smallest U such that Σ ceil(v/u) ≤ CAP` where CAP = **30** for S widgets, **50** for W/L widgets, **30 per category grid** on Money/Pay.
2. Also require `ceil(Vmax/u) ≥ 3` when possible (don't collapse a quantity to a single tile) — if both can't hold, CAP wins.
3. **One unit per card.** Every mark on a card uses the same `u`; cards that compare side by side (e.g. "This vs last") share `u`.
4. Stability: recompute only when the period changes or the value crosses 1.5× the cap, so tiles don't re-unit mid-month on every spend.
5. Exceptions (units are not ₹): goal waffle = 1% (100 tiles, 10×10, it's a ratio); small-buy frequency dots = 1 spend; savings-rate waffle = 1% of income.

Examples (seed data):
| Card | Values | Unit | Tiles |
|---|---|---|---|
| Where it went (Sep, ₹5,1xx spent) | Food 2,210 · Travel 780 · Fun 640 · Ess. 1,190 | ₹100 | 23+8+7+12 = 50 (partials on 3; ₹50 would need 99) |
| Budget › Food | ₹2,400 fixed | ₹100 | 24 |
| Pay ₹85 chai | Food left ₹190 | ₹10 | 9 → payment 9 of 19 (partial) |
| Income split | ₹9,000 | ₹500 | 18 (12 budget + 6 savings) |
| Small buys this week | ₹640 | ₹50 | 13 (last partial) |
| Savings growing Jul–Sep | ₹2,300 / 1,800 / 2,900 | ₹250 | 10/8/12 |

### 1.2 Remainder rule (partial tile)
`full = floor(v/u)`, `r = (v mod u)/u`. If `r ≥ 0.1` draw one **partial tile**: same outline, fill clipped from the bottom to `round(r*4)/4` (quarter steps: ¼, ½, ¾) so it reads as a jar level not noise. `r < 0.1` → dropped (never draw a sliver). Totals shown on tap are the exact ₹ value, never the rounded one.

### 1.3 Key component
`.tkey` — bottom-left of every tiled card: a 10px tile swatch in the card's neutral (`--text3` outline + fill) + "= ₹250" (11px, `--text3`, tabular). Goal: "1 tile = 1%". Frequency: "1 dot = 1 buy". Keys are captions, not headline numbers (don't count against the numbers budget). Screen readers: card `aria-label` includes "each tile ₹250".

### 1.4 Max tiles
Hard ceiling **50** per card (100 only for 10×10 percentage waffles). If CAP can't be met with ₹2,500 tiles, the card switches to a single hero number + one tile row (never >50).

### 1.5 Tile anatomy
Tile 12–16px, radius 3.5, gap 3px (4 on 16px). Empty slot = 1px `--line` outline. Over = amber dashed outline + word "Over". Owed = outlined, never filled (not money you hold). Glow: filled tiles in "today/this" state carry `box-shadow 0 0 6px currentColor @ .45` (the reference's glowing dot).

---
## 2. Visualisation catalogue (v9 — 20 widgets)
Sizes: S (1 col, square), W (2 col × 1), L (2 × 2). Tabs: H Home, M Money, I Insights, G goal detail, P Pay, R rhythm. Every widget: title top-left, ⚙ settings icon top-right (ref style: range, unit override, B&W pattern on/off, pin/hide), one big number max (and only if the card's job is that number), key bottom-left, tap any mark → exact ₹ tag 3 s. Board ends with an **"Add widget" tile** (ref).

| # | Widget | Question it answers | Form | Unit | Size | Tab | Default pinned | Interactions | Animation |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Goal jar | How close is Goa? | 10×10 waffle, lime | 1% | S | H/G/I | **Pin 1** | tap → goal detail; add ₹100/500 | tile pop on add + savings chime |
| 2 | This month (dot matrix) | Where am I in the month; which days were heavy? | 5×7 glowing dot calendar (ref), brightness = day spend quartile, today ringed, future faint | dot = 1 day (key: brightness scale) | W | H/I | **Pin 2** | tap day → spend that day | dots light left→right 20 ms each |
| 3 | Money flow (**Sankey**) | Where did this month's money go? | 3-column Sankey | band width ∝ ₹ (key: 1 mm ≈ ₹100) + tile-quantised nodes | L | M (Income section) + I + R story | no (M fixed) | tap node → highlight its paths + ₹; tap band → ₹ | flow draw (§3) |
| 4 | Where it went | What did I spend on? | category tile grids, one row each, labelled | adaptive (₹250 seed) | W | I | no | tap row → category detail | pour in |
| 5 | Spend range | How steady is my daily spending? | per week a **dot column**: min–max rail + one dot per day (dot = day total), median notch | y scale in ₹ steps of adaptive unit; key "gridline = ₹200" | W | I | no | tap week → daily list | dots drop into place, 30 ms stagger |
| 6 | Small buys — added up | How much did the little stuff cost? | accumulation stack: this week's small buys as tiles, big number = ₹ total ("added up to ₹640") | adaptive (₹50 seed) | W | I/H option | no (suggested pin) | tap → Small buys detail | pour + count-up |
| 7 | Small buys — how often | How many, which days? | 7×N dot grid, 1 dot = 1 buy, rows = weeks (4 weeks) | 1 buy | S | I | no | tap dot → merchant, ₹ | dots light |
| 8 | Small buys — repeats | Which places do I keep going back to? | top 4 merchants, tile per visit + ₹ total on tap ("Chai Tapri ×14") | 1 visit | W | I | no | tap → txn list filtered | row reveal |
| 9 | Small buys — trend | Are they growing? | 3 tile columns (Jul, Aug, Sep), shared unit, current glowing + word "fewer"/"more" | adaptive | S | I | no | tap col → ₹ | columns rise |
| 10 | Purchase sizes | What share is small? | 5 buckets (≤150, –300, –600, –1k, 1k+) as tile rows by count, ≤150 highlighted | 1 buy / adaptive | W | I (hidden) | no | tap bucket | — |
| 11 | This vs last | Which categories changed? | two tile rows per category (last = outlined, this = filled), shared unit, word "less/more" | adaptive | W | I | no | tap | this row fills over last |
| 12 | Month by month (6 months) | Long view | 6 tile columns stacked by category, current glowing | adaptive (₹500) | W | I | no | tap col | rise |
| 13 | Savings growing | Is my saving piling up? | lime tile columns per month + cumulative ghost column | adaptive (₹250) | W | I/G | no | tap | rise + chime on current |
| 14 | Savings rate | What share of income did I keep? | 10×10 waffle lime | 1% | S | I/G | no | tap | pop |
| 15 | When you spend | Which hours? | 24-dot clock ring, brightness = ₹ per hour, peak dot glows + word ("evenings") | dot = 1 hour | S | I | no | tap dot | ring sweep |
| 16 | Weekday pattern | Which days? | 7 tile columns | adaptive | W | I | no | tap | rise |
| 17 | Top places | Where does it go most? | top 5 merchants tile rows | adaptive | W | I | no | tap → txns | reveal |
| 18 | Subscriptions | What renews when? | 30-dot month ring, subs glow on due day, ₹ tiles per sub | adaptive (₹50) | W | H (fixed compact) / I | fixed on H | tap → sub | glow pulse on due-soon |
| 19 | Owed to you | Who owes me? | outlined tiles per person, shared unit | adaptive (₹100) | W | M/I | no | Remind / Paid back | outlined → filled on paid back + chime |
| 20 | Goal ETA | When will Goa be done? | dot path to target date, past dots filled, future faint | dot = 1 week | W | G | — | tap dot | path draws |

Home default: Goal jar + This month (2 pins, as v8). Home numbers stay 0 by default.

### 2.1 Sankey (detail)
- **Columns:** (1) sources: Allowance, Café shift, Paid back (friends) → (2) pots: Budget, Savings, New money (if unsorted) → (3) Food / Travel / Fun / Essentials / **Left in budget** (faint) and Goa trip / Rainy-day jar.
- **Encoding:** band width ∝ ₹; nodes are **tile-quantised bars** (node height snapped to the card's unit, so a node visibly *is* N tiles stacked — ties Sankey to the tile language); bands 40% opacity of the destination colour; Savings bands lime; "Left in budget" band dashed outline (unspent, not gone).
- **Labels:** every node labelled (name, ₹ on tap only); left labels sit left of nodes, right labels right (fixes v7's labels-over-flows). Nodes < 6px height fold into "Other".
- **Where:** Money › Income section (month), Insights (month/3-month toggle in ⚙), Period story card 3 ("Where September went").
- **Animation:** nodes pop in column 1 (tile pop, 60 ms stagger) → bands draw left→right via `stroke-dashoffset`/clip-path 700 ms ease-out, one pot at a time, Savings bands last → savings node glows + savings chime. Reduced motion: final state, no draw.
- **B&W:** bands in grey steps per destination + patterns (§5); savings = brightest white.

### 2.2 Range (detail)
Spend range: x = last 6 weeks, per week a vertical rail from min day to max day (hairline `--line`), a dot per day (r 4, 2px surface ring), median = short horizontal notch, current week glowing. Caption word: "Steadier than August" / "Two big days this week". Hover/tap nearest dot (24px hit).

### 2.3 Small-purchase suite
- **Definition:** a spend ≤ threshold (default ₹150; drawer choice ₹100/150/200) excluding subscriptions and transfers.
- Widgets 6–9 + 10; detail screen "Small buys" (from widget 6 tap): big number "Added up to ₹640 this week", accumulation pour, repeats list, frequency dots, trend word, and one savings-framed line: "Skipping two chais a week ≈ Goa 2 weeks sooner" (no judgement, optional).
- **Pay moment:** on Pay step 3, when payee is a repeat small merchant: faint line "4th time at Chai Tapri this week" (no colour, no number of ₹).
- **Check-in:** Monday card "Small buys last week" with the 7-dot row + added-up ₹.
- **Period story:** card "The little things" — tiles pour into a jar, count-up to ₹ total.

---
## 3. Motion spec
All easing tokens: `--ease-out: cubic-bezier(.2,.8,.2,1)`, `--ease-spring: cubic-bezier(.34,1.56,.64,1)`, `--ease-in-out: cubic-bezier(.65,0,.35,1)`. Global cap 1.2 s per sequence; tile staggers capped so sequence ≤ 900 ms.

| Animation | Where | Spec | Reduced-motion fallback |
|---|---|---|---|
| Tile pop | any tile appearing | scale .6→1, opacity 0→1, 220 ms spring, stagger 18 ms (cap 600 ms) | opacity fade 120 ms, no stagger |
| Pour | small buys, savings add, income split | tiles fall from 24px above into slots, 320 ms ease-out, stagger 25 ms, last tile lands → soft pulse | final state |
| Pay fly-out | Pay step 3 | payment tiles ring (120 ms) then translate up 40px + fade, 60 ms stagger | tiles dim to outline |
| Count-up | big numbers (small-buy total, "You saved") | 0→value 700 ms ease-out, tabular during count, proportional at rest; ₹ rounds to unit steps | show value |
| Sankey flow draw | Sankey | nodes pop (col1→col3, 60 ms stagger), bands draw L→R 700 ms ease-out, savings last; +glow 400 ms | static |
| Dot-matrix light-up | This month, frequency | dots fade in by date order 20 ms stagger, today ring pulse 1× | static |
| Glow shift | Home glow on pace change | hue cross-fade 1.6 s ease-in-out (ambient; exceeds cap intentionally, non-blocking) | instant swap |
| Savings chime moment | goal add, income → savings, story end, Sankey savings | lime tiles pop + card glow ring expands (scale 1→1.04, shadow 0→16px lime @ .35 → 0) 600 ms + savings chime | chime only (sound is not motion) |
| Accordion / sheet | Money, sheets | 260 ms ease-out height/translate | 1 ms |
| Widget edit | board | cards lift 2px, ⚙ turns; no jiggle | none |

Reduced motion = `prefers-reduced-motion: reduce` OR drawer "Reduce motion" (existing toggle).

---
## 4. Sound spec
Engine: one lazily created `AudioContext`, master `GainNode` 1.0 → `DynamicsCompressor` → destination. **All per-voice peak gains ≤ 0.15.** Envelope helper `env(g, t0, a, peak, d)`: `setValueAtTime(0.0001)`, `linearRampToValueAtTime(peak, t0+a)`, `exponentialRampToValueAtTime(0.0001, t0+a+d)`. Soft timbre = sine (+ triangle one octave up at 30% for sparkle) through a lowpass at 2.4 kHz.

| Event | When | Recipe | Peak | Dur |
|---|---|---|---|---|
| `tap` | primary buttons, tile reveal | sine 880 Hz, a 5 ms, d 60 ms | 0.05 | 70 ms |
| `tile` | each tile pop (throttled: max 1 per 45 ms, pitch walks up C major pentatonic 523→1047) | triangle, a 3 ms, d 90 ms | 0.04 | 100 ms |
| `pour` | tiles landing (pour) | 3 sine blips 660/784/988, 40 ms apart, d 80 ms | 0.05 | 200 ms |
| `pay` | payment sent (UPI hand-off returns) | two-note down sine 784→523, 90 ms apart, d 180 ms | 0.08 | 300 ms |
| `save` (**savings chime**) | money reaches savings/goal, story "You saved" | arpeggio C5 E5 G5 C6 (523/659/784/1047) 70 ms apart, sine + triangle 8va @30%, d 600 ms, final note 0.12 | 0.12 | 900 ms |
| `income` | income confirm card | sine chord C4+G4 (262/392) a 20 ms d 500 ms, then E5 sparkle | 0.10 | 700 ms |
| `flow` | Sankey band draw | filtered noise sweep (white noise buffer → bandpass 600→2400 Hz over 700 ms, Q 1.2) | 0.03 | 700 ms |
| `goal` | goal reached | `save` + second octave arpeggio 1047/1319/1568/2093 | 0.12 | 1.4 s |
| `soft` | amber "a bit fast" / over | single low sine 330 Hz a 10 ms d 250 ms (never a buzzer) | 0.05 | 260 ms |
| `toggle` | switch, chip | sine 1200 Hz, d 40 ms | 0.03 | 45 ms |

- **Default ON**, soft. Drawer: "Sounds" toggle (On/Off) → `localStorage` (try/catch). Mute also respects a page-level setting passed in demo controls.
- **Unlock:** browsers block audio before a gesture — create/`resume()` the context on the first `pointerdown`/`keydown`; events before unlock are dropped silently (never queued).
- Never play on page load, on scroll, or more than one `save` per 1.5 s. Sound fires even under reduced motion (it's not motion), except `flow` (tied to a draw that doesn't happen).

---
## 5. Colour and black & white mode

### 5.1 Colour mode (default) — v8 palette, validated
Food `#E8743B` failed the dark lightness band (L 0.685) → **Food `#DC6A30`**. Others unchanged.
```
node validate_palette.js "#DC6A30,#3F8CE6,#D55181,#9085E9" --mode dark --surface "#17181A"
  [PASS] Lightness band  all 4 inside L 0.48–0.67
  [PASS] Chroma floor    all 4 >= 0.1
  [PASS] CVD separation  worst adjacent #9085E9↔#D55181 ΔE 16.0 (deutan)
  [PASS] Normal-vision   worst adjacent 19.7
  [PASS] Contrast        all 4 >= 3:1
```
All-pairs: Travel↔Essentials ΔE 0.6 protan (FAIL) — so **category order is fixed (Food, Travel, Fun, Essentials) and no all-pairs form (scatter, bubble) uses category colour**; Sankey nodes are always labelled. Savings lime `#C6F432` and amber `#F2A93B` are status-like reserved, never a category.

### 5.2 B&W mode (option: drawer › Look › Colour / Black & white)
Ref-style: pure black ground, white glow.
| Token | Colour | B&W |
|---|---|---|
| `--bg` | `#0B0B0C` | `#000000` |
| `--surface` | `#17181A` | `#111111` |
| `--surface2` | `#1F2023` | `#1A1A1A` |
| `--line` | `#2A2B2E` | `#2B2B2B` |
| `--text/2/3` | `#F4F2EA/#A9A79E/#6F6D66` | `#F5F5F5/#A3A3A3/#6B6B6B` |
| `--save` (lime) | `#C6F432` | `#FFFFFF` + glow `0 0 8px #fff8` (savings = brightest thing) |
| `--calm` | `#4FD18B` | `#D9D9D9` glow + word "On pace" |
| `--warm` | `#F2A93B` | `#8A8A8A` + **dashed** tiles + word "A bit fast" |
| cat Food/Travel/Fun/Ess | hues | **grey ramp `#F2F2F2 / #BDBDBD / #8A8A8A / #5E5E5E`** + pattern |

Distinguishability in B&W: (1) brightness step (validated ordinal ramp, below); (2) **pattern per category** inside tiles ≥12px: Food solid, Travel 45° hatch, Fun dot, Essentials 135° hatch (texture rule: 45°/135° only); (3) direct labels on every row/node; (4) fixed order. Pace never relies on grey alone (word + dashed).
```
node validate_palette.js "#F2F2F2,#BDBDBD,#8A8A8A,#5E5E5E" --mode dark --surface "#0A0A0A" --ordinal
  [PASS] Lightness monotone · [PASS] Adjacent ΔL ≥ 0.06 · [PASS] Light-end contrast 3.05:1 · [PASS] Single hue
```
(On `#111` surface use `#6B6B6B` for the darkest step: 3.57:1 on `#101010`, also PASS.) The categorical validator is not applicable (greys fail chroma by design) — identity is carried by pattern + label, which is why they're mandatory in B&W.

---
## 6. Screen-by-screen changes vs v8
- **Global:** tile component gets `unit`, partial tile, `.tkey`; widget card chrome (ref): 24px radius, ⚙ icon, big-number slot; sound engine; motion tokens; B&W theme via `html[data-look="bw"]`; Food colour fix.
- **Onboarding:** welcome tiles pour + first `save` chime at screen 8; screen 5 budget tiles show key "= ₹500"; add silent sound note "Sounds on — mute in settings".
- **Home:** keep glow/pace/Pay/Recent; recent glyph → size dots + header key; subscriptions compact → mini dot ring; pins: Goal jar + This month dot matrix; "Add widget" tile replaces "Pin more visuals" link. Numbers 0.
- **Pay:** adaptive unit on step 3 (₹10 for small buys) + key; repeat-merchant line; fly-out + `tile`/`pay` sounds; done screen savings chime.
- **Money:** Income section gets **Sankey** (replaces bare 18-tile split, which stays in the confirm card); Budget grids adaptive + key; Savings: goal jar, savings rate, savings growing; Owed outlined tiles.
- **Insights:** board of 20 widgets in ref card style (S/W/L grid), ⚙ per widget, Add-widget tile, sections: Flow · Small buys · Patterns · Savings. Defaults visible: Sankey, Where it went, Small buys added up, Small buys repeats, Spend range, This vs last, When you spend, Savings growing; rest in library.
- **Small buys detail** (new overlay).
- **Actions/Check-in:** new small-buys card.
- **Period story:** 5 cards: Spent in tiles · The little things (pour) · Where it went (Sankey) · Leftover → Goa · You saved ₹X (count-up + `save`).
- **Goal detail:** ETA dot path, contribution sources tile row.
- **Drawer:** Look (Colour / B&W), Sounds (On/Off), Small-buy threshold (₹100/150/200), Reduce motion (existing).

## 7. Build order (Phase 3 → 5)
1. Tile unit engine (`unitFor`, partial tile, `.tkey`) + refactor all v8 grids; validate tile counts ≤ caps.
2. Theme tokens + B&W mode + patterns; Food colour fix.
3. Widget card chrome (ref) + board S/W/L grid + ⚙ sheet + Add-widget tile.
4. Widgets: This month dot matrix, Where it went, Spend range, This vs last, Month by month, Savings growing/rate, When you spend, Weekday, Top places, Subs ring, Owed, Goal ETA.
5. Small-purchase data helpers + widgets 6–10 + detail + Pay line + check-in + story card.
6. Sankey (layout, tile-quantised nodes, labels, tap).
7. (Phase 4) Motion tokens + animations; sound engine + events + mute/unlock.
8. (Phase 5) Validate: invariant, tile caps, keys present on every tiled card, numbers budget, B&W screenshot pass, reduced motion, audio gain audit, no SMS grep.

---
## Resolved (user decisions, applied in the v9 build)
1. **"Small purchases" are now repeat purchases.** A repeat buy is the same place (or same kind of item) bought 3+ times within 30 days, at any amount. The ₹150 threshold is dropped. The drawer setting becomes "Count as a repeat buy after 3× / 4× / 5×". Widgets are renamed: Repeat buys (added up), Repeat buys: how often, Repeat buys: per place, Repeat buys: trend. The pay-screen line reads "3rd time at Chai Tapri this week" (shown from the 3rd visit in 7 days, no ₹, no colour).
2. **Repeat buys is pinned to Home by default** (after Goal jar and This month), drawn as tiles. The ₹ total shows only on tap.
3. **B&W mode is optional; colour is the default.** In B&W the Home glow shows pace by glow brightness (on pace = brighter white, a bit fast = dim grey) together with the words "On pace" / "A bit fast", never colour.
4. **Sounds:** big moments (savings chime, income, goal reached, Sankey draw + savings, payment) plus a very quiet throttled tick when tiles pop. On by default, mute in the drawer, audio unlocks on the first tap or key press.
5. **Every tiled card shows "1 tile = ₹X"** using the adaptive unit ladder (₹10/50/100/250/500/1,000/2,500). No tile overflow or truncation: the unit grows until the card fits its cap. A remainder is drawn as one partial tile in quarter steps.
