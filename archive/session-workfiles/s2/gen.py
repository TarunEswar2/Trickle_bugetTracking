import math, html
W = 300
def T(x, y, s, size=11, anchor="start", cls="t", weight=400):
    return f'<text x="{x}" y="{y}" font-size="{size}" text-anchor="{anchor}" class="{cls}" font-weight="{weight}">{html.escape(s)}</text>'
def svg(body, h):
    return f'<svg viewBox="0 0 {W} {h}" width="100%" role="img">{body}</svg>'
STY = {"left": "var(--left)", "save": "var(--save)", "spent": "none", "ghost": "none", "warm": "var(--warm)"}
def cell(cx, cy, r, frac, style):
    da = ' stroke-dasharray="2 2"' if style == "ghost" else ""
    o = f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="var(--ink3)" stroke-width="1.2"{da}/>'
    if style in ("left", "save", "warm") and frac > 0:
        cid = f"c{abs(hash((cx,cy,r,frac,style)))%10**8}"
        top = cy + r - 2*r*frac
        o += f'<clipPath id="{cid}"><rect x="{cx-r}" y="{top}" width="{2*r}" height="{2*r*frac}"/></clipPath><circle cx="{cx}" cy="{cy}" r="{r}" fill="{STY[style]}" clip-path="url(#{cid})"/>'
    return o
def units(segs, unit, x0=8, y0=10, cols=10, r=7, gap=19):
    """segs: list of (amount, style). Sequential fill, cup-fill partials."""
    out = []; i = 0
    for amt, st in segs:
        n = amt / unit
        while n > 1e-9:
            # fill remaining part of current cell
            f = min(1, n)
            cx = x0 + r + (i % cols) * gap; cy = y0 + r + (i // cols) * gap
            out.append(cell(cx, cy, r, f, st)); n -= f; i += 1
    rows = (i - 1) // cols + 1
    return "".join(out), y0 + rows * gap
def bar(x, y, w, h, segs, total):
    o = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h/2}" fill="none" stroke="var(--ink3)" stroke-width="1.2"/>'
    cx = x
    for amt, st in segs:
        ww = w * amt / total
        if st != "spent":
            o += f'<rect x="{cx+1}" y="{y+1}" width="{max(0,ww-2)}" height="{h-2}" rx="{(h-2)/2}" fill="{STY[st]}"/>'
        cx += ww
    return o
def cup(x, y, s=12, fill=True):
    return f'<path d="M{x} {y} h{s} l-1.5 {s} h-{s-3} z" fill="{"var(--warm)" if fill else "none"}" stroke="var(--ink3)" stroke-width="1"/><path d="M{x+s} {y+3} q4 1 0 5" fill="none" stroke="var(--ink3)" stroke-width="1"/>'

SC = [("chai", "₹25 chai"), ("meal", "₹350 meal"), ("income", "₹9,000 in → ₹2,000 save / ₹7,000 spend"),
      ("week", "Week: ₹1,750 budget, ₹1,050 left"), ("month", "Month: ₹7,000, ₹2,600 left"),
      ("cats", "5 categories"), ("big", "₹45,000 laptop goal"), ("goal", "Goal ₹14,000, ₹8,110 saved"),
      ("accum", "Four ₹25 chais accumulate"), ("night", "Spent more at night")]
CATS = [("Food", 2800), ("Travel", 1200), ("Fun", 1000), ("Study", 600), ("Subs", 548)]
HOURS = [("Morn", 900), ("Noon", 1100), ("Eve", 500), ("Night", 1900)]

def cap(t): return T(8, 0, "")
S = {}

# ---------- S1 scale of view ----------
def s1(k):
    if k == "chai": b, h = units([(25, "left")], 100); return svg(b + T(30, 21, "¼ of one dot · 1 dot = ₹100"), 30)
    if k == "meal": b, h = units([(350, "left")], 100); return svg(b + T(8, h+8, "3½ dots · 1 dot = ₹100"), h+14)
    if k == "income": b, h = units([(2000, "save"), (7000, "left")], 1000, cols=9, r=10, gap=26); return svg(b + T(8, h+8, "9 dots · 1 dot = ₹1,000 (month view)"), h+14)
    if k == "week": b, h = units([(700, "spent"), (1050, "left")], 100); return svg(b + T(8, h+8, "10½ dots left of 17½ · 1 dot = ₹100"), h+14)
    if k == "month": b, h = units([(4400, "spent"), (2600, "left")], 1000, r=10, gap=26); return svg(b + T(8, h+8, "2.6 dots left of 7 · 1 dot = ₹1,000"), h+14)
    if k == "cats":
        o = ""; y = 4
        for n, v in CATS:
            o += T(8, y+14, n); b, _ = units([(v, "left")], 1000, x0=62, y0=y+2, r=7, gap=18); o += b; y += 20
        return svg(o + T(8, y+12, "1 dot = ₹1,000"), y+18)
    if k == "big": b, h = units([(45000, "ghost")], 5000, r=10, gap=26); return svg(b + T(8, h+8, "9 dots · unit changes to 1 dot = ₹5,000"), h+14)
    if k == "goal": b, h = units([(8110, "save"), (5890, "ghost")], 1000, r=9, gap=24, cols=10); return svg(b + T(8, h+8, "8 of 14 dots · 1 dot = ₹1,000"), h+14)
    if k == "accum":
        o = ""
        for i in range(4): o += cell(16 + i*40, 18, 9, 0.25*(i+1), "left") + T(16+i*40, 42, f"{i+1}×", 10, "middle")
        return svg(o + T(176, 22, "the same dot fills"), 50)
    if k == "night":
        o = ""; y = 4
        for n, v in HOURS: o += T(8, y+14, n); b, _ = units([(v, "left")], 1000, x0=62, y0=y+2, r=7, gap=18); o += b; y += 20
        return svg(o, y+4)
S["S1"] = s1

# ---------- S2 count label ----------
def s2(k):
    def lab(n, st="left", note=""):
        shown = min(n, 10)
        b, h = units([(shown*100, st)], 100, r=6, gap=15)
        extra = f"+ {n-10:g} more" if n > 10 else ""
        return svg(b + T(165, 18, f"{n:g} dots", 15, weight=700) + T(165, 34, extra or note, 10), 44)
    if k == "chai": return lab(0.25)
    if k == "meal": return lab(3.5)
    if k == "income": return lab(90, "left", "")
    if k == "week": return lab(10.5)
    if k == "month": return lab(26)
    if k == "cats":
        o = ""; y = 4
        for n, v in CATS:
            o += T(8, y+13, n) + cell(70, y+9, 6, 1, "left") + T(84, y+13, f"× {v/100:g}"); y += 18
        return svg(o, y+4)
    if k == "big": return lab(450, "ghost")
    if k == "goal": return lab(81.1, "save", "of 140")
    if k == "accum":
        return svg(cell(14, 16, 8, 1, "left") + T(30, 20, "4 chais = 1 dot", 12), 30)
    if k == "night":
        o = ""; y = 4
        for n, v in HOURS: o += T(8, y+13, n) + cell(70, y+9, 6, 1, "left") + T(84, y+13, f"× {v/100:g}"); y += 18
        return svg(o, y+4)
S["S2"] = s2

# ---------- S3 days ----------
DAY = 200
def daystrip(n, st="left", y=6, total=None, lbl=""):
    o = ""; cols = 15
    total = total or n
    for i in range(math.ceil(total)):
        x = 8 + (i % cols) * 19; yy = y + (i // cols) * 22
        f = max(0, min(1, n - i)); s = st if f > 0 else "spent"
        o += f'<rect x="{x}" y="{yy}" width="15" height="17" rx="3" fill="none" stroke="var(--ink3)"/>'
        if f > 0: o += f'<rect x="{x}" y="{yy+17*(1-f)}" width="{15*f if False else 15}" height="{17*f}" rx="3" fill="{STY[s]}"/>'
    rows = (math.ceil(total)-1)//cols + 1
    return o, y + rows*22
def s3(k):
    if k == "chai": o, h = daystrip(0.125); return svg(o + T(30, 19, "⅛ of a day (1 day = ₹200)"), 28)
    if k == "meal": o, h = daystrip(1.75); return svg(o + T(52, 19, "1¾ days of spending"), 28)
    if k == "income": o, h = daystrip(45, "left"); return svg(o + T(8, h+8, "45 days: 35 to spend, 10 put away"), h+14)
    if k == "week": o, h = daystrip(5.25, total=8.75); return svg(o + T(8, h+8, "about 5 days left this week"), h+14)
    if k == "month": o, h = daystrip(13, total=35); return svg(o + T(8, h+8, "13 days of money left"), h+14)
    if k == "cats":
        o = ""; y = 4
        for n, v in CATS: o += T(8, y+13, n) + T(290, y+13, f"{v/DAY:.0f} days", 11, "end") + bar(62, y+4, 160, 10, [(v, "left")], 2800); y += 18
        return svg(o, y+4)
    if k == "big": return svg(T(8, 26, "225 days", 22, weight=700) + T(8, 44, "of your usual spending ≈ 7½ months"), 52)
    if k == "goal": return svg(T(8, 24, "41 days saved", 18, weight=700) + T(8, 42, "29 more days to go (₹200 = 1 day)"), 50)
    if k == "accum": o, h = daystrip(0.5); return svg(o + T(30, 19, "4 chais = half a day"), 28)
    if k == "night": return svg(T(8, 20, "Nights took 9½ days of money", 13, weight=600) + T(8, 38, "mornings took 4½"), 46)
S["S3"] = s3

# ---------- S4 proportional bar ----------
def s4(k):
    def one(segs, tot, note):
        return svg(bar(8, 8, 284, 18, segs, tot) + T(8, 44, note), 52)
    if k == "chai": return one([(25, "left")], 1750, "a sliver of this week's bar")
    if k == "meal": return one([(350, "left")], 1750, "a fifth of this week")
    if k == "income": return one([(2000, "save"), (7000, "left")], 9000, "save | spend — no units")
    if k == "week": return one([(700, "spent"), (1050, "left")], 1750, "filled part = left")
    if k == "month": return one([(4400, "spent"), (2600, "left")], 7000, "filled part = left")
    if k == "cats":
        o = ""; y = 4
        for n, v in CATS: o += T(8, y+13, n) + bar(62, y+4, 228, 10, [(v, "left")], 2800); y += 18
        return svg(o, y+4)
    if k == "big": return one([(0, "save")], 45000, "empty bar — size of goal invisible")
    if k == "goal": return one([(8110, "save")], 14000, "a bit over half")
    if k == "accum": return one([(100, "left")], 1750, "tiny growth each chai")
    if k == "night":
        o = ""; y = 4
        for n, v in HOURS: o += T(8, y+13, n) + bar(62, y+4, 228, 10, [(v, "left")], 1900); y += 18
        return svg(o, y+4)
S["S4"] = s4

# ---------- S5 gauge ----------
def gauge(frac, label, st="left"):
    cx, cy, r = 70, 62, 52
    def pt(a): return cx - r*math.cos(a), cy - r*math.sin(a)
    x1, y1 = pt(0); x2, y2 = pt(math.pi)
    o = f'<path d="M{x1} {y1} A{r} {r} 0 0 1 {x2} {y2}" fill="none" stroke="var(--ink3)" stroke-width="12" stroke-opacity=".25" stroke-linecap="round"/>'
    if frac > 0:
        xe, ye = pt(math.pi*frac)
        o += f'<path d="M{x1} {y1} A{r} {r} 0 0 1 {xe} {ye}" fill="none" stroke="{STY[st]}" stroke-width="12" stroke-linecap="round"/>'
    return svg(o + T(150, 40, label, 13, weight=600) + T(150, 58, "E ··· F", 10), 72)
def s5(k):
    return {"chai": gauge(1-25/1750, "needle barely moves"), "meal": gauge(1-350/1750, "drops a fifth"),
            "income": gauge(1, "tank refilled (₹7,000)"), "week": gauge(0.6, "about 60% left"),
            "month": gauge(2600/7000, "a bit over ⅓ left"), "cats": gauge(1-2800/3000, "one gauge per jar…"),
            "big": gauge(0, "not a tank metaphor", "save"), "goal": gauge(8110/14000, "58% full", "save"),
            "accum": gauge(1-100/1750, "4 tiny drops"), "night": gauge(0.6, "can't show time")}[k]
S["S5"] = s5

# ---------- S6 envelopes ----------
def env(fills, labels=None, st="left"):
    o = ""
    for i, f in enumerate(fills):
        x = 8 + i*72
        o += f'<rect x="{x}" y="6" width="62" height="44" rx="4" fill="none" stroke="var(--ink3)"/><path d="M{x} 6 l31 16 l31 -16" fill="none" stroke="var(--ink3)" stroke-width=".8"/>'
        if f > 0: o += f'<rect x="{x+3}" y="{6+44*(1-f)+2}" width="56" height="{max(0,44*f-5)}" rx="2" fill="{STY[st]}" opacity=".9"/>'
        o += T(x+31, 64, labels[i] if labels else f"Wk {i+1}", 10, "middle")
    return o
def s6(k):
    if k == "chai": return svg(env([1, 1, 0.6-25/1750, 1]) + "", 70)
    if k == "meal": return svg(env([1, 1, 0.6-0.2, 1]), 70)
    if k == "income": return svg(env([1, 1, 1, 1], ["₹1,750"]*4), 70)
    if k == "week": return svg(env([0, 0, 0.6, 1]), 70)
    if k == "month": return svg(env([0, 0, 0.6, 1]), 70)
    if k == "cats": return svg(env([1, .43, .36, .21], ["Food", "Travel", "Fun", "Study"]), 70)
    if k == "big": return svg(env([0, 0, 0, 0], ["", "", "", ""], "save") + T(150, 40, "", 1), 70)
    if k == "goal": return svg(env([1, 1, 1, .32], ["Goal ¼", "½", "¾", "end"], "save"), 70)
    if k == "accum": return svg(env([0, 0, 0.6, 1]) + T(170, 30, "", 1), 70)
    if k == "night": return svg(env([.3, .37, .17, .63], ["Morn", "Noon", "Eve", "Night"]), 70)
S["S6"] = s6

# ---------- S7 words ----------
def words(a, b):
    return svg(T(8, 26, a, 17, weight=700) + T(8, 46, b, 11, cls="t2"), 54)
def s7(k):
    return {"chai": words("A chai", "tap → ₹25"), "meal": words("A proper meal", "about a fifth of your week"),
            "income": words("Money came in", "most for spending, some put away"), "week": words("About half left", "a little slower than usual"),
            "month": words("A third of the month left", "a bit faster than usual"), "cats": words("Mostly food", "then travel, then fun"),
            "big": words("A big one", "several months of saving"), "goal": words("Over halfway", "on track for March"),
            "accum": words("Chai adds up", "four this week — one meal's worth"), "night": words("Nights cost more", "almost half your spending")}[k]
S["S7"] = s7

# ---------- S8 icon-label ranked ----------
ICON = {"Food": "M0 0", }
def chip(x, y, name, v, tot, w=150):
    return T(x, y+12, name, 12, weight=600) + bar(x+70, y+3, w, 12, [(v, "left")], tot) + T(x+80+w, y+12, f"₹{v:,}", 11)
def s8(k):
    def rank(rows, tot):
        o = ""; y = 4
        for n, v in rows: o += chip(8, y, n, v, tot); y += 19
        return svg(o, y+4)
    if k == "chai": return svg(T(8, 18, "☕ Chai", 13, weight=600) + T(8, 36, "added to Food · 3rd this week"), 44)
    if k == "meal": return rank([("Food +350", 350)], 1750)
    if k == "income": return rank([("Spend", 7000), ("Save", 2000)], 7000)
    if k == "week": return rank([("Left", 1050), ("Spent", 700)], 1750)
    if k == "month": return rank([("Left", 2600), ("Spent", 4400)], 7000)
    if k == "cats": return rank(CATS, 2800)
    if k == "big": return rank([("Laptop", 45000), ("Month", 7000)], 45000)
    if k == "goal": return rank([("Saved", 8110), ("To go", 5890)], 14000)
    if k == "accum": return rank([("Chai ×4", 100)], 350)
    if k == "night": return rank(sorted(HOURS, key=lambda r: -r[1]), 1900)
S["S8"] = s8

# ---------- S9 waffle ----------
def waffle(segs, note):
    o = ""; i = 0; s = 9
    cells = []
    for pct, st in segs: cells += [st]*int(round(pct))
    cells += ["spent"]*(100-len(cells))
    for j, st in enumerate(cells[:100]):
        x = 8 + (j % 10)*(s+2); y = 6 + (j//10)*(s+2)
        o += f'<rect x="{x}" y="{y}" width="{s}" height="{s}" rx="1.5" fill="{STY.get(st,"none") if st!="spent" else "none"}" stroke="var(--ink3)" stroke-width=".7"/>'
    return svg(o + T(126, 30, note, 11), 118)
def s9(k):
    return {"chai": waffle([(0.36, "left")], "⅓ of one square"), "meal": waffle([(5, "left")], "5 squares of 100"),
            "income": waffle([(22, "save"), (78, "left")], "22 save · 78 spend"), "week": waffle([(60, "left")], "60 of 100 left"),
            "month": waffle([(37, "left")], "37 of 100 left"), "cats": waffle([(46, "left"), (20, "warm"), (16, "save")], "Food 46 · Travel 20 · Fun 16…"),
            "big": waffle([(0, "save")], "goal = 640% of a month"), "goal": waffle([(58, "save")], "58 of 100 saved"),
            "accum": waffle([(1.4, "left")], "1½ squares"), "night": waffle([(43, "left")], "43 of 100 at night")}[k]
S["S9"] = s9

# ---------- S10 notes ----------
def notes(spec, note=""):
    o = ""; x = 8
    for d, n in spec:
        for i in range(n):
            if d >= 100:
                w = {500: 46, 200: 40, 100: 36}[d]; o += f'<rect x="{x}" y="10" width="{w}" height="24" rx="2" fill="none" stroke="var(--ink2)"/>' + T(x+w/2, 26, f"{d}", 10, "middle"); x += w+4
            else:
                o += f'<circle cx="{x+9}" cy="22" r="9" fill="none" stroke="var(--ink2)"/>' + T(x+9, 26, f"{d}", 9, "middle"); x += 22
    return svg(o + T(8, 50, note, 11), 58)
def s10(k):
    return {"chai": notes([(20, 1), (5, 1)], "a ₹20 coin and a ₹5"), "meal": notes([(200, 1), (100, 1), (50, 1)], "hand over 200+100+50"),
            "income": notes([(500, 5)], "+ 13 more ₹500s (18 total)"), "week": notes([(500, 2), (50, 1)], "what's in the wallet"),
            "month": notes([(500, 5), (100, 1)], "₹2,600 in the wallet"), "cats": notes([(500, 5)], "5 piles — too many notes"),
            "big": notes([(500, 5)], "…90 notes of ₹500"), "goal": notes([(500, 5)], "16 notes saved, 12 to go"),
            "accum": notes([(20, 4), (5, 4)], "8 coins in the jar"), "night": notes([(500, 3), (200, 2)], "doesn't show time")}[k]
S["S10"] = s10

# ---------- S11 calendar / time strips ----------
def hours(vals, hl=None):
    o = ""; mx = max(vals) or 1
    for i, v in enumerate(vals):
        x = 8 + i*11.8; hh = 44*v/mx
        o += f'<rect x="{x}" y="{50-hh}" width="9" height="{max(hh,1)}" rx="2" fill="{"var(--left)" if (hl and hl[0]<=i<=hl[1]) else "var(--ink3)"}"/>'
    return o + T(8, 64, "6am", 9) + T(150, 64, "noon → night", 9, "middle") + T(290, 64, "1am", 9, "end")
def cal(filled, n=28, sizes=None):
    o = ""
    for i in range(n):
        x = 8 + (i % 7)*40; y = 6 + (i//7)*20
        r = (sizes[i] if sizes else (6 if i < filled else 0))
        o += f'<circle cx="{x+12}" cy="{y+8}" r="7" fill="none" stroke="var(--ink3)" stroke-width=".6"/>'
        if r: o += f'<circle cx="{x+12}" cy="{y+8}" r="{r}" fill="var(--left)"/>'
    return o
def s11(k):
    base = [1,2,3,1,1,2,4,2,1,1,1,2,3,4,5,6,8,9,7,5]
    if k == "chai": return svg(hours([0]*4+[1]+[0]*15, (4, 4)), 70)
    if k == "meal": return svg(hours([0]*7+[3.5]+[0]*12, (7, 7)), 70)
    if k == "income": return svg(cal(0, 28, [7 if i == 0 else 0 for i in range(28)]) + "", 88)
    if k == "week": return svg(cal(0, 7, [5, 3, 4, 2, 0, 0, 0]) + T(8, 44, "4 days in, 3 to go", 11), 50)
    if k == "month": return svg(cal(0, 28, [min(7, 2+ (i*3)%6) if i < 20 else 0 for i in range(28)]), 88)
    if k == "cats": return svg(T(8, 20, "not a category view", 11) + T(8, 38, "(dots coloured by category = memorising)", 10), 46)
    if k == "big": return svg(T(8, 20, "one dot on one day", 11) + T(8, 38, "size can't carry ₹45,000", 10), 46)
    if k == "goal": return svg(cal(0, 28, [3 if i % 7 == 6 else 0 for i in range(28)]) + "", 88)
    if k == "accum": return svg(hours([0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,0]), 70)
    if k == "night": return svg(hours(base, (14, 19)), 70)
S["S11"] = s11

# ---------- S12 equivalents ----------
def cups(n, note, filled=True):
    o = ""
    for i in range(min(int(math.ceil(n)), 20)):
        o += cup(8 + (i % 10)*26, 8 + (i//10)*22, 12, filled)
    rows = (min(int(math.ceil(n)), 20)-1)//10 + 1
    return svg(o + T(8, 18 + rows*22, note, 11), 26 + rows*22)
def s12(k):
    return {"chai": cups(1, "1 chai"), "meal": cups(14, "≈ 14 chais"), "income": svg(T(8, 24, "≈ 26 meals out", 18, weight=700) + T(8, 42, "or 360 chais — numbers lose meaning", 10), 50),
            "week": cups(20, "≈ 42 chais left (shown 20)"), "month": svg(T(8, 24, "≈ 7 meals out left", 17, weight=700), 34),
            "cats": svg(T(8, 18, "Food ≈ 8 meals · Travel ≈ 6 autos", 11) + T(8, 36, "Fun ≈ 3 movies · Subs ≈ 4 Spotifys", 11), 44),
            "big": svg(T(8, 24, "≈ 1,800 chais", 18, weight=700) + T(8, 42, "≈ 6 months of food", 11), 50), "goal": svg(T(8, 24, "≈ 23 meals saved", 17, weight=700) + T(8, 42, "17 to go", 11), 50),
            "accum": cups(4, "4 chais = one samosa-meal"), "night": svg(T(8, 24, "Night snacks ≈ 5 meals", 15, weight=700), 34)}[k]
S["S12"] = s12

# ---------- S13 tally bundles ----------
def tally(n100, note):
    o = ""; full = int(n100 // 5); rem = n100 - full*5; x = 8; y = 8; shown = 0
    for b in range(min(full, 18)):
        for s in range(4): o += f'<line x1="{x+s*5}" y1="{y}" x2="{x+s*5}" y2="{y+18}" stroke="var(--ink)" stroke-width="1.6"/>'
        o += f'<line x1="{x-2}" y1="{y+15}" x2="{x+18}" y2="{y+3}" stroke="var(--left)" stroke-width="1.8"/>'
        x += 30
        if x > 270: x = 8; y += 24
    for s in range(int(rem)): o += f'<line x1="{x+s*5}" y1="{y}" x2="{x+s*5}" y2="{y+18}" stroke="var(--ink)" stroke-width="1.6"/>'
    if rem % 1: o += f'<line x1="{x+int(rem)*5}" y1="{y+18-18*(rem%1)}" x2="{x+int(rem)*5}" y2="{y+18}" stroke="var(--ink)" stroke-width="1.6"/>'
    return svg(o + T(8, y+36, note, 11), y+42)
def s13(k):
    return {"chai": tally(0.25, "a quarter stroke"), "meal": tally(3.5, "3½ strokes"), "income": tally(90, "90 strokes (18 bundles)"),
            "week": tally(10.5, "10½ strokes left"), "month": tally(26, "26 strokes left"), "cats": tally(28, "Food alone: 28 strokes"),
            "big": tally(90, "showing 90 of 450 strokes…"), "goal": tally(81, "81 of 140"), "accum": tally(1, "4 quarters → 1 stroke"),
            "night": tally(19, "19 strokes at night")}[k]
S["S13"] = s13

# ---------- S14 tens stack (the combine baseline) ----------
def stacks(n100, st="left", note=""):
    o = ""; x = 8; tens = int(n100 // 10); rem = n100 - tens*10
    for i in range(min(tens, 20)):
        o += f'<rect x="{x}" y="6" width="9" height="50" rx="3" fill="{STY[st] if st!="ghost" else "none"}" stroke="var(--ink3)"/>'; x += 12
    for i in range(int(math.ceil(rem))):
        f = min(1, rem - i); o += cell(x+5, 52 - i*0, 4, f, st) if False else f'<rect x="{x}" y="{51-i*5}" width="9" height="4" rx="1" fill="{STY[st]}"/>'
    return svg(o + T(8, 72, note, 11), 78)
def s14(k):
    return {"chai": stacks(0.25, note="¼ dot"), "meal": stacks(3.5, note="3½ dots, not yet a line"), "income": stacks(90, note="9 lines (2 save, 7 spend)"),
            "week": stacks(10.5, note="1 line + ½ dot left"), "month": stacks(26, note="2 lines + 6 dots left"), "cats": stacks(28, note="Food: 2 lines + 8"),
            "big": stacks(200, "ghost", note="20 of 45 lines shown"), "goal": stacks(81, "save", note="8 lines + 1 dot saved"), "accum": stacks(1, note="1 dot"),
            "night": stacks(19, note="1 line + 9 at night")}[k]
S["S14"] = s14

# ---------- S15 recommended hybrid ----------
def s15(k):
    if k in ("chai", "meal", "week"):
        spent = {"chai": 25, "meal": 350, "week": 0}[k]
        b, h = units([(700, "spent"), (spent, "ghost"), (1050 - spent, "left")], 100)
        word = {"chai": "Paying takes ¼ dot", "meal": "Paying takes 3½ dots", "week": "About half your week left"}[k]
        return svg(T(8, 14, word, 13, weight=700) + b.replace('y0', '') , h+4).replace('viewBox="0 0 300', 'viewBox="0 -8 300') if False else svg(T(8, 14, word, 13, weight=700) + units([(700, "spent"), (spent, "ghost"), (1050 - spent, "left")], 100, y0=22)[0] + T(8, units([(1,"left")],100,y0=22)[1]+30, "this week · 1 dot = ₹100", 10, cls="t2"), 90)
    if k == "month": return s1("month")
    if k == "income": return s1("income")
    if k == "cats": return s8("cats")
    if k == "big": return svg(units([(45000, "ghost")], 5000, r=9, gap=24)[0] + T(8, 44, "1 dot = ₹5,000 · ≈ 6 months of saving", 10), 52)
    if k == "goal": return s1("goal")
    if k == "accum": return s1("accum")
    if k == "night": return s11("night")
S["S15"] = s15

SYS = [
 ("S1", "Fixed dots, changing scale of view", "Dots never merge; the unit changes with the view and is written on screen: week ₹100, month ₹1,000, goals ₹5,000.", "1 dot = ₹100 this week; zoom out and 1 dot = ₹1,000."),
 ("S2", "₹100 dots + count label", "At most 10 dots drawn, the rest is a count.", "Every dot is ₹100; past ten we just tell you how many."),
 ("S3", "Days of spending", "Money as days of your usual ₹200 day.", "One block = one day of your usual spending."),
 ("S4", "One proportional bar", "No units; one bar per whole, ₹ on tap.", "The filled part is what's left."),
 ("S5", "Fuel gauge", "A needle for this week's mental limit.", "Full tank on Monday, empty on Sunday."),
 ("S6", "Weekly envelopes", "Month split into 4 envelopes that empty.", "Each envelope is one week of money."),
 ("S7", "Relative words", "Plain words; tap for ₹.", "We tell you in words; tap to see the rupees."),
 ("S8", "Label-first ranked bars", "Name on every bar, longest first, no colour key.", "Biggest spend at the top, name on the bar."),
 ("S9", "Waffle 10×10", "1 square = 1% of the month.", "100 squares is your month."),
 ("S10", "Notes & coins", "Draw the cash you'd hand over (pay moment only).", "These are the notes this would have been."),
 ("S11", "Time strips", "Dots placed on hours / days.", "Each dot sits on the time you paid."),
 ("S12", "Own equivalents", "Amounts in your own buys.", "₹350 ≈ 14 of your chais."),
 ("S13", "Tally bundles", "Strokes of ₹100, bundled in fives.", "One stroke ₹100, a crossed bundle ₹500."),
 ("S14", "Tens-stacks (combine baseline)", "Dots merge into lines of 10 — v12's approach, for comparison.", "Ten dots become a line."),
 ("S15", "Recommended hybrid", "Words + week dots on Home; scaled dots and labelled bars in tabs; ₹ and equivalents in detail.", "Home in words and ₹100 dots; bigger views say their unit."),
]
DISC = {
 "S1": ("10½ dots left (₹100 each)", "Month view: 2.6 dots of ₹1,000", "₹2,600 left · list of transactions"),
 "S2": ("10½ dots", "26 dots this month", "₹2,600 · each payment"),
 "S3": ("About 5 days left this week", "13 days of money left this month", "₹2,600 ÷ ₹200/day; edit your usual day"),
 "S4": ("Bar 60% full", "Bar per category", "₹1,050 left of ₹1,750"),
 "S5": ("Needle near half", "Per-jar gauges", "₹1,050 left, ₹150/day"),
 "S6": ("Week 3 envelope, ⅗ full", "All 4 envelopes", "₹1,050 in this envelope; carry-over"),
 "S7": ("About half left", "A bit faster than usual — food", "₹1,050 left · ₹700 spent · list"),
 "S8": ("Top: Food", "Ranked bars, names on bars", "₹ per category + transactions"),
 "S9": ("60 of 100 left", "Squares by category", "₹ per square = ₹70"),
 "S10": ("—", "Pay: notes you'd hand over", "₹ exact"),
 "S11": ("Nights cost more", "Hour strip", "Each payment at its time"),
 "S12": ("≈ 42 chais left", "Category in your units", "₹ + which buy is the unit"),
 "S13": ("10½ strokes", "Bundles by category", "₹ exact"),
 "S14": ("1 line + ½ dot", "Lines by category", "₹ exact"),
 "S15": ("“About half your week left” + 17½ dots (10½ filled)", "Spending tab: labelled ranked bars; month dots of ₹1,000 with unit stated", "₹ list, own-equivalents (“≈ 14 chais”), hour strip"),
}
# scores: learn, glance, honest, range, nocolour, homefit, pay, patterns, lowload (1-5)
SCORES = {
 "S1": [4,4,5,5,5,4,5,3,4], "S2": [5,4,2,4,5,2,4,2,4], "S3": [4,4,4,5,5,4,3,3,4], "S4": [5,5,4,2,4,5,3,2,5],
 "S5": [5,5,3,1,4,4,3,1,5], "S6": [4,4,4,2,5,4,4,2,4], "S7": [5,5,2,4,5,5,2,4,5], "S8": [5,4,5,4,5,3,2,3,4],
 "S9": [3,3,4,2,3,3,2,2,3], "S10": [5,3,3,1,5,2,5,1,2], "S11": [3,3,4,1,4,3,2,5,3], "S12": [4,3,3,3,5,3,4,3,3],
 "S13": [4,3,5,1,5,3,4,2,2], "S14": [3,4,5,4,4,4,4,2,3], "S15": [4,5,5,5,5,5,5,4,4],
}
CRIT = ["Learn in 1 sentence", "Glance ≤3s", "Honest proportion", "₹25 → ₹45,000", "No colour memorising", "No big number on Home", "Friction at pay", "Awareness patterns", "Low load"]

gallery = ""
for sid, name, rule, sentence in SYS:
    cards = "".join(f'<figure class="sc"><figcaption>{html.escape(lbl)}</figcaption>{S[sid](k)}</figure>' for k, lbl in SC)
    g, t, d = DISC[sid]
    glance_svg = S[sid]("week")
    gallery += f'''<section class="sys{' rec' if sid=='S15' else ''}" id="{sid}"><header><span class="id">{sid}</span><h3>{html.escape(name)}</h3><p class="rule">“{html.escape(sentence)}”</p><p class="sub">{html.escape(rule)}</p></header>
<div class="grid">{cards}</div>
<div class="disc"><div><b>Glance</b><span>{html.escape(g)}</span></div><div><b>One tap</b><span>{html.escape(t)}</span></div><div><b>Detail</b><span>{html.escape(d)}</span></div></div></section>'''

rows = ""
for sid, name, *_ in SYS:
    sc = SCORES[sid]; tot = sum(sc)/len(sc)
    rows += f'<tr{" class=hl" if sid=="S15" else ""}><th>{sid} {html.escape(name)}</th>' + "".join(f'<td class="s{v}">{v}</td>' for v in sc) + f'<td class="tot">{tot:.1f}</td></tr>'
matrix = '<table><thead><tr><th>System</th>' + "".join(f"<th>{c}</th>" for c in CRIT) + '<th>Avg</th></tr></thead><tbody>' + rows + '</tbody></table>'

tpl = open("tpl.html").read()
open("trickle_v14_stage2.html", "w").write(tpl.replace("{{GALLERY}}", gallery).replace("{{MATRIX}}", matrix).replace("{{NAV}}", " ".join(f'<a href="#{s}">{s}</a>' for s, *_ in SYS)))
print("ok")
