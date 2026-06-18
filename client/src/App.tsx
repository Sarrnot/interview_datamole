import { useMemo } from "react";
import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { CompletedSection, SortableTodoList, appendPosition, sortByPosition } from "./features/todos";
import { Todo, useCreateTodo, useDeleteTodo, useMoveTodo, usePatchTodo, useToggleTodo, useTodos } from "./api/todos";

export const App = () => {
    const { data: todos = [], isLoading, isError } = useTodos();
    const createTodo = useCreateTodo();
    const patchTodo = usePatchTodo();
    const moveTodo = useMoveTodo();
    const deleteTodo = useDeleteTodo();
    const toggleTodo = useToggleTodo();

    /** Two sections, each ordered by the user-controlled `position` key. */
    const activeTodos = useMemo(() => sortByPosition(todos.filter((todo) => !todo.isDone)), [todos]);
    const doneTodos = useMemo(() => sortByPosition(todos.filter((todo) => todo.isDone)), [todos]);

    const handleItemAdd = (label: string) => {
        createTodo.mutate({ label, isDone: false, position: appendPosition(activeTodos) });
    };

    const handleItemLabelEdit = (newLabel: string, todo: Todo) => {
        patchTodo.mutate({ id: todo.id, label: newLabel });
    };

    const handleItemDoneToggle = (todo: Todo) => {
        const destination = todo.isDone ? activeTodos : doneTodos;
        toggleTodo.mutate({ todo, destinationPosition: appendPosition(destination) });
    };

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={handleItemAdd}>To Do app</Header>
                    {isLoading && <span>Loading…</span>}
                    {isError && <span>Failed to load todos.</span>}
                    <SortableTodoList
                        todos={activeTodos}
                        onMove={(move) => moveTodo.mutate(move)}
                        onItemDelete={(todo) => deleteTodo.mutate(todo)}
                        onItemDoneToggle={handleItemDoneToggle}
                        onItemLabelEdit={handleItemLabelEdit}
                    />
                    {doneTodos.length > 0 && (
                        <CompletedSection>
                            <SortableTodoList
                                todos={doneTodos}
                                onMove={(move) => moveTodo.mutate(move)}
                                onItemDelete={(todo) => deleteTodo.mutate(todo)}
                                onItemDoneToggle={handleItemDoneToggle}
                                onItemLabelEdit={handleItemLabelEdit}
                            />
                        </CompletedSection>
                    )}
                    <Footer doneItems={doneTodos.length} todoItems={activeTodos.length} />
                </Layout>
            </Container>
        </ThemeProvider>
    );
};
