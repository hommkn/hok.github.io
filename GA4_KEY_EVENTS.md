# BeadSnap GA4 Key Events

Code-side events are already sent from the site. The following events should be marked as key events in GA4.

Priority events:

- `click_pro_pattern`
- `subscribe_pro_pattern`
- `subscribe_free_patterns`

Useful supporting events:

- `click_free_patterns`
- `download_free_patterns`
- `upload_photo`
- `generate_pattern`
- `download_png`
- `download_pdf`
- `copy_shopping_list`
- `upload_pro_photo`
- `generate_pro_pattern`
- `download_pro_png`
- `download_pro_jpg`
- `download_pro_pdf`
- `copy_pro_shopping_list`

GA4 setup steps:

1. Open Google Analytics.
2. Choose the BeadSnap property.
3. Go to Admin.
4. Open Events or Key events.
5. Find or create `click_pro_pattern`.
6. Mark it as a key event.
7. Find or create `subscribe_pro_pattern`.
8. Mark it as a key event.

If the events do not appear yet, trigger them once on the live site after deployment, then wait for GA4 to receive them.
