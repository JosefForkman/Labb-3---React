import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Todo } from "../lib/types";
import { useState } from "react";

export default function ListItem({
    todo,
    updateTodo,
    toggleTodo,
    deleteTodo,
}: {
    todo: Todo;
    updateTodo: (id: string, title: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
}) {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(todo.title);

    const handelEditTitel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                />
                {edit ? (
                    <form
                        action={() => {
                            updateTodo(todo.id, title);
                            setEdit(false);
                        }}>
                        <input
                            type="text"
                            defaultValue={title}
                            onChange={handelEditTitel}
                            autoFocus
                        />
                        <button className="sr-only">Save</button>
                    </form>
                ) : (
                    title
                )}
            </label>
            <div>
                <button onClick={() => setEdit(!edit)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <span className="sr-only">Edit todo name</span>
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                    <span className="sr-only">Remove todo</span>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </>
    );
}
