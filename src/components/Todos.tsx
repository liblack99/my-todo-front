import React, {useState} from "react";
import {type Todo, Status} from "../types";

interface TodosProps {
  todos: Todo[];
  onStatusChange: (id: number, newStatus: Status) => void;
  onChange: (id: number, newTodo: string, newTodoDescription: string) => void;
  onDelete: (id: number) => void;
  error: string | null;
}

const Todos: React.FC<TodosProps> = ({
  todos,
  onStatusChange,
  onChange,
  onDelete,
  error,
}) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  const handleEditToggle = (
    id: number,
    currentTitle: string,
    currentDescription: string
  ) => {
    if (editId === id) {
      // Salir del modo edición
      setEditId(null);
      setNewTitle("");
      setNewDescription("");
    } else {
      // Entrar al modo edición y cargar valores actuales
      setEditId(id);
      setNewTitle(currentTitle);
      setNewDescription(currentDescription);
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-gray-100 rounded-md shadow-md w-[600px] font-roboto font-bold text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="p-4 bg-gray-100 rounded-md shadow-md w-[600px] font-bold  font-roboto ">
        <p className="text-center">No hay tareas para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md w-[600px] font-roboto">
      <ul className="space-y-6">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`border rounded-lg shadow-sm p-4 transition-shadow hover:shadow-md`}>
            <div className="flex justify-between items-center mb-3">
              {editId === todo.id ? (
                <input
                  type="text"
                  placeholder="Edit title"
                  value={newTitle}
                  className="w-40 rounded-md border-2 border-black"
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              ) : (
                <h3 className="text-lg font-medium text-gray-700">
                  {todo.title}
                </h3>
              )}
              <select
                className={`border bg-white p-1 rounded-lg shadow-sm transition-shadow hover:shadow-md ${
                  todo.status === "pending"
                    ? " border-red-400 text-red-600"
                    : todo.status === "in-progress"
                    ? " border-yellow-400 text-yellow-600"
                    : " border-green-400 text-green-600"
                }`}
                value={todo.status}
                onChange={(e) =>
                  onStatusChange(todo.id, e.target.value as Status)
                }>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              {editId === todo.id ? (
                <input
                  type="text"
                  placeholder="Edit description"
                  value={newDescription}
                  className="w-full rounded-md border-2 border-black"
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              ) : (
                <p className="text-sm text-gray-600 mb-2 w-[500px]">
                  {todo.description}
                </p>
              )}

              <small className="text-xs text-gray-400">
                Created at: {new Date(todo.created_at).toLocaleString()}
              </small>
            </div>
            <div className="flex gap-2 justify-end items-center">
              {editId === todo.id ? (
                <button
                  onClick={() => {
                    const updatedTitle = newTitle.trim() || todo.title;
                    const updatedDescription =
                      newDescription.trim() || todo.description;
                    onChange(todo.id, updatedTitle, updatedDescription);
                    setEditId(null);
                    setNewTitle("");
                    setNewDescription("");
                  }}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition-all">
                  Accept
                </button>
              ) : (
                <button
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:scale-95 transition-all"
                  onClick={() => onDelete(todo.id)}>
                  Delete
                </button>
              )}
              <button
                className={`px-3 py-2 rounded-lg border-2 ${
                  editId === todo.id
                    ? "bg-gray-300 text-black border-gray-400 hover:bg-gray-400"
                    : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                } active:scale-95 transition-all`}
                onClick={() =>
                  handleEditToggle(todo.id, todo.title, todo.description)
                }>
                {editId === todo.id ? "Cancel" : "Edit"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
