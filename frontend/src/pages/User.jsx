import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Follow from "../components/Follow";
import {
  Container,
  FlexContainer,
  H1Styled,
  UpperFirstLetter,
} from "../constans/GlobalStyles";
import { UserStyled } from "./Pages.styled";
import PrivateContent from "../helpers/PrivateContent";
import AuthorContent from "../helpers/AuthorContent";
import FollowedUsers from "../components/FollowedUsers";
import ActiveTabBar from "../components/ActiveTabBar";
import HeroImage from "../components/HeroImage";
import Climber from "../assets/climber2.jpg";
import UserInfoCounter from "../components/UserInfoCounter";
import { getContent } from "../helpers/Utils.helpers";
import UsersContent from "../components/UsersContent";

const LIKED_TABS = ["Liked routes", "Liked walls", "Liked locations"];
const AUTHOR_TABS = ["Created routes", "Created walls", "Created locations"];

const User = () => {
  const [activeLikedTab, setActiveLikedTab] = useState(LIKED_TABS[0]);
  const [activeAuthorTab, setActiveAuthorTab] = useState(AUTHOR_TABS[0]);
  const [userData, setUserData] = useState(null);

  const { userId } = useParams();

  const handleGetUserData = async (id) => {
    const user = await getContent("user", id);

    if (user) {
      setUserData(user);
    }
  };

  useEffect(() => {
    if (userId) handleGetUserData(+userId);
  }, [userId]);

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
      <HeroImage image={Climber} text={"Climber's page"} />
      <Container>
        <FlexContainer margin="0.5rem" gap="1rem">
          <H1Styled mb="0">
            <UpperFirstLetter>{username}</UpperFirstLetter>
          </H1Styled>

          <PrivateContent>
            <Follow id={id} />
          </PrivateContent>
        </FlexContainer>

        <UserInfoCounter data={userData} />

        <PrivateContent>
          <ActiveTabBar
            tabs={AUTHOR_TABS}
            activeTab={activeAuthorTab}
            setActiveTab={setActiveAuthorTab}
          />
          {activeAuthorTab === AUTHOR_TABS[0] && (
            <UsersContent data={route_author} content={"routes"} />
          )}
          {activeAuthorTab === AUTHOR_TABS[1] && (
            <UsersContent data={wall_author} content={"walls"} />
          )}
          {activeAuthorTab === AUTHOR_TABS[2] && (
            <UsersContent data={location_author} content={"locations"} />
          )}
        </PrivateContent>

        <AuthorContent authorId={id}>
          <ActiveTabBar
            tabs={LIKED_TABS}
            activeTab={activeLikedTab}
            setActiveTab={setActiveLikedTab}
          />
          {activeLikedTab === LIKED_TABS[0] && (
            <UsersContent data={liked_routes} content={"routes"} />
          )}
          {activeLikedTab === LIKED_TABS[1] && (
            <UsersContent data={liked_walls} content={"walls"} />
          )}
          {activeLikedTab === LIKED_TABS[2] && (
            <UsersContent data={liked_locations} content={"locations"} />
          )}

          <FollowedUsers id={id} />
        </AuthorContent>
      </Container>
    </UserStyled>
  );
};

export default User;
