"""Renders takes/tour/ (from record.js) into the 1920x1200 TLDR tour loop with camera moves, a cursor and click rings.
Usage: render.py <ffmpeg> <out.mp4>"""
import bisect, json, math, subprocess, sys
from functools import lru_cache
from PIL import Image
from cursor import cursor_sprite, ring_sprite

FFMPEG = sys.argv[1]
OUT = sys.argv[2]
FPS = 30
OW, OH = 1920, 1200          # output size
VW, VH = 1440, 900           # page viewport in CSS px
FADE = 0.6                   # crossfade back to the first frame so the loop has no seam
CURSOR_H = 22                # arrow height in CSS px; it scales with the zoom like the rest of the screen

TAKE = 'takes/tour/'
log = json.load(open(TAKE + 'log.json'))
frame_t = [f['t'] for f in log['frames']]
cur_t = [c['t'] for c in log['cursor']]
start, end = max(frame_t[0], 0.05), log['end']

def ease(k):
    k = min(1, max(0, k))
    return 4 * k ** 3 if k < 0.5 else 1 - (-2 * k + 2) ** 3 / 2

# Camera: each move eases from wherever the camera is to its target. Scale moves in log space so zooms feel even.
segments = []
def cam_at(t, segs):
    s = (1.0, VW / 2, VH / 2)
    for t0, dur, a, b in segs:
        if t < t0: break
        k = ease((t - t0) / dur)
        s = (math.exp(math.log(a[0]) + (math.log(b[0]) - math.log(a[0])) * k), a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k)
    return s
for e in log['cam']:
    segments.append((e['t'], e['dur'], cam_at(e['t'], segments), (e['scale'], e['cx'], e['cy'])))

def crop_box(t):
    scale, cx, cy = cam_at(t, segments)
    cw, ch = VW / scale, VH / scale
    return min(max(cx - cw / 2, 0), VW - cw), min(max(cy - ch / 2, 0), VH - ch), cw, ch

def cursor_at(t):
    i = bisect.bisect_right(cur_t, t)
    if i == 0: c = log['cursor'][0]; return c['x'], c['y']
    if i >= len(cur_t): c = log['cursor'][-1]; return c['x'], c['y']
    a, b = log['cursor'][i - 1], log['cursor'][i]
    k = (t - a['t']) / max(1e-6, b['t'] - a['t'])
    return a['x'] + (b['x'] - a['x']) * k, a['y'] + (b['y'] - a['y']) * k

@lru_cache(maxsize=4)
def frame_image(i):
    return Image.open(TAKE + log['frames'][i]['name']).convert('RGB')

def render(t):
    i = max(0, bisect.bisect_right(frame_t, t) - 1)
    x0, y0, cw, ch = crop_box(t)
    src = frame_image(i); k = src.width / VW
    img = src.crop((round(x0 * k), round(y0 * k), round((x0 + cw) * k), round((y0 + ch) * k))).resize((OW, OH), Image.LANCZOS).convert('RGBA')
    s = OW / cw                               # CSS px -> output px
    to_out = lambda x, y: ((x - x0) * s, (y - y0) * s)
    for c in log['clicks']:
        p = (t - c['t']) / 0.5
        if 0 <= p <= 1:
            spr = ring_sprite(round((5 + 18 * (1 - (1 - p) ** 3)) * s), int(255 * (1 - p)))
            px, py = to_out(c['x'], c['y'])
            img.alpha_composite(spr, (round(px - spr.width / 2), round(py - spr.height / 2)))
    press = any(0 <= t - c['t'] <= 0.14 for c in log['clicks'])
    spr, tip = cursor_sprite(round(CURSOR_H * s * (0.86 if press else 1)))
    px, py = to_out(*cursor_at(t))
    img.alpha_composite(spr, (round(px - tip), round(py - tip)))
    return img.convert('RGB')

if OUT == 'stills':                     # quick check: a few frames at given times
    for j, t in enumerate(float(x) for x in sys.argv[3].split(',')):
        render(t).save(f'still-{j}.png')
    sys.exit()

first = None
n = int((end - start) * FPS)
enc = subprocess.Popen([FFMPEG, '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{OW}x{OH}', '-r', str(FPS), '-i', '-',
                        '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', OUT], stdin=subprocess.PIPE)
for f in range(n):
    t = start + f / FPS
    im = render(t)
    if f == 0: first = im
    left = end - t
    if left < FADE: im = Image.blend(im, first, ease(1 - left / FADE))
    enc.stdin.write(im.tobytes())
enc.stdin.close(); enc.wait()
print('done', n, 'frames')
