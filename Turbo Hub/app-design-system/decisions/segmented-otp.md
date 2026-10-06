# Segmented verification code — 6 October 2026

The user requested six individual OTP boxes. A shared Verification code renderer
composes six registered Text fields using the new digit configuration. This owns
code distribution, focus coordination and group validation rather than only
arrangement, so it is registered with canonical specimens and a Text field
dependency. The screen and specimen load the same renderer.

State/value ownership: the component manages entered digits, exposes the aggregate
form value and emits onInput(value). The page owns validation and submission.
setValue(value) supplies programmatic values without emitting; the hidden aggregate
input event retains locked-story autofill and reset compatibility. Each Text field
owns native input, accessible label, focus and disabled treatment. The parent
coordinates advance, paste/autofill, empty Backspace and arrow navigation. It does
not automatically submit or initiate SMS delivery.

Spacing audit from source: Text field digit surface is 64px high, 44px minimum
width, with 8px inset, centered amount-summary text and the existing field border,
radius and focus treatment. Other field configurations retain their geometry.
Verification code has zero outer inset, 8px digit gaps, 12px legend separation and
12px validation gap. Its minimum allocated width is 304px; the existing 390px phone
provides 342px after screen insets. No screen CSS overrides registered internals.
The digit specimen allocates its width through a specimen-owned parent.

Canonical coverage: empty, partial, complete, error and disabled OTP instances;
empty, filled and disabled digit Text field instances. Parent state examples use
the actual API and keep child focus treatment at Text field. No private independent
control replaces a registered child. All source selectors correspond to renderer
parts; rendered inspector measurements, resizing and keyboard review remain manual.

Tests exercise real shared renderers for six-digit entry/advance, paste and autofill,
aggregate reset, backspace/arrows, validation associations/focus, numeric filtering,
disabled propagation and preservation of ordinary Text fields. Existing story and
playback tests remain passing. Browser/visual review is left to the user.
