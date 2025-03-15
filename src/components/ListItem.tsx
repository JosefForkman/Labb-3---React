import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Todo } from "../lib/types";
import { useState } from "react";

export default function ListItem({
    todo,
    todoListId,
    updateTodo,
    toggleTodo,
    deleteTodo,
}: {
    todo: Todo;
    todoListId: string;
    updateTodo: (todo: Todo, todoListId: string) => void;
    deleteTodo: (todo: Todo, todoListId: string) => void;
    toggleTodo: (todo: Todo, todoListId: string) => void;
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
                    onChange={() => toggleTodo(todo, todoListId)}
                />
                {edit ? (
                    <form
                        action={() => {
                            updateTodo({ ...todo, title }, todoListId);
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
                <button onClick={() => deleteTodo(todo, todoListId)}>
                    <span className="sr-only">Remove todo</span>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </>
    );
}
