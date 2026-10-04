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

## Manager review and authorize: redesign (4 October 2026)

Goal: give Arun what he needs to decide, in reading order, instead of two look-alike
initials tiles and two centred paragraphs. No new components; registered ones are used
through their public APIs only.

- Chrome (blue backdrop): Navigation titled "Payment request"; large Avatar for Neha; one
  h1 reading "Neha Sharma wants to pay / ₹2,500 / at Nykaa" using supporting-text and
  payment-amount roles; registered Request expiry countdown ("Respond before the request
  expires"), matching the 15-minute window Neha sees on Request pending.
- Light surface, three sections as bordered cards (same treatment as Receipt): Payment
  (Transaction row with the local Nykaa artwork, UPI ID and amount); Neha's monthly
  allowance (Spending limit summary, ₹500 of ₹5,000, plus a computed "left after approval"
  or "over the remaining allowance" line); Details (paying account from the Payment
  account default, request time matching the 12:04 notification, Kavya as co-approver).
- Footer: quiet Decline above Swipe to Authorize. Decline or expiry replaces both controls
  with a status message and a Back to Hub Action, so no stale controls remain.

Component reuse audit: removed the previous page override of Action's internal
`--color-action`/`--color-action-soft` that made Decline red; Decline is now the unmodified
quiet Action. Navigation, Avatar, Transaction row, Spending limit summary, Countdown, Swipe
action and Action render unchanged; the screen owns only section layout, card surfaces,
the facts list and footer arrangement. A destructive Action variant does not exist; if a
red Decline is wanted, it should be added as a registered variant with specimens.

Behaviour: the countdown runs from a deadline in standalone previews (pagehide clears it,
persisted pageshow resumes) and stays still in locked story embeds. Expiry concludes the
request once. Allowance figures, request time and co-approver are sample fixtures; no
approval, decline or notification is transmitted.

Verification: JavaScript syntax check and catalog check only. Visual and interaction review
(desktop and 390 × 844, swipe, Decline, expiry, inspector ownership) is pending with the user.

Density pass (same day, after review "too many data points"): removed the section headings,
the Spending limit summary card and the Details card (paying account, request time,
co-approver). The surface now holds one card with the Nykaa Transaction row and one
centred line on the allowance left after approval. Chrome is unchanged. Visual review
remains pending with the user.

Full-blue pass (same day): per review, the light content surface is removed. Like Request
pending, this screen is a documented exception to the default rounded-surface recipe: the
request (Avatar, h1 with amount, countdown) is centred on the Chrome backdrop, and only the
actions sit on a short light sheet with the shared 24px top corners, sized to its content.
The merchant row and allowance line are removed; "at Nykaa" carries the merchant. Decline
stays the unchanged quiet Action on the light sheet, so no colour override is needed on blue.
Visual review remains pending with the user.

Danger action (same day): the DS had no red; the only one was a literal #b42318 on form
errors. Added primitives --th-red (#c4281c) and --th-red-light (#fdecec), semantic roles
--color-danger / --color-danger-soft, and a registered Action variant='danger' (reddish
tint, red text), combinable with size='compact'. Contrast is about 5:1 for the 16px label.
Specimens (Danger, Danger / compact) use the shared renderer; the registry lists both
preview configurations, a Danger interaction target and foundation labels for the four
tokens. Manager Decline now uses variant='danger' with no page overrides. Form error text
still uses its literal red; mapping it to --color-danger is a separate, optional change.
Visual review of the specimen and screen remains pending with the user.

Hero type and merchant mark (same day): the two hero lines now use the 18px status-heading
size and leading with the field-value weight (previously 14px supporting text). "at Nykaa"
is preceded by the registered Avatar size='merchant' (40px rounded square) with the local
Nykaa artwork, the same asset the Spends list uses; it stays decorative because the text
names the merchant. No component internals changed. Visual review pending with the user.

Correction: the 40px merchant Avatar was too large and sat apart from the name. Replaced with a
page-owned 24px inline image (6px radius) placed directly before "Nykaa" ("at [logo] Nykaa").
It is not an Avatar copy; Avatar has no 24px size.

Density tweak: inline Nykaa mark reduced to 20px (5px radius); the request sentence uses a new
primitive --font-leading-relaxed (1.6, registered in foundation labels) instead of 1.4.

Countdown moved from the hero to the bottom of the blue body, directly above the action sheet,
so the deadline sits next to the swipe it governs. It stays on blue because the registered
countdown is white-on-chrome; placing it on the light sheet would need a colour override.

Countdown inline variant (registered): "Expires in 13:36" on one line above the track, no
caption. Renderer, CSS, Inline specimen and registry props/anatomy/preview configuration
updated together; the default layout is unchanged for Request pending. Manager authorize
uses variant='inline'.

Success indicator (4 October 2026): thicker check via registered check-heavy (Phosphor check geometry as a
34-unit rounded stroke; bold is 24 and was already the default), and tone=action for a blue check on blue
screens (Invitation sent). Green remains the default (Authorization confirmed, Receipt).

- Success indicator gains `animated`: the circle springs in elastically, a halo ripples out, the check draws itself; no sparkles or confetti, by request. It plays once when first in view, so story embeds play it when scrolled to, and it holds the final frame under reduced motion. Reserved for closing confirmations (first use: Delivery confirmed).
