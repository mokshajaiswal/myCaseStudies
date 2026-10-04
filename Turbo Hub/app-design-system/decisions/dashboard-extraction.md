# Dashboard extraction and audit

## Evidence and scope
Source references: mO1QSMbg3mwg82znPJfl6fYFbxA (Spends), cUEe9aCzNha1OYgFqfbI4ag9A (Members), xuyu9b6BPiGFE51sIWm7n3Rm4HE (Analytics). Chose this screen because it covers identity, limits, tabs, transactions, member states, badges, avatars, and analytics. Blue/white payment language is retained; clean surfaces and simplified charts are proposed visual refinements. Data is static demonstration content from references. Chart intermediate points are illustrative, not reconstructed transaction history. Inconsistent source totals are retained as independent reference examples, not reconciled as a real dataset.

## Components and ownership
Ten registrations share components/hub.js and hub.css, including the later phone status bar. Action owns native button/link semantics, disabled, hover, active and focus; callers own callbacks. Tabs owns tab semantics and Arrow/Home/End navigation; callers own selected value and panel content. Avatar, Badge, Limit, Row, Member, Chart, Hub identity and Status bar are presentational. Member calls Avatar, Badge and Limit; Row and Hub identity call Avatar. Icons are noninteractive internal graphics. Page owns tab-to-panel wiring, expanded transaction list, history query state and section layout. Settings and Add remain disabled until their destination flows are implemented.

## Spacing audit
Action: 12px/16px padding, 8px icon gap; icon action 10px padding with 44px target. Tabs: 20px group inset, 8px gap, tab padding 17px/8px/14px with 48px minimum target. Avatar 44px or 64px, no inset. Badge 3px/8px inset. Limit/Member/Chart 20px inset. Row 16px vertical and 12px gap; row parent owns separators and 16px horizontal inset. Member identity gap 12px, role gap 6px; pending separator margin 18px and inset 14px. Nested Member limit uses an explicit 18px top inset and no border, not the full standalone box inset. Hub identity 24px vertical and 16px gap. Each source selector is registered below; incidental local values remain literals pending broader evidence.

## Layout guidance
Screen is fixed at 390 × 844 with 24px content insets; the whole phone preview scales uniformly. See phone-preview.md. Lists of independent member cards use 16px gaps; transaction rows use zero gap with separators. Analytics section spacing is 24px. These are page-owned arrangements, not component registrations.

## Verification
JS syntax and catalog validation pass. Desktop screen inspected; mobile 390px shows no horizontal overflow. Show all expands from five to eight transactions. Members shows joined/pending states. ArrowRight selects Analytics and moves focus. Native focus outlines and disabled controls inspected. Full original art deliberately deferred. Inspector CSS measurement uses supported padding/gap/margin properties; exhaustive inspector-layer trace remains unverified.

## Current Figma pass

The first Spends refinement supersedes the original horizontal identity, expanded-list toggle, boxed transaction rows and tab geometry above. See [figma-dashboard-refinement.md](figma-dashboard-refinement.md) for the current source frame, shared variants, layout ownership and verification. Unfinished actions use available no-op instances; actual unavailable DS variants retain their faded treatment.


Action accent correction: sampled the user-supplied side-by-side reference button at #1D86FF; previous shared --th-blue was #1766DC. Updated the primitive used by --color-action, so registered Action controls and other action-accent consumers stay consistent. Component geometry, spacing and typography remain unchanged.

## Collapsing title and member showcase scroll (4 October 2026)

All Members states come from one source (hub-dashboard/screen.js; ?roster=owner|invited|
parents|children-invited|family). When the Hub name scrolls past the top of the content,
the Navigation title changes from "Hub Details" to the Hub name ("The Sharma’s") and back
when it returns; the page re-renders the registered Navigation rather than editing it.
In story embeds or with ?roster=, the Members tab opens scrolled so the sticky tabs sit
at the top and the member cards fill the screen; the panel gets a minimum height so short
rosters (Arun only) can still reach that position. Visual review pending with the user.

## Hub identity on the blue header (4 October 2026)

Hub Details now shows the Hub avatar, name and type on the Chrome backdrop instead of a
tinted white block. The content scroller is transparent (screen-owned), so the identity
scrolls with the content; the light sheet with 24px top corners starts at the Monthly
Limit card, followed by the sticky tabs and panel on surface white. Hub summary gains a
registered tone='chrome' (white name, 80% white type; specimen "Centered / on chrome").
The Navigation right action is now Hub options (three dots) instead of Help, and the
summary no longer carries its own options button. Collapsing title and member showcase
scroll are unchanged. Visual review pending with the user.

Monthly Limit in the hero (4 October 2026): the Hub Details Monthly Limit now sits on the
Chrome backdrop under the identity, using a new registered Spending limit tone='glass'
(14% white fill, 32% white border, 14px backdrop blur, white text and ring; specimen
"Circular / glass on chrome"). The light sheet now starts at the tabs, which carry the
24px top corners. Visual review pending with the user.

Untitled nav and soft hero exit (4 October 2026): Hub Details starts with no navigation title;
"The Sharma’s" appears once the Hub name crosses the top edge. While the hero scrolls under
the nav, the scroller's top 24px fades (mask) under a 6px blur strip; both turn off at rest
and once the sticky tabs dock. Visual review pending with the user.
Correction: the blur strip haloed against the glass card; removed. The exit is a 32px mask fade only.
Fade shortened to 12px, just softening the edge under the nav bar.

Nav overlay (4 October 2026): replaced the scroller-edge fade. The chrome (status bar + nav)
now floats over the scroller (padded by a measured --chrome-h), so content scrolls beneath the
nav and fades out over the last 24px of the chrome while the hero passes. When the sticky tabs
dock at the chrome edge, a clip-path inset with 24px rounded top corners replaces the fade.
Collapsing title and member showcase scroll now measure from the chrome edge.
Fade refined: the 24px linear band read as concentrated; the mask now ramps on an eased curve
(9 stops) from just below the status bar (40px) to the chrome edge.
Overlap fix: the eased mask let the glass card show behind the nav title. Replaced: once scrolled,
the scroller clips at the chrome edge (24px rounded), and each hero block (identity, glass limit)
fades with the square of its visible fraction as it reaches that edge. Hub identity subtext now
shows the member count from the same roster as the Members tab (e.g. "1 member").

Final scroll treatment (4 October 2026, browser-verified): masks and per-block opacity are removed.
The floating chrome paints its own copy of the Chrome backdrop (longhand background properties so
every gradient layer is sized 100% × 844px from the screen top, plus the ambient patch layer), so
content slides under the nav with no seam. A 20px feather (same backdrop, masked solid→clear) sits
under the chrome edge while the hero scrolls, so content dissolves rather than cuts; it is off at
rest and whenever the tabs are within 22px of the edge. Docked tabs get the rounded clip. The title
switches once the name enters the feather. Checked in the browser pane at scroll 0/30/100/130/150/
250/400 on Members and Spends, and the story-embed showcase (children-invited): no seam, no hard
cut, no overlap with nav controls, crisp docked tabs, "4 members" subtext; console clean.
Earlier fix: a top-level `const chrome` was renamed (window.chrome clash blanked the page).
Progressive blur (4 October 2026, browser-checked): the colour feather is replaced by six stacked
backdrop blurs (0.5/1/2/4/8/16px) in overlapping 12.5% mask bands over a 40px strip under the chrome
edge (page-owned .chrome-blur, created in screen.js). Same visibility rules as before. Checked at
scroll 40 (avatar softens progressively) and 200 (glass card frosts as it meets the nav).
Revised (browser-checked): the chrome copy of the backdrop, feather and seam crossfade are removed; they
always produced a line or glow band. The chrome is transparent; the progressive blur (1→20px, six bands)
spans the chrome plus 24px below it, beneath the nav controls and extended 24px past each side. Hero
blocks fade from 24px before the edge to gone once 35% of their height is under it. Docked tabs keep
the rounded clip. Checked at scroll 55/130/200/220/420 on Members (children-invited): no cut line,
no side artifacts, nothing legible behind the title; console clean.
Corner artifacts: the blur sampled the dark page outside the rounded screen clip. The blur layer now stays
inside the screen edges and the screen gets a no-op filter (saturate(1)) so it is the backdrop root;
verified in the browser pane: top corners and sides clean at scroll 150.

Tabs on the blue (4 October 2026, browser-checked): Tabs gains a registered tone='chrome' (70% white
labels, white active label and underline, no fill or divider; specimen "On chrome"). Hub Details renders
the tabs on the backdrop; the light sheet with 24px top corners starts at the panel. Docked tabs paint
the backdrop (screen-pinned, offset by --chrome-h) and redraw the sheet corners with two masked wedges
(offset by measured --tabs-h); the clip at the chrome edge is now square. Checked at rest, scroll 230 and
520, and the members-parents story embed: no seam, rounded sheet corners kept, console clean.
Tabs chrome tone revised (browser-checked): underline replaced by a frosted pill on the active tab (18% white
fill, 30% white border, top highlight); labels hug their text and centre as a group. Checked at rest and docked.
Hero fade timing (browser-checked): blocks now fade by visible fraction below the chrome edge (full until 25% is
under, gone at about 85%) instead of fading early, which left an empty gap. Opacity at scroll 40/80/120/170/220:
identity 1/0.68/0.27/0/0, limit 1/1/1/1/0.88.

Hero spacing and member chevrons (4 October 2026, browser-checked): hero top padding 8→4px (the framed
tile clears the nav edge); chrome-tone summary tile-to-name gap 12→16px. Member card gains optional
chevron (20px caret-right, secondary colour, right of the identity row; specimen "Profile / with chevron");
all Hub Details member cards use it.

- Hubs list: the Managed by Me / Managed by Others tabs use the chrome tone on the blue header, as Hub Details does, so the white sheet starts at the list. Hub entry members render as an overlapping group of 32px `stack` Avatars with a white ring, matching Figma 515:76029.
- Hub entry uses a cover layout. The top row holds the tile, the overlapping member faces and a chevron (the whole card opens the Hub). Below sit the 20px name and an optional '₹spent / ₹limit' line, with a 48px percentage ring on the right. There is no type label by default. Each Hub can carry an accent (violet, teal, amber) that tints the card, tile and ring. The Hubs list shows The Sharma’s (violet), Mom & Dad (teal, Arun supporting his parents, a common arrangement in India) and, under Managed by Others, Green Park Residents (amber); only The Sharma’s navigates.
- Hubs list header: the bar shows only back and help (icons-only). "Hubs" is a hero page header with a compact white (inverse) **New Hub** Action on its right, via the new page header `action` slot. The tabs are renamed to **My Hubs** / **Joined**. The footer Create Hub button is removed.
- Hubs list, revised: the hero shows only **Turbo Hubs** with a **New Hub** inverse pill Action (leading plus in a blue disc). My Hubs / Joined moved into the white sheet as a new **segmented** Tabs tone (neutral track with a raised white pill, per Figma 515:76029). This replaces the chrome tabs and the plain compact button.
- Hub entry spend is now a full-width bar in the Hub's accent, with '₹spent / ₹limit' at its top right on the name's line, replacing the percentage ring.
- Navigation icons: figma-arrow-back, figma-help and figma-kebab were registered cropped to their own artwork, so they filled the whole 24px slot and looked oversized. They are now re-registered inside their Figma 24px frames (arrow 18 in 24, help 20 in 24, kebab dots in a 0 0 24 24 box).
- Hubs list follow-up: the second tab is **Shared with me** (not Joined). New Hub is a compact **glass pill** (frosted, white plus and label), which sits quietly in the hero. Hub cards get roomier spacing: 20px inset (24px at the bottom), 20px between the tile row and the name, and 12px between the name line and the bar.
