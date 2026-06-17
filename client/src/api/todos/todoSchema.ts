import { z } from "zod";

export const TodoSchema = z.object({
    id: z.number(),
    label: z.string(),
    isDone: z.boolean(),
    createdAt: z.number(),
    endedAt: z.number().optional(),
});

export type Todo = z.infer<typeof TodoSchema>;

/** POST input: only client-owned fields. */
export const TodoCreateSchema = TodoSchema.pick({ label: true, isDone: true });
export type TodoCreate = z.infer<typeof TodoCreateSchema>;

/** PATCH input: `id` required; only client-owned fields are patchable. */
export const TodoPatchSchema = TodoSchema.pick({ label: true, isDone: true })
    .partial()
    .extend({ id: TodoSchema.shape.id });
export type TodoPatch = z.infer<typeof TodoPatchSchema>;
