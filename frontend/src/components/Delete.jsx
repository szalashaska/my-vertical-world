import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonStyled } from "../constans/GlobalStyles";
import AuthContext from "../contexts/AuthContext";
import MessageContext from "../contexts/MessageContext";

const ALLOWED_CONTENT = ["routes", "walls", "locations"];
// children - let us know if content have children, in which case we can not delete it. (Wall with existing routes)
const Delete = ({ id, content, children }) => {
  const { authTokens } = useContext(AuthContext);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const { setSuccess } = useContext(MessageContext);

  // Check if props are correct
  if (!ALLOWED_CONTENT.includes(content)) return null;

  const handleDeleteContent = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
    };
    const endpoint = `/api/${content}/${id}`;

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setSuccess(data.success);
        navigate("/");
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (confirm) {
      const interval = setInterval(() => setConfirm(false), 5000);
      return () => clearInterval(interval);
    }
  }, [confirm]);

  return (
    <ButtonStyled
      onClick={() => {
        if (confirm) handleDeleteContent();
        setConfirm(true);
      }}
      type="button"
      disabled={children != 0}
    >
      {confirm ? "Are you sure?" : "Delete"}
    </ButtonStyled>
  );
};

export default Delete;
