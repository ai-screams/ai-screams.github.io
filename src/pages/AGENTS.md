<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-19 (page status sync) -->

# pages

## Purpose

Route-level page components. Each file corresponds to a URL path, lazy-loaded in `App.tsx`.

## Key Files

| File               | Description                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `Home.tsx`         | `/` — Interactive RPG-style landing page (animated menu, keyboard navigation, dialog typing effect) |
| `About.tsx`        | `/about` — RPG-style profile page (`Character`, `Equipment`, `Quest Log`)                           |
| `Projects.tsx`     | `/projects` — Projects page placeholder (`Coming soon.`)                                            |
| `Travel.tsx`       | `/travel` — Travel page placeholder (`Pixel world map coming soon.`)                                |
| `Colors.tsx`       | `/colors` — Design token visual showcase with all scales, buttons, cards                            |
| `TestCssPixel.tsx` | `/test-css-pixel` — 568-line pixel design prototype with DotHero canvas + RPG UI                    |
| `NotFound.tsx`     | `*` — 404 page with "Go home" link                                                                  |

## For AI Agents

### Working In This Directory

- New pages must be added in 3 places:
  1. Create `PageName.tsx` here with `export default function PageName()`
  2. Add lazy import in `App.tsx`: `const PageName = lazy(() => import("./pages/PageName"))`
  3. Add `<Route>` in `App.tsx` inside the Layout route
- Optionally add to `navItems` array in `Navbar.tsx` for navigation link
- Static data arrays must be hoisted outside the component function
- Production pages should use `var()` tokens; `TestCssPixel.tsx` still includes prototype hardcoded fallback colors

### Common Patterns

- Placeholder pages (`/projects`, `/travel`) use simple `<section className="mx-auto ... px-6 py-24">` containers
- Placeholder headings use `font-pixel text-4xl font-bold tracking-tight`
- Home uses a full-viewport RPG layout (`min-h-[calc(100svh-4rem)]`, `pixel-dot-bg`) with Motion animations

<!-- MANUAL: -->
