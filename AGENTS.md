# AGENTS.md - ChatRAG Landing Page

## Commands
- **Dev**: `npm run dev` (starts Next.js on :3000)
- **Build**: `npm run build` (production build, checks types/lint)
- **Lint**: `npm run lint` (ESLint with next/core-web-vitals)
- **Start**: `npm start` (production server)

## Architecture
- **Framework**: Next.js 15.5.4 (App Router), React 19, TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3 + shadcn/ui components (Radix UI primitives)
- **Structure**: `/app` (routes), `/components` (ui, sections, demos), `/lib` (utilities), `/public` (static assets)
- **Key Pages**: Landing page (`app/page.tsx`), docs (`app/docs/`), success page (`app/success/`)

## Code Style
- **Imports**: Use `@/*` path aliases (tsconfig); imports ordered as: React/Next, external libs, internal components, utilities, types
- **Components**: Functional components with TypeScript; use "use client" directive for client components
- **Utilities**: Use `cn()` from `lib/utils.ts` for className merging (clsx + tailwind-merge)
- **Icons**: lucide-react for all icons
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for files
- **Types**: Strict TypeScript enabled; prefer interfaces for objects, type for unions/intersections
- **Formatting**: Space Grotesk font for headings, component files use .tsx extension
- **UI Components**: shadcn/ui pattern - components in `components/ui/`, use Radix primitives with Tailwind styling
