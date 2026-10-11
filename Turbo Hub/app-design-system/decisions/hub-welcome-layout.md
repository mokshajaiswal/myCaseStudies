# Hub welcome layout — 6 October 2026

## Invitation modal over PayZapp home — 11 October 2026

The invitation now opens as a bounded modal over the PayZapp Pay home from Figma
QNc5WWAGgH0PKr3z42BP3N, frame 12:1799. Source header, scan artwork, utility-biller
nudge, shortcuts, account strip and offers header form the home context. Original
artwork is local under `prototypes/hub-welcome/assets/home`; no screenshot is used
as a page image. The source's 360px geometry scales inside the existing 390 × 844
phone, with the registered Status bar layered above the continuous home backdrop. Wallet is ₹0 and
Cashpoints is 0; UPI copy uses fictional fixture data.

Invitation retains its family artwork, shared Avatar renderers, benefits, Check
and Accept invite. Page-owned hero sizing is compacted for the modal. A dimmed
layer, bounded scroll region, 24px corners and focus containment are parent layout.
Shared Action supplies close and reopen controls unchanged. Home is inert and
hidden from assistive technology while the invitation is open. Close/Escape
reveals home and focuses View Hub invitation; reopening focuses the dialog. Locked
story fixtures retain their invitation and avoid autofocus. Consent validation,
number-verification navigation and story selectors stay intact. `?invite=closed`
provides a manual home-only preview of the same implementation.

Reuse audit: existing Account card/Account action were inspected; their 90px/60px
summary/action sizing did not fit the source's 79px/40px home carousel. Added shared
`home` Account card and `compact` Account action variants, with 16px summary inset,
12px summary gap, 4px title/balance gap, 44px artwork tile, and 8px/16px action inset
with 8px icon gap. Defaults and existing variants remain unchanged. Home and
specimens consume the same renderer; no page selectors override registered
children. Branded account artwork is supplied through `graphicSrc`; interactive
action glyphs use the registered Phosphor provider. The canonical specimen includes
both zero-balance home cards and the compact child action with existing states.

Node checks cover modal dismissal/reopening, focus containment, consent, fixed
zero balances and locked-story behavior, alongside existing flow/playback tests.
Catalog and local asset checks pass. Browser layout, focus, artwork geometry and
visual review remain with the user; no browser or inspector was run.

The user requested restoration of the earlier invitation layout. It again uses
family artwork, an inviter line, Hub name and overlapping portraits on blue
chrome, followed by the What you get list, terms and Accept invite in the rounded
light content surface. The centered-summary redesign and anchored footer are
removed. Original consent validation, monthly-limit storage and playback selectors
remain intact.

Reuse audit: Status bar, Avatar (stack-large and default graphic), Check and Action
use their existing renderers. The artwork and headings remain page-owned. External
portrait overlap is applied to separate parent wrappers, replacing the previous
page override on Avatar roots. No registered component internals are restyled.
Syntax and source tests pass; browser, keyboard and visual review remain with the
user under the project workflow.

Benefits container: at the user’s request, the three What you get items now share
a rounded outlined container, following the existing grouped-list treatment from
Create Hub. The page-owned list supplies the existing border/surface/radius tokens
and 16px inset; its 12px item gaps and registered Avatars remain unchanged. The
heading stays above the container, with terms and acceptance below. This is parent
layout, not a new independently responsible component. Source/diff checks pass;
visual review remains with the user.

## Modal spacing and continuous status area — 11 October 2026

The home artwork now starts at the screen's top and extends behind the registered
transparent Status bar. Header controls and the light home sheet retain their
56px status-area offset in the source's scaled 360px canvas. Previously the home
started below the Status bar, leaving a separate Chrome backdrop in that strip.
The screen uses a single page-owned source-artwork background; the modal continues
to use the registered Chrome backdrop without internal overrides.

The bounded modal has a 350px maximum width with 20px outer side insets. Hero and
content use 20px padding. Hub artwork now uses the shared 56px profile Avatar with
its framed input, in a page-owned margin wrapper, replacing the separately styled
image. The heading uses the existing 20px identity role. Family portraits retain
their shared 40px size. Benefits select the existing 40px merchant Avatar size;
the parent list uses 12px inset and 8px row gaps. Removing its extra bottom margin
avoids doubled spacing before terms. Content gaps are 12px; terms-to-accept gap
is 8px. The close control uses the existing 44px glass Action. Component hit areas,
internal spacing and typography remain owned by their registered implementations.

All five Welcome behavior tests pass, covering zero balances, consent, dismissal,
reopening, keyboard focus and locked story behavior. Catalog, syntax and whitespace
checks pass. Browser layout and visual review remain with the user, using both the
open invitation and `?invite=closed` home preview.

## Single white invitation modal — 11 October 2026

At user request, the modal now uses one white surface. Its centered hero is inset
20px from the modal's sides and top, with 24px top padding, so the family artwork,
inviter and Hub name form an introduction within the dialog. Benefits, terms and
Accept invite follow on the same surface. The modal no longer consumes the Chrome
backdrop; the content section no longer consumes the phone's rounded light-sheet
layout. The existing PayZapp background and continuous status area remain behind
its dimmed layer.

Reuse audit: Status bar, 56px profile Avatar, stacked family Avatars, 40px benefit
Avatars, Check and Action retain their shared implementations. White-surface
avatars omit frame=true; the close control selects the existing quiet icon Action.
The modal owns surface color, hero insets, external gaps and content scrolling.
No registered child roots or internals are restyled. Consent, dismissal, reopening,
focus handling and locked playback behavior are unchanged. All five Welcome tests,
syntax, catalog and whitespace checks pass; browser visual review remains with
the user.

## Blurred home with the DS backdrop — 11 October 2026

The invitation layer now applies 8px backdrop blur (including the Safari-prefixed
property) over a 32% dimming layer. The entire modal remains opaque white. The home
and status area share the registered Chrome backdrop, mounted through
`TurboUI.chromeBackdrop({host})` on the existing screen. The source header
background SVG/mask and local screen paint are removed, avoiding competing paints.
Home header content, wallet ₹0 and Cashpoints 0 retain their existing layout.

Reuse audit: Chrome backdrop owns all colored paint and its optional motion;
the page owns its host geometry and modal blur layer. No component internals or
tokens are overridden. Welcome tests include backdrop mounting and preserve
consent, focus, dismissal and story behavior. Syntax, catalog and whitespace
checks pass. Browser rendering and blur review remain with the user.

## Invitation visual hierarchy — 11 October 2026

Hub artwork now selects the existing 80px contact-medium Avatar instead of the
56px profile size. Family portraits select the existing 32px stack size instead
of 40px stack-large. Feature labels use the 14px supporting-text size and leading
instead of the 16px field-value size, retaining Medium weight. All changes use
shared Avatar inputs and existing text tokens; parent overlap wrappers and gaps
remain page-owned. No component internals are overridden. Welcome behavior, syntax
and whitespace checks pass; visual review remains with the user.

Background clarity (11 October 2026): removed backdrop blur at user request.
The invitation retains its 32% dimming layer over the shared Chrome backdrop.
Whitespace checks passed; visual review remains with the user.

Plain close action (11 October 2026): Welcome now selects the shared Action's
registered plain variant. It has transparent paint with no border or shadow and
retains the icon-only 44px hit area, 10px padding, 20px icon, accessible label and
shared focus/press/disabled behavior. The Action catalog includes canonical plain
icon and labeled specimens with owner-level interaction states. Page layout owns
only placement; no internal Action override is added. Existing Action/Welcome
tests and catalog checks pass; visual review remains with the user.

Benefits heading refinement (11 October 2026): “What you get” now uses the
existing 12px Regular caption role instead of 14px supporting text. The heading
remains page-owned. Whitespace checks passed; visual review remains with the user.

Benefits label placement (11 October 2026): moved “What you get” into a 12px
caption pill on the benefits container’s top border, using a native fieldset
and legend. The page-owned group uses the existing border, surface, soft-action
color and spacing tokens. Its shared Avatar children remain unchanged. Welcome
behavior and source checks pass; visual review remains with the user.

Stack and pill refinement (11 October 2026): reduced the family portrait overlap
from 12px to 4px using parent wrappers. The benefits pill now uses 10px uppercase
text with 2px vertical and 8px horizontal padding. Existing Avatar roots and
geometry remain unchanged. Whitespace checks pass; visual review remains with
the user.

## Acceptance notice instead of checkbox — 11 October 2026

The footer now says “By proceeding, you accept all Terms & Conditions”, centered
in the existing 12px caption style above Accept invite. Clicking Accept invite
proceeds directly to number verification; no checkbox or checkbox error is shown.
The Terms & Conditions destination remains a no-op prototype link. Story playback
no longer targets or resets the removed checkbox.

The inline terms link uses the shared Action's registered link variant, which
inherits surrounding text typography, has zero inset and no visible container,
and uses the existing action color. A canonical inline specimen and interaction
metadata cover live, hover, active and keyboard focus. Native anchor semantics
and shared press feedback remain; caller owns the destination. Default Action
spacing selectors exclude this inline configuration. Other variants retain their
existing dimensions. The page owns only paragraph alignment and footer gaps.
Welcome and playback checks pass (29 tests), with catalog and whitespace checks.
Browser visual review remains with the user.

Backdrop emphasis (11 October 2026): increased the invitation overlay opacity
from 32% to 50% at user request, retaining the unblurred background. Whitespace
checks passed; visual review remains with the user.

Modal position (11 October 2026): shifted the modal 24px upward by changing
its parent layer’s top/bottom insets from 96px/32px to 72px/56px. Available height
and modal internals remain unchanged. Whitespace checks passed; visual review
remains with the user.

Modal position refinement (11 October 2026): reduced the upward shift to 12px
from the original position, using 84px/44px top/bottom parent insets. Whitespace
checks passed; visual review remains with the user.

Section breathing room (11 October 2026): increased the page-owned hero bottom
space from 20px to 32px before the benefits box, and the benefits-to-terms gap
from 12px to 20px. Shared child internals remain unchanged. Whitespace checks
passed; visual review remains with the user.

## Modal entrance in the flow — 11 October 2026

The invitation scales from 92% to 100% while fading in over 420ms; the dimming
layer fades in over 280ms. Playback prepares the modal invisibly before bringing
in the home screen, then starts the entrance after the screen push completes.
The existing opening hold remains 2200ms, including the entrance, before the next
tap. Re-entering the step or looping resets and replays it. The page-owned
TurboWelcomePlayback adapter supplies reset/enter/show/pause/resume; flow pause
and resume control the modal animations as well as action timing. Standalone
opening and reopening use the same entrance. Static locked previews remain fully
visible, and deterministic walkthrough snapshots show the final entrance state.

Reduced motion shows the modal immediately at full size. Dialog semantics, white
surface, insets, focus containment and all registered children are unchanged;
transform/opacity animate only the page-owned dialog and backdrop layer. Node
tests cover entrance configuration, timing handoff, pause/resume, reset/replay,
static snapshots and reduced motion. Welcome, playback, story and walkthrough
checks pass (50 tests); browser motion review remains with the user.

Invitation naming (11 October 2026): the modal heading now displays only the
configured sample name, “The Sharma’s”, without appending “Family Hub”. The flow
introduction uses the same name. This changes page-owned copy only; registered
components and modal layout retain their existing contracts. Source and Welcome
behavior checks pass; visual review remains with the user.
