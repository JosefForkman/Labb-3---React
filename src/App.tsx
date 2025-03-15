// import "@fontsource/poppins";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";
import ListItem from "./components/ListItem";
import { Todo, TodoList } from "./lib/types";
import useLocalStorage from "./lib/useLocalStorage";
import useTodo from "./lib/useTodo";

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

    const updateTodo = (todo: Todo, todoListId: string) => {
        const todoItem = useTodo(todos, todoListId, todo.id);
        if (!todoItem) {
            return;
        }

        todoItem.title = todo.title;
        setTodo([...todos]);
    };
    const toggleTodo = (todo: Todo, todoListId: string) => {
        const todoItem = useTodo(todos, todoListId, todo.id);
        if (!todoItem) {
            return;
        }

        todoItem.completed = !todoItem.completed;
        setTodo([...todos]);
    };

    const deleteTodo = (todo: Todo, todoListId: string) => {
        const todoList = todos.find((todo) => todo.id === todoListId);
        if (!todoList) return;

        const todoItemIndex = todoList.todos.findIndex(
            (item) => item.id === todo.id,
        );
        if (todoItemIndex === -1) {
            return;
        }

        todoList.todos.splice(todoItemIndex, 1);
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
                                deleteTodo={deleteTodo}
                                toggleTodo={toggleTodo}
                                updateTodo={updateTodo}
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
