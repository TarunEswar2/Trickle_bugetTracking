from playwright.sync_api import sync_playwright
import pathlib
path="file://"+str(pathlib.Path("trickle-explorations.html").resolve())
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":1400,"height":900},device_scale_factor=1.5)
    pg.goto(path); pg.wait_for_timeout(200)
    pg.screenshot(path="ex_a.png", full_page=True)
    pg.click("[data-x=b]"); pg.wait_for_timeout(150)
    pg.screenshot(path="ex_b.png", full_page=True)
    pg.click("[data-x=c]"); pg.wait_for_timeout(150)
    pg.screenshot(path="ex_c.png", full_page=True)
    b.close()
print("done")
