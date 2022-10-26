import React, { useCallback, useEffect, useState } from "react";
import { toLonLat } from "ol/proj";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Delete from "../components/Delete";
import Like from "../components/Like";
import LocationMap from "../components/LocationMap";
import {
  ButtonStyled,
  Container,
  FlexContainer,
  H1Styled,
  H2Styled,
  LinkStyled,
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
import { LocationStyled } from "./Pages.styled";
import ExpendedOptions from "../components/ExpendedOptions";

const Location = () => {
  const [locationData, setLocationData] = useState(null);
  const [locationCoordinates, setLocationCoordinates] = useState(null);
  const { locationId } = useParams();

  const handleGetLocationData = useCallback(async (id) => {
    const location = await getContent("locations", id);
    if (location) {
      setLocationData(location);
    }
  }, []);

  useEffect(() => {
    if (locationId) {
      handleGetLocationData(+locationId);
      window.scrollTo(0, 0);
    }
  }, [handleGetLocationData, locationId]);

  useEffect(() => {
    if (locationData) {
      const coords = toLonLat([
        locationData.coordinates.lon,
        locationData.coordinates.lat,
      ]);
      setLocationCoordinates({
        x: coords[0].toFixed(4),
        y: coords[1].toFixed(4),
      });
    }
  }, [locationData]);

  if (!locationData) {
    return (
      <LocationStyled>
        <Container>No location to show.</Container>
      </LocationStyled>
    );
  }

  const { id, author, name, likes, routes, walls, comments, created } =
    locationData;

  return (
    <LocationStyled>
      <LocationMap
        zoom={9}
        center={[locationData.coordinates.lon, locationData.coordinates.lat]}
        data={[locationData]}
        single
      />

      <Container>
        <FlexContainer justify="space-between">
          <H1Styled bold>
            <LocationIcon />
            <UpperFirstLetter>{name}</UpperFirstLetter>
          </H1Styled>

          <AuthorContent authorId={author.id}>
            <ExpendedOptions>
              <Delete
                id={id}
                currentLikes={likes}
                content={"locations"}
                children={walls.length}
              />
              <ButtonStyled as={Link} to={"edit"} state={{ locationData }}>
                Edit
              </ButtonStyled>
            </ExpendedOptions>
          </AuthorContent>
        </FlexContainer>

        <RouteCardLink to={`/user/${author.id}`}>
          <UserIcon />
          <>{author.username}</>
        </RouteCardLink>
        <RouteCardLink as="div">
          <DateIcon />
          <>{new Date(created).toLocaleDateString()}</>
        </RouteCardLink>

        <Wrapper padding="1.5rem 0">
          {locationCoordinates && (
            <H2Styled>
              Coordinates:
              <PStyled> {locationCoordinates.y} </PStyled>
              <PStyled> {locationCoordinates.x} </PStyled>
            </H2Styled>
          )}
        </Wrapper>

        <Wrapper padding="0 0 1.5rem 0">
          <H2Styled>
            <WallIcon /> Location walls ({walls.length}):
          </H2Styled>
          <FlexContainer justify="flex-start">
            {walls.map((wall) => (
              <ButtonStyled
                as={LinkStyled}
                to={`/walls/${wall.id}`}
                key={wall.id}
                primary={1}
              >
                <UpperFirstLetter>{wall.name}</UpperFirstLetter>
              </ButtonStyled>
            ))}
          </FlexContainer>
        </Wrapper>

        <Wrapper padding="0 0 1.5rem 0">
          <H2Styled>
            <RouteIcon />
            Location routes ({routes.length}):
          </H2Styled>
          <FlexContainer justify="flex-start">
            {routes.map((route) => (
              <ButtonStyled
                as={LinkStyled}
                to={`/routes/${route.id}`}
                key={route.id}
                primary={1}
              >
                <UpperFirstLetter>{route.name}</UpperFirstLetter>, {route.grade}
              </ButtonStyled>
            ))}
          </FlexContainer>
        </Wrapper>

        <Like id={id} currentLikes={likes} content={"locations"} />
        <Comment id={id} currentComments={comments} content={"locations"} />
      </Container>
    </LocationStyled>
  );
};

export default Location;
