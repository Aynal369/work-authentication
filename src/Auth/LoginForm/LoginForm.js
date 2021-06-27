import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Config/Firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const LoginForm = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        console.log(res);
        const { displayName, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

  // Google Authentication
  const handleGoogleAuth = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };

        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };
  // Facebook Authentication
  const handleFacebookAuth = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((res) => {
        const { displayName, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <section id="login" className="bgColor vh-100">
      <div className="container-fluid">
        <div className="row centerVh100">
          <div className="col-sm-6 col-md-4">
            <div className="form_card round shadow-lg">
              <h3 className="mb-4">Log In</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="w-75 p-2">
                <div className="mb-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    className="form-control rounded-pill"
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                    defaultValue={loggedInUser.email}
                  />
                  {errors.email && (
                    <span
                      style={{ color: "red", fontSize: "12px" }}
                      role="alert"
                    >
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="H2Gi)mRp*vg^"
                    className="form-control rounded-pill"
                    {...register("password", {
                      required: "required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                        message: "Password didn't match)",
                      },
                    })}
                  />
                  {errors.password && (
                    <span
                      style={{ color: "red", fontSize: "12px" }}
                      role="alert"
                    >
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="mb-2 d-flex justify-content-between">
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      remember me
                    </label>
                  </div>
                  <span>
                    <Link style={{ textDecoration: "none" }} to="/">
                      forget password
                    </Link>
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary form-control rounded-pill"
                >
                  Log In
                </button>
              </form>
              <div className="text-center">
                <p>
                  Don't have an account
                  <button
                    type="button"
                    className="btn btn-outline-light rounded-pill mx-2"
                  >
                    <Link style={{ textDecoration: "none" }} to="/signup">
                      Sign up
                    </Link>
                  </button>
                </p>
              </div>
              <div className="social_media">
                <div className="or">Or</div>
                <p className="text-center">Connect with social media</p>
                <div className="social_auth">
                  <span className="Google_auth m-2">
                    <button
                      onClick={handleGoogleAuth}
                      type="button"
                      className="btn btn-danger rounded-pill"
                    >
                      <FontAwesomeIcon icon={faGoogle} /> Google
                    </button>
                  </span>
                  <span className="facebook_auth m2">
                    <button
                      onClick={handleFacebookAuth}
                      type="button"
                      className="btn btn-primary rounded-pill"
                    >
                      <FontAwesomeIcon icon={faFacebook} /> Facebook
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
