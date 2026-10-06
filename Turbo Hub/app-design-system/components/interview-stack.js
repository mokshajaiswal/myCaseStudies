(() => {
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  window.TurboInterviewStack = (voices, {autoplay = true} = {}) => {
    const stack = element('div', 'user-voice-stack');
    stack.setAttribute('role', 'group');
    stack.setAttribute('aria-label', 'User interview quotes');
    if (!voices.length) return stack;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const positions = [[0,0,0,1,1],[-8,12,-2.2,.985,1],[10,21,2.6,.968,.96],[-4,29,-3.4,.95,.9]];
    let order = voices.map((_, index) => index);
    let turning = false, visible = false, hovered = false, timer;
    const status = element('span', 'user-voice-status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');
    const cards = voices.map((voice, index) => {
      const card = element('button', 'user-voice-card');
      card.type = 'button';
      card.style.setProperty('--voice-accent', voice.accent);
      card.style.setProperty('--voice-background', voice.background);
      const footer = element('span', 'user-voice-footer');
      footer.append(element('span', 'user-voice-source', voice.type));
      card.append(element('span', 'user-voice-quote', `“${voice.quote}”`), footer, element('span', 'user-voice-accent'));
      const fold = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      fold.setAttribute('class', 'user-voice-fold');
      fold.setAttribute('viewBox', '0 0 32 32');
      fold.setAttribute('aria-hidden', 'true');
      fold.setAttribute('focusable', 'false');
      fold.innerHTML = '<path class="user-voice-fold__shadow" d="M0 0L32 32Q15 35 5 29Q-2 22 0 0Z"/>'
        + '<path class="user-voice-fold__underside" d="M0 0L32 32Q16 31 7 25Q2 20 0 0Z"/>'
        + '<path class="user-voice-fold__curl" d="M0 0Q5 18 9 22Q18 29 32 32"/>'
;
      card.append(fold);
      const outline = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      outline.setAttribute('class', 'user-voice-outline');
      outline.setAttribute('aria-hidden', 'true');
      outline.setAttribute('focusable', 'false');
      const border = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      outline.append(border);
      card.append(outline);
      card.updateOutline = () => {
        const w = card.offsetWidth, h = card.offsetHeight;
        if (!w || !h) return;
        const r = parseFloat(getComputedStyle(card).borderTopLeftRadius) || 20;
        const x = w - .5, y = h - .5;
        const top = `H${x-34}Q${x-32} .5 ${x-30.6} 1.9L${x-1.4} 31.1Q${x} 32.5 ${x} 34.5`;
        outline.setAttribute('viewBox', `0 0 ${w} ${h}`);
        border.setAttribute('d', `M${r} .5${top}V${y-r}Q${x} ${y} ${x-r} ${y}H${r}Q.5 ${y} .5 ${y-r}V${r}Q.5 .5 ${r} .5Z`);
      };
      if (typeof ResizeObserver === 'function') new ResizeObserver(card.updateOutline).observe(card);
      else requestAnimationFrame(card.updateOutline);
      card.setAttribute('aria-label', `${voice.type}: ${voice.quote}${voices.length > 1 ? '. Flip to next interview' : ''}`);
      card.addEventListener('click', () => advance(true));
      return card;
    });
    const update = () => order.forEach((index, position) => {
      const card = cards[index];
      const [x,y,rotation,scale,opacity] = positions[Math.min(position,3)];
      card.hidden = position > 3;
      card.disabled = position !== 0;
      card.setAttribute('aria-hidden', String(position !== 0));
      card.updateOutline();
      card.style.cssText += `;--voice-x:${x}px;--voice-y:${y}px;--voice-rotation:${rotation}deg;--voice-scale:${scale};--voice-opacity:${opacity};z-index:${20-position}`;
    });
    const stop = () => { clearTimeout(timer); timer = null; };
    const schedule = () => {
      stop();
      if (!autoplay || motion.matches || !visible || hovered || document.hidden || stack.matches(':focus-within') || turning || voices.length < 2) return;
      timer = setTimeout(() => advance(false), 6000);
    };
    const advance = async (manual) => {
      if (turning || voices.length < 2) return;
      turning = true;
      stop();
      stack.classList.add('is-turning');
      const nextOrder = [...order.slice(1), order[0]];
      const frontIndex = order[0];
      const animations = [];
      try {
        if (!motion.matches && typeof cards[0].animate === 'function') {
          cards.forEach((card,index) => {
            const position = nextOrder.indexOf(index);
            const [x,y,rotation,scale,opacity] = positions[Math.min(position,3)];
            const target = `translate(${x}px,${y}px) rotate(${rotation}deg) scale(${scale})`;
            const current = getComputedStyle(card);
            const frames = index === frontIndex ? [
              {transform:current.transform,opacity:current.opacity,zIndex:20,offset:0},
              {transform:'translate(58px,-14px) rotate(8deg) scale(1)',opacity:1,zIndex:20,offset:.45},
              {transform:'translate(58px,-14px) rotate(8deg) scale(1)',opacity:1,zIndex:20-position,offset:.46},
              {transform:target,opacity,zIndex:20-position,offset:1}
            ] : [
              {transform:current.transform,opacity:current.opacity},
              {transform:target,opacity}
            ];
            animations.push(card.animate(frames, {duration:440,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'}));
          });
          await Promise.all(animations.map(animation => animation.finished));
        }
        // Commit the final layout before releasing the animation's hold.
        order = nextOrder;
        update();
        animations.forEach(animation => animation.cancel());
        if (manual) {
          cards[order[0]].focus({preventScroll:true});
          status.textContent = `${voices[order[0]].type}, interview ${order[0]+1} of ${voices.length}`;
        }
      } finally {
        animations.forEach(animation => animation.cancel());
        turning = false;
        stack.classList.remove('is-turning');
        schedule();
      }
    };

    stack.append(...cards.slice().reverse(), status);
    update();
    stack.addEventListener('pointerenter', () => {hovered=true;stack.classList.add('is-hovered');stop();});
    stack.addEventListener('pointerleave', () => {hovered=false;stack.classList.remove('is-hovered');schedule();});
    stack.addEventListener('focusin', stop);
    stack.addEventListener('focusout', () => queueMicrotask(schedule));
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', schedule);
    if (typeof IntersectionObserver === 'function') {
      new IntersectionObserver(entries => {visible=entries[0].isIntersecting;schedule();}, {threshold:.3}).observe(stack);
    } else {visible=true;schedule();}
    return stack;
  };
})();
