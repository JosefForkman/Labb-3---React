import type { TodoList } from "./types";

export default function useTodo(
    todos: TodoList[],
    id: string,
    todoListId: string,
) {
    const todoListIndex = todos.findIndex(
        (todoList) => todoList.id === todoListId,
    );

    if (todoListIndex === -1) {
        return null;
    }
    
    const todoIndex = todos[todoListIndex].todos.findIndex(
        (todo) => todo.id === id,
    );
    if (todoIndex === -1) {
        return null;
    }
    
    const todo = todos[todoListIndex].todos[todoIndex];
    
    return todo;
}
