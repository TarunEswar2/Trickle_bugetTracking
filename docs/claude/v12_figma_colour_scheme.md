# Trickle v12 — Figma colour scheme (labelled + expanded)

File: Trickle-Explorations (jaa1XnsKBLGcDLj5hYxpBr), frame "Color Scheme" 9:2. Note (2026-10-01): the earlier expansion container 14:74 no longer exists in the file; frame was 1916×1376 and is now 1916×2305 after adding the Gradients section. Variables: collection "Trickle colours" (modes Dark / Light / B&W), 17 colour tokens.

## Tarun's original swatches (kept, hex labels corrected — all previously read "#222324")
| Swatch | Hex | Role label |
|---|---|---|
| 10:11 | #222224 | Surface / Raised card |
| 10:12 | #848585 | Ink / Secondary (4.3:1 on #222224 → ≥18px only) |
| 10:16 | #F9FAFB | Ink / Primary |
| 10:20 | #8B58A5 | Jar · Fun (plum, raw) → tuned #B64C8E |
| 10:24 | #EF477F | Accent · Pink (unassigned) |
| 10:28 | #F05557 | FLAG: Spent (sketch red) — violates no-red rule; spent = outline |
| 10:32 | #F68E4F | Status · A bit fast |
| 10:36 | #FCDC45 | Jar · Food (amber, raw) → tuned #B8862A |
| 10:40 | #5D8BC8 | Jar · Travel (blue) — kept as-is |
| 10:44 | #63BF79 | Savings (raw) → tuned #2FA27A |
| 10:48/80/84/88 | gradients #4694FF→#0052C3, #3CEFA3→#00A55F, #FFDB45→#C9A922, #FF457E→#D02559 | Dot depth (raised-dot highlight→shade) |
| 10:92/108/112/116 | #4694FF→#42F5E1, #3CEFA3→#F6FC5A, #FFDB45→#FF5A45, #FF457E→#8721FF | Glow: cool / on pace / a bit fast / accent |
The 8 two-tone/two-hue gradient groups are now named "Gradient / <role>" (e.g. "Gradient / Glow · On pace"), their rectangles "Swatch / <role>". Colours untouched.

## Gradients section (node 15:2, inside 9:2)
Mesh-style squircle tiles (186px, radius 52, smoothing 0.6) modelled on Tarun's reference: base linear TL→TR, four radial blooms (TL, TR, right-middle, lower-right), a vertical fade into the base colour at the bottom, and a soft white haze centre-left. Each tile is layer "Gradient / <name>" with caption (name + stops) and uses local paint style "Trickle / Gradient / <name>" (17 styles).
Stops listed TL · TR · R · BR · base.
| Name | Stops |
|---|---|
| Trickle Original (ref) | #FFF23A #00A54F #0E9A86 #4F7A93 #141414 |
| Savings Grove | #F6FC5A #2FA27A #0E9A86 #2E5E6E #141414 |
| On Pace | #3CEFA3 #00A55F #0E9A86 #2B6F8A #141414 |
| Payday | #FCDC45 #F6FC5A #3CEFA3 #00A55F #17201A |
| Food Jar | #FFDB45 #F68E4F #C9A922 #8A5A2B #161412 |
| Travel Jar | #42F5E1 #4694FF #5D8BC8 #0052C3 #10141C |
| Fun Jar | #FF8FB8 #B64C8E #8B58A5 #5B3A7A #141218 |
| Study Jar | #CFE3FF #5D8BC8 #6C6FD1 #3E4B8A #121420 |
| Night Glow | #4F7A93 #2E4756 #222224 #4F5A66 #0E0E10 |
| Month Story | #FFDB45 #FF457E #8721FF #4694FF #121218 |
| Goal Reached | #F6FC5A #3CEFA3 #42F5E1 #00A55F #10201A |
| Fresh Start | #F9FAFB #CFF6E6 #9FE7D8 #8FB5D6 #2A3138 |
| Income Ink | #F9FAFB #B7B8B8 #848585 #4A4B4D #141414 |
| Light · Savings Grove | #FFF9B0 #A8E6C0 #B8E4DC #C9D9E3 #FFFFFF |
| Light · Travel | #D6F7F3 #BFD8FF #C9D6EC #A9C1E8 #FFFFFF |
| Light · Fun | #FFD6E5 #E3BFD8 #D9C9E6 #C8BCDD #FFFFFF |
| B&W | #F2F2F2 #A0A0A0 #848585 #5A5A5A #141414 |
No red-dominant gradients for spending.

## Tokens (Dark / Light / B&W)
| Token | Dark | Light | B&W | Role |
|---|---|---|---|---|
| bg/base | #040707 | #F4F4F2 | #000000 | page |
| bg/surface | #151516 | #FFFFFF | #111111 | cards |
| bg/raised | #222224 | #ECECEA | #1A1A1A | nested/input |
| line/hairline | #2C2C30 | #DDDDDA | #2B2B2B | borders |
| ink/primary | #F9FAFB | #1A1A1C | #F5F5F5 | text |
| ink/secondary | #9A9AA0 | #5E5E66 | #A3A3A3 | sub-labels |
| ink/muted | #6F6F75 | #86868E | #6B6B6B | non-text only |
| money/savings | #2FA27A | #1F9B84 | #FFFFFF | savings (only green) |
| money/income | #C9C9CE | #3A3A40 | #D9D9D9 | income until split |
| money/owed | #9A9AA0 | #5E5E66 | #A3A3A3 | dashed outline |
| money/ghost | #F9FAFB @16% | #1A1A1C @16% | #F5F5F5 @16% | last period |
| money/glow | #FFFFFF | #E3A13A | #FFFFFF | time/position only |
| jar/amber | #B8862A | #B7791F | #F2F2F2 solid | Jar 1 Food |
| jar/blue | #5D8BC8 | #2F63C9 | #BDBDBD stripe | Jar 2 Travel |
| jar/plum | #B64C8E | #93306B | #8A8A8A dot | Jar 3 Fun |
| status/note | #E0A04A | #9A5B12 | #D9D9D9 | "a bit fast", no red |
| status/info | #8FB3E3 | #2F63C9 | #F5F5F5 | tips |
Left = solid jar hue · Spent = 1.6px outline of jar hue · Over = 45° hatch · Jars 4–6 stripe, 7–9 dot. Ramps: 100/200 = 50%/25% to white, 300 base, 400/500 = 25%/50% to black.

## Validation
- WCAG: all ink/primary + ink/secondary pass AA on surface and raised in all modes; ink/muted passes ≥3:1 (non-text). Light glow #E3A13A is 2.2:1 on white (decorative halo only).
- Raw jar set (#FCDC45 #5D8BC8 #8B58A5 #63BF79 on #222224): FAIL — lightness band (yellow, green), plum↔blue ΔE 14.0 normal / 7.9 deutan.
- Tuned dark (#B8862A #5D8BC8 #B64C8E #2FA27A on #18181A): PASS, WARN savings↔plum deutan ΔE 7.8 (ok with labels).
- Light (#B7791F #2F63C9 #93306B #1F9B84 on #F4F4F2): PASS all.
- B&W greys ordinal on #111111: PASS.
