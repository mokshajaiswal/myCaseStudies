# Turbo Hub card hover video

A Remotion project for the muted loop that plays when someone hovers the Turbo Hub case study card
(`TurboCaseStudyCard` variant 1). It renders to `Turbo Hub/assets/case-cards/turbo-hub-card.mp4`.

632 × 672 (2× the card's visual panel), 30 fps, 7 seconds. The analytics mock builds itself section by
section, then key cards lift forward. The first and last frames are pixel-identical to the card's still phone,
so hover blends in and the loop is seamless.

| Frames | What happens |
| --- | --- |
| 0–8 | The card's still phone |
| 8–30 | Sections drop away bottom-first; the phone tips back in 3D |
| 34–110 | Header, Hub identity, limit card, tabs, chart (drawn left to right) and Top Spenders rise in one after another |
| 96–190 | Limit card, Insights chip, chart tooltip and Top Spenders lift forward in turn; the phone settles flat |
| 190–210 | Still phone again |

```sh
npm install
npm run studio   # scrub the timeline in Remotion Studio
npm run render   # writes the MP4 the card uses
```

Edit `BANDS` (slices of the mock in its 1x Figma pixels, with reset and reveal frames) and `POPS` (parts that
lift) in `src/TurboHubCard.jsx`. After rendering, bump the `?v=` on the card's default video URL in
`case-study-card.js` so browsers fetch the new file.
