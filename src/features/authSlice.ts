import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {AppDispatch} from "../app/store";

const API_URL = "https://backend-my-todo.onrender.com";

interface User {
  id: number;
  username: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

const initialState: AuthState = {
  token: localStorage.getItem("token_todos") || null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token_todos");
    },
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAuth: (state, action: PayloadAction<{token: string; user: User}>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token_todos", action.payload.token);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
});

// Exportamos las acciones y el reducer
export const {logout, startLoading, setAuth, setError, setUser} =
  authSlice.actions;
export default authSlice.reducer;

export const registerUser =
  (userData: RegisterData) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/register`,
        userData
      );
      console.log(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(
          setError(error.response?.data || "Error al registrar el usuario")
        );
      } else {
        dispatch(setError("Error desconocido"));
      }
    }
  };

export const loginUser =
  (loginData: LoginData) => async (dispatch: AppDispatch) => {
    dispatch(startLoading());
    try {
      const response = await axios.post(
        `${API_URL}/api/users/login`,
        loginData
      );

      dispatch(setAuth({token: response.data.token, user: response.data.user}));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch(setError(error.response?.data || "Error al iniciar sesión"));
      } else {
        dispatch(setError("Error desconocido"));
        throw new Error("Error desconocido");
      }
    }
  };

export const getUser = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token_todos")}`,
      },
    });
    const userData = response.data;

    dispatch(setUser(userData));
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      dispatch(setError(error.response?.data || "Error al iniciar sesión"));
    } else {
      dispatch(setError("Error desconocido"));
    }
  }
};
