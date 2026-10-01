import asyncio, sys
from playwright.async_api import async_playwright

URL = "file://" + __file__.replace("smoke_v4.py","trickle-final-v4.html")

async def main():
    errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path="/opt/pw-browsers/chromium/chrome-linux/chrome" if False else None)
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width":420,"height":900})
        page.on("console", lambda m: errors.append(m.text) if m.type=="error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        await page.goto(URL)
        await page.wait_for_timeout(300)

        async def click(sel):
            await page.click(sel, timeout=3000)
            await page.wait_for_timeout(150)

        # onboarding UPI path quickly via JS state jump then home
        await page.evaluate("""() => {
            state.tracking='upi';
            state.pin='1234';
            ACCOUNTS=['test@upi'];
            go('home'); renderAll();
        }""")
        await page.wait_for_timeout(200)
        await page.screenshot(path="v4_home.png")

        await page.evaluate("go('categories')")
        await page.wait_for_timeout(150)
        await page.screenshot(path="v4_categories.png")

        await page.evaluate("openCategory('Food')")
        await page.wait_for_timeout(150)
        await page.screenshot(path="v4_catdetail.png")

        await page.evaluate("go('insight')")
        await page.wait_for_timeout(150)
        await page.screenshot(path="v4_insight1.png")
        await page.evaluate("document.querySelector('.frame[data-frame=insight]').scrollTop = 900")
        await page.wait_for_timeout(100)
        await page.screenshot(path="v4_insight2.png")
        await page.evaluate("document.querySelector('.frame[data-frame=insight]').scrollTop = 1800")
        await page.wait_for_timeout(100)
        await page.screenshot(path="v4_insight3.png")

        await page.evaluate("go('savings')")
        await page.wait_for_timeout(150)
        await page.screenshot(path="v4_savings.png")
        gid = await page.evaluate("GOALS[0].id")
        await page.evaluate(f"openGoal({gid})")
        await page.wait_for_timeout(150)
        await page.screenshot(path="v4_goaldetail.png")

        await page.evaluate("go('settings')")
        await page.wait_for_timeout(150)
        await page.screenshot(path="v4_settings.png")

        # overflow check
        overflow = await page.evaluate("""() => {
            let bad=[];
            document.querySelectorAll('.frame.active, .frame').forEach(f=>{
                if(f.scrollWidth > f.clientWidth+2) bad.push(f.getAttribute('data-frame'));
            });
            return bad;
        }""")
        print("OVERFLOW:", overflow)
        print("CONSOLE_ERRORS:", errors[:20])

        # sanity check computed values
        vals = await page.evaluate("""() => {
            var m = sum(txnsSince(30)), p = sum(txnsBetween(60,30));
            return {thisMonth:m, prevMonth:p, txnCount:TXNS.length};
        }""")
        print("MOM:", vals)

        await browser.close()

asyncio.run(main())
