import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import { Todo, TodoMove } from "../../api/todos";
import { List } from "../../components/List";
import { computeMove, sortByPosition } from "./ordering";
import { SortableTodoItem } from "./SortableTodoItem";

export type SortableTodoListProps = {
    /** Todos for this section, already filtered and sorted by `position` asc. */
    todos: Todo[];
    onMove: (move: TodoMove) => void;
    onItemDelete: (todo: Todo) => void;
    onItemDoneToggle: (todo: Todo) => void;
    onItemLabelEdit: (label: string, todo: Todo) => void;
};

/**
 * A drag-sortable list section. Owns its own `DndContext`, so two sections rendered side by side
 * stay isolated (no cross-section dragging). On drop it computes a single fractional-index move.
 */
export const SortableTodoList = ({ todos, onMove, ...itemHandlers }: SortableTodoListProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    // Local order so a drop reorders the list *synchronously*, in the same frame dnd-kit ends the
    // drag. Persisting runs through React Query (a tick later); without the local copy the list
    // would flash its original order for one frame before the optimistic write lands.
    const [items, setItems] = useState(todos);
    useEffect(() => setItems(todos), [todos]);

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over) return;

        const move = computeMove(items, Number(active.id), Number(over.id));
        if (!move) return;

        // Instant visual reorder: drop the new position onto the moved todo and re-sort, same as
        // persistence will reconcile back into `items` a tick later via the optimistic cache update.
        const moved = items.map((t) => (t.id === move.id ? { ...t, position: move.position } : t));
        setItems(sortByPosition(moved));
        onMove(move);
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <List>
                    {items.map((todo) => (
                        <SortableTodoItem key={todo.id} todo={todo} {...itemHandlers} />
                    ))}
                </List>
            </SortableContext>
        </DndContext>
    );
};
