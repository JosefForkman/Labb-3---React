// import "@fontsource/poppins";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";
import { TodoList } from "./lib/types";
import useLocalStorage from "./lib/useLocalStorage";

function App() {
    const [todos, setTodo] = useLocalStorage<TodoList[]>("todos", []);

    const addTodo = (title: string) => {
        let todoList = todos[0];

        if (todoList === undefined) {
            todoList = {
                id: crypto.randomUUID(),
                name: "Todos",
                todos: [],
            };
        }

        const newTodo = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            show: true,
        };
        todoList.todos.push(newTodo);
        setTodo([todoList]);
    };

    return (
        <main>
            <h1>Todo List</h1>
            <Input addTodo={addTodo} />
            <ul className="todo-list">
                {todos.map((todoList) => {
                    return (
                        <li key={todoList.id}>
                            <List
                                taskList={todoList}
                                setTodo={setTodo}
                                key={todoList.id}
                            />
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}

export default App;
