import React, { useContext, useEffect } from "react";
import MapContext from "../contexts/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import { Style, Icon } from "ol/style";

import pin from "../assets/pin.png";

// By defaut render pin image
const iconScale = 0.15;

const styles = {
  Icon: new Style({
    image: new Icon({
      anchor: [0.5, 0],
      scale: iconScale,
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: pin,
    }),
  }),
};

const VectorLayer = ({ source, style = styles.Icon, zIndex = 1 }) => {
  const { map } = useContext(MapContext);

  const handleChangeCursorStyle = (e) => {
    const pixel = map.getEventPixel(e.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? "pointer" : "";
  };

  // Create new layer
  useEffect(() => {
    if (!map) return;

    let vectorLayer = new OLVectorLayer({
      source,
      style,
    });

    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    map.addEventListener("pointermove", handleChangeCursorStyle);

    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
        map.removeEventListener("pointermove", handleChangeCursorStyle);
      }
    };
  }, [map]);

  return null;
};

export default VectorLayer;
