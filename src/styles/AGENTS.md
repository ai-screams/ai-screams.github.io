<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-19 (fact-check refresh) -->

# styles

## Purpose

Centralized design token system for white-first pixel design. Single source of truth for colors, typography, spacing, animations, and pixel effects.

## Key Files

| File         | Description                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tokens.css` | Master token file — 4 sections: primitives (`@theme`), color schemes (`[data-scheme]`), semantics (`:root`), pixel system (`:root`)              |
| `tokens.ts`  | TypeScript exports for JS contexts (PixiJS, Motion) — `pixelFonts`, `pixelShadows`, `colors`, `pixiColors`, `schemeConfig`, `easing`, `duration` |

## For AI Agents

### Working In This Directory

**tokens.css 4-layer architecture:**

1. **Primitives** (`@theme` block): Neutral palette, semantic status colors, fonts (`--font-pixel`, `--font-pixel-body`), radius, shadows, easing, animations. These generate Tailwind utility classes. Scheme-independent.

2. **Color Schemes** (`[data-scheme]` selectors): Brand (`--color-brand-50..900`) and accent (`--color-accent-300..500`) palettes per scheme. Default Aurora Dream values in `:root`, overrides in `[data-scheme="peach"]`, `[data-scheme="cotton"]`, and `[data-scheme="matcha"]`.

3. **Semantic Tokens** (second `:root` block): Role-based aliases like `--surface`, `--text-primary`, `--text-brand`. These reference brand/accent variables and auto-switch with schemes. White-first (light is the only mode).

4. **Pixel Design System** (third `:root` block): Hard-edge borders, stepped shadows (`--pixel-shadow-sm/md/lg`), pixelated rendering, stepped animation timing, dot grid backgrounds.

**When adding a new color scheme:**

1. Add `[data-scheme="name"]` block in `tokens.css` with all `--color-brand-*` and `--color-accent-*` overrides
2. Add entry to `schemeConfig` in `tokens.ts`
3. Add scheme name to `ColorScheme` type union in `tokens.ts`
4. Add to `VALID_SCHEMES` set in `SchemeContext.tsx`
5. Add to regex in `index.html` scheme init script

**When modifying tokens.ts:**

- Keep `colors` object values in sync with Aurora Dream values from `tokens.css`
- `pixiColors` hex values are approximate conversions for PixiJS (doesn't support oklch)
- Exports: `pixelFonts`, `pixelShadows`, `colors`, `pixiColors`, `schemeConfig`, `easing`, `duration`
- Object keys must be alphabetically sorted (perfectionist)

### Color Space

All colors use **oklch** (perceptually uniform). Format: `oklch(lightness chroma hue)`.

- Lightness: 0–1 (0=black, 1=white)
- Chroma: 0–0.4 (0=gray, higher=more saturated)
- Hue: 0–360 degrees

## Dependencies

### Internal

- Imported by `index.css` (`@import "./styles/tokens.css"`)
- `tokens.ts` consumed by `contexts/SchemeContext.tsx` and `components/layout/Navbar.tsx` (`schemeConfig`, `ColorScheme`)

<!-- MANUAL: -->
