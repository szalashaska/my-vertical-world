import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CanvasShowMany from "../components/CanvasShowMany";
import Comment from "../components/Comment";
import Delete from "../components/Delete";
import Like from "../components/Like";
import { H2Styled, H3Styled } from "../constans/GlobalStyles";
import AuthorContent from "../helpers/AuthorContent";
import { WallStyled } from "./Pages.styled";

const Wall = () => {
  const [wallData, setWallData] = useState(null);
  const { wallId } = useParams();

  const handleGetWallData = async (id) => {
    try {
      const response = await fetch(`/api/walls/${id}`);
      const data = await response.json();

      if (response.status === 200) {
        setWallData(data);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (wallId) {
      handleGetWallData(+wallId);
    }
  }, []);

  if (!wallData) {
    return <WallStyled> No wall </WallStyled>;
  }

  const {
    id,
    author,
    name,
    image_height,
    image_width,
    image,
    routes,
    location,
    likes,
    comments,
  } = wallData;

  return (
    <WallStyled>
      <H2Styled>{name}</H2Styled>
      <H3Styled>{location.name}</H3Styled>
      <AuthorContent authorId={author.id}>
        <Delete id={id} content={"walls"} children={routes.length} />
      </AuthorContent>
      <Like id={id} currentLikes={likes} content={"walls"} />
      <Comment id={id} currentComments={comments} content={"walls"} />
      <CanvasShowMany
        height={image_height}
        width={image_width}
        url={image}
        routesData={routes}
      />
    </WallStyled>
  );
};

export default Wall;
