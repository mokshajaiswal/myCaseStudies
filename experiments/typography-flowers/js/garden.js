/**
 * Garden: the growth. Each word gets exactly one vine, wound round it like a
 * cord round a stick: a steady helix about the word's silhouette (profile.js)
 * whose reach swells over tall letters and settles over short ones. The half
 * of each turn that runs down the front passes over the ink; the half that
 * climbs the back passes under it, a shade deeper. The vine follows the
 * typing, its live tip tapering, and stops at the last letter until the next.
 *
 * The rhythm is fixed, not random: at every outer turn of the helix either a
 * pair of leaves or (every third turn) a flower. A word starts with a curl
 * and, once a space closes it, ends with a curl and a larger flower.
 */
(function () {
  const TF = (window.TF = window.TF || {});
  const TAU = Math.PI * 2;
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const smooth = (t) => t * t * (3 - 2 * t);
  const peakOf = (th) => Math.floor((th - Math.PI / 2) / Math.PI);

  class Garden {
    constructor() {
      this.now = 0;
      this.acc = 0;
      this.dirty = false;
      this.onShed = null;
      this.clear();
      this.setScale(120, 800, 600);
    }

    setScale(F, W, H) {
      this.F = F;
      this.W = W;
      this.H = H;
      this.s = F / 120;
      this.L = 2 * this.s; // one growth step, world px
      this.speed = 170 * this.s; // tendril tips, px per second
      this.pitch = F * 0.95; // one full turn of the wrap
      this.gap = F * 0.06; // clearance between the ink and the wrap's outer reach
      this.wMain = F * 0.028;
      this.tip = F * 0.34; // length of the live, tapering tip
    }

    clear() {
      this.strands = new Map(); // one per word, keyed by its first glyph's id
      this.stems = []; // tendrils
      this.leaves = [];
      this.flowers = [];
      this.agents = [];
      this.dying = [];
    }

    /* ---------- keeping step with the text ---------- */

    /**
     * Match the vines to the words as they now stand. words: [{key, y,
     * glyphs: [{id, x, w}], closed, closer, profile}]. A vine whose word kept
     * its start is cut back to the first changed letter and grows on from
     * there; one whose word is gone or moved is dropped. removed: glyph ids
     * deleted in this edit (their flowers fall rather than fade).
     */
    sync(words, now, removed, delay = 0.15, stagger = 0) {
      const F = this.F, live = new Map(words.map((w) => [w.key, w]));
      for (const s of [...this.strands.values()]) {
        const w = live.get(s.key);
        const lost = (from) => s.glyphs.slice(from).some((g) => removed.has(g.id)) || (s.closer != null && removed.has(s.closer));
        if (!w || Math.abs(w.glyphs[0].x - s.glyphs[0].x) > 0.5 || Math.abs(w.y - s.y) > 0.5) {
          this.drop(s, now, lost(0));
          continue;
        }
        let k = 1;
        while (k < s.glyphs.length && k < w.glyphs.length && s.glyphs[k].id === w.glyphs[k].id && Math.abs(s.glyphs[k].x - w.glyphs[k].x) < 0.5) k++;
        if (k < s.glyphs.length || (s.terminal && (w.glyphs.length > k || !w.closed || w.closer !== s.closer))) {
          const g = w.glyphs[k - 1];
          this.cut(s, g.x + g.w - F * 0.04, now, lost(k));
        }
        Object.assign(s, { glyphs: w.glyphs, closed: w.closed, closer: w.closer, profile: w.profile });
      }
      let i = 0;
      for (const w of words) if (!this.strands.has(w.key)) this.strands.set(w.key, this.strand(w, now + delay + stagger * i++));
    }

    strand(w, born) {
      return {
        key: w.key, y: w.y, glyphs: w.glyphs, closed: w.closed, closer: w.closer, profile: w.profile,
        x0: w.glyphs[0].x - this.F * 0.12, phase: -Math.PI / 2 + rand(-0.35, 0.35), phase2: rand(0, TAU),
        nodes: [], drawn: 0, ci: (Math.random() * 3) | 0, born, terminal: false, peak: -1,
      };
    }

    /** Let everything grown for one word go: fallen (deleted) or faded (moved). */
    drop(s, now, fall) {
      if (s.nodes.length > 1) this.dying.push({ t0: now, stems: [s], leaves: [], flowers: [], dry: fall });
      this.prune((o) => o.key === s.key, now, fall);
      this.strands.delete(s.key);
      this.dirty = true;
    }

    dropAll(now, fall) {
      for (const s of [...this.strands.values()]) this.drop(s, now, fall);
    }

    /** Trim a vine back to xCut, with everything that grew past it. */
    cut(s, xCut, now, fall) {
      const n = s.nodes;
      let i = n.length;
      while (i > 1 && n[i - 1].x > xCut) i--;
      if (i < n.length) {
        this.dying.push({ t0: now, stems: [{ nodes: n.slice(i - 1), ci: s.ci }], leaves: [], flowers: [], dry: fall });
        n.length = i;
      }
      s.peak = n.length ? peakOf(n[n.length - 1].th) : -1;
      s.terminal = false;
      for (const p of n) p.w = this.width(p); // undo the end taper
      this.prune((o) => o.key === s.key && o.x > xCut, now, fall);
      s.drawn = Math.min(s.drawn, this.bakeIndex(s));
      this.dirty = true;
    }

    prune(pred, now, fall) {
      const gl = [], gf = [], gs = [];
      this.leaves = this.leaves.filter((l) => !(pred(l) && gl.push(l)));
      this.flowers = this.flowers.filter((f) => !(pred(f) && gf.push(f)));
      this.stems = this.stems.filter((t) => !(pred(t) && gs.push(t)));
      this.agents = this.agents.filter((a) => !gs.includes(a.stem));
      if (fall && this.onShed) this.onShed(gf, gl);
      if (gs.length || (!fall && (gl.length || gf.length))) {
        this.dying.push({ t0: now, stems: gs, leaves: fall ? [] : gl, flowers: fall ? [] : gf, dry: fall });
      }
      if (gl.length || gs.length) this.dirty = true;
    }

    /* ---------- the wrap ---------- */

    /** Helix angle at x: a steady pitch with a slow, slight swing so it never looks machined. */
    theta(s, x) {
      const u = x - s.x0;
      return s.phase + (TAU * u) / this.pitch + 0.35 * Math.sin(u / (this.F * 1.7) + s.phase2);
    }

    /** Centre and reach of the wrap at x, from the line's silhouette. */
    reach(s, x) {
      const e = s.profile.at(x);
      return { c: (e.top + e.bot) / 2, a: (e.bot - e.top) / 2 + this.gap };
    }

    width(p) {
      return this.wMain * (0.86 + 0.14 * p.z) * (0.35 + 0.65 * smooth(Math.min(1, p.s / (this.F * 0.35))));
    }

    /** The last node that is no longer part of the live tip. */
    bakeIndex(s) {
      const n = s.nodes;
      if (s.terminal) return Math.max(0, n.length - 1);
      if (!n.length) return 0;
      const limit = n[n.length - 1].s - this.tip;
      let i = s.drawn;
      while (i + 1 < n.length && n[i + 1].s < limit) i++;
      return i;
    }

    node(s, x, c, a, len) {
      const th = this.theta(s, x), z = Math.cos(th), y = c + a * Math.sin(th);
      const p = { x, y, c, a, th, z, s: len, f: z > 0 ? 1 : 0, w: 0 };
      p.w = this.width(p);
      return p;
    }

    seed(s) {
      const r = this.reach(s, s.x0), p = this.node(s, s.x0, r.c, r.a, 0);
      s.nodes.push(p);
      s.peak = peakOf(p.th);
      // An opening curl, reaching back out of the word.
      this.tendril(s, p, Math.PI + (p.y < p.c ? 0.55 : -0.55), p.y < p.c ? 1 : -1, 0.85);
    }

    growStrand(s, dt, now) {
      if (now < s.born || s.terminal) return;
      const F = this.F, last = s.glyphs[s.glyphs.length - 1];
      const end = s.closed ? last.x + last.w + F * 0.2 : last.x + last.w - F * 0.04;
      if (!s.nodes.length) this.seed(s);
      let head = s.nodes[s.nodes.length - 1];
      // Catch up quickly when the typing is ahead; ease in when close.
      let budget = Math.max(F * 1.3, (end - head.x) * 3) * dt;
      while (budget > 0 && end - head.x > 0.05) {
        const slope = (head.a * head.z * TAU) / this.pitch;
        const dx = Math.min(this.L / Math.sqrt(1 + slope * slope), end - head.x, budget);
        budget -= dx;
        head = this.extend(s, head, dx);
      }
      if (s.closed && end - head.x <= 0.05) this.finish(s);
    }

    extend(s, head, dx) {
      const x = head.x + dx, r = this.reach(s, x), k = 1 - Math.exp(-dx / (this.F * 0.16));
      const c = head.c + (r.c - head.c) * k, a = head.a + (r.a - head.a) * k;
      const th = this.theta(s, x), y = c + a * Math.sin(th);
      const p = this.node(s, x, c, a, head.s + Math.hypot(dx, y - head.y));
      s.nodes.push(p);
      const pk = peakOf(p.th);
      if (pk > s.peak) {
        s.peak = pk;
        this.atPeak(s, p, pk);
      }
      return p;
    }

    /** An outer turn of the helix: a flower every third one, a pair of leaves otherwise. */
    atPeak(s, p, k) {
      const F = this.F, out = Math.sin(p.th) > 0 ? 1 : -1, up = out * (Math.PI / 2);
      if (k % 3 === 1) {
        this.addFlower(s.key, p.x, p.y + out * F * 0.035, up, F * rand(0.085, 0.1));
        this.addLeaf(s, p, up + out * 0.75, F * 0.072);
      } else {
        this.addLeaf(s, p, up - out * 0.6, F * 0.1);
        this.addLeaf(s, p, up + out * 0.75, F * 0.072);
      }
    }

    /** Close a finished word: taper the end, open the last flower, curl a tendril. */
    finish(s) {
      const F = this.F, n = s.nodes, head = n[n.length - 1], T = F * 0.32;
      for (const p of n) if (p.s > head.s - T) p.w *= 0.25 + 0.75 * smooth(clamp((head.s - p.s) / T, 0, 1));
      const prev = n[Math.max(0, n.length - 5)], a = Math.atan2(head.y - prev.y, head.x - prev.x);
      this.addFlower(s.key, head.x, head.y, a, F * 0.12);
      let b = n.length - 1;
      while (b > 0 && n[b].s > head.s - F * 0.12) b--;
      const above = n[b].y < n[b].c;
      this.tendril(s, n[b], a + (above ? -0.65 : 0.65), above ? -1 : 1, 1);
      s.terminal = true;
    }

    tendril(s, p, a, curl, lenMul) {
      const ag = { key: s.key, x: p.x, y: p.y, a, done: 0, len: this.F * 0.3 * lenMul, w0: this.wMain * 0.55, curl, gain: rand(1.0, 1.3) };
      ag.stem = { key: s.key, x: p.x, nodes: [{ x: p.x, y: p.y, w: ag.w0, f: 1 }], drawn: 0, ci: s.ci };
      this.stems.push(ag.stem);
      this.agents.push(ag);
    }

    stepTendril(ag) {
      const t = ag.done / ag.len;
      ag.a += ag.curl * (0.02 + ag.gain * t * t);
      ag.x += Math.cos(ag.a) * this.L;
      ag.y += Math.sin(ag.a) * this.L;
      ag.done += this.L;
      ag.stem.nodes.push({ x: ag.x, y: ag.y, w: ag.w0 * (0.25 + 0.75 * Math.pow(Math.max(0, 1 - t), 0.7)), f: 1 });
    }

    addLeaf(s, p, a, size) {
      this.leaves.push({
        key: s.key, x: p.x, y: p.y, a: a + rand(-0.08, 0.08), size: size * rand(0.92, 1.08),
        u: Math.random(), u2: Math.random(), born: this.now, dur: 0.6, f: 1, baked: false,
      });
    }

    /** Open a flower, shrinking it to the room left between its neighbours. */
    addFlower(key, x, y, a, r) {
      for (const o of this.flowers) r = Math.min(r, Math.hypot(o.x - x, o.y - y) / 0.9 - o.r);
      if (r < this.F * 0.05) return;
      this.flowers.push({
        key, x, y, a, r, u: Math.random(), u2: Math.random(), u3: Math.random(),
        born: this.now, dur: rand(1.4, 2), bud: false, ox: 0, oy: 0, vx: 0, vy: 0, spin: 0, vs: 0,
      });
    }

    update(dt, now) {
      this.now = now;
      for (const s of this.strands.values()) this.growStrand(s, dt, now);
      if (!this.agents.length) {
        this.acc = 0;
        return;
      }
      this.acc += dt * this.speed;
      let n = 0;
      while (this.acc >= this.L && n++ < 12) {
        this.acc -= this.L;
        for (let i = this.agents.length - 1; i >= 0; i--) {
          const ag = this.agents[i];
          this.stepTendril(ag);
          if (ag.done >= ag.len) this.agents.splice(i, 1);
        }
      }
      if (this.acc > this.L) this.acc = 0;
    }

    /** Every drawn stem: the word vines and their tendrils. */
    stemList() {
      return [...this.strands.values(), ...this.stems];
    }

    /* ---------- wind ---------- */

    /** Springs for every flower: an idle breeze plus the pointer's wake. */
    sway(dt, now, ptr) {
      const R = this.F * 0.9, s = this.s, lim = this.F * 0.15;
      for (const f of this.flowers) {
        const breeze = Math.sin(now * 0.9 + f.x * 0.006 + f.u * 3) * 1.4 * s;
        let ax = -60 * (f.ox - breeze) - 7 * f.vx, ay = -60 * f.oy - 7 * f.vy, as = -40 * f.spin - 5 * f.vs;
        if (ptr.active) {
          const dx = f.x - ptr.x, dy = f.y - ptr.y, d = Math.hypot(dx, dy);
          if (d < R) {
            const k = (1 - d / R) ** 2;
            ax += ptr.vx * k * 0.5;
            ay += ptr.vy * k * 0.5;
            as += ((dx * ptr.vy - dy * ptr.vx) / R) * k * 0.012;
          }
        }
        f.vx += ax * dt;
        f.vy += ay * dt;
        f.vs += as * dt;
        f.ox = clamp(f.ox + f.vx * dt, -lim, lim);
        f.oy = clamp(f.oy + f.vy * dt, -lim, lim);
        f.spin = clamp(f.spin + f.vs * dt, -0.8, 0.8);
      }
    }

    /** A puff from a click: flowers nearby are thrown back; returns the open ones close enough to shed. */
    gust(x, y, now) {
      const R = this.F * 1.5, out = [];
      for (const f of this.flowers) {
        const dx = f.x - x, dy = f.y - y, d = Math.hypot(dx, dy) || 1;
        if (d > R) continue;
        const k = 1 - d / R;
        f.vx += (dx / d) * 260 * k * this.s;
        f.vy += (dy / d) * 260 * k * this.s;
        f.vs += (Math.random() - 0.5) * 8 * k;
        if (now - f.born > f.dur * 0.7 && Math.random() < k) out.push({ f, k, dx: dx / d, dy: dy / d });
      }
      return out;
    }

    /* ---------- painting ---------- */

    /** Bake whatever has left the live tip onto the persistent layers. */
    paintNew(back, front, st, env) {
      for (const s of this.strands.values()) {
        const b = this.bakeIndex(s);
        if (b > s.drawn) {
          TF.paintStem(back, front, s, st, env, { from: s.drawn, to: b });
          s.drawn = b;
        }
      }
      for (const t of this.stems) {
        if (t.drawn < t.nodes.length - 1) {
          TF.paintStem(back, front, t, st, env, { from: t.drawn });
          t.drawn = t.nodes.length - 1;
        }
      }
    }

    bakeLeaves(back, front, st, env, now) {
      for (const l of this.leaves) {
        if (!l.baked && now - l.born >= l.dur) {
          TF.drawLeaf(l.f ? front : back, l, st, 1, env);
          l.baked = true;
        }
      }
    }

    /** Redraw the persistent layers from scratch (style change, removals, resize). */
    repaint(back, front, st, env, W, H) {
      back.clearRect(0, 0, W, H);
      front.clearRect(0, 0, W, H);
      for (const s of this.strands.values()) TF.paintStem(back, front, s, st, env, { to: s.drawn });
      for (const t of this.stems) {
        TF.paintStem(back, front, t, st, env);
        t.drawn = t.nodes.length - 1;
      }
      for (const l of this.leaves) if (l.baked) TF.drawLeaf(l.f ? front : back, l, st, 1, env);
      this.dirty = false;
    }

    /** The live tips, tapering to a point; layer 0 under the ink, 1 over it. */
    drawTips(c, st, env, layer) {
      for (const s of this.strands.values()) {
        const n = s.nodes;
        if (s.drawn >= n.length - 1) continue;
        const head = n[n.length - 1].s, tip = this.tip;
        const mul = (p) => 0.3 + 0.7 * smooth(clamp((head - p.s) / tip, 0, 1));
        TF.paintStem(c, c, s, st, env, { from: s.drawn, mul, only: layer });
      }
    }

    drawGrowingLeaves(c, st, env, now, layer) {
      for (const l of this.leaves) {
        if (l.baked || l.f !== layer) continue;
        const k = (now - l.born) / l.dur;
        if (k > 0) TF.drawLeaf(c, l, st, Math.min(1, k), env);
      }
    }

    drawFlowers(c, st, env, now) {
      for (const f of this.flowers) TF.drawFlower(c, f, st, now, env);
    }

    drawDying(c, st, env, now) {
      const T = 0.9;
      this.dying = this.dying.filter((d) => now - d.t0 < T);
      const A = c.globalAlpha;
      for (const d of this.dying) {
        c.globalAlpha = A * Math.pow(1 - (now - d.t0) / T, 1.5);
        for (const s of d.stems) TF.paintStem(c, c, s, st, env, { dry: d.dry ? st.leafDry[0] : null });
        for (const l of d.leaves) TF.drawLeaf(c, l, st, 1, env);
        for (const f of d.flowers) TF.drawFlower(c, f, st, now, env);
      }
      c.globalAlpha = A;
    }
  }

  TF.Garden = Garden;
})();
