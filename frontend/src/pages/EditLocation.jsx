import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Edit from "../components/Edit";
import LocationForm from "../components/LocationForm";

const EditLocation = () => {
  const locationHook = useLocation();
  const { locationData } = locationHook.state;

  const [locationName, setLocationName] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);

  if (!locationData) return null;

  const { id, name, coordinates } = locationData;

  return (
    <div>
      <Edit
        id={id}
        state={locationName}
        data={{
          name: locationName,
          coordinates: locationCoords,
        }}
        content={"locations"}
      />
      <LocationForm
        locationName={name}
        locationCoords={coordinates}
        setLocationName={setLocationName}
        setLocationCoords={setLocationCoords}
        setExistingLocationId={() => {}}
        editedLocation={locationData}
      />
    </div>
  );
};

export default EditLocation;
