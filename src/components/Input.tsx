export default function Input({
    addTodo,
}: {
    addTodo: (title: string) => void;
}) {
    const handelSubmit = (event: FormData) => {
        const title = event.get("title")?.toString();
        if (title) {
            addTodo(title);
        }
    };

    return (
        <form action={handelSubmit} className="formAdd">
            <input type="text" name="title" placeholder="Add a new todo" />
            <button>Lägg till</button>
        </form>
    );
}
