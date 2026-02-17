<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# components

## Purpose

Reusable React UI components organized by category. Currently contains layout components shared across all pages.

## Subdirectories

| Directory | Purpose                                                                        |
| --------- | ------------------------------------------------------------------------------ |
| `layout/` | App shell components — Navbar, Footer, Layout wrapper (see `layout/AGENTS.md`) |

## For AI Agents

### Working In This Directory

- One component per file, filename matches component name (PascalCase)
- Use `export default function` pattern
- Consume design tokens via `var(--token-name)` in Tailwind arbitrary values: `text-[var(--text-brand)]`
- Future directories may include `ui/` (buttons, cards) and `travel/` (pixel map)

<!-- MANUAL: -->
