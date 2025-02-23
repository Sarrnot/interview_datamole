import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { useTodosState } from "./stores/todosState";
import { ListItem } from "./components/ListItem";

export const App = () => {
    const { todos } = useTodosState();

    return (
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={() => console.warn("unimplemented")}>To Do app</Header>
                    <List>
                        {todos.map((todo) => (
                            <ListItem
                                key={todo.id}
                                label={todo.label}
                                isDone={todo.isDone}
                                onItemDelete={() => {}}
                                onItemDoneToggle={() => {}}
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
