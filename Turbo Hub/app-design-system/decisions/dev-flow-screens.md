# Development access to autoplay flow screens — 6 October 2026

The case study’s `dev=true` view exposes View all screens beside each autoplay
preview. A native modal overlay reads the chosen flow from the existing story data and
reuses `TurboFlowStory.render({flowId})`, displaying its ordered fixtures side by side
without sequence playback. The dialog is transparent and unboxed, with no repeated
narrative, headings, captions or summaries. Screens scale to the viewport height
and remain in a horizontally scrollable strip at every viewport width. Full-page links use the editorial button treatment,
preserve declared prototype route parameters and open standalone screens.
Close, Escape and backdrop dismissal return to the case study; focus returns to
the opener. A Close control sits above the strip at the top right.
The intermediate flow-screens page has been removed.

Reuse audit: this is editorial preview tooling and parent layout, not a new
product screen or control. It reuses the editorial playback-control treatment,
phone slots, full-page links, lazy mounts and existing case-study
tokens. Embedded product screens continue to use their unchanged registered
renderers. No component-root/internal overrides or new icons were added.

Source/syntax checks and story/playback tests cover dev-only exposure, flow
selection, ordered screen access, unchanged standalone routes, modal opening,
close/focus restoration, unique IDs across overlays and retained playback behavior. Browser, keyboard and visual review remain with the user.
