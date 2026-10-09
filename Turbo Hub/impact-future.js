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
    center.append(node('span', 'impact-future__eyebrow', 'An illustrative success scenario'), node('h3', 'impact-future__statement', data.statement));
    const notes = node('ul', 'impact-future__notes');
    notes.setAttribute('aria-label', 'Assumed baselines and illustrative targets for the success metrics');
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
    stage.append(artwork);
    const future = node('div', 'reading-column impact-future__next');
    future.append(node('h3', 'impact-future__future-title', 'Where it goes next'), node('p', 'body-copy', data.future));
    section.append(copy, stage, future);
    return section;
  }
  function mount(stage) {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true, frame = null, travel = [], centerOffset = 0, restingHeight = 0;
    const notes = Array.from(stage.querySelectorAll('.impact-future__note'));
    function measureTravel() {
      // Measure the final composition, including captions that extend past their frames.
      notes.forEach(note => note.style.setProperty('--impact-distance', '0'));
      stage.style.setProperty('--impact-stage-height', 'calc(var(--impact-lower-start) + var(--impact-motion-room))');
      const initialCanvas = stage.getBoundingClientRect();
      const center = stage.querySelector('.impact-future__center').getBoundingClientRect();
      centerOffset = center.top - initialCanvas.top;
      stage.style.setProperty('--impact-lower-start', (center.bottom - initialCanvas.top + 40) + 'px');
      const canvas = stage.getBoundingClientRect();
      const bounds = notes.map(note => {
        const frame = note.getBoundingClientRect();
        const caption = note.querySelector('.impact-future__label').getBoundingClientRect();
        return {note, driftY: parseFloat(getComputedStyle(note).getPropertyValue('--drift-y')) || 0, offsetBottom: Math.max(frame.bottom, caption.bottom) - canvas.top, offsetTop: frame.top - canvas.top, left: Math.min(frame.left, caption.left), right: Math.max(frame.right, caption.right), top: Math.min(frame.top, caption.top), bottom: Math.max(frame.bottom, caption.bottom)};
      });
      travel = bounds;
      restingHeight = Math.ceil(Math.max(...bounds.map(item => item.offsetBottom)) + 24);
      stage.style.setProperty('--impact-artwork-height', restingHeight + 'px');
      bounds.forEach(bound => {
        bound.note.style.setProperty('--min-travel-x', Math.min(0, 16 - bound.left) + 'px');
        bound.note.style.setProperty('--max-travel-x', Math.max(0, innerWidth - 16 - bound.right) + 'px');
        bound.minY = Math.min(0, canvas.top + 12 - bound.top);
        bound.maxY = Math.max(0, canvas.bottom - 12 - bound.bottom);
        bound.note.style.setProperty('--min-travel-y', bound.minY + 'px');
        bound.note.style.setProperty('--max-travel-y', bound.maxY + 'px');
      });
    }
    function paint() {
      frame = null;
      if (reduced.matches) {
        notes.forEach(note => { note.style.setProperty('--impact-distance', '0'); note.style.setProperty('--impact-opacity', '1'); });
        stage.style.setProperty('--impact-stage-height', restingHeight + 'px');
        return;
      }
      const top = stage.getBoundingClientRect().top;
      const clamp = value => Math.max(0, Math.min(1, value));
      const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
      // Hidden outside the composition → appear and gather around the headline.
      const progress = clamp((innerHeight * 0.95 - (top + centerOffset)) / (innerHeight * 0.6));
      travel.forEach(({note}, index) => {
        const delay = [0, 0.06, 0.02, 0.04, 0.08, 0.06][index] || 0;
        const arrival = clamp((progress - delay) / (1 - delay));
        const distance = 1 - smooth(arrival);
        const opacity = smooth(arrival / 0.7);
        note.style.setProperty('--impact-distance', String(distance));
        note.style.setProperty('--impact-opacity', String(opacity));
      });
      stage.style.setProperty('--impact-stage-height', restingHeight + 'px');
    }
    function schedule() {
      if (!reduced.matches && visible && !document.hidden && frame === null) frame = requestAnimationFrame(paint);
    }
    function cancel() { if (frame !== null) cancelAnimationFrame(frame); frame = null; }
    if (typeof IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (visible) schedule(); else cancel();
      }, {rootMargin: '160px'});
      observer.observe(stage);
      addEventListener('pagehide', () => observer.disconnect());
      addEventListener('pageshow', () => observer.observe(stage));
    }
    addEventListener('scroll', schedule, {passive: true});
    addEventListener('resize', () => { cancel(); measureTravel(); paint(); }, {passive: true});
    document.addEventListener('visibilitychange', () => { if (document.hidden) cancel(); else schedule(); });
    reduced.addEventListener('change', () => { cancel(); if (reduced.matches) paint(); else schedule(); });
    addEventListener('pagehide', cancel);
    addEventListener('pageshow', schedule);
    measureTravel();
    paint();
  }
  root.TurboImpactFuture = {create, mount};
  document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('[data-impact-stage]').forEach(mount));
})(window);
