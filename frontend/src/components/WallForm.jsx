import React, { useContext, useEffect, useState } from "react";
import ActiveTabBar from "./ActiveTabBar";
import FormInput from "../components/FormInput";

import {
  ButtonStyled,
  FlexContainer,
  H2Styled,
  UpperFirstLetter,
} from "../constans/GlobalStyles";
import MessageContext from "../contexts/MessageContext";

const WallForm = ({
  existingLocationId,
  wallName,
  setWallImage,
  setWallName,
  setExistingWallData,
  edit,
}) => {
  const addingTabName = "Add new wall";
  const addAndAppendTabsName = [addingTabName, "Append to existing wall"];

  const [tabs, setTabs] = useState(null);
  const [activeTab, setActiveTab] = useState(addingTabName);

  const [wallsList, setWallsList] = useState(undefined);
  const [name, setName] = useState(wallName || "");
  const [image, setImage] = useState(edit || null);

  const { setError } = useContext(MessageContext);

  const handleImageUpload = (e) => {
    // Check if image was uploaded
    if (!e.target.files) return;
    // Check image size
    if (e.target.files[0].size > 2048000) {
      return setError("Image size should be less than 2 megabytes.");
    }
    setImage(e.target.files[0]);
  };

  const wallInputs = [
    {
      id: 1,
      name: "wall_name",
      type: "text",
      placeholder: "Wall name...",
      label: "Wall name:",
      required: true,
      value: name,
      onChange: (e) => {
        setName(e.target.value);
        checkUserWallNameInput(e.target.value);
      },
    },
    {
      id: 2,
      accept: "image/jpeg, image/png, image/jpg",
      hint: edit ? "" : "Image should be less than 2 megabytes.",
      name: "wall_image",
      type: edit ? "hidden" : "file",
      placeholder: "Wall image...",
      label: edit ? "" : "Wall image:",
      required: true,
      onChange: handleImageUpload,
    },
  ];

  const handleGetWallsList = async (locationId) => {
    const endpoint = `/api/locations/${locationId}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (response.status === 200) {
        setWallsList(data.walls);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const checkUserWallNameInput = () => {
    if (!wallsList || wallsList.length === 0) return true;

    const wall = name.trim().toLowerCase();
    const match = wallsList.find((item) => item.name === wall);
    if (!match) return true;

    // While editing, allow the orginal edited name
    if (edit && match.name === wallName) return true;

    setError("Wall name already exist.");
    return false;
  };

  const handleExistingWallChoice = (id, name, image, height, width) => {
    setWallName(name);
    setWallImage(image);
    setExistingWallData({ id, height, width });
  };

  const handleWallForm = (e) => {
    e.preventDefault();

    if (checkUserWallNameInput()) {
      setWallName(name);
      setWallImage(image);
    }
  };

  useEffect(() => {
    if (existingLocationId) {
      // Activete switching tabs, if we are not editig
      if (!edit) setTabs(addAndAppendTabsName);

      // Get wall list to check users input
      handleGetWallsList(existingLocationId);
    }
  }, [existingLocationId]);

  return (
    <>
      {tabs && (
        <ActiveTabBar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {activeTab === addingTabName && (
        <>
          <form onSubmit={handleWallForm}>
            {wallInputs.map((input) => (
              <FormInput key={input.id} {...input} />
            ))}

            <ButtonStyled type="submit" disabled={!name || !image}>
              {edit ? "Edit wall" : "Add wall"}
            </ButtonStyled>
          </form>
        </>
      )}

      {activeTab === addAndAppendTabsName[1] && (
        <>
          {wallsList && wallsList.length > 0 && (
            <>
              <H2Styled align="center">Existing walls: </H2Styled>
              <FlexContainer justify="flex-start">
                {wallsList.map((item) => (
                  <ButtonStyled
                    key={item.id}
                    type="button"
                    onClick={() => {
                      handleExistingWallChoice(
                        item.id,
                        item.name,
                        item.image,
                        item.image_height,
                        item.image_width
                      );
                    }}
                  >
                    <UpperFirstLetter>{item.name}</UpperFirstLetter>
                  </ButtonStyled>
                ))}
              </FlexContainer>
            </>
          )}
        </>
      )}
    </>
  );
};

export default WallForm;
