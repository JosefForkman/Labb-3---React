import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Todo, TodoList } from "../lib/types";
import ListItem from "./ListItem";
import {
    faEllipsis,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function List({
    taskList,
    updateTodo,
    deleteTodo,
    toggleTodo,
    sortTodo,
    updateListTitle,
    deleteList,
}: {
    taskList: TodoList;
    updateTodo: (todo: Todo, todoListId: string) => void;
    deleteTodo: (todo: Todo, todoListId: string) => void;
    toggleTodo: (todo: Todo, todoListId: string) => void;
    sortTodo: (todoListId: string, sort: "asc" | "desc") => void;
    updateListTitle: (title: string, todoListId: string) => void;
    deleteList: (todoListId: string) => void;
}) {
    const [showMenu, setShowMenu] = useState(false);
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(taskList.name);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleTitelEdit = () => {
        setEdit(!edit);
    };

    const handelEditTitel = () => {
        setEdit(false);
        setShowMenu(false);
        updateListTitle(title, taskList.id);
    };

    return (
        <>
            <div className="header">
                {edit ? (
                    <form action={handelEditTitel}>
                        <input
                            type="text"
                            defaultValue={title}
                            onChange={(event) => setTitle(event.target.value)}
                            autoFocus
                        />
                        <button className="sr-only">Save</button>
                    </form>
                ) : (
                    <h2>{title}</h2>
                )}

                <button className="menu" onClick={toggleMenu}>
                    <span className="sr-only">List item menu</span>
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>

                <ul className={`menu-list ${showMenu ? "active" : ""}`}>
                    <li>
                        <button onClick={toggleTitelEdit}>
                            Edit title <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </li>
                    <li>
                        <button onClick={() => deleteList(taskList.id)}>
                            Remove <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                </ul>
            </div>

            <label className="sort">
                Sort by:
                <select
                    onChange={(event) =>
                        sortTodo(taskList.id, event.target.value as "asc" | "desc")
                    }>
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
