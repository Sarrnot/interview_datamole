import { useMemo } from "react";
import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { ListItem } from "./components/ListItem";
import { Todo, useCreateTodo, useDeleteTodo, usePatchTodo, useToggleTodo, useTodos } from "./api/todos";

export const App = () => {
    const { data: todos = [], isLoading, isError } = useTodos();
    const createTodo = useCreateTodo();
    const patchTodo = usePatchTodo();
    const deleteTodo = useDeleteTodo();
    const toggleTodo = useToggleTodo();

    /** Sorted todos: 1) not "done" first, 2) createdAt descending */
    const sortedTodos = useMemo(
        () =>
            [...todos].sort((todo1, todo2) => {
                if (todo1.isDone !== todo2.isDone) {
                    return todo1.isDone ? 1 : -1;
                }

                if (todo1.createdAt > todo2.createdAt) return -1;
                if (todo1.createdAt < todo2.createdAt) return 1;
                return 0;
            }),
        [todos]
    );

    const doneCount = todos.reduce((count, todo) => (todo.isDone ? count + 1 : count), 0);

    const handleItemAdd = (label: string) => {
        createTodo.mutate({ label, isDone: false });
    };

    const handleItemLabelEdit = (newLabel: string, todo: Todo) => {
        patchTodo.mutate({ id: todo.id, label: newLabel });
    };

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={handleItemAdd}>To Do app</Header>
                    <List>
                        {isLoading && <span>Loading…</span>}
                        {isError && <span>Failed to load todos.</span>}
                        {sortedTodos.map((todo) => (
                            <ListItem
                                key={todo.id}
                                label={todo.label}
                                isDone={todo.isDone}
                                onItemDelete={() => deleteTodo.mutate(todo)}
                                onItemDoneToggle={() => toggleTodo.mutate(todo)}
                                onItemLabelEdit={(label) => handleItemLabelEdit(label, todo)}
                            />
                        ))}
                    </List>
                    <Footer doneItems={doneCount} todoItems={todos.length - doneCount} />
                </Layout>
            </Container>
        </ThemeProvider>
    );
};
