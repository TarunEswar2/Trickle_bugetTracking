css=open('style.css').read()
js=''.join(open(f).read()+'\n' for f in ['store.js','tiles.js','sound.js','app.js'])
html='''<title>Trickle — v11</title>
<meta name="description" content="Clickable prototype of Trickle v11, a UPI student budgeting app where one tile is always ₹100.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap">
<style>'''+css+'''</style>
<main class="phone" id="app" aria-label="Trickle prototype"></main>
<script>
'''+js+'''
(function boot(){if(location.hash==='#demo'){A.skip();}else render();})();
</script>
'''
open('trickle-final-v11.html','w').write(html)
open('t11.html','w').write('<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>'+html+'</body></html>')
open('all.js','w').write(js)
