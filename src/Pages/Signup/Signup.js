import React from "react";
import SignupForm from "../../Auth/SignupForm/SignupForm";
import Navbar from "../../Components/Navbar/Navbar";

const Signup = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <SignupForm />
      </main>
      <footer></footer>
    </>
  );
};

export default Signup;
