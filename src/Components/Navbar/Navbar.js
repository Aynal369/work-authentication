import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../App";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Authentication
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              {loggedInUser.email ? (
                <button type="button" className="btn btn-outline-warning ms-5 ">
                  Log out
                </button>
              ) : (
                <button type="button" className="btn btn-outline-warning ms-5 ">
                  <Link className="nav-link" to="/login">
                    Log in
                  </Link>
                </button>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
