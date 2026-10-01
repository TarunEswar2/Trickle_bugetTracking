from playwright.sync_api import sync_playwright
import os
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    for w in (1200,400):
        pg=b.new_page(viewport={"width":w,"height":900}); errs=[]; pg.on("pageerror",lambda e:errs.append(str(e)))
        pg.goto("file://"+os.path.abspath("trickle_v14_stage2b.html")); pg.wait_for_timeout(400)
        print(w,"board",pg.evaluate("document.documentElement.scrollWidth"),errs)
        for s in ["V4","V1","Vpay","Vrender"]: pg.locator("#"+s).screenshot(path=f"b_{s}_{w}.png")
        pg.click(".seg button[data-n='20']"); pg.locator("#s2b-b").screenshot(path=f"b_cats_{w}.png")
        q=b.new_page(viewport={"width":w,"height":900}); qe=[]; q.on("pageerror",lambda e:qe.append(str(e)))
        q.goto("file://"+os.path.abspath("coin_test.html")); q.wait_for_timeout(300)
        q.screenshot(path=f"q0_{w}.png",full_page=True); q.click("#go")
        for i in range(13):
            q.wait_for_timeout(150)
            if i in (1,10): q.screenshot(path=f"q{i}_{w}.png",full_page=True)
            q.locator("[data-ans]").first.click()
        q.wait_for_timeout(200); q.screenshot(path=f"qend_{w}.png",full_page=True)
        print(w,"quiz",q.evaluate("document.documentElement.scrollWidth"),qe)
    b.close()
