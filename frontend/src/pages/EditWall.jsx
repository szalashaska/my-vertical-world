import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Edit from "../components/Edit";
import WallForm from "../components/WallForm";
import { Container, PStyled } from "../constans/GlobalStyles";

const EditWall = () => {
  const locationHook = useLocation();
  const { wallData } = locationHook.state;

  const [wallName, setWallName] = useState("");
  // const [wallImage, setWallImage] = useState(null);

  if (!wallData) return null;

  const { id, name, location } = wallData;

  return (
    <Container>
      <Edit
        id={id}
        state={wallName}
        data={{
          name: wallName,
        }}
        content={"walls"}
      />
      <PStyled align="center" mb="1.5rem">
        Edit wall name.
      </PStyled>
      <WallForm
        wallName={name}
        existingLocationId={location.id}
        setWallName={setWallName}
        setWallImage={() => {}}
        setExistingWallDimensions={() => {}}
        edit
      />
    </Container>
  );
};

export default EditWall;
