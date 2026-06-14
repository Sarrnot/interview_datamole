# components/

Presentational components. See [client/CLAUDE.md](../../CLAUDE.md) for the whole client-application picture.

## Organization

-   **Layout shell**: `Container` (fullscreen center) → `Layout` (content box).
-   **Page parts**: `Header`, `List`, `ListItem`, `Footer`.
-   **Primitives**: `Button`, `Checkbox`, `form/` (`Form`, `Input`).
-   **System**: `providers/ThemeProvider`, `styles/GlobalStyle` (normalize + reset).

## Patterns

-   Pure presentational — todo state is lifted to `App.tsx`, passed down as props.
-   Local `useState` only for UI toggles (add/edit form open).
-   styled-components with theme injection; Radix primitives for accessibility (checkbox).
-   No business logic or API calls in components.

## Storybook

CSF3 stories live in `stories/` and `form/stories/`. Add a story when adding a component.

## Conventions

One component per file. Keep components dumb; push logic up to the hook/App.
