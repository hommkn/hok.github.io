# BeadSnap Email Capture Setup

The site is wired for Buttondown because it works well with static HTML.

The Buttondown username currently configured is:

```text
beadsnap
```

Files currently using the Buttondown form endpoint:

- `index.html`
- `blog.html`
- `about.html`
- `free-patterns.html`

GA4 events already sent by the site:

- `click_free_patterns`
- `subscribe_free_patterns`
- `download_free_patterns`
- `upload_photo`
- `generate_pattern`
- `download_png`
- `download_pdf`
- `copy_shopping_list`

In GA4, mark `subscribe_free_patterns` as a key event first. If you want a lighter funnel, also mark `click_free_patterns` and `download_free_patterns`.
