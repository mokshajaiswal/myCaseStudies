# Case study kit

Shared building blocks for the portfolio case studies. Turbo Hub and Balance
Explorer both load these files; each case study keeps only its own content,
colors, artwork and any sections unique to it.

## What is shared

| File | Purpose |
| --- | --- |
| `kit.css` | Spacing, type and layout tokens, fonts, scroll progress bar, hero, section headings, body copy, metadata strip, info panel, experience and outcome cards, artifact gallery, design question, timeline dialog, phone and screen frames, media slots and contact card. |
| `kit.js` | Builders for those components, the media-slot API (`CaseStudy.setMedia`), hero scroll depth, scroll progress, contact section, the Learning ending and `startCaseStudy()`. |
| `case-navigation.js` / `.css` | Floating reading navigation. Sections come from `caseStudy.navigation` (`sections` for the tray, `dial` for `?nav=3`). |
| `case-reveal.js` / `.css` | Scroll entrances and line reveals; `?reveal=0` turns them off. |
| `case-ending.css` / `closing-flowers.js` | Learning ending with the side flower, recap card, flower bed animation and wave. |
| `lottie/` | The vendored lottie-web light player (MIT) used by the flower bed. |
| `fonts/` | Helix and Larken, the weights the case studies use. |
| `recolor-artwork.py` | Recolors the Turbo Hub flowers and hero texture for another case study. |

## Starting a new case study

1. Create a folder next to `Turbo Hub` with `index.html`, `theme.css`,
   `content.js` and `script.js`. `Balance Explorer/` is the smallest example to copy.
2. In `index.html`, load `../case-study-kit/kit.css`, then `theme.css`, then the
   kit's navigation, ending and reveal styles. Load scripts in this order:
   `content.js`, `../case-study-kit/kit.js`, `script.js`, then the kit's
   `closing-flowers.js`, `case-navigation.js` and `case-reveal.js`.
3. `theme.css` defines every color token listed in `Balance Explorer/theme.css`
   and the artwork for `.asset-placeholder--icon`, `.design-question::before`
   and `.hero::after`. Keep artwork URLs in the theme file so they resolve from
   the case study folder.
4. `content.js` declares `const caseStudy` with `hero`, `navigation`, `ending`,
   `learning` and `contact`, plus whatever your sections need.
5. `script.js` defines `renderCaseStudy()` with the kit builders and ends with
   `startCaseStudy(renderCaseStudy);`.
6. Add an `artwork-colors.json` and run
   `python3 case-study-kit/recolor-artwork.py "<Folder>/artwork-colors.json"`
   to produce `assets/heading_flower.svg`, `assets/side-flower.svg`,
   `assets/bg.webp` and the closing flower files.
7. Add the folder to `CASE_STUDIES` in `scripts/build-pages.py` and to the
   paths in `.github/workflows/pages.yml`.

Images and other assets referenced from `content.js` resolve from the case
study's own page, so each case study keeps them in its own `assets/` folder.
The recap card and reading icons come from the Turbo Hub design system through
`../Turbo Hub/prototypes/shared/ds.js`; the Pages build rewrites sibling folder
paths to their published names.

## Changing shared parts

A change here affects every case study. Turbo Hub tests that cover the
navigation and reveals live in `Turbo Hub/tests/`; run them with
`node --test "Turbo Hub/tests/"`. Browser review is manual.
