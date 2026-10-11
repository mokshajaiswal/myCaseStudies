"""Package the research archive and Turbo Hub for GitHub Pages."""
from pathlib import Path
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "_site"
if OUTPUT == ROOT or ROOT in OUTPUT.parents and OUTPUT != ROOT / "_site":
    raise SystemExit("Use _site or an output directory outside the repository")
OUTPUT.mkdir(parents=True, exist_ok=True)
tracked = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT).decode().split("\0")
count = 0
for name in tracked:
    source = Path(name)
    parts = source.parts
    if not parts:
        continue
    if parts[0] == "docs":
        relative = Path(*parts[1:])
    elif parts[0] == "Turbo Hub":
        if any(part in {"tests", "specimens", "decisions", "flow-reference"} for part in parts[1:]):
            continue
        if source.suffix.lower() in {".md", ".cjs"} or source.name == ".DS_Store":
            continue
        relative = Path("turbo-hub", *parts[1:])
    else:
        continue
    original = ROOT / source
    if original.is_symlink():
        raise SystemExit(f"Cannot publish symlink: {source}")
    destination = OUTPUT / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    if source.suffix == ".html":
        # Studio inspector scripts are local development tools.
        html = re.sub(r'<script\b[^>]*src=["\']/framework/[^"\']+["\'][^>]*>\s*</script>', "", original.read_text())
        destination.write_text(html)
    else:
        shutil.copyfile(original, destination)
    count += 1
(OUTPUT / ".nojekyll").touch()
for required in ["index.html", "turbo-hub/index.html", "turbo-hub/app-design-system/tokens.css", "turbo-hub/prototypes/shared/ds.js"]:
    if not (OUTPUT / required).is_file():
        raise SystemExit(f"Missing published entry: {required}")
print(f"Packaged {count} files into {OUTPUT}")
