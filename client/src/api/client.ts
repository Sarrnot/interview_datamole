import { ApiError } from "./ApiError";

export const API_URL = "http://localhost:3000"; // should be in .env

/** Parse a body string as JSON, falling back to the raw string, or undefined if empty. */
const parseBody = (text: string): unknown => {
    if (!text) return undefined;
    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
};

/**
 * Creates an HTTP client bound to `baseUrl`. Each method prefixes the URL,
 * sets JSON headers, throws `ApiError` (with the server payload attached) on
 * non-OK status, and returns the parsed JSON body — or `undefined` for empty
 * responses. Returns `unknown`: callers validate the shape.
 */
export const createApiClient = (baseUrl: string) => {
    const request = async (path: string, method: string, body?: unknown): Promise<unknown> => {
        const response = await fetch(`${baseUrl}${path}`, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });

        const text = await response.text();

        if (!response.ok) {
            throw new ApiError(response.status, response.statusText, response.url, parseBody(text));
        }

        return parseBody(text);
    };

    return {
        get: (path: string) => request(path, "GET"),
        post: (path: string, body?: unknown) => request(path, "POST", body),
        put: (path: string, body?: unknown) => request(path, "PUT", body),
        patch: (path: string, body?: unknown) => request(path, "PATCH", body),
        delete: (path: string, body?: unknown) => request(path, "DELETE", body),
    };
};

/** Default singleton bound to the app's API URL. */
export const apiClient = createApiClient(API_URL);
