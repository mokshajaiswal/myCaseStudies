/**
 * Typography Flowers: the conductor. Typed text is set in Pinyon Script and
 * split into words; each word gets one vine wound round its silhouette
 * (profile.js, garden.js) that follows the typing letter by letter, with
 * leaves and flowers on the rhythm of its turns. Deleting a letter cuts the
 * vine back and lets its flowers fall. The pointer is a breeze, a click is a
 * gust, Tab changes the style.
 *
 * Layers, back to front: vine behind the ink · the ink · vine over it ·
 * flowers · falling petals and drifting light. The world stays still while a
 * camera glides to keep the text centred.
 */
(function () {
  const TF = window.TF;
  const FACE = "Pinyon Script"; // any connected script from Google Fonts; update the link in index.html too
  const FAMILY = `"${FACE}", "Snell Roundhand", cursive`;
  const DEMO = "in full bloom";
  const REVEAL = 0.42; // s for a letter to ink in
  const STORE = "typography-flowers:style";

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const smooth = (t) => t * t * (3 - 2 * t);
  const clock = () => performance.now() / 1000;
  const blank = (ch) => /\s/.test(ch);

  const stage = document.getElementById("stage"), ctx = stage.getContext("2d");
  const input = document.getElementById("input");
  const layer = () => {
    const el = document.createElement("canvas");
    return { el, ctx: el.getContext("2d") };
  };
  const back = layer(), front = layer(), ink = layer();
  const profile = new TF.Profile(2);
  const garden = new TF.Garden();
  const air = new TF.Particles();
  const env = { s: 1, dpr: 1 };
  const measurer = document.createElement("canvas").getContext("2d");
  const widths = new Map();

  let W = 0, H = 0, dpr = 1, F = 120, LH = 140, left = 0, top = 0, wrapW = 0;
  let styleKey = "garden";
  let glyphs = [], pos = new Map(), lines = [], value = "";
  const reveal = new Map();
  let nextId = 1;
  const cam = { x: 0, y: 0, tx: 0, ty: 0 };
  let inkDirty = true, repaint = true;
  const ptr = { sx: -1e5, sy: -1e5, vx: 0, vy: 0, t: 0, active: false };
  let demo = null, demoOwned = false, lastType = 0, last = clock();
  let styleButtons = [];

  const S = () => TF.STYLES[styleKey];
  const font = () => `400 ${F}px ${FAMILY}`;
  const width = (str) => {
    let w = widths.get(str);
    if (w === undefined) widths.set(str, (w = measurer.measureText(str).width));
    return w;
  };

  /* ---------- layout ---------- */

  /** Greedy word wrap, left aligned in world space; newlines ride at the end of their line. */
  function layout(list) {
    const rows = [], text = (gs) => gs.map((g) => (g.ch === "\n" ? "" : g.ch)).join("");
    let row = [], word = [];
    const flush = () => {
      if (!word.length) return;
      if (row.length && width(text(row.concat(word)).trimEnd()) > wrapW) {
        rows.push(row);
        row = [];
      }
      row = row.concat(word);
      word = [];
    };
    for (const g of list) {
      if (g.ch === "\n") {
        flush();
        row.push(g);
        rows.push(row);
        row = [];
        continue;
      }
      word.push(g);
      if (g.ch === " ") flush();
    }
    flush();
    rows.push(row);

    const P = new Map(), out = [];
    rows.forEach((r, i) => {
      const y = top + F * 0.9 + i * LH;
      let acc = "";
      for (const g of r) {
        const a = width(acc);
        if (g.ch !== "\n") acc += g.ch;
        P.set(g.id, { x: left + a, w: width(acc) - a, y, line: i, ch: g.ch });
      }
      out.push({ text: acc, x: left, y, w: width(acc.trimEnd()), ids: r.map((g) => g.id) });
    });
    return { pos: P, lines: out };
  }

  const fits = (L) => L.lines.length * LH <= H * 0.8 && L.lines.every((l) => l.w <= W - 24);

  /* ---------- typing ---------- */

  function onInput() {
    const chars = Array.from(input.value), old = glyphs;
    let p = 0;
    while (p < old.length && p < chars.length && old[p].ch === chars[p]) p++;
    let s = 0;
    while (s < old.length - p && s < chars.length - p && old[old.length - 1 - s].ch === chars[chars.length - 1 - s]) s++;
    const added = chars.slice(p, chars.length - s).map((ch) => ({ id: nextId++, ch }));
    const next = old.slice(0, p).concat(added, old.slice(old.length - s));
    const L = layout(next);
    if (!fits(L) && next.length > old.length) {
      // Out of room: refuse the keystroke.
      input.value = value;
      const at = Array.from(value).slice(0, p).join("").length;
      input.setSelectionRange(at, at);
      return;
    }

    const now = clock();
    const gone = new Set(old.slice(p, old.length - s).map((g) => g.id)), moved = new Set();
    for (const g of next) {
      const a = pos.get(g.id), b = L.pos.get(g.id);
      if (a && (Math.abs(a.x - b.x) > 0.5 || Math.abs(a.y - b.y) > 0.5)) moved.add(g.id);
    }
    glyphs = next;
    pos = L.pos;
    lines = L.lines;
    value = input.value;
    added.forEach((g, i) => reveal.set(g.id, now + i * 0.04));
    garden.sync(words(), now, gone);
    inkDirty = true;
  }

  /** The words as laid out: runs of letters per line, closed when whitespace follows. */
  function words() {
    const out = [];
    for (const l of lines) {
      const prof = profile.line(l.text, l.x, l.y);
      let cur = null;
      for (const id of l.ids) {
        const p = pos.get(id);
        if (blank(p.ch)) {
          if (cur) Object.assign(cur, { closed: true, closer: id });
          cur = null;
          continue;
        }
        if (!cur) out.push((cur = { key: id, y: l.y, glyphs: [], closed: false, closer: null, profile: prof }));
        cur.glyphs.push({ id, x: p.x, w: p.w });
      }
    }
    return out;
  }

  function shed(flowers, leaves) {
    const now = clock(), st = S();
    for (const f of flowers) air.shedFlower(f, st, env, now);
    for (const l of leaves) if (l.u <= st.leafKeep) air.leaf(l, st, env);
  }

  function regrow() {
    if (!glyphs.length) return;
    const now = clock();
    garden.dropAll(now, true);
    garden.sync(words(), now, new Set(), 0.8, 0.22);
  }

  function clearText() {
    stopDemo();
    demoOwned = false;
    input.value = "";
    onInput();
  }

  function startDemo() {
    demoOwned = true;
    const chars = Array.from(DEMO);
    let i = 0;
    const tick = () => {
      input.value += chars[i++];
      input.setSelectionRange(input.value.length, input.value.length);
      lastType = clock();
      onInput();
      demo = i < chars.length ? setTimeout(tick, 120 + Math.random() * 170) : null;
    };
    demo = setTimeout(tick, 650);
  }

  function stopDemo() {
    clearTimeout(demo);
    demo = null;
  }

  /* ---------- drawing ---------- */

  /** The ink layer: each new letter wipes in from the left on a soft edge. */
  function drawInk(now) {
    const c = ink.ctx, st = S();
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, ink.el.width, ink.el.height);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.font = font();
    let busy = false;
    const R = F * 0.22;
    for (const l of lines) {
      if (!l.text) continue;
      let edge = Infinity;
      for (const id of l.ids) {
        const t0 = reveal.get(id);
        if (t0 === undefined) continue;
        const k = (now - t0) / REVEAL;
        if (k >= 1) {
          reveal.delete(id);
          continue;
        }
        busy = true;
        const p = pos.get(id);
        edge = Math.min(edge, p.x + R * 0.5 + (p.w + R * 0.5) * smooth(clamp(k, 0, 1)));
      }
      c.save();
      if (st.inkStops) {
        const g = c.createLinearGradient(0, l.y - F * 0.8, 0, l.y + F * 0.3);
        for (const [o, col] of st.inkStops) g.addColorStop(o, col);
        c.fillStyle = g;
      } else c.fillStyle = st.ink;
      if (st.textGlow) {
        c.shadowColor = st.textGlow;
        c.shadowBlur = 18 * env.s * dpr;
      }
      c.fillText(l.text, l.x, l.y);
      c.restore();
      if (edge < Infinity) {
        c.save();
        c.globalCompositeOperation = "destination-out";
        const g = c.createLinearGradient(edge - R, 0, edge, 0);
        g.addColorStop(0, "rgba(0,0,0,0)");
        g.addColorStop(1, "rgba(0,0,0,1)");
        c.fillStyle = g;
        c.fillRect(edge - R, l.y - F * 1.1, R, F * 1.7);
        c.fillStyle = "#000";
        c.fillRect(edge, l.y - F * 1.1, W * 2, F * 1.7);
        c.restore();
      }
    }
    inkDirty = busy;
  }

  function caretAt() {
    const k = Array.from(input.value.slice(0, input.selectionStart)).length;
    const first = lines[0] ? lines[0].y : top + F * 0.9;
    if (k === 0) return { x: left, y: first };
    const g = glyphs[k - 1], p = g && pos.get(g.id);
    if (!p) return { x: left, y: first };
    if (g.ch === "\n") return { x: left, y: p.y + LH };
    return { x: p.x + p.w, y: p.y };
  }

  function drawCaret(c, now, st) {
    if (document.activeElement !== input || input.selectionStart !== input.selectionEnd) return;
    const since = now - lastType, a = since < 0.6 ? 1 : 0.5 + 0.5 * Math.cos((since - 0.6) * 4.5);
    const { x, y } = caretAt(), sl = 0.24, x0 = x + F * 0.05;
    c.beginPath();
    c.moveTo(x0 + F * 0.62 * sl, y - F * 0.62);
    c.lineTo(x0 - F * 0.12 * sl, y + F * 0.12);
    c.strokeStyle = st.ink;
    c.globalAlpha = 0.5 * a;
    c.lineWidth = 1.4 * env.s;
    c.lineCap = "round";
    c.stroke();
    c.globalAlpha = 1;
  }

  function paintBackground(c, st) {
    c.fillStyle = st.bg;
    c.fillRect(0, 0, c.canvas.width, c.canvas.height);
    const w = c.canvas.width, h = c.canvas.height;
    const g = c.createRadialGradient(w / 2, h * 0.42, 0, w / 2, h * 0.42, Math.max(w, h) * 0.75);
    g.addColorStop(0.35, st.bg);
    g.addColorStop(1, st.bgEdge);
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  }

  function render(c, now, opts) {
    const st = S();
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    if (opts.background) paintBackground(c, st);
    const ox = Math.round(cam.x * dpr), oy = Math.round(cam.y * dpr);
    const pixels = () => c.setTransform(1, 0, 0, 1, ox, oy);
    const world = () => c.setTransform(dpr, 0, 0, dpr, ox, oy);
    pixels();
    c.drawImage(back.el, 0, 0);
    world();
    garden.drawDying(c, st, env, now);
    garden.drawTips(c, st, env, 0);
    garden.drawGrowingLeaves(c, st, env, now, 0);
    pixels();
    c.drawImage(ink.el, 0, 0);
    c.drawImage(front.el, 0, 0);
    world();
    garden.drawTips(c, st, env, 1);
    garden.drawGrowingLeaves(c, st, env, now, 1);
    garden.drawFlowers(c, st, env, now);
    if (opts.caret) drawCaret(c, now, st);
    air.draw(c, st, env, now);
  }

  /** Where the camera wants to be, and the box the ambient particles keep to. */
  function aim() {
    const bw = lines.reduce((m, l) => Math.max(m, l.w), 0);
    const y0 = (lines[0] ? lines[0].y : top + F * 0.9) - F * 0.62;
    const y1 = (lines.length ? lines[lines.length - 1].y : top + F * 0.9) + F * 0.22;
    cam.tx = W / 2 - (left + bw / 2);
    cam.ty = H / 2 - (y0 + y1) / 2 - H * 0.025;
    return { x0: left - F * 0.5, x1: left + bw + F * 0.5, y0: y0 - F * 0.45, y1: y1 + F * 0.45 };
  }

  function frame(ms) {
    const now = ms / 1000, dt = clamp(now - last, 0, 0.05);
    last = now;
    const st = S();
    garden.update(dt, now);
    if (repaint || garden.dirty) {
      garden.repaint(back.ctx, front.ctx, st, env, W, H);
      repaint = false;
    }
    garden.paintNew(back.ctx, front.ctx, st, env);
    garden.bakeLeaves(back.ctx, front.ctx, st, env, now);

    const box = aim(), k = 1 - Math.exp(-dt * 4.5);
    cam.x += (cam.tx - cam.x) * k;
    cam.y += (cam.ty - cam.y) * k;
    const wp = { x: ptr.sx - cam.x, y: ptr.sy - cam.y, vx: ptr.vx, vy: ptr.vy, active: ptr.active };
    garden.sway(dt, now, wp);
    air.update(dt, wp, env);
    air.ambient(dt, now, st, garden, box, wp, env);

    if (inkDirty || reveal.size) drawInk(now);
    render(ctx, now, { caret: true });
    const decay = Math.exp(-dt * 6);
    ptr.vx *= decay;
    ptr.vy *= decay;
    requestAnimationFrame(frame);
  }

  /* ---------- size ---------- */

  function sizeCanvases() {
    for (const el of [stage, back.el, front.el, ink.el]) {
      el.width = Math.round(W * dpr);
      el.height = Math.round(H * dpr);
    }
    stage.style.width = W + "px";
    stage.style.height = H + "px";
    for (const l of [back, front]) l.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    env.dpr = dpr;
    garden.setScale(F, W, H);
    inkDirty = repaint = true;
  }

  function resize() {
    const widthChanged = innerWidth !== W;
    W = innerWidth;
    H = innerHeight;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    if (!widthChanged && glyphs.length) {
      // Height only (a mobile keyboard, a toolbar): keep the garden, just repaint it.
      sizeCanvases();
      return;
    }
    F = clamp(Math.min(W * 0.12, H * 0.2), 56, 200);
    LH = F * 1.16;
    left = Math.max(20, W * 0.08);
    top = F * 0.7;
    wrapW = W - left * 2;
    env.s = F / 120;
    measurer.font = font();
    widths.clear();
    profile.reset(F, font(), width);
    sizeCanvases();
    garden.clear();
    air.clear();
    reveal.clear();
    const L = layout(glyphs);
    pos = L.pos;
    lines = L.lines;
    garden.sync(words(), clock(), new Set(), 0.15, 0.12);
    aim();
    cam.x = cam.tx;
    cam.y = cam.ty;
  }

  /* ---------- style ---------- */

  function applyStyle(key) {
    if (!TF.STYLES[key]) key = "garden";
    styleKey = key;
    const st = S(), root = document.documentElement.style;
    root.setProperty("--bg", st.bg);
    root.setProperty("--bg-edge", st.bgEdge);
    for (const [k, v] of Object.entries(st.ui)) root.setProperty(`--ui-${k}`, v);
    document.body.classList.toggle("dark", st.dark);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", st.bg);
    for (const b of styleButtons) b.setAttribute("aria-checked", String(b.dataset.style === key));
    repaint = inkDirty = true;
    try {
      localStorage.setItem(STORE, key);
    } catch (e) {}
  }

  function cycle(dir) {
    const order = TF.STYLE_ORDER, i = order.indexOf(styleKey);
    applyStyle(order[(i + dir + order.length) % order.length]);
  }

  function save() {
    const c = document.createElement("canvas");
    c.width = stage.width;
    c.height = stage.height;
    render(c.getContext("2d"), clock(), { background: true });
    c.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `typography-flowers-${styleKey}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }, "image/png");
  }

  /* ---------- wiring ---------- */

  function buildControls() {
    const wrap = document.querySelector(".styles");
    for (const key of TF.STYLE_ORDER) {
      const st = TF.STYLES[key], b = document.createElement("button");
      b.type = "button";
      b.className = "style";
      b.dataset.style = key;
      b.setAttribute("role", "radio");
      b.title = st.label;
      b.innerHTML = `<span class="dot" style="--c:${st.swatch}"></span><span class="label">${st.label}</span>`;
      b.addEventListener("click", () => applyStyle(key));
      wrap.appendChild(b);
    }
    styleButtons = [...wrap.children];
    const actions = { regrow, clear: clearText, save };
    for (const b of document.querySelectorAll("[data-action]")) b.addEventListener("click", () => actions[b.dataset.action]());
    // Keep the hidden field focused while using the controls.
    for (const b of document.querySelectorAll(".controls button")) b.addEventListener("mousedown", (e) => e.preventDefault());
  }

  function wire() {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        cycle(e.shiftKey ? -1 : 1);
        return;
      }
      if (demoOwned && !e.metaKey && !e.ctrlKey && (e.key.length === 1 || ["Backspace", "Delete", "Enter"].includes(e.key))) {
        // The first real keystroke clears the demo phrase and starts the visitor's own.
        stopDemo();
        demoOwned = false;
        input.value = "";
        if (e.key === "Backspace" || e.key === "Delete") {
          e.preventDefault();
          onInput();
        }
      }
      lastType = clock();
    });
    input.addEventListener("input", () => {
      if (demo && demoOwned) {
        stopDemo();
        demoOwned = false;
      }
      lastType = clock();
      onInput();
    });

    addEventListener("pointermove", (e) => {
      const t = e.timeStamp / 1000, dt = Math.max(0.008, t - ptr.t);
      if (ptr.active) {
        ptr.vx += (clamp((e.clientX - ptr.sx) / dt, -3000, 3000) - ptr.vx) * 0.5;
        ptr.vy += (clamp((e.clientY - ptr.sy) / dt, -3000, 3000) - ptr.vy) * 0.5;
      }
      ptr.sx = e.clientX;
      ptr.sy = e.clientY;
      ptr.t = t;
      ptr.active = true;
    });
    addEventListener("pointerout", (e) => {
      if (!e.relatedTarget) ptr.active = false;
    });
    stage.addEventListener("pointerdown", (e) => {
      input.focus({ preventScroll: true });
      const now = clock(), st = S();
      for (const h of garden.gust(e.clientX - cam.x, e.clientY - cam.y, now)) {
        air.shedFlower(h.f, st, env, now, { x: h.dx * 140 * h.k, y: h.dy * 140 * h.k }, 2 + Math.round(h.k * 2));
      }
    });

    let timer = 0;
    addEventListener("resize", () => {
      clearTimeout(timer);
      timer = setTimeout(resize, 160);
    });
  }

  async function boot() {
    garden.onShed = shed;
    buildControls();
    let saved = null;
    try {
      saved = localStorage.getItem(STORE);
    } catch (e) {}
    applyStyle(saved || "garden");
    wire();
    try {
      await Promise.race([document.fonts.load(`400 64px "${FACE}"`), new Promise((r) => setTimeout(r, 2500))]);
    } catch (e) {}
    resize();
    input.focus({ preventScroll: true });
    startDemo();
    requestAnimationFrame((ms) => {
      last = ms / 1000;
      requestAnimationFrame(frame);
    });
  }

  boot();
})();
