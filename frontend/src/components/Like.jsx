import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Like = ({ id, currentLikes, content }) => {
  const [likes, setLikes] = useState(currentLikes);
  const [isLiked, setIsLiked] = useState(false);

  const { authTokens } = useContext(AuthContext);

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
    checkIfContentIsLiked();
  }, []);

  return (
    <div>
      {likes}
      {isLiked ? (
        <button onClick={() => handleLikeButtonClick("unlike")} type="button">
          Unlike
        </button>
      ) : (
        <button onClick={() => handleLikeButtonClick("like")} type="button">
          Like
        </button>
      )}
    </div>
  );
};

export default Like;
