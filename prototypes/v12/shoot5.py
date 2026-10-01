from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=None)
    for w,n,cs in [(1200,'d','light'),(400,'m','dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},color_scheme=cs); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file:///home/claude/v12/board.html');pg.wait_for_timeout(600)
        print(n,errs,pg.evaluate('document.documentElement.scrollWidth'))
        pg.locator('#p5 > .block').nth(0).screenshot(path=f'shots/5_{n}_sum.png')
        for f in ['f1','f4','f9']: pg.locator('#'+f).screenshot(path=f'shots/5_{n}_{f}.png')
    b.close()
