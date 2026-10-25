"""Recolor the Turbo Hub flower and hero artwork for another case study.

Usage: python3 case-study-kit/recolor-artwork.py "Balance Explorer/artwork-colors.json"

The JSON file sits in the case study folder and maps each source color family to a
new color. Shades within a family keep their offset from the family color, so pale
fading blooms stay pale. Colors that match no family (green stems, white) are kept.
Outputs go to the case study's assets/ folder; the Turbo Hub sources are unchanged.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Turbo Hub" / "assets"
# Closest-family matching stops here so unrelated colors are left alone.
FAMILY_DISTANCE = 48

config_path = Path(sys.argv[1]).resolve()
config = json.loads(config_path.read_text())
target = config_path.parent / "assets"


def hex_rgb(value):
    value = value.lstrip("#")
    return tuple(int(value[i:i + 2], 16) for i in (0, 2, 4))


families = [(hex_rgb(source), hex_rgb(replacement)) for source, replacement in config["colors"].items()]


def recolor(rgb):
    best = min(families, key=lambda family: sum((a - b) ** 2 for a, b in zip(rgb, family[0])))
    if sum((a - b) ** 2 for a, b in zip(rgb, best[0])) ** 0.5 > FAMILY_DISTANCE:
        return rgb
    return tuple(max(0, min(255, round(t + (c - s)))) for c, s, t in zip(rgb, best[0], best[1]))


def recolor_svg(text):
    def hex_match(match):
        r, g, b = recolor(hex_rgb(match.group(0)))
        return f"#{r:02X}{g:02X}{b:02X}"

    def rgb_match(match):
        r, g, b = recolor(tuple(int(v) for v in match.groups()))
        return f"rgb({r},{g},{b})"

    text = re.sub(r"#[0-9a-fA-F]{6}\b", hex_match, text)
    return re.sub(r"rgb\((\d+),\s*(\d+),\s*(\d+)\)", rgb_match, text)


def recolor_lottie(value):
    if isinstance(value, dict):
        color = value.get("c", {}).get("k") if value.get("ty") in ("fl", "st") else None
        if isinstance(color, list) and len(color) >= 3 and all(isinstance(v, (int, float)) for v in color):
            rgb = recolor(tuple(round(v * 255) for v in color[:3]))
            value["c"]["k"] = [round(v / 255, 4) for v in rgb] + color[3:]
        for child in value.values():
            recolor_lottie(child)
    elif isinstance(value, list):
        for child in value:
            recolor_lottie(child)


def shift_hue(source, destination, degrees):
    """Rotate hue with the CSS hue-rotate() matrix, which avoids 8-bit HSV banding."""
    from math import cos, radians, sin

    from PIL import Image

    c, s = cos(radians(degrees)), sin(radians(degrees))
    matrix = (
        0.213 + c * 0.787 - s * 0.213, 0.715 - c * 0.715 - s * 0.715, 0.072 - c * 0.072 + s * 0.928, 0,
        0.213 - c * 0.213 + s * 0.143, 0.715 + c * 0.285 + s * 0.140, 0.072 - c * 0.072 - s * 0.283, 0,
        0.213 - c * 0.213 - s * 0.787, 0.715 - c * 0.715 + s * 0.715, 0.072 + c * 0.928 + s * 0.072, 0,
    )
    image = Image.open(source).convert("RGBA")
    rotated = image.convert("RGB").convert("RGB", matrix)
    rotated.putalpha(image.getchannel("A"))
    rotated.save(destination, "WEBP", quality=92)


(target / "closing").mkdir(parents=True, exist_ok=True)
for source, name in [("heading_flower.svg", "heading_flower.svg"), ("side purple flower.svg", "side-flower.svg"),
                     ("closing/flowers-still.svg", "closing/flowers-still.svg")]:
    (target / name).write_text(recolor_svg((SOURCE / source).read_text()))

flowers = json.loads((SOURCE / "closing" / "looped-flowers.json").read_text())
recolor_lottie(flowers)
(target / "closing" / "looped-flowers.js").write_text(
    "window.CaseStudyClosingFlowers = " + json.dumps(flowers, separators=(",", ":")) + ";\n")

shift_hue(SOURCE / "bg.webp", target / "bg.webp", config.get("heroHueShift", 0))
print(f"Recolored artwork written to {target.relative_to(ROOT)}")
