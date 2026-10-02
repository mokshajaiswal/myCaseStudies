# Run DS — follow this design system

Referencing this file or saying “run DS” for this attachment means follow its
design system for the current task and related follow-ups in this conversation.
No extra “follow the DS” instruction is needed.

Read AGENTS.md here and follow its linked installed workflow. Read BRIEF.md,
the relevant registry.json entries and implementation files, plus USAGE.md or
a local checklist when present. Reuse matching shared components, tokens and
icons; do not create lookalike copies. Keep one-off layout app-owned.
Review spacing inside and between components on new or rearranged screens
using the available inspector. Report unavailable visual checks honestly.
Follow the app’s review policy and explicit constraints. Do not migrate
unrelated screens or override a later request to use another design system.

If a task accompanies this reference, carry it out using this DS. For a
standalone reference or “run DS”, start or reuse the studio:

1. Read studio.config.json beside this file. Resolve studioRoot and appRoot
   relative to that config; use its configured port unless overridden.
2. Before reusing a server, verify /api/studio identifies this attachment.
   Leave other services running and choose another port if needed.
3. Run node "<resolved studioRoot>/studio.js" start --config
   "<absolute path to this studio.config.json>" in a persistent terminal.
   Put both arguments on one command line; add --port when needed.
4. Verify the studio page and /design-system/registry.json respond, keep
   the server running, and return the working preview URL.

This file is app-owned. Studio updates do not overwrite it. Detailed workflow
instructions remain in their linked sources rather than being copied here.
