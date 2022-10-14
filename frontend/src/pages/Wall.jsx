import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CanvasShowMany from "../components/CanvasShowMany";
import Comment from "../components/Comment";
import Delete from "../components/Delete";
import Like from "../components/Like";
import { H2Styled, H3Styled } from "../constans/GlobalStyles";
import AuthorContent from "../helpers/AuthorContent";
import { getContent } from "../helpers/Utils.helpers";
import { WallStyled } from "./Pages.styled";

const Wall = () => {
  const [wallData, setWallData] = useState(null);
  const { wallId } = useParams();

  const handleGetWallData = useCallback(async (id) => {
    const wall = await getContent("walls", id);
    if (wall) {
      setWallData(wall);
    }
  }, []);

  useEffect(() => {
    if (wallId) {
      handleGetWallData(+wallId);
    }
  }, [handleGetWallData]);

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
        <Link to={"edit"} state={{ wallData }}>
          Edit
        </Link>
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
