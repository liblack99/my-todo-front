import React from "react";
import Login from "../components/Login";

const LoginPage: React.FC = () => {
  return (
    <main className="w-full h-screen ">
      <div className="grid place-content-center mt-10 gap-4">
        <Login />
      </div>
    </main>
  );
};

export default LoginPage;
