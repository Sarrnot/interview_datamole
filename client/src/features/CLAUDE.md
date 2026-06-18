# features/

Feature composition — wires the data layer to presentational components (`src/components/`). See [client CLAUDE.md](../../CLAUDE.md) for stack and layout.

## todos/

The drag-to-reorder todos UI, built on dnd-kit.

-   `SortableTodoList` / `SortableTodoItem` / `DragHandle` — the dnd-kit drag-reorder UI.
-   `CompletedSection` — dimmed "Completed" section wrapping done todos.
-   `ordering.ts` — pure `position` sort-key logic

`position` is a fractional sort key (see `fractional-indexing` dep): reordering edits one row's key instead of renumbering siblings.
