import React, { useContext, useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import LocationMap from "../components/LocationMap";
import LocationContext from "../contexts/LocationContext";
import { ButtonStyled } from "../constans/GlobalStyles";
import ActiveTabBar from "./ActiveTabBar";
import MessageContext from "../contexts/MessageContext";

const LocationForm = ({
  locationName,
  locationCoords,
  setLocationName,
  setLocationCoords,
  setExistingLocationId,
  editedLocation,
}) => {
  const tabs = ["Add new location", "Append to existing location"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCenter, setMapCenter] = useState([2078486, 6686398]);
  const [locationsList, setLocationsList] = useState(undefined);
  const [name, setName] = useState(locationName || "");
  const [coords, setCoords] = useState(locationCoords || null);
  const { setError } = useContext(MessageContext);

  const locationInputs = [
    {
      id: 1,
      name: "location_name",
      type: "text",
      placeholder: "Location name...",
      label: "Location name:",
      required: true,
      value: name,
      onChange: (e) => setName(e.target.value),
    },
  ];

  const handleGetLocationsList = async () => {
    const endpoint = "/api/locations";
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (response.status === 200) {
        setLocationsList(data);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const checkUserLocationNameInput = () => {
    if (!locationsList || locationsList.length === 0) return true;

    const location = name.trim().toLowerCase();
    const match = locationsList.find((item) => item.name === location);
    if (!match) return true;

    // While editing, allow the orginal edited name
    if (editedLocation && match.name === locationName) return true;

    setError("Location name already exist.");
    return false;
  };

  const handleLocationForm = (e) => {
    e.preventDefault();
    if (checkUserLocationNameInput()) {
      setLocationName(name);
      setLocationCoords(coords);
    }
  };

  const handleExistingLocationChoice = (id, name, coordinates) => {
    setExistingLocationId(id);
    setLocationName(name);
    setLocationCoords(coordinates);
  };

  useEffect(() => {
    handleGetLocationsList();
  }, []);

  if (!locationsList) return null;

  return (
    <>
      {!editedLocation && locationsList.length > 0 && (
        <ActiveTabBar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      <LocationContext.Provider
        value={{
          activeTab,
          tabs,
          setCoords,
          handleExistingLocationChoice,
          editedLocation,
        }}
      >
        {locationsList && (
          <LocationMap
            zoom={mapZoom}
            center={mapCenter}
            data={editedLocation ? [editedLocation] : locationsList}
          />
        )}
      </LocationContext.Provider>

      {activeTab === tabs[0] ? (
        <form onSubmit={handleLocationForm}>
          {locationInputs.map((input) => (
            <FormInput key={input.id} {...input} />
          ))}
          <ButtonStyled type="submit" disabled={!name || !coords}>
            {editedLocation ? "Edit location" : "Add location"}
          </ButtonStyled>
        </form>
      ) : (
        <ul>
          {locationsList &&
            locationsList.length > 0 &&
            locationsList.map((item) => (
              <li
                key={item.id}
                onMouseEnter={() => {
                  setMapCenter([item.coordinates.lon, item.coordinates.lat]);
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
    </>
  );
};

export default LocationForm;
