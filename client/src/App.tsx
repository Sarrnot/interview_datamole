import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { useTodosState } from "./stores/todosState";
import { ListItem } from "./components/ListItem";
import { useMemo } from "react";

export const App = () => {
    const { todos, removeTodo, toggleTodoDone } = useTodosState();

    /** Sorted todos: 1) not "done" first, 2) createdAt descending */
    const sortedTodos = useMemo(
        () =>
            todos.sort((todo1, todo2) => {
                if (todo1.isDone !== todo2.isDone) {
                    return todo1.isDone ? 1 : -1;
                }

                if (todo1.createdAt > todo2.createdAt) return -1;
                if (todo1.createdAt < todo2.createdAt) return 1;
                return 0;
            }),
        [todos]
    );

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={() => console.warn("unimplemented")}>To Do app</Header>
                    <List>
                        {sortedTodos.map((todo) => (
                            <ListItem
                                key={todo.id}
                                label={todo.label}
                                isDone={todo.isDone}
                                onItemDelete={() => removeTodo(todo)}
                                onItemDoneToggle={() => toggleTodoDone(todo)}
                                onItemLabelEdit={() => {}}
                            />
                        ))}
                    </List>
                    <Footer />
                </Layout>
            </Container>
        </ThemeProvider>
    );
};
