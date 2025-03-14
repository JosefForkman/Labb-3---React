export default function Input({
    addTodo,
}: {
    addTodo: (title: string) => void;
}) {
    return (
        <form
            action={(event) => {
                const title = event.get("title")?.toString();
                if (title) {
                    addTodo(title);
                }
            }}>
            <input type="text" name="title" placeholder="Add a new todo" />
            <button>Add</button>
        </form>
    );
}
