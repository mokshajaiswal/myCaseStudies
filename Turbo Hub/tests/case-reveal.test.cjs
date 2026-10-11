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
    get offsetTop() {
      if (!this.hasAttribute('data-case-reveal-word')) return 0;
      const paragraph = this.closest('p');
      if (paragraph.failMeasure) throw Error('Layout unavailable');
      const index = paragraph.querySelectorAll('[data-case-reveal-word]').indexOf(this);
      return Math.floor(index / paragraph.wordsPerLine) * 24;
    }
    getBoundingClientRect() {
      if (this.hasAttribute('data-case-reveal-word')) {
        const top = this.closest('p').rect.top + this.offsetTop;
        return {top, bottom: top + 24, left: 0};
      }
      return this.rect;
    }
  }
  const html = new Element('html'), body = new Element('body'), section = new Element('section', 'case-section');
  section.id = 'research'; html.append(body); body.append(section);
  const heading = new Element('h2', 'section-heading'); heading.textContent = 'Research';
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
    matchMedia: () => reduced, URLSearchParams, URL, NodeFilter: {SHOW_TEXT: 4},
    addEventListener: (name, fn) => { events[name] = fn; },
    setTimeout: (fn, delay) => { const id = ++timerID; timers.set(id, {fn, delay}); return id; }, clearTimeout: id => timers.delete(id),
    requestAnimationFrame: fn => { frames.push(fn); return frames.length; }, cancelAnimationFrame() {},
  };
  if (observerAvailable) context.IntersectionObserver = Observer;
  vm.runInNewContext(source, context);
  const flushFrames = () => { while (frames.length) frames.shift()(); };
  const flushTimers = () => { for (const [id, timer] of Array.from(timers)) { timers.delete(id); timer.fn(); } };
  return {api: window.CaseStudyReveal, document, html, section, heading, paragraph, original, emphasis, card, childCopy, componentCopy, linked, link,
    candidates, Element, reduced, events, observers, timers, flushFrames, flushTimers, fontsReady: () => fontReady?.(), observer: () => observers.at(-1)};
}

test('reveals activate by default and explicit reveal=1 stays supported', () => {
  for (const search of ['', '?nav=3', '?reveal=1']) {
    const h = harness({search});
    assert.equal(h.api.enabled, true);
    assert.equal(h.api.active, true);
    assert.equal(h.heading.getAttribute('data-case-reveal-state'), 'pending');
  }
});

test('reveal=0 does not mutate the document; a single runtime toggle activates and cleans up', () => {
  for (const search of ['?reveal=0', '?nav=3&reveal=0']) {
    const h = harness({search});
    assert.equal(h.api.active, false); assert.equal(h.observers.length, 0);
    assert.equal(h.heading.hasAttribute('data-case-reveal-state'), false);
    assert.equal(h.paragraph.childNodes[0], h.original);
    h.api.setEnabled(true); assert.equal(h.api.active, true);
    h.observer().enter([h.heading]);
    h.api.setEnabled(false);
    assert.equal(h.html.hasAttribute('data-case-reveal'), false);
    assert.equal(h.heading.hasAttribute('data-case-reveal-state'), false);
    assert.equal(h.timers.size, 0);
  }
});

test('paragraphs reveal by measured line and disabling restores original text/inline nodes', () => {
  const h = harness(), text = h.paragraph.textContent;
  assert.equal(h.paragraph.getAttribute('data-case-reveal-state'), 'pending', 'unsplit text must not flash before its heading');
  assert.equal(h.observer().options.rootMargin, '0px 0px -80px 0px', 'text enters inside the viewport so its slide is visible');
  const preparation = h.observers.at(-2);
  assert.equal(preparation.options.rootMargin, '0px 0px 80px 0px');
  assert.ok(preparation.targets.has(h.paragraph));
  assert.equal(h.observer().targets.has(h.paragraph), false);
  preparation.enter([h.paragraph]);
  assert.equal(preparation.targets.has(h.paragraph), false);
  const words = h.paragraph.querySelectorAll('[data-case-reveal-word]');
  assert.ok(words.length > 6); assert.equal(h.paragraph.textContent, text);
  assert.equal(h.paragraph.childNodes.includes(h.emphasis), true);
  h.observer().enter([h.heading, words[0]]);
  assert.equal(words[0].getAttribute('data-case-reveal-state'), 'shown');
  assert.equal(words[2].getAttribute('data-case-reveal-state'), 'shown');
  assert.equal(words[3].getAttribute('data-case-reveal-state'), 'pending');
  h.api.setEnabled(false);
  assert.equal(preparation.targets.size, 0);
  assert.equal(h.paragraph.textContent, text);
  assert.equal(h.paragraph.childNodes[0], h.original);
  assert.equal(h.paragraph.childNodes[1], h.emphasis);
  assert.equal(h.paragraph.querySelectorAll('[data-case-reveal-word]').length, 0);
});

test('component content and nested card copy are excluded; linked prose preserves its anchor', () => {
  const h = harness();
  assert.equal(h.componentCopy.hasAttribute('data-case-reveal-state'), false);
  assert.equal(h.childCopy.hasAttribute('data-case-reveal-state'), false);
  h.observers.at(-2).enter([h.linked]);
  assert.equal(h.linked.childNodes[0], h.link);
  assert.equal(h.linked.querySelectorAll('[data-case-reveal-word]').length, 2);
  h.api.setEnabled(false);
  assert.equal(h.link.textContent, 'Learn more');
  assert.equal(h.linked.childNodes[0], h.link);
});

test('flows, personas and visual groups reveal once as intact units without child reveals or delays', () => {
  const h = harness();
  const groups = [];
  for (const className of ['persona-explorer', 'artifact-stage', 'competitive-board-component', 'family-story__figure', 'experience-grid', 'phone-stage', 'case-ending__screens']) {
    const group = new h.Element('div', className);
    const copy = new h.Element('p'); copy.textContent = 'A complete visual group';
    const control = new h.Element('button', 'th-button'); control.textContent = 'Use control';
    group.append(copy, control);
    const parent = className === 'family-story__figure' ? new h.Element('div', 'family-story') : h.section;
    if (parent !== h.section) h.section.append(parent);
    parent.append(group);
    h.candidates.push(group, copy, control); groups.push({group, copy, control, original: copy.childNodes[0]});
  }
  h.api.refresh();
  for (const {group, copy, control} of groups) {
    assert.equal(group.getAttribute('data-case-reveal-state'), 'pending');
    assert.equal(copy.hasAttribute('data-case-reveal-state'), false);
    assert.equal(control.hasAttribute('data-case-reveal-state'), false);
  }
  h.observer().enter([h.heading, ...groups.map(({group}) => group)]);
  for (const {group, copy, control, original} of groups) {
    assert.equal(group.getAttribute('data-case-reveal-state'), 'shown');
    assert.equal(group.style['--case-reveal-delay'], '0ms');
    assert.equal(copy.childNodes[0], original);
    assert.equal(group.childNodes[1], control);
  }
  h.api.setEnabled(false);
  for (const {group} of groups) assert.equal(group.hasAttribute('data-case-reveal-state'), false);
  h.api.setEnabled(true);
  for (const {group} of groups) assert.equal(group.hasAttribute('data-case-reveal-state'), false, 'completed units do not replay');
});

test('subsection prose reveals by line while flow screens and card descriptions stay grouped', () => {
  const h = harness();
  const story = new h.Element('div', 'family-story'); h.section.append(story);
  const copies = [];
  for (const [wrapperClass, headingClass, paragraphClass] of [
    ['family-story__intro', 'family-story__heading', 'family-story__lead'],
    ['family-story__chapter-header', 'family-story__heading', 'family-story__lead'],
    ['family-story__copy', 'family-story__scene-title', ''],
    ['design-tradeoffs__direction', 'design-tradeoffs__direction-heading', 'design-tradeoffs__description'],
  ]) {
    const wrapper = new h.Element('div', wrapperClass);
    const heading = new h.Element('h3', headingClass); heading.textContent = 'Subsection heading';
    const paragraph = new h.Element('p', paragraphClass);
    paragraph.textContent = 'This subsection explains the family payment experience across several visible lines.';
    wrapper.append(heading, paragraph); story.append(wrapper);
    h.candidates.push(wrapper, heading, paragraph); copies.push({wrapper, heading, paragraph});
  }
  const figure = new h.Element('div', 'family-story__figure'); story.append(figure); h.candidates.push(figure);
  h.api.refresh();
  for (const {wrapper, heading, paragraph} of copies) {
    assert.equal(wrapper.hasAttribute('data-case-reveal-state'), false, 'prose must not be enclosed in a whole-block reveal');
    assert.ok(h.observers.at(-2).targets.has(paragraph));
    h.observers.at(-2).enter([paragraph]);
    const words = paragraph.querySelectorAll('[data-case-reveal-word]');
    assert.ok(words.length > 6);
    h.observer().enter([heading]);
    h.observer().enter([words[0]]);
    assert.equal(words[0].getAttribute('data-case-reveal-state'), 'shown');
    assert.equal(words[3].getAttribute('data-case-reveal-state'), 'pending');
  }
  assert.equal(figure.getAttribute('data-case-reveal-state'), 'pending');
  assert.equal(h.childCopy.hasAttribute('data-case-reveal-state'), false);
});

test('stagger is capped locally and finished lines unwrap without replaying on refresh', () => {
  const h = harness();
  for (let i = 0; i < 30; i++) {
    const block = new h.Element('div', 'meta-strip'); block.rect = {top: 1500 + i * 30, bottom: 1510 + i * 30, left: 0};
    h.section.append(block); h.candidates.push(block);
  }
  h.api.refresh(); h.observer().enter(h.candidates.filter(node => node.tagName === 'H2' || node.className === 'meta-strip'));
  assert.equal(h.candidates.at(-1).style['--case-reveal-delay'], '220ms');
  h.observer().enter([h.paragraph]);
  h.observer().enter(Array.from(h.observer().targets).filter(node => node.hasAttribute('data-case-reveal-word')));
  h.flushTimers();
  assert.equal(h.paragraph.childNodes[0], h.original);
  h.api.refresh(); assert.equal(h.paragraph.hasAttribute('data-case-reveal-state'), false);
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
  assert.equal(band.getAttribute('data-case-reveal-state'), 'shown');
  assert.equal(band.style['--case-reveal-delay'], '0ms');
  assert.equal(flower.hasAttribute('data-case-reveal-state'), false, 'flower moves with its parent, without a separate trigger');
  assert.equal(band.childNodes[1].childNodes[0], art);
  h.api.setEnabled(false);
  assert.equal(band.hasAttribute('data-case-reveal-state'), false);
});

test('font and width changes regroup unfinished lines while completed words stay revealed', () => {
  const h = harness(); h.observer().enter([h.paragraph]);
  const words = h.paragraph.querySelectorAll('[data-case-reveal-word]'); h.observer().enter([h.heading, words[0]]);
  h.paragraph.wordsPerLine = 2; h.events.resize(); h.fontsReady(); h.flushFrames();
  assert.equal(words[0].getAttribute('data-case-reveal-state'), 'shown');
  assert.equal(words[3].hasAttribute('data-case-reveal-state'), false, 'new row touching a revealed word remains readable');
  assert.ok(h.observer().targets.has(words[4]));
  h.api.setEnabled(false); assert.equal(h.paragraph.childNodes[0], h.original);
});

test('body lines wait for their preceding heading across independent observer batches', () => {
  const h = harness();
  h.observers.at(-2).enter([h.paragraph]);
  const word = h.paragraph.querySelector('[data-case-reveal-word]');
  h.observer().enter([word]);
  assert.equal(word.getAttribute('data-case-reveal-state'), 'pending');
  h.observer().enter([h.heading]);
  assert.equal(h.heading.getAttribute('data-case-reveal-state'), 'shown');
  assert.equal(h.heading.style['--case-reveal-delay'], '0ms');
  h.observer().enter([word]);
  assert.equal(word.getAttribute('data-case-reveal-state'), 'shown');
  assert.equal(word.style['--case-reveal-delay'], '55ms');
});

test('initial fragments and section navigation show the heading while preserving body line reveals', () => {
  const initial = harness({hash: '#research'});
  assert.equal(initial.heading.hasAttribute('data-case-reveal-state'), false);
  assert.equal(initial.paragraph.getAttribute('data-case-reveal-state'), 'pending');
  const h = harness(); h.observer().enter([h.paragraph]);
  const anchor = new h.Element('a'); anchor.href = 'http://localhost/Turbo/index.html?reveal=1#research';
  h.events.click({target: anchor});
  const words = h.paragraph.querySelectorAll('[data-case-reveal-word]');
  assert.ok(words.length > 6);
  assert.equal(words[0].getAttribute('data-case-reveal-state'), 'pending');
  assert.equal(h.heading.hasAttribute('data-case-reveal-state'), false);
  h.events.focusin({target: h.heading});
  assert.equal(words[0].getAttribute('data-case-reveal-state'), 'pending');
  h.observer().enter([words[0], words[3], words[6]]);
  assert.equal(words[0].style['--case-reveal-delay'], '55ms');
  assert.equal(words[3].style['--case-reveal-delay'], '110ms');
  assert.equal(words[6].style['--case-reveal-delay'], '165ms');
  assert.equal(words[9].getAttribute('data-case-reveal-state'), 'pending');
});

test('focusing a link reveals its paragraph without skipping adjacent body text', () => {
  const h = harness();
  h.events.focusin({target: h.link});
  assert.equal(h.linked.hasAttribute('data-case-reveal-state'), false);
  assert.equal(h.paragraph.getAttribute('data-case-reveal-state'), 'pending');
  assert.equal(h.linked.childNodes[0], h.link);
});

test('both Zeta technology paragraphs are selected and reveal by measured line', () => {
  const script = fs.readFileSync(require.resolve('../script.js'), 'utf8');
  const block = script.match(/technology:\s*\{([\s\S]*?)\n\s*\},\n\s*artifacts:/)[1];
  const data = block.match(/paragraphs:\s*\[([\s\S]*?)\]/)[1].replace(/,\s*$/, '');
  const text = JSON.parse('[' + data + ']');
  assert.equal(text.length, 2);
  const h = harness(); h.paragraph.textContent = text[0];
  const second = new h.Element('p'); second.textContent = text[1];
  h.paragraph.parentElement.append(second); h.candidates.push(second);
  h.paragraph.rect = {top: 1500, bottom: 1900, left: 0};
  second.rect = {top: 1950, bottom: 2150, left: 0};
  h.api.refresh();
  assert.ok(h.observers.at(-2).targets.has(h.paragraph));
  assert.ok(h.observers.at(-2).targets.has(second));
  h.observers.at(-2).enter([h.paragraph, second]);
  const firstWords = h.paragraph.querySelectorAll('[data-case-reveal-word]');
  const secondWords = second.querySelectorAll('[data-case-reveal-word]');
  assert.ok(firstWords.length > 30 && secondWords.length > 10);
  h.observer().enter([h.heading]);
  h.observer().enter([firstWords[0], firstWords[3]]);
  assert.equal(firstWords[0].style['--case-reveal-delay'], '55ms');
  assert.equal(firstWords[3].style['--case-reveal-delay'], '110ms');
  assert.equal(secondWords[0].getAttribute('data-case-reveal-state'), 'pending');
  h.observer().enter([secondWords[0]]);
  assert.equal(secondWords[0].getAttribute('data-case-reveal-state'), 'shown');
  assert.equal(secondWords[3].getAttribute('data-case-reveal-state'), 'pending');
  assert.equal(h.paragraph.textContent, text[0]); assert.equal(second.textContent, text[1]);
});

test('reduced motion, printing and missing observers leave readable original content', () => {
  const unsupported = harness({observerAvailable: false}); assert.equal(unsupported.api.active, false);
  const h = harness({reducedMotion: true}); assert.equal(h.api.active, false);
  h.reduced.matches = false; h.events.motion(); assert.equal(h.api.active, true);
  h.observer().enter([h.paragraph]);
  h.reduced.matches = true; h.events.motion(); assert.equal(h.paragraph.childNodes[0], h.original);
  h.reduced.matches = false; h.events.motion(); h.observer().enter([h.paragraph]);
  h.events.beforeprint(); assert.equal(h.api.active, false); assert.equal(h.paragraph.childNodes[0], h.original);
  assert.equal(h.api.enabled, true);
  h.events.afterprint(); assert.equal(h.api.active, true);
});

test('a measurement failure restores content instead of leaving it hidden', () => {
  const h = harness(); h.paragraph.failMeasure = true; h.observer().enter([h.paragraph]);
  assert.equal(h.api.active, false);
  assert.equal(h.paragraph.childNodes[0], h.original);
  assert.equal(h.heading.hasAttribute('data-case-reveal-state'), false);
  assert.equal(h.html.hasAttribute('data-case-reveal'), false);
});
