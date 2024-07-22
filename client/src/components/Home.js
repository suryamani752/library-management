import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/authProvider";
import "../css/homepg.css";
import Typewriter from "typewriter-effect";

// const port = process.env.PORT || 8080;

export const Home = () => {
  const [signupActive, setSignupActive] = useState("");

  //LOGIN AND SIGNUP STATES
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { setRole, setToken } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [signUpPassword, setSignupPassword] = useState("");
  const [signUpEmail, setSignupEmail] = useState("");

  const login = async (props) => {
    props.preventDefault();

    try {
      const res = await axios.post(
        "/login",
        JSON.stringify({ loginEmail, loginPassword }),
        {
          // baseURL: "http://localhost:8080/auth",
          baseURL: "https://modern-library-managment.onrender.com/auth",
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      //setting token and role initially after login
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("role", "user");
      setRole("user");
      setToken(res.data.token);

      setLoginEmail("");
      setLoginPassword("");
      navigate("/dashboard/viewBooks");

      toast.success("Logged in successfully");
    } catch (e) {
      toast.error("Invalid email or password");
      console.log(e);
    }
  };

  const signup = async (props) => {
    props.preventDefault();
    try {
      const response = await axios.post(
        "/signup",
        JSON.stringify({ name, signUpEmail, signUpPassword, role:'user' }),
        {
          // baseURL: "http://localhost:8080/auth",
          baseURL: "https://modern-library-managment.onrender.com/auth",
          headers: { "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*" },
          withCredentials: false,
        }
      );

      console.log("user created");
      setSignupActive("inactive");
      // console.log(response.data);
      toast.success("Registered successfully");
    } catch (e) {
      toast.error("Please fill all the details");
      console.log(e.response);
    }
  };

  return (
    <>
      <div
        className={
          "homecontainer " +
          (signupActive === "active" ? "right-panel-active" : "")
        }
        id="container"
      >
        <div className="form-container sign-up-container">
          <form className="homeform" onSubmit={signup}>
            <h1 className="homeh1 extra">Register</h1>

            <div className="field">
              <input
                type="text"
                id="name"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="field">
              <input
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="field">
              <input
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="homeBtn formBtn">Sign Up</button>
            <div className="signup-link">
              Already registered?{" "}
              <a href="#" onClick={() => setSignupActive("inactive")}>
                &nbsp;Login now
              </a>
            </div>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="homeform" onSubmit={login}>
            <h1 className="homeh1 extra">Login</h1>

            <div className="field">
              <input
                type="email"
                id="loginemail"
                onChange={(e) => setLoginEmail(e.target.value)}
                autoComplete="off"
                required
              />
              <label htmlFor="loginemail">Email Address</label>
            </div>
            <div className="field">
              <input
                type="password"
                id="loginpassword"
                onChange={(e) => setLoginPassword(e.target.value)}
                autoComplete="off"
                required
              />
              <label htmlFor="loginpassword">Password</label>
            </div>

            <button className="homeBtn formBtn">Login</button>
            <div className="signup-link">
              Not a member?{" "}
              <a href="#" onClick={() => setSignupActive("active")}>
                {" "}
                &nbsp;Signup now
              </a>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="homeh1">
                <Typewriter
                  options={{
                    strings: ["Welcome Back"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <p className="homepara">
                To keep connected with us please login with your personal info
              </p>

              <dotlottie-player
                src="https://lottie.host/d9828722-4377-47b2-8924-80d25cbb16e6/BtdESIU9wi.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{
                  width: 520,
                  height: 480,
                  marginTop: -50,
                  marginLeft: 110,
                }}
              ></dotlottie-player>

              <p className="libText">
                This automated system operates a <br />
                library with efficiency and at reduced costs.
              </p>
              <button
                className="homeBtn ghost lgnBtn"
                id="signIn"
                onClick={() => setSignupActive("inactive")}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="homeh1">
                <Typewriter
                  options={{
                    strings: ["Hello Friends"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <p className="homepara">
                Enter your personal details and start journey with us
              </p>
              <dotlottie-player
                src="https://lottie.host/3e78723b-38f3-465b-a2b8-d9448b7ec6e1/DuUjfTdBah.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{
                  width: 520,
                  height: 480,
                  marginTop: -50,
                  marginLeft: 110,
                }}
              ></dotlottie-player>
              <h1 className="homeh1 lib" style={{ marginLeft: -95 }}>
                Library Management <br />
                System
              </h1>
              <button
                className="homeBtn ghost upBtn"
                id="signUp"
                onClick={() => setSignupActive("active")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
