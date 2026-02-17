<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# layout

## Purpose

App shell components that wrap every page. Provides the persistent Navbar, page transition animation, and Footer.

## Key Files

| File         | Description                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `Layout.tsx` | Root layout — renders Navbar, `AnimatePresence` page transition (Motion), Footer. Uses `<Outlet />` from React Router.         |
| `Navbar.tsx` | Fixed header with solid border+bg, nav links + 3-dot color scheme switcher. Consumes `useScheme()` context. Uses `font-pixel`. |
| `Footer.tsx` | Simple footer with copyright text                                                                                              |

## For AI Agents

### Working In This Directory

- `Layout.tsx` is the route parent — it receives child pages via `<Outlet />`
- Page transitions use Motion's `AnimatePresence` with `mode="wait"` and `key={pathname}`
- Navbar uses solid `border-b border-[var(--border-default)] bg-[var(--surface)]` (no glassmorphism)
- Navbar uses `font-pixel` for brand name, not `font-display`
- Scheme switcher dots iterate `schemeConfig` from `styles/tokens.ts`
- Navigation items are defined in `navItems` array — add new nav links there

### Common Patterns

- Active nav link detection: exact match for `/`, prefix match for other paths
- Scheme dots: `Object.keys(schemeConfig)` renders in alphabetical order (aurora, cotton, peach)
- Token imports: `duration` and `easing` from `styles/tokens.ts` for animation config

## Dependencies

### Internal

- `contexts/SchemeContext.tsx` — `useScheme()` hook in Navbar
- `styles/tokens.ts` — `schemeConfig`, `ColorScheme` type, `duration`, `easing`

### External

- `motion/react` — `AnimatePresence`, `motion.div` for page transitions
- `react-router` — `Link`, `useLocation`, `Outlet`

<!-- MANUAL: -->
