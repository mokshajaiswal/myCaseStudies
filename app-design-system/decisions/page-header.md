# Page header

Extracted from Review payment’s merchant identity. Shared renderer accepts heading, optional subtext, verification badge and optional trailing semantic icon or caller-provided decorative visual. The page owns content and placement, while Page header owns alignment and spacing. This is separate from Navigation bar and has no private actions.

Title uses semantic screen-heading size 26px, reduced from 28px in the former merchant-specific CSS. Family and weight use heading roles; subtext uses body roles and 13px. Existing success icon draws the verification check. The optional visual slot is 56px with the existing radius; brand artwork remains caller content.

Default insets are 12px top, 24px horizontal and 32px bottom; title/subtext gap is 8px. The bottom inset is an explicit component token. Header paints its gradient in isolation and remains transparent in phone-chrome so the screen supplies one continuous gradient. Specimens cover full, heading-only and wrapping long content.

Review payment now consumes the registered component; obsolete local merchant geometry has been removed. Do not duplicate its heading/subtext/visual arrangement in future screens.

Typography audit, 1 October 2026: title now uses screen-heading 20px Medium / 1.4, based on Turbo Hub 436:64799 and 402:50472. Subtext uses supporting-text 14px Regular / 1.4. This supersedes the earlier 26px screenshot estimate.

Chrome backdrop extraction: Page header is transparent and declares `turbo-chrome-backdrop` as a dependency. The shared backdrop now owns the decorative blue/violet treatment in specimens and product screens; Page header continues to own only title/subtext alignment, its visual slot and internal spacing.
