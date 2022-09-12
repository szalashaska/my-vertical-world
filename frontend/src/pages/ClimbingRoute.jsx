import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CanvasShowMany from "../components/CanvasShowMany";
import Like from "../components/Like";
import { ClimbingRouteStyled } from "./Pages.styled";

const ClimbingRoute = () => {
  const [routeData, setRouteData] = useState(null);
  const { routeId } = useParams();

  const handleGetRoute = async (id) => {
    try {
      const response = await fetch(`/api/routes/${id}`);
      const data = await response.json();

      if (response.status === 200) {
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
    likes,
    wall,
  } = routeData;
  const { image, image_height, image_width } = wall;

  return (
    <ClimbingRouteStyled>
      {routeData && (
        <CanvasShowMany
          height={image_height}
          width={image_width}
          url={image}
          routesData={[routeData]}
        />
      )}
      <Like id={id} currentLikes={likes} content={"routes"} />
    </ClimbingRouteStyled>
  );
};

export default ClimbingRoute;
