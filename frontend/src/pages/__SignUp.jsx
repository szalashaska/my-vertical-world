import React, { useState, useContext } from "react";

import FormInput from "../components/FormInput";
import AuthContext from "../contexts/AuthContext";

const SignUp = () => {
  const [loginUserData, setLoginUserData] = useState({
    username: "",
    password: "",
  });

  const [registerUserData, setRegisterUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [unableToRegister, setUnableToRegister] = useState(null);
  const { loginUser, unableToLogin } = useContext(AuthContext);

  const loginInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];

  const RegisterInputs = [
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Username",
      wrongInputMsg: "Name of of the user should be between 3-16 characters",
      pattern: "^.{3,16}$",
      label: "Username",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      wrongInputMsg: "Passwords does not match.",
      label: "Confirm Password",
      pattern: registerUserData.password,
      required: true,
    },
  ];

  const onLoginInputChange = (e) => {
    setLoginUserData({ ...loginUserData, [e.target.name]: e.target.value });
  };

  const onRegisterInputChange = (e) => {
    setRegisterUserData({
      ...registerUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: registerUserData.username,
        password: registerUserData.password,
        confirm_password: registerUserData.confirmPassword,
      }),
    };

    try {
      const data = await fetch("/api/register", requestOptions);
      const response = await data.json();

      if (data.status === 201) {
        loginUser(registerUserData.username, registerUserData.password);
      } else {
        setUnableToRegister(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <section className="login__login">
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser(loginUserData.username, loginUserData.password);
          }}
        >
          {loginInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              onChange={onLoginInputChange}
              value={loginUserData[input.name]}
            />
          ))}
          <button type="submit">Login</button>
        </form>
      </section>

      {unableToLogin && <div className="signup-errormsg">{unableToLogin}</div>}

      <section className="login__register">
        <h1>Register</h1>
        <form onSubmit={handleRegisterUser}>
          {RegisterInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              onChange={onRegisterInputChange}
              value={registerUserData[input.name]}
            />
          ))}
          <button type="submit">Register</button>
        </form>
      </section>

      {unableToRegister && (
        <div className="signup-errormsg">{unableToRegister}</div>
      )}
    </div>
  );
};

export default SignUp;
