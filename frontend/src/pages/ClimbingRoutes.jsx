import React, { useEffect, useState, useCallback } from "react";
import HeroImage from "../components/HeroImage";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { Container, H3Styled } from "../constans/GlobalStyles";
import { getPaginatedContent } from "../helpers/Utils.helpers";
import { ClimbingRouteStyled } from "./Pages.styled";
import RouteImage from "../assets/climber-rope.jpg";
import Table from "../components/Table";

const baseURL = "api/routes";
const tableHead = ["name", "grade", "author", "created"];
const pageSizes = [5, 10, 20];

const URL = `${baseURL}?order_by=${tableHead[0]}&page=${1}&size=${
  pageSizes[0]
}`;

const ClimbingRoutes = () => {
  const [routesData, setRoutesData] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [contentCount, setContentCount] = useState(null);

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
    handleGetRoutes(URL);
  }, [handleGetRoutes]);

  if (!routesData) {
    return (
      <ClimbingRouteStyled>
        <Container>Routes does not exist.</Container>
      </ClimbingRouteStyled>
    );
  }

  return (
    <ClimbingRouteStyled>
      <HeroImage image={RouteImage} text={"Routes"} />
      <Container>
        <H3Styled align="center">Thinking about some specific route?</H3Styled>
        <Search content="routes" />

        <Table data={routesData} tableHead={tableHead} content={"routes"} />

        <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          baseURL={baseURL}
          getData={handleGetRoutes}
          count={contentCount}
          tableHead={tableHead}
          pageSizes={pageSizes}
        />
      </Container>
    </ClimbingRouteStyled>
  );
};

export default ClimbingRoutes;
