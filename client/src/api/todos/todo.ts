import { apiClient } from "../client";
import { TodoPatch, TodoCreate, Todo, TodoSchema } from "./todoSchema";

export const getTodos = async (): Promise<Todo[]> => {
    const data = await apiClient.get("/items/");
    return TodoSchema.array().parse(data);
};

/**
 * @returns newly created Todo from the server
 */
export const postTodo = async (todo: TodoCreate): Promise<Todo> => {
    const data = await apiClient.post("/items/", todo);
    return TodoSchema.parse(data);
};

/**
 * @returns updated Todo from the server
 */
export const putTodo = async (todo: Todo): Promise<Todo> => {
    const data = await apiClient.put(`/items/${todo.id}`, todo);
    return TodoSchema.parse(data);
};

/**
 * @returns patched Todo from the server
 */
export const patchTodo = async (todo: TodoPatch): Promise<Todo> => {
    const data = await apiClient.patch(`/items/${todo.id}/`, todo);
    return TodoSchema.parse(data);
};

export const deleteTodo = async (todo: Todo): Promise<void> => {
    await apiClient.delete(`/items/${todo.id}`);
};
