// import "@fontsource/poppins";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";
import { TodoList } from "./lib/types";
import useLocalStorage from "./lib/useLocalStorage";

function App() {
    const [todos, setTodo] = useLocalStorage<TodoList[]>("todos", []);

    const addTodo = (title: string, category: string) => {
        let todoList = todos.find((todo) => todo.name === category);
        const todo = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            show: true,
        };

        // If the category does not exist, create a new category
        if (!todoList) {
            todoList = {
                id: crypto.randomUUID(),
                name: category,
                todos: [todo],
            };
            setTodo([todoList, ...todos]);

            return;
        }

        // Add the todo to the existing category
        todoList.todos.push(todo);
        setTodo([...todos]);
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
