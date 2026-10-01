import sys
from playwright.sync_api import sync_playwright
S='/tmp/claude-0/-home-claude/860f62eb-517e-5d8f-84c5-65604e6e2975/scratchpad/'
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=None)
    for name,f in [('v9',S+'trickle-final-v9.html'),('v11','/home/claude/v11/app/trickle-final-v11.html'),('v7',S+'trickle-final-v7.html')]:
        pg=b.new_page(viewport={'width':412,'height':860})
        pg.goto('file://'+f+'#demo');pg.wait_for_timeout(1500)
        print(name, pg.evaluate("""[...document.querySelectorAll('[data-a],[data-tab],nav button')].slice(0,60).map(e=>(e.dataset.a||e.dataset.tab||'')+':'+e.textContent.trim().slice(0,20)).join(' | ')"""))
    b.close()
