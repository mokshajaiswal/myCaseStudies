# PayZapp onboarding walkthrough

Standalone implementation of the selected Figma NTB walkthrough frames:
11623:167259, 11623:167608 and 11623:167958 in DiQaOTv1JPam24uFN0GwTy.

Open preview.html for a device preview or index.html for the embeddable flow.
A 1.6-second splash uses the original animated GIF from Figma file
QNc5WWAGgH0PKr3z42BP3N, node 4:826, saved locally as assets/splash.gif.
Its complete white-screen artwork scales without cropping, with the status bar
hidden during the splash. Story resets restart the animation. The carousel begins on screen one
after the splash. The three screens advance every four seconds and cycle back to the first. Dots,
swipes and arrow keys select a screen and restart the interval. Each incoming
illustration restarts its GIF playback as the screen begins sliding in, including
on repeated loops. The exported .png files contain animated GIF data. Background tabs
and keyboard focus pause the timer; reduced motion leaves manual navigation.

The source geometry scales uniformly from 360 × 640; the canvas extends to the
available viewport height. The shared Chrome backdrop fills the viewport, and
the CTA is anchored 24 logical pixels above its bottom edge. Figma illustrations
are local.
The CTA uses the registered TurboUI.button inverse variant unchanged. This
retains the shared 56px height, 12px radius, action color and shadow instead of
introducing page overrides for the source's 52px/14px treatment.

“Let’s Get Started!” dispatches payzapp:onboarding-start with detail.slide and
source. A same-origin iframe also posts type: payzapp:onboarding-start. Validate
origin and source when integrating. No destination or case-study slot is wired.

Source/syntax and local asset checks only; browser review remains with the user.

## Installation flow integration

Play Store Open links here with ?next=hub-welcome. Get Started then opens the Hub
welcome invitation. The case-study WhatsApp invitation flow includes this splash
and carousel checkpoint after installation. Locked story timing is owned by the
parent playback queue; the standalone carousel remains cyclic.
