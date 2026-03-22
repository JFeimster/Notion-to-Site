# Notion-to-Site

Initial Next.js scaffold seeded from the Flash UI export you uploaded.

## What is included

- App Router setup under `app/`
- `app/page.tsx` for the imported prototype
- `app/globals.css` for the shared styles
- TypeScript config and Next.js config

## Run locally

```bash
npm install
npm run dev
```

## Notes

The original Flash UI export arrived as three files (`page.tsx`, `layout.tsx`, `styles.css`).
To make it deployable in a clean App Router repo, the CSS was moved into `app/globals.css`
and imported from `app/layout.tsx`.

The current page is a static prototype and not yet wired to Notion, webhooks, or Vercel deployment hooks.
