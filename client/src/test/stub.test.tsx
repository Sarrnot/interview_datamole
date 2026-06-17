import { describe, expect, it } from "vitest";

import { render, screen } from "./render";

// Test stub — copy this into a colocated `*.test.tsx` next to the component
// under test, then fill in the cases. `render` wraps the UI in the app
// ThemeProvider; mock HTTP by stubbing global `fetch` with `vi.stubGlobal`.
describe.skip("ComponentName", () => {
    it("describes the behaviour under test", () => {
        render(<div />);

        expect(screen.getByText("...")).toBeInTheDocument();
    });
});
