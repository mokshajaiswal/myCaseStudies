# Spends transaction artwork

The Spends list now supplies locally stored merchant images to the registered Transaction row, replacing the repeated payment symbol. Amazon, BESCOM, Swiggy, Nykaa and BigBasket have recognisable brand assets. INOX and Gupta Stores use generic cinema and shop artwork. Source URLs are recorded with the assets.

Avatar accepts optional `src`, and Transaction row passes optional `avatarSrc` to its nested Avatar. Image remains caller-owned content within the existing size configuration. Images are decorative because the adjacent row already names the merchant. Failed images restore the supplied graphic or initials. Existing boolean graphic configurations remain supported, along with semantic icon names.

No control or row spacing changes: merchant Avatar remains 40px square with a 12px radius; compact row retains zero inset, 8px icon-to-copy gap and 2px title-to-detail gap. The screen retains 32px gaps between rows and 24px content insets. New image examples use the shared renderers in the canonical Avatar and Transaction row specimens; the registry lists their content states and image anatomy.

Verification: Chrome rendered all eight images at 40 × 40 logical pixels. The desktop preview was visually inspected; at a 390px browser viewport, images loaded without horizontal phone-content overflow. A deliberately unavailable image restored the payment icon. JavaScript syntax, whitespace checks and the attached catalog check passed.

Reference correction: INOX and Gupta Stores artwork now includes a pale-blue 40px rounded tile, with the category symbol centered in a 24px icon frame. BESCOM has a thin light border, white rounded tile and 4px inset around its logo. These are local image-content changes; the registered Avatar/Row geometry stays unchanged. BESCOM's SVG embeds the original logo so it loads reliably as an image. Chrome confirms all eight assets load, remain 40px square, and have no overflow at desktop or 390px browser width; fallback still works. Visually inspected the updated transaction list.
