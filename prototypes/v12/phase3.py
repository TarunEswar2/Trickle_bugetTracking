# Phase 3 — Insight & visualization library. Reuses the dot system from phase2e.py.
import re, math, html, json
src2e = open('/home/claude/v12/phase2e.py').read()
exec(src2e.split('\nCONCEPTS = [')[0])          # dot, md, lanes_v, bangle, hourglass, lanes_days, svg, tx, blk, cup_wedge...
OUTL.update({'gh', 'hx', 'rs', 'ow', 'o'})

# ---------------- seed data (same everywhere) ----------------
# Month of 30 days, today = day 18 (a Thursday). Income ₹9,000 (allowance 7,000 + café shift 2,000).
# Split: savings 2,000 · held for subscriptions 499 · jars 6,000 (Food 2,500 · Travel 1,500 · Fun 2,000) · 501 buffer.
JARS = [('Food', 'cF', 2500, 1640, 1420), ('Travel', 'cT', 1500, 700, 760), ('Fun', 'cU', 2000, 1220, 820)]  # name, class, budget, spent, spent last month same day
DAYS = [210, 180, 340, 95, 420, 610, 150, 120, 260, 300, 75, 690, 520, 140, 230, 180, 250, 120]  # spends per day so far (sum 4,890? see below)
SPENT = sum(j[3] for j in JARS)  # 3,560
HOURS = [0,0,0,0,0,0,0,1,4,3,2,2,5,3,2,2,3,5,4,6,8,7,4,2]  # count of spends per hour (late evenings heavy)
WEEKDAY = [260, 210, 240, 300, 520, 640, 330]  # avg ₹ per weekday M..S
PLACES = [('Hostel mess', 900, 'cF'), ('Zomato', 640, 'cF'), ('Rapido', 420, 'cT'), ('PVR', 560, 'cU'), ('Chai stall', 550, 'cF')]
CHAI = (25, 22)   # ₹25 × 22 this month
SUBS = [('Spotify', 119, 4), ('Netflix', 199, 22), ('iCloud', 75, 26), ('Gym app', 106, 28)]  # day due
GOAL = ('Goa trip', 8000, 4160)
SAVED_M = [900, 1200, 800, 1500, 1700, 2000]
SPENT_M = [5200, 5900, 6100, 5400, 5600, 3560]
MON = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
OWED = [('Arjun', 350), ('Meera', 180)]

S = 1.45
def V(inner, w, h, title, sc=S): return svg(inner, w, h, title, sc=sc)
def L(x, y, s, c='lbl', a='start'): return tx(x, y, s, c, a)
def cells(a, c):
    n, cu = divmod(a, 100); o = [(c, 1)] * n
    if cu: o.append((c, cu / 100))
    return o
def drow(cl, x0=0, y0=0, per=10, gapx=0):
    o = []
    for i, (c, f) in enumerate(cl): o.append(dot(x0 + (i % per) * (D + G) + R + (i % per >= 5) * gapx, y0 + (i // per) * (D + G) + R, c, f))
    rows = math.ceil(len(cl) / per) if cl else 0
    return ''.join(o), min(len(cl), per) * (D + G) - G + (gapx if len(cl) > 5 else 0), rows * (D + G) - G
def jarrow(name, c, bud, sp, x0, y0, ghost=None, lab=True):
    """Merging dots for one jar: left = solid category colour, spent = outline (left first)."""
    left = bud - sp
    i, w, h = md([(left, c), (sp, 'o')], x0 + (52 if lab else 0), y0)
    s = (L(x0, y0 + 8, name, 'lbl b') if lab else '') + i
    return s, w + (52 if lab else 0), h
def glowcell(x, y, v, r=R, shape='c'):
    op = .1 + .9 * v
    if shape == 'r': return f'<rect class="gw" x="{x:.1f}" y="{y:.1f}" width="{r*2:.1f}" height="{r*2:.1f}" rx="2" style="opacity:{op:.2f}"/>'
    return f'<circle class="gw" cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" style="opacity:{op:.2f}"/>'
def sent(s): return f'<p class="sn">{E(s)}</p>'

# ================= renderers: each returns html (svg + optional sentence) =================
def pace_lanes():
    # this week Mon..Sun, per-day share ₹300; today = Thu (index 3); overspend re-spread: future lanes shrink to 270
    rows = [[(180, 'o'), (120, 'cF')][:1] + [], [(300, 'o')], [(250, 'o')], [(150, 'o'), (150, 'cF')], [(270, 'cF')], [(270, 'cF')], [(270, 'cF')]]
    rows[0] = [(300, 'o')]
    return lanes_days(rows, per=300, today=3, title='Day lanes this week') + sent('Today has 1½ dots left. The rest of the week evened out.')
def pace_glow():
    o = []; n = 30
    for d in range(n): o.append(f'<circle class="{"gw" if d < 18 else "trk"}" cx="{d*7+3:.1f}" cy="6" r="2.4" style="opacity:{.25 + .75*d/17 if d < 18 else 1:.2f}"/>')
    o.append(f'<circle class="pos" cx="{17*7+3}" cy="6" r="4.5"/>')
    return V(''.join(o) + L(0, 22, 'day 1') + L(29*7+6, 22, 'day 30', 'lbl', 'end'), 29*7+6, 24, 'Month track, glow to today') + sent('Steady.')
def pace_runway():
    i, w, h = md([(1440, 'cF')], 0, 0)
    t = ''.join(f'<circle class="{"gw" if k < 7 else "trk"}" cx="{k*8+4}" cy="{h+14}" r="2.6"/>' for k in range(12))
    return V(i + t + L(0, h + 28, 'lasts ~7 of 12 days at this pace'), max(w, 130), h + 30, 'Runway') + sent('Food money lasts to about the 25th.')

def jars_md():
    o = []; y = 0; W = 0
    for n, c, b, s, _ in JARS:
        i, w, h = jarrow(n, c, b, s, 0, y); o.append(i); y += h + 8; W = max(W, w)
    return V(''.join(o), W, y - 8, 'Jars, left solid, spent outline') + sent('Food 8½ dots left · Travel 8 · Fun 7¾.')
def jars_lanes():
    o = []; x = 0
    for n, c, b, s, _ in JARS:
        i, w, h = lanes_v([(b - s, c), (s, 'o')], x, 0); o.append(i + L(x, h + 10, n)); x += w + 14
    return V(''.join(o), x - 14, h + 12, 'Jars as upright lanes')
def jars_one():
    i, w, h = md([(b - s, c) for n, c, b, s, _ in JARS] + [(SPENT, 'o')], 0, 0, bc=1)
    return V(i, w, h, 'All jars in one row') + sent('All jars together: 26 of 60 dots left.')

def share_waffle():
    cl = []
    for n, c, b, s, _ in JARS: cl += [(c, 1)] * round(s / SPENT * 100)
    cl = cl[:100]; i, w, h = drow(cl, 0, 0, per=10)
    return V(i, w, h, 'Category share, 100 dots', sc=1.3) + sent('Food takes 46 of every 100 rupees spent.')
def share_pills():
    o = []; x = 0
    for n, c, b, s, _ in JARS:
        ww = s / SPENT * 200; o.append(f'<rect class="{c}" x="{x:.1f}" y="0" width="{ww-2:.1f}" height="{D}" rx="{R}"/>' + L(x, 22, n)); x += ww
    return V(''.join(o), 200, 24, 'Share as one pill split')
def share_rank():
    o = []; y = 0
    for n, c, b, s, _ in sorted(JARS, key=lambda j: -j[3]):
        i, w, h = md([(s, c)], 52, y); o.append(L(0, y + 8, n, 'lbl b') + i); y += h + 6
    return V(''.join(o), 52 + PW, y - 6, 'Spent per jar ranked')

def drift_ghost():
    o = []; y = 0
    for n, c, b, s, l in JARS:
        cur = cells(s, c); last = cells(l, 'gh'); m = max(len(cur), len(last))
        cl = []
        for k in range(m):
            if k < len(cur) and k < len(last): cl.append(cur[k])
            elif k < len(cur): cl.append(('hx', cur[k][1]))
            else: cl.append(last[k])
        i, w, h = drow(cl, 52, y, per=10); o.append(L(0, y + 8, n, 'lbl b') + i); y += h + 8
    return V(''.join(o), 52 + 10*(D+G), y - 8, 'This month vs last, ghost + hatched extra') + sent('Fun is 4 dots past last month, about 2 movie nights.')
def drift_dumb():
    o = []; y = 6
    for n, c, b, s, l in JARS:
        xa, xb = 52 + l / 20, 52 + s / 20
        o.append(L(0, y + 3, n, 'lbl b') + f'<line class="trk2" x1="{min(xa,xb):.1f}" x2="{max(xa,xb):.1f}" y1="{y}" y2="{y}"/>' + f'<circle class="gh" cx="{xa:.1f}" cy="{y}" r="{R-.5}"/>' + f'<circle class="{c}" cx="{xb:.1f}" cy="{y}" r="{R}"/>'); y += 18
    return V(''.join(o), 52 + 1700/20 + 6, y - 10, 'Dumbbell last → this month (position)')
def drift_words():
    return '<ul class="wl"><li><b>Fun</b> 4 dots more</li><li><b>Food</b> 2 dots more</li><li><b>Travel</b> about the same</li></ul>'

def changed_card():
    return sent('One thing changed this week:') + drift_one() + sent('Fun went up by about 2 movie nights. Food and Travel held steady.')
def drift_one():
    cur = cells(1220, 'cU'); last = cells(820, 'gh'); cl = [cur[k] if k < len(last) else ('hx', cur[k][1]) for k in range(len(cur))]
    i, w, h = drow(cl, 0, 0); return V(i, w, h, 'Fun vs last month')
def changed_three():
    o = []; y = 0
    for n, c, b, s, l in JARS:
        cl = [(c, 1)] * min(s, l) // 100 if False else []
        diff = (s - l) // 100
        cl = [('hx', 1)] * max(diff, 0) + [('gh', 1)] * max(-diff, 0)
        i, w, h = drow(cl or [('zero', 1)], 52, y); o.append(L(0, y + 8, n, 'lbl b') + i); y += max(h, D) + 8
    return V(''.join(o), 52 + 10*(D+G), y - 8, 'Only the change per jar')
def changed_chips():
    return '<div class="chips"><span>Fun ↑ 4 dots</span><span>Food ↑ 2 dots</span><span>Travel =</span><span>Chai ×22</span></div>'

def repeat_crumbs():
    o = []; n, k = 4, CHAI[1]
    for j in range(k):
        x = (j % 11) * (D + G) + R; y = (j // 11) * (D + G) + R
        o.append(cup_wedge(x, y, R, .25, 'cF'))
    i, w, h = md([(CHAI[0]*CHAI[1], 'cF')], 0, 2*(D+G) + 10)
    return V(''.join(o) + L(0, 2*(D+G)+6, '22 chais → 5½ dots') + i, 11*(D+G), 2*(D+G) + 10 + h, 'Chai wedges merging into dots') + sent('22 chais this month made 5½ dots.')
def repeat_tally():
    o = []; y = 0
    for n, cnt in [('Chai stall', 22), ('Zomato', 4), ('Rapido', 9)]:
        o.append(L(0, y + 8, n, 'lbl b') + ''.join(f'<line class="tal" x1="{60 + k*4 + (k//5)*4}" x2="{60 + k*4 + (k//5)*4}" y1="{y}" y2="{y+D}"/>' for k in range(cnt))); y += D + 8
    return V(''.join(o), 60 + 26*4 + 20, y - 8, 'Visits tally') + sent('Chai stall 22 visits.')
def repeat_year():
    i, w, h = md([(550 * 12, 'cF')], 0, 0)
    return V(i, w, h, 'Chai over a year') + sent('At this pace chai is about 66 dots a year.')

def small_crumbs():
    cl = [('cF', .25)] * 22 + [('cT', .4)] * 6 + [('cU', .6)] * 5
    i, w, h = drow(cl, 0, 0, per=11)
    j, w2, h2 = md([(550 + 240 + 300, 'cF')], 0, h + 12)
    return V(i + L(0, h + 8, 'under ₹100 each → together') + j, max(w, w2), h + 12 + h2, 'Small buys add up') + sent('33 small buys made almost 11 dots.')
def small_split():
    i, w, h = drow([('cF', 1)] * 33, 0, 0, per=17); j, w2, h2 = drow([('cF', 1)] * 11 + [('o', 1)] * 25, 0, h + 16, per=18)
    return V(i + L(0, h + 12, 'count: 33 of 52 buys were small') + j + L(0, h + 16 + h2 + 10, 'money: 11 of 36 dots'), max(w, w2), h + 16 + h2 + 12, 'Count share vs money share')
def small_word(): return sent('Small buys: one in three rupees.') + '<p class="cap">Words only, no figure.</p>'

def places_rank():
    o = []; y = 0
    for n, a, c in sorted(PLACES, key=lambda p: -p[1]):
        i, w, h = md([(a, c)], 72, y); o.append(L(0, y + 8, n, 'lbl b') + i); y += h + 6
    return V(''.join(o), 72 + 10*(D+G), y - 6, 'Top places ranked')
def places_waffle():
    cl = []
    for n, a, c in PLACES: cl += [(c, 1)] * (a // 100)
    i, w, h = drow(cl, 0, 0, per=10); return V(i, w, h, 'Places as one dot field') + sent('Hostel mess is the biggest single place.')
def places_eq(): return sent('Zomato this month ≈ 26 of your chais.')

def tod_strip():
    m = max(HOURS); o = [glowcell(h*9 + 4, 6, HOURS[h]/m) for h in range(24)]
    return V(''.join(o) + L(0, 24, '6am') + L(23*9+8, 24, 'midnight', 'lbl', 'end') + L(18*9+4, 24, '6pm', 'lbl mid'), 23*9+8, 26, 'Time of day glow strip') + sent('Mostly late evenings.')
def tod_parts():
    o = []; x = 0
    for nm, rng in [('Morning', range(6, 12)), ('Afternoon', range(12, 17)), ('Evening', range(17, 21)), ('Late', list(range(21, 24)) + list(range(0, 6)))]:
        k = sum(HOURS[h] for h in rng); i, w, h = drow([('cF', 1)] * k, x, 0, per=5); o.append(i + L(x, 6*(D+G) + 6, nm)); x += 5*(D+G) + 12
    return V(''.join(o), x, 6*(D+G) + 8, 'Four parts of the day')
def tod_ring():
    m = max(HOURS); o = []
    for h in range(24):
        a = -math.pi/2 + h*2*math.pi/24; o.append(glowcell(40 + 32*math.cos(a), 40 + 32*math.sin(a), HOURS[h]/m, r=4))
    return V(''.join(o) + L(40, 43, 'clock', 'lbl mid'), 80, 80, '24-hour glow ring')

def wd_lanes():
    rows = [cells(round(a/100)*100, 'o' if k < 7 else 'cF') for k, a in enumerate(WEEKDAY)]
    return lanes_days([[(round(a/100)*100, 'cF')] for a in WEEKDAY], per=700, title='Usual day by weekday') + sent('Fridays and Saturdays are the heavy days.')
def wd_glow():
    o = [glowcell(k*16 + 6, 6, WEEKDAY[k]/640, r=6, shape='r') + L(k*16 + 6, 24, 'MTWTFSS'[k], 'lbl mid') for k in range(7)]
    return V(''.join(o), 7*16, 26, 'Weekday glow')
def wd_word(): return sent('Weekends cost about twice a weekday.')

def cal_glow():
    o = []; m = max(DAYS)
    for d in range(30):
        x = (d % 7) * 13 + 6; y = (d // 7) * 13 + 6
        o.append(glowcell(x - 5, y - 5, DAYS[d]/m, r=5, shape='r') if d < 18 else f'<rect class="trk" x="{x-5}" y="{y-5}" width="10" height="10" rx="2"/>')
    o.append(f'<rect class="today" x="{(17%7)*13-1}" y="{(17//7)*13-1}" width="14" height="14" rx="3"/>')
    return V(''.join(o), 7*13, 5*13, 'Calendar glow') + sent('Heavy days: the 6th, 12th and 13th.')
def cal_dots():
    o = []
    for d in range(30):
        x = (d % 7) * 30; y = (d // 7) * 30
        if d < 18:
            k, cu = divmod(DAYS[d], 100); cl = [('cF', 1)] * k + ([('cF', cu/100)] if cu else [])
            for j, (c, f) in enumerate(cl): o.append(dot(x + (j % 3)*7 + 3.5, y + (j // 3)*7 + 3.5, c, f, r=3))
        else: o.append(L(x, y + 8, str(d+1)))
    return V(''.join(o), 7*30, 5*30, 'Calendar with ₹100 dots per day', sc=1)
def cal_lanes():
    rows = [[(a, 'o')] for a in DAYS] + [[(160, 'cF')]] * 12
    return lanes_days(rows, per=700, today=17, title='Month as 30 day lanes')

def range_band():
    o = []
    for k in range(9): o.append(dot(k*(D+G)+R, R, 'cF' if 2 <= k <= 5 else 'o'))
    o.append(f'<circle class="pos" cx="{3.6*(D+G)+R:.1f}" cy="{D+10}" r="3.5"/>' + L(3.6*(D+G)+R, D+24, 'this week', 'lbl mid'))
    return V(''.join(o) + L(0, -2 + 0, ''), 9*(D+G), D + 26, 'Usual week range') + sent('This week sits inside your usual range.')
def range_freq():
    cl = [('cF', 1)] * 3 + [('o', 1)] * 7; i, w, h = drow(cl, 0, 0)
    return V(i, w, h, 'Frequency format') + sent('3 of your last 10 days went over ₹300.')
def range_strip():
    o = [f'<rect class="gw" x="20" y="2" width="70" height="8" rx="4" style="opacity:.35"/>', f'<line class="trk2" x1="0" x2="160" y1="6" y2="6"/>', f'<circle class="pos" cx="62" cy="6" r="4"/>']
    return V(''.join(o) + L(0, 22, 'quiet') + L(160, 22, 'busy', 'lbl', 'end'), 160, 24, 'Range strip glow')

def big_ghost():
    i, w, h = md([(1100, 'cU')], 0, 0); j, w2, h2 = md([(180, 'gh')], 0, h + 14)
    return V(i + L(0, h + 10, 'your usual Fun buy') + j, max(w, w2), h + 14 + h2, 'Big one-off vs usual') + sent('Concert ticket: about 6 of your usual Fun buys.')
def big_list(): return '<ul class="wl"><li><b>Concert</b> 11 dots</li><li><b>Shoes</b> 9 dots</li><li><b>Train</b> 5 dots</li></ul>'
def big_freq(): return sent('2 big buys this month; usually 1.')

def subs_held():
    o = []; x = 0
    i, w, h = md([(499, 'rs')], 0, 0); o.append(i)
    t = ''.join(f'<circle class="trk" cx="{d*6+3}" cy="{h+16}" r="1.8"/>' for d in range(30))
    for n, a, d in SUBS: t += f'<circle class="gw" cx="{d*6-3}" cy="{h+16}" r="3"/>'
    t += f'<circle class="pos" cx="{22*6-3}" cy="{h+16}" r="4.5"/>'
    return V(o[0] + t + L(0, h + 32, 'next: Netflix in 4 days'), 30*6, h + 34, 'Held for subscriptions + next due') + sent('5 dots held; Netflix comes out in 4 days.')
def subs_year():
    i, w, h = md([(499*12, 'rs')], 0, 0); return V(i, w, h, 'Subscriptions over a year') + sent('About ₹6,000 a year: one month of jars.')
def subs_cal():
    o = []
    for d in range(30):
        x = (d % 7) * 13 + 6; y = (d // 7) * 13 + 6
        hit = [s for s in SUBS if s[2] == d + 1]
        o.append(dot(x, y, 'rs', 1, r=4.5) if hit else f'<circle class="trk" cx="{x}" cy="{y}" r="1.6"/>')
    return V(''.join(o), 7*13, 5*13, 'Due days calendar')

def inc_sources():
    i, w, h = md([(7000, 'in1'), (2000, 'in2')], 0, 0)
    return V(i + L(0, h + 12, 'allowance 7 pills · café shift 2 pills'), max(w, 150), h + 14, 'Income sources') + sent('Allowance and café shift this month.')
def inc_lanes():
    o = []; x = 0
    for n, a, c in [('Allowance', 7000, 'in1'), ('Café', 2000, 'in2')]:
        i, w, h = lanes_v([(a, c)], x, 0); o.append(i + L(x, h + 10, n)); x += w + 18
    return V(''.join(o), x, h + 12, 'Sources upright')

def next_track():
    o = ''.join(f'<circle class="{"gw" if d < 18 else "trk"}" cx="{d*7+3}" cy="6" r="2.2" style="opacity:{.5 if d < 18 else 1}"/>' for d in range(30))
    o += f'<circle class="pos" cx="{17*7+3}" cy="6" r="4"/><circle class="in1" cx="{29*7+3}" cy="6" r="5"/>'
    return V(o + L(29*7+6, 22, 'allowance', 'lbl', 'end'), 29*7+8, 24, 'Next money in on the month track') + sent('Allowance in 12 days.')
def next_count():
    i, w, h = drow([('trk2d', 1)] * 12, 0, 0, per=12); return V(i, w, h, '12 days as 12 marks')
def next_word(): return sent('Allowance in 12 days.') + '<p class="cap">Words only.</p>'

def split_pills():
    i, w, h = md([(2000, 'sv'), (499, 'rs'), (2500, 'cF'), (1500, 'cT'), (2000, 'cU'), (501, 'o')], 0, 0, bc=1)
    return V(i, w, h, 'Where the ₹9,000 went') + sent('2 pills to Goa, 5 dots held, the rest into jars.')
def split_hg():
    i, w, h = hourglass([(9000, 'in1'), (0, 'o')]); return V(i, w, h, 'Hourglass drop on pay day')

def sankey(minimal=False):
    # dot-ribbon Sankey: income column → savings/held/jars → left/spent
    o = []; colx = [0, 90, 180]; sc = .016
    src = [('in1', 7000), ('in2', 2000)]; mid = [('sv', 2000), ('rs', 499), ('cF', 2500), ('cT', 1500), ('cU', 2000), ('o', 501)]
    y = 0; ys = []
    for c, a in src:
        h = a*sc; o.append(f'<rect class="{c}" x="0" y="{y:.1f}" width="8" height="{h-2:.1f}" rx="3"/>'); ys.append((y, h)); y += h
    y = 0; yi = 0
    for c, a in mid:
        h = a*sc; o.append(f'<path class="rib {c}" d="M8 {yi:.1f} C50 {yi:.1f} 50 {y:.1f} 90 {y:.1f} V{y+h-2:.1f} C50 {y+h-2:.1f} 50 {yi+h-2:.1f} 8 {yi+h-2:.1f} Z"/>')
        o.append(f'<rect class="{c}" x="90" y="{y:.1f}" width="8" height="{h-2:.1f}" rx="3"/>')
        if not minimal and c in ('cF', 'cT', 'cU'):
            sp = {j[1]: j[3] for j in JARS}[c]; hs = sp*sc
            o.append(f'<path class="rib o" d="M98 {y+h-hs:.1f} C140 {y+h-hs:.1f} 140 {y+h-hs:.1f} 180 {y+h-hs:.1f} V{y+h-2:.1f} H98 Z"/>')
        o.append(L(104 if minimal else 186, y + h/2 + 2, {'sv': 'Goa', 'rs': 'subs', 'cF': 'Food', 'cT': 'Travel', 'cU': 'Fun', 'o': 'buffer'}[c]))
        y += h; yi += h
    return V(''.join(o), 220 if not minimal else 140, y, 'Money flow')
def sankey_rec(): return sankey() + sent('Where all ₹9,000 went, one tap per ribbon.')
def sankey_steps():
    o = []; y = 0
    for lab, segs in [('In', [(9000, 'in1')]), ('Split', [(2000, 'sv'), (499, 'rs'), (6501, 'cF')]), ('Now', [(2000, 'sv'), (2940, 'cF'), (SPENT, 'o')])]:
        i, w, h = md(segs, 40, y, bc=1); o.append(L(0, y + 8, lab, 'lbl b') + i); y += h + 8
    return V(''.join(o), 40 + 2*PW, y, 'Flow as three steps')

def rate_ten():
    i, w, h = drow([('sv', 1)] * 2 + [('sv', .2)] + [('o', 1)] * 7, 0, 0); return V(i, w, h, 'Savings rate in ten') + sent('You kept about 2 of every 10 rupees.')
def rate_hundred():
    i, w, h = drow([('sv', 1)] * 22 + [('o', 1)] * 78, 0, 0); return V(i, w, h, 'Savings rate in 100', sc=1.2)
def rate_word(): return sent('About a fifth of what came in stayed.')

def goal_md():
    i, w, h = md([(GOAL[2], 'sv'), (GOAL[1] - GOAL[2], 'o')], 0, 0, bc=1); return V(i, w, h, 'Goa: saved solid, to go outline') + sent('Goa: 41½ dots saved, 38½ to go.')
def goal_bangle():
    i, w, h = bangle([(GOAL[2], 'sv'), (GOAL[1]-GOAL[2], 'o')], per=4); return V(i, w, h, 'Goa as bangles', sc=1.1)
def goal_hg():
    i, w, h = hourglass([(GOAL[1]-GOAL[2], 'f'), (GOAL[2], 'sv')]); return V(i, w, h, 'Goa as hourglass', sc=1.1)

def eta_glow():
    o = []; ms = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb']
    for k, m in enumerate(ms):
        o.append(f'<circle class="{"svd" if k == 0 else "gws"}" cx="{k*44+8}" cy="10" r="{6 if k == 3 else 4}" style="opacity:{1 if k in (0, 3) else .45}"/>' + L(k*44+8, 28, m, 'lbl mid'))
    o.append(f'<line class="trk2 dash" x1="12" x2="140" y1="10" y2="10"/>')
    return V(''.join(o), 4*44+16, 30, 'Goal ETA glow path') + sent('At this pace you reach Goa around January.')
def eta_dots(): return ucols([('Oct', 4160, 'sv'), ('Nov', 1300, 'gh'), ('Dec', 1300, 'gh'), ('Jan', 1240, 'gh')], 'Projected monthly adds')
def eta_word(): return sent('About 3 more months.')

def growth_lanes(): return ucols([(m, a, 'sv') for m, a in zip(MON, SAVED_M)], 'Saved per month', 'You saved more in each of the last 3 months.')
def growth_glow():
    o = ''.join(f'<circle class="gws" cx="{k*26+6}" cy="{30 - a/80:.1f}" r="4"/>' for k, a in enumerate(SAVED_M))
    return V(o + ''.join(L(k*26+6, 44, m, 'lbl mid') for k, m in enumerate(MON)), 5*26+12, 46, 'Saved per month as positions')
def growth_word(): return sent('Growing: 3 months up in a row.')

def roll_move():
    i, w, h = md([(480, 'cF')], 0, 0); j, w2, h2 = md([(480, 'sv')], w + 36, 0)
    return V(i + f'<path class="arr" d="M{w+6} {h/2} H{w+30}"/>' + j, w + 36 + w2, h, 'Leftover moves to savings') + sent('Last month 4¾ dots rolled into Goa.')
def roll_ba():
    i, w, h = md([(GOAL[2] - 480, 'sv'), (480, 'svn')], 0, 0, bc=1); return V(i, w, h, 'Goa before + rolled-in part')

def owed_dash():
    o = []; y = 0
    for n, a in OWED:
        i, w, h = md([(a, 'ow')], 50, y); o.append(L(0, y + 8, n, 'lbl b') + i); y += h + 6
    return V(''.join(o), 50 + 4*(D+G), y - 6, 'Owed to you, dashed') + sent('Arjun 3½ dots · Meera 1¾.')
def owed_total():
    i, w, h = md([(530, 'ow')], 0, 0); return V(i, w, h, 'Owed total') + sent('Friends owe you about 5 dots.')

def story_cards():
    frames = [('Came in', [(9000, 'in1')]), ('Spent', [(SPENT, 'o')]), ('Saved', [(2000, 'sv')])]
    o = []; x = 0
    for t, segs in frames:
        i, w, h = md(segs, x, 14, bc=1); o.append(f'<rect class="frm" x="{x-4}" y="0" width="{max(w, 4*(D+G))+8:.1f}" height="74" rx="6"/>' + L(x, 9, t, 'lbl b') + i); x += max(w, 4*(D+G)) + 16
    return V(''.join(o), x - 8, 74, 'Month story frames') + sent('September: you kept 2 pills. Fresh start on the 1st.')
def story_row():
    i, w, h = md([(2000, 'sv'), (2940, 'cF'), (SPENT, 'o')], 0, 0, bc=1); return V(i, w, h, 'Month in one row')

def eq_icons():
    o = ''.join(cup_wedge((k % 7) * (D+G) + R, (k // 7) * (D+G) + R, R, .25, 'cF') for k in range(14))
    return V(o, 7*(D+G), 2*(D+G), '14 chais') + sent('₹350 dinner ≈ 14 of your chais.')
def eq_dots():
    i, w, h = md([(350, 'cU')], 0, 0); return V(i, w, h, '₹350 as dots') + sent('₹350 ≈ 3½ dots.')
def eq_word(): return sent('About two Rapido rides home.')

def time_days():
    rows = [[(300, 'cF')], [(50, 'cF'), (250, 'o')]]
    return lanes_days(rows + [[(0, 'cF')]], per=300, labels=['day', '+', ''], title='₹350 as days of Food') + sent('₹350 is about 1¼ days of Food money.')
def time_runway(): return pace_runway()

def mom_cols(): return ucols([(m, a, 'o' if m != 'Oct' else 'cF') for m, a in zip(MON, SPENT_M)], 'Six months spent', 'October is on the quieter side so far.')
def mom_glow():
    o = ''.join(f'<circle class="gw" cx="{k*26+6}" cy="{40 - a/200:.1f}" r="4"/>' for k, a in enumerate(SPENT_M))
    return V(o + ''.join(L(k*26+6, 48, m, 'lbl mid') for k, m in enumerate(MON)), 5*26+12, 50, 'Six months as positions')
def mom_ghost():
    i, w, h = md([(3560, 'cF'), (2040, 'gh')], 0, 0, bc=1); return V(i, w, h, 'This month over last month ghost')

def bal_row():
    i, w, h = md([(2940, 'cF'), (499, 'rs'), (GOAL[2], 'sv'), (530, 'ow')], 0, 0, bc=1); return V(i, w, h, 'Where your money sits') + sent('Jars, held, Goa, and owed to you.')
def bal_glow(): return sent('₹7,599 in all.') + '<p class="cap">One number, tap for split.</p>'

def little_home():
    o = ''.join(cup_wedge((k % 11) * (D+G) + R, (k // 11) * (D+G) + R, R, .25, 'cF') for k in range(22))
    return V(o, 11*(D+G), 2*(D+G), 'Little things, no numbers') + '<p class="cap">Home: wedges only, no ₹.</p>'
def little_merge(): return repeat_crumbs()

def ucol(a, c, x0, H, per=3):
    cl = cells(a, c); o = []
    for j, (cc, f) in enumerate(cl): o.append(dot(x0 + (j % per)*(D+G) + R, H - R - (j // per)*(D+G), cc, f))
    return ''.join(o), per*(D+G) - G
def ucols(items, title, sent_=''):
    H = max(math.ceil(len(cells(a, c))/3) for _, a, c in items)*(D+G); o = []; x = 0
    for lab, a, c in items:
        i, w = ucol(a, c, x, H); o.append(i + L(x, H + 10, lab)); x += w + 10
    return V(''.join(o), x - 10, H + 12, title) + (sent(sent_) if sent_ else '')
# ---------------- the library ----------------
# id, name, question, tab, depth, placement(default/library), home(bool), [(alt name, fn)], rec index, why, source of item
I = [
 ('pace', 'Pace / day allowance', 'Can I afford this today?', 'Spending', 'glance', 'default', True,
  [('Day lanes (week)', pace_lanes), ('Glow track + word', pace_glow), ('Runway dots', pace_runway)], 0,
  'Per-day allowance is the most actionable framing (M3: YNAB 2016; Gigerenzer & Hoffrage 1995 natural frequencies). Day lanes were adopted for Spending; overspend re-spreads, no blame. On Home it drops to the glow word only.', 'Rec #33/35/36'),
 ('jars', 'Jar left', 'How much is left per jar?', 'Spending', 'glance', 'default', True,
  [('Merging Dots per jar', jars_md), ('Upright lanes', jars_lanes), ('One combined row', jars_one)], 0,
  'Leftover-first with the whole visible (M1, M14: Olafsson & Pagel 2018; Heath & Soll 1996 mental accounts). Rows share a left edge so jars compare on a common baseline (Cleveland & McGill 1984).', 'Rec #30'),
 ('little', 'Little things (Home)', 'What small things add up?', 'Home', 'glance', 'default', True,
  [('Wedges only, no ₹', little_home), ('Wedges merging to dots', little_merge)], 0,
  'Home carries no numbers (P2c-Q1). Pie wedges stacking show crumbs adding up by area alone (M4: Haroz 2015; Soman 2001).', 'Rec #94'),
 ('repeat', 'Repeat buys', 'Where do I keep going?', 'Spending', 'explore', 'default', False,
  [('Crumbs → dots', repeat_crumbs), ('Visit tally', repeat_tally), ('Year at this pace', repeat_year)], 0,
  'Crumbs merging into ₹100 dots make the accumulation visible in the one unit (M4: Kay et al. 2016; Haroz 2015). The yearly view is the detail layer (rec #96).', 'Rec #95/96'),
 ('small', 'Small buys add up', 'Do little buys matter?', 'Insights', 'explore', 'default', False,
  [('Crumb field → merged dots', small_crumbs), ('Count share vs money share', small_split), ('Sentence', small_word)], 0,
  'Same mechanism as repeat buys but across all places; the merge is the insight (Soman 2001 payment transparency).', 'Rec #94'),
 ('share', 'Category share', 'Where does most of it go?', 'Insights', 'explore', 'default', False,
  [('100-dot waffle', share_waffle), ('Split pill', share_pills), ('Ranked rows', share_rank)], 0,
  'A 100-dot waffle gives a frequency-format share ("46 of every 100", Gigerenzer & Hoffrage 1995; Garcia-Retamero 2010) and keeps the dot vocabulary; split pill loses countability.', 'Rec #105 (share)'),
 ('changed', 'What changed', 'What is different this week?', 'Insights', 'explore', 'default', False,
  [('One change + ghost', changed_card), ('All jars, change only', changed_three), ('Chips', changed_chips)], 0,
  'One sentence + the ghost of last period with hatched extra (decided P2c-Q4; Lan et al. 2023 one-message charts). One change beats a list for low-load reading.', 'Rec #107/114'),
 ('drift', 'Category drift (month vs last)', 'Which jar changed?', 'Insights', 'detail', 'library', False,
  [('Ghost + hatched per jar', drift_ghost), ('Dumbbell positions', drift_dumb), ('Word list', drift_words)], 0,
  'Ghost-of-last-period is the locked comparison language; dumbbell uses position (allowed) but adds a second vocabulary.', 'Rec #107'),
 ('places', 'Top places', 'Who gets most of my money?', 'Spending', 'explore', 'library', False,
  [('Ranked merging rows', places_rank), ('One dot field', places_waffle), ('Equivalent line', places_eq)], 0,
  'Ranked rows on a shared baseline are the most accurate comparison (Cleveland & McGill 1984).', 'Rec #111'),
 ('tod', 'Time of day', 'When do I spend?', 'Insights', 'detail', 'library', False,
  [('24-slot glow strip', tod_strip), ('Four parts of day', tod_parts), ('24h glow ring', tod_ring)], 0,
  'Time is position, so glow is allowed (P2-Q3). A straight strip beats a ring for reading order (v6 radial clock was hard to read); the word "mostly late evenings" carries it.', 'Rec #109/115'),
 ('weekday', 'Weekday pattern', 'Which days are heavy?', 'Insights', 'detail', 'library', False,
  [('7 day lanes', wd_lanes), ('Weekday glow', wd_glow), ('Sentence', wd_word)], 0,
  'Day lanes are already the Spending view, so the usual week reuses them (one vocabulary, Neurath).', 'v3/v6 heatmap'),
 ('cal', 'Calendar', 'Which days were heavy?', 'Spending', 'explore', 'library', False,
  [('Glow calendar', cal_glow), ('₹100 dots per day', cal_dots), ('30 day lanes', cal_lanes)], 0,
  'Calendar is position data: glow per day, today ringed. Dots-per-day is countable but dense at phone size.', 'Rec #103'),
 ('range', 'Spend range', 'Steady or spiky?', 'Insights', 'detail', 'library', False,
  [('Usual-week dot range', range_band), ('Frequency: 3 of 10 days', range_freq), ('Glow strip', range_strip)], 0,
  'Kay et al. 2016: discrete outcome dots beat intervals for lay readers (M12); M11 frequency is the alt sentence.', 'Rec #106'),
 ('big', 'Big one-offs', 'What was the big one?', 'Insights', 'explore', 'library', False,
  [('Big vs usual ghost', big_ghost), ('Top 3 list', big_list), ('Frequency line', big_freq)], 0,
  'Perspective against the user\'s own usual buy (Barrio 2016; Riederer 2018).', 'Rec #113'),
 ('subs', 'Subscriptions held & next due', 'What leaves next?', 'Spending', 'glance', 'default', True,
  [('Held dots + due track', subs_held), ('Year at this rate', subs_year), ('Due calendar', subs_cal)], 0,
  'Held money as dashed dots inside the budget, next due as glow on the month track (time = glow). Home shows only the track.', 'Rec #79/80/84'),
 ('subyear', 'Subscription yearly cost', 'What does it cost a year?', 'Spending', 'detail', 'library', False,
  [('12× pills', subs_year), ('Due calendar', subs_cal)], 0,
  'Annualising is the eye-opener behind cancelling (rec #81); pills keep the ladder.', 'Rec #81'),
 ('sources', 'Income sources', 'Where does my money come from?', 'Income', 'explore', 'default', False,
  [('Merging Dots by source', inc_sources), ('Upright lanes', inc_lanes)], 0,
  'Part-to-whole pills (M7: Neurath; Park 2018). Income uses neutral ink shades, not green.', 'Rec #50'),
 ('next', 'Next money in', 'When does money come next?', 'Income', 'glance', 'default', True,
  [('Month track position', next_track), ('Countdown marks', next_count), ('Sentence', next_word)], 0,
  'Time = position + glow; no ₹, so Home-eligible (decided Q2).', 'Rec #52'),
 ('split', 'Income split', 'Where did new money go?', 'Income', 'glance', 'default', False,
  [('Part-to-whole pills', split_pills), ('Hourglass drop', split_hg)], 0,
  'M7 part-to-whole; the hourglass drop is the pay motion, not the static view.', 'Rec #49/56'),
 ('sankey', 'Money flow (Sankey)', 'Where did all money go?', 'Insights', 'detail', 'library', False,
  [('Dot-ribbon Sankey', sankey_rec), ('Two-column flow', lambda: sankey(True)), ('Three steps', sankey_steps)], 0,
  'v9\'s most-liked deep view; ribbon widths are on the same ₹ scale, nodes in category colour, spent ribbons outlined.', 'Rec #105'),
 ('rate', 'Savings rate', 'What share did I keep?', 'Savings', 'explore', 'library', False,
  [('Ten dots', rate_ten), ('100 dots', rate_hundred), ('Sentence', rate_word)], 0,
  'Ratio as "2 of 10" is a natural frequency (Gigerenzer & Hoffrage 1995); 10 dots read faster than 100.', 'Rec #70'),
 ('goal', 'Goal progress', 'How close is Goa?', 'Savings', 'glance', 'default', True,
  [('Saved green, to-go outline', goal_md), ('Bangles', goal_bangle), ('Hourglass', goal_hg)], 0,
  'M6 saved/to-go (Kivetz 2006 goal gradient). Bangles stay as the complete motion, not the static form.', 'Rec #63'),
 ('eta', 'Goal ETA', 'When will I get there?', 'Savings', 'explore', 'default', False,
  [('Glow path by month', eta_glow), ('Projected lanes', eta_dots), ('Sentence', eta_word)], 0,
  'Future-self path (M13: Hershfield 2011); time → glow allowed.', 'Rec #67'),
 ('growth', 'Savings growth', 'Am I saving more?', 'Savings', 'explore', 'default', False,
  [('Monthly green lanes', growth_lanes), ('Positions', growth_glow), ('Word', growth_word)], 0,
  'Peak-end: end on progress (rec #71). Lanes are counted dots, comparable on a baseline.', 'Rec #71'),
 ('roll', 'Leftover rolled to savings', 'Where did last month\'s leftover go?', 'Savings', 'explore', 'default', False,
  [('Jar dots → green', roll_move), ('Goal with rolled part', roll_ba)], 0,
  'Colour change from category to green is the whole story (green = savings only, P2e-Q2).', 'v11 default'),
 ('owed', 'Owed to you', 'Who owes me?', 'Spending', 'explore', 'default', False,
  [('Dashed per friend', owed_dash), ('Total only', owed_total)], 0,
  'Outside the budget, dashed (v7/v11 language).', 'Rec #88'),
 ('story', 'Month story', 'How did the month end?', 'Insights', 'explore', 'default', False,
  [('Story frames', story_cards), ('One row', story_row)], 0,
  'Peak-end + fresh start (Dai et al. via v11); frames end on what you kept.', 'Rec #146'),
 ('equiv', 'Equivalents', 'What does this mean in my terms?', 'Insights', 'explore', 'default', False,
  [('Your chais (wedges)', eq_icons), ('Dots', eq_dots), ('Sentence', eq_word)], 0,
  'Own frequent buys as the unit (M5: Barrio 2016; Riederer 2018; decided P2c-Q3). Used as the perspective line across cards.', 'M5'),
 ('mtime', 'Money as time (days of a jar)', 'How many days is this?', 'Insights', 'detail', 'library', False,
  [('Day lanes of Food', time_days), ('Runway', time_runway)], 0,
  'M10 days-of-jar avoids hours-of-work for non-earners (Whillans 2017). Still open (P2c-Q5): library only.', 'M10'),
 ('mom', 'Month by month', 'Long view?', 'Insights', 'detail', 'library', False,
  [('Six month lanes', mom_cols), ('Positions', mom_glow), ('Ghost', mom_ghost)], 0,
  'Counted lanes on one baseline; current month in colour, past as outline.', 'Rec #108'),
 ('bal', 'Where money sits', 'How much do I have, where?', 'Income', 'explore', 'default', False,
  [('One row by place', bal_row), ('One number', bal_glow)], 0,
  'Balance split (rec #59) in the shared vocabulary: jars, held, saved, owed.', 'Rec #58/59'),
]
assert len(I) >= 25

TABS = ['Home', 'Income', 'Spending', 'Savings', 'Insights']
def home_on(it): return it[6]
cards = []
for iid, name, q, tab, depth, place, home, alts, rec, why, src in I:
    al = ''
    for k, (an, fn) in enumerate(alts):
        al += (f'<figure class="alt{" rec" if k == rec else ""}"><figcaption>{"<b>Recommended</b> · " if k == rec else ""}{chr(65+k)}. {E(an)}</figcaption>'
               f'<div class="fig">{fn()}</div></figure>')
    tabs_ = tab + (' Home' if home and tab != 'Home' else '')
    cards.append(f'<article class="ic" data-tab="{tabs_}" id="i-{iid}"><header><h4>{E(name)}</h4><p class="qq">{E(q)}</p>'
                 f'<p class="tags"><span class="tg">{tab}</span><span class="tg">{depth}</span><span class="tg {"df" if place == "default" else ""}">{place}</span>{"<span class=tg>Home-eligible</span>" if home else ""}</p></header>'
                 f'<div class="alts">{al}</div><p class="why"><b>Why:</b> {E(why)}</p></article>')

DEF = {t: [it[1] for it in I if (it[3] == t and it[5] == 'default')] for t in TABS}
DEF['Home'] = [it[1] for it in I if it[6]]
defs = ''.join(f'<div class="dset"><h4>{t}</h4><p>{E(" · ".join(DEF[t]))}</p></div>' for t in TABS)
LIB = [it[1] for it in I if it[5] == 'library']

QS = [
 ('P3-Q1', 'Insights default board: these four cards (equivalents appear as a line inside cards)?', ['A: What changed · Category share · Small buys add up · Month story', 'B: swap Month story for Top places', 'C: let me pick in onboarding'], 'A', 'Covers change, where, habit and ending; everything else sits in the library one tap away.'),
 ('P3-Q2', 'Time and position views (time of day, calendar, ETA, next money in) use glow, not dots. Keep that split?', ['A: yes, glow only for time/position', 'B: dots everywhere, even calendars', 'C: glow on Insights only'], 'A', 'Matches P2-Q3; dots per day get dense at phone width (see Calendar B).'),
 ('P3-Q3', 'Sankey form', ['A: dot-ribbon Sankey with spent ribbons outlined', 'B: two-column flow (in → where)', 'C: three-step rows'], 'A', 'Keeps the v9 favourite but in the locked colours; B if A feels busy on a phone.'),
 ('P3-Q4', 'Money as time (P2c-Q5 still open): days of a jar in the library?', ['A: yes, library only', 'B: also as a line at pay', 'C: drop it'], 'A', 'Useful perspective without hours-of-work for students with no wage.'),
 ('P3-Q5', 'Income colour: sources drawn in neutral ink shades (not green, not a jar colour). OK?', ['A: neutral ink for income', 'B: one new hue for income', 'C: green for income too'], 'A', 'Green is reserved for savings; jar colours mean "left in a jar".'),
]
qh = ''.join(f'<div class="q"><b>{q}. {E(t)}</b><ul>{"".join(f"<li>{E(o)}</li>" for o in op)}</ul><p>Recommendation: <b>{r}</b> — {E(w)}</p></div>' for q, t, op, r, w in QS)

CSS = '''
.p3{--c-f:#b7791f;--c-t:#2f63c9;--c-u:#93306b;--c-sv:#1f9b84;--c-in1:#3d4658;--c-in2:#8a93a1;--gw:#2f63c9;--d-o:var(--ink3)}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .p3{--c-f:#ad7c26;--c-t:#5a8ae6;--c-u:#b9407f;--c-sv:#22a385;--c-in1:#c9cfd8;--c-in2:#7d8696;--gw:#7fa6ff}}
:root[data-theme="dark"] .p3{--c-f:#ad7c26;--c-t:#5a8ae6;--c-u:#b9407f;--c-sv:#22a385;--c-in1:#c9cfd8;--c-in2:#7d8696;--gw:#7fa6ff}
.p3 .ctl{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.p3 .btn{font:600 13px var(--f-disp);padding:7px 14px;border-radius:999px;border:1px solid var(--rule);background:var(--card);color:var(--ink);cursor:pointer}
.p3 .btn[aria-pressed="true"]{background:var(--ink);color:var(--card)}.p3 .btn:focus-visible{outline:2px solid var(--c-t);outline-offset:2px}
.p3 .grid{display:grid;gap:14px}
.p3 .ic{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:14px;display:grid;gap:10px;min-width:0}
.p3 .ic h4{margin:0;font:600 16px var(--f-disp)}.p3 .qq{margin:2px 0 0;color:var(--ink2);font-size:13px}
.p3 .tags{display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 0}.p3 .tg{font:500 11px var(--f-mono);border:1px solid var(--rule);border-radius:999px;padding:2px 8px;color:var(--ink2)}
.p3 .tg.df{background:var(--ink);color:var(--card);border-color:var(--ink)}
.p3 .alts{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}
.p3 .alt{margin:0;border:1px solid var(--rule);border-radius:8px;padding:10px;display:grid;grid-template-columns:minmax(0,1fr);gap:8px;align-content:start;min-width:0;overflow-x:auto}
.p3 .alt.rec{border:2px solid var(--ink);padding:9px}
.p3 .alt figcaption{font:500 12px var(--f-mono);color:var(--ink2)}.p3 .alt figcaption b{color:var(--ink)}
.p3 .fig{display:grid;gap:6px;min-width:0}.p3 .fig svg{max-width:100%;height:auto}.p3 .sn{margin:0;font:500 14px var(--f-disp)}.p3 .cap{margin:0;font-size:12px;color:var(--ink3)}
.p3 .why{margin:0;font-size:13px;color:var(--ink2);max-width:90ch}
.p3 .wl{margin:0;padding-left:16px;font-size:13px}.p3 .chips{display:flex;gap:6px;flex-wrap:wrap}.p3 .chips span{font-size:12px;border:1px solid var(--rule);border-radius:999px;padding:3px 9px}
.p3 .dsets{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}.p3 .dset{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:10px 12px}.p3 .dset h4{margin:0 0 4px;font:600 14px var(--f-disp)}.p3 .dset p{margin:0;font-size:13px;color:var(--ink2)}
.p3 .q{background:var(--card);border:1px solid var(--rule);border-radius:8px;padding:10px 14px;margin-bottom:8px}.p3 .q ul{margin:6px 0;padding-left:18px}.p3 .q p{margin:0;font-size:13px;color:var(--ink2)}
.p3 .keyl{font-size:13px;color:var(--ink2);max-width:90ch}
.p3 svg .cF{fill:var(--c-f)}.p3 svg .cT{fill:var(--c-t)}.p3 svg .cU{fill:var(--c-u)}.p3 svg .sv,.p3 svg .svd{fill:var(--c-sv)}.p3 svg .svn{fill:var(--c-sv);fill-opacity:.55}
.p3 svg .in1{fill:var(--c-in1)}.p3 svg .in2{fill:var(--c-in2)}
.p3 svg .o{fill:none;stroke:var(--d-o);stroke-width:.9}.p3 svg .cupo{fill:none;stroke:var(--d-o);stroke-width:.7}
.p3 svg .rs{fill:none;stroke:var(--ink2);stroke-width:1.1;stroke-dasharray:2 1.4}.p3 svg .ow{fill:none;stroke:var(--c-t);stroke-width:1.1;stroke-dasharray:2 1.4}
.p3 svg .gh{fill:none;stroke:var(--d-o);stroke-width:.8;stroke-dasharray:1.2 1.2}.p3 svg .hx{fill:url(#p3hatch);stroke:var(--ink2);stroke-width:.8}
.p3 svg .zero{fill:none;stroke:var(--rule)}
.p3 svg .gw{fill:var(--gw);filter:drop-shadow(0 0 2px var(--gw))}.p3 svg .gws{fill:var(--c-sv);filter:drop-shadow(0 0 3px var(--c-sv))}
.p3 svg .trk{fill:var(--rule)}.p3 svg .trk2{stroke:var(--rule);stroke-width:2}.p3 svg .trk2.dash{stroke-dasharray:3 3;stroke:var(--ink3);stroke-width:1}.p3 svg .trk2d{fill:none;stroke:var(--ink3)}
.p3 svg .pos{fill:var(--card);stroke:var(--ink);stroke-width:1.6}
.p3 svg .today{fill:none;stroke:var(--gw);stroke-width:1.2;filter:drop-shadow(0 0 3px var(--gw))}
.p3 svg .tal{stroke:var(--c-f);stroke-width:1.6;stroke-linecap:round}
.p3 svg .rib{fill-opacity:.28;stroke:none}.p3 svg .rib.o{fill:none;stroke:var(--d-o);stroke-width:.7;stroke-dasharray:2 1.5}
.p3 svg .glass{fill:none;stroke:var(--ink3);stroke-width:.9;opacity:.7}.p3 svg .thread{fill:none;stroke:var(--rule)}
.p3 svg .frm{fill:none;stroke:var(--rule)}.p3 svg .arr{stroke:var(--ink2);stroke-width:1.4;marker-end:url(#p3arr);fill:none}
.p3 svg .f{fill:var(--c-f)}
.p3 svg .lbl{font:500 7px var(--f-mono);fill:var(--ink2)}.p3 svg .lbl.mid{text-anchor:middle;font-size:6px}.p3 svg .lbl.b{font-weight:600;font-size:8px;fill:var(--ink)}
.p3.bw svg{filter:grayscale(1) contrast(1.15)}
.p3 .blk{}
'''
DEFS = ('<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'
        '<pattern id="p3hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" style="stroke:var(--ink2)" stroke-width="1.2"/></pattern>'
        '<marker id="p3arr" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L6 3L0 6Z" style="fill:var(--ink2)"/></marker></defs></svg>')
filt = ''.join(f'<button class="btn" type="button" data-f="{t}" aria-pressed="{"true" if t == "All" else "false"}">{t}</button>' for t in ['All'] + TABS)
SEC = f'''<section class="phase p3" id="p3" style="margin-top:48px">{DEFS}
  <h2><span>Phase 3</span> Insight library</h2>
  <p class="lede" style="margin:0">{len(I)} insights, each drawn 2–3 ways in the locked dot system with the same seed month (₹9,000 in, day 18 of 30; Food ₹2,500 · Travel ₹1,500 · Fun ₹2,000; Goa ₹4,160 of ₹8,000). The recommended form has the dark border.</p>
  <p class="keyl"><b>Key (once):</b> ● = ₹100, pill = ₹1,000, block = ₹10,000, wedge = under ₹100 · solid jar colour = left (Food amber, Travel blue, Fun plum) · outline = spent · green = savings only · dashed grey = held for subscriptions · dashed blue = owed to you · dotted = last period · hatched = extra beyond last period · glow = time or position only (no ₹).</p>
  <div class="ctl" role="group" aria-label="Filter by tab">{filt}</div>
  <div class="ctl" role="group" aria-label="Colour mode"><button class="btn" type="button" data-bw3="c" aria-pressed="true">Colour</button><button class="btn" type="button" data-bw3="bw" aria-pressed="false">B&amp;W</button></div>
  <div class="block"><h3>Default set per tab</h3><div class="dsets">{defs}</div><p class="note">Insights library ({len(LIB)}): {E(" · ".join(LIB))}.</p></div>
  <div class="block"><h3>Insights × alternatives</h3><div class="grid" id="p3grid">{"".join(cards)}</div></div>
  <div class="block"><h3>Questions for Tarun</h3><div class="qs">{qh}</div></div>
  <p class="note" style="color:var(--ink3);font-size:12px">Notes: claude/v12_phase3_insights.md</p>
</section>'''
JS = r'''<script>(function(){var S=document.getElementById('p3');if(!S)return;
S.querySelectorAll('[data-bw3]').forEach(function(b,i,a){b.addEventListener('click',function(){a.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});S.classList.toggle('bw',b.dataset.bw3==='bw')})});
var fb=S.querySelectorAll('[data-f]');fb.forEach(function(b){b.addEventListener('click',function(){fb.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});var f=b.dataset.f;
S.querySelectorAll('.ic').forEach(function(c){c.hidden=!(f==='All'||c.dataset.tab.split(' ').indexOf(f)>=0)})})});})();</script>'''

src = open('/home/claude/v12/board.html').read()
src = re.sub(r'<style id="p3css">.*?</style>', '', src, flags=re.S)
src = re.sub(r'<section class="phase p3" id="p3".*?</section><script>\(function\(\)\{var S=document.getElementById\(\'p3\'\).*?</script>', '', src, flags=re.S)
src = re.sub(r'<section class="later" id="p3">.*?</section>', '', src, flags=re.S)
src = src.replace('<section class="later" id="p4">', '<style id="p3css">' + CSS + '</style>' + SEC + JS + '<section class="later" id="p4">', 1)
src = src.replace('href="#p2e" class="now"', 'href="#p2e" class=""').replace('<a href="#p3" class="">', '<a href="#p3" class="now">')
open('/home/claude/v12/board.html', 'w').write(src)

# ---------------- notes doc ----------------
md_ = ['# Trickle v12 — Phase 3: Insight & visualization library\n',
 f'Board: Phase 3 section (filter by tab, colour/B&W). Seed: ₹9,000 in (allowance 7,000 + café 2,000), day 18 of 30; jars Food 2,500 / Travel 1,500 / Fun 2,000; subs ₹499 held; Goa ₹4,160 of ₹8,000. Locked system per claude/v12_decisions.md (Merging Dots base, Day lanes in Spending, left = category colour, green = savings only, no red).\n',
 '## Palette (validated, dataviz validator, all pairs)\n- Light: Food #b7791f · Travel #2f63c9 · Fun #93306b · Savings #1f9b84 — all checks pass.\n- Dark: Food #ad7c26 · Travel #5a8ae6 · Fun #b9407f · Savings #22a385 — pass; Fun↔Savings deutan ΔE 7.6 (floor band) so labels/position always accompany.\n- Violet was rejected (protan ΔE 0.1 vs blue). Max 3 jar colours + green before a fourth hue fails; further jars need texture or labels. Income = neutral ink shades.\n',
 f'## Converge: {len(I)} insights\n| # | Insight | Question | Alternatives (A rec) | Tab | Depth | Default/Library | Home | Why |\n|---|---|---|---|---|---|---|---|---|']
for n, it in enumerate(I, 1):
    md_.append(f'| {n} | {it[1]} | {it[2]} | {" / ".join(f"{chr(65+k)}: {a[0]}" for k, a in enumerate(it[7]))} | {it[3]} | {it[4]} | {it[5]} | {"yes (no ₹)" if it[6] else "—"} | {it[9]} |')
md_ += ['\n## Default set per tab'] + [f'- **{t}**: {", ".join(DEF[t])}' for t in TABS] + [f'- **Insights library**: {", ".join(LIB)}\n',
 '## Notable alternatives\n- Calendar B (₹100 dots per day) is countable but too dense on a phone; glow calendar wins (time = position).\n- Goal B (bangles) and Income split B (hourglass) are kept as motions (goal-complete, pay), not static forms.\n- Sankey A draws ribbons on the true ₹ scale with spent ribbons outlined; B (two columns) is the fallback if A is busy.\n- Category share: 100-dot waffle ("46 of every 100") beat the split pill, which loses countability.\n',
 '## Questions for Tarun\n| # | Question | Options | Recommended | Why |\n|---|---|---|---|---|'] + [f'| {q} | {t} | {" / ".join(op)} | {r} | {w} |' for q, t, op, r, w in QS]
open('/home/claude/v12/v12_phase3_insights.md', 'w').write('\n'.join(md_) + '\n')
json.dump({'n': len(I), 'DEF': DEF, 'LIB': LIB, 'QS': [(q, t, op, r) for q, t, op, r, w in QS]}, open('/home/claude/v12/p3_meta.json', 'w'), ensure_ascii=False)
print(len(I), DEF, LIB)
