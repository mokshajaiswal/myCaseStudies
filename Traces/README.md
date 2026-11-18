# Traces case study

"Traces", my AR thesis, moved from the Framer version
(`mokshadesignss.framer.website/casestudy4`) onto the shared `case-study-kit/`.
The copy in `content.js` is carried over from Framer with spelling slips
corrected; the images are the Framer originals converted to WebP, and the four
videos are the Framer videos without sound (two re-encoded smaller).

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell: hero (logo, faint Traces mark, trace icons), progress bar, script and style order. |
| `content.js` | All copy, screens, videos, timeline, navigation and the ending card. In paragraphs, `*italic*`, `**bold**` and `***bold italic***` follow Framer's emphasis. |
| `theme.css` | Turbo Hub's cream and pink with the Traces navy hero and pink heading flower and progress bar. |
| `sections.css` | Traces' own components (below). |
| `script.js` | `renderCaseStudy()`: kit builders plus Traces' own components. |
| `artwork-colors.json` | Recolours the kit's heading flower to the Traces pink; the side flower and flower bed keep Turbo Hub's colours. |
| `assets/` | `hero/`, `overview/`, `research/`, `process/`, `idea/`, `flows/`, `designs/`, `impact/`, `videos/` (with posters), the kit phone frame and the recoloured flowers. |

## What comes from the kit

Section headings, copy, the TL;DR, the four-column role strip, pill tags,
the kit phone (playing the walkthrough, the first WebXR trial and the friends
video), the annotation band with the side flower (three times, as in Framer),
the contact card, the project timeline, the boxed three-card row (the three
gaps), number rows, pull statements, the screen grid (the home screens and the
research collage), the scroll reveal and the Learning ending with the IG card.

## Traces' own components

- Rich paragraphs with Framer's bold and italic emphasis.
- The survey sum: 88% + 64% + 66% = confidence.
- Insight cards with their design implications, and the guiding philosophy card.
- The design process diagram and its two tracks on lined paper.
- The sketch board with the first WebXR trial phone.
- Flow strips that scroll sideways.
- Four columns of finished designs drifting upwards.
- The presentation video, the example phone and scenarios.
- The impact board: photos and quotes from testing around one statement.

## Updating artwork

```bash
python3 case-study-kit/recolor-artwork.py "Traces/artwork-colors.json"
```

The script also tries to write `assets/bg.webp` (it needs Pillow); Traces'
hero doesn't use it.
