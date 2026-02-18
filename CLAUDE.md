# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server (default port 5173)
npm run build        # TypeScript check + Vite production build (tsc -b && vite build)
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format all src files
npm run format:check # Prettier check (CI)
```

Pre-commit hook (Husky + lint-staged) runs `eslint --fix` and `prettier --write` on staged files automatically.

## Architecture

**AI Scream** — personal developer portfolio + travel blog, deployed to GitHub Pages as a static SPA.

### Tech Stack

- React 19 + TypeScript 5.7+ + Vite 6 (SWC plugin)
- Tailwind CSS v4 (`@theme` directive, no tailwind.config — configured in `src/styles/tokens.css`)
- Motion v12 (page transitions in Layout)
- React Router v7 (BrowserRouter, route-level lazy loading)

### Key Patterns

**Design Token System** (`src/styles/tokens.css` + `src/styles/tokens.ts`):

- 4-layer architecture: Primitives (`@theme`) → Schemes (`[data-scheme]`) → Semantics (`:root`) → Pixel System (`:root`)
- oklch color space throughout
- 4 switchable color schemes: Aurora Dream (default, lavender+mint), Cotton Sky (rose+skyblue), Matcha Garden (green+yellow-green), Peach Blossom (peach+gold)
- CSS variables consumed via `var(--token-name)` — never hardcode color values
- `tokens.ts` exports JS-accessible values for PixiJS/Motion (must stay in sync with CSS)

**Color Scheme Context** (`src/contexts/SchemeContext.tsx`):

- `SchemeProvider` wraps the app, manages `data-scheme` attribute + localStorage persistence
- Consume via `useScheme()` hook (React 19 `use()` API)
- `index.html` has inline script to prevent scheme flash on load

**Routing** (`src/App.tsx`):

- All pages lazy-loaded with `React.lazy()` + `Suspense`
- GitHub Pages SPA fallback via `public/404.html` → sessionStorage redirect

**Layout** (`src/components/layout/`):

- `Layout.tsx` — Navbar + AnimatePresence page transition + Footer
- `Navbar.tsx` — pixel-style fixed header with hard-edge border, nav links, 4-dot scheme switcher, and mobile hamburger menu
- `routing.ts` — shared `NavItem` type and `isActivePath()` helper used by Navbar and Footer

### Conventions

- **White-first**: Single light theme only — no dark mode
- **Korean**: UI text and comments may be in Korean; `<html lang="ko">`
- **Brand name**: "AI Scream" (singular), repo name is "AI Screams" (plural)
- **Path alias**: `@/*` maps to `./src/*`

## CI/CD

**CI Pipeline** (`.github/workflows/ci.yml`) — runs on pull requests to main:

- 5 parallel jobs: lint (`npm run lint`), typecheck (`npx tsc -b`), build (`npm run build`), format-check (`npm run format:check`), security (npm audit + gitleaks)
- All GitHub Actions pinned to commit SHAs for supply chain security
- Least-privilege permissions (`contents: read` only)

**Deploy Pipeline** (`.github/workflows/deploy.yml`) — runs on push to main:

- Builds dist artifact and deploys to GitHub Pages
- Triggered on push to `main` or manual `workflow_dispatch`

**Dependabot** (`.github/dependabot.yml`):

- npm: weekly updates (Mondays), minor/patch grouped into single PR
- GitHub Actions: monthly updates
- Commit prefixes: `chore(deps):` / `chore(ci):`

## Lint Rules

ESLint v9 flat config with `eslint-plugin-perfectionist`:

- **sort-imports**: natural ascending, no blank lines between import groups (`newlinesBetween: 0`)
- **sort-jsx-props**: alphabetical, case-insensitive
- **sort-objects**: alphabetical, case-insensitive

`eslint-config-prettier` is applied last to avoid conflicts. Prettier uses `prettier-plugin-tailwindcss` for class sorting.
