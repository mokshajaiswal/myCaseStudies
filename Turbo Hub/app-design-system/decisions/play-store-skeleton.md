# Simplified external Play Store fixture — 6 October 2026

Source: [user-supplied PayZapp listing](https://play.google.com/store/apps/details?id=com.hdfcbank.payzapp&hl=en_IN).
The listing supplies the official icon, title, developer, rating, reviews,
download count, content rating and Finance category. These are a dated snapshot.
The capability summary is paraphrased. Secondary screenshots and data-safety
content intentionally use quiet static skeletons instead of fabricated details.

Reuse audit: this remains the existing documented external-app exception, like
WhatsApp, rather than a Turbo Hub product screen. It keeps the shared phone shell,
viewport geometry and unchanged light Status bar. Navigation glyphs now use
registered TurboIcons; no new icon geometry or shared control overrides were added.
Page-owned store styles use existing spacing/type primitives with local store
colors. Removing the shared Chrome backdrop class preserves the external white
surface without overriding registered Chrome internals. The local Install/Open
behavior and Hub welcome destination are unchanged. Reduced motion skips the
fill animation. The official icon is bundled with provenance in assets/README.md.

JavaScript syntax, asset/source checks and existing story source tests passed.
Browser, keyboard and visual review remain with the user.

Icon boundary refinement: the page-owned app image now has a 1px gray outline
and border-box sizing, retaining its 72px size and existing rounded corners.
This separates the white icon background from the white store surface.
