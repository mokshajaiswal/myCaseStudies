"""Package the research archive, the case studies and their shared kit for GitHub Pages."""
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
# Local folder -> published folder. Sibling paths such as "../Turbo Hub/" are rewritten to match.
CASE_STUDIES = {"Turbo Hub": "turbo-hub", "Balance Explorer": "balance-explorer", "case-study-kit": "case-study-kit"}
tracked = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT).decode().split("\0")
count = 0
for name in tracked:
    source = Path(name)
    parts = source.parts
    if not parts:
        continue
    if parts[0] == "docs":
        relative = Path(*parts[1:])
    elif parts[0] in CASE_STUDIES:
        if any(part in {"tests", "specimens", "decisions", "flow-reference"} for part in parts[1:]):
            continue
        if source.suffix.lower() in {".md", ".cjs", ".py"} or source.name in {".DS_Store", "artwork-colors.json"}:
            continue
        relative = Path(CASE_STUDIES[parts[0]], *parts[1:])
    else:
        continue
    original = ROOT / source
    if original.is_symlink():
        raise SystemExit(f"Cannot publish symlink: {source}")
    destination = OUTPUT / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    rewrite = parts[0] in CASE_STUDIES and source.suffix in {".html", ".js", ".css"}
    if source.suffix == ".html" or rewrite:
        text = original.read_text()
        if source.suffix == ".html":
            # Studio inspector scripts are local development tools.
            text = re.sub(r'<script\b[^>]*src=["\']/framework/[^"\']+["\'][^>]*>\s*</script>', "", text)
        if rewrite:
            for folder, published in CASE_STUDIES.items():
                text = text.replace(f"../{folder}/", f"../{published}/")
        destination.write_text(text)
    else:
        shutil.copyfile(original, destination)
    count += 1
(OUTPUT / ".nojekyll").touch()
for required in ["index.html", "turbo-hub/index.html", "turbo-hub/app-design-system/tokens.css", "turbo-hub/prototypes/shared/ds.js",
                 "balance-explorer/index.html", "case-study-kit/kit.css", "case-study-kit/lottie/lottie-light.min.js"]:
    if not (OUTPUT / required).is_file():
        raise SystemExit(f"Missing published entry: {required}")
print(f"Packaged {count} files into {OUTPUT}")
