# Icon foundation

Scanner actions (4 October 2026): added lightning in Regular, Bold and Fill from the official Phosphor core SVGs ([Regular](https://raw.githubusercontent.com/phosphor-icons/core/main/assets/regular/lightning.svg), [Bold](https://raw.githubusercontent.com/phosphor-icons/core/main/assets/bold/lightning-bold.svg), [Fill](https://raw.githubusercontent.com/phosphor-icons/core/main/assets/fill/lightning-fill.svg)), MIT. Semantic flash maps to lightning and gallery to existing image. `TurboIcons.render(name, {weight:'fill'})` now selects the requested built-in weight for that render only; omitted/unknown weights retain the current provider default, and custom geometry keeps precedence. Camera Action owns its 24px white Fill presentation. Source checks verify all lightning weights render and per-call weight selection leaves the provider's global selection unchanged. Browser review remains with the user.

Reused the starter's MIT-attributed Phosphor geometry only; no sandbox tokens or CRM components imported. Semantic names live in icons/turbo-icons.js and can be replaced with custom SVG through one API. New renders use replacements; rerender existing instances after a replacement.

Icons are noninteractive internal graphics. Callers own actions, accessible button labels, external spacing, and state. The renderer owns its requested dimensions and currentColor; title is optional for meaningful standalone icons. Default and specimen size 24px. No padding or margins are owned by icons. The specimen uses the actual renderer. Generic illustration placeholders are allowed; unresolved product states stay out of scope.

The Iconography provider follows the installed starter's framework/examples/screens/icons.html and icons.js at ae5cb1e (also verified as upstream HEAD): search, weight selector and click-to-copy grid. App-owned adapter CSS reads the studio presentation stylesheet instead of importing sandbox product tokens. Search includes all library builtins and Turbo Hub semantic names, including phone status icons. Weight options come from the real provider (Regular, Bold, Fill); unsupported Thin/Light options from the starter fixture are omitted. The selected weight stays inside the specimen frame; app icon defaults are unchanged. Custom status glyphs retain their registered geometry. Copy produces the public TurboIcons.render() call. Search/select/copy are studio tooling, not registered product components.

Browser verification: 63 unique names render; filtering Analytics returns one semantic icon, Regular changes its SVG path from Bold, and activating it copies the exact public renderer call. Catalog validation and JS syntax checks pass; the mechanical visual scan reports no findings.

The subsequent starter improvement replaces the fixed 560px frame with available-height flex layout (including mobile rail clearance). Our adapter and the starter sandbox now share framework/icon-gallery.js and icon-gallery.css. Each tile has independent code and Copy SVG buttons. SVG export clones the displayed glyph, retains the selected weight/viewBox, adds the SVG namespace and makes currentColor ink portable. Old app-only gallery CSS is removed. These are local, unreleased starter changes; no commit, push or framework lock regeneration is performed.

Verified the app and sandbox SVG clipboard actions in the browser: one namespace, preserved viewBox, portable black ink and geometry matching the displayed Fill weight. Code copying still works. Desktop frame measures 1180px in a 1244px viewport with 32px top/bottom clearance. Mobile frame reaches y=828 in an 844px viewport, leaving 16px bottom clearance; settled width is 358px with no outer vertical overflow. Both catalog checks pass. Ran the npm test script directly through Node because the local npm launcher is broken: 64 tests pass; two plugin tests cannot create Windows symlinks (EPERM). No framework release or lock regeneration was attempted.

Wallet is registered in the Phosphor provider's Regular, Bold and Fill collections using upstream @phosphor-icons/core@2.1.1 wallet SVGs. The semantic TurboIcons wallet mapping makes it discoverable in the shared gallery. It inherits currentColor and the selected provider weight; no bespoke silhouette or fixed-color geometry is used. Browser checks are left to the user for this change.

More-icon refinement (3 October 2026): increased shared dots-three dot radius from 16 to 20 viewBox units at the existing 24px rendered size, per user visual feedback. Uses currentColor and shared provider geometry, without page overrides. Syntax checked; visual review remains with the user.

Icons (4 October 2026): registered Phosphor core gauge (regular, MIT) with semantic name limit; used by the
new-Hub "Set up the Hub’s monthly limit" button instead of plus.

Icons: registered Phosphor core qr-code (regular, MIT) as semantic upi. Member profile payment methods use
Avatar graphic icons (card, upi) instead of C/U initials.
Payment-method tiles switched to fill icons: registered Phosphor credit-card-fill and qr-code-fill (semantic card-fill, upi-fill).

## Figma icons from Member profile (4 October 2026, browser-checked)

Exported from Figma Turbo Hub node 559:55687 (Member profile) through the Figma MCP and registered in
icons/turbo-icons.js with their own viewBoxes and fills set to currentColor (so colour stays inherited):
figma-arrow-back (01 Navigation/Line Arrow), figma-help (06 Action/Help, filled), figma-kebab
(01 Navigation/Kebab Menu), figma-edit (06 Action/Edit), figma-card (08 Banking/Card) and figma-upi
(08 Banking/UPI; the Figma gradient back chevron is drawn at 55% opacity of currentColor).
Roles now pointing at them: navigation-back, help-fill, more, edit, card, card-fill, upi, upi-fill.
The earlier Phosphor registrations (question-fill, gauge, qr-code, credit-card-fill, qr-code-fill)
remain available. Verified in the browser: Navigation back/more, payment-method tiles and the Avatar edit
badge render the Figma geometry; no console errors.
