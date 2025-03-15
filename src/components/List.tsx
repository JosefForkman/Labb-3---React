import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodoList } from "../lib/types";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";
import ListItem from "./ListItem";
import useTodo from "../lib/useTodo";

export default function List({
    taskList,
    setTodo,
}: {
    taskList: TodoList;
    setTodo: (value: TodoList[]) => void;
}) {
    const updateTodo = (id: string, title: string) => {
        const todo = useTodo([taskList], id, taskList.id);
        if (!todo) {
            return;
        }

        todo.title = title;

        setTodo([taskList]);
    };
    const toggleTodo = (id: string) => {
        const todo = useTodo([taskList], id, taskList.id);
        if (!todo) {
            return;
        }

        todo.completed = !todo.completed;

        setTodo([taskList]);
    };

    const deleteTodo = (id: string) => {
        const todo = useTodo([taskList], id, taskList.id);
        if (!todo) {
            return;
        }

        const removeTodo = taskList.todos.filter((todo) => todo.id !== id);

        taskList.todos = removeTodo;

        setTodo([taskList]);
    };
    return (
        <>
            <div className="header">
                <h2>{taskList.name}</h2>
                <button>
                    <span className="sr-only">List item menu</span>
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>
            </div>

            <label className="sort">
                Sort by:
                <select>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
            <ul className="todo">
                {taskList.todos.map((todo) => {
                    return (
                        <li key={todo.id}>
                            <ListItem
                                todo={todo}
                                updateTodo={updateTodo}
                                deleteTodo={deleteTodo}
                                toggleTodo={toggleTodo}
                            />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
