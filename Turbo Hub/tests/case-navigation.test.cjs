const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const rowStep = 20, windowHeight = rowStep * 4, availableTravel = 15 * rowStep - windowHeight;
const source = fs.readFileSync(path.join(__dirname, '../case-navigation.js'), 'utf8');
function harness(version = '3', reduceMotion = true) {
  const ids = ['top','overview','product','opportunity','timeline','technology','research','design-question','competitive-research','relationship','artifacts','flows','design-tradeoffs','impact-future','learning'];
  const frames = [], listeners = {}, jumps = [], history = [];
  let document, clock = 0;
  class Element {
    constructor(tag, classes = '', text = '') {
      this.tagName = tag; this.className = classes; this.textContent = text;
      this.children = []; this.attributes = {}; this.dataset = {}; this.events = {};
      this.style = {setProperty: (key, value) => { this.style[key] = value; }};
      this.classList = {
        add: name => { this.className += ' ' + name; },
        toggle: (name, value) => { this.className = this.className.split(' ').filter(c => c !== name).concat(value ? [name] : []).join(' '); },
      };
    }
    append(...children) { children.forEach(c => { c.parent = this; this.children.push(c); }); }
    replaceChildren(...children) { this.children = []; this.append(...children); }
    setAttribute(key, value) { this.attributes[key] = String(value); }
    getAttribute(key) { return this.attributes[key] ?? null; }
    hasAttribute(key) { return key in this.attributes; }
    removeAttribute(key) { delete this.attributes[key]; }
    addEventListener(name, fn) { (this.events[name] ||= []).push(fn); }
    emit(name, event = {}) { for (const fn of this.events[name] || []) fn(event); }
    contains(node) { return node === this || this.children.some(c => c.contains(node)); }
    focus() { document.activeElement = this; }
    closest() { return this.tagName === 'a' ? this : this.parent?.closest(); }
    querySelector() { return this.heading || null; }
    get hash() { return this.href; }
    getBoundingClientRect() {
      if (this.tagName === 'a') {
        const list = this.parent.parent;
        const index = list.children.indexOf(this.parent);
        const top = list.parent.getBoundingClientRect().top + index * rowStep - parseFloat(list.style['--dial-offset'] || 0);
        return {top, bottom: top + rowStep, height: rowStep, right: 1400};
      }
      if (this.tagName === 'nav' || this.className.includes('case-navigation__dial-window')) {
        const view = this.tagName === 'nav' ? this.children[0] : this;
        const nav = this.tagName === 'nav' ? this : this.parent;
        const height = parseFloat(view.style.height) || windowHeight;
        const top = 200 + parseFloat(nav.style['--dial-shift'] || 0) - (height - windowHeight) / 2;
        return {top, bottom: top + height, height, right: 1400};
      }
      return this.rect || {top: 200, bottom: 200 + windowHeight, height: windowHeight, right: 1400};
    }
    scrollIntoView(options) { jumps.push({id: this.id, options}); }
  }
  const sections = Object.fromEntries(ids.map((id, i) => {
    const node = new Element('section'); node.id = id;
    node.heading = new Element(id === 'top' ? 'h1' : 'h2', '', 'Heading ' + id);
    node.rect = {top: (i - 1) * 500, height: 400};
    return [id, node];
  }));
  sections.metrics = new Element('section'); sections.metrics.id = 'metrics'; sections.metrics.rect = {top: 2300, height: 200};
  document = {documentElement: {scrollHeight: 7800}, body: new Element('body'), activeElement: null, hidden: false,
    createElement: tag => new Element(tag), getElementById: id => sections[id],
    addEventListener: (name, fn) => { listeners[name] = fn; }};
  const reduced = {matches: reduceMotion, addEventListener() {}};
  const context = {document, location: {search: '?nav=' + version, hash: ''}, URLSearchParams,
    window: {TurboIcons: true}, TurboIcons: {render: () => '<svg/>'}, innerHeight: 800, scrollY: 0,
    history: {pushState: (...args) => history.push(args)}, matchMedia: () => reduced,
    requestAnimationFrame: fn => { frames.push(fn); return frames.length; }, cancelAnimationFrame() {},
    addEventListener: (name, fn) => { listeners[name] = fn; }, performance: {now: () => clock}};
  vm.runInNewContext(source, context);
  const host = document.body.children[0];
  const list = version === '2' ? host.children[1].children[0] : version === '3' ? host.children[0].children[0] : host.children[0];
  const links = list.children.map(li => li.children[0]);
  const advance = (milliseconds = 16) => { clock += milliseconds; if (frames.length) frames.shift()(clock); };
  const flush = () => { let limit = 1000; while (frames.length && limit--) advance(); assert.ok(limit > 0, "animation clock settles"); };
  return {host, list, links, sections, document, history, jumps, flush, advance, listeners, context};
}
test('dial includes later sections, radial fall-off and clears preview on pointer leave', () => {
  const h = harness();
  assert.equal(h.links.length, 15);
  assert.equal(h.links[0].href, '#top');
  assert.equal(h.links.at(-1).href, '#learning');
  h.host.emit('pointermove', {pointerType: 'mouse', clientX: 1388, clientY: 210}); h.flush();
  const strength = i => Number(h.links[i].children[0].style['--dial-influence']);
  assert.equal(strength(0), 1);
  assert.equal(h.host.children[1].textContent, 'Back to top');
  assert.ok(strength(1) > strength(2) && strength(2) > strength(3));
  assert.match(h.host.className, /is-previewing/);
  assert.ok(h.links.every(link => link.children.length === 1));
  h.host.emit('pointerleave'); h.flush();
  assert.equal(strength(0), 0);
  assert.doesNotMatch(h.host.className, /is-previewing/);
});
test('dial keyboard selection exposes title and clicking keeps hash, heading focus and reduced-motion jump', () => {
  const h = harness(); h.links[0].focus();
  h.host.emit('focusin', {target: h.links[0]}); h.flush();
  assert.equal(h.links[0].getAttribute('aria-label'), 'Back to top');
  let prevented = false;
  h.host.emit('keydown', {key: 'End', preventDefault() { prevented = true; }});
  assert.ok(prevented); assert.equal(h.document.activeElement, h.links.at(-1));
  h.host.emit('click', {target: h.links.at(-1), button: 0, preventDefault() {}});
  assert.equal(h.document.activeElement, h.sections.learning.heading);
  assert.equal(h.history[0][2], '#learning');
  assert.equal(h.jumps[0].id, 'learning'); assert.equal(h.jumps[0].options.behavior, 'instant');
});
test('both earlier navigation variations preserve the latest five destinations and controls', () => {
  for (const version of ['1', '2']) {
    const h = harness(version);
    assert.equal(h.links.length, 5);
    assert.equal(h.host.children.length, 2);
    h.host.emit('click', {target: h.links[1], button: 0, preventDefault() {}});
    assert.equal(h.jumps[0].id, 'metrics');
    assert.deepEqual(h.links.map(link => link.href), ['#overview', '#metrics', '#research', '#flows', '#impact-future']);
  }
});

test('dial window tracks page position continuously and bounds its movement', () => {
  const h = harness(); h.flush();
  const initial = parseFloat(h.list.style['--dial-offset']);
  Object.values(h.sections).forEach(section => { section.rect.top -= 3000; });
  h.context.scrollY = 3000;
  h.listeners.scroll(); h.flush();
  const middle = parseFloat(h.list.style['--dial-offset']);
  assert.ok(middle > initial && middle < availableTravel);
  Object.values(h.sections).forEach(section => { section.rect.top -= 10000; });
  h.context.scrollY = 7000;
  h.listeners.scroll(); h.flush();
  assert.equal(parseFloat(h.list.style['--dial-offset']), availableTravel);
});
test('keyboard focus brings a clipped destination into the dial window', () => {
  const h = harness(); h.flush();
  const link = h.links.at(-1); link.focus();
  h.host.emit('focusin', {target: link}); h.flush();
  const center = link.getBoundingClientRect().top + rowStep / 2;
  const bounds = h.host.children[0].getBoundingClientRect();
  assert.ok(center >= bounds.top && center <= bounds.bottom);
  assert.equal(h.host.children[1].textContent, 'Heading learning');
});

test('normal-motion window eases toward the reading position and stops at rest', () => {
  const h = harness('3', false); h.flush();
  Object.values(h.sections).forEach(section => { section.rect.top -= 3000; });
  h.context.scrollY = 3000;
  h.listeners.scroll(); h.advance(); h.advance();
  const early = parseFloat(h.list.style['--dial-offset']);
  h.flush();
  const final = parseFloat(h.list.style['--dial-offset']);
  assert.ok(early > 0 && early < final);
  assert.equal(h.list.style['--dial-offset'], final.toFixed(3) + 'px');
});

test('window progresses during a long section instead of waiting for its next heading', () => {
  const h = harness();
  Object.values(h.sections).forEach((section, i) => { section.rect.top = (i - 6) * 5000; });
  h.context.scrollY = 2500; h.listeners.scroll(); h.flush();
  const before = parseFloat(h.list.style['--dial-offset']);
  assert.equal(h.links[6].getAttribute('aria-current'), 'location');
  // Keep the same current heading while the overall document position advances.
  Object.values(h.sections).forEach(section => { section.rect.top -= 1000; });
  h.context.scrollY = 3500; h.listeners.scroll(); h.flush();
  const after = parseFloat(h.list.style['--dial-offset']);
  assert.equal(h.links[6].getAttribute('aria-current'), 'location');
  assert.ok(after > before);
});

test('section progress keeps its stop in view and moves slower through longer sections', () => {
  const h = harness();
  Object.values(h.sections).forEach((section, i) => { section.rect.top = (i - 6) * 5000; });
  h.listeners.scroll(); h.flush();
  const before = parseFloat(h.list.style['--dial-offset']);
  Object.values(h.sections).forEach(section => { section.rect.top -= 1000; });
  h.listeners.scroll(); h.flush();
  const after = parseFloat(h.list.style['--dial-offset']);
  assert.ok(Math.abs(after - before - rowStep * 1000 / 5000) < 0.001);
  const center = h.links[6].getBoundingClientRect().top + rowStep / 2;
  const bounds = h.host.children[0].getBoundingClientRect();
  assert.ok(center > bounds.top && center < bounds.bottom);
});

test('hero tick is separate from overview and returns to the top with heading focus', () => {
  const h = harness('3', false); h.flush();
  Object.values(h.sections).forEach((section, i) => { section.rect.top = i * 500; });
  h.listeners.scroll(); h.flush();
  assert.equal(h.links[0].getAttribute('aria-current'), 'location');
  assert.equal(h.links[1].href, '#overview');
  h.host.emit('click', {target: h.links[0], button: 0, preventDefault() {}});
  assert.equal(h.history[0][2], '#top');
  assert.equal(h.document.activeElement, h.sections.top.heading);
  assert.equal(h.jumps[0].id, 'top');
  assert.equal(h.jumps[0].options.behavior, 'smooth');
});

test('hover label resists boundary jitter and glides to the next tick', () => {
  const h = harness('3', false); h.flush();
  const move = y => h.host.emit('pointermove', {pointerType: 'mouse', clientX: 1388, clientY: y});
  move(219); h.flush();
  const label = h.host.children[1];
  assert.equal(label.textContent, 'Back to top');
  move(221); h.flush();
  assert.equal(label.textContent, 'Back to top');
  const before = parseFloat(label.style.top);
  move(230); h.advance();
  assert.equal(label.textContent, 'Heading overview');
  const during = parseFloat(label.style.top);
  h.flush();
  const after = parseFloat(label.style.top);
  assert.ok(before < during && during < after);
  assert.equal(after, 30);
});

test('hover reveals all stops without moving the tick under the pointer or navigating', () => {
  const h = harness('3', false);
  Object.values(h.sections).forEach(section => { section.rect.top -= 3000; });
  h.listeners.scroll(); h.flush();
  const target = h.links[7];
  const before = target.getBoundingClientRect().top + rowStep / 2;
  h.host.emit('pointerenter', {pointerType: 'mouse', clientX: 1388, clientY: before});
  h.advance();
  const during = h.host.children[0].getBoundingClientRect().height;
  assert.ok(during > windowHeight && during < 15 * rowStep);
  h.flush();
  assert.equal(h.host.children[0].getBoundingClientRect().height, 15 * rowStep);
  assert.ok(Math.abs(target.getBoundingClientRect().top + rowStep / 2 - before) < 0.002);
  assert.equal(h.jumps.length, 0);
  assert.equal(h.host.children[1].textContent, 'Heading design-question');
  const bounds = h.host.children[0].getBoundingClientRect();
  assert.ok(h.links[0].getBoundingClientRect().top >= bounds.top);
  assert.ok(h.links.at(-1).getBoundingClientRect().bottom <= bounds.bottom);
  h.host.emit('pointerleave'); h.flush();
  assert.equal(h.host.children[0].getBoundingClientRect().height, windowHeight);
});

test('short viewports allow wheel navigation through the expanded stops', () => {
  const h = harness(); h.context.innerHeight = 240; h.listeners.resize(); h.flush();
  const bounds = h.host.children[0].getBoundingClientRect();
  h.host.emit('pointerenter', {pointerType: 'mouse', clientX: 1388, clientY: bounds.top + 10}); h.flush();
  assert.equal(h.host.children[0].getBoundingClientRect().height, 160);
  let prevented = false;
  h.host.emit('wheel', {deltaY: 100, deltaMode: 0, preventDefault() {prevented = true;}}); h.flush();
  assert.ok(prevented);
  assert.equal(parseFloat(h.list.style['--dial-offset']), 100);
});
