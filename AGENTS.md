# Project workflow

## Manual browser review

Leave browser testing and visual review to the user unless they explicitly ask
the agent to perform them. After making changes, report what changed and provide
the relevant preview URL or files for manual review.

Do not open, navigate, reload, screenshot, or automate a browser for verification
by default. Do not run browser-based tests or the visual spacing inspector by
default. A supplied screenshot or preview URL identifies the task; it does not
authorize browser testing. Quick source, syntax, or catalog checks are allowed
when useful. Report verification accurately; never imply manual review occurred.

This user-requested policy takes precedence over default browser verification
steps in the design system workflow. Studio startup may still use HTTP requests
to confirm the configured attachment and server responses.

## Turbo Hub design system

For Turbo Hub UI changes, follow Turbo Hub/app-design-system/AGENTS.md and its
linked workflow. Reuse existing components, tokens, and registered icons.
