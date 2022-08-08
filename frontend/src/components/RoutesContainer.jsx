import React from "react";
import RouteCard from "./RouteCard";
import { RoutesContainerStyled } from "./styled/RoutesContainer.styled";

const RoutesContainer = ({ routes }) => {
  return (
    <RoutesContainerStyled>
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </RoutesContainerStyled>
  );
};

export default RoutesContainer;
