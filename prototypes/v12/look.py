from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,n,cs in [(1200,'d','light'),(400,'m','dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},color_scheme=cs)
        pg.goto('file:///home/claude/v12/board.html');pg.wait_for_timeout(800)
        print(n,pg.evaluate('document.documentElement.scrollWidth'),pg.evaluate('document.body.scrollHeight'))
        pg.screenshot(path=f'look_{n}.png',full_page=True)
    b.close()
