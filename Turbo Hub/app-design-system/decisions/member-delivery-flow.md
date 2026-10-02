# Member profile and delivery details

Figma context: Profile pending action 559:55687, Delivery Details 409:63158 and
409:64259, and Address saved profile 409:62894. Local source screenshots are comparison
references only. Profile and form use shared blue chrome, 24px rounded content surface,
fixed 390 × 844 phone geometry and keyboard inspector opt-in. Source images and generic
identity imagery follow BRIEF: registered Avatars replace photography/card graphics.
The photo-based glass decoration and decorative source watermark are omitted.

Registered screen routes: member-profile/index.html, delivery-details/index.html,
and member-profile/index.html?saved=true. Flow References links all three. Member profile
uses Navigation, Avatar, Action, circular Limit and the shared Success notice. Parent
layout owns the identity row, payment-method summaries, state text and action placement;
these arrangements do not introduce component variants or alter child geometry.

Pending profile shows card ending 9700 with Delivery Details and active UPI separately.
Proceed returns to the saved profile with a dismissible confirmation. The card label is
Delivery details added, intentionally more precise than the source Active label: address
submission does not establish activation. Edit address preserves the saved return state.
Help and profile options remain live no-op callbacks because their product flows are
undefined. The saved catalog route is a demonstration state, not proof of stored data.

Delivery form reuses Field, Checkbox and Action. Address lines 2/3 are optional; line 1,
pincode, city, state and contact are required. Pincode checks six digits with nonzero
first digit; phone checks ten-digit mobile format. These checks do not verify address
deliverability. City/state remain editable rather than the source filled-disabled form:
there is no postal lookup service. Input autocomplete/inputmode belong to screen wiring.
The local session draft preserves text across Back/edit navigation; confirmation resets
on reopening. Storage failure leaves the form usable in memory. No address is transmitted
and no card delivery is initiated. Values are inserted as text/input values, not HTML.

Success notice: one success treatment, no variants or timer. It owns 16px horizontal /
8px vertical padding, 8px gaps, 20px check, message typography and success surface. Its
optional dismiss child is registered Action and owns its unchanged 44px hit area. Caller
supplies text and lifetime/removal. role=status belongs to the message and no focus is
stolen. The real specimen has long/plain query fixtures for configuration checks.

Verified in browser: empty form errors and first-invalid focus; malformed pincode/phone
errors; confirmation requirement; optional lines omitted on valid submission; draft
preservation through Back; saved route, feedback dismissal, and edit/back return state.
Components mode resolves Success notice and its real specimen/copy context. Long notice
measures 8px gap, 8px/16px insets, 44px dismiss width and no internal overflow. At 390 ×
844, profile/reference stack without horizontal overflow and images load locally.
Desktop, saved and narrow captures are under the prototypes' verification folders.
Catalog validation passes with zero errors; syntax checks pass for changed JS.
