# src/api/

Data layer. The single boundary for all server I/O. See [client/CLAUDE.md](../../CLAUDE.md) and [root CLAUDE.md](../../../CLAUDE.md) for cross-app concerns.

Feature-sliced: each entity gets a folder.

## Shape

-   `client.ts` — the HTTP transport. `createApiClient` factory; exports `apiClient` singleton; throws an `ApiError` on any non-OK response.
-   `queryClient.ts` — configured TanStack `QueryClient`.
-   `todos/` — the todos feature slice.

## Key points

-   Server state lives in Tanstack Query.
-   Mutations are optimistic (snapshot in `onMutate`, roll back `onError`, invalidate `onSettled`).
-   Logic worth testing is extracted into pure modules (`todoListUpdates.ts`); hooks/fetch fns are thin wiring, left to integration coverage.
