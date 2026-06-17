# interview_datamole

Todo demo app: React client + json-server backend, in a pnpm monorepo.

## Architecture

pnpm workspace (`pnpm-workspace.yaml`) with two packages:

-   **client/** — React UI (Vite dev server). See [client/CLAUDE.md](client/CLAUDE.md).
-   **server/** — Mock REST API over `db.json`. See [server/CLAUDE.md](server/CLAUDE.md).

Client talks to server over HTTP REST at `http://localhost:3000`.

## Cross-app concerns

-   **Shared `Todo` shape**: declared client-side in `client/src/api/todo.ts`, mirrored by rows in `server/db.json`. No shared types package — keep both in sync by hand.
-   **Server-owned fields**: middleware in `server/server.js` sets `createdAt` (on POST) and `endedAt` (when `isDone` is true). The client must not send these.

## Commands

Run per-package via `--filter` from the repo root.

Verify changes (client only — server is plain JS with no tooling):

-   Lint: `pnpm --filter ./client lint` (ESLint, autofixes)
-   Lint one file: `pnpm --filter ./client lint:file <path>`
-   Typecheck: `pnpm --filter ./client typecheck` (`tsc --noEmit`; covers app + test files)
-   Format: `pnpm --filter ./client format` (Prettier write)
-   Tests: `pnpm --filter ./client test` (Vitest + React Testing Library, jsdom). Single file: `pnpm --filter ./client test <path>`.

Lint, typecheck, format and test are also enforced automatically via hooks in `.claude/settings.json` (`.claude/hooks/*.sh`).

## Conventions

-   Prettier (root `.prettierrc`): 4-space indent, 120 print width, es5 trailing commas.
-   **Tests**: when implementing or changing functionality, always consider adding tests for it.
-   **Testable architecture**: favor structure that is easy to test — keep components presentational, push logic into hooks/pure functions, and isolate side effects behind a single boundary (e.g. data access `client/src/api`) so it can be mocked. Prefer pure functions with explicit inputs/outputs over hidden state; inject dependencies rather than reaching for globals.
-   Assignment constraints (README): no Material UI, no Tailwind, do not modify the existing component library.
-   **CLAUDE.md style**: keep them lean — capture architecture, where to find details, and key gotchas worth knowing before searching. Don't list every file/function/field; that detail belongs in the code and only adds churn. Push deep detail into a nested CLAUDE.md and link to it.
-   **Keep CLAUDE.md files in sync**: when a change makes any of these docs stale (this file, `client/CLAUDE.md`, `server/CLAUDE.md`, `client/src/components/CLAUDE.md`), update the affected file in the same change.
