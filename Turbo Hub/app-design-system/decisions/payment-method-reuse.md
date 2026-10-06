# Payment-method rows — 6 October 2026

The user requested that Neha’s Hub match the existing payment-method listing on
Kavya’s profile. The shared Payment method renderer extracts that treatment rather
than using the blue list Action configuration: dark method title, secondary
identifier, optional amber pending Badge and trailing chevron. Card appears before
UPI on both screens.

Registration/ownership: each linked row is one independent native anchor owned by
Payment method. Its identifier, title and chevron are noninteractive internal parts.
Avatar and warning Badge are unchanged registered dependencies; their internal
geometry and states remain with those owners. No page-specific overrides remain
on the extracted row. Parent lists own 8px external gaps and section placement.
Active UPI remains informational; saved-address Card retains its edit destination.
The caller supplies href, identifier and status. No payment activation or delivery
is inferred from displaying a method.

Source spacing audit: 8px top/bottom inset, zero horizontal inset, 12px row gaps,
2px title/identifier gap through --payment-method-copy-gap, inherited field-value
and supporting-text typography, existing 44px Avatar and 20px decorative chevron.
Pending Badge uses its canonical warning renderer. Link focus retains the profile’s
3px outline and 2px offset. Optional detail/status are omitted without spare elements;
copy has min-width:0 and wraps. Rendered narrow/long-content and inspector checks
remain manual under the project policy.

One canonical specimen imports the same renderer and provides pending Card,
pending UPI, active UPI and saved-address Card configurations. Member profile
state/query routing is preserved, and the Hub routes its two pending methods to
the existing delivery-details and PAN screens. Changed JavaScript syntax and
catalog validation pass; all 41 existing source tests pass. No browser or visual
review was performed.
