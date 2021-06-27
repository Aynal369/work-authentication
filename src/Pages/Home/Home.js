import React, { useContext } from "react";
import { UserContext } from "../../App";
import Navbar from "../../Components/Navbar/Navbar";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section id="welcome">
          <h5>Hello!</h5>
          <h2>{loggedInUser.name}</h2>
          <p>
            This is your email <small>{loggedInUser.email}</small>
          </p>
        </section>
      </main>
      <footer></footer>
    </>
  );
};

export default Home;
