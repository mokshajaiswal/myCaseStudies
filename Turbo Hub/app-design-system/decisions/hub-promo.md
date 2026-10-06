# Turbo Hub introduction

User-requested typography: Introducing appears as a small, light 12px label above the 22px semibold Turbo Hub title. Supporting copy is A new way to share money with family. The original 3D family-wallet illustration and approved glossy blue-violet surface remain. This explicit requested introduction label takes precedence over the design skill's general eyebrow guidance.

The shimmer is removed, including its observer, pseudo-element, keyframes and token. Attention comes from the wallet artwork and the clearer proposition. No hover effects, arrows or nested CTA. One native anchor owns navigation, tap feedback and keyboard focus.

Source spacing audit: 20px card inset, 12px copy/art gap, 4px Introducing/title gap and 8px title/description gap. Minimum height 144px with 104px artwork; long copy expands height. Small viewport uses 16px inset, 8px gap and 88px artwork. Intro and description are optional and represented in real renderer-backed specimens. Parent spacing is unchanged, and no page overrides shared component internals. Syntax/catalog checks are separate from visual approval. Browser, touch and visual review remain with the user.

Typography refinement: Introducing now explicitly uses light weight 300 at 12px; the description uses regular weight 400 at 13px. Title leading is tightened through --font-leading-tight and title/description spacing decreases from 8px to 4px. The two secondary lines now have independent typography treatments. Other spacing, artwork and interactions remain unchanged.

## User-requested version 2

Version 1 is preserved through the registered v1 variant. Version 2 uses a pale lavender surface, left-side wallet artwork and dark text. A 1px lavender border carries a soft travelling reflection on a six-second cycle. Layered backgrounds confine the highlight to the border; there is no content shimmer, hover dependency or geometry movement. Reduced motion disables animation. The font remains the locally bundled Inter, with unchanged typography weights and gaps. v2 owns its border and pressed treatment; screen code only supplies variant. Canonical specimens show both versions through the same renderer and additional v2 content configurations. Prototype defaults to v2; ?version=1 displays v1 and ?version=2 explicitly displays v2. Browser, animation and touch review remain with the user.

Version 2 color alignment: surface now aliases --wallet-action-surface, exactly the same pale blue as the linked-bank strip. Its gradient border reuses reference-border blue, progress-track blue and white rather than purple literals. All text explicitly consumes the shared --font-body Inter family; Introducing uses the standard caption regular weight in v2, with darker list-detail ink for supporting text. Version 1 remains unchanged. Source ownership and manual review limits remain as above.

Version 2 gradient/border refinement: the previous uniform pale-blue fill becomes a visible white-to-light-blue gradient (#fff through #f4faff to #dfefff). The border increases from 1px to 2px, with stronger blue shoulders around a narrow white travelling highlight, retaining the six-second cycle and reduced-motion fallback. Text uses neutral black/gray roles: title #202020 at medium weight 500, Introducing #6c6c6c at light weight 300, description #444 at light weight 300. All remain locally bundled Inter. These component-owned semantic roles preserve v1 and unrelated typography. Actual browser gradient, shine and spacing review remains with the user.

Three-tone trial: version 2 background now blends white (#fff), pale blue (#e6f0ff at 48%) and soft mint (#def5ed) at 125 degrees. This adds a distinct third hue while preserving the light surface and blue border. Text geometry stays unchanged: Introducing uses 12px/16.8px leading, title 22px/26.4px leading, description 13px/18.2px leading, with 4px margins for both adjacent text relationships. Equal small margins group the copy into one proposition; size and weight carry the hierarchy. Visible glyph separation includes line-box metrics. Source/catalog checks do not replace user visual review.

Border shimmer duration increased from 6 to 8 seconds per cycle at user request. The highlight path, spacing and reduced-motion behavior remain unchanged.

Third-tone correction: mint is replaced by deeper blue #b5d0f2. The gradient now stays entirely in white and blue, retaining dark neutral text and the 8-second border shimmer.

Shimmer frequency correction: cycle shortened from 8 seconds to 4 seconds so the border shine appears more frequently, as clarified by the user. Reduced-motion handling remains unchanged.

Two-tone trial: replaces the three-color fill with near-white #fafdff and cool blue #c7ddf7 at 145 degrees, keeping the light end through 10% for a clearer diagonal transition. Both text margins remain 4px; the 4-second border cycle remains unchanged.

Shimmer cycle set to 2.5 seconds at user request. Two-tone fill, text spacing and reduced-motion behavior are unchanged.

Hierarchy spacing applied: Introducing/title gap is now 8px; title/description gap remains 4px. The smaller light Introducing label is separated from the closely grouped product name and explanation. Existing 22px medium title, 12px light intro and 13px light description remain unchanged in v2. Both shared variants and canonical specimens consume the same spacing rule.

User spacing trial: Introducing/title is now 6px and title/description 2px, through explicit component spacing tokens. Typography, two-tone background and 2.5-second border shimmer remain unchanged.

Latest spacing adjustment: Introducing/title is 4px; title/description stays 2px. No copy, typography or animation changes.

Version 2 heading weight increased from medium (500) to semibold (600) at user request. Secondary text weights and 4px/2px text gaps remain unchanged.

Graceful shimmer motion: removes endpoint holds and the discontinuous 100%-to-0% restart. Background position now eases from 0% to 100% and back to 0% in the existing 2.5-second cycle, using cubic-bezier(.45,0,.55,1) for gentle acceleration and deceleration at each turn. Border-only paint, stationary content and reduced-motion fallback remain unchanged. Browser motion review remains with the user.

Turbo Hub v2 title now aliases --type-item-title-weight, the exact shared weight used by the Linked Cards heading. Both currently resolve to semibold 600, so this unifies ownership without a visual weight change.

Shimmer removed at user request: animation declaration, motion media query and keyframes are deleted. Version 2 retains its static 2px gradient border at normal background size, two-tone surface, wallet asset and shared Linked Cards heading weight. No other interaction or typography changes.

Moving-element request: v2 wallet now floats upward 3px and returns on a smooth 4.8-second cycle. The approved static border, gradient fill and text remain still. Motion uses a transform without changing layout and requires no hover. Reduced motion leaves the asset stationary. Version 1 is unchanged. Browser motion review remains with the user.

Latest motion refinement: wallet float increases from 3px to 6px while retaining its smooth 4.8-second cycle. Border shimmer is restored at the requested 2.5-second duration with a continuous out-and-back path and no abrupt restart. Surface and text remain stationary. Both animations remain disabled under reduced motion.

Perimeter shimmer: replaces the horizontal return sweep with one continuous 360-degree conic highlight around the 2px border, retaining the final requested 2.5-second duration. A registered angle property interpolates smoothly at constant speed; matching colors at 0/360 degrees eliminate the reset seam. A longer soft blue trail leads into a white crest, producing a travelling reflection rather than a whole-border flash. Gradient is declared on the component so it resolves the animated angle there instead of inheriting a root-resolved value. Surface/text remain still, wallet float stays 6px, and reduced motion disables both animations. Browser motion review remains with the user.

Constant-speed border correction: conic rotation produced unequal apparent speed on a rectangular perimeter. It is replaced by a decorative rounded SVG outline aligned to the actual border box and corner radius. Three overlapping dash trails provide a soft blue tail and white crest; all move linearly through a normalized pathLength of 1000 over 2.5 seconds. Arc-length travel maintains constant distance per second through corners. ResizeObserver updates geometry without remounting animation. The static gradient border remains underneath; reduced motion hides moving strokes and retains the static surface. Removed the registered angle property and conic recipe. Native link hit area, text and wallet motion are unchanged. Browser motion review remains with the user.

Shimmer visibility refinement: the measured SVG now receives explicit intrinsic and CSS dimensions and sits above the card surface. Trail uses stronger blue #318fdf with longer 3px strokes and a wider white crest, retaining constant-speed 2.5-second travel. Strokes are visible by default; reduced motion leaves a static highlight rather than removing all sheen. Layout, border base and text remain unchanged. Browser visual review remains with the user.

User rejected the travelling outline: removed the SVG, resize observer, dash trails and their styles. Border now uses a soft broad reflection passing through a stationary-looking gradient rim via background position over 2.5 seconds. Equal base colors at both ends keep the cycle restart quiet. No rotating angle or travelling border segment. Wallet float, two-tone fill and text hierarchy remain unchanged; reduced motion disables movement.
