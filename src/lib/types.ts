export type Todo = {
    id: string;
    title: string;
    completed: boolean;
};

export type TodoList = {
    id: string;
    name: string;
    todos: Todo[];
    show: boolean;
};

export type Filter = {
    active: boolean;
    name: string;
};
