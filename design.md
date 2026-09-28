# Case Study Design System

## Standalone onboarding prototype

The isolated `prototypes/onboarding/` app follows the supplied reference layout: top-left pagination, left-aligned headline and short copy, a single central illustration, and a bottom CTA. The background (`#e7efff`), blue buttons (`#356cdf`, hover `#2857c8`), and off-black text (`#3f4652`) reuse the case-study palette, with secondary text `#58677d`. Local Helix typography uses 2.05rem headings; both lines have the same semibold weight, size, tracking, and 1.2 line height for optical consistency. Body copy is 1.04rem with 1.55 line height and a 1rem gap below the heading. No logo, close/skip control, badges, counters, footer tagline, or simulated UI widgets are present.

Three transparent generated illustrations show a family home, coin purse, and shopping bag. Each is a static image with no interaction. Blue variants replace purple and mint with cobalt and powder blue while retaining gold details. Illustration width is reduced with 0.25rem side margins to accommodate larger copy. Compact headings are 1.85rem and body copy is 1rem. Buttons have centered labels with a 1px upward optical adjustment, 0.035em letter spacing, and no arrows. Pagination uses 8px dots and a 24px active pill, with an equal 6px edge-to-edge gap in every active state. Indicator buttons follow the visible shape width and retain a 44px vertical target.

The app fills its iframe up to 480px wide, with a 480px minimum height. Recommended viewport is 390 × 780; compact support starts at 260 × 480. Below 600px tall, top spacing and typography tighten. The separate preview reuses the existing phone casing and screen insets. Navigation supports the primary button, top pagination, arrow keys, and swipes. Completion shows a replay state and emits the existing event without creating an account. Copy and illustration entrances last 300ms and 450ms; reduced motion disables animations. Inactive slides remain hidden and inert. See the prototype README for embedding.

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

The interview-findings heading “What We Heard in the Interviews” also uses `.subsection-heading`, and its paragraph carries full `--type-body` copy at `--body-line-height`. `.learning-row` no longer adds inline padding, so that column shares the exact left edge of the section paragraphs above it.

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

The early-artifact section sits between the technology opportunity and proposition outcomes. `.artifact-stage` presents `TB1.svg` and `TB2.svg` as two paper sheets directly on the page, with no surrounding tinted field or framing border. Both sheets are unrotated and top-aligned, and use tight two-layer contact shadows, semantic captions, lazy-loaded images, and the shared hierarchical reveal. Below 768px the composition becomes a single column.

The proposition-outcomes section uses an unmarked standard heading, supporting copy, and a three-column `.outcome-grid`. Each numbered outcome reuses `.detail-box` with the warm surface and shared medium radius. The cards use equal desktop sizing and collapse to one column below 768px. A separate `.measure-list` follows beneath the cards; it remains unboxed and uses semantic `dt`/`dd` pairs with spacing tokens to preserve the screenshot’s quieter measurement hierarchy. The list is indented as a block, and each item is a two-column row: a decorative accent check-ring SVG sits in the left gutter while the `dt` and `dd` share the same left edge in the second column.

The user-research section follows the success measures. It combines standard section copy with two isolated, data-driven components: `.user-voice-stack` and `.persona-explorer`, in that order. The section now reads as evidence before conclusion: the overview paragraph sets up the interviews, the `.learning-row` presents what users actually said, and a `.research-bridge` paragraph names the four recurring needs before the persona explorer presents the personas those interviews produced. The persona explorer is a two-part `.persona-layout`: a family map on the left and a standing profile sidebar on the right. The map is a single-column grid of `.persona-row` → `.persona-connector` → `.persona-hub` → `.persona-connector` → `.persona-row`, with the two hub managers above the Turbo Hub node and the three hub members below it. Connectors are pure CSS rather than a drawn diagram. Each outer branch is a single `.persona-connector-elbow` — one box carrying two borders and one `border-radius` — so the turn is a genuine rounded corner and the line stops exactly on the outer node's centre instead of a bar overshooting a stem. The elbow's inset is half a column, `(100% - (nodes - 1) * row gap) / (2 * nodes)`, minus half the line width so the stroke is centred on the node. A `.persona-connector-trunk` runs down the middle: full height when the row has a centred node, and `.persona-connector--half-trunk` clips it to the hub side when the node count is even. Rows wider than three get a straight `.persona-connector-stem` per intermediate node, positioned from a `--stem-position` ratio. `--persona-row-gap` is declared once on `.persona-map` and consumed by both the row gap and the branch inset, so changing the gap keeps every line aligned. `.persona-connector--merge` turns branches upward into the hub and `--split` turns them downward. Personas are identified by family position rather than by personal name: `caseStudy.research.personas` carries relation, tier, label, meta, type, role, goal, pain points, needs, and accent, and the map node, sidebar title, and accessible labels all read from `relation`. Each node renders the generic `createPersonaAvatar()` figure — a placeholder circle-and-silhouette SVG tinted from the persona accent, intended to be swapped for real portraits — and the selected node is marked with an accent ring rather than a filled chip. The sidebar presents all four fields at once (Role, Goal, Pain Points, Needs) instead of a nested tab set, so the panel stays populated for whichever persona is active; list fields render as accent-coloured bullets. Each persona's head and body are built as a `.persona-card-panel` and all five panels share one grid cell in `.persona-card-stack`, with inactive panels held by `visibility: hidden`. The card therefore reserves the height of its tallest persona and never resizes as the selection changes, and the active panel fades in. Within the head, the avatar sits above the relation name and the role, age, and occupation render as separate `.persona-card-tag` pills on their own row rather than one dot-separated meta line. The component cycles personas automatically every 5.2 seconds in the documented order (father, mother, daughter, son, grandmother). Autoplay only runs while the component is at least 25% visible, pauses on hover and on focus within the component, is skipped entirely under `prefers-reduced-motion: reduce`, and stops permanently the first time the reader selects a node, after which the explorer is marked `.is-manual`. Nodes keep tablist semantics with arrow-key navigation, and the sidebar is their shared `tabpanel`. The user-voice stack adapts the second supplied Framer component without adding React: up to four quote cards are layered with alternating offsets and rotations, and the top card cycles to the back. The card carries no chrome — no eyebrow label, dot, click hint, or named attribution block. Its quote is centred both ways, with a single uppercase `.user-voice-source` caption beneath it that reads “User · <type>”, so speakers are identified by life stage (Adult, Young Adult, Teen, Elder) rather than by name. Each voice keeps its type, quote, accent, and background configurable in `caseStudy.research.voices`. The stack advances on its own every six seconds and a click on the top card advances it immediately and restarts that timer, so the sequence keeps moving either way. Like the persona explorer, it only cycles while at least 30% visible, pauses on hover and on focus within the stack, and does not autoplay under `prefers-reduced-motion: reduce`. Below 768px the persona layout stacks the map above the sidebar and tightens `--persona-row-gap`, and the learning/voice row collapses to one column.

The design-question section follows the research findings as an editorial pause before the next product chapter. Its small uppercase Helix eyebrow frames a single centered Larken italic question, which takes its tone from `--heading-ink` like every other heading rather than a hardcoded near-black. The section stays unboxed, uses a viewport-responsive minimum height to preserve the supplied whitespace, and keeps its copy in `caseStudy.designQuestion` so future case studies can replace the prompt without changing markup.

The relationship-definition section resumes the standard narrative layout after the centered question. It reuses the split-weight section heading and body-copy rhythm, then introduces a `.relationship-grid`: two equal responsibility cards followed by one full-width connection card. Each card uses a light dashed outline, a matching numbered marker, and bottom-aligned responsibility copy. The grid collapses to a single column on mobile, while all titles and descriptions remain editable through `caseStudy.relationship`.

The competitive-research section follows the relationship definition. Its heading, introduction, and numbered findings stay aligned to the shared reading width, while `.competitive-board` breaks out of that column to span the full viewport width. The canvas keeps a responsive height of roughly two thirds of the viewport. A subtle `--space-5` dot grid sits over the warm surface so the canvas reads like notebook paper without competing with the collage. It contains only presentation content: a central Larken title and taped research images sourced from `caseStudy.competitiveResearch.images`; no visitor-facing upload or editing controls are rendered. The entire image-and-tape object can be repositioned by pointer dragging or arrow keys, while the tape remains decorative and moves with its image. A numbered `.competitive-insights` list follows the collage as standard narrative content. Image paths, starting positions, widths, rotations, title, and findings are maintained in the source data rather than through public controls.

The product-rules section bridges research and the future flow chapters without repeating abstract values. A cardless `.product-rule-path` reduces the operating model to three concrete steps: the manager sets a boundary, the member spends within it, and requests appear only when that boundary needs to change. A fine connector and numbered circular nodes make the sequence readable as a handoff; the middle node uses the case-study accent as the pivotal independent-spending moment. A short Larken summary closes the section. On mobile the same path becomes vertical, with each rule aligned beside its node. All labels and supporting copy are driven by `caseStudy.productRules`.

The flows section follows the product rules and is driven by the caseStudy.flows data. Each flow has an eyebrow, title, short context paragraph, compact key-interaction media slot, and an ordered list of screens. On desktop the wider 16:9 highlight sits beside the flow copy; on mobile it moves below the copy before the reel. The highlight has no fill, border, radius, or shadow, allowing transparent motion assets to sit directly on the page. The slot can show an image, muted looping video, iframe, or trusted HTML prototype through the shared media API. The flow-scroll component forms a keyboard-focusable, internally scrollable vertical reel with proximity scroll snapping; the surrounding page remains in its normal document flow. Every flow-step places a reusable createPhone screen above a numbered note, while a quiet accent spine communicates sequence without adding navigation controls. The warm dotted surface connects visually to the research canvas, but the narrower shared content width distinguishes execution from exploration. On mobile the reel height, phone width, padding, and note spacing tighten while preserving the same vertical order. New flows and screens require data only; each screen ID remains compatible with CaseStudy.setMedia().


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
- `video`: requires `src`, optional `poster`, `loop`, `muted`, `autoplay`, and `controls`. Autoplay previews should remain muted.
- `iframe`: requires `src`, optional `title` and `allow`.
- `html`: accepts an `html` string for trusted local prototype markup.
- `placeholder`: restores the blank state.

Images, videos, and iframes show a loading state while their source is prepared. Images and videos fall back to an inline error state if the source cannot load.

Available slot IDs are phone-overview, phone-manager, phone-member, phone-closing, flow-create-hub-highlight, flow-create-hub, flow-set-boundary, and flow-invite-member.

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
