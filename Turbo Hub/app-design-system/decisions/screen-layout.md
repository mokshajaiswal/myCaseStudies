# Default Turbo Hub screen layout

All new screens use the blue-header / rounded-content pattern. Hub Details previously had a flat transition because the radius was defined only in Add Member’s local CSS. It now lives in prototypes/shared/phone-preview.css and is adopted by both screens.

Use .phone-screen > .phone-chrome for status, navigation and optional title. Give the following .phone-content surface 24px top-left and top-right corners (existing --th-space-6), zero bottom corners, and the product’s white/light canvas background. The blue screen backing reveals blue around the corners. Internal scrolling clips content to this shape; the header stays fixed. Optional forms and footer retain the same pattern without changing control geometry.

The dark gray #202124 belongs only to the outer preview body. Product content and home safe area retain their own light colors. Do not substitute dark preview colors inside the screen.

Default content inset is 24px horizontally (--th-space-6); screen-specific vertical spacing may use existing spacing tokens. Keep the fixed 390 × 844 logical viewport and existing phone shell. Reuse the registered controls; this pattern owns layout and surface transition, not their internal spacing or behavior.

Before delivering a new screen, verify the rounded transition, continuous header background, product surface colors, fixed header/footer, internal scroll and scaled preview.

Navigation chrome now uses the registered TurboUI.navigation renderer. Do not rebuild its centered title or action slots in screen code.

Chrome backdrop is now the visual owner for this pattern. Apply `.th-chrome-backdrop` to `.phone-screen`; keep status, Navigation, Page header and local chrome headings transparent. The light `.phone-content` surface then reveals that same backdrop around its rounded top corners without a separate repaint or seam.

## Bottom actions with blurred backdrop

Registered in the patterns tab under Layouts. Use the shared Action footer as the surface and composition owner; the adopter owns bottom anchoring, bounded scroll geometry and content clearance. Scroll region and footer mount share a grid cell, footer aligns to its bottom, and the home safe area stays outside. Single-action examples reserve 112px bottom padding; adapt that to the actual footer height for multiple or wrapping actions. Never override Action internals. Create Hub (all three steps) and Add Member (both steps) adopt this pattern. Native keyboard/focus and scrolling review remain manual with the user.

Layout documentation previews (3 October 2026): both registered layouts now use an app-owned low-fidelity wireframe fixture, replacing real-screen previews. Neutral blocks communicate header continuity, rounded corners, bounded scrolling, bottom overlay, blur and clearance without product data or reference comparison tooling. These are explanatory layout placeholders, not registered product control copies. Catalog checks passed; manual visual review remains with the user.

Light status bar (4 October 2026): Phone status bar gains tone='light' (dark ink, no fill) for
white tops. Onboarding now uses it, replacing its page override of the status bar.
