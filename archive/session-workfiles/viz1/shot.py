import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome')
        for w in (1200,400):
            pg=await b.new_page(viewport={'width':w,'height':900},color_scheme='dark' if w==1200 else 'light')
            errs=[]
            pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None)
            pg.on('pageerror',lambda e: errs.append(str(e)))
            await pg.goto('file://'+sys.argv[1]); await pg.wait_for_timeout(2500)
            print(w,'scrollW',await pg.evaluate('document.documentElement.scrollWidth'),'errs',errs[:5])
            for sid in ['A','B','C','D','E','F','G']:
                el=pg.locator('#'+sid)
                await el.screenshot(path=f'shot_{w}_{sid}.png')
            await pg.screenshot(path=f'shot_{w}_top.png')
            if w==1200:
                await pg.click('#chip6'); await pg.wait_for_timeout(300)
                for sid in ['C','E','F']:
                    await pg.locator('#'+sid).screenshot(path=f'shot_single_{sid}.png')
        await b.close()
asyncio.run(main())
