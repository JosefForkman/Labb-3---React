export type Todo = {
    id: string;
    title: string;
    completed: boolean;
    show: boolean;
};

export type Filter = "all" | "completed" | "active";
