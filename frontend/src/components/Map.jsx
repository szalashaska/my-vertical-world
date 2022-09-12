import React, { useRef, useState, useEffect } from "react";
import MapContext from "../contexts/MapContext";
import { Map as LayerMap, View } from "ol";
import OLTileLayer from "ol/layer/Tile";
import styled from "styled-components";
import { OSM } from "ol/source";

const MapContainer = styled.div`
  min-width: 600px;
  min-height: 500px;
  height: 500px;
  width: 100%;
`;

const Map = ({ children, zoom, center }) => {
  const [map, setMap] = useState(null);
  const mapRef = useRef();

  // Create map object
  useEffect(() => {
    let options = {
      view: new View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };
    let mapObject = new LayerMap(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => {
      mapObject.setTarget(undefined);
    };
  }, []);

  // Add default map layer
  useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({ source: new OSM(), zIndex: 0 });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(0);

    return () => {
      if (map) map.removeLayer(tileLayer);
    };
  }, [map]);

  // Handle map zoom
  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
  }, [zoom]);

  // Handle center to coordscenter
  useEffect(() => {
    if (!map) return;

    map.getView().setCenter(center);
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <MapContainer ref={mapRef}>{children}</MapContainer>
    </MapContext.Provider>
  );
};

export default Map;
