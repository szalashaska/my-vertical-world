import React, { useCallback, useEffect, useState } from "react";
import LocationMap from "../components/LocationMap";

import { getContent } from "../helpers/Utils.helpers";
import { LocationStyled } from "./Pages.styled";

const Locations = () => {
  const [locationsData, setLocationsData] = useState(null);

  const handleGetLocations = useCallback(async () => {
    const locations = await getContent("locations");
    if (locations) {
      setLocationsData(locations);
    }
  }, []);

  useEffect(() => {
    handleGetLocations();
  }, [handleGetLocations]);

  if (!locationsData) {
    return <div>No location to show...</div>;
  }

  return (
    <LocationStyled>
      <LocationMap
        zoom={3}
        center={[2078486, 6686398]}
        data={locationsData}
        single
      />
    </LocationStyled>
  );
};

export default Locations;
