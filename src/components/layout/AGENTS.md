<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-18 (pixel redesign, mobile menu, Footer RPG impl) -->

# layout

## Purpose

App shell components that wrap every page. Provides the persistent Navbar, page transition animation, and Footer.

## Key Files

| File         | Description                                                                                                                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Layout.tsx` | Root layout — renders Navbar, `AnimatePresence` page transition (Motion), Footer. Uses `<Outlet />` from React Router.                                                                       |
| `Navbar.tsx` | Pixel-style fixed header with 3px hard-edge border+shadow, nav links, 4-dot color scheme switcher, and mobile hamburger menu with slide-in panel. Consumes `useScheme()` and `isActivePath`. |
| `Footer.tsx` | RPG pixel-dialog footer — nav links with `▸` prefix, `pixel-divider` `<hr>`, copyright, and GitHub link. Uses `pixel-dialog` utility class and `isActivePath` from `utils/routing`.          |

## For AI Agents

### Working In This Directory

- `Layout.tsx` is the route parent — it receives child pages via `<Outlet />`
- Page transitions use Motion's `AnimatePresence` with `mode="wait"` and `key={pathname}`
- Navbar uses `border-b-[3px] border-[var(--border-strong)] bg-[var(--surface)]` with pixel box-shadow (no glassmorphism)
- Navbar uses `font-pixel` for brand name, not `font-display`
- Scheme switcher iterates `schemeConfig` from `styles/tokens.ts` (4 schemes: aurora, cotton, matcha, peach)
- Navigation items are defined as `NavItem[]` arrays in each file — add new nav links to both `navItems` (Navbar) and `footerLinks` (Footer)
- Navbar mobile menu: hamburger button (lg:hidden), `AnimatePresence` slide-in panel from right, body scroll lock with iOS Safari fix, Escape key closes menu
- Footer excludes `/colors` route from `footerLinks` (developer-only page)

### Common Patterns

- Active nav link detection: `isActivePath(path, pathname)` from `utils/routing` — exact match for `/`, prefix match for others
- Scheme dots: `Object.keys(schemeConfig) as ColorScheme[]` renders in alphabetical order (aurora, cotton, matcha, peach)
- Token imports: `duration` and `easing` from `styles/tokens.ts` for animation config
- Touch targets: all interactive elements have `minHeight: "44px"` / `minWidth: "44px"`

## Dependencies

### Internal

- `contexts/SchemeContext.tsx` — `useScheme()` hook in Navbar
- `styles/tokens.ts` — `schemeConfig`, `ColorScheme` type, `duration`, `easing`
- `utils/routing.ts` — `NavItem` type, `isActivePath()` helper (used in both Navbar and Footer)

### External

- `motion/react` — `AnimatePresence`, `motion.div` for page transitions (Layout) and mobile menu (Navbar)
- `react-router` — `Link`, `useLocation`, `Outlet`

<!-- MANUAL: -->
