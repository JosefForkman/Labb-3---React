import { Filter } from "../lib/types";

export default function Input({
    Filters,
    addTodo,
}: {
    Filters: Filter[];
    addTodo: (title: string, category: string) => void;
}) {
    const handelSubmit = (event: FormData) => {
        const title = event.get("title")?.toString();
        const category = event.get("category")?.toString();
        if (title && category) {
            addTodo(title, category);
        }
    };

    return (
        <form action={handelSubmit} className="formAdd">
            <label>
                Titel:
                <input type="text" name="title" placeholder="Add a new todo" />
            </label>
            <label>
                kategori:
                <select name="category">
                    {Filters.map((filter) => (
                        <option key={filter.name} value={filter.name}>
                            {filter.name}
                        </option>
                    ))}
                </select>
            </label>
            <button className="btn">Lägg till</button>
        </form>
    );
}
