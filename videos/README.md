# fframes videos

The Turbo Hub video lives in `case-study-video/`: 1920×1080, 30 fps, twenty seconds,
using the Skia renderer on Metal. It introduces the problem, the shared Hub,
spending visibility, member boundaries and independent payments, then closes on
the intended experience. It is silent. Edit `case-study-video/src/lib.rs`; put
images, fonts and sound in `case-study-video/media/`.

Run from the repository root (the launcher supplies the Rust tool paths):

```sh
./videos/fframes timeline
./videos/fframes inspect
./videos/fframes preview 0s
./videos/fframes render -o turbo-hub-case-study.mp4
```

The preview opens a native window. Space pauses, h/l seek, j/k step frames, q quits.
Codex must run the CLI with permission to access Metal outside its sandbox;
otherwise the generated CLI reports `Failed to create Metal device` even for
`timeline` and `inspect`. Normal terminal use has GPU access.
Relative output paths resolve inside `videos/case-study-video/`. Generated renders
and the build cache are ignored by Git. `Cargo.lock` pins the dependency versions.

The official `fframes-video` Codex skill supplies the authoring workflow. Ask Codex
to make or edit a video here, describing the content, duration and format. Follow
the repository's manual-review policy: leave visual review to the user unless
explicitly requested. Use `timeline` and `inspect` for routine CLI validation.

To create another project:

```sh
PATH="/opt/homebrew/opt/rustup/bin:$HOME/.cargo/bin:$PATH" \
  cargo fframes new another-video --dir videos/another-video --format landscape --fps 30 --yes
```

Setup on a fresh Mac:

```sh
brew install rustup pkg-config ffmpeg x264 x265 opus nasm ninja
export PATH="/opt/homebrew/opt/rustup/bin:$HOME/.cargo/bin:$PATH"
rustup default stable
cargo install --locked cargo-fframes --version 1.2.0
```

## Turbo Hub motion explainer (Motion Studio)

`motionStudio/` is a local clone of [Motion Studio](https://github.com/ishantperiwal/motionStudio), a
GSAP-based studio with a frame-pinned notes editor. It is the tool only and is ignored by this repository.
Its `project.txt` points at `turbo-hub-film/`, which holds the Turbo Hub films (`scenes/`, `notes/`, `out/`)
and is tracked here. See `turbo-hub-film/RUN-STUDIO.md`. Start it with `npm --prefix videos/motionStudio run dev`
and open http://localhost:5173/editor/#turbo-hub-explainer@0. Exports need `ffmpeg` on PATH.

Two scenes: `turbo-hub-explainer` is the sketch animatic; `turbo-hub-film` is the finished film (1208×1388, 4× the
302×347 card, 23 s, seamless loop). Its phones are the real HTML prototypes, embedded through the `th` link in the
scene folder (→ `Turbo Hub/`), so its prototypes, design system, avatars, fonts and Figma exports are served with it.

## Turbo Hub card hover video

`turbo-hub-card/` is a separate Remotion project for the 12-second loop that plays on the Turbo Hub
case study card. It needs only Node. See `turbo-hub-card/README.md`.
