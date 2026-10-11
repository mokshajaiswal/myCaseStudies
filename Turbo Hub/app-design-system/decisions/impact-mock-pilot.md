# Impact mock pilot results

11 October 2026. The user requested temporary, encouraging but modest pilot
results in the existing Impact & future format, to replace when MoEngage data
becomes available. The user subsequently confirmed rollout to approximately
10,000 selected existing PayZapp users based on payment patterns and persona fit.
That audience figure is user-provided; all downstream counts remain working
assumptions, not measured results.

## Cohort and calculation assumptions

Enrollment spans three months. Follow-up extends beyond enrollment as needed;
eligibility is evaluated separately for each metric, rather than treating every
participant as having 90 days of usage.

| Measure | Mock counts | Display |
| --- | --- | --- |
| Rollout segment | Approximately 10,000 existing users identified as potential managers | Central highlight; user-provided |
| Enrollment | 3,000 created Hubs; 6,000 unique invited members, all with 30 days of follow-up from enrollment or invitation respectively | Manager/invitation callout |
| Joining | 4,800 of 6,000 invitees joined within 30 days | Funnel callout |
| Member activation | 3,840 of 6,000 invitees joined and made a first successful Hub payment within 30 days of invitation | 64%; counts in bubble |
| Repeat family usage | 2,000 activated Hubs have 60 days of follow-up from first successful payment; 1,160 pay again in the second 30-day period | 58%; counts in bubble |
| Household payment activity | 2,400 of 3,000 created Hubs made at least one successful payment within 30 days of enrollment | 80%; counts in bubble |
| New-user acquisition | 1,860 of the 3,840 activated invitees were new to PayZapp at invitation and registered before activation | 48.4375%, rounded to 48%; counts in bubble |

The assumed Hub creation rate is 30% of the selected manager segment, with two
unique invitations per created Hub. This scales the earlier working cohort tenfold
without treating all 10,000 selected managers as Hub creators or family invitees.

The 2,400 activated Hubs have a complete first 30-day payment observation window;
2,000 also have a complete second window. The remaining 600 created Hubs have not
made a successful Hub payment. Each 30-day payment period is anchored to the
Hub's first successful payment: elapsed days [0, 30) and [30, 60). The latter is
described as days 31–60 in the visible copy. Only successful, unreversed payments
are included in these mock counts; invitations and transaction IDs are deduplicated.

Payment activity now measures household payment participation, not transaction
frequency. The earlier 7.2 average came from 2,563 payments across 356 active
Hub-periods; it has been removed from the visible section. New-user status is
fixed at invitation, not inferred from
the latest profile. The activation funnel loses 1,200 people before joining and
960 between joining and paying, supporting the callout about the largest
drop-off. No real baseline, experimental effect or activation uplift is claimed.

## Replacement and ownership

All section copy, values, labels, accessibility text and retained definitions
are in `script.js` → `caseStudy.impactFuture`. The page-owned renderer in
`impact-future.js` now reads the eyebrow and notes label from that same object,
so it no longer hardcodes the old illustrative-target wording.

Replace the mock counts, observation windows, cohort text, interpretation and
future priorities together once exports arrive; add actual enrollment dates and
an as-of date when available. Do not convert assumed targets into a measured
baseline.

The user's subsequent instruction explicitly removes visible placeholder labels
to preview the section as it would read with final data. Intro, eyebrow, captions,
accessibility text and future copy follow that presentation. The four headline
values are percentages. The latest instruction adds the scaled counts and exact
denominators to explanation bubbles. A subsequent refinement makes the approximate
rollout audience the center statement: “Approximately 10,000 selected PayZapp
users.” under “Segmented Rollout across three months”. The introduction retains selection
context without repeating the number. The existing measured headline height
continues to position the lower cards; no layout or shared component changes.

The latest copy refinement rounds visible counts to the nearest hundred and
qualifies them as approximate: around 3,800 activated invitees, around 1,200
returning families and nearly 1,900 new users. Already-rounded figures such as
3,000 managers and 6,000 invitations also use “around” or “roughly”. Percentages
remain calculated from the unrounded working counts in the table above, not from
the rounded prose. The retained definitions keep those exact counts internally.
This document retains
the fictional provenance and exact denominators for eventual replacement. The
48% figure is the share of activated invitees who were new users, not acquisition
growth or a claim that 48% of every invitation activated a new customer.

The existing colored selection frames, speech captions, animations and responsive
layout are retained. Catalog review found this is an existing page-owned editorial
composition; no registered product component internals or token values change.
Source syntax, arithmetic and diff checks are appropriate for this copy change.
Browser testing and visual review remain with the user under the project policy.
