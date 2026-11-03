/* The TLDR showcase: the real Balance Explorer prototype (prototype/) on a laptop, face on. A slow camera
   moves in on a few details (the account tree, the settings, the All views cards) and pulls back out.
   Nothing is clicked; it shows the product, not the features (the decisions below do that). It plays only
   while on screen. With reduced motion it shows the laptop, still. */

(function () {
  const VW = 1440, VH = 900;                  // the prototype's viewport in CSS px
  const BEZEL = 22;                           // the lid's black border around the screen
  const SCENE_W = 1760, SCENE_H = 1110;       // the scene the camera looks at
  const LID_X = (SCENE_W - (VW + BEZEL * 2)) / 2, LID_Y = 56;
  const SCREEN_X = LID_X + BEZEL, SCREEN_Y = LID_Y + BEZEL;
  const ease = (k) => { k = Math.min(1, Math.max(0, k)); return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
  const drift = (k) => 0.5 - Math.cos(Math.PI * Math.min(1, Math.max(0, k))) / 2;

  // Where the camera goes: s, x and y frame the scene, in prototype px when on the screen. Each stop eases
  // in, then drifts a touch closer while it holds. The screen changes page while the camera is pulled back.
  const WIDE = { s: 1, x: SCENE_W / 2, y: SCENE_H / 2 };
  const onScreen = (s, x, y) => ({ s, x: SCREEN_X + x, y: SCREEN_Y + y });
  const STOPS = [
    { to: WIDE, move: 0, hold: 0.8, page: "explorer" },
    { to: onScreen(2.3, 400, 420), move: 1.8, hold: 2.0 },
    { to: onScreen(2.4, 1270, 330), move: 2.0, hold: 2.0 },
    { to: WIDE, move: 1.8, hold: 1.2, page: "views" },
    { to: onScreen(2.0, 760, 390), move: 1.8, hold: 2.2 },
    { to: WIDE, move: 1.8, hold: 0.8, page: "explorer" },
  ];
  const segments = [], pages = [];
  let at = 0, from = WIDE;
  for (const stop of STOPS) {
    if (stop.move) segments.push({ t0: at, dur: stop.move, a: from, b: stop.to, curve: ease });
    at += stop.move;
    if (stop.page) pages.push({ t: at + (at ? 0.2 : 0), page: stop.page });
    const closer = stop.to.x === SCENE_W / 2 ? stop.to : { ...stop.to, s: stop.to.s * 1.04 };
    segments.push({ t0: at, dur: stop.hold, a: stop.to, b: closer, curve: drift });
    at += stop.hold;
    from = segments[segments.length - 1].b;
  }
  const LOOP = at;

  const pageAt = (t) => { t %= LOOP; let page = pages[0].page; for (const p of pages) if (t >= p.t) page = p.page; return page; };

  function cameraAt(t) {
    t %= LOOP;
    const seg = segments.find((s) => t < s.t0 + s.dur) || segments[segments.length - 1];
    const k = seg.curve((t - seg.t0) / seg.dur), a = seg.a, b = seg.b;
    return { s: Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * k), x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
  }

  window.createProductDemo = function createProductDemo(shot) {
    const stage = createElement("figure", "mockup-stage mockup-stage--device");
    stage.setAttribute("aria-label", shot.caption);
    const view = createElement("div", "device-showcase");
    const scene = createElement("div", "device-showcase__scene");
    const lid = createElement("div", "laptop__lid");
    const screen = createElement("div", "device__screen");
    const poster = document.createElement("img");
    poster.className = "device__poster";
    poster.src = shot.src;
    poster.alt = "";
    poster.decoding = "async";
    screen.append(poster);
    lid.append(createElement("span", "laptop__camera"), screen);
    const base = createElement("div", "laptop__base");
    base.append(createElement("span", "laptop__notch"));
    scene.append(createElement("div", "laptop__shadow"), lid, base);
    view.append(scene);
    stage.append(view);

    let fit = 1, clock = 0;
    const place = (cam) => {
      const cw = SCENE_W / cam.s, ch = SCENE_H / cam.s;
      const x0 = Math.min(Math.max(cam.x - cw / 2, 0), SCENE_W - cw), y0 = Math.min(Math.max(cam.y - ch / 2, 0), SCENE_H - ch);
      scene.style.transform = `scale(${fit * cam.s}) translate(${-x0}px, ${-y0}px)`;
    };
    const still = prefersStill();
    new ResizeObserver(() => { fit = view.clientWidth / SCENE_W; place(still ? WIDE : cameraAt(clock)); }).observe(view);

    if (still) return stage;

    // Two live copies of the prototype, one on each page, behind the poster until the Explorer has drawn.
    const makeFrame = (page) => {
      const frame = document.createElement("iframe");
      frame.className = "device__app";
      frame.title = "Balance Explorer prototype";
      frame.width = VW;
      frame.height = VH;
      frame.tabIndex = -1;
      frame.setAttribute("aria-hidden", "true");
      frame.inert = true;
      frame.dataset.page = page;
      screen.prepend(frame);
      return frame;
    };
    const frames = { explorer: makeFrame("explorer"), views: makeFrame("views") };
    screen.dataset.page = "explorer";

    // Wait for the prototype's own load, not the empty page an iframe starts with.
    function open(frame, url, whenReady) {
      const onLoad = () => {
        if (frame.contentWindow.location.href === "about:blank") return;
        frame.removeEventListener("load", onLoad);
        const doc = frame.contentDocument, style = doc.createElement("style");
        style.textContent = "html{scrollbar-width:none}::-webkit-scrollbar{display:none}";
        doc.head.append(style);
        // The Explorer opens on a short loading skeleton (about 1.4 s); start once the table itself shows.
        const began = performance.now();
        const check = () => {
          const loaded = performance.now() - began > 1700 && doc.querySelector("tr[data-account=income]")?.offsetParent && !doc.querySelector(".table-skeleton")?.offsetParent;
          if (loaded || performance.now() - began > 6000) setTimeout(whenReady, 300);
          else setTimeout(check, 100);
        };
        if (whenReady) check();
      };
      frame.addEventListener("load", onLoad);
      frame.src = url;
    }

    let last = null, visible = false, started = false;
    function tick(now) {
      if (last !== null && visible && stage.dataset.state === "ready") clock += Math.min(0.1, (now - last) / 1000);
      last = now;
      if (visible) {
        place(cameraAt(clock));
        const page = pageAt(clock);
        if (screen.dataset.page !== page) screen.dataset.page = page;
      }
      requestAnimationFrame(tick);
    }
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !started) {
        started = true;
        const base = shot.demo.split("#")[0];
        open(frames.explorer, base + "#explorer", () => {
          stage.dataset.state = "ready";
          open(frames.views, base + "#views");
        });
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.2 }).observe(stage);
    return stage;
  };
})();
