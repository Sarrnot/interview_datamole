# server/

Mock REST API. See [root CLAUDE.md](../CLAUDE.md) for the cross-app picture.

## Stack

Node + json-server 0.17.4 (lowdb-backed). Plain JavaScript, no TypeScript.

## Layout

-   `server.js` — setup, timestamp middleware, `server.listen(3000)`.
-   `db.json` — data store. Todos in the `items` array.

## Endpoints

json-server auto-generates REST on `/items/` (GET, POST, PATCH, PUT, DELETE).

## Persistence

Writes persist to `db.json` on disk. Reset state by editing the file.

## Custom behavior

Middleware in `server.js`: POST sets `createdAt`; `isDone: true` sets `endedAt`. Clients must not send these.

## Commands

None, server is plain JS with no tooling.

## Gotcha

json-server gives little routing control. Add custom routes as express middleware **before** `server.use(router)`.
