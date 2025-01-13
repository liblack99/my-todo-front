import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";
import TodoItem from "./TodoItem";

type TodoFilter = "all" | "pending" | "in_progress" | "completed";

const filters = {
  all: "All",
  pending: "Pending",
  in_progress: "In Progress",
  complete: "Completed",
};

const Todos: React.FC = () => {
  const {error, todos} = useSelector((state: RootState) => state.todos);
  const [filter, setFilter] = useState<TodoFilter>("all");

  const filteredTodos =
    filter === "all" ? todos : todos.filter((todo) => todo.status === filter);

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md w-full sm:w-full md:w-[600px] lg:w-[600px] font-roboto  flex flex-col items-center h-[452px]  transition-all duration-1000 ease-in-out   ">
      <div className="mb-4 w-full flex justify-end items-center">
        <label className="font-medium text-gray-600 mr-4">
          Filter by status:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as TodoFilter)}
          className="border rounded-md p-2 bg-white shadow-sm">
          {Object.entries(filters).map(([key, name]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {todos.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="text-center text-2xl text-gray-500">
            There are no tasks to show.
          </p>
        </div>
      )}
      {error && <p>{error}</p>}
      {todos.length > 0 && (
        <ul className="flex flex-col gap-2  w-full overflow-hidden overflow-y-auto">
          {filteredTodos.map((todo) => (
            <TodoItem todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;
