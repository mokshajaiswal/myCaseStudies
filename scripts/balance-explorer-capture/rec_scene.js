// Records one zoomed detail scene from the prototype at 2x: frames, cursor path, clicks and camera moves.
// Usage: node rec_scene.js <scene>. Output goes to takes/<scene>/ and is rendered by render_zoom.py.
const { chromium } = require('playwright-core');
const fs = require('fs');

const BASE = 'http://127.0.0.1:4173/variant-02/index.html';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const easeInOut = k => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

// Each scene: the URL to open, where the cursor starts, then the steps.
const scenes = {
  // The table: colour by branch, codes behind the eye icon, then opening Income.
  table: { url: '#explorer', start: [700, 300], async run(s) {
    await sleep(900);
    const assets = await s.center('tr[data-account=assets]');
    s.cam(1.8, 560, assets.y + 170, 1.1);
    await sleep(400);
    for (const id of ['assets', 'revolving', 'credit-main', 'platinum']) {
      const row = await s.center(`tr[data-account="${id}"] td.account-cell`);
      await s.move(row.x - 40, row.y, 0.45);
      await sleep(250);
    }
    await s.clickOn('.attr-toggle[data-row=platinum]', { dur: 0.6, pause: 1300 });
    await s.clickOn('.attr-toggle[data-row=platinum]', { dur: 0.3, pause: 1300 });
    const income = await s.center('tr[data-account=income]');
    s.cam(1.8, 560, income.y + 60, 0.9);
    await s.clickOn('tr[data-account=income] .row-toggle', { dur: 0.8, pause: 1600 });
    s.cam(1.0, 720, 450, 1.1);
    await s.move(780, 560, 0.9);
    await sleep(1400);
  } },

  // Saved views: open a saved view, change it, see the asterisk, then save.
  save: { url: '#explorer', start: [700, 560], async run(s) {
    // The Save menu draws under the table's sticky header in the prototype; lift it for the capture.
    await s.page.addStyleTag({ content: '.viewbar{position:relative;z-index:100}' });
    await sleep(800);
    const vs = await s.center('#viewSelect');
    s.cam(1.9, vs.x + 160, vs.y + 220, 1.1);
    await sleep(300);
    await s.clickOn('#viewSelect', { dur: 0.8, pause: 600 });
    await s.clickOn('[data-view-tab=mine]', { dur: 0.45, pause: 500 });
    await s.clickOn('[data-view-code=MV1200014]', { dur: 0.55, pause: 800 });
    s.cam(1.9, 1262, 330, 0.9);
    await s.clickOn('#cycleTrigger', { dur: 0.8, pause: 500 });
    await s.clickOn('#cycleMenu [data-value=quarterly]', { dur: 0.45, pause: 500 });
    const apply = await s.center('#applyButton');
    s.cam(1.6, 1180, apply.y - 140, 0.8);
    await s.clickOn('#applyButton', { dur: 0.7, pause: 900 });
    const head = await s.center('#viewSelect');
    s.cam(1.9, head.x + 330, head.y + 70, 1.0);
    await s.move(head.x + 120, head.y, 0.8);
    await sleep(1100);
    await s.clickOn('#saveMore', { dur: 0.8, pause: 800 });
    await s.clickOn('#saveView', { dur: 0.45, pause: 1600 });
    s.cam(1.0, 720, 450, 1.1);
    await s.move(900, 600, 0.9);
    await sleep(1200);
  } },

  // Decision 2: the three settings tabs, close up.
  tabs: { url: '#explorer', start: [900, 520], async run(s) {
    await sleep(900);
    s.cam(1.9, 1262, 330, 1.1);
    await sleep(500);
    await s.clickOn('#cycleTrigger', { dur: 0.8, pause: 600 });
    await s.clickOn('#cycleMenu [data-value=quarterly]', { dur: 0.45, pause: 700 });
    await s.clickOn('[data-tab=rows]', { dur: 0.7, pause: 500 });
    await s.clickOn('[data-open-group=posting]', { dur: 0.5, pause: 450 });
    await s.clickOn('[data-open-picker=posting]', { dur: 0.45, pause: 500 });
    const pick = await s.center('[data-flip="o:pc-update"]');
    s.cam(1.9, 1262, Math.max(330, pick.y - 40), 0.7);
    await s.clickOn('[data-flip="o:pc-update"]', { dur: 0.5, pause: 300 });
    await s.clickOn('[data-flip="o:pc-settle"]', { dur: 0.35, pause: 400 });
    await s.clickOn('[data-picker-add]', { dur: 0.5, pause: 600 });
    s.cam(1.9, 1262, 330, 0.7);
    await s.clickOn('[data-tab=columns]', { dur: 0.6, pause: 450 });
    await s.clickOn('[data-open-group=classes]', { dur: 0.5, pause: 500 });
    await s.clickOn('[data-open-picker="pc|c1|m"]', { dur: 0.5, pause: 500 });
    await s.clickOn('[data-flip="o:credit"]', { dur: 0.45, pause: 400 });
    await s.clickOn('.rows-picker-wrap button:visible:text-is("Select")', { dur: 0.45, pause: 500 });
    const apply = await s.center('#applyButton');
    s.cam(1.6, 1180, apply.y - 140, 0.8);
    await s.clickOn('#applyButton', { dur: 0.7, pause: 300 });
    s.cam(1.0, 720, 450, 1.1);
    await s.move(800, 560, 0.8);
    await sleep(1800);
  } },

  // Decision 3: the view switcher, then the All views library and a card's menu.
  views: { url: '#explorer', start: [700, 560], async run(s) {
    await sleep(900);
    const vs = await s.center('#viewSelect');
    s.cam(1.9, vs.x + 160, vs.y + 220, 1.1);
    await sleep(400);
    await s.clickOn('#viewSelect', { dur: 0.8, pause: 900 });
    await s.clickOn('[data-view-tab=mine]', { dur: 0.45, pause: 900 });
    await s.clickOn('[data-view-tab=builtin]', { dur: 0.4, pause: 700 });
    const all = await s.center('#allViews');
    s.cam(1.9, vs.x + 160, Math.min(all.y - 120, 600), 0.7);
    await s.clickOn('#allViews', { dur: 0.6, pause: 900 });
    s.cam(1.35, 760, 420, 1.0);
    await s.move(760, 420, 0.7);
    await sleep(600);
    const menu = await s.center('#viewsPage [data-view-menu]:visible');
    s.cam(1.8, menu.x - 120, menu.y + 90, 0.9);
    await s.clickOn('#viewsPage [data-view-menu]:visible', { dur: 0.7, pause: 1500 });
    await s.page.keyboard.press('Escape');
    s.cam(1.0, 720, 450, 1.1);
    await s.move(900, 600, 0.9);
    await sleep(1400);
  } },

  // Decision 4: Share on a view everyone can see, then on a private one.
  share: { url: '#explorer', start: [900, 500], async run(s) {
    await sleep(900);
    const sh = await s.center('#shareButton');
    s.cam(2.0, sh.x - 160, sh.y + 120, 1.1);
    await sleep(300);
    await s.clickOn('#shareButton', { dur: 0.8, pause: 900 });
    await s.clickOn('#sharePopover [data-copy-link]', { dur: 0.6, pause: 1300 });
    await s.clickOn('#shareButton', { dur: 0.5, pause: 400 });
    const vs = await s.center('#viewSelect');
    s.cam(1.9, vs.x + 160, vs.y + 220, 0.9);
    await s.clickOn('#viewSelect', { dur: 0.8, pause: 600 });
    await s.clickOn('[data-view-tab=mine]', { dur: 0.45, pause: 500 });
    await s.clickOn('[data-view-code=AUBS00020]', { dur: 0.55, pause: 700 });
    s.cam(2.0, sh.x - 160, sh.y + 120, 0.9);
    await s.clickOn('#shareButton', { dur: 0.8, pause: 1300 });
    const edit = await s.center('#sharePopover [data-edit-visibility]');
    await s.move(edit.x, edit.y, 0.6);
    await sleep(1200);
    s.cam(1.0, 720, 450, 1.1);
    await s.move(1000, 600, 0.9);
    await sleep(1200);
  } },

  // The quiet parts, one state per take; render_zoom.py joins them.
  'state-loading': { url: '?simulate=slow-load#explorer', start: [720, 600], record: 'early', async run(s) {
    s.cam(1.3, 640, 500, 0.01);
    await sleep(3600);
    await s.move(760, 560, 0.8);
    await sleep(900);
  } },
  'state-error': { url: '?simulate=load-error#explorer', start: [720, 640], async run(s) {
    const retry = await s.center('#retryLoad');
    s.cam(1.7, retry.x, retry.y - 60, 0.01);
    await sleep(1200);
    await s.clickOn('#retryLoad', { dur: 0.8, pause: 300 });
    s.cam(1.3, 640, 500, 0.9);
    await sleep(2200);
  } },
  'state-apply': { url: '?simulate=apply-error#explorer', start: [1000, 500], async run(s) {
    s.cam(1.8, 1262, 330, 0.01);
    await sleep(600);
    await s.clickOn('#cycleTrigger', { dur: 0.7, pause: 500 });
    await s.clickOn('#cycleMenu [data-value=quarterly]', { dur: 0.45, pause: 500 });
    const apply = await s.center('#applyButton');
    s.cam(1.5, 1080, apply.y - 160, 0.8);
    await s.clickOn('#applyButton', { dur: 0.7, pause: 1300 });
    const retry = await s.center('#toast .toast-action');
    s.cam(1.8, retry.x - 60, retry.y - 30, 0.8);
    await sleep(1000);
    await s.clickOn('#toast .toast-action', { dur: 0.6, pause: 1400 });
    await sleep(600);
  } },
  'state-empty': { url: '?simulate=no-views#views', start: [720, 600], async run(s) {
    s.cam(1.25, 720, 420, 0.01);
    await sleep(700);
    await s.clickOn('#viewsPage [data-page-tab=mine]', { dur: 0.8, pause: 600 });
    const empty = await s.center('.views-empty');
    s.cam(1.8, empty.x, empty.y, 1.0);
    await s.move(empty.x + 60, empty.y + 90, 0.9);
    await sleep(1800);
  } },
};

(async () => {
  const name = process.argv[2];
  const scene = scenes[name];
  if (!scene) throw new Error('Unknown scene ' + name);
  const OUT = `${__dirname}/takes/${name}`;
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT + '/f', { recursive: true });

  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--window-size=1440,987', '--force-device-scale-factor=2', '--hide-scrollbars'] });
  const context = await browser.newContext({ viewport: null });
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'http://127.0.0.1:4173' });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const log = { frames: [], cursor: [], clicks: [], cam: [] };
  let T0 = 0, n = 0, recording = false;
  const now = () => (Date.now() - T0) / 1000;
  cdp.on('Page.screencastFrame', f => {
    if (recording) {
      const file = `f/${String(n++).padStart(5, '0')}.jpg`;
      fs.writeFileSync(`${OUT}/${file}`, Buffer.from(f.data, 'base64'));
      log.frames.push({ t: now(), name: file });
    }
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  const startRecording = async () => {
    T0 = Date.now(); recording = true;
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, maxWidth: 2880, maxHeight: 1800, everyNthFrame: 1 });
  };

  if (scene.record === 'early') {
    await page.goto(BASE + '#blank');
    await startRecording();
    await page.goto(BASE + scene.url, { waitUntil: 'commit' });
    await sleep(250);
  } else {
    await page.goto(BASE + scene.url);
    await sleep(1600);
    await startRecording();
  }
  const size = await page.evaluate(() => [innerWidth, innerHeight, devicePixelRatio]);
  if (size.join() !== '1440,900,2') throw new Error('Viewport is ' + size);
  await page.evaluate(() => { document.body.style.outline = '0 solid transparent'; });

  let cur = { x: scene.start[0], y: scene.start[1] };
  log.cursor.push({ t: now(), ...cur });
  const s = {
    page,
    cam: (scale, cx, cy, dur = 0.9) => log.cam.push({ t: now(), scale, cx, cy, dur }),
    async center(selector) {
      const box = await page.locator(selector).first().boundingBox();
      if (!box) throw new Error('No box for ' + selector);
      return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    },
    async move(x, y, dur = 0.6) {
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
    },
    async clickOn(selector, { dur = 0.6, pause = 350 } = {}) {
      const c = await s.center(selector);
      await s.move(c.x, c.y, dur);
      await sleep(120);
      log.clicks.push({ t: now(), x: cur.x, y: cur.y });
      await page.mouse.down(); await sleep(90); await page.mouse.up();
      await sleep(pause);
    },
  };
  await scene.run(s);

  log.end = now();
  await cdp.send('Page.stopScreencast');
  await sleep(300);
  fs.writeFileSync(`${OUT}/log.json`, JSON.stringify(log));
  console.log(`${name}: ${log.frames.length} frames over ${log.end.toFixed(1)}s, ${log.clicks.length} clicks`);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
