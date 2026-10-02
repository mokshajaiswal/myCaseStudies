# Turbo Hub onboarding

Three carousel screens, distilled from the introduction and Family Hub screens in the Figma Handoffs file (nodes `2031:6089` and `2031:6171`). Content progresses from shared family money to manager controls to independent payments. The visual direction is a redesign, not a pixel-for-pixel recreation.

Open `preview.html` for the existing case-study phone casing, or `index.html` for the bare embeddable app. No build, dependencies, external fonts, or backend. Serve the repository with any static server, or open the HTML directly.

## Embed

Use the case study’s existing media API after it initializes:

```js
CaseStudy.setMedia('phone-overview', {
  type: 'iframe',
  src: './prototypes/onboarding/index.html',
  title: 'Turbo Hub onboarding',
});
```

Or use an iframe with a portrait viewport (recommended 390 × 780; minimum 260 × 480):

```html
<iframe src="./prototypes/onboarding/index.html"
  title="Turbo Hub onboarding"
  style="width:390px;max-width:100%;height:780px;border:0"></iframe>
```

The prototype does not automatically replace a case-study media slot. All application assets and fonts are local in `assets/`; `preview.html` alone references the existing repository phone casing.

## Interactions

- Continue, top-left pagination dots, horizontal swipe, and left/right arrow keys. No back button or visible slide counter.
- Every slide has a short headline and copy above one simple illustration, with the centered CTA at the bottom. Soft blue surfaces and blue buttons match the case-study palette; headline lines share the same size and weight, and indicator shapes have equal 6px gaps. No simulated UI widgets or interaction instructions.
- The final CTA opens a completion state with a link to the Create Hub prototype and a replay action. No real account is created. The top logo, skip action, and numbered section labels are omitted; top spacing is retained for the device cutout.
- Completion dispatches `turbo:onboarding-complete` on the iframe window, with `detail.reason` of `completed`. When served over HTTP, it also posts `{ type: 'turbo:onboarding-complete', reason }` to a same-origin parent. Validate `event.origin` and `event.source` before consuming it.
- No autoplay. Reduced motion disables all entrance and control animations. Inactive slides are hidden and inert; slide changes are announced politely.

Typography uses copies of the project’s Helix regular, semibold, and bold fonts. All three illustrations are generated transparent PNGs: `assets/family-home-blue.png`, `assets/shared-wallet-blue.png`, and `assets/everyday-payments-blue.png`.

The built-in image-generation tool was used; prompts are saved in `assets/simple-illustration-prompts.md`. The earlier unused family artwork is retained locally.

## Verification

The original layout was browser-checked at 390 × 780 and 260 × 480, plus the desktop device preview, including pagination, swipe, arrow keys, completion, and replay. Subsequent simplification removed the back button, visible counter, and interactive spending slider. Reduced-motion behavior is defined in CSS; no autoplay timers are used.
