# Case study reading dial

11 October 2026. The user requested a non-destructive right-side reading-navigation
variation: horizontal scale marks stacked inside a vertical rounded container,
with soft radial hover fall-off, a destination heading preview and the existing
click-to-scroll interaction. They confirmed the tick orientation and explicitly
requested preserving both previous navigation versions.

## Routing and ownership

The shared case-study-kit/case-navigation.js/css implement version 3 under ?nav=3.
?nav=1 remains the default bottom tray; ?nav=2 retains its edge bookmark and panel.
URL selection never rewrites or removes either version. Product Navigation and
Action catalog entries serve mobile product chrome, not this reading control;
their renderer, registry and internal styles remain unchanged.

Version 3 has fifteen destinations, in document order, starting with the hero and ending with
Directions set aside, Impact & future and Learning. Each native anchor owns one
section selection. All versions reuse the existing hash, heading-focus and
scrollIntoView handler, including modifier-click behavior and reduced motion.
Current-section tracking reuses the existing 30%-viewport threshold. The hero has
its own native #top anchor labelled “Back to top” for both hover and accessibility;
Overview remains a separate tick. Clicking it focuses the hero's h1 before smooth
scrolling, or an immediate scroll under reduced motion.

## Geometry and interaction

The latest request replaces the outer capsule with bare, partially transparent
marks and a four-stop window. The fixed right host is centered vertically and
64px wide (`--space-16`), with no background, padding, border, rounding or shadow.
Its invisible width accommodates the expanded marks without clipping them.
Fine-pointer rows use --space-5 (20px); coarse-pointer rows retain 44px hit areas.
Window height is four rows (80px or 176px), capped for short viewports. The mask
fades the outer 18% at both vertical ends. All fifteen destinations remain native
anchors. Their accessible names use destination headings, with the explicit
“Back to top” exception. Decorative marks and the shared tooltip are hidden from
assistive technology. Native links support Tab/Enter and Up/Down/Home/End.

At rest, ticks are equal neutral 18 × 2px marks at 35% opacity. The user
removed both blue hover highlighting and the visible current-section marker;
aria-current remains for accessibility. The hovered/focused tick receives full influence, growing
left to 36 × 3.5px at full opacity. Nearby marks use horizontal and vertical
Gaussian fall-off with a 28px radius, capped at 0.78 so they cannot compete with
the selected stop. Transform growth eases over 160ms with the same right anchor,
without altering row geometry. The tooltip sits 8px left of the fully extended
mark, outside the mask, and aligns to the selected row. All treatments remain
page-owned, using the existing editorial tokens; no product-component internals
or registry entries change. Versions 1 and 2 retain their existing appearance.
Hover or keyboard focus now expands the ruler to reveal all fifteen stops,
capped at viewport height minus 80px. The same loop eases reveal over a 90ms time
constant, adjusting height, list offset and host position together. Existing
ticks preserve their screen positions during expansion unless viewport bounds
require adjustment. Reading position freezes during inspection; hover never
navigates. The fade reduces from 18% to 2% while open. If the full list exceeds
the available height, wheel input scrolls it with 70ms easing; keyboard focus
reveals off-window destinations. Leaving collapses back to four rows.

Following the user’s revised scroll preference, collapsed reading position now
interpolates between adjacent section starts at the 30% viewport threshold.
The window offset is (section index + fraction + 0.5) × row height minus 62.5%
of the collapsed window height, bounded by the list’s start/end. The current
stop therefore travels from the lower toward the upper central area as its
section progresses; longer sections move more slowly. This is continuous at
section boundaries. The last section uses document end as its boundary.
A requestAnimationFrame loop uses critically damped
motion at 30 radians/second, retaining position and velocity when scroll or focus
changes the target. Frame time is capped at 1/30 second to prevent jumps after
delays, and settling requires both <0.005px distance and <0.05px/s velocity.
Uniform measured row geometry computes tick centers without reading every link
after transform writes; translate3d/will-change keep list motion composited.
The hover label glides with a 70ms time constant in the same loop, and a 3px
selection tolerance prevents flickering between adjacent headings at boundaries.
The loop stops when both list and label settle. Pointer feedback uses the same
clock and moving geometry. Focus takes
priority for window positioning until it leaves the rail. Page hide cancels paint.
Touch does not simulate hover. Reduced motion resolves the offset immediately and
removes tick/label transitions. All geometry and interaction remain page-owned;
existing editorial tokens provide the visual language. Versions 1 and 2 are unchanged.

## Verification

Node behavior checks cover destination coverage, radial fall-off/reset,
keyboard activation and heading focus, preserved versions 1/2, section-based
movement and list bounds, clipped keyboard destinations, motion that settles,
hero navigation, stable hover selection and tooltip movement, expansion that
preserves the hovered tick without navigating, collapse, and wheel access on
short viewports. JavaScript syntax and diff checks pass. These use a DOM harness
rather than a browser. Browser/visual review remains with the user.

Rebase integration: retained the latest upstream destinations for versions 1 and 2 — Overview, Metrics, Research, Flow and Impact — while preserving their controls and the full fifteen-stop dial in version 3. Latest upstream Impact choreography and published IG project link are retained. Navigation tests exercise all five upstream destinations.
