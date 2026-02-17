import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import perfectionist from "eslint-plugin-perfectionist";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default defineConfig([
  globalIgnores(["dist/", "node_modules/", ".github/", "*.config.js"]),

  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      js,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      perfectionist,
    },
    extends: [
      "js/recommended",
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true, allowExportNames: ["useScheme"] },
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],

      // Perfectionist - sorting rules
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          internalPattern: ["^@/.+"],
          newlinesBetween: 0,
          groups: [
            "type-import",
            ["value-builtin", "value-external"],
            "type-internal",
            "value-internal",
            ["type-parent", "type-sibling", "type-index"],
            ["value-parent", "value-sibling", "value-index"],
            "unknown",
          ],
        },
      ],
      "perfectionist/sort-jsx-props": [
        "error",
        {
          type: "natural",
          order: "asc",
          ignoreCase: true,
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          type: "natural",
          order: "asc",
          ignoreCase: true,
        },
      ],
    },
  },
]);
