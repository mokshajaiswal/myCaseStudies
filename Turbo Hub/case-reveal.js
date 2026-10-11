/* Optional, reversible editorial entrances; product component internals stay untouched. */
(() => {
  // Page-owned groups enter together; their controls and internal playback stay intact.
  const units = [
    '.info-panel', '.experience-grid', '.outcome-grid', '.persona-explorer',
    '.competitive-board-component', '.artifact-stage', '.relationship-map',
    '.family-story__intro', '.family-story__chapter-header', '.family-story__scene',
    '.design-tradeoffs__direction', '.annotation-band', '.closing-stage', '.phone-stage', '.case-ending__screens',
  ].join(',');
  const selectors = [
    '.section-heading', '.section-kicker', '.subsection-heading', '.design-question-title',
    '.design-question-eyebrow', '.body-copy > p', '.reading-column > p',
    '.research-interviews-intro', '.design-tradeoffs__direction-heading',
    '.design-tradeoffs__description', '.info-card', '.experience-card', '.outcome-card',
    '.meta-strip', '.timeline-card', '.contact-card', '.case-ending__screens',
    '.design-tradeoffs__screen', '.phone-stage',
  ].concat(units.split(',')).map(selector => '#dynamic-content ' + selector.trim()).join(',');
  const protectedOwners = [
    '[class^="th-"]', '[class*=" th-"]', '.user-voice-stack', '.case-ending__card',
    '.family-story__loop-step', 'dialog', '[hidden]', '[data-case-reveal-skip]',
  ].join(',');
  const excluded = [
    '[class^="th-"]', '[class*=" th-"]', '.user-voice-stack', '.case-ending__card',
    '.family-story', '.family-story__loop-step', '.persona-explorer',
    '.competitive-board-component', '.artifact-stage', '.impact-future__stage',
    '.case-ending__composition', 'dialog', '[hidden]', '[data-case-reveal-skip]',
  ].join(',');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const headings = '.section-heading, .section-kicker, .subsection-heading, .design-question-title, .design-tradeoffs__direction-heading';
  const seen = new WeakSet();
  const seenWords = new WeakSet();
  let requested = new URLSearchParams(location.search).get('reveal') === '1';
  let active = false, printing = false, observer = null, preparationObserver = null, resizeFrame = null, generation = 0;
  const records = new Map(), paragraphs = new Set(), timers = new Set(), decorated = new Set(), waiting = new Set();

  function clearState(element) {
    element.removeAttribute('data-case-reveal-state');
    element.style.removeProperty('--case-reveal-delay');
    decorated.delete(element);
  }
  function restoreParagraph(paragraph) {
    for (const {original, parent, inserted} of paragraph.replacements) {
      // Preserve original text nodes and inline elements/listeners, rather than innerHTML.
      if (inserted.every(node => node.parentNode === parent)) {
        parent.insertBefore(original, inserted[0]);
        inserted.forEach(node => node.remove());
      }
    }
    paragraph.replacements = [];
    paragraphs.delete(paragraph);
  }
  function stop() {
    active = false; generation++;
    observer?.disconnect(); observer = null;
    preparationObserver?.disconnect(); preparationObserver = null;
    if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
    resizeFrame = null;
    timers.forEach(clearTimeout); timers.clear();
    document.documentElement.removeAttribute('data-case-reveal');
    Array.from(decorated).forEach(clearState); records.clear(); waiting.clear();
    paragraphs.forEach(paragraph => {
      paragraph.words.forEach(clearState);
      restoreParagraph(paragraph);
    });
  }
  function later(callback, delay) {
    const timer = setTimeout(() => { timers.delete(timer); if (active) callback(); }, delay);
    timers.add(timer);
  }
  function reveal(record, delay = 0, immediate = false) {
    if (record.done) return;
    record.done = true;
    waiting.delete(record);
    observer?.unobserve(record.target); preparationObserver?.unobserve(record.target); records.delete(record.target);
    record.nodes.forEach(node => {
      seenWords.add(node);
      if (immediate) clearState(node);
      else {
        node.style.setProperty('--case-reveal-delay', delay + 'ms');
        node.setAttribute('data-case-reveal-state', 'shown');
      }
    });
    if (record.paragraph) {
      const paragraph = record.paragraph;
      if (paragraph.words.every(word => seenWords.has(word))) {
        seen.add(paragraph.element);
        if (immediate) restoreParagraph(paragraph);
        else later(() => { paragraph.words.forEach(clearState); restoreParagraph(paragraph); }, 800);
      }
    } else {
      seen.add(record.target);
      if (!immediate) later(() => record.nodes.forEach(clearState), 800);
    }
  }
  function observe(record) {
    record.nodes.forEach(node => decorated.add(node));
    records.set(record.target, record);
    (record.prepare ? preparationObserver : observer).observe(record.target);
  }
  function groupLines(paragraph) {
    // Only unfinished words are regrouped; already read lines never replay on resize.
    for (const record of records.values()) {
      if (record.paragraph === paragraph) { observer.unobserve(record.target); records.delete(record.target); waiting.delete(record); }
    }
    const lines = [];
    for (const word of paragraph.words) {
      const top = Math.round(word.offsetTop);
      let line = lines.at(-1);
      if (!line || Math.abs(line.top - top) > 2) { line = {top, words: []}; lines.push(line); }
      line.words.push(word);
    }
    lines.forEach(line => {
      const pending = line.words.filter(word => !seenWords.has(word));
      if (!pending.length) return;
      const record = {target: pending[0], nodes: pending, paragraph, lead: paragraph.lead, done: false};
      if (line.words.some(word => seenWords.has(word))) reveal(record, 0, true);
      else observe(record);
    });
  }
  function prepareParagraph(record) {
    preparationObserver.unobserve(record.target); records.delete(record.target); clearState(record.target);
    const paragraph = {element: record.target, lead: record.lead, words: [], replacements: []};
    paragraphs.add(paragraph);
    const walker = document.createTreeWalker(record.target, NodeFilter.SHOW_TEXT);
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
          node.setAttribute('data-case-reveal-word', '');
          node.setAttribute('data-case-reveal-state', 'pending'); paragraph.words.push(node); decorated.add(node);
        }
        inserted.push(node); fragment.append(node);
      }
      paragraph.replacements.push({original, parent, inserted}); original.replaceWith(fragment);
    }
    if (!paragraph.words.length) { seen.add(record.target); restoreParagraph(paragraph); return; }
    groupLines(paragraph);
  }
  function handleEntries(entries) {
    if (!active) return;
    try {
      const ready = entries.filter(entry => entry.isIntersecting && records.has(entry.target))
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      let band = -Infinity, delay = 0;
      for (const entry of ready) {
        const record = records.get(entry.target);
        if (!record) continue;
        if (record.prepare) { prepareParagraph(record); continue; }
        if (record.lead && !seen.has(record.lead)) { waiting.add(record); continue; }
        // Stagger only this batch, capped at 220ms; fast scrolling never builds a backlog.
        if (entry.boundingClientRect.top > band + 12) {
          if (band !== -Infinity) delay = Math.min(220, delay + 55);
          else if (record.lead) delay = 55;
          band = entry.boundingClientRect.top;
        }
        reveal(record, record.unit || record.heading ? 0 : record.lead ? Math.max(55, delay) : delay);
      }
      // A line may arrive in a separate observer batch before its heading.
      // Recheck its viewport intersection once the heading has started.
      for (const record of Array.from(waiting)) {
        if (seen.has(record.lead)) {
          waiting.delete(record); observer.unobserve(record.target); observer.observe(record.target);
        }
      }
    } catch { stop(); } // A layout/API failure must leave readable, original content.
  }
  function revealSection(target) {
    if (!active || !target) return;
    // Keep a focused destination readable without bypassing all following body copy.
    const destination = target.closest('.case-section') === target
      ? target.querySelector(headings) || target : target;
    const scope = destination.closest(units) || destination;
    for (const record of Array.from(records.values())) {
      if (scope.contains(record.target) || record.target.contains(destination)) reveal(record, 0, true);
    }
    for (const paragraph of Array.from(paragraphs)) {
      if (scope.contains(paragraph.element) || paragraph.element.contains(destination)) {
        seen.add(paragraph.element); paragraph.words.forEach(clearState); restoreParagraph(paragraph);
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
      // Prepare lines just before entry so visible text never jumps into its start position.
      preparationObserver = new IntersectionObserver(handleEntries, {threshold: 0.01, rootMargin: '0px 0px 80px 0px'});
      // Start inside the visible viewport, leaving room to see the upward slide.
      // A positive lower margin played entrances beneath the screen edge.
      observer = new IntersectionObserver(handleEntries, {threshold: 0.01, rootMargin: '0px 0px -80px 0px'});
      const candidates = Array.from(document.querySelectorAll(selectors)).filter(node => {
        if (node.closest(protectedOwners)) return false;
        const unit = node.closest(units);
        // Permit the outer presentation group, never its nested component internals.
        return unit === node || (!unit && !node.closest(excluded));
      });
      const selected = new Set(candidates);
      const sectionHeadings = new Map();
      candidates.forEach(target => {
        for (let parent = target.parentElement; parent; parent = parent.parentElement) if (selected.has(parent)) return;
        const section = target.closest('.case-section');
        const heading = target.closest(headings) === target;
        if (heading) sectionHeadings.set(section, target);
        if (seen.has(target)) return;
        if (target.getBoundingClientRect().bottom <= 0) { seen.add(target); return; }
        // Linked/interactive paragraphs reveal as one intact block.
        const prepare = target.tagName === 'P' && !target.querySelector('a, button, input, select, textarea, [contenteditable]');
        target.setAttribute('data-case-reveal-state', 'pending');
        observe({target, nodes: [target], prepare, heading,
          lead: target.tagName === 'P' ? sectionHeadings.get(section) : null,
          unit: target.closest(units) === target, done: false});
      });
      document.documentElement.setAttribute('data-case-reveal', 'on');
      revealSection(hashTarget());
      if (document.activeElement && document.activeElement !== document.body) revealSection(document.activeElement);
      document.fonts?.ready.then(() => { if (active && token === generation) scheduleRefresh(); });
    } catch { stop(); }
  }
  function scheduleRefresh() {
    if (!active || resizeFrame !== null) return;
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = null;
      try { Array.from(paragraphs).forEach(groupLines); } catch { stop(); }
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
