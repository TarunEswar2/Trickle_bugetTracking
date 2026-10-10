shell=open('shell.html').read()
js=''.join(open(f).read()+'\n' for f in ['engine.js','ui_core.js','ui_a.js','ui_b.js','ui_c.js','ui_d.js','ui_e.js','ui_f.js','ui_g.js','ui15.js','ui15b.js','ui15c.js','ui15x.js','ui16.js','ui16b.js','ui16c.js','ui16d.js','ui16e.js','ui17.js','ui17b.js','ui17c.js','ui17d.js','ui17e.js','ui17f.js','ui17g.js','ui18.js','ui19.js','ui20.js','panel.js'])
open('mockup20.html','w').write(shell+js+'\n</script></body></html>')
print(len(shell+js)//1024,'KB')
