import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import LocationMap from "../components/LocationMap";
import LocationContext from "../contexts/LocationContext";
import { ButtonStyled, H2Styled } from "../constans/GlobalStyles";
import ActiveTabBar from "./ActiveTabBar";

const LocationForm = ({
  setLocationName,
  setLocationCoords,
  setExistingLocationId,
}) => {
  const tabs = ["add", "append"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCenter, setMapCenter] = useState([2078486, 6686398]);

  const [locationsList, setLocationsList] = useState(undefined);

  const [name, setName] = useState("");
  const [coords, setCoords] = useState(null);

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
    if (match) {
      setName("");
      console.log("name already exist");
      return false;
    }
    return true;
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
      <ActiveTabBar tabs={tabs} setActiveTab={setActiveTab} />

      {activeTab === tabs[0] ? (
        <>
          <H2Styled>Add new location:</H2Styled>
          <form onSubmit={handleLocationForm}>
            {locationInputs.map((input) => (
              <FormInput key={input.id} {...input} />
            ))}
            <ButtonStyled type="submit" disabled={!name || !coords}>
              Add location
            </ButtonStyled>
          </form>
        </>
      ) : (
        <>
          <H2Styled>Append to existing location:</H2Styled>
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
        </>
      )}

      <LocationContext.Provider
        value={{
          activeTab,
          tabs,
          setCoords,
          handleExistingLocationChoice,
        }}
      >
        {locationsList && (
          <LocationMap zoom={mapZoom} center={mapCenter} data={locationsList} />
        )}
      </LocationContext.Provider>
    </>
  );
};

export default LocationForm;
