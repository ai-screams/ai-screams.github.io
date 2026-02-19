<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-18 | Updated: 2026-02-19 (fact-check refresh) -->

# utils

## Purpose

Shared utility functions and TypeScript types used across multiple components. Keeps common logic DRY and avoids coupling components to each other.

## Key Files

| File         | Description                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| `routing.ts` | Navigation types and helpers — `NavItem` interface, `isActivePath()` function for active link detection |

## For AI Agents

### Working In This Directory

- Utilities here must be pure functions or plain types — no React hooks, no side effects
- `NavItem` interface: `{ label: string; path: string }` — used by Navbar and Footer for nav link arrays
- `isActivePath(path, pathname)`: returns `true` if `path === "/"` and `pathname === "/"` (exact), or `pathname.startsWith(path)` for all other paths
- Add new shared logic here only when used in 2+ components; single-use logic stays in the component

### Common Patterns

```ts
// Consuming in a component:
import { type NavItem, isActivePath } from "../../utils/routing";

const items: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
];

const active = isActivePath(path, pathname);
```

## Dependencies

### Internal

- Consumed by `components/layout/Navbar.tsx` and `components/layout/Footer.tsx`

<!-- MANUAL: -->
