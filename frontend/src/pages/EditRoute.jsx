import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Edit from "../components/Edit";
import RouteForm from "../components/RouteForm";
import AuthContext from "../contexts/AuthContext";
import MessageContext from "../contexts/MessageContext";

const EditRoute = () => {
  const locationHook = useLocation();
  const { routeData } = locationHook.state;
  const [routeName, setRouteName] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [routeGrade, setRouteGrade] = useState("");
  const [routePath, setRoutePath] = useState(null);
  const { authTokens } = useContext(AuthContext);
  const { setError, setSuccess } = useContext(MessageContext);
  const navigate = useNavigate();

  if (!routeData) return null;

  const { id, description, grade, name, path, wall } = routeData;

  const handleEditContent = async (id, contentData, content) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
      body: JSON.stringify(contentData),
    };
    const endpoint = `/api/${content}/${id}`;

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setSuccess(data.success);
        navigate(`/${content}/${id}`);
      } else setError("Could not edit content.");
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  return (
    <div>
      <Edit
        id={id}
        state={routeName}
        data={{
          name: routeName,
          path: routePath,
          grade: routeGrade,
          description: routeDescription,
        }}
        content={"routes"}
      />
      <RouteForm
        routeName={name}
        routeDescription={description}
        routeGrade={grade}
        routePath={path}
        setRouteName={setRouteName}
        setRouteGrade={setRouteGrade}
        setRouteDescription={setRouteDescription}
        setRoutePath={setRoutePath}
        wallImage={wall.image}
        existingWallData={{
          id: wall.id,
          height: wall.image_height,
          width: wall.image_width,
        }}
        edit
      />
    </div>
  );
};

export default EditRoute;
