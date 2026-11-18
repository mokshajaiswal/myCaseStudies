/**
 * Flora: the painters. Stems, leaves and eight procedural flowers, each drawn
 * in its own frame with petals along +x, opening on a progress p from 0 (a
 * closed bud) to 1 (full bloom) with every petal on its own small delay.
 * A style's render mode decides the finish: "fill" (gradients), "glow"
 * (luminous, with a halo) or "ink" (paper fill, pen outline and hatching).
 * Fully open flowers are cached as sprites, so a full garden stays cheap.
 */
(function () {
  const TF = (window.TF = window.TF || {});
  const TAU = Math.PI * 2;
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeBack = (t) => 1 + 2.6 * Math.pow(t - 1, 3) + 1.6 * Math.pow(t - 1, 2);
  const wrapA = (a) => Math.atan2(Math.sin(a), Math.cos(a));

  const rgbCache = new Map();
  function rgb(hex) {
    let v = rgbCache.get(hex);
    if (!v) {
      const n = parseInt(hex.slice(1), 16);
      v = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
      rgbCache.set(hex, v);
    }
    return v;
  }
  TF.rgba = (hex, a) => {
    if (hex[0] !== "#") return hex;
    const [r, g, b] = rgb(hex);
    return `rgba(${r},${g},${b},${a})`;
  };
  function mix(a, b, t) {
    const x = rgb(a), y = rgb(b);
    return `rgb(${Math.round(x[0] + (y[0] - x[0]) * t)},${Math.round(x[1] + (y[1] - x[1]) * t)},${Math.round(x[2] + (y[2] - x[2]) * t)})`;
  }

  /** Which flower u picks under a style's odds. */
  function pickKind(st, u) {
    if (!st._kinds) {
      const e = Object.entries(st.kinds), total = e.reduce((s, [, w]) => s + w, 0);
      let acc = 0;
      st._kinds = e.map(([k, w]) => [k, (acc += w) / total]);
    }
    for (const [k, c] of st._kinds) if (u <= c) return k;
    return st._kinds[st._kinds.length - 1][0];
  }

  /* ---------- petal outlines, base at the origin, tip along +x ---------- */

  function notched(ctx, len, wid) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(len * 0.25, -wid * 0.9, len * 0.85, -wid * 1.15, len, -wid * 0.32);
    ctx.quadraticCurveTo(len * 0.88, 0, len, wid * 0.32);
    ctx.bezierCurveTo(len * 0.85, wid * 1.15, len * 0.25, wid * 0.9, 0, 0);
    ctx.closePath();
  }
  function rounded(ctx, len, wid) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(len * 0.1, -wid * 1.1, len * 1.05, -wid * 1.0, len, 0);
    ctx.bezierCurveTo(len * 1.05, wid * 1.0, len * 0.1, wid * 1.1, 0, 0);
    ctx.closePath();
  }
  function slim(ctx, len, wid) {
    ctx.beginPath();
    ctx.ellipse(len * 0.56, 0, len * 0.44, wid, 0, 0, TAU);
  }

  /* ---------- finishes ---------- */

  function fillPetal(ctx, st, fill, env) {
    if (st.render === "ink") {
      ctx.fillStyle = st.bg;
      ctx.fill();
      ctx.strokeStyle = st.ink;
      ctx.lineWidth = 0.85 * env.s;
      ctx.stroke();
      return;
    }
    ctx.fillStyle = fill;
    ctx.fill();
    if (st.edge) {
      ctx.strokeStyle = st.edge;
      ctx.lineWidth = 0.7 * env.s;
      ctx.stroke();
    }
  }

  /** Engraver's hatching from a petal's base: only in ink. */
  function hatch(ctx, st, env, len, wid, n) {
    if (st.render !== "ink") return;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n - 0.5;
      ctx.moveTo(len * 0.12, t * wid * 0.5);
      ctx.lineTo(len * (0.42 + 0.22 * (1 - Math.abs(t) * 2)), t * wid * 1.15);
    }
    ctx.lineWidth = 0.5 * env.s;
    ctx.strokeStyle = st.ink;
    ctx.stroke();
  }

  function radial(ctx, r, pal, st) {
    if (st.render === "ink") return null;
    const g = ctx.createRadialGradient(0, 0, r * 0.04, 0, 0, r);
    g.addColorStop(0, pal[0]);
    g.addColorStop(0.72, pal[1]);
    g.addColorStop(1, pal[1]);
    return g;
  }

  /** n petals round the centre, each opening a little after the last. */
  function petalRing(ctx, r, p, st, pal, env, n, shape, wid, rot) {
    const g = radial(ctx, r, pal, st);
    for (let i = 0; i < n; i++) {
      const k = clamp((p - (i / n) * 0.35) / 0.65, 0, 1);
      if (k <= 0) continue;
      const s = 0.25 + 0.75 * easeBack(k);
      ctx.save();
      ctx.rotate(rot + (i / n) * TAU + (1 - k) * 0.7);
      ctx.scale(s, s * (0.5 + 0.5 * easeOut(k)));
      shape(ctx, r, r * wid);
      fillPetal(ctx, st, g, env);
      hatch(ctx, st, env, r, r * wid, 3);
      ctx.restore();
    }
  }

  function stamens(ctx, len, p, st, ctr, env, n) {
    const k = clamp((p - 0.45) / 0.55, 0, 1);
    if (!k) return;
    const L = len * easeOut(k), ink = st.render === "ink", tips = [];
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + i * 0.37, l = L * (0.68 + 0.32 * (((i * 7) % 5) / 4));
      const x = Math.cos(a) * l, y = Math.sin(a) * l;
      ctx.moveTo(0, 0);
      ctx.lineTo(x, y);
      tips.push(x, y);
    }
    ctx.strokeStyle = ink ? st.ink : TF.rgba(ctr, 0.75);
    ctx.lineWidth = 0.6 * env.s;
    ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i < tips.length; i += 2) {
      ctx.moveTo(tips[i] + 1.1 * env.s, tips[i + 1]);
      ctx.arc(tips[i], tips[i + 1], 1.1 * env.s, 0, TAU);
    }
    ctx.fillStyle = ink ? st.ink : ctr;
    ctx.fill();
  }

  function dot(ctx, r, ctr, st, env, p) {
    const k = clamp((p - 0.3) / 0.5, 0, 1);
    if (!k) return;
    ctx.beginPath();
    ctx.arc(0, 0, r * easeBack(k), 0, TAU);
    if (st.render === "ink") {
      ctx.fillStyle = st.bg;
      ctx.fill();
      ctx.strokeStyle = st.ink;
      ctx.lineWidth = 0.8 * env.s;
      ctx.stroke();
    } else {
      ctx.fillStyle = ctr;
      ctx.fill();
    }
  }

  /** A seed disc stippled on a sunflower spiral. */
  function disc(ctx, r, p, st, ctr, env, dark) {
    const k = clamp((p - 0.3) / 0.5, 0, 1);
    if (!k) return;
    const R = r * easeBack(k), ink = st.render === "ink";
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, TAU);
    if (ink) {
      ctx.fillStyle = st.bg;
      ctx.fill();
      ctx.strokeStyle = st.ink;
      ctx.lineWidth = 0.8 * env.s;
      ctx.stroke();
    } else {
      ctx.fillStyle = dark || ctr;
      ctx.fill();
    }
    const n = 22;
    ctx.beginPath();
    for (let i = 1; i < n; i++) {
      const a = i * 2.39996, rr = R * 0.86 * Math.sqrt(i / n), x = Math.cos(a) * rr, y = Math.sin(a) * rr;
      ctx.moveTo(x + 0.75 * env.s, y);
      ctx.arc(x, y, 0.75 * env.s, 0, TAU);
    }
    ctx.fillStyle = ink ? st.ink : "rgba(0,0,0,.22)";
    ctx.fill();
  }

  /* ---------- the flowers ---------- */

  const KINDS = {
    blossom(ctx, r, p, st, pal, ctr, fl, env) {
      petalRing(ctx, r, p, st, pal, env, 5, notched, 0.44, fl.u2 * 1.2);
      stamens(ctx, r * 0.32, p, st, ctr, env, 9);
      dot(ctx, r * 0.1, ctr, st, env, p);
    },

    cherry(ctx, r, p, st, pal, ctr, fl, env) {
      petalRing(ctx, r, p, st, pal, env, 5, notched, 0.5, fl.u2 * 1.2);
      stamens(ctx, r * 0.5, p, st, ctr, env, 14);
      dot(ctx, r * 0.09, ctr, st, env, p);
    },

    daisy(ctx, r, p, st, pal, ctr, fl, env) {
      const n = 14 + ((fl.u2 * 8) | 0);
      const light = st.render === "ink" ? pal : [pal[1], pal[1]];
      petalRing(ctx, r * 0.88, p, st, light, env, n, slim, 0.07, Math.PI / n);
      petalRing(ctx, r, p, st, light, env, n, slim, 0.085, 0);
      disc(ctx, r * 0.24, p, st, ctr, env);
    },

    anemone(ctx, r, p, st, pal, ctr, fl, env) {
      petalRing(ctx, r, p, st, pal, env, 6, rounded, 0.5, fl.u2);
      const k = clamp((p - 0.4) / 0.6, 0, 1);
      if (k) {
        const n = 16, R = r * 0.31 * easeOut(k);
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const a = (i / n) * TAU, x = Math.cos(a) * R, y = Math.sin(a) * R;
          ctx.moveTo(x + 1.2 * env.s, y);
          ctx.arc(x, y, 1.2 * env.s, 0, TAU);
        }
        ctx.fillStyle = st.render === "ink" ? st.ink : "#2b2433";
        ctx.fill();
      }
      disc(ctx, r * 0.19, p, st, ctr, env, st.render === "glow" ? ctr : "#2b2433");
    },

    rose(ctx, r, p, st, pal, ctr, fl, env) {
      const rings = 4, ink = st.render === "ink";
      for (let k = 0; k < rings; k++) {
        // Outer rings unfurl last.
        const kp = clamp((p - (rings - 1 - k) * 0.12) / 0.55, 0, 1);
        if (kp <= 0) continue;
        const R = r * (1 - k * 0.21), n = k === rings - 1 ? 3 : 5;
        const col = ink ? null : mix(pal[1], pal[0], (k / (rings - 1)) * 0.85);
        for (let i = 0; i < n; i++) {
          ctx.save();
          ctx.rotate(fl.u * TAU + k * 0.9 + (i / n) * TAU + (1 - kp) * 0.5);
          const s = 0.3 + 0.7 * easeBack(kp);
          ctx.scale(s, s);
          rounded(ctx, R, R * (0.62 - k * 0.06));
          if (ink) {
            fillPetal(ctx, st, null, env);
            hatch(ctx, st, env, R, R * 0.5, 2);
          } else {
            ctx.fillStyle = col;
            ctx.fill();
            ctx.strokeStyle = st.edge || TF.rgba(pal[0], 0.5);
            ctx.lineWidth = 0.8 * env.s;
            ctx.stroke();
          }
          ctx.restore();
        }
      }
      const k = clamp((p - 0.2) / 0.6, 0, 1);
      if (!k) return;
      ctx.beginPath();
      for (let t = 0; t <= 1.001; t += 0.04) {
        const a = t * TAU * 1.7 + fl.u * TAU, rr = r * 0.2 * t * k;
        if (t === 0) ctx.moveTo(0, 0);
        else ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
      }
      ctx.strokeStyle = ink ? st.ink : mix(pal[0], "#000000", 0.3);
      ctx.lineWidth = 0.9 * env.s;
      ctx.stroke();
    },

    star(ctx, r, p, st, pal, ctr, fl, env) {
      const m = 3 + ((fl.u2 * 3) | 0);
      for (let j = 0; j < m; j++) {
        const q = clamp((p - j * 0.09) / 0.7, 0, 1);
        if (!q) continue;
        const a = (j / m) * TAU + fl.u * 3;
        ctx.save();
        ctx.translate(Math.cos(a) * r * 0.45, Math.sin(a) * r * 0.45);
        ctx.rotate(a * 1.7);
        petalRing(ctx, r * 0.42, q, st, pal, env, 5, rounded, 0.42, 0);
        dot(ctx, r * 0.07, ctr, st, env, q);
        ctx.restore();
      }
    },

    /** A hanging bell, seen from the side, drooping a little toward the ground. */
    bell(ctx, r, p, st, pal, ctr, fl, env) {
      ctx.rotate(wrapA(Math.PI / 2 - fl.a) * 0.6);
      const ink = st.render === "ink", k = easeOut(p);
      const L = r * 1.3 * (0.45 + 0.55 * k), fw = r * (0.18 + 0.4 * easeBack(p)), b = L * 0.18;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(b, 0);
      ctx.strokeStyle = ink ? st.ink : st.stem[0];
      ctx.lineWidth = 1.2 * env.s;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(b, -r * 0.13);
      ctx.bezierCurveTo(L * 0.5, -r * 0.34, L * 0.78, -fw * 0.7, L, -fw);
      ctx.quadraticCurveTo(L * 0.9, -fw * 0.66, L * 0.99, -fw / 3);
      ctx.quadraticCurveTo(L * 0.9, 0, L * 0.99, fw / 3);
      ctx.quadraticCurveTo(L * 0.9, fw * 0.66, L, fw);
      ctx.bezierCurveTo(L * 0.78, fw * 0.7, L * 0.5, r * 0.34, b, r * 0.13);
      ctx.closePath();
      let g = null;
      if (!ink) {
        g = ctx.createLinearGradient(b, 0, L, 0);
        g.addColorStop(0, pal[0]);
        g.addColorStop(1, pal[1]);
      }
      fillPetal(ctx, st, g, env);
      if (ink) {
        ctx.beginPath();
        for (const t of [-0.5, -0.15, 0.2, 0.55]) {
          ctx.moveTo(b + L * 0.12, t * r * 0.3);
          ctx.lineTo(L * 0.82, t * fw * 0.9);
        }
        ctx.strokeStyle = st.ink;
        ctx.lineWidth = 0.5 * env.s;
        ctx.stroke();
      }
      // Calyx.
      ctx.beginPath();
      ctx.moveTo(b - r * 0.02, 0);
      ctx.lineTo(b + r * 0.24, -r * 0.18);
      ctx.lineTo(b + r * 0.1, 0);
      ctx.lineTo(b + r * 0.24, r * 0.18);
      ctx.closePath();
      if (ink) fillPetal(ctx, st, null, env);
      else {
        ctx.fillStyle = st.leaf[0];
        ctx.fill();
      }
      const sk = clamp((p - 0.5) / 0.5, 0, 1);
      if (sk) {
        const tip = L * (0.98 + 0.2 * easeOut(sk));
        ctx.beginPath();
        ctx.moveTo(L * 0.7, 0);
        ctx.lineTo(tip, 0);
        ctx.strokeStyle = ink ? st.ink : TF.rgba(ctr, 0.8);
        ctx.lineWidth = 0.8 * env.s;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(tip, 0, 1.6 * env.s, 0, TAU);
        ctx.fillStyle = ink ? st.ink : ctr;
        ctx.fill();
      }
    },

    /** Lavender-like: florets climbing a short spike, base first. */
    sprig(ctx, r, p, st, pal, ctr, fl, env) {
      const len = r * 1.6, n = 8, k = easeOut(clamp(p * 1.4, 0, 1));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(len * k, 0);
      ctx.strokeStyle = st.render === "ink" ? st.ink : st.stem[0];
      ctx.lineWidth = 1 * env.s;
      ctx.stroke();
      for (let i = n - 1; i >= 0; i--) {
        const t = (i + 1) / n, q = clamp((p - t * 0.45) / 0.5, 0, 1);
        if (!q) continue;
        const x = len * t * k, sz = r * 0.22 * (1 - t * 0.5) * easeBack(q);
        for (const side of [-1, 1]) {
          ctx.beginPath();
          ctx.ellipse(x, side * sz * 0.55, sz, sz * 0.62, side * 0.6, 0, TAU);
          fillPetal(ctx, st, i % 2 ? pal[0] : pal[1], env);
        }
      }
    },
  };

  /** A closed bud in its sepals, pointing along the stem. */
  function bud(ctx, r, k, st, pal, env) {
    const L = r * 0.6 * easeOut(k), w = r * 0.22 * easeOut(k);
    if (L < 0.5) return;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(L * 0.4, -w * 1.3, L * 0.95, -w * 0.6, L, 0);
    ctx.bezierCurveTo(L * 0.95, w * 0.6, L * 0.4, w * 1.3, 0, 0);
    fillPetal(ctx, st, pal[0], env);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(L * 0.3, -w * 1.2, L * 0.55, -w * 0.2);
    ctx.quadraticCurveTo(L * 0.25, 0, L * 0.55, w * 0.2);
    ctx.quadraticCurveTo(L * 0.3, w * 1.2, 0, 0);
    if (st.render === "ink") fillPetal(ctx, st, null, env);
    else {
      ctx.fillStyle = st.leaf[0];
      ctx.fill();
    }
  }

  function body(ctx, fl, st, p, env) {
    const kind = pickKind(st, fl.u3);
    const pal = st.petals[(fl.u * st.petals.length) | 0];
    const ctr = st.centers[(fl.u2 * st.centers.length) | 0];
    const open = clamp((p - 0.2) / 0.8, 0, 1);
    if (open < 0.5) {
      const A = ctx.globalAlpha;
      ctx.globalAlpha = A * (1 - open / 0.5);
      bud(ctx, fl.r, clamp(p / 0.25, 0, 1), st, pal, env);
      ctx.globalAlpha = A;
    }
    if (open > 0) KINDS[kind](ctx, fl.r, open, st, pal, ctr, fl, env);
  }

  function sprite(fl, st, p, env) {
    const h = fl.r * 1.95, n = Math.max(4, Math.ceil(h * 2 * env.dpr));
    const el = document.createElement("canvas");
    el.width = el.height = n;
    const c = el.getContext("2d"), k = n / (h * 2);
    c.setTransform(k, 0, 0, k, n / 2, n / 2);
    body(c, fl, st, p, env);
    return { el, h, st, dpr: env.dpr };
  }

  TF.drawFlower = function (ctx, fl, st, now, env) {
    const age = now - fl.born;
    if (age <= 0) return;
    const t = age / fl.dur, p = Math.min(fl.bud ? 0.24 : 1, t), done = t >= (fl.bud ? 0.24 : 1);
    const breathe = 1 + Math.sin(now * 1.3 + fl.u * 40) * 0.018;
    ctx.save();
    ctx.translate(fl.x + fl.ox, fl.y + fl.oy);
    ctx.rotate(fl.a + fl.spin);
    ctx.scale(breathe, breathe);
    if (st.render === "glow") {
      const open = clamp((p - 0.2) / 0.8, 0, 1), pal = st.petals[(fl.u * st.petals.length) | 0], R = fl.r * 2.4;
      if (open > 0) {
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
        g.addColorStop(0, TF.rgba(pal[0], 0.34 * open));
        g.addColorStop(1, TF.rgba(pal[0], 0));
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, TAU);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }
    }
    if (done) {
      let sp = fl.sprite;
      if (!sp || sp.st !== st || sp.dpr !== env.dpr) sp = fl.sprite = sprite(fl, st, p, env);
      ctx.drawImage(sp.el, -sp.h, -sp.h, sp.h * 2, sp.h * 2);
    } else body(ctx, fl, st, p, env);
    ctx.restore();
  };

  /** A leaf on a short petiole along +a; k is how far it has unfurled. color overrides the fill (fallen leaves). */
  TF.drawLeaf = function (ctx, l, st, k, env, color) {
    if (!color && l.u > st.leafKeep) return;
    const L = l.size * easeBack(clamp(k, 0, 1));
    if (L < 0.6) return;
    const ink = st.render === "ink";
    const pet = L * 0.16, B = L - pet, W = L * 0.34 * (0.75 + l.u2 * 0.5), curl = (l.u2 - 0.5) * W * 0.6;
    ctx.save();
    ctx.translate(l.x, l.y);
    ctx.rotate(l.a);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(pet, 0);
    ctx.strokeStyle = ink ? st.ink : st.stem[0];
    ctx.lineWidth = Math.max(0.7, L * 0.045);
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pet, 0);
    ctx.bezierCurveTo(pet + B * 0.22, -W * 1.05, pet + B * 0.72, -W * 0.85 + curl, L, curl);
    ctx.bezierCurveTo(pet + B * 0.72, W * 0.85 + curl, pet + B * 0.22, W * 1.05, pet, 0);
    ctx.closePath();
    ctx.fillStyle = color || (ink ? st.bg : st.leaf[(l.u2 * st.leaf.length) | 0]);
    ctx.fill();
    if (ink || st.leafEdge) {
      ctx.strokeStyle = ink ? st.ink : st.leafEdge;
      ctx.lineWidth = (ink ? 0.85 : 0.7) * env.s;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(pet, 0);
    ctx.quadraticCurveTo(pet + B * 0.6, curl * 0.4, L * 0.94, curl * 0.92);
    if (ink) {
      for (let i = 1; i < 5; i++) {
        const t = i / 5, x = pet + B * t, y = curl * t * t, v = W * 0.6 * (1 - t * 0.5);
        ctx.moveTo(x, y);
        ctx.lineTo(x + B * 0.14, y - v);
        ctx.moveTo(x, y);
        ctx.lineTo(x + B * 0.14, y + v);
      }
    }
    ctx.strokeStyle = ink ? st.ink : st.vein;
    ctx.lineWidth = Math.max(0.5, L * 0.025);
    ctx.stroke();
    ctx.restore();
  };

  /** A stem colour pushed toward the ground by t: the back of a turn sits deeper. */
  const shades = new Map();
  function shade(col, bg, t) {
    if (!t) return col;
    const key = col + bg + t;
    let v = shades.get(key);
    if (!v) shades.set(key, (v = mix(col, bg, t)));
    return v;
  }

  /**
   * Stroke a stem's nodes: into `front` where the vine passes over the ink,
   * `back` where it passes behind. Runs of like width and shade share a path.
   * Options: from/to (node range), mul (width factor per node, the live tip),
   * only (0 or 1: draw that layer alone), dry (withering colour, no shadow).
   */
  TF.paintStem = function (back, front, s, st, env, o = {}) {
    const n = s.nodes, to = Math.min(o.to === undefined ? n.length - 1 : o.to, n.length - 1);
    if (to < 1) return;
    const base = o.dry || st.stem[s.ci % st.stem.length], k = st.stemScale || 1;
    const widthOf = (p) => p.w * (o.mul ? o.mul(p) : 1);
    // Quantised so runs stay long; 0 on the front half and at the turns.
    const depthOf = (p) => (o.dry || p.z === undefined || p.z >= 0 ? 0 : Math.round(-p.z * 8) / 8);
    for (const c of [back, front]) {
      c.lineCap = "round";
      c.lineJoin = "round";
    }
    let i = Math.max(0, o.from || 0);
    while (i < to) {
      const q = n[i + 1], f = q.f, w = widthOf(q), d = depthOf(q);
      let j = i + 1;
      while (j < to && n[j + 1].f === f && depthOf(n[j + 1]) === d && Math.abs(widthOf(n[j + 1]) - w) < 0.3 && j - i < 14) j++;
      if (o.only === undefined || o.only === f) {
        const c = f ? front : back;
        c.beginPath();
        c.moveTo(n[i].x, n[i].y);
        for (let m = i + 1; m <= j; m++) c.lineTo(n[m].x, n[m].y);
        c.strokeStyle = shade(base, st.bg, d * 0.32);
        c.lineWidth = Math.max(0.6, w * k);
        if (!o.dry && st.glow) {
          c.shadowColor = st.glow;
          c.shadowBlur = 7 * env.s * env.dpr;
        } else if (!o.dry && f && st.shadow) {
          c.shadowColor = st.shadow;
          c.shadowBlur = 3 * env.s * env.dpr;
          c.shadowOffsetX = 0.6 * env.s * env.dpr;
          c.shadowOffsetY = 1.6 * env.s * env.dpr;
        }
        c.stroke();
        c.shadowColor = "transparent";
        c.shadowBlur = c.shadowOffsetX = c.shadowOffsetY = 0;
      }
      i = j;
    }
  };
})();
