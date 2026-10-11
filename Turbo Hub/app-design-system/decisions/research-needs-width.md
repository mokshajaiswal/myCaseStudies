# Research needs grid width

The Control, Visibility, Access and Independence cards stay within the case study's existing content column (`--content-width: 58rem`) instead of using the 70rem breakout width. Removed `.experience-grid` from the wide structured-content rule; its normal block sizing now follows the parent reading column.

This is page-owned outer layout. Existing card padding, typography, badges and gaps remain owned by their current implementation, with two columns on desktop and one at the existing mobile breakpoint. Source review confirms no registered child overrides were added. Browser and visual review remain with the user.
