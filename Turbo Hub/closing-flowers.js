/* Extend the supplied artwork at its authored repeat spacing, under one camera. */
function createClosingFlowerField(source) {
  const data = JSON.parse(JSON.stringify(source));
  const first = data.layers.filter(layer => layer.ind >= 3 && layer.ind < 77);
  const byIndex = new Map(data.layers.map(layer => [layer.ind, layer]));
  const pitch = byIndex.get(77).ks.p.k[0] - byIndex.get(3).ks.p.k[0];
  const cycle = data.op - data.ip;
  // Start incoming stems before their period reaches the viewport, avoiding an empty handoff.
  const growthLead = 620;
  const growthDuration = 1.65;
  // A loop must advance exactly one authored period, with matching growth phases.
  const camera = byIndex.get(2);
  const position = camera.ks.p.k;
  const firstPosition = position[0], lastPosition = position[position.length - 1];
  const fraction = (data.ip - firstPosition.t) / (lastPosition.t - firstPosition.t);
  const start = firstPosition.s.map((value, axis) => value + (lastPosition.s[axis] - value) * fraction);
  const end = start.slice();
  end[0] -= pitch * camera.ks.s.k[0] / 100;
  camera.ks.p.k = [
    {t: data.ip, s: start, e: end, o: {x: 1 / 3, y: 1 / 3}, i: {x: 2 / 3, y: 2 / 3}},
    {t: data.op, s: end},
  ];
  function shiftGrowth(value, frames) {
    if (!value || typeof value !== 'object') return;
    if (value.a === 1 && Array.isArray(value.k)) {
      value.k.forEach(key => {
        if (key && typeof key.t === 'number') key.t = key.t * growthDuration + frames;
      });
    }
    Object.values(value).forEach(child => {
      if (child && typeof child === 'object') shiftGrowth(child, frames);
    });
  }
  // The source already contains two repeats. Reuse one period, not the whole scene.
  data.layers = data.layers.filter(layer => layer.ind < 3 || layer.ind >= 12345679);
  let nextIndex = 12345680;
  for (const repeat of [-1, 0, 1, 2]) {
    const wrapperIndex = nextIndex++;
    const layers = JSON.parse(JSON.stringify(first));
    // Preserve the authored stem/head choreography; bring incoming growth into view sooner.
    layers.forEach(layer => shiftGrowth(layer, repeat * cycle - growthLead));
    const indices = new Map(layers.map(layer => [layer.ind, nextIndex++]));
    data.layers.push({ind: wrapperIndex, ty: 3, parent: 2, ip: 0, op: 1000, st: 0,
      ks: {p: {a: 0, k: [pitch * repeat, 0, 0]}, a: {a: 0, k: [0, 0, 0]},
        s: {a: 0, k: [100, 100, 100]}, r: {a: 0, k: 0}, o: {a: 0, k: 100}}});
    layers.forEach(layer => {
      layer.ind = indices.get(layer.ind);
      layer.parent = layer.parent === 2 ? wrapperIndex : indices.get(layer.parent);
    });
    data.layers.push(...layers);
  }
  data.w = 2200;
  return data;
}

(() => {
  const container = document.querySelector('#closing-illustration');
  if (!container) return;
  const field = document.createElement('div');
  field.className = 'case-ending__flowers-player';
  container.append(field);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = [];
  let visible = false, ready = false;
  function stillFrame(index, animation) {
    return Math.min(180, animation.totalFrames - 1);
  }
  function sync() {
    if (!ready) return;
    animations.forEach((animation, index) => {
      if (reduced.matches) animation.goToAndStop(stillFrame(index, animation), true);
      else if (visible && !document.hidden) animation.play();
      else animation.pause();
    });
  }
  const player = document.createElement('script');
  player.src = 'assets/lottie/lottie-light.min.js';
  player.onload = () => {
    const data = document.createElement('script');
    data.src = 'assets/closing/looped-flowers.js';
    data.onload = () => {
      let loaded = 0;
      for (let index = 0; index < 1; index++) {
        const panel = document.createElement('div');
        panel.className = 'case-ending__flowers-panel';
        field.append(panel);
        const animation = window.lottie.loadAnimation({
          container: panel,
          renderer: 'svg', loop: true, autoplay: false,
          animationData: createClosingFlowerField(window.TurboClosingFlowers),
          rendererSettings: { preserveAspectRatio: 'none', viewBoxSize: '0 400 1374.81 500', progressiveLoad: false },
        });
        animations.push(animation);
        animation.setSpeed(3);
        let reported = false;
        const loadedPanel = () => {
          if (reported) return;
          reported = true;
          loaded++;
          if (loaded !== 1) return;
          animations.forEach((item, i) => item.goToAndStop(reduced.matches ? stillFrame(i, item) : 90, true));
          ready = true;
          container.dataset.animationReady = 'true';
          const bounds = container.getBoundingClientRect();
          visible = bounds.bottom > 0 && bounds.top < innerHeight;
          sync();
        };
        animation.addEventListener('DOMLoaded', loadedPanel);
        if (animation.isLoaded) loadedPanel();
      }
    };
    document.head.append(data);
  };
  document.head.append(player);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    observer.observe(container);
  } else visible = true;
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  addEventListener('pagehide', () => animations.forEach(animation => animation.pause()));
  addEventListener('pageshow', sync);
})();
