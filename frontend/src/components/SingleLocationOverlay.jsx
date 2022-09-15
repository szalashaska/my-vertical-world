import React, { useContext, useRef, useEffect, useState } from "react";
import MapContext from "../contexts/MapContext";
import Overlay from "ol/Overlay";
import { PopupContainer } from "./styled/LocationOverlay.styled";

const SingleLocationOverlay = () => {
  const { map } = useContext(MapContext);
  const [popupOverlay, setPopupOverlay] = useState(null);

  const popupContainer = useRef();
  const popupCloseButton = useRef();
  const popupContent = useRef();

  const handleClosePopup = () => {
    if (!popupOverlay || !popupCloseButton.current) return;
    popupOverlay.setPosition(undefined);
    popupCloseButton.current.blur();
  };

  const handleClickOnFeatureWhileAppending = (e, feature) => {
    popupOverlay.setPosition(e.coordinate);
    popupContent.current.innerHTML = feature.get("name");
  };

  const handleClickOnMap = (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);

    if (!feature) return;
    else handleClickOnFeatureWhileAppending(e, feature);
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
  }, [map, popupOverlay]);

  return (
    <PopupContainer ref={popupContainer}>
      <button type="button" ref={popupCloseButton} onClick={handleClosePopup}>
        X
      </button>
      <div ref={popupContent} />
    </PopupContainer>
  );
};

export default SingleLocationOverlay;
