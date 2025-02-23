import { useEffect, useState } from "react";
import { deleteTodo, getTodos, PartialTodo, postTodo, putTodo, Todo } from "../api/todo";

export const useTodosState = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const updateTodos = () => {
        getTodos().then((data) => {
            setTodos(data);
        });
    };

    const editTodo = (todo: Todo) => {
        putTodo(todo).then((updatedTodo) => {
            setTodos((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
        });
    };

    const addTodo = (todo: PartialTodo) => {
        postTodo(todo).then((newTodo) => {
            setTodos((prev) => ({ ...prev, newTodo }));
        });
    };

    const removeTodo = (todo: Todo) => {
        deleteTodo(todo).then(() => {
            setTodos((prev) => prev.filter((t) => t.id !== todo.id));
        });
    };

    const toggleTodoDone = (todo: Todo) => {
        editTodo({ ...todo, isDone: !todo.isDone });
    };

    useEffect(() => {
        updateTodos();
    }, []);

    return { todos, updateTodos, editTodo, addTodo, removeTodo, toggleTodoDone };
};
