# Video workflow

Use the installed `fframes-video` skill for fframes authoring. The starter is
`case-study-video/`, and `./videos/fframes` from the repository root runs its CLI
with the required Rust paths. Keep release builds and reuse the Metal backend.

Follow the root manual-review policy. Do not open preview windows or perform
visual review unless the user explicitly asks. Validate setup and changes with
the build, `timeline`, and `inspect`; provide a concrete preview command for
the user. Export the complete video when requested. Do not add snapshot or
visual-regression tests. Keep generated output and build caches ignored.
