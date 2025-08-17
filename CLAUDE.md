# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev
# Clean build and restart dev server (recommended for clearing cache issues)
rm -rf .next && npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

## Project Architecture

This is a **Next.js 15 App Router** portfolio website built with TypeScript and Tailwind CSS. The site is a single-page application with smooth scrolling navigation between sections.

### Key Architecture Patterns

**Single Page Layout**: All content lives in `src/app/page.tsx` as one long page with multiple sections:
- Hero section (`#home`) 
- About section (`#about`) with profile and scrollable skills
- Experience timeline
- Projects section (`#projects`)
- Bookshelf section (`#bookshelf`)

**Client-Side Components**: All interactive components use `'use client'` directive:
- `Navigation.tsx` - Fixed header with smooth scroll navigation and active section tracking
- `BookshelfSection.tsx` - Interactive book review cards
- `ScrollableSkills.tsx` - Horizontal scrolling skill tags
- `BookCover.tsx` - Individual book cover display component

**Navigation System**: Uses anchor links and `scrollIntoView()` with scroll event listeners to track active sections. Navigation items: Projects, About Me, Bookshelf (centered layout, no home link).

### Custom Theme System

**Tailwind Color Palette** (`tailwind.config.js`):
- `primary` (dark-purple): `#9a8194` - Main color for text, backgrounds
- `primary-light` (light-bg): `#f7f0f0` - Light backgrounds and accents
- `primary-accent` (bright-pink): `#ffd9f6` - Hover effects and highlights
- `dark-purple`: Same as primary, for navigation background
- `light-bg`: Same as primary-light, for navigation text

**Typography**: Uses Roboto Mono font family throughout the site.

**Custom Animations**: Horizontal scrolling animations for skills section with varying speeds (25s, 30s, 40s).

### Data Management

**Static Data**: Book reviews are currently hardcoded in `BookshelfSection.tsx` with this interface:
```typescript
interface BookReview {
  _id: string
  title: string
  review: string
  author: string
  bookCoverLink: string
}
```

**Future Database Integration**: The codebase is prepared for MongoDB Atlas integration (referenced in todo items but not yet implemented).

### Component Structure

**Modular Design**: Each major section is a separate component imported into the main page:
- Navigation is rendered outside main content for fixed positioning
- ScrollableSkills is embedded within About section
- BookshelfSection contains BookCover children
- All sections have proper `id` attributes for navigation targeting

**Responsive Design**: Uses Tailwind's responsive classes (`md:`, `lg:`) with mobile-first approach. Navigation includes hamburger menu for mobile.

### Styling Patterns

**Section Layout**: Each major section follows this pattern:
- Full-width container with `py-20 px-4`
- Max-width content container (`max-w-6xl mx-auto`)
- Centered headings with `text-4xl font-bold text-center mb-12`

**Color Usage**:
- Hero: `bg-primary text-primary-light` (dark purple background, light text)
- About/Timeline: `bg-primary-light` with `text-primary` (light background, dark text)
- Projects: `bg-primary text-primary-light` (dark background, light text)
- Navigation: `bg-dark-purple` with `text-light-bg` (dark purple background, light text)

### File Organization

```
src/
├── app/
│   ├── globals.css     # Tailwind directives and CSS variables
│   ├── layout.tsx      # Root layout with Roboto Mono font
│   └── page.tsx        # Main portfolio page with all sections
├── components/
│   ├── BookCover.tsx           # Individual book display
│   ├── BookshelfSection.tsx    # Book reviews section
│   ├── Navigation.tsx          # Fixed navigation header
│   └── ScrollableSkills.tsx    # Horizontal scrolling skills
└── lib/                # (Currently empty, for future utilities)
```

### Key Implementation Notes

- Navigation uses scroll event listeners to track active sections
- All external links (LinkedIn, GitHub, HackerRank, Email) are hardcoded in About section
- Timeline section includes background images loaded from external URLs
- Book covers use external Amazon/Goodreads image URLs
- TypeScript paths configured with `@/*` alias pointing to `src/*`
- Custom scrollbar styling implemented via Tailwind plugin