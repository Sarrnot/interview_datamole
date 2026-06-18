import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";

import { Todo } from "../../api/todos";
import { ListItem } from "../../components/ListItem";
import { DragHandle } from "./DragHandle";

const Row = styled.div`
    display: flex;
    align-items: center;
`;

export type SortableTodoItemProps = {
    todo: Todo;
    onItemDelete: (todo: Todo) => void;
    onItemDoneToggle: (todo: Todo) => void;
    onItemLabelEdit: (label: string, todo: Todo) => void;
};

/** Wraps the presentational `ListItem` with a drag handle and dnd-kit sortable wiring. */
export const SortableTodoItem = ({ todo, onItemDelete, onItemDoneToggle, onItemLabelEdit }: SortableTodoItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: todo.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
    };

    return (
        <Row ref={setNodeRef} style={style}>
            <DragHandle {...attributes} {...listeners} aria-label={`Reorder ${todo.label}`} />
            <ListItem
                label={todo.label}
                isDone={todo.isDone}
                onItemDelete={() => onItemDelete(todo)}
                onItemDoneToggle={() => onItemDoneToggle(todo)}
                onItemLabelEdit={(label) => onItemLabelEdit(label, todo)}
            />
        </Row>
    );
};
