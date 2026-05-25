<div align="center">

```
██╗   ██╗ ██████╗ ██╗   ██╗██████╗ ███████╗██╗  ██╗
╚██╗ ██╔╝██╔═══██╗██║   ██║██╔══██╗██╔════╝╚██╗██╔╝
 ╚████╔╝ ██║   ██║██║   ██║██║  ██║█████╗   ╚███╔╝ 
  ╚██╔╝  ██║   ██║██║   ██║██║  ██║██╔══╝   ██╔██╗ 
   ██║   ╚██████╔╝╚██████╔╝██████╔╝███████╗██╔╝ ██╗
   ╚═╝    ╚═════╝  ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
```

**Full-Stack Mobile & Web Developer Portfolio**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://prisma.io)
[![Firebase](https://img.shields.io/badge/Firebase-Analytics-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)

</div>

---

## Overview

Personal portfolio for **Yousef Hashemzadeh** — a Flutter / React / Next.js developer based in Isfahan, Iran. Built with a dark crimson design system, full RTL/LTR multi-language support, and a protected admin panel.

## Features

- **Trilingual** — Persian (FA · RTL), Arabic (AR · RTL), English (EN · LTR)
- **Dark / Light theme** with custom crimson CSS variables
- **Admin panel** — CRUD for work samples, education, work experience, events, and site settings; protected by NextAuth + TOTP 2FA
- **Real-time analytics dashboard** — self-hosted page-view tracking (path + language) stored in SQLite, visualised with Recharts
- **Firebase Analytics + Performance Monitoring** — automatic page-view events on every route change
- **JSON import mode** — paste a JSON object in any admin form to bulk-fill fields instantly
- **Search & filter** — live search across all admin data tables
- **Multilingual content** — AR / EN / FA titles, descriptions, and dates on every model
- **CV PDF** — auto-generated from an HTML template

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + DaisyUI |
| Database | SQLite via Prisma ORM |
| Auth | NextAuth v4 + TOTP (speakeasy) |
| Analytics | Firebase v12 + custom PageView store |
| Charts | Recharts |
| UI extras | Chakra UI, MUI Icons, Framer Motion, GSAP |

## Getting Started

```bash
# 1 — install
npm install

# 2 — copy environment template and fill in values
cp .env.example .env

# 3 — apply database migrations
npx prisma migrate deploy

# 4 — run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).  
Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## Environment Variables

Create a `.env` file (never commit it — already in `.gitignore`):

```env
DATABASE_URL="file:./prisma/app.db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Project Structure

```
app/
  admin/          → protected admin panel (CRUD + analytics)
  api/            → REST API routes (Prisma-backed)
  context/        → LanguageContext, ThemeContext, NextAuthProvider
  lib/            → Firebase init & analytics helpers
components/       → all UI components (feature-organised)
messages/         → i18n translation files (fa / en / ar)
prisma/           → schema, migrations, SQLite database
public/           → static assets, favicons, SVGs
```

## License

MIT — see [LICENSE](./LICENSE)
