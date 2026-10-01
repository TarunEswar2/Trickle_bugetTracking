import re
css=open('style.css').read()
js=''.join(open(f).read()+'\n' for f in ['store.js','dots.js','app.js','screens1.js','screens2.js','screens3.js','actions.js'])
html='''<title>Trickle — v12</title>
<meta name="description" content="Clickable prototype of Trickle v12, a UPI student budgeting app where one dot is always ₹100.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@500&display=swap">
<style>'''+css+'''</style>
<div class="stage"><main class="phone" id="app" aria-label="Trickle prototype"></main></div>
<script>
'''+js+'''
S.ob.t0=Date.now();window.addEventListener('hashchange',function(){boot();});boot();
</script>
'''
open('trickle-final-v12.html','w').write(html)
open('t12.html','w').write('<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>'+html+'</body></html>')
open('all.js','w').write(js)
print(len(html))
