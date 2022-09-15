import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Follow from "../components/Follow";
import { H3Styled, PStyled } from "../constans/GlobalStyles";
import { UserStyled } from "./Pages.styled";
import PrivateContent from "../helpers/PrivateContent";
import AuthorContent from "../helpers/AuthorContent";
import FollowedUsers from "../components/FollowedUsers";

const User = () => {
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();

  const handleGetUserData = async (id) => {
    try {
      const response = await fetch(`/api/user/${id}`);
      const data = await response.json();

      if (response.status === 200) {
        setUserData(data);
        // console.log(data);
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
    location_creator,
    wall_creator,
    route_author,
    username,
  } = userData;

  return (
    <UserStyled>
      <H3Styled>{username}</H3Styled>

      <PrivateContent>
        <Follow id={id} />
      </PrivateContent>
      <AuthorContent authorId={id}>
        <PStyled>Followed users:</PStyled>
        <FollowedUsers id={id} />
      </AuthorContent>
    </UserStyled>
  );
};

export default User;
