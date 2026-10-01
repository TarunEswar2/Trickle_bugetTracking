from playwright.sync_api import sync_playwright
import glob
exe=glob.glob('/opt/pw-browsers/chromium*/chrome-linux/chrome')[0]
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=exe)
    for w,n,cs in [(1200,'d','light'),(400,'m','dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},color_scheme=cs); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file:///home/claude/v12/board.html');pg.wait_for_timeout(1500)
        print(n,errs,pg.evaluate('document.documentElement.scrollWidth'))
        bl=pg.locator('#p7 > .block')
        for i in range(bl.count()): bl.nth(i).screenshot(path=f'shots/7_{n}_{i}.png')
    b.close()
