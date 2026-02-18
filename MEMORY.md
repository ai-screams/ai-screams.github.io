# MEMORY

Last updated: 2026-02-19

## Current Git State

- Working branch: `feat/phase2-home`
- Branch HEAD: `1cb0f3d`
- `main` HEAD: `c44aed5` (includes merged PR #11 dependency update)
- Open PRs via `gh`: #8 (`eslint` 10 bump)

## Deployment

- Production URL: https://ai-screams.github.io
- Deploy trigger: push to `main` and manual `workflow_dispatch`

## App Status Snapshot

- Implemented routes: Home (`/`) on this branch, Colors (`/colors`), TestCssPixel (`/test-css-pixel`), NotFound (`*`)
- Placeholder routes: About (`/about`), Projects (`/projects`), Travel (`/travel`)

## Design System Snapshot

- 4 schemes active: `aurora`, `peach`, `cotton`, `matcha`
- Token stack: Primitives -> Schemes -> Semantics -> Pixel System
- Source of truth: `src/styles/tokens.css`, `src/styles/tokens.ts`

## CI Snapshot

- CI jobs (5): `lint`, `typecheck`, `build`, `format-check`, `security`
- Node version in workflows: 22
- Security checks: `npm audit --audit-level=high` and `gitleaks detect`
