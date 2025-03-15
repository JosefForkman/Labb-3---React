import { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import List from "./components/List";
import { Filter, Todo, TodoList } from "./lib/types";
import useLocalStorage from "./lib/useLocalStorage";
import useTodo from "./lib/useTodo";

function App() {
    const [todos, setTodo] = useLocalStorage<TodoList[]>("todos", []);
    const [filter, setFilter] = useLocalStorage<Filter[]>("Filter", [
        { active: true, name: "All" },
    ]);

    const addTodo = (title: string, category: string) => {
        let todoList = todos.find((todo) => todo.name === category);
        const todo = {
            id: crypto.randomUUID(),
            title,
            completed: false,
        };

        // If the category does not exist, create a new category
        if (!todoList) {
            todoList = {
                id: crypto.randomUUID(),
                name: category,
                todos: [todo],
                show: true,
            };
            setTodo([todoList, ...todos]);

            return;
        }

        // Add the todo to the existing category
        todoList.todos.push(todo);
        setTodo([...todos]);
    };

    const updateTodo = (todo: Todo, todoListId: string) => {
        const todoItem = useTodo(todos, todoListId, todo.id);
        if (!todoItem) {
            return;
        }

        todoItem.title = todo.title;
        setTodo([...todos]);
    };
    const toggleTodo = (todo: Todo, todoListId: string) => {
        const todoItem = useTodo(todos, todoListId, todo.id);
        if (!todoItem) {
            return;
        }

        todoItem.completed = !todoItem.completed;
        setTodo([...todos]);
    };

    const deleteTodo = (todo: Todo, todoListId: string) => {
        const todoList = todos.find((todo) => todo.id === todoListId);
        if (!todoList) return;

        const todoItemIndex = todoList.todos.findIndex(
            (item) => item.id === todo.id,
        );
        if (todoItemIndex === -1) {
            return;
        }

        todoList.todos.splice(todoItemIndex, 1);
        setTodo([...todos]);
    };

    const updateFilter = (filterName: string) => {
        const newFilter = filter.map((filterItem) => {
            if (filterItem.name === filterName) {
                filterItem.active = true;
            } else {
                filterItem.active = false;
            }

            return filterItem;
        });

        const newTodo = todos.map((todo) => {
            if (filterName === "All") {
                todo.show = true;
                return todo;
            }

            todo.show = todo.name === filterName;
            return todo;
        });
        setTodo([...newTodo]);
        setFilter(newFilter);
    };
    return (
        <main>
            <h1>Todo List</h1>
            <Input addTodo={addTodo} Filters={filter} />
            <ul className="filter">
                {filter.map((filterItem, index) => {
                    return (
                        <li key={index}>
                            <button
                                className={filterItem.active ? "active" : ""}
                                onClick={() => updateFilter(filterItem.name)}>
                                {filterItem.name}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <ul className="todo-list">
                {todos.map((todoList) => {
                    if (!todoList.show) {
                        return null;
                    }
                    return (
                        <li key={todoList.id}>
                            <List
                                taskList={todoList}
                                deleteTodo={deleteTodo}
                                toggleTodo={toggleTodo}
                                updateTodo={updateTodo}
                                key={todoList.id}
                            />
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}

export default App;
