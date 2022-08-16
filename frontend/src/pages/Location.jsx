import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LocationStyled } from "./Pages.styled";

const Location = () => {
  const [locationData, setLocationData] = useState(null);
  const { locationId } = useParams();

  const handleGetLocationData = async (id) => {
    try {
      const response = await fetch(`/api/locations/${id}`);
      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
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

  if (!locationData) {
    return <LocationStyled> No location </LocationStyled>;
  }

  const { name } = locationData;

  return <LocationStyled>Location name: {name}</LocationStyled>;
};

export default Location;
