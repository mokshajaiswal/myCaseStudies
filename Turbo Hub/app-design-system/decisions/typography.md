# Typography specifications

Source: [Turbo Hub → Prototype_v1](https://www.figma.com/design/IJU02E1n5jSddJqd3SpkG7/Turbo-Hub?node-id=396-18145). Audited 1 October 2026 using Figma design context, including screenshots and named typography styles.

Matched frames: Hub Details Spends 402:51668, Members 402:51353; Add Member details 402:50472 and payment methods 402:50163; Review payment 436:64799; approval pending 436:65448.

Inter is correct. The previous implementation was generally larger and heavier: page titles 26px/600 versus source 20px/500; transaction names 15px versus 14px; account names 16px versus 14px; field labels 12px versus 10px; amount field 22px/600 versus 16px/500; compact action 13px/600 versus 12px/500. The source consistently uses 140% line height.

| Semantic role | Size | Weight | Line height |
| --- | --- | --- | --- |
| Body | 16px | regular | 1.4 (22.4px) |
| Screen heading | 20px | medium | 1.4 (28px) |
| Navigation title | 18px | semibold | 1.4 (25.2px) |
| Hub identity | 20px | semibold | 1.4 (28px) |
| Section heading | 16px | semibold | 1.4 (22.4px) |
| Item title | 14px | semibold | 1.4 (19.6px) |
| Caption | 12px | regular | 1.4 (16.8px) |
| Supporting text | 14px | regular | 1.4 (19.6px) |
| Field label | 10px | regular | 1.4 (14px) |
| Field value | 16px | medium | 1.4 (22.4px) |
| Spending amount | 20px | bold | 1.4 (28px) |
| Primary action | 14px | bold | 1.4 (19.6px) |
| Compact action | 12px | medium | 1.4 (16.8px) |
| Payment choice | 14px | bold | 1.4 (19.6px) |
| Choice price | 14px | medium | 1.4 (19.6px) |
| Tab label | 14px | regular | 1.4 (19.6px) |
| Active tab | 14px | bold | 1.4 (19.6px) |
| Status heading | 18px | semibold | 1.4 (25.2px) |

Roles are named by responsibility, rather than by a generic heading/body distinction or Figma's numbered Type styles. Equal sizes do not force role sharing: screen heading is 20px Medium, hub identity 20px Semibold, and spending summary 20px Bold. Field value is 16px Medium while body is 16px Regular. Active tabs are Bold, inactive tabs Regular.

Navigation remains 18px Semibold following the user's explicit request to increase it; Figma shows 16px Semibold. Pending text contains a Plus Jakarta Sans source style; keep Inter per the user's explicit default-family direction. Merchant N is intentional placeholder brand artwork in Georgia, not product typography. Phone status-bar typography and the fixed preview shell remain separate from app text roles.

Primitives define family, size, weight and leading. Semantic --type-<role>-size/weight/leading tokens supply component typography. Family roles are --font-body, --font-heading and --font-label. Foundations recipes reference both primitives and semanticTokens so each sample displays its resolved specification. Legacy --th-type-*, --weight-* and --leading-* are compatibility aliases; new work uses explicit roles.

Scope: typography only. The existing horizontal hub identity arrangement, generic icons/artwork, 24px rounded content surface and product behavior remain intentional implementation choices. No new screen was created.

Analytics measurements: compact section headings 14px Semibold (483:74767), chart values 12px Medium and chart axis labels 10px Medium (483:74743). These use separate small-section/chart roles; the source also contains hidden older drafts, which were excluded from the comparison.

Verification: catalog check has zero errors. Browser computed styles confirm Inter, the measured sizes/weights and role-based line heights across all three pages. Checked Spends/Members/Analytics tab switching, Add Member details → payment choices → back, and Foundations resolved specifications. Preview and controls show no horizontal text overflow in inspected areas.

Members refinement adds three measured roles: tag-label (10px Medium), limit-value (12px Semibold), metadata (10px Regular), all Inter with 1.4 leading. Each has its own Foundations recipe and semantic mapping; they do not reuse field or body roles merely because a size matches. See figma-members-refinement.md for component adoption.

Action typography refinement (3 October 2026): user requested larger, slightly lighter shared Action labels. The default semantic action role is now 16px Semibold (600), replacing 14px Bold (700), with existing 1.4 leading. Registered Action implementations and specimens consume the same role tokens; compact action typography remains separately defined. Source/catalog checks passed; manual browser and visual review remain with the user.

Field label readability (3 October 2026): increased shared field-label size from 10px to 12px at user request, retaining Regular weight and 1.4 leading. Text field and Select labels and canonical specimens inherit the semantic token change without page overrides. Catalog checks passed; browser and visual review remain with the user.

Empty Text field presentation (3 October 2026): empty shared Text fields visually hide the associated label and use its text as the placeholder, adding “ · optional” where supplied. Filled fields restore the mini heading; input events update empty presentation. Persistent associated labels retain accessible naming. Placeholder-only variant remains placeholder-only after typing. Shared component/specimens inherit behavior; no Add Member override. Syntax and catalog checks passed; manual browser review remains with the user.

Switch copy readability (3 October 2026): shared Switch title now uses existing 16px sizing with its Semibold weight; description uses the existing 14px Regular supporting-text role instead of 12px caption. Shared specimens inherit the update; no page overrides. Catalog checks passed; manual visual review remains with the user.

Further Switch copy refinement (3 October 2026): increased shared title from 16px to 18px and description from 14px to 16px per user feedback, retaining their weights and line-height roles. This is shared Switch styling, not a page override. Source checked; visual review remains with the user.

Switch description adjustment (3 October 2026): reduced shared description from 16px to the existing 14px supporting-text size per user feedback; title remains 18px. Manual visual review remains with the user.

Select presentation (3 October 2026): shared Select now presents one vertically centered 18px dropdown row within a minimum 60px field surface, with 12px vertical and 16px horizontal insets. Its associated label stays visually hidden and accessible; native options, focus, disabled and error behavior remain shared. Canonical Select specimens inherit the update. Catalog checked; browser and visual review remain with the user.

Select correction (3 October 2026): restored the visible mini heading. User intended the dropdown arrow to center against the entire bordered surface, not removal of the label. Shared Select now renders a decorative registered-provider caret positioned at 50% of the field surface, with pointer-events:none; native select retains its behavior and 18px text. Syntax checked; manual browser review remains with the user.

Switch copy sizing (3 October 2026): reduced shared title from 18px to 16px and description from 14px to 12px per user feedback. Existing weights and 1.4 leading remain. Source checked; manual visual review remains with the user.

Stable Text field height (3 October 2026): all shared Text field surfaces use a consistent 60px height in empty, labelled/filled and placeholder-only states, with 4px minimum vertical and 16px horizontal padding, centering the content in the remaining height. Mini label (12px at 1.4 leading), input (24px, or 28px prominent) and 2px gap fit that surface. Validation stays outside and may increase total component height; Select retains its own geometry. No page overrides. Catalog checks passed; manual visual review remains with the user.

Text field padding refinement (3 October 2026): increased shared fixed-height Text field vertical padding from 4px to 6px (half --th-space-3), retaining 60px surface height and 16px horizontal inset. Source checked; manual visual review remains with the user.

Prefix/input alignment (3 October 2026): shared Text field body now aligns prefix and input by baseline instead of centering their boxes independently, with matching 24px line boxes (28px prominent). Addresses +91 versus Mobile number placeholder alignment without page overrides. Source checked; manual visual review remains with the user.

Switch heading alignment (3 October 2026): shared Switch uses a grid with heading and toggle centered in the same first row; optional description occupies the next row and no longer influences control alignment. Info and title-only variants share this geometry. Caller APIs and registered child ownership remain unchanged. Catalog checked; manual visual review remains with the user.

Select height consistency (3 October 2026): shared Select now has the same fixed 60px bordered surface as Text field, with 6px vertical padding and a 24px input line. Visible 12px caption and 18px selected text remain; arrow remains centered on the whole surface. Catalog checked; manual visual review remains with the user.

Field height and caption gap (3 October 2026): shared Text field and Select surfaces increase from 60px to 64px across variants; shared --field-text-gap now references --th-space-1 (4px) instead of 2px. Placeholder-only fields retain no visible label gap. Existing insets, error placement and page overrides remain intact; spacing primitives unchanged. Catalog checked; manual visual review remains with the user.

Checkbox label readability (3 October 2026): shared plain Checkbox choice copy now uses the existing 14px Regular supporting-text role instead of 12px caption. Card title, description and price keep their separately defined roles. No page overrides. Catalog checked; manual visual review remains with the user.

Screen heading refinement (3 October 2026): shared screen-heading role now uses 22px Regular (400), replacing 20px Medium (500), retaining 1.4 leading. Registered Page header and page-owned headings referencing this role, including Add Member step-title, inherit the change. Navigation/section/identity roles remain distinct. Catalog checked; manual visual review remains with the user.

## Readability scale-up (4 October 2026)

Review found Members text too small at the 390px viewport. Raised semantic roles above
the earlier Figma-measured values: tag label 10→12px, metadata 10→12px, limit value
12→14px, small section heading 14→16px. Member card (profile) names now use the 16px
field-value size with the item-title weight. Roles propagate to every consumer (Badge,
Spending limit summary, member profile cards, Hub Details section headings); textStyles
primitives updated to match. Visual review across affected screens remains with the user.

Compact Action (4 October 2026): label raised 12→14px via --type-action-compact-size, and its
icon reduced to 16px (from the default 20px) so the chevron stays in proportion. 32px height
and 6px/12px padding unchanged. Affects every compact Action (Members Add, account actions).

Select value size (4 October 2026): removed the literal 18px override on .th-select values so
Select and Text field values share the 16px field-value role. Reported mismatch on Add Member
(Relationship vs Full name).

Tabs (4 October 2026): tab label and active tab sizes raised 14→16px through
--type-tab-label-size / --type-tab-active-size; Foundations textStyles updated.

Limit captions (4 October 2026): Spending limit summary captions ("Spent", "Monthly Limit")
now use --color-text-secondary (#64738b) instead of --color-list-detail (#444), so they read
as labels under the amounts.
