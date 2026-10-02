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
