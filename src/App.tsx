import "./App.css";
import Input from "./componets/Input";
import List from "./componets/List";
import Filter from "./componets/Filter";
import type { Filter as FilterType, Todo } from "./lib/types";
import useLocalStorage from "./lib/useLocalStorage";

function App() {
    const [todos, setTodo] = useLocalStorage<Todo[]>("todos", []);

    const addTodo = (title: string) => {
        const newTodo = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            show: true,
        };
        setTodo([...todos, newTodo]);
    };

    const toggleTodo = (id: string) => {
        setTodo(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo,
            ),
        );
    };

    const deleteTodo = (id: string) => {
        setTodo(todos.filter((todo) => todo.id !== id));
    };

    const filterAt = (filter: FilterType) => {
        switch (filter) {
            case "all":
                setTodo(todos.map((todo) => ({ ...todo, show: true })));
                break;
            case "completed":
                setTodo(
                    todos.map((todo) =>
                        todo.completed
                            ? { ...todo, show: true }
                            : { ...todo, show: false },
                    ),
                );
                break;
            case "active":
                setTodo(
                    todos.map((todo) =>
                        !todo.completed
                            ? { ...todo, show: true }
                            : { ...todo, show: false },
                    ),
                );
                break;
            default:
                setTodo(todos.map((todo) => ({ ...todo, show: true })));
                break;
        }
    };

    return (
        <>
            <h1>Todo List</h1>
            <Input addTodo={addTodo} />
            <Filter filterAt={filterAt} />
            <List
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
        </>
    );
}

export default App;

