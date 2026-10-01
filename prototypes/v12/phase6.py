# Phase 6 — Visual identity. Four style directions, each rendered as the same 4 phone screens.
import math, html
P = html.escape
R, G = 6.0, 3.0   # dot radius / gap in screen px (inside phone at 1x)
D = 2 * R

# ---------- directions ----------
DIRS = [
 dict(k='A', name='Monochrome glow', mode='dark', line='Faithful to the reference: near-black, soft widget cards, white glow for time only. Colour lives only in the dots.',
      bg='#0b0b0c', sf='#18181a', sf2='#222225', ink='#f4f4f5', mu='#9a9aa0', ln='#2c2c30', glow='#ffffff',
      j=['#ad7c26', '#5a8ae6', '#b9407f'], sv='#22a385', inc='#cfcfd4',
      lt=dict(bg='#f4f4f2', sf='#ffffff', ink='#141416', j=['#b7791f', '#2f63c9', '#93306b'], sv='#1f9b84'),
      disp='Geist', text='Geist', num='Geist Mono', fd="'Geist',system-ui,sans-serif", ft="'Geist',system-ui,sans-serif", fn="'Geist Mono',ui-monospace,monospace",
      rad=24, bd='1px solid rgba(255,255,255,.07)', sh='none', cardbg='linear-gradient(180deg,#1d1d20,#151517)',
      dot='flat + hairline highlight', icon='1.75px stroke, rounded caps, 24 grid (ref icons)', stroke=1.75, cap='round',
      bw=dict(bg='#000000', sf='#121212', ink='#f5f5f5', mu='#9b9b9b', g=['#a8a8a8', '#7a7a7a', '#7a7a7a'], sv='#ffffff')),
 dict(k='B', name='Warm paper', mode='light', line='Daylight notebook: warm paper ground, printed dots with a slight press, a chunky grotesk for headings.',
      bg='#ece6da', sf='#fbf8f2', sf2='#f2ede3', ink='#29241b', mu='#7a7163', ln='#ddd3c1', glow='#e3a13a',
      j=['#b07818', '#2f63c9', '#93306b'], sv='#1f8f6e', inc='#5e574b',
      lt=dict(bg='#1d1b17', sf='#26231e', ink='#f1ebdf', j=['#ad7c26', '#5a8ae6', '#b9407f'], sv='#22a385'),
      disp='Bricolage Grotesque', text='Figtree', num='DM Mono', fd="'Bricolage Grotesque',Georgia,sans-serif", ft="'Figtree',system-ui,sans-serif", fn="'DM Mono',ui-monospace,monospace",
      rad=18, bd='1px solid #e0d6c4', sh='0 1px 0 #d6ccb8', cardbg='#fbf8f2',
      dot='embossed (printed press: 1px under-shadow)', icon='1.5px stroke, rounded, slightly hand-set', stroke=1.5, cap='round',
      bw=dict(bg='#f3efe6', sf='#ffffff', ink='#1a1a1a', mu='#6b6b6b', g=['#6b6b6b', '#9a9a9a', '#9a9a9a'], sv='#1a1a1a')),
 dict(k='C', name='Ink & dots', mode='light', line='High contrast, like a printed form: white, black rules, square-ish cards, dots as the only colour.',
      bg='#ffffff', sf='#ffffff', sf2='#f2f2f2', ink='#0b0b0b', mu='#555555', ln='#0b0b0b', glow='#0b0b0b',
      j=['#a86a00', '#1f55c4', '#8a2a6a'], sv='#0f8a5f', inc='#333333',
      lt=dict(bg='#000000', sf='#0b0b0b', ink='#ffffff', j=['#ad7c26', '#5a8ae6', '#b9407f'], sv='#22a385'),
      disp='Archivo', text='Archivo', num='IBM Plex Mono', fd="'Archivo',Arial,sans-serif", ft="'Archivo',Arial,sans-serif", fn="'IBM Plex Mono',ui-monospace,monospace",
      rad=10, bd='1.5px solid #0b0b0b', sh='none', cardbg='#ffffff',
      dot='flat, hard 1.6px outlines', icon='2px stroke, square caps, geometric', stroke=2, cap='square',
      bw=dict(bg='#ffffff', sf='#ffffff', ink='#0b0b0b', mu='#555555', g=['#6b6b6b', '#9a9a9a', '#9a9a9a'], sv='#0b0b0b')),
 dict(k='D', name='Soft night', mode='dark', line='Muted blue-grey night: floating cards with soft shadow, rounder type, everything a step quieter.',
      bg='#151922', sf='#1f2430', sf2='#272d3b', ink='#e6e9f0', mu='#8e96a8', ln='#30374a', glow='#cfd8ff',
      j=['#b27a28', '#6b8be0', '#b0508c'], sv='#23a28f', inc='#b9c0d0',
      lt=dict(bg='#eef0f4', sf='#ffffff', ink='#1b2030', j=['#a8721c', '#3e6ac4', '#94407a'], sv='#16917a'),
      disp='Sora', text='Nunito Sans', num='Sora', fd="'Sora',system-ui,sans-serif", ft="'Nunito Sans',system-ui,sans-serif", fn="'Sora',system-ui,sans-serif",
      rad=22, bd='none', sh='0 8px 20px rgba(0,0,0,.35)', cardbg='#1f2430',
      dot='soft matte (slightly smaller, wider gaps)', icon='1.75px stroke, rounded, filled active state', stroke=1.75, cap='round',
      bw=dict(bg='#101114', sf='#1a1b1f', ink='#ececec', mu='#9a9a9a', g=['#a8a8a8', '#7a7a7a', '#7a7a7a'], sv='#ffffff')),
]
JN = ['Food', 'Travel', 'Fun']

# ---------- SVG helpers ----------
def wedge(cx, cy, r, frac):
    if frac >= .999: return f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.2f}"/>'
    a = 2 * math.pi * frac; x = cx + r * math.sin(a); y = cy - r * math.cos(a)
    return f'<path d="M{cx:.1f} {cy:.1f}L{cx:.1f} {cy - r:.1f}A{r:.2f} {r:.2f} 0 {1 if frac > .5 else 0} 1 {x:.1f} {y:.1f}Z"/>'

def dotgrid(items, cols=10, r=R, g=G, label='Dots'):
    """items: list of (kind, cls, frac) kind in f(solid)/o(outline)/c(crumb)/p(pill solid)/po(pill outline)."""
    out = []; x = y = 0; d = 2 * r; i = 0
    for kind, cls, fr in items:
        if kind in ('p', 'po'):
            if i % cols: y += d + g; i = 0
            w = cols * d + (cols - 1) * g
            out.append(f'<rect class="{cls} {"f" if kind == "p" else "o"}" x="0" y="{y:.1f}" width="{w:.1f}" height="{d:.1f}" rx="{r:.1f}"/>')
            y += d + g; continue
        cx = (i % cols) * (d + g) + r; cy = y + (i // cols) * (d + g) + r
        if kind == 'f': out.append(f'<circle class="{cls} f" cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.2f}"/>')
        elif kind == 'o': out.append(f'<circle class="{cls} o" cx="{cx:.1f}" cy="{cy:.1f}" r="{r - .7:.2f}"/>')
        elif kind == 'c':
            out.append(f'<circle class="{cls} o" cx="{cx:.1f}" cy="{cy:.1f}" r="{r - .7:.2f}"/>')
            out.append(f'<g class="{cls} f">{wedge(cx, cy, r - .2, fr)}</g>')
        i += 1
    rows = math.ceil(i / cols) if i else 0
    H = y + rows * (d + g) - g if rows else y - g
    W = cols * d + (cols - 1) * g
    return f'<svg class="dg" viewBox="-1 -1 {W + 2:.1f} {H + 2:.1f}" width="{W + 2:.0f}" height="{H + 2:.0f}" role="img" aria-label="{P(label)}">{"".join(out)}</svg>'

def jar(cls, left_rs, spent_rs, cols=10, r=R, label=''):
    """left/spent in rupees. left solid (pills for 1000s), crumb for remainder, spent outlined."""
    it = []
    for _ in range(int(left_rs // 1000)): it.append(('p', cls, 1))
    rest = left_rs % 1000
    it += [('f', cls, 1)] * int(rest // 100)
    if rest % 100: it.append(('c', cls, (rest % 100) / 100))
    for _ in range(int(spent_rs // 1000)): it.append(('po', cls, 1))
    it += [('o', cls, 1)] * int((spent_rs % 1000) // 100)
    return dotgrid(it, cols, r, label=label or f'{left_rs} left solid, {spent_rs} spent outlined')

ICONS = {
 'home': '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
 'income': '<path d="M12 4v10M8 10l4 4 4-4"/><path d="M4 16v3h16v-3"/>',
 'spend': '<circle cx="6" cy="7" r="1.6"/><circle cx="11" cy="7" r="1.6"/><path d="M15 7h5"/><circle cx="6" cy="12" r="1.6"/><path d="M10 12h10"/><circle cx="6" cy="17" r="1.6"/><circle cx="11" cy="17" r="1.6"/><circle cx="16" cy="17" r="1.6"/>',
 'save': '<path d="M8 4h8M9 4v3c-3 1-4 3-4 6v4a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-4c0-3-1-5-4-6V4"/><circle cx="12" cy="15" r="2"/>',
 'ins': '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M7 15l3-3 3 2 4-5"/>',
 'scan': '<path d="M4 9V6a2 2 0 0 1 2-2h3M15 4h3a2 2 0 0 1 2 2v3M20 15v3a2 2 0 0 1-2 2h-3M9 20H6a2 2 0 0 1-2-2v-3M7 12h10"/>',
 'bell': '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
 'gear': '<path d="M7 4v6M7 14v6M17 4v2M17 10v10"/><circle cx="7" cy="12" r="2"/><circle cx="17" cy="8" r="2"/>',
 'plus': '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/><path d="M16.5 4v7M13 7.5h7"/>',
}
def ic(n, s=18): return f'<svg class="i6" viewBox="0 0 24 24" width="{s}" height="{s}" aria-hidden="true">{ICONS[n]}</svg>'

def tabbar(active):
    t = ''.join(f'<span class="{"on" if n == active else ""}">{ic(n, 17)}</span>' for n in ['home', 'income', 'spend', 'save', 'ins'])
    return f'<div class="tb"><div class="pill">{t}</div><div class="pay" aria-label="Pay">{ic("scan", 20)}</div></div>'

def phone(body, active, title):
    return f'<div class="ph"><div class="sb"><span>9:41</span><span>●●● ▮</span></div><div class="scr">{body}</div>{tabbar(active)}</div>'

def head(t, icons=('gear',)):
    return f'<div class="hd"><h6>{P(t)}</h6><div class="hi">{"".join(f"<span>{ic(i, 16)}</span>" for i in icons)}</div></div>'

def glowrow(n, today, past_dim=True, cols=15, r=3.2, g=4.0, label='Days of the month; today glows'):
    o = []
    for i in range(n):
        cx = (i % cols) * (2 * r + g) + r + 4; cy = (i // cols) * (2 * r + g) + r + 4
        cl = 'gl' if i == today else ('gp' if i < today else 'gf')
        o.append(f'<circle class="{cl}" cx="{cx:.1f}" cy="{cy:.1f}" r="{r * (1.25 if i == today else 1):.2f}"/>')
    W = cols * (2 * r + g) + 4; H = math.ceil(n / cols) * (2 * r + g) + 4
    return f'<svg class="gr" viewBox="0 0 {W:.0f} {H:.0f}" width="{W:.0f}" height="{H:.0f}" role="img" aria-label="{P(label)}">{o and "".join(o)}</svg>'

# ---------- the four screens ----------
def s_home():
    return phone(
        head('Home', ('bell', 'gear')) +
        '<div class="grid">'
        f'<div class="c6 w"><div class="ct"><b>Pace</b><span class="mu">Day 12 of 30</span></div>{glowrow(30, 11)}<p class="wd">Calm. You are spending at an easy pace.</p></div>'
        f'<div class="c6 h"><div class="ct"><b>Food</b></div>{jar("j1", 2350, 1650, cols=6, r=4.2)}</div>'
        f'<div class="c6 h"><div class="ct"><b>Travel</b></div>{jar("j2", 900, 600, cols=6, r=4.2)}</div>'
        f'<div class="c6 h"><div class="ct"><b>Goa trip</b></div>{dotgrid([("f","sv",1)]*12 + [("o","sv",1)]*12, cols=6, r=4.2, label="Savings goal: saved solid green, to go outlined")}</div>'
        f'<div class="c6 h"><div class="ct"><b>Next money in</b></div>{glowrow(7, 4, cols=7, r=3.4, g=4, label="This week; allowance day glows")}<p class="mu sm">Allowance · Sat</p></div>'
        f'<div class="c6 add">{ic("plus", 22)}</div>'
        '</div>', 'home', 'Home')

def s_spend():
    lanes = []
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    plan = [('o', 'o', 'o'), ('o', 'o', 'o'), ('o', 'o', None), ('f', 'o', 'o'), ('f', 'f', 'c'), ('f', 'f', 'c'), ('f', 'f', 'c')]
    for i, (d, p) in enumerate(zip(days, plan)):
        it = [(k if k else 'o', 'j1', .7) for k in p if k]
        lanes.append(f'<div class="ln{" td" if i == 3 else ""}"><span>{d}</span>{dotgrid(it, cols=3, r=5)}{"<i class=today></i>" if i == 3 else ""}</div>')
    return phone(
        head('Spending', ('gear',)) +
        '<div class="seg2"><span class="on">Today &amp; week</span><span>All spends</span></div>'
        '<div class="c6 w"><div class="ct"><b>Food this week</b><span class="key">● = ₹100</span></div>'
        f'<div class="lanes">{"".join(lanes)}</div><p class="big"><span class="num">₹270</span> a day left</p><p class="mu sm">Wed went over a little; the rest of the week shares it.</p></div>'
        '<ul class="rows"><li><i class="d j1"></i>Chai Point<span class="num">₹40</span></li><li><i class="d j2"></i>Metro card<span class="num">₹200</span></li><li><i class="d j3"></i>BookMyShow<span class="num">₹180</span></li></ul>',
        'spend', 'Spending')

def s_save():
    goal = dotgrid([('p', 'sv', 1)] * 3 + [('f', 'sv', 1)] * 1 + [('po', 'sv', 1)] * 2 + [('o', 'sv', 1)] * 9, cols=10, r=R, label='Goal ₹6,000: ₹3,100 saved solid, rest outlined')
    months = ''.join(f'<span class="{c}">{m}</span>' for m, c in [('Oct', ''), ('Nov', ''), ('Dec', 'eta'), ('Jan', '')])
    return phone(
        head('Savings', ('gear',)) +
        '<div class="c6 w"><div class="ct"><b>Goa trip</b><span class="key">● = ₹100 · ▬ = ₹1,000</span></div>'
        f'{goal}<p class="big"><span class="num">₹3,100</span> <span class="mu">of ₹6,000</span></p>'
        f'<div class="eta">{months}</div><p class="mu sm">On track for December.</p></div>'
        f'<div class="c6 w"><div class="ct"><b>Rainy day</b></div>{dotgrid([("f","sv",1)]*8 + [("c","sv",.4)], cols=10, r=R)}<p class="mu sm">Add ₹100 · Add ₹500</p></div>',
        'save', 'Savings')

def s_pay():
    keys = ''.join(f'<span>{x}</span>' for x in '123456789·0⌫')
    leave = dotgrid([('f', 'j1', 1), ('c', 'j1', .2)], cols=2, r=7, label='Leaves Food: one dot and a crumb')
    after = jar('j1', 2230, 0, cols=10, r=3.6, label='Food after paying')
    return phone(
        '<div class="hd"><h6>Chai Point</h6><div class="hi"><span class="mu sm">UPI</span></div></div>'
        '<div class="amt num">₹120</div>'
        f'<div class="chip"><i class="d j1"></i>Food<span class="mu">· change</span></div>'
        f'<div class="leave"><span class="mu sm">Leaves Food</span>{leave}</div>'
        f'<div class="after"><span class="mu sm">Food after</span>{after}</div>'
        f'<div class="kp num">{keys}</div><div class="cta">Pay ₹120 with UPI</div>',
        '', 'Pay')

SCREENS = [('Home', s_home), ('Spending · day lanes', s_spend), ('Savings goal', s_save), ('Pay amount', s_pay)]

def dir_vars(d, bw=False):
    b = d['bw']
    if bw:
        v = dict(bg=b['bg'], sf=b['sf'], sf2=b['sf'], ink=b['ink'], mu=b['mu'], ln=d['ln'] if d['k'] != 'A' else '#2b2b2b', glow=b['ink'],
                 j1=b['g'][0], j2=b['g'][1], j3=b['g'][2], sv=b['sv'], cardbg=b['sf'])
    else:
        v = dict(bg=d['bg'], sf=d['sf'], sf2=d['sf2'], ink=d['ink'], mu=d['mu'], ln=d['ln'], glow=d['glow'],
                 j1=d['j'][0], j2=d['j'][1], j3=d['j'][2], sv=d['sv'], cardbg=d['cardbg'])
    v.update(fd=d['fd'], ft=d['ft'], fn=d['fn'], rad=f"{d['rad']}px", bd=d['bd'], sh=d['sh'], sw=str(d['stroke']), cap=d['cap'])
    if bw and d['k'] in ('B', 'C'): v['bd'] = d['bd'] if d['k'] == 'C' else '1px solid #d9d9d9'
    return ';'.join(f'--{k}:{val}' for k, val in v.items())

def screens_row(d, bw=False, which=None):
    out = []
    for nm, fn in SCREENS:
        if which and nm not in which: continue
        out.append(f'<figure class="sfig"><div class="d6 d6{d["k"]}{" bw" if bw else ""}" style="{dir_vars(d, bw)}">{fn()}</div><figcaption>{P(nm)}{" · B&amp;W" if bw else ""}</figcaption></figure>')
    return ''.join(out)

# ---------- style tile ----------
def swatches(d):
    def sw(c, n): return f'<span class="sw6"><i style="background:{c}"></i><b>{n}</b><code>{c}</code></span>'
    core = sw(d['bg'], 'bg') + sw(d['sf'], 'surface') + sw(d['ink'], 'ink') + sw(d['mu'], 'muted') + sw(d['ln'], 'lines') + sw(d['glow'], 'glow')
    jars = sw(d['j'][0], 'Food · amber') + sw(d['j'][1], 'Travel · blue') + sw(d['j'][2], 'Fun · plum') + sw(d['sv'], 'Savings') + sw(d['inc'], 'Income ink')
    lt = d['lt']; other = 'light' if d['mode'] == 'dark' else 'dark'
    comp = ''.join(sw(c, n) for c, n in [(lt['bg'], 'bg'), (lt['sf'], 'surface'), (lt['j'][0], 'amber'), (lt['j'][1], 'blue'), (lt['j'][2], 'plum'), (lt['sv'], 'savings')])
    return f'<div class="sws"><h5>{d["mode"].title()} (main)</h5><div>{core}</div><div>{jars}</div><h5>{other.title()} companion</h5><div>{comp}</div></div>'

def typespec(d):
    return (f'<div class="ts6" style="--fd:{d["fd"]};--ft:{d["ft"]};--fn:{d["fn"]}">'
            f'<div class="tsd">Goa by December</div>'
            f'<div class="tst">Food can cover this. The rest of the week shares it.</div>'
            f'<div class="tsn">₹3,100 · ₹270 · 0123456789</div>'
            f'<small>Display {P(d["disp"])} · Text {P(d["text"])} · Numerals {P(d["num"])} (tabular)</small></div>')

def dotspec(d, bw=False):
    it = [('p', 'j1', 1), ('f', 'j1', 1), ('f', 'j1', 1), ('f', 'j1', 1), ('c', 'j1', .4), ('o', 'j1', 1), ('o', 'j1', 1)]
    rows = ''.join(f'<div>{dotgrid([(k, c, f) for k, _, f in it], cols=10, r=7)}<small>{n}</small></div>' for c, n in [('j1', 'Food'), ('j2', 'Travel'), ('j3', 'Fun'), ('sv', 'Savings')])
    return f'<div class="d6 d6{d["k"]}{" bw" if bw else ""} dspec" style="{dir_vars(d, bw)}">{rows}</div>'

def tile(d):
    return f'''<div class="tile6">
  <div class="tl6h"><span class="dk6">{d["k"]}</span><div><h4>{P(d["name"])}</h4><p>{P(d["line"])}</p></div></div>
  <div class="tl6b">
    {swatches(d)}
    <div class="tcol">{typespec(d)}
      <dl class="anat"><dt>Cards</dt><dd>radius {d["rad"]}px · border {P(d["bd"])} · shadow {P(d["sh"])}</dd>
      <dt>Dots</dt><dd>{P(d["dot"])}</dd><dt>Icons</dt><dd>{P(d["icon"])}</dd>
      <dt>Tab bar + Pay</dt><dd>floating pill of 5 icons, round Pay (scan) button beside it in ink</dd></dl>
      <div class="dspw">{dotspec(d)}{dotspec(d, True)}</div><small class="mu6">Colour · B&amp;W (savings = full ink; Food mid grey; Travel 45° stripe; Fun dots)</small>
    </div>
  </div>
  <div class="srow">{screens_row(d)}</div>
  <div class="srow bwrow"><span class="lbl6">B&amp;W option</span>{screens_row(d, True, ("Home", "Spending · day lanes"))}</div>
</div>'''

# ---------- logos ----------
def L(inner, vb='0 0 64 64'): return f'<svg viewBox="{vb}" width="72" height="72" role="img">{inner}</svg>'
LOGOS = [
 ('L1', 'Dot + crumb', 'One ₹100 dot with a pie-wedge crumb dripping below. Continues the v11 tile-and-drip mark in the v12 dot language.',
  L(f'<circle class="lf" cx="32" cy="24" r="15"/><circle class="lo" cx="32" cy="51" r="7.2"/><g class="lf">{wedge(32, 51, 7.6, .35)}</g>')),
 ('L2', 'Dot jar', 'A jar outline holding 3×3 dots; the top row is outlined (spent), the rest solid. Reads as "budget jar" at a glance.',
  L('<path class="lo" d="M20 10h24M22 10v6c-6 3-8 7-8 13v19a6 6 0 0 0 6 6h24a6 6 0 0 0 6-6V29c0-6-2-10-8-13v-6"/>' + ''.join(f'<circle class="{"lo" if r == 0 else "lf"}" cx="{24 + c * 8}" cy="{30 + r * 8}" r="3.1"/>' for r in range(3) for c in range(3)))),
 ('L3', 'Trickle', 'Three dots falling and shrinking left to right, the last one a crumb. The name drawn as motion.',
  L(f'<circle class="lf" cx="14" cy="18" r="10"/><circle class="lf" cx="36" cy="34" r="7"/><circle class="lo" cx="52" cy="48" r="4.6"/><g class="lf">{wedge(52, 48, 5, .5)}</g>')),
 ('L4', 'Pill + dot (t)', 'A ₹1,000 pill crossed by a column of dots forms a lowercase t. Ties the logo to the money ladder.',
  L('<rect class="lf" x="10" y="20" width="44" height="11" rx="5.5"/>' + ''.join(f'<circle class="lf" cx="27" cy="{8 + i * 12.5}" r="5"/>' for i in (0,)) + '<circle class="lf" cx="27" cy="44" r="5"/><circle class="lo" cx="27" cy="56" r="4.4"/>')),
]
def logos():
    cards = ''.join(f'<div class="lg6"><div class="lgv">{s}</div><div class="lgv dkv">{s}</div><b>{k} · {P(n)}</b><p>{P(t)}</p></div>' for k, n, t, s in LOGOS)
    spl = ''.join(f'<div class="spl d6 d6{d["k"]}" style="{dir_vars(d)}"><div class="splm">{LOGOS[0][3]}</div><div class="splw">trickle</div><small>{P(d["name"])}</small></div>' for d in DIRS)
    return cards, spl

# ---------- compare + validator + recommendation ----------
SCORES = [  # legibility, calm, glance, cvd, ref fidelity
 ('A', 'Monochrome glow', 4, 5, 5, 4, 5, 'Hues only on dots, so jars pop on near-black; glow has nothing to compete with. Fun↔Savings deutan ΔE 7.6 → names + position always shown.'),
 ('B', 'Warm paper', 4, 4, 3, 5, 2, 'Best daylight reading and cleanest CVD numbers; warm ground mutes amber, and cards with borders read busier at a glance.'),
 ('C', 'Ink & dots', 5, 2, 4, 5, 2, 'Highest contrast and crisp outlines, but black rules everywhere feel like a form; spent outlines and card borders fight.'),
 ('D', 'Soft night', 3, 5, 3, 3, 3, 'Very calm, but muted hues sit close together (deutan ΔE 6.8, blue↔savings normal ΔE 16.8) and soft shadows blur the widget edges.'),
]
def compare():
    h = '<tr><th scope="col">Direction</th><th scope="col">Legibility</th><th scope="col">Calm</th><th scope="col">Glance</th><th scope="col">Colour-blind safety</th><th scope="col">Fits ref</th><th scope="col">Total</th><th scope="col">Why</th></tr>'
    b = ''.join(f'<tr{" class=pk6" if k == "A" else ""}><th scope="row">{k} · {P(n)}</th>' + ''.join(f'<td class="sc6">{v}</td>' for v in vals) + f'<td class="sc6 t">{sum(vals)}</td><td class="why6">{P(w)}</td></tr>' for k, n, *rest in SCORES for vals, w in [(rest[:5], rest[5])])
    return f'<div class="scroll"><table class="cmp6"><thead>{h}</thead><tbody>{b}</tbody></table></div>'

QS = [
 ('P6-Q1', 'Which style direction?', ['A: Monochrome glow', 'B: Warm paper', 'C: Ink & dots', 'D: Soft night'], 0, 'A, borrowing C’s 1.6px spent outlines and B’s palette as the light companion.'),
 ('P6-Q2', 'Default appearance?', ['A: Dark by default, light in Settings', 'B: Follow the phone', 'C: Light by default'], 1, 'B: follow the phone. Both modes are validated; the reference look shows whenever the phone is dark.'),
 ('P6-Q3', 'Logo mark?', ['L1: Dot + crumb', 'L2: Dot jar', 'L3: Trickle', 'L4: Pill + dot (t)'], 0, 'L1: smallest shape that still says "money in dots", works at 16px, and carries over from v11.'),
 ('P6-Q4', 'Numerals for ₹ amounts?', ['A: Mono, tabular (Geist Mono)', 'B: Same face as text, tabular figures', 'C: Display face'], 1, 'B: tabular Geist keeps amounts calm; mono reads technical on the Pay screen.'),
 ('P6-Q5', 'Dot finish?', ['A: Flat + hairline highlight', 'B: Embossed press', 'C: Perfectly flat'], 0, 'A: a 1px highlight separates touching dots on dark cards without looking like a glow.'),
]
def questions():
    return ''.join(f'<div class="q"><span class="qid">{k}</span><h3>{P(t)}</h3><ul>' + ''.join(f'<li class="{"pick" if i == r else ""}">{P(o)}</li>' for i, o in enumerate(opts)) + f'</ul><p class="qr"><b>Recommended:</b> {P(why)}</p></div>' for k, t, opts, r, why in QS)

val = open('/home/claude/v12/p6_validate.txt').read()

CSS6 = r'''
.p6 .tile6{background:var(--card);border:1px solid var(--rule);border-radius:12px;padding:16px;display:grid;gap:14px}
.tl6h{display:flex;gap:12px;align-items:flex-start}.tl6h h4{margin:0;font:700 19px var(--f-disp)}.tl6h p{margin:2px 0 0;color:var(--ink2);font-size:13px;max-width:70ch}
.dk6{font:600 13px var(--f-mono);background:var(--ink);color:var(--paper);border-radius:6px;padding:3px 8px}
.tl6b{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:16px}
@media (max-width:760px){.tl6b{grid-template-columns:1fr}}
.sws h5{margin:6px 0 4px;font:500 11px var(--f-mono);color:var(--ink3);text-transform:uppercase;letter-spacing:.06em}
.sws>div{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px}
.sw6{display:grid;grid-template-columns:22px auto;column-gap:6px;font-size:11px;align-items:center;min-width:104px}
.sw6 i{grid-row:span 2;width:22px;height:22px;border-radius:6px;border:1px solid var(--rule)}.sw6 b{font-weight:500}.sw6 code{font:400 10.5px var(--f-mono);color:var(--ink3)}
.tcol{display:grid;gap:10px;min-width:0}
.ts6{border:1px solid var(--rule);border-radius:8px;padding:10px 12px;display:grid;gap:4px}
.tsd{font:700 24px/1.1 var(--fd);letter-spacing:-.01em}.tst{font:400 14px/1.4 var(--ft)}.tsn{font:500 16px var(--fn);font-variant-numeric:tabular-nums}
.ts6 small,.mu6{font-size:11px;color:var(--ink3)}
.anat{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;margin:0;font-size:12px}.anat dt{color:var(--ink3);font-family:var(--f-mono);font-size:11px}.anat dd{margin:0}
.dspw{display:flex;gap:8px;flex-wrap:wrap}
.dspec{background:var(--bg);border-radius:8px;padding:8px 10px;display:grid;gap:4px}.dspec>div{display:flex;gap:8px;align-items:center}.dspec small{color:var(--mu);font:11px var(--ft)}
.srow{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px}
.bwrow{align-items:flex-start}.lbl6{writing-mode:vertical-rl;transform:rotate(180deg);font:500 11px var(--f-mono);color:var(--ink3);text-transform:uppercase;letter-spacing:.06em}
.sfig{background:none;border:0;flex:0 0 auto;gap:4px}.sfig figcaption{padding:4px 2px;font-size:12px;color:var(--ink2)}
/* phone */
.d6{font-family:var(--ft);color:var(--ink)}
.d6 .ph{width:236px;height:530px;background:var(--bg);border-radius:30px;border:5px solid #050505;position:relative;overflow:hidden;display:flex;flex-direction:column}
.d6 .sb{display:flex;justify-content:space-between;padding:8px 16px 2px;font:600 10px var(--ft);color:var(--ink)}
.d6 .scr{flex:1;padding:4px 12px 70px;display:flex;flex-direction:column;gap:8px;overflow:hidden}
.d6 .hd{display:flex;justify-content:space-between;align-items:center}.d6 h6{margin:0;font:700 22px/1.1 var(--fd);letter-spacing:-.01em;color:var(--ink)}
.d6 .hi{display:flex;gap:6px}.d6 .hi>span{width:28px;height:28px;border-radius:50%;background:var(--sf2);display:grid;place-items:center}
.d6 .i6{fill:none;stroke:var(--ink);stroke-width:var(--sw);stroke-linecap:var(--cap);stroke-linejoin:round}
.d6 .grid{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.d6 .c6{background:var(--cardbg);border:var(--bd);box-shadow:var(--sh);border-radius:var(--rad);padding:9px 10px;display:grid;gap:6px;align-content:start;min-width:0}
.d6 .c6.w{grid-column:span 2}.d6 .c6.add{width:44px;height:44px;place-items:center;padding:0}
.d6 .ct{display:flex;justify-content:space-between;align-items:baseline;gap:6px}.d6 .ct b{font:600 12px var(--ft)}
.d6 .mu{color:var(--mu)}.d6 .sm{font-size:10.5px;margin:0}.d6 .wd{margin:0;font-size:11px;color:var(--ink)}
.d6 .key{font:500 9.5px var(--fn);color:var(--mu)}
.d6 .num{font-family:var(--fn);font-variant-numeric:tabular-nums}
.d6 .big{margin:0;font:600 15px var(--ft)}.d6 .big .num{font-size:18px}
.d6 svg.dg{max-width:100%;height:auto;overflow:visible;flex:none}
.d6 .f.j1,.d6 .j1.f path,.d6 .j1.f circle{fill:var(--j1)} .d6 .f.j2{fill:var(--j2)} .d6 .f.j3{fill:var(--j3)} .d6 .f.sv,.d6 .sv.f path,.d6 .sv.f circle{fill:var(--sv)}
.d6 .o{fill:none;stroke-width:1.3}.d6 .o.j1{stroke:var(--j1)}.d6 .o.j2{stroke:var(--j2)}.d6 .o.j3{stroke:var(--j3)}.d6 .o.sv{stroke:var(--sv)}
.d6 g.f{stroke:none}
.d6 .gr .gp{fill:var(--mu);opacity:.75}.d6 .gr .gf{fill:var(--mu);opacity:.28}.d6 .gr .gl{fill:var(--glow);filter:drop-shadow(0 0 3px var(--glow)) drop-shadow(0 0 6px var(--glow))}
.d6 i.d{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px}.d6 i.d.j1{background:var(--j1)}.d6 i.d.j2{background:var(--j2)}.d6 i.d.j3{background:var(--j3)}
.d6 .seg2{display:flex;background:var(--sf2);border-radius:999px;padding:2px;font-size:10.5px}.d6 .seg2 span{flex:1;text-align:center;padding:4px;border-radius:999px;color:var(--mu)}.d6 .seg2 .on{background:var(--sf);color:var(--ink);font-weight:600}
.d6 .lanes{display:grid;gap:3px}.d6 .ln{display:grid;grid-template-columns:28px auto 1fr;align-items:center;gap:6px;font-size:10px;color:var(--mu);position:relative}
.d6 .ln.td span{color:var(--ink);font-weight:700}.d6 .ln i.today{width:6px;height:6px;border-radius:50%;background:var(--glow);box-shadow:0 0 6px var(--glow),0 0 10px var(--glow)}
.d6 .rows{list-style:none;margin:0;padding:0;display:grid;gap:0}.d6 .rows li{display:flex;align-items:center;font-size:11px;padding:6px 2px;border-bottom:1px solid var(--ln)}.d6 .rows li span{margin-left:auto}
.d6 .eta{display:flex;justify-content:space-between;font-size:10px;color:var(--mu)}.d6 .eta .eta{color:var(--ink);font-weight:700;text-shadow:0 0 8px var(--glow)}
.d6 .amt{font-size:40px;font-weight:600;text-align:center;margin-top:4px;color:var(--ink)}
.d6 .chip{align-self:center;display:flex;align-items:center;gap:4px;background:var(--sf2);border-radius:999px;padding:5px 12px;font-size:11.5px;font-weight:600}
.d6 .leave,.d6 .after{display:flex;align-items:center;justify-content:space-between;gap:8px}
.d6 .kp{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;font-size:16px;text-align:center}.d6 .kp span{padding:6px 0;border-radius:10px;background:var(--sf2)}
.d6 .cta{background:var(--ink);color:var(--bg);text-align:center;font-weight:700;font-size:12.5px;padding:10px;border-radius:999px}
.d6 .tb{position:absolute;left:10px;right:10px;bottom:10px;display:flex;gap:6px;align-items:center}
.d6 .pill{flex:1;display:flex;justify-content:space-around;background:var(--sf2);border-radius:999px;padding:9px 4px;border:var(--bd);box-shadow:var(--sh)}
.d6 .pill span{opacity:.5}.d6 .pill span.on{opacity:1}
.d6 .pay{width:44px;height:44px;border-radius:50%;background:var(--ink);display:grid;place-items:center;flex:0 0 auto}.d6 .pay .i6{stroke:var(--bg)}
/* dot finishes */
.d6A .f{stroke:rgba(255,255,255,.22);stroke-width:.8}
.d6B svg.dg{filter:drop-shadow(0 1px 0 rgba(60,40,10,.28))}
.d6C .o{stroke-width:1.6}
.d6D svg.dg .f{transform-box:fill-box;transform-origin:center;transform:scale(.9)}
.d6C .c6.add,.d6C .hi>span{border:1.5px solid var(--ink);background:none}
.d6C .pill{background:var(--sf)}
/* B&W patterns */
.d6.bw .f.j2,.d6.bw .j2.f circle{fill:url(#p6s)}.d6.bw .f.j3{fill:url(#p6d)}.d6.bw i.d.j2{background:repeating-linear-gradient(45deg,var(--j2) 0 2px,transparent 2px 4px)}
.d6.bw .f.sv,.d6.bw .sv.f circle,.d6.bw .sv.f path{fill:var(--sv)}
.d6.bw .o.sv{stroke:var(--sv)}
.p6 .lgs{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.lg6{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:12px;display:grid;grid-template-columns:auto auto;gap:8px;justify-content:start}
.lg6 b,.lg6 p{grid-column:1/-1;margin:0}.lg6 p{font-size:12.5px;color:var(--ink2)}
.lgv{width:84px;height:84px;display:grid;place-items:center;border-radius:12px;background:#f4f4f2;--lc:#141416}.lgv.dkv{background:#0b0b0c;--lc:#f4f4f5}
.lgv .lf{fill:var(--lc)}.lgv .lf path,.lgv .lf circle{fill:var(--lc)}.lgv .lo{fill:none;stroke:var(--lc);stroke-width:2.6}
.spls{display:flex;gap:10px;overflow-x:auto}
.spl{flex:0 0 150px;height:250px;border-radius:22px;background:var(--bg);display:grid;place-items:center;align-content:center;gap:8px;border:4px solid #050505}
.spl .lf,.spl .lf path,.spl .lf circle{fill:var(--j1)}.spl .lo{fill:none;stroke:var(--j1);stroke-width:2.6}
.splw{font:700 22px var(--fd);color:var(--ink);letter-spacing:-.02em}.spl small{color:var(--mu);font-size:10px}
.cmp6{font-size:13px}.cmp6 th,.cmp6 td{padding:8px 10px;border-top:1px solid var(--rule);text-align:left;vertical-align:top}
.cmp6 thead th{font:500 11px var(--f-mono);color:var(--ink3)}.cmp6 th[scope=row]{white-space:nowrap;font-weight:600}
.sc6{font:600 13px var(--f-mono);text-align:center!important}.sc6.t{color:var(--tile)}.why6{min-width:280px;color:var(--ink2)}
.pk6{background:var(--tile-soft)}
pre.val6{background:var(--card);border:1px solid var(--rule);border-radius:10px;padding:12px;font:12px/1.5 var(--f-mono);overflow-x:auto;max-height:420px;margin:0;white-space:pre}
'''

tiles = ''.join(tile(d) for d in DIRS)
lcards, spl = logos()
pats = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><pattern id="p6s" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="3" height="3" fill="#8a8a8a"/><rect width="1.4" height="3" fill="#e6e6e6"/></pattern><pattern id="p6d" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="3" fill="#8a8a8a"/><circle cx="1.5" cy="1.5" r=".7" fill="#e6e6e6"/></pattern></defs></svg>'

SEC6 = f'''<section class="phase p6" id="p6" style="margin-top:48px">{pats}
<h2><span>Phase 6</span> Visual identity</h2>
<p class="lede" style="margin:0">Four complete style directions, each shown on the same four screens with the same data (Tarun, hostel, ₹9,000 month: Food ₹4,000, Travel ₹1,500, Fun ₹1,500, Savings ₹2,000). Static only; motion and sound come in Phase 12.</p>
<div class="dec1"><h3>Locked going in</h3><ul>
<li>Dot ladder: crumb (pie wedge) &lt;₹100 → dot ₹100 → pill ₹1,000 → block ₹10,000. Left = solid jar colour, spent = outline.</li>
<li>Three colour-safe jar hues (amber, blue, plum), patterns for jar 4+; savings green only; income in neutral ink; no red.</li>
<li>Glow only for time and position (pace, today, next money in, goal ETA). Colour default, B&amp;W option.</li>
<li>Widget-grid Home with no numbers; round Pay button beside the floating tab bar.</li></ul></div>
<div class="block"><h3>The four directions</h3><p class="note">Each tile: palette tokens, type pairing, card and dot anatomy, then Home, Spending (day lanes), Savings goal and Pay amount. Second row: the B&amp;W option.</p>{tiles}</div>
<div class="block"><h3>Side by side</h3><p class="note">Scored 1–5 on the four Phase 6 criteria plus fit with the reference Tarun chose.</p>{compare()}</div>
<div class="block"><h3>Palette validation</h3><p class="note">dataviz validator, all pairs, each direction against its own surface in both modes, plus the B&amp;W grey ramps. Every set passes. The two WARN lines (Fun ↔ Savings for deutan, ΔE 6.8–7.6) are legal because jar names and position always go with colour, and savings is never placed beside Fun without a label.</p><pre class="val6">{P(val)}</pre></div>
<div class="block"><h3>Logo options</h3><p class="note">Each mark in light and dark. All use only the dot vocabulary.</p><div class="lgs">{lcards}</div>
<h3 style="margin-top:8px">Splash (static), L1 in each direction</h3><div class="spls">{spl}</div></div>
<div class="recbox"><div class="pri"><h4>Recommendation: A · Monochrome glow</h4>
<p>It is the reference Tarun picked for Home, and it keeps the one rule that makes Trickle readable: colour appears only on money. The near-black ground gives the white glow a job (time and position) without it ever touching a dot.</p>
<ul><li>Borrow from C: 1.6px outlines for spent dots, so spent reads clearly at 4px radius.</li><li>Borrow from B: its validated palette as the light companion (amber #b7791f, blue #2f63c9, plum #93306b, savings #1f9b84).</li><li>Keep Geist for display and text, with tabular figures for ₹.</li><li>Logo L1, dot + crumb.</li></ul></div>
<div><h4>Watch</h4><ul><li>Fun ↔ Savings is the weakest pair for deutan vision (ΔE 7.6): never show them side by side without names.</li><li>On dark, outlined spent dots at 1.3px can vanish on small widgets. Use 1.6px.</li><li>D is the calmest, but its muted hues fail the separation target at the size Home uses.</li></ul></div></div>
<div class="block"><h3>Questions for Tarun</h3><div class="qs">{questions()}</div></div>
</section>'''

FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&family=Geist+Mono:wght@500&family=Bricolage+Grotesque:wght@700&family=Figtree:wght@400;600;700&family=DM+Mono:wght@500&family=Archivo:wght@400;600;700&family=Sora:wght@400;600;700&family=Nunito+Sans:wght@400;600;700&display=swap">'

src = open('/home/claude/v12/board_pre6.html').read()
old = '<section class="later" id="p6"><h2><span>Phase 6</span> Visual identity</h2><p>Opens after Phase 2 decisions are logged.</p></section>'
assert old in src
src = src.replace(old, '<style id="p6css">' + CSS6 + '</style>' + FONTS + SEC6, 1)
src = src.replace('<a href="#p5" class="now">', '<a href="#p5" class="">').replace('<a href="#p6" class="">', '<a href="#p6" class="now">')
open('/home/claude/v12/board.html', 'w').write(src)
print('ok', len(src))
