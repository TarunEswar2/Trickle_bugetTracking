from playwright.sync_api import sync_playwright
import pathlib
path="file://"+str(pathlib.Path("trickle-v2.html").resolve())
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":440,"height":990},device_scale_factor=2)
    pg.goto(path); pg.wait_for_timeout(300)
    def onb():
        pg.click("[data-frame=splash] button"); pg.wait_for_timeout(80)
        pg.click("[data-frame=method] button:nth-of-type(1)"); pg.wait_for_timeout(80)
        pg.fill("#upi-input","tarun@oksbi"); pg.click("[data-frame=upiSetup] .inline-add")
        pg.click("[data-frame=upiSetup] .btn"); pg.wait_for_timeout(80)
        pg.click("[data-frame=onbCategories] .btn"); pg.wait_for_timeout(80)
        pg.fill("#pin1","1234"); pg.fill("#pin2","1234"); pg.click("[data-frame=pin] .btn")
        pg.click("[data-frame=permissions] .btn"); pg.wait_for_timeout(80)
        pg.click("[data-frame=allSet] .btn.solid"); pg.wait_for_timeout(200)
    def shot(name):
        pg.locator(".phone").screenshot(path=f"s_{name}.png")
    # method screen first
    pg.click("[data-frame=splash] button"); pg.wait_for_timeout(120); shot("method")
    pg.evaluate("restartProto()"); pg.wait_for_timeout(150)
    onb(); shot("home")
    pg.click(".tab[data-tab=categories]"); pg.wait_for_timeout(200); shot("categories")
    pg.click(".tab[data-tab=insight]"); pg.wait_for_timeout(200); shot("insight")
    pg.eval_on_selector(".frame.active","e=>e.scrollTop=520"); pg.wait_for_timeout(150); shot("insight2")
    pg.click(".tab[data-tab=savings]"); pg.wait_for_timeout(200); shot("savings")
    pg.click(".tab[data-tab=settings]"); pg.wait_for_timeout(200); shot("settings")
    pg.click(".tab[data-tab=home]"); pg.wait_for_timeout(150)
    pg.click("[data-frame=home] .tiles .tile:nth-child(1)"); pg.wait_for_timeout(120)
    pg.click("[data-frame=scan] .btn"); pg.wait_for_timeout(120)
    pg.fill("#pay-amount","250"); pg.click("[data-frame=payAmount] .inline-add"); pg.wait_for_timeout(250)
    shot("friction")
    pg.click("[data-sheet=frictionSheet] .btn:not(.ghost)"); pg.wait_for_timeout(200); shot("confirm")
    b.close()
print("done")
