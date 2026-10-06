# Hub welcome layout — 6 October 2026

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
