import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "./ApiError";
import { createApiClient } from "./client";

const BASE_URL = "http://test.local";

/** Build a Response-like stub for the mocked fetch. */
const response = (body: unknown, { ok = true, status = 200, statusText = "OK" } = {}) =>
    ({
        ok,
        status,
        statusText,
        url: `${BASE_URL}/items/`,
        text: async () => (body === undefined ? "" : typeof body === "string" ? body : JSON.stringify(body)),
    }) as Response;

const fetchMock = vi.fn();
const client = createApiClient(BASE_URL);

beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
    vi.unstubAllGlobals();
    fetchMock.mockReset();
});

describe("createApiClient", () => {
    it("prefixes the request path with baseUrl", async () => {
        fetchMock.mockResolvedValue(response({ ok: 1 }));

        await client.get("/items/");

        expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/items/`, expect.anything());
    });

    it("sets JSON content-type headers", async () => {
        fetchMock.mockResolvedValue(response({ ok: 1 }));

        await client.get("/items/");

        expect(fetchMock.mock.calls[0][1].headers).toEqual({ "Content-Type": "application/json" });
    });

    it("omits the body on GET", async () => {
        fetchMock.mockResolvedValue(response({ ok: 1 }));

        await client.get("/items/");

        expect(fetchMock.mock.calls[0][1].body).toBeUndefined();
    });

    it.each([
        ["get", "GET"],
        ["post", "POST"],
        ["put", "PUT"],
        ["patch", "PATCH"],
        ["delete", "DELETE"],
    ] as const)("sends %s as the %s request method", async (verb, method) => {
        fetchMock.mockResolvedValue(response({ id: 1 }));

        await client[verb]("/items/");

        expect(fetchMock.mock.calls[0][1].method).toBe(method);
    });

    it("serializes the body to JSON", async () => {
        fetchMock.mockResolvedValue(response({ id: 1 }));

        await client.post("/items/", { label: "x" });

        expect(fetchMock.mock.calls[0][1].body).toBe(JSON.stringify({ label: "x" }));
    });

    it("parses a JSON response body", async () => {
        fetchMock.mockResolvedValue(response({ id: 1, label: "x" }));

        await expect(client.get("/items/")).resolves.toEqual({ id: 1, label: "x" });
    });

    it("returns undefined for an empty response body", async () => {
        fetchMock.mockResolvedValue(response(undefined));

        await expect(client.delete("/items/1")).resolves.toBeUndefined();
    });

    it("throws ApiError with status, url, and parsed body on non-OK", async () => {
        fetchMock.mockResolvedValue(
            response({ message: "boom" }, { ok: false, status: 500, statusText: "Internal Server Error" })
        );

        const error = (await client.get("/items/").catch((e) => e)) as ApiError;

        expect(error).toBeInstanceOf(ApiError);
        expect(error.status).toBe(500);
        expect(error.url).toBe(`${BASE_URL}/items/`);
        expect(error.body).toEqual({ message: "boom" });
    });

    it("falls back to raw text when the error body is not JSON", async () => {
        fetchMock.mockResolvedValue(response("plain error", { ok: false, status: 502, statusText: "Bad Gateway" }));

        const error = (await client.get("/items/").catch((e) => e)) as ApiError;

        expect(error).toBeInstanceOf(ApiError);
        expect(error.body).toBe("plain error");
    });
});
