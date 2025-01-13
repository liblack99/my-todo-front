import React, {useState} from "react";
import {updateTodoStatus, editTodo, deleteTodo} from "../features/todosSlice";
import {AppDispatch} from "../app/store";
import {useDispatch} from "react-redux";
import type {Status, Todo} from "../types";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: React.FC<TodoItemProps> = ({todo}) => {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();

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

  const handleChangeStatus = (id: number, newStatus: Status) => {
    updateTodoStatus(dispatch, id, newStatus);
  };

  const handleEditTodo = (
    id: number,
    newTitle: string,
    newDescription: string
  ) => {
    editTodo(dispatch, id, newTitle, newDescription);
  };

  const handleDeleteTodo = (id: number) => {
    setDeletingId(id);
    deleteTodo(dispatch, id);
  };

  return (
    <>
      <li
        id="todo"
        className={`border rounded-lg shadow-sm p-4 transition-shadow hover:shadow-md animate-zoom-in ${
          deletingId === todo.id ? "animate-zoom-out" : ""
        }`}>
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
            <h3 className="text-lg font-medium text-black">{todo.title}</h3>
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
              handleChangeStatus(todo.id, e.target.value as Status)
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
            <p className="text-md text-gray-600 mb-2 w-[500px]">
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
                handleEditTodo(todo.id, updatedTitle, updatedDescription);
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
              onClick={() => handleDeleteTodo(todo.id)}>
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
    </>
  );
};

export default TodoItem;
