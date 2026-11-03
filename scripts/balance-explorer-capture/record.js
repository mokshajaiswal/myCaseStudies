// The TLDR tour: drives the Balance Explorer prototype like a person would and captures 2x frames.
// Cursor, clicks and camera moves are logged and drawn later by render.py.
const { chromium } = require('playwright-core');
const fs = require('fs');

const OUT = __dirname + '/takes/tour';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT + '/f', { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));
const easeInOut = k => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

(async () => {
  // A real 2x window: screencast captures the window itself, not an emulated viewport.
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--window-size=1440,987', '--force-device-scale-factor=2', '--hide-scrollbars'] });
  const context = await browser.newContext({ viewport: null, acceptDownloads: true });
  const page = await context.newPage();
  await page.goto('http://localhost:8000/Balance%20Explorer/prototype/index.html#explorer');
  await page.waitForTimeout(1800);
  const size = await page.evaluate(() => [innerWidth, innerHeight, devicePixelRatio]);
  if (size.join() !== '1440,900,2') throw new Error('Viewport is ' + size);

  const T0 = Date.now();
  const now = () => (Date.now() - T0) / 1000;
  const log = { frames: [], cursor: [], clicks: [], cam: [] };

  const cdp = await context.newCDPSession(page);
  let n = 0;
  cdp.on('Page.screencastFrame', async f => {
    const t = now();
    const name = `f/${String(n++).padStart(5, '0')}.jpg`;
    fs.writeFileSync(`${OUT}/${name}`, Buffer.from(f.data, 'base64'));
    log.frames.push({ t, name });
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, maxWidth: 2880, maxHeight: 1800, everyNthFrame: 1 });
  // Nudge a repaint so the first frame arrives straight away.
  await page.evaluate(() => { document.body.style.outline = '0 solid transparent'; });

  let cur = { x: 780, y: 600 };
  log.cursor.push({ t: now(), ...cur });

  const cam = (scale, cx, cy, dur = 0.9) => log.cam.push({ t: now(), scale, cx, cy, dur });
  const center = async selector => {
    const box = await page.locator(selector).first().boundingBox();
    if (!box) throw new Error('No box for ' + selector);
    return { x: box.x + box.width / 2, y: box.y + box.height / 2, box };
  };
  // A slight arc, eased, about 60 samples a second: reads as a hand, not a robot.
  async function move(x, y, dur = 0.6) {
    const from = { ...cur }, steps = Math.max(10, Math.round(dur * 60));
    const dist = Math.hypot(x - from.x, y - from.y), bend = Math.min(40, dist * 0.08);
    const nx = -(y - from.y) / (dist || 1), ny = (x - from.x) / (dist || 1);
    const start = Date.now();
    for (let i = 1; i <= steps; i++) {
      const k = easeInOut(i / steps), arc = Math.sin(Math.PI * k) * bend;
      const px = from.x + (x - from.x) * k + nx * arc, py = from.y + (y - from.y) * k + ny * arc;
      await page.mouse.move(px, py);
      log.cursor.push({ t: now(), x: px, y: py });
      const wait = start + (dur * 1000 * i) / steps - Date.now();
      if (wait > 0) await sleep(wait);
    }
    cur = { x, y };
  }
  async function click(pause = 350) {
    log.clicks.push({ t: now(), x: cur.x, y: cur.y });
    await page.mouse.down(); await sleep(90); await page.mouse.up();
    await sleep(pause);
  }
  async function clickOn(selector, { dur = 0.6, pause = 350, dx = 0, dy = 0 } = {}) {
    const c = await center(selector);
    await move(c.x + dx, c.y + dy, dur);
    await sleep(120);
    await click(pause);
  }

  // Establishing shot: the whole explorer.
  await sleep(1300);

  // 1. Switch to a saved view.
  const vs = await center('#viewSelect');
  cam(1.7, vs.x + 170, vs.y + 210, 1.1);
  await clickOn('#viewSelect', { dur: 0.9, pause: 650 });
  await clickOn('[data-view-tab=mine]', { dur: 0.45, pause: 550 });
  await clickOn('[data-view-code=MV1200014]', { dur: 0.55, pause: 900 });

  // 2. Open Income in the ledger.
  const inc = await center('tr[data-account=income]');
  cam(1.5, 640, inc.y + 40, 1.0);
  await clickOn('tr[data-account=income] .row-toggle', { dur: 0.8, pause: 1100 });

  // 3. Basic parameters: cycle to Quarterly, then apply.
  const cyc = await center('#cycleTrigger');
  cam(1.75, 1240, cyc.y + 90, 1.0);
  await clickOn('#cycleTrigger', { dur: 0.85, pause: 600 });
  await clickOn('#cycleMenu [data-value=quarterly]', { dur: 0.5, pause: 500 });
  cam(1.35, 1130, 600, 0.9);
  await clickOn('#applyButton', { dur: 0.8, pause: 250 });
  cam(1.3, 640, 520, 0.9);
  await move(700, 560, 0.7);
  await sleep(1700);

  // 4. Rows: add two posting codes.
  cam(1.75, 1240, 330, 1.0);
  await clickOn('[data-tab=rows]', { dur: 0.8, pause: 450 });
  await clickOn('[data-open-group=posting]', { dur: 0.5, pause: 450 });
  await clickOn('[data-open-picker=posting]', { dur: 0.45, pause: 550 });
  const pick = await center('[data-flip="o:pc-update"]');
  cam(1.75, 1240, Math.max(330, pick.y - 60), 0.8);
  await clickOn('[data-flip="o:pc-update"]', { dur: 0.55, pause: 300 });
  await clickOn('[data-flip="o:pc-settle"]', { dur: 0.35, pause: 400 });
  await clickOn('[data-picker-add]', { dur: 0.55, pause: 600 });

  // 5. Columns: add Credit value to the posting class.
  cam(1.75, 1240, 330, 0.8);
  await clickOn('[data-tab=columns]', { dur: 0.6, pause: 450 });
  await clickOn('[data-open-group=classes]', { dur: 0.5, pause: 500 });
  await clickOn('[data-open-picker="pc|c1|m"]', { dur: 0.5, pause: 550 });
  await clickOn('[data-flip="o:credit"]', { dur: 0.5, pause: 400 });
  await clickOn('.rows-picker-wrap button:visible:text-is("Select")', { dur: 0.5, pause: 500 });

  // Apply both, then pull back to see the new rows and column land.
  cam(1.35, 1130, 600, 0.9);
  await clickOn('#applyButton', { dur: 0.8, pause: 200 });
  cam(1.0, 720, 450, 1.1);
  await move(760, 520, 0.8);
  await sleep(1700);

  // 6. Save the view.
  const sv = await center('#saveMore');
  cam(1.7, sv.x - 120, sv.y + 70, 1.0);
  await clickOn('#saveMore', { dur: 0.85, pause: 550 });
  await clickOn('#saveView', { dur: 0.45, pause: 700 });

  // 7. Download it for Excel.
  const ex = await center('#exportButton');
  cam(1.7, ex.x - 140, ex.y + 90, 0.9);
  await clickOn('#exportButton', { dur: 0.8, pause: 550 });
  await clickOn('#exportExcel', { dur: 0.45, pause: 300 });
  cam(1.0, 720, 450, 1.2);
  await move(1000, 640, 1.0);
  await sleep(2200);

  log.end = now();
  await cdp.send('Page.stopScreencast');
  await sleep(300);
  fs.writeFileSync(`${OUT}/log.json`, JSON.stringify(log));
  console.log(`frames ${log.frames.length} over ${log.end.toFixed(1)}s (${(log.frames.length / log.end).toFixed(1)} fps), clicks ${log.clicks.length}`);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
