import { Todo } from "../lib/types";

export default function List({
    todos,
    toggleTodo,
    deleteTodo,
}: {
    todos: Todo[];
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}) {
    return (
        <ul>
            {todos.map((todo) => {
                if (!todo.show) {
                    return null;
                }
                return (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            defaultChecked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        {todo.title}
                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
