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

### In-between elements

An embedded component that sits between narrative blocks defines its top and bottom gaps explicitly with spacing tokens rather than one-off values. The interview card stack is the reference: `--space-12` (48px) below the audience line that introduces it and `--space-16` (64px) before the copy that follows.

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
- The hero and shared case-study section headings use the local Larken files. Component headings, labels, and body content use the local Helix files.
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

Heading weight and tone are centralized as `--heading-weight` and `--heading-ink`. Shared question-style section headings use 32px Larken Medium at weight 500 with 0rem letter spacing throughout each title. The blue hero and centered design-question heading also use Larken. Compact uppercase labels use `--label-weight`, which is intentionally lighter than bold. Case-study section headings are left-aligned; only the hero heading and the design-question editorial pause are centered by design.

Secondary narrative headings use the shared `.subsection-heading` treatment: `--type-subtext` (22px), `--heading-weight` (600), a 1.25 line height, and restrained negative tracking. This applies to “We focused on three core outcomes with Turbo Hub:” and “How we would measure success,” keeping them visibly subordinate to the 32px question-style section headings while remaining stronger than card titles and supporting copy.

The user-research section opens with the left-aligned “Understanding who we were designing for” section heading and its `.section-intro` audience line — “We spoke with PayZapp users across salaried households, from the parent managing the money to teenagers and older family members.” — above the centered `.user-voice-stack` (max 36rem wide). The stack follows the in-between spacing rule (`--space-12` below the audience line, `--space-16` before the following copy). A concise `.research-bridge` remains after the quotes to name four recurring needs before introducing the personas.

Related experience-card and outcome-card body copy remains at 16px with a 1.5 line height. Subsection headings that lead directly into a different structure, such as the proposition outcomes and the success-measure list, may keep a component-specific structural gap.

Narrative introductions beneath full 32px section headings use `.section-intro` at the full `--type-body` (20px) size and `--body-line-height`. The competitive-research, product-rules, flows, and research introductions use this role. Later-page narrative copy, including competitive findings and flow descriptions, also stays at the 20px body size. Compact copy inside structured components, such as product-rule steps and flow notes, uses 16px rather than dropping to metadata sizing.

Reusable content-card titles use `--card-heading-weight: 700` so their labels remain clearly distinct from their supporting text without changing the weight of larger section headings.

All content beneath the hero now uses the full `--content-width` container. Paragraphs no longer have a separate reading-width cap or editorial indentation.

The font families are also centralized in `styles.css`:

```css
--font-display: "Larken", Georgia, serif;
--font-body: "Helix", "Segoe UI", Helvetica, Arial, sans-serif;
```

`--font-display` is used by the blue hero and shared case-study section headings; `--font-body` controls body copy, component headings, and utility text. Both fonts are self-hosted, so the page has no external font dependency.

Boxed metadata groups are centered against the full content container rather than the indented reading column. Each metadata item uses centered internal text alignment, top-aligned rows, and the shared `--space-2` heading-to-description gap so every description begins on the same horizontal line.

The second-section project-details box uses the semantic `--detail-surface` and `--detail-border` color tokens. It spans the full content container and presents three equal centered columns on desktop, collapsing to one column on mobile.

The business-goals group reuses those same warm surface and border tokens. Its outer `.info-panel` establishes the group, while `.info-card` creates three equal goal items that collapse to one column below 768px. Internal padding and gaps only use the documented spacing scale.

The technology-opportunity section uses the standard section heading and full-width reading column. Its concluding opportunity statement uses the same regular 20px body treatment as the surrounding prose and leads directly into the two-column `.experience-grid`; the redundant secondary heading and supporting sentence have been removed. Narrative paragraphs use consistent regular weight, while headings, labels, and component titles retain their separate hierarchy. Each `.experience-card` reuses `.detail-box`, with a small colored circular number badge as its only new visual element. The blue and pink badges distinguish the complementary manager and member experiences; the cards collapse to one column below 768px.

The early-artifact section sits between the technology opportunity and proposition outcomes. `.artifact-stage` presents `TB1.svg` and `TB2.svg` as two paper sheets directly on the page, with no surrounding tinted field or framing border. Both sheets are unrotated and top-aligned, and use tight two-layer contact shadows, semantic captions, lazy-loaded images, and the shared hierarchical reveal. Below 768px the composition becomes a single column.

The proposition-outcomes section uses an unmarked standard heading and a three-column `.outcome-grid`. Each numbered outcome reuses `.detail-box` with the warm surface and shared medium radius. The cards use equal desktop sizing and collapse to one column below 768px. A separate `.measure-list` follows beneath the cards; it remains unboxed and uses semantic `dt`/`dd` pairs with spacing tokens to preserve the screenshot’s quieter measurement hierarchy. The list is indented as a block, and each item is a two-column row: a decorative accent check-ring SVG sits in the left gutter while the `dt` and `dd` share the same left edge in the second column.

The user-research section follows the success measures. It opens with a left-aligned “Understanding who we were designing for” heading and a `.section-intro` audience line, followed by the centered `.user-voice-stack`. A `.research-bridge` paragraph names four recurring needs before the persona explorer presents the personas those interviews produced. The persona explorer is a two-part `.persona-layout`: a family map on the left and a standing profile sidebar on the right. The map is a single-column grid of `.persona-row` → `.persona-connector` → `.persona-hub` → `.persona-connector` → `.persona-row`, with the two hub managers above the Turbo Hub node and the three hub members below it. Connectors are CSS: each outer branch uses one rounded `.persona-connector-elbow`, with an inset calculated from half a column minus half the line width; a centered `.persona-connector-trunk` serves odd rows and `.persona-connector--half-trunk` clips the trunk for even rows. Rows wider than three get straight intermediate `.persona-connector-stem` elements at a `--stem-position` ratio. The shared `--persona-row-gap` controls both row spacing and branch inset. `.persona-connector--merge` turns branches upward into the hub and `--split` turns them downward. Personas are identified by family position: `caseStudy.research.personas` carries relation, tier, label, tags, role, goal, pain points, needs, and accent. Nodes, sidebar titles, and accessible labels use `relation`. Each persona supplies a square transparent portrait asset that `createPersonaAvatar(persona)` reuses in both the family-map node and the selected profile; the selected map node retains a closely fitted accent ring. Map portraits use a restrained responsive diameter so the ring never obscures the connector endpoint. The sidebar shows Role, Goal, Pain Points, and Needs together in one shared `tabpanel`, with accent bullets for list fields. All five persona panels occupy one grid cell and remain stacked, so the card height does not change as the active persona changes. The avatar sits above each relation name, with role, age, and occupation in separate tags. The component cycles in family order every 5.2 seconds only while at least 25% visible, pauses on hover or focus, stops after manual selection, and does not autoplay under reduced motion. Nodes use tablist semantics and arrow-key navigation. The voice stack layers up to four quote cards with alternating offsets and rotations; its caption identifies each speaker by life stage (`User · <type>`). It advances every six seconds or on click, only while at least 30% visible, pauses on hover or focus, and respects reduced motion. Below 768px the persona layout stacks the map above the sidebar and tightens `--persona-row-gap`.

The design-question section follows the research findings as an editorial pause before the next product chapter. Its small uppercase Helix eyebrow frames a single centered Larken italic question, which takes its tone from `--heading-ink` like every other heading rather than a hardcoded near-black. The section stays unboxed and uses the standard `--section-space` rhythm above and below rather than a fixed minimum height, and keeps its copy in `caseStudy.designQuestion` so future case studies can replace the prompt without changing markup.

The relationship-definition section resumes the standard narrative layout after the centered question. It reuses the consistent-weight section heading and body-copy rhythm, then introduces a semantic `.relationship-map` rather than a grid of interchangeable cards. Hub Manager and Hub Member are presented as unboxed role stations with custom inline SVG symbols: the manager graphic shows one control point connected to multiple boundaries, while the member graphic shows an independent payment card. A central Turbo Hub node sits between two directional routes: “Boundaries + access” moves from manager to member, while “Spending + requests” returns toward the manager. Role headings use 22px semibold Helix, uppercase responsibility labels use 14px semibold Helix, and role descriptions use 18px Helix at a 1.5 line height. Below 768px the roles stack vertically, the two routes become parallel vertical paths with correct arrow directions, and the reading order remains Manager → exchange → Member. All role copy remains editable through `caseStudy.relationship`; connector labels describe the same existing boundaries, access, spending, and request model.

The competitive-research section follows the relationship definition. Its heading, full-size 20px introduction, and unnumbered findings stay aligned to the shared reading width, while `.competitive-board` breaks out of that column to a centered maximum of 120% of the content width, staying capped at the full viewport width on narrower screens. The canvas keeps a responsive height of roughly two thirds of the viewport. A subtle `--space-5` dot grid sits over the warm surface so the canvas reads like notebook paper without competing with the collage. It contains only presentation content: a central Larken title and taped research images sourced from `caseStudy.competitiveResearch.images`; no visitor-facing upload or editing controls are rendered. The entire image-and-tape object can be repositioned by pointer dragging or arrow keys, and travel is allowed up to 60% of an item’s own size past any edge, where it clips against the rounded board surface, while the tape remains decorative and moves with its image. Unnumbered finding articles follow the collage as standard 20px narrative content, each keeping its heading and description together. Image paths, starting positions, widths, rotations, title, and findings are maintained in the source data rather than through public controls.

The product-rules section bridges research and the future flow chapters without repeating abstract values. A cardless `.product-rule-path` reduces the operating model to three concrete steps: the manager sets a boundary, the member spends within it, and requests appear only when that boundary needs to change. A fine connector and numbered circular nodes make the sequence readable as a handoff. Each 3.5rem node carries a fill — `--accent-soft` with `--accent-strong` numerals for the outer steps, the solid accent for the middle node as the pivotal independent-spending moment — and the numbers use 1rem semibold tabular figures. Step content is top-packed so all three headings align on one line despite unequal copy lengths. A short Larken summary closes the section. On mobile the same path becomes vertical, with each rule aligned beside its node. All labels and supporting copy are driven by `caseStudy.productRules`.

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

Every phone created by `createPhone()` places the transparent casing above its `.media-slot`, which is clipped to the screen opening. Phones render in their final visible state in `.phone-stage`, `.closing-stage`, annotation bands, and future wrappers.

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

- Inside `.annotation-band`, `.annotation-copy` uses its grid layout without word-level wrappers. The phone uses the shared `createPhone()` structure.
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
- Nonessential interaction motion is disabled when `prefers-reduced-motion` is enabled.

## Scroll progress

The fixed `.scroll-progress` component occupies the far-left viewport edge. Its accent fill scales vertically from the top according to page scroll progress, while the unfilled portion remains fully transparent so there is no empty rail. The component is controlled by `--progress-bar-width: 9px`, `--progress-label-size: 0.8125rem`, and `--progress-label-tracking: 0.05em`. The percentage label uses bold Helix with tabular numerals, follows the fill tip, and is clamped inside the viewport at both extremes. Fill, tip, and number update immediately from the current scroll position without animation-frame interpolation. The component exposes native progress-bar semantics through `aria-valuenow`.

## Motion behavior

The page has no scroll-triggered reveal system. Sections, cards, and paragraphs render immediately in their final positions; paragraphs are not split or measured by JavaScript. The scroll-progress indicator updates directly from scroll position without interpolation. Remaining motion supports user interactions: the timeline dialog, draggable research images, quote and persona controls, and component hover/focus feedback. The quote and persona autoplay behaviors pause on hover and focus, run only while visible, and stop under `prefers-reduced-motion: reduce`.
