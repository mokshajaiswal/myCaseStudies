# IG case study

"Rebuilding IG's Global Design Foundation", moved from the Framer version
(`mokshadesigns.framer.website/casestudy3`) onto the shared `case-study-kit/`.
The copy in `content.js` is carried over word for word; the screens are the
Framer originals, converted to WebP.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell: hero (IG logo and stickers), progress bar, script and style order. |
| `content.js` | All copy, screens, timeline, navigation and the ending card. |
| `theme.css` | IG colours (brand red `#e61e1e`, white page, slate copy) and the red hero. |
| `sections.css` | IG's own components (below). |
| `script.js` | `renderCaseStudy()`: kit builders plus IG's own components. |
| `artwork-colors.json` | Recolours the kit's heading flower to IG red; the side flower and flower bed keep Turbo Hub's colours, as in Framer. |
| `assets/` | `hero/` stickers, `overview/` glimpses, `audit/` problem cards, `system/` component collage, `tokens/`, `pages/`, `before-after/`, and the recoloured flowers. |

## What comes from the kit and Turbo Hub

Section headings, body copy, the TL;DR, the role strip (four columns here),
the project timeline and its dialog, the annotation band with the side flower,
pull statements (design-question layout), the three-card row (`createTrio`,
used for the page-type framework), the screen grid (`createShotGrid`, used for
the problem cards), the boxed three-card row, number rows (`createStatRow`), pill tags (`createTagList`), pull statements (`createPullStatement`), the numbered info panel (design
challenges), the contact card, the results (`Turbo Hub/impact-future.js`) and
the Learning ending with the Turbo Hub card.

## IG's own components

- Hero stickers around the title.
- Device glimpse: the Framer tablet and phone card, whose screens slide through
  14 pages each (`assets/overview/tablet/`, `assets/overview/phone/`), with the
  tablet bezel over the phone and the side flower note turned on its edge.
- The brief, as a quote.
- Variant bars from the audit, with the "30 broken versions" call-out.
- Component fixes: problem and what I did per component group, with a tag.
- Before / Analysis / After viewer with a scrollable frame and zoom.
- Screen bands: each token group and page type in a full-width pink band, with
  the screens at their Framer positions in a 1440 × 541 stage and cropped at
  its bottom edge.

## Updating artwork

```bash
python3 case-study-kit/recolor-artwork.py "IG/artwork-colors.json"
```

The script also tries to write `assets/bg.webp` (it needs Pillow); IG's hero
doesn't use it.
