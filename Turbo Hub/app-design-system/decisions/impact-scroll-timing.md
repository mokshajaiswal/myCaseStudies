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
