# Neha’s payment-method activation playback — 10 October 2026

Scope: `member-activation-flow`, with its original seven scene IDs, routes,
narrative and proposed designations. Neha is the actor throughout. The existing
pending profile opens PAN verification, then PIN setup, then the active-UPI
profile. Card delivery reuses the existing form and confirmation before the
ready profile. The queue is keyed by flow and scene in `flow-story-playback.js`.

PAN and birth date begin empty; Neha Sharma is preset. The demonstration types
fictional `BXKPS4821L` and `14/08/2007` and checks consent. PIN and confirmation
begin empty and each receive fictional `4821` through their original password
fields. The delivery form demonstrates address line 1 and pincode, with the
remaining required fields preset from the existing fictional story seed. Its
confirmation begins unchecked. Result fixtures are explicit independent states,
not consequences of real form submissions or cross-frame storage.

Reuse audit: pending/active rows use registered Payment method with unchanged
Avatar/Badge children; inputs use Text field, choices use Checkbox choice,
actions use Action and its shared visual press API; results reuse Success notice
and Success indicator. No new component, icon, token or variant is introduced.
No registered roots or internal parts receive styling overrides. Existing parent
grouping and layout rules stay as authored. The only product markup changes add
`id="content"` to profile/delivery scroll surfaces so shared target reveal and
reset address their actual viewport; fixed phone chrome is unaffected.

Lifecycle: incoming PAN/PIN/delivery fields and choices reset before reveal;
incidental values are restored and child scroll returns to zero. Existing queue
timing owns typing, holds and transitions. It supplies Pause/Play, per-step
progress, visibility pausing, late-frame readiness, reduced motion and scene
context checks. The same preparation and queues restore state when scrubbing
backwards in the combined walkthrough. Link and submit taps remain visual;
no PAN check, PIN persistence, shipment or navigation is performed.

Restore: set the flow’s `presentation:'static'`, or remove its presentation and
playback flags. Removing only playback retains the timed one-phone loop. Keep
the original routes, fixture identities and isolated story storage.

Validation: all 45 source tests for story, choreography, button feedback,
prototype player and walkthrough frames pass. New coverage checks all seven
steps, required values and consent, password controls, repeat/direct-step reset,
paused typing delays, hidden-document pausing, late delivery frames, child-only
scrolling, backward snapshots and absence of navigation/submit activation.
Changed JavaScript syntax and whitespace checks pass. Browser/visual review has
not been performed. Manual review should cover a second loop, Pause/Play while
typing, direct selection, narrow-screen targets, masked PIN appearance, reduced
motion and standalone form behavior.

Preview: http://localhost:8020/app/index.html#scene-member-activation-flow
