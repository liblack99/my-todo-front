import React, {useState} from "react";
import {registerUser} from "../features/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppDispatch} from "../app/store";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    dispatch(registerUser({username, email, password}));
    navigate("/login");
  };

  return (
    <div className="w-[400px] mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold text-center">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 p-2 my-2 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email" // El tipo de campo es "email"
          placeholder="Email"
          className="border border-gray-300 p-2 my-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 my-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border border-gray-300 p-2 my-2 w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="w-full p-2 bg-blue-600 text-white rounded-md mt-4"
          onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
