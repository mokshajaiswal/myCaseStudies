# Invitation entry

Figma design context and screenshot inspected on 2 October 2026: frame 419:29279, Whatsapp Invite, file IJU02E1n5jSddJqd3SpkG7. The source establishes Arun Sharma as inviter, The Sharma’s family Hub as destination, family imagery and a PayZapp entry link. It shows Kavya as recipient. The prototype addresses Neha to connect consistently to the already implemented Neha member profile; this is an explicit demo-content adaptation.

The proposed Flow References invitation entry uses that content inside the established Turbo Hub DS shell rather than reproducing WhatsApp controls. Navigation, Page header, Hub summary, Avatar and Action are reused unchanged. The invitation preview, copy stack and actions are parent-owned arrangement, not new controls. Generic illustrations/initials follow BRIEF.md. The source frame export appears only in the reference comparison, never as product UI.

Open Hub in PayZapp leads to the local member profile for the existing-user case. It does not send an invitation, open the supplied public deep link, authenticate, or change membership. New-user entry remains a separate unfinished flow and carousel onboarding is excluded.

Registered in Overview and linked from Flow References. Browser verification confirmed inviter/Hub/recipient copy, loaded comparison image, no horizontal overflow at logical 390px, 24px external content gap, and keyboard activation reaching member-profile/index.html. Syntax and catalog validation passed with zero errors; 25 registered components and 25 screens. Flow References has 26 available previews, four unfinished suggested cards.

New-user entry now uses `?audience=new` on the same renderer. This is a single landing screen with the invitation context, a Create PayZapp account action, and an existing-account return link. It contains no carousel and does not edit the excluded onboarding work. Create account explicitly reports that account setup is not included; no registration, authentication, documents or live external operations are simulated. An external case-study link can preview the member profile after account setup. The proposed entry is grounded in the previously inspected WhatsApp invitation and follows the DS shell; it does not claim a source-identical app screen.

Reuses the same registered controls unchanged, with page-owned copy and routing. Browser verification exercised account-setup placeholder feedback and the existing-account return via Enter. Registered in Overview and linked from the new-user Flow References card. Catalog validation passed with zero errors, 25 components and 30 screens. All 30 Flow References cards now have available full-page previews; this route count does not establish completion of undefined backend operations or replace the final full-flow audit.

## WhatsApp chat exception (4 October 2026)

Per review, the existing-user invitation now reproduces the Figma WhatsApp chat (419:29279)
instead of a DS-shell adaptation: iOS-style header (back, contact avatar, HDFC Bank ·
Business account, video and call glyphs), patterned chat wallpaper, Today pill, encryption
notice, an incoming white bubble with a link preview (family-home artwork, "Join your
family", A/K/N/R avatars), the invitation copy and the pzlive link, then a composer bar.
The message is shown as incoming (left, white) because this is the recipient's phone; the
Figma frame shows the sender's outgoing green bubble. Preview and link open the member
profile, as before. All WhatsApp styling is page-owned under .wa-*; the shared chrome
backdrop class is removed after the preview script adds it. The Phone status bar uses the
new registered tone='light'. ?audience=new keeps the earlier DS-shell new-user entry, now
outside the case-study story. Visual review pending with the user.

Lock screen: payment-notification?kind=invite shows Neha's 5:06 lock screen with a WhatsApp
notification (registered Payment request notification, new mark='whatsapp') linking to
the chat. Registered as screen invite-notification.
