# Spending limit during invitations

Invitation embeds omit the page-owned Limit for selector: the invitation supplies
the recipient. Target selection uses TurboStoryContext.member instead of always
using Neha. Rohan uses his ₹10,000 default; Neha retains ₹5,000. The standalone
Hub editor retains recipient selection, including Rohan. Registered Select and
Slider APIs are reused without internal overrides. Playback no longer addresses
the absent selector. Source checks and the 38 story/playback tests passed; browser
and visual review remain with the user.
