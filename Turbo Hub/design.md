# Case Study Design System

## Floating reading navigation

Two variants are preserved through `?nav=1|2`. Version 1 is the default.

Visual thesis: a quiet white reading tray, soft blue feedback and a separate
small control, with enough air to keep the navigation secondary to the story.
Content plan: five short section labels, one current-section marker, then a
separate icon control; no extra copy or decoration.
Interaction thesis: the tray retracts and fades while its control glides to the
viewport center; reopening reverses that same motion. Hover softly reveals a
light blue highlight, while the current-section underline stays distinct.

Version 1 has a 56px-high white tray with 22px corners and Helix utility text.
The whole assembly is capped at 460px with viewport gutters. A separate 44px
control with 16px corners sits to its right across a 10px gap, vertically centered.
Its 20px Regular Phosphor icon points diagonally inward to collapse and outward
to expand. The fine arrow geometry retains the same size in both states.
`reading-collapse` and `reading-expand` resolve through the shared icon provider,
with canonical Regular, Bold and Fill geometry available in Iconography.
The control keeps its center-arrival spring bounce. Its icon has only a gentle
velocity-driven 6% stretch and 8% squash rather than a thick resizing dash.
All motion uses the existing single animation clock and honors reduced motion.

The tray has 6px vertical and 10px horizontal padding, 44px link targets, 8px
link insets and evenly distributed space between labels. Responsive insets
reduce at 420px and 360px to preserve all labels without changing their font.

Hover uses the existing light blue accent surface, inset 4px vertically with
10px corners. Only the current section has the short blue underline. Keyboard
focus remains outlined. The tray surface contracts horizontally and fades;
labels fade without scaling. The separate control travels from the right edge
to the exact horizontal center when collapsed, then returns on expansion.

One requestAnimationFrame controller owns the complete spring: natural frequency
20 rad/s and damping ratio 0.6. Its exact spring integration preserves velocity
on reversal, preventing jumps during repeated clicks. Surface reveal, label opacity, icon deformation and control travel all derive
from the same position. Hidden links become inert immediately and visibility
changes only after the spring settles. The clock stops at rest, on page hide or
when reduced motion is enabled. Reduced motion resolves immediately to the
requested state. Escape minimizes and focuses the control; section selection
leaves the tray expanded. Syntax, simulated state/rapid-reversal checks at
30/60fps and the Impeccable detector passed. Browser review remains with the user.

Version 2 retains a 44px × 120px right-edge Sections bookmark. Its 200px vertical
index opens 8px to the left, uses five 44px links and a connected current-section
dot rail, and closes on selection, Escape, outside click or focus leaving. Its
220ms slide is disabled under reduced motion. Mobile places it 96px above the
bottom safe area. Product components are unchanged.

Both versions update the fragment and focus the destination heading without
an extra scroll. Neither locks scrolling or traps focus.

## What we chose to leave out

A deliberately compact section after #flows: one short paragraph, two static
screen concepts side by side, and one short description beneath. The screens
reconstruct the all-at-once setup and generic app welcome left out of the final
direction. They are illustrative alternatives inferred at the user’s request,
not historical wireframes or tested screens. Source: create-flow and
whatsapp-invite-flow in flow-story-data.js, with payment activation kept in the
member profile. The invitation-led entry remains a proposed prototype direction.

SVG screen concepts live in assets/tradeoffs/; they are page-owned illustrations,
not new product screens or independently interactive components. Both use the
existing blue chrome/light surface language. Captions and copy reuse editorial
typography and spacing. No links, repeated subheadings, timeline diagrams or
additional rationale blocks are added. They stay side by side on narrow screens,
scale to their columns, and have descriptive alternative text. Browser review
remains with the user.

## Impact & future

Reference-led composition: six thin colored selection frames with square corner
handles, oversized colored numbers, overlapping white-text caption bubbles with
tails, and two red highlighted text frames. Blue activation sits top-left, purple
repeat usage top-right, orange payment activity bottom-left and green activation
uplift bottom-right; red explanation frames sit above and below the central
italic Larken statement. This follows the user-supplied image composition.

All numbers remain explicitly illustrative assumptions: activation 40% → 70%,
repeat use 25% → 45%, payments/active Hub/month 4 → 8, with activation uplift
+30 percentage points. These map to the three earlier success metrics; no
measured results, shipping claims or fabricated testimonials are presented.

The editorial stage uses a 70rem-wide composition. Lower frames anchor 32px
below the measured central text, with 520px of canvas reserved after that anchor; mobile uses
two side frames, a central text frame, central statement, two lower side frames
and the final text frame with a 560px reserve below the same measured anchor. Overflow is visible, and both caption
bubbles and frames are included in movement-bound measurements. Resize computes
horizontal viewport and vertical canvas travel bounds before scroll transforms;
scroll uses one passive, coalesced frame controller. Each note has its own
viewport-relative progress, with linear 220px requested desktop travel and
140px vertical travel on mobile. Bounds still cap horizontal travel at the
viewport edges. Upper notes animate on their own viewport entry. Lower notes converge with
the central statement, preventing ongoing downward travel from creating an
empty band beneath it. Blue/purple frames are 180px tall (165px mobile), their
smaller bubbles are lifted, and purple is widened. Red frames render just the
highlighted paragraph, without a kind label or heading. Callouts stay inside those
bounds while gathering, including the caption overhangs. Reduced motion settles
the composition immediately. Layout and graphics are page-owned; no product
control internals are overridden. Browser/visual review remains with the user.

## Standalone onboarding prototype

The isolated `prototypes/onboarding/` app follows the supplied reference layout: top-left pagination, left-aligned headline and short copy, a single central illustration, and a bottom CTA. The background (`#e7efff`), blue buttons (`#356cdf`, hover `#2857c8`), and off-black text (`#3f4652`) reuse the case-study palette, with secondary text `#58677d`. Local Helix typography uses 2.05rem headings; both lines have the same semibold weight, size, tracking, and 1.2 line height for optical consistency. Body copy is 1.04rem with 1.55 line height and a 1rem gap below the heading. No logo, close/skip control, badges, counters, footer tagline, or simulated UI widgets are present.

Three transparent generated illustrations show a family home, coin purse, and shopping bag. Each is a static image with no interaction. Blue variants replace purple and mint with cobalt and powder blue while retaining gold details. Illustration width is reduced with 0.25rem side margins to accommodate larger copy. Compact headings are 1.85rem and body copy is 1rem. Buttons have centered labels with a 1px upward optical adjustment, 0.035em letter spacing, and no arrows. Pagination uses 8px dots and a 24px active pill, with an equal 6px edge-to-edge gap in every active state. Indicator buttons follow the visible shape width and retain a 44px vertical target.

The app fills its iframe up to 480px wide, with a 480px minimum height. Recommended viewport is 390 × 780; compact support starts at 260 × 480. Below 600px tall, top spacing and typography tighten. The separate preview reuses the existing phone casing and screen insets. Navigation supports the primary button, top pagination, arrow keys, and swipes. Completion shows a replay state and emits the existing event without creating an account. Copy and illustration entrances last 300ms and 450ms; reduced motion disables animations. Inactive slides remain hidden and inert. See the prototype README for embedding.

This page uses a small token system so spacing can be changed globally instead of being corrected element by element.

## Master spacing token

### Visual reference

`tokens.html` provides live specimens of the six content roles and the two utility exceptions, actual-length spacing bars, semantic rhythm diagrams, and a searchable inventory of all shared root tokens. Measurements read computed styles from the same `styles.css` used by the case study, including the mobile overrides; resize below 48rem to inspect them. `tokens.js` lists token names without duplicating their values. When adding or removing a root token, synchronize that name list. The reference has its own utility layout styles and does not load the case-study renderer.

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
| `--space-16` | unit x 16 | 64px | Desktop subgroup separation |
| `--space-20` | unit x 20 | 80px | Large scale value |
| `--space-24` | unit x 24 | 96px | Large scale value |
| `--space-28` | unit x 28 | 112px | Mobile section separation |
| `--space-32` | unit x 32 | 128px | Large scale value |
| `--space-40` | unit x 40 | 160px | Mobile editorial pause |

### In-between elements

Paragraphs within one narrative block stay together with 12px gaps, smaller than the section heading-to-copy gap (20px desktop / 16px mobile). Compact card title-to-detail pairs use 8px. Copy and supporting media remain associated at 56px desktop / 52px mobile; related subgroups separate at 64px / 48px; distinct sections separate at 144px / 112px. The central question retains its explicitly requested editorial pause. Each boundary has one spacing owner so padding and margins do not accidentally add together. The quote stack reserves `--quote-stack-clearance` (40px) for transformed cards. The research bridge adds the full `--subgroup-gap` after that reserved clearance (64px desktop / 48px mobile), creating a roomier local boundary totaling 104px / 88px from the base stack box. Geometry-specific connector spacing remains separate from reading rhythm.

## Layout control tokens

Use these when the problem is specific rather than global:

| Token | Controls |
| --- | --- |
| `--layout-gutter` | Left and right page padding |
| `--section-space` | Vertical distance between major sections: 144px desktop / 112px mobile |
| `--section-pause-space` | Space around the central design question: 240px desktop / 192px mobile |
| `--subgroup-gap` | Related groups within a section: 64px desktop / 48px mobile |
| `--content-width` | Shared maximum width for the hero and body |
| `--wide-content-width` | 70rem (1120px) maximum for card groups and the persona explorer |
| `--hero-radius` | Bottom-corner roundness of the blue hero area |

Recommended adjustment order:

1. Change `--space-unit` if the entire page feels too tight or too loose.
2. Change `--section-space` if only major section gaps feel wrong.
3. Change `--layout-gutter` if the page feels cramped near the viewport edges.

The hero and content shell both resolve their width from the same `--content-width: 58rem` token. Their outer left and right edges therefore remain aligned at every viewport size, while `--layout-gutter` supplies the shared responsive margin.

Structured blocks have a separate width hierarchy: `.experience-grid`, `.outcome-grid`, and `.measures-block` expand to `min(--wide-content-width, viewport width minus both layout gutters)`. Symmetric inline margins center them beyond the narrative container. On narrower viewports they naturally use the same available width as the copy. This changes horizontal space only; their shared type, padding, and vertical rhythm are retained. The persona map sits above the selected profile, separated by the shared component gap. Profile details use two columns on desktop and one on mobile. The Category / My Role / Team `.meta-strip` uses 100% of the body-copy container (58rem maximum), with aligned outer edges. Contact/timeline summaries and phone stages keep their existing widths; the competitive collage retains its own breakout geometry.

## Shape, color, and type

- Corners follow one soft-radius system through `--radius-small`, `--radius-medium`, and `--radius-large`.
- `--accent` is the only interactive and identity accent.
- `--ink: #3f4652` is the shared off-black for emphasized body copy and interface text; strong text should not fall back to pure black or the former near-black navy.
- The page is deliberately locked to light mode to match the supplied case-study reference.
- The hero and shared case-study section headings use the local Larken files. Component headings, labels, and body content use the local Helix files.
- The hero/header uses `assets/bg.webp` on an oversized decorative background layer. The `.hero-scroll-stage` supplies 1200px perspective with no extra padding or pinned scroll travel. `setupHeroScroll()` uses the untransformed stage position and smoothstep progress to tilt the hero back by up to 4 degrees, shrink it to 95% during the first half of its normal departure. Its background drifts 16px. The effect reverses on upward scroll; the hero leaves naturally with the page. Updates run once per animation frame. Reduced motion removes the transforms and background motion, including when the preference changes during the session.

The case study has six content roles. Use the complete `--font-*` shorthand for a role, rather than setting a local size or weight. Sizes use rem units (desktop pixel equivalents below assume a 16px root). Mobile values are centralized below 48rem.

| Role | Size token | Font shorthand | Font / weight | Desktop → mobile | Leading |
| --- | --- | --- | --- | --- | --- |
| Hero heading | `--type-hero` | `--font-hero` | Larken / 700 | 48 → 40px | 1.15 |
| Hero subheading | `--type-subtext` | `--font-hero-subheading` | Helix / 400 | 22 → 20px | 1.5 |
| Section heading | `--type-heading` | `--font-heading` | Larken / 500 | 32 → 28px | 1.25 |
| Body | `--type-body` | `--font-body-copy` | Helix / 400 | 20 → 18px | 1.65 |
| Small heading | `--type-small-heading` | `--font-small-heading` | Helix / 600 | 22 → 20px | 1.3 |
| Small body | `--type-small-body` | `--font-small-body` | Helix / 400 | 18 → 16px | 1.6 |

Hero supporting text, section prose, and component descriptions have distinct roles even when two roles share a size. The TL;DR, flow titles, design question, board title, and timeline dialog title share the section-heading role. Card titles, metadata headings, relationship roles, success-measure titles, subsection headings, and persona profile names share the small-heading role. Card descriptions, timeline copy, relationship descriptions, flow notes, and persona details share the small-body role. Quotes use the body role.

Compact captions, graph node labels, tags, sequence badges, and controls share `--font-utility` (14px Helix, weight 500, leading 1.5). Phone media loading/error status is the one constrained-surface exception, using `--font-media-status` (12px). These are utility roles, never substitutes for narrative or card body copy. The scroll progress label uses the utility size with bold weight and tabular numerals.

Heading tracking is `--tracking-heading: -0.02em`; body tracking is `--tracking-body: 0`; uppercase labels use `--tracking-label: 0.04em`. Editorial question and collage headings retain italic styling. All headings use `--heading-ink` except the existing accent TL;DR and reversed hero/contact text. All section headings remain left-aligned except the existing centered editorial pauses.

The shared semantic spacing aliases are:

| Token | Desktop → mobile | Use |
| --- | --- | --- |
| `--paragraph-gap` | 12px | Between narrative paragraphs |
| `--heading-copy-gap` | 20 → 16px | Section title to supporting copy |
| `--component-copy-gap` | 8px | Compact title to description |
| `--component-gap` | 24px | Card groups and persona detail groups |
| `--component-padding` | 40 → 32px | Content cards and persona profiles |
| `--compact-padding` | 24 → 20px | Compact summary components |
| `--compact-copy-gap` | 8px | Compact summary title to detail |
| `--narrative-media-gap` | 56 → 52px | Narrative to phones, cards, personas, research/rule components |
| `--subgroup-gap` | 64 → 48px | Related groups within a section |
| `--section-space` | 144 → 112px | Distinct sections |
| `--section-pause-space` | 208 → 160px | Space before and after the central design question |
| `--quote-stack-clearance` | 40px | Reserved room for rotated quote cards; included in the subgroup gap |

These derive from the existing 4px scale; section spacing and the editorial pause use their semantic tokens, and shared container widths retain their existing layout tokens. Component structure can still use scale tokens for geometry-specific offsets. Do not introduce one-off content font sizes or independent mobile font overrides.

The user-research section opens with the left-aligned “Understanding who we were designing for” section heading and its `.section-intro` audience line — “Existing PayZapp data gave us an initial picture of prepaid users. They were largely salaried adults between 20–55, with many already married and managing money within a family. Through interviews, we explored how money actually moved within these households from everyday spending and allowances to supporting children or parents.” — above the centered `.user-voice-stack` (max 36rem wide). The stack uses `--narrative-media-gap` below the audience line and a combined `--subgroup-gap` before the following copy. A concise `.research-bridge` follows the quotes, explaining how interviews revealed current family money management while personas framed the wider household’s needs.

Experience-card and outcome-card descriptions use the shared small-body role (18px desktop, 16px mobile; leading 1.6). Subsection headings use `--component-copy-gap` before compact descriptions or measure lists; headings introducing card grids use `--narrative-media-gap`.

Narrative introductions beneath full 32px section headings use `.section-intro` at the full `--type-body` (20px) size and `--body-line-height`. The competitive-research, product-rules, flows, and research introductions use this role. Later-page narrative copy, including competitive findings and flow descriptions, also stays at the 20px body size. Compact copy inside structured components, such as product-rule steps and flow notes, uses the shared small-body role.

Reusable content-card titles use `--card-heading-weight: 600` so their labels remain clearly distinct from their supporting text without changing the weight of larger section headings.

Content beneath the hero uses the shared `--content-width` container without editorial indentation. Standard `.body-copy` paragraphs have no extra width cap; selected introductions, relationship descriptions, and flow copy retain component-specific reading-width limits.

The font families are also centralized in `styles.css`:

```css
--font-display: "Larken", Georgia, serif;
--font-body: "Helix", "Segoe UI", Helvetica, Arial, sans-serif;
```

`--font-display` is used by the blue hero and shared case-study section headings; `--font-body` controls body copy, component headings, and utility text. Both fonts are self-hosted, so the page has no external font dependency.

Boxed metadata groups are centered against the full content container rather than the indented reading column. Each metadata item uses centered internal text alignment, top-aligned rows, and the shared `--component-copy-gap` heading-to-description gap so every description begins on the same horizontal line.

The second-section project-details box uses the semantic `--detail-surface` and `--detail-border` color tokens. It spans the full content container and presents three equal centered columns on desktop, collapsing to one column on mobile.

The business-goals group is an open, unboxed layout within the main 58rem content column. The small “The Business Goals” heading introduces three numbered rows with horizontal rules. Desktop rows align a 3rem number column, title (0.85fr), and description (1.4fr), using `--component-gap` and 32px vertical padding. Mobile rows use a 2rem number column beside the title and description, 16px column gaps, 8px title-to-copy gaps, and 24px vertical padding. Shared small-heading and small-body roles remain in use. Goal titles use a softer slate mixed from 20% `--heading-ink` and 80% `--ink-soft`.

The technology-opportunity section uses the standard section heading and full-width reading column. Its concluding opportunity statement uses the same regular 20px body treatment as the surrounding prose and leads directly into the two-column `.experience-grid`; the redundant secondary heading and supporting sentence have been removed. Narrative paragraphs use consistent regular weight, while headings, labels, and component titles retain their separate hierarchy. Each `.experience-card` reuses `.detail-box`, with a small colored circular number badge as its only new visual element. The blue and pink badges distinguish the complementary manager and member experiences; the cards collapse to one column below 768px.

The early-artifact section at the bottom of the page presents `TB1.svg`, `TB2.svg`, `TB3.svg`, and `TB4.svg` in order in an equal-width four-column grid with 16px gaps. The paper sheets are unrotated and top-aligned, with tight two-layer contact shadows, semantic captions, lazy-loaded images, and uncropped artwork. Below 768px the gallery becomes two columns. Each sketch opens at full size in a new tab for closer reading.

The proposition-outcomes section uses an unmarked standard heading and a three-column `.outcome-grid`. Each numbered outcome reuses `.detail-box` with the warm surface and shared medium radius. The cards use equal desktop sizing and collapse to one column below 768px. A separate `.measure-list` follows beneath the cards; it remains unboxed and uses semantic `dt`/`dd` pairs with spacing tokens to preserve the screenshot’s quieter measurement hierarchy. The list is indented as a block, and each item is a two-column row: a decorative accent check-ring SVG sits in the left gutter while the `dt` and `dd` share the same left edge in the second column.

The user-research section follows the success measures. It opens with a left-aligned “Understanding who we were designing for” heading and a `.section-intro` audience line, followed by the centered `.user-voice-stack`. A `.research-bridge` paragraph connects the interview findings to the wider household needs before the persona explorer. The persona explorer is a two-part `.persona-layout`: a family map above the selected profile card. The map is a single-column grid of `.persona-row` → `.persona-connector` → `.persona-hub` → `.persona-connector` → `.persona-row`, with the two hub managers above the Turbo Hub node and the three hub members below it. Connectors are CSS: each outer branch uses one rounded `.persona-connector-elbow`, with an inset calculated from half a column minus half the line width; a centered `.persona-connector-trunk` serves odd rows and `.persona-connector--half-trunk` clips the trunk for even rows. Rows wider than three get straight intermediate `.persona-connector-stem` elements at a `--stem-position` ratio. The shared `--persona-row-gap` controls both row spacing and branch inset. `.persona-connector--merge` turns branches upward into the hub and `--split` turns them downward. Personas are identified by family position: `caseStudy.research.personas` carries relation, tier, label, tags, role, goal, pain points, needs, and accent. Nodes, sidebar titles, and accessible labels use `relation`. Each persona supplies a square transparent portrait asset that `createPersonaAvatar(persona)` reuses in both the family-map node and the selected profile; the selected map node retains a closely fitted accent ring. Map portraits use a restrained responsive diameter so the ring never obscures the connector endpoint. The sidebar shows Role, Goal, Pain Points, and Needs together in one shared `tabpanel`, with accent bullets for list fields. All five persona panels occupy one grid cell and remain stacked, so the card height does not change as the active persona changes. The 56px avatar sits beside each relation name in a vertically centered header with an 8px gap, with role, age, and occupation in separate tags. The component cycles in family order every 5.2 seconds only while at least 25% visible, pauses on hover or focus, stops after manual selection, and does not autoplay under reduced motion. Nodes use tablist semantics and arrow-key navigation. The voice stack uses overlapping grid cells so the tallest quote reserves the height for every card, preventing text clipping and layout jumps. It layers up to four quote cards with alternating offsets and rotations; its caption identifies each speaker by life stage (`User · <type>`). It advances every six seconds or on click, only while at least 30% visible, pauses on hover or focus, and respects reduced motion. Below 768px the persona layout stacks the map above the sidebar and tightens `--persona-row-gap`.

The design-question section follows the research findings as an editorial pause before the next product chapter. Its small uppercase Helix eyebrow frames a single centered Larken italic question with a component-owned `--question-title-size` (clamp 32–42px, fluid at 3vw) and 1.2 leading. Its understated eyebrow uses `--ink-soft`. The question takes its tone from `--heading-ink` like every other heading rather than a hardcoded near-black. The section stays unboxed and uses `--section-pause-space` above and below (240px desktop / 192px mobile) rather than a fixed minimum height. The label-to-question gap is 16px (12px grid gap plus 4px question margin) at every viewport, and keeps its copy in `caseStudy.designQuestion` so future case studies can replace the prompt without changing markup.

The relationship-definition section resumes the standard narrative layout after the competitive-research findings. It reuses the consistent-weight section heading and body-copy rhythm, then introduces a semantic `.relationship-map` rather than a grid of interchangeable cards. Hub Manager and Hub Member are presented as unboxed role stations with custom inline SVG symbols: the manager graphic shows one control point connected to multiple boundaries, while the member graphic shows an independent payment card. A central Turbo Hub node sits between two directional routes: “Boundaries + access” moves from manager to member, while “Spending + requests” returns toward the manager. Role headings use the small-heading role, uppercase responsibility labels use the utility role, and descriptions use the small-body role. Below 768px the roles stack vertically, the two routes become parallel vertical paths with correct arrow directions, and the reading order remains Manager → exchange → Member. All role copy remains editable through `caseStudy.relationship`; connector labels describe the same existing boundaries, access, spending, and request model.

The competitive-research section follows the centered design question, before the relationship definition. Its heading, full-size 20px introduction, and unnumbered findings stay aligned to the shared reading width, while `.competitive-board` breaks out of that column to a centered maximum of 120% of the content width, staying capped at the full viewport width on narrower screens. The canvas keeps a responsive height of roughly two thirds of the viewport. A subtle `--space-5` dot grid sits over the warm surface so the canvas reads like notebook paper without competing with the collage. It contains only presentation content: a central Larken title and taped research images sourced from `caseStudy.competitiveResearch.images`; no visitor-facing upload or editing controls are rendered. The entire image-and-tape object can be repositioned by pointer dragging or arrow keys, and travel is allowed up to 60% of an item’s own size past any edge, where it clips against the rounded board surface, while the tape remains decorative and moves with its image. Unnumbered finding articles follow the collage as standard 20px narrative content, each keeping its heading and description together. Image paths, starting positions, widths, rotations, title, and findings are maintained in the source data rather than through public controls.

The product-rules section bridges research and the future flow chapters without repeating abstract values. A cardless `.product-rule-path` reduces the operating model to three concrete steps: the manager sets a boundary, the member spends within it, and requests appear only when that boundary needs to change. A fine connector and numbered circular nodes make the sequence readable as a handoff. Each 3.5rem node carries a fill — `--accent-soft` with `--accent-strong` numerals for the outer steps, the solid accent for the middle node as the pivotal independent-spending moment — and the numbers use the shared small-body size with tabular figures. Step content is top-packed so all three headings align on one line despite unequal copy lengths. A short small-heading summary closes the section. On mobile the same path becomes vertical, with each rule aligned beside its node. All labels and supporting copy are driven by `caseStudy.productRules`.

The flows section follows the product rules and is driven by the caseStudy.flows data. Each flow has an eyebrow, title, short context paragraph, compact key-interaction media slot, and an ordered list of screens. On desktop the wider 16:9 highlight sits beside the flow copy; on mobile it moves below the copy before the reel. The highlight has no fill, border, radius, or shadow, allowing transparent motion assets to sit directly on the page. The slot can show an image, muted looping video, iframe, or trusted HTML prototype through the shared media API. The flow-scroll component forms a keyboard-focusable, internally scrollable vertical reel with proximity scroll snapping; the surrounding page remains in its normal document flow. Every flow-step places a reusable createPhone screen above a numbered note, while a quiet accent spine communicates sequence without adding navigation controls. The warm dotted surface connects visually to the research canvas, but the narrower shared content width distinguishes execution from exploration. On mobile the reel height, phone width, padding, and note spacing tighten while preserving the same vertical order. New flows and screens require data only; each screen ID remains compatible with CaseStudy.setMedia().


The contact card uses a semibold heading rather than bold. Its supporting paragraph uses the full inner card width without a character-based maximum or balanced wrapping, so lines extend to the right padding naturally. Its action remains understated against the pink surface: the label uses regular Helix, the softened white outline is one pixel, and its corners use `--radius-medium`, and a translucent white fill harmonizes with the pink card. Contact padding is 48px vertically on desktop and `--component-padding` horizontally; mobile uses `--component-padding` on both axes. Its pink shadow uses a restrained 12px offset, 24px blur, and 16% opacity. The checker texture uses a medium responsive tile size that sits between the original broad pattern and the later dense version. This keeps the action legible without competing with the contact heading.

The project-timeline card reuses `.detail-box` as a standalone section after the contact card. The two sections use `--space-8` (32px at every viewport) for their gap, leaving clearance for the softened contact shadow. The timeline surface uses `--compact-padding` vertically (24px desktop / 20px mobile) and `--component-padding` horizontally (40px desktop / 32px mobile) and `--space-1` (4px) between its title and duration, and a 1.75rem radius for a friendly rounded shape without becoming a pill. Its title-and-duration group is balanced by an unboxed `Open` button using the small-body typography role (18px desktop / 16px mobile), a 48px minimum height, 12px vertical padding with no horizontal padding, and the shared medium radius. The arrow aligns to the card’s right content edge, balancing the title’s left inset. The action launches a native modal dialog using the same warm surface, border, radius, and typography tokens. The modal presents the two-month process as a single vertical sequence, locks page scrolling while open, closes by button, Escape, or backdrop interaction, and restores focus to the trigger.

## Asset placeholders

Decorative heading marks use the supplied flower asset through the reusable `.asset-placeholder` component:

- `.asset-placeholder--hero` reserves the hero logo area.
- `.asset-placeholder--icon` displays `assets/heading_flower.svg` as a centered, contained background without the dashed placeholder border or fill. It measures 2.125rem (34px) square, reducing to 1.375rem (22px) beside section headings on mobile. Section marks sit 0.025em from the heading top for optical alignment. Flowers appear only on main section headings. Hovering a section heading plays a 650ms full rotation with cubic-bezier(0.4, 0, 0.2, 1) easing, accompanied by a separate smooth scale pulse from 1 to 1.18 and back. Independent rotate and scale animations keep the turn continuous while the flower grows and settles; its position stays fixed. Leaving and re-entering replays it. This effect is disabled with reduced motion. The mark is decorative and hidden from assistive technology.

For primary `.section-heading` elements, the marker is positioned in the left margin and does not consume content width. The heading text therefore shares the exact left edge used by the paragraph content below it. Secondary headings, including the business-goals title, have no flower.

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

The standalone `#closing` phone preview and the following `#contact` section use `--subgroup-gap` at their boundaries (64px desktop / 48px mobile), rather than full section spacing. This keeps the preview associated with the surrounding content while retaining its existing phone size and annotation geometry.

## Viewport-anchored annotation marks

Sections that pair a centered stage (such as a phone preview) with a side illustration use the annotation-band pattern in `script.js`. `createAnnotationBand(stage, annotation)` wraps the stage in `.annotation-band`, a full-bleed row that spans the viewport so marks can anchor to the true screen edge instead of the content column.

- Inside `.annotation-band`, `.annotation-copy` uses its grid layout without word-level wrappers. The phone uses the shared `createPhone()` structure.
- The band keeps its stage horizontally centered, so the preview stays on the page axis while the mark sits flush with the viewport edge.
- `.annotation-figure` anchors the artwork to the right edge (`right: 0`) and centers it vertically against the stage; `top: 45%` with `translateY(-50%)` adds the small upward optical offset.
- `.annotation-figure--left` mirrors the anchor to the left edge when a future annotation needs it.
- Figure width scales through `clamp(13rem, 32vw, 30rem)`, and `.annotation-mark` fills that box.
- `.annotation-copy` rides in a fixed-proportion box pinned to the artwork (`top: 10%`, `left: 5%`, `width: 36%`, `height: 42%` of the figure) and centers its text both ways. The copy uses the shared `--font-utility` role; text that exceeds the box is clipped inside it. The box fill is transparent.
- Marks are decorative: `alt` stays empty, pointer events are ignored, and the figure is hidden below 768px where it would collide with the stage.

## Responsive behavior

- Below 768px, all six typography roles change through root tokens; card padding changes through its semantic token. Body content keeps the shared full-width alignment.
- The phone group remains a three-phone composition but tightens its gaps and labels.
- The desktop three-phone stage uses `min(100%, 53rem)` (848px maximum), giving the phones roughly 9% more width than the earlier 49rem stage. Existing gaps, casing proportions, and mobile width constraints remain unchanged.
- Metadata and business-goal content collapse to one column.
- Nonessential interaction motion is disabled when `prefers-reduced-motion` is enabled.

## Scroll progress

The fixed `.scroll-progress` component occupies the far-left viewport edge. Its accent fill scales vertically from the top according to page scroll progress, while the unfilled portion remains fully transparent so there is no empty rail. The component is controlled by `--progress-bar-width: 9px`, `--progress-label-size: var(--type-utility)`, and `--progress-label-tracking: 0.05em`. The percentage label uses bold Helix with tabular numerals, follows the fill tip, and is clamped inside the viewport at both extremes. Fill, tip, and number update immediately from the current scroll position without animation-frame interpolation. The component exposes native progress-bar semantics through `aria-valuenow`.

## Motion behavior

The page has no scroll-triggered reveal system. Sections, cards, and paragraphs render immediately in their final positions; paragraphs are not split or measured by JavaScript. The scroll-progress indicator updates directly from scroll position without interpolation. The hero alone has the scroll-linked depth effect described above. Remaining motion supports user interactions: the timeline dialog, draggable research images, quote and persona controls, and component hover/focus feedback. The quote and persona autoplay behaviors pause on hover and focus, run only while visible, and stop under `prefers-reduced-motion: reduce`.

## Rule ownership and verification

`styles.css` is the authority for token values and responsive overrides. This document defines where each role applies. `tokens.html` is the visual reference and reads live computed values through `tokens.js`; the inventory lists all root token names. All three must be updated together when the system changes. Content spacing uses semantic aliases; raw scale tokens are reserved for component geometry, decorative offsets, and interaction targets. The standalone onboarding prototype describes product UI and keeps its own documented typography rather than inheriting case-study editorial roles.
## Standalone flow placement guide

The separate flow-reference page uses local Helix, a white surface, off-black text, and cardless chapter headers. Screen placeholders are neutral gray; suggested additions use pale amber with dashed borders and explicit text labels. Desktop uses three columns, tablet two, and small mobile one. Source notes use native details elements. No entrance or scroll animations are added. The companion does not change main-page tokens or components.

Flow companion revision: task groups associate each screen sequence with one shared decision. Group headings use a 220px desktop label column; mobile stacks the heading and rationale. Placeholder copy is left-aligned and concise. No per-screen caption blocks or guiding closing section remain.

Inline flow references use full-height 9:20 screen windows, with composite panels cropped by CSS positioning. Existing-screen descriptions sit beneath images on the white surface; unavailable screens keep gray or amber placeholders.

Flow companion dark surface: background #171a20, headings #edf0f5, secondary copy #b9c1cd, gray placeholders #292f39, and warm amber suggested-screen placeholders #352d22. Source images remain unchanged.

Companion screen containers align their metadata, titles, and descriptions in 180px desktop headers. Media stages share a 9:20 aspect ratio; long images scroll inside them. Empty stages preserve space for future screens. Mobile headers use their natural height.

Flow chapter introductions use 18px secondary text with a 760px maximum width and 1.65 line height; mobile uses 17px. Group rationale aligns at the top with its heading to accommodate short narrative paragraphs.

Turbo Hub icon foundation uses 24px currentColor Phosphor glyphs behind semantic names. Callers own labels and spacing; icons are decorative unless given a title. Custom SVG can replace a semantic icon centrally. Illustrations remain generic and undefined product states are deferred.

## Turbo Hub prototype foundation

The mobile product prototype is separate from the dark reference guide. It uses Helix, blue #1766dc, white surfaces, ink #1b2940, and 16px radii. Primitive and semantic tokens live under app-design-system/tokens/. Fourteen component renderers share hub.js/hub.css and forms.js/forms.css. The screen owns 24px content insets, section spacing, tab state and transaction expansion. Generic icons and initials replace imagery.

Hub Details uses the existing phone-shell asset around a fixed 390 × 844 logical viewport. The entire screen scales to available preview space without reflowing its content. Status/navigation and a 24px bottom safe area remain fixed while content scrolls internally. The registered 56px status bar uses Phosphor signal, Wi-Fi and battery glyphs with cropped viewBoxes and one shared centerline. Navigation has equal 44px side columns and a centered title; shared flex icon wrappers remove baseline offsets. See decisions/phone-preview.md for dimensions and ownership.

Add Member reuses existing chrome, actions, avatars and member cards. Text field, Select, Switch and Checkbox choice supply the missing form controls. Payment cards configure the same Checkbox choice renderer. Parent forms own validation, values, sequence and section spacing; controls own labels, accessibility, internal layout and feedback.

Shared phone-preview canvas behind the phone shell uses black #000 across product screens.


Typography update: Inter replaces Hellix as the shared default. The local Inter variable font supports weights 100–900; existing regular, medium, semibold and bold assignments remain.

Typography foundations now distinguish Inter family, size and weight primitives from semantic body/heading/action roles. Foundation metadata identifies family and weight samples correctly; registered text styles document role combinations. Verified actual compact Action resolves Inter, weight 600 and size 13px.

The scroll-progress percentage uses `--accent`, matching the TL;DR heading color. Its box sits `--space-1` (4px) from the progress bar, with 4px internal padding and left-aligned text; there is no minimum width adding extra visual separation.

Success measures now follow the copy within the technology-opportunity section using `createOutcomeGrid()` and the same three rounded, numbered cards as proposition outcomes. The shared warm card surface, border, and typography are reused, with a technology-section layout override: three compact stacked cards within the narrative width. Each desktop card aligns a 2rem number column, a 0.9fr title column, and a 1.4fr description column with `--component-gap`, `--compact-padding`, and 16px between cards. Mobile uses a 1.5rem number column beside stacked title and description, with 12px horizontal and 8px vertical gaps. The sketches and proposition-outcome cards are temporarily grouped at the bottom after product rules. The former two manager/member cards are replaced by four research-need cards after the persona conclusion: Control, Visibility, Access, and Independence. They reuse `createExperienceGrid()`, its two-column desktop grid, numbered blue/pink badges, warm rounded card surface, shared padding and typography, and single-column mobile layout. The former outcomes-section measure list is no longer rendered.

Within the technology section, the success-measures heading and cards share the narrative width, aligned with the main heading and copy. The nested grid uses 100% width and no breakout margins, with `--component-gap` (24px) below the heading rather than the default narrative-to-media gap. The group retains `--subgroup-gap` separation from the preceding technology copy.

The interview presentation uses a side-by-side `.research-interviews` layout: an introduction (0.75fr) and an overlapping quote-card stack (1.25fr), vertically centered with `--narrative-media-gap` between them. On mobile they stack with `--component-gap`. Intro and quote both use `--font-body-copy` (20px desktop / 18px mobile). Quote text is centered within the original 28rem maximum with balanced wrapping; speaker attribution retains the utility caption role. The carousel restores the original overlapping, slightly rotated colored cards and accent stripe. All cards share one grid cell, preserving the tallest content height and the original stack clearance. Existing cycling, click, hover/focus pause, and reduced-motion behavior remain.

A narrative paragraph after the persona explorer explains how interview findings and supported family roles informed personas across responsibility, confidence, and independence. It uses the shared body-copy role and subgroup gap.

The older-adult persona is labeled “Elderly member” in the map, profile, and accessible names, retaining the existing portrait and age/occupation details.

Technology narrative and research bridge/conclusion copy use 100% of the shared narrative column, without the former 72ch container cap. Paragraphs wrap naturally at the column’s right edge.

The persona family diagram, connectors, and original accent colors are restored; the selector-rail experiment is removed. Interview quotes retain their individual pastel backgrounds and accent borders, and use exactly four captions: user1, user2, user3, user4, without demographic labels or uppercase transformation.

The persona explorer uses the main narrative column width (58rem maximum) with its outer edges aligned to the body copy, without wide-container breakout margins.

The editorial question adds one decorative 40px heading flower above its eyebrow through an empty CSS pseudo-element, using the existing SVG asset. Flower-to-label spacing is 12px (`--space-3`); label-to-question spacing is 16px (the grid gap plus `--space-1`). These close internal relationships contrast with the larger editorial pause outside the group.

Competitive research uses the supplied Revolut, Greenlight, and Monzo copy after the unchanged draggable canvas. Three unboxed comparison rows pair the product name, lesson title, and observed behavior on the left with “What I took from this” and the Turbo Hub takeaway on the right. Rows use thin shared-line dividers, 32px top padding, narrative-to-media column gaps, and shared typography. Mobile stacks observation and takeaway with the component gap.

The editorial question uses two deliberate line groups, breaking before “while” (after “money”). Above 768px each line group stays on one line, giving exactly two lines. Mobile groups wrap naturally to avoid overflow.

The draggable canvas adds a component-owned `--canvas-edge-expansion: var(--space-16)` (64px): 128px total width and height beyond its previous geometry, centered horizontally and still capped at the viewport width.

Competitive lessons now use compact rows: a 7rem product-name column and a broad content column combining the observation and takeaway with a 12px gap. Rows have 24px top padding and 24px separation, reducing the previous narrow-column wrapping and large gaps. Mobile stacks the product label above the content. The intro includes Revolut, Greenlight, Monzo, and many others.

Competitive lessons use three native details/summary accordions, with Revolut open initially. Each summary pairs product and lesson title with a plus/minus cue; opening reveals unchanged observation and takeaway text. Summary activation switches the open lesson and closes the others; activating the already-open summary leaves it open, ensuring exactly one remains expanded. Native summary keyboard activation follows the same click handler. Thin dividers, 24px row padding, shared typography and native keyboard activation provide a compact, unboxed presentation. Mobile stacks product and title within each summary.

“Defining the roles before designing the screens” uses the supplied copy and the existing responsibility map. Father’s 64px portrait represents the manager; Mother, Daughter, Son, and Elderly member portraits are 64px each, arranged in a horizontal group with a component-owned 24px overlap (`--member-portrait-overlap`, referencing `--space-6`). Hovering the group fans the portraits outward by -12px, -4px, 4px, and 12px over 350ms without changing layout geometry; hover motion is disabled for reduced motion and touch-only devices. Both portrait containers are explicitly 64px high; the member row overrides the legacy square aspect ratio. Role headings sit 8px below the portraits. The original connector routes and responsibility copy remain.

The former “We focused on three core outcomes with Turbo Hub” section is no longer rendered at the bottom. The shared outcome-card renderer remains in use for success measures within the technology section.

The “Turning decisions into product rules” section is no longer rendered, including its intro, three-step path, and closing summary.

Member portrait circles have a solid white fill and a 2px white border without an outer outline. Descending z-index places Mother on top, followed by Daughter, Son, and Elderly member behind.

The “Designing the core flows” section follows the four early sketches. It uses the shared section heading and full reading-column body copy, introducing low-fidelity wireframes and the transition into PayZapp’s existing design language.

Member portraits use a horizontal flex row with fixed 64px circles and identical negative 24px margins between neighbors, ensuring equal overlap and vertical alignment for the elderly member as well. Mother remains above the subsequent portraits.

Relationship role titles sit 8px above their responsibility copy. The central Turbo Hub circle uses matching 16px semibold type on both lines for a balanced label.

The artifact gallery now uses a horizontal scroll-snap strip instead of the compressed four-column grid. Previews are 304px wide (capped at 78vw) with uncropped 384px-high artwork and 24px desktop gaps. It shows the next sheet at the edge to indicate more content, keeps all four sketches in order, and retains full-size image links.

The horizontal gallery was replaced with a compact two-by-two grid: all four sketches stay visible together, with uncropped equal-height previews capped at 272px, 24px desktop gaps, and a lighter paper shadow. Full-size image links remain available.

Artifact layout experiment: an unboxed sketchbook spread, four columns on desktop and two on mobile. Original image proportions are preserved; alternating 32px vertical offsets and subtle rotations create a paper composition, with shadows on the artwork rather than surrounding cards. Hover straightens the selected sheet.

All four artifact sketches are now straight, without rotation at rest or on hover. The unboxed arrangement and alternating vertical offsets remain.

Member portraits use a 0.5px white circle outline. Their PNGs contain transparent padding, so each image is scaled to 122% inside an overflow-hidden circular frame; this reduces the apparent white ring while preserving the overlap and stacking order.

Competitive-research accordion company names use the shared body role (20px desktop / 18px mobile), semibold, with local 28px official brand icons before the text. “What I took from this” uses the shared small-body role (18px / 16px), semibold. The component’s 10.5rem brand column controls both summary alignment and expanded-copy indentation.

The interview quote stack is capped at 28rem (448px) and centred within its column, with a fluid width on narrower screens.

## Family-flow playback presentation

Development screen access: `?dev=true` adds a **View all screens** button beneath
Pause/Play beside each `presentation:'loop'` preview. It opens a native modal
on the case study with a transparent surface, a Close control at the top right,
and a horizontal screen strip over the dimmed backdrop. No panel, heading,
scene description, captions or summaries are rendered.
The overlay uses `TurboFlowStory.render({flowId})` to show only the selected
sequence as centered phone previews capped at 300px, scaled to fit the viewport
height while retaining their aspect ratio. The strip scrolls horizontally when
the phones exceed its width, including on mobile. It keeps deterministic locked
embeds and lazy mounting; it does not start flow playback. Every preview has an **Open full
page** link styled as an editorial button, preserving its route’s query
parameters and opening the standalone prototype in a new tab. Close, Escape
and backdrop dismissal restore focus to View all screens; body scrolling is
locked while open. Overlay IDs are distinct from the case study and other flows.
Page spacing and control styling use existing case-study tokens; product
components are unchanged.

The `kavya-invite-flow` experiment places a clickable vertical ordered step list
to the left of one live 300px phone preview. Each step has a Helix small-body title
and brief explanation, with a thin vertical track that fills over the complete
screen action queue. The current step uses an accent title and subtle accent-soft
background. Selecting a step restarts its screen while respecting Pause/Play;
autoplay advances both the list and the phone together.

The desktop columns are capped at 360px and 300px with `--space-16` between them,
reducing to `--space-8` below 760px. At 640px and below, the list stacks above the
proportionally scaled phone. All content remains within the case-study column.
Step fills pause offscreen/hidden and exclude frame-loading time. Reduced motion
starts paused and replaces continuous fills with discrete progress updates. The
translucent touch dot, tap ripple and shared button press remain independent of
this editorial navigation. Static scene presentation remains available; other
flows retain their current presentation. See `FLOW-PLAYBACK-PLAYBOOK.md` for the
repeatable implementation and restoration rules.

## Simplified Play Store listing — 6 October 2026

The external Play Store fixture keeps a white surface and green pill action,
with the real PayZapp icon, two-line listing title and developer above a three-column
metadata row. Values are a snapshot from the supplied Google Play listing:
4.4, 13.2L reviews, 1Cr+ downloads and Everyone. Three muted portrait skeleton
previews replace unfinished blue promotional blocks. About this app uses a short
capability summary and Finance chip; Data safety uses decorative skeleton lines
rather than invented policy claims. Placeholders are static and hidden from
assistive technology. The app icon is bundled locally with source attribution.

The existing shared light Status bar and phone geometry are unchanged; navigation
icons use TurboIcons. This documented external-app exception removes the shared
Turbo Hub Chrome backdrop class at startup and owns its own white/green styling.
Layout spacing and text sizes use existing primitives. Install still shows local
progress before Open leads to Hub welcome; reduced motion skips the progress fill
animation. Source checks passed; visual and keyboard review remain with the user.

The white PayZapp icon has a 1px gray (#cbd2ce) outline so its rounded boundary
remains visible on the white listing surface. Border-box sizing retains its 72px
footprint and existing 16px corner radius.

## WhatsApp joining playback — 6 October 2026

Neha’s seven-screen joining sequence now uses the existing single-phone playback
and step-list layout: WhatsApp notification → invitation chat → Play Store →
Hub welcome → number verification → joined confirmation → member Hub. It keeps all current
fixtures, routes, proposed flags and product styling. The touch dot visually
opens the notification and invite, presses Install/Open, accepts the terms and
presses Verify and join. The code arrives as one SMS-autofill update rather than
manual typing. The confirmation leads into Neha’s Hub, which holds for 4.2 seconds before repeating.

The Play Store’s locked-only visual adapter shows discrete installation progress
under the common editorial clock, so Pause stops progress immediately. Native
store timers are blocked only in locked embeds. Preparation restores Install,
unchecks welcome terms, clears the code and resets relevant child scroll positions.
Existing manual-step selection, offscreen pause, reduced motion, screen-layer
transition and dev screen access remain shared. Source checks and 37 tests passed;
visual and keyboard review remain with the user.

## Hub welcome layout — 6 October 2026

The earlier invitation layout is restored at the user’s request: family artwork,
inviter and Hub name, overlapping member portraits, then the What you get list
with UPI, card and monthly allowance. Terms and Accept invite remain in that
scrolling content surface. Avatar overlap now belongs to parent wrappers instead
of overriding the registered Avatar. Consent, allowance and autoplay selectors
are retained.

The joining flow now ends inside the Hub. The confirmation keeps its success
feedback and offers Go to Hub. The member dashboard reuses the existing Hub
layout with Neha’s allowance, zero initial spends, Spends/Members tabs and the
shared Card and UPI rows matching Kavya’s profile. Manager-only Add and analytics are omitted. Source tests
cover the seventh scene and repeat; manual visual review remains with the user.

## Six-box OTP and payment options — 6 October 2026

Verification uses a shared six-digit code component composed of registered Text
fields with a digit configuration. Each box is 64px high with centered amount
text and 8px internal insets; a 6-column grid uses 8px gaps. Group validation and
its accessible legend belong to Verification code. Typing advances focus,
backspace/arrows support correction, and pasted or autofilled codes distribute
across boxes. Submission remains explicit. The aggregate input preserves the
existing playback reset/autofill interface. Real canonical specimens cover empty,
partial, complete, error and disabled states; Text field owns digit focus visuals.

Neha’s Hub lists Card and UPI using the shared Payment method renderer, opening
PAN verification and card delivery details respectively. No umbrella setup button
or extra explanatory block remains. Source checks and 41 tests pass; browser and
visual review remain with the user.

## Consistent payment-method rows — 6 October 2026

The first-visit Hub now uses Kavya’s profile treatment: Card first, then UPI,
with dark field-value labels, secondary identifiers, amber pending badges and
chevrons. The same shared Payment method renderer supplies both member profiles
and the member Hub. It extracts the existing profile geometry unchanged: 8px
vertical inset, 12px icon/copy/status gaps and 2px title/identifier gap. Parent
lists retain their 8px gap. Avatar and warning Badge remain registered children;
the row owns its native link and focus outline. Saved-address and active-UPI
profiles preserve their existing destination and pending-state behavior.

Canonical specimens cover pending card, pending UPI, active UPI and saved-address
card. Syntax/catalog checks and 41 existing source tests pass. Visual review
remains with the user.

Welcome benefits container (6 October 2026): the UPI, card and monthly-limit items
share a rounded outlined list, using the existing border, surface and radius tokens
and a 16px inset. The What you get heading remains outside; child Avatar geometry
and 12px row gaps are unchanged. Source review only; visual review remains manual.

## Closing contact card

The existing pink plaid contact card repeats after Impact & future. A single
page-owned createContactSection(id) renderer supplies both #contact and
#contact-end with identical text, LinkedIn action and existing .contact-* styles.
The two instances have distinct IDs. No component styling or product controls
are changed; visual review remains with the user.

Impact canvas ending: the movement reserve is used only to calculate safe travel
bounds on mount/resize. During scroll, the actual canvas height follows the
lowest translated frame or caption plus 24px. Absolute frame destinations do
not depend on that height, so the central statement stays anchored while the
following definitions move with the composition. Once gathered, the bottom
reserve disappears; reduced motion uses the same compact resting height.
No per-frame child measurements are introduced; bounds and drift are cached.

Removed the visible metric-definitions paragraph beneath the impact canvas at
the user’s request. Definitions remain in the data for reference; the section
now moves directly from the floating composition to “Where it goes next”.

Impact top inset: removed 184px of unused top runway on desktop (128px on
mobile) by shifting the first frames, upper red paragraph and central statement
together. The first desktop frames now start at 40px/56px within the canvas,
with a 24px introduction-to-canvas margin. Measured lower-frame anchors and
caption-aware bounds continue to adapt to the updated composition.

Red paragraph line spacing: set the note container to the same 14px/21px
utility typography as its inline highlighted text. This removes the inherited
20px/33px body line-box minimum that was creating gaps between wrapped lines.
# Impact composition refinement

The composition stays at its natural size, with the center at 360px and 40px before the lower group. Notes start hidden and displaced outward in depth; as the headline enters the reading area they fade in and gather with a small stagger. They remain visible once settled. Reverse scrolling reverses the arrival. No pinned scene or extra scroll runway is used. Reduced motion keeps every note visible. Browser review remains manual.

The lower orange and green frames share a top edge and compact 180px desktop height. Their shorter captions overlap by 56px with smaller outward offsets. The middle red note uses a paragraph with an explicit 14px/21px line box to prevent inherited body leading from spreading its highlighted lines. Mobile keeps the two metrics together and places the red note below them. These remain page-owned editorial elements; no registered product component is overridden. Visual review remains with the user.
