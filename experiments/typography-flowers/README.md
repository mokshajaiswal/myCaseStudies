# Typography Flowers

Type, and each word gets one vine wound round it, passing in front of the
letters and behind them in a steady spiral that follows your typing. Leaves
and flowers sit on the rhythm of its turns. Delete a letter and the vine draws
back, letting its flowers fall.

Open `index.html` directly or from any static server. It needs no build step;
the only network request is the Google Fonts stylesheet for Pinyon Script.

## Using it

- **Type** anything. Enter starts a new line; text wraps by word.
- **Space** closes a word: its vine finishes with a curl and a larger flower.
- **Backspace** cuts the vine back to the letter before: petals and leaves fall.
- **Move the pointer** to make the flowers sway and push falling petals.
- **Click** for a gust that shakes petals loose.
- **Tab** / **Shift+Tab** cycles the style; the pill at the bottom does the same.
- **Regrow** drops everything and grows it again with a new arrangement. **Clear** wipes the text.
  **Save** downloads a PNG.

## Styles

| Style    | Look                                                                 |
| -------- | -------------------------------------------------------------------- |
| Garden   | Warm paper, olive vines, mixed blossoms, roses, bells and daisies.   |
| Nocturne | Night, glowing teal vines, luminous flowers, fireflies that follow you. |
| Etching  | One ink on paper: outlined petals, hatching and veined leaves.       |
| Gilded   | Emerald ground, gold-leaf letters and vines, ivory roses, glints.    |
| Sakura   | Blush paper, woody branches, cherry blossom and a steady petal fall. |

Switching style re-dresses the same garden; Regrow gives it a new shape.

## How it works

| File               | Role                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| `js/profile.js`    | Reads each line's ink silhouette and smooths it into an envelope.     |
| `js/garden.js`     | One spiral vine per word, its leaves, flowers and end curls.          |
| `js/flora.js`      | Procedural stems, leaves and eight flower kinds, each with a bloom animation. |
| `js/particles.js`  | Falling petals and leaves, plus each style's ambient particles.      |
| `js/styles.js`     | The five styles: palettes, flower odds and render modes.             |
| `js/main.js`       | Input, layout, the camera, layering and the controls.                |

Each word's vine is a helix round the word's silhouette. Its reach is set by
the silhouette's smoothed top and bottom: it swells over tall letters and
settles over short ones. The pitch is steady, about one turn per letter pair,
with a slight slow swing. The half of each turn that runs down the front is
drawn over the ink with a soft shadow. The half that climbs the back is drawn
under it, a shade deeper, so the vine reads as wound round the word.

Nothing is placed at random. Every outer turn carries a pair of leaves, or a
flower on every third turn. A word opens with a curl and, once closed, ends
with a curl and a larger flower. The live tip tapers as it grows and waits at
the last letter for the next.

To try another face, change `FACE` in `js/main.js` and the Google Fonts link
in `index.html`. Connected scripts work best, such as Great Vibes, Allura or
Parisienne.
