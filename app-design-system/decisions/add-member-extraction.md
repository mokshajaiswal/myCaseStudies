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
