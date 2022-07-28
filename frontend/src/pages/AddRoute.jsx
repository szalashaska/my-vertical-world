import React, { useState } from "react";
import CanvasCreate from "../components/CanvasCreate";
import CanvasShow from "../components/CanvasShow";

const AddRoute = () => {
  const [routeImage, setRouteImage] = useState(null);
  const [routePath, setRoutePath] = useState(null);
  const [canvasImage, setCanvasImage] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //Another component
  const [newImage, setNewImage] = useState(null);
  const [newRoutePath, setNewRoutePath] = useState(null);

  const handleUploadRouteImage = async () => {
    if (!routeImage) {
      setError("There is no image to upload.");
      return;
    }

    let imageAsFormData = new FormData();
    imageAsFormData.append("image", routeImage);

    const requestOptions = {
      method: "POST",
      body: imageAsFormData,
    };

    try {
      const data = await fetch("/api/route/image", requestOptions);
      const response = await data.json();

      if (data.status === 201) {
        setSuccess(response.msg);
        // TO SHOW
        setNewImage({
          width: response.width,
          height: response.height,
          url: response.url,
        });
      } else {
        setError("Could not upload image.");
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const handleShowImageForm = async (e) => {
    e.preventDefault();
    if (!routeImage) {
      setError("There is no image to show.");
      return;
    }

    if (routeImage.size > 2048000) {
      setError("Image should be less than 2 mb.");
      return;
    }

    let image = new Image();
    image.src = window.URL.createObjectURL(routeImage);
    image.onload = () => {
      setCanvasImage({
        height: image.height,
        width: image.width,
        url: image.src,
      });
    };
  };

  const handleUploadRoutePath = async () => {
    if (!routePath) {
      setError("Could not record route path.");
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: routePath }),
    };

    try {
      const data = await fetch("/api/route/path", requestOptions);
      const response = await data.json();

      if (data.status === 201) {
        setSuccess(response.msg);
        // TO UPLOAD
        setNewRoutePath(response.path);
      } else {
        setError("Could not upload route.");
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const handleUploadRoute = () => {
    handleUploadRouteImage();
    handleUploadRoutePath();
  };

  return (
    <div>
      <form onSubmit={handleShowImageForm}>
        <label htmlFor="show-photo">
          Show photo
          <input
            accept="image/jpeg, image/png, image/jpg"
            id="show-photo"
            type="file"
            name="route-image"
            onChange={(e) => {
              const fileList = e.target.files;
              if (fileList) {
                setRouteImage(fileList[0]);
              }
            }}
          />
        </label>
        <button type="submit" className="btn">
          Show Route Picture!
        </button>
      </form>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <hr />
      <br />
      <br />
      <br />
      {canvasImage && (
        <>
          <CanvasCreate
            height={canvasImage.height}
            width={canvasImage.width}
            url={canvasImage.url}
            setRoutePath={setRoutePath}
          />
        </>
      )}
      {routePath && (
        <button type="button" className="btn" onClick={handleUploadRoute}>
          Upload Route!
        </button>
      )}

      {/* -------------- For another component ----------------------- */}
      {newImage && newRoutePath && (
        <>
          <p>Here we should see our new route:</p>
          <CanvasShow
            height={newImage.height}
            width={newImage.width}
            url={newImage.url}
            routePath={newRoutePath}
          />
        </>
      )}
    </div>
  );
};

export default AddRoute;
