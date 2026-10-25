# Optional case-study reveal motion

11 October 2026. The user authorized restoring the earlier scroll entrance
interaction as a reversible option, without significantly refactoring the page.

## Switch and ownership

case-study-kit/case-reveal.js and case-reveal.css are separate, page-owned presentation modules shared by every case study.
index.html loads them after the existing case-study renderer and navigation.
The user subsequently requested default-on behavior. No parameter enables
reveals; ?reveal=1 remains supported and ?reveal=0 disables them. This composes with ?nav=1, 2 or 3. Runtime switching uses
CaseStudyReveal.setEnabled(true/false); enabled reports the requested preference
and active reports whether animation is running under current capabilities.
CaseStudyReveal.refresh() supports a deliberate editorial rerender.

The explicit disabled branch creates no observers, word spans or reveal attributes. CSS
only applies motion when JavaScript has explicitly activated the root flag.
Disabling removes all owned attributes/styles/timers/observers and restores the
original text nodes. No changes were made to script.js or shared component
renderers, tokens, registry entries, product screens or studio implementation.

## Entrances and line grouping

Eligible page-owned headings, editorial cards, narrative paragraphs and static
media groups slide upward by --space-10 (40px) over 560ms with a
cubic-bezier(0.25, 0.1, 0.25, 1) easing. Opacity fades in over only the first 140ms;
the remaining 420ms of the slide stays fully visible. There is no blur. Independent CSS translate preserves
existing transform-based feedback. Words rise 1em. A separate preparation
observer splits suitable paragraphs 80px before viewport entry; the slide
observer starts 80px inside the viewport. This prepares text before it is seen;
whitespace and inline emphasis remain in place. Words are grouped by measured
offsetTop (2px tolerance), and the first word of each line is observed.

Entrances trigger at 1% intersection with the lower observation edge inset
80px inside the viewport. The earlier positive 8% margin played the slide
below the visible bottom edge; the inset keeps the upward motion visible. Visible
targets in the same 12px vertical band share timing. Each observer batch uses
55ms row staggering capped at 220ms, with no page-wide queue that could postpone
content through long sections. After completion, temporary word spans unwrap
back to the original text nodes. Resizing and font readiness regroup unfinished
lines; previously read words stay visible. Playback is once per element.

Heading/body ordering correction: headings start without a batch delay. Body
paragraphs and their measured lines depend on the preceding eligible heading
in their case-study section, and cannot start before it. Body lines in view are
rechecked after the heading starts and use at least a 55ms local delay. Unsplit
paragraphs stay pending until their words are ready, avoiding an early flash
of body copy. Headings already above the viewport are considered read, so later
body text does not wait for an offscreen trigger. Navigation shows its heading
immediately while following text keeps its normal line reveals. The first
body row starts at 55ms; subsequent rows in the same batch advance by 55ms,
removing the former duplicate 55ms delay on the first two rows.

Visual groups reveal intact: family illustrations, flow screen/character figures,
persona explorers, research boards, artifact galleries, relationship diagrams,
card grids, exploration screen figures, phone groups, learning screen groups and
closing screen stages enter without a stagger delay. Their nested controls,
captions and card descriptions receive no separate entrance or text splitting.
The default-on option retains its explicit off switch and once-per-element behavior.

Subsection prose correction: flow introduction/chapter headers and complete
scenes were previously grouped, causing the Meet the Sharmas paragraph and
similar copy to bypass line splitting. Only their visual figures are now grouped.
Flow subsection headings and the narrative paragraphs immediately below them
reveal separately, heading first and then measured lines. Exploration direction
headings and their following narrative paragraphs use the same sequence. This
does not add line splitting to boxed rationale notes, bubbles, card descriptions
or embedded product components. Inline links within eligible narrative text
keep their original anchor nodes and can participate in line reveals.

The right-edge annotation flower and its adjacent full-product screen reveal
through their common page-owned annotation-band, sharing the exact trigger,
distance, fade and slide timing. The nested closing-stage is not separately
animated; the flower's existing positioning transform stays intact.

## Reuse audit and behavior safeguards

The app registry identifies th-* controls, user-voice-stack, case-ending__card
and family-story__loop-step as component owners. These roots and their contents
are excluded from direct decoration. Page-owned groups around components may
reveal together without changing their internal rendering or behavior. Hero
depth motion, Impact's assembly artwork and closing flower composition retain
their own animation owners. Flow playback, persona switching and draggable
research/artifact behavior remain owned by their existing implementations.
Nested targets inside a selected page-owned card do not receive a second reveal.
Paragraphs containing fields or actions reveal as intact blocks. Eligible prose
with inline links preserves the anchor elements while splitting text nodes. Text styling inherits the existing typography.

Fragment navigation, heading focus and in-page navigation clicks immediately
show only the destination heading or focused group, preserving following body
line reveals. Focus within a linked paragraph shows that paragraph without
skipping adjacent copy. Reduced
motion skips animation and splitting; a live preference change restores the
original content. Printing restores the DOM and uses visible CSS fallback.
Page hide cancels work, and page show resumes the requested mode. Missing
IntersectionObserver or a preparation/measurement failure leaves original,
readable content. Disabling during an animation also clears already-shown
targets, not just pending records.

## Reading-line revision

11 October 2026. The user reported headings sometimes already visible while
their body text then appeared. Causes: headings entered as instant whole blocks
(140ms fade, no delay) while body text used a separate prepare-then-reveal path
with heading waits; some headings, such as the Impact future title, matched no
selector at all. The sections above describing the preparation observer,
80px insets, 55ms/220ms stagger and heading waits are superseded.

The module now uses one rule. A single IntersectionObserver defines a reading
line 85% down the viewport; an element or line starts entering when its top
crosses it. A 100000px top margin counts everything above the line too, so a
fast jump cannot leave skipped content hidden; lines already above the viewport
show instantly. Headings, subheadings and narrative paragraphs are split into
words at startup (layout is read for all candidates before any writes) and
grouped into lines by offsetTop, which ignores the pending translate. Each line
is triggered by its first word. Text-free inline art, such as the heading
flower, joins the first heading line. Lines crossing in the same frame cascade
top to bottom in 60ms steps, capped at 360ms. No line waits on another element:
headings lead because they sit above their body. At the page end, visible
lines still below the reading line are revealed. Blocks unwrap 1060ms after
their last line starts (maximum delay plus slide). The fade is now 320ms so
headings slide in rather than pop. The TLDR heading and copy (#overview > .reading-column) are
excluded and stay visible from the start. Units, other exclusions, navigation, reduced
motion, printing, toggling and failure cleanup are unchanged.

## Verification

Nineteen Node DOM-harness checks cover default activation, off-mode no-ops,
runtime cleanup, the single reading-line observer and per-line triggers,
heading/body cascades in one batch, independent body lines, the cascade cap and
instant reveal of skipped lines, untouched content above the start position,
component exclusion and intact links, whole units without replay, subsection
heading and prose splitting, unwrapping without replay, the shared annotation
entrance, resize/font regrouping, page-end reveal, section navigation, link
focus, both Zeta technology paragraphs, reduced motion/printing/missing
observers and measurement-failure cleanup. All 92 Node checks in tests/ pass.
No browser testing or visual review was performed, per the repository policy.
The user should review line wrapping, cascade timing and the reading-line
position at wide and narrow sizes, and compare with reveal=0.
