# Case study card variants

The user requested the existing card as Variant 1 and the supplied IG card data as Variant 2. The previous PayZapp card was page-owned, with no catalog registration. Extracted its renderer, internal CSS and existing flower/arrow motion to the app-owned component. The case-study ending now calls that same renderer with Variant 1. Variant 2 lives in the canonical component specimen; it is not added to the Turbo Hub case-study ending without a request to do so.

Variant 2 supplies “Rebuilding IG’s Global Design”, the user’s seven-market / 150+ component / 60% / 500+ page description and IG / B2C · SaaS · FINTECH metadata. It uses a centered landscape tablet on the white visual panel. The user will provide the IG image later: the current SVG is explicitly a tablet placeholder, not an invented IG screenshot. Replace through the public image/imageAlt inputs or its default asset. No IG destination was provided, so this specimen is an article; Variant 1 remains a real link.

## Ownership and source audit

No suitable registered editorial case-study card existed. The renderer owns the root link/article, image, device frame, copy and metadata. These are not independently interactive children. Caller owns data and destination. Native links provide keyboard activation and focus semantics; a missing href does not create a fake link. Original portrait phone frame and analytics image are reused. Closing flowers, page separator and outer composition stay page-owned; their stylesheet no longer styles the card’s internals.

Both variants retain the original 24px inset/gap (--space-6), title gap (--space-3) and 32px footer inset (--space-8). At <=48rem root inset becomes --space-3 and gap --space-4; title/description sizes preserve the earlier responsive values. Variant 2 image inset is --space-5. Copy uses min-width:0 and wraps; footer metadata can wrap, while arrow geometry remains fixed. The card owns width up to 720px. Variant 2 stacks at <=30rem. Device geometry belongs to the card, not specimen CSS. Canonical specimen wrappers only own captions, widths and outer comparison gaps.

Gallery and detail previews use the same two renderer instances, with unique IDs and explicit previewConfigurations. data-inspector-variant identifies each variant. Hover and focus-visible remain direct states, not extra variants. Reduced-motion rules preserve a static reveal and disable device/flower/arrow motion. The image is lazy loaded with descriptive alt text; decorative device frame/arrows are hidden from accessibility.

Verification: syntax and catalog validation pass; all 49 existing source tests pass. A source-level renderer check confirms variant labels/copy, native link/article semantics and static/studio image URL resolution. HTTP requests confirm the canonical specimen, editorial stylesheet and tablet placeholder return 200. No browser was opened; browser rendering, interaction, long-copy resizing and inspector measurement remain for user manual review under AGENTS.md.

## IG asset supplied

Replaced the temporary tablet SVG with the user’s assets/competitive_research/1/ig_image.png. The shared renderer wraps the unchanged screenshot in a landscape tablet frame, keeping device geometry owned by the component. Removed the unused placeholder asset. Alt text now describes the actual homepage. Source syntax and catalog validation pass; browser review remains manual.

## IG card adopted in the case study

At the user’s request, the Turbo Hub ending now consumes Variant 2 with the supplied IG image and copy. Variant 1 remains available in the shared component and canonical specimen. No IG destination has been supplied, so the ending card uses the supported non-link article configuration instead of linking back to Turbo Hub. No page-owned internal overrides were introduced. Syntax and diff checks pass; visual review remains manual.

## Flower hover assets

The user supplied casestudy_hover_flower with blue, purple, pink and orange SVGs, all retaining the original 1039 × 1018 geometry. The shared renderer now accepts hoverFlower with those four allowed values. Blue remains the default, matching the previously used artwork. Both card layout variants support every colour without page CSS overrides. Existing reveal timing, arrow animation, white text transition and reduced-motion treatment remain shared. The canonical specimen includes all four flower configurations using the actual renderer. Asset paths support studio and ordinary static mounts. No random cycling or persistent colour changes were introduced. Source and catalog checks pass; browser review remains manual.

## Hover video

The user asked for the Turbo Hub card to play a short video of the case study's mocks on hover, with the mocks floating in and out of the white visual panel. The renderer now accepts `video` (URL, or `false` for the still mockup). Variant 1 defaults to `assets/case-cards/turbo-hub-card.mp4`; Variant 2 has no default video, so the IG card in the Turbo Hub ending is unchanged.

The video is a 632 × 672, 30 fps, 12-second muted H.264 loop (1.7 MB), exactly 2× the 316 × 336 panel inside its 4px border. It is rendered from the editable Remotion project in `videos/turbo-hub-card/` using the existing Figma reference exports and the card's own phone frame. Frame 0 and the final frame reproduce the card's hovered still: the 176px phone with the analytics screen, 22px from the panel top, using the kit's phone aspect, screen insets, radius and `--phone-shadow`. Between them three groups move through the story: the family hub (analytics, spends, members), create and invite (hub intro, hub created, invitation), and paying independently (scan, review, receipt). A faint lavender wash appears only while mocks move.

Behaviour: the card owns the video as a noninteractive part of the visual panel. Mouse/pen hover or keyboard focus-visible calls `play()`. The video fades in (240ms) only after its `playing` event, so a slow first load keeps the still mockup rather than a blank panel. Leaving fades it out, then pauses and rewinds after 320ms; re-entering during the fade resumes without a flash. Touch never starts playback. `prefers-reduced-motion` keeps the still mockup and hides the video. The video is muted, inline, unfocusable, has picture-in-picture disabled and is hidden from assistive technology; the image alt text still describes the card. `preload="metadata"` keeps initial page weight low. At ≤48rem the panel is narrower, and `object-fit: cover` with a top-centre position crops the sides of the composition.

Verification: renderer syntax check, studio catalog check (no errors) and all 9 existing source tests pass. ffprobe confirms codec, size, frame count and duration. The first and last frames are identical by construction (every track ends on its frame-0 pose). No browser was opened, and no frames were viewed: playback smoothness, the still-to-video crossfade, crop at narrow widths and overall composition still need the user's manual review under AGENTS.md.

## Hover video, story revision

The user found the first video unclear: screens floated in and out, but a viewer learned nothing about the case study. They asked for more interactions. The video was rebuilt as a 23-second (690-frame, 2.6 MB) captioned story with the same dimensions and card integration. Four numbered captions follow the case study's own narrative in flow-story-data.js: Arun sets up a family Hub, invites Kavya to co-manage, Neha asks to pay and Arun approves, then both parents see where money goes. The interactions use the case study's playback language from FLOW-PLAYBACK-PLAYBOOK.md and flow-story.css: the translucent accent touch dot with halo, the soft 450ms-style ripple, the 100% → 97% → 100% button press, a short typed value and push transitions between screens. Camera zooms make the typed name, Manager toggle, Kavya's member card and the payment readable inside the small panel. A two-phone beat sends Neha's request from her phone to Arun's lock screen before both green confirmation screens.

Interactions are overlays on the existing Figma exports (typed text, radio fill, toggle off → on, swipe knob, dropping notification, tab underline), positioned in the exports' 1x pixels with sampled colours. No product screens or components changed. `payment-authorize` has no Figma export, so Arun goes from the notification directly to authorization-confirmed. The default video URL carries `?v=interactions-1` so cached copies refresh.

Verification: the render succeeded; ffprobe shows 632 × 672, 690 frames, 23s. A pixel comparison of frames 0 and 689 found no differences. Renderer syntax and registry JSON checks pass. No browser was opened and no frames were viewed: pacing, caption legibility at card size, overlay alignment on the mocks and overall feel need the user's manual review under AGENTS.md.

## Hover video, reveal revision

The user found the story version too long and visually weak. They asked for a short, polished reveal in which the mock's parts arrive one after another. It now runs 7 seconds (210 frames) on the analytics mock alone, with no captions. After a quick bottom-first reset, six full-width bands of the mock rise back in with a spring, a blur-to-sharp settle and a slight scale: header, Hub identity, monthly limit card, tabs, the chart (swept left to right) and Top Spenders. The phone tips back in 3D and settles flat as the mock completes, while the limit card, Insights chip, chart tooltip and Top Spenders card lift forward in turn and settle back. Frames 0 and 209 are pixel-identical. Unused screens and the caption font were removed from the video project. The cache tag is `?v=reveal-1`. Visual review remains with the user.

## Matched to the portfolio card

The user asked for the case-study ending cards to match the cards on their portfolio (moksha-garden, `src/components/CaseStudyCard.astro` and `src/content/projects.ts`). The shared renderer and stylesheet now follow that card:

- Type: Larken Bold 24/28 title (20/24 on phones), Hellix 16/24 body at -0.03em (15 on phones), and the BRAND · CATEGORIES line in DM Mono Medium 12/16 small capitals at 0.12em, the brand in full ink. DM Mono loads from Google Fonts, as on the portfolio. Card colours are fixed (#34383F ink, #536076 soft ink), not the page theme, and so is the phone shadow.
- Phones (≤47.99rem): one column, the screen on top in a 4:3 frame with 24px insets, then the words; a press scales the card to 98%. The reveal now runs only on a fine-pointer hover or keyboard focus.
- New `device` option: `panel` (one still filling the visual panel, the hover video's first frame, no lift), `phone`, `tablet` and `none`. Variant 1 defaults to the portfolio's PayZapp card: panel, `assets/case-cards/payzapp-hover-still.webp` and `payzapp-hover.mp4`, copied from the portfolio. Variant 2 defaults to the portfolio's IG card with `assets/case-cards/ig-home.webp` and its copy (200+ components).
- Hover video as on the portfolio: cuts in from the first frame, resumes with a fade if re-entered within 30s, fades back to the still on leave. On mouse devices it preloads as the card comes within 800px of the viewport.
- Hyphenated compounds stay on one line; external http(s) links open in a new tab.

Endings: IG → Turbo Hub uses the variant-1 defaults with the purple flower; Turbo Hub → IG uses the variant-2 defaults with orange; Balance Explorer → Traces uses `device: "phone"` with the portfolio's title and description and the pink flower. The earlier `turbo-hub-card.mp4` is kept on disk but no longer the default. Syntax and registry JSON checks pass; no browser was opened, so visual review is the user's.
