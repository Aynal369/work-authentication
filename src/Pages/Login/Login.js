import React from "react";
import LoginForm from "../../Auth/LoginForm/LoginForm";
import Navbar from "../../Components/Navbar/Navbar";

const Login = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <LoginForm />
      </main>
      <footer></footer>
    </>
  );
};

export default Login;
