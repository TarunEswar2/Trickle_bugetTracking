from playwright.sync_api import sync_playwright
import sys
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,n,cs in [(1200,'d','light'),(400,'m','dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},color_scheme=cs); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file:///home/claude/v12/board.html');pg.wait_for_timeout(500)
        print(n,errs,pg.evaluate('document.documentElement.scrollWidth'))
        pg.emulate_media(reduced_motion='reduce')
        for k in ['md','dl','gc','bg','hg','ts']:
            pg.click(f'#t2e-{k}'); pg.wait_for_timeout(100)
            pg.locator(f'#p2e-{k}').screenshot(path=f'shots/2e_{n}_{k}.png')
        pg.locator('#p2e .cupc').screenshot(path=f'shots/2e_{n}_cup.png')
    b.close()
