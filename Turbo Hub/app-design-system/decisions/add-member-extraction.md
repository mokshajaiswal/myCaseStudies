# Add Member extraction

Source: flow-reference/source/keXcXE5lkhS5SPirkreik3BLM.png, existing member-details and payment-method screens.

Reused Action, Avatar, Phone status bar, Member card and the icon provider. Shared phone preview retains the existing shell, fixed 390 × 844 logical viewport and internal scrolling. Screen composition owns 24px horizontal insets, 20px vertical insets, 12px field gaps and 16px group gaps.

Registered Text field, Select, Switch and Checkbox choice. The payment card is a configuration of Checkbox choice, not a separate control. Native inputs retain labels, keyboard access, disabled semantics and error associations. Caller owns values and validation. Switch emits a proposed checked value; caller applies setChecked. Field/select/check expose setError and control for focusing invalid input. Action now accepts native type=submit; its default remains button.

Details preserves relationship, name, optional nickname, mobile number, manager permission and age/document confirmation. Payment choices preserve physical card, digital card and UPI and the source fees. Manager starts enabled, matching the source. Generic Avatar replaces the source portrait. Photo editing remains deferred.

Only Wife is evidenced as a relationship option; the other options are provisional demo choices. Nonempty name/relationship, a 10-digit Indian mobile number, confirmation and at least one payment method are prototype validation assumptions. Back navigation preserves values and selections.

Send Invite creates a pending member in sessionStorage and returns to Members. No server, delivery, payment or external invitation is implemented. Undefined screens remain deferred.

Field and select errors appear below the bordered surface, within the registered control wrapper. Invalid borders and aria-describedby remain associated with the native input.

Direct payment-method preview (2 October 2026): `add-member/index.html?step=payments` now opens the existing choice step from Overview and Flow References. Figma 402:50163 was checked against the shared Checkbox choice implementation; no duplicate control or new component was needed. The established DS styling remains in use. Step changes update the URL, browser Back/Forward renders that step, and reload restores it. Returning to details retains selections. Direct entry may inspect choices without details, but Send Invite first requires at least one method and valid member details; missing details return to the form with its existing validation.

Browser verification: direct route and matching Figma reference, empty-method error, missing-details guard, valid details returning to the selected Physical Card, Back/Forward, reload, local pending-member result, and S/Escape spacing inspection passed. Measured shared choice inset is 20px; parent list gap is 12px. Catalog validation passed with zero errors. No onboarding carousel changes were made.

Figma typography audit (1 October 2026): page heading 20px Medium; filled field values 16px Medium, labels 10px Regular; manager label 14px Semibold, helper/confirmation copy 12px Regular; primary actions 14px Bold. Field surface label/value gap is 2px via its --field-text-gap token. Control hit areas and form behavior are preserved.

Editable member Avatar (3 October 2026): Add Member adopts the existing editable Avatar API with accessible editLabel="Edit member image", including the avatar refresh when name input changes. Reuses the registered Avatar edit action and its blue border/white outer ring unchanged. Image editing remains a no-op prototype callback. No page-specific component styling. Syntax checked; manual visual review remains with the user.

Continuous backdrop correction (3 October 2026): the page-owned flow-form painted a solid action-blue backing under the rounded content corners, masking the shared phone backdrop and creating a seam below the gradient header. Made flow-form and the page-owned flow-heading backgrounds transparent so the existing Chrome backdrop paints continuously. White content and footer remain intact. Source check only; manual visual review remains with the user.

Contact Avatar size (3 October 2026): Add Member now uses registered size=contact (100px, 20px corners), replacing the 64px large avatar. Shared initials use 32px sizing and graphics use 40px. Initial and name-updated avatars both retain editable=true. Canonical specimen and registry updated; no page component overrides. Syntax/catalog checks passed; manual visual review remains with the user.

Manager role info variant (3 October 2026): shared Switch supports info=true, composing a separately registered Info pill beside its label. Add Member removes subtext and adopts this variant with a no-op onInfo callback; no sheet opens, per explicit visual-only request. Pill owns 28px geometry and 16px provider icon; Switch owns 8px heading gap. Canonical previews and registry updated, without page overrides. Syntax/catalog checks passed; manual visual review remains with the user.

Avatar initials and spacing (3 October 2026): shared Avatar initials now uppercase and normalize surrounding/repeated whitespace. Add Member page-owned avatar wrapper increases its bottom gap from 16px to 24px using --th-space-6. No registered component overrides. JavaScript syntax checked; manual visual review remains with the user.

Action footer extraction (3 October 2026): registered shared Action footer composes unchanged Actions with a translucent blurred surface and top fade. Add Member overlays it at the bottom of its bounded form grid; content scrolls behind it with 112px bottom clearance. Removed existing page overrides of Action width/min-height; footer grid stretches its children while preserving component-owned height. Single/multiple canonical specimens and ownership contracts added. Native form submission remains intact. Syntax/catalog checks passed; scroll/focus and visual review remain with the user.

Medium contact Avatar (3 October 2026): registered 80px contact-medium size between existing 64px large and 100px contact, with 16px corners, 28px initials and 32px graphics. Add Member adopts it for initial and name-updated portraits, retaining editable=true and page-owned spacing. Canonical specimen and registry updated. Syntax/catalog checks passed; manual visual review remains with the user.

Bottom overscroll backing (3 October 2026): user screenshot shows gradient tint under the translucent footer during repeated boundary scrolling. Add Member scroll viewport now suppresses boundary bounce with overscroll-behavior-y:none. Form backing stays transparent over its top 24px to retain continuous chrome at rounded corners, then white below, preventing the footer blur from sampling the blue backing during boundary movement. Page-owned layout correction only. Manual scroll/visual verification remains with the user.

Moving rounded sheet correction (3 October 2026): scroll ownership moved from the white rounded content surface to a transparent member-scroll wrapper containing the heading and sheet. The white content is now a single rounded surface that moves with its content, rather than a stationary clipping mask. Status/navigation stay fixed and the existing blurred Action footer remains bottom anchored. Removed the previous form backing workaround; boundary bounce remains suppressed. Syntax/catalog checks passed; manual scrolling and visual review remain with the user.

Sticky acceptance (3 October 2026): moved the unchanged acceptance Checkbox choice into shared Action footer content slot above Next. Next initializes disabled unless confirmed and updates immediately with checkbox changes. Existing field validation still runs on submit. Page scroll clearance increases to 200px for this taller footer; payment footer retains existing clearance. Registered footer content slot, dependency and canonical acceptance specimen added. Syntax/catalog checks passed; manual scroll/focus/visual review remains with the user.

## Checkbox choice: Figma card treatment (4 October 2026)

Prototype payment-method cards were plain white with black titles and native checkboxes;
Figma Payment methods shows tinted cards, blue titles and filled rounded checkboxes.
Updated the registered Checkbox choice (shared renderer, so every consumer follows):

- Card background: 160° gradient from surface white to --check-card-tint (#e3f0ff), or
  --check-card-tint-violet (#f5e8fb) with the new tone='violet' prop (UPI). Faint
  --check-card-edge border keeps geometry; checked cards firm it to --check-card-edge-checked.
- Card title uses --color-action. Description and price unchanged.
- Checkbox: custom 22px, 6px radius, 1.5px --check-box-border; checked fills
  --color-action with a white check (--check-mark). Native input kept for keyboard,
  focus-visible outline and form semantics; disabled fades to .45. This also applies to
  the non-card confirmation checkbox for consistency.
- Selection no longer swaps the card to the flat blue-soft fill; the checkbox carries state.

Specimens: "selected" now shows a checked blue card; new "violet" example (Card / violet
tone). Registry props, states and preview configuration updated. Add Member passes
tone='violet' for UPI. Figma's default selection (Physical + UPI pre-checked) is not
adopted; methods remain unselected until the user chooses. Visual review pending.

Borders and title size (same day): visible tone borders (--check-card-edge #cfe0f5, violet
--check-card-edge-violet #e6d3f1), action-blue border when checked (replaces the faint
edge tokens). Card titles now 16px (field-value size/leading) with the choice-title weight,
up from 14px; non-card checks unchanged.

Checked cards (4 October 2026): checked border ~1.5px (1px border + 0.5px ring, no layout shift) in the
tone accent; violet tone uses --check-card-accent-violet (#8a4fc8) for border and checkbox fill.
Refined: checked border is a 55% tint of the tone accent (lighter) at 2px; checkbox keeps the full accent.
