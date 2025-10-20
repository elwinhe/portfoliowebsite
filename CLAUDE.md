# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Elwin He built with React 19, React Router, and Vite. The site showcases projects (Avocado App, Voteable, Itinerary.ai), entrepreneurial experience (Tippit Tea), and professional work experience. Features a single-page application with smooth scroll navigation and animated UI elements.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Architecture & Structure

### Routing Architecture
- Uses `react-router-dom` with `BrowserRouter` at the root (src/App.jsx:11)
- Main routes defined in src/App.jsx:
  - `/` - Home page (portfolio homepage)
  - `/tippittea` - Tippit Tea case study
  - `/voteable` - Voteable case study
  - `/avocado_app` - Avocado App case study
- Navigation handled by shared `<Navbar />` component with smooth scroll for anchor links on homepage

### Component Organization
- **src/pages/** - Full page components (Home, TippitTea, Voteable, AvocadoApp)
- **src/components/** - Reusable UI components (Navbar, ProjectCard, BackgroundCircles, FitText)
- **src/assets/** - Images, videos, PDFs organized by project in subdirectories

### Key UI Patterns

#### Smooth Scroll Navigation
The `handleLinkClick` function (src/components/Navbar.jsx:5-13) is exported and reused across components for consistent smooth scroll behavior to anchor links like `#projects`, `#experience`, `#contact`.

#### Intersection Observer Animations
Multiple sections use IntersectionObserver for fade-in animations on scroll (src/pages/Home.jsx):
- Gallery section (line 48-67)
- Experience section (line 69-89)
- Contact section (line 92-111)
- Project iPhone mockups with scroll hint (line 152-185)

#### Asset Loading
All assets use `new URL('../assets/...', import.meta.url).href` pattern for Vite compatibility with proper bundling and cache-busting.

### Styling Approach
- CSS Modules per component (`.css` files co-located with `.jsx` files)
- Global theme variables in src/theme.css
- Responsive design with mobile-first approach
- Custom CSS animations and transitions

### Video Handling
Mobile video rendering has a specific fix for tab-out/tab-in bugs (src/pages/Home.jsx:113-149). Video elements require careful handling of visibility changes to prevent layout issues.

## ESLint Configuration

Custom rule: `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]` allows uppercase unused variables (typically for React component imports).

## Deployment

- Hosted on Vercel (vercel.json present in root)
- Production build outputs to `dist/`
