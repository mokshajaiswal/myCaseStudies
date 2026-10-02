# Payment authorization and outcomes

Manager Review and authorize follows the middle panel of the existing manager-flow
reference Y16WMsQBYYXK4i16Uq3PzRaQUDs.png. Current Figma review 436:64799 supplies the
similar chrome/surface and Swipe to Pay design context. The generic registered Avatar
stands in for member photography and merchant branding under BRIEF.md. Parent layout
owns the read-only amount row, explanatory text, and footer placement. Existing
Navigation, Action and Swipe action render unchanged. Decline disables both decision
controls and announces local feedback; authorization opens the manager confirmation.
Neither operation transmits a financial decision. Close returns to Hub Spends.

Processing uses Figma 436:65284: gold surface, locally downloaded transfer illustration,
32px amount and 18px status heading. The image retains the source crop within a 229 ×
94px slot. This stable preview does not imply elapsed time completes a payment. Its
outside-phone Next screen link advances to Receipt, preserving the amount.

Receipt uses Figma 436:65113. Green success chrome, white rounded details surface,
transaction identity, expandable details and footer actions reuse DS implementations.
View Balance displays explicitly sample data, View Home and Close return to Hub Spends.
Help and source sharing behavior are unspecified: Help stays a live no-op, and a sharing
implementation remains outstanding. Generic merchant imagery replaces branding; the
source UPI footer is omitted under the shared preview policy. Receipt records source
sample date and ID, never live transaction data. The additional detail disclosure is
prototype content drawn from the existing review account and merchant identity.

Success indicator is a single decorative component shared by manager confirmation
and receipt: 81px white circle, centered 32px Phosphor check, no variants, children,
motion, text or callbacks. Visible outcome text belongs to the screen; the symbol is
aria-hidden. It has no internal spacing properties: alignment comes from grid centering.
Parent layout owns gaps and placement. Its real specimen imports the shared renderer.
The backdrop remains one decorative component; green/gold source exceptions are
parent-owned screen token overrides, never backdrop variants.

The payment amount now has semantic size/weight/leading roles and a Foundations recipe,
used by both Processing and Receipt. No shared Action or Avatar geometry is overridden.
Flow References links these implemented screens while preserving original screenshots.
Outside-phone next-screen links distinguish role changes and remain preview tooling.

Verification: rendered manager authorization reaches confirmation with amount preserved;
Decline produces feedback and disables both decisions. Processing-to-Receipt navigation
preserves a supplied ₹4,200. Receipt disclosure updates aria-expanded and shows its dl;
sample balance feedback renders. Receipt amount resolves to 32px; images load locally.
Catalog validation reports zero errors.
Success indicator component mode resolves the registered name, specimen, source and
copy controls. At 390 × 844 browser size, receipt/source stack without horizontal
overflow. View Home is verified to return to Hub Spends. Captures are stored in each
new prototype's verification directory.
Remaining flow coverage includes creation, member delivery setup, scanner/notification,
and the optional Pixel branch.
