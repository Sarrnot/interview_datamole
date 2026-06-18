import { describe, expect, it, vi } from "vitest";

import { Todo } from "../../api/todos";
import { act, render, screen } from "../../test/render";
import { SortableTodoList } from "./SortableTodoList";

// dnd-kit's pointer/keyboard physics need real element rects, which jsdom lacks. Stub the
// sortable wiring and capture `DndContext`'s `onDragEnd` so we can drive the drop directly —
// the move math itself is covered by computeMove's unit tests.
const dnd = vi.hoisted(() => ({ onDragEnd: undefined as undefined | ((event: unknown) => void) }));

vi.mock("@dnd-kit/core", async (importOriginal) => {
    const actual = (await importOriginal()) as Record<string, unknown>;
    return {
        ...actual,
        DndContext: ({ children, onDragEnd }: { children: React.ReactNode; onDragEnd: (e: unknown) => void }) => {
            dnd.onDragEnd = onDragEnd;
            return children;
        },
    };
});

vi.mock("@dnd-kit/sortable", () => ({
    SortableContext: ({ children }: { children: React.ReactNode }) => children,
    sortableKeyboardCoordinates: () => undefined,
    verticalListSortingStrategy: undefined,
    arrayMove: <T,>(items: T[], from: number, to: number): T[] => {
        const next = items.slice();
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        return next;
    },
    useSortable: () => ({
        attributes: {},
        listeners: {},
        setNodeRef: () => undefined,
        transform: null,
        transition: undefined,
        isDragging: false,
    }),
}));

const todos: Todo[] = [
    { id: 1, label: "one", isDone: false, createdAt: 1, position: "a0" },
    { id: 2, label: "two", isDone: false, createdAt: 2, position: "a1" },
    { id: 3, label: "three", isDone: false, createdAt: 3, position: "a2" },
];

const noop = () => {};

const renderList = (props: Partial<React.ComponentProps<typeof SortableTodoList>> = {}) =>
    render(
        <SortableTodoList
            todos={todos}
            onMove={noop}
            onItemDelete={noop}
            onItemDoneToggle={noop}
            onItemLabelEdit={noop}
            {...props}
        />
    );

describe("SortableTodoList", () => {
    it("renders todos in the given order, each with a reorder handle", () => {
        renderList();

        expect(screen.getByText("one")).toBeInTheDocument();
        expect(screen.getByText("two")).toBeInTheDocument();
        expect(screen.getByText("three")).toBeInTheDocument();

        expect(screen.getByLabelText("Reorder one")).toBeInTheDocument();
        expect(screen.getByLabelText("Reorder two")).toBeInTheDocument();
        expect(screen.getByLabelText("Reorder three")).toBeInTheDocument();
    });

    it("reports a fractional move when an item is dropped onto another's slot", () => {
        const onMove = vi.fn();
        renderList({ onMove });

        // Drop "one" (a0) onto "three" (a2): it lands at the bottom, after a2.
        act(() => dnd.onDragEnd?.({ active: { id: 1 }, over: { id: 3 } }));

        expect(onMove).toHaveBeenCalledTimes(1);
        const move = onMove.mock.calls[0][0];
        expect(move.id).toBe(1);
        expect(move.position > "a2").toBe(true);
    });

    it("ignores a drop outside any droppable (no over) and a no-op drop", () => {
        const onMove = vi.fn();
        renderList({ onMove });

        dnd.onDragEnd?.({ active: { id: 1 }, over: null });
        dnd.onDragEnd?.({ active: { id: 2 }, over: { id: 2 } });

        expect(onMove).not.toHaveBeenCalled();
    });
});
