const { chromium } = require('/opt/node-tools/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 460, height: 1000 } });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));

  const file = 'file://' + path.resolve(__dirname, 'trickle-explorations-2.html');
  await page.goto(file);
  await page.waitForTimeout(200);

  const flows = {
    d: ['env','spend','spend-amount','spend-confirm','spend-success','save','you'],
    e: ['home','pay','pay-amount','insights','save','settings'],
    f: ['dash','pay','pay-amount','settings'],
    g: ['tl','pay','pay-amount','save','settings'],
    h: ['fc','cats','pay','pay-amount','save','settings'],
    i: ['home','circles','pay','pay-amount','save','settings']
  };

  for (const mk of Object.keys(flows)) {
    await page.evaluate((k) => {
      enterMockup(k);
      go(k,'method'); go(k,'upi'); go(k,'cats'); go(k,'pin'); go(k,'perm'); go(k,'allset');
      window['enter'+k.toUpperCase()]();
    }, mk);
    await page.waitForTimeout(150);
    for (const fr of flows[mk]) {
      await page.evaluate((a) => go(a[0], a[1]), [mk, fr]);
      await page.waitForTimeout(80);
    }
    // circle detail for i
    if (mk === 'i') {
      await page.evaluate((k) => iOpenCircle('c1'), mk);
      await page.waitForTimeout(80);
    }
    await page.screenshot({ path: `shot2_${mk}.png`, clip: await page.evaluate((k)=>{
      const el=document.querySelector('.mockup[data-mockup="'+k+'"] .phone');
      const r=el.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height};
    }, mk) });
    await page.evaluate(() => exitMockup());
  }

  console.log('CONSOLE_ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
