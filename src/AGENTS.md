<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-19 (routing + suspense ownership sync) -->

# src

## Purpose

Application source code. Entry point is `main.tsx` which renders `App.tsx` into the DOM. All React components, pages, contexts, and styles live here.

## Key Files

| File            | Description                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| `main.tsx`      | Entry point — `createRoot` + `StrictMode`                                            |
| `App.tsx`       | Router setup with `SchemeProvider` → `BrowserRouter` → lazy route registration       |
| `index.css`     | Tailwind v4 import, base styles, pixel `@utility` patterns (card, btn, dialog, etc.) |
| `vite-env.d.ts` | Vite client type declarations                                                        |

## Subdirectories

| Directory     | Purpose                                                      |
| ------------- | ------------------------------------------------------------ |
| `components/` | Reusable UI components (see `components/AGENTS.md`)          |
| `contexts/`   | React context providers (see `contexts/AGENTS.md`)           |
| `pages/`      | Route-level page components (see `pages/AGENTS.md`)          |
| `styles/`     | Design tokens and theme definitions (see `styles/AGENTS.md`) |
| `utils/`      | Shared utility functions and types (see `utils/AGENTS.md`)   |

## For AI Agents

### Working In This Directory

- `App.tsx` wraps everything in: `SchemeProvider` → `BrowserRouter` → `Routes`
- New pages must be lazy-loaded: `const Page = lazy(() => import("./pages/Page"))`
- New routes go inside the `<Route element={<Layout />}>` parent
- Path alias `@/*` maps to `./src/*` (defined in tsconfig)

### Common Patterns

- All route pages are registered with `React.lazy()` for code splitting
- Route `Suspense` fallback is implemented in `components/layout/Layout.tsx`

## Dependencies

### Internal

- `styles/tokens.css` imported via `index.css`
- `contexts/SchemeContext.tsx` wraps the entire app

<!-- MANUAL: -->
