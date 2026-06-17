import { useMutation, useQuery, useQueryClient, type QueryClient } from "@tanstack/react-query";

import { deleteTodo, getTodos, patchTodo, postTodo, putTodo } from "./todo";
import { todoKeys } from "./todoKeys";
import { addTodo, buildOptimisticTodo, mergeTodo, removeTodo, replaceTodo, toggledPatch } from "./todoListUpdates";
import { TodoPatch, TodoCreate, Todo } from "./todoSchema";

export const useTodos = () => useQuery({ queryKey: todoKeys.list(), queryFn: getTodos });

/** Snapshot the list, apply an optimistic transform, return rollback context. */
const optimisticUpdate = async (queryClient: QueryClient, apply: (todos: Todo[]) => Todo[]) => {
    // Stop in-flight refetches so they can't overwrite our optimistic write.
    await queryClient.cancelQueries({ queryKey: todoKeys.list() });
    const previous = queryClient.getQueryData<Todo[]>(todoKeys.list());
    queryClient.setQueryData<Todo[]>(todoKeys.list(), (todos) => apply(todos ?? []));
    return { previous };
};

type MutationContext = { previous: Todo[] | undefined };

/** Shared error handler: roll back on failure. */
const rollbackOnError = (queryClient: QueryClient) => (_err: unknown, _vars: unknown, context?: MutationContext) => {
    if (context) queryClient.setQueryData(todoKeys.list(), context.previous);
};
/** Shared settled handler: always reconcile with the server. */
const reconcileOnSettled = (queryClient: QueryClient) => () => {
    return queryClient.invalidateQueries({ queryKey: todoKeys.all });
};

export const useCreateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo: TodoCreate) => postTodo(todo),
        onMutate: (todo) => {
            const optimistic = buildOptimisticTodo(todo, Date.now());
            return optimisticUpdate(queryClient, (todos) => addTodo(todos, optimistic));
        },
        onError: rollbackOnError(queryClient),
        onSettled: reconcileOnSettled(queryClient),
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo: Todo) => putTodo(todo),
        onMutate: (updated) => optimisticUpdate(queryClient, (todos) => replaceTodo(todos, updated)),
        onError: rollbackOnError(queryClient),
        onSettled: reconcileOnSettled(queryClient),
    });
};

export const usePatchTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo: TodoPatch) => patchTodo(todo),
        onMutate: (patch) => optimisticUpdate(queryClient, (todos) => mergeTodo(todos, patch)),
        onError: rollbackOnError(queryClient),
        onSettled: reconcileOnSettled(queryClient),
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo: Todo) => deleteTodo(todo),
        onMutate: (todo) => optimisticUpdate(queryClient, (todos) => removeTodo(todos, todo.id)),
        onError: rollbackOnError(queryClient),
        onSettled: reconcileOnSettled(queryClient),
    });
};

export const useToggleTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo: Todo) => patchTodo(toggledPatch(todo)),
        onMutate: (todo) => optimisticUpdate(queryClient, (todos) => mergeTodo(todos, toggledPatch(todo))),
        onError: rollbackOnError(queryClient),
        onSettled: reconcileOnSettled(queryClient),
    });
};
