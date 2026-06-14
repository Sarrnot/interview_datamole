# client/

React frontend. See [root CLAUDE.md](../CLAUDE.md) for cross-app concerns.

## Stack

React 18 + TypeScript (strict) + Vite 5. styled-components 6, Radix UI, Storybook 8.

## Layout

-   `src/main.tsx` — mounts `<App />` to `#root`.
-   `src/App.tsx` — state owner; application code.
-   `src/api/todo.ts` — CRUD fetch + `Todo` type.
-   `src/stores/todosState.ts` — `useTodosState` hook.
-   `src/components/` — presentational. See [components/CLAUDE.md](src/components/CLAUDE.md).
-   `src/types/` — utility types.

## State model

A single `useTodosState` hook holds the todos array and exposes `updateTodos / editTodo / addTodo / removeTodo / toggleTodoDone`. Each mutation calls the API, then updates local state from the response (no separate cache). `App.tsx` sorts not-done first, then by `createdAt` descending.

## Commands

See [root CLAUDE.md](../CLAUDE.md#commands) — run from repo root via `pnpm --filter ./client <script>`. Scripts are defined in `package.json`.

## Conventions

-   styled-components with theme injection (Radix colors); no CSS files.
-   Path aliases resolved via `vite-tsconfig-paths`.
