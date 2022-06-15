import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

//Provider

export const AuthProvider = ({ children }) => {
  // Authorization token name in local storage
  const tokensName = "authTokens";
  const tokensItem = localStorage.getItem(tokensName);
  const [loading, setLoading] = useState(true);

  // Check if there is existing token in local storage; parse() opposite to stringify
  const [authenticationTokens, setAuthenticationTokens] = useState(
    () => tokensItem && JSON.parse(tokensItem)
  );
  const [user, setUser] = useState(() => tokensItem && jwt_decode(tokensItem));
  const navigate = useNavigate();

  // Login user and saves authorization token
  const loginUser = async (username, password) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const response = await fetch("/api/token", requestOptions);
    const data = await response.json();

    if (response.status === 200) {
      // Save tokens and username as state
      setAuthenticationTokens(data);
      setUser(jwt_decode(data.access));

      // Save token i local storage; data can only be stored as a string
      const tokensData = JSON.stringify(data);
      localStorage.setItem(tokensName, tokensData);

      // Navigate user to the homepage
      navigate("/");
    } else if (response.status === 401) {
      // No active account found with the given credentials
      console.log("Wrong password or user");
    } else {
      console.log(response.status, data);
    }
  };

  // Logout user
  const logoutUser = () => {
    setAuthenticationTokens(null);
    setUser(null);
    localStorage.removeItem(tokensName);
    navigate("/");
  };

  // Update token
  const updateTokens = async () => {
    console.log("updated tokens");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh: authenticationTokens?.refresh,
      }),
    };

    const response = await fetch("/api/token/refresh", requestOptions);
    const data = await response.json();

    if (response.status === 200) {
      // Refresh tokens and username
      setAuthenticationTokens(data);
      setUser(jwt_decode(data.access));
      const tokensData = JSON.stringify(data);
      localStorage.setItem(tokensName, tokensData);
    } else {
      logoutUser();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateTokens();
    }
    // Should be less than backends settings for token lifetime
    const updateInterval = 1000 * 60 * 4.5;
    let interval = setInterval(() => {
      if (authenticationTokens) {
        updateTokens();
      }
    }, updateInterval);
    return () => clearInterval(interval);
  }, [authenticationTokens, loading]);

  // Data provided by Authorization context
  let providedData = {
    authenticationTokens: authenticationTokens,
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={providedData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
