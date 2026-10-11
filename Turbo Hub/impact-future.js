/* Page-owned editorial composition; no product state or controls. */
(function (root) {
  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    element.className = className;
    if (text) element.textContent = text;
    return element;
  };
  function create(data) {
    const section = node('section', 'case-section impact-future');
    section.id = 'impact-future';
    const copy = node('div', 'reading-column');
    const heading = createSectionHeading(data.title);
    heading.id = 'impact-future-heading';
    section.setAttribute('aria-labelledby', heading.id);
    copy.append(heading, node('p', 'section-intro', data.intro));
    const stage = node('div', 'impact-future__stage');
    stage.dataset.impactStage = '';
    const center = node('div', 'impact-future__center');
    center.append(node('span', 'impact-future__eyebrow', data.eyebrow), node('h3', 'impact-future__statement', data.statement));
    const notes = node('ul', 'impact-future__notes');
    notes.setAttribute('aria-label', data.notesLabel);
    data.notes.forEach((item, index) => {
      const note = node('li', 'impact-future__note');
      note.dataset.slot = String(index);
      note.dataset.type = item.type;
      for (const corner of ['tl', 'tr', 'bl', 'br']) {
        const handle = node('span', 'impact-future__handle');
        handle.dataset.corner = corner;
        handle.setAttribute('aria-hidden', 'true');
        note.append(handle);
      }
      if (item.type !== 'quote') {
        note.append(node('span', 'impact-future__kind', item.kind), node('strong', 'impact-future__value', item.value));
      }
      const label = node('span', 'impact-future__label', item.label);
      if (item.type === 'quote') {
        const paragraph = node('p', 'impact-future__paragraph');
        paragraph.append(label);
        note.append(paragraph);
      } else {
        note.append(label);
      }
      notes.append(note);
    });
    const artwork = node('div', 'impact-future__artwork');
    artwork.append(center, notes);
    const viewport = node('div', 'impact-future__viewport');
    viewport.append(artwork);
    stage.append(viewport);
    const future = node('div', 'reading-column impact-future__next');
    future.append(node('h3', 'impact-future__future-title', data.futureTitle), node('p', 'body-copy', data.future));
    const matrix = node('table', 'impact-future__diagnostics');
    matrix.append(node('caption', '', 'Diagnostic measures for the segmented rollout'));
    const head = node('thead', '');
    const headings = node('tr', '');
    ['Journey', 'Evidence to extract', 'Question to investigate'].forEach(label => {
      const cell = node('th', '', label);
      cell.scope = 'col';
      headings.append(cell);
    });
    head.append(headings);
    const body = node('tbody', '');
    data.diagnostics.forEach(item => {
      const row = node('tr', '');
      const area = node('th', '', item.area);
      area.scope = 'row';
      row.append(area, node('td', '', item.evidence), node('td', '', item.question));
      body.append(row);
    });
    matrix.append(head, body);
    future.append(matrix);
    section.append(copy, stage, future);
    return section;
  }
  function mount(stage) {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true, frame = null, travel = [], restingHeight = 0, statementOffset = 0, lastTop = stage.getBoundingClientRect().top;
    const entered = new Set();
    const animations = new Map();
    const notes = Array.from(stage.querySelectorAll('.impact-future__note'));
    function measureTravel() {
      // Measure the final composition, including captions that extend past their frames.
      stage.style.setProperty('--impact-fit-scale', '1');
      stage.style.setProperty('--impact-stage-height', 'calc(var(--impact-lower-start) + var(--impact-motion-room))');
      const initialCanvas = stage.getBoundingClientRect();
      const center = stage.querySelector('.impact-future__center').getBoundingClientRect();
      const statement = stage.querySelector('.impact-future__statement').getBoundingClientRect();
      statementOffset = statement.top + statement.height / 2 - initialCanvas.top;
      stage.style.setProperty('--impact-lower-start', (center.bottom - initialCanvas.top + 40) + 'px');
      const canvas = stage.getBoundingClientRect();
      // Anchor these caption tails to the actual metric text, including after resizing.
      notes.filter(note => ['3', '5'].includes(note.dataset.slot)).forEach(note => {
        const value = note.querySelector('.impact-future__value');
        const label = note.querySelector('.impact-future__label');
        const range = document.createRange();
        range.selectNodeContents(value);
        const metric = range.getBoundingClientRect();
        const caption = label.getBoundingClientRect();
        const target = metric.left + metric.width / 2 - caption.left;
        label.style.setProperty('--impact-pointer-x', Math.max(24, Math.min(caption.width - 24, target)) + 'px');
      });
      const bounds = notes.map(note => {
        const frame = note.getBoundingClientRect();
        const caption = note.querySelector('.impact-future__label').getBoundingClientRect();
        return {note, offsetBottom: Math.max(frame.bottom, caption.bottom) - canvas.top, offsetTop: frame.top - canvas.top, left: Math.min(frame.left, caption.left), right: Math.max(frame.right, caption.right), top: Math.min(frame.top, caption.top), bottom: Math.max(frame.bottom, caption.bottom)};
      });
      travel = bounds;
      restingHeight = Math.ceil(Math.max(...bounds.map(item => item.offsetBottom)) + 24);
      stage.style.setProperty('--impact-artwork-height', restingHeight + 'px');
      // Fit the complete desktop composition, including captions, inside one viewport.
      const fit = innerWidth > 768 ? Math.min(1, Math.max(1, innerHeight - 48) / restingHeight) : 1;
      stage.style.setProperty('--impact-fit-scale', String(fit));
      const fittedHeight = Math.ceil(restingHeight * fit);
      stage.style.setProperty('--impact-stage-height', fittedHeight + 'px');
      statementOffset *= fit;
      bounds.forEach(bound => {
        bound.entryOffset = bound.offsetTop * fit;
        bound.exitOffset = bound.offsetBottom * fit;
      });
    }
    function settleAnimations() {
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }
    function enterNote(bound, scrollingUp = false) {
      const {note} = bound;
      if (entered.has(note)) return;
      entered.add(note);
      note.style.setProperty('--impact-opacity', '1');
      if (scrollingUp || reduced.matches || document.hidden || typeof note.animate !== 'function') return;
      const slot = Number(note.dataset.slot);
      const index = slot % 3;
      const compact = innerWidth <= 768;
      // Distinct approach directions converge on the existing settled positions.
      const directions = [[-64, -24], [0, -48], [64, -24], [-48, 56], [0, 48], [48, 56]];
      const [dx, dy] = directions[slot];
      const x = compact ? dx * 0.5 : dx;
      const y = compact ? dy * 0.65 : dy;
      const animation = note.animate([
        { transform: `translate3d(${x}px, ${y}px, 0)`, opacity: 0 },
        { transform: 'translate3d(0, 0, 0)', opacity: 1 },
      ], { duration: 1150, delay: index * 90, easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)', fill: 'both' });
      animations.set(note, animation);
      const release = () => {
        if (animations.get(note) !== animation) return;
        animations.delete(note); animation.cancel();
      };
      animation.finished.then(release, release);
    }
    function paint() {
      frame = null;
      if (reduced.matches) {
        settleAnimations();
        travel.forEach(bound => enterNote(bound));
        return;
      }
      const top = stage.getBoundingClientRect().top;
      const scrollingUp = top > lastTop;
      lastTop = top;
      if (scrollingUp) settleAnimations();
      const lowerReady = top + statementOffset <= innerHeight * 0.68;
      travel.forEach(bound => {
        const lower = Number(bound.note.dataset.slot) >= 3;
        const noteTop = top + bound.entryOffset;
        const noteBottom = top + bound.exitOffset;
        // Rearm only after the entire rectangle and caption leave the viewport.
        if (noteBottom <= 0 || noteTop >= innerHeight) {
          const active = animations.get(bound.note);
          animations.delete(bound.note);
          if (active) active.cancel();
          entered.delete(bound.note);
          if (typeof bound.note.animate === 'function') bound.note.style.setProperty('--impact-opacity', '0');
          return;
        }
        const inView = scrollingUp
          ? noteBottom > 0
          : noteTop <= innerHeight * (lower ? 0.86 : 0.82);
        if (inView && (scrollingUp || !lower || lowerReady)) enterNote(bound, scrollingUp);
      });
    }

    function schedule() {
      if (!reduced.matches && visible && !document.hidden && frame === null) frame = requestAnimationFrame(paint);
    }
    function cancel() { if (frame !== null) cancelAnimationFrame(frame); frame = null; }
    function resetEntrance() {
      settleAnimations();
      entered.clear();
      notes.forEach(note => {
        note.style.setProperty('--impact-opacity', reduced.matches || typeof note.animate !== 'function' ? '1' : '0');
      });
    }
    if (typeof IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (visible) schedule(); else { cancel(); resetEntrance(); }
      }, {rootMargin: '0px'});
      const viewport = stage.querySelector('.impact-future__viewport') || stage;
      observer.observe(viewport);
      addEventListener('pagehide', () => observer.disconnect());
      addEventListener('pageshow', () => observer.observe(viewport));
    }
    addEventListener('scroll', schedule, {passive: true});
    addEventListener('resize', () => { cancel(); settleAnimations(); measureTravel(); paint(); }, {passive: true});
    document.addEventListener('visibilitychange', () => { if (document.hidden) { cancel(); settleAnimations(); } else schedule(); });
    reduced.addEventListener('change', () => { cancel(); if (reduced.matches) paint(); else schedule(); });
    addEventListener('pagehide', () => { cancel(); settleAnimations(); });
    addEventListener('pageshow', schedule);
    measureTravel();
    notes.forEach(note => {
      if (!reduced.matches && typeof note.animate === 'function') note.style.setProperty('--impact-opacity', '0');
    });
    paint();
    if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(() => {
      // Let any entrance finish before measuring, rather than cutting its glide short.
      return Promise.allSettled([...animations.values()].map(animation => animation.finished)).then(() => {
        if (!stage.isConnected) return;
        cancel(); measureTravel(); paint();
      });
    });
  }
  root.TurboImpactFuture = {create, mount};
  document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('[data-impact-stage]').forEach(mount));
})(window);
