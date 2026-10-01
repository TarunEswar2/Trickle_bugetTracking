from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=__import__('glob').glob('/opt/pw-browsers/chromium*/chrome-linux*/chrome')[0])
    for f,w in [('trickle-v11-tile-system',412),('trickle-v11-tile-system',1100),('trickle-v11-tile-test',412)]:
        pg=b.new_page(viewport={'width':w,'height':900}); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto(f'file:///home/claude/v11/{f}.html'); pg.wait_for_timeout(500)
        if 'test' in f:
            pg.click('#go'); pg.click('#nx')
            for i in range(36):
                pg.locator('[data-v]').first.click(); pg.wait_for_timeout(420)
                if pg.locator('#nx').count(): pg.click('#nx')
                if pg.locator('#again').count(): break
        print(f,w,errs,pg.evaluate('document.documentElement.scrollWidth'))
        pg.screenshot(path=f'/home/claude/v11/{f}_{w}.png',full_page=True)
    b.close()
