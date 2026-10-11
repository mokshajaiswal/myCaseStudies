# Case study card variants

The user requested the existing card as Variant 1 and the supplied IG card data as Variant 2. The previous PayZapp card was page-owned, with no catalog registration. Extracted its renderer, internal CSS and existing flower/arrow motion to the app-owned component. The case-study ending now calls that same renderer with Variant 1. Variant 2 lives in the canonical component specimen; it is not added to the Turbo Hub case-study ending without a request to do so.

Variant 2 supplies “Rebuilding IG’s Global Design”, the user’s seven-market / 150+ component / 60% / 500+ page description and IG / B2C · SaaS · FINTECH metadata. It uses a centered landscape tablet on the white visual panel. The user will provide the IG image later: the current SVG is explicitly a tablet placeholder, not an invented IG screenshot. Replace through the public image/imageAlt inputs or its default asset. No IG destination was provided, so this specimen is an article; Variant 1 remains a real link.

## Ownership and source audit

No suitable registered editorial case-study card existed. The renderer owns the root link/article, image, device frame, copy and metadata. These are not independently interactive children. Caller owns data and destination. Native links provide keyboard activation and focus semantics; a missing href does not create a fake link. Original portrait phone frame and analytics image are reused. Closing flowers, page separator and outer composition stay page-owned; their stylesheet no longer styles the card’s internals.

Both variants retain the original 24px inset/gap (--space-6), title gap (--space-3) and 32px footer inset (--space-8). At <=48rem root inset becomes --space-3 and gap --space-4; title/description sizes preserve the earlier responsive values. Variant 2 image inset is --space-5. Copy uses min-width:0 and wraps; footer metadata can wrap, while arrow geometry remains fixed. The card owns width up to 720px. Variant 2 stacks at <=30rem. Device geometry belongs to the card, not specimen CSS. Canonical specimen wrappers only own captions, widths and outer comparison gaps.

Gallery and detail previews use the same two renderer instances, with unique IDs and explicit previewConfigurations. data-inspector-variant identifies each variant. Hover and focus-visible remain direct states, not extra variants. Reduced-motion rules preserve a static reveal and disable device/flower/arrow motion. The image is lazy loaded with descriptive alt text; decorative device frame/arrows are hidden from accessibility.

Verification: syntax and catalog validation pass; all 49 existing source tests pass. A source-level renderer check confirms variant labels/copy, native link/article semantics and static/studio image URL resolution. HTTP requests confirm the canonical specimen, editorial stylesheet and tablet placeholder return 200. No browser was opened; browser rendering, interaction, long-copy resizing and inspector measurement remain for user manual review under AGENTS.md.

## IG asset supplied

Replaced the temporary tablet SVG with the user’s assets/competitive_research/1/ig_image.png. The shared renderer wraps the unchanged screenshot in a landscape tablet frame, keeping device geometry owned by the component. Removed the unused placeholder asset. Alt text now describes the actual homepage. Source syntax and catalog validation pass; browser review remains manual.

## IG card adopted in the case study

At the user’s request, the Turbo Hub ending now consumes Variant 2 with the supplied IG image and copy. Variant 1 remains available in the shared component and canonical specimen. No IG destination has been supplied, so the ending card uses the supported non-link article configuration instead of linking back to Turbo Hub. No page-owned internal overrides were introduced. Syntax and diff checks pass; visual review remains manual.
