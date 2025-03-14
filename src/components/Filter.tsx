import type { Filter } from "../lib/types";

export default function Filter({
    filterAt,
}: {
    filterAt: (filter: Filter) => void;
}) {
    return (
        <form action={(event) => filterAt(event.get("filter") as Filter)}>
            <select name="filter">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
            </select>
            <button>Sortera</button>
        </form>
    );
}
