# Balance Explorer capture

Records the videos in the Balance Explorer case study from the working prototype
in `~/Balance Explorer/variant-02`, and copies them into
`Balance Explorer/assets/screens/`. This folder isn't published with the site.

## How it works

1. **Record** (`record.js`, `rec_scene.js`): opens the prototype in a hidden
   Chrome window at 2x, clicks through it like a person would, and saves every
   frame with the cursor path, the clicks and the camera moves.
2. **Render** (`render.py`, `render_zoom.py`): turns those frames into a
   1920 × 1200 H.264 loop. It adds the zooms, draws the navy cursor and pink click
   rings (`cursor.py`), and fades the end back to the start.
3. **Copy**: `run.sh` copies each video, and a poster frame, into the case study.

## Use

Serve the prototype on port 4173 first (the "balance-explorer" preview), then:

```sh
./run.sh setup     # once: installs playwright-core, Pillow and ffmpeg locally
./run.sh table     # one video, or: tour, tabs, save, views, share, states
./run.sh all       # every video
```

| Step | Case study file | Shows |
| --- | --- | --- |
| `tour` | `explorer-tour.mp4` | The TLDR tour, the full window |
| `table` | `shot-table-detail` | Moving down the tree, the eye icon, opening Income |
| `tabs` | `shot-shape-detail` | The three settings tabs, then Apply |
| `save` | `shot-save-detail` | Opening a saved view, changing it, saving it |
| `views` | `shot-views-detail` | The view switcher, then All views |
| `share` | `shot-sharing-detail` | Share on a public view, then a private one |
| `states` | `shot-trust-states` | Loading, failed load, failed Apply, empty library |

The scenes live in `rec_scene.js`. Each is a short list of moves: where the
camera looks (`s.cam`) and what the cursor clicks (`s.clickOn`). Change a scene
there and re-run its step. If the prototype's markup changes, update the
selectors in the scene.

The `save` scene lifts the Save menu above the table header while recording,
because in the prototype it draws underneath.
