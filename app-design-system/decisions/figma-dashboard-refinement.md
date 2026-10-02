# Hub Details · Spends — Figma refinement

Source: Turbo Hub / Prototype_v1, [frame 402:51668](https://www.figma.com/design/IJU02E1n5jSddJqd3SpkG7/Turbo-Hub?node-id=402-51668). The first refinement pass covers Spends; Members and Analytics retain their existing bodies while sharing the updated identity and tabs.

## Component changes

- Hub identity: centered variant, 100px hub Avatar, 12px image-to-copy gap, Inter 20px semibold name, uppercase 12px semibold type. Optional options action is the registered Action with a transparent 44px target; caller owns its callback. Horizontal identity remains available.
- Avatar: hub (100px, radius 20) and merchant (40px, radius 12) sizes. Generic Phosphor house and payment icons remain replaceable rather than reconstructing illustrations/logos.
- Spending limit: circular variant, 16px inset, 45px ring, 12px label, 20px bold spent amount and 14px medium denominator. Horizontal member-card limits retain their original contract. Empty/full/over-limit/zero-limit examples use the real renderer; geometry and ARIA values are clamped and zero denominators remain finite.
- Transaction row: compact variant with no inset, 8px icon-to-copy gap, 2px title-to-detail gap, 40px merchant Avatar, top-aligned amount. Title uses the source list color #0066b4, detail #444. Existing inset rows are unchanged.
- Tabs: source 24px horizontal inset, 20px inter-tab gap and 4px active underline; 44px minimum targets and Arrow/Home/End behavior retained.

All new configurations have canonical shared-renderer specimens and registry anatomy. Optional identity actions depend on turbo-button; no child interaction states are duplicated at the identity component.

## Page-owned layout

The overview owns 24px inset, 16px gaps and the soft pastel identity backdrop through --hub-identity-background. The transaction list owns 32px inter-row gaps (--th-space-8), 24px horizontal inset and a white surface. Removed the invented Recent transactions heading, enclosing list card and separators. All eight source transactions appear in the initial list; the primary Show all transactions action remains a live-looking no-op until its undefined destination is built. Help and options are also available no-ops.

The source BESCOM date omits its month; the prototype supplies Dec for consistency with the surrounding dates. Static demonstration data remains illustrative.

## Preserved design-system rules

Keep the fixed 390 × 844 logical viewport, OS status bar and physical phone shell. Keep the established 24px rounded content transition (source uses approximately 20px), Inter roles with 1.4 leading, and the user-preferred 18px navigation title (source 16px). Source preview is 360px wide; components use source measurements in logical pixels rather than proportionally scaling the app to that width. The neutral dark backdrop belongs only to the outer preview. Genuine unavailable variants remain faded; unfinished prototype actions use available instances.

## Verification

Browser measured: circular card 16px inset / 79px height; ring 45px; compact rows 40px high, 8px internal gap, 2px detail gap; transaction list 32px gaps; centered identity 12px gap and 100px Avatar. Long row/identity names wrap without horizontal overflow. Empty/full/over/zero ring states stay finite and bounded. ArrowRight selects/focuses Members; Home returns to Spends; nested member limit retains its 18px top inset. Product content stays light and viewport remains 390 × 844.

Catalog check and JavaScript syntax checks pass. Narrow browser override was requested but this browser backend continued reporting 1280 × 720, so a genuine mobile browser viewport was not verified in this pass. Logical phone content and narrow specimen widths were checked for overflow. Inspector spacing uses supported padding/gap/margin declarations and named parts; exhaustive inspector layer traversal remains unverified.
