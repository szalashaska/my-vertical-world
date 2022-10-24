import React, { useState, useEffect, useContext } from "react";
import {
  ButtonStyled,
  LinkStyled,
  PStyled,
  UpperFirstLetter,
} from "../constans/GlobalStyles";
import AuthContext from "../contexts/AuthContext";
import { UserContentWrapper } from "./UsersContent";

const FollowedUsers = ({ id }) => {
  const [userData, setUserData] = useState(null);
  const { authTokens } = useContext(AuthContext);

  const getFollowedUsers = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${String(authTokens.access)}`,
      },
    };
    const endpoint = `/api/user/${id}/get-followers`;

    try {
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setUserData(data);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  useEffect(() => {
    if (authTokens) getFollowedUsers();
  }, []);

  if (!userData) return null;

  const { followed_users } = userData;

  return (
    <>
      <ButtonStyled as="div" primary>
        Followed users
      </ButtonStyled>
      <UserContentWrapper>
        {followed_users.length > 0 ? (
          followed_users.map((user) => (
            <ButtonStyled as={LinkStyled} key={user.id} to={`/user/${user.id}`}>
              <UpperFirstLetter>{user.username}</UpperFirstLetter>
            </ButtonStyled>
          ))
        ) : (
          <PStyled align="center">Currently no one is followed</PStyled>
        )}
      </UserContentWrapper>
    </>
  );
};

export default FollowedUsers;
