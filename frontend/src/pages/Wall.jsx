import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CanvasShowMany from "../components/CanvasShowMany";
import { H2Styled } from "../constans/GlobalStyles";
import { WallStyled } from "./Pages.styled";

const Wall = () => {
  const [wallData, setWallData] = useState(null);
  const { wallId } = useParams();

  const handleGetWallData = async (id) => {
    try {
      const response = await fetch(`/api/walls/${id}`);
      const data = await response.json();

      if (response.status === 200) {
        setWallData(data);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (wallId) {
      handleGetWallData(+wallId);
    }
  }, []);

  if (!wallData) {
    return <WallStyled> No wall </WallStyled>;
  }

  const { name, image_height, image_width, image, routes } = wallData;

  return (
    <WallStyled>
      <H2Styled>Wall name: {name}</H2Styled>
      <CanvasShowMany
        height={image_height}
        width={image_width}
        url={image}
        routesData={routes}
      />
    </WallStyled>
  );
};

export default Wall;

// height={image_height}
// width={image_width}
// url={image}
// routePath={path}
