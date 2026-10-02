# App-owned design system

Read studio.config.json in this directory. Resolve studioRoot relative to that file.
Before each DS task, read <studioRoot>/framework/AGENT-WORKFLOW.md and
<studioRoot>/framework/CONTRACTS.md in full, then this folder’s BRIEF.md, registry.json
and decisions/. The shared workflow is loaded from the installed studio, not copied.

Use the existing screens identified by the user in place. No inbox or relocation.
Keep this app’s tokens, components, registry, specimens and decisions in this folder.
App-specific instructions here and existing app instructions remain app-owned.
Do not edit studio code to customize this app. Never overwrite unrelated files.

Every new Turbo Hub screen must follow decisions/screen-layout.md: continuous blue chrome and a light content surface with 24px top corners. Reuse shared phone-preview styles; do not introduce flat transitions by default.
