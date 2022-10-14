import React, { useEffect, useState, useCallback } from "react";
import Pagination from "../components/Pagination";
import { getPaginatedContent } from "../helpers/Utils.helpers";

const baseURL = "api/routes";
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
    handleGetRoutes(baseURL);
  }, [handleGetRoutes]);

  if (!routesData) {
    return <div>Routes does not exist.</div>;
  }

  return (
    <div>
      {routesData.map((route) => (
        <div key={route.id}> {route.name}</div>
      ))}

      <Pagination
        nextPage={nextPage}
        previousPage={previousPage}
        baseURL={baseURL}
        getData={handleGetRoutes}
        count={contentCount}
      />
    </div>
  );
};

export default ClimbingRoutes;
