import os
d=os.path.dirname(os.path.abspath(__file__))
r=lambda f:open(os.path.join(d,f)).read()
js='\n'.join(r(f) for f in ['data.js','charts.js','core.js','onb.js','home.js','cats.js','pay.js','insights.js','savings.js','settings.js','boot.js'])
open(os.path.join(d,'all.js'),'w').write(js)
h=r('shell.html').replace('/*CSS*/',r('style.css')).replace('/*JS*/',js)
open(os.path.join(d,'..','trickle-final-v6.html'),'w').write(h)
print(len(h))
