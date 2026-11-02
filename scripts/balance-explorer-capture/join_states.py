"""Joins the four state clips (loading, failed load, failed Apply, empty library) with short crossfades.
Usage: join_states.py <ffmpeg> <out.mp4>"""
import re, subprocess, sys

FFMPEG, OUT = sys.argv[1:3]
CLIPS = ['out/state-loading.mp4', 'out/state-error.mp4', 'out/state-apply.mp4', 'out/state-empty.mp4']
FADE = 0.5

def duration(path):
    info = subprocess.run([FFMPEG, '-i', path], capture_output=True, text=True).stderr
    h, m, s = re.search(r'Duration: (\d+):(\d+):([\d.]+)', info).groups()
    return int(h) * 3600 + int(m) * 60 + float(s)

parts, previous, offset = [], '[0:v]', 0.0
for i in range(1, len(CLIPS)):
    offset += duration(CLIPS[i - 1]) - FADE
    parts.append(f'{previous}[{i}:v]xfade=transition=fade:duration={FADE}:offset={offset:.3f}[v{i}]')
    previous = f'[v{i}]'
graph = ';'.join(parts) + f';{previous}format=yuv420p[out]'
inputs = [arg for clip in CLIPS for arg in ('-i', clip)]
subprocess.run([FFMPEG, '-loglevel', 'error', '-y', *inputs, '-filter_complex', graph, '-map', '[out]',
                '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-movflags', '+faststart', OUT], check=True)
print('joined', OUT)
