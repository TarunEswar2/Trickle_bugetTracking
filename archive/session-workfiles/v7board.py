import base64,io,math,html,re
from PIL import Image
exec(open('v7cat.py').read())
U='/root/.claude/uploads/860f62eb-517e-5d8f-84c5-65604e6e2975/'
REFS=[("d3168b82","Waffle 67%","W32 savings rate: 10×10 dots + giant %"),("9d7536cf","Pill blocks","W09 category share, W20 income mix"),("7447311e","Quarter-circle glyphs","W34 goal tiles; pool and source icons"),("41969c78","Fitness % cards","W04 category % cards"),("2a5aa968","Dashed calendar","W07 spend and W21 payday calendars; lime segmented control"),("70b9401f","2×2 insight cards","W42 grid, W14 peak hour, W01 half gauge"),("0485a569","Telecom lime card","W03 runway, W25 pool rings, W26 inbox, line tooltips"),("830d5dcf","Lime candlestick","W11 daily range bars (no trading words)"),("1c2f8b19","FreeDom gradient","W24 balance hero, W33 goal hero")]
def img(h):
    im=Image.open(U+h+'-image.png').convert('RGB'); im.thumbnail((420,420)); b=io.BytesIO(); im.save(b,'JPEG',quality=70); return 'data:image/jpeg;base64,'+base64.b64encode(b.getvalue()).decode()
L='#c6f432'; C=['#ff6b3d','#4f6bff','#ff7ac6','#1fb89a','#9b6bff','#ffb020']; G='#3a3d38'; T='#8d918a'
def th(k):
    s=[]
    if k=='gauge':
        s.append(f'<path d="M20 70 A40 40 0 0 1 100 70" stroke="{G}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M20 70 A40 40 0 0 1 82 38" stroke="{L}" stroke-width="10" fill="none" stroke-linecap="round"/><text x="60" y="68" fill="#fff" font-size="16" text-anchor="middle" font-weight="700">₹186</text>')
    elif k=='bullet':
        s.append(f'<rect x="10" y="36" width="100" height="14" rx="4" fill="{G}"/><rect x="10" y="36" width="58" height="14" rx="4" fill="{L}"/><rect x="68" y="36" width="16" height="14" fill="{L}" opacity=".3"/><rect x="72" y="28" width="2" height="30" fill="#fff"/>')
    elif k in('dotring','dotrings'):
        rs=[(60,45,28,.7)] if k=='dotring' else [(24,45,15,.8),(60,45,15,.5),(96,45,15,.3)]
        if k=='dotring': s.append(f'<rect x="16" y="4" width="88" height="82" rx="14" fill="{L}"/>')
        for cx,cy,r,f in rs:
            n=24 if k=='dotring' else 14
            for i in range(n):
                a=-math.pi/2+2*math.pi*i/n; col=('#111' if k=='dotring' else L) if i/n<f else ('#8aa62a' if k=='dotring' else G)
                s.append(f'<circle cx="{cx+r*math.cos(a):.1f}" cy="{cy+r*math.sin(a):.1f}" r="2" fill="{col}"/>')
        if k=='dotring': s.append('<text x="60" y="51" font-size="16" font-weight="700" text-anchor="middle" fill="#111">9d</text>')
    elif k=='pctcards':
        for i,(p,c) in enumerate([(.64,C[0]),(.91,C[1]),(.7,C[2])]):
            y=6+i*27; s.append(f'<rect x="8" y="{y}" width="104" height="23" rx="7" fill="{c}" opacity=".3"/><rect x="8" y="{y}" width="{104*p:.0f}" height="23" rx="7" fill="{c}"/><text x="{8+104*p-4:.0f}" y="{y+16}" font-size="11" font-weight="700" text-anchor="end" fill="#111">{int(p*100)}%</text>')
    elif k=='tiles':
        for i in range(3): s.append(f'<rect x="{6+i*37}" y="20" width="33" height="50" rx="6" fill="#23251f"/><polyline points="{10+i*37},60 {18+i*37},52 {26+i*37},57 {34+i*37},46" stroke="{L}" fill="none" stroke-width="1.5"/><text x="{22+i*37}" y="38" fill="#fff" font-size="9" text-anchor="middle">₹{[120,840,3.2][i]}{"k" if i==2 else ""}</text>')
    elif k=='dots':
        for i in range(14): s.append(f'<circle cx="{12+i*7.5:.1f}" cy="45" r="3" fill="{L if i not in (4,9) else G}"/>')
    elif k=='calendar':
        for i in range(35):
            x=14+(i%7)*15; y=12+(i//7)*15
            if i>24: s.append(f'<circle cx="{x}" cy="{y}" r="6" fill="none" stroke="{T}" stroke-dasharray="2 2"/>')
            else: s.append(f'<circle cx="{x}" cy="{y}" r="6" fill="{L if i==24 else ["#23251f","#3b4a1c","#6a8a22"][i*7%3]}"/>')
    elif k=='dumbbell':
        for i,(a,b) in enumerate([(30,70),(50,40),(20,90),(60,65)]):
            y=16+i*19; s.append(f'<line x1="{a+10}" x2="{b+10}" y1="{y}" y2="{y}" stroke="{G}" stroke-width="2"/><circle cx="{a+10}" cy="{y}" r="4" fill="{T}"/><circle cx="{b+10}" cy="{y}" r="4" fill="{C[i]}"/>')
    elif k=='pills':
        s.append(f'<rect x="10" y="6" width="10" height="28" rx="5" fill="{C[0]}"/><rect x="23" y="6" width="36" height="28" rx="14" fill="{C[2]}"/><rect x="62" y="6" width="48" height="28" rx="14" fill="{C[2]}"/><rect x="10" y="38" width="56" height="48" rx="24" fill="{C[3]}"/><rect x="70" y="38" width="18" height="22" rx="9" fill="{C[1]}"/><rect x="92" y="38" width="18" height="22" rx="9" fill="{C[1]}"/><circle cx="90" cy="75" r="12" fill="{C[1]}"/>')
    elif k=='piejar':
        a=0
        for i,f in enumerate([.35,.25,.2,.2]):
            b=a+f*2*math.pi; s.append(f'<path d="M30 45 L{30+22*math.sin(a):.1f} {45-22*math.cos(a):.1f} A22 22 0 {1 if f>.5 else 0} 1 {30+22*math.sin(b):.1f} {45-22*math.cos(b):.1f}Z" fill="{C[i]}" stroke="#171816" stroke-width="1.5"/>'); a=b
        for j in range(4):
            for m in range(4): s.append(f'<rect x="{62+j*13}" y="{16+m*16}" width="10" height="13" rx="2" fill="{C[j]}" opacity="{.25+.2*((j+m)%4)}"/>')
    elif k=='candle':
        s.append(f'<line x1="6" x2="114" y1="40" y2="40" stroke="{T}" stroke-dasharray="3 3"/>')
        for i,(lo,hi,o,c) in enumerate([(20,70,30,55),(30,60,50,40),(15,80,25,62),(35,65,45,58),(25,50,30,44),(20,75,55,35),(30,68,38,60),(40,70,50,65)]):
            x=12+i*13; col=L if c<50 else '#6b6f67'
            s.append(f'<line x1="{x}" x2="{x}" y1="{90-hi}" y2="{90-lo}" stroke="{col}"/><rect x="{x-4}" y="{90-max(o,c)}" width="8" height="{abs(o-c)}" rx="1.5" fill="{col}"/>')
    elif k=='picto':
        for r,n in enumerate([9,6,4]):
            for i in range(n): s.append(f'<circle cx="{12+i*10}" cy="{22+r*22}" r="3.5" fill="{C[r]}"/>')
    elif k=='radial':
        for h in range(24):
            a=2*math.pi*h/24-math.pi/2; v=[2,1,1,1,1,1,2,4,8,10,6,5,9,7,5,4,6,9,11,8,5,4,3,2][h]
            s.append(f'<line x1="{60+14*math.cos(a):.1f}" y1="{45+14*math.sin(a):.1f}" x2="{60+(14+v*2.6)*math.cos(a):.1f}" y2="{45+(14+v*2.6)*math.sin(a):.1f}" stroke="{L}" stroke-width="3" stroke-linecap="round"/>')
    elif k=='peak':
        s.append(f'<text x="10" y="34" fill="#fff" font-size="20" font-weight="700">6–7pm</text><path d="M6 78 L40 76 Q70 76 76 56 Q82 40 88 56 Q94 76 114 76" stroke="{C[4]}" fill="none" stroke-width="2"/><circle cx="76" cy="58" r="3" fill="#fff"/><circle cx="92" cy="66" r="3" fill="#fff"/>')
    elif k in('hist','columns'):
        vs=[10,30,55,40,25,12,6] if k=='hist' else [40,55,48,62,58,70]
        w=100/len(vs)
        for i,v in enumerate(vs): s.append(f'<rect x="{10+i*w+1:.1f}" y="{84-v}" width="{w-3:.1f}" height="{v}" rx="3" fill="{L if k=="columns" and i==len(vs)-1 else "#9aa08f" if k=="columns" else C[1]}"/>')
        if k=='columns': s.append(f'<line x1="8" x2="112" y1="30" y2="30" stroke="#fff" stroke-dasharray="3 3"/>')
    elif k=='hbars':
        for i,v in enumerate([90,64,50,34,20]): s.append(f'<rect x="10" y="{8+i*16}" width="{v}" height="10" rx="3" fill="{C[1]}"/>')
    elif k=='meter':
        s.append(f'<rect x="10" y="38" width="44" height="16" rx="4" fill="{C[4]}"/><rect x="56" y="38" width="54" height="16" rx="4" fill="{C[5]}"/><text x="10" y="30" fill="#fff" font-size="12" font-weight="700">42%</text>')
    elif k=='stackbar':
        x=10
        for i,f in enumerate([.55,.25,.2]): s.append(f'<rect x="{x}" y="38" width="{100*f-2}" height="16" rx="4" fill="{C[i+2]}"/>'); x+=100*f
        s.append('<text x="10" y="30" fill="#fff" font-size="12" font-weight="700">₹9,400</text>')
    elif k=='diverging':
        s.append(f'<line x1="6" x2="114" y1="45" y2="45" stroke="{T}"/>')
        for i,v in enumerate([25,-10,18,-22,30,-8]): s.append(f'<rect x="{12+i*17}" y="{45-max(v,0)}" width="12" height="{abs(v)}" rx="2" fill="{C[3] if v>0 else C[0]}"/>')
    elif k=='poolbar':
        s.append(f'<defs><linearGradient id="gg" x1="0" x2="1"><stop offset="0" stop-color="{L}"/><stop offset="1" stop-color="#3f5a10"/></linearGradient></defs><rect x="6" y="6" width="108" height="78" rx="14" fill="url(#gg)"/><text x="16" y="40" fill="#111" font-size="19" font-weight="800">₹8,420</text><rect x="16" y="56" width="20" height="10" rx="3" fill="#111" opacity=".4"/><rect x="38" y="56" width="42" height="10" rx="3" fill="#111"/><rect x="82" y="56" width="22" height="10" rx="3" fill="#111" opacity=".7"/>')
    elif k=='inbox':
        s.append(f'<rect x="10" y="14" width="100" height="62" rx="14" fill="{L}"/><text x="20" y="38" fill="#111" font-size="10">To assign</text><text x="20" y="58" fill="#111" font-size="15" font-weight="800">₹2,000</text><rect x="84" y="24" width="20" height="14" rx="9" fill="#111"/>')
    elif k=='stackarea':
        s.append(f'<path d="M6 84 L6 60 Q40 50 60 55 T114 45 L114 84Z" fill="{C[3]}"/><path d="M6 60 Q40 50 60 55 T114 45 L114 32 Q80 30 60 38 T6 44Z" fill="{C[1]}"/><path d="M6 44 Q30 36 60 38 T114 32 L114 22 Q80 20 60 28 T6 36Z" fill="{L}"/><line x1="80" x2="80" y1="10" y2="84" stroke="#fff" stroke-dasharray="2 2"/>')
    elif k=='sankey':
        for i,(y1,h1) in enumerate([(10,30),(44,16),(64,20)]): s.append(f'<rect x="8" y="{y1}" width="6" height="{h1}" rx="2" fill="{C[i+2]}"/>')
        for i,(y1,h1,c) in enumerate([(10,20,L),(34,40,C[1]),(78,8,C[3])]): s.append(f'<rect x="56" y="{y1}" width="6" height="{h1}" rx="2" fill="{c}"/><path d="M14 {12+i*28} C35 {12+i*28} 35 {y1+h1/2} 56 {y1+h1/2}" stroke="{c}" stroke-width="{h1/2.5:.0f}" fill="none" opacity=".45"/>')
        for i in range(4): s.append(f'<rect x="104" y="{36+i*10}" width="6" height="8" rx="2" fill="{C[i]}"/><path d="M62 {40+i*7} C82 {40+i*7} 82 {40+i*10} 104 {40+i*10}" stroke="{C[i]}" stroke-width="3" fill="none" opacity=".5"/>')
    elif k in('line','stepline'):
        p="10,70 30,60 50,64 70,44 90,38" if k=='line' else "10,76 30,76 30,62 55,62 55,50 75,50 75,40"
        s.append(f'<polyline points="{p}" stroke="#fff" fill="none" stroke-width="2"/><line x1="{90 if k=="line" else 75}" y1="{38 if k=="line" else 40}" x2="112" y2="{22}" stroke="{L}" stroke-dasharray="3 3" stroke-width="2"/><line x1="70" x2="70" y1="10" y2="84" stroke="{L}"/><circle cx="70" cy="{44 if k=="line" else 50}" r="4" fill="{L}"/>')
        if k=='stepline': s.append(f'<line x1="8" x2="114" y1="22" y2="22" stroke="{T}" stroke-dasharray="2 3"/>')
    elif k=='list':
        for i in range(3): s.append(f'<circle cx="18" cy="{20+i*25}" r="8" fill="none" stroke="{C[i]}" stroke-width="3"/><rect x="32" y="{16+i*25}" width="50" height="7" rx="3" fill="#3d403a"/><rect x="88" y="{13+i*25}" width="24" height="13" rx="6" fill="{L if i==0 else "#2a2c28"}"/>')
    elif k=='waffle':
        for i in range(100): s.append(f'<circle cx="{44+(i%10)*7.2:.1f}" cy="{12+(i//10)*7.2:.1f}" r="3" fill="{C[4] if i<67 else L}"/>')
        s.append('<text x="4" y="52" fill="#fff" font-size="15" font-weight="800">67%</text>')
    elif k=='bigpct':
        s.append(f'<defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2d3a12"/><stop offset="1" stop-color="#151612"/></linearGradient></defs><rect x="4" y="4" width="112" height="82" rx="14" fill="url(#g2)"/><text x="12" y="22" fill="#cfd3c8" font-size="9">Goa trip · ₹12,000</text><text x="10" y="70" fill="{L}" font-size="42" font-weight="800">60%</text>')
    elif k=='glyph':
        for j,(c,q) in enumerate([(C[4],3),(C[3],2),(C[5],4)]):
            x0=8+j*38; y0=26; r=16
            quads=[(x0+16,y0+16,'M{0} {1} L{0} {2} A16 16 0 0 0 {3} {1}Z')]
            for qi in range(4):
                cx=x0+16; cy=y0+16; dx=[-1,1,-1,1][qi]; dy=[-1,-1,1,1][qi]
                col=c if qi<q else '#2a2c28'
                s.append(f'<path d="M{cx} {cy} L{cx+dx*r} {cy} A{r} {r} 0 0 {0 if dx*dy<0 else 1} {cx} {cy+dy*r}Z" fill="{col}"/>')
            s.append(f'<rect x="{x0}" y="{y0}" width="32" height="32" fill="none" stroke="#555" stroke-width=".6"/>')
    elif k=='grid4':
        for i in range(4):
            x=8+(i%2)*54; y=6+(i//2)*42; s.append(f'<rect x="{x}" y="{y}" width="50" height="38" rx="8" fill="#23251f"/><text x="{x+6}" y="{y+18}" fill="#fff" font-size="11" font-weight="700">{["+12%","5pm","₹84","3d"][i]}</text><rect x="{x+6}" y="{y+26}" width="{[30,20,36,14][i]}" height="4" rx="2" fill="{L if i==0 else C[i]}"/>')
    return f'<svg viewBox="0 0 120 90" role="img" aria-label="{k} thumbnail">'+''.join(s)+'</svg>'
tabn={'H':'Home','M':'Money','S':'Savings','I':'Insights','H→F':'Home detail'}
cards=''.join(f'<article class="w {w[4]}"><div class="th">{th(w[9])}</div><div class="meta"><span class="id">{w[0]} · {w[4]}</span><span class="tab t{w[6][0]}">{tabn.get(w[6],w[6])}</span>{"<span class=pin>pinned</span>" if w[7].startswith(("Yes","Auto")) else ""}</div><h4>{html.escape(w[1])}</h4><p>{html.escape(w[2])}</p><p class="f">{html.escape(w[3])}</p><p class="r">Empty rule: {html.escape(w[8])}</p></article>' for w in W)
refs=''.join(f'<figure><img src="{img(h)}" alt="{n}"><figcaption><b>{n}</b>{m}</figcaption></figure>' for h,n,m in REFS)
aud=[("Pace bullet + safe-to-spend gauge","v5–v6, X","Keep","Home"),("Category rows / envelopes","v5–v6, X","Keep as bold % cards","Home + Money"),("Heatmap + range + diverging + compared-to-usual","X, v5, v6","Merge into one calendar","Insights"),("Donut categories + radial arcs","v2–v6","Merge into pill blocks / % cards","Insights"),("Sankey spend → categories","R, v5, v6","Merge; income is now the source","Money"),("Pie + fill jars","v6","Keep","Insights"),("24h radial + part-of-day gauges","R, v5, v6","Merge as a toggle","Insights"),("Subs donut / calendar / text","v2–v6","Merge into Home card + detail","Home"),("Goal ring + step-line","R, v4–v6","Keep + big % hero","Savings"),("Friction bullet + manual live bullet","v2–v6","Keep + cover options","Pay flow"),("Metaphor charts (iceberg, mountain, road, coin stack, conveyor)","R","Drop","—"),("Radar, bubbles, scatter, 2-slice donut, waffle small-ticket","v5","Drop","—"),("Owe/owed split circles","X","Drop (out of scope)","—"),("Notification-access auto-detect copy","X","Drop (breaks no-SMS rule)","—")]
arow=''.join(f'<tr><td>{a}</td><td>{b}</td><td><span class="v {c.split()[0].rstrip(chr(59)).lower()}">{c}</span></td><td>{d}</td></tr>' for a,b,c,d in aud)
tpl=open('v7tpl.html').read()
open('trickle-v7-research-board.html','w').write(tpl.replace('%REFS%',refs).replace('%CARDS%',cards).replace('%AUD%',arow).replace('%N%',str(len(W))))
