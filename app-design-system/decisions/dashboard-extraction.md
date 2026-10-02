# Dashboard extraction and audit

## Evidence and scope
Source references: mO1QSMbg3mwg82znPJfl6fYFbxA (Spends), cUEe9aCzNha1OYgFqfbI4ag9A (Members), xuyu9b6BPiGFE51sIWm7n3Rm4HE (Analytics). Chose this screen because it covers identity, limits, tabs, transactions, member states, badges, avatars, and analytics. Blue/white payment language is retained; clean surfaces and simplified charts are proposed visual refinements. Data is static demonstration content from references. Chart intermediate points are illustrative, not reconstructed transaction history. Inconsistent source totals are retained as independent reference examples, not reconciled as a real dataset.

## Components and ownership
Ten registrations share components/hub.js and hub.css, including the later phone status bar. Action owns native button/link semantics, disabled, hover, active and focus; callers own callbacks. Tabs owns tab semantics and Arrow/Home/End navigation; callers own selected value and panel content. Avatar, Badge, Limit, Row, Member, Chart, Hub identity and Status bar are presentational. Member calls Avatar, Badge and Limit; Row and Hub identity call Avatar. Icons are noninteractive internal graphics. Page owns tab-to-panel wiring, expanded transaction list, history query state and section layout. Settings and Add remain disabled until their destination flows are implemented.

## Spacing audit
Action: 12px/16px padding, 8px icon gap; icon action 10px padding with 44px target. Tabs: 20px group inset, 8px gap, tab padding 17px/8px/14px with 48px minimum target. Avatar 44px or 64px, no inset. Badge 3px/8px inset. Limit/Member/Chart 20px inset. Row 16px vertical and 12px gap; row parent owns separators and 16px horizontal inset. Member identity gap 12px, role gap 6px; pending separator margin 18px and inset 14px. Nested Member limit uses an explicit 18px top inset and no border, not the full standalone box inset. Hub identity 24px vertical and 16px gap. Each source selector is registered below; incidental local values remain literals pending broader evidence.

## Layout guidance
Screen is fixed at 390 × 844 with 24px content insets; the whole phone preview scales uniformly. See phone-preview.md. Lists of independent member cards use 16px gaps; transaction rows use zero gap with separators. Analytics section spacing is 24px. These are page-owned arrangements, not component registrations.

## Verification
JS syntax and catalog validation pass. Desktop screen inspected; mobile 390px shows no horizontal overflow. Show all expands from five to eight transactions. Members shows joined/pending states. ArrowRight selects Analytics and moves focus. Native focus outlines and disabled controls inspected. Full original art deliberately deferred. Inspector CSS measurement uses supported padding/gap/margin properties; exhaustive inspector-layer trace remains unverified.

## Current Figma pass

The first Spends refinement supersedes the original horizontal identity, expanded-list toggle, boxed transaction rows and tab geometry above. See [figma-dashboard-refinement.md](figma-dashboard-refinement.md) for the current source frame, shared variants, layout ownership and verification. Unfinished actions use available no-op instances; actual unavailable DS variants retain their faded treatment.


Action accent correction: sampled the user-supplied side-by-side reference button at #1D86FF; previous shared --th-blue was #1766DC. Updated the primitive used by --color-action, so registered Action controls and other action-accent consumers stay consistent. Component geometry, spacing and typography remain unchanged.
