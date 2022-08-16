import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClimbingRouteStyled } from "./Pages.styled";

const ClimbingRoute = () => {
  const [routeData, setRouteData] = useState(null);
  const { routeId } = useParams();

  const handleGetRoute = async (id) => {
    try {
      const response = await fetch(`/api/routes/${id}`);
      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        setRouteData(data);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (routeId) {
      handleGetRoute(+routeId);
    }
  }, []);

  if (!routeData) {
    return <ClimbingRouteStyled>Route does not exist.</ClimbingRouteStyled>;
  }

  const {
    id,
    author,
    created,
    description,
    grade,
    location,
    name,
    path,
    wall,
  } = routeData;
  const { image, image_height, image_width } = wall;

  return (
    <ClimbingRouteStyled>
      {id}
      {name}
    </ClimbingRouteStyled>
  );
};

export default ClimbingRoute;
