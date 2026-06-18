import { describe, expect, it } from "vitest";

import { Todo } from "../../api/todos";
import { appendPosition, computeMove, sortByPosition } from "./ordering";

const a: Todo = { id: 1, label: "a", isDone: false, createdAt: 100, position: "a0" };
const b: Todo = { id: 2, label: "b", isDone: true, createdAt: 200, position: "a1" };
const list: Todo[] = [a, b];

describe("sortByPosition", () => {
    const shuffled: Todo[] = [
        { id: 3, label: "c", isDone: false, createdAt: 1, position: "a2" },
        { id: 1, label: "a", isDone: false, createdAt: 1, position: "a0" },
        { id: 2, label: "b", isDone: false, createdAt: 1, position: "a1" },
    ];

    it("orders by position ascending", () => {
        expect(sortByPosition(shuffled).map((t) => t.id)).toEqual([1, 2, 3]);
    });

    it("does not mutate the input", () => {
        sortByPosition(shuffled);
        expect(shuffled.map((t) => t.id)).toEqual([3, 1, 2]);
    });
});

describe("appendPosition", () => {
    it("returns the first key for an empty list", () => {
        expect(typeof appendPosition([])).toBe("string");
        expect(appendPosition([])).not.toBe("");
    });

    it("returns a key that sorts after every existing position", () => {
        const key = appendPosition(list); // list positions: a0, a1
        expect(key > "a1").toBe(true);
    });
});

describe("computeMove", () => {
    // Ordered by position asc: t1(a0), t2(a1), t3(a2)
    const t1: Todo = { id: 1, label: "1", isDone: false, createdAt: 1, position: "a0" };
    const t2: Todo = { id: 2, label: "2", isDone: false, createdAt: 1, position: "a1" };
    const t3: Todo = { id: 3, label: "3", isDone: false, createdAt: 1, position: "a2" };
    const ordered = [t1, t2, t3];

    /** Apply a move's new position, then re-sort, returning the resulting id order. */
    const orderAfter = (activeId: number, overId: number): number[] => {
        const move = computeMove(ordered, activeId, overId);
        if (!move) return ordered.map((t) => t.id);
        const applied = ordered.map((t) => (t.id === move.id ? { ...t, position: move.position } : t));
        return sortByPosition(applied).map((t) => t.id);
    };

    it("moves an item down to the dropped slot", () => {
        expect(orderAfter(1, 3)).toEqual([2, 3, 1]);
    });

    it("moves an item up to the dropped slot", () => {
        expect(orderAfter(3, 1)).toEqual([3, 1, 2]);
    });

    it("moves an item into a middle slot between neighbours", () => {
        expect(orderAfter(1, 2)).toEqual([2, 1, 3]);
    });

    it("returns the moved id with the new position", () => {
        const move = computeMove(ordered, 1, 3)!;
        expect(move.id).toBe(1);
        expect(typeof move.position).toBe("string");
    });

    it("returns null for a no-op (active === over)", () => {
        expect(computeMove(ordered, 2, 2)).toBeNull();
    });

    it("returns null when an id is not in the list", () => {
        expect(computeMove(ordered, 99, 1)).toBeNull();
    });

    it("does not mutate the input", () => {
        computeMove(ordered, 1, 3);
        expect(ordered.map((t) => t.position)).toEqual(["a0", "a1", "a2"]);
    });
});
