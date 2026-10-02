# Manager authorization confirmation

Source: Turbo Hub Figma 436:65736, inspected through design context and screenshot.
Registered prototype: prototypes/authorization-confirmed/index.html. It confirms
authorization, not a completed member payment. Close returns to the manager's Spends
view; this is local prototype navigation with no financial operation.

The source's full green success surface is an intentional exception to the default
blue/light screen recipe. Its page-scoped backdrop tokens retain the single decorative
backdrop API. The viewport uses the same backing to avoid scaled light-edge seams.
The parent owns placement and the 16px result gap. Existing Status bar, Action and
TurboIcons supply chrome and the generic check; generic imagery is allowed by BRIEF.
The check circle now uses the single registered Success indicator, shared with Receipt.
Its renderer owns the circle and glyph; the screen owns placement and heading.
Typography uses existing semantic heading size/leading and bold amount-summary weight.
The source UPI footer remains omitted under the shared phone-preview policy.

Verification: Figma reference and phone-frame images load locally, rendered screen
geometry scales uniformly from 390 × 844, and source comparison visibly retains the
green treatment, centered check and two-line heading. Catalog validation has no errors.
Manager review, processing and receipt are now registered; their behavior and remaining
flow coverage are documented in payment-flow-outcomes.md.
