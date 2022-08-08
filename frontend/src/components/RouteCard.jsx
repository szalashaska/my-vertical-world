import React from "react";
import { H3Styled } from "../constans/GlobalStyles";
import CanvasShow from "./CanvasShow";
import { RouteCardStyled } from "./styled/RouteCard.styled";

const RouteCard = ({ route }) => {
  const { author, created, description, grade, location, name, path, wall } =
    route;
  const { image, image_height, image_width } = wall;

  return (
    <RouteCardStyled>
      {route && (
        <>
          <H3Styled>
            {name}, {grade}
          </H3Styled>
          <p>{author.username}</p>
          <p>{new Date(created).toLocaleDateString()}</p>
          <p>{location.name}</p>
          <p>{wall.name}</p>
          <CanvasShow
            height={image_height}
            width={image_width}
            url={image}
            routePath={path}
          />
          <p>{description}</p>
        </>
      )}
    </RouteCardStyled>
  );
};

export default RouteCard;
