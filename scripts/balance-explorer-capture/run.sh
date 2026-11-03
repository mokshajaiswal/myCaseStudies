#!/bin/sh
# Re-records the Balance Explorer case study's videos from the prototype and copies them into the case study.
# Needs the case study served at http://localhost:8000 (the "case-studies" preview), so its copy of the
# prototype is at /Balance Explorer/prototype/, and Google Chrome installed.
# Usage: ./run.sh setup | tour | table | tabs | save | views | share | states | all
set -e
cd "$(dirname "$0")"
SCREENS="../../Balance Explorer/assets/screens"
PY=.venv/bin/python
ffmpeg() { $PY -c "import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())"; }

# A close-up: record, render, then use the frame at 3.2 s (already zoomed in) as the poster.
closeup() {
  node rec_scene.js "$1"
  mkdir -p out
  $PY render_zoom.py "$(ffmpeg)" "$1" "out/$1.mp4" "out/$1.webp"
  cp "out/$1.mp4" "$SCREENS/$2.mp4"
  "$(ffmpeg)" -loglevel error -y -ss 3.2 -i "out/$1.mp4" -frames:v 1 out/poster.png
  $PY -c "from PIL import Image; Image.open('out/poster.png').save('$SCREENS/$2.webp', quality=86)"
  echo "$1 -> $SCREENS/$2.mp4"
}

case "$1" in
  setup)
    npm install
    python3 -m venv .venv
    $PY -m pip install -q -r requirements.txt ;;
  tour)
    node record.js
    mkdir -p out
    $PY render.py "$(ffmpeg)" out/explorer-tour.mp4
    cp out/explorer-tour.mp4 "$SCREENS/explorer-tour.mp4" ;;
  table) closeup table shot-table-detail ;;
  tabs) closeup tabs shot-shape-detail ;;
  save) closeup save shot-save-detail ;;
  views) closeup views shot-views-detail ;;
  share) closeup share shot-sharing-detail ;;
  states)
    mkdir -p out
    for s in state-loading state-error state-apply state-empty; do
      node rec_scene.js $s
      $PY render_zoom.py "$(ffmpeg)" $s out/$s.mp4 out/$s.webp nofade
    done
    $PY join_states.py "$(ffmpeg)" out/states.mp4
    cp out/states.mp4 "$SCREENS/shot-trust-states.mp4"
    cp out/state-loading.webp "$SCREENS/shot-trust-states-poster.webp" ;;
  all)
    for step in tour table tabs save views share states; do "$0" $step; done ;;
  *)
    echo "Usage: ./run.sh setup | tour | table | tabs | save | views | share | states | all"; exit 1 ;;
esac
