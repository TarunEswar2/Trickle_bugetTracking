# Trickle v11: Phase 6, Layouts and visual identity

Reference mood: monochrome widget dashboard (large title, circular header buttons, rounded widget cards in 1/2 and full widths, dot-matrix months, floating pill tab bar, "add widget" tile).

## Diverge: information architecture (4 options)
| IA | Tabs | + | − |
|---|---|---|---|
| I1 | Home · Money · Actions · Insights (+drawer) (v8) | proven | "Actions" was an inbox; empty now that decisions are inline |
| I2 | Home · Pay (centre) · Money · Insights | pay is the core loop, one reach | adding manual entry is rare with UPI link |
| I3 | Today · Month · Goals | very small | budget + categories + subs crowd "Month"; savings buried |
| I4 | Home · Spend · Save · Me | mirrors the model split | subscriptions ambiguous (Spend? Month?); two money tabs to learn |
**Converge: I2 variant — Home · Money · [+ Pay] · Insights**, profile/settings in a header button. Reasoning: the Actions tab of v8 had nothing left once every decision became a single inline sheet; Pay/Add is the most frequent deliberate action so it earns the centre; Money maps 1:1 to the model (Income → Savings → Budget → Subscriptions → Categories); Insights holds the story and library. Three destinations + one action button = fewer to learn than 4 tabs.

## Diverge: Home layouts (4 options)
| H | Layout | Budget-free? | Numbers |
|---|---|---|---|
| H1 | Glow hero + recent list + 3 widgets (v8/v9) | yes | 0 |
| H2 | Widget grid only (ref image): 2 half cards + 1 wide + 1 wide + add | yes | 0–2 |
| H3 | Single jar: savings jar filling with tiles, nothing else | yes | 1 |
| H4 | Timeline of today's tiles leaving | yes | many amounts |
**Converge: H2 with an H1 hero card.** Grid gives the ref's calm, scannable structure and user-owned order; the top wide card is the pace glow + one word ("Steady"), because the glow is the single fastest "am I OK" signal (v8). H3 is too thin for daily use; H4 is a list of numbers.

## Tabs and screens (frame ids)
- **Home (H-01)**: title "Hi Tarun", header buttons (settings, add widget). Grid: Pace (wide, glow + word) · Saved this month (half, savings tiles, key "■ = ₹100") · Next subscription (half, hatched tile + "Spotify · Fri") · This week (wide, today's tiles leaving vs last week, no ₹) · Repeat buys (wide, partial-tile strip, "Chai ×4") · Add widget. First-view numbers: 0–1.
- **Pay (P-01..P-04)**: P-01 UPI/amount pad · P-02 category (one tap, preselected) · P-03 tiles leaving (auto, 1.2 s) · P-04 done "Paid ₹60 · Travel" + undo. Overspend sheet P-05; split sheet P-06.
- **Money (M-01)**: accordion Income ▸ Savings ▸ Budget(Subscriptions + Categories). First view: split bar only + 1 number (income). M-02 Category detail (tile bar, payments), M-03 Subscriptions list (due rings), M-04 Savings goals (10×10 rows), M-05 Move tiles (edit mode), M-06 Friends owe you.
- **Insights (I-01)**: Week check-in card, Month so far (tile calendar, leaves the tile), Where it went (category rows), Repeat buys, Library (+). I-02 Period story (5 cards). I-03 Flow of tiles (deep view).
- **Setup (S-00 splash, S-01..S-04)** as Phase 5. **Settings (X-01)**: Look (Colour / B&W, Dark / Light), Sounds, Reduce motion, Linked UPI IDs, Privacy.
Total: 25 frames (S-00–S-04, H-01, P-01–P-06, M-01–M-06, I-01–I-03, X-01, N-01 income sheet, N-02 subscription price change, N-03 weekly check-in).

## Widget grid
4-column grid inside 16 px gutters (phone 412 → cards). Sizes: **S** 1×1 (half width square, 2 per row), **W** 2×1 wide short (full width, ~88 px), **L** 2×2 (full width tall). Radius 24 (cards) / 999 (buttons, tab pill). Gap 10. Max 6 widgets on Home; ≤30 tiles per Home card, no ₹ on Home cards (exact ₹ on tap). Every card: title bottom-left (ref), sub-label muted, settings glyph top-right.

## Type scale
Display: Bricolage Grotesque 600 (title 32, card title 16). Body: Figtree 400/600 (15/13). Numbers: JetBrains Mono tabular (hero 28, inline 13). Scale: 32 / 22 / 16 / 15 / 13 / 11 (eyebrow, +0.12em caps).

## Colour tokens (dark first, light option, B&W option)
Neutrals with slight green bias (the "trickle"). Dark: bg #0e0f0e, card #1b1d1c, line #2a2d2b, fg #f2f3f1, muted #9a9f9b, tile-empty #3a3e3b, savings #f2f3f1 (white glow = the saved thing). Light: bg #f4f5f3, card #ffffff, fg #121412, muted #5c625e, tile-empty #c9cec9, savings #121412.
Category tiles (dataviz reference palette, first 5 slots, fixed order, no red):
| Category | Dark | Light | B&W pattern |
|---|---|---|---|
| Food | #3987e5 | #2a78d6 | solid |
| Travel | #d95926 | #eb6834 | 45° lines |
| Fun | #199e70 | #1baf7a | dots |
| Study | #c98500 | #eda100 | 135° lines |
| Other | #d55181 | #e87ba4 | grid |
Subscriptions: neutral hatched (both themes). Owed: dashed outline. Validator (validate_palette.js): dark on #1b1d1c ALL PASS (CVD ΔE 8.4, normal 19.3, contrast ≥3:1); light on #fff PASS with contrast WARN for Fun/Study/Other → relief: every category row is direct-labelled with its name, so colour never carries identity alone. **B&W mode** (default for monochrome fans, matches ref): all categories grey #cfd2cf with patterns above; savings pure white.
Pace glow: one hue ramp of the accent-neutral (white glow brightness in dark): Calm = bright soft glow, Steady = medium, Slow down = dim + words. Never red/amber semantic.

## Logo and splash
Diverge: (a) jar made of tiles, tiles trickling in; (b) a single tile with a drip below; (c) "t" letter built from 5|5 tiles; (d) falling column of tiles forming a stair. **Converge: (b) + (a) motion**: the mark is one rounded tile with a smaller partial tile beneath (a drop that is a tile, i.e. the partial tile we use in-app for <₹100). Splash: tiles drop one by one into a 2-row jar outline (5|5 gap visible), jar fills a row, logo settles, 1.4 s; reduced motion = static logo. Reuses v10 splash timing, not its shapes.

## Motion language
Tile drop in (spring 260 ms, 18 ms stagger, cap 600 ms) = money arriving; tile leave (fade + rise 8 px, 200 ms) = paying; tile slide between categories = moving; hatched block turns outline on due date. Glow cross-fade 600 ms. Reduced motion: final state, no stagger.

## Sound language (v9 WebAudio reused)
Lowpass 2.4 kHz + compressor, peak ≤0.15. tick (tile leaves, throttled 40 ms, ≤10 ticks then a single swish), soft chime (savings added, ≤1 per 1.5 s), low thud (subscription paid). On by default, silent when the phone is on silent, one toggle in Settings.

## Iconography
2 px stroke, 24 grid, rounded caps, matching the ref: home = 2×2 tiles, money = stacked rows, pay = plus in a tile, insights = line in a tile, settings = two sliders (ref), add widget = tile + plus. No emoji; categories use colour + name, not icons, to avoid a second vocabulary.
