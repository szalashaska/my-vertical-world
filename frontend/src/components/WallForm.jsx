import React, { useEffect, useState } from "react";
import ActiveTabBar from "./ActiveTabBar";
import FormInput from "../components/FormInput";

import { ButtonStyled, H2Styled } from "../constans/GlobalStyles";

const WallForm = ({
  existingLocationId,
  setWallImage,
  setWallName,
  setExistingWallDimensions,
}) => {
  const addTabName = "add";
  const addAndAppendTabsName = [addTabName, "append"];

  const [tabs, setTabs] = useState(null);
  const [activeTab, setActiveTab] = useState(addTabName);

  const [wallsList, setWallsList] = useState(undefined);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

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
      name: "wall_image",
      type: "file",
      placeholder: "Wall image...",
      label: "Wall image:",
      required: true,
      onChange: (e) => e.target.files && setImage(e.target.files[0]),
    },
  ];

  const handleGetWallsList = async (locationId) => {
    const endpoint = `/api/walls?location_id=${locationId}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (response.status === 200) {
        setWallsList(data);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  const checkUserWallNameInput = () => {
    if (!wallsList || wallsList.length === 0) return true;

    const wall = name.trim().toLowerCase();
    const match = wallsList.find((item) => item.name === wall);
    if (match) {
      setName("");
      console.log("name already exist");
      return false;
    }
    return true;
  };

  const handleExistingWallChoice = (name, image, height, width) => {
    setWallName(name);
    setWallImage(image);
    setExistingWallDimensions({ height, width });
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
      // If we appending to existing location, we activate switching tabs and load wall list.
      setTabs(addAndAppendTabsName);
      handleGetWallsList(existingLocationId);
    }
  }, [existingLocationId]);

  return (
    <>
      {tabs && <ActiveTabBar tabs={tabs} setActiveTab={setActiveTab} />}

      {activeTab === addTabName && (
        <>
          <H2Styled>Add new wall:</H2Styled>
          <form onSubmit={handleWallForm}>
            {wallInputs.map((input) => (
              <FormInput key={input.id} {...input} />
            ))}

            <ButtonStyled type="submit" disabled={!name || !image}>
              Add wall
            </ButtonStyled>
          </form>
        </>
      )}

      {activeTab === addAndAppendTabsName[1] && (
        <>
          <H2Styled>Add to existing wall:</H2Styled>
          {wallsList && wallsList.length > 0 && (
            <ul>
              {wallsList.map((item) => (
                <li key={item.id}>
                  {item.name}
                  <button
                    type="button"
                    onClick={() => {
                      handleExistingWallChoice(
                        item.name,
                        item.image,
                        item.image_height,
                        item.image_width
                      );
                    }}
                  >
                    wybierz
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default WallForm;
