# BeadSnap Payment Setup

Creem is the planned checkout provider for paid BeadSnap upgrades.

Current site behavior:

- `custom-pattern.html` positions the paid offer as an automatic `Pro Pattern` generator.
- The purchase button first tries to create a checkout through `https://api.beadsnap.app/checkout`.
- If the checkout API is unavailable, the button falls back to the static Creem payment link.
- `pro-pattern.html` recognizes both `?purchase=success` and Creem signed return params such as `checkout_id`, `order_id`, and `signature`.
- No paid PDF file is exposed publicly.

Required production setup:

1. Create a Creem product for `BeadSnap Pro Pattern`.
2. Set the price to `$5` one-time.
3. Configure the product success URL to `https://beadsnap.app/pro-pattern.html?purchase=success`.
4. Deploy the Cloudflare Worker in `workers/`.
5. Point `api.beadsnap.app` to that Worker, or update `CHECKOUT_ENDPOINT` in `custom-pattern.html` to the deployed Worker URL.
6. Set the Worker secrets:

```powershell
cd C:\Users\hok\Desktop\beadsnap\workers
.\node_modules\.bin\wrangler.cmd secret put CREEM_API_KEY
.\node_modules\.bin\wrangler.cmd secret put CREEM_WEBHOOK_SECRET
```

7. Optional email notification secrets:

```powershell
.\node_modules\.bin\wrangler.cmd secret put RESEND_API_KEY
.\node_modules\.bin\wrangler.cmd secret put NOTIFY_EMAIL
```

8. Configure the Creem webhook URL as `https://api.beadsnap.app/webhook`.

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
