import React, { useCallback, useEffect, useState } from "react";
import HeroImage from "../components/HeroImage";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { Container, H3Styled } from "../constans/GlobalStyles";
import { getPaginatedContent } from "../helpers/Utils.helpers";
import { WallStyled } from "./Pages.styled";
import Panorama from "../assets/tre-cime.jpg";
import Table from "../components/Table";

const baseURL = "api/walls";
const tableHead = ["name", "author", "created", "image"];
const pageSizes = [5, 10, 20];

const URL = `${baseURL}?order_by=${tableHead[0]}&page=${1}&size=${
  pageSizes[0]
}`;

const Walls = () => {
  const [wallsData, setWallsData] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [contentCount, setContentCount] = useState(null);

  const handleGetWalls = useCallback(async (url) => {
    const walls = await getPaginatedContent(url);
    if (walls) {
      setWallsData(walls.results);
      setNextPage(walls.next);
      setPreviousPage(walls.previous);
      setContentCount(walls.count);
    }
  }, []);

  useEffect(() => {
    handleGetWalls(URL);
  }, [handleGetWalls]);

  if (!wallsData) return <div>no walls</div>;

  return (
    <WallStyled>
      <HeroImage image={Panorama} text={"Walls"} />
      <Container>
        <H3Styled align="center">Looking for a climbing wall?</H3Styled>
        <Search content="walls" />

        <Table data={wallsData} tableHead={tableHead} content={"walls"} />

        <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          getData={handleGetWalls}
          baseURL={baseURL}
          count={contentCount}
          tableHead={tableHead}
          pageSizes={pageSizes}
        />
      </Container>
    </WallStyled>
  );
};

export default Walls;
