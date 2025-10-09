# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Framework: Next.js (App Router) with TypeScript and Tailwind CSS
- Rendering: Static export (next.config.js sets output: 'export'), optimized for static hosting
- UI: shadcn/ui components (via components.json) + Radix UI primitives, theming via next-themes
- Structure: app/ for routes and layouts; components/ for UI and sections; hooks/ for client hooks; lib/ for utilities; public/ for static assets

Essential commands
- Install dependencies (clean, uses package-lock):
  - npm ci
- Start development server (http://localhost:3000):
  - npm run dev
- Lint (Next.js ESLint config):
  - npm run lint
  - Note: next.config.js has eslint.ignoreDuringBuilds: true, so build won’t fail on lint errors.
- Build static site (outputs to out/):
  - npm run build
- Preview static build locally (serve the out/ directory):
  - npx serve -s out -l 3001

Testing
- No test runner is configured in package.json. There is no test script or test config present in this repository.

High-level architecture and conventions
- Routing and layout (App Router)
  - app/layout.tsx: Global layout and Providers; app/globals.css for global styles
  - app/page.tsx: Root landing page
  - app/docs/*: Documentation pages and layout
  - app/not-found.tsx: 404 handling
- Static export
  - next.config.js sets output: 'export' and images.unoptimized: true
  - next build generates a fully static site in out/ suitable for static hosts (Vercel static, Netlify, S3 + CDN, etc.)
  - next start is not used with output: 'export'; use a static file server to preview out/
- Styling and UI
  - Tailwind CSS configured in tailwind.config.ts (darkMode: 'class'); content globs include app/, components/, pages/
  - shadcn/ui configured via components.json with aliases (ui -> @/components/ui, utils -> @/lib/utils)
  - Radix UI components underpin many UI primitives in components/ui/*
  - Theme toggling via next-themes (components/theme-provider.tsx, components/docs-theme-provider.tsx, ThemeToggle components)
- TypeScript and module resolution
  - tsconfig.json enables strict settings, bundler moduleResolution, and path alias @/* to the repo root
  - Common utilities in lib/utils.ts; additional helpers in lib/*.ts
- Assets
  - public/ contains images, favicons, robots.txt, sitemap.xml used by the static site

Notes specific to this repo
- ESLint: Minimal config extending next/core-web-vitals (.eslintrc.json); lint errors won’t fail builds due to next.config.js
- Images: next/image optimization is disabled (images.unoptimized: true) and formats include WebP and AVIF; suitable for static export
- Tailwind: Includes tailwindcss-animate; custom CSS variables and radii used for UI theming
- Aliases: Import using @/ for components, lib, hooks, etc., as defined in components.json and tsconfig.json

What’s not present
- No README.md; project docs pages live under app/docs/
- No CLAUDE.md, Cursor rules (.cursor/), or Copilot instruction files
- No tests or test tooling configured
