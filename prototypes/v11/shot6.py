from playwright.sync_api import sync_playwright
import glob
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=glob.glob('/opt/pw-browsers/chromium*/chrome-linux*/chrome')[0])
    for w,cs in [(1200,'dark'),(412,'light')]:
        pg=b.new_page(viewport={'width':w,'height':900},color_scheme=cs,reduced_motion='reduce'); errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e))); pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
        pg.goto('file:///home/claude/v11/trickle-v11-design.html'); pg.wait_for_timeout(800)
        print(w,errs,pg.evaluate('document.documentElement.scrollWidth'))
        pg.screenshot(path=f'd_{w}.png',full_page=True)
        if w==1200:
            pg.click('#bBw'); pg.wait_for_timeout(300); pg.locator('#screens').screenshot(path='d_bw.png')
    b.close()
