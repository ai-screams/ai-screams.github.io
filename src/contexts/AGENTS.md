<!-- Parent: ../AGENTS.md -->
<!-- Generated: 2026-02-17 | Updated: 2026-02-17 -->

# contexts

## Purpose

React context providers for shared application state. Providers are wrapped around the app in `App.tsx`.

## Key Files

| File                | Description                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------- |
| `SchemeContext.tsx` | Color scheme provider — manages `data-scheme` attribute, localStorage, exposes `useScheme()` |

## For AI Agents

### Working In This Directory

- Each context exports a Provider component + a `use*()` hook
- Use React 19 `use()` API (not `useContext()`) for consumption
- `useScheme()` is allowlisted in ESLint `react-refresh/only-export-components`
- New context hooks must be added to `allowExportNames` in `eslint.config.js`
- Provider wrapping order in `App.tsx`: `SchemeProvider` → `BrowserRouter` → `Suspense`

### Common Patterns

```tsx
// Creating a new context:
const MyContext = createContext<MyState | null>(null);
export function MyProvider({ children }: { children: ReactNode }) { ... }
export function useMyState() {
  const ctx = use(MyContext);
  if (!ctx) throw new Error("useMyState must be used within MyProvider");
  return ctx;
}
```

## Dependencies

### Internal

- `styles/tokens.ts` — `ColorScheme` type used by SchemeContext

<!-- MANUAL: -->
