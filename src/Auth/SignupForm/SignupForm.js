import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Config/Firebase.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const SignupForm = () => {
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
  const handleSignup = (e) => {
    console.log(e);
    if (user.email && user.password) {
      console.log("submitted");
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
          console.log(user.name);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("user name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Form Validation
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }; // Form Validation Close

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
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      });
  };
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
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <section id="signup" className="bgColor vh-100">
      <div className="container-fluid">
        <div className="row centerVh100">
          <div className="col-sm-6 col-md-4">
            <div className="form_card round shadow-lg">
              <h3 className="text-dark mb-4">SignUp</h3>
              <form onSubmit={handleSignup} className="w-75 p-2">
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    onBlur={handleBlur}
                    className="form-control rounded-pill"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="email"
                    onBlur={handleBlur}
                    className="form-control rounded-pill"
                    placeholder="Your Email address"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    onBlur={handleBlur}
                    className="form-control rounded-pill"
                    placeholder="Your Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary form-control rounded-pill"
                >
                  Sign up
                </button>
              </form>
              <div className="text-center">
                <p>
                  Already have an account
                  <button
                    type="button"
                    className="btn btn-outline-light rounded-pill mx-2"
                  >
                    <Link style={{ textDecoration: "none" }} to="/login">
                      Log In
                    </Link>
                  </button>
                </p>
              </div>
              <div className="social_media">
                <div className="or">Or</div>
                <p className="text-dark text-center">
                  Connect with social media
                </p>
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

export default SignupForm;