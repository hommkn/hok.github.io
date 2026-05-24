# BeadSnap Payment Setup

Creem is the planned checkout provider for paid BeadSnap upgrades.

Current status:

```text
Creem account: pending review
```

Current site behavior:

- `custom-pattern.html` now positions the paid offer as an automatic `Pro Pattern` generator.
- Buttondown collects launch interest while Creem is pending review.
- No paid PDF file is exposed publicly.
- No checkout link is active yet.

When Creem is approved:

1. Create a product for `BeadSnap Pro Pattern`.
2. Set the price to `$5` one-time.
3. Configure the success URL to the paid generator page, for example `https://beadsnap.app/pro-pattern.html`.
4. Replace the main waitlist CTA on `custom-pattern.html` with the Creem checkout URL.
5. Keep the Buttondown form as a secondary launch-update list.

Suggested Creem product copy:

```text
BeadSnap Pro Pattern
```

```text
Unlock a cleaner automatic photo-to-bead pattern generator. Includes smarter subject cropping, better color matching, larger pattern sizes, printable PDF export, bead counts, and a shopping list.
```

Suggested delivery note:

```text
After purchase, you will be redirected to the Pro Pattern generator. Upload your photo there to create a cleaner printable bead pattern automatically.
```

Suggested first price:

```text
$5
```

GA4 events already available or planned:

- `click_pro_pattern`
- `subscribe_pro_pattern`
- `click_creem_checkout` after checkout is added
- `upload_pro_photo`
- `generate_pro_pattern`
- `download_pro_png`
- `download_pro_jpg`
- `download_pro_pdf`
- `copy_pro_shopping_list`
- `purchase` if Creem or GA4 purchase tracking is configured later
