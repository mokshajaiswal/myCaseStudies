"""Editable native Tesseract motion study. Rebuild actions after importing assets."""
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / '.tesseract-work'
doc = json.loads((WORK / 'editable.json').read_text())
doc['dimensions'] = {'width': 1920, 'height': 1080}
doc['duration'] = 10
doc['composition']['name'] = 'Make your next move — 10 second motion study'
doc.pop('backgroundColor', None)
doc['composition']['layers'] = []
for i, (asset, start, duration, gain) in enumerate([
    ('pop', 180, 220, 1.1), ('pop', 2750, 220, .8),
    ('whoosh', 5150, 600, 1.0), ('impact', 5780, 800, 1.25),
    ('pop', 6280, 220, .65),
]):
    r = {'start': start, 'duration': duration}
    doc['composition']['layers'].append({
        'type': 'Audio', 'id': 900 + i, 'name': f'{asset} at {start} ms',
        'source': {'assetId': asset}, 'sourceRange': {'start': 0, 'duration': duration},
        'sourceIntrinsicDuration': duration, 'volume': gain, 'captionsEnabled': False,
        'playback': {'type': 'windowed', 'inputRange': r,
                     'mapping': {'type': 'linear', 'input': r,
                                 'output': {'start': 0, 'duration': duration}}, 'inputOffsetMs': 0},
    })
(WORK / 'editable.json').write_text(json.dumps(doc, indent=2))

A = []
LIME = [.78, .97, .25, 1]
WHITE = [.94, .94, .88, 1]
DARK = [.055, .063, .055, 1]
MUTED = [.5, .54, .49, 1]
counter = 0

def transform(x, y, anchor=(0, 0), rotation=0):
    return {'anchorPoint': list(anchor), 'position': [x, y], 'scale': [100, 100],
            'rotation': rotation, 'opacity': 100}

def base(kind, name, start, end, tr):
    global counter
    counter += 1
    item = {'type': kind, 'compositionId': 'main', 'layerId': counter,
            'name': name, 'insertIndex': 0, 'activeRange': {'start': start, 'duration': end-start},
            'transform': tr}
    A.append(item)
    return counter, item

def rect(name, x, y, w, h, color, start=0, end=10000, roundness=0, center=False, angle=0):
    n, item = base('createFxRectLayer', name, start, end,
                   transform(x, y, (w/2, h/2) if center else (0, 0), angle))
    item['rect'] = {'size': [w, h], 'fillColor': color, 'roundness': roundness}
    return n

def text(words, x, y, size, color=WHITE, start=0, end=10000, weight='Bold', tracking=-30):
    n, item = base('createFxTextLayer', words, start, end, transform(x, y))
    item['sourceText'] = {'text': words, 'fontFamily': 'Space Grotesk Light', 'fontStyle': weight,
                          'fontSize': size, 'fillColor': color, 'strokeWidth': 0,
                          'justification': 'left', 'tracking': tracking}
    return n

def keys(n, prop, values, linear=False):
    A.append({'type': 'setFxPropertyKeyframes', 'compositionId': 'main',
              'property': {'layerId': n, 'propertyType': prop}, 'keyframes': [
                  {'id': f'{n}-{prop}-{i}', 'layerTime': t,
                   'value': {'type': 'float', 'value': v},
                   'easing': {'type': 'linear'} if linear else
                             {'type': 'cubicBezier', 'x1': .16, 'y1': 1, 'x2': .3, 'y2': 1}}
                  for i, (t, v) in enumerate(values)]})

def enter(n, y, duration, delay=0, out=True):
    keys(n, 'positionY', [(0, y+80), (delay+500, y), (duration-260, y), (duration, y-55)] if out
         else [(0, y+80), (delay+550, y)])
    keys(n, 'opacity', [(0, 0), (delay+250, 100), (duration-220, 100), (duration, 0)] if out
         else [(0, 0), (delay+300, 100)])

# Editorial frame and quiet progress indicator.
rect('Editable dark canvas background', 0, 0, 1920, 1080, DARK)
text('MOTION / 001', 140, 105, 25, MUTED, end=5800, weight='Medium', tracking=90)
text('TEN SECONDS. ONE IDEA.', 1360, 105, 23, MUTED, end=5800, weight='Medium', tracking=50)
rect('Dark progress rail', 140, 970, 1640, 2, [.16, .18, .15, 1], end=5800)
p = rect('Time made visible', 140, 970, 1640, 3, LIME, end=5800)
keys(p, 'scaleX', [(0, 0), (10000, 100)], linear=True)
text('A STUDY IN MOMENTUM', 140, 1020, 22, MUTED, end=5800, weight='Medium', tracking=100)

# Beat 1: a modest dot and one large typographic gesture.
n = text('ONE SMALL', 140, 370, 108, start=100, end=2700)
enter(n, 370, 2600)
n = text('MOVE.', 123, 650, 290, start=240, end=2700)
enter(n, 650, 2460)
dot = rect('One small move — dot', 1480, 500, 138, 138, LIME, 0, 2800, 69, True)
keys(dot, 'scaleX', [(0, 0), (300, 120), (650, 100), (2200, 100), (2800, 45)])
keys(dot, 'scaleY', [(0, 0), (300, 120), (650, 100), (2200, 100), (2800, 45)])
keys(dot, 'positionX', [(0, 1380), (600, 1480), (1800, 1520), (2800, 1570)])
keys(dot, 'positionY', [(0, 560), (600, 500), (1800, 490), (2800, 540)])
u = rect('Move underline', 140, 720, 780, 11, LIME, 600, 2700)
keys(u, 'scaleX', [(0, 0), (550, 100), (1800, 100), (2100, 0)])

# Beat 2: the dot becomes a radial burst. Related rays share the same rhythm.
for i in range(12):
    angle = i*30
    rad = math.radians(angle)
    x, y = 1550+190*math.cos(rad), 530+190*math.sin(rad)
    ray = rect(f'Energy ray {i+1}', x, y, 112, 25, LIME, 2700, 5750, 12.5, True, angle)
    keys(ray, 'positionX', [(0, 1550), (650, x), (2300, x+15*math.cos(rad)), (3050, x+130*math.cos(rad))])
    keys(ray, 'positionY', [(0, 530), (650, y), (2300, y+15*math.sin(rad)), (3050, y+130*math.sin(rad))])
    keys(ray, 'scaleX', [(0, 0), (400+i*15, 100), (2500, 100), (3050, 0)])
    keys(ray, 'opacity', [(0, 0), (220+i*12, 100), (2800, 100), (3050, 0)])
n = text('CAN CHANGE', 140, 370, 108, start=2700, end=5600)
enter(n, 370, 2900)
n = text('EVERYTHING.', 133, 595, 166, start=2850, end=5600)
enter(n, 595, 2750)
text('Momentum begins with you.', 145, 720, 35, MUTED, 3300, 5500, 'Medium', 0)

# Carry the accent forward into an expanding circular color wipe.
wipe = rect('Dot expands into the final canvas', 1550, 530, 240, 240, LIME, 5350, 10000, 120, True)
keys(wipe, 'scaleX', [(0, 0), (650, 1850)])
keys(wipe, 'scaleY', [(0, 0), (650, 1850)])

# Final payoff, with generous reading time and a restrained rotating asterisk.
text('MOTION / 001', 140, 105, 25, DARK, 6050, 10000, 'Medium', 90)
text('MAKE SOMETHING HAPPEN.', 1300, 105, 23, DARK, 6050, 10000, 'Medium', 50)
n = text('MAKE YOUR', 140, 370, 112, DARK, 6050, 10000)
enter(n, 370, 3950, out=False)
n = text('NEXT MOVE.', 130, 625, 214, DARK, 6200, 10000)
enter(n, 625, 3800, out=False)
n = text('Start small. Go somewhere.', 145, 755, 36, DARK, 6700, 10000, 'Medium', 0)
enter(n, 755, 3300, out=False)
for i in range(8):
    angle = i*45
    rad = math.radians(angle)
    ray = rect(f'Final asterisk arm {i+1}', 1580, 525, 140, 34, DARK, 6200, 10000, 17, True, angle)
    # Set the pivot outside each bar so the collective shape rotates as one.
    A[-1]['transform']['anchorPoint'] = [-55, 17]
    keys(ray, 'rotation', [(0, angle-90), (650, angle), (3800, angle+26)])
    keys(ray, 'scaleX', [(0, 0), (600+i*12, 100)])
    keys(ray, 'scaleY', [(0, 0), (600+i*12, 100)])
rect('Final progress rail', 140, 970, 1640, 2, [.47, .61, .15, 1], 6000)
p = rect('Final progress', 140, 970, 1640, 3, DARK, 6000)
keys(p, 'scaleX', [(0, 60), (4000, 100)], linear=True)
text('LESS WAITING. MORE MAKING.', 140, 1020, 22, DARK, 6050, 10000, 'Medium', 90)
text('01 / 01', 1670, 1020, 22, DARK, 6050, 10000, 'Medium', 30)

(WORK / 'actions.json').write_text(json.dumps(A, indent=2))
print(f'Authored {counter} visual layers, {len(A)-counter} animation tracks, and 5 audio layers.')
