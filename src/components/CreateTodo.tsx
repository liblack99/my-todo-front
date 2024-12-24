import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../app/store";
import {createTodo} from "../features/todosSlice";
import type {Todo} from "../types";

const CreateTodo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de título y descripción
    if (title.trim() === "" || description.trim() === "") {
      alert("Both title and description are required!");
      return;
    }

    const newTask: Todo = {
      id: Date.now(),
      title,
      description,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    await createTodo(dispatch, newTask);

    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md w-[600px] font-roboto">
      <h2 className="text-lg font-bold mb-4">Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Task Title"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Task Description"
            rows={3}></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;
