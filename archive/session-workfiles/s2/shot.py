from playwright.sync_api import sync_playwright
import os
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    for w in (1200,400):
        pg=b.new_page(viewport={"width":w,"height":900}); pg.goto("file://"+os.path.abspath("trickle_v14_stage2.html")); pg.wait_for_timeout(500)
        print(w, pg.evaluate("document.documentElement.scrollWidth"))
        for s in ["S1","S3","S15"]:
            pg.locator("#"+s).screenshot(path=f"{s}_{w}.png")
b.close()
