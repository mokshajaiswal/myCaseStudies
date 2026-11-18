import { AbsoluteFill, Easing, Img, spring, staticFile, useCurrentFrame } from 'remotion';

// 2x the case-study card's white visual panel (316 x 336 CSS px inside its border).
export const WIDTH = 632;
export const HEIGHT = 672;
export const FPS = 30;
export const DURATION = 210;

// Phone geometry mirrors case-study-kit/kit.css (--phone-aspect, screen insets, radius)
// and theme.css --phone-shadow, all at 2x on the 352px base phone.
const BASE = 352;
const ASPECT = 2049 / 1005;
// The analytics mock is laid out in its 1x Figma pixels: 360 wide, 781 visible (object-fit: cover, top).
const S = 360;
const VISIBLE = (S * 0.958 * ASPECT) / 0.9;
const INNER = (BASE * 0.9) / S;
const SRC = staticFile('screens/analytics.png');

const clamp = (t) => Math.min(1, Math.max(0, t));
const tw = (f, f0, f1, a, b, e = Easing.inOut(Easing.cubic)) => a + (b - a) * e(clamp((f - f0) / (f1 - f0)));
const rise = (f, start) => spring({ frame: f - start, fps: FPS, config: { damping: 16, mass: 0.7, stiffness: 120 } });

// Contiguous full-width bands of the mock, revealed one after another. `out` is when each leaves
// in the quick reset at the start (bottom first); `in` is when it builds back in.
const BANDS = [
  { y: 0, h: 74, out: 22, in: 34, from: -36 },
  { y: 74, h: 190, out: 20, in: 42 },
  { y: 264, h: 84, out: 18, in: 52 },
  { y: 348, h: 46, out: 16, in: 62 },
  { y: 394, h: 208, out: 14, in: 70, draw: true },
  { y: 602, h: 179, out: 12, in: 84 },
];

// Parts that lift forward in place after they arrive: a copy scales over its own original.
const POPS = [
  { rect: [24, 267, 312, 77], radius: 16, at: 96, lift: 1.12 },
  { rect: [24, 410, 152, 36], radius: 18, at: 122, lift: 1.3 },
  { rect: [232, 405, 92, 32], radius: 8, at: 132, lift: 1.35 },
  { rect: [24, 640, 312, 140], radius: 16, at: 146, lift: 1.08 },
];

const Crop = ({ rect: [x, y, w, h], radius = 0, style }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, overflow: 'hidden', borderRadius: radius, ...style }}>
    <Img src={SRC} style={{ position: 'absolute', left: -x, top: -y, width: S, height: 1547 }} />
  </div>
);

const Band = ({ frame, band }) => {
  const leave = tw(frame, band.out, band.out + 8, 0, 1, Easing.in(Easing.cubic));
  const sprung = frame < band.in ? 0 : rise(frame, band.in);
  const enter = sprung > 0.999 ? 1 : sprung;
  const shown = frame < band.in ? 1 - leave : enter;
  if (shown <= 0) return null;
  const y = frame < band.in ? -10 * leave : (band.from ?? 28) * (1 - enter);
  const blur = frame < band.in ? 4 * leave : 8 * (1 - clamp(enter));
  // The chart sweeps in left to right, like its line being drawn.
  const reveal = band.draw && frame >= band.in ? tw(frame, band.in, band.in + 30, 0, 100, Easing.out(Easing.cubic)) : 100;
  return (
    <Crop
      rect={[0, band.y, S, band.h]}
      style={{
        opacity: clamp(shown * 1.4),
        transform: `translateY(${y}px) scale(${0.96 + 0.04 * clamp(shown)})`,
        filter: blur > 0.05 ? `blur(${blur}px)` : 'none',
        clipPath: `inset(0 ${100 - reveal}% 0 0)`,
      }}
    />
  );
};

const Pop = ({ frame, pop }) => {
  const up = spring({ frame: frame - pop.at, fps: FPS, config: { damping: 12, stiffness: 140 } });
  const down = spring({ frame: frame - pop.at - 26, fps: FPS, config: { damping: 18, stiffness: 120 } });
  const t = clamp(up - down);
  if (frame < pop.at || frame > pop.at + 60 || t < 0.002) return null;
  return (
    <Crop
      rect={pop.rect}
      radius={pop.radius}
      style={{
        transform: `translateY(${-8 * t}px) scale(${1 + (pop.lift - 1) * t})`,
        boxShadow: `0 ${18 * t}px ${36 * t}px rgb(43 73 133 / ${0.22 * t})`,
        zIndex: 3,
      }}
    />
  );
};

export const TurboHubCard = () => {
  const frame = useCurrentFrame();
  // The phone tips back while the screen resets and settles flat as the mock completes.
  const tilt = tw(frame, 14, 40, 0, 1) * (1 - tw(frame, 120, 190, 0, 1, Easing.inOut(Easing.quad)));
  const height = BASE * ASPECT;
  // The analytics end point pulses once the chart has drawn.
  const ring = clamp((frame - 104) / 20);
  return (
    <AbsoluteFill style={{ background: '#fff', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute', left: WIDTH / 2 - BASE / 2, top: 44, width: BASE, height,
          transform: `perspective(1400px) rotateX(${10 * tilt}deg) rotateY(${-14 * tilt}deg) scale(${1 - 0.06 * tilt})`,
          transformOrigin: '50% 30%',
          filter: 'drop-shadow(0 48px 60px rgb(43 73 133 / 0.18))',
        }}
      >
        <div style={{ position: 'absolute', inset: '2.1% 5%', overflow: 'hidden', borderRadius: '15.5% / 7.2%', background: '#fdfefe' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: S, height: VISIBLE, transform: `scale(${INNER})`, transformOrigin: '0 0' }}>
            {BANDS.map((band) => <Band key={band.y} frame={frame} band={band} />)}
            {ring > 0 && ring < 1 && (
              <div style={{ position: 'absolute', left: 334 - 8, top: 421 - 8, width: 16, height: 16, borderRadius: '50%', border: '2px solid rgb(29 134 255)', opacity: 1 - ring, transform: `scale(${1 + 2.2 * ring})` }} />
            )}
          </div>
        </div>
        <Img src={staticFile('phone-frame.png')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
        {/* Lifted parts sit above the frame so they can rise past the screen edge. */}
        <div style={{ position: 'absolute', left: '5%', top: '2.1%', width: S, height: VISIBLE, transform: `scale(${INNER})`, transformOrigin: '0 0' }}>
          {POPS.map((pop) => <Pop key={pop.at} frame={frame} pop={pop} />)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
