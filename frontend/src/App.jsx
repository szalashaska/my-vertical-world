import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import AddRoute from "./pages/AddRoute";

import PrivateRoute from "./helpers/PrivateRoute";
import GlobalStyles from "./constans/GlobalStyles";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/add-route"
            element={
              <PrivateRoute>
                <AddRoute />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
