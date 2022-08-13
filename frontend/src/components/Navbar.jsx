import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import {
  NavbarStyled,
  NavbarUsername,
  NavbarList,
  NavbarListItem,
  NavbarLogOut,
} from "./styled/Navbar.styled";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <NavbarStyled>
      <Link to="/">My Vertical World </Link>

      <NavbarList>
        <NavbarListItem>
          <Link to="/">Home</Link>
        </NavbarListItem>

        {user ? (
          <>
            <NavbarListItem>
              <Link to="/add-route">Add route</Link>
            </NavbarListItem>
            <NavbarListItem onClick={logoutUser}>
              <NavbarLogOut>Log out</NavbarLogOut>
            </NavbarListItem>

            <NavbarListItem>
              <Link to="/">
                Hello <NavbarUsername>{user.username}</NavbarUsername>
              </Link>
            </NavbarListItem>
          </>
        ) : (
          <NavbarListItem>
            <Link to="/sign-up">Sign in</Link>
          </NavbarListItem>
        )}
      </NavbarList>
    </NavbarStyled>
  );
};

export default Navbar;
