# Separate accounts with shared expenses

Requested as the direction outside the selected manager-led Hub. One new prototype at
`prototypes/shared-expenses/index.html` is registered under Prototypes & flows and appears
in a separate alternative-concept chapter of the flow reference. The case study section
is now “The direction we didn’t take” and embeds this same real screen.

The concept keeps personal balances private and tracks shared bills, equal shares and
settlement balances. Example data is fictional: Arun paid electricity ₹2,400 and groceries
₹1,200; four equal shares are ₹900 each. Neha owes Arun ₹900. Other members’ outstanding
shares are shown in Balances. Expenses/Balances tabs are live, with native arrow-key tab
navigation. Settle up reveals an illustrative review message on this same screen; it does
not send money, change balances or create another screen. This alternative is separate
from the accepted story/playback and introduces no step into the real Hub journey.

## Ownership and reuse audit

Status bar, Navigation, Page header, Tabs, Row, Avatar and Action use the registered
TurboUI renderers without internal overrides. No new icon or independent control is
introduced. The screen owns selected tab and review visibility; Tabs and Action own
interaction. Headline, monthly summary, personal-share facts and informational text are
page-owned content and layout. Summary and list wrappers own external spacing only.
Content has 24px inset, 20px stack gaps and the default 24px rounded top surface beneath
continuous blue chrome. Existing Inter typography/color roles and phone geometry are used.
No child `.th-*` selector is styled by the new screen.

The prototype uses the shared phone shell and scaling. `data-preview="concept"` omits
Figma comparison tooling for this screen, which has no source reference; existing screens
retain their comparison behavior. Embedded screens continue to use the story adapter.

## Verification

Source syntax and token references checked. Catalog validation and existing source tests
run after integration. Browser, keyboard, scroll, focus, long-content and visual review
remain manual with the user under repository policy. Preview:
http://localhost:8020/app/prototypes/shared-expenses/index.html

## Compact visual overview

Reduced explanatory copy and replaced the monthly text card with registered
Expense breakdown visualization. Its donut uses the same two fictional bills:
electricity ₹2,400 (two-thirds) and groceries ₹1,200 (one-third), total ₹3,600.
The legend repeats names and amounts so color is not required to understand the chart.
The share/owed facts, native Tabs, Row and Action remain unchanged shared components.
Page-owned gaps are now 16px, improving the amount of content visible above the fold.
The chart, total and legend share one renderer between screen and canonical specimens,
with positive data and empty configurations. No animation or new interaction is added.

Visualization audit: zero outer margin/inset, 16px chart/legend gap, 12px legend stack,
8px dot/copy gap and 4px value/caption gaps. CSS uses existing color and typography
roles; no screen overrides to the visualization's internal selectors. The logical
132px ring scales in its allocated column; legend wraps. Visual, long-content and
keyboard checks remain manual under repository policy.

Balance refinement: visualization heading now spans both columns above a 120px donut and centered legend. Category rows use 20px separation; columns use 20px and heading uses a 16px row gap. Screen and specimen share this change. Source checks pass; user retains visual review.

Shared-expenses content surface explicitly uses white --color-surface, matching its home safe area. Product chrome remains continuous blue. Diff check passed; visual review remains with the user.

Centered breakdown layout: heading and 132px donut align to the screen centre; category totals form two equally allocated columns below. The registered visualization owns this arrangement in both prototype and canonical specimens. Existing 16px spacing roles and white content background are retained. Source/catalog checks pass; user retains visual review.

Share/owed facts now form one centered two-column summary strip with equal widths, 12px vertical padding, subtle horizontal rules and a central separator. Amounts align directly under their labels. This is page-owned data layout; no registered component internals change. Diff check passed; user retains visual review.

Share/owed summary now sits in one rounded pale-blue box with a subtle border and centered divider, using existing surface, radius and spacing tokens. Main content remains white. Diff check passed.

Family header now includes all four real member avatars through a registered Page header members configuration. The header owns overlapping wrapper arrangement (12px overlap); unchanged 32px stack Avatars own appearance. Group exposes all names to assistive technology and adds no controls. Existing header insets/gap are unchanged; no screen overrides. The canonical Page header specimen includes this same renderer configuration. Source tests/catalog validation run; visual review remains with user.

Bills and balances now use the registered compact Row variant, removing default internal vertical padding while preserving the existing 16px list gap. Heading/list gap is reduced to 12px. No component internals are overridden. Syntax and diff checks passed; manual review remains with user.

Removed redundant panel headings; the selected Expenses/Balances tab labels the accessible panel. Syntax and diff checks passed.

Page header member group now aligns to the top of the heading copy, so its 32px avatars sit beside the family title rather than midway between title and subtext. Shared canonical specimen uses the same rule. Diff check passed; visual review remains with user.

Increased compact row list gap from 16px to 24px, retaining compact component geometry. Diff check passed.

Opt-in alternative palettes: case-study Pixel Tag embed uses plum; shared-expenses embed uses teal. Registered theme files redefine semantic action/icon/chrome roles only and load through an allowlisted theme parameter. Normal prototype and story URLs retain the blue defaults. Components are not locally restyled; white content surfaces and avatar artwork remain unchanged. Source tests/catalog validation run; manual visual review remains with user.
