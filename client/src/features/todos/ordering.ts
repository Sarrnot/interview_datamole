import { generateKeyBetween } from "fractional-indexing";

import { Todo, TodoMove } from "../../api/todos";

/** Pure todo-ordering logic. `position` is a fractional-index string; lexicographic order is display order. */

/** Sort a copy by `position` (plain lexicographic compare — matches the fractional-index byte order). */
export const sortByPosition = (todos: Todo[]): Todo[] =>
    [...todos].sort((a, b) => (a.position < b.position ? -1 : a.position > b.position ? 1 : 0));

/** Insert-at-end key: a new key after the largest existing `position` (or the first key when empty). */
export const appendPosition = (todos: Todo[]): string => {
    const max = todos.reduce<string | null>((m, t) => (m === null || t.position > m ? t.position : m), null);
    return generateKeyBetween(max, null);
};

/**
 * Given one section's todos sorted by `position` asc, compute the move that places `activeId`
 * at `overId`'s slot: a single fractional key between its new neighbours. Returns `null` for a no-op.
 */
export const computeMove = (ordered: Todo[], activeId: number, overId: number): TodoMove | null => {
    if (activeId === overId) return null;

    const from = ordered.findIndex((t) => t.id === activeId);
    const to = ordered.findIndex((t) => t.id === overId);
    if (from === -1 || to === -1) return null;

    const [prev, next] =
        from < to
            ? [ordered[to].position, ordered[to + 1]?.position ?? null]
            : [ordered[to - 1]?.position ?? null, ordered[to].position];

    return { id: activeId, position: generateKeyBetween(prev, next) };
};
