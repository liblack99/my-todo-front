import React, {useEffect} from "react";
import Todos from "../components/Todos";
import {AppDispatch} from "../app/store";
import {useDispatch} from "react-redux";

import CreateTodo from "../components/CreateTodo";
import {fetchTodos} from "../features/todosSlice";

import {getUser, logout} from "../features/authSlice";
import {useNavigate} from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos(dispatch);
    dispatch(getUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className="relative w-full flex justify-center gap-20 items-center h-20">
        <h1 className="text-4xl text-center">Task Manager</h1>
        <button
          className="hover:scale-105 transition-all cursor-pointer absolute right-7"
          onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
            width={24}
            viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </button>
      </header>
      <main className="h-[calc(100%-160px)]">
        <section className="w-full flex flex-col items-center justify-center gap-4 p-4">
          <CreateTodo />
          <Todos />
        </section>
      </main>
    </>
  );
};

export default Home;
