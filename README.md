# Xegency

The studio website. Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript.

---

## Before you launch — the short list

The site is intentionally shipped in **draft mode**. A yellow bar sits at the
bottom of every page and search engines are blocked until you turn that off.

1. **Fill in the placeholders.** Everything wrapped in `[SQUARE BRACKETS]` is a
   fact I did not know. Find them all:

   ```bash
   npm run todo
   ```

   They live in two files only: `src/content/site.ts` and `src/content/work.ts`.
   Placeholders render in faded italic on the page so they are easy to spot.

2. **Replace the case studies.** The five projects in `src/content/work.ts` are
   *templates* — realistic structure, invented specifics. Swap in your real
   work. Keeping the client anonymous ("a Nordic furniture label") is fine and
   normal; inventing the result is not, because it is the one claim a prospect
   can actually check.

3. **Add two real testimonials.** `testimonials` in `src/content/site.ts` is an
   empty array and the section does not render while it stays empty. Ask two
   past clients for two lines each. This is worth more than anything else you
   could add to the site.

4. **Go live.** In `src/content/site.ts`:

   ```ts
   export const siteStatus: "draft" | "live" = "live";
   ```

   That removes the draft bar, drops the `noindex` tag and turns on
   `robots.txt` + `sitemap.xml`.

---

## Running it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
npm run todo    # list every remaining [PLACEHOLDER]
```

---

## Where everything lives

```
src/
  content/
    site.ts        ← copy, services, process, FAQ, facts, contact details
    work.ts        ← case studies
  app/
    page.tsx             home
    work/                index + /work/[slug] case studies
    services/            scope, deliverables, pricing
    about/               founder letter, fact sheet, principles
    contact/             form + direct details
    api/contact/         form endpoint
    globals.css          design tokens (colours, type, motion)
  components/
    sections/      the reusable page sections
    ui.tsx         buttons, headings, marquee, wordmark
public/
  founder/         your three photographs
  texture/         the liquid texture from the brand board
  brand/           ← put logo.svg and logo-invert.svg here when ready
```

**You will mostly only ever touch `src/content/`.**

---

## Your logo

Not built — you said you would supply it. Until then the site uses a
typographic wordmark (a small rotated square plus `XEGENCY` in tracked caps),
which is a legitimate look on its own.

When the logo is ready:

1. Save it to `public/brand/logo.svg` (dark version, for light backgrounds) and
   `public/brand/logo-invert.svg` (light version, for the dark footer).
2. In `src/content/site.ts`:

   ```ts
   export const brand = {
     logo: "/brand/logo.svg",
     logoInvert: "/brand/logo-invert.svg",
   };
   ```

Header and footer pick it up automatically. Aim for roughly 132 × 28 px
proportions so it drops in without layout changes.

Also replace `src/app/favicon.ico` with your own.

---

## The design system

Taken straight from the brand board in `brand_asset/`:

| Token   | Hex       | Used for                                  |
| ------- | --------- | ----------------------------------------- |
| `ink`   | `#181716` | Body text, dark sections, footer          |
| `bone`  | `#E4DFD7` | Alternate section background              |
| `bone-50` | `#F4F2EE` | Page background                         |
| `stone` | `#A59B8F` | Muted text on dark                        |
| `umber` | `#61564A` | Accent, eyebrows, hover states            |

Type: **Instrument Serif** for display, **Inter** for body, **JetBrains Mono**
for the small tracked labels. All three load through `next/font`, so they are
self-hosted at build time — no external requests, no layout shift.

The liquid black-and-white texture from your brand board is the hero image.

---

## The contact form

Works with no configuration: if no inbox is wired up, the form falls back to
opening a pre-filled email in the visitor's mail app, so it is never a dead
end.

To receive submissions properly, set one environment variable:

```bash
# .env.local  (never commit this)
CONTACT_WEBHOOK_URL=https://...
```

Anything that accepts a JSON `POST` works — a [Formspree](https://formspree.io)
endpoint, a Slack incoming webhook, a Zapier or Make catch hook. Set the same
variable in your host's environment settings for production.

The endpoint validates input, rejects oversized messages and silently swallows
bot submissions via a honeypot field.

---

## Deploying

Easiest path is Vercel, who make Next.js:

```bash
npm i -g vercel
vercel
```

You get a free `something.vercel.app` URL immediately — enough to put in a
pitch — and you can point a real domain at it later. Remember to set
`CONTACT_WEBHOOK_URL` in the project's environment variables, and update
`site.url` in `src/content/site.ts` once the domain is live so canonical URLs,
Open Graph tags and the sitemap all point at the right place.

---

## SEO and structured data

- Per-page titles and descriptions, Open Graph and Twitter cards.
- `ProfessionalService` and `FAQPage` JSON-LD, with placeholder values stripped
  out so nothing unfinished is published as machine-readable fact.
- `sitemap.xml` and `robots.txt` generated from the content files.
- Every page is statically prerendered.

One thing missing: a social share image. Add `public/og.jpg` at 1200 × 630 and
reference it under `openGraph.images` in `src/app/layout.tsx`.
