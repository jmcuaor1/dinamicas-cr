# Dinámicas CR

Landing page for a WhatsApp community that runs giveaways ("sorteos" / "dinámicas"), built to drive sign-ups to a WhatsApp group and showcase proof of past prize payments.

## Live Demo

[TODO: add live link]

## Screenshots

> Add screenshots to a `/screenshots` folder and reference them here.

- `/screenshots/home.png` — [TODO: add screenshot of the landing page hero section]
- `/screenshots/comprobantes.png` — [TODO: add screenshot of the payment proofs section]
- `/screenshots/admin.png` — [TODO: add screenshot of the admin panel]

## The Problem It Solves

*(Inferred from the code — not stated explicitly in the repo.)* The site acts as a conversion page for a WhatsApp-based giveaway community ("Dinámicas CR"). It explains how the giveaways work, builds trust by displaying real payment proofs and testimonials, answers common questions (FAQ), and funnels visitors to join the WhatsApp group via a call-to-action link — all without requiring a separate account or app.

## Features

- Single-page marketing site with sections for home, "how it works," payment proofs, testimonials ("opiniones"), and FAQ.
- WhatsApp group CTA and social links (Instagram, TikTok, Facebook) driven by a central config file.
- Payment-proof gallery showing past giveaway payouts as images.
- Password-protected admin panel (`AdminPage.tsx`) to update the WhatsApp group link and visible phone number at runtime.
- Backend API routes (`/api/config`, `/api/update-config`) that persist the editable site config in Redis, falling back to the static `config.json` defaults when Redis isn't configured.
- SEO/meta tag injection, optional Google Analytics tag, and `robots.txt` generation via a custom Vite plugin driven by `.figma/make/site.json`.

## Tech Stack

- **Framework/UI:** React 19 + TypeScript
- **Build tool:** Vite 8 (`@vitejs/plugin-react`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Backend:** Vercel serverless functions (`api/*.js`)
- **Data store:** Redis via `ioredis`
- **Deployment target:** Vercel (`vercel.json` rewrites)
- **Formatting:** oxfmt
- **Package manager / toolchain:** pnpm, Node 22 (pinned via `.mise.toml`)

## Project Structure

```
.
├── api/
│   ├── config.js            # GET: returns site config from Redis (or {} if unset)
│   └── update-config.js     # POST: password-protected update of whatsappLink/phone in Redis
├── src/
│   ├── App.tsx               # Main landing page (sections, content, CTAs)
│   ├── AdminPage.tsx          # Admin form to update WhatsApp link & phone
│   ├── useSiteConfig.ts       # Hook that merges config.json defaults with the live /api/config value
│   ├── main.tsx               # React entry point
│   └── index.css              # Tailwind entry point
├── config.json                # Default/static site content (brand, links, images, social)
├── vite.config.ts             # Vite config + custom plugins (SEO tags, dev-server helpers)
├── vercel.json                 # Vercel rewrites for SPA + API routes
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 22
- pnpm (version pinned in `.mise.toml`)

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file (not committed) with the following variable names:

| Variable | Used for |
|---|---|
| `REDIS_URL` | Connection string for the Redis instance that stores the editable site config |
| `ADMIN_PASSWORD` | Password required to submit changes from the admin panel |

Without `REDIS_URL`/`ADMIN_PASSWORD` set, the app still runs and falls back to the static defaults in `config.json`; only the admin-update flow requires them.

### Run

```bash
pnpm dev       # start the Vite dev server
pnpm build     # production build
pnpm preview   # preview the production build locally
```

## Tests

[TODO: no test setup was found in this repository]

## Author

**Juan Miguel Cuao Ríos**
Portfolio: [TODO: add portfolio link]
LinkedIn: https://www.linkedin.com/in/juan-miguel-cuao-rios-b888081a9
