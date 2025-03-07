import { useEffect, useState } from "react";
import { deleteTodo, getTodos, PartialTodoPatch, PartialTodoPost, patchTodo, postTodo, Todo } from "../api/todo";

export const useTodosState = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const updateTodos = () => {
        getTodos().then((data) => {
            setTodos(data);
        });
    };

    const editTodo = (todo: PartialTodoPatch) => {
        patchTodo(todo).then((updatedTodo) => {
            setTodos((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
        });
    };

    const addTodo = (todo: PartialTodoPost) => {
        postTodo(todo).then((newTodo) => {
            setTodos((prev) => [...prev, newTodo]);
        });
    };

    const removeTodo = (todo: Todo) => {
        deleteTodo(todo).then(() => {
            setTodos((prev) => prev.filter((t) => t.id !== todo.id));
        });
    };

    const toggleTodoDone = (todo: Todo) => {
        editTodo({ id: todo.id, isDone: !todo.isDone });
    };

    useEffect(() => {
        updateTodos();
    }, []);

    return { todos, updateTodos, editTodo, addTodo, removeTodo, toggleTodoDone };
};
