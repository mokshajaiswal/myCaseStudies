# Parents review spending — 11 October 2026

The existing tracking group now uses the shared single-phone scripted loop and
connected checkpoints. Its four scenes remain Members → Spends → Analytics →
All Hubs. Playback holds the family roster, taps Spends, holds recent payments,
taps Analytics, scrolls through its existing breakdowns and back to the top,
then taps Back to Hubs. The final list holds before repeating. The tap dot uses
the same fade and inward approach as the other flows.

The tracking fixture supplies roster='family' to all dashboard views so joined
member counts remain consistent across tabs. Dashboard's existing Navigation
back action now opens the Hubs list instead of the developer reference page,
including standalone previews. Tabs and navigation receive visual taps only
during playback; the parent switches between isolated locked fixtures without
clicking links or changing browser history.

Analytics scroll actions use fractions of its actual scroll range, updating at
30 steps per second through the existing pausable action queue. Pause, resume,
manual selection, repeated playback and walkthrough seeking retain their timing
and reset contracts. Other views reset to their top; Members keeps its existing
staged list position. The fixture data remains the existing illustrative data.

Reuse audit: registered Navigation, Tabs, Summary, Limit, Member, Transaction row,
Chart and Hub entry implementations are unchanged. Flow checkpoint supplies the
existing connected path. Only page-owned narrative, fixture selection and playback
changed; no product component internals or spacing tokens are overridden.
Static presentation remains available by removing the playback and loop flags.

Node checks cover four-screen order, tab targets, joined-roster context, analytics
scroll bounds, pause/resume, return, resets, seeking and no native activation.
Source syntax, catalog and whitespace checks pass. Browser motion, scrolling,
responsive layout and visual review remain with the user.

Preview: http://127.0.0.1:5500/Turbo%20Hub/index.html#scene-tracking-flow
