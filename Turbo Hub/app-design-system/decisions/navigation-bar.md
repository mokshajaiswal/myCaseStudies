# Navigation bar

Navigation is a shared component across Hub Details, Add Member and Review payment. It reuses Action for optional left/right controls, without privately redefining their interaction states. Caller supplies title, action labels, icons and callbacks/hrefs; component owns centered title, equal 44px action slots, spacing and quiet icon-only configuration.

Configurations: title only, back + title, back + title + trailing action; specimen additionally checks a wrapping long title. Slots remain present when actions are omitted, retaining true horizontal centering. Defaults: 8px top inset, 16px horizontal/bottom inset, 12px gaps, 44px controls. Existing component tokens supply all padding/gaps. Long titles wrap; screen chrome may grow vertically.

Use TurboUI.navigation({title,left,right}). Each action requires an accessible label. All button hover/focus/disabled behavior belongs to registered turbo-button. Do not introduce separate navigation interaction targets for child controls. Place inside phone-chrome for a continuous blue backdrop. Existing screens now import the same renderer and no longer define navigation geometry locally.

Verified in browser: all four configurations have a measured title center offset of 0px; 16px horizontal inset and 12px gaps resolve correctly. Settings specimen callback fires, payment Back navigates to Hub Details, and all three screens render the shared component. Catalog check: zero errors.

Visual refinement: 18px centered title via --header-title-size; transparent white icon buttons retain 44px hit areas. --header-background defines the blue-to-purple gradient. Screen backing paints the continuous gradient behind transparent chrome children, avoiding separate painted header seams.

Disabled navigation actions retain full opacity for consistent header icon contrast; native disabled behavior and unavailable labels remain in place.

Full-opacity unavailable-button treatment now applies to all shared Action buttons, not only navigation. Disabled controls stay inert; hover/pressed effects are suppressed.

Chrome backdrop extraction: Navigation is transparent and declares `turbo-chrome-backdrop` as a dependency. Its specimens use the real backdrop renderer, and product screens use one backdrop on the phone screen rather than letting Navigation paint a local copy. The backdrop now owns the layered blue/violet treatment; Navigation continues to own only its geometry, content and child actions.

Back-arrow refinement (3 October 2026): user requested a slightly larger and thicker back arrow across screens. The shared navigation-back semantic icon now uses Phosphor bold arrow-left geometry, inheriting currentColor; its shared Action renderer uses 24px rather than 20px for this semantic icon. Existing 44px navigation targets and other icons retain their geometry. Existing navigation specimens consume the same shared renderer. Syntax and catalog checks passed; browser and visual review remain with the user.

Icons-only variant (3 October 2026): shared Navigation supports variant=icons-only with one or two action slots and no visible title. Existing geometry and accessible navigation name remain. Canonical specimens register both configurations. Add Member adopts the variant through its API without page overrides. Syntax/catalog checks passed; manual visual review remains with the user.

Consistent navigation back icon (3 October 2026): shared Navigation normalizes back, caret-left and arrow-left action icon requests to navigation-back, so legacy screen callers also render the shared bold 24px back arrow. Other navigation actions remain unchanged. This belongs to the shared renderer rather than page overrides. Syntax/catalog checks passed; manual visual review remains with the user.

Navigation help (4 October 2026): registered question-fill (Phosphor core fill, MIT) with
semantic name help-fill. Navigation maps a help action to help-fill at 24px (the back-arrow
size; previously the 20px regular outline). Other uses of the help icon are unchanged.

- Screens with a page header below the bar (Spending limit, Pixel Tag, Geofence setup, Invitation, Request outcome, Add Member) use the `icons-only` variant: the page header is the only visible title, and the bar title remains as the accessible label.
