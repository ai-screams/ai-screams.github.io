<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# pages

## Purpose

Route-level page components. Each file corresponds to a URL path, lazy-loaded in `App.tsx`.

## Key Files

| File           | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| `Home.tsx`     | `/` — Landing page (placeholder)                                         |
| `About.tsx`    | `/about` — About page (placeholder)                                      |
| `Projects.tsx` | `/projects` — Projects showcase (placeholder)                            |
| `Travel.tsx`   | `/travel` — Pixel travel map (placeholder, will use PixiJS)              |
| `Colors.tsx`   | `/colors` — Design token visual showcase with all scales, buttons, cards |
| `NotFound.tsx` | `/*` — 404 page with "Go home" link                                      |

## For AI Agents

### Working In This Directory

- New pages must be added in 3 places:
  1. Create `PageName.tsx` here with `export default function PageName()`
  2. Add lazy import in `App.tsx`: `const PageName = lazy(() => import("./pages/PageName"))`
  3. Add `<Route>` in `App.tsx` inside the Layout route
- Optionally add to `navItems` array in `Navbar.tsx` for navigation link
- Static data arrays must be hoisted outside the component function
- Use `var()` tokens for all colors — never hardcode

### Common Patterns

- Pages use `<section className="mx-auto max-w-5xl px-6 py-24">` as container
- Headings use `font-display text-4xl font-bold tracking-tight`
- Secondary text uses `text-[var(--text-secondary)]`

<!-- MANUAL: -->
