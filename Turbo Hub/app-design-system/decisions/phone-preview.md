# Phone chrome and preview geometry

The phone-screen explicitly restores --color-text at the product boundary. The preview toolbar's light text color must not inherit into product labels and controls. This corrects pale labels on Create a Hub and other screens using inherited text color. Browser review remains with the user.

Standalone full-page previews enable the shared inspector's keyboardActivation option.
S opens spacing, C opens components, and Escape dismisses inspection and restores page
interaction. Inspection starts hidden on plain URLs. The adapter checks top === self
so overview iframe thumbnails do not opt in. Existing ds=true URLs remain supported.
Verified on Request Pending without a query flag: both modes open, Escape hides the
inspector, and S reopens it without changing the URL. Shared preview imports cover
Hub Dashboard, Add Member, Payment Review and Request Pending.

Use the existing assets/phone case clean.png (1006 × 2050) as a decorative foreground shell. Screen framing is page-owned preview geometry, not a product component. The logical screen is always 390 × 844; a ResizeObserver scales the whole screen uniformly to the shell aperture. Browser size changes scale the preview instead of reflowing the product. Spends, Members, Analytics and expanded transactions use the same viewport.

Status and navigation stay fixed; the content region scrolls internally and supports keyboard scrolling. Tabs stick to the content region’s top when the overview scrolls away. The 24px bottom safe area holds a decorative home indicator. The old PayZapp footer is removed. Preview framing fits available width and height with 16px horizontal / 24px vertical outer clearance.

Phone status bar is registered as turbo-statusbar and rendered by TurboUI.statusbar(). It owns 56px height, 8px top inset, 24px side insets and 76px side slots around the camera clearance. Three indicators share one centerline with 6px gaps: signal 18 × 16, Wi-Fi 17 × 13 and battery 25 × 14. Signal/Wi-Fi use regular Phosphor core 2.1.1 SVG geometry; battery uses fill geometry. Cropped viewBoxes remove unequal internal whitespace. Semantic icon names remain centrally replaceable. Time defaults to 9:41; the status bar is decorative mock chrome, not live device data. There are no interactive children or state transitions.

Shared icon wrappers now use inline-flex and block SVGs, removing inline baseline space. Navigation uses equal 44px action columns, a centered title, 12px gaps and 8px/16px/16px padding. Actual navigation buttons measure 44 × 44 and their 20 × 20 SVG centers match both axes. The status specimen uses the same renderer; the shell is excluded from that component’s contract.

Verification: fixed dimensions, image loading, tab changes, transaction expansion, internal scroll bounds, icon centers and responsive scaling are checked in the rendered browser. Icon Action, Avatar, Row, Limit and Member retain their original geometry apart from baseline correction. Remaining undefined product routes stay disabled.

The mechanical design scan flags the pre-existing 3px selected-tab underline as a rounded-card border accent. It is an intentional selection indicator on a flat tab control, not a card border; no visual change is needed.

The screen and viewport backing use the header blue to prevent light subpixel seams where separately painted status/navigation regions meet during preview scaling.

Preview canvas and backing now use dark gray #202124, per user preference.

Final surface ownership: only the outer preview body is dark gray. The viewport, screen content and home safe area retain the product canvas color. Status/navigation (and Add Member heading) share one blue phone-chrome backing with transparent child backgrounds to avoid scaled paint seams.

Shell viewport clipping radius reduced from 15.5% / 7.2% to 13% / 6% so the rendered screen extends under the phone-frame corners. The separate 24px product content-surface radius is unchanged.

Source comparison: shared phone-preview.js places the matching original image to the right of every prototype, including studio embeds and full-page previews. Screen state sets data-reference; shared preview tooling owns the source mapping, cropping and image link. Hub tabs, member setup steps and payment request feedback update the reference. Long originals scroll independently; below 760px the reference stacks after the phone. These controls are preview tooling, not product components. Existing 390 × 844 product geometry remains unchanged. Verified desktop comparison, composite crop, tab switching, payment pending mapping and narrow stacked layout.

The toolbar above the prototype phone includes Copy reference for LLM prompts, per the user’s placement preference. At the user's request, copied text identifies only the prototype screen, current state, page URL (including query parameters), and HTML/CSS/JS source paths. The user supplies their requested changes separately. The reference is read at activation so tab/step changes use the current state. Native clipboard copying falls back to a selected textarea; an accessible status reports success or failure. This action belongs to preview tooling outside the product screen. The toolbar reserves 44px above the phone; preview scaling fits the remaining height. Verified the moved action and copy feedback on Accounts & Cards. Verified actual clipboard text on Accounts & Cards and after switching Hub Details from Spends to Members; verified the button remains visible in the stacked 390px layout. Clipboard failure fallback was reviewed in source but not forced in the browser.

Default typography is now locally bundled Inter Variable, weights 100–900. --th-font points to Inter; existing 400/600/700 assignments remain. Case-study/reference and onboarding defaults also use Inter.

Family story embed exception (3 October 2026): `embed=story` keeps only the existing phone presentation and exits before comparison panels, reference-copy tools and external flow navigation are created. Standalone previews retain those tools. The explicit scene context isolates fictional drafts and freezes locked timed states; see [family-flow-story.md](family-flow-story.md). Browser review for this addition remains manual with the user.

## Home indicator fade (4 October 2026)

Where a scrolling `.phone-content` sits directly above the home indicator, the indicator now
overlays the bottom 40px instead of reserving a solid strip: content runs underneath, a
gradient of the screen's own surface plus a masked 3px blur fades it out, and the pill stays
on top. A 24px spacer at the end of the scroll region keeps the last content reachable above
the fade. Screens that end in a fixed footer keep the in-flow strip, so footer buttons are
never washed out. Screens now set `--home-surface` instead of `background` on
`.home-indicator` (16 screen overrides converted), so both modes use the right colour.
Applies to Hub Details (Spends/Members/Analytics), Tag added, Accounts & Cards, Delivery
details, Geofence, Spending limit, Pixel Tag, Tag scanner, payment outcome and new-user entry.
Visual review pending with the user.
