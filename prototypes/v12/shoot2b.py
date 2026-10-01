from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=None)
    for w,n,cs in [(1200,'d','light'),(400,'m','dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},color_scheme=cs); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file:///home/claude/v12/board.html');pg.wait_for_timeout(800)
        print(n,errs,pg.evaluate('document.documentElement.scrollWidth'),pg.evaluate('window.__MX'))
        for i,el in enumerate(pg.locator('#rsys article').all()):
            if n=='d' or i in (0,3): el.screenshot(path=f'shots/2b_{n}_{i}.png')
        pg.locator('#p2b .pg').screenshot(path=f'shots/2b_{n}_pg.png')
        if n=='d':
            pg.click('[data-look2=bw]'); pg.locator('#o-R4').screenshot(path='shots/2b_bw.png')
            pg.click('[data-sz="2.3"]'); pg.locator('#o-R4').screenshot(path='shots/2b_big.png')
            pg.locator('#p2b .sm3').screenshot(path='shots/2b_mx.png')
    b.close()
