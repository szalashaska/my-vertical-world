import React, { useContext, useRef, useEffect, useState } from "react";
import MapContext from "../contexts/MapContext";
import Overlay from "ol/Overlay";
import { toLonLat } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";

const Popup = () => {
  const { map } = useContext(MapContext);
  const popupContainer = useRef();
  const popupClose = useRef();
  const popupContent = useRef();

  const [popupOverlay, setPopupOverlay] = useState(null);

  const handleCloseButtonClick = () => {
    if (!popupOverlay || !popupClose) return;
    popupOverlay.setPosition(undefined);
    popupClose.current.blur();
  };

  const handleRenderPopup = (e) => {
    const feature = map.forEachFeatureAtPixel(e.pixel, (feature) => feature);
    if (!feature) return;

    popupOverlay.setPosition(e.coordinate);
    popupContent.current.innerHTML = feature.get("name");
  };

  useEffect(() => {
    const overlay = new Overlay({
      element: popupContainer.current,
      //   positioning: "bottom-center",
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    setPopupOverlay(overlay);
  }, []);

  useEffect(() => {
    if (!map || !popupOverlay) return;

    map.addOverlay(popupOverlay);
    map.on("click", handleRenderPopup);

    return () => {
      if (map) map.removeOverlay(popupOverlay);
    };
  }, [map, popupOverlay]);

  return (
    <div ref={popupContainer}>
      <button type="button" ref={popupClose} onClick={handleCloseButtonClick}>
        X
      </button>
      <div ref={popupContent} />
    </div>
  );
};

export default Popup;
