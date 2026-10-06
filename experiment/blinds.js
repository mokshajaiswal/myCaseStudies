/**
 * Blinds: a window on a sill, its venetian blind hung from a headrail, with
 * two ladder cords and a tilt wand. The pointer is put on the pane's plane,
 * which never moves, and its height opens the slats around it: each slat
 * turns towards flat on its own spring, the farther the less. At rest the
 * blind is drawn, with a band of slats left half open low down; the most open
 * one is bright. The slider is the reach, in slats.
 *
 * The pattern: a continuous field along one axis, as Terrain's is on two.
 */
const {
  Cam, clamp, facing, fit, lerp, open, poly, prism, proj, rad, rings, rrect, seg,
  spring, stepS, disposer, mk, pointer, put, register, solid,
} = HL;

const N = 11, OW = 120, G = 9, SW = 12, TK = 1, Z0 = 15, JT = 6, D = 8;
const ZH = Z0 + (N - 1) * G + 8, ZT = ZH + 7, ZC = ZT + 7, OPEN = 0, SHUT = 75;
const LADDERS = [OW * 0.2, OW * 0.8], WX = OW - 12, WY = 7.6;

/** The share of the full opening at u reaches from the pointer: 1 → .31 at 42% → .09 at the edge and beyond. */
const falloff = (u) =>
  u <= 0 ? 1 : u <= 0.417 ? 1 - (u / 0.417) * 0.6875 : u <= 1 ? 0.3125 - ((u - 0.417) / 0.583) * 0.2185 : 0.094;

/** Slat i's centre height; 0 is the top slat. */
const zOf = (i) => Z0 + (N - 1 - i) * G;

/** A slat at zc tilted th degrees, its front edge going down: the face, its thickness behind it, and its front edge. */
function slat(P, ring, zc, th) {
  const s = Math.sin(rad(th)), c = Math.cos(rad(th));
  const w = (u, v) => P(u, v * c, zc - v * s);
  const b = (u, v) => P(u, v * c - TK * s, zc - v * s - TK * c);
  return {
    back: poly(ring.map((q) => b(q.u, q.v))),
    face: poly(ring.map((q) => w(q.u, q.v))),
    edge: (u) => w(u, SW / 2),
  };
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let R = value, zp = null;

  const C = Cam(45, 0.5, 1.5);
  const box = [];
  for (const x of [-10, OW + 10]) for (const y of [-9, 15]) for (const z of [-5, ZC]) box.push([x, y, z]);
  fit(C, box, 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  /** One rounded solid, appended now: so the order of these calls is the paint order. */
  const block = (x0, y0, x1, y1, r, b, z0, z1) => { const [ring, inner] = rings(x0, y0, x1, y1, r, b); put(solid(g), prism(P, front, ring, inner, z0, z1)); };

  // Back to front: the sill, the far jamb, the bottom rail, the slats from the
  // bottom up (each one shingles over the one below), the ladders across their
  // front edges, the headrail, the wand, the near jamb and the head.
  block(-10, -9, OW + 10, 15, 3, 1.6, -5, 0);
  block(-JT, -D, 0, D, 2, 1, 0, ZT);
  block(1.5, -SW / 2, OW - 1.5, SW / 2, 2, 0.8, 4, 8);

  const ring = rrect(1.5, -SW / 2, OW - 1.5, SW / 2, 2, 4), slats = [];
  for (let i = 0; i < N; i++) {
    const rest = 66 - (6 * i) / (N - 1) - 32 * Math.exp(-((i - 7) ** 2) / 3);
    slats.push({ zc: zOf(i), rest, sp: spring(rest, { eps: 0.05 }), drawn: NaN });
  }
  for (let i = N - 1; i >= 0; i--) {
    const sl = slats[i], grp = mk("g", {}, g);
    sl.back = mk("path", { class: "lo" }, grp);
    sl.face = mk("path", { class: "sil" }, grp);
  }
  const ladders = LADDERS.map(() => mk("path", { class: "nf lo" }, g));

  block(0, -SW / 2 - 0.5, OW, SW / 2 + 0.5, 2.5, 1, ZH, ZT);
  mk("path", { class: "nf", d: seg(P(WX, WY, ZH + 3.5), P(WX, WY, 44)) }, g);
  block(OW, -D, OW + JT, D, 2, 1, 0, ZT);
  block(-8, -9, OW + 8, 9, 2.5, 1.2, ZT, ZC);

  const peak = slats.reduce((a, b, i) => (b.rest < slats[a].rest ? i : a), 0);

  function draw() {
    let moved = false;
    for (const sl of slats) {
      const th = clamp(sl.sp.x, OPEN, SHUT);
      if (th === sl.drawn) continue;
      sl.drawn = th; moved = true;
      const q = slat(P, ring, sl.zc, th);
      sl.back.setAttribute("d", q.back);
      sl.face.setAttribute("d", q.face);
      sl.edge = q.edge;
    }
    if (!moved) return;
    LADDERS.forEach((x, k) => ladders[k].setAttribute("d", open([
      P(x, SW / 2, ZH), ...slats.map((sl) => sl.edge(x)), P(x, SW / 2, 8),
    ])));
  }

  const B = register(stage, (dt) => {
    let m = false;
    for (const sl of slats) if (stepS(sl.sp, dt)) m = true;
    draw();
    return m;
  });
  bag.add(B.unregister);

  // The hit plane: the pane itself, y = 0, which never moves. A screen point
  // is solved back to the [x, z] on it, so a turning slat cannot move the pick.
  const o = P(0, 0, 0), x1 = P(1, 0, 0), z1 = P(0, 0, 1);
  const ex = [x1[0] - o[0], x1[1] - o[1]], ez = [z1[0] - o[0], z1[1] - o[1]];
  const det = ex[0] * ez[1] - ex[1] * ez[0];
  /** The height on the pane under a screen point, or null off the opening. */
  function onPane([sx, sy]) {
    const qx = sx - o[0], qy = sy - o[1];
    const x = (qx * ez[1] - qy * ez[0]) / det, z = (ex[0] * qy - ex[1] * qx) / det;
    return x < -JT || x > OW + JT || z < Z0 - G / 2 || z > zOf(0) + G / 2 ? null : z;
  }

  function retarget() {
    for (const sl of slats) {
      sl.sp.t = zp === null ? sl.rest : lerp(sl.rest, OPEN, falloff(Math.abs(sl.zc - zp) / (R * G)));
    }
    const a = zp === null ? peak : clamp(N - 1 - Math.round((zp - Z0) / G), 0, N - 1);
    slats.forEach((sl, i) => sl.face.classList.toggle("hi", i === a));
    read.textContent = zp === null ? "rest" : `slat ${String(a + 1).padStart(2, "0")}`;
    B.wake();
  }

  draw();
  retarget();
  bag.add(pointer(stage, {
    move: (p) => { zp = onPane(p); retarget(); },
    leave: () => { zp = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { R = v; if (zp !== null) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "blinds",
  means: "A window's venetian blind: the slats at the pointer's height turn open, and the ones farther off open less.",
  rules: [1, 3, 5, 6],
  range: [1, 2, 3.5],
  mount,
});
