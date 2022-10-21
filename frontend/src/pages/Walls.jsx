import React, { useCallback, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import { Container } from "../constans/GlobalStyles";

import { getPaginatedContent } from "../helpers/Utils.helpers";
import { WallStyled } from "./Pages.styled";

const baseURL = "api/walls";
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
    handleGetWalls(baseURL);
  }, [handleGetWalls]);

  if (!wallsData) return <div>no walls</div>;

  return (
    <WallStyled>
      <Container>
        <Search content="walls" />
        {wallsData.map((wall) => (
          <div key={wall.id}>
            <img
              src={wall.image}
              alt=""
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                display: "inline",
              }}
            />
            {wall.name}
          </div>
        ))}

        <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          getData={handleGetWalls}
          baseURL={baseURL}
          count={contentCount}
        />
      </Container>
    </WallStyled>
  );
};

export default Walls;
