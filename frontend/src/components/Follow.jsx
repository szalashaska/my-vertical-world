import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

import { ButtonStyled } from "../constans/GlobalStyles";

const Follow = ({ id }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const { authTokens, user } = useContext(AuthContext);
  const usersOwnPage = user.user_id === id;

  const checkIfUserIsFollowed = async () => {
    if (usersOwnPage) return;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
    };
    const endpoint = `/api/user/${id}/follows`;

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setIsFollowed(data.is_followed);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const handleFollowButtonClick = async (action) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
      body: JSON.stringify({ action }),
    };
    const endpoint = `/api/user/${id}/follows`;

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setIsFollowed(data.is_followed);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (authTokens && user) {
      checkIfUserIsFollowed();
    }
  }, [id]);

  if (usersOwnPage) return null;
  return (
    <>
      {isFollowed ? (
        <ButtonStyled
          onClick={() => handleFollowButtonClick("unfollow")}
          type="button"
        >
          Unfollow
        </ButtonStyled>
      ) : (
        <ButtonStyled
          onClick={() => handleFollowButtonClick("follow")}
          type="button"
        >
          Follow
        </ButtonStyled>
      )}
    </>
  );
};

export default Follow;
