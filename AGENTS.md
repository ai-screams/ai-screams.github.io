<!-- Generated: 2026-02-17 | Updated: 2026-02-17 (CI/CD docs added) -->

# ai-screams.github.io

## Purpose

Personal developer portfolio and travel blog for AI Scream, deployed as a static SPA on GitHub Pages. Features a white-first pixel design with a switchable 4-scheme pastel color system and a pixel-art travel prototype.

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
- Verify color scheme switching works across all 4 schemes

### Common Patterns

- White-first pixel design (no dark mode)
- Route-level code splitting with `React.lazy()` + `Suspense`
- Shared state via Context Provider (React 19 `use()` API)
- 4-layer token architecture: Primitives → Schemes → Semantics → Pixel System
- Font tokens: `--font-pixel` (headings) and `--font-pixel-body` (body text)

## Dependencies

### External

- React 19.0.0 — UI framework (with React 19 APIs: `use()`)
- Vite 6.1.0 — Build tool with SWC (`@vitejs/plugin-react-swc` v4.0.0)
- Tailwind CSS v4.0.0 — Utility-first CSS (`@theme` directive, `@tailwindcss/vite` v4.0.0)
- Motion v12.4.0 — Page transition animations
- React Router v7.2.0 — Client-side routing
- TypeScript 5.7.0 — Static type checking

### Dev Dependencies (Key)

| Package                       | Version | Purpose                                                |
| ----------------------------- | ------- | ------------------------------------------------------ |
| `eslint`                      | 9.20.0  | Linter (flat config, v9+)                              |
| `@eslint/js`                  | 9.20.0  | ESLint recommended config for JS                       |
| `typescript-eslint`           | 8.24.0  | TypeScript support for ESLint                          |
| `eslint-plugin-react-hooks`   | 7.0.1   | Rules for React Hooks (memoization, dependencies)      |
| `eslint-plugin-react-refresh` | 0.5.0   | ESM named export: `import { reactRefresh } from "..."` |
| `eslint-plugin-perfectionist` | 5.5.0   | Import/prop/object sorting (natural, case-insensitive) |
| `eslint-config-prettier`      | 10.0.0  | Disables ESLint rules that conflict with Prettier      |
| `prettier`                    | 3.5.0   | Code formatter with tailwindcss plugin                 |
| `husky`                       | 9.0.0   | Git hooks (pre-commit)                                 |
| `lint-staged`                 | 16.2.7  | Run linters on staged files                            |

### ESLint Config (v9 Flat Config)

File: `eslint.config.js`

```javascript
// Plugins object (alphabetical order):
plugins: {
  js,                    // @eslint/js
  perfectionist,         // sort rules
  "react-hooks",         // React Hooks rules
  "react-refresh",       // ESM export validation
},

// Rules:
- sort-imports: natural asc, newlinesBetween: 0 (no blank lines between groups)
- sort-jsx-props: natural asc, case-insensitive
- sort-objects: natural asc, case-insensitive
- react-refresh/only-export-components: warn + allowExportNames: ["useScheme"]
- @typescript-eslint/no-unused-vars: error (ignorePattern: ^_)
```

### GitHub Actions (CI/CD)

| Workflow | Trigger      | Jobs                                           |
| -------- | ------------ | ---------------------------------------------- |
| `ci.yml` | Pull request | lint, typecheck, build, format-check, security |
| `deploy` | Push to main | build + GitHub Pages deploy                    |

All actions SHA-pinned:

- `actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683` (v4.2.2)
- `actions/setup-node@39370e3970a6d050c480ffad4ff0ed4d3fdee5af` (v4.1.0)

Security checks:

- `npm audit --audit-level=high`
- `gitleaks` v8.30.0 (CLI, installed via curl from releases)

<!-- MANUAL: -->
