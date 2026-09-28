# Turbo Hub case study

This repository contains a single-page product-design case study for Turbo Hub, a family-payments concept created within PayZapp. It is a custom static site built with plain HTML, CSS, and JavaScript—there is no framework, build step, package manager, or backend.

Open `index.html` directly or serve this folder with any static server.

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
6. Three business-goal cards.
7. A standalone closing phone with a viewport-edge annotation graphic.
8. Pink contact card.
9. Interactive project-timeline box.
10. Technology-opportunity copy and two complementary experience cards.
11. Two early product-thinking sketches (`TB1.svg` and `TB2.svg`).
12. Proposition outcomes and three outcome cards.
13. Success measures.
14. User-research context, persona explorer, learnings, and user voice.
15. The centered design question that frames the next product chapter.
16. Relationship-definition context and the Hub Manager/Hub Member responsibility map.
17. A taped competitive-research collage with draggable images and numbered findings.
18. A three-step product-rule path connecting the research to the core flows.
19. A vertically scrollable core-flow reel with reusable phone screens and per-screen notes.

The project-timeline box opens an accessible native dialog with the two-month project phases. It supports Escape, its close control, backdrop dismissal, and returns focus to the Open button.

All page content is defined in the `caseStudy` object near the top of `script.js` and rendered by `renderCaseStudy()`.

## File map

| File or folder | Purpose |
| --- | --- |
| `index.html` | Static document shell, accessibility landmarks, templates, preload hints, and script/style entry points. |
| `styles.css` | Design tokens, typography, responsive layout, components, progress indicator, and reveal states. |
| `script.js` | Case-study data, DOM rendering, media-slot API, reveal scheduler, and scroll progress behavior. |
| `design.md` | Canonical detailed design-system and behavior specification. |
| `README.md` | Fast project handoff and current-state summary for humans and new LLM chats. |
| `assets/` | Hero background, transparent phone casing, annotation art, and future case-study media. |
| `fonts/Helix/` | Local body and non-hero heading family. |
| `fonts/Larken/` | Local hero-heading family. |

## Established design decisions

- The site is intentionally light-only.
- The hero and body share the same `--content-width: 58rem` alignment.
- Spacing is controlled by the master `--space-unit` and its derived scale. Adjust tokens instead of correcting repeated gaps individually.
- The hero heading is the only Larken headline. All other headings and body copy use Helix.
- Primary sizes are 48px hero, 32px section headings, 22px hero subtext, and 20px body copy.
- Heading and emphasized copy use an off-black, never pitch black.
- Decorative heading marks remain `.asset-placeholder` elements until final assets are supplied.
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

Every phone is a `data-reveal-container`: the casing reveals first, followed by its media slot. This is defined inside `createPhone()`, so phones added to any future stage inherit the behavior automatically.

## Reveal and motion rules

The reveal system is centralized in `setupReveal()`:

- The invisible viewport threshold sits 12% above the bottom edge.
- A target becomes eligible when 1% of it crosses that threshold.
- Paragraphs inside `.reveal` regions are measured into real visual lines and revealed line-by-line.
- Eligible targets within the same 12px vertical band share one timestamp. Adjacent desktop cards therefore reveal matching rows together; stacked mobile cards naturally reveal sequentially.
- Moving to the next vertical band adds 55ms.
- `data-reveal-container` creates a reusable hierarchy: the surface reveals first, then its children enter after a 150ms lead.
- Nested reveal containers inherit the same parent-before-child behavior.
- Reveal motion runs once and is disabled by `prefers-reduced-motion: reduce`.
- Do not add clipping wrappers around reveal elements. A phone screen is the intentional exception because media must stay inside the device viewport.

To add a new boxed component that should reveal before its contents, add `data-reveal-container` to its outer surface and use existing semantic child patterns. Do not add component-specific timers.

## Scroll progress

The left-edge scroll indicator has no empty rail. Its filled bar interpolates toward current scroll position instead of snapping. The percentage follows the fill tip and uses bold Helix with tabular numerals. Its width, label size, and tracking are tokenized in `styles.css`.

## Extending the case study

When adding a section:

1. Add factual content to the `caseStudy` object.
2. Render it in `renderCaseStudy()` using semantic HTML.
3. Add `.case-section.reveal` to a standard section.
4. Use existing components and spacing tokens.
5. Use `data-reveal-container` for any new surface that must precede its contents.
6. Let normal paragraphs use the automatic line-reveal system; exclude only layouts that would break when words become inline spans.
7. Add media through `createPhone()` and the media-slot API rather than hardcoding screen content.
8. Verify desktop and mobile behavior, reduced motion, and JavaScript syntax.

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

`prototypes/onboarding/` contains a standalone, three-slide Turbo Hub onboarding carousel: family sharing, spending boundaries, and independent payments. Open `preview.html` for the existing phone-frame preview or embed `index.html` through `CaseStudy.setMedia()` using type `iframe`. The reference-led layout uses top-left dots, copy above simple generated illustrations, a soft blue background, and a centered bottom CTA. It includes local fonts, swipe/keyboard navigation, and a replayable completion state. See `prototypes/onboarding/README.md` for the embed snippet and completion event. Main-page media slots have not been automatically replaced.

## Remaining case-study media

- Phone screens remain placeholders until final images, video, or prototypes are supplied.
- Heading icon/flower placeholders remain blank until final artwork is supplied.
- The LinkedIn URL in the contact action is still a placeholder and must be replaced before publishing.
