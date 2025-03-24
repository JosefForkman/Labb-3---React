import type { Filter } from "../lib/types";

export default function Filter({
    filterAt,
}: {
    filterAt: (filter: Filter) => void;
}) {
    const formAction = (event: FormData) => {
        const filter = event.get("filter")?.toString();
        if (filter) {
            filterAt({ active: true, name: filter });
        }
    };

    return (
        <form action={formAction}>
            <select name="filter">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
            </select>
            <button>Sortera</button>
        </form>
    );
}
