import React, { useContext, useEffect, useState } from "react";
import CanvasCreate from "../components/CanvasCreate";
import FormInput from "../components/FormInput";
import LocationMap from "../components/LocationMap";
import { ButtonStyled, H2Styled } from "../constans/GlobalStyles";
import routeGrades from "../constans/RouteGrades";
import AuthContext from "../contexts/AuthContext";
import LocationContext from "../contexts/LocationContext";
import { AddRouteStyled } from "./Pages.styled";

const AddRoute = () => {
  const [addLocationTab, setAddaddLocationTab] = useState(true);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCenter, setMapCenter] = useState([2078486, 6686398]);

  const [locationsList, setLocationsList] = useState(undefined);
  const [wallsList, setWallsList] = useState(undefined);

  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [routeGrade, setRouteGrade] = useState("6a");
  const [routePath, setRoutePath] = useState(null);
  const [wallName, setWallName] = useState("");
  const [wallImage, setWallImage] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);

  const [canvasImage, setCanvasImage] = useState(null);

  const [showLocationForm, setShowLocationForm] = useState(true);
  const [showWallForm, setShowWallForm] = useState(false);
  const [wallAlreadyExist, setWallAlreadyExist] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { authTokens } = useContext(AuthContext);

  const checkUserWallNameInput = (userInput) => {
    if (!wallsList || wallsList.length === 0) return;

    const wall = userInput.trim().toLowerCase();
    const match = wallsList.find((item) => item.name === wall);
    if (match) {
      setWallAlreadyExist(true);
    } else setWallAlreadyExist(false);
  };

  const temporaryData = [
    {
      id: 1,
      name: "Tatry",
      location_coordinates: [-5123741.681892477, 117609.5756750945],
    },
    {
      id: 2,
      name: "Sokoły",
      location_coordinates: [-9168741.688912477, 2204679.5756750945],
    },

    {
      id: 8,
      name: "Jura",
      location_coordinates: [-1657841.681892477, 3633079.5756750945],
    },

    {
      id: 4,
      name: "Chamonix",
      location_coordinates: [-1186741.681892477, -4436079.5756750945],
    },
  ];

  const locationInputs = [
    {
      id: 1,
      name: "location_name",
      type: "text",
      placeholder: "Location name...",
      label: "Location name:",
      required: true,
      value: locationName,
      onChange: (e) => setLocationName(e.target.value),
    },
  ];

  const wallInputs = [
    {
      id: 2,
      name: "wall_name",
      type: "text",
      placeholder: "Wall name...",
      label: "Wall name:",
      required: true,
      value: wallName,
      onChange: (e) => {
        setWallName(e.target.value);
        checkUserWallNameInput(e.target.value);
      },
    },
    {
      id: 3,
      accept: "image/jpeg, image/png, image/jpg",
      name: "wall_image",
      type: "file",
      placeholder: "Wall image...",
      label: "Wall image:",
      disabled: wallAlreadyExist,
      required: true,
      onChange: (e) => e.target.files && setWallImage(e.target.files[0]),
    },
  ];

  const routeInputs = [
    {
      id: 4,
      name: "route_name",
      type: "text",
      placeholder: "Route name...",
      label: "Route name:",
      required: true,
      value: routeName,
      onChange: (e) => setRouteName(e.target.value),
    },
    {
      id: 5,
      name: "route_grade",
      type: "select",
      options: routeGrades,
      placeholder: "Route grade...",
      label: "Route grade:",
      required: true,
      value: routeGrade,
      onChange: (e) => setRouteGrade(e.target.value),
    },
    {
      id: 6,
      name: "route_description",
      type: "textarea",
      placeholder: "Route description...",
      label: "Route description:",
      required: true,
      value: routeDescription,
      onChange: (e) => setRouteDescription(e.target.value),
    },
  ];

  const handleGetLocationsList = async () => {
    const endpoint = "/api/locations";
    try {
      const data = await fetch(endpoint);
      const response = await data.json();

      if (data.status === 200) {
        setLocationsList(response);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const handleGetWallsList = async (locationId) => {
    const endpoint = `/api/walls?location_id=${locationId}`;
    try {
      const data = await fetch(endpoint);
      const response = await data.json();

      if (data.status === 200) {
        setWallsList(response);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const checkUserLocationNameInput = () => {
    if (!locationsList || locationsList.length === 0) return;

    const location = locationName.trim().toLowerCase();
    const match = locationsList.find((item) => item.name === location);
    if (match) {
      handleGetWallsList(match.id);
    }
  };

  const handleLocationForm = (e) => {
    e.preventDefault();
    checkUserLocationNameInput();
    setShowWallForm(true);
    setShowLocationForm(false);
  };

  const handleExistingLocationChoice = (id, name, coordinates) => {
    handleGetWallsList(id);
    setLocationName(name);
    setLocationCoords(coordinates);
    setShowLocationForm(false);
    setShowWallForm(true);
  };

  const showRouteImage = async () => {
    if (!wallImage) {
      setError("There is no image to show.");
      return;
    }

    if (wallImage.size > 2048000) {
      setError("Image should be less than 2 mb.");
      return;
    }

    let image = new Image();
    image.src = window.URL.createObjectURL(wallImage);
    image.onload = () => {
      setCanvasImage({
        height: image.height,
        width: image.width,
        url: image.src,
      });
    };
  };

  const handleWallForm = async (e) => {
    e.preventDefault();
    setShowWallForm(false);
    if (!checkUserWallNameInput()) {
      showRouteImage();
    }
  };

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
        setSuccess(response.msg);
        setCanvasImage(null);
      } else {
        setError("Could not upload route.");
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const handleRouteForm = (e) => {
    e.preventDefault();
    handleUploadRouteWallAndLocation();
  };

  useEffect(() => {
    handleGetLocationsList();
  }, []);

  return (
    <AddRouteStyled>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      {showLocationForm && (
        <>
          <button
            type="button"
            onClick={() => setAddaddLocationTab(!addLocationTab)}
          >
            {addLocationTab ? "Existing" : "New"}
          </button>

          <LocationContext.Provider
            value={{
              addLocationTab,
              setLocationCoords,
              handleExistingLocationChoice,
            }}
          >
            <H2Styled>
              {addLocationTab
                ? "Add new location:"
                : "Add to existing location:"}
            </H2Styled>
            {addLocationTab ? (
              <>
                <form onSubmit={handleLocationForm}>
                  {locationInputs.map((input) => (
                    <FormInput key={input.id} {...input} />
                  ))}
                  <ButtonStyled
                    type="submit"
                    disabled={locationName && locationCoords ? false : true}
                  >
                    Add location
                  </ButtonStyled>
                </form>

                <button
                  onClick={() => {
                    console.log(locationName, locationCoords);
                  }}
                >
                  log data
                </button>

                <hr />
              </>
            ) : (
              <ul>
                {locationsList &&
                  locationsList.length > 0 &&
                  locationsList.map((item) => (
                    <li
                      key={item.id}
                      onMouseEnter={() => {
                        setMapCenter([
                          item.coordinates.lon,
                          item.coordinates.lat,
                        ]);
                        setMapZoom(6);
                      }}
                    >
                      {item.name}
                      <button
                        type="button"
                        onClick={() => {
                          handleExistingLocationChoice(
                            item.id,
                            item.name,
                            item.coordinates
                          );
                        }}
                      >
                        Choose
                      </button>
                    </li>
                  ))}
              </ul>
            )}

            <hr />
            {locationsList && (
              <LocationMap
                zoom={mapZoom}
                center={mapCenter}
                data={locationsList}
              />
            )}
          </LocationContext.Provider>
        </>
      )}

      {showWallForm && (
        <>
          <H2Styled>Add new wall:</H2Styled>
          <form onSubmit={handleWallForm}>
            {wallInputs.map((input) => (
              <FormInput key={input.id} {...input} />
            ))}

            {wallAlreadyExist ? (
              <p>Wall already exist</p>
            ) : (
              <ButtonStyled type="submit">Add wall</ButtonStyled>
            )}
          </form>

          <hr />

          {wallsList && wallsList.length > 0 && (
            <>
              <H2Styled>Add to existing wall:</H2Styled>
              <ul>
                {wallsList.map((item) => (
                  <li key={item.id}>
                    {item.name}
                    <button
                      type="button"
                      onClick={() => {
                        setShowWallForm(false);

                        setWallName(item.name);
                        setWallImage(item.image);
                        setCanvasImage({
                          height: item.image_height,
                          width: item.image_width,
                          url: item.image,
                        });
                      }}
                    >
                      wybierz
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          <hr />
        </>
      )}

      {canvasImage && (
        <>
          <CanvasCreate
            height={canvasImage.height}
            width={canvasImage.width}
            url={canvasImage.url}
            setRoutePath={setRoutePath}
          />

          <form onSubmit={handleRouteForm}>
            {routeInputs.map((input) => (
              <FormInput key={input.id} {...input} />
            ))}

            <ButtonStyled type="submit">Add route</ButtonStyled>
          </form>
          <hr />
        </>
      )}
    </AddRouteStyled>
  );
};

export default AddRoute;
