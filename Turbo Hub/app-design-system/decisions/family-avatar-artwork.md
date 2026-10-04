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
