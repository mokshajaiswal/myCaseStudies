/* Page-owned reading navigation; product prototypes remain independent. */
(() => {
  // Exact damped-spring step: preserve position and velocity when direction changes.
  function advanceNavigationSpring(position, velocity, target, seconds) {
    const frequency = 20, damping = 0.6;
    const decay = frequency * damping;
    const wave = frequency * Math.sqrt(1 - damping * damping);
    const offset = position - target;
    const coefficient = (velocity + decay * offset) / wave;
    const envelope = Math.exp(-decay * seconds);
    const cosine = Math.cos(wave * seconds), sine = Math.sin(wave * seconds);
    return [
      target + envelope * (offset * cosine + coefficient * sine),
      envelope * ((coefficient * wave - decay * offset) * cosine + (-offset * wave - decay * coefficient) * sine),
    ];
  }
  const sections = [
    ['overview', 'Overview'],
    ['research', 'Research'],
    ['competitive-research', 'Learnings'],
    ['relationship', 'Roles'],
    ['flows', 'Flows'],
  ].filter(([id]) => document.getElementById(id));
  if (!sections.length) return;
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    element.className = className;
    if (text) element.textContent = text;
    return element;
  };
  const host = make('nav', 'case-navigation');
  host.setAttribute('aria-label', 'Jump to a case study section');
  const version = new URLSearchParams(location.search).get('nav') === '2' ? '2' : '1';
  host.classList.add('case-navigation--v' + version);
  document.body.dataset.caseNavigation = version;
  const list = make('ul', 'case-navigation__list');
  const links = sections.map(([id, label]) => {
    const item = make('li', '');
    const link = make('a', 'case-navigation__section', label);
    link.href = '#' + id;
    item.append(link);
    list.append(item);
    return link;
  });
  let toggle, panel;
  function setOpen(open, restoreFocus = false) {
    if (!panel) return;
    const focusWasInside = panel.contains(document.activeElement);
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close section navigation' : 'Open section navigation');
    if (restoreFocus || (!open && focusWasInside)) toggle.focus({preventScroll: true});
  }
  if (version === '2') {
    toggle = make('button', 'case-navigation__tab');
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Open section navigation');
    toggle.setAttribute('aria-controls', 'case-navigation-panel');
    toggle.setAttribute('aria-expanded', 'false');
    if (window.TurboIcons) {
      const icon = make('span', 'case-navigation__tab-icon');
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = TurboIcons.render('list-bullets', {size: 18});
      toggle.append(icon);
    }
    toggle.append(make('span', 'case-navigation__tab-label', 'Sections'));
    panel = make('div', 'case-navigation__panel');
    panel.id = 'case-navigation-panel';
    panel.hidden = true;
    panel.append(list);
    host.append(toggle, panel);
    toggle.addEventListener('click', () => setOpen(panel.hidden));
    document.addEventListener('click', event => {
      if (!panel.hidden && !host.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) {
        event.preventDefault();
        setOpen(false, true);
      }
    });
    host.addEventListener('focusout', event => {
      if (event.relatedTarget && !host.contains(event.relatedTarget)) setOpen(false);
    });
  } else {
    list.id = 'case-navigation-bar-links';
    const minimize = make('button', 'case-navigation__minimize');
    minimize.type = 'button';
    minimize.setAttribute('aria-controls', list.id);
    const icon = make('span', 'case-navigation__minimize-icon');
    icon.setAttribute('aria-hidden', 'true');
    minimize.append(icon);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let expanded = true, position = 1, velocity = 0, target = 1;
    let frame = null, previousTime = 0;
    const clamp = value => Math.min(1, Math.max(0, value));
    function paint() {
      const speed = Math.min(1, Math.abs(velocity) / 12);
      host.style.setProperty('--navigation-reveal', String(Math.max(0, position)));
      // Center arrival may overshoot; cap the right-edge overshoot inside viewport gutters.
      host.style.setProperty('--navigation-travel', String(Math.min(1.025, position)));
      host.style.setProperty('--navigation-icon-x', String(1 + 0.06 * speed));
      host.style.setProperty('--navigation-icon-y', String(1 - 0.08 * speed));
      host.style.setProperty('--navigation-control-scale', String(1 - 0.045 * speed));
      host.style.setProperty('--navigation-content-opacity', String(clamp((position - 0.25) / 0.65)));
      host.style.setProperty('--navigation-surface-opacity', String(clamp(position)));
    }
    function finish() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      position = target;
      velocity = 0;
      paint();
      list.style.visibility = target ? 'visible' : 'hidden';
    }
    function tick(time) {
      frame = null;
      const seconds = Math.min(1 / 30, Math.max(0, (time - previousTime) / 1000));
      previousTime = time;
      [position, velocity] = advanceNavigationSpring(position, velocity, target, seconds);
      paint();
      if (Math.abs(position - target) < 0.001 && Math.abs(velocity) < 0.015) finish();
      else frame = requestAnimationFrame(tick);
    }
    function setExpanded(open, restoreFocus = false) {
      expanded = open;
      target = open ? 1 : 0;
      if (!open && list.contains(document.activeElement)) restoreFocus = true;
      host.dataset.expanded = String(open);
      list.inert = !open;
      list.setAttribute('aria-hidden', String(!open));
      minimize.setAttribute('aria-expanded', String(open));
      minimize.setAttribute('aria-label', open ? 'Minimize section navigation' : 'Expand section navigation');
      minimize.title = open ? 'Hide sections' : 'Show sections';
      icon.innerHTML = TurboIcons.render(open ? 'reading-collapse' : 'reading-expand', {size: 20, weight: 'regular'});

      if (reduced.matches || !host.isConnected || document.hidden) finish();
      else {
        list.style.visibility = 'visible';
        if (frame === null) {
          previousTime = performance.now();
          frame = requestAnimationFrame(tick);
        }
      }
      if (restoreFocus) minimize.focus({preventScroll: true});
    }
    reduced.addEventListener('change', event => { if (event.matches) finish(); });
    document.addEventListener('visibilitychange', () => { if (document.hidden) finish(); });
    addEventListener('pagehide', finish);
    minimize.addEventListener('click', () => setExpanded(!expanded));
    host.addEventListener('keydown', event => {
      if (event.key === 'Escape' && expanded) {
        event.preventDefault();
        setExpanded(false, true);
      }
    });
    host.append(list, minimize);
    setExpanded(true);
  }
  document.body.append(host);
  host.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;
    event.preventDefault();
    setOpen(false);
    const heading = target.querySelector('h2, h3, h4') || target;
    if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1;
    heading.focus({preventScroll: true});
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    target.scrollIntoView({block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
  const targets = sections.map(([id]) => document.getElementById(id));
  let pending = false;
  function updateCurrent() {
    pending = false;
    let current = -1;
    const threshold = innerHeight * 0.3;
    targets.forEach((target, index) => {
      if (target.getBoundingClientRect().top <= threshold) current = index;
    });
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(updateCurrent);
  }
  addEventListener('scroll', scheduleUpdate, {passive: true});
  addEventListener('resize', scheduleUpdate);
  updateCurrent();
})();
