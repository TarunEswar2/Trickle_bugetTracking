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
        t=pg.locator('#p6 .tile6')
        for i in range(4): t.nth(i).screenshot(path=f'shots/6_{n}_t{i}.png')
        pg.locator('#p6 .lgs').screenshot(path=f'shots/6_{n}_logo.png')
        pg.locator('#p6 .spls').screenshot(path=f'shots/6_{n}_spl.png')
        pg.locator('#p6 .recbox').screenshot(path=f'shots/6_{n}_rec.png')
    b.close()
