import sys, os
from playwright.sync_api import sync_playwright

v = sys.argv[1]
path = f"file:///tmp/claude-0/-home-claude/860f62eb-517e-5d8f-84c5-65604e6e2975/scratchpad/trickle-dark-{v}.html"

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width":500,"height":1000})
    errors=[]
    pg.on("console", lambda m: errors.append(m.text) if m.type=="error" else None)
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.goto(path)
    pg.wait_for_timeout(300)
    pg.screenshot(path=f"build/{v}_1_splash.png")
    # click through onboarding: splash -> method (tap phone)
    pg.evaluate("go('method')")
    pg.wait_for_timeout(150)
    pg.evaluate("go('home')")
    document_overflow = pg.evaluate("document.querySelector('.frame.active').scrollWidth > document.querySelector('.phone').clientWidth")
    pg.screenshot(path=f"build/{v}_2_home.png")
    pg.evaluate("go('categories')")
    pg.wait_for_timeout(150)
    pg.screenshot(path=f"build/{v}_3_categories.png")
    pg.evaluate("go('insight')")
    pg.wait_for_timeout(150)
    pg.screenshot(path=f"build/{v}_4_insight.png")
    pg.evaluate("go('savings')")
    pg.wait_for_timeout(150)
    pg.screenshot(path=f"build/{v}_5_savings.png")
    pg.evaluate("go('settings')")
    pg.wait_for_timeout(150)
    pg.screenshot(path=f"build/{v}_6_settings.png")
    pg.evaluate("go('scan')")
    pg.wait_for_timeout(150)
    pg.screenshot(path=f"build/{v}_7_scan.png")
    print(v, "overflow_at_home:", document_overflow, "console_errors:", errors[:5])
    b.close()
