import base64
shell=open('shell.html').read()
js=''.join(open(f).read()+'\n' for f in ['i1.js','i2.js','i3.js'])
def b64(p):return 'data:image/webp;base64,'+base64.b64encode(open(p,'rb').read()).decode()
js=js.replace('__IMGM__',b64('ref-instrument-moodboard.webp'))
open('design-system-instrument.html','w').write(shell+js+'\n</script></body></html>')
print(len(shell+js)//1024,'KB')
