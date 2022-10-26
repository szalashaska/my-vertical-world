import React from "react";
import { FlexContainer, H2Styled } from "../constans/GlobalStyles";
import CanvasShow from "./CanvasShow";
import Like from "./Like";
import {
  CommentIcon,
  DateIcon,
  LocationIcon,
  RouteCardCanvasLink,
  RouteCardLink,
  RouteCardStyled,
  UserIcon,
  WallIcon,
} from "./styled/RouteCard.styled";

const RouteCard = ({ route }) => {
  if (!route) return null;
  const {
    id,
    author,
    created,
    grade,
    location,
    name,
    path,
    wall,
    likes,
    comments,
  } = route;
  const { image, image_height, image_width } = wall;

  return (
    <RouteCardStyled>
      <RouteCardLink to={`/routes/${id}`}>
        <H2Styled bold>
          {name}, {grade}
        </H2Styled>
      </RouteCardLink>

      <FlexContainer justify="space-between" align="center">
        <RouteCardLink to={`/walls/${wall.id}`}>
          <WallIcon />
          <>{wall.name}</>
        </RouteCardLink>
        <RouteCardLink to={`/locations/${location.id}`}>
          <LocationIcon />
          <>{location.name}</>
        </RouteCardLink>
      </FlexContainer>

      <FlexContainer justify="space-between" align="center" margin=" 0.5rem 0">
        <RouteCardLink to={`/user/${author.id}`}>
          <UserIcon />
          <>{author.username}</>
        </RouteCardLink>
        <RouteCardLink as="div">
          <DateIcon />
          <>{new Date(created).toLocaleDateString()}</>
        </RouteCardLink>
      </FlexContainer>

      <RouteCardCanvasLink to={`/routes/${id}`}>
        <CanvasShow
          height={image_height}
          width={image_width}
          url={image}
          routePath={path}
        />
      </RouteCardCanvasLink>
      <FlexContainer justify="flex-start" gap="0.5rem" padding="0.75rem 0">
        <>
          <CommentIcon /> {comments.length}
        </>
        <>
          <Like id={id} currentLikes={likes} content={"routes"} />
        </>
      </FlexContainer>
    </RouteCardStyled>
  );
};

export default RouteCard;
