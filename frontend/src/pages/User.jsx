import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Follow from "../components/Follow";
import { Container, H3Styled, PStyled } from "../constans/GlobalStyles";
import { UserStyled } from "./Pages.styled";
import PrivateContent from "../helpers/PrivateContent";
import AuthorContent from "../helpers/AuthorContent";
import FollowedUsers from "../components/FollowedUsers";
import ActiveTabBar from "../components/ActiveTabBar";

const LIKED_TABS = ["Liked routes", "Liked locations", "Liked walls"];
const AUTHOR_TABS = ["Your routes", "Your locations", "Your walls"];

const User = () => {
  const [activeLikedTab, setActiveLikedTab] = useState(LIKED_TABS[0]);
  const [activeAuthorTab, setActiveAuthorTab] = useState(AUTHOR_TABS[0]);
  const [userData, setUserData] = useState(null);

  const { userId } = useParams();

  const handleGetUserData = async (id) => {
    try {
      const response = await fetch(`/api/user/${id}`);
      const data = await response.json();

      if (response.status === 200) {
        setUserData(data);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (userId) handleGetUserData(+userId);
  }, []);

  if (!userData) {
    return <UserStyled> No user </UserStyled>;
  }

  const {
    id,
    liked_locations,
    liked_routes,
    liked_walls,
    location_author,
    wall_author,
    route_author,
    username,
  } = userData;

  return (
    <UserStyled>
      <Container>
        <H3Styled>{username}</H3Styled>
        <PStyled>Liked:</PStyled>
        <PStyled>Routes {liked_routes.length}</PStyled>
        <PStyled>Walls {liked_walls.length}</PStyled>
        <PStyled>Locations {liked_locations.length}</PStyled>

        <PStyled>Author of:</PStyled>
        <PStyled>Routes {route_author.length}</PStyled>
        <PStyled>Walls {wall_author.length}</PStyled>
        <PStyled>Locations {location_author.length}</PStyled>

        <PrivateContent>
          <Follow id={id} />
          <ActiveTabBar
            tabs={AUTHOR_TABS}
            activeTab={activeAuthorTab}
            setActiveTab={setActiveAuthorTab}
          />
          {activeAuthorTab === AUTHOR_TABS[0] && <h1>Routes</h1>}
          {activeAuthorTab === AUTHOR_TABS[1] && <h1>Walls</h1>}
          {activeAuthorTab === AUTHOR_TABS[2] && <h1>Locations</h1>}
        </PrivateContent>

        <AuthorContent authorId={id}>
          <FollowedUsers id={id} />
          <ActiveTabBar
            tabs={LIKED_TABS}
            activeTab={activeLikedTab}
            setActiveTab={setActiveLikedTab}
          />
          {activeLikedTab === LIKED_TABS[0] && <h1>Routes</h1>}
          {activeLikedTab === LIKED_TABS[1] && <h1>Walls</h1>}
          {activeLikedTab === LIKED_TABS[2] && <h1>Locations</h1>}
        </AuthorContent>
      </Container>
    </UserStyled>
  );
};

export default User;
