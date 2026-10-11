(() => {
  'use strict';
  const canvas = document.querySelector('.walkthrough');
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('[data-slide]')];
  const announcement = document.getElementById('announcement');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, timer = null, pointer = null, active = true;
  let transitionAnimations = [], request = 0, initialized = false;
  const story = window.TurboStoryContext;
  const locked = Boolean(story?.embedded && story.locked);
  const delay = 4000;
  let splashVisible = true, splashTimer = null, openingCarousel = false;
  const splash = document.querySelector('.splash');
  const carouselArea = document.querySelector('.carousel-area');
  const actionSlot = document.getElementById('start-action');
  function scheduleSplash() {
    clearTimeout(splashTimer);
    if (locked || !active || !splashVisible || document.hidden || openingCarousel) return;
    splashTimer = setTimeout(async () => {
      openingCarousel = true;
      await show(0, false);
      splash.hidden = true;
      canvas.classList.remove('is-splash');
      for (const region of [carouselArea, actionSlot]) {
        region.inert = false;
        region.removeAttribute('aria-hidden');
      }
      splashVisible = false;
      openingCarousel = false;
      schedule();
    }, 1600);
  }
  const artworkSources = slides.map(slide => slide.querySelector('.art img').getAttribute('src'));
  let artworkRun = 0;
  function prepareArtwork(index) {
    // Load a fresh GIF offscreen so resetting playback cannot blank the live image.
    const image = slides[index].querySelector('.art img').cloneNode();
    const source = new URL(artworkSources[index], location.href);
    source.searchParams.set('play', String(++artworkRun));
    return new Promise(resolve => {
      image.onload = () => { image.onload = image.onerror = null; resolve(image); };
      image.onerror = () => { image.onload = image.onerror = null; resolve(null); };
      image.src = source.href;
    });
  }
  function clearTransition() {
    transitionAnimations.forEach(animation => animation.cancel());
    transitionAnimations = [];
    slides.forEach(slide => slide.classList.remove('is-leaving'));
  }
  TurboUI.chromeBackdrop({ host:document.querySelector('.viewport') });
  document.getElementById('statusbar').append(TurboUI.statusbar());
  const scale = () => {
    const bounds = document.querySelector('.viewport').getBoundingClientRect();
    const factor = Math.min(bounds.width / 360, bounds.height / 640);
    canvas.style.setProperty('--preview-scale', factor);
    canvas.style.setProperty('--preview-height', `${bounds.height / factor}px`);
  };
  new ResizeObserver(scale).observe(document.querySelector('.viewport'));
  scale();
  function schedule() {
    clearTimeout(timer);
    if (!locked && !splashVisible && active && !document.hidden && !motion.matches) timer = setTimeout(() => show((current + 1) % slides.length, false), delay);
  }
  async function show(index, manual = true) {
    const next = (index + slides.length) % slides.length;
    const generation = ++request;
    clearTimeout(timer);
    if (initialized && next === current) { schedule(); return; }
    const artwork = await prepareArtwork(next);
    if (generation !== request) return;
    clearTransition();
    if (artwork) slides[next].querySelector('.art img').replaceWith(artwork);
    const outgoing = initialized ? slides[current] : null;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-current', i === next);
      slide.classList.toggle('is-leaving', slide === outgoing);
      slide.inert = i !== next;
      slide.setAttribute('aria-hidden', String(i !== next));
    });
    current = next;
    initialized = true;
    if (outgoing && !motion.matches) {
      const timing = { duration:500, easing:'cubic-bezier(.22,.61,.36,1)' };
      const incomingAnimation = slides[next].animate([
        { transform:'translateX(100%)' }, { transform:'translateX(0)' }
      ], timing);
      const outgoingAnimation = outgoing.animate([
        { transform:'translateX(0)' }, { transform:'translateX(-100%)' }
      ], timing);
      transitionAnimations = [incomingAnimation, outgoingAnimation];
      outgoingAnimation.onfinish = () => outgoing.classList.remove('is-leaving');
    } else clearTransition();
    dots.forEach((dot, i) => i === current ? dot.setAttribute('aria-current', 'step') : dot.removeAttribute('aria-current'));
    if (manual) announcement.textContent = slides[current].getAttribute('aria-label');
    schedule();
  }
  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
  canvas.addEventListener('keydown', event => {
    if (splashVisible || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  canvas.addEventListener('pointerdown', event => {
    if (!splashVisible && event.isPrimary && event.button === 0 && !event.target.closest('button')) pointer = { id:event.pointerId, x:event.clientX, y:event.clientY };
  });
  window.addEventListener('pointerup', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y;
    pointer = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
  });
  window.addEventListener('pointercancel', () => { pointer = null; });
  canvas.addEventListener('focusin', () => { active = false; schedule(); });
  canvas.addEventListener('focusout', event => { if (!canvas.contains(event.relatedTarget)) { active = true; schedule(); } });
  document.addEventListener('visibilitychange', () => { scheduleSplash(); schedule(); });
  motion.addEventListener('change', () => { if (motion.matches) clearTransition(); schedule(); });
  window.addEventListener('pagehide', () => { active = false; clearTimeout(timer); clearTimeout(splashTimer); });
  window.addEventListener('pageshow', () => { active = !canvas.contains(document.activeElement); scheduleSplash(); schedule(); });
  const start = TurboUI.button({ label:'Let’s Get Started!', variant:'inverse', onClick:() => {
    const detail = { slide:current, source:'payzapp-onboarding' };
    window.dispatchEvent(new CustomEvent('payzapp:onboarding-start', { detail }));
    if (parent !== window && location.origin !== 'null') parent.postMessage({ type:'payzapp:onboarding-start', ...detail }, location.origin);
    announcement.textContent = 'Ready to get started.';
    if (!locked && new URLSearchParams(location.search).get('next') === 'hub-welcome') {
      if (story) story.navigate('../hub-welcome/index.html');
      else location.href = '../hub-welcome/index.html';
    }
  }});
  document.getElementById('start-action').append(start);
  window.TurboPayzappPlayback = {
    async showSlide(index) {
      await show(index, false);
      splash.hidden = true; canvas.classList.remove('is-splash'); splashVisible = false;
      // Locked story fixtures are driven by the editorial queue, never native timers.
      for (const region of [carouselArea, actionSlot]) {
        region.inert = locked; region.removeAttribute('aria-hidden');
      }
    },
    reset() {
      request++; clearTimeout(timer); clearTimeout(splashTimer); clearTransition();
      initialized = false; current = 0; splashVisible = true; openingCarousel = false;
      splash.hidden = false; canvas.classList.add('is-splash');
      for (const region of [carouselArea, actionSlot]) { region.inert = true; region.setAttribute('aria-hidden','true'); }
      active = true; scheduleSplash();
    },
    pause() { active = false; clearTimeout(timer); clearTimeout(splashTimer); },
    resume() { active = true; scheduleSplash(); schedule(); }
  };
  if (story?.embedded) {
    const phone = document.createElement('main'); phone.className = 'phone';
    const viewport = document.querySelector('.viewport');
    viewport.before(phone); phone.append(viewport);
    const frame = document.createElement('img'); frame.className = 'phone-frame';
    frame.src = '../../assets/phone%20case%20clean.png'; frame.alt = ''; phone.append(frame);
    viewport.classList.add('phone-screen');
    scale();
  }
  scheduleSplash();
})();
