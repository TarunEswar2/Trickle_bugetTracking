import re,json
md=open('/home/user/Trickle_bugetTracking/docs/claude/v14_decisions.md').read()
rows=[]
seen=set()
for line in md.split('\n'):
    m=re.match(r'^\| ((?:V\d+|O|F|D|X)-\d+[a-z]?) \| (.*) \|\s*$',line)
    if m and m.group(1) not in seen:
        seen.add(m.group(1));i=m.group(1);t=re.sub(r'\*\*|~~','',m.group(2))
        rows.append({'i':i,'t':t,'s':'delegated' if (i.startswith('D-') or i=='O-25') else 'Tarun'})
    m2=re.match(r'^\| 2 Oct \| (.*) \|\s*$',line)
    if m2:
        rows.append({'i':'C-%d'%(len([r for r in rows if r['i'].startswith('C-')])+1),'t':re.sub(r'\*\*','',m2.group(1)),'s':'Tarun'})
rows.append({'i':'V2-1','t':'What crumbles: boxes from the category\'s own 10×10 grid, no separate pile. (V2-1 to V2-5 are on the Viz 2 board.)','s':'Tarun'})
rows.append({'i':'V3-1','t':'Income split: one grid. Income splits into spending and savings; spending into budget and fixed bills; savings into goals. Spending orange (budget in category colours), income grey, savings green; savings at the bottom with a gap between the bands; the biggest five categories coloured and the rest as Other; levels revealed slowly; labels in drop-downs; V3-11 the "1 box = ₹X" chip carries visual hierarchy on every grid screen. (V3-1 to V3-11 are on the Viz 3 board.)','s':'Tarun'})
rows.append({'i':'V2-2','t':'When: the amount crumbles on the pay screen, before you confirm, and leaves a ghost of what left.','s':'Tarun'})
rows.append({'i':'V2-3','t':'How long: the ghost stays until you move to the next screen. No red, no shake.','s':'Tarun'})
rows.append({'i':'V3-11','t':'The "1 box = ₹X" scale chip carries visual hierarchy on every grid screen (not a small line).','s':'Tarun'})
order=lambda r:(r['i'][0] if r['i'][0] in 'CVOFDX' else 'Z')
def key(r):
    p=r['i'].split('-');pre=p[0];n=int(re.sub(r'\D','',p[1]))
    o={'C':0,'V1':1,'V2':2,'V3':3,'V4':4,'V5':5,'V6':6,'V7':7,'V8':8,'V9':9,'V10':10,'V11':11,'X':12,'O':13,'F':14,'D':15}.get(pre,20)
    return (o,n)
rows.sort(key=key)
shell=open('shell.html').read()
data=''.join(open(f).read()+'\n' for f in ['data_screens.js','data_flows.js','data_model.js'])
out=shell+'const DECISIONS='+json.dumps(rows,ensure_ascii=False)+';\n'+data+open('app.js').read()+'\n</script></body></html>'
open('blueprint.html','w').write(out)
print(len(rows),'decisions',len(out)//1024,'KB')
