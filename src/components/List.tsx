import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Todo, TodoList } from "../lib/types";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";
import ListItem from "./ListItem";

export default function List({
    taskList,
    updateTodo,
    deleteTodo,
    toggleTodo,
}: {
    taskList: TodoList;
    updateTodo: (todo: Todo, todoListId: string) => void;
    deleteTodo: (todo: Todo, todoListId: string) => void;
    toggleTodo: (todo: Todo, todoListId: string) => void;
}) {
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
                                todoListId={taskList.id}
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
