import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

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
    <div>
      <ul>
        {followed_users.length > 0 &&
          followed_users.map((user) => <li key={user.id}>{user.username}</li>)}
      </ul>
    </div>
  );
};

export default FollowedUsers;
