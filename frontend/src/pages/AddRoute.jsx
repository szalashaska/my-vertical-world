import React, { useId, useState } from "react";
import CanvasCreate from "../components/CanvasCreate";
import routeGrades from "../constans/RouteGrades";

const AddRoute = () => {
  const [routeName, setRouteName] = useState("routeName");
  const [routeDescription, setRouteDescription] = useState("Description");
  const [routeGrade, setRouteGrade] = useState("6a");
  const [routePath, setRoutePath] = useState(null);

  const [wallName, setWallName] = useState("WallName");
  const [wallImage, setWallImage] = useState(null);

  const [locationName, setLocationName] = useState("LocationName");

  const [canvasImage, setCanvasImage] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const id = useId();

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
      !routeName ||
      !routePath ||
      !routeDescription
    ) {
      setError("Could not record route path.");
      return;
    }

    const uploadData = {
      location_name: locationName,
      wall_name: wallName,
      route_name: routeName,
      route_path: routePath,
      route_grade: routeGrade,
      route_description: routeDescription,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(uploadData),
    };

    try {
      const data = await fetch("/api/routes", requestOptions);
      const response = await data.json();

      if (data.status === 201) {
        setSuccess(response.msg);
        console.log(response.wall_id);
      } else {
        setError("Could not upload route.");
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const handleUploadWallImage = async () => {
    if (!wallImage) {
      setError("There is no image to upload.");
      return;
    }

    let imageAsFormData = new FormData();
    imageAsFormData.append("image", wallImage);

    const requestOptions = {
      method: "POST",
      body: imageAsFormData,
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
