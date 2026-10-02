# Hub Details footer artwork

“Manage spends together” uses Phosphate Solid and appears at the bottom of Spends, Members and Analytics. This supersedes the earlier Members-only decoration decision.

The Hub Details page appends one shared, noninteractive artwork after each tab’s content. The pale-gray lettering is outlined from the installed Phosphate Solid font in assets/manage-spends-together.svg. SVG paths preserve the typeface across devices without requiring an installed font or shipping the system font file. The yellow lock remains page-owned CSS decoration. The whole artwork is aria-hidden.

The user clarified that the gaps between text lines should tighten, then requested bottom placement and an 8px size increase. After a subsequent 4px reduction, lettering is 52px; baselines advance 42px, preserving the tighter inter-line spacing. Lettering bounds are 342 × 136px. The lock circle is 46px, with a proportionally larger shackle.

The scrollable content and panel use vertical flex layout. The artwork’s auto top margin uses spare space to align it at the bottom, with 32px minimum clearance from preceding content and 8px panel bottom padding. Longer tabs scroll to the artwork after their content. It does not overlay content or the home indicator. Existing horizontal insets remain 24px; registered controls and their typography are unchanged.

Verification: actual Chrome previews of all three tabs have exactly one artwork, as the panel’s last child. The SVG previously loaded at 342 × 148px with no horizontal content overflow. Visually inspected the enlarged Members footer at the bottom of the phone. The subsequent 4px size reduction passes JavaScript syntax and whitespace checks.

Spends spacing follow-up: minimum clearance between Show all transactions and the artwork increases from 32px to 80px after two 24px increments (--th-space-8 plus two --th-space-6 units). Members and Analytics retain 32px. Bottom alignment and lettering dimensions stay unchanged.
