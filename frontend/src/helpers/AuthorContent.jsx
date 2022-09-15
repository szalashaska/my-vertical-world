import React, { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const AuthorContent = ({ children, authorId }) => {
  const { user } = useContext(AuthContext);

  if (!user || user?.user_id !== authorId) return null;

  return <>{children}</>;
};

export default AuthorContent;
