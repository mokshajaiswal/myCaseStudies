"""The tour's cursor: a rounded arrowhead in the Finance Center navy with a white rim and a soft shadow,
plus a pink click ring. Drawn large and scaled down so the edges stay clean."""
from functools import lru_cache
from PIL import Image, ImageDraw, ImageFilter

NAVY = (30, 43, 111)
PINK = (255, 111, 197)
BASE = 600                      # drawing size of the arrow's height
PAD = 120

# A symmetric notched arrowhead (tip, wing, notch, wing), tilted 25° so it leans like a pointer.
import math
_TILT = math.radians(22)
SHAPE = [(x * math.cos(_TILT) + y * math.sin(_TILT), -x * math.sin(_TILT) + y * math.cos(_TILT))
         for x, y in [(0, 0), (0.34, 0.9), (0, 0.6), (-0.34, 0.9)]]

def _rounded_mask(points, grow, round_by):
    size = BASE + PAD * 2
    m = Image.new('L', (size, size), 0)
    ImageDraw.Draw(m).polygon([(PAD + x * BASE, PAD + y * BASE) for x, y in points], fill=255)
    if grow:
        m = m.filter(ImageFilter.MaxFilter(grow * 2 + 1))
    # Blur then threshold: rounds every corner by about `round_by` px.
    m = m.filter(ImageFilter.GaussianBlur(round_by)).point(lambda v: 255 if v > 128 else 0)
    return m.filter(ImageFilter.GaussianBlur(1.2))

def make_cursor():
    size = BASE + PAD * 2
    outer = _rounded_mask(SHAPE, 25, 18)       # the white rim
    inner = _rounded_mask(SHAPE, 0, 16)        # the navy body
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    shadow = Image.new('RGBA', (size, size), (16, 22, 60, 0))
    shadow.putalpha(outer.point(lambda v: int(v * 0.32)))
    shadow = shadow.transform(shadow.size, Image.AFFINE, (1, 0, -10, 0, 1, -26)).filter(ImageFilter.GaussianBlur(26))
    im = Image.alpha_composite(im, shadow)
    white = Image.new('RGBA', (size, size), (255, 255, 255, 0)); white.putalpha(outer)
    navy = Image.new('RGBA', (size, size), NAVY + (0,)); navy.putalpha(inner)
    # A faint top-left sheen so the body doesn't read as a flat cut-out.
    sheen = Image.new('L', (size, size), 0)
    ImageDraw.Draw(sheen).polygon([(PAD, PAD), (PAD, PAD + BASE * 0.5), (PAD + BASE * 0.42, PAD + BASE * 0.34)], fill=40)
    sheen = Image.composite(sheen.filter(ImageFilter.GaussianBlur(40)), Image.new('L', (size, size), 0), inner)
    light = Image.new('RGBA', (size, size), (255, 255, 255, 0)); light.putalpha(sheen)
    for layer in (white, navy, light):
        im = Image.alpha_composite(im, layer)
    return im

CURSOR = make_cursor()

@lru_cache(maxsize=256)
def cursor_sprite(height):
    """The cursor scaled so the arrow is `height` px tall, and where its tip sits inside the sprite."""
    k = height / BASE
    sprite = CURSOR.resize((max(1, round(CURSOR.width * k)), max(1, round(CURSOR.height * k))), Image.LANCZOS)
    return sprite, PAD * k

@lru_cache(maxsize=512)
def ring_sprite(radius, alpha):
    """A pink ring with a soft fill, supersampled for clean edges."""
    ss = 4; size = int((radius + 6) * 2 * ss); c = size / 2
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(im).ellipse([c - radius * ss, c - radius * ss, c + radius * ss, c + radius * ss],
                               fill=PINK + (int(alpha * 0.22),), outline=PINK + (alpha,), width=int(2.4 * ss))
    return im.resize((size // ss, size // ss), Image.LANCZOS)

if __name__ == '__main__':
    import sys
    bg = Image.open(sys.argv[1]).convert('RGBA')
    for i, h in enumerate((40, 56)):
        spr, tip = cursor_sprite(h)
        x, y = 700 + i * 300, 140
        if i:
            ring = ring_sprite(34, 200)
            bg.alpha_composite(ring, (round(x - ring.width / 2), round(y - ring.height / 2)))
        bg.alpha_composite(spr, (round(x - tip), round(y - tip)))
    bg.convert('RGB').save(sys.argv[2])
