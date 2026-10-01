import base64, io, math
from PIL import Image
U='/root/.claude/uploads/860f62eb-517e-5d8f-84c5-65604e6e2975/'
refs=[
('9c3666d0','Ref 1 · Concentric radial arcs','User-assigned → <b>category spending %</b>. Take: one ring per category, sweep = share on a common 270° scale, % callout at each arc end, icon/total in the centre. Guard: outer rings look longer, so the % label carries the value.',600),
('a1530355','Ref 2 · Pie with callouts + fill columns','User-assigned → <b>month-wise category spending</b>. Take: pie for this month (≤5 slices + Other) with icon callouts; below, one "fill jar" column per category, one cell per month, fill = spend vs budget.',600),
('3a4c6db2','Ref 4 · Music in Your Life','Layout language. Take: leader-line callouts, icon-centre donuts, 4 small-multiple radial gauges (morning → evening), 24-h radial clock, 12/24-h area strips, half-donut average vs total. Skip: dotted world map, mountain peaks.',1100),
('5333e76c','Ref 3 · Chart-type library (60)','The form catalogue we mined. About 24 fit, 12 maybe, 24 no-fit (maps, trading charts, chord, network, violin, word cloud). The full verdict table is in v6_phase2_catalogue.md.',1100),
('d43de4d4','How to Think Visually','Take: concentric, speedometer (→ safe-to-spend half-donut), staircase (goal steps), isotype, timeline, decision tree (method choice). Reject allegories (iceberg, mountain, machine), per the v3 critique.',900),
('b62ec986','Dark crypto dashboard','Take: KPI triad with deltas, waffle allocation grid, transaction heatmap, dense dark card anatomy, tooltip style.',900),
('a7e7b4ff','IIB types of data viz','Confirms the radial family (nested bubbles, polar grid, sunburst) sits alongside Ref 1; treemap and sankey confirmed.',800),
]
def enc(id,w):
    im=Image.open(U+id+'-image.png').convert('RGB'); 
    if im.width>w: im=im.resize((w,int(im.height*w/im.width)),Image.LANCZOS)
    b=io.BytesIO(); im.save(b,'JPEG',quality=72); return 'data:image/jpeg;base64,'+base64.b64encode(b.getvalue()).decode()
S=['#3987e5','#d95926','#199e70','#c98500','#d55181','#9085e9']
T='var(--mut)'
def arc(cx,cy,r,a0,a1,c,w):
    x0,y0=cx+r*math.cos(a0),cy+r*math.sin(a0); x1,y1=cx+r*math.cos(a1),cy+r*math.sin(a1)
    return f'<path d="M{x0:.1f} {y0:.1f} A{r} {r} 0 {1 if a1-a0>math.pi else 0} 1 {x1:.1f} {y1:.1f}" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round"/>'
def svg(b): return f'<svg viewBox="0 0 120 90" role="img">{b}</svg>'
th=[]
# 1 radial arcs
b='';sh=[.34,.24,.18,.14,.10]
for i,s in enumerate(sh):
    r=40-i*7; a0=-math.pi/2; b+=arc(60,50,r,a0,a0+s/.34*1.5*math.pi,S[i],5)
b+='<text x="60" y="53" font-size="8" text-anchor="middle" fill="var(--ink)">₹8.2k</text>'
th.append(('What % of spend goes to each category?','Concentric radial arcs','Categories hero · user ref 1',svg(b)))
# 2 pie + jars
b='';a=-math.pi/2
for i,s in enumerate([.4,.3,.2,.1]):
    a1=a+s*2*math.pi; x0,y0=30+20*math.cos(a),45+20*math.sin(a);x1,y1=30+20*math.cos(a1),45+20*math.sin(a1)
    b+=f'<path d="M30 45 L{x0:.1f} {y0:.1f} A20 20 0 {1 if s>.5 else 0} 1 {x1:.1f} {y1:.1f}Z" fill="{S[i]}" stroke="var(--bg2)" stroke-width="1.5"/>';a=a1
for j in range(4):
    for m in range(6):
        f=[.9,.6,.8,.4][j]*(0.6+0.4*((m*7+j)%5)/4)
        b+=f'<rect x="{64+j*14}" y="{74-m*10}" width="11" height="8" rx="1.5" fill="{S[j]}" opacity="{0.25+0.75*f:.2f}"/>'
th.append(('How did each category move month by month?','Pie + monthly fill jars','Categories · Monthly · user ref 2',svg(b)))
# 3 pace bullet
b='<rect x="10" y="38" width="100" height="14" rx="3" fill="var(--line)"/><rect x="10" y="41" width="52" height="8" rx="2" fill="#5bb98c"/><rect x="62" y="41" width="22" height="8" fill="#5bb98c" opacity=".3"/><rect x="68" y="32" width="2" height="26" fill="var(--ink)"/><text x="10" y="28" font-size="7" fill="'+T+'">spent · projected · today’s pace</text>'
th.append(('Am I on pace for this week?','Pace bullet + projection ghost','Home hero',svg(b)))
# 4 half donut
b=arc(60,62,34,math.pi,2*math.pi,'var(--line)',9)+arc(60,62,34,math.pi,math.pi*1.62,'#5bb98c',9)+'<text x="60" y="60" font-size="10" text-anchor="middle" fill="var(--ink)">₹212</text><text x="60" y="72" font-size="6" text-anchor="middle" fill="'+T+'">safe today</text>'
th.append(('How much can I safely spend today?','Half-donut gauge + hero number','Home',svg(b)))
# 5 ranked bullets
b=''
for i,(v,t) in enumerate([(.9,.7),(.6,.75),(.45,.5),(.3,.6)]):
    y=16+i*18;b+=f'<rect x="10" y="{y}" width="100" height="9" rx="2" fill="var(--line)"/><rect x="10" y="{y+2}" width="{v*100}" height="5" rx="1.5" fill="{S[i]}"/><rect x="{10+t*100}" y="{y-2}" width="2" height="13" fill="var(--ink)"/>'
th.append(('Which categories are near or over budget?','Ranked bullet graphs','Categories rows',svg(b)))
# 6 sankey
b='<rect x="8" y="10" width="6" height="70" rx="2" fill="var(--mut)"/>';y=10;yy=8
for i,h in enumerate([26,18,14,12]):
    b+=f'<path d="M14 {y} C55 {y} 55 {yy} 92 {yy} L92 {yy+h} C55 {yy+h} 55 {y+h} 14 {y+h}Z" fill="{S[i]}" opacity=".35"/><rect x="92" y="{yy}" width="6" height="{h}" rx="1.5" fill="{S[i]}"/>';y+=h;yy+=h+6
th.append(('Where does this month’s money flow?','Sankey-lite','Home',svg(b)))
# 7 24h clock
b='<circle cx="60" cy="45" r="36" fill="none" stroke="var(--line)"/>'
import random;random.seed(3)
for h in range(24):
    v=[0,0,0,0,0,0,0,0,.4,.5,.3,.2,.8,.9,.3,.2,.4,.6,.7,1,.8,.5,.2,0][h];a=-math.pi/2+h/24*2*math.pi
    if v: b+=f'<line x1="{60+12*math.cos(a):.1f}" y1="{45+12*math.sin(a):.1f}" x2="{60+(12+22*v)*math.cos(a):.1f}" y2="{45+(12+22*v)*math.sin(a):.1f}" stroke="#3987e5" stroke-width="3.5" stroke-linecap="round"/>'
b+='<text x="60" y="48" font-size="7" text-anchor="middle" fill="'+T+'">24h</text>'
th.append(('When in the day do I spend?','24-hour radial clock','Insights · ref 4',svg(b)))
# 8 small multiple gauges
b=''
for i,(l,v) in enumerate([('AM',.35),('Mid',.5),('PM',.75),('Eve',.25)]):
    cx=18+i*28;b+=arc(cx,42,10,-math.pi/2,1.5*math.pi-0.001,'var(--line)',3)+arc(cx,42,10,-math.pi/2,-math.pi/2+v*2*math.pi,S[i],3)+f'<text x="{cx}" y="45" font-size="6" text-anchor="middle" fill="var(--ink)">{int(v*100)}</text><text x="{cx}" y="64" font-size="6" text-anchor="middle" fill="{T}">{l}</text>'
th.append(('Morning vs evening spend?','Small-multiple radial gauges','Insights · ref 4',svg(b)))
# 9 heatmap
b=''
for r in range(5):
    for c in range(7):
        v=((r*7+c)*37%11)/10;b+=f'<rect x="{20+c*12}" y="{12+r*14}" width="10" height="12" rx="2" fill="#3987e5" opacity="{.12+.88*v:.2f}"/>'
th.append(('Which weekday is heaviest?','Calendar heatmap','Insights (kept)',svg(b)))
# 10 pictogram
b=''
for r,(n,c) in enumerate([(9,S[0]),(6,S[1]),(4,S[2])]):
    for k in range(n): b+=f'<circle cx="{14+k*10}" cy="{22+r*22}" r="3.5" fill="{c}"/>'
th.append(('Which small repeat buys add up?','Isotype row per merchant','Home accumulation',svg(b)))
# 11 range strip
b='<line x1="12" y1="45" x2="108" y2="45" stroke="var(--line)" stroke-width="6" stroke-linecap="round"/><rect x="38" y="40" width="30" height="10" rx="2" fill="var(--mut)" opacity=".5"/><circle cx="50" cy="45" r="3" fill="var(--ink)"/><circle cx="86" cy="45" r="5" fill="#d95926" stroke="var(--bg2)" stroke-width="2"/><text x="86" y="34" font-size="6" text-anchor="middle" fill="var(--ink)">this txn</text>'
th.append(('Is this purchase bigger than usual here?','Range strip + marker','Transaction detail',svg(b)))
# 12 friction
b='<rect x="10" y="36" width="56" height="16" rx="3" fill="#5bb98c"/><rect x="68" y="36" width="18" height="16" rx="3" fill="#c98500"/><rect x="88" y="36" width="22" height="16" rx="3" fill="var(--line)"/><rect x="92" y="30" width="2" height="28" fill="var(--ink)"/>'+''.join(f'<circle cx="{14+k*9}" cy="68" r="3" fill="{"#c98500" if k<3 else "var(--line)"}"/>' for k in range(7))
th.append(('What does this payment do to my budget?','Friction bullet + purchase dots','Friction sheet · manual entry',svg(b)))
# 13 dumbbell
b=''
for i,(a_,c_) in enumerate([(30,70),(60,45),(40,55),(80,82)]):
    y=18+i*18;b+=f'<line x1="{10+a_}" y1="{y}" x2="{10+c_}" y2="{y}" stroke="var(--line)" stroke-width="3"/><circle cx="{10+a_}" cy="{y}" r="4" fill="var(--mut)"/><circle cx="{10+c_}" cy="{y}" r="4" fill="{S[i]}"/>'
th.append(('This month vs last, per category?','Dumbbell','Insights',svg(b)))
# 14 histogram
b=''.join(f'<rect x="{14+i*19}" y="{78-h}" width="15" height="{h}" rx="2" fill="#3987e5"/>' for i,h in enumerate([60,38,20,9,5]))
th.append(('Are most purchases small?','Histogram','Insights (kept)',svg(b)))
# 15 ranked merchant bars
b=''.join(f'<rect x="40" y="{10+i*14}" width="{w}" height="9" rx="2" fill="#3987e5"/><text x="36" y="{17+i*14}" font-size="6" text-anchor="end" fill="{T}">{n}</text>' for i,(n,w) in enumerate([('Mess',70),('Canteen',55),('Zepto',40),('Uber',28),('RV Shop',20)]))
th.append(('Who gets most of my money?','Ranked bars (replaces bubbles)','Insights',svg(b)))
# 16 treemap
b='<rect x="8" y="8" width="60" height="74" rx="2" fill="#3987e5"/><rect x="70" y="8" width="42" height="40" rx="2" fill="#d95926"/><rect x="70" y="50" width="20" height="32" rx="2" fill="#199e70"/><rect x="92" y="50" width="20" height="32" rx="2" fill="#c98500"/>'
th.append(('Which merchants make up a category?','Treemap','Category detail · onboarding budget builder',svg(b)))
# 17 sub calendar
b=''
for r in range(5):
    for c in range(7):
        d=r*7+c+1;b+=f'<rect x="{18+c*12}" y="{8+r*15}" width="10" height="13" rx="2" fill="var(--line)"/>'
        if d in (3,14,22): b+=f'<circle cx="{23+c*12}" cy="{14.5+r*15}" r="3" fill="#d55181"/>'
th.append(('When do subscriptions hit?','Month calendar with due dots','Savings',svg(b)))
# 18 icon donut subs
b='';a=-math.pi/2
for i,s in enumerate([.8,.1,.1]):
    b+=arc(60,45,28,a+.05,a+s*2*math.pi-.05,S[i+3],9);a+=s*2*math.pi
b+='<circle cx="60" cy="45" r="12" fill="var(--line)"/><path d="M55 45h10M60 40v10" stroke="var(--ink)" stroke-width="2"/>'
th.append(('How much do subscriptions take?','Icon-centre donut','Savings · sub detail · ref 4',svg(b)))
# 19 goal ring
b=arc(60,45,30,-math.pi/2,1.5*math.pi-.001,'var(--line)',8)+arc(60,45,30,-math.pi/2,-math.pi/2+.42*2*math.pi,'#5bb98c',8)+'<text x="60" y="49" font-size="11" text-anchor="middle" fill="var(--ink)">42%</text>'
th.append(('How close is my goal?','Radial progress ring','Savings goal cards',svg(b)))
# 20 step line
b='<path d="M10 78 H28 V66 H46 V60 H64 V48 H78" fill="none" stroke="#5bb98c" stroke-width="2"/><path d="M78 48 L110 16" stroke="#5bb98c" stroke-dasharray="3 3" fill="none"/><line x1="10" y1="16" x2="110" y2="16" stroke="var(--mut)" stroke-dasharray="4 3"/><line x1="100" y1="10" x2="100" y2="82" stroke="#c98500"/>'
th.append(('Will I hit the goal by the date?','Contribution step-line + projection','Goal detail',svg(b)))
cards=''.join(f'<figure class="ref"><img src="{enc(i,w)}" alt="{t}" loading="lazy"><figcaption><h3>{t}</h3><p>{d}</p></figcaption></figure>' for i,t,d,w in refs)
tiles=''.join(f'<article class="tile"><div class="art">{s}</div><h4>{q}</h4><p class="form">{f}</p><p class="where">{w}</p></article>' for q,f,w,s in th)
html=open('refboard_tpl.html').read().replace('%%REFS%%',cards).replace('%%TILES%%',tiles)
open('v6_refboard.html','w').write(html);print(len(html))
