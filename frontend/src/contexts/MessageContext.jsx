import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";

const Message = styled.div`
  /* background-color: ${({ success }) => (success ? "green" : "red")}; */
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Error = styled(Message)`
  background-color: red;
`;
const Success = styled(Message)`
  background-color: green;
`;
const CloseButton = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 50%;
  border: none;
  cursor: pointer;
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
      const interval = setInterval(() => setSuccess(""), 10000);
      return () => clearInterval(interval);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const interval = setInterval(() => setError(""), 10000);
      return () => clearInterval(interval);
    }
  }, [error]);

  const providedData = { setError, setSuccess };

  return (
    <MessageContext.Provider value={providedData}>
      {success && (
        <Success>
          {success}{" "}
          <CloseButton
            type="button"
            onClick={() => handleCloseButtonClick("success")}
          >
            X
          </CloseButton>
        </Success>
      )}

      {error && (
        <Error>
          {error}{" "}
          <CloseButton
            type="button"
            onClick={() => handleCloseButtonClick("error")}
          >
            X
          </CloseButton>
        </Error>
      )}
      {children}
    </MessageContext.Provider>
  );
};
