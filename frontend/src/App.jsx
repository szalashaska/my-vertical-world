import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import AddRoute from "./pages/AddRoute";

import PrivateRoute from "./helpers/PrivateRoute";
import GlobalStyles from "./constans/GlobalStyles";
import ClimbingRoute from "./pages/ClimbingRoute";
import Wall from "./pages/Wall";
import Location from "./pages/Location";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/route/:routeId" element={<ClimbingRoute />} />
          <Route path="/wall/:wallId" element={<Wall />} />
          <Route path="/location/:locationId" element={<Location />} />
          <Route path="/sign-up" element={<SignIn />} />
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
