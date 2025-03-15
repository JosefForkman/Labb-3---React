import type { TodoList } from "./types";

export default function useTodo(
    Lists: TodoList[],
    todoListId: string,
    todoId: string,
) {
    const todoList = Lists.find((list) => list.id === todoListId);
    if (!todoList) {
        return;
    }

    const todo = todoList.todos.find((todo) => todo.id === todoId);
    if (!todo) {
        return;
    }

    return todo;
}
