import { Todo, TodoCreate, TodoPatch } from "./todoSchema";

/** Pure transforms over a todo list — used for optimistic cache writes. No side effects. */

/** Build an optimistic Todo from create input. `now` is injected; negative temp id can't collide with real server ids. */
export const buildOptimisticTodo = (input: TodoCreate, now: number): Todo => ({
    id: -now,
    createdAt: now,
    ...input,
});

export const addTodo = (todos: Todo[], todo: Todo): Todo[] => [...todos, todo];

export const replaceTodo = (todos: Todo[], updated: Todo): Todo[] =>
    todos.map((t) => (t.id === updated.id ? updated : t));

export const mergeTodo = (todos: Todo[], patch: TodoPatch): Todo[] =>
    todos.map((t) => (t.id === patch.id ? { ...t, ...patch } : t));

export const removeTodo = (todos: Todo[], id: number): Todo[] => todos.filter((t) => t.id !== id);

/**
 * Patch that flips a todo's done state and assigns it a fresh `position` in the destination section.
 * Toggling moves an item between the active/done sections; reusing its old key could collide with an
 * existing key there (the sections share a keyspace), so the caller passes a section-unique position.
 */
export const toggledPatch = (todo: Pick<Todo, "id" | "isDone">, destinationPosition: string): TodoPatch => ({
    id: todo.id,
    isDone: !todo.isDone,
    position: destinationPosition,
});
