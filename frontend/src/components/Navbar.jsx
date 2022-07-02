import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="navbar-container">
      <div className="nav__logo">
        <Link to="/">My Vertical World </Link>
      </div>

      <ul className="navbar__menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-route">Add route</Link>
        </li>
        {user ? (
          <>
            <li>
              <p>Logged user: {user.username}</p>
            </li>
            <li>
              <p onClick={logoutUser}>Log out</p>
            </li>
          </>
        ) : (
          <li>
            <Link to="/sign-up">Sign up</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
