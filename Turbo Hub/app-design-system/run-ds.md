# Run DS — follow this design system

Referencing this file or saying “run DS” for this attachment means follow its
design system for the current task and related follow-ups in this conversation.
No extra “follow the DS” instruction is needed.

## Automatic setup on a fresh clone

Treat “run DS” as authorization to obtain the studio dependency, check its
prerequisites, and start this local attachment. Perform these steps yourself;
do not merely give the user installation commands. Resolve paths from this
file and studio.config.json, never from an assumed working directory.

The studio is maintained separately at
https://github.com/ishantperiwal/ds-starter.git. Always run the latest commit
on its main branch, so every collaborator's studio matches this attachment
even if their local copy was cloned earlier. The last verified version is
3f260813d18131f980f540a9a382b68d9a5f70b6 (studio 0.3.1); newer main commits
are expected and should be used.
The current studioRoot is ../../.tmp-ds-starter relative to studio.config.json.
This project currently has no registered studio submodule; do not assume
that cloning this project has downloaded the studio.

1. Locate this project's Git root and inspect its .gitmodules, if present.
   If the configured studio path is registered as a submodule, run
   git submodule update --init --remote --recursive -- "<studio path relative to Git root>"
   from that root, so the submodule tracks the latest main.
2. Otherwise, if the resolved studioRoot does not exist, clone
   https://github.com/ishantperiwal/ds-starter.git into that exact path and
   stay on its main branch. Use structured command arguments or correctly
   quoted absolute paths. This fallback is a separate checkout, not a
   submodule registration.
3. If the path already exists, bring it up to date before using it:
   a. Confirm it is the ds-starter repository (origin matches the URL above,
      studio.js and the framework instruction files exist). Report and stop
      on incompatible or unrelated contents.
   b. Run git fetch origin in the studio checkout.
   c. If it has no local changes (git status is clean), check out main if it
      is on a detached HEAD at an older main commit, then run
      git merge --ff-only origin/main. This only fast-forwards; it never
      discards work.
   d. If it has local changes, local-only commits, or cannot fast-forward,
      do not reset, stash, delete, or switch it. Use it as it is and tell the
      user it is behind origin/main and why it could not be updated.
   e. Report the commit the studio is now on.
4. Verify Git and Node.js are available. This studio requires Node.js 22
   or newer. Use an available compatible runtime. If none is available,
   explain the prerequisite and follow normal software-install permissions.
   The studio uses Node built-ins and has no npm dependencies; no npm
   install is required. If a newer main adds dependencies, inspect its
   package.json and documented setup before installing them.
5. Now read the app AGENTS.md and the installed workflow it references,
   then continue with the attachment/startup steps below. Do not initialize
   a replacement design system or overwrite this app's existing content.

If GitHub authentication, repository access, or runtime installation blocks
setup, report the exact missing prerequisite; do not claim the studio is
running. Registering a submodule is a maintainer operation, not something
each collaborator needs to repeat. Studio changes must be committed and
pushed in the ds-starter repository first; then update this parent
repository's .tmp-ds-starter pointer and the last verified version above.

Read AGENTS.md here and follow its linked installed workflow. Read BRIEF.md,
the relevant registry.json entries and implementation files, plus USAGE.md or
a local checklist when present. Reuse matching shared components, tokens and
icons; do not create lookalike copies. Keep one-off layout app-owned.
Follow the manual browser review policy in the repository and app AGENTS.md:
leave browser testing and visual review to the user unless explicitly asked.
When browser review is requested, review spacing inside and between components
using the available inspector. Report pending visual checks honestly.
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
