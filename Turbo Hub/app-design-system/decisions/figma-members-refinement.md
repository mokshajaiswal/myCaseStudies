# Hub Details · Members — second Figma refinement

Source: [Prototype_v1 frame 402:51353](https://www.figma.com/design/IJU02E1n5jSddJqd3SpkG7/Turbo-Hub?node-id=402-51353). Preview uses the local direct Figma export with a frame link beside the coded screen.

## Source content and layout

Use the two members shown in this frame: Arun Sharma (Manager, ₹0 spent of ₹45,000) and Kavya Sharma (Wife, Manager, pending). New session invitations still append through the existing flow. Members overview uses the source ₹0 / ₹1,00,000; Spends keeps its separate source ₹14,500 example. The source Members ring visibly suggests nonzero use despite its ₹0 label; the component renders a genuinely empty ring to respect its data contract.

Page owns the white panel, 24px horizontal inset, 16px top inset, 16px section-to-list/list-item gaps and the count/Add alignment. The heading uses small-section typography (14px semibold). Add reuses compact Action with a trailing caret and routes to the existing Add Member screen; the undefined source dropdown is not invented. Keep the existing compact Action's 32px minimum height rather than reducing it to the source 28px. Keep navigation 18px, content corners 24px and the fixed 390 × 844 phone viewport. Decorative source watermark remains omitted as previously requested.

## Shared components

- Member profile variant: 16px identity inset, 16px avatar-to-copy gap (source 15px rounded to the existing token), 4px name-to-tags gap, 8px tag gap, full-width divider. Joined cards compose member Limit; pending cards show a named message with a 16px icon, 4px icon gap and 16px inset. Names/status wrap, tags are optional, and card surfaces have no invented activation behavior.
- Avatar profile size: 56px, 12px corners. Initials replace source portraits, consistent with the inexpensive-placeholder brief.
- Badge role/relationship variants: 4px/8px inset, 8px corners, 10px Medium / 1.4. Relationship uses the source cream surface with darker gold text for readability; role uses the existing blue list text and icon surface.
- Limit member variant: 16px inset, 6px horizontal track, 8px track-to-values gap. Spent/Monthly Limit values use 12px Semibold / 1.4; captions use 10px Regular / 1.4. These belong to the Limit renderer, not parent overrides. Circular and default variants remain available.
- Action iconPosition=start/end: decorative icon placement is an API option. Real trailing-icon and compact trailing-icon fixtures share native Action interaction states. Existing buttons keep leading icons by default.

New semantic typography roles: tag-label, limit-value and metadata, each registered in Foundations with primitive references and semanticTokens. Component variants and supported content configurations have real renderer specimens, named parts, spacing selectors and explicit dependencies. Parent recipes remain page-owned.

## Verification

Browser measured profile Avatar 56px; identity inset/gap 16px; compact tags 22px high with 10px Medium type; joined card 168px; pending card 140px; member Limit 78px with 12px Semibold values and 10px captions. Long names/status and absent tags wrap without overflow at the specimen width. Compact Add measures 32px high and successfully opens Add Member. Action callback fires; genuine disabled specimen retains .45 opacity. Keyboard tabs switch/focus correctly; returning to Spends retains its amount and eight rows. Catalog and JS syntax checks pass.

Keyboard focus exposed a shell bug: overflow:hidden allowed the decorative phone viewport to scroll programmatically, moving the header inside the case. Shared phone viewport/screen now use overflow:clip; content remains overflow-y:auto. Verified viewport/screen scrollTop stay zero and the status bar remains aligned with the shell while content scrolls. Surface colors, radii and fixed logical viewport are retained. This supports all prototype previews.

The browser backend did not apply the narrow viewport override in the preceding pass; this pass verifies the fixed logical phone and narrow component specimens without claiming a native mobile-browser run. Exhaustive inspector traversal is not claimed.

Overview registration: Members has its own hub-members screen entry pointing to the existing Hub page with ?tab=Members. The hub-dashboard entry opens Spends explicitly. Sharing a route does not hide a completed screen state from the overview; no duplicated page implementation is needed.

The Members panel now includes the source’s decorative “Manage spends together” artwork after the member list. Three centered pale-gray text lines and a small yellow lock are page-owned decoration, hidden from assistive technology. The shared Member control and fixed phone geometry are unchanged; the artwork scrolls with the list. JS syntax and whitespace checks pass; visual positioning has not been browser-verified in this pass.
