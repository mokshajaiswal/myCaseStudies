# Chrome backdrop

One decorative backdrop. No variants, text, controls or content API. The catalog shows a single empty background through specimens/backdrop.html. Preview size belongs to the specimen, not the component.

Sources: components/chrome-backdrop.js and components/chrome-backdrop.css. TurboUI.chromeBackdrop() returns an empty background element. TurboUI.chromeBackdrop({host:element}) paints an existing host without adding or replacing content. The parent owns dimensions, clipping and layout. All four phone prototypes adopt their existing phone-screen through the shared preview helper.

Appearance remains centrally controlled by --chrome-backdrop-base, --chrome-backdrop-patch and --chrome-backdrop. Optional motion uses global --chrome-backdrop-motion-state (paused by default), duration (20s) and intensity (.18). No per-instance motion choices. Reduced motion disables animation.

The backdrop never owns foreground color. Navigation and Page header own white chrome text; light content inherits normal ink, fixing Pay Using and The Sharma’s.

Navigation and Page header specimens show their own controls against this background. Those are examples of those components, not backdrop variants. The backdrop’s own preview is empty.

The catalog requires a states entry, so default is its sole presentational state, without an interaction or variant. Catalog validation passes. Runtime reduced-motion emulation remains unverified.

Status bar fill removed (4 October 2026): the Phone status bar no longer paints its own
--color-action background; it is transparent and the screen backdrop shows through. The
Chrome backdrop override that reset it to transparent is removed. Navigation and Page header
were already transparent. Specimen now shows the default tone on the backdrop.
