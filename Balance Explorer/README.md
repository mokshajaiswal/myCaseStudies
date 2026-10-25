# Balance Explorer case study

Portfolio case study for the Balance Explorer redesign, built on the shared
[`case-study-kit`](../case-study-kit/README.md). Open `index.html` through a
local static server from the repository root so the `../case-study-kit/` and
`../Turbo Hub/` paths resolve. It publishes to `balance-explorer/` on GitHub Pages.

The prototype itself lives outside this repository in `~/Balance Explorer`.

## Files

| File | Purpose |
| --- | --- |
| `content.js` | All copy, section navigation and ending artwork paths. |
| `theme.css` | Colors from the prototype's palette (violet-blue accent `#555feb`, teal secondary) and theme artwork. |
| `script.js` | Section order and composition using the kit builders. |
| `artwork-colors.json` | Flower and hero color mapping for `case-study-kit/recolor-artwork.py`. |
| `assets/` | Recolored heading flower, side flower, hero texture and closing flower bed. |

## Still to do

- Replace every "Placeholder" in `content.js`: role, team, timeline,
  problem, success measures, research needs, design rationale, learning and the
  side-flower note. The product facts come from the prototype's `PRODUCT.md`.
- Add screenshots to the two screen slots, `overview-screen` and
  `workbench-screen`, for example by setting their media in `script.js` after
  `startCaseStudy()` with `CaseStudy.setMedia("overview-screen", { type: "image", src: "assets/overview.png", alt: "…" })`.
- The hero texture is Turbo Hub's background shifted toward violet, so it
  still shows the faint lightning-bolt shapes. Swap `assets/bg.webp` for
  Balance Explorer artwork if you prefer.
- The recap card at the end links to the Turbo Hub case study.
- To change flower colors, edit `artwork-colors.json` and rerun
  `python3 case-study-kit/recolor-artwork.py "Balance Explorer/artwork-colors.json"`.
