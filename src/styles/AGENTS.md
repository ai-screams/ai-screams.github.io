<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# styles

## Purpose

Centralized design token system following Figma-style architecture. Single source of truth for colors, typography, spacing, and animations.

## Key Files

| File         | Description                                                                                                            |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `tokens.css` | Master token file — primitives (`@theme`), color schemes (`[data-scheme]`), semantics (`:root`), light mode (`.light`) |
| `tokens.ts`  | TypeScript exports for JS contexts (PixiJS, Motion) — must stay in sync with `tokens.css`                              |

## For AI Agents

### Working In This Directory

**tokens.css 3-layer architecture:**

1. **Primitives** (`@theme` block): Neutral palette, semantic status colors, fonts, radius, shadows, easing, animations. These generate Tailwind utility classes. Scheme-independent.

2. **Color Schemes** (`[data-scheme]` selectors): Brand (`--color-brand-50..900`) and accent (`--color-accent-300..500`) palettes per scheme. Default Aurora Dream values in `:root`, overrides in `[data-scheme="peach"]` and `[data-scheme="cotton"]`.

3. **Semantic Tokens** (second `:root` block): Role-based aliases like `--surface`, `--text-primary`, `--text-brand`. These reference brand/accent variables and auto-switch with schemes.

**When adding a new color scheme:**

1. Add `[data-scheme="name"]` block in `tokens.css` with all `--color-brand-*` and `--color-accent-*` overrides
2. Add entry to `schemeConfig` in `tokens.ts`
3. Add scheme name to `ColorScheme` type union in `tokens.ts`
4. Add to `VALID_SCHEMES` set in `SchemeContext.tsx`
5. Add to regex in `index.html` scheme init script

**When modifying tokens.ts:**

- Keep `colors` object values in sync with Aurora Dream values from `tokens.css`
- `pixiColors` hex values are approximate conversions for PixiJS (doesn't support oklch)
- Object keys must be alphabetically sorted (perfectionist)

### Color Space

All colors use **oklch** (perceptually uniform). Format: `oklch(lightness chroma hue)`.

- Lightness: 0–1 (0=black, 1=white)
- Chroma: 0–0.4 (0=gray, higher=more saturated)
- Hue: 0–360 degrees

## Dependencies

### Internal

- Imported by `index.css` (`@import "./styles/tokens.css"`)
- `tokens.ts` consumed by `contexts/SchemeContext.tsx` and `components/layout/Layout.tsx`

<!-- MANUAL: -->
