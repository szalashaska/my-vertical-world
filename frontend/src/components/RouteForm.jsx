import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import CanvasCreate from "../components/CanvasCreate";
import { ButtonStyled } from "../constans/GlobalStyles";
import routeGrades from "../constans/RouteGrades";

const RouteForm = ({
  setRouteName,
  setRouteGrade,
  setRouteDescription,
  setRoutePath,
  wallImage,
  existingWallDimensions,
}) => {
  const [canvasHeight, setCanvasHeight] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);
  const [canvasUrl, setCanvasUrl] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("6a");
  const [path, setPath] = useState(null);

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

  const showRouteImage = async () => {
    if (!wallImage) {
      //   setError("There is no image to show.");
      return;
    }

    if (wallImage.size > 2048000) {
      //   setError("Image should be less than 2 mb.");
      return;
    }

    let image = new Image();
    image.src = window.URL.createObjectURL(wallImage);
    image.onload = () => {
      setCanvasHeight(image.height);
      setCanvasWidth(image.width);
      setCanvasUrl(image.src);
    };
  };

  const handleRouteForm = (e) => {
    e.preventDefault();
    setRouteName(name);
    setRouteGrade(grade);
    setRouteDescription(description);
    setRoutePath(path);
  };

  useEffect(() => {
    if (existingWallDimensions) {
      setCanvasHeight(existingWallDimensions.height);
      setCanvasWidth(existingWallDimensions.width);
      setCanvasUrl(wallImage);
    } else showRouteImage();
  }, [wallImage]);

  return (
    <>
      {wallImage && (
        <CanvasCreate
          height={canvasHeight}
          width={canvasWidth}
          url={canvasUrl}
          setPath={setPath}
        />
      )}

      <form onSubmit={handleRouteForm}>
        {routeInputs.map((input) => (
          <FormInput key={input.id} {...input} />
        ))}

        <ButtonStyled type="submit" disabled={!name || !description || !path}>
          Add route
        </ButtonStyled>
      </form>
    </>
  );
};

export default RouteForm;
