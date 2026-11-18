// turbo-hub-explainer · 1208x1388 (302:347, the case study card) · 30 fps · 20 s · animatic
// A showcase, not an explanation: a few seconds of the family (one manager, everyone else a member), then the
// screens, each revealing its components. Rough sketch art; the only words are the screens' own UI labels.
import { gsap } from 'gsap';
import { studio } from '@studio/studio.js';
import { camera } from '@studio/kits/camera.js';
import { sketch, shotHud, HAND } from '@studio/kits/sketch.js';

const W = 1208, H = 1388, FPS = 30;
await document.fonts.load(`40px ${HAND}`);
const s = await studio({ id: 'turbo-hub-explainer', width: W, height: H, fps: FPS, frames: 692 });

const INK = '#2b2b2b', PAPER = '#FAF8F2', GOLD = '#f2d27a', OK = '#4f9a5c', HUB = '#7a6fc4', HUB_PALE = '#ebe7f5';
const NS = 'http://www.w3.org/2000/svg';
const $ = (id) => document.getElementById(id);
const world = $('world'), ui = $('ui');

// The case study's roles: the father manages the Hub; mother, daughter, son and grandmother are members
const MANAGER = { key: 'father', accent: '#536ee8' };
const FAM = [
  { key: 'mother', accent: '#ba7a47', level: 0.62 },
  { key: 'daughter', accent: '#7b6fd8', level: 0.3 },
  { key: 'son', accent: '#408da3', level: 0.82 },
  { key: 'grandmother', accent: '#7788ba', level: 0.45 },
];
const DAUGHTER = FAM[1].accent;

// ---------- drawing helpers ----------
let seed = 1;
const draw = (svg) => sketch(svg, { seed: (seed += 40) });
const svgEl = (tag, attrs = {}) => { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); return e; };
const box = (parent, name, x, y, w, h, z) => {
  const d = document.createElement('div');
  d.className = 'a';
  d.dataset.name = name;
  Object.assign(d.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` });
  if (z !== undefined) d.style.zIndex = z;
  parent.appendChild(d);
  return d;
};

// A drawable box: its SVG viewBox matches its own rectangle, so it is drawn in its parent's coordinates.
function comp(parent, name, x, y, w, h, z) {
  const div = box(parent, name, x, y, w, h, z);
  div.classList.add('actor');
  const svg = svgEl('svg', { viewBox: `${x} ${y} ${w} ${h}`, width: w, height: h });
  div.appendChild(svg);
  return { div, svg, k: draw(svg) };
}
// A drawable centred on (cx, cy)
const actor = (parent, name, cx, cy, w, h, z) => comp(parent, name, cx - w / 2, cy - h / 2, w, h, z);

function strokes(node) {
  const paths = [...node.querySelectorAll('path')];
  paths.forEach((p) => { p.__len = p.getTotalLength(); p.style.strokeDasharray = `${p.__len} ${p.__len}`; p.style.strokeDashoffset = p.__len; });
  return paths;
}
const drawOn = (b, paths, x = {}) => b.fromTo(paths, { strokeDashoffset: (i, el) => el.__len }, { strokeDashoffset: 0 }, x);

function avatar(k, g, cx, cy, d, accent) {
  k.circle(g, cx, cy, d, { fill: accent, fillStyle: 'hachure', hachureGap: Math.max(4, d / 16), fillWeight: 2 });
  k.circle(g, cx, cy - d * 0.12, d * 0.36, { fill: '#fff', strokeWidth: Math.max(1.2, d / 70) });
  k.path(g, `M${cx - d * 0.28},${cy + d * 0.38} C${cx - d * 0.26},${cy + d * 0.12} ${cx + d * 0.26},${cy + d * 0.12} ${cx + d * 0.28},${cy + d * 0.38}`,
    { fill: '#fff', strokeWidth: Math.max(1.2, d / 70) });
}
// A progress ring: grey track plus an arc whose fill follows `level.v`
const arcs = [];
function ring(svg, cx, cy, r, width, accent, level) {
  svg.appendChild(svgEl('circle', { cx, cy, r, fill: 'none', stroke: '#e3dfd5', 'stroke-width': width }));
  const c = 2 * Math.PI * r;
  const arc = svgEl('circle', { cx, cy, r, fill: 'none', stroke: accent, 'stroke-width': width, 'stroke-linecap': 'round',
    'stroke-dasharray': c, 'stroke-dashoffset': c, transform: `rotate(-90 ${cx} ${cy})` });
  svg.appendChild(arc);
  arcs.push({ arc, c, level });
}
const check = (k, g, cx, cy, d) => {
  k.circle(g, cx, cy, d, { fill: '#d6ecd6', stroke: OK, strokeWidth: 2.5 });
  k.path(g, `M${cx - d * 0.24},${cy + d * 0.02} L${cx - d * 0.06},${cy + d * 0.2} L${cx + d * 0.26},${cy - d * 0.2}`, { stroke: OK, strokeWidth: d / 18, roughness: 0.6 });
};
const heading = (scr, name, text) => {
  const c = comp(scr, name, 16, 56, 328, 64);
  c.k.text(c.svg, 40, 102, text, { size: 30, weight: 700 });
  return c;
};
const button = (scr, name, text, fill, y = 630) => {
  const c = comp(scr, name, 30, y, 300, 64);
  c.k.rect(c.svg, 30, y, 300, 64, { r: 32, fill, fillStyle: 'solid' });
  c.k.text(c.svg, 180, y + 42, text, { size: 27, anchor: 'middle', weight: 700, color: '#fff' });
  return c;
};

// ---------- phones ----------
// A phone is an outer box in the world (moved, scaled, layered) holding a 360x740 inner screen space.
const PW = 440, S = PW / 360, PHH = 740 * S;
function phone(name, cx, cy, z = 2, parent = world) {
  const outer = box(parent, name, cx - PW / 2, cy - PHH / 2, PW, PHH, z);
  const inner = box(outer, `${name} · screen space`, 0, 0, 360, 740);
  inner.style.transform = `scale(${S})`;
  inner.style.transformOrigin = '0 0';
  const body = comp(inner, `${name} · body`, 0, 0, 360, 740, 0);
  body.k.rect(body.svg, 4, 4, 352, 732, { r: 46, fill: '#fff', strokeWidth: 2.6 });
  body.k.rect(body.svg, 16, 16, 328, 708, { r: 34, fill: '#f6f4ee', strokeWidth: 1, stroke: '#cfcabf' });
  body.k.rect(body.svg, 150, 28, 60, 14, { r: 7, fill: INK, roughness: 0.4 });
  return { outer, inner, at: (x, y) => ({ x: cx - PW / 2 + x * S, y: cy - PHH / 2 + y * S }) };
}
const screenOf = (ph, name) => box(ph.inner, `${name} screen`, 0, 0, 360, 740, 2);

// Screens: each returns its components (`parts`, in reveal order) and anything animated inside them
function homeScreen(ph) {
  const scr = screenOf(ph, 'Hub home');
  const head = comp(scr, 'Hub header', 16, 56, 328, 64);
  head.k.text(head.svg, 40, 102, 'The Sharma’s', { size: 30, weight: 700 });
  [MANAGER, ...FAM].forEach((f, i) => head.k.circle(head.svg, 248 + i * 20, 92, 26, { fill: f.accent, roughness: 0.5 }));
  const limit = comp(scr, 'Monthly limit card', 30, 128, 300, 130);
  limit.k.rect(limit.svg, 30, 128, 300, 130, { r: 22, fill: HUB_PALE, stroke: HUB, strokeWidth: 1.4 });
  limit.k.scribble(limit.svg, 52, 162, 90, { strokeWidth: 5 });
  const amount = limit.k.text(limit.svg, 52, 212, '₹18,400', { size: 40, weight: 700 });
  limit.svg.appendChild(svgEl('line', { x1: 52, y1: 236, x2: 308, y2: 236, stroke: '#d6d0ea', 'stroke-width': 9, 'stroke-linecap': 'round' }));
  const bar = svgEl('line', { x1: 52, y1: 236, x2: 52 + 256 * 0.46, y2: 236, stroke: HUB, 'stroke-width': 9, 'stroke-linecap': 'round' });
  limit.svg.appendChild(bar);
  const tabs = comp(scr, 'Tabs', 30, 276, 300, 40);
  [0, 1, 2].forEach((i) => {
    tabs.k.rect(tabs.svg, 30 + i * 102, 276, 96, 40, { r: 20, fill: i ? '#fff' : HUB, strokeWidth: 1.2 });
    tabs.k.scribble(tabs.svg, 52 + i * 102, 296, 52, { strokeWidth: 4, stroke: i ? '#c9c9c9' : '#fff' });
  });
  const rows = FAM.map((f, i) => {
    const y = 334 + i * 82;
    const r = comp(scr, `Member row · ${f.key}`, 30, y, 300, 70);
    r.k.rect(r.svg, 30, y, 300, 70, { r: 18, fill: '#fff', strokeWidth: 1.4 });
    avatar(r.k, r.svg, 66, y + 35, 44, f.accent);
    r.k.scribble(r.svg, 100, y + 28, 100 - i * 8, { strokeWidth: 5, stroke: '#9a9a9a' });
    r.k.scribble(r.svg, 100, y + 48, 60, { strokeWidth: 4 });
    r.level = { v: f.level };
    ring(r.svg, 298, y + 35, 16, 5, f.accent, r.level);
    r.avatarAt = ph.at(66, y + 35);
    return r;
  });
  const add = comp(scr, 'Add member button', 110, 670, 140, 44);
  add.k.rect(add.svg, 110, 670, 140, 44, { r: 22, fill: '#fff', stroke: HUB, strokeWidth: 1.6 });
  add.k.text(add.svg, 180, 702, '+', { size: 30, anchor: 'middle', weight: 700, color: HUB });
  return { scr, parts: [head, limit, tabs, ...rows, add], limit, rows, amount, bar };
}

function inviteScreen(ph) {
  const scr = screenOf(ph, 'Add member');
  const head = heading(scr, 'Add member header', 'Add member');
  const who = comp(scr, 'Invitee avatar', 110, 128, 140, 140);
  avatar(who.k, who.svg, 180, 198, 124, DAUGHTER);
  const fields = comp(scr, 'Invite fields', 30, 290, 300, 124);
  [290, 360].forEach((y, i) => {
    fields.k.rect(fields.svg, 30, y, 300, 54, { r: 14, fill: '#fff', strokeWidth: 1.2 });
    fields.k.scribble(fields.svg, 50, y + 28, 120 - i * 30, { strokeWidth: 5, stroke: '#9a9a9a' });
  });
  const limit = comp(scr, 'Limit on invite', 30, 436, 300, 130);
  limit.k.rect(limit.svg, 30, 436, 300, 130, { r: 22, fill: HUB_PALE, stroke: HUB, strokeWidth: 1.4 });
  const amount = limit.k.text(limit.svg, 180, 498, '₹5,000', { size: 46, anchor: 'middle', weight: 700 });
  limit.svg.appendChild(svgEl('line', { x1: 60, y1: 538, x2: 300, y2: 538, stroke: '#d6d0ea', 'stroke-width': 9, 'stroke-linecap': 'round' }));
  const fill = svgEl('line', { x1: 60, y1: 538, x2: 300, y2: 538, stroke: HUB, 'stroke-width': 9, 'stroke-linecap': 'round' });
  limit.svg.appendChild(fill);
  const knob = comp(scr, 'Limit knob', 282, 520, 36, 36);
  knob.k.circle(knob.svg, 300, 538, 32, { fill: '#fff', stroke: HUB, strokeWidth: 2.4 });
  const send = button(scr, 'Invite button', 'Invite', HUB);
  return { scr, parts: [head, who, fields, limit, knob, send], amount, fill, knob };
}

function reviewScreen(ph) {
  const scr = screenOf(ph, 'Pay');
  const head = heading(scr, 'Pay header', 'Pay');
  const merch = comp(scr, 'Merchant', 110, 130, 140, 150);
  merch.k.circle(merch.svg, 180, 186, 96, { fill: GOLD });
  merch.k.scribble(merch.svg, 136, 260, 88, { strokeWidth: 5, stroke: '#9a9a9a' });
  const amt = comp(scr, 'Payment amount', 40, 290, 280, 80);
  amt.k.text(amt.svg, 180, 350, '₹2,500', { size: 60, anchor: 'middle', weight: 700 });
  const chip = comp(scr, 'Paid from the Hub', 100, 384, 160, 40);
  chip.k.rect(chip.svg, 100, 384, 160, 40, { r: 20, fill: HUB_PALE, stroke: HUB, strokeWidth: 1.2 });
  chip.k.circle(chip.svg, 124, 404, 20, { fill: HUB, roughness: 0.4 });
  chip.k.scribble(chip.svg, 144, 404, 92, { strokeWidth: 4 });
  const ask = button(scr, 'Ask to pay button', 'Ask to pay', DAUGHTER);
  return { scr, parts: [head, merch, amt, chip, ask] };
}

function approveScreen(ph) {
  const scr = screenOf(ph, 'Approve');
  const head = heading(scr, 'Approve header', 'Approve');
  const card = comp(scr, 'Request card', 30, 136, 300, 250);
  card.k.rect(card.svg, 30, 136, 300, 250, { r: 24, fill: '#fff', strokeWidth: 1.4 });
  avatar(card.k, card.svg, 82, 192, 56, DAUGHTER);
  card.k.scribble(card.svg, 124, 184, 110, { strokeWidth: 5, stroke: '#9a9a9a' });
  card.k.scribble(card.svg, 124, 206, 70, { strokeWidth: 4 });
  card.k.text(card.svg, 180, 300, '₹2,500', { size: 56, anchor: 'middle', weight: 700 });
  card.k.scribble(card.svg, 130, 342, 100, { strokeWidth: 5 });
  const timer = comp(scr, 'Time left', 120, 404, 120, 36);
  timer.k.rect(timer.svg, 120, 404, 120, 36, { r: 18, fill: '#fdecc8', strokeWidth: 1.2 });
  timer.k.scribble(timer.svg, 140, 422, 80, { strokeWidth: 4, stroke: '#b98a2e' });
  const swipe = comp(scr, 'Swipe to approve', 30, 620, 300, 72);
  swipe.k.rect(swipe.svg, 30, 620, 300, 72, { r: 36, fill: '#ece9e1', strokeWidth: 1.4 });
  const track = svgEl('rect', { x: 34, y: 624, width: 64, height: 64, rx: 32, fill: '#bfe0c2' });
  swipe.svg.appendChild(track);
  swipe.k.scribble(swipe.svg, 140, 656, 120, { strokeWidth: 5 });
  const knob = comp(scr, 'Swipe knob', 36, 626, 60, 60);
  knob.k.circle(knob.svg, 66, 656, 58, { fill: HUB });
  knob.k.text(knob.svg, 66, 668, '›', { size: 36, anchor: 'middle', weight: 700, color: '#fff' });
  const ok = comp(scr, 'Approved', 90, 210, 180, 180);
  check(ok.k, ok.svg, 180, 300, 170);
  return { scr, parts: [head, card, timer, swipe, knob], track, knob, ok };
}

function analyticsScreen(ph) {
  const scr = screenOf(ph, 'Analytics');
  const head = heading(scr, 'Analytics header', 'Analytics');
  const total = comp(scr, 'Spend total', 30, 128, 300, 92);
  total.k.scribble(total.svg, 52, 152, 90, { strokeWidth: 5 });
  total.k.text(total.svg, 52, 204, '₹18,400', { size: 40, weight: 700 });
  const base = comp(scr, 'Chart baseline', 40, 466, 280, 8);
  base.k.line(base.svg, 44, 470, 316, 470, { strokeWidth: 2 });
  const bars = FAM.map((f, i) => {
    const h = [150, 112, 196, 84][i], x = 64 + i * 64;
    const bar = comp(scr, `Spend bar · ${f.key}`, x, 470 - h, 40, h);
    bar.k.rect(bar.svg, x, 470 - h, 40, h, { r: 6, fill: f.accent, fillStyle: 'hachure', hachureGap: 6, fillWeight: 2 });
    return bar;
  });
  const legend = comp(scr, 'Legend', 30, 500, 300, 120);
  FAM.forEach((f, i) => {
    const x = 50 + (i % 2) * 150, y = 530 + Math.floor(i / 2) * 44;
    legend.k.circle(legend.svg, x, y, 18, { fill: f.accent, roughness: 0.4 });
    legend.k.scribble(legend.svg, x + 20, y, 70, { strokeWidth: 4 });
  });
  return { scr, parts: [head, total, base, ...bars, legend], bars };
}

// ---------- the world ----------
const C = { x: 1208, y: 1388 };

// 1 · The family: one manager in the middle, the members around
const disc = actor(world, 'Hub disc', C.x, C.y, 780, 780, 1);
disc.k.circle(disc.svg, C.x, C.y, 760, { fill: HUB_PALE, stroke: 'none' });
const hubRing = actor(world, 'Hub ring', C.x, C.y, 780, 780, 2);
const ringPaths = strokes(hubRing.k.circle(hubRing.svg, C.x, C.y, 760, { stroke: HUB, strokeWidth: 5 }));
const spokesSvg = actor(world, 'Spokes', C.x, C.y, 780, 780, 2);
const SPOT = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([dx, dy]) => ({ x: C.x + dx * 269, y: C.y + dy * 269 }));
const spokes = SPOT.map((p) => strokes(spokesSvg.k.line(spokesSvg.svg, C.x, C.y, p.x, p.y, { stroke: '#a49dd0', strokeWidth: 3 })));
const manager = actor(world, 'Manager', C.x, C.y, 250, 250, 4);
avatar(manager.k, manager.svg, C.x, C.y, 230, MANAGER.accent);
manager.k.path(manager.svg, `M${C.x + 72},${C.y - 120} l14,28 31,4 -23,21 6,31 -28,-15 -28,15 6,-31 -23,-21 31,-4 Z`, { fill: GOLD, fillStyle: 'solid', strokeWidth: 2 });
const members = FAM.map((f, i) => {
  const a = actor(world, `Member · ${f.key}`, SPOT[i].x, SPOT[i].y, 170, 170, 4);
  avatar(a.k, a.svg, SPOT[i].x, SPOT[i].y, 150, f.accent);
  return a;
});
const pill = (name, text, cx, cy, fill, color, w = 220) => {
  const a = actor(world, name, cx, cy, w + 20, 64, 5);
  a.k.rect(a.svg, cx - w / 2, cy - 28, w, 56, { r: 28, fill, fillStyle: 'solid', strokeWidth: 2 });
  a.k.text(a.svg, cx, cy + 12, text, { size: 32, anchor: 'middle', weight: 700, color });
  return a;
};
const mgrLabel = pill('Manager label', 'Manager', C.x, C.y + 160, MANAGER.accent, '#fff');
const memLabel = pill('Members label', 'Members', C.x, C.y - 380, '#fff', HUB);
const family = [disc, hubRing, spokesSvg, manager, ...members, mgrLabel, memLabel].map((a) => a.div);

// 2–6 · The father's phone (manager) and the daughter's phone (member)
const dad = phone('Manager’s phone', C.x, C.y, 3);
const home = homeScreen(dad);
const invite = inviteScreen(dad);
const approve = approveScreen(dad);
const stats = analyticsScreen(dad);
// The member's phone sits off to the left; the camera pans between the two, one view at a time
const M = { x: C.x - 960, y: C.y };
const kid = phone('Member’s phone', M.x, M.y, 3);
const review = reviewScreen(kid);
const viewTop = C.y - PHH / 2 - 56;
const memberView = pill('Member view label', 'Member view', M.x, viewTop, FAM[1].accent, '#fff', 260);
const managerView = pill('Manager view label', 'Manager view', C.x, viewTop, MANAGER.accent, '#fff', 260);

// Limits as rings: the member rows lift off into a 2x2 grid in front of the phone
const cells = [[-230, -270], [230, -270], [-230, 250], [230, 250]];
const bigRings = FAM.map((f, i) => {
  const [dx, dy] = cells[i];
  const a = actor(world, `Limit ring · ${f.key}`, C.x + dx, C.y + dy, 360, 360, 6);
  ring(a.svg, C.x + dx, C.y + dy, 146, 18, f.accent, (f.big = { v: 0 }));
  avatar(a.k, a.svg, C.x + dx, C.y + dy, 196, f.accent);
  a.from = { x: home.rows[i].avatarAt.x - (C.x + dx), y: home.rows[i].avatarAt.y - (C.y + dy) };
  return a;
});

// The end: an endless canvas of every screen in a grid. Columns drift in alternate directions; the manager's
// Analytics phone is the centre cell, so the camera pulls out of it into the grid.
const GRID = { dx: 520, dy: 980, cols: 3, rows: 2, drift: 380 };
const builders = [homeScreen, inviteScreen, reviewScreen, approveScreen, analyticsScreen];
const columns = [], tiles = [];
for (let c = -GRID.cols; c <= GRID.cols; c++) {
  const col = box(world, `Grid column ${c}`, 0, 0, 2416, 2776, 1);
  col.dir = c % 2 ? 1 : -1;
  columns.push(col);
  const shift = c % 2 ? GRID.dy / 2 : 0;
  for (let r = -GRID.rows; r <= GRID.rows; r++) {
    if (!c && !r) continue;
    const x = C.x + c * GRID.dx, y = C.y + r * GRID.dy + shift;
    const ph = phone(`Grid ${c},${r}`, x, y, 1, col);
    const built = builders[(((c * 2 + r) % 5) + 5) % 5](ph);
    if (built.ok) built.ok.div.style.opacity = 0;
    tiles.push({ div: ph.outer, d: Math.hypot(x - C.x, y - C.y) });
  }
}
tiles.sort((a, b) => a.d - b.d);
const centreColumn = columns[GRID.cols];

// Impact: three rollout numbers, one slide at a time, to the right of the manager's phone (the case study's Impact section)
const I = { x: C.x + 960, y: C.y - 36 };
const SLIDE = 760;   // how far a slide travels in and out
const impactLabel = pill('Impact label', 'Impact', I.x, I.y - 600, HUB, '#fff', 200);
const impact = [
  { value: 64, lines: ['invitees joined', '& paid in 30 days'], accent: MANAGER.accent },
  { value: 58, lines: ['families paid again', 'the next month'], accent: FAM[1].accent },
  { value: 48, lines: ['activated members', 'new to PayZapp'], accent: FAM[2].accent },
].map((m) => {
  const y = I.y - 20;
  const a = actor(world, `Impact · ${m.value}%`, I.x, y, 840, 560, 5);
  a.k.rect(a.svg, I.x - 410, y - 270, 820, 540, { r: 40, fill: '#fff', strokeWidth: 2.5 });
  m.text = a.k.text(a.svg, I.x, y + 30, '0%', { size: 240, anchor: 'middle', weight: 700, color: m.accent });
  m.lines.forEach((t, j) => a.k.text(a.svg, I.x, y + 130 + j * 62, t, { size: 52, anchor: 'middle', color: '#555' }));
  m.count = { v: 0 };
  m.div = a.div;
  return m;
});
const counts = { spend: { v: 0 }, limit: { v: 0 } };

// ---------- camera ----------
const cam = camera(s, $('cam'), {
  start: 'open',
  views: {
    open: { x: C.x, y: C.y, zoom: 1.04 },
    phone: { x: C.x, y: C.y, zoom: 1.28 },
    rings: { x: C.x, y: C.y, zoom: 1.0 },
    member: { x: M.x, y: C.y - 36, zoom: 1.15 },
    manager: { x: C.x, y: C.y - 36, zoom: 1.15 },
    impact: { x: I.x, y: I.y - 40, zoom: 1.0 },
    end: { x: C.x, y: C.y, zoom: 0.42 },
  },
});

// ---------- initial state ----------
const hide = (els) => gsap.set(els, { opacity: 0 });
const partsOf = (scr) => scr.parts.map((p) => p.div);
hide([manager.div, ...members.map((m) => m.div), mgrLabel.div, memLabel.div]);
gsap.set(disc.div, { scale: 0 });
gsap.set(dad.outer, { opacity: 0, y: 520, scale: 0.9 });
hide([...partsOf(home), ...partsOf(invite), ...partsOf(approve), ...partsOf(stats), ...partsOf(review)]);
hide([approve.ok.div, kid.outer, memberView.div, managerView.div]);
home.rows.forEach((r) => { r.level.v = 0; });
gsap.set(invite.knob.div, { x: -240 });
invite.fill.setAttribute('x2', 60);
gsap.set(stats.bars.map((b) => b.div), { scaleY: 0, transformOrigin: '50% 100%' });
hide(bigRings.map((r) => r.div));
hide(tiles.map((t) => t.div));
hide([impactLabel.div, ...impact.map((m) => m.div)]);

// Reveal a screen's components one after another (the beat's stagger spaces them)
const reveal = (b, scr) => b.each(partsOf(scr), { opacity: 0, y: 24 }, { opacity: 1, y: 0 });

// ---------- 1 · The family ----------
s.beat('manager.in', { at: 0, dur: 18, ease: 'overshoot', note: 'The manager, in the middle' },
  (b) => b.fromTo(manager.div, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1 }));
s.beat('hub.grow', { at: 8, dur: 30, ease: 'settle', note: 'The Hub spreads out from the manager' },
  (b) => b.fromTo(disc.div, { scale: 0 }, { scale: 1 }));
s.beat('members.in', { at: 12, dur: 18, stagger: 4, ease: 'overshoot', note: 'Members around the manager' },
  (b) => b.each(members.map((m) => m.div), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1 }));
s.beat('hub.lines', { at: 20, dur: 24, stagger: 3, ease: 'move', note: 'Each member connects to the manager; the Hub ring closes' }, (b) => {
  spokes.forEach((p, i) => drawOn(b, p, { i }));
  drawOn(b, ringPaths, { dur: 30 });
});
s.beat('labels.in', { at: 36, dur: 14, stagger: 6, ease: 'overshoot', note: 'Manager · Members' },
  (b) => b.each([mgrLabel.div, memLabel.div], { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1 }));
s.beat('family.out', { at: 88, dur: 18, ease: 'exit', note: 'The Hub collapses into the phone' },
  (b) => b.fromTo(family, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.4 }));
s.beat('cam.phone', { at: 86, dur: 36, ease: 'move', note: 'Push in on the phone' }, (b) => cam.to(b, 'phone'));

// ---------- 2 · Hub home ----------
s.beat('phone.in', { at: 92, dur: 24, ease: 'settle', note: 'The manager’s phone rises out of the Hub' },
  (b) => b.fromTo(dad.outer, { opacity: 0, y: 520, scale: 0.9 }, { opacity: 1, y: 0, scale: 1 }));
s.beat('home.build', { after: 'phone.in', overlap: 0.3, dur: 14, stagger: 3, ease: 'settle', note: 'Hub home reveals component by component' },
  (b) => reveal(b, home));
s.beat('home.data', { with: 'home.build', offset: 10, dur: 26, ease: 'move', note: 'Spend counts up; mini limit rings fill' }, (b) => {
  b.fromTo(counts.spend, { v: 0 }, { v: 18400 });
  b.fromTo(home.bar, { attr: { x2: 52 } }, { attr: { x2: 52 + 256 * 0.46 } });
  home.rows.forEach((r, i) => b.fromTo(r.level, { v: 0 }, { v: FAM[i].level }, { at: 10 + i * 3, dur: 20 }));
});

// ---------- 3 · Limits as rings ----------
s.beat('cam.rings', { at: 190, dur: 34, ease: 'move', note: 'Ease back for the rings' }, (b) => {
  cam.to(b, 'rings');
  b.fromTo(dad.outer, { scale: 1, opacity: 1 }, { scale: 0.9, opacity: 0.3 });
});
s.beat('rings.out', { with: 'cam.rings', offset: 6, dur: 26, stagger: 3, ease: 'move', note: 'Member rows lift off into big limit rings' }, (b) =>
  bigRings.forEach((r, i) => b.fromTo(r.div, { opacity: 0, scale: 0.23, x: r.from.x, y: r.from.y }, { opacity: 1, scale: 1, x: 0, y: 0 }, { i })));
s.beat('rings.fill', { after: 'rings.out', overlap: 0.4, dur: 24, stagger: 4, ease: 'move', note: 'Each ring fills to that member’s spend' },
  (b) => FAM.forEach((f, i) => b.fromTo(f.big, { v: 0 }, { v: f.level }, { i })));
s.beat('rings.in', { at: 262, dur: 20, stagger: 2, ease: 'exit', note: 'Rings fold back into the list' }, (b) =>
  bigRings.forEach((r, i) => b.fromTo(r.div, { opacity: 1, scale: 1, x: 0, y: 0 }, { opacity: 0, scale: 0.23, x: r.from.x, y: r.from.y }, { i })));

// ---------- 4 · Add member ----------
s.beat('phone.front', { at: 270, dur: 26, ease: 'move', note: 'Phone comes forward' }, (b) => {
  b.fromTo(dad.outer, { scale: 0.9, opacity: 0.3 }, { scale: 1, opacity: 1 });
  cam.to(b, 'phone');
});
s.beat('home.away', { with: 'phone.front', offset: 4, dur: 12, ease: 'exit', note: 'Hub home slides off' },
  (b) => b.fromTo(home.scr, { opacity: 1, x: 0 }, { opacity: 0, x: -60 }));
s.beat('invite.build', { with: 'home.away', offset: 6, dur: 14, stagger: 3, ease: 'settle', note: 'Add member reveals component by component' },
  (b) => reveal(b, invite));
s.beat('invite.limit', { after: 'invite.build', overlap: 0.2, dur: 28, ease: 'move', note: 'Limit slider runs up to ₹5,000' }, (b) => {
  b.fromTo(invite.knob.div, { x: -240 }, { x: 0 });
  b.fromTo(invite.fill, { attr: { x2: 60 } }, { attr: { x2: 300 } });
  b.fromTo(counts.limit, { v: 0 }, { v: 5000 });
});

// ---------- 5 · Member view, then manager view (one phone at a time) ----------
const labelIn = (b, el) => b.fromTo(el, { opacity: 0, y: 16, scale: 0.8 }, { opacity: 1, y: 0, scale: 1 }, { at: 14, dur: 14, ease: 'overshoot' });
s.beat('pan.member', { at: 368, dur: 28, ease: 'move', note: 'Pan left to the member’s phone' }, (b) => {
  cam.to(b, 'member');
  b.fromTo(kid.outer, { opacity: 0 }, { opacity: 1 }, { dur: 2 });
  b.fromTo(invite.scr, { opacity: 1 }, { opacity: 0 }, { dur: 10, ease: 'fade' });
  labelIn(b, memberView.div);
});
s.beat('pay.build', { with: 'pan.member', offset: 12, dur: 14, stagger: 3, ease: 'settle', note: 'Pay screen reveals' }, (b) => reveal(b, review));
s.beat('pay.ask', { at: 410, dur: 12, note: 'Ask to pay' }, (b) => {
  b.fromTo(review.parts[4].div, { scale: 1 }, { scale: 0.94 }, { dur: 5, ease: 'move' });
  b.fromTo(review.parts[4].div, { scale: 0.94 }, { scale: 1 }, { at: 5, dur: 7, ease: 'settle' });
});
s.beat('pan.manager', { at: 424, dur: 28, ease: 'move', note: 'Pan right to the manager’s phone' }, (b) => {
  cam.to(b, 'manager');
  labelIn(b, managerView.div);
});
s.beat('approve.build', { with: 'pan.manager', offset: 12, dur: 14, stagger: 3, ease: 'settle', note: 'Approve screen reveals' }, (b) => reveal(b, approve));
s.beat('approve.swipe', { after: 'approve.build', overlap: 0.2, dur: 20, ease: 'move', note: 'Swipe to approve' }, (b) => {
  b.fromTo(approve.knob.div, { x: 0 }, { x: 228 });
  b.fromTo(approve.track, { attr: { width: 64 } }, { attr: { width: 292 } });
});
s.beat('approve.ok', { after: 'approve.swipe', dur: 12, ease: 'overshoot', note: 'Approved' },
  (b) => b.fromTo(approve.ok.div, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1 }));

// ---------- 6 · Analytics ----------
s.beat('solo', { after: 'approve.ok', dur: 16, ease: 'move', note: 'Approve gives way to Analytics; labels clear' }, (b) => {
  b.fromTo([kid.outer, memberView.div], { opacity: 1 }, { opacity: 0 }, { dur: 4 });
  b.fromTo(managerView.div, { opacity: 1 }, { opacity: 0 }, { dur: 10, ease: 'exit' });
  b.fromTo(approve.scr, { opacity: 1 }, { opacity: 0 }, { dur: 10, ease: 'fade' });
});
s.beat('stats.build', { with: 'solo', offset: 4, dur: 14, stagger: 3, ease: 'settle', note: 'Analytics reveals; bars grow' }, (b) => {
  reveal(b, stats);
  stats.bars.forEach((bar, i) => b.fromTo(bar.div, { scaleY: 0 }, { scaleY: 1 }, { i: i + 3, dur: 18 }));
});

// ---------- 7 · Impact ----------
s.beat('pan.impact', { at: 520, dur: 26, ease: 'move', note: 'Pan right to the impact numbers' }, (b) => {
  cam.to(b, 'impact');
  b.fromTo(impactLabel.div, { opacity: 0, y: 16, scale: 0.8 }, { opacity: 1, y: 0, scale: 1 }, { at: 12, dur: 14, ease: 'overshoot' });
});
// One slide at a time: each slides in from the right as the last slides off to the left
impact.forEach((m, i) => {
  const enter = 530 + i * 30;
  s.beat(`impact.${m.value}`, { at: enter, dur: 14, ease: 'settle', note: `${m.value}% slides in and counts up` }, (b) => {
    if (i) b.fromTo(impact[i - 1].div, { x: 0, opacity: 1 }, { x: -SLIDE, opacity: 0 }, { dur: 12, ease: 'exit' });
    b.fromTo(m.div, { x: SLIDE, opacity: 0 }, { x: 0, opacity: 1 });
    b.fromTo(m.count, { v: 0 }, { v: m.value }, { dur: 20, ease: 'move' });
  });
});

// ---------- 8 · The canvas of screens, then clear for the loop ----------
s.beat('cam.end', { at: 620, dur: 42, ease: 'move', note: 'Pull back and out into the canvas of screens' }, (b) => {
  cam.to(b, 'end');
  b.fromTo([impactLabel.div, impact[2].div], { opacity: 1 }, { opacity: 0 }, { dur: 12, ease: 'exit' });
});
s.beat('grid.in', { with: 'cam.end', offset: 4, dur: 18, stagger: 0.5, ease: 'settle', note: 'Every screen appears around Analytics, rippling outward' },
  (b) => b.each(tiles.map((t) => t.div), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1 }));
s.beat('grid.drift', { at: 620, dur: 72, ease: 'linear', note: 'Columns drift slowly, alternately up and down' }, (b) => {
  columns.forEach((col) => b.fromTo(col, { y: 0 }, { y: col.dir * GRID.drift }));
  b.fromTo(dad.outer, { y: 0 }, { y: centreColumn.dir * GRID.drift });
});
// Loop: everything clears, outer screens first, so the last frame is empty paper like frame 0
s.beat('loop.out', { at: 670, dur: 10, stagger: 0.25, ease: 'exit', note: 'Everything clears to empty paper; the loop restarts on the same blank frame' },
  (b) => b.each([...tiles.map((t) => t.div)].reverse().concat(dad.outer), { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.85 }));

// ---------- per-frame ----------
const fmt = (v) => Math.round(v).toLocaleString('en-IN');
s.onFrame(() => {
  arcs.forEach(({ arc, c, level }) => arc.setAttribute('stroke-dashoffset', c * (1 - level.v)));
  home.amount.textContent = `₹${fmt(Math.round(counts.spend.v / 100) * 100)}`;
  invite.amount.textContent = `₹${fmt(Math.round(counts.limit.v / 100) * 100)}`;
  impact.forEach((m) => { m.text.textContent = `${Math.round(m.count.v)}%`; });
});

// ---------- animatic HUD ----------
const shots = [
  { id: 'family', at: 0, title: 'Family', action: 'One manager in the middle, the members around them.' },
  { id: 'home', at: 92, title: 'Hub home', action: 'Hub home reveals component by component.' },
  { id: 'limits', at: 190, title: 'Limits', action: 'Member rows lift off into limit rings.' },
  { id: 'add', at: 270, title: 'Add member', action: 'Add member reveals; the limit slider runs up.' },
  { id: 'pay', at: 368, title: 'Member · Manager', action: 'Pan to the member view (Pay), then to the manager view (Approve, swipe).' },
  { id: 'analytics', at: 489, title: 'Analytics', action: 'Analytics reveals; bars grow.' },
  { id: 'impact', at: 520, title: 'Impact', action: 'Pan right: 64%, then 58%, then 48%, one slide at a time.' },
  { id: 'canvas', at: 620, title: 'Canvas', action: 'Pull out into an endless grid of screens drifting in alternate columns; clears for the loop.' },
];
shots.forEach((sh, i) => { sh.dur = (shots[i + 1]?.at ?? 692) - sh.at; });
shotHud(s, $('stage'), shots);

s.ready();
