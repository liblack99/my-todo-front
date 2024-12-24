import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {type Todo, Status} from "../types";
import axios from "axios";
import {AppDispatch} from "../app/store";

const API_URL = import.meta.env.VITE_API_URL;

// Estado inicial
interface TodosState {
  todos: Todo[];
  filter: Status | "all";
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  filter: "all",
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    changeStatus: (
      state,
      action: PayloadAction<{id: number; newStatus: Todo["status"]}>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.status = action.payload.newStatus;
      }
    },
    changeTodoDetails: (
      state,
      action: PayloadAction<{
        id: number;
        newTitle: string;
        newDescription: string;
      }>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.newTitle;
        todo.description = action.payload.newDescription;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<TodosState["filter"]>) => {
      state.filter = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const createTodo = async (dispatch: AppDispatch, todo: Todo) => {
  try {
    const response = await axios.post(`${API_URL}/api/todos/create`, todo, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token_todos")}`,
      },
    });
    dispatch(addTodo(response.data));
  } catch (error) {
    console.error("Error al crear tarea:", error);
  }
};

const fetchTodos = async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/todos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token_todos")}`,
      },
    });
    dispatch(setTodos(response.data));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Captura el mensaje del servidor
      const serverMessage =
        error.response.data || "Error desconocido al obtener las tareas.";
      dispatch(setError(serverMessage));
    } else {
      // Error genérico
      console.error("Error inesperado al obtener tareas:", error);
      dispatch(setError("Error inesperado al obtener las tareas."));
    }
  }
};

const updateTodoStatus = async (
  dispatch: AppDispatch,
  id: number,
  newStatus: Status
) => {
  try {
    await axios.patch(
      `${API_URL}/api/todos/status`,
      {id, newStatus},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token_todos")}`,
        },
      }
    );
    dispatch(changeStatus({id, newStatus})); // Actualiza el estado de la tarea en el Redux
  } catch (error) {
    console.error("Error al actualizar estado de tarea:", error);
  }
};

const editTodo = async (
  dispatch: AppDispatch,
  id: number,
  newTitle: string,
  newDescription: string
) => {
  try {
    await axios.patch(
      "http://localhost:5000/api/todos/edit",
      {id, title: newTitle, description: newDescription},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token_todos")}`,
        },
      }
    );
    dispatch(changeTodoDetails({id, newTitle, newDescription}));
  } catch (error) {
    console.error("Error al editar tarea:", error);
  }
};

const deleteTodo = async (dispatch: AppDispatch, id: number) => {
  try {
    await axios.delete(`${API_URL}/api/todos`, {
      data: {id},
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token_todos")}`,
      },
    });
    dispatch(removeTodo(id));
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
  }
};

export const {
  addTodo,
  setTodos,
  changeStatus,
  changeTodoDetails,
  removeTodo,
  setError,
  setFilter,
} = todosSlice.actions;

export {createTodo, fetchTodos, updateTodoStatus, editTodo, deleteTodo};

export default todosSlice.reducer;
