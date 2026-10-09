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
