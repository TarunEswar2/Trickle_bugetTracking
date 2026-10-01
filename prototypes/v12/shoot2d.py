from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,n,cs in [(1200,'d','light'),(400,'m','dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},color_scheme=cs,device_scale_factor=1); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file:///home/claude/v12/board.html');pg.wait_for_timeout(800)
        print(n,errs,pg.evaluate('document.documentElement.scrollWidth'))
        if n=='d':
            pg.click('#p2d .pay .btn'); pg.click('#p2d .chai .btn'); pg.click('#p2d .chai .btn'); pg.wait_for_timeout(700)
        pg.locator('#p2d').screenshot(path=f'shots/2d_{n}.png')
    b.close()
