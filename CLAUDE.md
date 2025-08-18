# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint

# Clean build (recommended for clearing cache issues)
rm -rf .next && npm run dev
```

## Project Architecture

This is a **Next.js 15 App Router** portfolio website with TypeScript, Tailwind CSS, and MongoDB Atlas integration. The site follows a single-page application pattern with smooth scrolling navigation.

### Core Architecture Patterns

**Single-Page Layout**: All content lives in `src/app/page.tsx` with multiple scrollable sections:
- Hero (`#home`) 
- About (`#about`) with profile and skills
- Experience timeline
- Projects (`#projects`)
- Bookshelf (`#bookshelf`)

**Client-Side Components**: All interactive UI uses `'use client'` directive for React hooks and event handling.

**Navigation System**: Fixed navigation with scroll-based active section tracking using `scrollIntoView()` and scroll event listeners. Navigation items are centered: Projects, About Me, Bookshelf (no home link).

### Data Management

**MongoDB Integration**: Full CRUD API routes for content management:
- Books: `/api/books` and `/api/books/[id]`  
- Projects: `/api/projects` and `/api/projects/[id]`
- Resume: `/api/resume` and `/api/resume/[id]`
- Authentication: NextAuth with credentials provider

**Type Safety**: Comprehensive TypeScript interfaces in `src/lib/types.ts` for all data models (Book, Project, Resume, Admin) and API responses.

**Database Connection**: MongoDB Atlas with connection pooling and environment-based configuration in `src/lib/mongodb.ts`.

### Authentication & Admin System

**NextAuth Configuration**: Credentials-based authentication with bcrypt password hashing and JWT sessions in `src/lib/auth.ts`.

**Admin Routes**: Protected admin interface at `/admin/*` for content management:
- Dashboard, login, and CRUD pages for books/projects/resume
- Middleware protection for admin routes
- File upload via Cloudinary integration (images and PDFs)

### Styling Architecture

**Custom Tailwind Theme**: Semantic color system in `tailwind.config.js`:
- `primary` (#9a8194): Main dark purple
- `primary-light` (#f7f0f0): Light backgrounds  
- `primary-accent` (#ffd9f6): Hover/accent color

**Component Patterns**: Consistent section layout with `py-20 px-4` spacing, `max-w-6xl mx-auto` containers, and alternating `bg-primary`/`bg-primary-light` backgrounds.

**Custom Animations**: Horizontal scrolling animations for skills section with custom Tailwind keyframes and scrollbar styling plugin.

**Typography**: Roboto Mono font family throughout, configured in root layout.

### File Organization

```
src/
├── app/
│   ├── (routes)/           # Next.js App Router pages
│   ├── api/               # API route handlers
│   ├── admin/             # Protected admin interface
│   ├── globals.css        # Tailwind and global styles
│   ├── layout.tsx         # Root layout with fonts
│   └── page.tsx           # Main portfolio SPA
├── components/            # React components (all client-side)
├── lib/                   # Utilities (auth, db, types)
└── providers/             # Context providers (SessionProvider)
```

### Key Implementation Details

- Navigation auto-hides on scroll down, shows on scroll up
- Book, project, and resume data fetched from MongoDB via API routes
- Resume download button appears in About Me section when available
- External image URLs used for book covers and timeline backgrounds
- File uploads (images/PDFs) handled via Cloudinary with drag-and-drop UI
- Responsive design with mobile hamburger menu
- TypeScript path aliases: `@/*` maps to `src/*`
- Environment variables required: `MONGODB_URI`, `MONGODB_DB`, `NEXTAUTH_SECRET`, Cloudinary config