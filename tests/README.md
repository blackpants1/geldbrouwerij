# Tests

- `e2e/` — Playwright end-to-end tests (starts dev server, drives browser).
- `unit/` — Vitest unit tests voor pure functies (lib/brouwketel/*).

## Draaien

```bash
npm run test        # unit (vitest)
npm run e2e         # playwright
npm run verify      # lint + typecheck + test + e2e
```

Zie `spec.md §6` voor de acceptatiecriteria.
