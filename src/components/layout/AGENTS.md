<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# layout

## Purpose

App shell components that wrap every page. Provides the persistent Navbar, page transition animation, and Footer.

## Key Files

| File         | Description                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `Layout.tsx` | Root layout — renders Navbar, `AnimatePresence` page transition (Motion), Footer. Uses `<Outlet />` from React Router. |
| `Navbar.tsx` | Fixed glass-morphism header with nav links + 3-dot color scheme switcher. Consumes `useScheme()` context.              |
| `Footer.tsx` | Simple footer with copyright text                                                                                      |

## For AI Agents

### Working In This Directory

- `Layout.tsx` is the route parent — it receives child pages via `<Outlet />`
- Page transitions use Motion's `AnimatePresence` with `mode="wait"` and `key={pathname}`
- Navbar uses `glass` utility class (defined in `index.css`) for glassmorphism
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
