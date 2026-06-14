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
-   Typecheck: `pnpm --filter ./client typecheck` (alias for `tsc --noEmit`)
-   Format: `pnpm --filter ./client format` (Prettier write)
-   Tests: none — no test framework is set up.

## Conventions

-   Prettier (root `.prettierrc`): 4-space indent, 120 print width, es5 trailing commas.
-   Assignment constraints (README): no Material UI, no Tailwind, do not modify the existing component library.
-   **Keep CLAUDE.md files in sync**: when a change makes any of these docs stale (this file, `client/CLAUDE.md`, `server/CLAUDE.md`, `client/src/components/CLAUDE.md`), update the affected file in the same change.
