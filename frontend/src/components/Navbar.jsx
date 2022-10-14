import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import navbarList from "../constans/NavbarList";
import AuthContext from "../contexts/AuthContext";
import {
  NavbarStyled,
  NavbarDropdown,
  NavbarList,
  NavbarItem,
  NavbarSubitem,
  NavbarLogOut,
} from "./styled/Navbar.styled";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <NavbarStyled>
      <Link to="/">My Vertical World </Link>

      <NavbarList>
        {navbarList.map((item) => {
          // Do not show navigation item that are private (for logged user only)
          if (!user && item.private) return;

          // Dropdown manu items
          if (item.dropdown) {
            return (
              <NavbarItem
                key={item.id}
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
              >
                <Link to={item.path}>{item.title}</Link>
                <NavbarDropdown
                  onClick={() => setDropdown(false)}
                  dropdown={dropdown}
                >
                  {item.dropdown.map((subitem) => (
                    <NavbarSubitem key={subitem.id}>
                      <Link to={subitem.path}>{subitem.title}</Link>
                    </NavbarSubitem>
                  ))}
                </NavbarDropdown>
              </NavbarItem>
            );
          }
          // Normal item
          return (
            <NavbarItem key={item.id}>
              <Link to={item.path}>{item.title}</Link>
            </NavbarItem>
          );
        })}
        <NavbarItem>
          {user ? (
            <NavbarLogOut onClick={logoutUser}>Log out</NavbarLogOut>
          ) : (
            <Link to="/sign-up">Sign in</Link>
          )}
        </NavbarItem>
      </NavbarList>
    </NavbarStyled>
  );
};

export default Navbar;

{
  /* <NavbarList>
<NavbarItem>
  <Link to="/">Home</Link>
</NavbarItem>

{user ? (
  <>
    <NavbarItem>
      <Link to="/add-route">Add route</Link>
    </NavbarItem>
    <NavbarItem>
      <Link to="/news">News</Link>
    </NavbarItem>

    <NavbarItem onClick={logoutUser}>
      <NavbarLogOut>Log out</NavbarLogOut>
    </NavbarItem>

    <NavbarItem>
      <Link to="/">
        Hello <NavbarUsername>{user.username}</NavbarUsername>
      </Link>
    </NavbarItem>
  </>
) : (
  <NavbarItem>
    <Link to="/sign-up">Sign in</Link>
  </NavbarItem>
)}
</NavbarList> */
}
