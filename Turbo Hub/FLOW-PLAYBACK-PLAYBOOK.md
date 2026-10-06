# Turbo Hub flow playback playbook

Use this guide to turn **one existing case-study flow at a time** into a repeating,
single-phone demonstration. Keep the screens live, make the important actions
visible, and preserve the static version so any experiment can be reversed.

**Working example:** [Arun invites Kavya](http://localhost:8020/app/index.html#scene-kavya-invite-flow).
It demonstrates Add → member details → Next → payment methods → Send Invite →
confirmation → Members. Creation, children’s invitations, Neha’s WhatsApp joining
and her payment request also have scripted playback; see the checklist below.

Unimplemented flow plans below are implementation briefs, not claims that those
demonstrations already work. This document does not enable or change any flows.

## Start with one flow

1. Pick a flow from the [flow checklist](#flow-checklist).
2. Read its brief below and the current screen source.
3. Write its initial state, meaningful actions and final state before coding.
4. Add its choreography to the separate playback layer, using existing components.
5. Enable playback for that flow alone.
6. Run source checks, then review visually before moving to the next flow.

Copy this prompt when opening the next task:

> Implement scripted single-phone playback for **`<flow-id>`** using
> `Turbo Hub/FLOW-PLAYBACK-PLAYBOOK.md`. Inspect its current sequence and screen
> sources first. Keep the static presentation reversible. Use explicit fictional
> fixtures, stable portraits, the translucent touch dot, tap ripple and shared
> button press feedback. Animate only the actions needed to explain the flow.
> Preserve other flows, standalone prototypes, product styling and storage
> isolation. Report what changed, how to restore it, source validation and the
> preview URL. Leave browser testing with me unless I explicitly request it.

## What stays consistent

| Part | Repeatable treatment |
| --- | --- |
| Phone | One active live preview, using the existing phone shell and proportional scaling. No generated screen UI or duplicate rendering. |
| Step list | Vertical list left of the phone, with a short explanation and a filling timer for every screen. Click a step to restart its screen; preserve Pause/Play. On narrow screens the list stacks above the phone. No repeated labels beneath every screen. |
| Touch dot | Translucent blue fill, visible outline, faint halo. Move to the actual control; avoid covering its text with an opaque cursor. |
| Tap | A soft expanding ripple. Give it time to finish before the next action. |
| Buttons | Reuse `TurboUI.pressButton(control)` for the 100% → 98% → 100% feedback. A visual press does not activate the button. |
| Fields | Type a short, realistic value character by character. Preset incidental values instead of demonstrating every keystroke. |
| Portraits | Set the known person explicitly at the beginning. A name field being cleared or typed must not change the portrait. |
| Pacing | Show intent, perform an action, briefly hold the result, then continue. Use a longer hold for confirmation and waiting states. |
| Layout | Keep the existing narrative width, typography, character treatment and phone sizing. A playback task is not a layout redesign. |
| Accessibility | Narrative remains readable without animation. Reduced motion starts paused and suppresses movement; Pause/Play and step selection remain usable. |
| Scroll | Dot choreography may reveal controls inside the child content viewport. It must not move the case-study page or its fixed header/footer. |

Explain the **decision**, not every operation. A short form might demonstrate the
name and one other field; the rest can already be filled. A read-only result may
need only a hold. Do not add a cursor tap to content that is not actionable.

## Keep three layers separate

| Layer | Source | Responsibility |
| --- | --- | --- |
| Story definition | [flow-story-data.js](flow-story-data.js) | Flow IDs, ordered scenes, actors, routes, narrative, proposed status and presentation choice. |
| Editorial execution | [flow-story-playback.js](flow-story-playback.js), [flow-story.js](flow-story.js), [flow-story.css](flow-story.css) | Touch movement, timed actions, visual taps, one-screen transitions and playback lifecycle. |
| Existing product UI | `prototypes/<screen>/screen.js`, shared DS renderers | Real fields, validation, selection state, component feedback and normal standalone behavior. |

[story-context.js](prototypes/shared/story-context.js) supplies deterministic
fictional data and isolated, in-memory storage to embeds. Each scene is independent:
typing in one iframe does **not** seed the next iframe. Declare the next scene's
result explicitly; do not rely on cross-scene storage writes.

Use [flow-reference/flow-data.js](flow-reference/flow-data.js) for design reasoning
and source/proposed distinctions. Use the current `flow-story-data.js` for the
actual case-study sequence. The companion reference includes some screens that
the current story intentionally omits.

## Current implementation versus extensions

The renderer accepts `presentation:'loop'` for a grouped sequence and starts the
executor when its `playback` flag is set. Current flows use `playback:'scripted'`
with choreography keyed by flow ID + scene ID in `FLOWS`; Kavya retains the
legacy `playback:'invite'` and scene-keyed fallback.

**Setting a new playback name alone will not implement another flow.** Extend
the dispatcher and action definitions deliberately. Do not reuse `'invite'`
indiscriminately: unrecognized scene IDs currently receive a read-only hold.

As more flows are added, organize choreography by **flow ID + scene ID**. This
keeps two demonstrations of the same prototype route from sharing the wrong
name, reset rules or actions. Keep the queue runner, coordinate conversion,
pause/resume, ripple and component feedback common. Refactor only what the next
flow needs; preserve Kavya's working sequence and its tests.

### Action vocabulary

These actions already exist inside the executor:

| Action | Meaning | Current timing |
| --- | --- | --- |
| `enter` | Bring the touch dot in from the left. | 600ms |
| `move(selector)` | Find the live target, reveal it inside the child viewport, move the dot to it. | 600ms |
| `tap()` | Ripple at the last target; request shared button feedback if it is an Action. | 450ms |
| `set(selector, value)` | Set a field, select, checkbox or switch through its existing handler. | 320ms |
| `type(selector, text)` | Emit successive values through the existing input handler. | 85ms per character |
| `hold` | Let the reader inspect a result. | Specify per action. |
| `hide` | Remove the touch indicator while showing a read-only state. | Specify per action. |
| `next` | Advance the parent to the next declared fixture. | No extra delay. |

The `move`, `tap`, `set` and `type` helpers are private functions inside
`flow-story-playback.js`, not public browser APIs. For example, an action list
inside that module can follow this form:

```js
[
  move('#name'),
  tap(),
  ...type('#name', 'Kavya Sharma'),
  {kind: 'hold', wait: 350},
  move('#footer button[type="submit"]'),
  tap(),
  {kind: 'hold', wait: 500},
  next
]
```

The executor's `onProgress` callback reports the current scene index, elapsed
action time, total queue duration, readiness and playing state. The step list
uses this to fill over the **whole screen's choreography**, including typing,
taps and holds. Do not use the fallback `loopInterval` for scripted step fills.
Frame-loading time is excluded. Pause preserves elapsed progress, a selected
step resets its own timer, and returning to the first screen clears every fill.
Reduced motion uses discrete progress updates instead of a continuous sweep.

Swipes, range drags, notification opening and explicit same-screen saved results
need small extensions where required. They are **not** generic supported actions
yet. Implement them with the same lifecycle rules rather than scattering new
timeouts through product scripts.

## Recipes to reuse

### A. Entry button → next screen

Enter from the side → move to the existing action → ripple and shared press →
hold briefly → advance the parent to the next fixture.

Do not dispatch a real click on a navigation link or submit button. That would
navigate the iframe away from its declared scene and bypass the sequence owner.

### B. Form → primary action

Prepare empty demonstration fields and prefill incidental ones → preserve the
known portrait → move/tap/type → make meaningful selections → satisfy acceptance
if required → show the primary action becoming available → visual press → advance.

Check actual validation and disabled rules. Never make a disabled control look
enabled merely to continue a demonstration. Leave optional fields empty unless
they explain a design choice.

For Kavya, the scene's `avatarUser:'kavya'` resolves through
`TurboUI.avatarArtwork.users`. Add Member passes the existing Avatar `src` option
and leaves the portrait mounted while typing. Reuse that explicit identity pattern
for another known person; do not paste asset URLs into each screen.

### C. Choices → confirmation

Start with an explicit selection state → demonstrate one or two choices through
their existing handlers → visual press of the confirmation action → next fixture.

Keep real fees, descriptions and selected styles. The playback layer does not own
radio, checkbox or switch styling.

### D. Slider or swipe

Move to the live thumb → animate a short, controlled horizontal gesture → update
the existing control's value and supported visual state → hold the final position.

A slider's `input` event can update its value/fill; inspect that component's API
before choosing the adapter. A Swipe action's **`change` handler can complete the
action and navigate**. Do not dispatch it blindly. Use a supported visual state
or add a small documented shared visual API if necessary, then let the parent
advance. Do not override private component CSS to fake a drag.

### E. Notification → detail

Hold the notification long enough to read → move/tap its actual target → show the
declared detail fixture. If the notification fixture has no actionable target,
hold and transition; do not imply a working hit area that is not present.

### F. Waiting, processing and success

Hide the dot → hold the stable fixture → advance. Keep product countdowns and
automatic route changes frozen in locked embeds. The editorial queue owns the
timing; returning to the first fixture resets the whole demonstration.

### G. Tabbed overview

Show the initial tab → move/tap the next tab → advance to its existing route/state
fixture. Keep the Hub identity and totals consistent. This is navigation between
views, not a transaction; avoid invented processing or success states.

## Build and review checklist

For **each** flow, record these answers before enabling it:

| Question | Record |
| --- | --- |
| Scope | Exact flow ID; ordered scene IDs and routes. |
| Actor | Who is using each screen? Is there a handoff to another person? |
| Initial state | Empty, prefilled, unchecked, pending or joined? Which fields are demonstrated? |
| Targets | Stable IDs/selectors verified in the actual renderer; expected control types. |
| Actions | A small queue per scene, including waits and final hold. |
| Result | What existing next fixture represents the outcome? |
| Reset | Values, selections, cursor, child scroll position and animation handles. |
| Restore | Exact presentation/playback flags to remove or switch. |

- [ ] Keep the original `sequence`, routes, IDs and narrative available.
- [ ] Keep `interactive:false`; the touch demonstration does not unlock the phone.
- [ ] Require embedded, locked and matching scene context before every action.
- [ ] Use scene-local fictional storage; do not read or write manual-test drafts.
- [ ] Locate controls from live DOM geometry, including responsive scale.
- [ ] Wait for late-mounted frames; reset when the document is replaced.
- [ ] Reset every changed control on each repeat, including acceptance and role.
- [ ] Pause the queue, ripple and button animations offscreen/hidden or on Pause.
- [ ] Resume from the pending action delay; do not restart typing unexpectedly.
- [ ] Cancel animations when switching steps; selecting a step restarts it when playing and stays paused when already paused.
- [ ] Keep every step's fill synchronized with its full action queue; exclude frame-loading waits and clear all fills when the loop repeats.
- [ ] Keep product timers frozen and avoid two independent autoplay clocks.
- [ ] Preserve default/reduced-motion behavior and narrative accessibility.
- [ ] Update source tests and the relevant decision record.
- [ ] Leave other flows and standalone prototype behavior unchanged.

Do not invoke camera access, account registration, purchases, actual invitations
or payment operations. Use the already available fixtures for those story results.
If a necessary screen or state is missing, document the gap instead of inventing
a working operation.

## Flow checklist

The current story defines flow groups including the hidden tag branch.
Check off a flow only when its source validation is complete; record visual review
separately. These are convenient units of work, not a requirement to enable them
all at once.

| Flow | Scripted playback | Visual review | Brief |
| --- | --- | --- | --- |
| Discover Turbo Hub and get started | Not implemented as a full touch sequence | Pending | [Entry and onboarding](#1-entry-and-onboarding) |
| Set up the family Hub | Implemented; source tests pass | Browser-checked by agent (full loop, reset) | [Creation](#2-create-the-family-hub) |
| Arun invites Kavya | Implemented; source tests pass | Pending | [Co-manager invitation](#3-arun-invites-kavya) |
| Kavya finishes her card setup | Not implemented | Pending | [Card setup](#4-kavya-finishes-her-card-setup) |
| Arun invites the children | Scripted five-screen loop | Source checks pass; visual review pending | [Children](#5-arun-invites-the-children) |
| Neha joins from a WhatsApp invite | Implemented seven-screen loop; source tests pass | Pending with user | [WhatsApp joining](#6-the-invite-arrives-on-whatsapp) |
| Neha requests to pay | Scripted three-screen loop | Source checks pass; visual review pending | [Request](#7-neha-asks-to-pay) |
| Arun approves | Not implemented | Pending | [Approval](#8-arun-approves) |
| Neha's payment goes through | Not implemented | Pending | [Completion](#9-nehas-payment-goes-through) |
| Arun and Kavya keep an eye on spending | Not implemented | Pending | [Tracking](#10-arun-and-kavya-keep-track) |
| Add a Pixel Tag | Hidden; not implemented | Pending | [Optional tag](#11-optional-pixel-tag) |

### 1. Entry and onboarding

**Flow:** `accounts-cards` · [Preview](http://localhost:8020/app/index.html#scene-accounts-cards)

**Sequence:** `accounts-cards` → `hub-introduction`.

Show Arun discovering Turbo Hub within Accounts & Cards. Tap its entry action,
then present the existing introduction. Entry and onboarding stay in this one
section. The current onboarding preview has its own autoplay: choose one timing
owner before adding scripted slide actions. Do not create a second onboarding
section or a second clock fighting its carousel.

**Recipes:** A, F. **Review focus:** readable slide holds, restored initial slide,
and no effect on standalone onboarding.

### 2. Create the family Hub

**Flow:** `create-flow` · [Preview](http://localhost:8020/app/index.html#scene-create-flow)

**Sequence:** `hub-setup` → `hub-created`.

On `create-hub?step=details`, start with an empty name and no source account.
Type “The Sharma’s”, select the credit account, show Create becoming available,
and press it visually. Advance to the existing `hub-dashboard?state=new` fixture.
Use `#hub-name` and `#account-credit` after confirming their current source.
Do not demonstrate Add source account: it has no implemented account-creation flow.

**Recipes:** B, C, F. **Review focus:** initial disabled state, required selections
and consistent Hub identity. The current story omits Hub type; preserve that choice.

**Implemented (4 October 2026).** `create-flow` has `presentation:'loop', playback:'scripted'`.
Choreography lives in `FLOWS['create-flow']` in `flow-story-playback.js` (choreography is now keyed by
flow ID, then scene ID; Kavya's scene-keyed script is unchanged as the fallback). The story fixture
seeds an empty draft for `hub-setup`, so it opens with no name, no account and Create disabled.
Actions: enter → type “The Sharma’s” into `#hub-name` → tap `#account-credit` (a real click, so the
radio's own handler enables Create) → visual press of Create → advance → hide and hold the
`hub-dashboard?state=new` fixture → loop. Radios cannot be unset through their handlers, so
`hub-setup` declares `reload:['hub-setup']`: on each repeat its locked fixture reloads instead of
being reset control by control. Restore: remove `presentation`/`playback` from `create-flow`.

### 3. Arun invites Kavya

**Flow:** `kavya-invite-flow` · [Preview](http://localhost:8020/app/index.html#scene-kavya-invite-flow)

**Sequence:** `members-owner` → `add-member` → `member-payment-methods` →
`invite-sent` → `hub-members`.

This is the reference implementation. Add → Wife → Kavya Sharma → fictional
mobile number → Manager on → acceptance → Next → Digital Card and UPI →
Send Invite → confirmation → Members with Kavya pending.

Keep Kavya's portrait visible from the beginning, even while the name is empty.
The pending roster is an explicit fixture, not a side effect of sending an invite.

**Recipes:** A, B, C, F. **Review focus:** portrait stability, acceptance gating,
full repeat reset and no real submit/navigation calls.

### 4. Kavya finishes her card setup

**Flow:** `card-flow` · [Preview](http://localhost:8020/app/index.html#scene-card-flow)

**Sequence:** `member-profile` → `delivery-details` → `address-saved`.

Tap Delivery Details on Kavya's profile. Demonstrate one address line and pincode;
prefill city, state and contact consistently. Check delivery confirmation and
press Proceed visually. Advance to `member-profile?saved=true`.
Current field IDs include `#line1`, `#pincode`, `#city`, `#state`, `#contact` and
`#delivery-confirm`; confirm the primary action selector in source.

**Recipes:** A, B, F. **Review focus:** child-only scrolling and saved-address
confirmation. Saving an address does not activate a card or initiate delivery.

### 5. Arun invites the children

**Flow:** `children-invite-flow` · [Preview](http://localhost:8020/app/index.html#scene-children-invite-flow)

**Sequence:** `members-parents` → `invite-son` → `spending-limit` →
`members-children-invited`.

Show Rohan's member details with Manager off and his portrait preset. The next
existing fixture is Neha's allowance editor: establish that actor change in the
caption, choose Neha and demonstrate ₹5,000 before showing the pending roster.
Current limit controls are `#limit-target`, `#limit-period` and `#limit-amount`.

This beat compresses the children's invitations. It does not include all of
Rohan's payment-method/confirmation screens or Neha's invitation form. Do not
pretend pressing Next directly sets Neha's allowance or completes both invitations.
Keep the edit as a narrated excerpt, or explicitly extend the scene definition
before trying to demonstrate a complete invitation lifecycle.

**Recipes:** B, D, F. **Review focus:** Rohan/Neha handoff, non-manager role,
correct slider bounds and preservation of the editor's proposed designation.

### 6. The invite arrives on WhatsApp

**Flow:** `whatsapp-invite-flow` · [Preview](http://localhost:8020/app/index.html#scene-whatsapp-invite-flow)

**Sequence:** `invite-notification` → `invitation` → `play-store` →
`hub-welcome` → `verify-mobile` → `hub-joined` → `hub-dashboard?state=joined&member=neha`.

**Implemented (6 October 2026).** The current story already includes the full
new-user sequence. `whatsapp-invite-flow` uses `presentation:'loop',
playback:'scripted'`; its queue is keyed by flow and scene in `FLOWS`.

Hold Neha’s WhatsApp notification, visually tap its real notification link,
then hold the chat and visually tap its existing invitation preview. On the
store, visually press Install, show discrete 0/35/75/100% progress, then Open.
The locked store exposes `#install.setPlaybackState(state, value)` solely for
the editorial executor. Its native install timer is blocked in locked embeds;
standalone Install still uses its normal 1.6-second timer and Open destination.

Hold the welcome with Arun, the family and ₹5,000 limit. Reveal and check the
existing terms checkbox through its handler, then visually press Accept invite.
Verification starts empty, fills the fictional six-digit code in one SMS-autofill
update, holds it, then visually presses Verify and join. Hide the dot and play
and hold the existing joined-success indicator, visually press Go to Hub, then
hold Neha’s first-visit member dashboard for 4.2 seconds before looping. No real link
clicks, form submission, account creation, SMS or store installation occurs.

Reset: store returns to Install and zero child scroll; welcome unchecks terms
and resets child scroll; verification clears the code and resets child scroll.
The common queue owns all waits, pause/resume, late loading and step restart.
**Restore:** set `presentation:'static'` or remove its presentation/playback flags.
The original sequence and prototype routes remain intact. `dev=true` exposes
View all screens with the existing horizontal screen overlay.

**Recipes:** A, B, E, F. **Validation:** syntax and story/playback/button-feedback
source tests pass, including paused install progress, full loop/reset, terms,
SMS autofill, native-timer suppression and standalone installation preservation.
Browser, keyboard and visual review remain with the user.

### 7. Neha asks to pay

**Flow:** `request-flow` · [Preview](http://localhost:8020/app/index.html#scene-request-flow)

**Sequence:** `scan-qr` → `payment-review` → `request-pending`.

Hold the existing merchant scanner as a simulated scan, then advance to review.
Demonstrate entering ₹2,500 in `#amount`, retain the existing family Hub account,
and animate the `#pay` Swipe action visually. Advance to the pending fixture
with the same merchant, amount and manager. Do not open a camera, use recent
merchants as unrelated actions, or request a real payment.

**Recipes:** B, D, F. **Review focus:** shared Swipe visual adapter, consistent
amount and frozen pending countdown. The source does not establish the universal
approval trigger; this is a payment that requires approval.

### 8. Arun approves

**Flow:** `approve-flow` · [Preview](http://localhost:8020/app/index.html#scene-approve-flow)

**Sequence:** `payment-notification` → `payment-authorize` →
`authorization-confirmed`.

Hold Arun's notification, show request details, then animate the existing
`#authorize-swipe` visual gesture before the confirmation fixture. Keep the
member, merchant and ₹2,500 amount constant. Leave Decline available visually
without choosing both outcomes in one loop.

**Recipes:** E, D, F. **Review focus:** frozen expiry, no real completion callback,
and the difference between authorization and a completed payment.

### 9. Neha's payment goes through

**Flow:** `complete-flow` · [Preview](http://localhost:8020/app/index.html#scene-complete-flow)

**Sequence:** `payment-processing` → `payment-receipt`.

Use a quiet processing hold, then show the receipt long enough to inspect.
This flow may need no touch dot at all: completion is a system result. Keep the
existing prototype's processing state stable and let the editorial queue transition.
Do not add a fake tap on a spinner or claim that the demo executes a transaction.

**Recipe:** F. **Review focus:** readable receipt and distinct processing/completed
states with the same amount, merchant and Hub.

### 10. Arun and Kavya keep track

**Flow:** `tracking-flow` · [Preview](http://localhost:8020/app/index.html#scene-tracking-flow)

**Sequence:** `members-family` → `hub-dashboard` → `hub-analytics` → `hubs`.

Use Members → Spends → Analytics as three existing views of the same Hub.
Tap the corresponding tab visually, then advance to its route/state fixture.
Inspect whether an actual in-screen route to All Hubs exists; if it does not,
introduce that last screen through its caption rather than tapping an invented
control. Preserve `connected:false` for static restoration.

**Recipes:** G, F. **Review focus:** actor handoffs, consistent totals, truthful
navigation and separation of overview views from transactional steps.

### 11. Optional Pixel Tag

**Flow:** `tag-flow` · hidden in the current story.

**Sequence:** `pixel-tag` → `tag-scanner` → `tag-added` → `geofence-setup`.

Keep this chapter hidden unless its inclusion is explicitly requested. If enabled,
choose Link Existing Tag, hold the simulated scanner, show Card Keys linked,
then visually press Setup Pixel+ Tag. Demonstrate the existing home location,
500-metre radius and simulated permission. Current controls include
`#geofence-location`, `#geofence-radius` and `#geofence-permission`.

The geofence screen has a same-screen saved notice rather than a separate saved
scene. Add an explicit visual-result adapter if that result needs demonstration;
do not invent another route. Buying a tag and real location permission remain
outside the demonstration. Preserve the proposed geofence designation.

**Recipes:** A, F, B, C. **Review focus:** optional status, simulated scanning,
and clean reset of the saved geofence/result on every repeat.

## Deliberately excluded reference branches

Hub type, new-user entry, declined and expired payment outcomes remain available
in the prototype/catalog but are deliberately omitted from the current family
story. Do not restore them as an incidental part of adding playback. If a later
task requests one, give it its own explicit scene/branch, preserve proposed status,
and use these same recipes. Alternatives must not look like consecutive events
every family member experiences.

## Validation and handoff

From the repository root, run checks for the files actually changed. The existing
baseline commands are:

```sh
node --check 'Turbo Hub/flow-story-data.js'
node --check 'Turbo Hub/flow-story.js'
node --check 'Turbo Hub/flow-story-playback.js'
node --test 'Turbo Hub/tests/flow-story.test.cjs' 'Turbo Hub/tests/flow-story-playback.test.cjs' 'Turbo Hub/tests/button-feedback.test.cjs'
```

When a shared component or catalog contract changes, also run:

```sh
node '.tmp-ds-starter/framework/validate.js' --config 'Turbo Hub/app-design-system/studio.config.json'
```

Add meaningful coverage for the new action type or flow: initial state, correct
order, typed/selected values, one active phone, loop reset, mid-action pause,
offscreen/hidden behavior, late frame mounting, context rejection and absence of
navigation/submit activation. Scope whitespace checks to changed files.

Browser testing and visual review belong to the user unless explicitly requested.
For manual review, check forward playback, Pause/Play during typing, direct step
selection, a second full loop, reduced motion and narrow-screen target alignment.
Confirm that buttons/text remain visible beneath the dot and the page does not
jump when child content scrolls. Reopen a standalone prototype to confirm its
normal behavior remains independent.

Record the handoff in this format:

```text
Flow ID:
Actions demonstrated:
Preset/incidental values:
Proposed or omitted steps:
Source checks:
Visual review: pending / reviewed by user / explicitly browser-tested
Preview URL:
Static restoration:
Known gaps:
```

## Restore without losing the work

- **Full static restoration:** set the flow's `presentation:'static'`, or remove
  `presentation`. Its original sequence renders again. Keep `connected:false`
  where it already exists.
- **Simple timed one-phone loop:** keep `presentation:'loop'` and remove its
  `playback` setting. `loopInterval` controls the fallback timing.
- **Hold one screen:** use Pause, then select a step if needed. This is a reader control, not
  a source rollback.

Keep choreography in the playback module even if its flow is disabled, so the
experiment can be resumed. Portrait fixture configuration is independent of
presentation; remove `avatarUser` only if restoring name-derived artwork is also
desired. Do not delete scenes, flatten source prototypes, or roll back unrelated
DS changes to restore a static case-study flow.

No push, deployment or rollout to other flows is implied by completing one flow.


## Shared screen transition

Loop presentations automatically use the shared `pushScreens` handoff in
`flow-story.js`: the next screen slides in from the right and pushes the current
screen left. The device frame stays fixed. Do not add per-flow transition code.
The 420ms handoff completes before the next screen's action queue and timer start.
Selecting a different step cancels the previous transition; reduced motion uses
an immediate switch. Existing static presentations and standalone prototypes
remain unchanged.


### Children invitation playback implemented

`children-invite-flow` uses its four existing screens: Members, Rohan’s details,
Neha’s proposed allowance editor, and the invited roster. It types Rohan’s fictional
details with his portrait preset and Manager role off, visually taps Next, sets
Neha’s monthly allowance to ₹5,000 and visually taps Save. The final roster holds
before looping. This preserves the existing abbreviated story; it does not add
missing payment-method or invitation screens or send invitations. Set
`presentation: 'static'` to restore the four-screen presentation.


Slider choreography can use `drag(selector, values)`: it emits timed native input
updates and moves the dot with the actual range thumb. Children playback starts
at ₹500 and drags in ₹500 increments to ₹5,000. Prepare the starting value before
reveal and preserve the component’s real min/max/step values.


Children playback now has five screens. After dragging Neha’s allowance, the
story-only allowance action reads “Send invite” and transitions to the existing
`invite-sent` screen before returning to Members. The shared animated success
indicator replays on arrival. This scene says “Invitation sent” and “Arun will be
notified.” Standalone allowance editing retains “Save limit”; all story taps
remain visual and send no real invitation.


### Neha requests to pay

`request-flow` now reuses its three existing fixtures as a scripted loop: QR scan,
payment review and approval pending. The dot taps the scanner target, enters
₹2,500, and follows the Swipe to Pay thumb across the track using input events.
The completion change event is deliberately omitted, so the parent alone moves
to the pending fixture without navigation or payment submission. Its countdown
remains frozen. Set `presentation: 'static'` to restore the static screens.
