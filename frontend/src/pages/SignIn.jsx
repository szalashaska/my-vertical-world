import React, { useState, useContext } from "react";

import AuthContext from "../contexts/AuthContext";
import { SignUpStyled } from "./Pages.styled";
import FormInput from "../components/FormInput";
import { ButtonStyled, H1Styled } from "../constans/GlobalStyles";

const SignIn = () => {
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerPasword, setRegisterPassword] = useState("");
  const [confirmPasword, setConfirmPassword] = useState("");

  const { loginUser, registerUser, error } = useContext(AuthContext);

  const loginInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username:",
      required: true,
      value: loginName,
      onChange: (e) => setLoginName(e.target.value),
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password...",
      label: "Password:",
      required: true,
      value: loginPassword,
      onChange: (e) => setLoginPassword(e.target.value),
    },
  ];

  const RegisterInputs = [
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Username...",
      wrongInputMsg: "Name of of the user should be between 3-16 characters",
      pattern: "^.{3,16}$",
      label: "Username:",
      required: true,
      value: registerName,
      onChange: (e) => setRegisterName(e.target.value),
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password...",
      label: "Password:",
      required: true,
      value: registerPasword,
      onChange: (e) => setRegisterPassword(e.target.value),
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password...",
      wrongInputMsg: "Passwords does not match.",
      label: "Confirm Password:",
      pattern: registerPasword,
      required: true,
      value: confirmPasword,
      onChange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  return (
    <SignUpStyled>
      <H1Styled>Login</H1Styled>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginUser(loginName, loginPassword);
        }}
      >
        {loginInputs.map((input) => (
          <FormInput key={input.id} {...input} />
        ))}
        <ButtonStyled type="submit">Login</ButtonStyled>
      </form>

      <H1Styled>Register</H1Styled>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerUser(registerName, registerPasword, confirmPasword);
        }}
      >
        {RegisterInputs.map((input) => (
          <FormInput key={input.id} {...input} />
        ))}
        <ButtonStyled type="submit">Register</ButtonStyled>
      </form>

      {error && <div>{error}</div>}
    </SignUpStyled>
  );
};

export default SignIn;
