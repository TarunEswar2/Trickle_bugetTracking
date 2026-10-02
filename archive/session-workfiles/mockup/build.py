shell=open('shell.html').read()
js=''.join(open(f).read()+'\n' for f in ['engine.js','ui_core.js','ui_a.js','ui_b.js','ui_c.js','panel.js'])
open('mockup.html','w').write(shell+js+'\n</script></body></html>')
print(len(shell+js)//1024,'KB')
