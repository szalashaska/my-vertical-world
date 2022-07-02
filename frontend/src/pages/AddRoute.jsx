import React, { useState, useEffect, useContext, useRef } from "react";
import Canvas from "../components/Canvas";
import AuthContext from "../contexts/AuthContext";

const AddRoute = () => {
  const { authenticationTokens, logoutUser } = useContext(AuthContext);
  const [routeImage, setRouteImage] = useState(null);
  const [showRouteImage, setShowRouteImage] = useState(null);
  const [show, setShow] = useState({
    show: false,
    url: "",
  });

  const showImageRef = useRef();

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

    const reader = new FileReader();
    reader.readAsDataURL(showRouteImage);

    reader.onload = () => {
      const imageURL = reader.result;
      showImageRef.current.style.backgroundImage = `url(${imageURL})`;
    };
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

      {show.show && <img src={show.url} alt="" />}
      <hr />
      <Canvas height={500} width={500} />
      <div className="show-image-container" ref={showImageRef}></div>
    </div>
  );
};

export default AddRoute;

// useEffect(() => {
//   getNotes();
// }, []);

// let getNotes = async () => {
//   let response = await fetch("/api/notes", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + String(authenticationTokens.access),
//     },
//   });

//   let data = await response.json();

//   if (response.status === 200) {
//     setNotes(data);
//   } else if (response.statusText === "Unauthorized") {
//     logoutUser();
//   }
// };
