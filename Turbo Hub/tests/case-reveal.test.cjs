const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require.resolve('../case-reveal.js'), 'utf8');

function harness({search = '', reducedMotion = false, observerAvailable = true, hash = ''} = {}) {
  const timers = new Map(), frames = [], events = {}, observers = [];
  let timerID = 0, fontReady;
  const descendants = node => node.childNodes.flatMap(child => [child, ...descendants(child)]);
  function matches(node, selector) {
    if (!node.tagName) return false;
    if (selector.includes('>')) {
      const [parent, child] = selector.split('>').map(part => part.trim());
      return matches(node, child) && Boolean(node.parentElement && matches(node.parentElement, parent));
    }
    if (selector.startsWith('.')) return node.className.split(' ').includes(selector.slice(1));
    if (selector.startsWith('[class')) return /(^|\s)th-/.test(node.className);
    if (selector.startsWith('[')) return node.hasAttribute(selector.slice(1, -1));
    if (selector === 'a[href]') return node.tagName === 'A' && Boolean(node.href);
    return node.tagName.toLowerCase() === selector;
  }
  class Node {
    constructor(type) { this.nodeType = type; this.childNodes = []; this.parentNode = null; }
    get parentElement() { return this.parentNode?.nodeType === 1 ? this.parentNode : null; }
    get children() { return this.childNodes.filter(node => node.nodeType === 1); }
    append(...nodes) {
      for (const node of nodes) {
        if (node.nodeType === 11) { this.append(...Array.from(node.childNodes)); continue; }
        node.remove(); node.parentNode = this; this.childNodes.push(node);
      }
    }
    remove() {
      if (this.parentNode) this.parentNode.childNodes.splice(this.parentNode.childNodes.indexOf(this), 1);
      this.parentNode = null;
    }
    insertBefore(node, reference) {
      node.remove(); node.parentNode = this; this.childNodes.splice(this.childNodes.indexOf(reference), 0, node);
    }
    replaceWith(fragment) {
      const parent = this.parentNode, index = parent.childNodes.indexOf(this);
      const nodes = fragment.nodeType === 11 ? Array.from(fragment.childNodes) : [fragment];
      nodes.forEach(node => node.remove()); parent.childNodes.splice(index, 1, ...nodes);
      this.parentNode = null; nodes.forEach(node => { node.parentNode = parent; });
    }
    get textContent() { return this.nodeType === 3 ? this.nodeValue : this.childNodes.map(node => node.textContent).join(''); }
    set textContent(value) { this.childNodes.forEach(node => { node.parentNode = null; }); this.childNodes = []; this.append(new Text(value)); }
  }
  class Text extends Node { constructor(value) { super(3); this.nodeValue = value; } }
  class Element extends Node {
    constructor(tag, classes = '') {
      super(1); this.tagName = tag.toUpperCase(); this.className = classes; this.attributes = {};
      this.rect = {top: 1300, bottom: 1450, left: 0}; this.wordsPerLine = 3;
      this.style = {setProperty: (k, v) => { this.style[k] = v; }, removeProperty: k => { delete this.style[k]; }};
    }
    setAttribute(k, v) { this.attributes[k] = String(v); }
    removeAttribute(k) { delete this.attributes[k]; }
    hasAttribute(k) { return k in this.attributes; }
    getAttribute(k) { return this.attributes[k] ?? null; }
    contains(node) { return node === this || descendants(this).includes(node); }
    closest(selector) {
      for (let node = this; node; node = node.parentElement) if (selector.split(',').some(part => matches(node, part.trim()))) return node;
      return null;
    }
    querySelectorAll(selector) { return descendants(this).filter(node => selector.split(',').some(part => matches(node, part.trim()))); }
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
    get offsetHeight() { return 24; }
    get offsetTop() {
      if (!this.hasAttribute('data-case-reveal-word')) return 0;
      const block = this.closest('p, h2, h3, h4');
      if (block.failMeasure) throw Error('Layout unavailable');
      const index = block.querySelectorAll('[data-case-reveal-word]').indexOf(this);
      return Math.floor(index / block.wordsPerLine) * 24;
    }
    getBoundingClientRect() {
      if (this.hasAttribute('data-case-reveal-word')) {
        const top = this.closest('p, h2, h3, h4').rect.top + this.offsetTop;
        return {top, bottom: top + 24, left: 0};
      }
      return this.rect;
    }
  }
  const html = new Element('html'), body = new Element('body'), section = new Element('section', 'case-section');
  html.scrollHeight = 6000;
  section.id = 'research'; html.append(body); body.append(section);
  const heading = new Element('h2', 'section-heading'), flower = new Element('span', 'asset-placeholder asset-placeholder--icon');
  heading.append(flower, new Text('Research')); heading.rect = {top: 1200, bottom: 1250, left: 0};
  const paragraph = new Element('p'), original = new Text('A family '), emphasis = new Element('em');
  emphasis.append(new Text('shares money')); paragraph.append(original, emphasis, new Text(' every day with care and independence.'));
  const card = new Element('article', 'info-card'), childCopy = new Element('p', 'research-interviews-intro'); childCopy.textContent = 'A card child'; card.append(childCopy);
  const stack = new Element('div', 'user-voice-stack'), componentCopy = new Element('p', 'research-interviews-intro'); componentCopy.textContent = 'Registered content'; stack.append(componentCopy);
  const linked = new Element('p'), link = new Element('a'); link.href = 'https://example.com/'; link.textContent = 'Learn more'; linked.append(link);
  const copy = new Element('div', 'body-copy technology-copy'); copy.append(paragraph, linked);
  section.append(heading, copy, card, stack);
  const candidates = [heading, paragraph, card, childCopy, componentCopy, linked];
  const document = {
    documentElement: html, body, activeElement: body,
    querySelectorAll: selector => candidates.filter(node => selector.split(',').some(part => matches(node, part.trim().replace(/^#dynamic-content\s+/, '')))),
    getElementById: id => id === section.id ? section : null,
    createElement: tag => new Element(tag), createTextNode: text => new Text(text),
    createDocumentFragment: () => new Node(11),
    createTreeWalker(node) {
      const text = descendants(node).filter(child => child.nodeType === 3); let index = 0;
      return {currentNode: null, nextNode() { this.currentNode = text[index++]; return Boolean(this.currentNode); }};
    },
    addEventListener: (name, fn) => { events[name] = fn; },
    fonts: {ready: {then(fn) { fontReady = fn; }}},
  };
  const reduced = {matches: reducedMotion, addEventListener: (name, fn) => { events.motion = fn; }};
  class Observer {
    constructor(callback, options) { this.callback = callback; this.options = options; this.targets = new Set(); observers.push(this); }
    observe(node) { this.targets.add(node); }
    unobserve(node) { this.targets.delete(node); }
    disconnect() { this.targets.clear(); }
    enter(nodes = Array.from(this.targets)) {
      this.callback(nodes.map(target => ({target, isIntersecting: true, boundingClientRect: target.getBoundingClientRect()})));
    }
  }
  const window = {};
  const context = {window, document, location: {search, hash, href: 'http://localhost/Turbo/index.html' + search + hash, origin: 'http://localhost', pathname: '/Turbo/index.html'},
    matchMedia: () => reduced, URLSearchParams, URL, NodeFilter: {SHOW_TEXT: 4}, innerHeight: 800, scrollY: 0,
    addEventListener: (name, fn) => { events[name] = fn; },
    setTimeout: (fn, delay) => { const id = ++timerID; timers.set(id, {fn, delay}); return id; }, clearTimeout: id => timers.delete(id),
    requestAnimationFrame: fn => { frames.push(fn); return frames.length; }, cancelAnimationFrame() {},
  };
  if (observerAvailable) context.IntersectionObserver = Observer;
  vm.createContext(context);
  vm.runInContext(source, context);
  const flushFrames = () => { while (frames.length) frames.shift()(); };
  const flushTimers = () => { for (const [id, timer] of Array.from(timers)) { timers.delete(id); timer.fn(); } };
  const words = node => node.querySelectorAll('[data-case-reveal-word]');
  return {api: window.CaseStudyReveal, context, document, html, section, heading, flower, paragraph, original, emphasis, card, childCopy, componentCopy, linked, link,
    candidates, Element, reduced, events, observers, timers, flushFrames, flushTimers, words, fontsReady: () => fontReady?.(), observer: () => observers.at(-1)};
}
const state = node => node.getAttribute('data-case-reveal-state');

test('reveals activate by default and explicit reveal=1 stays supported', () => {
  for (const search of ['', '?nav=3', '?reveal=1']) {
    const h = harness({search});
    assert.equal(h.api.enabled, true);
    assert.equal(h.api.active, true);
    assert.equal(state(h.words(h.heading)[0]), 'pending', 'headings split into lines like body copy');
    assert.equal(h.heading.hasAttribute('data-case-reveal-state'), false);
    assert.equal(state(h.flower), 'pending');
  }
});

test('reveal=0 does not mutate the document; a single runtime toggle activates and cleans up', () => {
  for (const search of ['?reveal=0', '?nav=3&reveal=0']) {
    const h = harness({search});
    assert.equal(h.api.active, false); assert.equal(h.observers.length, 0);
    assert.equal(h.words(h.heading).length, 0);
    assert.equal(h.paragraph.childNodes[0], h.original);
    h.api.setEnabled(true); assert.equal(h.api.active, true);
    h.observer().enter([h.words(h.heading)[0]]);
    h.api.setEnabled(false);
    assert.equal(h.html.hasAttribute('data-case-reveal'), false);
    assert.equal(h.heading.textContent, 'Research'); assert.equal(h.words(h.heading).length, 0);
    assert.equal(h.flower.hasAttribute('data-case-reveal-state'), false);
    assert.equal(h.timers.size, 0);
  }
});

test('one reading-line observer watches the first word of every measured line', () => {
  const h = harness(), text = h.paragraph.textContent;
  assert.equal(h.observers.length, 1);
  assert.equal(h.observer().options.rootMargin, '100000px 0px -15% 0px');
  const words = h.words(h.paragraph);
  assert.ok(words.length > 6); assert.equal(h.paragraph.textContent, text);
  assert.equal(h.paragraph.childNodes.includes(h.emphasis), true);
  assert.equal(h.paragraph.hasAttribute('data-case-reveal-state'), false, 'only words are decorated');
  assert.ok(h.observer().targets.has(words[0]) && h.observer().targets.has(words[3]));
  assert.equal(h.observer().targets.has(words[1]), false);
  h.observer().enter([words[0]]);
  assert.equal(state(words[0]), 'shown'); assert.equal(state(words[2]), 'shown');
  assert.equal(state(words[3]), 'pending');
  h.api.setEnabled(false);
  assert.equal(h.paragraph.textContent, text);
  assert.equal(h.paragraph.childNodes[0], h.original);
  assert.equal(h.paragraph.childNodes[1], h.emphasis);
  assert.equal(h.words(h.paragraph).length, 0);
});

test('headings and body lines crossing together cascade top to bottom', () => {
  const h = harness(), body = h.words(h.paragraph), title = h.words(h.heading);
  h.observer().enter([body[3], title[0], body[0]]);
  assert.equal(title[0].style['--case-reveal-delay'], '0ms');
  assert.equal(h.flower.style['--case-reveal-delay'], '0ms', 'heading flower joins the first heading line');
  assert.equal(state(h.flower), 'shown');
  assert.equal(body[0].style['--case-reveal-delay'], '60ms');
  assert.equal(body[3].style['--case-reveal-delay'], '120ms');
  assert.equal(state(body[6]), 'pending');
});

test('a body line can reveal on its own; nothing waits for another element', () => {
  const h = harness(), body = h.words(h.paragraph);
  h.observer().enter([body[0]]);
  assert.equal(state(body[0]), 'shown');
  assert.equal(body[0].style['--case-reveal-delay'], '0ms');
  assert.equal(state(h.words(h.heading)[0]), 'pending');
});

test('the cascade is capped and lines already above the viewport show instantly', () => {
  const h = harness(); h.paragraph.wordsPerLine = 1; h.api.refresh();
  const body = h.words(h.paragraph);
  h.observer().enter(body);
  assert.equal(body.at(-1).style['--case-reveal-delay'], '360ms');
  const skipped = harness(); skipped.linked.rect = {top: -600, bottom: -500, left: 0};
  skipped.observer().enter([skipped.words(skipped.heading)[0], skipped.words(skipped.linked)[0]]);
  assert.equal(skipped.words(skipped.linked).length, 0, 'skipped lines unwrap at once instead of animating offscreen');
  assert.equal(skipped.linked.childNodes[0], skipped.link);
  assert.equal(skipped.words(skipped.heading)[0].style['--case-reveal-delay'], '0ms', 'and do not use up the cascade');
});

test('content already scrolled past at start is left untouched', () => {
  const h = harness(); h.api.setEnabled(false);
  h.heading.rect = {top: -400, bottom: -350, left: 0}; h.paragraph.rect = {top: -300, bottom: -10, left: 0};
  h.api.setEnabled(true);
  assert.equal(h.words(h.heading).length, 0);
  assert.equal(h.words(h.paragraph).length, 0);
  assert.equal(state(h.words(h.linked)[0]), 'pending');
});

test('component content and nested card copy are excluded; linked prose preserves its anchor', () => {
  const h = harness();
  assert.equal(h.componentCopy.hasAttribute('data-case-reveal-state'), false);
  assert.equal(h.words(h.componentCopy).length, 0);
  assert.equal(h.childCopy.hasAttribute('data-case-reveal-state'), false);
  assert.equal(state(h.card), 'pending');
  assert.equal(h.linked.childNodes[0], h.link);
  assert.equal(h.words(h.linked).length, 2);
  h.api.setEnabled(false);
  assert.equal(h.link.textContent, 'Learn more');
  assert.equal(h.linked.childNodes[0], h.link);
});

test('flows, personas and visual groups reveal once as intact units', () => {
  const h = harness();
  const groups = [];
  for (const className of ['persona-explorer', 'artifact-stage', 'competitive-board-component', 'family-story__figure', 'experience-grid', 'phone-stage', 'case-ending__screens']) {
    const group = new h.Element('div', className);
    const copy = new h.Element('p'); copy.textContent = 'A complete visual group';
    const control = new h.Element('button', 'th-button'); control.textContent = 'Use control';
    group.append(copy, control); h.section.append(group);
    h.candidates.push(group, copy, control); groups.push({group, copy, control, original: copy.childNodes[0]});
  }
  h.api.refresh();
  for (const {group, copy, control, original} of groups) {
    assert.equal(state(group), 'pending');
    assert.equal(copy.childNodes[0], original, 'unit copy is never split');
    assert.equal(control.hasAttribute('data-case-reveal-state'), false);
  }
  h.observer().enter(groups.map(({group}) => group));
  for (const {group, control} of groups) {
    assert.equal(state(group), 'shown');
    assert.equal(group.childNodes[1], control);
  }
  h.api.setEnabled(false);
  for (const {group} of groups) assert.equal(group.hasAttribute('data-case-reveal-state'), false);
  h.api.setEnabled(true);
  for (const {group} of groups) assert.equal(group.hasAttribute('data-case-reveal-state'), false, 'completed units do not replay');
});

test('subsection headings and their prose both reveal line by line', () => {
  const h = harness();
  const copies = [];
  for (const [wrapperClass, headingClass, paragraphClass] of [
    ['family-story__intro', 'family-story__heading', 'family-story__lead'],
    ['family-story__copy', 'family-story__scene-title', ''],
    ['design-tradeoffs__direction', 'design-tradeoffs__direction-heading', 'design-tradeoffs__description'],
    ['reading-column impact-future__next', 'impact-future__future-title', 'body-copy'],
  ]) {
    const wrapper = new h.Element('div', wrapperClass);
    const heading = new h.Element('h3', headingClass); heading.textContent = 'A subsection heading that wraps';
    const paragraph = new h.Element('p', paragraphClass);
    paragraph.textContent = 'This subsection explains the family payment experience across several visible lines.';
    wrapper.append(heading, paragraph); h.section.append(wrapper);
    h.candidates.push(wrapper, heading, paragraph); copies.push({wrapper, heading, paragraph});
  }
  h.api.refresh();
  for (const {wrapper, heading, paragraph} of copies) {
    assert.equal(wrapper.hasAttribute('data-case-reveal-state'), false, 'prose is never enclosed in a whole-block reveal');
    const headingWords = h.words(heading), bodyWords = h.words(paragraph);
    assert.ok(headingWords.length > 3 && bodyWords.length > 6);
    assert.ok(h.observer().targets.has(headingWords[3]), 'second heading line has its own trigger');
    h.observer().enter([headingWords[0]]);
    assert.equal(state(headingWords[0]), 'shown'); assert.equal(state(headingWords[3]), 'pending');
  }
});

test('finished blocks unwrap after settling and never replay', () => {
  const h = harness();
  h.observer().enter(h.words(h.paragraph).filter(word => h.observer().targets.has(word)));
  assert.ok(Array.from(h.timers.values()).some(timer => timer.delay === 1060));
  h.flushTimers();
  assert.equal(h.paragraph.childNodes[0], h.original);
  h.api.refresh();
  assert.equal(h.words(h.paragraph).length, 0);
  assert.equal(state(h.words(h.linked)[0]), 'pending');
});

test('right-edge annotation flower shares the adjacent screen entrance', () => {
  const h = harness();
  const band = new h.Element('div', 'annotation-band');
  const screen = new h.Element('div', 'closing-stage');
  const flower = new h.Element('div', 'annotation-figure');
  const art = new h.Element('img', 'annotation-mark'); flower.append(art);
  band.append(screen, flower); h.section.append(band);
  h.candidates.push(band, screen);
  h.api.refresh();
  assert.ok(h.observer().targets.has(band));
  assert.equal(h.observer().targets.has(screen), false);
  h.observer().enter([band]);
  assert.equal(state(band), 'shown');
  assert.equal(flower.hasAttribute('data-case-reveal-state'), false, 'flower moves with its parent, without a separate trigger');
  assert.equal(band.childNodes[1].childNodes[0], art);
  h.api.setEnabled(false);
  assert.equal(band.hasAttribute('data-case-reveal-state'), false);
});

test('font and width changes regroup unfinished lines while read words stay revealed', () => {
  const h = harness(), words = h.words(h.paragraph);
  h.observer().enter([words[0]]);
  h.paragraph.wordsPerLine = 2; h.events.resize(); h.fontsReady(); h.flushFrames();
  assert.equal(state(words[0]), 'shown');
  assert.equal(words[3].hasAttribute('data-case-reveal-state'), false, 'new row touching a revealed word stays readable');
  assert.ok(h.observer().targets.has(words[4]));
  assert.equal(h.observer().targets.has(words[3]), false, 'stale line triggers are dropped');
  h.api.setEnabled(false); assert.equal(h.paragraph.childNodes[0], h.original);
});

test('reaching the page end reveals visible lines that sit below the reading line', () => {
  const h = harness();
  h.linked.rect = {top: 760, bottom: 790, left: 0};
  h.context.scrollY = 5200; h.events.scroll(); h.flushFrames();
  assert.equal(state(h.words(h.linked)[0]), 'shown');
  assert.equal(state(h.card), 'pending', 'content still below the fold waits');
  const early = harness(); early.linked.rect = {top: 760, bottom: 790, left: 0};
  early.events.scroll(); early.flushFrames();
  assert.equal(state(early.words(early.linked)[0]), 'pending');
});

test('initial fragments and section navigation show the heading while body lines keep their reveals', () => {
  const initial = harness({hash: '#research'});
  assert.equal(initial.words(initial.heading).length, 0);
  assert.equal(initial.flower.hasAttribute('data-case-reveal-state'), false);
  assert.equal(state(initial.words(initial.paragraph)[0]), 'pending');
  const h = harness();
  const anchor = new h.Element('a'); anchor.href = 'http://localhost/Turbo/index.html?reveal=1#research';
  h.events.click({target: anchor});
  assert.equal(h.words(h.heading).length, 0);
  const words = h.words(h.paragraph);
  assert.equal(state(words[0]), 'pending');
  h.events.focusin({target: h.heading});
  assert.equal(state(words[0]), 'pending');
  h.observer().enter([words[0], words[3], words[6]]);
  assert.equal(words[0].style['--case-reveal-delay'], '0ms');
  assert.equal(words[3].style['--case-reveal-delay'], '60ms');
  assert.equal(words[6].style['--case-reveal-delay'], '120ms');
});

test('focusing a link reveals its paragraph without skipping adjacent body text', () => {
  const h = harness();
  h.events.focusin({target: h.link});
  assert.equal(h.words(h.linked).length, 0);
  assert.equal(h.linked.childNodes[0], h.link);
  assert.equal(state(h.words(h.paragraph)[0]), 'pending');
  assert.equal(Array.from(h.observer().targets).some(target => h.linked.contains(target)), false);
});

test('both Zeta technology paragraphs are selected and reveal by measured line', () => {
  const script = fs.readFileSync(require.resolve('../script.js'), 'utf8');
  const block = script.match(/technology:\s*\{([\s\S]*?)\n\s*\},\n\s*artifacts:/)[1];
  const data = block.match(/paragraphs:\s*\[([\s\S]*?)\]/)[1].replace(/,\s*$/, '');
  const text = JSON.parse('[' + data + ']');
  assert.equal(text.length, 2);
  const h = harness(); h.api.setEnabled(false); h.paragraph.textContent = text[0];
  const second = new h.Element('p'); second.textContent = text[1];
  h.paragraph.parentElement.append(second); h.candidates.push(second);
  h.paragraph.rect = {top: 1500, bottom: 1900, left: 0};
  second.rect = {top: 1950, bottom: 2150, left: 0};
  h.api.setEnabled(true);
  const firstWords = h.words(h.paragraph), secondWords = h.words(second);
  assert.ok(firstWords.length > 30 && secondWords.length > 10);
  h.observer().enter([firstWords[0], firstWords[3]]);
  assert.equal(firstWords[0].style['--case-reveal-delay'], '0ms');
  assert.equal(firstWords[3].style['--case-reveal-delay'], '60ms');
  assert.equal(state(secondWords[0]), 'pending');
  h.observer().enter([secondWords[0]]);
  assert.equal(state(secondWords[0]), 'shown');
  assert.equal(state(secondWords[3]), 'pending');
  assert.equal(h.paragraph.textContent, text[0]); assert.equal(second.textContent, text[1]);
});

test('reduced motion, printing and missing observers leave readable original content', () => {
  const unsupported = harness({observerAvailable: false}); assert.equal(unsupported.api.active, false);
  assert.equal(unsupported.paragraph.childNodes[0], unsupported.original);
  const h = harness({reducedMotion: true}); assert.equal(h.api.active, false);
  h.reduced.matches = false; h.events.motion(); assert.equal(h.api.active, true);
  h.reduced.matches = true; h.events.motion(); assert.equal(h.paragraph.childNodes[0], h.original);
  h.reduced.matches = false; h.events.motion();
  h.events.beforeprint(); assert.equal(h.api.active, false); assert.equal(h.paragraph.childNodes[0], h.original);
  assert.equal(h.api.enabled, true);
  h.events.afterprint(); assert.equal(h.api.active, true);
});

test('a measurement failure restores content instead of leaving it hidden', () => {
  const failing = harness(); failing.api.setEnabled(false); failing.paragraph.failMeasure = true; failing.api.setEnabled(true);
  assert.equal(failing.api.active, false);
  assert.equal(failing.paragraph.childNodes[0], failing.original);
  const h = harness(); h.paragraph.failMeasure = true; h.events.resize(); h.flushFrames();
  assert.equal(h.api.active, false);
  assert.equal(h.paragraph.childNodes[0], h.original);
  assert.equal(h.words(h.heading).length, 0);
  assert.equal(h.card.hasAttribute('data-case-reveal-state'), false);
  assert.equal(h.html.hasAttribute('data-case-reveal'), false);
});
