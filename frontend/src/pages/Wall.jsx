import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CanvasShowMany from "../components/CanvasShowMany";
import Comment from "../components/Comment";
import Delete from "../components/Delete";
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
  UserIcon,
  WallIcon,
} from "../components/styled/RouteCard.styled";
import AuthorContent from "../helpers/AuthorContent";
import { getContent } from "../helpers/Utils.helpers";
import { WallStyled } from "./Pages.styled";
import ExpendedOptions from "../components/ExpendedOptions";

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
    created,
  } = wallData;

  return (
    <WallStyled>
      <Container>
        <FlexContainer justify="space-between">
          <H1Styled bold>
            <WallIcon />
            <UpperFirstLetter>{name}</UpperFirstLetter>
          </H1Styled>

          <AuthorContent authorId={author.id}>
            <ExpendedOptions>
              <Delete id={id} content={"walls"} children={routes.length} />
              <ButtonStyled as={Link} to={"edit"} state={{ wallData }}>
                Edit
              </ButtonStyled>
            </ExpendedOptions>
          </AuthorContent>
        </FlexContainer>

        <Wrapper maxWidth="50%">
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
            <PStyled>{new Date(created).toLocaleDateString()}</PStyled>
          </RouteCardLink>
        </Wrapper>
        <Wrapper>
          <CanvasShowMany
            height={image_height}
            width={image_width}
            url={image}
            routesData={routes}
          />
        </Wrapper>
        <Like id={id} currentLikes={likes} content={"walls"} />
        <Comment id={id} currentComments={comments} content={"walls"} />
      </Container>
    </WallStyled>
  );
};

export default Wall;
