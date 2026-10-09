# Turbo Hub case-study video

1920×1080, 30 fps, 20 seconds, silent. Skia on Metal, encoded as H.264.
The copy describes the product proposition and intended experience, not measured
launch impact. All changes are in the video project; product components are unchanged.

| Time | Scene | Content |
| --- | --- | --- |
| 0–3s | Problem | Shared money. Different needs. |
| 2.7–7s | IntroducingTurboHub | One family. One shared hub. |
| 6.7–10s | SpendingVisibility | See where money goes. |
| 9.7–13s | MemberBoundaries | Set clear boundaries. |
| 12.7–16s | IndependentPayments | Their money. Their way to pay. |
| 15.7–20s | Outcome | More freedom. Clear boundaries. |

Adjacent scenes crossfade over 0.3s. The named CLI scenes allow seeking to or
exporting individual sections. Original long screen exports pan inside a clipped
phone stage; the video does not record live prototype interactions.

From the repository root:

```sh
./videos/fframes timeline
./videos/fframes inspect --fail-on warning
./videos/fframes preview 0s
./videos/fframes render -o turbo-hub-case-study.mp4
```

Preview requires a normal desktop session or Metal access outside the Codex sandbox.
Review composition, transitions and reading pace manually. No agent browser or
visual review is performed under the repository policy.

## Sources

- Copy: `Turbo Hub/script.js`, especially the product, relationship and outcomes
  sections. The final benefit is explicitly an intended experience.
- Screens: original `spends.png`, `members.png`, `payment-review.png` exports from
  `Turbo Hub/prototypes/shared/references/figma/`. Their source frame IDs and export
  provenance are recorded in that folder's README. These are the existing Figma
  reference exports, rather than captures of the latest coded prototype.
- Illustration: `Turbo Hub/assets/family-avatars/family-home.png`.
- Typography: bundled `Turbo Hub/fonts/Inter/InterVariable.woff2`, losslessly
  decompressed to TTF with fontTools for fframes, which requires TTF/OTF fonts.
- Palette: `Turbo Hub/app-design-system/tokens/primitives.css` (`--th-ink`,
  `--th-muted`, `--th-blue`, `--th-canvas`, `--th-blue-light`, `--th-line`) and
  `tokens/semantics.css` (`--chrome-backdrop-base`). Video composition sizes are
  appropriate for 1080p; original screen component styling is preserved in images.

`src/lib.rs` owns scenes and animation; `src/main.rs` owns the Metal/encoding CLI.
Assets are copied into `media/` for a self-contained project. Recopy the source
exports when those designs change. Generated MP4s and the build cache are ignored.
