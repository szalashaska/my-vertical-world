import React, { useState, useEffect, useContext, useRef } from "react";
import Canvas from "../components/Canvas";
import AuthContext from "../contexts/AuthContext";

const AddRoute = () => {
  const { authenticationTokens, logoutUser } = useContext(AuthContext);
  const [routeImage, setRouteImage] = useState(null);
  const [canvasImage, setCanvasImage] = useState(null);
  const [showRouteImage, setShowRouteImage] = useState(null);

  const handleUploadImageForm = async (e) => {
    e.preventDefault();
    if (!routeImage) return;

    const imageAsFormData = new FormData();
    imageAsFormData.append("image", routeImage);

    const requestOptions = {
      method: "POST",
      body: imageAsFormData,
    };

    try {
      const data = await fetch("/api/route/image", requestOptions);
      const response = await data.json();

      if (data.status === 200) {
        setShow({
          show: true,
          url: `/media/${response.url}`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUploadForm = async (e) => {
    e.preventDefault();
    if (!showRouteImage) return;

    const image = new Image();

    image.src = window.URL.createObjectURL(showRouteImage);
    image.onload = () => {
      setCanvasImage({
        height: image.height,
        width: image.width,
        url: image.src,
      });
    };

    // const reader = new FileReader();
    // reader.readAsDataURL(showRouteImage);
    // reader.onload = () => {
    //   const imageURL = reader.result;
    //   showImageRef.current.style.backgroundImage = `url(${imageURL})`;
    // };
  };

  return (
    <div>
      <form onSubmit={handleUploadImageForm}>
        <label htmlFor="upload-photo">
          Upload photo
          <input
            accept="image/jpeg, image/png, image/jpg"
            id="upload-photo"
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
          Upload Route Picture!
        </button>
      </form>

      <form onSubmit={handleImageUploadForm}>
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
                setShowRouteImage(fileList[0]);
              }
            }}
          />
        </label>
        <button type="submit" className="btn">
          Show Route Picture!
        </button>
      </form>

      <hr />
      {canvasImage && (
        <Canvas
          height={canvasImage.height}
          width={canvasImage.width}
          url={canvasImage.url}
        />
      )}
    </div>
  );
};

export default AddRoute;
