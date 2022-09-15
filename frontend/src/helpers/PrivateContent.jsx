import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const PrivateContent = ({ children }) => {
  const { authTokens, user } = useContext(AuthContext);

  if (!authTokens || !user) return null;

  return <>{children}</>;
};

export default PrivateContent;
