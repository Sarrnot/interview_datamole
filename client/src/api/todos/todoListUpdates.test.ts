import { describe, expect, it } from "vitest";

import { addTodo, buildOptimisticTodo, mergeTodo, removeTodo, replaceTodo, toggledPatch } from "./todoListUpdates";
import { Todo } from "./todoSchema";

const a: Todo = { id: 1, label: "a", isDone: false, createdAt: 100 };
const b: Todo = { id: 2, label: "b", isDone: true, createdAt: 200 };
const list: Todo[] = [a, b];

describe("buildOptimisticTodo", () => {
    it("uses the negated now as a temp id and stamps createdAt", () => {
        expect(buildOptimisticTodo({ label: "new", isDone: false }, 1234)).toEqual({
            id: -1234,
            createdAt: 1234,
            label: "new",
            isDone: false,
        });
    });
});

describe("addTodo", () => {
    it("appends the todo", () => {
        const c: Todo = { id: 3, label: "c", isDone: false, createdAt: 300 };
        expect(addTodo(list, c)).toEqual([a, b, c]);
    });

    it("does not mutate the input", () => {
        const c: Todo = { id: 3, label: "c", isDone: false, createdAt: 300 };
        addTodo(list, c);
        expect(list).toEqual([a, b]);
    });
});

describe("replaceTodo", () => {
    it("replaces the todo matching the id", () => {
        const updated: Todo = { ...a, label: "updated" };
        expect(replaceTodo(list, updated)).toEqual([updated, b]);
    });

    it("leaves the list unchanged when no id matches", () => {
        const other: Todo = { id: 99, label: "x", isDone: false, createdAt: 1 };
        expect(replaceTodo(list, other)).toEqual([a, b]);
    });

    it("does not mutate the input", () => {
        replaceTodo(list, { ...a, label: "updated" });
        expect(list).toEqual([a, b]);
    });
});

describe("mergeTodo", () => {
    it("merges patch fields onto the matching todo, patch winning", () => {
        expect(mergeTodo(list, { id: 1, label: "patched" })).toEqual([{ ...a, label: "patched" }, b]);
    });

    it("only touches the matching todo", () => {
        expect(mergeTodo(list, { id: 2, isDone: false })).toEqual([a, { ...b, isDone: false }]);
    });

    it("does not mutate the input", () => {
        mergeTodo(list, { id: 1, label: "patched" });
        expect(list).toEqual([a, b]);
    });
});

describe("removeTodo", () => {
    it("removes the todo with the given id", () => {
        expect(removeTodo(list, 1)).toEqual([b]);
    });

    it("returns the list unchanged for an unknown id", () => {
        expect(removeTodo(list, 99)).toEqual([a, b]);
    });

    it("does not mutate the input", () => {
        removeTodo(list, 1);
        expect(list).toEqual([a, b]);
    });
});

describe("toggledPatch", () => {
    it("builds a patch flipping isDone false -> true", () => {
        expect(toggledPatch(a)).toEqual({ id: 1, isDone: true });
    });

    it("builds a patch flipping isDone true -> false", () => {
        expect(toggledPatch(b)).toEqual({ id: 2, isDone: false });
    });
});
