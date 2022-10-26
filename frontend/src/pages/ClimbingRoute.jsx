import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CanvasShowMany from "../components/CanvasShowMany";
import Comment from "../components/Comment";
import Delete from "../components/Delete";
import ExpendedOptions from "../components/ExpendedOptions";
import Like from "../components/Like";
import {
  ButtonStyled,
  Container,
  FlexContainer,
  H1Styled,
  PStyled,
  UpperFirstLetter,
  Wrapper,
} from "../constans/GlobalStyles";
import {
  DateIcon,
  LocationIcon,
  RouteCardLink,
  RouteIcon,
  UserIcon,
  WallIcon,
} from "../components/styled/RouteCard.styled";
import AuthorContent from "../helpers/AuthorContent";
import { getContent } from "../helpers/Utils.helpers";
import { ClimbingRouteStyled } from "./Pages.styled";
import ZoomController from "../components/ZoomController";

const ClimbingRoute = () => {
  const [routeData, setRouteData] = useState(null);
  const { routeId } = useParams();

  const handleGetRoute = useCallback(async (id) => {
    const routes = await getContent("routes", id);
    if (routes) {
      setRouteData(routes);
    }
  }, []);

  useEffect(() => {
    if (routeId) {
      handleGetRoute(+routeId);
      window.scrollTo(0, 0);
    }
  }, [handleGetRoute, routeId]);

  if (!routeData) {
    return <ClimbingRouteStyled>Route does not exist.</ClimbingRouteStyled>;
  }

  const {
    id,
    author,
    created,
    description,
    grade,
    location,
    name,
    likes,
    wall,
    comments,
  } = routeData;
  const { image, image_height, image_width } = wall;

  return (
    <ClimbingRouteStyled>
      <Container>
        <FlexContainer justify="space-between">
          <H1Styled bold>
            <RouteIcon />
            <UpperFirstLetter>{name}</UpperFirstLetter>, {grade}
          </H1Styled>

          <AuthorContent authorId={author.id}>
            <ExpendedOptions>
              <Delete id={id} content={"routes"} children={0} />
              <ButtonStyled as={Link} to={"edit"} state={{ routeData }}>
                Edit
              </ButtonStyled>
            </ExpendedOptions>
          </AuthorContent>
        </FlexContainer>

        <Wrapper maxWidth="50%">
          <RouteCardLink to={`/walls/${wall.id}`}>
            <WallIcon />
            <>{wall.name}</>
          </RouteCardLink>
          <RouteCardLink to={`/locations/${location.id}`}>
            <LocationIcon />
            <>{location.name}</>
          </RouteCardLink>

          <RouteCardLink to={`/user/${author.id}`}>
            <UserIcon />
            <>{author.username}</>
          </RouteCardLink>
          <RouteCardLink as="div">
            <DateIcon />
            <>{new Date(created).toLocaleDateString()}</>
          </RouteCardLink>
        </Wrapper>

        <ZoomController>
          <CanvasShowMany
            height={image_height}
            width={image_width}
            url={image}
            routesData={[routeData]}
          />
        </ZoomController>

        <Like id={id} currentLikes={likes} content={"routes"} />
        <Wrapper margin="1rem 0">
          <PStyled>{description}</PStyled>
        </Wrapper>
        <Comment id={id} currentComments={comments} content={"routes"} />
      </Container>
    </ClimbingRouteStyled>
  );
};

export default ClimbingRoute;
