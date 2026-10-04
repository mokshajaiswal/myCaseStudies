# Spending-limit editor

## Slider width and readability refinement — 4 October 2026

The page-owned `limit-editor-slider` wrapper adds 16px (`--th-space-4`) inline padding around the unchanged registered Slider root. At the 390px phone geometry and 24px content insets, the available Slider width is now 310px instead of 342px. This layout does not override component internals or change other controls.

Shared Slider typography increases its label and endpoint captions from 12px to 14px, and its live value from 16px to 18px. Dedicated component size tokens map to existing typography primitives; inherited font families, weights and leading remain unchanged. Canonical Default, Maximum and Disabled specimens use the same updated shared CSS. The 6px track, 24px thumb, 44px input height, 8px vertical gap and 12px label/value gap remain intact. No spacing primitives changed. Source ownership and syntax checks plus catalog validation passed; visual and keyboard review remains with the user.

Proposed Flow References editor, using inspected Figma 397:49288 Hub setup form as the related layout reference. Figma supplies the form hierarchy and shared shell; monthly-limit summaries in Hub/member references establish existing amounts. The exact editor, its selectable subjects and validation are prototype decisions, not an exact source screen. The comparison panel labels this distinction.

Unchanged Select, Text field, Action, Notice, Navigation, Page header and Phone status bar render the UI. Screen layout owns 24px content inset and 16px form gap. Only monthly periods are supported. The caller owns target, input, validation and session storage. Save accepts plain decimal amounts ₹1–₹10,00,000 with at most two decimal places; formatted commas are not accepted. Changing subjects loads the saved/default amount and clears stale feedback. No new controls or component variants were introduced.

Saved limits live in `turbo-hub-spending-limits` for this local demo session. Hub dashboard consumes the Hub limit and Arun's displayed member limit. The Kavya profile consumes her saved limit, and the tag-added view consumes all four subjects. Pending/absent member summaries do not acquire invented visible limit fields. No bank limit or account permission is changed. Members without existing displayed limit summaries remain represented by their established page behavior.

Browser verification: zero produces native field error association/focus; ₹75,000 saves with a Notice confirmation; reload restores the saved input; Back to Hub shows ₹75,000 in the summary. Source reference loads. Syntax and catalog validation passed with no errors (25 components, 28 screens). Flow References now has 28 previews and two unfinished cards: new-user entry and geofence setup. Carousel onboarding remains excluded.

Final integration verification: saving Kavya's limit as ₹42,000 updates both the profile's circular limit and her member card on the tag-added view. Shared components remain unchanged.

## Monthly limit as a slider (4 October 2026)

The amount Text field is replaced by a new registered Range slider (turbo-slider,
components/forms.js + forms.css): label with live ₹ value, 6px track filled to the value,
24px thumb inside a 44px hit height, and min/max captions. Native range semantics give
drag, arrows, Page Up/Down and Home/End; aria-valuetext reads the formatted amount.
Specimens: Default, At maximum, Disabled (shared renderer); registry entry includes props,
anatomy, spacing and an interaction target.

Bounds are prototype decisions: the Hub limit runs ₹10,000–₹5,00,000 in ₹5,000 steps; a
member's limit runs ₹500 up to the Hub's current (saved or default) limit in ₹500 steps,
so a member can never exceed the Hub. Switching subjects re-bounds and re-values the
slider; saved values outside the new bounds are clamped. The free-text validation and
its error path are removed because the slider cannot produce invalid amounts. Visual and
keyboard review remains pending with the user.
