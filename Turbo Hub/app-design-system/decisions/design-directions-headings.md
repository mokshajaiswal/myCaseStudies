# Scannable alternative directions

11 October 2026. The user requested two mini headings and separately readable
explanations for the Pixel Tag and shared-expenses directions, paired with their
existing illustrative screens.

Source review included the hidden tag chapter in flow-story-data.js, the Pixel
Tag link/buy prototype, pixel-tag-flow.md and shared-expenses-alternative.md.
The existing tag branch distinguishes payment-only and tracking-capable products,
QR linking and optional geofence setup. The user supplied the NFC payment purpose
and clarified that this external instrument was left out of the MVP. The new copy
focuses on optional payment convenience without implying tracking is required.
The user clarified that tags were deferred to validate the core MVP early, rather
than dropped because hardware setup itself was a demonstrated problem.

The shared-expenses direction is described as one place for payments, shared
bills, splitting and settlement, similar to Splitwise. Its separate-account
model is deferred while validating access to manager-provided funds. No research
result or implemented settlement
capability is claimed by the copy.

After the user's follow-up, the two directions stack vertically at every viewport.
Each h3-led article contains one paragraph combining the concept and MVP decision,
followed by its existing phone. A short introduction explains the early validation
priority; the extra conclusion and screen captions are removed. Headings have
stable IDs and label their articles.
Existing plum/teal routes and hidden flow status are preserved.

## Ownership and checks

Catalog review found these wrappers, headings and prose to be page-owned editorial
layout. They reuse the existing createPhone renderer and typography roles rather
than introducing product components. No prototype or registered component internals
change. Headings use --font-small-heading and prose --font-small-body. Article
gaps are --space-4, and stacked directions use --space-10. Phones retain their
existing 280px maximum. The single-column grid uses the reading-column width.

Syntax, route/content and diff checks passed. Browser and visual review, including
heading wrapping and spacing around the two phones, remain with the user.
