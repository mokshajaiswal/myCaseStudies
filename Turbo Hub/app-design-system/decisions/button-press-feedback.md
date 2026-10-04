# Button press feedback

All registered Action configurations now use a 98% visual scale on press, returning
to 100% on release. Avatar edit actions use the same treatment. The shared roots
own `--button-press-scale:.98` and `--button-press-duration:120ms`; this is motion
configuration, not a spacing primitive or a new variant. CSS `scale` keeps existing
transforms separate. Disabled and aria-disabled controls do not enter the pressed
state. Reduced motion suppresses scaling and transitions.

`TurboUI.pressButton(control)` provides a visual-only 100% → 98% → 100% animation
over 240ms, reading the same CSS settings. It never dispatches clicks or submits.
The case-study playback calls this shared API for Add, Next and Send Invite instead
of adding local component styling. Playback owns pausing, resuming and cancelling
these animation handles when the reader switches steps or a frame is replaced.

The canonical Action specimen already renders all configurations with the shared
renderer, including active state previews. Avatar edit's canonical specimen now
supports the active preview state too. Registry behavior documents the motion and
the visual-only API.

Source reuse/spacing audit: default, compact, compact trailing-icon, trailing-icon,
quiet, icon-only, disabled, list, danger, danger compact, both camera controls,
camera disabled and glass retain their existing padding, gaps, minimum dimensions,
font settings and icon sizing. Avatar edit retains its 36px size, border, outer
ring and icon. Scaling changes the visual bounds transiently; it does not change
document layout. Parent placement and all unrelated local/theme overrides remain
unchanged. No page-owned override targets registered component internals.

The touch indicator remains editorial tooling. Its fill is 28% blue with a 70%
blue outline and a faint halo, keeping tapped text visible. Every scripted tap
adds a soft expanding ring over 450ms; the step timer allows the ripple to finish.
Reduced motion removes this ripple animation.

Verification: catalog validation reports no errors. JavaScript syntax and 22 source
tests pass, including shared renderer/API checks across Action configurations,
disabled and reduced-motion suppression, CSS setting reuse, unchanged activation
callbacks, and playback animation pause/cancel lifecycle. Browser motion, optical
feedback and responsive visual review remain with the user.
