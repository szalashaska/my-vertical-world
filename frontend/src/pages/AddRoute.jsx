import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationForm from "../components/LocationForm";
import RouteForm from "../components/RouteForm";
import WallForm from "../components/WallForm";
import {
  ButtonStyled,
  Container,
  H1Styled,
  PStyled,
} from "../constans/GlobalStyles";
import AuthContext from "../contexts/AuthContext";
import MessageContext from "../contexts/MessageContext";
import { AddRouteStyled } from "./Pages.styled";

const FORM_NAMES = ["location", "wall", "route"];
const FORM_NAMES_LENGTH = FORM_NAMES.length;

const AddRoute = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const [activeForm, setActiveForm] = useState(FORM_NAMES[0]);
  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [routeGrade, setRouteGrade] = useState("6a");
  const [routePath, setRoutePath] = useState(null);
  const [wallName, setWallName] = useState("");
  const [wallImage, setWallImage] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);
  const [existingLocationId, setExistingLocationId] = useState(null);
  const [existingWallData, setExistingWallData] = useState(null);

  const { setError, setSuccess } = useContext(MessageContext);

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
        navigate("/news");
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
    if (activeForm === FORM_NAMES[1]) {
      setWallName("");
      setWallImage(null);
      setExistingWallData(null);
      setLocationName("");
      setLocationCoords("");
      setExistingLocationId(null);
    }
    // Route form
    if (activeForm === FORM_NAMES[2]) {
      setWallName("");
      setWallImage(null);
      setExistingWallData(null);
      setRouteName("");
      setRouteDescription("");
      setRoutePath(null);
    }
    setActiveFormIndex(activeFormIndex - 1);
  };

  useEffect(() => {
    if (locationName && activeFormIndex + 1 < FORM_NAMES_LENGTH)
      setActiveFormIndex(activeFormIndex + 1);
  }, [locationName]);

  useEffect(() => {
    if (wallName && activeFormIndex + 1 < FORM_NAMES_LENGTH)
      setActiveFormIndex(activeFormIndex + 1);
  }, [wallName]);

  useEffect(() => {
    if (routeName) handleUploadRouteWallAndLocation();
  }, [routeName]);

  useEffect(() => {
    setActiveForm(FORM_NAMES[activeFormIndex]);
  }, [activeFormIndex]);

  return (
    <AddRouteStyled>
      {activeForm !== FORM_NAMES[0] && (
        <Container>
          <ButtonStyled
            type="button"
            onClick={() => {
              handleGoBackClick();
            }}
          >
            Go back
          </ButtonStyled>
        </Container>
      )}

      {activeForm === FORM_NAMES[0] && (
        <>
          <Container>
            <H1Styled align="center">Location:</H1Styled>
            <PStyled align="center">
              Click on the map to mark location and enter name below or choose
              from existing locations.
            </PStyled>
          </Container>
          <LocationForm
            setLocationName={setLocationName}
            setLocationCoords={setLocationCoords}
            setExistingLocationId={setExistingLocationId}
          />
        </>
      )}

      {activeForm === FORM_NAMES[1] && (
        <Container>
          <H1Styled align="center">Wall:</H1Styled>
          <PStyled align="center">
            Add picture of the wall and enter name or add to existing walls.
          </PStyled>
          <WallForm
            existingLocationId={existingLocationId}
            setWallName={setWallName}
            setWallImage={setWallImage}
            setExistingWallData={setExistingWallData}
          />
        </Container>
      )}

      {activeForm === FORM_NAMES[2] && (
        <Container>
          <H1Styled align="center">Route:</H1Styled>
          <PStyled align="center" mb="1.5rem">
            Enter route name, description and grade. On the image - draw path
            with a single stroke.
          </PStyled>
          <RouteForm
            setRouteName={setRouteName}
            setRouteGrade={setRouteGrade}
            setRouteDescription={setRouteDescription}
            setRoutePath={setRoutePath}
            wallImage={wallImage}
            existingWallData={existingWallData}
          />
        </Container>
      )}
    </AddRouteStyled>
  );
};

export default AddRoute;
