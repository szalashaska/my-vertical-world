import React from "react";
import { H3Styled, LinkStyled } from "../constans/GlobalStyles";
import CanvasShow from "./CanvasShow";
import { RouteCardStyled } from "./styled/RouteCard.styled";

const RouteCard = ({ route }) => {
  const {
    id,
    author,
    created,
    description,
    grade,
    location,
    name,
    path,
    wall,
  } = route;
  const { image, image_height, image_width } = wall;

  return (
    <RouteCardStyled>
      {route && (
        <>
          <LinkStyled to={`/route/${id}`}>
            <H3Styled>
              {name}, {grade}
            </H3Styled>
          </LinkStyled>

          {author.username}
          <p>{new Date(created).toLocaleDateString()}</p>

          <LinkStyled to={`/location/${location.id}`}>
            {location.name}
          </LinkStyled>

          <LinkStyled to={`/wall/${wall.id}`}>{wall.name}</LinkStyled>

          <LinkStyled to={`/route/${id}`}>
            <CanvasShow
              height={image_height}
              width={image_width}
              url={image}
              routePath={path}
            />
          </LinkStyled>
          <p>like</p>
          <p>comment</p>
          <p>{description}</p>
        </>
      )}
    </RouteCardStyled>
  );
};

export default RouteCard;
