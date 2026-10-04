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

Follow the repository AGENTS.md manual browser review policy. Browser testing,
screenshots, visual inspection and inspector audits are performed by the user
unless explicitly requested from the agent. This overrides the installed
workflow's default browser verification steps; document outstanding visual review.

New visuals should extend the existing design language. Reuse suitable registered
components and tokens; register genuinely reusable additions with their source
and specimens. New icons must match the existing Phosphor family and be registered
through the app-owned provider and semantic mapping so Iconography can discover
them. Supply supported weights and keep colors inherited through currentColor.

When adding or refining an independently responsible UI component, register its
shared implementation and real specimens in the DS as part of the same task.
Multiple consumers are not required. Screens and studio previews must consume
the same renderer; independently interactive child controls need their own
registered owners. Keep generic page arrangement and preview tooling app-owned.

## Component reuse audit

Reuse registered components through their supported API without page-specific overrides to their roots or internal parts. If a different treatment is needed, add a documented registered shared variant with canonical specimens, or build an explicitly page-owned element that does not masquerade as the registered component. Parent layout may own external gaps, grouping surfaces and separate separators, but must not add internal styling or pseudo-elements to registered children. Audit each screen touched against this rule and record findings. Keep browser and visual verification with the user unless explicitly requested.
