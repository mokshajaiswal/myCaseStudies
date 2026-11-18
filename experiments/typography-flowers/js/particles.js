/**
 * Particles: what floats. Petals and leaves that fall (from a deleted letter,
 * a gust, or Sakura's steady shower) flutter down on a sway, turning over as
 * they go, and get pushed by the pointer. The ambient set belongs to the
 * style: pollen motes, fireflies that drift toward the pointer, or glints of
 * gold along the vines.
 */
(function () {
  const TF = (window.TF = window.TF || {});
  const TAU = Math.PI * 2;
  const rand = (a, b) => a + Math.random() * (b - a);
  const wrapA = (a) => Math.atan2(Math.sin(a), Math.cos(a));

  class Particles {
    constructor() {
      this.list = [];
      this.amb = [];
      this.ambKind = undefined;
      this.timer = 0;
    }

    clear() {
      this.list.length = 0;
      this.amb.length = 0;
    }

    /** Scatter a flower's petals; count defaults to a whole flower's worth. */
    shedFlower(fl, st, env, now, push, count) {
      const p = Math.min(1, Math.max(0, (now - fl.born) / fl.dur));
      if (p < 0.15) return;
      const pal = st.petals[(fl.u * st.petals.length) | 0];
      const n = count || 3 + Math.round(p * 4);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * TAU, d = Math.random() * fl.r * 0.6;
        this.petal(
          fl.x + Math.cos(a) * d, fl.y + Math.sin(a) * d, i % 2 ? pal[0] : pal[1], fl.r * rand(0.32, 0.48) * Math.max(0.5, p),
          Math.cos(a) * rand(10, 40) + (push ? push.x : 0), Math.sin(a) * rand(10, 30) - rand(10, 40) + (push ? push.y : 0), env
        );
      }
    }

    petal(x, y, color, size, vx, vy, env) {
      if (this.list.length > 420) this.list.shift();
      this.list.push({
        t: "petal", x, y, vx, vy, color, size, rot: rand(0, TAU), vr: rand(-3, 3), flip: rand(0, TAU), vf: rand(2, 5),
        ph: rand(0, TAU), fq: rand(1.2, 2.4), age: 0, life: rand(5, 8), fall: rand(28, 48) * env.s,
      });
    }

    leaf(l, st, env) {
      if (this.list.length > 420) this.list.shift();
      this.list.push({
        t: "leaf", x: l.x, y: l.y, vx: rand(-15, 15), vy: rand(-20, 0), color: st.leafDry[(l.u2 * st.leafDry.length) | 0],
        size: l.size, u2: l.u2, rot: l.a, vr: rand(-1.5, 1.5), flip: 0, vf: rand(1.5, 3), ph: rand(0, TAU), fq: rand(0.8, 1.6),
        age: 0, life: rand(5, 8), fall: rand(40, 60) * env.s,
      });
    }

    update(dt, ptr, env) {
      const L = this.list, R = 90 * env.s, k1 = Math.min(1, dt * 1.6), k2 = Math.min(1, dt * 1.2);
      for (let i = L.length - 1; i >= 0; i--) {
        const p = L[i];
        p.age += dt;
        if (p.age > p.life) {
          L.splice(i, 1);
          continue;
        }
        const sway = Math.sin(p.age * p.fq + p.ph);
        p.vx += (sway * 28 * env.s - p.vx) * k1;
        p.vy += (p.fall * (0.6 + 0.4 * Math.abs(sway)) - p.vy) * k2;
        if (ptr.active) {
          const d = Math.hypot(p.x - ptr.x, p.y - ptr.y);
          if (d < R) {
            const f = 1 - d / R;
            p.vx += ptr.vx * f * dt * 3;
            p.vy += ptr.vy * f * dt * 3;
          }
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.flip += p.vf * dt;
      }
    }

    /** Keep the style's ambient set alive around the text block box. */
    ambient(dt, now, st, garden, box, ptr, env) {
      const kind = st.ambient || null;
      if (kind !== this.ambKind) {
        this.amb.length = 0;
        this.ambKind = kind;
      }
      if (!kind || !box) return;

      if (kind === "petals") {
        this.timer -= dt;
        if (this.timer > 0) return;
        this.timer = rand(0.22, 0.55);
        const open = garden.flowers.filter((f) => !f.bud && now - f.born > f.dur * 0.8);
        if (!open.length) return;
        const fl = open[(Math.random() * open.length) | 0], pal = st.petals[(fl.u * st.petals.length) | 0];
        this.petal(fl.x, fl.y, pal[1], fl.r * rand(0.3, 0.42), rand(-10, 10), rand(-5, 10), env);
        return;
      }

      if (kind === "sparks") {
        this.timer -= dt;
        const stems = garden.stemList().filter((s) => s.nodes.length);
        if (this.timer <= 0 && stems.length && this.amb.length < 60) {
          this.timer = rand(0.04, 0.11);
          const s = stems[(Math.random() * stems.length) | 0], n = s.nodes[(Math.random() * s.nodes.length) | 0];
          this.amb.push({ x: n.x, y: n.y, age: 0, life: rand(0.6, 1.3), size: rand(2.5, 5.5) * env.s, rot: rand(0, 1) });
        }
        for (let i = this.amb.length - 1; i >= 0; i--) if ((this.amb[i].age += dt) > this.amb[i].life) this.amb.splice(i, 1);
        return;
      }

      const flies = kind === "fireflies", want = flies ? 26 : 18;
      const cx = (box.x0 + box.x1) / 2, cy = (box.y0 + box.y1) / 2;
      while (this.amb.length < want) {
        this.amb.push({
          x: rand(box.x0, box.x1), y: rand(box.y0, box.y1), a: rand(0, TAU), sp: (flies ? rand(14, 30) : rand(5, 12)) * env.s,
          ph: rand(0, TAU), fq: rand(0.8, 2), size: rand(0.8, 1.8),
        });
      }
      for (const m of this.amb) {
        m.a += (Math.sin(now * 0.7 + m.ph) * 1.4 + (Math.random() - 0.5) * 2) * dt;
        if (m.x < box.x0 || m.x > box.x1 || m.y < box.y0 || m.y > box.y1) {
          m.a += wrapA(Math.atan2(cy - m.y, cx - m.x) - m.a) * Math.min(1, dt * 2);
        }
        if (flies && ptr.active) {
          const dx = ptr.x - m.x, dy = ptr.y - m.y, d = Math.hypot(dx, dy);
          if (d < 220 * env.s && d > 24 * env.s) m.a += wrapA(Math.atan2(dy, dx) - m.a) * Math.min(1, dt * 1.5);
        }
        m.x += Math.cos(m.a) * m.sp * dt;
        m.y += Math.sin(m.a) * m.sp * dt - (flies ? 0 : 3 * env.s * dt);
      }
    }

    draw(ctx, st, env, now) {
      const ink = st.render === "ink";
      for (const p of this.list) {
        ctx.globalAlpha = Math.max(0, Math.min(1, (p.life - p.age) / 1.5, p.age / 0.15));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, 0.25 + 0.75 * Math.abs(Math.cos(p.flip)));
        if (p.t === "petal") {
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(-s, 0);
          ctx.bezierCurveTo(-s * 0.3, -s * 0.75, s * 0.75, -s * 0.6, s, 0);
          ctx.bezierCurveTo(s * 0.75, s * 0.6, -s * 0.3, s * 0.75, -s, 0);
          ctx.fillStyle = ink ? st.bg : p.color;
          ctx.fill();
          if (ink) {
            ctx.strokeStyle = st.ink;
            ctx.lineWidth = 0.8 * env.s;
            ctx.stroke();
          }
        } else TF.drawLeaf(ctx, { x: -p.size * 0.5, y: 0, a: 0, size: p.size, u: 0, u2: p.u2 }, st, 1, env, p.color);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      this.drawAmbient(ctx, st, env, now);
    }

    drawAmbient(ctx, st, env, now) {
      const kind = this.ambKind;
      if (!kind || kind === "petals" || !this.amb.length) return;
      if (kind === "fireflies") {
        ctx.globalCompositeOperation = "lighter";
        for (const m of this.amb) {
          const pulse = 0.2 + 0.8 * Math.pow(0.5 + 0.5 * Math.sin(now * m.fq * 2 + m.ph), 3), R = 11 * env.s * m.size;
          const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, R);
          g.addColorStop(0, TF.rgba(st.fly, 0.55 * pulse));
          g.addColorStop(1, TF.rgba(st.fly, 0));
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(m.x, m.y, R, 0, TAU);
          ctx.fill();
          ctx.fillStyle = TF.rgba(st.fly, 0.9 * pulse);
          ctx.beginPath();
          ctx.arc(m.x, m.y, 1.2 * env.s, 0, TAU);
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
      } else if (kind === "pollen") {
        ctx.fillStyle = st.mote;
        for (const m of this.amb) {
          ctx.globalAlpha = 0.25 + 0.3 * (0.5 + 0.5 * Math.sin(now * m.fq + m.ph));
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size * env.s, 0, TAU);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      } else if (kind === "sparks") {
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = st.spark;
        ctx.lineCap = "round";
        for (const m of this.amb) {
          const a = Math.sin((Math.PI * m.age) / m.life), s = m.size * a;
          ctx.globalAlpha = a;
          ctx.lineWidth = 0.9 * env.s;
          ctx.beginPath();
          ctx.save();
          ctx.translate(m.x, m.y);
          ctx.rotate(m.rot);
          ctx.moveTo(-s, 0);
          ctx.lineTo(s, 0);
          ctx.moveTo(0, -s * 1.4);
          ctx.lineTo(0, s * 1.4);
          ctx.restore();
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }
    }
  }

  TF.Particles = Particles;
})();
