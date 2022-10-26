import React, { useState, useContext, useEffect } from "react";

import AuthContext from "../contexts/AuthContext";
import { SignUpStyled } from "./Pages.styled";
import FormInput from "../components/FormInput";
import { ButtonStyled, Container, Wrapper } from "../constans/GlobalStyles";
import ActiveTabBar from "../components/ActiveTabBar";

const TABS = ["Log in", "Sign up"];

const SignIn = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerPasword, setRegisterPassword] = useState("");
  const [confirmPasword, setConfirmPassword] = useState("");

  const { loginUser, registerUser, error } = useContext(AuthContext);

  const loginInputs = [
    {
      id: 1,
      autoFocus: true,
      name: "username",
      type: "text",
      placeholder: "Username...",
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
      autoFocus: true,
      name: "username",
      type: "text",
      placeholder: "Username...",
      label: "Username:",
      hint: "Name should be between 3-16 characters.",
      pattern: "^.{3,16}$",
      required: true,
      value: registerName,
      onChange: (e) => setRegisterName(e.target.value),
    },
    {
      id: 4,
      name: "password",
      type: "password",
      label: "Password:",
      placeholder: "Password...",
      hint: "Password should be at least 5 characters long.",
      pattern: "^.{5,50}$",
      required: true,
      value: registerPasword,
      onChange: (e) => setRegisterPassword(e.target.value),
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password...",
      hint: "Passwords must match.",
      label: "Confirm Password:",
      pattern: registerPasword,
      required: true,
      value: confirmPasword,
      onChange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SignUpStyled>
      <Container>
        <ActiveTabBar
          tabs={TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Wrapper maxWidth="40rem">
          {activeTab === TABS[0] ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loginUser(loginName, loginPassword);
              }}
            >
              {loginInputs.map((input) => (
                <FormInput key={input.id} {...input} />
              ))}
              <ButtonStyled type="submit">Log in</ButtonStyled>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                registerUser(registerName, registerPasword, confirmPasword);
              }}
            >
              {RegisterInputs.map((input) => (
                <FormInput key={input.id} {...input} />
              ))}
              <ButtonStyled type="submit">Sign up</ButtonStyled>
            </form>
          )}
        </Wrapper>

        {error && <div>{error}</div>}
      </Container>
    </SignUpStyled>
  );
};

export default SignIn;
