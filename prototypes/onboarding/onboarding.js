(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.slide')];
  const carousel = document.querySelector('.carousel');
  const footer = document.querySelector('.app-footer');
  const next = document.querySelector('.app-footer .primary');
  const dots = [...document.querySelectorAll('[data-go]')];
  const header = document.querySelector('.app-header');
  const complete = document.querySelector('.complete');
  const announcement = document.querySelector('#announcement');
  const labels = ['Continue', 'Continue', 'Get started'];
  let current = 0;
  let finished = false;
  let pointerStart = null;

  function showSlide(index, announce = true) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    const focusWillHide = slides.some((slide, i) => i !== current && slide.contains(document.activeElement));
    finished = false;
    complete.hidden = true;
    carousel.hidden = false;
    footer.hidden = false;
    header.hidden = false;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      slide.inert = i !== current;
      slide.classList.toggle('is-active', i === current);
    });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    next.querySelector('.primary-label').textContent = labels[current];
    if (focusWillHide) next.focus({ preventScroll: true });
    if (announce) announcement.textContent = slides[current].getAttribute('aria-label');
  }

  function finish(reason) {
    finished = true;
    carousel.hidden = true;
    footer.hidden = true;
    header.hidden = true;
    complete.hidden = false;
    complete.focus({ preventScroll: true });
    window.dispatchEvent(new CustomEvent('turbo:onboarding-complete', { detail: { reason } }));
    // The embedding page may observe this event after checking source and origin.
    if (window.parent !== window && location.origin !== 'null') {
      window.parent.postMessage({ type: 'turbo:onboarding-complete', reason }, location.origin);
    }
  }

  next.addEventListener('click', () => current < slides.length - 1 ? showSlide(current + 1) : finish('completed'));
  dots.forEach(dot => dot.addEventListener('click', () => showSlide(Number(dot.dataset.go))));
  document.querySelector('.replay').addEventListener('click', () => { showSlide(0); next.focus(); });
  document.addEventListener('keydown', event => {
    if (finished || event.altKey || event.ctrlKey || event.metaKey || event.target.matches('input, textarea, select')) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(current + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(current - 1); }
  });
  carousel.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || event.target.closest('input, button, a')) return;
    pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
  });
  window.addEventListener('pointerup', event => {
    if (!pointerStart || pointerStart.id !== event.pointerId) return;
    const dx = event.clientX - pointerStart.x;
    const dy = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) showSlide(current + (dx < 0 ? 1 : -1));
  });
  window.addEventListener('pointercancel', () => { pointerStart = null; });
  showSlide(0, false);
})();
