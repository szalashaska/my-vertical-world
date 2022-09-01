import React, { useState } from "react";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";

import Layers from "./Layers";
import TileLayer from "./TileLayer";
import VectorLayer from "./VectorLayer";
import Map from "./Map";
import * as olSource from "ol/source";
import { Vector as VectorSource } from "ol/source";

function osm() {
  return new olSource.OSM();
}

function vector({ features }) {
  return new VectorSource({
    features,
  });
}

let styles = {
  Point: new Style({
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: "magenta",
      }),
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
};

const LocationMap2 = () => {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);

  return (
    <Map center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer source={osm()} zIndex={0} />
      </Layers>
    </Map>
  );
};

export default LocationMap2;
