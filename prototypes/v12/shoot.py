from playwright.sync_api import sync_playwright
S='/tmp/claude-0/-home-claude/860f62eb-517e-5d8f-84c5-65604e6e2975/scratchpad/'
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page(viewport={'width':412,'height':860},device_scale_factor=1)
    pg.goto('file://'+S+'trickle-final-v9.html#demo');pg.wait_for_timeout(1200)
    pg.click('button[data-a=tab][data-x=insights]');pg.wait_for_timeout(1500)
    # cards: find elements with class containing 'card' that have a heading
    info=pg.evaluate("""(()=>{const out=[];document.querySelectorAll('.wc').forEach((c,i)=>{c.setAttribute('data-shot',i);const t=c.querySelector('h3,h2,.wt,.wh');out.push(i+':'+(t?t.textContent.trim().slice(0,30):c.textContent.trim().slice(0,30)))});return out})()""")
    print(info)
    for i in range(len(info)):
        el=pg.query_selector(f'[data-shot="{i}"]');el.scroll_into_view_if_needed();pg.wait_for_timeout(700)
        el.screenshot(path=f'shots/v9_w{i}.png')
    for tab in ['home','money']:
        pg.click(f'button[data-a=tab][data-x={tab}]');pg.wait_for_timeout(1500)
        pg.screenshot(path=f'shots/v9_{tab}_full.png',full_page=True)
    pg.goto('file:///home/claude/v11/app/trickle-final-v11.html#demo');pg.wait_for_timeout(1500)
    pg.screenshot(path='shots/v11_home.png',full_page=True)
    for t in ['Money','Insights']:
        pg.click(f'[data-a=tab]:has-text("{t}")');pg.wait_for_timeout(1500)
        pg.screenshot(path=f'shots/v11_{t}.png',full_page=True)
    b.close()
