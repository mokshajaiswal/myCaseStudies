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
