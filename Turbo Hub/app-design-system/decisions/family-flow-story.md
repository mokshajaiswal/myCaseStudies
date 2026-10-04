# Family story in the case study

The existing `#flows` section in the app’s base case-study page now contains five chapters, 31 narrative sections and 34 screen fixtures. The unused placeholder journey renderer/data were removed. Existing research, historical personas and case-study material remain unchanged. Arun, Kavya, Neha (19) and Rohan (22) are an explicitly fictional narrative cast.

`flow-story-data.js` defines scene identity, actor, copy, route/state, artwork placement, proposed/alternative designation and `interactive:false`. It covers all 30 registered screen routes, the existing Analytics view, a second Add Member example for Rohan, and all three existing onboarding slides. Invitation, proposed editors and recovery screens keep their prototype designation. Declined/expired and new-user paths are alternatives; Pixel Tag is an optional chapter. The sequence distinguishes Hub creation, member invitation, limit setting, authorization and payment completion.

## Ownership and reuse audit

`flow-story.js` and `flow-story.css` own editorial layout, captions, lazy iframe mounting and character placement. They use the case study’s existing Helix text recipes and spacing primitives. Internal story headings, including the introduction and chapters, use Helix at the existing heading size with the existing 600 card-heading weight; scene/cast/design-note headings retain the Helix small-heading recipe. The outer case-study section title retains its existing Larken role. Decorative top labels (intro eyebrow, chapter/scene numbering and design-decision eyebrow) have been removed. Alternative/optional distinctions remain in the descriptive figure captions, and proposed behavior stays explicitly labeled at the readable small-body size. Chapter links also use small-body sizing. They do not render product control copies or override registered component internals. Generic page arrangement and preview tooling remain app-owned, with no component registration added. Each character/vignette and phone preview now owns a figure with its caption directly below it, replacing the single caption centered beneath the entire paired composition. Character captions identify the actor and role; phone captions retain the scene, actor view, preview state and alternative/optional designation. Product components remain untouched.

Embedded phones consume the existing prototype HTML, shared component renderers, tokens, icons and phone shell. The logical product viewport stays 390 × 844. Following the user’s layout correction, the story stays within the existing centered content column. Each scene places its short narrative first and the related phone/character pair below it. Phones display at 300px width (about 611px tall), scaling the entire product UI proportionally; character cutouts use 240px width alongside their lower edge. Only the character’s side alternates. Neither artwork nor ambient backdrop extends beyond the content column. Below 640px, the character stacks beneath the phone at 220px width. Scene copy now focuses on one concise story beat; the shared note holds prototype limitations rather than repeating them in every scene. Onboarding predates the common phone wrapper: embed mode wraps its unchanged existing UI in that same shell at 390 × 844; standalone onboarding retains its presentation.

The shared preview adapter fits phone geometry, then exits before building comparisons and preview navigation in story mode. Inspector activation is suppressed through its existing preview exclusion contract. Chrome motion is paused through its existing inherited motion controls, without changing component geometry or color treatment.

### First-scene environment experiment

Only `accounts-cards` currently uses `placement:'home-scene'`. The `arun-home-v3.png` composition places a compact Arun-and-household vignette in the left column and the live phone independently in the right column. The chair and one small nearby plant cluster around Arun; no wide floor or detached right-side plant extends into the phone area. The top paragraph states Arun’s family-spending need. The large first-person speech bubble has been removed from this scene. A compact speech-shaped character caption directly above Arun reads “Arun, the father/hub manager.” It belongs to the artwork figure and fades/scales with Arun during horizontal scrolling. The design-decision box remains in the narrative area above the carousel, spanning the available content column. The rationale connects his discovery to the Accounts & Cards entry-point decision in `flow-reference/flow-data.js`: place the shared space alongside accounts he already manages. The box stacks its Helix heading and short explanation, without a blue side rule or mini eyebrow. The character caption and remaining design-decision box use existing page surface, border, type, radius and spacing tokens; the caption keeps the illustration’s intrinsic proportions and leaves room above the character on narrow layouts. These are page-owned editorial content, not registered product components or chat functionality; only the first scene uses this experiment.

The composition retains its 64px column gap and phone width of up to 300px. The vignette is an in-flow left-column image of up to 360px width, aligned along the bottom of the phone presentation rather than covering the entire stage. The entire illustration, including Arun, now has uniform 60% opacity (increased from 35% after manual review); the circular mask has been removed at the user’s request. The illustration uses its actual 1024 × 1536 intrinsic geometry with fluid width, automatic height and contain fitting; it is never sized independently on both axes or stretched to the stage height. The live phone retains its own fixed aspect ratio and full opacity. No separate character cutout is added to this scene. The other 30 narrative sections retain their preceding layout while the user reviews this experiment. Product components and standalone prototypes are unaffected.

### Entry and onboarding sequence

The carousel now uses native wheel/touch scrolling and direct mouse dragging. The custom inertia target, 140ms idle recentering timer, projected drag-release centering and restricted rail limit were removed because they kept pulling readers away from the opening illustration. Decorative phone offsets sample actual movement only and never write the rail position. Arbitrary scroll positions remain stable. Previous/Next and arrow keys explicitly navigate centered screen groups; Previous from the first centered group returns to scrollLeft=0, restores Arun and stops there. Next from the opening can center the first group even when all four phones fit. Button disabled states use actual scroll position instead of treating group zero as the beginning. Phone offsets remain bounded, vanish at rest and are disabled by reduced motion. All eleven source tests pass, including freely chosen positions, returning to Arun and both one/multiple-screen capacities. The latest browser reload again timed out through the existing connection, so live visual verification remains pending.

The carousel vignette is now slightly larger following the user's correction: up to 400px (44% of the viewport) on desktop and 240px in the narrow stacked layout. Its intrinsic aspect ratio, uniform opacity and gap-based fade remain unchanged; phone sizing and scroll behavior are preserved. This size adjustment is limited to the first-scene carousel's page-owned artwork.

The first narrative section now combines the Accounts & Cards entry point and all three existing onboarding slides in one four-screen horizontal sequence. `sequence` items define stable fixture IDs, captions, routes and accessible narrative summaries; the flattened `scenes` list remains the embed-context lookup and validation source. The former separate onboarding section is removed. Hub type, naming/source account and creation still follow this sequence in their existing order.

The compact vignette starts on the left and the first 300px proportional phone starts on the right. At the user’s explicit request, this carousel alone now extends to the full viewport width; surrounding narrative, controls and design-note content remain in the centered column. The keyboard-focusable horizontal rail stays bounded within that full-width presentation. As it scrolls, the vignette uniformly fades, blurs up to 6px and scales down to 82%; phone content passes over that space. Fade timing now uses the actual gap between the illustration’s right edge and the first phone’s starting edge, completing 16px before collision so Arun does not remain visible underneath the incoming phone. Reversing scroll restores the character. No automatic scrolling or screen transitions occur. Previous/Next controls, arrow keys, free horizontal touch/trackpad scrolling, click-and-drag mouse scrolling and a visible position counter are available. Vertical scrolling belongs to the page everywhere, including while the pointer is over a phone; the earlier vertical-to-horizontal conversion was removed following the user’s correction. Concurrent horizontal-glide changes are preserved: the current handler only acts on dominant horizontal intent, while vertical and predominantly vertical diagonal gestures are not prevented. Ctrl-wheel zoom remains native. Locked previews have a transparent, aria-hidden gesture surface above their iframe so wheel, drag and touch gestures reach the parent rail rather than a nested document. Interactive fixtures omit that surface. HTTP source hashes verified the running attachment serves the current code. Dragging also applies instant offsets and suppresses text/image dragging; button navigation alone remains smooth. Explicit auto scroll behavior, no snapping and no scroll anchoring protect free movement. Case-study stylesheet/script URLs were versioned to avoid stale cached gesture code. Ctrl-wheel retains browser zoom. Mouse dragging uses pointer capture; touch retains native scrolling. No snapping constrains free movement. With reduced motion, blur and scale are disabled while opacity still makes space for the previews. Narrow layouts place the vignette above the rail and preserve proportional previews.

Only onboarding embed initialization changes in product code: it reads its declared fixture route to select slide 0, 1 or 2. Standalone onboarding still starts at zero; no rendered component or screen styling changes. Each locked iframe has a distinct scene identity and isolated fixture storage. Per-screen captions, narrative equivalents and the actor caption remain accessible but are now visually hidden in this carousel at the user’s request. Both rail edges now use broad responsive overlays (96–200px desktop) with three progressively masked blur layers (2px, 6px and 14px) and a soft page-color fade, replacing the narrow uniform-blur treatment. Mobile edge regions use the existing 48px spacing value. Native snapping is removed and the initial rail position is explicitly zero so the leading character area stays visible before user scrolling; only user scrolling drives its fade/blur/scale. The illustration and speech-bubble/design-note pair remain page-owned. Browser scrolling, snapping, responsive composition and keyboard review remain with the user.

## Embed state contract

Prototype URLs use `embed=story&scene=<stable-id>&interactive=false`. `story-context.js` loads before deferred product code. Each iframe receives a fresh in-memory fictional draft store, so no manual-testing sessionStorage is accessed. Standalone previews delegate to their original sessionStorage behavior. Seeded member, source-account, limit and address values are deterministic; invitation greeting and Add Member role vary with the declared scene.

Locked frames are inert, excluded from keyboard traversal, pointer-blocked and hidden from assistive technology in favor of adjacent narrative equivalents. The child phone is also inert and suppresses keyboard input. No unlock control is provided. Later curated interaction requires changing the scene’s `interactive` configuration; a query parameter alone cannot unlock a locked scene. Internal prototype navigation retains the story context and isolation, while external preview links are blocked in embed mode.

Request Pending does not start its interval, visibility tick or BFCache resume tick while locked. Processing is already a stable prototype state. Locked nearby frames lazy-mount through IntersectionObserver; offscreen frames are released and recreate the same fixtures when revisited. Interactive scenes, if configured later, retain mounted state. Captions identify each actor and screen; narrative copy provides an accessible explanation independently of the decorative locked UI.

## Artwork

Six assets and their exact prompt record live in `assets/flow-story/`. Built-in ImageGen generated the family reference first, then four transparent character cutouts and a second father pose using that reference. The user’s style reference superseded the first more realistic attempts: sparse editorial ink outlines, simple faces, selective saturated blue/violet clothing, pale household surroundings and generous whitespace. No generated product UI, logos or text appear inside the artwork. PNG alpha channels were inspected; final cutouts have transparent surroundings. Earlier unused cast candidates remain outside the project. First-scene environment versions and their individual prompt records are also saved here; the active compact vignette is `arun-home-v3.png`, generated with the built-in tool using v2 as its identity/style reference. Its transparent alpha and dimensions were inspected.

## Validation

JavaScript syntax checks, catalog validation and `node --test "Turbo Hub/tests/flow-story.test.cjs"` passed. Unit/source checks cover registered-route coverage, fictional draft isolation, query-only unlock rejection, frozen countdown lifecycle, lazy mounting and release, interaction blocking and storage adoption. Asset dimensions/alpha and character composition were inspected. HTTP confirmed the existing studio responds at `/app/index.html`.

Following explicit user authorization on 2026-10-03, browser testing reproduced the carousel failure in the running attachment at a 671 × 767 viewport. The stage was 671px wide but its centered flex rail expanded to 1687.5px; `clientWidth` and `scrollWidth` were both 1688, leaving no horizontal overflow. The rail now has an explicit 100% width, zero minimum width and stretch alignment. Its measured client width is 671px and scroll width is 1688px, with no document-level horizontal overflow. This is page-owned preview geometry; no spacing primitives or product components changed.

Actual browser actions verified native horizontal scrolling in both directions, arbitrary 90px mouse dragging over a locked phone, vertical wheel movement inside the rail, Previous/Next, both arrow keys, character fade before collision and restoration at zero. All four screen fixtures loaded, with no browser error/warning logs. End-of-rail testing also exposed a fractional rounding issue: the real maximum `scrollLeft` was 1016.5 while the rounded CSSOM maximum was 1017. At that stage a one-pixel boundary tolerance released vertical wheel scrolling back to the page at either end; the final-position page scroll was verified from 14669.5 to 14823 without moving the rail. The vertical-axis conversion has since been removed, superseding its fractional-boundary workaround. Regression checks now exercise vertical gestures at the start, middle and fractional end, checking that carousel position is unchanged and native page scrolling is never prevented, while dragging and character motion remain supported; all nine tests pass. Screenshots are saved in `tests/artifacts/carousel-start.jpg` and `carousel-end.jpg`.

Physical touch-device testing, a wider responsive visual review and unrelated standalone prototype regression remain with the user. Review at `http://localhost:8020/app/index.html#flows`. No GitHub push or deployment is included.

The latest vertical-scroll correction passed JavaScript syntax checks and all nine source tests. Two live-browser recovery attempts timed out while binding the existing tab, so this latest change has not been browser-verified. Earlier browser results above apply to the preceding implementation. No product components, spacing primitives or illustration sizing changed in this correction.

Character-label refinement: `characterLabel` is explicit scene data for the first carousel; other actor captions remain unchanged. The visible caption is excluded from the carousel’s visually-hidden figcaption rule. The existing illustration size, phone sizing and current scroll motion are preserved. Source syntax and existing flow-story tests passed; latest visual review remains with the user.

Character-label overlap correction: the caption now participates in a vertical flex layout above the image, with the existing 12px gap (`--space-3`). Its previous percentage-based absolute positioning was removed. Text wrapping grows the figure instead of covering the image; the pointer fits inside the gap. The image retains automatic height and intrinsic proportions, and the complete artwork figure keeps its existing bottom anchor and fade behavior. The desktop stage reserves 32px above the rail so the taller figure’s caption is not clipped; stacked narrow layouts already allocate the full figure height and need no extra stage inset. Source declaration checks passed; latest visual review remains pending.

## Restructure for pacing (4 October 2026)

Chapters now follow the family's order: Hub created → Kavya joins as co-manager (invite,
payment methods, her card) → Rohan and Neha join (invites with limits, WhatsApp invite on
Neha's lock screen and chat) → Neha pays and a parent approves → both parents keep track
(Members, Spends, Analytics, Hubs). Removed sections: declined/expired outcomes and the
separate new-user path (screens stay in the prototype and registry; the story test lists
them as deliberate omissions). Sections whose screens are separate views rather than a
sequence set connected:false and render without chevrons.

Invite loops (4 October 2026): both invite sections start and end on Hub Details · Members
(Figma 402:51353). hub-dashboard accepts ?roster=owner|invited|parents|children-invited|family
to stage the list; the default (Kavya pending plus stored invites) is unchanged, and the
story seeds no children for the hub-members scene so it matches the Figma end state.

Invitation sent + snake layout (4 October 2026, browser-checked): new screen prototypes/invite-sent (shared green
success surface, registered Success indicator, "Invitation sent to <first name>", light action sheet with View members);
Add Member Send Invite now lands there. Kavya section: Members → Add Member → Payment methods → Invitation sent →
Members. Sections with 4+ screens snake through two columns (cells and chevron directions set in flow-story.js;
replaces the fixed n4 rules). Fixed a collapse where the screen row shrank to 0px width (stage and rail now full
width) — phones were invisible at narrow widths, and likely caused the earlier empty first phone. Verified at
365px (all phones 300px, stacked) and 1280px (cells 1→2↓3←4↓5).
Invitation sent restyled (browser-checked): full-blue Chrome backdrop (green success surface removed) and no light
sheet; View members uses a new registered Action variant=glass (frosted white-text; specimen "Glass (on chrome)").
Invitation sent simplified: copy is one line ("<name> will get a WhatsApp message to join The Sharma’s."), no
action; it navigates to Members after 2.4s (not in locked story embeds). Success indicator check enlarged 32→40px.

## Single-phone invitation experiment (4 October 2026)

Only `kavya-invite-flow` (Arun invites Kavya) sets `presentation:'loop'` and
`playback:'invite'`. Its five screens remain in their original sequence:
Members with Arun → Kavya's details → payment methods → invitation sent →
Members with Kavya pending. The editorial renderer overlaps the unchanged locked
phone previews in one 300px-wide slot, uses a shared right-to-left push between their screen layers, and shows a vertical list
of five explained steps to the left. All phone geometry and existing responsive
scaling are retained.

`flow-story-playback.js` is a separate, removable case-study execution layer over
the existing same-origin iframe documents. A second blue touch dot enters from
the left, moves to Add and pulses. On the details screen it chooses Wife, types
Kavya Sharma and a fictional mobile number character by character, enables Manager
role, checks acceptance and taps Next. It then checks Digital Card and UPI, taps
Send Invite, holds the invitation confirmation, returns to Members and repeats.
Each screen stays visible until its action sequence completes, instead of using
the fallback 4200ms interval. The touch dot locates actual controls through live
DOM rectangles, including responsive phone scaling; only the child content
viewport scrolls to reveal fields. No coordinates are tied to a desktop viewport.

Field changes use the existing input/change handlers; the role switch uses its
existing click handler. These changes stay in the established per-scene in-memory
story storage. Add, Next and Send Invite pulses are visual: the parent switches
between declared fixtures without invoking links, submits, history or invitations.
Each action requires an embedded, locked context with the matching scene ID.
Late-mounted frames wait until their scripts finish; reloaded documents reset
their choreography. Details and payment selections reset at the start of each loop.

The loop pauses when offscreen or the tab is hidden. Pause/Play lets the reader
hold a screen; selecting a step restarts that screen and respects the current
playing/paused choice. Reduced
motion starts paused and removes transitions. Pausing also holds typing and touch
motion; resuming preserves the outstanding action delay. Each visible step has a
short explanation and its control provides the full accessible narrative summary without live
announcements on every automatic transition. Lazy mounting, isolated scene draft
storage, inert locked frames and frozen product timers keep their existing contracts.

This is page-owned case-study presentation, not a product component or a DS
Starter change. No spacing primitives, product control implementations or standalone
prototype behavior changed. Only the scripted embed's isolated draft is modified.
Static rendering and every sequence item are preserved:
set this one beat's `presentation:'static'` (or remove `presentation`) in
`flow-story-data.js` to restore the previous five-screen snake layout. Removing
only `playback:'invite'` keeps the simpler timed single-phone loop. Other story
sections retain their preceding presentation. The component reuse audit finds no
replacement or local restyling of product controls: all existing renderers, labels,
hit areas and state treatments are reused unchanged. The touch overlay and progress
controls belong to case-study presentation.

Verification: JavaScript syntax checks and all 18 story source tests passed,
including one visible phone, ordered wraparound, offscreen/hidden pause,
manual selection, page lifecycle resume, reduced motion and static restoration.
Seven playback tests load the actual execution layer and sequence controller with
mocked DOM targets and a deterministic clock. They check character-by-character
typing, checkbox gating, payment choices, a complete loop and reset, pausing
mid-word, late/reloaded frames, scaled rectangles, child-only scrolling and context
rejection. They also assert no navigation/submit control receives a click event.
Scoped diff whitespace checks passed. Narrow-screen CSS explicitly preserves the
shared grid cell rather than inheriting the static sequence's stacking rule.
Browser playback, transitions and responsive visual review remain with the user.
Review at `http://localhost:8020/app/index.html#scene-kavya-invite-flow`.

Touch feedback refinement: the dot now has a 28% blue fill and visible outline,
plus a soft 450ms expanding ring on every tap. Add, Next and Send Invite reuse the
shared `TurboUI.pressButton` visual feedback (98% scale and return) without
activating their real actions. Playback pauses/resumes the returned animations
and cancels them when changing scenes. See `button-press-feedback.md` for the
shared Action contract, audit and validation. This preserves the reversible
playback layer and the static restoration path.

Kavya portrait: the `add-member` scene declares `avatarUser:'kavya'`. Add Member
reads that explicit embed-only identity from the existing central artwork map
and passes its URL through Avatar's supported `src` option. The portrait stays
mounted while the scripted name field is cleared and typed, rather than switching
between the generic placeholder, initials and contextual artwork. Standalone
screens and other scenes keep their existing name-based behavior. No component
styles, avatar sizing or central asset paths change. Source checks cover empty,
partial, complete and cleared names, plus other-scene/standalone isolation;
browser visual review remains with the user.

Vertical step timers: each step's small vertical track fills over its screen's
full queue duration, rather than the fallback loop interval. `onProgress` reports
elapsed/total time, playing and readiness to the editorial renderer. Linear fill
animations are cancelled and reconciled at action boundaries, pause and selection;
loading waits do not consume screen progress. Previous steps show full tracks,
future steps remain empty, and loop wrap clears them all. Current nominal durations
are 2.15s, 9.98s, 4.29s, 2.2s and 2.8s for the five invitation screens.

This replaces the horizontal progress dots only in the existing loop presentation.
Desktop keeps the explanatory list left and the unchanged phone right, within
the narrative width; at 640px and below the list stacks above the phone. The list
uses existing Helix small-body typography and spacing tokens. It is page-owned
preview navigation, with native ordered-list/button semantics and `aria-current`.
No product component, route, spacing primitive or standalone screen changes.

Verification: all 27 source tests and JavaScript syntax checks pass. Added coverage
checks ordered explanations, full-queue duration, exact paused progress, late-frame
readiness, selected-screen synchronization, animation cancellation, completed/future
fills, reset on wrap and discrete reduced-motion progress. Browser and responsive
visual review remain with the user.

Create-flow playback (4 October 2026, browser-checked): create-flow loops with touch choreography (type Hub
name, select credit account via its real handler, visual Create press, hold the new-Hub state). Playback
choreography is now keyed by flow ID; scenes without an undo path can reload their locked fixture per repeat.
The hub-setup story fixture starts empty. Checked a full loop: empty → typed → selected (Create enabled) →
step 2 → step 1 reloaded empty → typing again.


### Shared screen push

All editorial `presentation: 'loop'` sequences now share `pushScreens` in
`flow-story.js`. The incoming screen moves from +100% to zero while the outgoing
screen moves from zero to −100%, with matching 420ms easing. The existing phone
shells remain stationary; only the clipped `.phone-screen` preview layers animate.
A temporary preview-only transparency style exposes the outgoing layer during the
handoff and is removed on completion or cancellation. Product renderers and
standalone navigation are unchanged. Screen action queues and step timers start
after the handoff. Rapid step selection cancels stale animations and callbacks;
reduced motion or unavailable screen documents switches immediately. Static
presentation remains available. Syntax checks and 29 source tests pass; browser
visual review remains with the user.


### Title-only controls on the right

Loop step controls now sit to the right of the phone on desktop. Each is a simple
bordered title button with an active tint; explanatory subtext and visible vertical
progress tracks are removed. Autoplay timing and step selection stay unchanged.
Narrow layouts put controls below the phone. Internal timing tracks are hidden
and decorative. This is editorial layout only, with no product component changes.

Persona order (4 October 2026): chapters now follow one person at a time. Arun: discover, set up the Hub,
invite Kavya, invite the children. Kavya (headerless): card setup. "The children join" ("Rohan and Neha both
join."): WhatsApp invite, Neha asks to pay, Arun approves, payment goes through (approval stays inside the
payment chain). Keeping track together stays last. Because the children are now invited before Kavya joins,
that section uses Members roster=invited at the start and the new roster=all-invited (Kavya and both children
pending) at the end. The separate payment chapter header is removed.


### Children invitation loop

The existing `children-invite-flow` now opts into shared scripted playback. Its
four fixtures stay in their original order, with Rohan’s portrait preset, typed
Son/name/mobile fields and Manager role off. The proposed Neha allowance editor
receives ₹5,000 through its real input handler; Next and Save remain visual taps.
No submit handlers, navigation or backend actions run. Details reset on each repeat.
Static presentation is retained. Syntax and 30 source tests pass; browser review
remains with the user.


### Prepare fixtures before revealing them

Playback activation now resets ready, locked fixtures before the parent reveals
or slides them in. Newly mounted iframe documents use a captured load event to
prepare their initial controls. The first action tick does not reset an already
prepared document. This removes the flash of prefilled details and selected
payment methods before scripted typing and ticking. Guards still exclude unrelated,
standalone and interactive documents. Reload-based setup scenes retain their own
reset path. Syntax and 31 source tests pass; browser review remains with the user.


### Allowance slider drag

Children playback prepares Neha’s allowance at ₹500 before reveal, then follows
the native range thumb through ₹500 increments to ₹5,000. Each update dispatches
its real input event, updating the amount and track fill. The dot follows the
thumb using the control’s actual bounds and scaled track geometry. Drag segments
reuse the action timer, preserving pause/resume and restart behavior. The shared
slider renderer and bounds are unchanged. Syntax and 32 source tests pass;
browser visual review remains with the user.


### Invitation completion after allowance

The children loop uses a story-scoped “Send invite” action in the allowance
editor, then reuses the existing blue `invite-sent` screen. Scene-owned copy is
“Invitation sent” / “Arun will be notified.” The existing registered success
indicator is animated and playback replays its tick after the slide handoff,
including Kavya’s existing success screen. Members remains the final step.
Standalone allowance editing keeps its Save action. No component internals,
spacing primitives or submission behavior changed. Syntax and 33 source tests
pass; browser visual review remains with the user.


### Neha requests to pay playback

Renamed the request section and enabled the shared three-screen loop. Scripted
scanner tap, amount typing and a visual range swipe use existing locked fixtures.
The review resets before reveal. Input events move the swipe thumb; its change
completion handler is never called. The pending countdown stays frozen, and the
shared parent owns transitions and looping. No camera, payment or backend action
is introduced. Static restoration remains available. Syntax and 34 source tests
pass; browser visual review remains with the user.
