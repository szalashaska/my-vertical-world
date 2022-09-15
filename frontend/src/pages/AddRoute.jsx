import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationForm from "../components/LocationForm";
import RouteForm from "../components/RouteForm";
import WallForm from "../components/WallForm";
import { ButtonStyled } from "../constans/GlobalStyles";
import AuthContext from "../contexts/AuthContext";
import { AddRouteStyled } from "./Pages.styled";

const AddRoute = () => {
  const formNames = ["location", "wall", "route"];
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const [activeForm, setActiveForm] = useState(formNames[0]);
  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [routeGrade, setRouteGrade] = useState("6a");
  const [routePath, setRoutePath] = useState(null);
  const [wallName, setWallName] = useState("");
  const [wallImage, setWallImage] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);
  const [existingLocationId, setExistingLocationId] = useState(null);
  const [existingWallDimensions, setExistingWallDimensions] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUploadRouteWallAndLocation = async () => {
    if (
      !locationName ||
      !locationCoords ||
      !wallName ||
      !wallImage ||
      !routeName ||
      !routePath ||
      !routeDescription
    ) {
      setError("Please provide all required data.");
      return;
    }

    let body = new FormData();
    body.append("location_name", locationName);
    body.append("location_coordinates", JSON.stringify(locationCoords));
    body.append("wall_name", wallName);
    body.append("wall_image", wallImage);
    body.append("route_name", routeName);
    body.append("route_path", JSON.stringify(routePath));
    body.append("route_grade", routeGrade);
    body.append("route_description", routeDescription);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
      body: body,
    };

    try {
      const data = await fetch("/api/routes", requestOptions);
      const response = await data.json();

      if (data.status === 201) {
        setSuccess(response.success);
        navigate("/");
      } else {
        setError("Could not upload route.");
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const handleGoBackClick = () => {
    if (activeFormIndex - 1 < 0) return;
    // Wall form
    if (activeForm === formNames[1]) {
      setWallName("");
      setWallImage(null);
      setExistingWallDimensions(null);
      setLocationName("");
      setLocationCoords("");
      setExistingLocationId(null);
    }
    // Route form
    if (activeForm === formNames[2]) {
      setWallName("");
      setWallImage(null);
      setExistingWallDimensions(null);
      setRouteName("");
      setRouteDescription("");
      setRoutePath(null);
    }
    setActiveFormIndex(activeFormIndex - 1);
  };

  useEffect(() => {
    if (locationName) setActiveFormIndex(activeFormIndex + 1);
  }, [locationName]);

  useEffect(() => {
    if (wallName) setActiveFormIndex(activeFormIndex + 1);
  }, [wallName]);

  useEffect(() => {
    if (routeName) handleUploadRouteWallAndLocation();
  }, [routeName]);

  useEffect(() => {
    setActiveForm(formNames[activeFormIndex]);
  }, [activeFormIndex]);

  return (
    <AddRouteStyled>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      {activeForm !== formNames[0] && (
        <ButtonStyled
          type="button"
          onClick={() => {
            handleGoBackClick();
          }}
        >
          Go back
        </ButtonStyled>
      )}

      {activeForm === formNames[0] && (
        <LocationForm
          setLocationName={setLocationName}
          setLocationCoords={setLocationCoords}
          setExistingLocationId={setExistingLocationId}
        />
      )}

      {activeForm === formNames[1] && (
        <WallForm
          existingLocationId={existingLocationId}
          setWallName={setWallName}
          setWallImage={setWallImage}
          setExistingWallDimensions={setExistingWallDimensions}
        />
      )}

      {activeForm === formNames[2] && (
        <RouteForm
          setRouteName={setRouteName}
          setRouteGrade={setRouteGrade}
          setRouteDescription={setRouteDescription}
          setRoutePath={setRoutePath}
          wallImage={wallImage}
          existingWallDimensions={existingWallDimensions}
        />
      )}
    </AddRouteStyled>
  );
};

export default AddRoute;
