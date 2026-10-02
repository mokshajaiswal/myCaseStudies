# Turbo Hub design brief

Build interactive mobile prototypes from the existing screens linked in flow-reference/. Leave undefined screens and behavior for later. Start with reusable controls grounded in these references.

Use inexpensive, replaceable Phosphor icons through TurboIcons. Keep illustrations generic; placeholders or existing generic assets are sufficient. No accuracy-heavy image work or new image generation is required for this foundation. Preserve the case-study and reference page.

Reuse registered components unchanged wherever they fit. Register missing reusable controls with real specimens and contracts as each defined screen is built.

Prototype presentation: use available controls with no-op callbacks for unfinished actions so screens look live. Preserve genuine disabled/unavailable variants with their faded styling in the DS; do not redefine them to serve prototype appearance.

Inter is the default product font. Use the locally bundled variable font (100–900) through --th-font; do not use Hellix/Helix on new screens.

Typography: primitives define font family, size scale and weights; semantic roles (--font-body, --font-heading, --font-label, --weight-body, --weight-heading, --weight-action) reference them. --th-font and --th-type-* remain compatibility aliases. Use these shared roles instead of introducing literal families or weights.

Foundations typography recipes must include primitive references in family/size/weight/leading and semanticTokens mapping each property to its role. This makes resolved specifications visible below each sample. Use the matching roles in actual screen/component CSS. Compact action label is the 13px button recipe; it is not the default 16px action size.

Use the measured typography roles in decisions/typography.md. Page heading, identity heading, section heading, field label/value, item title, caption, spending amount and actions have independent --type-<role>-size/weight/leading roles. Source values are in Turbo Hub Prototype_v1; keep Inter even where source frames mix families.
