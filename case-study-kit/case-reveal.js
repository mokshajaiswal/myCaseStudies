/* Optional, reversible editorial entrances; product component internals stay untouched. */
(() => {
  // Page-owned groups enter together; their controls and internal playback stay intact.
  const units = [
    '.info-panel', '.experience-grid', '.outcome-grid', '.persona-explorer',
    '.competitive-board-component', '.artifact-stage', '.relationship-map',
    '.family-story__home-figure', '.family-story__figure',
    '.design-tradeoffs__screen', '.annotation-band', '.closing-stage', '.phone-stage', '.case-ending__screens',
  ].join(',');
  const headings = [
    '.section-heading', '.section-kicker', '.subsection-heading', '.design-question-title',
    '.design-tradeoffs__direction-heading', '.family-story__heading', '.family-story__scene-title',
    '.impact-future__future-title',
  ].join(',');
  // Headings and prose split into measured lines; cards and units enter whole.
  const selectors = [
    headings, '.design-question-eyebrow', '.body-copy > p', '.reading-column > p',
    '.research-interviews-intro', '.design-tradeoffs__description', '.family-story__lead',
    '.family-story__copy > p', '.info-card', '.experience-card', '.outcome-card',
    '.meta-strip', '.timeline-card', '.contact-card', units,
  ].join(',').split(',').map(selector => '#dynamic-content ' + selector.trim()).join(',');
  // The TLDR heading and copy are visible on arrival; everything after it reveals on scroll.
  const protectedOwners = [
    '#overview > .reading-column', '[class^="th-"]', '[class*=" th-"]', '.user-voice-stack', '.case-ending__card',
    '.family-story__loop-step', 'dialog', '[hidden]', '[data-case-reveal-skip]',
  ].join(',');
  const excluded = [
    '[class^="th-"]', '[class*=" th-"]', '.user-voice-stack', '.case-ending__card',
    '.family-story__loop-step', '.persona-explorer',
    '.competitive-board-component', '.artifact-stage', '.impact-future__stage',
    '.case-ending__composition', 'dialog', '[hidden]', '[data-case-reveal-skip]',
  ].join(',');
  // One reading line 85% down the viewport. The huge top margin also counts everything
  // above it, so a fast jump past content never strands it hidden.
  const readingLine = '100000px 0px -15% 0px';
  const step = 60, maxDelay = 360, settle = maxDelay + 700;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const seen = new WeakSet(), seenWords = new WeakSet();
  let requested = new URLSearchParams(location.search).get('reveal') !== '0';
  let active = false, printing = false, observer = null, resizeFrame = null, endFrame = null, generation = 0;
  const records = new Map(), blocks = new Set(), timers = new Set(), decorated = new Set();

  function pend(node) {
    node.setAttribute('data-case-reveal-state', 'pending');
    decorated.add(node);
  }
  function clearState(element) {
    element.removeAttribute('data-case-reveal-state');
    element.style.removeProperty('--case-reveal-delay');
    decorated.delete(element);
  }
  function forget(block) {
    for (const record of Array.from(records.values())) {
      if (record.block === block) { observer?.unobserve(record.target); records.delete(record.target); }
    }
  }
  function restore(block) {
    forget(block);
    for (const {original, parent, inserted} of block.replacements) {
      // Preserve original text nodes and inline elements/listeners, rather than innerHTML.
      if (inserted.every(node => node.parentNode === parent)) {
        parent.insertBefore(original, inserted[0]);
        inserted.forEach(node => node.remove());
      }
    }
    block.words.forEach(clearState); block.atoms.forEach(clearState);
    block.replacements = [];
    blocks.delete(block);
  }
  function stop() {
    active = false; generation++;
    Array.from(blocks).forEach(restore);
    observer?.disconnect(); observer = null;
    if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
    if (endFrame !== null) cancelAnimationFrame(endFrame);
    resizeFrame = endFrame = null;
    timers.forEach(clearTimeout); timers.clear();
    document.documentElement.removeAttribute('data-case-reveal');
    Array.from(decorated).forEach(clearState); records.clear();
  }
  function later(callback, delay) {
    const timer = setTimeout(() => { timers.delete(timer); if (active) callback(); }, delay);
    timers.add(timer);
  }
  function show(record, delay = 0, immediate = false) {
    if (record.done) return;
    record.done = true;
    observer?.unobserve(record.target); records.delete(record.target);
    record.nodes.forEach(node => {
      seenWords.add(node);
      if (immediate) clearState(node);
      else {
        node.style.setProperty('--case-reveal-delay', delay + 'ms');
        node.setAttribute('data-case-reveal-state', 'shown');
      }
    });
    const block = record.block;
    if (!block) {
      seen.add(record.target);
      if (!immediate) later(() => record.nodes.forEach(clearState), settle);
    } else if (block.words.every(word => seenWords.has(word))) {
      // Unwrap only after the slowest possible line in this block has settled.
      seen.add(block.element);
      if (immediate) restore(block); else later(() => restore(block), settle);
    }
  }
  function watch(record) {
    records.set(record.target, record);
    observer.observe(record.target);
  }
  function split(element) {
    const block = {element, words: [], atoms: [], replacements: []};
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) textNodes.push(walker.currentNode);
    for (const original of textNodes) {
      const parent = original.parentNode, fragment = document.createDocumentFragment(), inserted = [];
      for (const token of original.nodeValue.split(/(\s+)/)) {
        if (!token) continue;
        let node;
        if (/^\s+$/.test(token)) node = document.createTextNode(token);
        else {
          node = document.createElement('span'); node.textContent = token;
          node.setAttribute('data-case-reveal-word', ''); pend(node); block.words.push(node);
        }
        inserted.push(node); fragment.append(node);
      }
      block.replacements.push({original, parent, inserted}); original.replaceWith(fragment);
    }
    if (!block.words.length) return null;
    // Text-free inline art, such as the heading flower, enters with the first line.
    block.atoms = Array.from(element.children).filter(child => child.tagName !== 'BR' && !child.textContent.trim());
    block.atoms.forEach(pend);
    blocks.add(block);
    return block;
  }
  function groupLines(block) {
    // Only unfinished words regroup; lines already read never replay on resize.
    forget(block);
    const lines = [];
    for (const word of block.words) {
      // offsetTop ignores the pending translate, so shown and pending words still align.
      const top = word.offsetTop, height = word.offsetHeight || 1;
      let line = lines.at(-1);
      if (!line || top > line.top + line.height / 2) { line = {top, height, words: []}; lines.push(line); }
      line.words.push(word);
    }
    lines.forEach((line, index) => {
      const pending = line.words.filter(word => !seenWords.has(word));
      if (!pending.length) return;
      const nodes = index === 0 ? pending.concat(block.atoms.filter(atom => !seenWords.has(atom))) : pending;
      const record = {target: pending[0], nodes, block, done: false};
      if (pending.length < line.words.length) show(record, 0, true);
      else watch(record);
    });
  }
  function handleEntries(entries) {
    if (!active) return;
    try {
      const ready = entries.filter(entry => entry.isIntersecting && records.has(entry.target))
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      // Lines crossing together cascade top to bottom; the cap keeps fast scrolls from queueing.
      let row = -Infinity, delay = -step;
      for (const entry of ready) {
        const record = records.get(entry.target), rect = entry.boundingClientRect;
        if (!record) continue;
        if (rect.bottom <= 0) { show(record, 0, true); continue; }
        if (rect.top > row + 4) { delay = Math.min(maxDelay, delay + step); row = rect.top; }
        show(record, delay);
      }
    } catch { stop(); } // A layout/API failure must leave readable, original content.
  }
  function checkEnd() {
    if (!active || endFrame !== null) return;
    endFrame = requestAnimationFrame(() => {
      endFrame = null;
      if (!active || innerHeight + scrollY < document.documentElement.scrollHeight - 2) return;
      // The last lines can sit below the reading line at full scroll; show what is visible.
      handleEntries(Array.from(records.keys(), target => ({target, isIntersecting: true, boundingClientRect: target.getBoundingClientRect()}))
        .filter(entry => entry.boundingClientRect.top < innerHeight));
    });
  }
  function revealSection(target) {
    if (!active || !target) return;
    // Show the destination at once; following body copy keeps its own line reveals.
    const destination = target.closest('.case-section') === target
      ? target.querySelector(headings) || target : target;
    const scope = destination.closest(units) || destination;
    for (const record of Array.from(records.values())) {
      if (scope.contains(record.target) || record.target.contains(destination)) show(record, 0, true);
    }
    for (const block of Array.from(blocks)) {
      if (scope.contains(block.element) || block.element.contains(destination)) {
        block.words.forEach(word => seenWords.add(word)); seen.add(block.element); restore(block);
      }
    }
    scope.querySelectorAll('[data-case-reveal-state]').forEach(clearState);
    clearState(scope);
  }
  function hashTarget() {
    try { return document.getElementById(decodeURIComponent(location.hash.slice(1))); }
    catch { return null; }
  }
  function start() {
    if (active || !requested || reduced.matches || printing || typeof IntersectionObserver !== 'function') return;
    try {
      active = true; const token = ++generation;
      observer = new IntersectionObserver(handleEntries, {rootMargin: readingLine});
      const candidates = Array.from(document.querySelectorAll(selectors)).filter(node => {
        if (node.closest(protectedOwners)) return false;
        const unit = node.closest(units);
        // Permit the outer presentation group, never its nested component internals.
        return unit === node || (!unit && !node.closest(excluded));
      });
      const selected = new Set(candidates);
      // Read layout for every candidate before any splitting writes to the DOM.
      const fresh = candidates.filter(target => {
        for (let parent = target.parentElement; parent; parent = parent.parentElement) if (selected.has(parent)) return false;
        if (seen.has(target)) return false;
        if (target.getBoundingClientRect().bottom <= 0) { seen.add(target); return false; }
        return true;
      });
      const prose = [];
      fresh.forEach(target => {
        // Preserve inline links while splitting text; fields/actions stay intact.
        const text = /^(P|H[1-6])$/.test(target.tagName) && !target.querySelector('button, input, select, textarea, [contenteditable]');
        const block = text ? split(target) : null;
        if (block) prose.push(block);
        else if (text) seen.add(target);
        else { pend(target); watch({target, nodes: [target], done: false}); }
      });
      document.documentElement.setAttribute('data-case-reveal', 'on');
      prose.forEach(groupLines);
      revealSection(hashTarget());
      if (document.activeElement && document.activeElement !== document.body) revealSection(document.activeElement);
      checkEnd();
      document.fonts?.ready.then(() => { if (active && token === generation) scheduleRefresh(); });
    } catch { stop(); }
  }
  function scheduleRefresh() {
    if (!active || resizeFrame !== null) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = null;
      try { Array.from(blocks).forEach(groupLines); } catch { stop(); }
    });
  }
  function setEnabled(enabled) {
    requested = Boolean(enabled);
    if (requested) start(); else stop();
    return requested;
  }
  window.CaseStudyReveal = Object.freeze({
    setEnabled,
    get enabled() { return requested; },
    get active() { return active; },
    refresh() { if (requested) { stop(); start(); } },
  });
  reduced.addEventListener('change', () => { if (reduced.matches) stop(); else start(); });
  addEventListener('resize', scheduleRefresh, {passive: true});
  addEventListener('scroll', checkEnd, {passive: true});
  addEventListener('hashchange', () => revealSection(hashTarget()));
  addEventListener('popstate', () => revealSection(hashTarget()));
  document.addEventListener('focusin', event => revealSection(event.target));
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && url.pathname === location.pathname && url.hash) {
      try { revealSection(document.getElementById(decodeURIComponent(url.hash.slice(1)))); } catch { /* Invalid fragment. */ }
    }
  }, true);
  addEventListener('beforeprint', () => { printing = true; stop(); });
  addEventListener('afterprint', () => { printing = false; start(); });
  addEventListener('pagehide', stop);
  addEventListener('pageshow', start);
  start();
})();
