from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,n,cs in [(1200,'d','light'),(400,'m','dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},color_scheme=cs); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file:///home/claude/v12/board.html');pg.wait_for_timeout(500)
        print(n,errs,pg.evaluate('document.documentElement.scrollWidth'))
        cards=pg.locator('#p3 .ic'); 
        for k in range(cards.count()): cards.nth(k).screenshot(path=f'shots/3_{n}_{k:02d}.png')
        pg.locator('#p3 .dsets').screenshot(path=f'shots/3_{n}_defs.png')
    b.close()
