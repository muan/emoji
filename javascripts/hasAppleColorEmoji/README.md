## hasAppleColorEmoji

Use `hasAppleColorEmoji()` to check if a user's computer has the `AppleColorEmoji` font.

### How?

This creates 2 tags that have `☺` in, one using a non-existent font, one using `AppleColorEmoji`, then it compares the width of the tags. If the widths are the same, it means that `AppleColorEmoji` is also non-existent.
