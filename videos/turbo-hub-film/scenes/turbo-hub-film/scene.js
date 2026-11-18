// turbo-hub-film · 1208x1388 (302:347, the case study card) · 30 fps · 29 s · seamless loop (empty page → empty page)
// On the card, the big mock rises in from below; this film then plays. An isometric floor where Arun stands on the Hub
// platform with the members around him and money flowing along the links; his phone rises from below and the real
// prototypes construct themselves, scroll, and the camera zooms into what matters; below the phone, the manager sets
// each member's limit; the slider and swipes are driven by a touch dot; a request flies between the member's and the
// manager's phones; impact flips through as a 3D deck; and an isometric wall of every screen drifts, then clears.
// The phones are the case study's own HTML prototypes (through the `th` link). Everything inside them is driven per
// frame from proxies, so preview and render match.
import { gsap } from 'gsap';
import { studio } from '@studio/studio.js';
import { camera } from '@studio/kits/camera.js';

const W = 1208, H = 1388, FPS = 30, FRAMES = 870;
const NS = 'http://www.w3.org/2000/svg';
const $ = (id) => document.getElementById(id);
const world = $('world');
const C = { x: 1208, y: 1388 };          // Arun's phone, the family's centre
const M = { x: C.x - 1000, y: C.y };     // Neha's phone, off to the left
const I = { x: C.x + 1000, y: C.y };     // the impact deck, off to the right

// The Members roster from the prototype (spent / limit)
const FAMILY = [
  { key: 'arun', name: 'Arun', color: '#356cdf', spent: 0, limit: 45000 },
  { key: 'kavya', name: 'Kavya', color: '#dc4778', spent: 1200, limit: 45000 },
  { key: 'neha', name: 'Neha', color: '#7b6fd8', spent: 500, limit: 5000 },
  { key: 'rohan', name: 'Rohan', color: '#2a9d8f', spent: 2400, limit: 10000 },
];
const avatarSrc = (key) => `th/assets/family-avatars/${key}.png`;
const inr = (v) => `₹${Math.round(v).toLocaleString('en-IN')}`;

// ---------- helpers ----------
function div(parent, cls, name, style = {}) {
  const d = document.createElement('div');
  if (cls) d.className = cls;
  if (name) d.dataset.name = name;
  Object.assign(d.style, style);
  parent.appendChild(d);
  return d;
}
function img(parent, cls, src, style = {}) {
  const i = document.createElement('img');
  i.className = cls; i.src = src; i.alt = '';
  Object.assign(i.style, style);
  parent.appendChild(i);
  return i;
}
const svgEl = (tag, attrs = {}) => { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); return e; };
const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const quad = (a, c, b, t) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * c + t * t * b;
function chip(parent, name, text, x, y, kind, faces = []) {
  const c = div(parent, `chip chip--${kind}${faces.length ? '' : ' chip--plain'}`, name, { left: `${x}px`, top: `${y}px` });
  faces.forEach((k) => { const i = document.createElement('i'); i.style.backgroundImage = `url(${avatarSrc(k)})`; c.appendChild(i); });
  c.append(text);
  return c;
}

// ---------- background: the case study card's purple and cream ----------
// Everything runs on loops whose period is the film, so the last frame meets the first. The edges fade to white so the
// film melts into the card's white panel. Layers, back to front: paper, a lavender-and-butter aurora, a dotted lattice
// (sliding one tile per loop, clearer toward the edges), grain, and the white edge.
const bg = $('bg');
div(bg, 'bg-base', null);
const aurora = div(bg, 'bg-aurora', 'Aurora');
const BLOBS = [
  { rgb: '128 80 190', a: 0.42, size: 820, x: 300, y: 260, ax: 170, ay: 120, kx: 1, ky: 2, ph: 0 },
  { rgb: '179 139 230', a: 0.45, size: 860, x: 950, y: 1100, ax: 150, ay: 170, kx: 2, ky: 1, ph: 1.6 },
  { rgb: '242 165 200', a: 0.34, size: 660, x: 1020, y: 300, ax: 140, ay: 120, kx: 1, ky: 1, ph: 3.1 },
  { rgb: '253 225 79', a: 0.30, size: 560, x: 220, y: 1120, ax: 130, ay: 110, kx: 1, ky: 2, ph: 4.4 },
  { rgb: '143 179 255', a: 0.22, size: 520, x: 640, y: 700, ax: 220, ay: 200, kx: 1, ky: 1, ph: 2.2 },
].map((b) => ({ ...b, el: div(aurora, 'bg-blob', null, { width: `${b.size}px`, height: `${b.size}px`, margin: `${-b.size / 2}px 0 0 ${-b.size / 2}px`,
  background: `radial-gradient(closest-side, rgb(${b.rgb} / ${b.a}), rgb(${b.rgb} / 0))` }) }));
const lattice = div(bg, 'bg-lattice', 'Lattice');
div(bg, 'bg-grain', 'Grain');
div(bg, 'bg-edge', null);
function paintBackground(f) {
  const t = (2 * Math.PI * f) / FRAMES;
  BLOBS.forEach((b) => {
    b.el.style.left = `${b.x + b.ax * Math.sin(b.kx * t + b.ph)}px`;
    b.el.style.top = `${b.y + b.ay * Math.cos(b.ky * t + b.ph * 1.3)}px`;
    b.el.style.transform = `scale(${1 + 0.12 * Math.sin(t + b.ph)})`;
  });
  const tile = 132, step = (f / FRAMES) * tile;   // one whole tile per loop
  lattice.style.backgroundPosition = `${step}px ${-step}px`;
}

// ---------- phones: real prototype pages ----------
function phoneBox(name, p) { return div(world, 'phone-box', name, { left: `${p.x - 260}px`, top: `${p.y - 500}px` }); }
function frame(box, origin, name, route, scene) {
  const f = document.createElement('iframe');
  const [page, query] = route.split('?');
  f.src = `th/prototypes/${page}/index.html?${query ? `${query}&` : ''}embed=story&scene=${scene}`;
  f.dataset.name = name;
  f.setAttribute('scrolling', 'no');
  f.setAttribute('tabindex', '-1');
  f.loaded = new Promise((r) => f.addEventListener('load', r, { once: true }));
  f.origin = { x: origin.x - 260, y: origin.y - 500 };
  box.appendChild(f);
  return f;
}
const arunBox = phoneBox('Arun’s phone', C);
const nehaBox = phoneBox('Neha’s phone', M);
const frames = {
  members: frame(arunBox, C, 'Hub · Members', 'hub-dashboard?tab=Members&roster=family', 'members-family'),
  limit: frame(arunBox, C, 'Spending limit', 'spending-limit', 'spending-limit'),
  approve: frame(arunBox, C, 'Payment request', 'payment-authorize?amount=2500', 'payment-authorize'),
  analytics: frame(arunBox, C, 'Hub · Analytics', 'hub-dashboard?tab=Analytics', 'hub-analytics'),
  review: frame(nehaBox, M, 'Review payment', 'payment-review?amount=2500', 'payment-review'),
};

// A screen's components in construction order: the children of its screen, opening up the containers that hold lists
const OPEN = '.phone-content, .overview, #hub-panel, .member-list, .request-body, .request-hero, #content, .limit-editor-form, .authorization-actions, .payment-footer';
async function prepare(f) {
  await f.loaded;
  const w = f.contentWindow, d = f.contentDocument;
  const style = d.createElement('style');
  style.textContent = `html, body { background: transparent !important; }
    *, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition: none !important; caret-color: transparent !important; }
    .phone-content { scroll-behavior: auto !important; }`;
  d.head.appendChild(style);
  for (let i = 1; i < 4000; i++) { w.clearInterval(i); w.clearTimeout(i); }   // no clocks: the countdown stays put
  await d.fonts.ready;
  // Let its scripts settle. Not the iframe's own requestAnimationFrame: Chrome pauses that for off-screen iframes,
  // and the phones start off-screen. Layout is forced by the measurements below anyway.
  await new Promise((r) => setTimeout(r, 60));
  const root = d.querySelector('.phone-screen');
  const scroller = root.querySelector('.phone-content');
  if (scroller) scroller.scrollTop = 0;
  const blocks = [];
  const walk = (node) => [...node.children].forEach((c) => {
    if (c.matches('.home-indicator, script, style, link')) return;
    if (c.matches(OPEN) && c.children.length) walk(c); else blocks.push(c);
  });
  walk(root);
  blocks.forEach((el) => { if (el.parentElement) el.parentElement.style.perspective = '900px'; });
  // Where a component sits in the world (measured before anything moves)
  const toWorld = (el) => {
    const r = el.getBoundingClientRect();
    return { x: f.origin.x + r.left, y: f.origin.y + r.top, w: r.width, h: r.height, cx: f.origin.x + r.left + r.width / 2, cy: f.origin.y + r.top + r.height / 2 };
  };
  // Rings, progress bars and chart lines draw on after their component lands
  const draws = [];
  root.querySelectorAll('.th-limit circle, .th-chart polyline, .th-chart path').forEach((el) => {
    const cs = w.getComputedStyle(el);
    if (cs.stroke === 'none' || typeof el.getTotalLength !== 'function') return;
    const len = el.getTotalLength();
    if (!len) return;
    if (cs.strokeDasharray !== 'none') draws.push({ el, from: parseFloat(cs.strokeDasharray), to: parseFloat(cs.strokeDashoffset) || 0 });
    else if (el.closest('.th-chart') && cs.fill === 'none') { el.style.strokeDasharray = `${len} ${len}`; draws.push({ el, from: len, to: 0 }); }
  });
  const bars = [...root.querySelectorAll('.th-progress > span')].map((el) => ({ el, to: parseFloat(el.style.width) || 0 }));
  const slider = root.querySelector('input[type=range]:not(.th-swipe__control)');
  let sliderHost = slider;
  while (sliderHost && typeof sliderHost.setValue !== 'function') sliderHost = sliderHost.parentElement;
  const swipe = root.querySelector('.th-swipe__control');
  return {
    f, w, d, root, scroller, draws, bars, slider, sliderHost, swipe, toWorld,
    maxScroll: scroller ? Math.max(0, scroller.scrollHeight - scroller.clientHeight) : 0,
    sliderBox: slider && toWorld(slider), swipeBox: swipe && toWorld(swipe),
    items: blocks.map((el) => ({ el, p: { v: 0 } })),
    // `base` can hold a screen fully shown, independent of its reveal beats
    show: { v: 0 }, base: { v: 0 }, fill: { v: 0 }, scroll: { v: 0 }, slide: { v: 0 }, swiped: { v: 0 },
    last: null, lastScroll: 0,
  };
}
const SCREENS = await Promise.all(Object.values(frames).map(prepare));
const [home, limitSc, approve, stats, review] = SCREENS;

const s = await studio({ id: 'turbo-hub-film', width: W, height: H, fps: FPS, frames: FRAMES });

// Camera views onto components: centred on them, zoomed so they fill most of the width
const focusOn = (sc, sel, fill = 0.7, max = 2.6) => {
  const el = sc.root.querySelector(sel);
  if (!el) return { x: C.x, y: C.y, zoom: 1.22 };
  const r = sc.toWorld(el);
  return { x: r.cx, y: r.cy, zoom: Math.max(1.4, Math.min(max, (fill * W) / r.w)) };
};

// ---------- 1 · the family on an isometric floor: the manager on a Hub platform, members around, money flowing ----------
// Seats are chosen by where they land on screen: on the floor ring's projected ellipse, angle φ ↔ floor angle φ + 45°.
const iso = { v: 1 };
const fam = div(world, 'family', 'Family', { left: 0, top: 0, width: '2416px', height: '2776px' });
const RING = 640, PLINTH = 230, PLINTH_H = 56;
const polar = (r, deg) => ({ x: C.x + r * Math.cos((deg * Math.PI) / 180), y: C.y + r * Math.sin((deg * Math.PI) / 180) });
const floor = svgEl('svg', { width: 2416, height: 2776, style: 'position:absolute;left:0;top:0;overflow:visible' });
const arcFrom = polar(RING + 190, 200), arcTo = polar(RING + 190, 70);
floor.innerHTML = `<defs><radialGradient id="hubGlow"><stop offset="0" stop-color="#cfe0ff"/><stop offset=".6" stop-color="#e7efff" stop-opacity=".8"/><stop offset="1" stop-color="#e7efff" stop-opacity="0"/></radialGradient>
  <linearGradient id="wordInk" x1="0" x2="1"><stop offset="0" stop-color="#dc4778"/><stop offset=".5" stop-color="#7b6fd8"/><stop offset="1" stop-color="#2a9d8f"/></linearGradient>
  <path id="membersArc" d="M${arcFrom.x},${arcFrom.y} A${RING + 190},${RING + 190} 0 0 0 ${arcTo.x},${arcTo.y}"/></defs>`;
floor.style.transform = 'translateZ(-2px)';
fam.appendChild(floor);
const disc = svgEl('circle', { cx: C.x, cy: C.y, r: 0, fill: 'url(#hubGlow)' });
const orbit = svgEl('circle', { cx: C.x, cy: C.y, r: RING, fill: 'none', stroke: '#356cdf', 'stroke-opacity': 0, 'stroke-width': 5, 'stroke-dasharray': '2 22', 'stroke-linecap': 'round' });
floor.append(disc, orbit);
// "Members", written along the front of the floor ring
const membersWord = svgEl('text', { class: 'floor-word', fill: 'url(#wordInk)', opacity: 0 });
const membersPath = svgEl('textPath', { href: '#membersArc', startOffset: '50%', 'text-anchor': 'middle' });
membersPath.textContent = 'Members';
membersWord.appendChild(membersPath);
floor.appendChild(membersWord);
// The Hub platform: stacked plates read as a solid disc in isometric
const plates = Array.from({ length: 12 }, (_, i) => div(fam, `plate${i === 11 ? ' plate--top' : ''}`, i === 11 ? 'Hub platform' : null,
  { left: `${C.x}px`, top: `${C.y}px`, width: `${PLINTH * 2}px`, height: `${PLINTH * 2}px` }));
// Seats, by screen angle on the ellipse (+45° gives the floor angle): Kavya upper left, Rohan behind, Neha upper right
const SEATS = { arun: null, kavya: 200 + 45, rohan: 270 + 45, neha: 340 + 45 };
const tokens = FAMILY.map((f, i) => {
  const shadow = div(fam, 'shadow', `${f.name} · shadow`);
  const line = svgEl('line', { stroke: f.color, 'stroke-opacity': 0.55, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0 });
  const dots = [0, 1, 2].map(() => svgEl('circle', { r: 11, fill: f.color, opacity: 0 }));
  floor.append(line, ...dots);
  const el = div(fam, 'token', `${i ? 'Member' : 'Manager'} · ${f.name}`);
  const size = i ? 200 : 270;
  img(el, 'avatar', avatarSrc(f.key), { position: 'relative', width: `${size}px`, height: `${size}px` });
  return { ...f, deg: SEATS[f.key], el, shadow, line, dots, lift: { v: 0 }, link: { v: 0 } };
});
// "Manager", standing in front of the platform
const managerWord = div(fam, 'token word', 'Manager word');
managerWord.innerHTML = '<small>the Hub’s</small><em>Manager</em>';
const plinth = { v: 0 }, wordP = { manager: { v: 0 }, members: { v: 0 } }, spin = { v: 0 }, dive = { v: 0 };

// ---------- 3 · limits: below the phone, the manager links to each member's own monthly limit ----------
const L = { x: C.x, y: C.y + 1500 };     // an empty stretch of floor below the phone
const R = 150, RC = 2 * Math.PI * R, TOP_LIMIT = 45000;
const limitsBox = div(world, 'limits', 'Limits', { left: 0, top: 0, width: '2416px', height: '2776px' });
const limitLinks = svgEl('svg', { width: 2416, height: 2776, style: 'position:absolute;left:0;top:0;overflow:visible' });
limitsBox.appendChild(limitLinks);
const setter = img(limitsBox, 'avatar', avatarSrc('arun'), { width: '190px', height: '190px', left: `${L.x - 95}px`, top: `${L.y - 520}px` });
setter.dataset.name = 'Limits · Arun';
const setterWord = div(limitsBox, 'word word--small', 'Sets each limit', { left: `${L.x}px`, top: `${L.y - 270}px` });
setterWord.innerHTML = '<small>the manager sets</small><em>each limit</em>';
const limits = FAMILY.slice(1).map((f, i) => {
  const x = L.x + (i - 1) * 390, y = L.y + 170;
  const link = svgEl('path', { d: `M${L.x},${L.y - 200} C${L.x},${L.y - 60} ${x},${y - 300} ${x},${y - 190}`, fill: 'none', stroke: f.color, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-opacity': 0.6 });
  limitLinks.appendChild(link);
  const len = link.getTotalLength();
  link.style.strokeDasharray = `${len} ${len}`;
  const el = div(limitsBox, 'gauge', `Limit · ${f.name}`, { left: `${x}px`, top: `${y}px` });
  const svg = svgEl('svg', { viewBox: '0 0 360 360' });
  svg.append(
    svgEl('circle', { cx: 180, cy: 180, r: 172, fill: '#fff' }),
    svgEl('circle', { cx: 180, cy: 180, r: R, fill: 'none', stroke: f.color, 'stroke-opacity': 0.14, 'stroke-width': 18 }));
  const arc = svgEl('circle', { cx: 180, cy: 180, r: R, fill: 'none', stroke: f.color, 'stroke-width': 18, 'stroke-linecap': 'round',
    'stroke-dasharray': RC, 'stroke-dashoffset': RC, transform: 'rotate(-90 180 180)' });
  svg.appendChild(arc);
  el.appendChild(svg);
  img(el, 'face', avatarSrc(f.key));
  div(el, 'name', null).textContent = f.name;
  const amount = div(el, 'amount', null);
  div(el, 'cap', null).textContent = 'monthly limit';
  return { ...f, el, arc, amount, link, len, frac: f.limit / TOP_LIMIT, p: { v: 0 }, enter: { v: 0 }, draw: { v: 0 } };
});
const setterP = { v: 0 }, limitsOut = { v: 0 };

// ---------- touch dot (the case study's playback language) ----------
const touch = div(world, 'touch', 'Touch');
div(touch, 'touch__ripple', null);
const ripple = { v: 0 };
// Each track puts the dot on a control while its `on` is up; `at()` gives the control's live position
const tracks = [
  { name: 'slider', on: { v: 0 }, at: () => {
    const b = limitSc.sliderBox, v = limitSc.last ?? 40000, t = clamp01((v - 500) / (100000 - 500));
    return { x: b.x + 14 + (b.w - 28) * t, y: b.cy };
  } },
  { name: 'review swipe', on: { v: 0 }, at: () => { const b = review.swipeBox; return { x: b.x + 28 + (b.w - 56) * review.swiped.v, y: b.cy }; } },
  { name: 'approve swipe', on: { v: 0 }, at: () => { const b = approve.swipeBox; return { x: b.x + 28 + (b.w - 56) * approve.swiped.v, y: b.cy }; } },
].filter((t) => { try { return !!t.at(); } catch { return false; } });

// ---------- 5 · view labels, the request and the approval ----------
const memberChip = chip(world, 'Member view', 'Member view', M.x, C.y - 500, 'light', ['neha']);
const managerViewChip = chip(world, 'Manager view', 'Manager view', C.x, C.y - 500, 'solid', ['arun']);
const notif = div(world, 'notif', 'Request to Arun');
img(notif, 'notif__face', avatarSrc('neha'));
const notifText = div(notif, 'notif__text', null);
notifText.innerHTML = '<b>₹2,500</b><span>Neha · Nykaa</span>';
const notifP = { v: 0 };
const burst = div(world, 'burst', 'Approved', { left: `${C.x}px`, top: `${C.y - 60}px` });
burst.innerHTML = `<svg viewBox="0 0 300 300"><circle class="wave" cx="150" cy="150" r="96" fill="none" stroke="#22a06b" stroke-width="6"/>
  <circle cx="150" cy="150" r="96" fill="#22a06b"/><path d="M106 152 L138 184 L196 120" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const wave = burst.querySelector('.wave');
const waveP = { v: 0 };
const tilt = { neha: { v: 0 }, arun: { v: 0 } };

// ---------- 7 · impact, a 3D deck flipping through ----------
const impactChip = chip(world, 'Impact', 'Impact', I.x, C.y - 470, 'light');
const IMPACT = [
  { value: 64, text: 'of invitees joined and paid within 30 days', bg: 'linear-gradient(140deg, #2d7be2, #4a57d5)' },
  { value: 58, text: 'of families paid again the next month', bg: 'linear-gradient(140deg, #e0577f, #c94070)' },
  { value: 48, text: 'of activated members were new to PayZapp', bg: 'linear-gradient(140deg, #8a7fe0, #4a57d5)' },
].map((m, i) => {
  const el = div(world, 'slide', `Impact · ${m.value}%`, { left: `${I.x}px`, top: `${C.y + 40}px`, background: m.bg, zIndex: 10 - i });
  const num = document.createElement('b'), cap = document.createElement('span');
  cap.textContent = m.text;
  el.append(num, cap);
  return { ...m, el, num };
});
const deck = { in: { v: 0 }, pos: { v: 0 }, out: { v: 0 } };

// ---------- 8 · an isometric wall of every screen ----------
const FIGMA = ['members', 'payment-review', 'analytics', 'hub-created', 'request-pending', 'spends', 'payment-receipt', 'hubs',
  'invitation', 'member-profile', 'authorization-confirmed', 'hub-intro-family', 'scan-qr', 'payment-methods', 'accounts-cards', 'member-details'];
const GRID = { dx: 500, dy: 960, cols: 3, rows: 3, drift: 420 };
const columns = [], tiles = [];
let n = 0;
for (let c = -GRID.cols; c <= GRID.cols; c++) {
  const col = div(world, 'column', `Column ${c}`);
  col.dir = c % 2 ? 1 : -1;
  columns.push(col);
  for (let r = -GRID.rows; r <= GRID.rows; r++) {
    if (!c && !r) continue;
    const x = C.x + c * GRID.dx, y = C.y + r * GRID.dy + (c % 2 ? GRID.dy / 2 : 0);
    const t = div(col, 'tile', `Screen ${c},${r}`, { left: `${x}px`, top: `${y}px` });
    img(t, '', `th/prototypes/shared/references/figma/${FIGMA[n++ % FIGMA.length]}.png`);
    tiles.push({ el: t, d: Math.hypot(x - C.x, y - C.y) });
  }
}
tiles.sort((a, b) => a.d - b.d);
const centreColumn = columns[GRID.cols];
arunBox.style.zIndex = 3;

// Wait for every image to load (not img.decode(): it can stall for images that are off-screen or hidden)
await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }))));
await document.fonts.load('700 100px Larken');
await document.fonts.load('italic 500 100px Larken');
await document.fonts.load('600 30px Helix');

// ---------- camera (no drift: the last frame must land exactly on the first) ----------
const cam = camera(s, $('cam'), {
  start: 'isoFam',
  drift: 0,
  views: {
    isoFam: { x: C.x, y: C.y - 110, zoom: 0.72 },
    phone: { x: C.x, y: C.y, zoom: 1.22 },
    limitCard: focusOn(home, '.th-limit'),
    limits: { x: L.x, y: L.y - 70, zoom: 1.0 },
    slider: limitSc.slider ? { x: limitSc.sliderBox.cx, y: limitSc.sliderBox.cy - 40, zoom: 2.0 } : { x: C.x, y: C.y, zoom: 1.22 },
    member: { x: M.x, y: C.y - 30, zoom: 1.12 },
    manager: { x: C.x, y: C.y - 30, zoom: 1.12 },
    hero: focusOn(approve, '.request-hero', 0.62, 2.2),
    impact: { x: I.x, y: C.y - 20, zoom: 1.0 },
    canvas: { x: C.x, y: C.y, zoom: 0.5 },
  },
});

// ---------- initial state ----------
const hide = (els) => gsap.set(els, { opacity: 0 });
hide([memberChip, managerViewChip, impactChip, burst, notif, ...tiles.map((t) => t.el)]);
gsap.set([memberChip, managerViewChip, impactChip], { xPercent: -50, yPercent: -50 });
gsap.set([arunBox, nehaBox], { transformPerspective: 2000 });
stats.items.forEach((it) => { it.p.v = 0; });

// Construct a screen's components one after another (the beat's stagger spaces them)
const construct = (b, sc) => sc.items.forEach((it, i) => b.fromTo(it.p, { v: 0 }, { v: 1 }, { i }));
const toggle = (b, proxy, from, to, at = 0) => b.fromTo(proxy, { v: from }, { v: to }, { at, dur: 1, ease: 'linear' });
const ARRIVE = [0.2, 0.75, 0.25, 1];
const DIVE = [0.55, 0, 0.3, 1];
// Flip Arun's phone edge-on, swap its screen at the edge, flip back (an angle, combined with its turn per frame)
const arunFlip = { v: 0 };
function flip(name, at, out, into, note) {
  s.beat(name, { at, dur: 24, note }, (b) => {
    b.fromTo(arunFlip, { v: 0 }, { v: 90 }, { dur: 12, ease: [0.5, 0, 1, 1] });
    toggle(b, out.show, 1, 0, 12);
    toggle(b, into.show, 0, 1, 12);
    b.fromTo(arunFlip, { v: -90 }, { v: 0 }, { at: 12, dur: 12, ease: [0, 0, 0.3, 1] });
  });
}

// ---------- 1 · the family on an isometric floor (no phone yet: on the card, the big mock rises in from below) ----------
s.beat('hub.glow', { at: 0, dur: 36, ease: 'settle', note: 'The Hub glows out on the floor' }, (b) => b.fromTo(disc, { attr: { r: 0 } }, { attr: { r: 900 } }));
s.beat('plinth.rise', { at: 4, dur: 30, ease: ARRIVE, note: 'The Hub platform rises out of the floor' }, (b) => b.fromTo(plinth, { v: 0 }, { v: 1 }));
s.beat('manager.in', { at: 14, dur: 28, ease: ARRIVE, note: 'Arun, the manager, rises onto the platform' }, (b) => b.fromTo(tokens[0].lift, { v: 0 }, { v: 1 }));
s.beat('members.rise', { at: 24, dur: 30, stagger: 6, ease: ARRIVE, note: 'Kavya, Neha and Rohan rise around him' },
  (b) => tokens.slice(1).forEach((t, i) => b.fromTo(t.lift, { v: 0 }, { v: 1 }, { i })));
s.beat('family.links', { at: 36, dur: 24, stagger: 4, ease: 'move', note: 'Each member links to the Hub; money flows along the links' },
  (b) => tokens.slice(1).forEach((t, i) => b.fromTo(t.link, { v: 0 }, { v: 1 }, { i })));
s.beat('words.in', { at: 46, dur: 26, stagger: 8, ease: ARRIVE, note: '“Manager” stands up; “Members” slides along the ring' },
  (b) => [wordP.manager, wordP.members].forEach((w, i) => b.fromTo(w, { v: 0 }, { v: 1 }, { i })));
s.beat('family.orbit', { at: 0, dur: 150, ease: 'move', note: 'The family turns slowly around the Hub' }, (b) => b.fromTo(spin, { v: 0 }, { v: 1 }));
s.beat('family.dive', { at: 112, dur: 26, ease: DIVE, note: 'Everyone gathers into the Hub' }, (b) => b.fromTo(dive, { v: 0 }, { v: 1 }));
s.beat('phone.rise', { at: 120, dur: 38, ease: ARRIVE, note: 'Arun’s phone rises from below as the floor tips up' }, (b) => {
  toggle(b, home.show, 0, 1);
  b.fromTo(arunBox, { opacity: 0, y: 900, rotationX: 50 }, { opacity: 1, y: 0, rotationX: 0 });
});
s.beat('iso.out', { at: 120, dur: 42, ease: 'move', note: 'The floor tips back up; push in on the phone' }, (b) => {
  b.fromTo(iso, { v: 1 }, { v: 0 });
  b.fromTo(disc, { attr: { r: 900 } }, { attr: { r: 0 } }, { dur: 26, ease: 'exit' });
  cam.to(b, 'phone');
});

// ---------- 2 · Hub home: construct, then zoom into the limit, then scroll ----------
s.beat('home.construct', { at: 148, dur: 18, stagger: 3, ease: 'settle', note: 'Members screen constructs piece by piece; the whole screen shows' }, (b) => construct(b, home));
s.beat('cam.limit', { at: 200, dur: 28, ease: 'move', note: 'Zoom into the monthly limit' }, (b) => cam.to(b, 'limitCard'));
s.beat('home.fill', { at: 210, dur: 32, ease: 'move', note: 'The limit ring and member bars fill' }, (b) => b.fromTo(home.fill, { v: 0 }, { v: 1 }));
s.beat('cam.home', { at: 248, dur: 28, ease: 'move', note: 'Zoom back out' }, (b) => cam.to(b, 'phone'));
s.beat('home.scroll', { at: 256, dur: 34, ease: 'move', note: 'The screen scrolls; the header collapses' },
  (b) => b.fromTo(home.scroll, { v: 0 }, { v: Math.min(home.maxScroll, 320) }));

// ---------- 3 · limits: pan down below the phone ----------
s.beat('pan.limits', { at: 294, dur: 30, ease: 'move', note: 'Pan down below the phone to the limits' }, (b) => {
  cam.to(b, 'limits');
  b.fromTo(home.scroll, { v: Math.min(home.maxScroll, 320) }, { v: 0 }, { at: 20, dur: 10 });
});
s.beat('limits.manager', { at: 304, dur: 22, ease: ARRIVE, note: 'Arun, and the words “the manager sets each limit”' }, (b) => b.fromTo(setterP, { v: 0 }, { v: 1 }));
s.beat('limits.links', { at: 314, dur: 22, stagger: 4, ease: 'move', note: 'A link runs from Arun to each member' }, (b) => limits.forEach((l, i) => b.fromTo(l.draw, { v: 0 }, { v: 1 }, { i })));
s.beat('limits.in', { at: 320, dur: 22, stagger: 4, ease: ARRIVE, note: 'Each member’s gauge flips up into place' }, (b) => limits.forEach((l, i) => b.fromTo(l.enter, { v: 0 }, { v: 1 }, { i })));
s.beat('limits.fill', { at: 334, dur: 34, stagger: 5, ease: 'move', note: 'Each gauge sweeps to that member’s limit as the amount counts up' },
  (b) => limits.forEach((l, i) => b.fromTo(l.p, { v: 0 }, { v: 1 }, { i })));
s.beat('limits.out', { at: 386, dur: 14, ease: 'exit', note: 'The limits clear as the camera leaves' }, (b) => b.fromTo(limitsOut, { v: 0 }, { v: 1 }));

// ---------- 4 · spending limit: flip, construct, zoom, drag ----------
s.beat('phone.front', { at: 384, dur: 26, ease: 'move', note: 'Pan back up to the phone' }, (b) => cam.to(b, 'phone'));
flip('flip.limit', 396, home, limitSc, 'Phone flips to Spending limit');
s.beat('limit.construct', { at: 412, dur: 18, stagger: 3, ease: 'settle', note: 'Spending limit constructs' }, (b) => construct(b, limitSc));
s.beat('cam.slider', { at: 440, dur: 22, ease: 'move', note: 'Zoom into the slider' }, (b) => cam.to(b, 'slider'));
s.beat('touch.slider', { at: 448, dur: 40, note: 'The touch dot drags the limit down to ₹5,000' }, (b) => {
  const t = tracks.find((x) => x.name === 'slider');
  if (t) { b.fromTo(t.on, { v: 0 }, { v: 1 }, { dur: 8, ease: 'fade' }); b.fromTo(t.on, { v: 1 }, { v: 0 }, { at: 34, dur: 6, ease: 'fade' }); }
  b.fromTo(ripple, { v: 0 }, { v: 1 }, { at: 4, dur: 14, ease: 'settle' });
  b.fromTo(limitSc.slide, { v: 0 }, { v: 1 }, { at: 8, dur: 26, ease: 'move' });
});
s.beat('cam.limitOut', { at: 482, dur: 22, ease: 'move', note: 'Zoom back out' }, (b) => cam.to(b, 'phone'));

// ---------- 5 · member view, then manager view ----------
s.beat('pan.member', { at: 500, dur: 30, ease: 'move', note: 'Pan left to Neha’s phone; it turns to face us' }, (b) => {
  cam.to(b, 'member');
  toggle(b, review.show, 0, 1);
  b.fromTo(tilt.neha, { v: 1 }, { v: 0 });
  b.fromTo(tilt.arun, { v: 0 }, { v: 1 });
  b.fromTo(memberChip, { opacity: 0, y: 20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1 }, { at: 14, dur: 16, ease: 'overshoot' });
});
s.beat('review.construct', { at: 508, dur: 18, stagger: 3, ease: 'settle', note: 'Review payment constructs' }, (b) => construct(b, review));
s.beat('touch.review', { at: 536, dur: 30, note: 'Swipe to pay' }, (b) => {
  const t = tracks.find((x) => x.name === 'review swipe');
  if (t) { b.fromTo(t.on, { v: 0 }, { v: 1 }, { dur: 6, ease: 'fade' }); b.fromTo(t.on, { v: 1 }, { v: 0 }, { at: 26, dur: 4, ease: 'fade' }); }
  b.fromTo(review.swiped, { v: 0 }, { v: 1 }, { at: 6, dur: 18, ease: 'move' });
});
s.beat('request.fly', { at: 564, dur: 30, ease: 'move', note: 'The request flies to Arun’s phone; the camera rides along' }, (b) => {
  b.fromTo(notif, { opacity: 0 }, { opacity: 1 }, { dur: 6 });
  b.fromTo(notifP, { v: 0 }, { v: 1 });
  b.fromTo(notif, { opacity: 1 }, { opacity: 0 }, { at: 26, dur: 6, ease: 'exit' });
  b.fromTo(tilt.arun, { v: 1 }, { v: 0 });
  toggle(b, approve.show, 0, 1);
  toggle(b, limitSc.show, 1, 0, 1);
  b.fromTo(managerViewChip, { opacity: 0, y: 20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1 }, { at: 16, dur: 16, ease: 'overshoot' });
  cam.to(b, 'manager');
});
s.beat('approve.construct', { at: 586, dur: 18, stagger: 3, ease: 'settle', note: 'Payment request constructs' }, (b) => construct(b, approve));
s.beat('cam.hero', { at: 604, dur: 22, ease: 'move', note: 'Zoom into who, where and how much' }, (b) => cam.to(b, 'hero'));
s.beat('cam.heroOut', { at: 632, dur: 22, ease: 'move', note: 'Zoom back out' }, (b) => cam.to(b, 'manager'));
s.beat('touch.approve', { at: 648, dur: 28, note: 'Swipe to approve' }, (b) => {
  const t = tracks.find((x) => x.name === 'approve swipe');
  if (t) { b.fromTo(t.on, { v: 0 }, { v: 1 }, { dur: 6, ease: 'fade' }); b.fromTo(t.on, { v: 1 }, { v: 0 }, { at: 24, dur: 4, ease: 'fade' }); }
  b.fromTo(approve.swiped, { v: 0 }, { v: 1 }, { at: 6, dur: 18, ease: 'move' });
});
s.beat('approve.burst', { at: 674, dur: 16, ease: 'overshoot', note: 'Approved' }, (b) => {
  b.fromTo(burst, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1 });
  b.fromTo(waveP, { v: 0 }, { v: 1 }, { dur: 22, ease: 'settle' });
});

// ---------- 6 · analytics ----------
s.beat('analytics.clear', { at: 690, dur: 10, ease: 'exit', note: 'Labels and the tick clear' }, (b) => {
  b.fromTo([burst, memberChip, managerViewChip], { opacity: 1 }, { opacity: 0 });
  toggle(b, review.show, 1, 0, 10);
});
flip('flip.analytics', 692, approve, stats, 'Phone flips to Analytics');
s.beat('stats.construct', { at: 706, dur: 16, stagger: 2, ease: 'settle', note: 'Analytics constructs' }, (b) => construct(b, stats));
s.beat('stats.fill', { at: 716, dur: 26, ease: 'move', note: 'Spending trend draws on' }, (b) => b.fromTo(stats.fill, { v: 0 }, { v: 1 }));

// ---------- 7 · impact ----------
s.beat('pan.impact', { at: 734, dur: 26, ease: 'move', note: 'Pan right to the impact deck' }, (b) => {
  cam.to(b, 'impact');
  b.fromTo(impactChip, { opacity: 0, y: 20, scale: 0.8 }, { opacity: 1, y: 0, scale: 1 }, { at: 12, dur: 16, ease: 'overshoot' });
});
s.beat('deck.in', { at: 742, dur: 24, ease: ARRIVE, note: 'The deck rises in; 64% counts up' }, (b) => b.fromTo(deck.in, { v: 0 }, { v: 1 }));
s.beat('deck.flip1', { at: 774, dur: 18, ease: 'move', note: '64% flips away; 58% comes forward' }, (b) => b.fromTo(deck.pos, { v: 0 }, { v: 1 }));
s.beat('deck.flip2', { at: 798, dur: 18, ease: 'move', note: '58% flips away; 48% comes forward' }, (b) => b.fromTo(deck.pos, { v: 1 }, { v: 2 }));

// ---------- 8 · isometric wall of screens, then back to the empty page ----------
s.beat('wall.in', { at: 818, dur: 26, ease: 'move', note: 'Tip into an isometric wall of every screen' }, (b) => {
  b.fromTo(iso, { v: 0 }, { v: 1 });
  b.fromTo(deck.out, { v: 0 }, { v: 1 }, { dur: 10, ease: 'exit' });
  b.fromTo(impactChip, { opacity: 1 }, { opacity: 0 }, { dur: 10, ease: 'exit' });
  cam.to(b, 'canvas');
});
s.beat('wall.ripple', { at: 822, dur: 16, stagger: 0.3, ease: 'settle', note: 'Screens ripple in around Analytics' },
  (b) => b.each(tiles.map((t) => t.el), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1 }));
s.beat('wall.drift', { at: 818, dur: 30, ease: 'linear', note: 'Columns drift, alternately up and down' }, (b) => {
  columns.forEach((col) => b.fromTo(col, { y: 0 }, { y: col.dir * GRID.drift }));
  b.fromTo(arunBox, { y: 0 }, { y: centreColumn.dir * GRID.drift });
});
s.beat('loop.out', { at: 848, dur: 10, stagger: 0.2, ease: 'exit', note: 'The wall falls away to the empty page; the loop restarts on the same frame' }, (b) => {
  b.each([...tiles.map((t) => t.el)].reverse(), { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.85 });
  b.fromTo(arunBox, { opacity: 1 }, { opacity: 0 }, { at: 8, dur: 12 });
});

// ---------- per frame ----------
function paint(sc) {
  const v = Math.max(sc.show.v, sc.base.v);
  sc.f.style.opacity = v;
  sc.f.style.visibility = v > 0.001 ? 'visible' : 'hidden';
  if (v <= 0.001) return;
  const base = sc.base.v;
  if (sc.scroller) {
    const want = Math.round(sc.scroll.v);
    if (want !== sc.lastScroll || sc.scroller.scrollTop !== want) {
      sc.lastScroll = want;
      sc.scroller.scrollTop = want;
      sc.scroller.dispatchEvent(new sc.w.Event('scroll'));   // the page's own header collapse, applied now
    }
  }
  sc.items.forEach(({ el, p }) => {
    const k = Math.max(p.v, base);
    el.style.filter = k >= 1 ? '' : `opacity(${k})`;
    el.style.translate = k >= 1 ? '' : `0 ${(1 - k) * 46}px`;
    el.style.rotate = k >= 1 ? '' : `x ${(1 - k) * 38}deg`;
    el.style.scale = k >= 1 ? '' : `${0.94 + 0.06 * k}`;
  });
  const fill = Math.max(sc.fill.v, base);
  sc.draws.forEach((d) => { d.el.style.strokeDashoffset = lerp(d.from, d.to, fill); });
  sc.bars.forEach((d) => { d.el.style.width = `${d.to * fill}%`; });
  if (sc.slider) {
    const value = Math.round(lerp(40000, 5000, sc.slide.v) / 500) * 500;   // a long sweep down to Neha’s ₹5,000
    if (value !== sc.last) {
      sc.last = value;
      if (sc.sliderHost) sc.sliderHost.setValue(value);
      else { sc.slider.value = value; sc.slider.dispatchEvent(new sc.w.Event('input', { bubbles: true })); }
    }
  }
  if (sc.swipe) sc.swipe.value = Math.round(sc.swiped.v * 100);
}

s.onFrame((f) => {
  paintBackground(f);

  // Isometric: the world tips about the phone, orthographically; floating things turn back to face the camera
  const k = iso.v;
  world.style.transformOrigin = `${C.x}px ${C.y}px`;
  world.style.transform = k > 0.0005 ? `rotateX(${55 * k}deg) rotateZ(${-45 * k}deg)` : '';
  world.style.transformStyle = k > 0.0005 ? 'preserve-3d' : 'flat';
  const face = `rotateZ(${45 * k}deg) rotateX(${-55 * k}deg)`;

  // The family
  const r = disc.r.baseVal.value, dv = dive.v, gone = 1 - clamp01((dv - 0.5) / 0.5);
  orbit.setAttribute('stroke-opacity', 0.3 * clamp01(r / 900));
  orbit.setAttribute('transform', `rotate(${f * 0.4} ${C.x} ${C.y})`);
  plates.forEach((pl, i) => Object.assign(pl.style, { opacity: clamp01(plinth.v * 3) * gone,
    transform: `translate(-50%, -50%) translateZ(${(i / 11) * PLINTH_H * plinth.v}px) scale(${lerp(0.3, 1, plinth.v) * lerp(1, 0.4, dv)})` }));
  const turn = spin.v * 14;
  tokens.forEach((tk, i) => {
    const seat = i ? polar(RING, tk.deg + turn) : C;
    const x = lerp(seat.x, C.x, dv), y = lerp(seat.y, C.y, dv), lift = tk.lift.v;
    const op = clamp01(lift * 1.5) * gone;
    const base = i ? 30 : PLINTH_H * plinth.v + 10;
    Object.assign(tk.el.style, { left: `${x}px`, top: `${y}px`, opacity: op,
      transform: `translate(-50%, -100%) translateZ(${(base + lift * 70) * (1 - dv)}px) ${face} scale(${lerp(0.5, 1, lift) * lerp(1, 0.3, dv)})` });
    Object.assign(tk.shadow.style, { left: `${x}px`, top: `${y}px`, opacity: i ? op * 0.55 * k : 0, transform: `translate(-50%, -50%) scale(${lerp(0.4, 1, lift)})` });
    if (!i) return;
    // a link from the platform's edge to the member, with ₹ dots flowing outwards along it
    const ang = Math.atan2(y - C.y, x - C.x), sx = C.x + Math.cos(ang) * PLINTH, sy = C.y + Math.sin(ang) * PLINTH;
    const ex = lerp(sx, x, tk.link.v), ey = lerp(sy, y, tk.link.v);
    tk.line.setAttribute('x1', sx); tk.line.setAttribute('y1', sy); tk.line.setAttribute('x2', ex); tk.line.setAttribute('y2', ey);
    tk.line.setAttribute('opacity', tk.link.v > 0 ? gone : 0);
    tk.dots.forEach((d, j) => {
      const u = ((f / 40) + j / 3 + i * 0.17) % 1;
      d.setAttribute('cx', lerp(sx, x, u)); d.setAttribute('cy', lerp(sy, y, u));
      d.setAttribute('opacity', tk.link.v >= 1 ? Math.sin(u * Math.PI) * gone : 0);
    });
  });
  const front = polar(PLINTH + 150, 135 + turn);
  Object.assign(managerWord.style, { left: `${front.x}px`, top: `${front.y}px`, opacity: wordP.manager.v * gone,
    transform: `translate(-50%, -50%) translateZ(${40 + 30 * wordP.manager.v}px) ${face} scale(${lerp(0.7, 1, wordP.manager.v)})` });
  membersWord.setAttribute('opacity', wordP.members.v * gone);
  membersPath.setAttribute('startOffset', `${lerp(30, 50, wordP.members.v)}%`);
  membersWord.setAttribute('transform', `rotate(${turn} ${C.x} ${C.y})`);

  SCREENS.forEach(paint);

  // Phones turn toward each other while the camera travels between them
  gsap.set(nehaBox, { rotationY: 26 * tilt.neha.v });
  gsap.set(arunBox, { rotationY: arunFlip.v - 26 * tilt.arun.v });

  // Limits
  const lo = 1 - limitsOut.v;
  Object.assign(setter.style, { opacity: setterP.v * lo, transform: `scale(${lerp(0.5, 1, setterP.v)})` });
  Object.assign(setterWord.style, { opacity: clamp01(setterP.v * 1.4 - 0.4) * lo, transform: `translate(-50%, -50%) translateY(${(1 - setterP.v) * 24}px)` });
  limits.forEach((l) => {
    l.link.style.strokeDashoffset = l.len * (1 - l.draw.v);
    l.link.style.opacity = lo;
    const e = l.enter.v;
    Object.assign(l.el.style, { opacity: clamp01(e * 1.5) * lo, transform: `perspective(1400px) translateY(${(1 - e) * 60}px) rotateX(${(1 - e) * 70}deg) scale(${lerp(0.8, 1, e)})` });
    l.arc.setAttribute('stroke-dashoffset', RC * (1 - Math.max(0.04, l.frac) * l.p.v));
    l.amount.textContent = inr(Math.round((l.limit * l.p.v) / 100) * 100);
  });

  // Touch dot
  const live = tracks.reduce((best, tr) => (tr.on.v > (best?.on.v ?? 0) ? tr : best), null);
  if (live) {
    const p = live.at();
    Object.assign(touch.style, { left: `${p.x}px`, top: `${p.y}px`, opacity: live.on.v });
    touch.firstChild.style.transform = `scale(${1 + ripple.v * 1.6})`;
    touch.firstChild.style.opacity = live.name === 'slider' ? 1 - ripple.v : 0;
  } else touch.style.opacity = 0;

  // The request's flight: an arc toward the camera and down onto Arun's phone
  const q = notifP.v;
  const nx = quad(M.x + 30, (M.x + C.x) / 2, C.x, q), ny = quad(C.y - 260, C.y - 760, C.y - 330, q);
  Object.assign(notif.style, { left: `${nx}px`, top: `${ny}px`,
    transform: `translate(-50%, -50%) perspective(1200px) rotateX(${(1 - q) * 18}deg) rotateZ(${lerp(-6, 0, q)}deg) scale(${1 + Math.sin(q * Math.PI) * 0.4})` });

  wave.setAttribute('r', lerp(96, 150, waveP.v));
  wave.setAttribute('stroke-opacity', 1 - waveP.v);

  // Impact deck
  IMPACT.forEach((m, i) => {
    const rel = i - deck.pos.v, enter = clamp01(deck.in.v * 1.3 - i * 0.15), out = deck.out.v;
    let tf, op;
    if (rel < 0) {
      const g = clamp01(-rel);
      tf = `perspective(2000px) translateY(${-320 * g}px) rotateX(${68 * g}deg) scale(${1 - 0.1 * g})`;
      op = 1 - g;
    } else {
      tf = `perspective(2000px) translateY(${-54 * rel + (1 - enter) * 500}px) rotateX(${(1 - enter) * -30}deg) scale(${1 - 0.07 * rel})`;
      op = enter * (1 - 0.28 * rel);
    }
    Object.assign(m.el.style, { transform: tf, opacity: op * (1 - out), zIndex: 10 - i });
    m.num.innerHTML = `${Math.round(m.value * clamp01(1 - Math.abs(rel)) * (i ? 1 : enter))}<sup>%</sup>`;
  });
});

s.ready();
