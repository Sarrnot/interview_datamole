const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === "POST") {
        req.body.createdAt = Date.now();
    }

    if (["POST", "PUT", "PATCH"].includes(req.method)) {
        if (req.body.isDone) {
            req.body.endedAt ??= Date.now();
        }
    }

    next();
});

// Use default router
server.use(router);
server.listen(3000, () => {
    console.log("JSON Server is running");
});
