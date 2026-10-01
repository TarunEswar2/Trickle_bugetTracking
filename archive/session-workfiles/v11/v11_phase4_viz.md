# Trickle v11: Phase 4, Visualisation on the ₹100 tile

## Diverge: every visual kept from v2–v10 (audit) + new candidates, as tiles
| Visual (origin) | Tile expression | Verdict |
|---|---|---|
| Category budget left (v8) | tile bar: filled = left, outlined = spent | KEEP |
| Pay moment, tiles pop out (v8/v9) | payment's tiles leave the category row | KEEP |
| Income split (v8) | split bar: income rows, savings rows, then budget rows | KEEP |
| Subscriptions fixed chunk (v3/v9) | reserved hatched block at the start of the budget | KEEP |
| Goal waffle 10×10 (v8) | goal rows, head-start tiles pre-filled | KEEP |
| Repeat buys (v9) | repeat strip: one partial tile per chai; 4 chai ≈ 1 tile | KEEP |
| Weekly check-in (v8) | this week's tile row against last week's | KEEP |
| Period story (v8/v9) | month in rows: saved rows highlighted | KEEP |
| Spend range (v7) | tile range: solid = likely, outlined = possible | KEEP (Insights) |
| Flow/Sankey (v9) | tile stacks flowing income → savings/categories | Insights deep view only |
| Friends owe you (v7) | tiles outside the budget, dashed | KEEP |
| Dot-matrix month / GitHub grid (v3/v9) | calendar: position = day, fill = spent (not tile unit) | leaves the tile |
| Time of day ring (v9) | 24-slot strip, intensity only | library only, leaves the tile |
| Heatmap weekday (v3) | same as above | DROP |
| MoM sparkline (v4) | line | leaves the tile, Insights only |
| Radar, bubble, radial arcs, 2-slice donut | none | NEVER |

## Converge: final catalogue (13)
1. Category tile bar · 2. Pay-moment tiles leaving · 3. Income split bar (savings / subscriptions / categories) · 4. Budget composition (subscriptions reserved block + categories) · 5. Subscription due tile (reserved tile outlined, fills on due date) · 6. Savings goal rows · 7. Repeat-buy strip ("4th chai = 1 tile this week") · 8. Week vs last week rows · 9. Month story rows · 10. Spend range tiles (Insights) · 11. Friends-owe-you dashed tiles · 12. Tile calendar (leaves the tile: position = day) · 13. Flow of tiles (Insights deep view).

## Rules
- **One unit**: ■ = ₹100 everywhere. Key text "■ = ₹100" appears once per screen, on the first tile visual.
- **Max tiles per card**: 100 (10 rows = ₹10,000). Above that, group 10×10 squares (₹10,000 each). Never use a bigger glyph.
- **Home cards**: ≤30 tiles and no numbers. Exact ₹ on tap.
- **Spent/left**: filled = available; outlined = spent; hatched = reserved for subscriptions; dashed = owed to you. No red.
- **Leave the tile only for position data**: time-of-day, calendar day, trend over months. Those widgets use intensity or lines, carry no ₹ key, and use a different surface so nobody reads them as tiles.
- **Partial tiles**: fill from the bottom. Below ₹10, show a sliver and put the exact ₹ on tap.
