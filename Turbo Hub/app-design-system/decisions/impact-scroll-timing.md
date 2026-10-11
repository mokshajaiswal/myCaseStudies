# Earlier Impact assembly

11 October 2026. The user reported that the Impact composition assembled only
when its upper cards were nearly leaving the viewport.

The old progress formula was anchored to the central headline, 360px below the
artwork top on desktop and 562px on mobile. It finished when the headline reached
35% of viewport height, which could put the upper cards above the viewport.

Progress now follows the artwork top: start at 95% of viewport height and finish
at 50%, over 45% of a viewport of scrolling. The existing stagger still resolves
all six notes at that endpoint. This makes the cards settle earlier on both
layouts, before the upper group passes the viewport midpoint. Reverse scrolling,
opacity, motion bounds, reduced motion and the final arrangement stay intact.

This is page-owned motion in impact-future.js, not a registered product control.
Catalog/source review found no component overrides or new token requirements.
Syntax, progress boundary and diff checks passed. Browser testing and visual
review remain with the user under the project policy.

## Quarter-viewport entry threshold

At the user’s request, assembly now starts when the artwork top reaches 75% of viewport height: a quarter of the screen in from the bottom. The existing 45%-viewport scroll duration remains, ending at 30% of viewport height. Stagger, reverse scrolling, reduced motion and the final layout are unchanged. Syntax and progress boundary checks pass; browser review remains manual.

## Smooth two-stage assembly

Upper notes keep the quarter-viewport entry threshold. Lower notes now have a separate progress range anchored to the main statement’s actual text midpoint: they begin as it reaches 50% of viewport height and settle over a further 35% of a viewport. Their motion is vertical upward from below, with lateral and depth drift removed at every breakpoint. A frame-rate-independent 100ms exponential easing softens scroll updates, continues only until progress settles, and supports reverse scrolling. Initial placement and remeasurement resolve directly; reduced motion stays static. Pointer shape, caption positions and final card geometry are preserved.

Source-level checks exercise the actual mount: delayed lower entry, eased first frame, frame-loop termination, reverse scrolling and reduced-motion cancellation pass. Syntax/diff checks pass. Browser and visual review remain with the user.

## Earlier, directional lower-card entry

The user found the lower cards too late and too uniform. Their progress now starts when the statement midpoint reaches 68% of viewport height and ends at 40%, so the arrival is underway before the headline centers. Lower cards use stagger offsets 0 / 0.12 / 0.24. Orange enters diagonally from lower left, the central note rises vertically, and green enters from lower right. Horizontal travel is 100px on desktop and 40px on mobile, retaining existing viewport bounds and eased progress. Pointer placement and settled positions stay intact. Source motion checks verify early entry, distinct stagger, reverse scrolling and reduced motion; visual review remains manual.

## Native timed entrances replace scroll scrubbing

The user still found the interpolated motion uneven. Replaced the scroll-progress/smoothing loop with native Web Animations entrances. Scrolling now only triggers each three-card group once: the upper group at 75% viewport height, and the lower group when the statement midpoint reaches 68%. Each card uses a fixed 860ms exponential ease-out, staggered by 110ms. Upper cards enter left / above / right; lower cards enter lower left / below / lower right. Travel is shorter and responsive; lateral motion stays bounded to the viewport. No perspective or depth animation remains.

Final layout is measured once per resize/font readiness, not on every animation frame. Font readiness waits for active entrances to finish before measuring, avoiding cancellation midway. Native animation holds release after completion, with final visible styles underneath. Reduced motion and missing animation APIs show static content. Resize, hidden-tab state and page lifecycle settle active animations. These entrances now play once instead of scrubbing backward, a deliberate change of approach following the user’s request to try something different.

Source tests verify both trigger thresholds, 110ms stagger, three entry directions, fixed duration independent of subsequent scrolling, single play and reduced-motion cancellation. All 61 existing tests, syntax and diff checks pass. Visual smoothness still needs user review; no browser testing was performed.

## Full composition in one desktop viewport

The user requested all six notes and the central statement together in one viewport. Desktop center spacing now adapts between 296px and 360px. Measurement includes every card and extending caption, then fits the artwork into viewport height minus 48px, without upscaling. A page-owned sticky viewport wrapper holds the fitted composition for an additional 35% of viewport scrolling so upper cards remain visible as the lower group arrives. Scaling is centered horizontally; animation and settled note positions remain owned by the original stage.

Measurement temporarily resets fitting and sticky positioning to obtain unscaled layout coordinates, then applies the fit and scales the statement trigger offset. Resizing repeats this calculation. Narrow screens retain the readable stacked layout; reduced motion removes the sticky hold. No registered component internals are overridden. Source checks confirm fitted height stays inside viewport space, both entry groups and exclusions still work, and syntax/diff checks pass. Browser verification remains with the user.

## Sticky hold removed

The user reported that the composition became fixed while scrolling. Removed the sticky viewport positioning and extra 35%-viewport hold space. The viewport wrapper now stays in normal document flow, while the measured desktop fit, caption pointers and replayable staggered entrances remain. Syntax, motion and diff checks pass; visual review remains manual.

## Restrained Impact motion

After further user feedback, simplified the entrance language. Upper metric cards move horizontally only 12–20px, with the central quote fading in place. Lower cards travel 14–24px laterally and 12–14px vertically. Duration is 620ms, stagger 65ms, with a gentler cubic-bezier(0.22,1,0.36,1) and 25% initial animation opacity. This removes the large sweeping trajectories and long delays while retaining entry triggers, replay, normal page scrolling, settled layout, desktop fit and accepted caption pointers. Source motion, syntax and diff checks pass; browser review remains manual.

## Rectangles enter vertically from their own positions

Upper rectangles now descend 48–72px into their existing columns; lower rectangles rise 48–72px as scrolling reaches them. Narrow screens use shorter travel. Each rectangle triggers from its own measured, fitted position rather than the stage boundary, with a 900ms ease-out and a small 70ms stagger. Lower entrances also wait until the central statement reaches 68% of viewport height. The composition stays in normal document flow and resets only after leaving the viewport, so returning to it replays the entrances without repeated wheel-triggered restarts.

Source motion checks verify individual visibility triggers, opposing vertical directions, fitting, replay and reduced-motion cancellation. All 61 existing tests pass. Visual review remains with the user.

## Mixed-direction fade entrances

Upper rectangles approach from upper left, above and upper right; lower rectangles approach from lower left, below and lower right. Every entrance fades from 0 to 1 opacity with the existing 900ms easing and stagger, converging on the existing settled position. Compact screens shorten travel. Individual viewport triggers, normal document flow, replay after leaving the viewport and reduced-motion support remain. Source motion and syntax checks pass; visual review remains manual.

## Slower, softer rectangle entrances

Entrance duration is now 1150ms with a 90ms stagger and cubic-bezier(0.25,0.8,0.25,1), softening the initial acceleration and extending the settle. Mixed directions, full opacity fade, triggers and final positions are unchanged. Source motion, syntax and diff checks pass; visual review remains manual.

## Replay on upward scrolling

Each rectangle rearms after its full frame and caption leave the viewport, then fades in again on reentry in either scroll direction. Upward scrolling reverses the vertical approach while preserving the varied lateral directions, 1150ms easing and stagger. Upward triggers watch the returning rectangle’s lower edge; small reversals while a rectangle remains visible do not restart its animation. No pinning or continuous animation loop is introduced. Source checks cover upward replay, reversed travel, opacity endpoints and reduced motion; visual review remains manual.

## Downward entrances only and reading navigation

Impact rectangles now show immediately on upward reentry, settling any running entrance when scrolling reverses. Downward scrolling retains mixed-direction 0-to-1 opacity entrances, 1150ms timing and 90ms stagger. This supersedes the earlier upward replay design. The bottom collapsible navigation now lists Overview, Metrics, Research, Flow and Impact; Metrics targets the existing success-measures block, while Impact targets the rollout section. Navigation collapse behavior is retained. Changes are page-owned and do not override registered components. Source motion and syntax checks pass; visual review remains manual.
