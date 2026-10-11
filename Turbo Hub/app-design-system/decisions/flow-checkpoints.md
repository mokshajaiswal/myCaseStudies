# Connected flow checkpoints — 10 October 2026

The user requested a connected step-by-step path for the autoplay flow lists.
Registered Flow checkpoint replaces the independent outlined editorial cards.
All loop presentations use the same renderer from components/flow-checkpoint.js
and CSS. The case-study page supplies existing typography, color and spacing
tokens through styles.css; this is editorial navigation, not a product screen.

One checkpoint is one native button. Its number, completion check, connector and
title are noninteractive internal parts. Existing Phosphor `success` supplies the
check, with inherited currentColor. Each instance owns hover/active/focus-visible;
the parent owns selected index, playback and selection callbacks. Activation
requests selection through onSelect without mutating supplied state. There are
no independent child controls or component dependencies.

Supplied `state` defaults to upcoming and accepts upcoming, current or complete
through setState. Upcoming shows its number; complete shows a check; current
shows a blue number with a soft halo and a tinted row. aria-current and
aria-pressed reflect current state; completed is included in the accessible
label. Markers and connector progress are decorative and aria-hidden. Clicking
backwards updates the path to the selected position; completed describes the
preceding demo checkpoints, not completion of real product operations.

The caller supplies `last` to omit the final outgoing connector. This is a
structural configuration, separate from selection/completion state. The public
progressElement lets the existing playback owner animate connector fill with
scaleY. That owner continues to exclude load time, cancel fills on selection and
pause, and reset all fills on repeat. No second timing loop is introduced.

Spacing audit: component-owned padding is 12px vertically and 16px horizontally;
the marker is 32px with a 16px label gap. Label and marker share vertical center
alignment without a label offset, including when the label wraps. Local
registered roles alias the established case-study spacing primitives. A 2px
connector uses two halves meeting at each row boundary: the outgoing timed fill
below the marker and the next row’s incoming segment above its marker. The first
row omits the incoming segment and the last omits the outgoing segment. Incoming
segments are blue for current/completed checkpoints. The parent owns a contiguous
list with zero gap and available width;
there are no overrides to checkpoint roots/parts. Labels wrap with min-width:0,
and each row has at least a 56px hit height. No fixed row height is assumed.

Canonical specimens demonstrate a connected path and a final checkpoint using
the exact page renderer. Clicks update caller-supplied selection in Live; held
upcoming/current/complete queries apply the public state interface. Gallery and
modal use the same source, with previewConfigurations selecting existing example
wrappers. Native direct states remain available through real pointer/keyboard
interaction. Specimen arrangement stays in the shared specimen stylesheet.

Source validation: story/playback tests exercise the real registered renderer,
current/completed/upcoming transitions, backwards selection, loop reset and
connector timing. JavaScript syntax and catalog validation pass. Browser,
spacing-inspector and visual review remain with the user, including long labels,
narrow screens, connector alignment, focus and reduced motion. Pause/Play remains
visually hidden by default and available on keyboard focus.

Preview: http://localhost:8020/app/index.html#scene-whatsapp-invite-flow
