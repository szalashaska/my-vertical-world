import React, { useEffect, useState } from "react";
import LocationMap from "../components/LocationMap";
import RoutesContainer from "../components/RoutesContainer";
import { H1Styled } from "../constans/GlobalStyles";
import { HomeStyled } from "./Pages.styled";

const Home = () => {
  const [routesData, setRoutesData] = useState(null);
  const getRoutesData = async () => {
    const endpoint = "/api/routes";
    try {
      const data = await fetch(endpoint);
      const response = await data.json();

      if (data.status === 200) {
        setRoutesData(response);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    getRoutesData();
  }, []);

  return (
    <HomeStyled>
      <LocationMap />
      <H1Styled>Newest routes:</H1Styled>
      {routesData && <RoutesContainer routes={routesData} />}
    </HomeStyled>
  );
};

export default Home;
