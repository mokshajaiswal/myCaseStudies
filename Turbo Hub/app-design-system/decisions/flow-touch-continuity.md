# Flow touch-dot continuity

The user requested that the tap dot stay where it last tapped between screens,
rather than leaving to the side and entering again. Playback now owns one shared
presentational dot on the stationary flow rail, above the screen layers. Screen
activation clears the tap pulse and fades the dot out over 180ms while retaining
its coordinates. The incoming screen's entry, idle, onboarding, installation and
success holds keep it hidden; the first movement, drag or tap reveals it.
On each reveal by movement, the dot now starts 80px horizontally from the target
(scaled with the phone) and approaches while fading in over 550ms. Direction
selects the side with more room inside the phone. This replaces arrival from the
last screen's coordinates, which could produce almost no visible movement when
targets were close. Subsequent moves while visible still travel directly between
targets. Loop restarts, hidden installation waits and manual step changes use the
same approach rule.

Target coordinates are measured relative to the rail; scaled iframe targeting,
range dragging, content scrolling, pause/resume and reduced-motion behavior retain
their existing contracts. Screen push transitions move only the product screen
layers. The dot is case-study playback tooling, not a product control; registered
Actions, inputs and Success indicator renderers remain unchanged.

Node tests cover continuity in invitation, children invitation, WhatsApp joining,
activation and payment flows; entry/idle holds, repeated loops, one dot per flow,
and a rail origin different from the phone. Fade duration stays at 180ms independently
of normal movement (550ms) and dragging (100ms); arrival combines the 550ms slide
and fade. Its Web Animation pauses/resumes with playback and cancels on a new
screen or movement. Reduced motion shows the dot directly at its target. Node
coverage includes nearby targets, scaled travel, inward direction, cancellation,
pause/resume and reduced motion. Existing story/playback regression checks pass.
Browser animation and visual review remain with the user.
