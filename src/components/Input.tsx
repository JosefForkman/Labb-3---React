export default function Input({
    addTodo,
}: {
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
                    <option value="jobb">Jobb</option>
                    <option value="hem">Hem</option>
                    <option value="skola">Skola</option>
                    <option value="övrigt">Övrigt</option>
                </select>
            </label>
            <button>Lägg till</button>
        </form>
    );
}
