import React from "react";
import "./AuthPage.scss";
import scenic from "../../assets/scenic.jpg";
import SignIn from "../SignIn/SignIn";
const AuthPage = () => {
  return (
    <div className="AuthContainer">
      <div className="authForm">
        <img src={scenic} alt="Scenic illustration" />
        <div className="loginForm">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
