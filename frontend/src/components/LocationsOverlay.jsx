import React, { useContext, useRef, useEffect, useState } from "react";
import MapContext from "../contexts/MapContext";
import Overlay from "ol/Overlay";
import LocationContext from "../contexts/LocationContext";
import { ButtonStyled } from "../constans/GlobalStyles";
import { PopupContainer } from "./styled/LocationOverlay.styled";

const LocationsOverlay = () => {
  const { map } = useContext(MapContext);
  const { addLocationTab, handleExistingLocationChoice } =
    useContext(LocationContext);

  const { setLocationCoords } = useContext(LocationContext);
  const [popupOverlay, setPopupOverlay] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedCoords, setSelectedCoords] = useState(null);

  const popupContainer = useRef();
  const popupCloseButton = useRef();
  const popupContent = useRef();

  const handleClosePopup = () => {
    if (!popupOverlay || !popupCloseButton.current) return;
    popupOverlay.setPosition(undefined);
    popupCloseButton.current.blur();
  };

  const handleClickOutsideFeatureWhileAdding = (e) => {
    popupOverlay.setPosition(e.coordinate);
    popupContent.current.innerHTML = "New Location";
    setLocationCoords({ lon: e.coordinate[0], lat: e.coordinate[1] });
  };

  const handleClickOnFeatureWhileAdding = (e, feature) => {
    popupOverlay.setPosition(e.coordinate);
    popupContent.current.innerHTML = feature.get("name");
  };

  const handleClickOnFeatureWhileAppending = (e, feature) => {
    popupOverlay.setPosition(e.coordinate);
    popupContent.current.innerHTML = feature.get("name");

    setSelectedId(feature.get("id"));
    setSelectedName(feature.get("name"));
    setSelectedCoords(feature.get("coordinates"));
  };

  const handleClickOnMap = (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);

    // When we are adding route to new location
    if (addLocationTab) {
      if (!feature) handleClickOutsideFeatureWhileAdding(e);
      else handleClickOnFeatureWhileAdding(e, feature);
    }
    // When we are appending route to existing location
    else {
      if (!feature) return;
      else handleClickOnFeatureWhileAppending(e, feature);
    }
  };

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
  }, [map, popupOverlay, addLocationTab]);

  return (
    <PopupContainer ref={popupContainer}>
      <button type="button" ref={popupCloseButton} onClick={handleClosePopup}>
        X
      </button>
      <div ref={popupContent} />
      {!addLocationTab && (
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
