import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Edit from "../components/Edit";
import RouteForm from "../components/RouteForm";
import { Container, PStyled } from "../constans/GlobalStyles";

const EditRoute = () => {
  const locationHook = useLocation();
  const { routeData } = locationHook.state;
  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [routeGrade, setRouteGrade] = useState("");
  const [routePath, setRoutePath] = useState(null);

  if (!routeData) return null;

  const { id, description, grade, name, path, wall } = routeData;

  return (
    <Container>
      <Edit
        id={id}
        state={routeName}
        data={{
          name: routeName,
          path: routePath,
          grade: routeGrade,
          description: routeDescription,
        }}
        content={"routes"}
      />
      <PStyled align="center" mb="1.5rem">
        Edit route path, name, description and grade.
      </PStyled>
      <RouteForm
        routeName={name}
        routeDescription={description}
        routeGrade={grade}
        routePath={path}
        setRouteName={setRouteName}
        setRouteGrade={setRouteGrade}
        setRouteDescription={setRouteDescription}
        setRoutePath={setRoutePath}
        wallImage={wall.image}
        existingWallData={{
          id: wall.id,
          height: wall.image_height,
          width: wall.image_width,
        }}
        edit
      />
    </Container>
  );
};

export default EditRoute;
