# Member payment review

Source: flow-reference/source/pj5901B1DyQtj8DDjEgz0wXEaA.png. The source is a merchant review screen with Pay Using, not a separate payment-method picker. Implemented in prototypes/payment-review without inventing the missing account-selection screen.

Reused Text field (amount and optional message), Action, Avatar, status bar, semantic icons and the registered rounded-screen layout. Merchant identity is screen content, with inexpensive generic typography replacing the source logo.

Registered Payment account: identity plus Avatar and Action children. Card owns 20px inset and 12px internal gap; registered children retain their own styling. Its action is caller-supplied; disabled in the product screen because the destination is undefined. Specimens cover available action, unavailable action and long names.

Registered Swipe action: a native keyboard-accessible range with 44px thumb and 56px hit area. Release at 95% completes once; smaller values reset. Arrow keys/End provide a keyboard path. The caller owns validation and the completion result. The temporary disabled completed state prevents duplicate requests; disabled specimen verifies the unavailable state.

Amount defaults to source ₹2,500. Optional message expands inline, a minimal inferred interaction. Validation range ₹1–₹10,00,000 is a prototype assumption, not a business limit. Completion shows a local request summary naming Arun Sharma and Nykaa, drawn from Z8wJc8fuEBUz3utfYZbLnu2Mls.png. The full timed pending screen, manager approval, bank-account picker and receipt remain deferred. No network call, payment or invitation occurs.

Screen uses 24px horizontal content padding and the shared 24px rounded top surface; continuous blue chrome sits above it. Dark gray belongs outside the phone. Mobile retains the 390 × 844 logical viewport, with internal scroll and fixed bottom action.

Browser verification: desktop and 390 × 844 preview; invalid zero amount; optional message; partial drag resets; full drag and End key complete; request summary names manager and amount. Prominent amount config extends Text field with a 24px value/prefix; errors remain outside its surface. Swipe thumb uses the registered Phosphor back icon rotated right. Catalog check reports zero errors.

Prominent amount field refined to 22px value/prefix, 28px line height and 2px label gap, per visual review.

Change bank account now uses Action size=compact: 32px height, 6px vertical padding, 13px type. Removed parent overrides of Action geometry. Verified disabled selection in ds=true Components mode opens the Action panel with Copy component and Copy instance context. Inspector handles disabled targets on pointer-down because native click events are suppressed. Five component-inspector unit checks and catalog validation pass.

Merchant verification uses the existing semantic success icon instead of a Unicode tick. Heading and 22px badge share a flex centerline with an 8px gap; the 14px SVG centers within its circle. No duplicate icon registration.

Account card density refinement: 16px inset (previously 20px), 8px identity gap (12px), 4px copy stack gaps (8px), and 16px account name (18px). Shared Avatar and compact Action remain unchanged. Applied through the registered Payment account component.

Account identity keeps a 4px name-to-number gap. The button has an additional 4px top margin, creating an 8px total separation from the number without loosening the identity group.

Implementation uses a nested identity group with 4px gap and an outer copy stack with 8px gap to the button; no additive button margin.

Correction: genuine disabled/unavailable Action states retain .45 opacity. Product previews use available Payment account and settings actions with no-op callbacks when destinations are unfinished. Unavailable specimen remains disabled and faded; inspector support for disabled controls remains intact.

Figma typography audit (1 October 2026) supersedes earlier estimates: amount input 16px Medium / 1.4; floating label 10px Regular; compact account action 12px Medium / 1.4; account name 14px Semibold, account number 12px Regular; merchant heading 20px Medium. Compact button height/padding remain 32px and 6px.

## Hub name readability — 11 October 2026

At user request, the shared Payment account name increases from 14px to 16px,
using the existing field-value size with item-title Semibold weight, 1.4 leading
and Inter body family. The canonical default, unavailable and long-name specimens
and Review payment all consume the same payment.css and paymentAccount renderer.
Long names retain overflow-wrap:anywhere and the copy column retains min-width:0.

Source audit: 16px card inset, 8px avatar-to-copy gap, 8px identity-to-action gap
and 4px name-to-account-number gap remain tokenized. Registered Avatar and compact
Action retain their own geometry and disabled/callback behavior. Review payment
has no local Payment account overrides. Existing spacing selectors map these
relationships for inspection; browser measurements and visual review remain with
the user. The catalog behavior description now reflects the current gaps.

## Add message density — 11 October 2026

Account-number readability: the shared Payment account A/C No. text now uses the
existing 14px Regular supporting-text role instead of the 12px caption role,
retaining Inter, secondary color and 1.4 leading. Default, unavailable and
long-name specimens inherit the change. Internal gaps, registered children and
callbacks remain unchanged. Source/diff checks passed; visual review is manual.

Review payment now passes size=compact to the registered quiet Action for Add
message. This selects the existing 32px minimum height and 6px vertical inset
instead of the default action height. No screen CSS overrides or shared Action
changes are introduced. The callback still replaces the action with the optional
Message field and focuses it. Source syntax and diff checks passed; browser and
visual review remain with the user.

## Hub image and larger review amount — 11 October 2026

Payment account now selects the existing 56px profile Avatar instead of the 44px
default. Shared Avatar internals are unchanged; all Payment account specimens
inherit the configuration. Long-name wrapping and 16px inset / 8px outer identity
gap / 4px text gap remain.

Review payment alone opts into Text field prominent=true, amountSize=large. This
registered configuration uses 22px Medium Inter for both amount and rupee prefix,
with matching 28px line boxes and baseline alignment. The 64px field surface,
6px vertical / 16px horizontal insets, 4px caption gap and 8px prefix gap remain;
errors stay outside the surface. Existing prominent fields retain 16px values.
Canonical specimens cover filled, empty, error and disabled large amounts using
the same renderer. Native input, accessible label, onInput and setError behavior
are unchanged. No screen CSS overrides target registered child internals.

Source syntax and catalog checks passed; rendered spacing, long-value fit, focus
and visual review remain with the user under the manual-review policy.

Amount refinement: reduced the opt-in large amount configuration from 22px to
20px at user request. Review payment remains the only product consumer; default
fields are unchanged. Prefix and input keep matching 28px line boxes. Catalog
and diff checks pass; visual review remains with the user.

Large amount prefix spacing: reduced the opt-in configuration’s rupee-to-input
gap from 8px to 4px (--th-space-1). Review payment uses this configuration; other
field prefix gaps retain 8px. Diff check passed; visual review is manual.
