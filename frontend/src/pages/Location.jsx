import React, { useCallback, useEffect, useState } from "react";
import { toLonLat } from "ol/proj";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Delete from "../components/Delete";
import Like from "../components/Like";
import LocationMap from "../components/LocationMap";
import { H2Styled, PStyled } from "../constans/GlobalStyles";
import AuthorContent from "../helpers/AuthorContent";
import { getContent } from "../helpers/Utils.helpers";
import { LocationStyled } from "./Pages.styled";

const Location = () => {
  const [locationData, setLocationData] = useState(null);
  const [locationCoordinates, setLocationCoordinates] = useState(null);
  const { locationId } = useParams();

  const handleGetLocationData = useCallback(async (id) => {
    const location = await getContent("locations", id);
    if (location) {
      setLocationData(location);
    }
  }, []);

  useEffect(() => {
    if (locationId) {
      handleGetLocationData(+locationId);
    }
  }, [handleGetLocationData]);

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

  const { id, author, name, likes, routes, walls, comments } = locationData;

  return (
    <LocationStyled>
      <H2Styled>{name}</H2Styled>

      <AuthorContent authorId={author.id}>
        <Delete
          id={id}
          currentLikes={likes}
          content={"locations"}
          children={walls.length}
        />
        <Link to={"edit"} state={{ locationData }}>
          Edit
        </Link>
      </AuthorContent>

      {locationCoordinates && (
        <H2Styled>
          Coordinates:
          <PStyled> {locationCoordinates.y} </PStyled>
          <PStyled> {locationCoordinates.x} </PStyled>
        </H2Styled>
      )}

      <H2Styled>Location walls:</H2Styled>
      <ul>
        {walls.map((wall) => (
          <li key={wall.id}>{wall.name}</li>
        ))}
      </ul>

      <H2Styled>Location routes:</H2Styled>
      <ul>
        {routes.map((route) => (
          <li key={route.id}>{route.name}</li>
        ))}
      </ul>

      <Like id={id} currentLikes={likes} content={"locations"} />
      <Comment id={id} currentComments={comments} content={"locations"} />

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
