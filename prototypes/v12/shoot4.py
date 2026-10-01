from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=None)
    for w,n,cs in [(1200,'d','light'),(400,'m','dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},color_scheme=cs); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file:///home/claude/v12/board.html');pg.wait_for_timeout(600)
        print(n,errs,pg.evaluate('document.documentElement.scrollWidth'))
        bl=pg.locator('#p4 > .block')
        for k in range(bl.count()): bl.nth(k).screenshot(path=f'shots/4_{n}_{k}.png')
    b.close()
