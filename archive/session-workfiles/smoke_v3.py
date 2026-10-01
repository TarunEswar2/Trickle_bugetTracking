from playwright.sync_api import sync_playwright
import pathlib, sys

errors=[]
path = "file://" + str(pathlib.Path("trickle-final-v3.html").resolve())

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width":460,"height":1000})
    pg.on("console", lambda m: errors.append("CONSOLE "+m.type+": "+m.text) if m.type=="error" else None)
    pg.on("pageerror", lambda e: errors.append("PAGEERROR: "+str(e)))
    pg.goto(path)
    pg.wait_for_timeout(300)

    def frame():
        return pg.eval_on_selector(".frame.active","e=>e.dataset.frame")
    def click(sel):
        pg.click(sel); pg.wait_for_timeout(120)

    steps=[]
    def log(label):
        steps.append(f"{label} -> {frame()}")

    def shot(name):
        pg.screenshot(path=f"v3_{name}.png")

    log("boot")
    click("[data-frame=splash] button")
    click("[data-frame=method] button:nth-of-type(1)")   # Connect UPI
    click("#upi-input"); pg.fill("#upi-input","test@oksbi"); click(".inline-add")
    click("[data-frame=upiSetup] .btn")
    click("[data-frame=onbCategories] .btn")  # accept default cats
    pg.fill("#pin1","1234"); pg.fill("#pin2","1234")
    click("[data-frame=pin] .btn")
    click("[data-frame=permissions] .btn")
    click("[data-frame=allSet] .btn.solid")
    log("entered app")
    shot("home")

    # check subs-due + dot matrix present
    subs_html = pg.eval_on_selector("#home-subs-due","e=>e.innerHTML")
    dots = pg.eval_on_selector("#home-accum-dots","e=>e.children.length")
    steps.append(f"home-subs-due nonempty={len(subs_html.strip())>0} dots={dots}")

    # categories
    click("[data-tab=categories]")
    log("categories")
    shot("categories")
    segbars = pg.eval_on_selector_all(".cat-row .seg-bar","els=>els.length")
    pills = pg.eval_on_selector_all(".cat-row .pct-pill","els=>els.length")
    steps.append(f"categories segbars={segbars} pills={pills}")

    # insight
    click("[data-tab=insight]")
    log("insight")
    shot("insight_top")
    cards = pg.eval_on_selector_all("#insight-feed .icard","els=>els.length")
    heat = pg.eval_on_selector_all("#insight-feed .heat-grid","els=>els.length")
    dotm = pg.eval_on_selector_all("#insight-feed .dot-grid","els=>els.length")
    pg.mouse.wheel(0, 900)
    pg.wait_for_timeout(150)
    shot("insight_mid")
    pg.mouse.wheel(0, 900)
    pg.wait_for_timeout(150)
    shot("insight_bottom")
    steps.append(f"insight cards={cards} heatmaps={heat} dotmatrices={dotm}")

    # savings
    click("[data-tab=savings]")
    log("savings")
    shot("savings")
    veltxt = pg.eval_on_selector(".goal-card","e=>e.textContent") if pg.is_visible(".goal-card") else "none"
    steps.append(f"first goal card text: {veltxt[:80]}")
    if pg.is_visible(".goal-card"):
        click(".goal-card")
        log("goalDetail")
        shot("goal_detail")
        gv = pg.eval_on_selector("#gd-velocity","e=>e.textContent")
        steps.append(f"gd-velocity: {gv}")
        click("[data-frame=goalDetail] .chev-back")

    # settings
    click("[data-tab=settings]")
    log("settings")
    shot("settings")

    # payment flow
    click("[data-tab=home]")
    click("[data-frame=home] .tile:nth-of-type(1)")  # scan
    log("scan")
    click("[data-frame=scan] .btn")
    log("friction sheet / confirm")
    pg.wait_for_timeout(200)
    if pg.is_visible(".sheet[data-sheet=frictionSheet]"):
        shot("friction")
        click(".sheet[data-sheet=frictionSheet] .btn")
    log("confirm")
    shot("confirm")

    print("\n".join(steps))
    if errors:
        print("ERRORS:")
        print("\n".join(errors))
    else:
        print("NO CONSOLE/PAGE ERRORS")
    b.close()
