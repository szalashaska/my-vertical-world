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
import User from "./pages/User";
import { MessageProvider } from "./contexts/MessageContext";
import EditRoute from "./pages/EditRoute";
import EditWall from "./pages/EditWall";
import EditLocation from "./pages/EditLocation";
import News from "./pages/News";
import ClimbingRoutes from "./pages/ClimbingRoutes";
import Locations from "./pages/Locations";
import Walls from "./pages/Walls";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <MessageProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />

            {/* ----Route paths---- */}
            <Route path="/routes" element={<ClimbingRoutes />} />
            <Route path="/routes/:routeId" element={<ClimbingRoute />} />
            <Route
              path="/routes/:routeId/edit"
              element={
                <PrivateRoute>
                  <EditRoute />
                </PrivateRoute>
              }
            />

            {/* ----Wall paths---- */}
            <Route path="/walls" element={<Walls />} />
            <Route path="/walls/:wallId" element={<Wall />} />
            <Route
              path="/walls/:wallId/edit"
              element={
                <PrivateRoute>
                  <EditWall />
                </PrivateRoute>
              }
            />

            {/* ----Location paths---- */}
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:locationId/" element={<Location />} />
            <Route
              path="/locations/:locationId/edit"
              element={
                <PrivateRoute>
                  <EditLocation />
                </PrivateRoute>
              }
            />

            {/* ----User paths---- */}
            <Route path="/user/:userId" element={<User />} />
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
          <Footer />
        </AuthProvider>
      </MessageProvider>
    </Router>
  );
};

export default App;
