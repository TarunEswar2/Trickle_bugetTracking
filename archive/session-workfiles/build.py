import markdown,re
src=open('project_master_synthesis.md').read()
body=markdown.markdown(src,extensions=['tables'])
# wrap tables
body=body.replace('<table>','<div class="tw"><table>').replace('</table>','</table></div>')
# ids on h2
nav=[]
def h2(m):
    t=m.group(1); i='s'+str(len(nav)+1); nav.append((i,re.sub('<[^>]+>','',t))); return f'<h2 id="{i}">{t}</h2>'
body=re.sub(r'<h2>(.*?)</h2>',h2,body)
body=re.sub(r'<h1>.*?</h1>','',body,count=1)
for tag,cls in [('[P]','p'),('[S-V]','sv'),('[S-U]','su'),('[T]','t'),('[C]','c')]:
    body=body.replace(tag,f'<span class="tag {cls}">{tag[1:-1]}</span>')
navh=''.join(f'<a href="#{i}">{t}</a>' for i,t in nav)
css=open('style.css').read()
open('trickle-synthesis.html','w').write(f'''<title>Trickle Project Synthesis</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Figtree:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap">
<style>{css}</style>
<div class="wrap"><header class="top"><p class="eye">Student_Budget_Management · 70 docs · 10 Sep – 2 Oct 2026</p><h1>Trickle — Project Synthesis</h1><p class="lede">Everything the project actually knows, separated from what it assumed. Tags: <span class="tag p">P</span> primary research · <span class="tag sv">S-V</span> verified secondary · <span class="tag su">S-U</span> unverified · <span class="tag t">T</span> Tarun's decision · <span class="tag c">C</span> Claude's proposal.</p></header>
<div class="grid"><nav class="toc">{navh}</nav><main>{body}</main></div></div>''')
