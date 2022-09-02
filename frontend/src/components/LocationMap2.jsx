import React, { useState, useRef } from "react";
import { Circle as CircleStyle, Stroke, Style, Icon } from "ol/style";

import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorSource } from "ol/source";

import VectorLayer from "./VectorLayer";
import Map from "./Map";
import pin from "../assets/pin.png";
import Popup from "./Popup";

const iconScale = 0.15;

let styles = {
  Point: new Style({
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: "red",
        width: 2,
      }),
    }),
  }),
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

const geojsonObject = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "EPSG:3857",
    },
  },
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: fromLonLat([-94.9065, 38.9884]),
      },
      properties: { name: "Uga", url: "olaboga" },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [1e6, 6e6],
      },
      properties: { name: "Buga", url: "/" },
    },
  ],
};

const LocationMap2 = () => {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(2);

  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(geojsonObject),
  });

  return (
    <Map center={fromLonLat(center)} zoom={zoom}>
      <VectorLayer source={vectorSource} style={styles.Icon} />
      <Popup />
    </Map>
  );
};

export default LocationMap2;
