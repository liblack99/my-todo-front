import React, {useEffect} from "react";
import Todos from "../components/Todos";
import {AppDispatch, RootState} from "../app/store";
import {useSelector, useDispatch} from "react-redux";

import CreateTodo from "../components/CreateTodo";
import {
  fetchTodos,
  updateTodoStatus,
  editTodo,
  deleteTodo,
} from "../features/todosSlice";
import type {Status} from "../types";
import {getUser, logout} from "../features/authSlice";
import {useNavigate} from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {todos, error} = useSelector((state: RootState) => state.todos);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos(dispatch);
    dispatch(getUser());
  }, [dispatch]);

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
    deleteTodo(dispatch, id);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="grid place-content-center mt-10 gap-4">
      <div className="relative flex justify-center items-center">
        <h1 className="text-4xl text-center">My Todos</h1>
        <button
          className="absolute right-2 hover:scale-105 transition-all cursor-pointer"
          onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
            width={24}
            viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </button>
      </div>
      <CreateTodo />
      <Todos
        todos={todos}
        onStatusChange={handleChangeStatus}
        onChange={handleEditTodo}
        onDelete={handleDeleteTodo}
        error={error}
      />
    </div>
  );
};

export default Home;
