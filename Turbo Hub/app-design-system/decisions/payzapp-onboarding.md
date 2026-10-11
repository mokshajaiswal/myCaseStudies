# Isolated PayZapp onboarding — 10 October 2026

## Original splash GIF — 11 October 2026

Replaced the temporary Play Store icon splash with the original animated image
from Figma file QNc5WWAGgH0PKr3z42BP3N, node 4:826. The local `assets/splash.gif`
is 500 × 888, with 55 frames and 1.1 seconds of animation. The splash fills the
screen with the existing white surface token, preserves the complete image's
aspect ratio without cropping, and hides the parent status-bar slot while visible.
The existing 1.6-second splash timing remains. Story resets assign a fresh local
image URL to replay the GIF. Standalone onboarding, its device preview, Play Store
Open and the WhatsApp story all consume this single implementation.

This is page-owned branded artwork and splash layout; shared Status bar and Action
internals are unchanged. Original GIF downloaded through Figma's raw-image asset
instructions; no flattened export or temporary URL is used in product code.
Source, asset metadata and Node checks cover the change. Browser animation,
framing and visual review remain with the user.

Figma selection identifies NTB walkthrough frames 11623:167259, 11623:167608,
11623:167958. Implemented in prototypes/payzapp-onboarding, with no story routing
or case-study placement. Existing family Hub onboarding stays in place.

The requested Figma full-bleed gradient walkthrough is an explicit screen-layout
exception: preserve the source 360 × 640 canvas instead of adding the default
rounded light content surface. Source PNG art uses its original clipping slot
at y=111, 360 × 193, and image crop percentages. The background now uses the registered Chrome backdrop renderer on the viewport,
per the user’s follow-up. The source gradient/mask are no longer consumed.
Native pagination and carousel are page-owned onboarding navigation. Shared Action
uses its supported inverse API; the parent only owns its external grid slot.
No registered child internals are overridden. Shared Inter and typography/spacing
primitives are reused. Source heading uses 20px bold and 1.4 leading.

Cyclic four-second timer, manual dots/swipe/arrow navigation, focus and visibility
pause, reduced-motion manual mode, and a destination-independent start event.
No new reusable UI component is extracted from this one-off flow.

Playback buttons below case-study steps remain hidden at rest and exposed on
keyboard focus. Increased hide-selector specificity so the earlier loop-toggle
rule cannot win based on stylesheet ordering.

Verification: JavaScript syntax and local file metadata checks. Browser, rendered
crop/spacing, transitions, responsive device framing and interactions await the
user's manual review. No browser tools or visual inspector used.

Follow-up: shared Chrome backdrop CSS/renderer loaded through the DS adapter.
The viewport owns its dimensions; no backdrop internals are overridden. The
canvas height follows the available viewport after uniform scaling, with the
shared inverse Action in a parent-owned bottom slot at --th-space-6. Button
geometry remains unchanged. Source/syntax checked; browser review remains pending.

Animation timing follow-up: file signatures confirm all three illustration
exports contain GIF89a data despite their .png extensions. Each show() activation
assigns the incoming artwork its local URL with a fresh play query parameter
before toggling the current slide, restarting playback alongside the slide-in
transition. No artwork or shared component geometry changed. JS syntax checked;
actual GIF restart and transition timing await user browser review.

Typography follow-up: heading uses the shared screen-heading role; subtext now
uses the 16px body role instead of 14px supporting text. Both use DS Inter family,
weight and leading tokens. A local @font-face points to the existing bundled Inter
Variable font so file/static previews load the actual font (the DS font URL is
studio-route-relative). Shared button typography remains unchanged. Source paths
checked; browser typography review remains with the user.

Latest typography preference: titles use the existing 24px DS primitive with
screen-heading weight/leading; subtext returns to the 14px supporting-text role.
Inter remains the shared family. Source checked; visual review stays with user.

Title weight increased to the DS semibold token (600), per user preference.
Titles remain 24px and subtext remains the 14px supporting-text role.

Title size updated to --font-size-20 (20px), per user preference; semibold
weight and 14px supporting subtext remain.

Subtext weight reduced from regular (400) to the existing DS light token
--font-weight-light (300), per user preference. Size remains 14px.

Layout follow-up: shared TurboUI.statusbar() supplies time, signal, Wi-Fi and
battery unchanged. The screen grid allocates its natural status-bar row, a
flexible carousel area and the shared bottom Action row with 24px bottom inset.
The entire artwork/copy/pagination stack is centered inside the flexible area.
Slides overlap in one grid cell, letting the longest copy determine stable stack
height across cyclic transitions. Illustration cropping stays unchanged. No
registered status-bar or button internal styling overrides. JS syntax/source
checks only; centering and status-bar appearance await user visual review.

Illustration-to-text gap increased from 24px to 32px using existing spacing
tokens (--th-space-6 + --th-space-2). The full carousel stack remains centered.

Transition glitch fix: the former CSS transition applied to every slide, including
the previous outgoing slide returning from -100% to +100%. That slide stayed
visible during the reset and could cross the incoming screen. Replaced global
transitions with explicit incoming/outgoing animations, immediate cleanup and
clipping at the carousel boundary. Fresh GIF images load offscreen before being
swapped into the incoming slide; request generations discard stale loads during
rapid navigation. Same-slide selection no longer reloads its live GIF. Reduced
motion cancels active transitions. Source/syntax checks only; user visual review
remains pending.

Splash follow-up: initial 1.6-second splash uses the existing Play Store PayZapp
logo asset and shared backdrop/status bar. Carousel and CTA remain hidden/inert
until the first GIF loads, then the carousel timer begins. Splash scheduling
pauses for hidden documents; no product destination or case-study placement added.
Syntax and local logo reference checked; visual review remains with the user.

Integration: the only app-install entry in the current prototypes is the WhatsApp
invitation’s Play Store listing. Open now launches payzapp-onboarding with the
explicit next=hub-welcome destination; Get Started continues to the invitation.
The story sequence inserts one onboarding checkpoint after installation. The
editorial playback queue owns splash/slide timing (1.6s, then 4s per slide), reset,
pause and seeking for locked embeds; standalone previews retain their cyclic
carousel. Story embeds reuse the existing phone-frame asset. Narrative copy now
reflects the introduction before Hub welcome. Flow/story Node tests and syntax
checks pass; browser review remains with the user.

Flow pacing follow-up: the joining flow now shows only the first carousel slide
for 1.8 seconds after the 1.6-second splash, then presses Let’s Get Started.
The scripted onboarding checkpoint takes 5.5 seconds instead of 15.7 seconds.
The standalone carousel and shared Action renderer are unchanged; this edit owns
only flow timing and narrative copy. Playback tests cover first-slide-only
progression and a total duration below six seconds. Visual timing review remains
with the user.
