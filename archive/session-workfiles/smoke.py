from playwright.sync_api import sync_playwright
import pathlib, sys

errors=[]
path = "file://" + str(pathlib.Path("trickle-v2.html").resolve())

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

    def ensure_tabbar():
        for _ in range(4):
            if pg.is_visible(".tabbar"): return
            back = ".frame.active .chev-back"
            if pg.is_visible(back):
                pg.click(back); pg.wait_for_timeout(120)
            else:
                btn = ".frame.active .btn"
                if pg.is_visible(btn):
                    pg.click(btn); pg.wait_for_timeout(120)
        steps.append("!! could not reach a tab frame from "+frame())

    steps=[]
    def log(label):
        steps.append(f"{label} -> {frame()}")

    log("boot")
    # onboarding: UPI path
    click("[data-frame=splash] button")                       # swipe up
    log("splash continue")
    click("[data-frame=method] button:nth-of-type(1)")        # Connect UPI
    log("connect UPI")
    pg.fill("#upi-input","tarun@oksbi"); click("[data-frame=upiSetup] .inline-add")
    click("[data-frame=upiSetup] .btn")                       # continue
    log("upi continue")
    click("[data-frame=onbCategories] .btn")                  # continue with default cats
    log("categories continue")
    pg.fill("#pin1","1234"); pg.fill("#pin2","1234")
    click("[data-frame=pin] .btn")
    log("pin continue")
    click("[data-frame=permissions] .btn")
    log("permissions continue")
    click("[data-frame=allSet] .btn.solid")
    log("start journey")

    # home checks
    assert frame()=="home", "did not land on home"
    bal = pg.text_content("#home-balance"); wk = pg.text_content("#home-weekly")
    steps.append(f"home balance={bal} weekly={wk}")
    trends = pg.eval_on_selector("#home-trends","e=>e.innerText.trim().slice(0,60)")
    txns   = pg.eval_on_selector("#home-txns","e=>e.innerText.trim().slice(0,60)")
    steps.append(f"trends={trends!r}")
    steps.append(f"recent={txns!r}")

    # payment flow with friction sheet
    click("[data-frame=home] .tiles .tile:nth-child(1)")      # Scan QR
    log("scan")
    click("[data-frame=scan] .btn")                            # simulate payment
    log("simulate payment")
    pg.fill("#pay-amount","250")
    click("[data-frame=payAmount] .inline-add")                # Check
    pg.wait_for_timeout(200)
    vis = pg.is_visible("[data-sheet=frictionSheet]")
    steps.append(f"friction sheet visible={vis}")
    steps.append("friction balance="+pg.text_content("#fr-balance"))
    steps.append("friction note="+pg.text_content("#fr-note")[:70])
    steps.append("friction bar widths="+pg.eval_on_selector_all(
        ".friction-bar i","els=>els.map(e=>e.style.width).join(' | ')"))
    click("[data-sheet=frictionSheet] .btn:not(.ghost)")       # Pay
    log("pay")
    assert frame()=="payConfirm"
    steps.append("confirm="+pg.text_content("#confirm-line"))
    click("#savings-peek")
    steps.append("savings sheet visible="+str(pg.is_visible("[data-sheet=savingsSheet]")))
    click("[data-sheet=savingsSheet] .goal-card")
    log("quick save")

    # ensure we are back on a tab frame (goalReached / celebration has no tab bar)
    if frame() not in ("home","categories","insight","savings","settings"):
        steps.append("landed on "+frame()+" (no tab bar) -> using its own back button")
        pg.click("[data-frame=%s] .btn" % frame()); pg.wait_for_timeout(150)
        log("back from celebration")

    # tabs
    for tab,label in [("categories","Categories"),("insight","Insight"),
                      ("savings","Savings"),("settings","Settings"),("home","Home")]:
        ensure_tabbar(); click(f".tab[data-tab={tab}]")
        assert frame()==tab, f"tab {tab} landed on {frame()}"
    steps.append("all 5 tabs OK")

    # categories deep
    ensure_tabbar(); click(".tab[data-tab=categories]")
    donut = pg.eval_on_selector("#donut","e=>e.querySelectorAll('path').length")
    rows  = pg.eval_on_selector("#cat-rows","e=>e.children.length")
    steps.append(f"donut segments={donut} cat rows={rows}")
    click("[data-frame=categories] .pill:nth-of-type(1)")      # Edit Budget
    steps.append("budget sheet visible="+str(pg.is_visible("[data-sheet=budgetSheet]")))
    pg.fill("#budget-daily","200"); pg.dispatch_event("#budget-daily","input")
    steps.append("weekly auto="+pg.input_value("#budget-weekly"))
    click("[data-sheet=budgetSheet] .btn")
    click("#cat-rows .cat-row")
    log("category detail")
    click("[data-frame=categoryDetail] .txn-row")
    log("txn from category")

    # insight
    ensure_tabbar(); click(".tab[data-tab=insight]")
    cards = pg.eval_on_selector("#insight-feed","e=>e.children.length")
    heads = pg.eval_on_selector_all(".icard .ic-head","els=>els.map(e=>e.innerText)")
    bars  = pg.eval_on_selector_all("#insight-feed svg rect","els=>els.length")
    steps.append(f"insight cards={cards}, weekday bars={bars}")
    for h in heads: steps.append("  card: "+h)

    # savings
    ensure_tabbar(); click(".tab[data-tab=savings]")
    steps.append("goals="+str(pg.eval_on_selector("#goal-list","e=>e.children.length")))
    steps.append("subs="+str(pg.eval_on_selector("#sub-list","e=>e.children.length")))
    steps.append("sub summary="+pg.text_content("#sub-summary"))
    click("#sub-list .sub-row"); log("sub detail")
    steps.append("sub due="+pg.text_content("#sd-due"))
    click("[data-frame=subDetail] .chev-back")
    click("#goal-list .goal-card"); log("goal detail")
    pg.fill("#gd-add","500"); click("[data-frame=goalDetail] .inline-add")
    steps.append("goal saved now="+pg.text_content("#gd-saved"))

    # manual mode
    ensure_tabbar(); click(".tab[data-tab=settings]")
    click("[data-frame=settings] .row-link:nth-child(2)")      # tracking method
    click("[data-sheet=trackingSheet] .field:nth-of-type(2)")  # manual
    ensure_tabbar(); click(".tab[data-tab=home]")
    steps.append("manual mode: tiles hidden="+str(not pg.is_visible("#home-tiles"))
                 +", enter-txn visible="+str(pg.is_visible("#home-manual")))
    click("#home-manual .btn"); log("manual entry")
    pg.fill("#me-amount","75"); pg.fill("#me-merchant","Chai stall")
    pg.click("#me-cats .pill >> nth=0")
    click("[data-frame=manualEntry] .btn")
    log("manual submit")

    # accumulation
    click("[data-frame=home] .card-btn >> nth=0")
    log("accumulation")
    click("#accum-list .card-btn"); log("accum detail")
    steps.append("accum total="+pg.text_content("#accd-total")+" count="+pg.text_content("#accd-count"))

    # transactions
    ensure_tabbar(); click(".tab[data-tab=home]")
    click("[data-frame=home] .search-pill"); log("transactions")
    pg.fill("#txn-search","zepto"); pg.wait_for_timeout(150)
    steps.append("search rows="+str(pg.eval_on_selector_all("#txn-list .txn-row","e=>e.length")))
    pg.fill("#txn-search",""); pg.wait_for_timeout(120)
    pg.click("#txn-list .txn-row >> nth=0"); pg.wait_for_timeout(150)
    log("txn detail")
    pg.click("#td-cats .pill >> nth=1")
    click("[data-frame=transactionDetail] .btn")
    log("save category")

    # overflow / layout check across every frame
    bad=[]
    names = pg.eval_on_selector_all(".frame","els=>els.map(e=>e.dataset.frame)")
    for n in names:
        pg.evaluate("n=>{document.querySelectorAll('.frame').forEach(f=>f.classList.remove('active'));"
                    "document.querySelector('.frame[data-frame=\"'+n+'\"]').classList.add('active');}", n)
        pg.wait_for_timeout(40)
        ov = pg.evaluate("""n=>{const f=document.querySelector('.frame[data-frame=\"'+n+'\"]');
            return {hOver: f.scrollWidth > f.clientWidth+1};}""", n)
        if ov["hOver"]: bad.append(n)
    steps.append("frames with horizontal overflow: "+(str(bad) if bad else "none"))

    pg.screenshot(path="shot_home.png", clip={"x":0,"y":0,"width":460,"height":1000})
    b.close()

print("\n".join(steps))
print("\n--- JS ERRORS ---")
print("\n".join(errors) if errors else "none")
