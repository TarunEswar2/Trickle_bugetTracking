import json,re,subprocess,collections,os
JARGON=['plan','income','split','buffer','reserve','pace','category','categories','subscription','subscriptions','limit','limits','gauge','box','boxes','ghost','savings','goal','goals','fixed','hotspot','one-off','unsorted','detected','link','upi','budget','weekly','ledger','cascade','allocate','balance','recap','pop-up','sync','mandate']
def words(s): return len(re.findall(r"[A-Za-z0-9₹'’\-]+",s))
def flags(s):
    f=[j for j in JARGON if re.search(r'\b'+re.escape(j)+r'\b',s,re.I)]
    return f
def table_for(path,only_titles=False):
    d=json.load(open(path));out=[]
    for st in d:
        strs=st['titles'] if only_titles else (st['view']+st['layer'])
        seen=[];[seen.append(x) for x in strs if x not in seen]
        out.append((st,seen))
    return out
# --- v15 per-string table
t15=table_for('copy15.json')
L=['| State | String | Words | Jargon terms |','|---|---|---|---|']
rows15=[]
for st,strs in t15:
    for s in strs:
        if re.fullmatch(r'[\d₹.,\s×‹›·|⚙ⓘ+−-]+',s):continue
        rows15.append((st['id'],st['name'],s,words(s),flags(s)))
for i,n,s,w,f in rows15:
    L.append(f"| {i} {n} | {s.replace('|','/')} | {w} | {', '.join(f)} |")
open('gen/copy15_table.md','w').write('\n'.join(L)+'\n')
# --- v14 titles and questions
t14=table_for('copy14.json',True)
L=['| State | Title or question | Words | Jargon terms |','|---|---|---|---|']
n14=0
for st,strs in t14:
    for s in strs:
        L.append(f"| {st['id']} {st['name']} | {s.replace('|','/')} | {words(s)} | {', '.join(flags(s))} |");n14+=1
open('gen/titles14.md','w').write('\n'.join(L)+'\n')
# --- stats
def stats(path):
    d=json.load(open(path));allstr=[];titles=[]
    for st in d:
        seen=[];[seen.append(x) for x in st['view']+st['layer'] if x not in seen]
        allstr+= [s for s in seen if not re.fullmatch(r'[\d₹.,\s×‹›·|⚙ⓘ+−-]+',s)]
        titles+=st['titles']
    ws=[words(s) for s in allstr]
    cnt=collections.Counter()
    for s in allstr:
        for j in flags(s):cnt[j.lower()]+=1
    tw=[words(t) for t in titles]
    return dict(n_states=len(d),n_strings=len(allstr),unique=len(set(allstr)),avg=sum(ws)/len(ws),over8=sum(1 for w in ws if w>8)/len(ws),titles=len(titles),title_avg=sum(tw)/max(1,len(tw)),title_over8=sum(1 for w in tw if w>8),cnt=cnt)
s14=stats('copy14.json');s15=stats('copy15.json')
L=['| Measure | v14 (116 states) | v15 (55 core states) |','|---|---|---|']
L.append(f"| Visible text strings (excluding bare numbers) | {s14['n_strings']} | {s15['n_strings']} |")
L.append(f"| Strings per state | {s14['n_strings']/s14['n_states']:.1f} | {s15['n_strings']/s15['n_states']:.1f} |")
L.append(f"| Average words per string | {s14['avg']:.1f} | {s15['avg']:.1f} |")
L.append(f"| Strings longer than 8 words | {s14['over8']*100:.0f}% | {s15['over8']*100:.0f}% |")
L.append(f"| Titles and questions | {s14['titles']} | {s15['titles']} |")
L.append(f"| Average words in a title or question | {s14['title_avg']:.1f} | {s15['title_avg']:.1f} |")
L.append(f"| Titles or questions longer than 8 words (the project's own rule, B-10) | {s14['title_over8']} | {s15['title_over8']} |")
open('gen/copy_stats.md','w').write('\n'.join(L)+'\n')
terms=sorted(set(s14['cnt'])|set(s15['cnt']),key=lambda k:-(s14['cnt'].get(k,0)+s15['cnt'].get(k,0)))
L=['| Term the user must understand | Strings in v14 | Strings in v15 |','|---|---|---|']
for t in terms:L.append(f"| {t} | {s14['cnt'].get(t,0)} | {s15['cnt'].get(t,0)} |")
open('gen/jargon.md','w').write('\n'.join(L)+'\n')
# --- screen inventories
def inv(path):
    d=json.load(open(path))
    L=['| ID | Section | Screen | Words | ₹ values | Taps | Phone-heights |','|---|---|---|---|---|---|---|']
    for r in d['rows']:
        L.append(f"| {r['id']} | {r['sec']} | {r['name']} | {r['words']} | {r['money']} | {r['acts']} | {r['screens']} |")
    return '\n'.join(L)+'\n'
open('gen/screens14.md','w').write(inv('v14.json'));open('gen/screens15.md','w').write(inv('v15.json'))
# --- git timeline
log=subprocess.check_output(['git','log','--reverse','--format=%h|%ad|%s','--date=format:%Y-%m-%d %H:%M'],cwd='../../..').decode().strip().split('\n')
L=['| Commit | When (UTC) | What |','|---|---|---|']
for l in log:
    h,d,s=l.split('|',2);L.append(f"| {h} | {d} | {s.replace('|','/')} |")
open('gen/git_timeline.md','w').write('\n'.join(L)+'\n')
print(len(rows15),n14,len(log),{k:v for k,v in s14.items() if k!='cnt'},{k:v for k,v in s15.items() if k!='cnt'})
