import React, { useContext, useRef, useEffect, useState } from "react";
import MapContext from "../contexts/MapContext";
import Overlay from "ol/Overlay";
import LocationContext from "../contexts/LocationContext";
import { ButtonStyled } from "../constans/GlobalStyles";
import { PopupContainer } from "./styled/LocationOverlay.styled";

const LocationsOverlay = () => {
  const { map } = useContext(MapContext);
  const { activeTab, handleExistingLocationChoice, editedLocation, tabs } =
    useContext(LocationContext);

  const { setCoords } = useContext(LocationContext);
  const [popupOverlay, setPopupOverlay] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);

  const popupContainer = useRef();
  const popupCloseButton = useRef();
  const popupContent = useRef();

  // When close button on popup is clicked
  const handleClosePopup = () => {
    if (!popupOverlay || !popupCloseButton.current) return;
    popupOverlay.setPosition(undefined);
    setCoords(null);
    popupCloseButton.current.blur();
  };

  // Click outside icon - adding location tab
  const handleClickOutsideFeatureWhileAdding = (e) => {
    popupOverlay.setPosition(e.coordinate);
    popupContent.current.innerHTML = "New Location";
    setCoords({ lon: e.coordinate[0], lat: e.coordinate[1] });
  };

  // Click inside icon - adding location tab
  const handleClickOnFeatureWhileAdding = (e, feature) => {
    popupOverlay.setPosition(e.coordinate);
    popupContent.current.innerHTML = feature.get("name");
    if (editedLocation) setCoords(editedLocation.coordinates);
  };

  // Click inside icon - appending location tab
  const handleClickOnFeatureWhileAppending = (e, feature) => {
    popupOverlay.setPosition(e.coordinate);
    popupContent.current.innerHTML = feature.get("name");

    setSelectedId(feature.get("id"));
    setSelectedName(feature.get("name"));
    setSelectedCoords(feature.get("coordinates"));
  };

  // Handle click on map event
  const handleClickOnMap = (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);

    // When we are adding route to new location
    if (activeTab === tabs[0]) {
      if (!feature) handleClickOutsideFeatureWhileAdding(e);
      else handleClickOnFeatureWhileAdding(e, feature);
    }
    // When we are appending route to existing location
    else {
      if (!feature) return;
      else handleClickOnFeatureWhileAppending(e, feature);
    }
  };

  // Create overlay
  useEffect(() => {
    const overlay = new Overlay({
      element: popupContainer.current,
      //   positioning: "bottom-center",
      autoPan: {
        animation: {
          duration: 300,
        },
      },
    });

    setPopupOverlay(overlay);
  }, []);

  // Add overlay to map, create event listeners
  useEffect(() => {
    if (!map || !popupOverlay) return;

    map.addOverlay(popupOverlay);
    map.addEventListener("click", handleClickOnMap);
    map.addEventListener("movestart", handleClosePopup);

    return () => {
      if (map) {
        handleClosePopup();
        map.removeOverlay(popupOverlay);
        map.removeEventListener("click", handleClickOnMap);
        map.removeEventListener("movestart", handleClosePopup);
      }
    };
  }, [map, popupOverlay, activeTab]);

  return (
    <PopupContainer ref={popupContainer}>
      <button type="button" ref={popupCloseButton} onClick={handleClosePopup}>
        X
      </button>
      <div ref={popupContent} />
      {/* Choose existing location button - only while appending */}
      {activeTab !== tabs[0] && (
        <ButtonStyled
          onClick={() => {
            handleExistingLocationChoice(
              selectedId,
              selectedName,
              selectedCoords
            );
          }}
          type="button"
        >
          Choose
        </ButtonStyled>
      )}
    </PopupContainer>
  );
};

export default LocationsOverlay;
