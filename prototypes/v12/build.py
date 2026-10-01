import io,base64,html,collections,re
exec(open('inv.py').read()); exec(open('crops.py').read())
from PIL import Image
for t in T:
    if t['tb']=='v8tx': t['tb']='v9tx'
extra={'v7dumb':'This vs last month by jar','v7owed':'Remind (share message)','v7home':'Safe to spend today'}
VC=['Lo','Ex','2','3','4','5','6','7','8','9','10','11']
def vers(s):
    out=set()
    for tok in s.split(','):
        tok=tok.strip(); base=re.sub(r'\(.*?\)','',tok).strip()
        if 'Lo' in tok: out.add('Lo'); continue
        if 'Expl' in tok or 'redesign' in tok: out.add('Ex'); continue
        m=re.match(r'(\d+)\s*-\s*(\d+)',base)
        if m: out|={str(i) for i in range(int(m[1]),int(m[2])+1)}; continue
        m=re.match(r'(\d+)',base)
        if m: out.add(m[1])
    return out
for t in T:
    t['vs']=vers(t['v'])
    if t['h'] in 'YP': t['vs'].add('11')
    if t['h']=='N': t['vs'].discard('11')
# thumbs
TH={}
for k,(f,b,l) in C.items():
    im=Image.open(f).convert('RGB'); im=im.crop(b) if b else im
    im.thumbnail((320,400)); bio=io.BytesIO(); im.save(bio,'JPEG',quality=72)
    TH[k]=(base64.b64encode(bio.getvalue()).decode(),l,im.size)
byname={t['n']:t for t in T}
gal=[]
for k in C:
    it=[t for t in T if t['tb']==k] or ([byname[extra[k]]] if k in extra else [])
    gal.append((k,it[0] if it else None))
E=html.escape
themes=list(dict.fromkeys(t['th'] for t in T))
cnt=collections.Counter(t['r'] for t in T)
ret=[t for t in T if t['h']!='Y' and t['r']=='MUST']
nice=[t for t in T if t['r']=='NICE']
DEP={'G':'Glance','E':'Explore','D':'Detail','-':'—'}
HV={'Y':'Kept','P':'Partial','N':'Dropped'}
# ---------- markdown
md=['# Trickle v12 — Phase 1: Recovery audit\n',
'Sources: v11_phase1_audit, build notes v6–v11, v7 widget catalogue, v9 spec, v11 viz + execution docs; builds v2–v11 opened in Playwright (412×860, `#demo`); new element shots of all 8 visible v9 Insights widgets plus crops of v7 Insights, v6 subscription detail and the v11 audit shots. Constraint held: UPI link or manual entry only; the lo-fi SMS screen is listed only as a NO.\n',
f'## Counts\n- Items inventoried: **{len(T)}** (kept in v11: {sum(t["h"]=="Y" for t in T)}, partial: {sum(t["h"]=="P" for t in T)}, dropped: {sum(t["h"]=="N" for t in T)})\n- Recommendation: **MUST {cnt["MUST"]}** ({sum(t["h"]=="Y" and t["r"]=="MUST" for t in T)} already in v11 + **{len(ret)} to bring back**), **NICE {cnt["NICE"]}**, **NO {cnt["NO"]}**\n- Depth for returning MUSTs: Glance {sum(t["d"]=="G" for t in ret)}, Explore {sum(t["d"]=="E" for t in ret)}, Detail {sum(t["d"]=="D" for t in ret)}\n',
'## Principle for returning items\nNothing returns to Home as a number. Glance = a Home card or a moment that needs no reading; Explore = one tap (a card on Insights, a section on Money, a sheet); Detail = two taps or Settings. A returning insight must answer one question a student actually asks, and use the ₹100 tile, a word, or a position (calendar/time) — never a new chart vocabulary.\n',
'## Why v11 lost so much\n1. The v11 rebuild started from the core loop (pay, glance, income, save) and stopped there: Actions tab, transactions list and goal detail were never rebuilt, not rejected.\n2. Every widget that could not be drawn in ₹100 tiles was cut (time of day, month-by-month, ETA).\n3. Editing (jars, periods, income sources, savings share) was folded into a 4-tap setup with no way back.\n4. Some cuts were deliberate and stay cut: numbers on Home, red, cover sheets, streaks, sliders, chart-library breadth.\n']
for th in themes:
    md.append(f'\n## {th}\n| # | Item | Versions | Question it answers | v11 | Why dropped | Cost | Rec | Depth | Reason |\n|---|---|---|---|---|---|---|---|---|---|')
    for t in T:
        if t['th']==th:
            md.append(f"| {T.index(t)+1} | {t['n']} | {t['v']} | {t['val']} | {HV[t['h']]} | {t['why'] or '—'} | {t['c']} | **{t['r']}** | {DEP[t['d']]} | {t['rs']} |")
QS=[
('Q1','Where does the All spends list live?',['A · Money › "All spends" row (list + filters + spend detail)','B · Inside each jar only','C · Search from Insights'],'A','Trust needs one plain list; Money already holds the numbers, Home stays clean.'),
('Q2','Can Home gain one calm fact card: "Next money in · Allowance in 9 days"?',['A · Yes, default Home card (no ₹ until tap)','B · Library only','C · No'],'A','A date, not a budget; it reduces anxiety near month end without breaking the no-budget rule.'),
('Q3','How do comparison insights return (this vs last month by jar, month by month, top places)?',['A · One "What changed" card on Insights: words + tile rows, month-by-month one tap deeper','B · Three separate library cards','C · Keep them out'],'A','One card, one question; depth carries the long view.'),
('Q4','How much editing comes back?',['A · Edit jars (add/rename/amount), weekly or payday period, savings share, income sources — all in Money/Settings','B · Only jar amounts','C · None; setup again to change'],'A','Real students differ from the 5 starter jars; editing lives one layer down so Home is untouched.'),
('Q5','Do the v9 deep views (Sankey flow, spend range, time of day) return?',['A · Yes, in an Insights library, not on the default board','B · Sankey only, as the month-story card','C · No'],'A','They were liked as discovery views; library keeps the default board at 3–4 cards.'),
('Q6','Should one "for you" card return (sort an unknown payment, settle a split, renewal tomorrow)?',['A · Yes, max one at a time on Home, no badge or count','B · Only as notifications','C · No'],'A','Unsorted payments silently break every insight; one card keeps the one-decision rule.'),
]
md.append('\n## Questions for Tarun (Phase 1 decisions)\n')
for q,txt,opts,rec,why in QS:
    md.append(f'**{q}. {txt}**\n'+'\n'.join('- '+o for o in opts)+f'\n- Recommendation: **{rec}** — {why}\n')
md.append('\n## Implications for Phase 2+\n- Phase 2 tiles must cover: per-place repeat rows, yearly-cost 12-cell strip, ETA dot path, savings growing columns, what-changed rows.\n- Phase 3 library: Sankey, range, time of day, calendar marks for subscriptions, goal ETA, month-by-month.\n- Phase 4 IA must place: All spends list, edit points, one "for you" card, library.\n')
open('v12_phase1_recovery.md','w').write('\n'.join(md))
dec=['# Trickle v12 — Decisions log\n','Format: one row per decision. Status: open / decided / changed. Record Tarun\'s answer verbatim where possible.\n',
'## Phase 1 — Recovery audit\nSource: claude/v12_phase1_recovery.md · Board: "Trickle v12 — Decision Board", Phase 1 section.\n','| # | Question | Options | Recommended | Tarun\'s answer | Status | Date |','|---|---|---|---|---|---|---|']
for q,txt,opts,rec,why in QS: dec.append(f"| {q} | {txt} | {' / '.join(o.split(' · ')[0]+': '+o.split(' · ')[1] for o in opts)} | {rec} | | open | |")
dec.append('\nAlso confirm: the MUST / NICE / NO list in v12_phase1_recovery.md (any item to move up or down).\n')
for p in ['Phase 2 — Tile exploration','Phase 3 — Insight & visualization library','Phase 4 — Information architecture','Phase 5 — Core flows','Phase 6 — Visual identity','Phase 7 — Retention & emotional design','Phase 8 — Build plan','Phase 12 — Sounds & animations']:
    dec.append(f'## {p}\n| # | Question | Options | Recommended | Tarun\'s answer | Status | Date |\n|---|---|---|---|---|---|---|\n')
open('v12_decisions.md','w').write('\n'.join(dec))
# ---------- HTML
def pill(r): return f'<span class="rec r-{r.lower()}">{r}</span>'
rows=[]
for th in themes:
    items=[t for t in T if t['th']==th]
    rows.append(f'<tr class="th"><th colspan="{len(VC)+2}" scope="colgroup">{E(th)} <span>{len(items)}</span></th></tr>')
    for t in items:
        cells=''.join(f'<td class="c{" on" if v in t["vs"] else ""}{" v11" if v=="11" else ""}">{"<i></i>" if v in t["vs"] else ("<b title=dropped></b>" if v=="11" and t["h"]=="N" else "")}</td>' for v in VC)
        rows.append(f'<tr class="h-{t["h"]} rr-{t["r"].lower()}" data-th="{E(th)}"><th scope="row">{E(t["n"])}</th>{cells}<td>{pill(t["r"])}</td></tr>')
matrix='\n'.join(rows)
rec_rows=[]
for th in themes:
    rec_rows.append(f'<tr class="th"><th colspan="6">{E(th)}</th></tr>')
    for t in T:
        if t['th']==th:
            rec_rows.append(f'<tr class="h-{t["h"]} rr-{t["r"].lower()}"><td class="nm">{E(t["n"])}<small>{E(t["val"])}</small></td><td><span class="st st-{t["h"]}">{HV[t["h"]]}</span></td><td>{pill(t["r"])}</td><td class="dp">{DEP[t["d"]]}</td><td class="cst">{t["c"]}</td><td class="why">{E(t["rs"])}{(" <em>Dropped: "+E(t["why"])+"</em>") if t["why"] else ""}</td></tr>')
gl=[]
for k,it in gal:
    b,l,(w,h)=TH[k]
    tag=(pill(it['r'])+f'<span class="dp2">{DEP[it["d"]]}</span>') if it else ''
    nm=E(it['n']) if it else ''
    gl.append(f'<figure><div class="img"><img src="data:image/jpeg;base64,{b}" width="{w}" height="{h}" alt="{E(l)}" loading="lazy"></div><figcaption><b>{E(l)}</b><span>{nm}</span><div class="tags">{tag}</div></figcaption></figure>')
top=[t for t in ret]
order={'G':0,'E':1,'D':2}
top_sorted=sorted(top,key=lambda t:(order[t['d']],t['c']))
qhtml=[]
for q,txt,opts,rec,why in QS:
    ol=''.join(f'<li class="{"pick" if o.startswith(rec) else ""}">{E(o)}</li>' for o in opts)
    qhtml.append(f'<article class="q"><div class="qid">{q}</div><h3>{E(txt)}</h3><ul>{ol}</ul><p class="qr"><b>Recommend {rec}.</b> {E(why)}</p></article>')
phases=['1 Recovery audit','2 Tile exploration','3 Insight library','4 Information architecture','5 Core flows','6 Visual identity','7 Retention','8 Build plan','12 Sound & motion']
tpl=open('board_tpl.html').read()
out=(tpl.replace('%%MATRIX%%',matrix).replace('%%REC%%','\n'.join(rec_rows)).replace('%%GAL%%','\n'.join(gl)).replace('%%Q%%','\n'.join(qhtml))
 .replace('%%VH%%',''.join(f'<th class="vh{" v11" if v=="11" else ""}" scope="col">{"v"+v if v.isdigit() else v}</th>' for v in VC))
 .replace('%%N%%',str(len(T))).replace('%%MUST%%',str(cnt['MUST'])).replace('%%NICE%%',str(cnt['NICE'])).replace('%%NO%%',str(cnt['NO']))
 .replace('%%RET%%',str(len(ret))).replace('%%KEPT%%',str(sum(t['h']=='Y' for t in T))).replace('%%DROP%%',str(sum(t['h']!='Y' for t in T)))
 .replace('%%THEMES%%',''.join(f'<button type="button" data-f="{E(th)}">{E(th)}</button>' for th in themes))
 .replace('%%PH%%',''.join(f'<a href="#p{p.split()[0]}" class="{"now" if p.startswith("1 ") else ""}">{E(p)}</a>' for p in phases))
 .replace('%%LATER%%',''.join(f'<section class="later" id="p{p.split()[0]}"><h2><span>Phase {p.split()[0]}</span> {E(" ".join(p.split()[1:]))}</h2><p>Opens after Phase 1 decisions are logged.</p></section>' for p in phases[1:]))
 .replace('%%TOP%%',''.join(f'<li><span class="dp3 d-{t["d"]}">{DEP[t["d"]]}</span><b>{E(t["n"])}</b><small>{E(t["val"])}</small></li>' for t in top_sorted)))
open('board.html','w').write(out)
print(len(out)/1e6,'MB', len(ret))
for t in top_sorted: print(t['d'],t['n'])
