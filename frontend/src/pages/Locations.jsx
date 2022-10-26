import React, { useCallback, useEffect, useState } from "react";
import HeroImage from "../components/HeroImage";
import LocationMap from "../components/LocationMap";
import Search from "../components/Search";
import {
  ButtonStyled,
  Container,
  FlexContainer,
  H3Styled,
  LinkStyled,
  UpperFirstLetter,
  Wrapper,
} from "../constans/GlobalStyles";
import { getContent } from "../helpers/Utils.helpers";
import { LocationStyled } from "./Pages.styled";
import LocationImage from "../assets/location.jpg";

const Locations = () => {
  const [locationsData, setLocationsData] = useState(null);

  const handleGetLocations = useCallback(async () => {
    const locations = await getContent("locations");
    if (locations) {
      setLocationsData(locations);
    }
  }, []);

  useEffect(() => {
    handleGetLocations();
  }, [handleGetLocations]);

  if (!locationsData) {
    return <div>No locations to show...</div>;
  }

  return (
    <LocationStyled>
      <HeroImage image={LocationImage} text={"Locations"} />
      <Container>
        <H3Styled align="center">
          Type the name of location to find it:
        </H3Styled>
        <Search content="locations" />
        <Wrapper padding="2rem 1rem">
          {locationsData.length > 0 && (
            <>
              <H3Styled align="center">
                Existing locations ({locationsData.length}):
              </H3Styled>
              <FlexContainer justify="flex-start">
                {locationsData.map((item) => (
                  <ButtonStyled
                    as={LinkStyled}
                    to={`/locations/${item.id}`}
                    primary={1}
                    key={item.id}
                  >
                    <UpperFirstLetter>{item.name}</UpperFirstLetter>
                  </ButtonStyled>
                ))}
              </FlexContainer>
            </>
          )}
        </Wrapper>
      </Container>
      <LocationMap
        zoom={3}
        center={[2078486, 6686398]}
        data={locationsData}
        single
      />
    </LocationStyled>
  );
};

export default Locations;
