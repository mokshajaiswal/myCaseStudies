# Turbo Hub case study

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
19. “Designing the core flows” follows the four sketches with a fictional Sharma-family story and live prototype previews. Hub creation, Arun’s invitations to Kavya and the children, Neha’s WhatsApp joining sequence and her payment request use reversible single-phone touch playback with a clickable vertical step list and per-screen timer fills beside the phone; other groups retain their existing presentation. Use [FLOW-PLAYBACK-PLAYBOOK.md](FLOW-PLAYBACK-PLAYBOOK.md) to implement and review the other flows one at a time.

The project-timeline box opens an accessible native dialog with the two-month project phases. It supports Escape, its close control, backdrop dismissal, and returns focus to the Open button.

All page content is defined in the `caseStudy` object near the top of `script.js` and rendered by `renderCaseStudy()`.

With `?dev=true`, each autoplay family-flow preview includes **View all screens** beside its playback controls. It opens an unboxed overlay on the case study, showing that flow’s unchanged phone fixtures side by side without flow playback or repeated narrative text. The strip scrolls horizontally when needed. Every preview has an **Open full page** button underneath for editing and inspecting its standalone prototype. Close, Escape or backdrop dismissal returns to the same case-study position. The overlay reads the same ordered sequence from `flow-story-data.js`, so newly autoplayed flows get this access automatically.

## File map

| File or folder | Purpose |
| --- | --- |
| `index.html` | Static document shell, accessibility landmarks, templates, preload hints, and script/style entry points. |
| `styles.css` | Design tokens, typography, responsive layout, components, progress indicator, and reveal states. |
| `tokens.html` / `tokens.js` | Standalone visual token reference and live computed measurements; no build step. |
| `script.js` | Case-study data, DOM rendering, media-slot API, reveal scheduler, and scroll progress behavior. |
| `flow-story-data.js` / `flow-story.js` / `flow-story.css` | Fictional family narrative, declared screen sequences and editorial preview presentation. |
| `flow-story-playback.js` | Reversible scripted touch choreography over locked prototype embeds. |
| `FLOW-PLAYBACK-PLAYBOOK.md` | Reusable execution recipes, per-flow implementation briefs, validation and static restoration. |
| `design.md` | Canonical detailed design-system and behavior specification. |
| `README.md` | Fast project handoff and current-state summary for humans and new LLM chats. |
| `assets/` | Hero background, transparent phone casing, annotation art, and future case-study media. |
| `fonts/Helix/` | Local body and non-hero heading family. |
| `fonts/Larken/` | Local hero-heading family. |

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

Every phone is created through `createPhone()`, which keeps the transparent casing above the clipped media slot. Phone screens and all other page content render immediately in their final positions.

## Motion behavior

Sections appear in their final state without scroll-triggered reveal effects or paragraph line splitting. The scroll progress indicator updates directly from the current scroll position. The hero alone has a scroll-linked depth effect: it tilts back and shrinks during normal scrolling, with a small background parallax and no extra scroll space. Scrolling upward reverses it; reduced motion disables the effect. Other motion belongs to interactions:

- The timeline dialog opens and closes accessibly.
- Competitive-research images can be dragged or moved by keyboard.
- Interview quotes and personas cycle while visible, pause on hover or focus, and respect reduced-motion preferences.
- Component feedback transitions respect `prefers-reduced-motion: reduce`.
- Heading flowers play a quick, smooth 650ms full spin and subtle size pulse on heading hover, with the effect disabled for reduced motion.

## Scroll progress

The left-edge scroll indicator has no empty rail. Its filled bar and percentage update directly from current scroll position without interpolation. The percentage follows the fill tip and uses bold Helix with tabular numerals. Its width, label size, and tracking are tokenized in `styles.css`.

## Extending the case study

When adding a section:

1. Add factual content to the `caseStudy` object.
2. Render it in `renderCaseStudy()` using semantic HTML.
3. Add `.case-section` to a standard section.
4. Use existing components and spacing tokens.
5. Keep content visible in its final position; do not add scroll-triggered reveal classes or line splitting.
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
