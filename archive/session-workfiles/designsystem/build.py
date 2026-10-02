import base64
shell=open('shell.html').read()
js=''.join(open(f).read()+'\n' for f in ['ds1.js','ds2.js','ds3.js'])
def b64(p):return 'data:image/webp;base64,'+base64.b64encode(open(p,'rb').read()).decode()
js=js.replace('__IMG20__',b64('ref-purple-goals-app.webp')).replace('__IMG21__',b64('ref-tarun-figma-colour-sheet.webp'))
open('design-system.html','w').write(shell+js+'\n</script></body></html>')
print(len(shell+js)//1024,'KB')
