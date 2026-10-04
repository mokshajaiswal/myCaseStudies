# Family avatar artwork

All generated profile images and the Family Hub house live here:

| Identity | File |
| --- | --- |
| Arun / Arun Sharma | `arun.png` |
| Kavya / Kavya Sharma | `kavya.png` |
| Neha / Neha Sharma | `neha.png` |
| Rohan / Rohan Sharma | `rohan.png` |
| Family Hub / the Sharmas | `family-home.png` |

The Avatar renderer resolves these names centrally through
`TurboUI.avatarArtwork` in `../../app-design-system/components/hub.js`.
Names ignore case and extra spaces. Existing member cards, Hub identities,
Hub entries, invitations and editable portraits inherit the same mapping.
Explicit `src` wins; unknown names keep their existing initials or icon.

To replace the visual direction, replace these five files using the same names.
No changes to individual screens are needed. This folder can be copied as a
complete reference set. `prompts.json` records every built-in ImageGen prompt
and the original family-character references. The original full-body story
artwork remains in `../flow-story/`.

Portraits and the house use square pastel backgrounds, with no text or product UI.
Existing Avatar sizes and image containment preserve their aspect ratio.

The four active portraits use tighter face framing (approximately 20% closer).
Their earlier versions are preserved in `originals/`, with edit prompts in
`prompts.json`.

The active house follows the family character illustrations: organic ink lines,
off-white walls, a cobalt roof and a violet door on a pale lavender background.
The supplied gentle angle is retained. Earlier versions and the angle reference
are preserved in `originals/`; all ImageGen prompts are in `prompts.json`.
