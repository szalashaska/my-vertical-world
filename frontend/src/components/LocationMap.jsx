import React, { useState, useEffect, useContext } from "react";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorSource } from "ol/source";
import Map from "./Map";
import VectorLayer from "./VectorLayer";
import LocationsOverlay from "./LocationsOverlay";
import SingleLocationOverlay from "./SingleLocationOverlay";

const LocationMap = ({ center, zoom, data, single }) => {
  const [vectorData, setVectorData] = useState(null);

  let geojsonObject = {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "EPSG:3857",
      },
    },
    features: [],
  };

  const prepareVectorData = (data) => {
    // Populate geojson object
    data.forEach((location) =>
      geojsonObject.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [location.coordinates.lon, location.coordinates.lat],
        },
        properties: {
          name: location.name,
          id: location.id,
          coordinates: location.coordinates,
        },
      })
    );

    // Convert to vector source
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject),
    });

    setVectorData(vectorSource);
  };

  useEffect(() => {
    if (data) prepareVectorData(data);
  }, []);

  return (
    <Map center={center} zoom={zoom}>
      {vectorData && <VectorLayer source={vectorData} />}
      {single ? <SingleLocationOverlay /> : <LocationsOverlay />}
    </Map>
  );
};

export default LocationMap;
