/**
 * Profile: the silhouette of a line of text. The line is painted on its own
 * at half resolution and, for every column, the top and bottom of its ink are
 * read off, never shallower than the x-height band and never deeper than the
 * ascender and descender limits. A sliding max and two box blurs then turn
 * that into a smooth envelope, so the vine wrapping a word swells round a
 * tall letter and settles over the short ones without jitter.
 */
(function () {
  const TF = (window.TF = window.TF || {});

  /** Sliding window extreme (min for tops, max for bottoms) over ±r cells. */
  function slide(a, r, pickLower) {
    const n = a.length, out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let v = a[i];
      for (let k = Math.max(0, i - r), e = Math.min(n - 1, i + r); k <= e; k++) v = pickLower ? Math.min(v, a[k]) : Math.max(v, a[k]);
      out[i] = v;
    }
    return out;
  }

  function blur(a, r) {
    const n = a.length, out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let k = i - r; k <= i + r; k++) sum += a[k < 0 ? 0 : k >= n ? n - 1 : k];
      out[i] = sum / (2 * r + 1);
    }
    return out;
  }

  class LineProfile {
    constructor(x0, cell, top, bot, y, F) {
      Object.assign(this, { x0, cell, top, bot, y, F });
    }

    /** The smoothed {top, bot} of the ink at world x. */
    at(x) {
      const f = (x - this.x0) / this.cell - 0.5, n = this.top.length;
      if (f <= 0 || f >= n - 1) return { top: this.y - this.F * 0.4, bot: this.y + this.F * 0.03 };
      const i = f | 0, t = f - i, T = this.top, B = this.bot;
      return { top: T[i] + (T[i + 1] - T[i]) * t, bot: B[i] + (B[i + 1] - B[i]) * t };
    }
  }

  class Profile {
    constructor(cell = 2) {
      this.cell = cell;
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
      this.cache = new Map();
    }

    reset(F, font, measure) {
      this.F = F;
      this.font = font;
      this.measure = measure;
      this.cache.clear();
    }

    /** The profile of a line set at (x, baseline y); cached, since only the edited line changes. */
    line(text, x, y) {
      const key = `${x}|${y}|${text}`;
      let p = this.cache.get(key);
      if (p) return p;
      p = this.build(text, x, y);
      this.cache.set(key, p);
      if (this.cache.size > 48) this.cache.delete(this.cache.keys().next().value);
      return p;
    }

    build(text, x, y) {
      const { F, cell, ctx } = this, X0 = x - F * 1.2, Y0 = y - F * 1.1;
      const w = Math.max(2, Math.ceil((this.measure(text) + F * 2.4) / cell)), h = Math.ceil((F * 1.7) / cell);
      this.canvas.width = w;
      this.canvas.height = h;
      let px = null;
      if (text) {
        ctx.setTransform(1 / cell, 0, 0, 1 / cell, -X0 / cell, -Y0 / cell);
        ctx.font = this.font;
        ctx.fillStyle = "#000";
        ctx.fillText(text, x, y);
        px = ctx.getImageData(0, 0, w, h).data;
      }
      const minTop = y - F * 0.4, minBot = y + F * 0.03, maxTop = y - F * 0.95, maxBot = y + F * 0.45;
      let top = new Float32Array(w), bot = new Float32Array(w);
      for (let i = 0; i < w; i++) {
        let t = minTop, b = minBot;
        if (px) {
          for (let j = 0; j < h; j++) {
            if (px[(j * w + i) * 4 + 3] > 64) {
              const wy = Y0 + (j + 0.5) * cell;
              if (wy < t) t = wy;
              if (wy > b) b = wy;
            }
          }
        }
        top[i] = Math.max(t, maxTop);
        bot[i] = Math.min(b, maxBot);
      }
      const r = Math.max(1, Math.round((F * 0.2) / cell));
      top = slide(top, r, true);
      bot = slide(bot, r, false);
      for (let k = 0; k < 2; k++) {
        top = blur(top, r);
        bot = blur(bot, r);
      }
      return new LineProfile(X0, cell, top, bot, y, F);
    }
  }

  TF.Profile = Profile;
})();
