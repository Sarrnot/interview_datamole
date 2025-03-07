import { PickPartial } from "../types/PickPartial";
import { PickRequired } from "../types/PickRequired";

const API_URL = "http://localhost:3000"; // should be in .env

export type Todo = {
    id: number;
    label: string;
    isDone: boolean;
    createdAt: number;
    endedAt?: number;
};

export const getTodos = async () => {
    const response = await fetch(`${API_URL}/items/`);
    if (response.status !== 200) throw new Error("Error handling placeholder.");
    const data: Todo[] = await response.json();
    return data;
};

export type PartialTodoPost = PickPartial<Todo, "id" | "createdAt" | "endedAt">;
/**
 * @returns newly created Todo from the server
 */
export const postTodo = async (todo: PartialTodoPost) => {
    const response = await fetch(`${API_URL}/items/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    if (response.status !== 201) throw new Error("Error handling placeholder.");
    const newTodo: Todo = await response.json();
    return newTodo;
};

/**
 * @returns updated Todo from the server
 */
export const putTodo = async (todo: Todo) => {
    const response = await fetch(`${API_URL}/items/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    if (response.status !== 200) throw new Error("Error handling placeholder.");
    const updatedTodo: Todo = await response.json();
    return updatedTodo;
};

export const deleteTodo = async (todo: Todo) => {
    const response = await fetch(`${API_URL}/items/${todo.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    if (response.status !== 200) throw new Error("Error handling placeholder.");
};

export type PartialTodoPatch = PickRequired<Partial<Todo>, "id">;
/**
 * @returns patched Todo from the server
 */
export const patchTodo = async (todo: PartialTodoPatch) => {
    const response = await fetch(`${API_URL}/items/${todo.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    if (response.status !== 200) throw new Error("Error handling placeholder.");
    const patchedTodo: Todo = await response.json();
    return patchedTodo;
};
