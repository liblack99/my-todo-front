import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../features/authSlice";
import {RootState} from "../app/store";
import {AppDispatch} from "../app/store";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {token, loading, error} = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginUser({email, password}));
    } else {
      alert("Please fill in both fields");
    }
  };

  const handleGoToRegister = (): void => {
    navigate("/register");
  };

  return (
    <div className="w-[400px] mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border rounded-md"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded-md mt-4">
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          onClick={handleGoToRegister}
          className="mt-4 text-blue-600 underline hover:text-blue-800 text-center w-full">
          Don’t have an account? Register here
        </button>
      </form>
    </div>
  );
};

export default Login;
