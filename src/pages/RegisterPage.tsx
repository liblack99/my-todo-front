import React from "react";
import Register from "../components/Register";

const RegisterPage: React.FC = () => {
  return (
    <main className="w-full h-screen ">
      <div className="grid place-content-center mt-10 gap-4">
        <Register />
      </div>
    </main>
  );
};

export default RegisterPage;
