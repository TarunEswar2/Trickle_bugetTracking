import html, math
E = html.escape
SC = [  # key, title, sub, segments (value in ₹100 units, kind)
 ('chai', '₹25 chai', 'a quarter tile', [(0.25, 'f')]),
 ('meal', '₹350 meal', '3½ tiles', [(3.5, 'f')]),
 ('budget', '₹6,000 budget', '60 tiles', [(60, 'f')]),
 ('income', '₹9,000 income', '₹3,000 savings + ₹6,000 budget', [(30, 's'), (60, 'f')]),
 ('sub', '₹499 subscription', 'reserved, hatched', [(4.99, 'r')]),
 ('goal', 'Goal ₹8,000 · 52%', '₹4,160 saved of ₹8,000', [(41.6, 's'), (38.4, 'e')]),
]
UID = [0]
def uid():
    UID[0] += 1; return f'h{UID[0]}'

def cells(segs):
    out = []
    for v, k in segs:
        n = int(v + 1e-9); out += [(k, 1.0)] * n
        if v - n > 1e-6: out.append((k, v - n))
    return out

def FA(k,hid): return f'fill="url(#{hid})"' if k=='r' else ''

def svg(w, h, body, hid, dark=False):
    pat = (f'<defs><pattern id="{hid}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">'
           f'<rect width="5" height="5" class="rb"/><line x1="0" y1="0" x2="0" y2="5" class="rl" stroke-width="2"/></pattern>'
           f'<filter id="{hid}g" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.8"/></filter></defs>')
    return f'<svg viewBox="0 0 {w:.0f} {h:.0f}" width="{w:.0f}" height="{h:.0f}" role="img" class="{"dk" if dark else ""}">{pat}{body}</svg>'

def cls(k): return {'f': 'f', 's': 's', 'r': 'r', 'e': 'e'}[k]

def shape_rect(x, y, s, k, fr, hid, rx=2, liquid=False, pill=False):
    w = s * (1.8 if pill else 1); r = (s / 2) if pill else rx
    fillattr = f'fill="url(#{hid})"' if k == 'r' else ''
    if k == 'e':
        return f'<rect x="{x+.75}" y="{y+.75}" width="{w-1.5}" height="{s-1.5}" rx="{r}" class="e"/>'
    if fr >= 0.999:
        return f'<rect x="{x}" y="{y}" width="{w}" height="{s}" rx="{r}" class="{cls(k)}" {fillattr}/>'
    hh = s * fr
    base = f'<rect x="{x+.75}" y="{y+.75}" width="{w-1.5}" height="{s-1.5}" rx="{r}" class="e"/>'
    cp = uid()
    if liquid:
        yy = y + s - hh; a = min(1.6, s*.12)
        d = f'M{x},{yy} q{w/4},{-a} {w/2},0 t{w/2},0 V{y+s} H{x} Z'
        fill = f'<clipPath id="{cp}"><rect x="{x}" y="{y}" width="{w}" height="{s}" rx="{r}"/></clipPath><path d="{d}" clip-path="url(#{cp})" class="{cls(k)}" {fillattr}/>'
    else:
        fill = f'<clipPath id="{cp}"><rect x="{x}" y="{y+s-hh}" width="{w}" height="{hh}"/></clipPath><rect x="{x}" y="{y}" width="{w}" height="{s}" rx="{r}" clip-path="url(#{cp})" class="{cls(k)}" {fillattr}/>'
    return base + fill

def grid(segs, s=10, g=2, cols=10, gap5=4, kind='rect', rowgap=None):
    hid = uid(); cs = cells(segs); out = []
    w_cell = s * 1.8 if kind == 'pill' else s
    rowgap = g if rowgap is None else rowgap
    for i, (k, fr) in enumerate(cs):
        r, c = divmod(i, cols)
        x = c * (w_cell + g) + (gap5 if c >= 5 and gap5 else 0); y = r * (s + rowgap)
        if kind == 'dot':
            cx, cy, rr = x + s/2, y + s/2, s * .32
            if k == 'e': out.append(f'<circle cx="{cx}" cy="{cy}" r="{rr*.7}" class="dd"/>')
            else:
                op = .45 + .55 * fr
                out.append(f'<circle cx="{cx}" cy="{cy}" r="{rr*1.6}" class="gl {cls(k)}" filter="url(#{hid}g)" opacity="{op*.8:.2f}"/>'
                           f'<circle cx="{cx}" cy="{cy}" r="{rr*max(fr,.35)**.5:.2f}" class="lt {cls(k)}" {FA(k,hid)}/>')
        elif kind == 'bead':
            cx, cy = x + s/2, y + s/2
            out.append(shape_circle(cx, cy, s*.45, k, fr, hid))
        else:
            out.append(shape_rect(x, y, s, k, fr, hid, liquid=(kind == 'liquid'), pill=(kind == 'pill'), rx=(s*.3 if kind == 'round' else 2)))
    n = max(1, len(cs)); rows = math.ceil(n / cols); used = min(n, cols)
    W = cols * (w_cell + g) + (gap5 if gap5 else 0); H = rows * (s + rowgap)
    pre = ''
    if kind == 'bead':
        pre = ''.join(f'<line x1="0" x2="{W}" y1="{r*(s+rowgap)+s/2}" y2="{r*(s+rowgap)+s/2}" class="rod"/>' for r in range(rows))
    if kind == 'dot':  # fill unlit matrix to the row end
        for i in range(len(cs), rows * cols):
            r, c = divmod(i, cols); x = c*(s+g)+(gap5 if c >= 5 and gap5 else 0); y = r*(s+rowgap)
            pre += f'<circle cx="{x+s/2}" cy="{y+s/2}" r="{s*.22}" class="dd"/>'
    return svg(W, H, pre + ''.join(out), hid, dark=(kind == 'dot'))

def shape_circle(cx, cy, r, k, fr, hid):
    fa = f'fill="url(#{hid})"' if k == 'r' else ''
    if k == 'e': return f'<circle cx="{cx}" cy="{cy}" r="{r-.75}" class="e"/>'
    if fr >= .999: return f'<circle cx="{cx}" cy="{cy}" r="{r}" class="{cls(k)}" {fa}/>'
    cp = uid(); hh = 2*r*fr
    return (f'<circle cx="{cx}" cy="{cy}" r="{r-.75}" class="e"/><clipPath id="{cp}"><rect x="{cx-r}" y="{cy+r-hh}" width="{2*r}" height="{hh}"/></clipPath>'
            f'<circle cx="{cx}" cy="{cy}" r="{r}" clip-path="url(#{cp})" class="{cls(k)}" {fa}/>')

def tenframe(segs):
    hid = uid(); cs = cells(segs); s, g = 9, 2; out = []
    for i, (k, fr) in enumerate(cs):
        f, j = divmod(i, 10); fr_r, fr_c = divmod(f, 3); r, c = divmod(j, 5)
        x = fr_c * (5*(s+g) + 7) + c*(s+g); y = fr_r * (2*(s+g) + 7) + r*(s+g)
        out.append(shape_rect(x, y, s, k, fr, hid))
    frames = math.ceil(max(1, len(cs))/10)
    for f in range(frames):
        fr_r, fr_c = divmod(f, 3)
        out.insert(0, f'<rect x="{fr_c*(5*(s+g)+7)-2}" y="{fr_r*(2*(s+g)+7)-2}" width="{5*(s+g)+2}" height="{2*(s+g)+2}" rx="3" class="frm"/>')
    W = min(3, frames)*(5*(s+g)+7)+2; H = math.ceil(frames/3)*(2*(s+g)+7)+2
    return svg(W, H, f'<g transform="translate(2,2)">{"".join(out)}</g>', hid)

def tilebar(segs):
    """one continuous bar per ₹1,000 line, ₹100 ticks, 5-tick midpoint mark"""
    hid = uid(); total = sum(v for v, _ in segs); L = 150; hgt = 10; out = []; pos = 0
    rows = max(1, math.ceil(total/10 - 1e-9))
    for v, k in segs:
        rem = v
        while rem > 1e-6:
            r = int(pos // 10); off = pos - r*10; take = min(rem, 10-off)
            x = off/10*L; y = r*(hgt+4); w = take/10*L
            if k == 'e': out.append(f'<rect x="{x+.75}" y="{y+.75}" width="{w-1.5}" height="{hgt-1.5}" rx="2" class="e"/>')
            else: out.append(f'<rect x="{x}" y="{y}" width="{w}" height="{hgt}" rx="2" class="{k}" {FA(k,hid)}/>')
            pos += take; rem -= take
    for r in range(rows):
        for t in range(1, 10):
            out.append(f'<line x1="{t*L/10}" x2="{t*L/10}" y1="{r*(hgt+4)+(0 if t==5 else 3)}" y2="{r*(hgt+4)+hgt-(0 if t==5 else 3)}" class="tick{" mid" if t==5 else ""}"/>')
    return svg(L, rows*(hgt+4), ''.join(out), hid)

def jar(segs):
    hid = uid(); cs = cells(segs); s, g, cols = 8, 1.5, 6
    n = len(cs); cap = max(n, 18); rows = math.ceil(cap/cols)
    W = cols*(s+g)+8; H = rows*(s+g)+14; out = []
    out.append(f'<path d="M3,6 v{H-10} q0,4 4,4 h{W-14} q4,0 4,-4 v{-(H-10)}" class="jar"/><rect x="1" y="1" width="{W-2}" height="5" rx="2" class="lid"/>')
    for i, (k, fr) in enumerate(cs):
        r, c = divmod(i, cols); x = 4+c*(s+g); y = H-4-(r+1)*(s+g)
        out.append(shape_rect(x, y, s, k, fr, hid, rx=1.5))
    return svg(W, H, ''.join(out), hid)

def iso(segs):
    """isometric stacks: each column = ₹1,000 (10 cubes high)"""
    hid = uid(); cs = cells(segs); out = []; cw, ch = 9, 4.2
    cols = max(1, math.ceil(len(cs)/10)); W = cols*(cw+5)+cw+6; H = 10*ch+cw+8
    cubes = []
    for i, (k, fr) in enumerate(cs):
        col, lev = divmod(i, 10); cubes.append((col, lev, k, fr))
    for col, lev, k, fr in cubes:
        x = 3+col*(cw+5); hgt = ch*(fr if fr < 1 else 1); y = H-4-cw/2-(lev*ch)-hgt
        c = cls(k); fa = f'fill="url(#{hid})"' if k == 'r' else ''
        if k == 'e':
            out.append(f'<path d="M{x},{y+cw/4} l{cw/2},{cw/4} l{cw/2},{-cw/4} v{hgt} l{-cw/2},{cw/4} l{-cw/2},{-cw/4} z" class="e"/>'); continue
        out.append(f'<path d="M{x},{y+cw/4} l{cw/2},{cw/4} v{hgt} l{-cw/2},{-cw/4} z" class="{c}" {fa}/>'
                   f'<path d="M{x+cw/2},{y+cw/2} l{cw/2},{-cw/4} v{hgt} l{-cw/2},{cw/4} z" class="{c} sh" {fa}/>'
                   f'<path d="M{x},{y+cw/4} l{cw/2},{-cw/4} l{cw/2},{cw/4} l{-cw/2},{cw/4} z" class="{c} tp" {fa}/>')
    return svg(W, H, ''.join(out), hid)

def merge(segs, s=10, g=2):
    """complete ₹1,000 rows merge into one bar (5|5 notch kept); remainder stays as tiles"""
    hid = uid(); cs = cells(segs); out = []; W = 10*(s+g)+4
    rows = math.ceil(len(cs)/10)
    for r in range(rows):
        row = cs[r*10:(r+1)*10]; y = r*(s+g)
        full = len(row) == 10 and all(fr >= .999 for _, fr in row) and len({k for k, _ in row}) == 1
        if full:
            k = row[0][0]
            if k == 'e': out.append(f'<rect x=".75" y="{y+.75}" width="{W-g-1.5}" height="{s-1.5}" rx="{s/2}" class="e"/>')
            else: out.append(f'<rect x="0" y="{y}" width="{W-g}" height="{s}" rx="{s/2}" class="{k}" {FA(k,hid)}/><line x1="{(W-g)/2}" x2="{(W-g)/2}" y1="{y+2}" y2="{y+s-2}" class="notch"/>')
        else:
            for c, (k, fr) in enumerate(row):
                out.append(shape_rect(c*(s+g)+(4 if c >= 5 else 0), y, s, k, fr, hid))
    return svg(W, rows*(s+g), ''.join(out), hid)

def hybrid(segs, amount, cap=10):
    """number leads; at most one row of tiles (₹1,000 window) shows the shape"""
    hid = uid(); total = sum(v for v, _ in segs)
    if total <= cap:
        g = grid(segs, s=9)
    else:  # shrink to a 10-cell proportion strip, each cell = 10% of whole
        scale = 10/total; g = grid([(v*scale, k) for v, k in segs], s=9)
    return f'<div class="hy"><b>{E(amount)}</b>{g}</div>'

def daytiles(segs):  # 1 tile = 1 day of a ₹6,000 / 30-day budget = ₹200
    return grid([(v/2, k) for v, k in segs], s=10, cols=7, gap5=0)

AMT = {'chai': '₹25', 'meal': '₹350', 'budget': '₹6,000', 'income': '₹9,000', 'sub': '₹499', 'goal': '₹4,160'}
OPTS = [
 ('F', 'v11 baseline · ₹100 grid', 'Rows of 10, gap after 5. The reference everything else is judged against.', lambda k, sg: grid(sg)),
 ('G1', 'Dot-matrix glow', 'Lit dot = ₹100 on a dark matrix of unlit dots; recent dots glow brighter. From the Workouts reference.', lambda k, sg: grid(sg, kind='dot')),
 ('G2', 'Tile bar', 'One continuous bar per ₹1,000 line with ₹100 ticks; a longer tick marks ₹500.', lambda k, sg: tilebar(sg)),
 ('G3', 'Tile jar', 'Tiles stack bottom-up inside a jar outline, 6 wide; the jar is the category.', lambda k, sg: jar(sg)),
 ('G4', 'Isometric stacks', '3D cubes; one column of 10 = ₹1,000. Height reads as amount.', lambda k, sg: iso(sg)),
 ('G5', 'Merging rows', 'Tiles as today, but a complete ₹1,000 row fuses into one pill (notch at ₹500). Loose tiles stay tiles.', lambda k, sg: merge(sg)),
 ('G6', 'Tile + one number', 'The ₹ figure leads; up to ₹1,000 the tiles show it, above that a 10-cell strip shows proportion only.', lambda k, sg: hybrid(sg, AMT[k])),
 ('G7', 'Day-tiles', '1 tile = 1 day of budget (₹6,000 ÷ 30 = ₹200), rows of 7 = a week.', lambda k, sg: daytiles(sg)),
 ('G8', 'Liquid-fill tiles', '₹100 tiles; partials fill like liquid with a soft wave top, a natural home for pour animations.', lambda k, sg: grid(sg, kind='liquid')),
 ('G9', 'Rounded pills', '₹100 pills, rows of 10 with gap after 5; softer, reads as coins on a counter.', lambda k, sg: grid(sg, kind='pill', s=7, g=2, rowgap=3)),
 ('G10', 'Ten-frames', '2×5 frames of ₹100, each frame = ₹1,000; the maths-class shape for "ten".', lambda k, sg: tenframe(sg)),
 ('G11', 'Abacus beads', 'Beads on rods; one rod = ₹1,000, beads slide right as money arrives.', lambda k, sg: grid(sg, kind='bead', s=10, g=1.5)),
 ('G12', 'Density · compact', 'Same ₹100 grid at 6px for Insights and dense lists (density is a setting: compact / regular / airy).', lambda k, sg: grid(sg, s=6, g=1.5, gap5=3)),
 ('G13', 'Density · airy', 'Same grid at 14px rounded for Home cards and the pay moment.', lambda k, sg: grid(sg, s=14, g=3, gap5=6, kind='round')),
]
# scores: learn, glance, honest, scale, calm, motion, fit  (1-5)
W8 = [20, 20, 15, 15, 10, 10, 10]
SCORES = {
 'F': (5,4,5,3,4,3,4, 'Proven in v11; scale stops at ~₹10k and 90 loose tiles get busy.'),
 'G1': (4,4,5,3,5,5,4, 'Same counting as F, calmer and prettier on dark; partials become dimmer dots (less exact); weak in light/B&W.'),
 'G2': (4,5,4,4,4,3,4, 'Fast length read, but ticks are harder to count than tiles; loses the "pick up a tile" feeling.'),
 'G3': (4,3,4,2,4,4,3, 'Great metaphor for Spending jars; space-hungry, cannot hold income or 9k.'),
 'G4': (2,3,2,3,3,4,2, 'Pretty, but 3D distorts area and partials are unreadable; violates honesty.'),
 'G5': (5,5,5,5,4,5,5, 'Keeps F\'s unit and counting, cuts visual noise by up to 90%; rows split into tiles on touch or pay.'),
 'G6': (5,5,4,4,4,2,3, 'Very glanceable but puts ₹ back on surfaces; above ₹1,000 the tiles stop being ₹100.'),
 'G7': (2,3,3,3,4,3,2, 'Meaningful ("3 days of money") but the unit moves with the budget; v9 failure.'),
 'G8': (4,4,5,3,4,5,4, 'F with a friendlier partial; wave is only visible on the last tile.'),
 'G9': (4,4,5,3,5,4,4, 'Softer, coin-like; wider rows (1.8×) cost horizontal space on 360px phones.'),
 'G10': (4,4,5,3,3,3,3, 'Familiar ten, but frames wrap 3-across and break "row = ₹1,000".'),
 'G11': (3,4,5,3,4,5,3, 'Lovely sliding motion; beads read as discrete, partial bead is odd.'),
 'G12': (4,3,5,5,4,2,4, 'Not a form, a size: needed for Insights where 100+ tiles appear.'),
 'G13': (4,5,5,2,5,4,4, 'Not a form, a size: best for Home ≤30 tiles and the pay moment.'),
}
def total(k): return sum(a*b for a, b in zip(SCORES[k][:7], W8))/100

def gallery():
    out = []
    for key, name, desc, fn in OPTS:
        sc = ''.join(f'<div class="sc"><div class="sv">{fn(k, sg)}</div><b>{E(t)}</b><small>{E(sub)}</small></div>' for k, t, sub, sg in SC)
        out.append(f'<article class="opt" id="o-{key}"><header><span class="ok">{key}</span><h4>{E(name)}</h4><span class="tot">{total(key):.2f}</span></header><p>{E(desc)}</p><div class="scs">{sc}</div></article>')
    return '\n'.join(out)

def matrix():
    hd = ['Learnability 20', 'Glance 20', 'Honesty 15', 'Scale 15', 'Calm / aesthetic 10', 'Motion 10', 'Fit 5 tabs 10']
    rows = sorted(OPTS, key=lambda o: -total(o[0]))
    tr = []
    for key, name, *_ in rows:
        s = SCORES[key]
        cells = ''.join(f'<td class="sc{v}"><span>{v}</span></td>' for v in s[:7])
        tr.append(f'<tr><th scope="row"><span class="ok">{key}</span> {E(name)}</th>{cells}<td class="tt">{total(key):.2f}</td><td class="rs">{E(s[7])}</td></tr>')
    return ('<table class="smx"><thead><tr><th scope="col">Option</th>' + ''.join(f'<th scope="col">{h}</th>' for h in hd) +
            '<th scope="col">Weighted</th><th scope="col">Reasoning</th></tr></thead><tbody>' + ''.join(tr) + '</tbody></table>')

def collapse_demo():
    amts = [(4.5, '₹450'), (23, '₹2,300'), (90, '₹9,000'), (240, '₹24,000')]
    out = []
    for v, l in amts:
        if v <= 100: g = merge([(v, 'f')])
        else:
            # above ₹10,000: 10×10 block = ₹10,000 drawn as one rounded square, then rows
            blocks, rest = divmod(v, 100); hid = uid(); b = ''
            for i in range(int(blocks)): b += f'<rect x="{i*44}" y="0" width="40" height="40" rx="6" class="f"/><line x1="{i*44+20}" x2="{i*44+20}" y1="4" y2="36" class="notch"/><line x1="{i*44+4}" x2="{i*44+36}" y1="20" y2="20" class="notch"/>'
            g = svg(int(blocks)*44, 40, b, hid) + merge([(rest, 'f')])
        out.append(f'<div class="cd"><div class="sv">{g}</div><b>{l}</b></div>')
    return '<div class="cds">' + ''.join(out) + '</div>'

CSS = '''
.p2 .opts{display:grid;gap:14px}
.opt{background:var(--card);border:1px solid var(--rule);border-radius:12px;padding:14px 16px;display:grid;gap:8px}
.opt header{display:flex;gap:10px;align-items:baseline}
.opt h4{font:700 17px var(--f-disp);margin:0;flex:1}
.ok{justify-self:start;font:500 11px var(--f-mono);background:var(--tile-soft);color:var(--tile);padding:1px 6px;border-radius:4px}
.tot{font:500 12px var(--f-mono);color:var(--ink3)}
.opt>p{margin:0;color:var(--ink2);font-size:13px;max-width:80ch}
.scs{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}
.sc{display:grid;gap:2px;align-content:start}
.sc .sv,.cd .sv{min-height:64px;display:flex;flex-wrap:wrap;gap:6px;align-items:flex-end;padding:8px;border-radius:8px;background:var(--paper);overflow:hidden}
.sc svg,.cd svg{max-width:100%;height:auto}
.sc b{font-size:12px;font-weight:600}.sc small{font-size:11px;color:var(--ink3)}
.hy{display:flex;flex-direction:column;gap:4px}.hy b{font:700 18px var(--f-disp);font-variant-numeric:tabular-nums}
svg .f{fill:var(--t-f)} svg .s{fill:var(--t-s)} svg .r{stroke:var(--t-f);stroke-width:1}
svg .rb{fill:var(--card)} svg .rl{stroke:var(--t-f)}
svg .e{fill:none;stroke:var(--t-e);stroke-width:1.5}
svg .tick{stroke:var(--card);stroke-width:1.2} svg .tick.mid{stroke-width:1.6}
svg .notch{stroke:var(--card);stroke-width:1.5;opacity:.85}
svg .jar{fill:none;stroke:var(--ink3);stroke-width:1.5} svg .lid{fill:var(--ink3)}
svg .frm{fill:none;stroke:var(--rule);stroke-width:1.2}
svg .rod{stroke:var(--ink3);stroke-width:1}
svg .sh{filter:brightness(.78)} svg .tp{filter:brightness(1.18)}
.sv:has(svg.dk){background:#0c0e12}
svg.dk .dd{fill:#2b313b} svg.dk .lt.f{fill:#e8eefc} svg.dk .gl.f{fill:var(--t-f)} svg.dk .lt.s{fill:#d6f5ec} svg.dk .gl.s{fill:var(--t-s)} svg.dk .e{stroke:#3a414c}
svg.dk .rb{fill:#0c0e12} svg.dk .rl{stroke:#e8eefc}
.p2{--t-f:#2f63c9;--t-s:#1f9b84;--t-e:#b9c0cb}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .p2{--t-f:#5a8ae6;--t-s:#22a385;--t-e:#4a5260}}
:root[data-theme="dark"] .p2{--t-f:#5a8ae6;--t-s:#22a385;--t-e:#4a5260}
.p2.bw{--t-f:var(--ink);--t-s:var(--ink2);--t-e:var(--ink3)}
.p2.bw svg.dk .gl{fill:#fff;opacity:.35} .p2.bw svg.dk .lt.s{fill:#9aa1ab}
.p2.bw svg .sh,.p2.bw svg .tp{filter:none;opacity:.8}
.seg{display:inline-flex;border:1px solid var(--rule);border-radius:8px;overflow:hidden}
.seg button{font:500 12px var(--f-body);background:var(--card);color:var(--ink2);border:0;padding:6px 12px;cursor:pointer}
.seg button[aria-pressed="true"]{background:var(--ink);color:var(--paper)}
.keyrow{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--ink2);align-items:center}
.keyrow i{display:inline-block;width:10px;height:10px;border-radius:2px;vertical-align:-1px;margin-right:5px}
.smx{font-size:13px}.smx th,.smx td{padding:7px 8px;border-top:1px solid var(--rule);text-align:left;vertical-align:top}
.smx thead th{font:500 11px var(--f-mono);color:var(--ink3);position:sticky;top:0;background:var(--card);z-index:2}
.smx th[scope=row]{white-space:nowrap;font-weight:500;position:sticky;left:0;background:var(--card)}
.smx td[class^=sc]{text-align:center;font:500 12px var(--f-mono)}
.smx td span{display:inline-block;width:24px;padding:2px 0;border-radius:4px}
.smx .sc5 span{background:var(--tile);color:var(--card)}.smx .sc4 span{background:var(--tile-soft);color:var(--tile)}
.smx .sc3 span{background:var(--mute)}.smx .sc2 span,.smx .sc1 span{border:1px dashed var(--ink3);color:var(--ink3)}
.smx .tt{font:700 14px var(--f-mono)}.smx .rs{min-width:260px;color:var(--ink2)}
.recbox{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}
.recbox>div{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:14px 16px;display:grid;gap:6px;align-content:start}
.recbox .pri{border:2px solid var(--tile)}
.recbox h4{margin:0;font:700 16px var(--f-disp)}.recbox p,.recbox li{margin:0;font-size:13px;color:var(--ink2)}
.recbox ul{margin:0;padding-left:18px;display:grid;gap:3px}
.cds{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}.cd{display:grid;gap:3px}.cd b{font-size:12px}
.dec1{background:var(--card);border:1px solid var(--tile);border-radius:10px;padding:14px 16px}
.dec1 h3{font-size:17px;margin-bottom:6px}.dec1 ul{margin:0;padding-left:18px;display:grid;gap:3px;font-size:13.5px}
'''

P1DEC = '''<div class="dec1"><h3>Decided (Tarun, 1 Oct)</h3><ul>
<li><b>5 tabs:</b> Home · Income · Spending · Savings · Insights. The All spends list (with spend detail) lives in Spending.</li>
<li><b>Home bell:</b> an activity log of every action (income split, sweeps, subscriptions paid, moves, splits). The few items that need action sit at the top. Soft dot, no count badge.</li>
<li><b>Tab intros:</b> every tab has a one-page intro, shown on the first visit and reopened from a small "?".</li>
<li><b>Next money in</b> card on Home by default, with no ₹.</li>
<li><b>What changed:</b> one card in Insights; month by month is one tap deeper.</li>
<li><b>Deep views</b> (Sankey, spend range, time of day) go in the Insights library, not on the default board.</li>
<li><b>Full editing</b> (jars, budgets, period, savings share, subscriptions, UPI IDs) lives in each tab's settings, one decision per screen.</li>
<li>The rest of the MUST / NICE / NO list is accepted as recommended, with depth, and remapped onto the 5 tabs.</li></ul></div>'''

QS2 = [
 ('P2-Q1', 'Which tile form should v12 use?', ['A · Merging rows (G5): ₹100 tiles, and a complete ₹1,000 row fuses into one pill', 'B · Dot-matrix glow (G1) everywhere', 'C · Keep the v11 grid (F) as it is'], 'A', 'It keeps the learned ₹100 unit and counting but cuts visual noise, and rows splitting back into tiles gives motion a job.'),
 ('P2-Q2', 'How do large amounts collapse?', ['A · Full ₹1,000 rows merge into pills; above ₹10,000, 10 rows become one ₹10,000 square', 'B · No merging; above 100 tiles show the number only', 'C · Switch to a proportion strip (G6) above ₹1,000'], 'A', 'The same tile unit at every scale, with no second glyph: a pill is a row and a square is ten rows, both visibly made of tiles.'),
 ('P2-Q3', 'Where does the dot-matrix glow belong?', ['A · Only on position views (calendar, time of day, Home pace), never as money', 'B · As the money tile in the B&W/dark look', 'C · Nowhere'], 'A', 'It is beautiful on dark, but its partials are vague. Keeping it for dates and pace also keeps "position views look different from tiles" (a v11 rule).'),
 ('P2-Q4', 'Which density levels should ship?', ['A · Size follows the surface: airy on Home and the pay moment, regular in tabs, compact in Insights', 'B · A user setting (compact / regular / airy)', 'C · One size everywhere'], 'A', 'Home holds 30 tiles or fewer and Insights needs 100 or more. The surface decides the size, which saves the user a setting.'),
 ('P2-Q5', 'Key style?', ['A · "■ = ₹100" once per screen on the first tile visual, plus a line in each tab\'s "?" intro', 'B · A tiny persistent key in every card corner', 'C · Taught in onboarding only'], 'A', 'It worked in v11. The new tab intros are a natural second place for it, so cards stay clean.'),
]

def questions():
    out = []
    for q, txt, opts, rec, why in QS2:
        ol = ''.join(f'<li class="{"pick" if o.startswith(rec) else ""}">{E(o)}</li>' for o in opts)
        out.append(f'<article class="q"><div class="qid">{q}</div><h3>{E(txt)}</h3><ul>{ol}</ul><p class="qr"><b>Recommend {rec}.</b> {E(why)}</p></article>')
    return '<div class="qs">' + ''.join(out) + '</div>'

top3 = sorted(OPTS, key=lambda o: -total(o[0]))[:3]
SECTION = f'''<section class="phase p2" id="p2" style="margin-top:48px">
  <h2><span>Phase 2</span> Tile exploration</h2>
  <p class="lede" style="margin:0">14 ways to draw money, each shown with the same six amounts. The ₹100 value stays everywhere except G6 and G7, which argue for another unit. None of them uses a second unit or shape denominations.</p>
  <div class="block">
    <h3>Options gallery</h3>
    <div class="keyrow"><div class="seg" role="group" aria-label="Look"><button type="button" data-look="c" aria-pressed="true">Colour</button><button type="button" data-look="bw" aria-pressed="false">B&amp;W</button></div>
    <span><i style="background:var(--t-f)"></i>budget / spendable</span><span><i style="background:var(--t-s)"></i>savings</span><span><i style="border:1.5px solid var(--t-e)"></i>still to fill</span><span><i style="background:repeating-linear-gradient(45deg,var(--t-f) 0 2px,transparent 2px 4px)"></i>reserved (subscription)</span></div>
    <div class="opts">{gallery()}</div>
  </div>
  <div class="block">
    <h3>Score matrix</h3>
    <p class="note">1–5 per criterion, with weights shown in each column header. Honesty means area tracks ₹ and partials read correctly. Fit means it works across Home, Income, Spending, Savings and Insights.</p>
    <div class="scroll">{matrix()}</div>
  </div>
  <div class="block">
    <h3>Recommendation</h3>
    <div class="recbox">
      <div class="pri"><span class="ok">Primary · G5</span><h4>Merging rows</h4><p>₹100 tiles in rows of 10 with a gap after 5, exactly as learned in v11. When a row is complete it fuses into one pill (₹1,000) with a notch at ₹500. When you pay, the pill cracks back into tiles and some of them leave. Up to 90% less visual noise, and the unit never changes.</p></div>
      <div><span class="ok">Alternative · G8 / G1</span><h4>Liquid-fill tiles + glow for position</h4><p>If G5 tests badly, use G8 (the same grid with a friendlier partial tile). The dot-matrix glow (G1) is kept for position views either way: calendar, time of day and the Home pace glow.</p></div>
      <div><h4>Large-amount collapse</h4><ul><li>Below ₹1,000: loose tiles</li><li>₹1,000–₹10,000: whole rows as pills plus loose tiles</li><li>Above ₹10,000: ten rows become one ₹10,000 square (a 2×2 notch), then pills, then tiles</li><li>Collapse is still made of tiles; tap to expand</li></ul></div>
      <div><h4>Key style</h4><ul><li>"■ = ₹100" once per screen, on the first tile visual</li><li>Repeated in each tab's "?" intro, with "a full row = ₹1,000"</li><li>Size follows the surface: airy (Home, pay) · regular (tabs) · compact (Insights)</li></ul></div>
    </div>
    <p class="note" style="margin-top:6px">Collapse ladder with G5 (₹450 · ₹2,300 · ₹9,000 · ₹24,000):</p>
    {collapse_demo()}
  </div>
  <div class="block">
    <h3>Questions for Tarun</h3>
    <p class="note">The recommended option is highlighted. Reply with letters, for example "P2-Q1 A".</p>
    {questions()}
  </div>
</section>'''

JS = '''<script>(function(){var s=document.getElementById('p2');document.querySelectorAll('[data-look]').forEach(function(b,i,a){b.addEventListener('click',function(){a.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});s.classList.toggle('bw',b.dataset.look==='bw')})})})();</script>'''

src = open('board_p1.html').read()
src = src.replace('</style>', CSS + '</style>', 1)
src = src.replace('<h2><span>Phase 1</span> Recovery audit</h2>', '<h2><span>Phase 1</span> Recovery audit</h2>\n' + P1DEC, 1)
import re
src = re.sub(r'<section class="later" id="p2">.*?</section>', SECTION, src, count=1, flags=re.S)
src = src.replace('Opens after Phase 1 decisions are logged.', 'Opens after Phase 2 decisions are logged.')
src = src.replace('href="#p1" class="now"', 'href="#p1" class=""').replace('href="#p2" class=""', 'href="#p2" class="now"')
src = src.replace('</div>\n<script>', '</div>\n' + JS + '\n<script>', 1)
open('board.html', 'w').write(src)
print(len(src)/1e6, [(o[0], round(total(o[0]), 2)) for o in top3])

# markdown
md = ['# Trickle v12 — Phase 2: Tile exploration\n', 'Board: Trickle v12 — Decision Board, Phase 2 section (https://claude.ai/artifact/7pWwnVcSLcG1RYB9WuwcYD). Same 6 scenarios in every option: ₹25 chai, ₹350 meal, ₹6,000 budget, ₹9,000 income (₹3,000 savings + ₹6,000 budget), ₹499 subscription (reserved), goal ₹8,000 at 52%. Every option also renders in B&W. Palette validated with the dataviz checker (light #2f63c9/#1f9b84, dark #5a8ae6/#22a385: all checks pass).\n',
      'Rules kept from the audit: one unit (₹100), no shape denominations, no red, no numbers on Home.\n', '## Options\n']
for key, name, desc, _ in OPTS: md.append(f'- **{key} {name}**: {desc}')
md.append('\n## Score matrix (1–5; weights L20 G20 H15 S15 Calm10 Motion10 Fit10)\n| Option | Learn | Glance | Honest | Scale | Calm | Motion | Fit | Weighted | Reasoning |\n|---|---|---|---|---|---|---|---|---|---|')
for key, name, *_ in sorted(OPTS, key=lambda o: -total(o[0])):
    s = SCORES[key]; md.append(f'| {key} {name} | ' + ' | '.join(map(str, s[:7])) + f' | **{total(key):.2f}** | {s[7]} |')
md.append('''
## Recommendation
- **Primary: G5, merging rows.** ₹100 tiles, rows of 10 with a 5|5 gap. A complete ₹1,000 row fuses into one pill with a notch at ₹500. On pay the pill cracks into tiles and some leave.
- **Alternative: G8, liquid-fill tiles**, with the G1 dot-matrix glow kept for position views (calendar, time of day, pace) either way.
- **Collapse:** below ₹1,000 loose tiles; ₹1,000–₹10,000 pills + tiles; above ₹10,000 one ₹10,000 square (10 rows) + pills + tiles; tap expands.
- **Key:** "■ = ₹100" once per screen on the first tile visual, repeated in every tab's "?" intro along with "a full row = ₹1,000".
- **Density by surface:** airy on Home and pay, regular in tabs, compact in Insights.
- Rejected: G4 isometric (3D distorts area), G7 day-tiles (moving unit, the v9 failure), G6 hybrid (puts ₹ back on surfaces, and its tiles stop being ₹100 above ₹1,000).

## Questions for Tarun
''')
for q, txt, opts, rec, why in QS2:
    md.append(f'**{q}. {txt}**\n' + '\n'.join('- ' + o for o in opts) + f'\n- Recommendation: **{rec}**: {why}\n')
open('v12_phase2_tiles.md', 'w').write('\n'.join(md))
dec = open('v12_decisions.md').read()
rows = '\n'.join(f"| {q} | {txt} | {' / '.join(o.replace(' · ', ': ', 1) for o in opts)} | {rec} | | open | |" for q, txt, opts, rec, why in QS2)
hdr = '## Phase 2 — Tile exploration\n| # | Question | Options | Recommended | Tarun\'s answer | Status | Date |\n|---|---|---|---|---|---|---|\n'
if 'P2-Q1' not in dec: dec = dec.replace(hdr, hdr.replace('## Phase 2 — Tile exploration\n', '## Phase 2 — Tile exploration\nSource: claude/v12_phase2_tiles.md\n\n') + rows + '\n')
open('v12_decisions.md', 'w').write(dec)
