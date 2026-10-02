# Spending-limit editor

Proposed Flow References editor, using inspected Figma 397:49288 Hub setup form as the related layout reference. Figma supplies the form hierarchy and shared shell; monthly-limit summaries in Hub/member references establish existing amounts. The exact editor, its selectable subjects and validation are prototype decisions, not an exact source screen. The comparison panel labels this distinction.

Unchanged Select, Text field, Action, Notice, Navigation, Page header and Phone status bar render the UI. Screen layout owns 24px content inset and 16px form gap. Only monthly periods are supported. The caller owns target, input, validation and session storage. Save accepts plain decimal amounts ₹1–₹10,00,000 with at most two decimal places; formatted commas are not accepted. Changing subjects loads the saved/default amount and clears stale feedback. No new controls or component variants were introduced.

Saved limits live in `turbo-hub-spending-limits` for this local demo session. Hub dashboard consumes the Hub limit and Arun's displayed member limit. The Kavya profile consumes her saved limit, and the tag-added view consumes all four subjects. Pending/absent member summaries do not acquire invented visible limit fields. No bank limit or account permission is changed. Members without existing displayed limit summaries remain represented by their established page behavior.

Browser verification: zero produces native field error association/focus; ₹75,000 saves with a Notice confirmation; reload restores the saved input; Back to Hub shows ₹75,000 in the summary. Source reference loads. Syntax and catalog validation passed with no errors (25 components, 28 screens). Flow References now has 28 previews and two unfinished cards: new-user entry and geofence setup. Carousel onboarding remains excluded.

Final integration verification: saving Kavya's limit as ₹42,000 updates both the profile's circular limit and her member card on the tag-added view. Shared components remain unchanged.
