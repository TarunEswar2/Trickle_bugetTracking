# Phase 4 — Information architecture & disclosure layers. Reuses dot system (phase3.py -> phase2e.py).
import re
_src3 = open('/home/claude/v12/phase3.py').read()
exec(_src3.split("\nsrc = open('/home/claude/v12/board.html').read()")[0])

def sv(h, sc=None):
    m = re.search(r'<svg.*?</svg>', h, re.S); return m.group(0) if m else ''
def P(s): return E(s)

# ---------------- icons (stroke glyphs, 24 grid) ----------------
IC = {
 'home': '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
 'inc': '<path d="M12 4v10M8 10l4 4 4-4"/><path d="M4 16v3h16v-3"/>',
 'spd': '<path d="M12 15V5M8 9l4-4 4 4"/><path d="M4 16v3h16v-3"/>',
 'sav': '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',
 'ins': '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 15l3-3 2 2 3-4"/>',
 'scan': '<path d="M4 9V5h4M16 5h4v4M20 15v4h-4M8 19H4v-4"/><path d="M8 12h8"/>',
 'bell': '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20h4"/>',
 'gear': '<path d="M5 7h14M5 17h14"/><circle cx="9" cy="7" r="2.2"/><circle cx="15" cy="17" r="2.2"/>',
 'q': '<circle cx="12" cy="12" r="8"/><path d="M10 10a2 2 0 1 1 3 1.7c-.7.4-1 .8-1 1.6"/><circle cx="12" cy="16.5" r=".6"/>',
 'av': '<circle cx="12" cy="9" r="3.5"/><path d="M5.5 19a6.5 6.5 0 0 1 13 0"/>',
 'add': '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/><path d="M16.5 4v7M13 7.5h7"/>',
 'cash': '<rect x="3" y="7" width="18" height="10" rx="3"/><circle cx="12" cy="12" r="2.2"/>',
 'upi': '<path d="M5 12h12M13 8l4 4-4 4"/>',
}
def ic(k, cls=''): return f'<svg class="i {cls}" viewBox="0 0 24 24" aria-hidden="true">{IC[k]}</svg>'
TABS5 = [('home', 'Home'), ('inc', 'Income'), ('spd', 'Spending'), ('sav', 'Savings'), ('ins', 'Insights')]

def tabbar(active='Home', pay='detached'):
    items = ''.join(f'<span class="ti{" on" if n == active else ""}" title="{n}">{ic(k)}</span>' for k, n in TABS5)
    if pay == 'centre':
        L5 = [f'<span class="ti{" on" if n == active else ""}">{ic(k)}</span>' for k, n in TABS5]
        items = ''.join(L5[:2]) + f'<span class="fab in">{ic("scan")}</span>' + ''.join(L5[2:])
        return f'<div class="tb full">{items}</div>'
    if pay == 'pill':
        return (f'<div class="paypill"><span>{ic("scan")}Scan</span><span>{ic("upi")}UPI ID</span><span>{ic("cash")}Cash</span></div>'
                f'<div class="tb full">{items}</div>')
    if pay == 'none':
        return f'<div class="tb full">{items}</div>'
    return f'<div class="tb"><div class="tbp">{items}</div><span class="fab" title="Pay">{ic("scan")}</span></div>'

def phone(body, title='', head='', bar='', cls=''):
    h = f'<div class="hd"><b>{P(title)}</b><span class="hb">{head}</span></div>' if title else ''
    return f'<div class="ph {cls}"><div class="scr">{h}{body}{bar}</div></div>'
def card(inner, t, s='', size='w', glow=False, extra=''):
    return f'<div class="wc {size}{" gl" if glow else ""}">{extra}<div class="wv">{inner}</div><div class="wt"><b>{P(t)}</b>{f"<small>{P(s)}</small>" if s else ""}</div></div>'
def bellbtn(dot=True): return f'<span class="cb">{ic("bell")}{"<i class=sd></i>" if dot else ""}</span>'
def hb(*ks): return ''.join(f'<span class="cb">{ic(k)}</span>' if k != 'bell' else bellbtn() for k in ks)

# ---------------- Home widgets (no ₹, no numbers) ----------------
def track(due=(4, 22, 26, 28), today=17, w=150, nxt=None):
    o = ''.join(f'<circle class="trk" cx="{d*5+3}" cy="6" r="1.5"/>' for d in range(30))
    for d in due: o += f'<circle class="gw" cx="{(d-1)*5+3}" cy="6" r="2.6"/>'
    o += f'<circle class="pos" cx="{today*5+3}" cy="6" r="3.6"/>'
    if nxt: o += f'<circle class="in1" cx="{nxt*5+3}" cy="6" r="4"/>'
    return V(o, 30*5+3, 12, 'Month track', sc=1.2)
def wedges(n=22, per=11, sc=1.1):
    o = ''.join(cup_wedge((k % per)*(D+G)+R, (k//per)*(D+G)+R, R, .25, 'cF') for k in range(n))
    return V(o, per*(D+G), ((n-1)//per+1)*(D+G), 'Little things', sc=sc)
def jars_nolabel(sc=1.0):
    o = []; y = 0; W = 0
    for n, c, b, s, _ in JARS:
        i, w, h = md([(b - s, c), (s, 'o')], 0, y); o.append(i); y += h + 6; W = max(W, w)
    return V(''.join(o), W, y - 6, 'Jars left (solid) and spent (outline)', sc=sc)
def goal_small(sc=1.0):
    i, w, h = md([(GOAL[2], 'sv'), (GOAL[1] - GOAL[2], 'o')], 0, 0, bc=1); return V(i, w, h, 'Goa: saved solid, to go outline', sc=sc)
GLOW = '<div class="glow"></div>'

W_PACE = card(GLOW + '<div class="word">Steady</div>', 'Pace', 'this week', 'w hero', True)
W_JARS = card(jars_nolabel(.78), 'Jars', 'Food · Travel · Fun', 'w')
W_GOAL = card(goal_small(.5), 'Goa trip', 'more than halfway', 's')
W_NEXT = card(track(due=(), nxt=29), 'Next money in', 'allowance, end of month', 's')
W_LITTLE = card(wedges(22, 11, .95), 'Little things', 'chai adds up', 'w')
W_SUBS = card(track(), 'Subscriptions', 'Netflix next', 's')
W_ADD = f'<div class="wc s add">{ic("add")}</div>'

def home_grid():
    body = f'<div class="grid2">{W_PACE}{W_GOAL}{W_NEXT}{W_JARS}{W_SUBS}{W_ADD}</div>'
    return phone(body, 'Hi Tarun', hb('bell', 'av'), tabbar())
def home_hero():
    body = (f'<div class="bigglow"><div class="glow big"></div><div class="word lg">Steady</div><small>On pace this week</small></div>'
            f'<div class="stack">{card(jars_nolabel(1.15), "Jars", "", "w")}{card(goal_small(.62), "Goa trip", "more than halfway", "w")}{card(track(due=(), nxt=29), "Next money in", "allowance, end of month", "w")}</div>')
    return phone(body, 'Trickle', hb('bell', 'av'), tabbar())
def home_story():
    body = ('<div class="story">'
            f'<p class="sl">This week is <b>steady</b>.</p>{GLOW.replace("glow", "glow line")}'
            f'<p class="sl">Food has the most left.</p>{jars_nolabel(1.15)}'
            f'<p class="sl">Goa is more than halfway.</p>{goal_small(.62)}'
            f'<p class="sl">Allowance lands at the end of the month.</p>{track(due=(), nxt=29)}</div>')
    return phone(body, 'Today', hb('bell', 'av'), tabbar())

# ---------------- Pay placements ----------------
def pay_home_only():
    body = (f'<div class="bigglow sm"><div class="glow"></div><div class="word">Steady</div></div>'
            f'<div class="paybig">{ic("scan")}<b>Pay</b><small>Scan · UPI ID · Cash</small></div>'
            f'<div class="grid2">{W_GOAL}{W_NEXT}</div>')
    return phone(body, 'Hi Tarun', hb('bell', 'av'), tabbar(pay='none'))
def pay_sheet():
    body = ('<div class="cam"><div class="vf"></div><small>Point at a UPI QR</small></div>'
            f'<div class="chips"><span>{ic("upi")}Pay UPI ID</span><span>{ic("cash")}Log cash</span></div>'
            '<p class="cap2">Tap Pay → camera is already open. The two other ways sit under the viewfinder.</p>')
    return phone(body, 'Pay', '<span class="x">Close</span>', '', 'dimbar')

# ---------------- Tab intros ----------------
INTROS = [
 ('Home', 'Your month at a glance', GLOW + '<div class="word">Steady</div>', ['The glow is your pace: bright when calm.', 'Each card is a tab, shown small. Tap one to go there.', 'The bell keeps everything that happened, and what needs you.']),
 ('Income', 'Where money comes from', sv(split_pills()), ['Money in is grey until it is split.', 'Each split puts savings first, then jars.', 'Tap a source to see its paydays.']),
 ('Spending', 'One dot is ₹100', jars_nolabel(1.15), ['Solid dots are left, outlined dots are spent.', 'Each day gets its own lane; today is ringed.', 'Every spend is in the list below the jars.']),
 ('Savings', 'Green is only for savings', goal_small(.8), ['Solid green is saved; outline is still to go.', 'Leftover at month end can roll in here.', 'Add a little any time from a goal.']),
 ('Insights', 'Four cards, more on tap', sv(share_waffle()), ['Each card answers one question.', 'Open the library for deeper views.', 'Pin the ones you like to this page.']),
]
def intro(t, h, vis, lines):
    li = ''.join(f'<li>{P(x)}</li>' for x in lines)
    body = f'<div class="intro"><small class="eb">{P(t)}</small><h5>{P(h)}</h5><div class="iv">{vis}</div><ol>{li}</ol><span class="btnp">Got it</span><small class="re">Reopen with {ic("q")} in the {P(t)} header</small></div>'
    return phone(body, '', '', '', 'introph')

# ---------------- Bell ----------------
def bell_screen():
    body = ('<div class="bl"><small class="eb">Needs you · 2</small>'
            '<div class="act"><b>Sort a payment</b><small>PAYTM*QR7731 · Food? Fun? Travel?</small><span class="go">Sort</span></div>'
            '<div class="act"><b>Netflix renews Friday</b><small>Keep it or cancel before then</small><span class="go">Decide</span></div>'
            '<small class="eb">Activity</small>'
            '<ul class="log"><li><i class="d sv"></i>Allowance split · 2 pills to Goa<small>Mon</small></li>'
            '<li><i class="d cF"></i>Chai stall · Food<small>Today</small></li>'
            '<li><i class="d cT"></i>Moved 2 dots Fun → Travel<small>Yesterday</small></li>'
            '<li><i class="d rs"></i>Spotify paid from held<small>4 Oct</small></li>'
            '<li><i class="d ow"></i>Arjun paid you back<small>3 Oct</small></li></ul></div>')
    return phone(body, 'Activity', '<span class="x">Close</span>', '')

# ---------------- Per-tab screen maps ----------------
MAPS = [
 ('Home', ['H-01 Home board (widgets, bell, avatar)'],
          ['H-02 Bell: needs-you + activity log', 'H-03 Edit board (pin · hide · reorder)'],
          ['Tap a widget → that tab, card opened'],
          ['H-00 Intro']),
 ('Income', ['I-01 Income: next money in · split · sources · where money sits'],
            ['Expand: this split (pills)', 'Expand: sources', 'Expand: where money sits'],
            ['I-02 Source detail (paydays)', 'I-03 Payday detail (where it went, undo)', 'I-04 New money sheet (split, one tap)'],
            ['I-S1 Sources', 'I-S2 Savings share', 'I-S3 Split order', 'I-S4 Period (week / month / payday)', 'I-00 Intro']),
 ('Spending', ['S-01 Spending: day lanes · jars · held · owed · repeat buys'],
              ['Expand: a jar (this week)', 'Expand: subscriptions', 'Expand: owed', 'S-02 All spends list (filters)'],
              ['S-03 Jar detail (history)', 'S-04 Spend detail (jar, split, source)', 'S-05 Subscription detail (year cost, keep / cancel)', 'S-06 Friend detail (remind)', 'S-07 Sort unknown payment'],
              ['S-S1 Jars (add · rename · remove)', 'S-S2 Jar amount', 'S-S3 Move dots', 'S-S4 Copy last month', 'S-S5 Subscriptions', 'S-S6 Remember payee', 'S-00 Intro']),
 ('Savings', ['V-01 Savings: goal · ETA · growth · leftover rolled'],
             ['Expand: goal (quick add ₹100 / ₹500)', 'Expand: growth by month', 'V-02 All goals'],
             ['V-03 Goal detail (contributions)', 'V-04 Goal complete (bangle close)'],
             ['V-S1 New goal (one step per screen)', 'V-S2 Goal order', 'V-S3 Leftover rule', 'V-00 Intro']),
 ('Insights', ['N-01 Board: What changed · Category share · Small buys · Month story'],
              ['Expand: any card (one more layer)', 'N-02 Library (12 views)'],
              ['N-03 Library view (Sankey, calendar, time of day …)', 'N-04 Month story (swipe frames)', 'N-05 Weekly check-in'],
              ['N-S1 Pin / hide cards', 'N-S2 Check-in day', 'N-00 Intro']),
 ('Global (avatar)', [], [], [], ['G-S1 Look (colour / B&W, dark / light)', 'G-S2 Linked UPI IDs', 'G-S3 Notifications (caps, quiet hours)', 'G-S4 Sounds & motion', 'G-S5 App lock', 'G-S6 Data & export']),
 ('Pay (from any tab)', ['P-01 Scan (camera open)'], ['P-02 Pay UPI ID', 'P-03 Log cash'], ['P-04 Pick jar (suggested)', 'P-05 Hourglass drop + done', 'P-06 Empty jar: take from another', 'P-07 Split at pay'], []),
]
def screens_count(m): return sum(len([x for x in col if not x.startswith(('Expand', 'Tap'))]) for col in m[1:4])
def mapcol(name, items, cls):
    li = ''.join(f'<li class="{"ex" if x.startswith(("Expand", "Tap")) else ""}">{P(x)}</li>' for x in items) or '<li class="na">—</li>'
    return f'<div class="lv {cls}"><small>{name}</small><ul>{li}</ul></div>'
maps_html = ''.join(
    f'<div class="tm"><h4>{P(t)} <span class="cnt">{screens_count((t, g, e, d, s))} screens · {len([x for x in s if "Intro" not in x])} settings</span></h4>'
    f'<div class="lvs">{mapcol("Glance", g, "g")}{mapcol("Explore", e, "e")}{mapcol("Detail", d, "d")}{mapcol("Settings & intro", s, "s")}</div></div>'
    for t, g, e, d, s in MAPS)

# ---------------- Diagrams ----------------
def tabmap():
    W, H = 960, 330
    o = [f'<rect class="dn" x="20" y="20" width="920" height="44" rx="22"/>']
    xs = [190, 335, 480, 625, 770]
    for (k, n), x in zip(TABS5, xs):
        o.append(f'<rect class="dt" x="{x-55}" y="28" width="110" height="28" rx="14"/><text class="dl" x="{x}" y="47" text-anchor="middle">{n}</text>')
    o.append('<circle class="dp" cx="905" cy="42" r="17"/><text class="dl inv" x="905" y="46" text-anchor="middle">Pay</text>')
    o.append('<text class="ds" x="905" y="82" text-anchor="middle">1 tap from</text><text class="ds" x="905" y="94" text-anchor="middle">every tab</text>')
    rows = [('Glance', 112, 'the tab page'), ('Explore', 172, 'card opens in place'), ('Detail', 232, 'pushed screen'), ('Settings', 292, 'gear → one decision per screen')]
    for name, y, d in rows:
        o.append(f'<text class="dh" x="20" y="{y-10}">{name}</text><text class="ds" x="20" y="{y+4}">{d}</text>')
        for x in xs:
            o.append(f'<rect class="db{" st" if name == "Settings" else ""}" x="{x-45}" y="{y-24}" width="90" height="34" rx="8"/>')
    for x in xs:
        o.append(f'<path class="da" d="M{x} 64 V{88}"/><path class="da" d="M{x} 122 V{148}"/><path class="da" d="M{x} 182 V{208}"/><path class="da dash" d="M{x} 242 V{268}"/>')
    lab = {0: ['Home board', 'Bell · Edit', 'goes to tab', 'Board · Avatar'], 1: ['Income', 'Split · sources', 'Source · payday', 'Sources · share'],
           2: ['Spending', 'Jar · all spends', 'Spend · sub', 'Jars · amounts'], 3: ['Savings', 'Goal · growth', 'Goal detail', 'New goal · rule'],
           4: ['Insights', 'Card · library', 'Library view', 'Pin · check-in']}
    for i, x in enumerate(xs):
        for j, (_, y, _) in enumerate(rows):
            o.append(f'<text class="dc" x="{x}" y="{y-3}" text-anchor="middle">{lab[i][j]}</text>')
    o.append('<text class="ds" x="20" y="322">Every tab header: ? reopens the one-page intro · gear opens that tab\'s settings · Home header also has the bell and the avatar (global settings).</text>')
    return f'<svg class="dg" viewBox="0 0 {W} {H}" role="img" aria-label="Tab map: five tabs, Pay button, and four depth layers"><title>Tab map</title>{"".join(o)}</svg>'

def depth(kind):
    W, H = 300, 210; o = []
    def ph(x, y, lab, sub='', hl=False):
        return f'<rect class="db{" hl" if hl else ""}" x="{x}" y="{y}" width="70" height="120" rx="12"/><text class="dc" x="{x+35}" y="{y+140}" text-anchor="middle">{lab}</text>' + (f'<text class="ds" x="{x+35}" y="{y+153}" text-anchor="middle">{sub}</text>' if sub else '')
    def c(x, y, w=54, h=14, cls='dt'): return f'<rect class="{cls}" x="{x}" y="{y}" width="{w}" height="{h}" rx="4"/>'
    if kind == 'push':
        o += [ph(10, 20, 'Glance'), ph(115, 20, 'Explore', 'new screen'), ph(220, 20, 'Detail', 'new screen')]
        o += [c(18, 34), c(18, 52), c(18, 70), c(123, 34, 54, 50), c(228, 34, 54, 80)]
        o += ['<path class="da" d="M82 80 H112"/><path class="da" d="M187 80 H217"/>']
    elif kind == 'expand':
        o += [ph(10, 20, 'Glance'), ph(115, 20, 'Explore', 'same screen'), ph(220, 20, 'Detail', 'same screen')]
        o += [c(18, 34), c(18, 52), c(18, 70), c(123, 34), c(123, 52, 54, 40, 'dt hl2'), c(123, 96), c(228, 34, 54, 76, 'dt hl2'), c(228, 114, 54, 8)]
        o += ['<path class="da" d="M82 80 H112"/><path class="da" d="M187 80 H217"/>']
    else:
        o += [ph(10, 20, 'Glance'), ph(115, 20, 'Explore', 'opens in place'), ph(220, 20, 'Detail', 'pushed', True)]
        o += [c(18, 34), c(18, 52), c(18, 70), c(123, 34), c(123, 52, 54, 40, 'dt hl2'), c(123, 96), c(228, 34, 54, 80)]
        o += ['<path class="da" d="M82 80 H112"/><path class="da" d="M187 80 H217"/>']
    return f'<svg class="dg sm" viewBox="0 0 {W} {H}" role="img" aria-label="Depth model {kind}"><title>Depth model</title>{"".join(o)}</svg>'

# ---------------- Questions ----------------
QS4 = [
 ('P4-Q1', 'Home layout', ['A: Widget grid like the reference: wide Pace glow on top, then half and wide cards, add-widget tile', 'B: Big glow hero + three stacked cards', 'C: Single-column story (sentence + small visual)'], 'A',
  'Grid is the most scannable and the user owns the order. Every card is a doorway to a tab, so Home stays at about 6 marks per card and no numbers (Kay 2016: few countable marks; Weiser & Brown: calm periphery). C reads well once but gets long and is harder to customise.'),
 ('P4-Q2', 'Where Pay lives', ['A: Round Pay button beside the floating tab pill. Tap = camera open (Scan); "Pay UPI ID" and "Log cash" sit under the viewfinder', 'B: Centre button inside the tab bar (6 slots)', 'C: Persistent three-part pill above the tab bar', 'D: Big Pay button on Home only'], 'A',
  'A keeps Scan at 1 tap from every tab and the other two at 2 taps on one screen. B makes an odd 2 | Pay | 3 bar. C costs a row of screen on every tab. D is 2 taps from any other tab.'),
 ('P4-Q3', 'How deeper layers open', ['A: Hybrid — a card opens in place to explore (one open at a time), detail and settings push a new screen', 'B: Every layer is a new screen', 'C: Everything expands in place'], 'A',
  'Opening in place keeps the context (Sweller 1988: less to hold in mind); pushing for detail and settings keeps "one decision per screen" and a clear back path. C gets long and loses the back button.'),
 ('P4-Q4', 'Where settings live', ['A: Gear in each tab header for that tab, avatar on Home for app-wide settings', 'B: One avatar drawer for everything', 'C: Drawer, with a shortcut from each tab'], 'A',
  'Matches the locked rule that editing lives in each tab. App-wide items (look, UPI IDs, notifications, lock) have no tab, so they go behind the avatar.'),
 ('P4-Q5', 'Customising widgets', ['A: Home: pin, hide, reorder (max 6). Insights: pin from the library. Other tabs: fixed order, can hide', 'B: Fixed everywhere', 'C: Every tab fully customisable'], 'A',
  'Home and Insights are where taste differs. Fixed order in Income, Spending and Savings keeps the money story in one order (in → spend → keep) and makes the intros stay true.'),
]
def _li(o, r): return '<li class="' + ('pick' if o.startswith(r + ':') else '') + '">' + P(o) + '</li>'
qh4 = ''.join('<div class="q"><span class="qid">' + q + '</span><h3>' + P(t) + '</h3><ul>' + ''.join(_li(o, r) for o in ops) + '</ul><p class="qr"><b>Recommend ' + r + '.</b> ' + P(w) + '</p></div>' for q, t, ops, r, w in QS4)

def opt(title, ph_html, rec, notes, tag=''):
    return f'<figure class="po{" rk" if rec else ""}"><div class="pv">{ph_html}</div><figcaption><b>{P(title)}{" · recommended" if rec else ""}</b><span>{notes}</span></figcaption></figure>'

homes = (opt('H1 Widget grid (ref)', home_grid(), True, 'Wide Pace glow + word, then Goa, Next money in, Jars, Subscriptions, add tile. 0 numbers, ≤25 marks per card. Pin / hide / reorder.')
       + opt('H2 Hero glow + stacked cards', home_hero(), False, 'Strongest "am I OK" signal, but the hero eats half the screen and only three cards fit.')
       + opt('H3 Single-column story', home_story(), False, 'Each line is one sentence + one small visual. Calm and readable, but long and hard to customise.'))
SPB = card(sv(pace_lanes()), 'This week', 'today ringed', 'w') + W_JARS
pays = (opt('A Round Pay beside tab pill', phone(f'<div class="grid2">{SPB}</div>', 'Spending', hb('q', 'gear'), tabbar('Spending')), True, 'Same place on every tab. Scan 1 tap; UPI ID / Cash 2 taps.')
      + opt('A · after tap', pay_sheet(), True, 'Camera opens at once; the two other ways are chips under the viewfinder.')
      + opt('B Centre button in tab bar', phone(f'<div class="grid2">{SPB}</div>', 'Spending', hb('q', 'gear'), tabbar('Spending', 'centre')), False, '1 tap, but 6 slots and an uneven 2 | Pay | 3 split; tab targets shrink.')
      + opt('C Persistent pill above tabs', phone(f'<div class="grid2">{SPB}</div>', 'Spending', hb('q', 'gear'), tabbar('Spending', 'pill')), False, 'All three ways at 1 tap, but a whole row of every screen.')
      + opt('D Home hero button only', pay_home_only(), False, 'Big and clear on Home; 2 taps from any other tab.'))
intros = ''.join(opt(f'{t} intro', intro(t, h, v, l), False, 'First visit only; "?" brings it back.') for t, h, v, l in INTROS)

CSS4 = r'''
.p4,.p4>.block{min-width:0}.p4{grid-template-columns:minmax(0,1fr)}
.p4 .row{max-width:100%;display:flex;gap:16px;overflow-x:auto;padding:4px 2px 12px;scroll-snap-type:x proximity}
.p4 figcaption,.p4 figcaption *,.p4 h4,.p4 .tm *{white-space:normal}
.p4 .po{flex:0 0 auto;width:262px;scroll-snap-align:start;background:var(--card)}
.p4 .po.rk{border:2px solid var(--tile)}
.p4 .pv{padding:12px;display:flex;justify-content:center;background:var(--mute)}
.p4 .ph{--c-f:#ad7c26;--c-t:#5a8ae6;--c-u:#b9407f;--c-sv:#22a385;--c-in1:#d8dbd8;--c-in2:#8f948f;--d-o:#5d635f;--gw:#f2f3f1;--ink:#f2f3f1;--ink2:#a2a7a3;--ink3:#6c716d;--rule:#2c2f2d;--card:#1b1d1c;
  width:236px;border-radius:34px;background:#000;padding:7px;color:#f2f3f1;font-family:var(--f-body);box-shadow:0 1px 0 #333 inset}
.p4 .scr{border-radius:28px;background:#0c0d0c;height:500px;padding:16px 12px 70px;position:relative;overflow:hidden;display:flex;flex-direction:column;gap:10px}
.p4 .scr>*{flex-shrink:0}
.p4 .hd{display:flex;align-items:center;justify-content:space-between;padding:6px 2px 2px}
.p4 .hd b{font:600 22px var(--f-disp);letter-spacing:-.01em}
.p4 .hb{display:flex;gap:6px}
.p4 .cb{width:30px;height:30px;border-radius:50%;background:#1f2120;display:grid;place-items:center;position:relative}
.p4 .cb .sd{position:absolute;top:6px;right:7px;width:5px;height:5px;border-radius:50%;background:#f2f3f1;box-shadow:0 0 5px #f2f3f1}
.p4 .x{font:500 12px var(--f-body);color:#a2a7a3}
.p4 svg.i{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.p4 .grid2{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.p4 .wc{background:#1b1d1c;border:1px solid #2a2d2b;border-radius:18px;padding:9px 10px;display:flex;flex-direction:column;justify-content:space-between;gap:6px;min-height:84px;position:relative;overflow:hidden}
.p4 .wc.w{grid-column:span 2}
.p4 .wc .wv svg{max-width:100%;height:auto;display:block}
.p4 .wt b{display:block;font:500 11.5px var(--f-body)}.p4 .wt small{display:block;font-size:9.5px;color:#9a9f9b}
.p4 .wc.add{display:grid;place-items:center;color:#9a9f9b;min-height:62px}.p4 .wc.add svg.i{width:22px;height:22px}
.p4 .glow{position:absolute;inset:-30% -10% auto auto;width:70%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#e8f0ea 0,rgba(232,240,234,.35) 30%,rgba(232,240,234,0) 68%);pointer-events:none}
.p4 .glow.big{inset:-10% 0 auto 0;width:100%;margin:auto}
.p4 .glow.line{position:static;height:18px;width:100%;aspect-ratio:auto;border-radius:9px;background:radial-gradient(ellipse at 40% 50%,#e8f0ea 0,rgba(232,240,234,.25) 35%,rgba(232,240,234,0) 70%)}
.p4 .word{font:600 20px var(--f-disp);position:relative}.p4 .word.lg{font-size:30px}
.p4 .wc.hero{min-height:96px}
.p4 .bigglow{position:relative;height:170px;border-radius:22px;background:#141615;display:flex;flex-direction:column;justify-content:flex-end;padding:14px;overflow:hidden}
.p4 .bigglow.sm{height:80px}.p4 .bigglow small{color:#9a9f9b;font-size:11px;position:relative}
.p4 .stack{display:grid;gap:7px}
.p4 .story{display:grid;gap:6px}.p4 .story svg{max-width:100%;height:auto}
.p4 .sl{margin:6px 0 0;font:500 13px/1.35 var(--f-body)}.p4 .sl b{font-weight:600}
.p4 .tb{position:absolute;left:10px;right:10px;bottom:12px;display:flex;gap:7px;align-items:center}
.p4 .tbp,.p4 .tb.full{flex:1;display:flex;justify-content:space-around;align-items:center;background:#1b1d1c;border:1px solid #2a2d2b;border-radius:999px;height:44px;padding:0 6px}
.p4 .ti{color:#6c716d;display:grid;place-items:center;width:26px;height:26px}.p4 .ti.on{color:#f2f3f1}
.p4 .fab{width:44px;height:44px;border-radius:50%;background:#f2f3f1;color:#0c0d0c;display:grid;place-items:center;flex:0 0 auto}
.p4 .fab svg.i{width:20px;height:20px}.p4 .fab.in{width:38px;height:38px;margin-top:-14px;box-shadow:0 0 0 5px #0c0d0c}
.p4 .paypill{position:absolute;left:10px;right:10px;bottom:62px;display:flex;background:#f2f3f1;color:#0c0d0c;border-radius:999px;height:36px}
.p4 .paypill span{flex:1;display:flex;align-items:center;justify-content:center;gap:4px;font:600 11px var(--f-body);border-right:1px solid #c9ccc9}.p4 .paypill span:last-child{border:0}
.p4 .paybig{background:#f2f3f1;color:#0c0d0c;border-radius:22px;padding:14px;display:grid;grid-template-columns:auto 1fr;column-gap:10px;align-items:center}
.p4 .paybig svg.i{width:26px;height:26px;grid-row:span 2}.p4 .paybig b{font:600 17px var(--f-disp)}.p4 .paybig small{font-size:10px;color:#444}
.p4 .cam{flex:1;border-radius:20px;background:#191b1a;display:grid;place-items:center;align-content:center;gap:10px;color:#9a9f9b;font-size:11px}
.p4 .vf{width:120px;height:120px;border-radius:18px;border:2px solid #f2f3f1;box-shadow:0 0 18px rgba(242,243,241,.3)}
.p4 .chips{display:flex;gap:6px}.p4 .chips span{flex:1;display:flex;gap:5px;align-items:center;justify-content:center;border:1px solid #3a3e3b;border-radius:999px;padding:9px 4px;font:500 11px var(--f-body)}
.p4 .cap2{font-size:10px;color:#9a9f9b;margin:0}
.p4 .introph .scr{padding:22px 16px}
.p4 .intro{display:flex;flex-direction:column;gap:10px;height:100%;position:relative}
.p4 .eb{font:500 9.5px var(--f-mono);letter-spacing:.12em;text-transform:uppercase;color:#9a9f9b}
.p4 .intro h5{margin:0;font:600 22px/1.15 var(--f-disp)}
.p4 .iv{position:relative;min-height:90px;border-radius:18px;background:#1b1d1c;padding:12px;display:flex;align-items:center;overflow:hidden}
.p4 .iv svg{max-width:100%;height:auto}
.p4 .intro ol{margin:0;padding-left:18px;display:grid;gap:6px;font-size:12px;line-height:1.4;color:#d8dbd8}
.p4 .btnp{margin-top:auto;background:#f2f3f1;color:#0c0d0c;border-radius:999px;text-align:center;padding:10px;font:600 13px var(--f-body)}
.p4 .re{font-size:9.5px;color:#9a9f9b;text-align:center;display:flex;gap:4px;justify-content:center;align-items:center}.p4 .re svg.i{width:12px;height:12px}
.p4 .bl{display:flex;flex-direction:column;gap:7px}
.p4 .act{background:#1b1d1c;border:1px solid #3a3e3b;border-radius:14px;padding:9px 10px;display:grid;grid-template-columns:1fr auto;column-gap:8px}
.p4 .act b{font:600 12px var(--f-body)}.p4 .act small{grid-column:1;font-size:10px;color:#9a9f9b}
.p4 .go{grid-row:1/3;grid-column:2;align-self:center;background:#f2f3f1;color:#0c0d0c;border-radius:999px;padding:4px 10px;font:600 10.5px var(--f-body)}
.p4 .log{list-style:none;margin:0;padding:0;display:grid;gap:0}
.p4 .log li{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;font-size:11px;padding:7px 2px;border-bottom:1px solid #222523}
.p4 .log small{color:#6c716d;font-size:9.5px}
.p4 .log .d{width:9px;height:9px;border-radius:50%}
.p4 .log .d.sv{background:var(--c-sv)}.p4 .log .d.cF{background:var(--c-f)}.p4 .log .d.cT{background:var(--c-t)}.p4 .log .d.rs{border:1.3px dashed #a2a7a3}.p4 .log .d.ow{border:1.3px dashed var(--c-t)}
.p4 svg.dg{width:100%;max-width:960px;height:auto;display:block}
.p4 svg.dg.sm{max-width:300px}
.p4 .dgw{overflow-x:auto;background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:14px}
.p4 .dg .dn{fill:var(--mute)}.p4 .dg .dt{fill:var(--card);stroke:var(--ink3)}.p4 .dg .dp{fill:var(--ink)}
.p4 .dg .db{fill:var(--card);stroke:var(--rule);stroke-width:1.2}.p4 .dg .db.st{stroke-dasharray:4 3;stroke:var(--ink3)}.p4 .dg .db.hl{stroke:var(--tile);stroke-width:2}
.p4 .dg .dt.hl2{fill:var(--tile-soft);stroke:var(--tile)}
.p4 .dg .da{stroke:var(--ink3);stroke-width:1.3;fill:none;marker-end:url(#p4arr)}.p4 .dg .da.dash{stroke-dasharray:3 3}
.p4 .dg text{font-family:var(--f-body);fill:var(--ink)}
.p4 .dg .dl{font:600 12px var(--f-body)}.p4 .dg .dl.inv{fill:var(--paper);font-size:10px}
.p4 .dg .dh{font:600 13px var(--f-disp)}.p4 .dg .ds{font-size:10px;fill:var(--ink2)}.p4 .dg .dc{font-size:10.5px;fill:var(--ink2)}
.p4 .dms{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}
.p4 .dm{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:14px;display:grid;gap:8px;align-content:start}
.p4 .dm.rk{border:2px solid var(--tile)}.p4 .dm h4{margin:0;font:700 16px var(--f-disp)}.p4 .dm p{margin:0;font-size:13px;color:var(--ink2)}
.p4 .tms{display:grid;gap:12px}
.p4 .tm{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:12px 14px;display:grid;gap:8px}
.p4 .tm h4{margin:0;font:700 16px var(--f-disp);display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
.p4 .cnt{font:500 11px var(--f-mono);color:var(--ink3)}
.p4 .lvs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
@media (max-width:760px){.p4 .lvs{grid-template-columns:1fr 1fr}}
.p4 .lv{border-radius:8px;padding:8px 10px;background:var(--paper);min-width:0}
.p4 .lv>small{font:500 10.5px var(--f-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--tile)}
.p4 .lv ul{margin:4px 0 0;padding:0;list-style:none;display:grid;gap:3px;font-size:12.5px}
.p4 .lv li.ex{color:var(--ink2);font-style:italic}.p4 .lv li.na{color:var(--ink3)}
.p4 .tbl{overflow-x:auto;background:var(--card);border:1px solid var(--rule);border-radius:10px}
.p4 .tbl table td,.p4 .tbl table th{padding:8px 10px;border-top:1px solid var(--rule);text-align:left;vertical-align:top;font-size:13px}
.p4 .tbl thead th{font:500 11px var(--f-mono);color:var(--ink3);border-top:0}
.p4 .tbl td.r{font-weight:600}
'''
ARR = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><marker id="p4arr" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L6 3L0 6Z" style="fill:var(--ink3)"/></marker></defs></svg>'

OTHER = [
 ('Settings / drawer', 'A: gear per tab + avatar on Home for app-wide', 'B: one avatar drawer', 'C: drawer + tab shortcut', 'A'),
 ('Bell placement', 'A: Home header only; full screen, "Needs you" on top, activity below; soft dot, no count', 'B: bell on every tab header', 'C: bottom sheet over Home', 'A'),
 ('Bell behaviour', 'A: Needs-you items leave when done; activity kept 90 days, filter by tab', 'B: everything stays until swiped', 'C: activity only, actions as push', 'A'),
 ('Widget customisation', 'A: Home pin/hide/reorder (max 6) · Insights pin from library · others fixed, can hide', 'B: fixed everywhere', 'C: all tabs customisable', 'A'),
 ('Intro page', 'A: one page, one visual, 3 lines, Got it; ? in header', 'B: 3-step carousel', 'C: coach marks on real UI', 'A'),
]
other_html = '<div class="tbl"><table><thead><tr><th>Choice</th><th>A</th><th>B</th><th>C</th><th>Rec</th></tr></thead><tbody>' + ''.join(
    f'<tr><th scope="row">{P(a)}</th><td>{P(b)}</td><td>{P(c)}</td><td>{P(d)}</td><td class="r">{e}</td></tr>' for a, b, c, d, e in OTHER) + '</tbody></table></div>'

tot = sum(screens_count(m) for m in MAPS)
SEC4 = f'''<section class="phase p3 p4" id="p4" style="margin-top:48px">{ARR}
  <h2><span>Phase 4</span> Structure</h2>
  <p class="lede" style="margin:0">Where everything lives. Five tabs, Pay one tap from anywhere, three layers per tab (glance → explore → detail) plus settings one decision per screen. Phone mockups use the locked dot system with the same seed month; Home carries no numbers. Phone frames are drawn dark like the reference.</p>
  <div class="block"><h3>Tab map</h3><div class="dgw">{tabmap()}</div></div>
  <div class="block"><h3>Home: three layouts</h3><p class="note">Same widgets, three arrangements. Bell has a soft dot and no count. Avatar = app-wide settings.</p><div class="row">{homes}</div></div>
  <div class="block"><h3>Where Pay lives</h3><p class="note">Target: Scan in 1 tap from every tab; UPI ID and Log cash in no more than 2.</p><div class="row">{pays}</div></div>
  <div class="block"><h3>How deeper layers open</h3><div class="dms">
    <div class="dm"><h4>M1 Push screens</h4>{depth("push")}<p>Every layer is a new screen. Clear back path, but you lose the board each time and it takes more taps.</p></div>
    <div class="dm"><h4>M2 Expand in place</h4>{depth("expand")}<p>Cards grow in place. Keeps context, but detail views (lists, history) make the page very long.</p></div>
    <div class="dm rk"><h4>M3 Hybrid · recommended</h4>{depth("hybrid")}<p>Explore opens in place (one card at a time). Detail and every settings step push a screen, so each screen holds one decision.</p></div></div></div>
  <div class="block"><h3>Other structure choices</h3>{other_html}</div>
  <div class="block"><h3>Screen map per tab</h3><p class="note">{tot} screens in all (italic rows open in place and are not separate screens). Settings rows are one decision each.</p><div class="tms">{maps_html}</div></div>
  <div class="block"><h3>Tab intros</h3><p class="note">Shown on first visit, reopened from "?". One visual, three lines, one button.</p><div class="row">{intros}</div></div>
  <div class="block"><h3>Bell</h3><div class="row">{opt("Bell from Home", bell_screen(), True, "Needs-you on top (each one tap to act), then the activity log. Rows use dots for jar colour; ₹ appears here because this is a record, not Home.")}</div></div>
  <div class="block"><h3>Questions for Tarun</h3><div class="qs">{qh4}</div></div>
  <p class="note" style="color:var(--ink3);font-size:12px">Notes: claude/v12_phase4_structure.md</p>
</section>'''

src = open('/home/claude/v12/board.html').read()
src = re.sub(r'<style id="p4css">.*?</style>', '', src, flags=re.S)
src = re.sub(r'<section class="phase p3 p4" id="p4".*?</section>(?=<section class="later" id="p5">)', '', src, flags=re.S)
src = re.sub(r'<section class="later" id="p4">.*?</section>', '', src, flags=re.S)
src = src.replace('<section class="later" id="p5">', '<style id="p4css">' + CSS4 + '</style>' + SEC4 + '<section class="later" id="p5">', 1)
src = src.replace('<a href="#p3" class="now">', '<a href="#p3" class="">').replace('<a href="#p4" class="">4 Information architecture', '<a href="#p4" class="now">4 Structure')
open('/home/claude/v12/board.html', 'w').write(src)
json.dump({'maps': [(m[0], screens_count(m)) for m in MAPS], 'total': tot, 'QS': [(q, t, o, r, w) for q, t, o, r, w in QS4], 'MAPS': MAPS, 'OTHER': OTHER}, open('/home/claude/v12/p4_meta.json', 'w'), ensure_ascii=False)
print([(m[0], screens_count(m)) for m in MAPS], tot)
