import { toLonLat } from "ol/proj";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LocationMap from "../components/LocationMap";
import { H2Styled } from "../constans/GlobalStyles";
import { LocationStyled } from "./Pages.styled";

const Location = () => {
  const [locationData, setLocationData] = useState(null);
  const [locationCoordinates, setLocationCoordinates] = useState(null);
  const { locationId } = useParams();

  const handleGetLocationData = async (id) => {
    try {
      const response = await fetch(`/api/locations/${id}`);
      const data = await response.json();

      if (response.status === 200) {
        setLocationData(data);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (locationId) {
      handleGetLocationData(+locationId);
    }
  }, []);

  useEffect(() => {
    if (locationData) {
      const coords = toLonLat([
        locationData.coordinates.lon,
        locationData.coordinates.lat,
      ]);
      setLocationCoordinates({
        x: coords[0].toFixed(4),
        y: coords[1].toFixed(4),
      });
    }
  }, [locationData]);

  if (!locationData) {
    return <LocationStyled> No location </LocationStyled>;
  }

  const { name } = locationData;

  return (
    <LocationStyled>
      <H2Styled>{name}</H2Styled>
      {locationCoordinates && (
        <H2Styled>
          Coordinates:
          <p> {locationCoordinates.y} </p>
          <p> {locationCoordinates.x} </p>
        </H2Styled>
      )}
      <H2Styled>Location walls: number</H2Styled>
      <H2Styled>Location routes: number</H2Styled>
      <LocationMap
        zoom={9}
        center={[locationData.coordinates.lon, locationData.coordinates.lat]}
        data={[locationData]}
        single
      />
    </LocationStyled>
  );
};

export default Location;
