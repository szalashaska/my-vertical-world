import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // Authorization token name in local storage.
  const tokensName = "authTokens";
  const tokensItem = localStorage.getItem(tokensName);
  // Check if there is existing token in local storage; parse() opposite to stringify.
  const [authenticationTokens, setAuthenticationTokens] = useState(
    () => tokensItem && JSON.parse(tokensItem)
  );
  const [user, setUser] = useState(() => tokensItem && jwt_decode(tokensItem));
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [unableToLogin, setUnableToLogin] = useState(null);
  const navigate = useNavigate();

  // Set interval for updating token before expiry date (for protected content).
  useEffect(() => {
    if (authenticationTokens) {
      // Calculate how long token would be valid
      const expiryTime = dayjs.unix(user.exp).diff(dayjs());
      // Set interval for updating, leve 5 seconds for delay
      const updateInterval = expiryTime - 5000;

      let interval = setInterval(() => {
        updateTokens();
      }, updateInterval);
      return () => clearInterval(interval);
    }
  }, [authenticationTokens]);

  // Update token every time page is loaded for the first time.
  useEffect(() => {
    updateTokens();
  }, []);

  // Login user and save authorization token.
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
      // Save tokens and username as state.
      setAuthenticationTokens(data);
      setUser(jwt_decode(data.access));

      // Save token in local storage; data can only be stored as a string.
      const tokensData = JSON.stringify(data);
      localStorage.setItem(tokensName, tokensData);

      // Navigate user to the homepage
      navigate("/");
    } else if (response.status === 401) {
      // No active account found with the given credentials.
      setUnableToLogin("No active account found with the given credentials.");
    } else {
      console.log(response.status, data);
      setUnableToLogin("Something went wrong, try again later.");
    }
  };

  // Logout user.
  const logoutUser = () => {
    setAuthenticationTokens(null);
    setUser(null);
    localStorage.removeItem(tokensName);
    navigate("/");
  };

  // Update token only if user is signed in. Change loading state after done updating.
  const updateTokens = async () => {
    if (!authenticationTokens) {
      setPageIsLoading(false);
      return;
    }
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

    if (pageIsLoading) {
      setPageIsLoading(false);
    }
  };

  // Data provided by Authorization context.
  let providedData = {
    authenticationTokens,
    user,
    unableToLogin,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={providedData}>
      {/* show content after done updating token. */}
      {!pageIsLoading && children}
    </AuthContext.Provider>
  );
};
