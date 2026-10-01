import html, re, base64, io, math
from PIL import Image
E = html.escape
D, G = 10, 1.2          # dot diameter, gap
PW = 10 * D + 9 * G      # pill / block width

def inr(n):
    s = str(n)
    if len(s) > 3:
        h = s[:-3][::-1]; h = ','.join(h[i:i+2] for i in range(0, len(h), 2))[::-1]; s = h + ',' + s[-3:]
    return '₹' + s

def lad(a):
    b, r = divmod(a, 10000); p, r = divmod(r, 1000); t, c = divmod(r, 100); return b, p, t, c

def cup(cx, cy, r, f, cls):
    """circle outline + liquid filled from bottom to fraction f (height)."""
    out = f'<circle class="cupo" cx="{cx:.1f}" cy="{cy:.1f}" r="{r-.4:.1f}"/>'
    if f <= 0: return out
    if f >= 1: return f'<circle class="{cls}" cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}"/>'
    y0 = cy + r - 2 * r * f; dx = math.sqrt(max(r*r - (y0-cy)**2, 0))
    la = 1 if f > .5 else 0
    return out + f'<path class="{cls}" d="M{cx-dx:.2f} {y0:.2f} A{r} {r} 0 {la} 0 {cx+dx:.2f} {y0:.2f} Z"/>'

def dots(segs, x0=0, y0=0, blocks_cols=2, dot_cols=10, tag=''):
    """Tarun's form: blocks (rounded squares) left, pills stacked right, loose dots under the pills.
    segs = [(amount, cls)], drawn in order at each level. Returns (inner, w, h)."""
    B, P, T = [], [], []
    for a, c in segs:
        b, p, t, cu = lad(a)
        B += [c]*b; P += [c]*p; T += [(c, 1)]*t
        if cu: T.append((c, cu/100))
    out = []; x = x0; hB = 0
    if B:
        cols = min(blocks_cols, len(B)); rows = math.ceil(len(B)/cols)
        for i, c in enumerate(B):
            bx = x0 + (i % cols)*(PW+G*2); by = y0 + (i//cols)*(PW+G*2)
            out.append(f'<rect class="{c} blk" x="{bx:.1f}" y="{by:.1f}" width="{PW:.1f}" height="{PW:.1f}" rx="{D}"/>')
        x = x0 + cols*(PW+G*2); hB = rows*(PW+G*2)-G*2
    y = y0
    for c in P:
        out.append(f'<rect class="{c}" x="{x:.1f}" y="{y:.1f}" width="{PW:.1f}" height="{D}" rx="{D/2}"/>'); y += D+G
    for i, (c, f) in enumerate(T):
        cx = x + (i % dot_cols)*(D+G) + D/2; cy = y + (i//dot_cols)*(D+G) + D/2
        out.append(cup(cx, cy, D/2, f, c) if f < 1 else f'<circle class="{c}" cx="{cx:.1f}" cy="{cy:.1f}" r="{D/2}"/>')
    if T: y += math.ceil(len(T)/dot_cols)*(D+G)
    w = (x - x0) + (PW if (P or T) else 0)
    if T and not P: w = (x - x0) + min(len(T), dot_cols)*(D+G)
    return ''.join(out), w, max(hB, y - y0 - G)

def svg(inner, w, h, title, sc=1.6, cls=''):
    return (f'<svg class="{cls}" viewBox="-2 -2 {w+4:.0f} {h+4:.0f}" width="{(w+4)*sc:.0f}" height="{(h+4)*sc:.0f}" '
            f'role="img" aria-label="{E(title)}"><title>{E(title)}</title>{inner}</svg>')

def tx(x, y, s, c='lbl', a='start'):
    return f'<text class="{c}" x="{x:.1f}" y="{y:.1f}" text-anchor="{a}">{E(s)}</text>'

def fig(segs, title, **k):
    i, w, h = dots(segs, **k); return svg(i, w, h, title)

def stack(parts, gap=10, labels=True):
    """vertical list of (label, segs) rows; label above each."""
    out = []; y = 0; W = 0
    for lab, segs in parts:
        if labels and lab: out.append(tx(0, y+7, lab)); y += 11
        i, w, h = dots(segs, 0, y); out.append(i); y += h + gap; W = max(W, w, 60)
    return ''.join(out), W, y - gap

# ======================= Expanded concept: "Merging Dots" ================
X = []   # (id, title, sentence, svg, research note, interactive?)
def add(k, t, s, g, r): X.append((k, t, s, g, r))

# 0 the ladder, faithful
i1, w1, h1 = dots([(100, 'f')]);
lad_parts = [('₹100 · dot', [(100,'f')]), ('₹1,000 · ten dots fuse into a pill', [(1000,'f')]),
             ('₹10,000 · ten pills fuse into a block', [(10000,'f')]), ('under ₹100 · the dot fills like a cup (₹40)', [(40,'f')])]
add('X0', 'The ladder (Tarun\'s, kept)', 'A dot is ₹100. Ten dots fuse into a pill, ten pills into a block. Less than ₹100 fills a dot like a cup.',
    svg(*stack(lad_parts), 'Ladder: dot, pill, block, cup'), 'Repeat the unit, never enlarge it (Isotype); base-10 merge is area-true.')

# 1 scale (his 4 frames redrawn) - interactive zoom card built separately
# 2 income split
inc = [('₹9,000 arrives', [(9000,'f')])]
i, w, h = stack([('Arrives: ₹9,000', [(9000,'f')]),
                 ('Then splits: budget', [(6000,'f')]), ('subscriptions held', [(499,'rs')]), ('savings', [(2501,'s')])])
add('X1', 'Income arrives, then splits', '₹9,000 came in. ₹6,000 went to this month, ₹499 is held for subscriptions, ₹2,501 went to savings.',
    svg(i, w, h, 'Income ₹9,000 split into budget, subscriptions, savings'),
    'Part-to-whole in the same unit (M7). Split happens at once on arrival so the budget is "real" from day one (mental accounting, Thaler; Heath & Soll).')
# 3 categories
cats = [('Food', 800, 2200), ('Travel', 700, 800), ('Fun', 400, 600), ('Other', 200, 300)]
i, w, h = stack([(f'{n} · {inr(l)} of {inr(l+s)} left', [(l,'f'), (s,'o')]) for n, l, s in cats], gap=7)
add('X2', 'Budget by category', '₹2,100 of ₹6,000 left. Food has the most left; Other is nearly done.',
    svg(i, w, h, 'Four categories, left solid, spent outlined'),
    'Whole always visible: spent stays as outlines (denominator neglect, Garcia-Retamero 2010). Counts, not %, read better (Gigerenzer & Hoffrage).')
# 4 subscriptions reserve
def subs():
    out = []; y = 0
    for n, a, done in [('Spotify · paid 3rd', 119, True), ('Prime · due 18th', 299, False), ('iCloud · due 24th', 75, False)]:
        out.append(tx(0, y+7, n)); y += 11
        inner, w, h = dots([(a, 'o' if done else 'rs')], 0, y); out.append(inner); y += h + 6
    out.append(f'<rect class="brk" x="-1.5" y="9" width="{5*(D+G)+2:.0f}" height="{y-12:.0f}" rx="4"/>')
    return svg(''.join(out), 70, y, 'Subscriptions held as a reserved chunk')
add('X3', 'Subscriptions: a reserved chunk', '₹493 held for three subscriptions. Spotify is paid; the other two leave on their dates on their own.',
    subs(), 'Reserved dots are dashed: they are yours but already spoken for, so "left" never counts them (earmarking, Soman & Cheema 2011).')
# 5 single pay (interactive)
add('X4', 'One pay leaves: ₹350 meal', 'Tap Pay. Three and a half dots lift out and stay as outlines. ₹1,750 left.',
    '<div class="pay" data-left="2100" data-amt="350"></div>', 'Show the pay as tiles leaving, at the moment of pay (M2; pain of paying, Prelec & Loewenstein; Soman 2001).')
# 6 four chais (interactive)
add('X5', 'Four ₹25 chais fill one dot', 'Each chai fills a quarter. The fourth one completes a ₹100 dot.',
    '<div class="chai"></div>', 'Small repeats become visible as a whole tile (M4; "latte factor" made countable, frequency format).')
# 7 big one-off
i, w, h = stack([('Before', [(4500,'f')]), ('After the ₹2,400 laptop repair', [(2100,'f'), (2400,'big')])])
add('X6', 'Big one-off: ₹2,400', '₹2,400 left at once: two pills and four dots. That is about 7 of your usual dinners.',
    svg(i, w, h, '₹2,400 spent as two pills and four dots outlined'),
    'Large spends shown in the same unit, with one perspective line in their own buys (Barrio 2016; Riederer 2018). Marked once, no alarm.')
# 8 overspend
i, w, h = stack([('Fun · ₹1,000 jar, empty', [(1000,'o')]), ('₹250 more, taken from Food', [(250,'hx')]), ('Food · after the move', [(550,'f'), (2450,'o')])])
add('X7', 'Empty jar and overspend', 'Fun is empty. The extra ₹250 came from Food, so Food now has ₹550 left.',
    svg(i, w, h, 'Empty jar outlined; extra hatched; moved from Food'),
    'No red (ostrich effect: people stop looking, Olafsson & Pagel 2018). Overspend is a move between jars, shown as hatched dots outside the jar.')
# 9 split + owed
i, w, h = stack([('You paid ₹1,200 for 4 friends', [(1200,'o')]), ('Your share', [(300,'o')]), ('Coming back from 3 friends', [(900,'ow')])])
add('X8', 'Split bill, money owed back', 'You paid ₹1,200. Your share is ₹300; ₹900 is coming back from three friends.',
    svg(i, w, h, 'Split bill with owed dots dashed'),
    'Owed money is drawn but dashed, so it is not counted as spendable until it arrives (honest "left").')
# 10 refund
i, w, h = stack([('Order cancelled · ₹350 back', [(350,'rf')]), ('Food after refund', [(1150,'f'), (1850,'o')])])
add('X9', 'Refund', '₹350 came back. Three and a half outlined dots refill and Food has ₹1,150 left again.',
    svg(i, w, h, 'Refund refilling outlined dots'), 'Reverse of the pay motion: outlines fill back in. Same rule, no new symbol.')
# 11 goal
i, w, h = stack([('Goal · new phone · ₹8,000', [(4160,'s'), (3840,'o')])])
i += tx(0, h+10, '52% saved · ₹3,840 to go', 'lbl')
add('X10', 'Savings goal at 52%', '₹4,160 saved for the phone. ₹3,840 to go: about 4 more months at this pace.',
    svg(i, w, h+12, 'Goal ₹8,000, ₹4,160 saved'),
    'Goal gradient: show "to go" shrinking (Kivetz 2006). Saved dots green, the rest outlined in the same shape.')
# 12 month end sweep
i, w, h = stack([('September · ₹400 left on the 30th', [(400,'f')]), ('Moved to savings', [(4100,'s'), (400,'sw')])])
add('X11', 'Month-end leftover → savings', '₹400 was left on the 30th. It moved into savings.',
    svg(i, w, h, 'Leftover dots join savings'), 'A small win at month end; leftover becomes progress, not a reset (goal gradient, Kivetz).')
# 13 week vs last week
def wk():
    out = []; y = 0
    out.append(tx(0, 7, 'Last week (ghost)')); y = 11
    inner, w, h = dots([(1700, 'gh')], 0, y); out.append(inner); y += h + 6
    out.append(tx(0, y+7, 'This week')); y += 11
    inner, w, h = dots([(1700, 'o'), (600, 'hx')], 0, y); out.append(inner); y += h
    return svg(''.join(out), w, y, 'This week spent ₹600 more than last week')
add('X12', 'This week vs last week', 'You spent ₹600 more than last week, mostly on Friday food.', wk(),
    'Ghost of last week + hatched extra + one sentence, no red (M8, locked).')
# 14 category comparison (spent only, aligned)
i, w, h = stack([(f'{n} · {inr(s)}', [(s,'o')]) for n, l, s in sorted(cats, key=lambda c: -c[2])], gap=6)
add('X13', 'Where it went: categories compared', 'Food took the most: ₹2,200 of the ₹3,900 spent.',
    svg(i, w, h, 'Spent by category, sorted'), 'Aligned rows on a common baseline are read most accurately (Cleveland & McGill).')
# 15 day view
def days():
    out = []; data = [350, 125, 0, 600, 250, 75, 200]; names = 'MTWTFSS'
    for d, a in enumerate(data):
        x = d*30
        inner, w, h = dots([(a,'o')] if a else [], x, 0, dot_cols=2); out.append(inner)
        if not a: out.append(f'<circle class="zero" cx="{x+5}" cy="5" r="4.5"/>')
        out.append(tx(x+D, 52, names[d], 'lbl mid'))
    out.append(f'<rect class="today" x="{6*30-3}" y="-3" width="28" height="60" rx="5"/>')
    return svg(''.join(out), 7*30, 56, 'Each day of the week as dot columns')
add('X14', 'Day view (the week)', 'Thursday was the big day. Wednesday you spent nothing.', days(),
    'Columns of 2 dots per day keep a week under ~25 marks; glow ring only marks today (position, locked).')

# ======================= New concepts ================
SC = [('chai', '₹25 chai'), ('meal', '₹350 meal'), ('bud', '₹6,000 budget, ₹2,100 left'), ('inc', '₹9,000 income split'),
      ('sub', '₹499 subscription'), ('goal', 'Goal ₹8,000 at 52%'), ('four', 'Four chais accumulate')]

# N1 Ticket strip
def stub(x, y, c, f=1, w=9, h=13):
    o = f'<rect class="cupo" x="{x}" y="{y}" width="{w}" height="{h}" rx="1.2"/>' if f < 1 else ''
    hh = h*f
    return o + (f'<rect class="{c}" x="{x}" y="{y+h-hh:.1f}" width="{w}" height="{hh:.1f}" rx="1.2"/>' if f > 0 else '')
def tickets(segs, title):
    out = []; x = 0; y = 0; n = 0; W = 0
    for a, c in segs:
        b, p, t, cu = lad(a)
        for _ in range(p):
            out.append(f'<rect class="{c}" x="0" y="{y}" width="109" height="13" rx="1.5"/><path class="perf" d="M{"".join(f"M{10.9*k:.1f} {y} v13" for k in range(1,10))}"/>'); y += 15; W = 109
        row = []
        for k in range(t): row.append(1)
        if cu: row.append(cu/100)
        for k, f in enumerate(row):
            out.append(stub(k*11, y, c, f)); W = max(W, k*11+9)
        if row: y += 15
    return svg(''.join(out), max(W, 20), y-2, title)
# N2 Day lanes (budget pre-cut into days)
def lanes(spent_today, title, n=7, per=300, label=None):
    out = []; cw = 14
    for d in range(n):
        x = d*cw; amt = max(per - spent_today, 0) if d == 0 else per
        if d == 0 and spent_today > per: pass
        k = 0; rem = amt
        for j in range(math.ceil(per/100)):
            f = min(max(rem - j*100, 0), 100)/100
            cy = 44 - j*11
            out.append(cup(x+5, cy, 5, f, 'f') if f < 1 else f'<circle class="f" cx="{x+5}" cy="{cy}" r="5"/>')
        if n <= 12: out.append(tx(x+5, 58, 'MTWTFSS'[d % 7] if n == 7 else str(d+1), 'lbl mid'))
    out.append(f'<rect class="today" x="-2.5" y="{44-11*math.ceil(per/100)+3}" width="15" height="{11*math.ceil(per/100)+3}" rx="4"/>')
    out.append(tx(0, 6, label or f'{inr(per)} a day', 'lbl'))
    return svg(''.join(out), n*cw, 60, title)
# N3 Glass columns
def glasses(segs, title, cap=1000):
    out = []; x = 0
    for a, c in segs:
        full, r = divmod(a, cap)
        lst = [1]*full + ([r/cap] if r else [])
        for f in lst:
            out.append(f'<rect class="glass" x="{x}" y="0" width="12" height="40" rx="2"/>')
            for k in range(1, 10): out.append(f'<line class="tick" x1="{x}" x2="{x+3}" y1="{40-k*4}" y2="{40-k*4}"/>')
            if c != 'o': out.append(f'<rect class="{c}" x="{x+.8}" y="{40-40*f+.8:.1f}" width="10.4" height="{max(40*f-1.6,0):.1f}" rx="1.4"/>')
            x += 15
    return svg(''.join(out), max(x-3, 14), 40, title)
# N4 Bangles (rings of 10 beads = ₹1,000)
def bangles(segs, title):
    out = []; i = 0; beads = []
    for a, c in segs:
        b, p, t, cu = lad(a)
        for _ in range(p): beads.append(('ring', c, 10, 0))
        if t or cu: beads.append(('ring', c, t, cu/100))
    rings = []
    for kind, c, t, cu in beads: rings.append((c, t, cu))
    for k, (c, t, cu) in enumerate(rings):
        cx = 20 + (k % 5)*40; cy = 20 + (k//5)*40
        out.append(f'<circle class="thread" cx="{cx}" cy="{cy}" r="14"/>')
        for j in range(10):
            ang = -math.pi/2 + j*2*math.pi/10; bx = cx+14*math.cos(ang); by = cy+14*math.sin(ang)
            if j < t: out.append(f'<circle class="{c}" cx="{bx:.1f}" cy="{by:.1f}" r="4"/>')
            elif j == t and cu: out.append(cup(bx, by, 4, cu, c))
            else: out.append(f'<circle class="empty" cx="{bx:.1f}" cy="{by:.1f}" r="3.6"/>')
    n = len(rings)
    return svg(''.join(out), min(n, 5)*40, math.ceil(n/5)*40, title)
# N5 Hourglass: left on top, spent piles below
def hourglass(left, spent, title, unit=100, extra=None):
    out = ['<path class="glass" d="M0 0 H90 L50 50 L90 100 H0 L40 50 Z"/>']
    def pile(a, top, c):
        n, r = divmod(a, unit); items = [1]*n + ([r/unit] if r else [])
        # fill rows of up to 8 (pyramid-ish)
        res = []
        for k, f in enumerate(items):
            row = k // 8; col = k % 8
            x = 9 + col*9 + (row % 2)*0; y = (4 + row*9) if top else (92 - row*9)
            if top: x = 45 - 36 + col*9 + row*3 if row < 4 else 45
            res.append(cup(x+4, y+4 if top else y, 4, f, c) if f < 1 else f'<circle class="{c}" cx="{x+4}" cy="{y+4 if top else y}" r="4"/>')
        return res
    # use pills of 1000 if large: scale unit
    out += pile(left, True, 'f'); out += pile(spent, False, 'o')
    return svg(''.join(out), 90, 100, title)

def hg(left, spent, title):
    # hourglass with ₹1,000 beads when large (ladder: pill-bead = ₹1,000 drawn as a capsule)
    out = ['<path class="glass" d="M0 0 H96 L54 52 L96 104 H0 L42 52 Z"/>']
    def items(a):
        p, r = divmod(a, 1000); t, cu = divmod(r, 100)
        return ['P']*p + [1]*t + ([cu/100] if cu else [])
    def place(lst, top, c):
        y = 4 if top else 96; x = 8; res = []; rowmax = 80
        for it in lst:
            w = 34 if it == 'P' else 8
            if x + w > 8 + rowmax*(1 - (abs(y-52)/60 if False else 0)):
                x = 8; y = y + 10 if top else y - 10
            if it == 'P': res.append(f'<rect class="{c}" x="{x}" y="{y if top else y-8}" width="{w}" height="8" rx="4"/>')
            else: res.append(cup(x+4, (y+4) if top else (y-4), 4, it, c) if it < 1 else f'<circle class="{c}" cx="{x+4}" cy="{(y+4) if top else (y-4)}" r="4"/>')
            x += w + 1.5
        return res
    out += place(items(left), True, 'f'); out += place(items(spent), False, 'o')
    return svg(''.join(out), 96, 104, title, sc=1.3)

N = []
def nc(k, name, rule, why, risk, figs): N.append((k, name, rule, why, risk, figs))
# N1
nc('N1', 'Ticket strip', 'A ticket is ₹100; ten make a strip (₹1,000). Paying tears tickets off; small buys shorten a ticket.',
   'Tearing is a physical, felt metaphor for pain of paying; perforations keep counts visible inside a strip.',
   'Strips read like a long bar; the ₹10,000 level (a booklet) needs its own shape.',
   {'chai': tickets([(25,'o')], '₹25 chai ticket'), 'meal': tickets([(350,'o')], '₹350 meal tickets'),
    'bud': tickets([(2100,'f'), (3900,'o')], 'Budget tickets'), 'inc': tickets([(6000,'f'), (499,'rs'), (2501,'s')], 'Income split tickets'),
    'sub': tickets([(499,'rs')], '₹499 subscription'), 'goal': tickets([(4160,'s'), (3840,'o')], 'Goal tickets'),
    'four': ''.join(tickets([(25*k,'f')], f'{k} chais') for k in range(1,5))})
# N2
nc('N2', 'Day lanes', 'What is left is pre-cut into days. Each day gets its share; today\'s share empties as you pay.',
   'Turns "₹2,100 left" into "₹300 a day for a week" (per-day allowance, M3) without a number; best answer to "can I afford this today?".',
   'Income, goals and subscriptions are not daily money; it needs a second form for them. Sliding shares daily can feel like a diet.',
   {'chai': lanes(25, 'Today ₹275 left after a chai'), 'meal': lanes(300, 'Meal used all of today (₹50 from tomorrow)', label='today used up'),
    'bud': lanes(0, '₹2,100 as 7 days of ₹300'), 'inc': lanes(0, '₹6,000 budget as 30 days of ₹200', n=30, per=200, label='₹200 a day × 30'),
    'sub': lanes(0, '₹499 taken out before cutting days: ₹1,601 = 7 × ₹228', per=228, label='₹228 a day (sub held)'), 'goal': '<p class="na">Not a daily amount: falls back to dots.</p>',
    'four': lanes(100, 'Four chais = one dot out of today')})
# N3
nc('N3', 'Glass columns', 'A glass holds ₹1,000 with ten marks (₹100 each). Money is liquid; spending lowers the level.',
   'Continuous fill handles ₹25 and ₹350 with no crumb shape; drain/fill motion is natural; ~6–8 glasses for a month.',
   'Level reading is less exact than counting (no discrete count, weaker than icon arrays); ₹10,000 = 10 glasses needs a jug.',
   {'chai': glasses([(25,'f')], '₹25 in a glass'), 'meal': glasses([(350,'f')], '₹350 in a glass'),
    'bud': glasses([(2100,'f'), (3000,'o')], '₹2,100 left in glasses, spent empty'), 'inc': glasses([(6000,'f'), (499,'rs'), (2501,'s')], 'Income in glasses'),
    'sub': glasses([(499,'rs')], 'Subscription glass'), 'goal': glasses([(4160,'s'), (3000,'o')], 'Goal glasses'),
    'four': glasses([(25,'f'), (50,'f'), (75,'f'), (100,'f')], 'Four chais rising')})
# N4
nc('N4', 'Bangles', 'A bead is ₹100; ten beads close a bangle (₹1,000). Small buys fill a bead.',
   'Keeps Tarun\'s round dots; a closed ring is a strong "complete" signal (goal gradient: you see the gap close).',
   'Rings take more space than rows; 6+ bangles need two rows; ₹10,000 level (a stack of ten bangles) is hard to draw small.',
   {'chai': bangles([(25,'f')], 'Chai bead'), 'meal': bangles([(350,'f')], '₹350 beads'),
    'bud': bangles([(2100,'f')], '₹2,100 left as bangles'), 'inc': bangles([(6000,'f'), (499,'rs'), (2501,'s')], 'Income as bangles'),
    'sub': bangles([(499,'rs')], 'Subscription bangle'), 'goal': bangles([(4160,'s')], 'Goal bangles'),
    'four': bangles([(100,'f')], 'Four chais close one bead')})
# N5
nc('N5', 'Hourglass', 'Money left sits on top; every pay drops through and piles up below as outlines.',
   'One picture holds left and spent with no subtraction; the drop is the pay animation; good Home hero.',
   'Only one jar per glass; pile shape varies, so counts below are harder; goal reads oddly ("filling up" is reversed).',
   {'chai': hg(0, 25, 'Chai dropped'), 'meal': hg(1750, 350, 'Meal dropped'), 'bud': hg(2100, 3900, 'Budget hourglass'),
    'inc': hg(6000, 0, 'Income fills the top'), 'sub': hg(1601, 499, 'Subscription dropped'), 'goal': hg(3840, 4160, 'Goal: saved piles below'),
    'four': hg(1900, 100, 'Four chais piled')})

# ---------- scale card (his frames, interactive zoom)
def scale_svgs():
    o = []
    for a in [10000, 6600, 16600, 26600, 46600]:
        segs = [(a, 'f')]
        o.append(f'<figure class="sc"><button type="button" class="zoom" data-amt="{a}" aria-label="Zoom {inr(a)}">{svg(*dots(segs), inr(a), sc=.9)}</button><figcaption>{inr(a)}</figcaption></figure>')
    return ''.join(o)

# ---------- sketch screenshot
im = Image.open('figma_sketches/page.png').convert('RGB'); bio = io.BytesIO(); im.save(bio, 'JPEG', quality=80)
SK = base64.b64encode(bio.getvalue()).decode()

READ = [
 ('Key', 'One red dot labelled "Rs 100". The unit is a circle, not a square.'),
 ('₹10,000 grid', '10 × 10 touching dots, no gaps. 67 red (rows 1–6 + seven of row 7), 33 green. Label "Rs 10000".'),
 ('₹6,600', 'Each row of 10 dots fuses into a capsule pill (₹1,000): 4 red pills, 2 green pills, then 6 loose green dots.'),
 ('₹16,600', 'One rounded-square block (₹10,000) on the left; the same pill column top-aligned on its right. Only 5 loose dots are visible (one is hidden in the layer), so it draws ₹16,500.'),
 ('₹26,600', 'Two blocks fused into one 2:1 rounded rectangle, same pill column.'),
 ('₹46,600', 'Four blocks fused into one big 2×2 rounded square, same pill column. Blocks are all red.'),
]
CONF = [
 ('Red fill', 'He uses red + green fills. Locked/recommended: no red; spent = outlined, left = solid (P2c A1, P2c-Q2 rec. A). Kept his form, swapped red fill for outline.'),
 ('Red/green pair', 'The most common colour-blind confusion; in B&W both read the same grey. Solid vs outline carries the meaning instead.'),
 ('Fused blocks', '2 and 4 blocks fuse into one bigger shape. Area stays true, but seams vanish so you cannot count blocks, and a 2×2 square drifts towards "enlarge the icon" (A2). Expanded concept keeps a hairline gap between blocks.'),
 ('Touching dots', 'No gap between dots makes 30+ dots hard to count (marks rule ~20 on mobile). Expanded concept adds a 1px gap; pills still fuse.'),
 ('Circle cup', 'Locked crumb is a cup-filled tile. In a circle, fill height ≠ area (a half-height fill is exactly half; a quarter-height is ~20%). Small, but note it.'),
 ('Label 16,600', 'Frame shows ₹16,500 (hidden dot). Probably a sketch slip.'),
]
QS = [
 ('P2d-Q1', 'What do red and green mean in your sketch?', ['A · red = spent, green = left', 'B · two categories / jars', 'C · just colour, no meaning'], '—', 'Decides whether it conflicts with outlined-spent.'),
 ('P2d-Q2', 'Keep dots (circles) as the ₹100 unit instead of squares?', ['A · Circles everywhere (his)', 'B · Squares (Phase 2b)', 'C · Circles only on Home'], 'A', 'Shape change does not break "1 unit = ₹100"; circles make pills look like fused dots, which teaches the ladder.'),
 ('P2d-Q3', 'Should several ₹10,000 blocks fuse into one shape?', ['A · Keep separate blocks with a hairline gap', 'B · Fuse (his 2:1 and 2×2)', 'C · Fuse, tap to split'], 'A', 'Countable blocks; fused 2×2 reads as one bigger thing.'),
 ('P2d-Q4', 'Which new concept should be tested next to Merging Dots?', ['A · Day lanes (as a "today" view)', 'B · Hourglass (Home hero)', 'C · Ticket strip', 'D · None'], 'A', 'Day lanes adds per-day allowance without a number; the others replace the ladder.'),
 ('P2d-Q5', 'Spent dots: outline (rec.) or your red fill dimmed?', ['A · Outline', 'B · Dimmed fill', 'C · Your red'], 'A', 'Outline keeps the whole visible with no alarm colour.'),
]
CMP = [  # name, learn, research, anxiety(low good), scale, consistency
 ('Merging Dots (expanded)', 5, 5, 'Low', 5, 'Full', 'His form + every locked rule'),
 ('N1 Ticket strip', 4, 4, 'Med (tearing)', 3, 'Partial', 'Needs a booklet for ₹10,000'),
 ('N2 Day lanes', 4, 5, 'Med', 2, 'Partial', 'Only for spendable money; add-on view'),
 ('N3 Glass columns', 5, 3, 'Low', 3, 'Partial', 'No discrete ₹100 count'),
 ('N4 Bangles', 3, 4, 'Low', 2, 'Partial', 'Round, but space hungry'),
 ('N5 Hourglass', 4, 3, 'Med', 2, 'Weak', 'One jar per picture; goals reversed'),
]

def stars(n): return '●'*n + '○'*(5-n)

xc = ''.join(f'<article class="xc" id="{k}"><header><span class="mid">{k}</span><h4>{E(t)}</h4></header><div class="sv">{g}</div><p class="say">{E(s)}</p><p class="cite">{E(r)}</p></article>' for k, t, s, g, r in X)
ncards = ''
for k, name, rule, why, risk, figs in N:
    cells = ''.join(f'<div class="cell"><span class="mid">{E(lbl)}</span><div class="sv">{figs[key]}</div></div>' for key, lbl in SC)
    ncards += f'<article class="nc"><header><span class="mid">{k}</span><h4>{E(name)}</h4></header><p class="say">"{E(rule)}"</p><div class="grid7">{cells}</div><p class="cite"><b>Good:</b> {E(why)}</p><p class="cite"><b>Risk:</b> {E(risk)}</p></article>'
rd = ''.join(f'<div><b>{E(a)}</b><span>{E(b)}</span></div>' for a, b in READ)
cf = ''.join(f'<div><b>{E(a)}</b><span>{E(b)}</span></div>' for a, b in CONF)
tb = ''.join(f'<tr><th scope="row">{E(n)}</th><td>{stars(l)}</td><td>{stars(r)}</td><td>{a}</td><td>{stars(s)}</td><td>{c}</td><td>{E(note)}</td></tr>' for n, l, r, a, s, c, note in CMP)
qh = ''.join(f'<div class="q"><b>{q}. {E(t)}</b><ul>{"".join(f"<li>{E(o)}</li>" for o in op)}</ul><p>Recommendation: <b>{r}</b> — {E(w)}</p></div>' for q, t, op, r, w in QS)

CSS = '''
.p2d{--d-o:var(--ink3)}
.p2d .x2{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(300px,100%),1fr));gap:12px}
.p2d .xc,.p2d .nc{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:12px 14px;display:grid;gap:8px;align-content:start;min-width:0}
.p2d header{display:flex;gap:8px;align-items:baseline}.p2d h4{margin:0;font:600 14px var(--f-disp);flex:1}
.p2d .mid{font:500 11px var(--f-mono);color:var(--ink3)}
.p2d .sv{display:flex;align-items:center;overflow-x:auto;min-height:40px}.p2d .sv svg{max-width:100%;height:auto;overflow:visible}
.p2d .say{margin:0;font:500 14px var(--f-disp)} .p2d .cite{margin:0;font-size:12px;color:var(--ink2)}
.p2d svg .f{fill:var(--t-f)} .p2d svg .s{fill:var(--t-s)} .p2d svg .o{fill:none;stroke:var(--d-o);stroke-width:.9}
.p2d svg .cupo{fill:none;stroke:var(--d-o);stroke-width:.7}
.p2d svg .rs{fill:none;stroke:var(--t-f);stroke-width:1.1;stroke-dasharray:2 1.4}
.p2d svg .ow{fill:none;stroke:var(--t-s);stroke-width:1.1;stroke-dasharray:2 1.4}
.p2d svg .gh{fill:none;stroke:var(--d-o);stroke-width:.8;stroke-dasharray:1.2 1.2;opacity:.8}
.p2d svg .hx{fill:url(#p2dhatch);stroke:var(--t-f);stroke-width:.8}
.p2d svg .big{fill:none;stroke:var(--d-o);stroke-width:1.2}
.p2d svg .rf{fill:var(--t-f);stroke:var(--t-s);stroke-width:1.4}
.p2d svg .sw{fill:var(--t-s);stroke:var(--t-f);stroke-width:1.4}
.p2d svg .brk{fill:none;stroke:var(--t-f);stroke-width:.8;stroke-dasharray:3 2;opacity:.6}
.p2d svg .zero{fill:none;stroke:var(--d-o);stroke-dasharray:1 1.2}
.p2d svg .today{fill:none;stroke:var(--t-f);stroke-width:1.2;opacity:.5;filter:drop-shadow(0 0 3px var(--t-f))}
.p2d svg .lbl{font:500 7px var(--f-mono);fill:var(--ink2)} .p2d svg .lbl.mid{text-anchor:middle;font-size:6px}
.p2d svg .perf{stroke:var(--card);stroke-width:1.1;stroke-dasharray:1.5 1.2}
.p2d svg .glass{fill:none;stroke:var(--d-o);stroke-width:1} .p2d svg .tick{stroke:var(--d-o);stroke-width:.6}
.p2d svg .thread{fill:none;stroke:var(--rule);stroke-width:1} .p2d svg .empty{fill:none;stroke:var(--d-o);stroke-width:.7}
.p2d .grid7{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px}
.p2d .cell{border:1px solid var(--rule);border-radius:8px;padding:6px 8px;display:grid;gap:4px;align-content:start;min-width:0}
.p2d .na{font-size:12px;color:var(--ink3);margin:0}
.p2d .read{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr));gap:10px}
.p2d .read div{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:10px 12px}.p2d .read b{display:block;font:600 13px var(--f-disp)}.p2d .read span{font-size:13px;color:var(--ink2)}
.p2d .sk{max-width:100%;border-radius:10px;border:1px solid var(--rule);display:block}
.p2d .scales{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end}
.p2d .sc{margin:0;display:grid;gap:4px;justify-items:start}.p2d .sc figcaption{font:500 11px var(--f-mono);color:var(--ink3)}
.p2d .zoom{all:unset;cursor:zoom-in;border-radius:6px}.p2d .zoom:focus-visible{outline:2px solid var(--t-f);outline-offset:3px}
.p2d .zout{font:500 12px var(--f-mono);color:var(--ink2);min-height:1.4em}
.p2d table{width:100%;border-collapse:collapse;font-size:13px}.p2d .tw{overflow-x:auto}
.p2d th,.p2d td{text-align:left;padding:7px 8px;border-bottom:1px solid var(--rule);vertical-align:top}.p2d td{font-variant-numeric:tabular-nums;white-space:nowrap}.p2d td:last-child{white-space:normal;color:var(--ink2)}
.p2d .q{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:10px 14px;margin-bottom:8px}.p2d .q ul{margin:6px 0;padding-left:18px}.p2d .q p{margin:0;font-size:13px;color:var(--ink2)}
.p2d .btn{font:600 13px var(--f-disp);padding:7px 14px;border-radius:999px;border:1px solid var(--rule);background:var(--card);color:var(--ink);cursor:pointer}
.p2d .btn[aria-pressed="true"]{background:var(--ink);color:var(--card)}
.p2d .ctl{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.p2d.bw svg{filter:grayscale(1) contrast(1.15)}
.p2d svg .lift{transition:transform .5s ease,opacity .5s}
@media (prefers-reduced-motion:reduce){.p2d svg .lift{transition:none}}
'''
HATCH = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><pattern id="p2dhatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" style="stroke:var(--t-f)" stroke-width="1.2"/></pattern></defs></svg>'

JS = r'''<script>(function(){
var S=document.getElementById('p2d');if(!S)return;
var D=10,G=1.2,PW=10*D+9*G,NS='http://www.w3.org/2000/svg';
function el(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e}
function cupPath(cx,cy,r,f){var y0=cy+r-2*r*f,dx=Math.sqrt(Math.max(r*r-(y0-cy)*(y0-cy),0));return 'M'+(cx-dx)+' '+y0+' A'+r+' '+r+' 0 '+(f>.5?1:0)+' 0 '+(cx+dx)+' '+y0+' Z'}
function inr(n){return '₹'+n.toLocaleString('en-IN')}
S.querySelectorAll('[data-bwd]').forEach(function(b,i,a){b.addEventListener('click',function(){a.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});S.classList.toggle('bw',b.dataset.bwd==='bw')})});
// pay demo: dots drawn as total ₹ in 100 units; left solid then spent outline
S.querySelectorAll('.pay').forEach(function(box){
 var left=+box.dataset.left,amt=+box.dataset.amt,total=6000,spent0=total-left;
 var w=PW+4,svg=el('svg',{viewBox:'-2 -6 '+(w)+' 80',width:Math.round(w*1.7),height:136,role:'img','aria-label':'Pay demo'});
 box.appendChild(svg);var btn=document.createElement('button');btn.className='btn';btn.type='button';btn.textContent='Pay ₹'+amt;box.appendChild(btn);
 var cap=document.createElement('p');cap.className='cite';cap.setAttribute('aria-live','polite');box.appendChild(cap);
 function draw(l,anim){svg.innerHTML='';var y=0;
  var lp=Math.floor(l/1000),r=l%1000,lt=Math.floor(r/100),lc=r%100;
  for(var i=0;i<lp;i++){svg.appendChild(el('rect',{class:'f',x:0,y:y,width:PW,height:D,rx:D/2}));y+=D+G}
  var cells=[];for(i=0;i<lt;i++)cells.push(1);if(lc)cells.push(lc/100);
  cells.forEach(function(f,i){var cx=(i%10)*(D+G)+D/2,cy=y+D/2;svg.appendChild(el('circle',{class:'cupo',cx:cx,cy:cy,r:D/2-.4}));
   svg.appendChild(f>=1?el('circle',{class:'f',cx:cx,cy:cy,r:D/2}):el('path',{class:'f',d:cupPath(cx,cy,D/2,f)}))});
  if(cells.length)y+=D+G;
  var sp=total-l;var p=Math.floor(sp/1000);var t2=Math.ceil((sp%1000)/100);
  y+=3;for(i=0;i<p;i++){svg.appendChild(el('rect',{class:'o',x:0,y:y,width:PW,height:D,rx:D/2}));y+=D+G}
  for(i=0;i<t2;i++){svg.appendChild(el('circle',{class:'o',cx:(i%10)*(D+G)+D/2,cy:y+D/2,r:D/2-.4}))}
  cap.textContent=inr(l)+' left of '+inr(total)+'. Outlines are what is spent.';}
 var cur=left;draw(cur);
 btn.addEventListener('click',function(){if(cur!==left){cur=left;draw(cur);btn.textContent='Pay ₹'+amt;return}
  var g=el('g',{class:'lift'});var y0=-4;for(var i=0;i<4;i++){var f=i<3?1:.5,cx=PW-(4-i)*(D+G)+D/2;g.appendChild(f>=1?el('circle',{class:'f',cx:cx,cy:y0,r:D/2}):el('path',{class:'f',d:cupPath(cx,y0,D/2,f)}))}
  cur=left-amt;draw(cur);svg.appendChild(g);
  requestAnimationFrame(function(){requestAnimationFrame(function(){g.style.transform='translateY(-8px)';g.style.opacity='0'})});
  btn.textContent='Reset';});
});
// chai stepper
S.querySelectorAll('.chai').forEach(function(box){var n=0;
 var svg=el('svg',{viewBox:'-2 -2 60 20',width:120,height:40,role:'img','aria-label':'Chai cup'});box.appendChild(svg);
 var btn=document.createElement('button');btn.className='btn';btn.type='button';btn.textContent='+ ₹25 chai';box.appendChild(btn);
 var cap=document.createElement('p');cap.className='cite';cap.setAttribute('aria-live','polite');box.appendChild(cap);
 function draw(){svg.innerHTML='';var full=Math.floor(n/4),part=(n%4)/4;
  for(var i=0;i<full;i++)svg.appendChild(el('circle',{class:'o',cx:7+i*12,cy:8,r:6.6}));
  var cx=7+full*12;svg.appendChild(el('circle',{class:'cupo',cx:cx,cy:8,r:6.6}));if(part)svg.appendChild(el('path',{class:'o',d:cupPath(cx,8,7,part),style:'fill:var(--d-o);opacity:.55'}));
  cap.textContent=n?(n+' chai'+(n>1?'s':'')+' · ₹'+(n*25)+(n%4===0?' · one full ₹100 dot':'')):'No chai yet today.';}
 draw();btn.addEventListener('click',function(){n=(n+1)%9;draw()});});
// zoom on scale
var zo=S.querySelector('.zout');
S.querySelectorAll('.zoom').forEach(function(b){var lvl=0;b.addEventListener('click',function(){var a=+b.dataset.amt;lvl=(lvl+1)%4;
 var bl=Math.floor(a/10000),p=Math.floor(a%10000/1000),t=Math.floor(a%1000/100);
 var msg=[inr(a)+' · tap to zoom',bl+' block'+(bl==1?'':'s')+' = '+(bl*10)+' pills · '+p+' pills · '+t+' dots',(bl*100+p*10+t)+' dots of ₹100',inr(a)+' exactly'][lvl];
 if(zo)zo.textContent=msg;});});
})();</script>'''

SEC = f'''<section class="phase p2 p2d" id="p2d" style="margin-top:48px">{HATCH}
  <h2><span>Phase 2d</span> Tarun's sketches</h2>
  <p class="lede" style="margin:0">Tarun drew one frame in Figma ("money Visualisation one"): the ₹100 dot and how dots fuse as amounts grow. Below: what it shows, his concept expanded to every kind of money moment, five new tiling ideas, a comparison and questions.</p>
  <div class="ctl" role="group" aria-label="Colour mode"><button class="btn" type="button" data-bwd="c" aria-pressed="true">Colour</button><button class="btn" type="button" data-bwd="bw" aria-pressed="false">B&amp;W</button></div>
  <div class="block"><h3>His sketch</h3><img class="sk" alt="Tarun's Figma frame: a 10x10 dot grid for ₹10,000, then ₹6,600 as pills and dots, then ₹16,600, ₹26,600 and ₹46,600 with fused blocks" src="data:image/jpeg;base64,{SK}"><div class="read" style="margin-top:12px">{rd}</div>
  <p class="note">One frame only, so "the first one" is this whole system: dot → pill → block, laid out as blocks left, pills stacked right, loose dots under the pills. It matches the locked ladder exactly (₹100 / ₹1,000 / ₹10,000).</p></div>
  <div class="block"><h3>His scale steps, redrawn</h3><p class="note">Same five amounts in his layout, blocks kept apart by a hairline. Tap any one to zoom a level.</p><div class="scales">{scale_svgs()}</div><p class="zout" aria-live="polite">Tap an amount.</p></div>
  <div class="block"><h3>Expanded: Merging Dots, every money moment</h3><p class="note">Key: solid blue = left · outline = spent · green = saved · dashed blue = held for subscriptions · dashed green = owed to you · hatched = extra beyond plan · dotted grey = last week (ghost). No numbers would sit on Home; numbers here are for review.</p><div class="x2">{xc}</div></div>
  <div class="block"><h3>New tiling concepts</h3><p class="note">Different from his and from Phase 2b's 14 systems. Each shows the same seven moments.</p><div class="x2" style="grid-template-columns:1fr">{ncards}</div></div>
  <div class="block"><h3>Comparison</h3><div class="tw"><table><thead><tr><th scope="col">Concept</th><th scope="col">Learnability</th><th scope="col">Research fit</th><th scope="col">Anxiety</th><th scope="col">Scale</th><th scope="col">Fits locked rules</th><th scope="col">Note</th></tr></thead><tbody>{tb}</tbody></table></div></div>
  <div class="block"><h3>Where the sketch differs from locked decisions</h3><div class="read">{cf}</div></div>
  <div class="block"><h3>Questions for Tarun</h3><div class="qs">{qh}</div></div>
  <p class="note" style="color:var(--ink3);font-size:12px">Notes: claude/v12_phase2d_sketch_concepts.md</p>
</section>'''

src = open('board.html').read()
src = re.sub(r'<style id="p2dcss">.*?</style>', '', src, flags=re.S)
src = re.sub(r'<section class="phase p2 p2d" id="p2d".*?</section><script>\(function\(\)\{\nvar S=document.getElementById\(\'p2d\'\).*?</script>', '', src, flags=re.S)
src = src.replace('<section class="later" id="p3">', '<style id="p2dcss">' + CSS + '</style>' + SEC + JS + '<section class="later" id="p3">', 1)
if 'href="#p2d"' not in src:
    src = src.replace('<a href="#p3"', '<a href="#p2d" class="now">2d Sketches</a><a href="#p3"', 1).replace('href="#p2c" class="now"', 'href="#p2c" class=""')
open('board.html', 'w').write(src)

md = ['# Trickle v12 — Phase 2d: Tarun\'s sketches → concepts\n',
 'Source: Figma "Trickle-Explorations" (jaa1XnsKBLGcDLj5hYxpBr), page 1, frame "money Visualisation one" (3:2). Board: Phase 2d section.\n',
 '## What the sketch shows\n' + '\n'.join(f'- **{a}**: {b}' for a, b in READ),
 '\nOne frame only → "the first one" = this whole dot→pill→block system. Layout rule: blocks left, pills stacked right, loose dots under pills. Matches the locked ladder (₹100 / ₹1,000 / ₹10,000).\n',
 '## Expanded concept: Merging Dots\nKey: solid = left · outline = spent · green = saved · dashed blue = held (subscriptions) · dashed green = owed to you · hatched = extra beyond plan · dotted = last week ghost · cup-fill circle = under ₹100.\n',
 '| # | Moment | Sentence | Research |\n|---|---|---|---|'] + [f'| {k} | {t} | {s} | {r} |' for k, t, s, g, r in X] + [
 '\nInteractive on the board: tap-to-zoom on his five amounts, Pay ₹350 (dots lift out, become outlines), +₹25 chai stepper (cup fills, 4 → one dot).\n',
 '## New concepts (7 core moments each on the board)\n'] + [f'### {k} {n}\n- Rule: "{r}"\n- Good: {w}\n- Risk: {x}\n' for k, n, r, w, x, f in N] + [
 '## Comparison\n| Concept | Learn | Research | Anxiety | Scale | Locked-rule fit | Note |\n|---|---|---|---|---|---|---|'] + [f'| {n} | {l}/5 | {r}/5 | {a} | {s}/5 | {c} | {note} |' for n, l, r, a, s, c, note in CMP] + [
 '\n## Conflicts with locked decisions (flagged, nothing changed)\n' + '\n'.join(f'- **{a}**: {b}' for a, b in CONF),
 '\n## Questions for Tarun\n| # | Question | Options | Recommended | Why |\n|---|---|---|---|---|'] + [f'| {q} | {t} | {" / ".join(op)} | {r} | {w} |' for q, t, op, r, w in QS]
open('v12_phase2d_sketch_concepts.md', 'w').write('\n'.join(md) + '\n')
print('ok', len(X), len(N), len(src)/1e6)
