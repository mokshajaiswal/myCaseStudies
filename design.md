# Case Study Design System

This page uses a small token system so spacing can be changed globally instead of being corrected element by element.

## Master spacing token

The master spacing token is at the top of `styles.css`:

```css
--space-unit: 0.25rem;
```

Every spacing token is a multiple of this value. Change it once to scale gaps, section spacing, padding, and component rhythm across the entire page.

Examples:

- `0.25rem` gives the current 4px base rhythm.
- `0.28125rem` gives a 4.5px base and makes the page about 12.5% more spacious.
- `0.21875rem` gives a 3.5px base and makes the page about 12.5% tighter.

## Spacing scale

| Token | Formula | Current value | Typical use |
| --- | ---: | ---: | --- |
| `--space-1` | unit x 1 | 4px | Fine internal offset |
| `--space-2` | unit x 2 | 8px | Tight text gap |
| `--space-3` | unit x 3 | 12px | Icon and label gap |
| `--space-4` | unit x 4 | 16px | Standard compact padding |
| `--space-5` | unit x 5 | 20px | Paragraph and content gap |
| `--space-6` | unit x 6 | 24px | Component padding |
| `--space-8` | unit x 8 | 32px | Large component gap |
| `--space-10` | unit x 10 | 40px | Layout offset |
| `--space-12` | unit x 12 | 48px | Large layout gap |
| `--space-16` | unit x 16 | 64px | Media separation |
| `--space-20` | unit x 20 | 80px | Mobile section separation |
| `--space-24` | unit x 24 | 96px | Hero padding |
| `--space-32` | unit x 32 | 128px | Desktop section separation |
| `--space-40` | unit x 40 | 160px | Reserved extra-wide rhythm |

## Layout control tokens

Use these when the problem is specific rather than global:

| Token | Controls |
| --- | --- |
| `--layout-gutter` | Left and right page padding |
| `--section-space` | Vertical distance between major sections |
| `--content-width` | Shared maximum width for the hero and body |
| `--hero-radius` | Bottom-corner roundness of the blue hero area |

Recommended adjustment order:

1. Change `--space-unit` if the entire page feels too tight or too loose.
2. Change `--section-space` if only major section gaps feel wrong.
3. Change `--layout-gutter` if the page feels cramped near the viewport edges.

The hero and content shell both resolve their width from the same `--content-width: 58rem` token. Their outer left and right edges therefore remain aligned at every viewport size, while `--layout-gutter` supplies the shared responsive margin.

## Shape, color, and type

- Corners follow one soft-radius system through `--radius-small`, `--radius-medium`, and `--radius-large`.
- `--accent` is the only interactive and identity accent.
- `--ink: #3f4652` is the shared off-black for emphasized body copy and interface text; strong text should not fall back to pure black or the former near-black navy.
- The page is deliberately locked to light mode to match the supplied case-study reference.
- Only the blue hero heading uses the local Larken files. Every other heading and all body content use the local Helix files.
- The hero/header uses `assets/bg.webp` as its responsive cover background.

Primary typography is controlled by two tokens near the top of `styles.css`:

```css
--type-hero: 48px;
--type-heading: 32px;
--type-subtext: 22px;
--type-body: 20px;
--body-line-height: 1.55;
--paragraph-gap: var(--space-4);
--heading-weight: 600;
--label-weight: 600;
--card-heading-weight: 700;
```

`--type-hero` controls the hero heading. `--type-heading` controls the TL;DR and section headings. `--type-subtext` controls the hero supporting text. `--type-body` controls the page body. `--body-line-height` and `--paragraph-gap` control body-copy density globally. Small metadata and utility labels retain their compact role-specific sizes.

Heading weight and tone are centralized as `--heading-weight` and `--heading-ink`. Shared question-style section headings use 32px Helix with the opening word at `--heading-weight` and the remaining title at regular weight, creating hierarchy without changing size or color. The blue hero heading is the only Larken exception. Compact uppercase labels use `--label-weight`, which is intentionally lighter than bold.

Secondary narrative headings use the shared `.subsection-heading` treatment: `--type-subtext` (22px), `--heading-weight` (600), a 1.25 line height, and restrained negative tracking. This applies to “Turning the opportunity into a product experience,” “What we wanted the proposition to achieve,” and “How we would measure success,” keeping them visibly subordinate to the 32px question-style section headings while remaining stronger than card titles and supporting copy.

Supporting sentences directly beneath these subsection headings use `.subsection-intro`: an identical `--space-2` (8px) heading gap, 16px regular Helix, `--ink-soft`, and a 1.5 line height. “The proposition centered around two complementary experiences” and “We focused on three core outcomes with Turbo Hub” therefore share the same spacing and typographic role. Related experience-card and outcome-card body copy also remains at 16px with a 1.5 line height. Subsection headings that lead directly into a different structure, such as the success-measure list, may keep a component-specific structural gap.

Reusable content-card titles use `--card-heading-weight: 700` so their labels remain clearly distinct from their supporting text without changing the weight of larger section headings.

All content beneath the hero now uses the full `--content-width` container. Paragraphs no longer have a separate reading-width cap or editorial indentation.

The font families are also centralized in `styles.css`:

```css
--font-display: "Larken", Georgia, serif;
--font-body: "Helix", "Segoe UI", Helvetica, Arial, sans-serif;
```

Replace these two tokens when the final typefaces are selected. `--font-display` is reserved for the blue hero heading; `--font-body` controls every other heading and body role. Both fonts are self-hosted, so the page has no external font dependency.

Boxed metadata groups are centered against the full content container rather than the indented reading column. Each metadata item uses centered internal text alignment, top-aligned rows, and the shared `--space-2` heading-to-description gap so every description begins on the same horizontal line.

The second-section project-details box uses the semantic `--detail-surface` and `--detail-border` color tokens. It spans the full content container and presents three equal centered columns on desktop, collapsing to one column on mobile.

The business-goals group reuses those same warm surface and border tokens. Its outer `.info-panel` establishes the group, while `.info-card` creates three equal goal items that collapse to one column below 768px. Internal padding and gaps only use the documented spacing scale.

The technology-opportunity section uses the standard section heading and full-width reading column. Its concluding opportunity statement is bold, followed by a compact secondary heading and a two-column `.experience-grid`. Each `.experience-card` reuses `.detail-box`, with a small colored circular number badge as its only new visual element. The blue and pink badges distinguish the complementary manager and member experiences; the cards collapse to one column below 768px.

The early-artifact section sits between the technology opportunity and proposition outcomes. `.artifact-stage` presents `TB1.svg` and `TB2.svg` as staggered paper sheets on a warm, softly tinted field rather than as routine cards. The first sheet leads slightly in scale, while the second is offset vertically to create an editorial sequence. Both use restrained rotation, paper shadows, semantic captions, lazy-loaded images, and the shared hierarchical reveal. Below 768px the composition becomes a single unrotated column.

The proposition-outcomes section uses an unmarked standard heading, supporting copy, and a three-column `.outcome-grid`. Each numbered outcome reuses `.detail-box` with the warm surface and shared medium radius. The cards use equal desktop sizing and collapse to one column below 768px. A separate `.measure-list` follows beneath the cards; it remains unboxed and uses semantic `dt`/`dd` pairs with spacing tokens to preserve the screenshot’s quieter measurement hierarchy.

The user-research section follows the success measures. It combines standard section copy with two isolated, data-driven components: `.persona-explorer` and `.user-voice-stack`. The persona explorer is a plain-JavaScript adaptation of the supplied Framer component: its property-control fields map to `caseStudy.research` and include eyebrow, title, intro, persona name, label, meta, type, role, goal, pain points, needs, and accent. It exposes accessible persona tabs with arrow-key navigation, a live position counter, identity/avatar content, and a second interactive Role/Goal/Pain Points/Needs tab set; list fields render as accent-colored bullets. Within the component, “Primary Personas” uses Larken as the local editorial title, persona-tab name and role lines use a compact two-pixel rhythm, and the selected detail is presented on the shared warm-white raised surface with a tighter label-to-answer gap. The user-voice stack adapts the second supplied Framer component without adding React: up to four quote cards are layered with alternating offsets and rotations, and activating the top card cycles it to the back. Every voice keeps its name, role, quote, accent, and background configurable in `caseStudy.research.voices`. Persona tabs become a horizontal snap row on mobile, and the learning/voice row stacks to one column.

The design-question section follows the research findings as an editorial pause before the next product chapter. Its small uppercase Helix eyebrow frames a single centered Larken italic question. The section stays unboxed, uses a viewport-responsive minimum height to preserve the supplied whitespace, and keeps its copy in `caseStudy.designQuestion` so future case studies can replace the prompt without changing markup.

The relationship-definition section resumes the standard narrative layout after the centered question. It reuses the split-weight section heading and body-copy rhythm, then introduces a `.relationship-grid`: two equal responsibility cards followed by one full-width connection card. Each card uses a light dashed outline, a matching numbered marker, and bottom-aligned responsibility copy. The grid collapses to a single column on mobile, while all titles and descriptions remain editable through `caseStudy.relationship`.

The contact card uses a semibold heading rather than bold. Its action remains understated against the pink surface: the label uses regular Helix, the softened white outline is one pixel, and its corners use `--radius-small` rather than a pill. The checker texture uses a medium responsive tile size that sits between the original broad pattern and the later dense version. This keeps the action legible without competing with the contact heading.

The project-timeline card reuses `.detail-box` as a standalone section after the contact card. The two sections are intentionally grouped with a reduced `--space-12` transition instead of the standard section gap. The timeline surface uses 28px token-derived padding on desktop, `--space-5` on mobile, and a 1.75rem radius for a friendly rounded shape without becoming a pill. Its title-and-duration group is balanced by a lightweight `Open` button. The action launches a native modal dialog using the same warm surface, border, radius, and typography tokens. The modal presents the two-month process as a single vertical sequence, locks page scrolling while open, closes by button, Escape, or backdrop interaction, and restores focus to the trigger.

## Asset placeholders

Decorative marks are intentionally blank until final artwork is supplied. Use the reusable `.asset-placeholder` component instead of drawing temporary flower, star, or logo shapes:

- `.asset-placeholder--hero` reserves the hero logo area.
- `.asset-placeholder--icon` reserves the small mark beside section and panel headings.

For primary `.section-heading` elements, the marker is positioned in the left margin and does not consume content width. The heading text therefore shares the exact left edge used by the paragraph content below it. Markers within contained components, such as `.info-panel-heading`, remain inside their component.

Replacing these elements with images later will not require changing the surrounding spacing or alignment.

## Dynamic media slots

The phone screens are intentionally empty. Each slot can render an image, video, iframe, HTML prototype, or return to its placeholder. The phone casing is the supplied transparent `assets/phone case clean.png`, layered above each live media slot rather than recreated with CSS. The frame's native `1005 / 2049` ratio is preserved through `--phone-aspect`. The media opening is controlled centrally through `--phone-screen-inset-block`, `--phone-screen-inset-inline`, and `--phone-screen-radius`, so replacement content remains clipped beneath the physical frame and Dynamic Island at every responsive size.

Every phone created by `createPhone()` is automatically marked with `data-reveal-container`. The casing is therefore the reveal surface, and its `.media-slot` is registered as child reveal content. This rule is stage-independent: phones inside `.phone-stage`, `.closing-stage`, annotation bands, or future wrappers all reveal the casing first and the media 150ms later without adding another selector.

```js
CaseStudy.setMedia("phone-overview", {
  type: "image",
  src: "./assets/overview.png",
  alt: "Turbo Hub overview",
});
```

Supported types:

- `image`: requires `src`, optional `alt`.
- `video`: requires `src`, optional `poster`, `loop`, `muted`, and `controls`.
- `iframe`: requires `src`, optional `title` and `allow`.
- `html`: accepts an `html` string for trusted local prototype markup.
- `placeholder`: restores the blank state.

Images, videos, and iframes show a loading state while their source is prepared. Images and videos fall back to an inline error state if the source cannot load.

Available slot IDs are `phone-overview`, `phone-manager`, `phone-member`, and `phone-closing`.

Standalone phone stages render larger than the grouped trio: `.closing-stage` uses `min(100%, 18rem)` so a single phone reads as the focus of its section.

## Viewport-anchored annotation marks

Sections that pair a centered stage (such as a phone preview) with a side illustration use the annotation-band pattern in `script.js`. `createAnnotationBand(stage, annotation)` wraps the stage in `.annotation-band`, a full-bleed row that spans the viewport so marks can anchor to the true screen edge instead of the content column.

- Inside `.annotation-band`, `.annotation-copy` stays outside the reveal-piece system and is excluded from the word-by-word split (`.reveal p:not(.annotation-copy)`) because its grid layout would stack each word span as its own grid item. The phone still participates through the stage-independent `createPhone()` container rule.
- The band keeps its stage horizontally centered, so the preview stays on the page axis while the mark sits flush with the viewport edge.
- `.annotation-figure` anchors the artwork to the right edge (`right: 0`) and centers it vertically against the stage; `top: 45%` with `translateY(-50%)` adds the small upward optical offset.
- `.annotation-figure--left` mirrors the anchor to the left edge when a future annotation needs it.
- Figure width scales through `clamp(13rem, 32vw, 30rem)`, and `.annotation-mark` fills that box.
- `.annotation-copy` rides in a fixed-proportion box pinned to the artwork (`top: 10%`, `left: 5%`, `width: 36%`, `height: 42%` of the figure) and centers its text both ways. The copy scales with the figure through `font-size: clamp(0.78125rem, 0.98vw, 0.875rem)`, matching the flower's own `32vw` curve; text that exceeds the box is clipped inside it. The box fill is currently transparent (the red placement aid is still in the rule, just hidden).
- Marks are decorative: `alt` stays empty, pointer events are ignored, and the figure is hidden below 768px where it would collide with the stage.

## Responsive behavior

- Below 768px, editorial indentation resets to zero.
- The phone group remains a three-phone composition but tightens its gaps and labels.
- Metadata and business-goal content collapse to one column.
- Motion is disabled when `prefers-reduced-motion` is enabled.

## Scroll progress

The fixed `.scroll-progress` component occupies the far-left viewport edge. Its accent fill scales vertically from the top according to page scroll progress, while the unfilled portion remains fully transparent so there is no empty rail. The component is controlled by `--progress-bar-width: 9px`, `--progress-label-size: 0.8125rem`, and `--progress-label-tracking: 0.05em`. The percentage label uses bold Helix with tabular numerals, follows the fill tip, and is clamped inside the viewport at both extremes. During active scrolling, the target updates continuously while the visible fill, tip, and number follow it through frame-rate-independent interpolation with a `0.12` smoothing strength. This creates a small responsive offset instead of either rigid tracking or waiting for scrolling to stop. Reduced-motion mode updates immediately. The component exposes native progress-bar semantics through `aria-valuenow`.

## Section reveal motion

Reveal targets are observed individually instead of activating an entire section at once. An invisible viewport threshold sits 12% above the bottom edge. Each heading, phone, metadata item, panel label, card label, action, rendered text line, and marked surface becomes eligible as soon as 1% of its own bounds crosses that threshold.

Every paragraph is split into non-breaking word spans after rendering. JavaScript measures the word positions and groups words that share the same visual line. The first word becomes that line's observer target. All newly eligible targets enter one persistent document-order queue and are released at 55ms intervals, so the sequence continues across paragraph boundaries instead of restarting at each paragraph: every line of paragraph one precedes the first line of paragraph two. Each line rises by `0.7em`, sharpens from an eight-pixel blur, and fades in over 620ms. Line groups and observers are rebuilt after fonts load and when the viewport resizes, so future paragraphs and responsive wrapping inherit the same ordering automatically.

Reusable component surfaces opt into hierarchical motion with the `data-reveal-container` attribute. A marked surface rises, sharpens, and fades in first; any visible reveal targets inside it are held for a 150ms lead before joining the 55ms queue. Nested marked surfaces create the same parent-child dependency automatically, so cards inside panels reveal before their own labels and copy. The metadata strip, business-goals panel, individual goal cards, and contact card all use this shared rule.

Phones use the same generalized hierarchy. `createPhone()` marks the phone casing as a reveal container and the scheduler treats `.phone .media-slot` as its child content. The three overview casings synchronize through their shared vertical band; their media slots then synchronize in the following child phase. The standalone closing phone follows the identical rule, so it can no longer remain visible merely because it uses a different stage wrapper.

The queue groups eligible targets into automatic vertical bands with a 12px tolerance. Targets occupying the same visual row receive the same timestamp, so corresponding lines in adjacent cards reveal together. Only the next lower band consumes another 55ms step. This requires no card-specific configuration: side-by-side layouts synchronize naturally, while the same cards stack and sequence independently on narrow screens. General reveal pieces use exponential ease-out over 680ms, while surfaces use a slightly quicker 560ms transition. No clipping mask or overflow wrapper is added, allowing blurred edges to extend naturally. All motion runs once, content remains visible when JavaScript is unavailable, and line splitting is skipped entirely when `prefers-reduced-motion: reduce` is active.
