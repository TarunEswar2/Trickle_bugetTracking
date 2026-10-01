from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,n,cs in [(1200,'d','light'),(400,'m','dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},color_scheme=cs,device_scale_factor=1.5); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file:///home/claude/v12/board.html');pg.wait_for_timeout(800)
        print(n,errs,pg.evaluate('document.documentElement.scrollWidth'))
        pg.locator('#p2c .mcs').screenshot(path=f'shots/2c_{n}.png')
    b.close()
