import os
d=os.path.dirname(os.path.abspath(__file__))
r=lambda f:open(os.path.join(d,f)).read()
js='\n'.join(r(f) for f in ['data.js','ledger.js','charts.js','charts2.js','core.js','onb.js','onb2.js','widgets.js','home.js','actions.js','pay.js','money.js','savings.js','insights.js','settings.js','boot.js'])
open(os.path.join(d,'all.js'),'w').write(js)
h=r('shell.html').replace('/*CSS*/',r('style.css')).replace('/*JS*/',js)
open(os.path.join(d,'..','trickle-final-v7.html'),'w').write(h)
print(len(h))
