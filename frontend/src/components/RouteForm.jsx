import React, { useContext, useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import CanvasCreate from "../components/CanvasCreate";
import CanvasShow from "./CanvasShow";
import { ButtonStyled, Wrapper } from "../constans/GlobalStyles";
import routeGrades from "../constans/RouteGrades";
import MessageContext from "../contexts/MessageContext";
import ZoomController from "./ZoomController";

const RouteForm = ({
  routeName,
  routeDescription,
  routeGrade,
  routePath,
  setRouteName,
  setRouteGrade,
  setRouteDescription,
  setRoutePath,
  wallImage,
  existingWallData,
  edit,
}) => {
  const [routesList, setRoutesList] = useState(undefined);
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [canvasUrl, setCanvasUrl] = useState(null);
  const [name, setName] = useState(routeName || "");
  const [description, setDescription] = useState(routeDescription || "");
  const [grade, setGrade] = useState(routeGrade || "6a");
  const [path, setPath] = useState(routePath || null);
  const [editRoute, setEditRoute] = useState(edit);

  const { setError } = useContext(MessageContext);

  const routeInputs = [
    {
      id: 4,
      name: "route_name",
      type: "text",
      placeholder: "Route name...",
      label: "Route name:",
      required: true,
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      id: 5,
      name: "route_grade",
      type: "select",
      options: routeGrades,
      placeholder: "Route grade...",
      label: "Route grade:",
      required: true,
      value: grade,
      onChange: (e) => setGrade(e.target.value),
    },
    {
      id: 6,
      name: "route_description",
      type: "textarea",
      placeholder: "Route description...",
      label: "Route description:",
      required: true,
      value: description,
      maxlength: 500,
      onChange: (e) => setDescription(e.target.value),
    },
  ];

  const handleGetRouteList = async (id) => {
    const endpoint = `/api/walls/${id}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (response.status === 200) {
        setRoutesList(data.routes);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const showRouteImage = async () => {
    if (!wallImage) return;

    let image = new Image();
    image.src = window.URL.createObjectURL(wallImage);
    image.onload = () => {
      setCanvasHeight(image.height);
      setCanvasWidth(image.width);
      setCanvasUrl(image.src);
    };
  };

  const checkUserRouteNameInput = () => {
    if (!routesList || routesList.length === 0) return true;

    const route = name.trim().toLowerCase();
    const match = routesList.find((item) => item.name === route);
    if (!match) return true;

    // While editing, allow the orginal edited name
    if (edit && match.name === routeName) return true;

    setError("Route name already exist.");
    return false;
  };

  const handleRouteForm = (e) => {
    e.preventDefault();
    if (checkUserRouteNameInput()) {
      setRouteName(name);
      setRouteGrade(grade);
      setRouteDescription(description);
      setRoutePath(path);
    }
  };

  useEffect(() => {
    if (existingWallData) {
      handleGetRouteList(existingWallData.id);
      setCanvasHeight(existingWallData.height);
      setCanvasWidth(existingWallData.width);
      setCanvasUrl(wallImage);
    } else showRouteImage();
  }, [wallImage]);

  return (
    <>
      <form onSubmit={handleRouteForm}>
        {routeInputs.map((input) => (
          <FormInput key={input.id} {...input} />
        ))}

        {editRoute && canvasUrl ? (
          <Wrapper>
            <ZoomController>
              <CanvasShow
                height={canvasHeight}
                width={canvasWidth}
                url={canvasUrl}
                routePath={path}
              />
            </ZoomController>
            <ButtonStyled
              type="button"
              onClick={() => {
                setEditRoute(false);
                setPath("");
              }}
              primary
            >
              Edit route path
            </ButtonStyled>
          </Wrapper>
        ) : (
          <ZoomController>
            <CanvasCreate
              height={canvasHeight}
              width={canvasWidth}
              url={canvasUrl}
              setPath={setPath}
            />
          </ZoomController>
        )}
        <ButtonStyled type="submit" disabled={!name || !description || !path}>
          {edit ? "Edit route" : "Add route"}
        </ButtonStyled>
      </form>
    </>
  );
};

export default RouteForm;
