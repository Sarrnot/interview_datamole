import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";

import { ThemeProvider } from "../components/providers/ThemeProvider";

// Wraps UI in the app ThemeProvider so styled-components `theme` is available in tests.
const Wrapper = ({ children }: React.PropsWithChildren) => <ThemeProvider>{children}</ThemeProvider>;

const render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
    rtlRender(ui, { wrapper: Wrapper, ...options });

// Re-export the full RTL API, overriding `render` with the theme-wrapped one.
export * from "@testing-library/react";
export { render };
