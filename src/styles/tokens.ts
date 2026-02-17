/**
 * AI Scream - Design Tokens (TypeScript)
 *
 * JS-accessible token values for use outside CSS context
 * (e.g., PixiJS canvas rendering, Motion animation configs).
 *
 * These MUST stay in sync with tokens.css.
 * Brand colors are PLACEHOLDER - update when finalized.
 */

export const colors = {
  brand: {
    50: "oklch(0.97 0.02 200)",
    100: "oklch(0.93 0.04 200)",
    200: "oklch(0.87 0.07 200)",
    300: "oklch(0.78 0.1 200)",
    400: "oklch(0.68 0.14 200)",
    500: "oklch(0.6 0.16 200)",
    600: "oklch(0.52 0.14 200)",
    700: "oklch(0.44 0.12 200)",
    800: "oklch(0.36 0.1 200)",
    900: "oklch(0.28 0.08 200)",
  },
  neutral: {
    50: "oklch(0.98 0 0)",
    100: "oklch(0.93 0 0)",
    200: "oklch(0.87 0 0)",
    300: "oklch(0.71 0 0)",
    400: "oklch(0.55 0 0)",
    500: "oklch(0.45 0 0)",
    600: "oklch(0.37 0 0)",
    700: "oklch(0.27 0 0)",
    800: "oklch(0.2 0 0)",
    850: "oklch(0.16 0 0)",
    900: "oklch(0.13 0 0)",
    950: "oklch(0.07 0 0)",
  },
  semantic: {
    error: "oklch(0.65 0.2 25)",
    info: "oklch(0.7 0.12 240)",
    success: "oklch(0.72 0.17 152)",
    warning: "oklch(0.8 0.15 75)",
  },
} as const;

/**
 * Hex fallbacks for PixiJS (which doesn't support oklch).
 * Approximate conversions - update when brand colors are finalized.
 */
export const pixiColors = {
  brand: {
    400: 0x4db8c7,
    500: 0x2d8fa0,
    600: 0x1d6e7d,
  },
  neutral: {
    50: 0xf5f5f5,
    400: 0x808080,
    700: 0x3a3a3a,
    900: 0x1a1a1a,
    950: 0x0d0d0d,
  },
  semantic: {
    error: 0xd94040,
    info: 0x5c8fcc,
    success: 0x40b87a,
    warning: 0xccaa40,
  },
} as const;

export const easing = {
  apple: [0.42, 0, 0.58, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
  snappy: [0.2, 0, 0, 1] as const,
};

export const duration = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
};
