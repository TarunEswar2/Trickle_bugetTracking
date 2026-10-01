css=open('style.css').read()
js=''.join(open(f).read()+'\n' for f in ['ledger.js','ui.js','app.js','flows.js','rhythm.js'])
html='''<title>Trickle — v8</title>
<meta name="description" content="Clickable prototype of Trickle v8, a tile-based UPI student budgeting app.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&family=Fraunces:opsz,wght@9..144,500&display=swap">
<style>'''+css+'''</style>
<main class="phone" id="app" aria-label="Trickle prototype"></main>
<div id="inv" data-ok=""></div>
<script>
'''+js+'''
(function boot(){if(location.hash==='#demo'){A.skip();}else render();})();
</script>
'''
open('trickle-final-v8.html','w').write(html)
open('t8.html','w').write('<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+html+'</body></html>')
open('all.js','w').write(js)
