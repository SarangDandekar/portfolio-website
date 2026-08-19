# Jugadu Cafe — Premium Portfolio Website

A production-ready, premium café website built with Next.js 16, React, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Quick Start

```bash
cd jugadu-cafe
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customize Your Brand

### 1. Logo & Colors

Replace `public/logo.svg` with your official Jugadu Cafe logo, then update colors in:

- `src/config/theme.ts` — brand color definitions
- `src/app/globals.css` — CSS variables (primary, secondary, accent, etc.)

### 2. Cafe Details

Edit `src/config/site.ts`:

- Address, phone, WhatsApp, Instagram
- Opening hours
- Google Maps embed URL

### 3. Menu

- Replace `public/menu/jugadu-cafe-menu.pdf` with your menu PDF
- Update menu items in `src/config/menu.ts`

### 4. Gallery Photos

Replace placeholder URLs in `src/config/gallery.ts` with your café photos in `public/images/gallery/`

## Supabase Setup (Feedback Form)

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env.local` and add your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

3. Run the SQL migrations in Supabase SQL Editor:

- `supabase/migrations/001_feedback.sql`
- `supabase/migrations/002_public_feedback_read.sql`
- `supabase/migrations/003_gallery_and_highlight.sql` (gallery + highlight for admin site)
- `supabase/migrations/004_highlight_items_and_story.sql` (Highlights slider + Our Story media)
- `supabase/migrations/005_page_views.sql` (public site viewer counts for admin)
- `supabase/migrations/006_storage_large_videos.sql` (raise cafe-media upload size)

## Admin website

Content uploads live in the separate app `../jugadu-cafe-admin` (login, gallery, highlight). Same Supabase project. See that folder’s README.

## Deploy

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js host. Set environment variables in your hosting dashboard.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS 4**
- **Framer Motion** — animations
- **Lucide React** — icons
- **React Hook Form + Zod** — form validation
- **Supabase** — feedback storage

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, menu, gallery, testimonials, visit us |
| `/feedback` | Dedicated feedback form with star ratings |

## License

Private — Jugadu Cafe
