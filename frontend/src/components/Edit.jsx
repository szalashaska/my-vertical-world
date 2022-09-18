import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import MessageContext from "../contexts/MessageContext";

const Edit = ({ id, state, data, content }) => {
  const { setError, setSuccess } = useContext(MessageContext);
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEditContent = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
      body: JSON.stringify(data),
    };
    const endpoint = `/api/${content}/${id}`;

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setSuccess(data.success);
        navigate(`/${content}/${id}`);
      } else setError("Could not edit content.");
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (state) {
      handleEditContent();
    }
  }, [state]);
  return <div>Edit {content}</div>;
};

export default Edit;
