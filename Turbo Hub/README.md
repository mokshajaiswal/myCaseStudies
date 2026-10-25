# Turbo Hub case study

Public case study: https://mokshajaiswal.github.io/myCaseStudies/turbo-hub/

GitHub Pages publishes changes from `main` through `.github/workflows/pages.yml`.
`scripts/build-pages.py` retains the existing research archive at the site root
and packages this case study under `turbo-hub/`, excluding development inspector
scripts and project notes. Build locally with `python3 scripts/build-pages.py`.

The final `#learning` section includes Turbo Hub reflections, a flower divider, a recap card and a pink wave at the end of the page. The wave scrolls with the footer. The decorative `#closing-illustration` slot plays the supplied `assets/closing/looped-flowers.json` behind the wave. `../case-study-kit/closing-flowers.js` loads the shared Lottie player near the section and pauses offscreen or in hidden tabs; reduced motion shows a still frame. Closing layout lives in `../case-study-kit/case-ending.css`. Browser review remains manual.

This repository contains a single-page product-design case study for Turbo Hub, a family-payments concept created within PayZapp. It is a custom static site built with plain HTML, CSS, and JavaScript—there is no framework, build step, package manager, or backend.

Open `index.html` directly or serve this folder with any static server.

Open [tokens.html](tokens.html) for the visual token reference: six live typography samples, the spacing scale, semantic gap diagrams (including subgroup spacing, section breaks, and the editorial pause), and a searchable inventory of every shared root token. It loads the same `styles.css` as the case study and updates measurements when the viewport changes.

## AI/LLM handoff: start here

Treat this README as the project briefing and `design.md` as the detailed design specification. A new chat should not scan the entire codebase before making a focused change.

When beginning work:

1. Read this README completely.
2. Read only the relevant sections of `design.md` for the requested area.
3. Inspect the specific implementation files and components involved.
4. Preserve the established visual language and previously approved decisions unless the user explicitly changes them.
5. Implement the requested change, verify it proportionally, and update the documentation contract below.

Do not introduce a framework or dependency for behavior that the existing HTML, CSS, and JavaScript can express. Do not reintroduce removed navigation, footer content, decorative trapezoids, dark mode, or generic template sections.

## Current page structure

After the blue rounded hero using `assets/bg.webp`, the page renders these areas in order:

1. TL;DR copy.
2. Three-phone media stage with replaceable screen content.
3. “What exactly is Turbo Hub?” copy.
4. Centered role and team metadata.
5. Business-opportunity copy.
6. Three open business-goal rows with aligned numbers, titles, descriptions, and subtle horizontal dividers.
7. A standalone closing phone with a viewport-edge annotation graphic.
8. Pink contact card.
9. Interactive project-timeline box.
10. Technology-opportunity copy and three success measures using compact stacked rounded cards aligned to the narrative width. The former proposition-outcome heading and cards are no longer rendered. Four research-need cards reuse the manager/member card style after the persona text.
11. Four early product-thinking sketches (`TB1.svg` through `TB4.svg`) follow the relationship section.
12. The former proposition-outcome section is removed.
13. Success measures now appear within the technology-opportunity section.
14. A left-aligned interview-context heading and audience line, a side-by-side interview introduction and overlapping colored quote-card carousel, a research bridge, and a persona explorer with the family diagram and selected profile.
15. The centered design question that frames the next product chapter.
16. “What we learned from other products”: a taped competitive-research collage with draggable images and unboxed product-to-Turbo-Hub comparisons.
17. Relationship-definition context and the Hub Manager/Hub Member responsibility map.
18. The former product-rule path is removed.
19. “Designing the core flows” follows the four sketches with a fictional Sharma-family story and live prototype previews. Hub creation, Arun’s invitations to Kavya and the children, Neha’s WhatsApp joining sequence, payment-method activation and payment request use reversible single-phone touch playback with a clickable vertical step list and per-screen timer fills beside the phone; other groups retain their existing presentation. Use [FLOW-PLAYBACK-PLAYBOOK.md](FLOW-PLAYBACK-PLAYBOOK.md) to implement and review the other flows one at a time.

The project-timeline box opens an accessible native dialog with the two-month project phases. It supports Escape, its close control, backdrop dismissal, and returns focus to the Open button.

All page content is defined in the `caseStudy` object in `content.js` and rendered by `renderCaseStudy()` in `script.js`. Shared page chrome and section builders (hero, progress bar, headings, info panels, timeline, contact, ending, media slots, navigation, reveals and closing flowers) live in [`../case-study-kit/`](../case-study-kit/README.md), which other case studies such as Balance Explorer reuse. Colors and theme artwork are in `theme.css`.

With `?dev=true`, each autoplay family-flow preview includes **View all screens** beside its playback controls. It opens an unboxed overlay on the case study, showing that flow’s unchanged phone fixtures side by side without flow playback or repeated narrative text. The strip scrolls horizontally when needed. Every preview has an **Open full page** button underneath for editing and inspecting its standalone prototype. Close, Escape or backdrop dismissal returns to the same case-study position. The overlay reads the same ordered sequence from `flow-story-data.js`, so newly autoplayed flows get this access automatically.

## File map

| File or folder | Purpose |
| --- | --- |
| `index.html` | Static document shell, accessibility landmarks, templates, preload hints, and script/style entry points. |
| `../case-study-kit/kit.css` | Shared design tokens (except colors), typography, responsive layout, shared components and progress indicator. |
| `theme.css` | Turbo Hub color tokens, hero background and heading-flower artwork. |
| `styles.css` | Turbo Hub-only sections: personas, relationship map, competitive board, product rules, flows and the phone stage. |
| `tokens.html` / `tokens.js` | Standalone visual token reference and live computed measurements; no build step. |
| `content.js` | Case-study copy, section navigation lists and ending artwork paths. |
| `script.js` | Turbo Hub section rendering. The media-slot API, hero depth and scroll progress come from `../case-study-kit/kit.js`. |
| `../case-study-kit/case-reveal.js` / `.css` | Reversible scroll entrances and paragraph line reveals; enabled by default, disabled with `?reveal=0`. |
| `flow-story-data.js` / `flow-story.js` / `flow-story.css` | Fictional family narrative, declared screen sequences and editorial preview presentation. |
| `flow-story-playback.js` | Reversible scripted touch choreography over locked prototype embeds. |
| `FLOW-PLAYBACK-PLAYBOOK.md` | Reusable execution recipes, per-flow implementation briefs, validation and static restoration. |
| `design.md` | Canonical detailed design-system and behavior specification. |
| `README.md` | Fast project handoff and current-state summary for humans and new LLM chats. |
| `assets/` | Hero background, transparent phone casing, annotation art, and future case-study media. |
| `fonts/Helix/` | Local body and non-hero heading family (the case study page loads the kit's copy). |
| `fonts/Larken/` | Local hero-heading family (the case study page loads the kit's copy). |

## Established design decisions

- The site is intentionally light-only.
- The hero and body share the same `--content-width: 58rem` alignment.
- Experience/outcome card groups use `--wide-content-width: 70rem`, centered beyond the narrative column and capped by viewport gutters. The persona explorer, business-goals group, and Category / My Role / Team metadata box match the body-copy container.
- Spacing uses the 4px `--space-unit` scale and semantic aliases for paragraphs, heading-to-copy gaps, component padding/gaps, narrative-to-media gaps, related subgroups, and distinct sections. Paragraph gaps are 12px, smaller than heading-to-copy gaps of 20px desktop / 16px mobile. Compact title-to-copy gaps are 8px; copy-to-media gaps are 56px / 52px; related groups are 64px / 48px; section breaks are 144px / 112px. Adjust tokens instead of correcting repeated gaps individually.
- Hero and section headings use Larken; small headings and all supporting text use Helix.
- Six shared content roles define font family, size, weight, leading, and tracking: 48px hero heading, 22px hero subheading, 32px section heading, 20px body, 22px small heading, and 18px small body. Mobile sizes are defined once at the 768px breakpoint; captions and controls use a separate 14px utility token.
- Heading and emphasized copy use an off-black, never pitch black.
- Decorative main section heading marks use `assets/heading_flower.svg` through the shared `.asset-placeholder--icon` style.
- Similar content must reuse the existing metadata, detail-panel, info-card, phone, and annotation patterns instead of creating one-off styling.
- Body content spans the shared content width; do not restore the former editorial indentation.

See `design.md` for exact tokens, spacing values, typography roles, component geometry, and responsive behavior.

## Phone and dynamic-media system

All phones are created through `createPhone()` and use `assets/phone case clean.png` as a transparent foreground casing. The live `.media-slot` sits beneath it and is clipped to the measured screen opening. Do not redraw the phone bezel in CSS.

Current media-slot IDs:

- `phone-overview`
- `phone-manager`
- `phone-member`
- `phone-closing`

Set media at runtime with:

```js
CaseStudy.setMedia("phone-overview", {
  type: "image",
  src: "./assets/overview.png",
  alt: "Turbo Hub overview",
});
```

Supported types are `image`, `video`, `iframe`, `html`, and `placeholder`. Keep the placeholder when final media has not been supplied.

Every phone is created through `createPhone()`, which keeps the transparent casing above the clipped media slot. Phone groups participate in the default scroll entrances; `?reveal=0` renders all content immediately in its final position.

## Motion behavior

Scroll entrances and line reveals are enabled by default through the separate page-owned module. Use `?reveal=0` to disable them; `?reveal=1` remains supported. The reading dial works with `?nav=3` alone. Everything follows one rule: a single reading line sits 85% down the viewport, and an element or text line starts entering when its top crosses it. Headings, subheadings and narrative paragraphs are split into words up front and grouped into measured lines; each line has its own trigger. Cards and visual groups enter whole. Everything slides 560ms (blocks 40px, words 1em) with a 320ms fade and no blur. Lines crossing in the same frame cascade top to bottom in 60ms steps, capped at 360ms. Line groups adapt to font loading and resizing. The module excludes product components and existing animated compositions. Section navigation reveals its destination immediately, and reduced motion keeps original content visible.

Flow screen figures, persona groups, screen sets, card grids, research boards and artifact galleries enter as complete units without child staggering or text splitting. Their existing controls and playback remain intact.

Headings lead naturally because they sit above their body text, so nothing waits on another element. Content skipped by a fast jump is shown at once rather than animated offscreen, and at the bottom of the page any visible lines still below the reading line are revealed. The TLDR heading and copy stay visible from the start; everything after them reveals on scroll. Card and component descriptions stay grouped. Navigation reveals only the destination heading or focused group; the following body copy keeps its line reveals.

For a live switch, call `CaseStudyReveal.setEnabled(true)` or `CaseStudyReveal.setEnabled(false)` in the console. Disabling restores the original text nodes and removes all reveal effects. `CaseStudyReveal.refresh()` rescans after an intentional content rerender. See `app-design-system/decisions/case-reveal.md` for scope and validation.

The scroll progress indicator updates directly from the current scroll position. The hero retains its scroll-linked depth effect: it tilts back and shrinks during normal scrolling, with a small background parallax and no extra scroll space. Scrolling upward reverses it; reduced motion disables the effect. The Impact artwork retains its separate scroll-driven assembly. Other motion belongs to interactions:

- The timeline dialog opens and closes accessibly.
- Competitive-research images can be dragged or moved by keyboard.
- Interview quotes and personas cycle while visible, pause on hover or focus, and respect reduced-motion preferences.
- Component feedback transitions respect `prefers-reduced-motion: reduce`.
- Heading flowers play a quick, smooth 650ms full spin and subtle size pulse on heading hover, with the effect disabled for reduced motion.

## Scroll progress

The left-edge scroll indicator has no empty rail. Its filled bar and percentage update directly from current scroll position without interpolation. The percentage follows the fill tip and uses bold Helix with tabular numerals. Its width, label size, and tracking are tokenized in `styles.css`.

## Extending the case study

Reading navigation has two preserved versions. The default (`?nav=1`) starts
expanded, with Overview, Metrics, Research, Flow and Impact in a white tray.
The 56px surface has 22px corners, even label spacing and soft blue hover
highlights with 10px corners. Only the current section has a blue underline.
A separate 44px control sits 10px to the right. Fine 20px Regular Phosphor
arrows point inward to collapse and outward to expand, retaining the spring
bounce with subtle icon deformation. On collapse it glides
to the horizontal center while the tray retracts and fades; expanding reverses
that motion. Responsive insets preserve all five labels on narrow screens.
One interruptible spring drives the tray surface and label opacity; rapid
clicks reverse from the current position and velocity instead of restarting.
Text stays at its normal size throughout. Escape minimizes and focuses the
control; section selection leaves the bar open. Reduced motion settles instantly.
`?nav=2` retains the right-edge bookmark and chapter index. Both keep scrolling
available. `../case-study-kit/case-navigation.js` owns links, versions and motion;
`case-navigation.css` uses editorial tokens. Source-level state/rapid-reversal
checks and the Impeccable detector passed; visual review remains with the user.

When adding a section:

1. Add factual content to the `caseStudy` object.
2. Render it in `renderCaseStudy()` using semantic HTML.
3. Add `.case-section` to a standard section.
4. Use existing components and spacing tokens.
5. Keep content readable without JavaScript. Configure default entrances in `../case-study-kit/case-reveal.js`; do not add reveal classes or word splitting to the content renderer or product components.
6. Add media through `createPhone()` and the media-slot API rather than hardcoding screen content.
7. Verify desktop and mobile behavior, reduced motion, and JavaScript syntax.

## Documentation maintenance contract

Every future contributor or LLM must keep documentation synchronized with the implementation:

- Update `README.md` whenever page structure, file responsibilities, public APIs, major behavior, current assets, or the onboarding context changes.
- Update `design.md` whenever tokens, typography, colors, spacing, layout rules, component patterns, responsive behavior, animation timing, or reveal logic changes.
- Update both files in the same task when a change affects both project context and design behavior.
- Remove or revise stale statements immediately; do not leave documentation describing an earlier implementation.
- Keep this README concise enough to brief a new chat quickly. Put detailed measurements and rationale in `design.md` rather than duplicating the entire specification here.

Before finishing a meaningful change, explicitly check whether either Markdown file now needs an update.

## Verification

Minimum checks for JavaScript or UI changes:

```powershell
node --check script.js
node C:\Users\ishan\.codex\skills\impeccable\scripts\detect.mjs --json script.js styles.css index.html design.md
```

Also inspect the affected interaction at desktop and mobile widths when a browser surface is available.

## Onboarding prototype

`prototypes/onboarding/` contains a standalone, three-slide Turbo Hub onboarding carousel: family sharing, spending boundaries, and independent payments. Open `preview.html` for the existing phone-frame preview or embed `index.html` through `CaseStudy.setMedia()` using type `iframe`. The reference-led layout uses top-left dots, copy above simple generated illustrations, a soft blue background, and a centered bottom CTA. It includes local fonts, swipe/keyboard navigation, and a replayable completion state that links to Create Hub. See `prototypes/onboarding/README.md` for the embed snippet and completion event. Main-page media slots have not been automatically replaced.

## Remaining case-study media

- Phone screens remain placeholders until final images, video, or prototypes are supplied.
- The hero logo placeholder remains blank until final artwork is supplied.
- The LinkedIn URL in the contact action is still a placeholder and must be replaced before publishing.

## Flow companion page

flow-reference/index.html is a separate placement guide reorganized from the original Framer case study. Five chapters connect manager setup, member access, member onboarding, payment authorization, and the optional Pixel Tag branch. Gray placeholders identify inspected screens or labeled source-caption/prototype references; amber placeholders identify suggested additions. Each slot includes placement instructions and UX rationale. Local source images are linked in expandable notes. Run node flow-reference/preview.cjs to preview on port 8123. The main page is unchanged.

The companion now groups related screens into task sequences, with one UX decision per group. Repeated per-screen annotations and overview guidance are removed; provenance remains in References disclosures.

Available source screens are now visible inline in the companion, with each screen opening its original image. Composite reference images are framed with CSS without changing the originals. Missing and suggested screens retain their placeholders.

The standalone flow companion uses a dark background to distinguish source-screen edges; the main case study retains its light theme.

Each screen now has an aligned information header above an equal-aspect media stage. Long source screens scroll within the stage; missing and suggested screens reserve the same space.

Flow introductions and grouped UX rationale now use case-study prose grounded in the original content and inspected screens. Proposed entry, limit, exception, and geofence states remain explicitly described as proposals.

## Turbo Hub design-system foundation

app-design-system/ is the app-owned DS attachment, with a registered Phosphor icon provider and semantic TurboIcons wrapper. Start the studio with node .tmp-ds-starter/studio.js start --config app-design-system/studio.config.json (port 8020). Custom SVG replacements go through TurboIcons.replace(). Hub Details is the first rebuilt screen.

## First rebuilt product screen

prototypes/hub-dashboard/index.html reconstructs Hub Details using ten registered TurboUI components. Spends, Members and Analytics work; Show all transactions expands the list. Add opens the two-step Add Member flow; undefined settings remain disabled. Open http://localhost:8020/app/prototypes/hub-dashboard/index.html through the DS studio. app-design-system/specimens/component.html provides shared-renderer examples and registry metadata for reuse.

The existing phone-shell asset frames a fixed 390 × 844 screen. Smaller browser windows scale the complete preview; content scrolls inside the screen. Native-style Phosphor status icons and centered navigation icons share the design-system renderers. Status/navigation and the bottom home indicator stay fixed.

## Add Member flow

prototypes/add-member/index.html implements the source details and payment-method screens. Existing DS controls are reused; four new form components are registered with shared-renderer specimens. Validation and back navigation work. Send Invite creates a pending member in this browser session only; nothing is sent externally. Shared phone-preview files retain the same 390 × 844 viewport across both screens.

Member payment review lives at prototypes/payment-review/index.html. Payment account and Swipe action are registered with shared-renderer examples. The amount configuration extends the existing Text field. Only local demo request feedback is implemented; no external payment occurs.

## Hub welcome layout

`prototypes/hub-welcome/` retains the earlier family artwork, inviter, Hub name and overlapping member portraits above the What you get list. Terms and Accept invite follow the benefits within the content surface. Consent validation and the route to number verification are unchanged. Review at http://127.0.0.1:8020/app/prototypes/hub-welcome/index.html; browser review remains with the user.

## Play Store prototype

`prototypes/play-store/` uses the user-supplied PayZapp Google Play listing for the app icon, title, developer and metadata. Secondary screenshots and data-safety content use static neutral skeletons. The screen retains its external-store white/green styling and local Install → Open → Hub welcome flow. The official icon is stored locally with provenance in `prototypes/play-store/assets/README.md`.

## Joining ends inside the Hub

The WhatsApp joining flow continues from the brief success confirmation into `prototypes/hub-dashboard/index.html?state=joined&member=neha`. This first-visit member fixture shows Neha’s monthly allowance, Card and UPI using the same payment-method rows as Kavya’s profile, with identifiers, pending badges and chevrons. The success screen’s Go to Hub action follows the same route.

The number-verification screen uses the registered six-box Verification code control. Digits advance as they are entered; backspace and arrows support correction, and paste/SMS autofill populate all boxes. The standalone screen starts empty; locked story playback fills its fictional code through the same aggregate input.

The welcome screen’s What you get list uses one rounded outlined container with the existing grouped-list tokens and 16px inset. Terms and Accept invite follow below it.

## Design trade-offs

“What we chose to leave out” follows the core flows at #design-tradeoffs: one
short paragraph, two reconstructed screen concepts and a short description.
The concepts illustrate all-at-once setup and generic onboarding, inferred at
the user’s request rather than presented as historical or tested wireframes.
Copy/rendering live in script.js, layout in design-tradeoffs.css, and the static
SVG illustrations in assets/tradeoffs/. Visual review remains with the user.

## Impact & future

#impact-future follows the design trade-offs. Six colorful selection frames and
caption bubbles gather around a central italic statement, matching the supplied
reference. Assumed baseline/target comparisons map to the three earlier success
metrics and are labeled as illustrative rather than measured. Travel bounds
include caption overhangs; the larger canvas has visible overflow. Per-note
scroll progress gathers lower frames with the central statement, with 220px
desktop / 140px mobile requested vertical travel. Blue/purple frames and bubbles
are shorter; purple is wider. Red frames contain only their paragraph. Mobile keeps
a readable staggered composition. Reduced motion is static; hidden/offscreen
stages pause. impact-future.js/css own this page-only renderer and scroll motion.
Browser/visual review remains with the user.

The existing pink contact card is repeated after Impact & future at #contact-end.
Both placements use createContactSection() and the same contact copy, styling
and action URL; the earlier #contact remains in place.

Lower impact frames now anchor 32px below the measured center text, avoiding
fixed-position gaps and adapting to heading wrapping on narrow screens.

The impact canvas now ends 24px after its lowest visible frame/caption; unused
scroll-travel reserve no longer leaves a large gap before the definitions.
