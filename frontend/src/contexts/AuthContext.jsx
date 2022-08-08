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
  const [authTokens, setAuthTokens] = useState(
    () => tokensItem && JSON.parse(tokensItem)
  );
  const [user, setUser] = useState(() => tokensItem && jwt_decode(tokensItem));
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Set interval for updating token before expiry date (for protected content).
  useEffect(() => {
    if (authTokens) {
      // Calculate how long token would be valid
      const expiryTime = dayjs.unix(user.exp).diff(dayjs());
      // Set interval for updating, leve 5 seconds for delay
      const updateInterval = expiryTime - 5000;

      let interval = setInterval(() => {
        updateTokens();
      }, updateInterval);
      return () => clearInterval(interval);
    }
  }, [authTokens]);

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

    try {
      const response = await fetch("/api/token", requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        // Save tokens and username as state.
        setAuthTokens(data);
        setUser(jwt_decode(data.access));

        // Save token in local storage; data can only be stored as a string.
        const tokensData = JSON.stringify(data);
        localStorage.setItem(tokensName, tokensData);

        // Navigate user to the homepage
        navigate("/");
      } else if (response.status === 401) {
        // No active account found with the given credentials.
        setError("No active account found with the given credentials.");
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  // Logout user.
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem(tokensName);
    navigate("/");
  };

  const registerUser = async (username, password, confirmPassword) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        confirm_password: confirmPassword,
      }),
    };

    try {
      const data = await fetch("/api/register", requestOptions);
      const response = await data.json();

      if (data.status === 201) {
        loginUser(username, password);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.log("Unexpected error", err);
    }
  };

  // Update token only if user is signed in. Change loading state after done updating.
  const updateTokens = async () => {
    if (!authTokens) {
      setPageIsLoading(false);
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refresh: authTokens?.refresh,
      }),
    };

    const response = await fetch("/api/token/refresh", requestOptions);
    const data = await response.json();

    if (response.status === 200) {
      // Refresh tokens and username
      setAuthTokens(data);
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
    authTokens,
    user,
    error,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={providedData}>
      {/* show content after done updating token. */}
      {!pageIsLoading && children}
    </AuthContext.Provider>
  );
};
