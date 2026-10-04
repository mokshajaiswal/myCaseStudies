# Hub creation flow

Three registered screens reuse one page at prototypes/create-hub/index.html: type, details and created. Flow-reference cards now open the matching step. Figma references are 397:49240, 397:49288 and 397:49311 in Turbo Hub; local reference images sit beside the real preview and update on step changes.

Radio choice is the uncovered exclusive-selection control. The existing Checkbox choice has independent selection semantics and is not substituted for a native radio group. One Radio choice implementation serves both Hub type and Source Account. It owns a 24px native input, 16px inset, 8px gaps, wrapping title/optional description, selected treatment, disabled semantics and focus outline. The caller owns the group legend, spacing, initial values and selected-value callback. Native group behavior owns exclusive selection after mounting. No appearance variants are introduced.

Canonical specimens expose With description and Title only from the same renderer. Checked/unselected and disabled are states. Browser checks proved arrow-key selection deselects the previous choice, long labels wrap without overflow, both configuration selectors resolve once, computed padding is 16px and gaps 8px, and disabled controls are native-disabled with 0.45 root opacity. Optional description is omitted entirely in Title only.

The page reuses Status bar, Navigation, Page header, Avatar, Field, Hub summary, Action and Success notice unchanged. Parent layout owns fieldset groups, content padding, summary/action spacing and footer placement. Shared Chrome backdrop remains one empty decorative surface; no new variant or embedded content is added. Shared full-page S/C/Escape inspection remains available.

Creation requires a nonblank Hub name (maximum 40 characters) and one sample source account. Submission exposes accessible errors and focuses the first missing field. Type, name and account persist in sessionStorage within the tab. Back returns to the prior step and preserves inputs; popstate renders the URL step. Created shows the submitted name/type, a dismissible notice and an invitation link to the existing member setup. View Hub opens the existing Members demo.

This is a local case-study flow, not a banking integration. The dashboard remains the existing Sharma fixture with its sample members, limits and transactions; arbitrary created names are shown on the creation result rather than creating a new dashboard dataset. Add Pixel Tag, Help and Hub options remain live-looking no-op source actions until their flows are implemented. The generic house icon replaces source 3D artwork; radio surfaces use the DS selected treatment rather than source decorative pastel illustrations. Rounded white content and continuous blue chrome follow the established DS. View Hub is a prototype navigation affordance.

Verification: catalog validation passed with no errors (23 components, 15 screens). Browser rendering proved references load, empty submission shows name/account errors, a valid sample submission reaches Created, same-tab Back retains The Sharma’s and the credit account, notice dismissal removes feedback, and type/setup/created screenshots were captured under prototypes/create-hub/verification/. At 390 × 844, type and details previews had no document or form overflow; product layout retained its logical 390px width and reference images loaded. Full gallery/modal comparison remains to be completed; it is not implied by catalog validation.

Standard Action height increased from 44px to 48px through --button-height following user feedback on Next. Compact Actions retain 32px; other controls retain --control-height at 44px.

Choose a Hub Type uses the registered Radio choice prominent configuration (16px title and description instead of 14px), with unchanged 16px inset, 8px gaps and 24px radio. The redundant Hub type fieldset legend is visually hidden but retained for accessibility. The canonical Radio choice specimen includes Prominent using the same renderer. Browser/inspector review remains with the user.

Create a Hub scroll ownership: a transparent creation-scroll viewport contains the white rounded creation-content sheet. The page heading remains in fixed phone chrome. The sheet owns its background, padding and 24px top corners but does not scroll its contents separately. Scrolling moves the whole sheet together; status/navigation, feedback, footer action and home safe area remain fixed. The viewport is keyboard-focusable and hides its scrollbar. This is screen-owned layout, using the existing DS surface/radius tokens. Browser review remains with the user.

Source account grouping (3 October 2026): user-supplied screenshot establishes one rounded bordered surface containing Credit and Prepaid account rows with an inset separator. Create Hub now uses that arrangement. Radio choice adds a registered appearance=list configuration, retaining its 16px inset, 8px gaps, 24px native input, wrapping, disabled semantics and selection callback; the parent owns shared border, clipping and divider. Other card appearances remain intact. The canonical specimen includes a grouped-list example. Focus outline is inset to remain visible inside clipped list corners. Syntax checks passed; browser interaction, spacing and visual review remain pending with the user.

Hub Name placeholder (3 October 2026): user requested the normal input prompt centered vertically rather than a small top label. Shared Text field now supplies variant=placeholder, adopted by Create Hub. A visually hidden associated label preserves the accessible name after typing; native placeholder defaults to that label. The component owns 60px minimum surface height, 12px vertical/16px horizontal padding and centered input placement. Existing labelled fields remain unchanged. Canonical specimens cover empty, filled, error and disabled placeholder fields. Source/syntax/catalog checks only; visual and browser interaction review remain with the user.

Scroll boundary correction (3 October 2026): the transparent creation-scroll viewport used overscroll-behavior-y:contain, which prevents scroll chaining but permits native boundary bounce. The moving white sheet exposes the blue phone backing above the fixed footer, as shown in the user screenshot. Changed this screen-owned scroll viewport to overscroll-behavior-y:none to suppress the boundary effect while retaining normal content scrolling. Source check only; trackpad/browser verification remains with the user.

Source account readability (3 October 2026): selected the existing prominent Radio choice size for the two list rows (16px labels rather than 14px). Increased the screen-owned legend-to-list spacing from 8px to 16px using --th-space-4. Shared component geometry stays unchanged. JavaScript syntax checked; manual visual review remains with the user.

Component reuse and focus audit (3 October 2026): mouse selection previously triggered the shared Radio choice :focus-within outline in addition to the browser-native radio focus ring. The shared renderer now uses a controlled 24px radio with a 12px selected dot; only focus-visible on the input triggers the row focus outline. Native input semantics and keyboard selection remain intact, and forced-colors mode retains the native glyph. Selected-row tint remains distinct from keyboard focus.

Current Create Hub source audit: field placeholder and radio list/prominent styling come from shared registered implementations; Action, Navigation, Avatar, Summary, Notice and Page header are consumed through their APIs. Page CSS owns form, legend, scroll, footer and grouping layout. Found a page-owned separator pseudo-element attached to a registered radio row, with a position override on that row. Replaced it with a separate page-owned divider sibling, eliminating both child overrides. Shared phone-preview rules on this page style the shell and layout rather than registered controls. Recorded the reuse audit requirement in app AGENTS.md for subsequent screens. Source and catalog verification only; mouse/keyboard appearance and interaction await user review.

In-page heading size (3 October 2026): Source Account legend now uses the existing section-heading role (16px Semibold) instead of the item-title role (14px Semibold). Its existing 16px gap to the account list remains. This is a page-owned heading; no registered child is overridden. Use the section-heading role for comparable page-owned group headings when auditing subsequent screens. Source check only; visual review remains with the user.

Source Account section separation (3 October 2026): added an 8px page-owned top margin to the account fieldset alongside the existing 16px form gap, yielding 24px above the section heading. Heading-to-list gap remains 16px. No registered component styling changes. Manual visual review remains with the user.

Editable Avatar (3 October 2026): registered editable=true composition places a separately registered Avatar edit action at the lower-right of an unchanged Avatar. Child owns 36px surface, blue 2px border, white 3px outer ring, 20px edit icon and native button semantics; wrapper owns -4px overlap. Create Hub uses the shared API with a no-op prototype callback because image editing is undefined. Canonical specimens cover editable Avatar and default/disabled edit controls. No page-owned child overrides. Source and catalog checks only; visual, focus and interaction review remain with the user.

Selected Radio choice text (3 October 2026): the shared component now colors the main title with --color-action when its native radio is checked, across card and list appearances. Supporting descriptions retain their existing treatment. This belongs to the shared selected-state contract, with no page override. Existing canonical checked specimens inherit the change. Source checks only; manual visual review remains with the user.

Account selection and create eligibility (3 October 2026): account choice starts empty on each page load instead of restoring a saved selection; in-page step navigation retains the user's choice. Create Hub uses the shared Action disabled API until trimmed name is nonempty and an account is selected, updating on both inputs. Existing submit validation remains. Page-owned dividers are hidden beside either selected neighbor with visibility:hidden to preserve list height; this does not style registered radio rows. Syntax and catalog checks passed. Browser interaction and visual review remain with the user.

Hub-created list correction (3 October 2026): Invite Member and Add Pixel Tag now share a page-owned rounded bordered surface with a separate full-width divider. Registered Action variant=list owns left-aligned accent label, 44px soft-blue icon well, 16px inset and 8px gap; links retain their existing routes. Canonical Action specimen includes the new variant. No page CSS alters registered rows. Syntax/catalog checks passed; browser and visual review remain with the user.

Hub options visibility (3 October 2026): shared more semantic icon now uses bold Phosphor dots-three geometry (16-unit dot radii) and renders at 24px instead of 20px. The icon-only Action target and Summary placement remain unchanged. Shared specimens inherit the update; no page-specific icon override. Syntax checks passed; visual review remains with the user.

Created-screen ambient glow (3 October 2026): restored the soft pink, violet and blue haze visible behind the Hub identity in the supplied reference. The page-owned content background uses fading radial gradients over its top 230px; the white base and rounded surface remain. Pink/violet stops are local decorative colors; blue reuses --color-action-soft. No Summary or other registered component overrides. Manual visual review remains with the user.

Glow fade correction (3 October 2026): bounded radial background retained color at its lower edge, producing a visible cut to white. Added a topmost linear gradient fading to opaque white at the exact bottom of the decorative area, so the color reaches the base surface before the background image ends. Source check only; visual review remains with the user.

Centered Hub identity sizing (3 October 2026): user requested one size step larger for the Hub name and FAMILY HUB subtitle. Shared centered Summary now uses existing 22px and 14px primitives, respectively, retaining Semibold weight and role line heights. Default horizontal Summary is unchanged; canonical centered specimens inherit the update. Catalog checked; manual visual review remains with the user.

Created intro refinement (3 October 2026): intro top border now spans the content surface using negative 24px outer margins and compensating 24px text padding. Supporting copy uses local neutral gray #909090 to match the lighter reference treatment without changing shared text tokens or registered components. Source checked; manual visual review remains with the user.

Source Account list (4 October 2026): Radio choice appearance=list no longer fills the selected row (radio
carries selection); the divider-hiding rule on Create Hub is removed so dividers stay. Added a no-op compact
quiet "Add" Action (aria-label "Add source account") at the right of the Source Account heading; adding accounts is out of scope.
Source Account spacing and divider (browser-checked): heading-to-list gap 16→20px; the in-list divider is now a
1px border (was a 1px-high fill), so under the scaled preview it snaps to device pixels exactly like the list border
(both computed 0.67px #e1e8f2).

Radio choice (4 October 2026): checked ring 1px→2px (24px box, border-box, so the 12px dot stays centred).

Hub created as a Hub Details state (4 October 2026, browser-checked): hub-dashboard?state=new renders the
just-created Hub (Figma 397:49311) with the shared chrome hero (framed tile, "1 member"), no limit or tabs,
and a sheet with the prompt and registered list Actions (Invite Member, Add Pixel Tag). Create Hub submits to
it; create-hub?step=created forwards there. Story scene hub-created and the registry preview point to it.
The console 404s are not page resources (performance entries show no failed loads; most likely favicon).

New-Hub limit setup and Pixel Tag removal (4 October 2026, browser-checked): Spending limit summary gains
variant='setup' (label, "Not set yet", optional note and compact action; specimens Setup and Setup / glass).
hub-dashboard?state=new shows it in glass under the identity ("Set limit" → Spending limit), and the sheet now
only invites members. Pixel Tag messaging is removed outside the Pixel Tag screens (new-Hub prompt and action,
story copy for hub-created, and the unreachable old created-step markup in Create Hub). The hidden Pixel Tag
chapter and its own screens are unchanged.
Setup minimised (browser-checked): variant=setup is now one centred button (plus icon + action.label) in the
card surface; glass tone makes it a frosted white-text button. New-Hub label: "Set up the Hub’s monthly limit" →
Spending limit. Label, "Not set yet", note and the separate white pill are removed.
