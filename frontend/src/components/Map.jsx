import React, { useRef, useState, useEffect } from "react";
import MapContext from "../contexts/MapContext";
import * as ol from "ol";
import OLTileLayer from "ol/layer/Tile";
import styled from "styled-components";
import * as olSource from "ol/source";

const MapContainer = styled.div`
  min-width: 600px;
  min-height: 500px;
  height: 500px;
  width: 100%;
`;

const Map = ({ children, zoom, center }) => {
  const [map, setMap] = useState(null);

  const mapRef = useRef();

  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      constrols: [],
      overlays: [],
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => {
      mapObject.setTarget(undefined);
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({ source: new olSource.OSM(), zIndex: 0 });

    map.addLayer(tileLayer);
    tileLayer.setZIndex(0);

    return () => {
      if (map) map.removeLayer(tileLayer);
    };
  }, [map]);

  // zoom
  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
  }, [zoom]);

  // center
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
