# UPI Circle learning and diagnostic rollout

11 October 2026. The user supplied the project history: Turbo Hub preceded UPI
Circle, and the work's learnings and validations carried forward into PayZapp's
UPI Circle. The Learning section now tells that story in one short paragraph.
The user subsequently supplied Figma frame 2099:26186 from Portfolio 2.0. Its two
360 × 800 child screens, 2090:27202 and 2090:28560, are exported as PNG screenshots
and shown below Learning: the home-screen invitation and acceptance modal.
Source provenance is recorded in assets/upi-circle/README.md; no product UI is
reconstructed or invented.

## Official research and attribution

- NPCI product overview: https://www.npci.org.in/product/upi-circle
- NPCI 2024 launch release: https://www.npci.org.in/PDF/npci/press-releases/2024/NPCI-Press-Release-RBI-Governor-Launches-Key-Digital-Payment-Initiatives-at-Global-Fintech-Festival-2024.pdf

NPCI describes a primary user authorising a trusted secondary user to make
payments from the primary user's UPI account. The launch release distinguishes
full delegation within limits from partial delegation requiring the primary
user to complete payment. This supports the transfer of invitation, limit and
approval concepts. NPCI does not establish Turbo Hub's internal chronology or
the PayZapp design lineage; those come from the user. Copy says “built on NPCI's
framework”, without making an independently verified compliance certification
claim. Public text includes a small link to the official product overview.

## Extract reasons as well as success rates

The three early success-measure cards now include diagnostic evidence. Impact
introduces the segmented rollout as a way to uncover joining, funding and approval
friction. A three-row matrix under “What the rollout needed to uncover” connects
journey stages to evidence and questions. Questions are investigation prompts,
not invented findings. Existing percentage headlines and count bubbles remain.

Use the following extraction plan when actual exports arrive:

| Journey | Quantitative evidence | Reason evidence and follow-up |
| --- | --- | --- |
| Selected manager → Hub creation | Unique creators / selected eligible users; distinguish availability from actual feature exposure | Ask non-creators about relevance, trust and setup; do not assume lack of exposure means rejection |
| Invitation → join → activation | Deduplicated step conversions, drop-offs and first-payment time within 30 days of invitation | Capture stage/error codes; follow up with non-joiners and joined members who never paid |
| Activated family → returning family | Payment-based retention in days 31–60 and 61–90 after first payment, using mature cohorts only | Ask inactive households what stopped use, including whether there was a recurring need |
| Family participation | Distinct paying members per Hub; share of Hubs with multiple paying members | Compare roles and new/existing PayZapp status at invitation; ask who actually needed delegated spending |
| Payment attempt → completion | Successful payments / unique attempts; abandoned/failed attempts and recorded reasons | Separate technical failures, insufficient funds and spending-limit blocks; correct policy blocks are not automatically experience failures |
| Request → approval → payment | Approval and expiry rates; median and upper-percentile decision time; approved requests followed by successful payment | Distinguish explicit rejection, no response, expiry and failure after approval; include unresolved requests in outcome reporting |

Retain anonymous hub/user/invitation/request/transaction IDs, enrollment and event
timestamps, first-success dates, event stages, final status/reason, member role,
new-user status at invitation, approval policy and incentive exposure where recorded.
Use transaction records for final payment outcomes; analytics describes the journey.
Subjective reasons need short interviews or surveys, linked to the relevant journey
stage. Do not infer comprehension or intent from event absence alone.

Split the selected cohort by enrollment week, new/existing user status, role and
approval needs. Compare complete observation windows; report sample sizes and
missing reason-code coverage. The selected segment supports learning about the
intended household-manager persona, rather than an all-user adoption estimate.
Carry validated needs into the NPCI framework while rechecking implementation
assumptions around onboarding, permissions, limits, approvals and recovery.

The approximately 10,000-user segment is user-provided. Downstream counts retain
the temporary assumptions documented in impact-mock-pilot.md. This task adds no
fabricated failure rates, cause breakdowns, interviews or UPI Circle outcomes.

## Ownership and verification

Learning copy/source is centralized in script.js → caseStudy.learning. Its existing
ending renderer is retained. Success cards retain their page-owned renderer.
The diagnostic matrix is a page-owned semantic table with column and row headers,
an accessible caption, fixed fluid columns and wrapping cells. Typography, insets,
gaps and rules reuse existing editorial tokens. The source link uses ordinary
page link styling; no registered product component internals change. The screenshot
figure and wrapping phone row are page-owned editorial layout. Each screenshot uses
the existing createPhone renderer and assets/phone case clean.png casing. Phones
remain up to 280px wide; object-fit: contain preserves the full screenshot within
the existing aperture. Spacing, casing geometry, shadow and shared caption use
existing editorial tokens. No screenshot content or registered component is restyled.

Syntax, data/source-link and diff checks passed. Browser and visual review,
including table wrapping on narrow viewports, remain with the user.
