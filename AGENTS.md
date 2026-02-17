<!-- Generated: 2026-02-17 | Updated: 2026-02-17 (CI/CD docs added) -->

# ai-screams.github.io

## Purpose

Personal developer portfolio and travel blog for AI Scream, deployed as a static SPA on GitHub Pages. Features a white-first pixel design with a switchable 3-scheme pastel color system and a pixel-art travel prototype.

## Key Files

| File                | Description                                        |
| ------------------- | -------------------------------------------------- |
| `package.json`      | Dependencies, scripts, lint-staged config          |
| `vite.config.ts`    | Vite + React SWC + Tailwind CSS v4 plugins         |
| `tsconfig.app.json` | TypeScript strict config with `@/*` path alias     |
| `eslint.config.js`  | ESLint v9 flat config with perfectionist sorting   |
| `index.html`        | Entry HTML with scheme init + SPA redirect scripts |
| `CLAUDE.md`         | AI agent guidance for this repository              |
| `.prettierrc`       | Prettier config with tailwindcss plugin            |

## Subdirectories

| Directory            | Purpose                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `src/`               | Application source code (see `src/AGENTS.md`)                                                 |
| `public/`            | Static assets (`404.html` SPA fallback, `vite.svg` icon)                                      |
| `.github/workflows/` | CI (`ci.yml`: lint, typecheck, build, format, security) + Deploy (`deploy.yml`: GitHub Pages) |
| `.github/`           | `dependabot.yml` — automated npm weekly + GitHub Actions monthly updates                      |
| `.husky/`            | Git hooks (pre-commit runs lint-staged)                                                       |
| `.docs/ideas/`       | Brainstorming and planning documents                                                          |

## For AI Agents

### Working In This Directory

- Run `npm run lint` and `npm run build` to verify changes
- All colors must use design tokens via `var()` — never hardcode oklch/hex values
- Imports must be sorted alphabetically with no blank lines between groups (perfectionist)
- JSX props and object keys must be sorted alphabetically
- Korean language for UI text; `<html lang="ko">`
- Brand name is "AI Scream" (singular), repo is "AI Screams" (plural)

### Testing Requirements

- `npm run build` (TypeScript check + Vite build) must pass
- `npm run lint` must pass with 0 errors
- Verify color scheme switching works across all 3 schemes

### Common Patterns

- White-first pixel design (no dark mode)
- Route-level code splitting with `React.lazy()` + `Suspense`
- Shared state via Context Provider (React 19 `use()` API)
- 4-layer token architecture: Primitives → Schemes → Semantics → Pixel System
- Font tokens: `--font-pixel` (headings) and `--font-pixel-body` (body text)

## Dependencies

### External

- React 19 — UI framework (with React 19 APIs: `use()`)
- Vite 6 — Build tool with SWC
- Tailwind CSS v4 — Utility-first CSS (`@theme` directive)
- Motion v12 — Page transition animations
- React Router v7 — Client-side routing

<!-- MANUAL: -->
