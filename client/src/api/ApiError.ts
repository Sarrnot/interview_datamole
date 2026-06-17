/** Thrown when a response comes back with a non-OK (outside 2xx) status. */
export class ApiError extends Error {
    constructor(
        public readonly status: number,
        public readonly statusText: string,
        public readonly url: string,
        /** Server error payload: parsed JSON if possible, else raw text, else undefined. */
        public readonly body: unknown
    ) {
        super(`API request failed: ${status} ${statusText} (${url})`);
        this.name = "ApiError";
    }
}
