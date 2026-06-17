# client/

React frontend. See [root CLAUDE.md](../CLAUDE.md) for cross-app concerns.

## Stack

React 18 + TypeScript (strict) + Vite 5. styled-components 6, Radix UI, Storybook 8. TanStack Query 5, zod 3. Tests: Vitest 2 + React Testing Library (jsdom).

## Layout

-   `src/main.tsx` — mounts `<App />` to `#root`, wrapped in `<QueryClientProvider>`.
-   `src/App.tsx` — app root; holds the todos feature inline (no router yet).
-   `src/api/` — data layer; single boundary for server I/O. See [api/CLAUDE.md](src/api/CLAUDE.md).
-   `src/stores/` — reserved for client-only state (none today; server state lives in TanStack Query).
-   `src/components/` — presentational. See [components/CLAUDE.md](src/components/CLAUDE.md).
-   `src/types/` — utility types.
-   `src/test/` — test harness

## Testing

Vitest config in `vite.config.ts`. Tests colocated as `*.test.ts(x)`. Component tests import `render` from `src/test/render`.

## Commands

See [root CLAUDE.md](../CLAUDE.md#commands) — run from repo root via `pnpm --filter ./client <script>`. Scripts are defined in `package.json`.

## Conventions

-   styled-components with theme injection (Radix colors); no CSS files.
-   Path aliases resolved via `vite-tsconfig-paths`.
