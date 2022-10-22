import React, { useEffect, useState, useCallback } from "react";
import HeroImage from "../components/HeroImage";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { Container, H3Styled } from "../constans/GlobalStyles";
import { getPaginatedContent } from "../helpers/Utils.helpers";
import { ClimbingRouteStyled } from "./Pages.styled";
import RouteImage from "../assets/climber-rope.jpg";
import RoutesTable from "../components/RoutesTable";

const baseURL = "api/routes";
const ClimbingRoutes = () => {
  const [routesData, setRoutesData] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [contentCount, setContentCount] = useState(null);
  const [orderBy, setOrderBy] = useState("name");

  const handleGetRoutes = useCallback(async (url) => {
    const routes = await getPaginatedContent(url);
    if (routes) {
      setRoutesData(routes.results);
      setNextPage(routes.next);
      setPreviousPage(routes.previous);
      setContentCount(routes.count);
    }
  }, []);

  useEffect(() => {
    handleGetRoutes(baseURL);
  }, [handleGetRoutes]);

  if (!routesData) {
    return <div>Routes does not exist.</div>;
  }

  return (
    <ClimbingRouteStyled>
      <HeroImage image={RouteImage} text={"Routes"} />
      <Container>
        <H3Styled align="center">Thinking about some specific route?</H3Styled>
        <Search content="routes" />

        <RoutesTable data={routesData} />

        <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          baseURL={baseURL}
          getData={handleGetRoutes}
          count={contentCount}
          orderBy={orderBy}
        />
      </Container>
    </ClimbingRouteStyled>
  );
};

export default ClimbingRoutes;
