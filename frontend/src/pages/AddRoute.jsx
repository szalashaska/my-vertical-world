import React, { useContext, useId, useState } from "react";
import CanvasCreate from "../components/CanvasCreate";
import routeGrades from "../constans/RouteGrades";
import AuthContext from "../contexts/AuthContext";

const AddRoute = () => {
  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [routeGrade, setRouteGrade] = useState("6a");
  const [routePath, setRoutePath] = useState(null);

  const [wallName, setWallName] = useState("");
  const [wallImage, setWallImage] = useState(null);

  const [locationName, setLocationName] = useState("");

  const [canvasImage, setCanvasImage] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const id = useId();
  const { authTokens } = useContext(AuthContext);

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
      onChange: (e) => setWallName(e.target.value),
    },
    {
      id: 3,
      name: "wall_image",
      type: "file",
      placeholder: "Wall image...",
      label: "Wall image:",
      required: true,
      accept: "image/jpeg, image/png, image/jpg",
      value: wallImage,
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
      type: "text",
      placeholder: "Route grade...",
      label: "Route grade:",
      required: true,
      value: routeGrade,
      onChange: (e) => setRouteGrade(e.target.value),
    },
  ];

  const handleLocationForm = (e) => {
    e.preventDefault();
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
    showRouteImage();
  };

  const handleUploadRouteWallAndLocation = async () => {
    if (
      !locationName ||
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
      } else {
        setError("Could not upload route.");
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  // const handleUploadRouteWallAndLocation = async () => {
  //   if (
  //     !locationName ||
  //     !wallName ||
  //     !routeName ||
  //     !routePath ||
  //     !routeDescription
  //   ) {
  //     setError("Could not record route path.");
  //     return;
  //   }

  //   const uploadData = {
  //     location_name: locationName,
  //     wall_name: wallName,
  //     route_name: routeName,
  //     route_path: routePath,
  //     route_grade: routeGrade,
  //     route_description: routeDescription,
  //   };

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${String(authTokens.access)}`,
  //     },
  //     body: JSON.stringify(uploadData),
  //   };

  //   try {
  //     const data = await fetch("/api/routes", requestOptions);
  //     const response = await data.json();

  //     if (data.status === 201) {
  //       setSuccess(response.msg);
  //       console.log(response.wall_id);
  //     } else {
  //       setError("Could not upload route.");
  //     }
  //   } catch (err) {
  //     console.log("Unexpected error", err);
  //   }
  // };

  const handleUploadWallImage = async () => {
    if (!wallImage) {
      setError("There is no image to upload.");
      return;
    }

    let body = new FormData();
    body.append("image", wallImage);

    const requestOptions = {
      method: "POST",
      body: body,
    };

    try {
      const data = await fetch("/api/route/image", requestOptions);
      const response = await data.json();

      if (data.status === 201) {
        setSuccess(response.msg);
      } else {
        setError("Could not upload image.");
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const handleRouteForm = (e) => {
    e.preventDefault();
    handleUploadRouteWallAndLocation();
  };

  return (
    <div>
      <form onSubmit={handleLocationForm}>
        <label htmlFor={`location-${id}`}>
          Location name:
          <input
            id={`location-${id}`}
            type="text"
            placeholder="Location name..."
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            required
          />
        </label>

        <button type="submit">Add location</button>
      </form>

      <hr />

      <form onSubmit={handleWallForm}>
        <label htmlFor={`wall-${id}`}>
          Wall name:
          <input
            id={`wall-${id}`}
            type="text"
            placeholder="Wall name..."
            value={wallName}
            onChange={(e) => setWallName(e.target.value)}
            required
          />
        </label>

        <label htmlFor={`image-${id}`}>
          Add photo:
          <input
            accept="image/jpeg, image/png, image/jpg"
            id={`image-${id}`}
            type="file"
            required
            onChange={(e) => {
              const fileList = e.target.files;
              if (fileList) {
                setWallImage(fileList[0]);
              }
            }}
          />
        </label>

        <button type="submit">Add wall</button>
      </form>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <hr />

      {canvasImage && (
        <>
          <CanvasCreate
            height={canvasImage.height}
            width={canvasImage.width}
            url={canvasImage.url}
            setRoutePath={setRoutePath}
          />

          <form onSubmit={handleRouteForm}>
            <label htmlFor={`routename-${id}`}>
              Route name:
              <input
                id={`routename-${id}`}
                type="text"
                placeholder="Route name..."
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                required
              />
            </label>

            <label htmlFor={`grade-${id}`}>
              Grade:
              <select
                id={`grade-${id}`}
                value={routeGrade}
                onChange={(e) => setRouteGrade(e.target.value)}
                required
              >
                {routeGrades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor={`description-${id}`}>
              <textarea
                placeholder="Description..."
                value={routeDescription}
                onChange={(e) => setRouteDescription(e.target.value)}
                id={`description-${id}`}
              />
            </label>

            <button type="submit">Add route</button>
          </form>
        </>
      )}

      <div>
        {routeName} <br />
        {routeDescription}
        <br />
        {routeGrade} <br />
        {wallName}
        <br />
        {locationName}
        <br />
      </div>
    </div>
  );
};

export default AddRoute;
