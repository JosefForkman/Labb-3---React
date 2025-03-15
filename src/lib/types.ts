export type Todo = {
    id: string;
    title: string;
    completed: boolean;
    show: boolean;
};

export type TodoList = {
    id: string;
    name: string;
    todos: Todo[];
};

export type Filter = "all" | "completed" | "active";
