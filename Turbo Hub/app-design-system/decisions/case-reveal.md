# Optional case-study reveal motion

11 October 2026. The user authorized restoring the earlier scroll entrance
interaction as a reversible option, without significantly refactoring the page.

## Switch and ownership

case-reveal.js and case-reveal.css are separate, page-owned presentation modules.
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

## Verification

Fifteen Node DOM-harness checks cover default activation, off-mode no-ops, runtime cleanup, measured
line grouping and original-node restoration, component exclusion and intact
links, capped staggering, font/resize regrouping, explicit section navigation,
reduced motion/printing/missing observers, failure cleanup and whole-unit reveals
without nested decoration, splitting, delay or replay, and heading-before-body
ordering across independent observer batches, and the flower/screen shared
entrance. Additional checks use selector matching with the real body-copy
wrapper, exercise both actual Zeta technology paragraphs and verify focus does
not bypass adjacent copy. Subsection coverage includes flow introductions,
chapter leads, scene prose and exploration paragraphs, while screen groups
and component descriptions remain intact. The twelve
existing navigation checks also pass. JavaScript syntax and diff checks pass.
No browser testing or visual review was performed, per the repository policy.
The user should review actual line wrapping, slide distance, stagger and scroll timing
at wide/narrow sizes with reveal=1 and compare reveal=0.
