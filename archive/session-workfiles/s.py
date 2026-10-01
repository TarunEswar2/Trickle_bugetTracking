from playwright.sync_api import sync_playwright
with sync_playwright() as p:
  b=p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
  for w,n in [(1280,'d'),(390,'m')]:
    pg=b.new_page(viewport={'width':w,'height':900}); pg.goto('file://'+__import__('os').path.abspath('trickle-synthesis.html'))
    print(n, pg.evaluate('document.documentElement.scrollWidth'), w); pg.screenshot(path=f'shot_{n}.png')
  b.close()
