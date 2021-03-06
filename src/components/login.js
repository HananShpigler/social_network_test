import React, { useState, useEffect } from "react";
import "./login.css";

const login = (props) => {
    const {
      email,
      setEmail,
      password,
      setPassword,
      handleLogin,
      handleSignup,
      hasAccount,
      setHasAccount,
      emailError,
      passwordError,
      clearErrors
    } = props;
  
  return (
    <div>
      <div className="login">
        <label>Username</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMessage">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMessage">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                Don't have an account?
                <span
                  onClick={() => (setHasAccount(!hasAccount), clearErrors())}
                >
                  {" "}
                  Sign up
                </span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignup}>Sign up</button>
              <p>
                Have an account?
                <span
                  onClick={() => (setHasAccount(!hasAccount), clearErrors())}
                >
                  {" "}
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default login;
