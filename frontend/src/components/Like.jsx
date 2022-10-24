import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { ButtonStyled, FlexContainer } from "../constans/GlobalStyles";
import AuthContext from "../contexts/AuthContext";
import PrivateContent from "../helpers/PrivateContent";
import { LikeIcon } from "./styled/RouteCard.styled";

const LikeButtonActive = styled(ButtonStyled)`
  /* outline: 3px rgba(10, 10, 10, 0.8) solid; */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
`;

const LikeButtonInactive = styled(ButtonStyled)`
  color: rgba(10, 10, 10, 0.8);
  outline: 3px rgba(10, 10, 10, 0.8) solid;
`;

const ALLOWED_CONTENT = ["routes", "walls", "locations"];

const Like = ({ id, currentLikes, content }) => {
  const [likes, setLikes] = useState(currentLikes);
  const [isLiked, setIsLiked] = useState(false);

  const { authTokens } = useContext(AuthContext);

  // Check if props are correct
  if (!ALLOWED_CONTENT.includes(content)) return null;

  const checkIfContentIsLiked = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
    };
    const endpoint = `/api/${content}/${id}/likes`;

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setIsLiked(data.is_liked);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const handleLikeButtonClick = async (action) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
      body: JSON.stringify({ action }),
    };
    const endpoint = `/api/${content}/${id}/likes`;

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setLikes(data.likes);
        setIsLiked(data.is_liked);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (authTokens) checkIfContentIsLiked();
  }, []);

  return (
    <FlexContainer gap="0.5rem">
      <LikeIcon />
      {likes}
      <PrivateContent>
        {isLiked ? (
          <LikeButtonInactive
            primary
            onClick={() => handleLikeButtonClick("unlike")}
            type="button"
          >
            Liked
          </LikeButtonInactive>
        ) : (
          <LikeButtonActive
            onClick={() => handleLikeButtonClick("like")}
            type="button"
          >
            Like
          </LikeButtonActive>
        )}
      </PrivateContent>
    </FlexContainer>
  );
};

export default Like;
