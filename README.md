# AI-SCREAM.

> We build things that make you **scream** — the good kind.

Brand homepage for **Ai-Scream**, a developer collective building useful things with AI.

**Live**: [ai-scream.ai](https://ai-scream.ai) · [한국어](https://ai-scream.ai/ko/)

## Stack

- **React 19** + **TypeScript** + **Vite 6** — with build-time prerendering (no runtime server)
- **Tailwind CSS v4** — design tokens via `@theme`, oklch colors only
- **Vitest** — unit tests for pure logic (typo graphics, SEO head builder)
- **GitHub Pages** — deployed automatically on merge to `main`

## Architecture

A one-page site, prerendered per locale at build time:

```
vite build            → client bundle + template (dist/)
vite build --ssr      → server entry (dist-ssr/)
scripts/prerender.mjs → renders EN → dist/index.html, KO → dist/ko/index.html
scripts/verify-prerender.mjs → asserts real content/SEO tags in the output (build gate)
```

The deployed HTML is complete before JavaScript runs — full content, `<title>`, meta description, canonical, `hreflang`, Open Graph, and JSON-LD baked in. The client then hydrates for interactions (scroll reveals, one small easter egg — try clicking the headline).

### Key directories

| Path              | Responsibility                                                     |
| ----------------- | ------------------------------------------------------------------ |
| `src/data/`       | Typed content — projects, members, site constants                  |
| `src/i18n/`       | `Copy` dictionary (EN/KO parity enforced by the type system)       |
| `src/components/` | One section per file — Hero, Work, Team, Contact                   |
| `src/seo/`        | `buildHead(locale)` — everything injected into `<!--app-head-->`   |
| `scripts/`        | Prerender + self-verification (runs as part of `npm run build`)    |
| `src/styles/`     | Design tokens — paper / ink / scream(pink) / mist, Swiss editorial |

## Development

```bash
npm install
npm run dev          # Vite dev server (append ?lang=ko for Korean)
npm run build        # typecheck + build + prerender + verify
npm run preview      # serve the built site (/ and /ko/)
npm run test         # Vitest
npm run lint         # ESLint
```

## Editing content

- **Add a project**: append an entry to `src/data/projects.ts` — EN/KO descriptions, tags, links. Projects without a screenshot get an auto-generated typographic visual from the name.
- **Add a member**: append to `src/data/members.ts`. The Team section (and its nav link) appears automatically once the array is non-empty.
- **Copy changes**: `src/i18n/copy.ts` — the `Copy` type forces every string to exist in both locales.

## Projects

| #   | Project                                            | What it is                                                     |
| --- | -------------------------------------------------- | -------------------------------------------------------------- |
| 01  | [scoop-uv](https://github.com/ai-screams/scoop-uv) | 🍨 Centralized Python venv manager — pyenv comfort at uv speed |
| 02  | [howl](https://github.com/ai-screams/howl)         | ⚡ Blazing-fast Go statusline HUD for Claude Code              |
| 03  | [Azimuth](https://github.com/ai-screams/Azimuth)   | 🧭 Keyboard-driven macOS window manager                        |
| 04  | [HwpForge](https://github.com/ai-screams/HwpForge) | 🔥 Rust library for Korean HWPX documents, with an MCP server  |

---

<sub>SERVED COLD &amp; SWEET — © 2026 AI-SCREAM</sub>
