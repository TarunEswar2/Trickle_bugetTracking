import html, re, math
E = html.escape
D, G = 10, 2.0                 # dot diameter, gap (countable)
R = D / 2
PW = 10 * D + 9 * G            # pill length (= block side)

def inr(n):
    s = str(n)
    if len(s) > 3:
        h = s[:-3][::-1]; h = ','.join(h[i:i+2] for i in range(0, len(h), 2))[::-1]; s = h + ',' + s[-3:]
    return '₹' + s

# ---------------- cup fill inside a circle: three area-true options ----------------
def _ring(cx, cy, r): return f'<circle class="cupo" cx="{cx:.1f}" cy="{cy:.1f}" r="{r-.4:.2f}"/>'
def cup_wedge(cx, cy, r, f, c):
    """A: pie wedge, clockwise from 12 o'clock. Area = f exactly; quarters read as clock quarters."""
    if f >= 1: return f'<circle class="{c}" cx="{cx:.1f}" cy="{cy:.1f}" r="{r}"/>'
    a = 2 * math.pi * f; x = cx + r * math.sin(a); y = cy - r * math.cos(a)
    return _ring(cx, cy, r) + f'<path class="{c}" d="M{cx:.2f} {cy:.2f} V{cy-r:.2f} A{r} {r} 0 {1 if f > .5 else 0} 1 {x:.2f} {y:.2f} Z"/>'
def cup_core(cx, cy, r, f, c):
    """B: concentric core. Inner disc radius r·√f so its area is f of the dot."""
    if f >= 1: return f'<circle class="{c}" cx="{cx:.1f}" cy="{cy:.1f}" r="{r}"/>'
    return _ring(cx, cy, r) + f'<circle class="{c}" cx="{cx:.2f}" cy="{cy:.2f}" r="{r*math.sqrt(f):.2f}"/>'
def seg_h(f):
    lo, hi = 0.0, 2.0          # circle of r=1: find h with segment area = f·π
    for _ in range(40):
        h = (lo + hi) / 2; A = math.acos(1 - h) - (1 - h) * math.sqrt(max(2*h - h*h, 0))
        lo, hi = (h, hi) if A < f * math.pi else (lo, h)
    return h
def cup_level(cx, cy, r, f, c):
    """C: liquid level, height solved so the filled AREA is f (not the height)."""
    if f >= 1: return f'<circle class="{c}" cx="{cx:.1f}" cy="{cy:.1f}" r="{r}"/>'
    h = seg_h(f) * r; y0 = cy + r - h; dx = math.sqrt(max(r*r - (y0-cy)**2, 0))
    return _ring(cx, cy, r) + f'<path class="{c}" d="M{cx-dx:.2f} {y0:.2f} A{r} {r} 0 {1 if f > .5 else 0} 0 {cx+dx:.2f} {y0:.2f} Z"/>'
def cup_height(cx, cy, r, f, c):   # the 2d version, for contrast only
    if f >= 1: return f'<circle class="{c}" cx="{cx:.1f}" cy="{cy:.1f}" r="{r}"/>'
    y0 = cy + r - 2*r*f; dx = math.sqrt(max(r*r - (y0-cy)**2, 0))
    return _ring(cx, cy, r) + f'<path class="{c}" d="M{cx-dx:.2f} {y0:.2f} A{r} {r} 0 {1 if f > .5 else 0} 0 {cx+dx:.2f} {y0:.2f} Z"/>'
CUP = cup_wedge   # recommended default, used across every concept below

def dot(cx, cy, c, f=1, r=R):
    return CUP(cx, cy, r, f, c) if f < 1 else f'<circle class="{c}" cx="{cx:.1f}" cy="{cy:.1f}" r="{r - (.45 if c in OUTL else 0):.2f}"/>'
OUTL = {'o', 'rs', 'ow', 'gh', 'big', 'hx'}

def lad(a):
    b, r = divmod(a, 10000); p, r = divmod(r, 1000); t, c = divmod(r, 100); return b, p, t, c

def cells_of(segs):
    """blocks per segment, then a continuous ₹100 cell sequence (shared groups of ten)."""
    B, C = [], []
    for a, c in segs:
        b, r = divmod(a, 10000); B += [c]*b
        n, cu = divmod(r, 100); C += [(c, 1)]*n
        if cu: C.append((c, cu/100))
    return B, [C[i:i+10] for i in range(0, len(C), 10)]
def pure(g): return len(g) == 10 and all(f == 1 for _, f in g) and len({c for c, _ in g}) == 1

def svg(inner, w, h, title, sc=1.5, pad=3):
    return (f'<svg viewBox="{-pad} {-pad} {w+2*pad:.0f} {h+2*pad:.0f}" width="{(w+2*pad)*sc:.0f}" height="{(h+2*pad)*sc:.0f}" '
            f'role="img" aria-label="{E(title)}"><title>{E(title)}</title>{inner}</svg>')
def tx(x, y, s, c='lbl', a='start'):
    return f'<text class="{c}" x="{x:.1f}" y="{y:.1f}" text-anchor="{a}">{E(s)}</text>'
def blk(x, y, c): return f'<rect class="{c} blk" x="{x:.1f}" y="{y:.1f}" width="{PW:.1f}" height="{PW:.1f}" rx="{D}"/>'

# =============== concept renderers: amt(segs, x, y) -> (inner, w, h) ===============
def md(segs, x0=0, y0=0, bc=2):
    """Merging Dots: blocks left (hairline gap), pills stacked right, loose dots under the pills."""
    B, P, T = [], [], []
    for a, c in segs:
        b, p, t, cu = lad(a); B += [c]*b; P += [c]*p; T += [(c, 1)]*t
        if cu: T.append((c, cu/100))
    o = []; x = x0; hB = 0
    if B:
        cols = min(bc, len(B))
        for i, c in enumerate(B): o.append(blk(x0 + (i % cols)*(PW+G), y0 + (i//cols)*(PW+G), c))
        x = x0 + cols*(PW+G) + G; hB = math.ceil(len(B)/cols)*(PW+G) - G
    y = y0
    for c in P: o.append(f'<rect class="{c}" x="{x:.1f}" y="{y:.1f}" width="{PW:.1f}" height="{D}" rx="{R}"/>'); y += D+G
    for i, (c, f) in enumerate(T): o.append(dot(x + (i % 10)*(D+G) + R, y + (i//10)*(D+G) + R, c, f))
    if T: y += math.ceil(len(T)/10)*(D+G)
    w = (x - x0) + (PW if P or len(T) >= 10 else (len(T)*(D+G) - G if T else 0))
    return ''.join(o), max(w, 1), max(hB, y - y0 - G)

def lanes_v(segs, x0=0, y0=0):
    """Day lanes, generic form: the same ladder stood upright — a lane of ten dots fuses into a standing pill."""
    B, Gs = cells_of(segs); o = []; x = x0
    H = PW if (B or any(pure(g) for g in Gs)) else max(len(g) for g in Gs)*(D+G) - G
    for c in B: o.append(blk(x, y0 + H - PW, c)); x += PW + G*2
    for g in Gs:
        if pure(g): o.append(f'<rect class="{g[0][0]}" x="{x:.1f}" y="{y0:.1f}" width="{D}" height="{PW:.1f}" rx="{R}"/>')
        else:
            for j, (c, f) in enumerate(g): o.append(dot(x+R, y0 + H - R - j*(D+G), c, f))
        x += D + G*1.6
    return ''.join(o), max(x - x0 - G, 1), H

def glass(segs, x0=0, y0=0):
    """Glass columns: a glass holds ten ₹100 dots (₹1,000); a full glass of one kind fuses into one column. ₹10,000 = a jug."""
    B, Gs = cells_of(segs); o = []; x = x0; H = PW + 6
    for c in B:
        o.append(f'<rect class="glass" x="{x:.1f}" y="{y0:.1f}" width="{PW+6:.1f}" height="{H:.1f}" rx="6"/>' + blk(x+3, y0+3, c)); x += PW + 6 + 4
    for g in Gs:
        o.append(f'<path class="glass" d="M{x:.1f} {y0:.1f} V{y0+H-3:.1f} Q{x:.1f} {y0+H:.1f} {x+3:.1f} {y0+H:.1f} H{x+D+3:.1f} Q{x+D+6:.1f} {y0+H:.1f} {x+D+6:.1f} {y0+H-3:.1f} V{y0:.1f}"/>')
        if pure(g): o.append(f'<rect class="{g[0][0]}" x="{x+3:.1f}" y="{y0+3:.1f}" width="{D}" height="{PW:.1f}" rx="{R}"/>')
        else:
            for j, (c, f) in enumerate(g): o.append(dot(x+3+R, y0 + H - 3 - R - j*(D+G), c, f))
        x += D + 6 + 4
    return ''.join(o), max(x - x0 - 4, 1), H

BR = 17   # bangle radius
def bangle(segs, x0=0, y0=0, per=5):
    """Bangles: ten beads close a bangle (₹1,000); a closed bangle of one kind fuses into a solid ring. ₹10,000 = a kada (ring with 10× the area)."""
    B, Gs = cells_of(segs); o = []; S = 2*BR + D + 4; x = x0; h = 0
    for k, c in enumerate(B):
        ri = 14; ro = math.sqrt(ri*ri + 10*4*BR*R); cx, cy = x0 + (k % 4)*(2*ro+6) + ro, y0 + (k//4)*(2*ro+6) + ro; x = x0 + min(len(B), 4)*(2*ro+6); h = max(h, (k//4+1)*(2*ro+6)-6)
        o.append(f'<path class="{c}" fill-rule="evenodd" d="M{cx-ro} {cy} a{ro} {ro} 0 1 0 {2*ro} 0 a{ro} {ro} 0 1 0 {-2*ro} 0 Z M{cx-ri:.2f} {cy} a{ri:.2f} {ri:.2f} 0 1 0 {2*ri:.2f} 0 a{ri:.2f} {ri:.2f} 0 1 0 {-2*ri:.2f} 0 Z"/>')
    bx = x
    for k, g in enumerate(Gs):
        cx = bx + (k % per)*S + S/2; cy = y0 + (k//per)*S + S/2; h = max(h, (k//per + 1)*S)
        if pure(g):
            ro, ri = BR+R, BR-R
            o.append(f'<path class="{g[0][0]}" fill-rule="evenodd" d="M{cx-ro} {cy} a{ro} {ro} 0 1 0 {2*ro} 0 a{ro} {ro} 0 1 0 {-2*ro} 0 Z M{cx-ri} {cy} a{ri} {ri} 0 1 0 {2*ri} 0 a{ri} {ri} 0 1 0 {-2*ri} 0 Z"/>')
        else:
            o.append(f'<circle class="thread" cx="{cx:.1f}" cy="{cy:.1f}" r="{BR}"/>')
            for j, (c, f) in enumerate(g):
                a = -math.pi/2 + j*2*math.pi/10; o.append(dot(cx + BR*math.cos(a), cy + BR*math.sin(a), c, f, r=R*.92))
    w = (bx - x0) + min(len(Gs), per)*S
    return ''.join(o), max(w, 1), max(h, 1)

def ticket(segs, x0=0, y0=0):
    """Ticket strip: a ticket is a ₹100 dot on a stub; ten tickets make a perforated strip (₹1,000); ten strips bind into a booklet (₹10,000)."""
    B, Gs = cells_of(segs); o = []; y = y0; x = x0; TW = 10*(D+G) + 4; hb = 0
    for i, c in enumerate(B):
        bx = x0 + (i % 2)*(PW+10); by = y0 + (i//2)*(PW+8)
        o.append(f'<rect class="stock" x="{bx-2:.1f}" y="{by-2:.1f}" width="{PW+4:.1f}" height="{PW+4:.1f}" rx="3"/>' + blk(bx, by, c) +
                 f'<line class="spine" x1="{bx+3:.1f}" x2="{bx+3:.1f}" y1="{by+4:.1f}" y2="{by+PW-4:.1f}"/>'); hb = math.ceil(len(B)/2)*(PW+8)
    if B: x = x0 + min(len(B), 2)*(PW+10)
    for g in Gs:
        o.append(f'<rect class="stock" x="{x:.1f}" y="{y:.1f}" width="{TW:.1f}" height="{D+4}" rx="2"/>')
        if pure(g): o.append(f'<rect class="{g[0][0]}" x="{x+2:.1f}" y="{y+2:.1f}" width="{PW:.1f}" height="{D}" rx="{R}"/>')
        else:
            for j, (c, f) in enumerate(g): o.append(dot(x + 2 + j*(D+G) + R, y + 2 + R, c, f))
        o.append(''.join(f'<line class="perf" x1="{x+2+k*(D+G)-G/2:.1f}" x2="{x+2+k*(D+G)-G/2:.1f}" y1="{y-.5:.1f}" y2="{y+D+4.5:.1f}"/>' for k in range(1, 10)))
        y += D + 7
    w = (x - x0) + (TW if Gs else 0)
    return ''.join(o), max(w, 1), max(hb, y - y0 - 3)

TOPC = {'f', 's', 'rs', 'ow', 'rf', 'sw', 'gh', 'pv', 'cs'}
def hourglass(segs, x0=0, y0=0):
    """Hourglass: what is left sits on top; every pay drops through the neck and piles below as outlines."""
    top = [(a, c) for a, c in segs if c in TOPC and c not in ('gh',)]
    bot = [(a, c) for a, c in segs if c not in TOPC or c == 'gh']
    nb = sum(a // 10000 for a, c in segs); bc = 1 if nb <= 1 else 3
    ti, tw, th = md(top, x0+8, y0+4, bc=bc) if top else ('', 0, 0)
    W = max(tw, PW) + 16; o = []
    th = max(th, D); tb = y0 + th + 8
    o.append(ti)
    neck = 10
    o.append(f'<path class="glass" d="M{x0} {y0-2} V{tb:.1f} L{x0+W/2-3:.1f} {tb+neck:.1f} M{x0+W} {y0-2} V{tb:.1f} L{x0+W/2+3:.1f} {tb+neck:.1f}"/>')
    bi, bw, bh = md(bot, 0, 0, bc=bc) if bot else ('', 0, 0)
    bh = max(bh, D); by = tb + neck + 6
    if bi: o.append(f'<g transform="translate({x0+8} {by:.1f})">{bi}</g>')
    end = by + bh + 6
    o.append(f'<path class="glass" d="M{x0+W/2-3:.1f} {tb+neck:.1f} L{x0} {by-2:.1f} V{end:.1f} H{x0+W} V{by-2:.1f} L{x0+W/2+3:.1f} {tb+neck:.1f}"/>')
    return ''.join(o), W, end - y0

# Day lanes: daily view (used where the moment is about days)
def lanes_days(rows, per=300, today=None, labels='MTWTFSS', title='', note=None):
    """rows: list of per-day segment lists (each sums ≈ per). Each lane is a day's share stood upright."""
    o = []; cw = D + 9; n = len(rows); slots = math.ceil(per/100); H = slots*(D+G)
    for d, segs in enumerate(rows):
        x = d*cw; cells = []
        for a, c in segs:
            k, cu = divmod(a, 100); cells += [(c, 1)]*k
            if cu: cells.append((c, cu/100))
        for j, (c, f) in enumerate(cells): o.append(dot(x+R, H - R - j*(D+G), c, f))
        if n <= 31 and (n <= 7 or d % 5 == 0): o.append(tx(x+R, H+9, labels[d % len(labels)] if n <= 7 else str(d+1), 'lbl mid'))
    if today is not None: o.append(f'<rect class="today" x="{today*cw-3:.1f}" y="-3" width="{D+6}" height="{H+4:.1f}" rx="5"/>')
    return svg(''.join(o), n*cw - 9, H + 11, title)

CONCEPTS = [
 ('md', 'Merging Dots', "Tarun's", md,
  'A dot is ₹100. Ten dots in a row fuse into a pill (₹1,000); ten pills into a block (₹10,000). Blocks keep a hairline gap. Less than ₹100 fills a dot like a clock wedge.',
  'His own form; the purest isotype (repeat the unit, never enlarge it). Works for every kind of money.',
  'Long rows for mid amounts (₹6,000–9,000 = 6–9 pills). Needs one more idea for "today".'),
 ('dl', 'Day lanes', 'N2', lanes_v,
  'The same dots stood upright. For spending money, each lane is one day\'s share; today\'s lane empties as you pay.',
  'Answers "can I afford this today?" without a number (per-day allowance, M3). Upright pills keep the ladder.',
  'Income, goals and subscriptions are not daily; for them lanes are just upright pills. Daily shares can feel like a diet.'),
 ('gc', 'Glass columns', 'N3', glass,
  'A glass holds ten ₹100 dots (₹1,000). Dots stack from the bottom; a full glass fuses into one column. ₹10,000 is a jug.',
  'Level is read at a glance and the dots inside keep the count (fixes 2d\'s "no discrete count"). Drain/fill is a natural pay motion.',
  'Glass outlines add ink; 9+ glasses get wide. "Level" implies liquid, which suits spending more than savings.'),
 ('bg', 'Bangles', 'N4', bangle,
  'Ten ₹100 beads close a bangle (₹1,000). A closed bangle fuses into a solid ring. ₹10,000 is a kada with ten bangles\' worth of area.',
  'Closing the ring is a strong "done" signal: good for goals and the four-chai moment (goal gradient, Kivetz 2006).',
  'Rings use 2–3× the space of rows and are harder to compare side by side (no common baseline). The kada is big.'),
 ('hg', 'Hourglass', 'N5', hourglass,
  'What is left sits in the top bulb as dots; every pay drops through the neck and piles in the lower bulb as outlines.',
  'One picture holds left and spent with no subtraction; the drop is the pay animation. Strong Home hero.',
  'One jar per glass; categories need several small glasses. Savings "fill up" reads reversed.'),
 ('ts', 'Ticket strip', 'N1', ticket,
  'A ticket is a ₹100 dot on a stub. Ten tickets make a perforated strip (₹1,000); ten strips bind into a booklet (₹10,000). Paying tears tickets off.',
  'Tearing is a felt metaphor for the pain of paying (Prelec & Loewenstein 1998); perforations keep the count visible.',
  'Stock outlines add ink; strips read like a long bar. Tearing can feel like loss, raising anxiety slightly.'),
]

cats = [('Food', 800, 2200), ('Travel', 700, 800), ('Fun', 400, 600), ('Other', 200, 300)]
STATES = [
 ('S1', 'Income arrives + split', '₹9,000 came in: ₹6,000 to this month, ₹499 held for subscriptions, ₹2,501 to savings.', 'M7 part-to-whole; mental accounting (Thaler 1999; Heath & Soll 1996).'),
 ('S2', 'Category budgets', '₹2,100 of ₹6,000 left. Food has the most left; Other is nearly done.', 'M1 leftover-first + M14 jars side by side; whole stays visible (Garcia-Retamero 2010).'),
 ('S3', 'Subscriptions auto-deducted', '₹493 held for three subscriptions. Spotify is paid; the other two leave on their dates.', 'Earmarking (Soman & Cheema 2011): held money is dashed, never counted as left.'),
 ('S4', 'Pay ₹350 (animated)', 'Three and a half dots lift out and stay as outlines. ₹1,750 left.', 'M2 pay moment (Soman 2001; Prelec & Loewenstein 1998).'),
 ('S5', 'Four ₹25 chais', 'Each chai fills a quarter wedge; the fourth completes one ₹100 dot.', 'M4 crumbs stack into a tile; frequency format (Gigerenzer & Hoffrage 1995).'),
 ('S6', 'Big one-off ₹2,400', '₹2,400 left at once: about 7 of your usual dinners.', 'M5 own-unit equivalents (Barrio 2016; Riederer 2018). Marked once, no alarm.'),
 ('S7', 'Overspend / empty jar', 'Fun is empty. The extra ₹250 came from Food; Food has ₹550 left.', 'No red (ostrich effect, Olafsson & Pagel 2018). Extra is hatched, outside the jar.'),
 ('S8', 'Split + owed back', 'You paid ₹1,200. Your share is ₹300; ₹900 is coming back from three friends.', 'Owed is dashed green: drawn, not spendable until it arrives.'),
 ('S9', 'Refund', '₹350 came back. Outlines refill; Food has ₹1,150 left again.', 'Reverse of the pay motion. Same rule, no new symbol.'),
 ('S10', 'Goal ₹8,000 at 52%', '₹4,160 saved for the phone. ₹3,840 to go.', 'M6 goal: saved solid, to-go outlined (Kivetz 2006).'),
 ('S11', 'Month-end leftover → savings', '₹400 was left on the 30th. It moved into savings.', 'Leftover becomes progress, not a reset (goal gradient).'),
 ('S12', 'This week vs last week', 'You spent ₹600 more than last week, mostly Friday food.', 'M8 ghost + hatched extra + one sentence (locked, P2c-Q4).'),
 ('S13', 'Category comparison', 'Food took the most: ₹2,200 of ₹3,900 spent.', 'Aligned rows on a common baseline read best (Cleveland & McGill 1984).'),
 ('S14', 'Day view', 'Thursday was the big day. Wednesday you spent nothing.', 'Position over time; glow ring only marks today (P2-Q3).'),
 ('S15', 'Tap-zoom + scale', '₹25 → ₹350 → ₹6,600 → ₹1,23,000, same rules. Tap a figure to zoom one level.', 'P2b-Q3 zoom one level; repeat, never enlarge (A2).'),
]

def stack(amt, parts, gap=8):
    o = []; y = 0; W = 0
    for lab, segs in parts:
        if lab: o.append(tx(0, y+7, lab)); y += 11
        if segs:
            i, w, h = amt(segs, 0, y); o.append(i); y += h + gap; W = max(W, w)
        else: y += gap
    return ''.join(o), max(W, 90), y - gap

WEEK = [350, 125, 0, 600, 250, 75, 200]
def state_fig(key, amt, sid):
    S = lambda parts, t, gap=8: svg(*stack(amt, parts, gap), t)
    if sid == 'S1': return S([('Arrives · ₹9,000', [(9000, 'f')]), ('This month · ₹6,000', [(6000, 'f')]), ('Held for subscriptions · ₹499', [(499, 'rs')]), ('Savings · ₹2,501', [(2501, 's')])], 'Income split')
    if sid == 'S2':
        if key == 'hg':
            o = []; Y = 0; H = 0
            for k, (n, l, s) in enumerate(cats):
                x = (k % 2)*(PW + 28); 
                if k == 2: Y += H + 16; H = 0
                i, w, h = hourglass([(l, 'f'), (s, 'o')], x, Y + 12); o.append(tx(x, Y + 7, n) + i); H = max(H, h + 12)
            return svg(''.join(o), 2*PW + 44, Y + H, 'Four category hourglasses', sc=1.2)
        return S([(f'{n} · {inr(l)} left of {inr(l+s)}', [(l, 'f'), (s, 'o')]) for n, l, s in cats], 'Category budgets')
    if sid == 'S3': return S([('Spotify · paid on the 3rd', [(119, 'o')]), ('Prime · leaves on the 18th', [(299, 'rs')]), ('iCloud · leaves on the 24th', [(75, 'rs')])], 'Subscriptions')
    if sid == 'S4':
        if key == 'dl':
            return lanes_days(
                [[(300, 'pv')], [(50, 'pv'), (250, 'f')], [(300, 'f')], [(300, 'f')], [(300, 'f')], [(250, 'f')], [(0, 'f')]], per=300, today=0, title='Pay ₹350: today empties, ₹50 borrowed from tomorrow')
        return S([('Food · before ₹2,100 left', None), ('', [(1750, 'f'), (350, 'pv'), (900, 'o')])], 'Pay ₹350 animation')
    if sid == 'S5':
        if key == 'dl':
            return lanes_days([[(300 - 25*k, 'f'), (25*k, 'cs')] for k in range(1, 5)], per=300, today=3, labels=['1 chai', '2', '3', '4'], title='Chais eat into today')
        o = []; y = 0; W = 0
        for k in range(1, 5):
            o.append(tx(0, y+7, f'{k} chai{"s" if k > 1 else ""} · ₹{25*k}')); y += 11
            i, w, h = amt([(25*k, 'cs')], 0, y); o.append(i); y += h + 6; W = max(W, w)
        return svg(''.join(o), max(W, 80), y - 6, 'Four chais')
    if sid == 'S6': return S([('Before · ₹4,500 left', [(4500, 'f')]), ('After the ₹2,400 repair', [(2100, 'f'), (2400, 'big')])], 'Big one-off')
    if sid == 'S7':
        if key == 'dl':
            return lanes_days([[(300, 'o')], [(300, 'o')], [(300, 'o'), (100, 'hx')], [(150, 'f'), (150, 'o')], [(300, 'f')], [(300, 'f')], [(300, 'f')]], per=400, today=2, title='Today went over; extra comes out of tomorrow')
        return S([('Fun · ₹1,000 jar, empty', [(1000, 'o')]), ('₹250 extra, taken from Food', [(250, 'hx')]), ('Food · after the move', [(550, 'f'), (2450, 'o')])], 'Overspend')
    if sid == 'S8': return S([('You paid ₹1,200 for four', [(1200, 'o')]), ('Your share', [(300, 'o')]), ('Coming back from 3 friends', [(900, 'ow')])], 'Split bill')
    if sid == 'S9': return S([('₹350 back (order cancelled)', [(350, 'rf')]), ('Food after refund', [(800, 'f'), (350, 'rf'), (1850, 'o')])], 'Refund')
    if sid == 'S10':
        segs = [(4160, 's'), (3840, 'o')]
        if key == 'hg': segs = [(3840, 'gh'), (4160, 's')]   # reversed: saved piles below
        return S([('Phone · ₹8,000 · 52%', segs)], 'Goal')
    if sid == 'S11': return S([('September · ₹400 left on the 30th', [(400, 'f')]), ('Savings after the sweep', [(4100, 's'), (400, 'sw')])], 'Month-end sweep')
    if sid == 'S12':
        if key == 'dl':
            last = [300, 200, 100, 300, 200, 300, 300]; this = [300, 200, 100, 300, 800, 300, 300]
            return lanes_days([[(min(t, l), 'o'), (max(t-l, 0), 'hx')] if t >= l else [(t, 'o'), (l-t, 'gh')] for t, l in zip(this, last)], per=800, title='This week over last week ghost')
        return S([('Last week (ghost)', [(1700, 'gh')]), ('This week', [(1700, 'o'), (600, 'hx')])], 'Week vs last')
    if sid == 'S13': return S([(f'{n} · {inr(s)}', [(s, 'o')]) for n, l, s in sorted(cats, key=lambda c: -c[2])], 'Category comparison', gap=6)
    if sid == 'S14':
        if key == 'dl':
            return lanes_days([[(a, 'o')] for a in WEEK] , per=600, today=6, title='Week as lanes')
        o = []; x = 0; y = 0; H = 0; W = 0
        for d, a in enumerate(WEEK):
            pw = (amt([(a, 'o')], 0, 0)[1] if a else D)
            if x and x + pw > 300: x = 0; y += H + 18; H = 0
            i, w, h = amt([(a, 'o')], x, y) if a else (f'<circle class="zero" cx="{x+R}" cy="{y+R}" r="{R-.5}"/>', D, D)
            o.append(i + tx(x, y - 4, 'MTWTFSS'[d]))
            if d == 6: o.append(f'<rect class="today" x="{x-3:.1f}" y="{y-12:.1f}" width="{w+6:.1f}" height="{h+15:.1f}" rx="5"/>')
            x += w + 12; W = max(W, x - 12); H = max(H, h)
        return svg(f'<g transform="translate(0 12)">{"".join(o)}</g>', W, y + H + 14, 'Day view')
    if sid == 'S15':
        o = []
        for a in [25, 350, 6600, 123000]:
            segs = [(a, 'f')]
            i, w, h = (md(segs, bc=4) if key == 'md' else amt(segs, 0, 0))
            sc = 1.3 if a < 10000 else .55
            o.append(f'<figure class="sc"><button type="button" class="zoom" data-amt="{a}" aria-label="Zoom {inr(a)}">{svg(i, w, h, inr(a), sc=sc)}</button><figcaption>{inr(a)}</figcaption></figure>')
        return f'<div class="scales">{"".join(o)}</div><p class="zout" aria-live="polite">Tap a figure.</p>'

# ---------- cup-fill comparison card
def cupcard():
    rows = [('A · Pie wedge (rec.)', cup_wedge, 'Area = share exactly. Quarters read as a clock: ₹25 = quarter past.'),
            ('B · Concentric core', cup_core, 'A small disc grows from the centre; radius √share, so area is exact.'),
            ('C · Area-true level', cup_level, 'Keeps the cup: liquid height solved so the AREA is the share. ₹25 sits at 0.30 height, not 0.25.'),
            ('2d · Height fill (old)', cup_height, 'For contrast: a quarter-height fill is only 20% of the area.')]
    o = []; y = 0
    for k, (lab, fn, why) in enumerate(rows):
        o.append(tx(0, y+8, lab, 'lbl b'))
        for j, f in enumerate([.25, .5, .75, 1]):
            o.append(fn(150 + j*30, y+5, 10, f, 'f' if f < 1 else 'f'))
        y += 30
    for j, s in enumerate(['₹25', '₹50', '₹75', '₹100']): o.append(tx(150 + j*30, y-4, s, 'lbl mid'))
    return svg(''.join(o), 250, y, 'Three area-true cup fills compared with height fill', sc=1.6), rows

# ---------- matrix
MATRIX = [  # name, learn, research, anxiety, scale, consistency, best tab, note
 ('Merging Dots', 5, 5, 'Low', 5, 'Full (every locked rule)', 'Home, Income, Savings', 'Base unit everywhere; his form.'),
 ('Day lanes', 4, 5, 'Med (diet feeling)', 2, 'Full if used as a view of the same dots', 'Spending', 'Per-day allowance M3 without a number; P2c-Q1 puts per-day in Spending.'),
 ('Glass columns', 5, 4, 'Low', 3, 'Partial (container ink; ladder kept)', 'Spending (jars)', 'Dots inside fix 2d\'s count problem; good jar metaphor.'),
 ('Bangles', 3, 3, 'Low', 2, 'Partial (no common baseline)', 'Savings (goal ring)', 'Closing ring = goal gradient; poor for comparing.'),
 ('Hourglass', 4, 3, 'Med', 2, 'Weak (one jar per picture; goals reversed)', 'Home hero (optional)', 'Left + spent in one picture; pay = drop.'),
 ('Ticket strip', 4, 4, 'Med (tearing)', 3, 'Partial (stub ink; booklet is new shape)', 'Spending (pay moment only)', 'Tear is a strong pay-moment motion.'),
]
def stars(n): return '●'*n + '○'*(5-n)

REC = ('Use <b>Merging Dots as the one base unit</b> on every tab (Home, Income, Savings, Insights). Give <b>Spending</b> two views of the same dots: '
       '<b>Day lanes</b> for "this week / today" (per-day share stood upright) and Merging Dots rows for jars. Borrow two motions, not forms: '
       'the <b>Hourglass drop</b> for the pay animation and the <b>Bangle close</b> when a goal or a four-chai dot completes. Park Glass columns and Ticket strip.')
REC_MD = ('Merging Dots as the base unit on every tab; Spending gets Day lanes (today/this week) beside Merging Dots rows for jars; '
          'borrow the Hourglass drop as the pay motion and the Bangle close as the completion motion. Park Glass columns and Ticket strip.')

QS = [
 ('P2e-Q1', 'Which cup fill inside a dot?', ['A · Pie wedge (clock)', 'B · Concentric core', 'C · Area-true liquid level'], 'A', 'Exact area, and ₹25 steps read as clock quarters, which teaches the four-chai moment.'),
 ('P2e-Q2', 'Colour for "left": keep blue, or your green?', ['A · Blue left, green saved (now)', 'B · Green left, a second hue for saved', 'C · One ink colour; saved marked by a ring'], 'A', 'Green is already "saved"; solid vs outline carries left vs spent, so hue is free for kind.'),
 ('P2e-Q3', 'Adopt the combination?', ['A · Merging Dots base + Day lanes in Spending', 'B · Merging Dots everywhere only', 'C · Another mix'], 'A', 'Day lanes answer "can I afford this today?" without a number on Home.'),
 ('P2e-Q4', 'Which motions to borrow?', ['A · Hourglass drop (pay) + Bangle close (complete)', 'B · Ticket tear (pay)', 'C · Plain lift-out (2d)'], 'A', 'Drop keeps the outline left behind; tearing reads as loss.'),
 ('P2e-Q5', 'Day lanes overspend: borrow from tomorrow\'s lane?', ['A · Yes, tomorrow\'s lane shortens', 'B · No, show hatched extra only', 'C · Re-spread across all days'], 'C', 'Re-spreading is gentler than a short tomorrow; less "diet" feeling.'),
]

# ======================= assemble =======================
cupsvg, cuprows = cupcard()
tabs = ''; panels = ''
for n, (key, name, tag, amt, rule, good, risk) in enumerate(CONCEPTS):
    tabs += f'<button type="button" role="tab" id="t2e-{key}" aria-controls="p2e-{key}" aria-selected="{"true" if n == 0 else "false"}" tabindex="{0 if n == 0 else -1}">{E(name)}<small>{E(tag)}</small></button>'
    cells = ''
    for sid, st, sent, cite in STATES:
        try: fig = state_fig(key, amt, sid)
        except Exception as e: raise RuntimeError(f'{key} {sid}: {e}')
        cells += f'<article class="st"><header><span class="mid">{sid}</span><h4>{E(st)}</h4></header><div class="sv">{fig}</div><p class="say">{E(sent)}</p><p class="cite">{E(cite)}</p></article>'
    panels += (f'<div role="tabpanel" id="p2e-{key}" aria-labelledby="t2e-{key}" class="cpanel"{"" if n == 0 else " hidden"}>'
               f'<p class="rule">{E(rule)}</p><div class="gr"><p class="cite"><b>Good:</b> {E(good)}</p><p class="cite"><b>Risk:</b> {E(risk)}</p></div>'
               f'<div class="sts">{cells}</div></div>')
cupnotes = ''.join(f'<li><b>{E(l)}</b> {E(w)}</li>' for l, f, w in cuprows)
tb = ''.join(f'<tr><th scope="row">{E(n)}</th><td>{stars(l)}</td><td>{stars(r)}</td><td>{E(a)}</td><td>{stars(s)}</td><td>{E(c)}</td><td>{E(t)}</td><td>{E(note)}</td></tr>' for n, l, r, a, s, c, t, note in MATRIX)
qh = ''.join(f'<div class="q"><b>{q}. {E(t)}</b><ul>{"".join(f"<li>{E(o)}</li>" for o in op)}</ul><p>Recommendation: <b>{r}</b> — {E(w)}</p></div>' for q, t, op, r, w in QS)

CSS = '''
.p2e{--d-o:var(--ink3)}
.p2e header{display:flex;gap:8px;align-items:baseline}.p2e h4{margin:0;font:600 14px var(--f-disp);flex:1}
.p2e .mid{font:500 11px var(--f-mono);color:var(--ink3)}
.p2e .say{margin:0;font:500 14px var(--f-disp)} .p2e .cite{margin:0;font-size:12px;color:var(--ink2)}
.p2e .rule{margin:0 0 6px;font:500 15px var(--f-disp);max-width:70ch}
.p2e .gr{display:grid;gap:4px;margin-bottom:12px;max-width:80ch}
.p2e .tabs{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0 14px}
.p2e [role=tab]{font:600 13px var(--f-disp);padding:7px 12px;border-radius:999px;border:1px solid var(--rule);background:var(--card);color:var(--ink);cursor:pointer;display:flex;gap:6px;align-items:baseline}
.p2e [role=tab] small{font:500 10px var(--f-mono);color:var(--ink3)}
.p2e [role=tab][aria-selected=true]{background:var(--ink);color:var(--card)}.p2e [role=tab][aria-selected=true] small{color:var(--card);opacity:.7}
.p2e [role=tab]:focus-visible,.p2e .btn:focus-visible{outline:2px solid var(--t-f);outline-offset:2px}
.p2e .sts{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(300px,100%),1fr));gap:12px}
.p2e .st,.p2e .cupc{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:12px 14px;display:grid;gap:8px;align-content:start;min-width:0}
.p2e .st{grid-template-columns:minmax(0,1fr);white-space:normal}
.p2e .sv>div,.p2e .scales>*{min-width:0;max-width:100%}
.p2e .sv{display:flex;align-items:center;overflow-x:auto;min-height:40px}.p2e .sv svg{max-width:100%;height:auto;overflow:visible}
.p2e svg .f{fill:var(--t-f)} .p2e svg .s{fill:var(--t-s)} .p2e svg .o{fill:none;stroke:var(--d-o);stroke-width:.9}
.p2e svg .cs{fill:var(--d-o);fill-opacity:.35;stroke:var(--d-o);stroke-width:.6}
.p2e svg .cupo{fill:none;stroke:var(--d-o);stroke-width:.7}
.p2e svg .rs{fill:none;stroke:var(--t-f);stroke-width:1.1;stroke-dasharray:2 1.4}
.p2e svg .ow{fill:none;stroke:var(--t-s);stroke-width:1.1;stroke-dasharray:2 1.4}
.p2e svg .gh{fill:none;stroke:var(--d-o);stroke-width:.8;stroke-dasharray:1.2 1.2;opacity:.8}
.p2e svg .hx{fill:url(#p2ehatch);stroke:var(--t-f);stroke-width:.8}
.p2e svg .big{fill:none;stroke:var(--d-o);stroke-width:1.5}
.p2e svg .rf{fill:var(--t-f);stroke:var(--t-s);stroke-width:1.4}
.p2e svg .sw{fill:var(--t-s);stroke:var(--t-f);stroke-width:1.4}
.p2e svg .pv{fill:var(--t-f);stroke:var(--d-o);stroke-width:0;transform-box:fill-box;transform-origin:center;animation:p2epay 3.2s ease-in-out infinite}
@keyframes p2epay{0%,25%{fill:var(--t-f);stroke-width:0;transform:none;opacity:1}45%{transform:translateY(-7px);opacity:.25}55%{fill:transparent;stroke-width:.9;transform:none;opacity:0}75%,100%{fill:transparent;stroke-width:.9;opacity:1}}
@media (prefers-reduced-motion:reduce){.p2e svg .pv{animation:none;fill:none;stroke-width:.9}}
.p2e svg .zero{fill:none;stroke:var(--d-o);stroke-dasharray:1 1.2}
.p2e svg .today{fill:none;stroke:var(--t-f);stroke-width:1.2;opacity:.55;filter:drop-shadow(0 0 3px var(--t-f))}
.p2e svg .lbl{font:500 7px var(--f-mono);fill:var(--ink2)} .p2e svg .lbl.mid{text-anchor:middle;font-size:6px} .p2e svg .lbl.b{font-weight:600;font-size:8px;fill:var(--ink)}
.p2e svg .perf{stroke:var(--card);stroke-width:1;stroke-dasharray:1.4 1.1}
.p2e svg .stock{fill:none;stroke:var(--rule);stroke-width:1}
.p2e svg .spine{stroke:var(--card);stroke-width:1.2;stroke-dasharray:2 2}
.p2e svg .glass{fill:none;stroke:var(--ink3);stroke-width:.9;opacity:.7} .p2e svg .thread{fill:none;stroke:var(--rule);stroke-width:1}
.p2e .scales{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end}
.p2e .sc{margin:0;display:grid;gap:4px;justify-items:start}.p2e .sc figcaption{font:500 11px var(--f-mono);color:var(--ink3)}
.p2e .zoom{all:unset;cursor:zoom-in;border-radius:6px}.p2e .zoom:focus-visible{outline:2px solid var(--t-f);outline-offset:3px}
.p2e .zout{font:500 12px var(--f-mono);color:var(--ink2);min-height:1.4em;margin:0}
.p2e .cupc{grid-template-columns:minmax(0,auto) minmax(0,1fr);align-items:center;gap:16px}
@media (max-width:640px){.p2e .cupc{grid-template-columns:1fr}}
.p2e .cupc ul{margin:0;padding-left:18px;font-size:13px;color:var(--ink2);display:grid;gap:4px}.p2e .cupc b{color:var(--ink)}
.p2e table{width:100%;border-collapse:collapse;font-size:13px}.p2e .tw{overflow-x:auto}
.p2e th,.p2e td{text-align:left;padding:7px 8px;border-bottom:1px solid var(--rule);vertical-align:top}.p2e td{font-variant-numeric:tabular-nums}.p2e td:nth-child(-n+5){white-space:nowrap}.p2e td:nth-child(n+6){color:var(--ink2);min-width:140px}
.p2e .recb{background:var(--card);border:1px solid var(--rule);border-left:3px solid var(--t-f);border-radius:8px;padding:12px 16px;font-size:14px;max-width:85ch}
.p2e .q{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:10px 14px;margin-bottom:8px}.p2e .q ul{margin:6px 0;padding-left:18px}.p2e .q p{margin:0;font-size:13px;color:var(--ink2)}
.p2e .btn{font:600 13px var(--f-disp);padding:7px 14px;border-radius:999px;border:1px solid var(--rule);background:var(--card);color:var(--ink);cursor:pointer}
.p2e .btn[aria-pressed="true"]{background:var(--ink);color:var(--card)}
.p2e .ctl{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.p2e.bw svg{filter:grayscale(1) contrast(1.15)}
'''
HATCH = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><pattern id="p2ehatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" style="stroke:var(--t-f)" stroke-width="1.2"/></pattern></defs></svg>'
JS = r'''<script>(function(){
var S=document.getElementById('p2e');if(!S)return;
function inr(n){return '₹'+n.toLocaleString('en-IN')}
S.querySelectorAll('[data-bwe]').forEach(function(b,i,a){b.addEventListener('click',function(){a.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});S.classList.toggle('bw',b.dataset.bwe==='bw')})});
var tabs=[].slice.call(S.querySelectorAll('[role=tab]'));
function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on})}
tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t)});t.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(d){var n=tabs[(i+d+tabs.length)%tabs.length];sel(n);n.focus();e.preventDefault()}})});
S.querySelectorAll('.zoom').forEach(function(b){var lvl=0;b.addEventListener('click',function(){var a=+b.dataset.amt;lvl=(lvl+1)%4;
 var bl=Math.floor(a/10000),p=Math.floor(a%10000/1000),t=Math.floor(a%1000/100),c=a%100;
 var msg=[inr(a)+' · tap to zoom',(bl?bl+' block'+(bl>1?'s':'')+' (₹10,000) · ':'')+p+' pill'+(p==1?'':'s')+' (₹1,000) · '+t+' dot'+(t==1?'':'s')+(c?' · '+c+'% of a dot':''),Math.floor(a/100)+' dots of ₹100'+(c?' + ₹'+c:''),inr(a)+' exactly'][lvl];
 var z=b.closest('.st').querySelector('.zout');if(z)z.textContent=msg;});});
})();</script>'''

SEC = f'''<section class="phase p2 p2e" id="p2e" style="margin-top:48px">{HATCH}
  <h2><span>Phase 2e</span> Dot system + concept deep-dive</h2>
  <p class="lede" style="margin:0">Tarun's decisions after 2d: circles are the ₹100 unit with small gaps; spent = outlined, left = solid, no red; ladder crumb → dot → pill → block, blocks keep a hairline gap; the cup inside a circle must read by area. Below, his Merging Dots and five other concepts, each across the same 15 money moments.</p>
  <div class="ctl" role="group" aria-label="Colour mode"><button class="btn" type="button" data-bwe="c" aria-pressed="true">Colour</button><button class="btn" type="button" data-bwe="bw" aria-pressed="false">B&amp;W</button></div>
  <div class="block"><h3>Cup fill inside a circle, by area</h3><div class="cupc"><div class="sv">{cupsvg}</div><ul>{cupnotes}</ul></div><p class="note">All concepts below use A, the pie wedge. Key for every state: solid blue = left · outline = spent · green = saved · dashed blue = held for subscriptions · dashed green = owed to you · hatched = extra beyond plan · dotted = last week · tinted wedge = small spends adding up.</p></div>
  <div class="block"><h3>Concepts × 15 states</h3>
   <div class="tabs" role="tablist" aria-label="Concept">{tabs}</div>{panels}</div>
  <div class="block"><h3>Comparison</h3><div class="tw"><table><thead><tr><th scope="col">Concept</th><th scope="col">Learnability</th><th scope="col">Research fit (2c)</th><th scope="col">Anxiety</th><th scope="col">Scale ₹25→₹1,23,000</th><th scope="col">Fits locked rules</th><th scope="col">Best tab</th><th scope="col">Note</th></tr></thead><tbody>{tb}</tbody></table></div>
  <p class="note">Concepts combine: they share the ₹100 dot, so one can be the unit and another a view of the same dots.</p></div>
  <div class="block"><h3>Recommendation</h3><p class="recb">{REC}</p></div>
  <div class="block"><h3>Questions for Tarun</h3><div class="qs">{qh}</div></div>
  <p class="note" style="color:var(--ink3);font-size:12px">Notes: claude/v12_phase2e_concepts.md</p>
</section>'''

src = open('board.html').read()
src = re.sub(r'<style id="p2ecss">.*?</style>', '', src, flags=re.S)
src = re.sub(r'<section class="phase p2 p2e" id="p2e".*?</section><script>\(function\(\)\{\nvar S=document.getElementById\(\'p2e\'\).*?</script>', '', src, flags=re.S)
src = src.replace('<section class="later" id="p3">', '<style id="p2ecss">' + CSS + '</style>' + SEC + JS + '<section class="later" id="p3">', 1)
if 'href="#p2e"' not in src:
    src = src.replace('<a href="#p3"', '<a href="#p2e" class="now">2e Dot concepts</a><a href="#p3"', 1).replace('href="#p2d" class="now"', 'href="#p2d" class=""')
open('board.html', 'w').write(src)

md_ = ['# Trickle v12 — Phase 2e: Dot system + concept deep-dive\n',
 'Board: Phase 2e section (concept switcher: 6 concepts × 15 states, colour + B&W). Builds on claude/v12_phase2d_sketch_concepts.md and claude/v12_phase2c_money_viz_research.md.\n',
 '## Decisions applied (Tarun, after 2d)\n- Red = spent, green = left in his sketch: meaning kept, no red. Spent = outlined dots, left = solid.\n- Circles are the ₹100 unit, small gap (2px at dot 10px) so they are countable. Ladder: crumb <₹100 → dot ₹100 → pill ₹1,000 (row of 10 fuses) → block ₹10,000. Blocks keep a hairline gap.\n- Cup fill inside a circle must read by area.\n',
 '## Cup fill inside a circle (area-true)\n' + '\n'.join(f'- **{l}**: {w}' for l, f, w in cuprows) + '\n\nRecommended: A, pie wedge. Used in every concept on the board.\n',
 '## The 15 states (same for every concept)\n| # | State | Sentence | Research |\n|---|---|---|---|'] + [f'| {a} | {b} | {c} | {d} |' for a, b, c, d in STATES] + [
 '\n## Concepts\n'] + [f'### {n} ({t})\n- Rule: {r}\n- Good: {g}\n- Risk: {k}\n' for key, n, t, a, r, g, k in CONCEPTS] + [
 'Concept-specific forms: Day lanes draws S4 pay, S5 chais, S7 overspend, S12 week and S14 day as day lanes (a day\'s share stood upright, today ringed); other states use upright pills. Hourglass draws S2 as four small glasses and S10 reversed (saved piles below).\n',
 '## Comparison\n| Concept | Learn | Research | Anxiety | Scale | Locked-rule fit | Best tab | Note |\n|---|---|---|---|---|---|---|---|'] + [f'| {n} | {l}/5 | {r}/5 | {a} | {s}/5 | {c} | {t} | {no} |' for n, l, r, a, s, c, t, no in MATRIX] + [
 '\n## Recommendation\n' + REC_MD + '\n',
 '## Questions for Tarun\n| # | Question | Options | Recommended | Why |\n|---|---|---|---|---|'] + [f'| {q} | {t} | {" / ".join(op)} | {r} | {w} |' for q, t, op, r, w in QS]
open('v12_phase2e_concepts.md', 'w').write('\n'.join(md_) + '\n')
print('ok', len(src)/1e6)
