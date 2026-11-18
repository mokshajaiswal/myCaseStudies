# Run the studio for turbo-hub-film

This folder holds the turbo-hub-film films: `scenes/` (one folder per film), `notes/` (the editor's notes and "To check"
lists) and `out/` (exports and rendered frames: keep it out of git). The studio itself is `.`; its own guide is
its `RUN-STUDIO.md`. Run every command below from `motionStudio/`.

## Every time
1. Start the studio for turbo-hub-film:
   ```bash
   npm run dev -- --project ../turbo-hub-film
   ```
   It prints `Motion Studio → http://localhost:5173/editor/ (project: …)`. Another studio already on 5173? Put
   `PORT=5174 ` in front. In Claude Code you can also add this command as an entry in `.claude/launch.json`.
2. Start the notes watcher, so **▶ Send to Claude** works: in a Claude Code session, say
   > Start the notes watcher for turbo-hub-film.

   Claude runs this in the background (it exits when you press Send; Claude works the notes and starts it again):
   ```bash
   node tools/wait-for-notes.mjs --project ../turbo-hub-film
   ```
3. Open the editor at the address it printed and pick a film at the top.

## Other commands
Every studio command takes the same `--project ../turbo-hub-film`:
```bash
npm run render -- turbo-hub-explainer --frames 0,100 --project ../turbo-hub-film
npm run render -- turbo-hub-explainer --project ../turbo-hub-film
npm run new-scene -- my-next-film --project ../turbo-hub-film
```
Frames go to `out/<film>-frames/`, videos to `out/`, new films to `scenes/`. Check a watcher is running with
`pgrep -fl wait-for-notes` (its command line names the project).
