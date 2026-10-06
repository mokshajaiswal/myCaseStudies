# Neha joins from WhatsApp — 6 October 2026

Scope: `whatsapp-invite-flow`, preserving the six joining scenes and adding the existing Hub dashboard as the seventh scene.
Actor: Neha throughout. Initial state: invitation unread on her lock screen;
chat from HDFC Bank naming Arun and The Sharma’s; store at Install; welcome terms
unchecked; verification code empty. Final state: Neha’s first visit to the family Hub.

| Scene | Target/actions | Result/reset |
| --- | --- | --- |
| invite-notification | Hold, enter, visual tap `#notifications .th-payment-notification` | Existing WhatsApp chat fixture |
| invitation | Hold, enter, visual tap `.wa-preview` | Existing Play Store fixture |
| play-store | Visual Install press; adapter progress 0/35/75/100%; visual Open press | Welcome; reset Install and store scroll |
| hub-welcome | Hold, reveal/check `#welcome-terms`; visual `.welcome-footer button` press | Verification; reset checkbox and content scroll |
| verify-mobile | Hold, autofill `#otp` with fictional 482913; visual submit press | Joined; clear code and content scroll |
| hub-joined | Success indicator, short hold, visual Go to Hub press | Open the Hub |
| neha-hub | Hold the member Hub for 4.2 seconds | Loop to notification |

The executor alone owns action delays and installation progression; locked stores
expose a page-owned `#install.setPlaybackState` adapter and suppress their manual
install timeout. Standalone behavior is unchanged. No links are clicked or forms
submitted by the choreography. Scene storage remains isolated and in memory.
Pause/resume retains install progress and step timing. Selecting a step prepares
its initial state before the incoming transition; late frames prepare after loading.
Restore with `presentation:'static'` or by removing this flow’s presentation and
playback flags; sequence, routes and static previews remain available.

Reuse audit: existing Notification, Check, Text field, Action and Success indicator
renderers are unchanged. External WhatsApp and store fixtures retain their documented
page-owned styling. Existing playback, touch ripple, press feedback, step fills,
phone shell and horizontal dev overlay are reused. No product CSS or component
internals are overridden, and no new product component/icon was introduced.

Validation: changed JavaScript syntax checks plus story, playback and button-feedback
tests pass (41 tests). New cases cover seven-screen order, paused installation,
repeat/step reset, consent, six-box OTP and SMS autofill, no native clicks and frozen locked-store
timers while preserving standalone installation. Browser/keyboard/visual review
remains with the user.

The confirmation’s standalone Go to Hub action opens the same member fixture.
The existing dashboard accepts `state=joined&member=neha`: it shows Neha’s
₹5,000 allowance and zero spends, shared Card and UPI payment-method rows, and Spends/Members tabs
without manager Add or analytics actions. Tab changes preserve fixture parameters.
Summary, Limit, Tabs, Member, Navigation and Payment method renderers are reused unchanged;
payment-method arrangement is page-owned. Existing dashboard styling is not altered
inside registered components. Visual review remains with the user.
