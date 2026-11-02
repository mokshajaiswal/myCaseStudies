# Balance Explorer case study

Portfolio case study for Balance Explorer, a module built from scratch for
Zeta's Finance Center and shipped to HDFC Bank. It is built on the shared
[`case-study-kit`](../case-study-kit/README.md). Open `index.html` through a
local static server from the repository root so the `../case-study-kit/` and
`../Turbo Hub/` paths resolve. It publishes to `balance-explorer/` on GitHub Pages.

The copy follows the case study script in Claude Docs ("Balance Explorer — Case
Study Script"). The prototype the screens come from lives outside this
repository in `~/Balance Explorer/variant-02`.

## Files

| File | Purpose |
| --- | --- |
| `content.js` | All copy, the screen slots (`shots`), section navigation and ending artwork paths. |
| `script.js` | Section order and composition using the kit builders, plus the screen slots. |
| `sections.css` | This case study's own pieces: decision labels, story beats, screen captions, the browser mockup, the personas' closing line and the 2 × 2 impact grid. |
| `theme.css` | Turbo Hub's page colours (cream page, blue accent, pink secondary and ending wave), plus the Finance Center navy for the TLDR, the progress bar and the hero. Section headings use Turbo Hub's `#34383f`. |
| `artwork-colors.json` | Unused for now: the old flower recolour mapping for `case-study-kit/recolor-artwork.py`. |
| `assets/` | Turbo Hub's own heading flower, side flower and closing flower bed (copied as they are), the Finance Center logo and the screens. |

## Page order

Hero → TLDR (explorer loop in a browser mockup; its caption notes it was built with
Zeta's Galaxy Design System) → Context (two paragraphs, then a four-step flow following
one card payment) → Problem (a short paragraph, three costs as plain columns, then the
category/role/team strip) → Who it's for (an intro on the stakeholder interviews, then the four
personas and their questions) → design question → Where it started (an earlier version of the screen, from
`~/Downloads/EXPLORER.png`) → four decisions → Loading, errors and empty states → Impact (Turbo Hub's
`impact-future.js` component with Balance Explorer's numbers, recoloured navy and
purple in `sections.css`, without the table) → contact →
Learnings (one paragraph) and the ending.

Each decision is titled as the user's question, with a short setup and three
story beats in a row (what I did, with why under it). Its close-up loops follow
on the page (the full window appears only in the TLDR), with no stages or cards, then "Other
directions I tried", one sentence each. Loading, errors and empty states uses the same rhythm.

## Screens

Every screen is a `shot` in `content.js` with an `id`, a `kind` and a caption.
Add `src` (a still, or a loop's poster), `width` and `height`; add `video` for a
loop. Loops play muted, only while on screen, and wait on the poster when
reduced motion is on. In a grid, `wide: true` takes the whole row and `span: 2`
or `span: 4` takes a third or two thirds; `narrow: true` centres a very tall still at a
smaller width; `bare: true` is for composites that
already carry their own corners and shadows on a transparent background. A shot
without a file shows as an empty slot. `frame: "browser"` (the TLDR shot) puts it
inside the browser-window mockup.

All screens are in `assets/screens/`, captured from the prototype in
`~/Balance Explorer/variant-02` at 2x. Loops are 1920 × 1200 and show the whole app
window, with the navy cursor and pink click rings, and fade back to their first frame.
Every screen sits in a plain browser window (a thin border, no shadow). The
zoomed loops use the same camera, cursor and click rings as the TLDR tour.

| Slot | Section | Kind |
| --- | --- | --- |
| `shot-hero` | TLDR | Loop `explorer-tour.mp4`, the full window, poster `explorer.webp` |
| `shot-earlier` | Where it started | Still, `earlier-version.webp` (iPad frame) |
| `shot-table-detail` | The table | Close-up loop |
| `shot-shape-detail` | The settings panel | Close-up loop |
| `shot-save-detail` | Saved views | Close-up loop |
| `shot-views-detail` | Saved views | Close-up loop |
| `shot-sharing-detail` | Sharing | Close-up loop |
| `shot-trust-states` | Loading, errors and empty states | Loop of four states |

There are no real images of the early table and panel explorations, so the
case study describes them in "What I tried first" instead of showing them.

## Still to do

- Check each impact figure against its source before publishing.
- The hero is a light pink-and-periwinkle gradient over a faint ledger grid, in the colours of the Finance Center logo
  (`assets/Center_logos.svg`), defined in `theme.css`. `assets/bg.webp` (Turbo
  Hub's texture, recolored) is no longer used by the page.
- The recap card at the end links to the Turbo Hub case study.
- The flowers are Turbo Hub's originals. Running `case-study-kit/recolor-artwork.py` with
  `artwork-colors.json` would recolour them again, so leave it unless that is wanted.
