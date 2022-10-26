import React, { createContext, useEffect, useState } from "react";
import Cross from "../assets/cross.svg";

import styled from "styled-components";

const Message = styled.div`
  color: white;
  text-shadow: 0 0 5px rgba(80, 80, 15, 0.75);
  transform-origin: top;
  padding: ${({ showContent }) => (showContent ? "1rem" : 0)};
  height: ${({ showContent }) => (showContent ? "auto" : 0)};
  transform: scaleY(${({ showContent }) => (showContent ? 1 : 0)});
  transition: all 0.3s ease-out;
`;

const MessageWrapper = styled.div`
  max-width: 93.75rem;
  margin-inline: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Error = styled(Message)`
  background: linear-gradient(45deg, #ff1212, #c22f2f, #563131);
`;
const Success = styled(Message)`
  background: linear-gradient(45deg, #38c338, #466846, #5a6c5a);
`;
const CloseButton = styled.button`
  background: transparent;
  padding: 0.5rem 0.75rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

const CrossContainer = styled(Cross)`
  fill: white;
  height: 22px;
  width: 22px;
  transition: all 0.3s ease-in;
  @media screen and (min-width: 800px) {
    height: 24px;
    width: 24px;
  }
  &:hover {
    transform: scale(1.2);
  }
`;

const MessageContext = createContext();

export default MessageContext;

export const MessageProvider = ({ children }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleCloseButtonClick = (message) => {
    if (message === "error") setError("");
    if (message === "success") setSuccess("");
  };

  useEffect(() => {
    if (success) {
      const interval = setInterval(() => setSuccess(""), 8000);
      return () => clearInterval(interval);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const interval = setInterval(() => setError(""), 8000);
      return () => clearInterval(interval);
    }
  }, [error]);

  const providedData = { setError, setSuccess };

  return (
    <MessageContext.Provider value={providedData}>
      <Success showContent={success ? 1 : 0}>
        <MessageWrapper>
          {success}
          <CloseButton
            type="button"
            onClick={() => handleCloseButtonClick("success")}
          >
            <CrossContainer />
          </CloseButton>
        </MessageWrapper>
      </Success>

      <Error showContent={error ? 1 : 0}>
        <MessageWrapper>
          {error}
          <CloseButton
            type="button"
            onClick={() => handleCloseButtonClick("error")}
          >
            <CrossContainer />
          </CloseButton>
        </MessageWrapper>
      </Error>

      {children}
    </MessageContext.Provider>
  );
};
