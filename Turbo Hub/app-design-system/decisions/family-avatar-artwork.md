# Central family artwork

The user requested contextual family portraits and a colored house, with one
replaceable source rather than per-screen assignments. Five built-in ImageGen
assets and their prompt record live in `assets/family-avatars/` under the app root.
Portraits derive from the existing Arun, Kavya, Neha and Rohan story illustrations.

`TurboUI.avatarArtwork` is the single content mapping in the shared Avatar renderer.
The existing `name` input resolves a known first name or full Sharma name to its
portrait. Generic Family graphics resolve the colored house. Caller-supplied `src`
takes priority, leaving merchant artwork intact. Unknown people and failed image
loads retain the previous initials or semantic icon fallback. Relationship alone
does not select a person. Drafts, story fixtures and storage are unchanged.

All existing compositions already consume Avatar, so their current imports and
screen calls pick up the images without local mappings or new composition APIs.
No page, component CSS, geometry, spacing token, callback or interaction changed.
The canonical initials specimen now uses an unknown sample name to continue
showing the fallback rather than a known family portrait. Registry documentation
describes the central content mapping; images remain content, not new variants.

Source audit: Avatar's existing image containment and size variants are reused,
including editable wrappers and their registered edit control. Parent placement
and unrelated local/theme overrides remain intact. Generated assets were inspected
for matching character identity, square framing and a minimal colored house.
JavaScript syntax and catalog validation passed (31 components, 31 screens, no
errors). Renderer checks passed for all four identities and aliases, nested member
and Hub compositions, editable controls, explicit-source precedence, unknown-name
and failed-image fallbacks. All five images are square 1254 × 1254 PNGs. Browser
screen, responsive and visual review remain with the user. The local preview
server did not respond to the asset HTTP check; URL delivery is unverified.

## Light border on colorful backgrounds

The shared Avatar `frame=true` treatment now uses a 3px, 55% white border,
controlled by `--avatar-frame-width` and `--avatar-frame-color`. It replaces the
previous 4px ring and drop shadow. Border-box sizing keeps every avatar's outer
dimensions unchanged; background clipping allows the translucent border to blend
with the parent background. The image, initials and icon fallback share this
treatment. Editable composition now forwards `frame` to its portrait, as the
success-badge composition already did. The registered Avatar edit action retains
its existing geometry, focus and callback ownership.

Consumer audit: Hub Details and Member Profile already request framed avatars
through the shared chrome-tone Hub summary. Authorize payment now requests it for
Neha's 80px portrait. Welcome to the Hub requests it for its three round family
portraits. These screens supply only Avatar inputs and parent layout; no avatar
root or internal styling is added to screen CSS. Avatars on light lists remain
unframed; their existing stacked-group separation is unchanged.

Canonical Avatar specimens include framed portrait, Hub, initials, editable,
success-badge and round portrait examples on the actual shared Chrome backdrop.
Avatar still has no internal padding, gap or margin. All fixed-size variants retain
their size and radius, with the border contained inside the selected bounds.
Editable and success-badge wrappers still own only their existing child placement;
parents own all external spacing. Registry configuration selectors correspond to
these renderer-backed examples.

Catalog and JavaScript syntax validation passed, as did eight existing action and
Welcome tests. Node renderer checks passed for all eight named sizes, failed-image
fallbacks, editable/badge frame propagation, chrome summaries and unframed defaults.
No browser testing or inspector audit was performed; visual review remains with
the user, including border subtlety and gallery presentation.

Border refinement (11 October 2026): increased the shared frame width from 1px
to 1.5px at user request. All existing framed consumers and canonical specimens
inherit this token change. The border remains inside the fixed avatar bounds;
component spacing, parent layout and edit/badge placement are unchanged. Source
and catalog checks passed; manual visual review remains with the user.

Authorization portrait sizing (11 October 2026): increased the payment screen's
portrait from 64px to 80px by selecting the existing `size='contact-medium'`
Avatar input with `frame=true`. Shared component geometry and border own the
treatment; the screen continues to own only placement and gaps. No component
internals are overridden. JavaScript syntax and whitespace checks passed;
visual review remains with the user.

Further border refinement (11 October 2026): increased the shared frame from
1.5px to 2px at user request. Existing framed Avatar consumers and canonical
specimens inherit the change without page overrides. Border-box dimensions and
all spacing remain unchanged. Catalog and whitespace checks passed; visual
review remains with the user.

Border weight adjustment (11 October 2026): increased the shared Avatar frame
from 2px to 3px at user request, retaining the translucent white color. Existing
framed consumers and canonical specimens inherit the token change. Outer sizing,
spacing and interaction ownership remain unchanged. Catalog and whitespace
checks passed; visual review remains with the user.
