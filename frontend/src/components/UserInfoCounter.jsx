import React from "react";
import styled from "styled-components";
import { FlexContainer, PStyled } from "../constans/GlobalStyles";
import { LocationIcon, RouteIcon, WallIcon } from "./styled/RouteCard.styled";

const TextContainer = styled.div`
  min-width: 9ch;
`;

const IconWrappper = styled.div`
  min-width: 3.2rem;
`;

const UserInfoCounter = ({ data }) => {
  const {
    liked_locations,
    liked_routes,
    liked_walls,
    location_author,
    wall_author,
    route_author,
  } = data;

  return (
    <>
      <FlexContainer gap="1rem" padding="0.5rem">
        <TextContainer>
          <PStyled>Liked:</PStyled>
        </TextContainer>
        <IconWrappper>
          <RouteIcon /> {liked_routes.length}
        </IconWrappper>
        <IconWrappper>
          <WallIcon /> {liked_walls.length}
        </IconWrappper>
        <IconWrappper>
          <LocationIcon /> {liked_locations.length}
        </IconWrappper>
      </FlexContainer>

      <FlexContainer gap="1rem" padding="0.5rem">
        <TextContainer>
          <PStyled>Author of:</PStyled>
        </TextContainer>
        <IconWrappper>
          <RouteIcon /> {route_author.length}
        </IconWrappper>
        <IconWrappper>
          <WallIcon /> {wall_author.length}
        </IconWrappper>
        <IconWrappper>
          <LocationIcon /> {location_author.length}
        </IconWrappper>
      </FlexContainer>
    </>
  );
};

export default UserInfoCounter;
