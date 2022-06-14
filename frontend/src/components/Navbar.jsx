import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
          <Link to="/login">Sign up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
