import React, { useContext, useState } from "react";
import navbarList from "../constans/NavbarList";
import AuthContext from "../contexts/AuthContext";
import Logo from "../assets/logo.png";
import {
  NavbarStyled,
  NavbarMaxWidthWrapper,
  NavbarLogo,
  NavbarListWrapper,
  NavbarDropdownList,
  NavbarList,
  NavbarItem,
  NavbarLink,
  NavbarSubLink,
  NavbarSubitem,
  NavbarButton,
  NavbarHamburger,
  NavbarItemWithDropdown,
  NavbarDropdownArrow,
  NavbarSidebarButton,
  NavbarCross,
} from "./styled/Navbar.styled";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <NavbarStyled>
      <NavbarMaxWidthWrapper>
        <Link to="/">
          <NavbarLogo src={Logo} />
        </Link>

        <NavbarSidebarButton
          onClick={() => {
            setSidebar(!sidebar);
          }}
          type="button"
        >
          {sidebar ? <NavbarCross /> : <NavbarHamburger />}
        </NavbarSidebarButton>

        <NavbarListWrapper sidebar={sidebar}>
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
                    dropdown
                  >
                    <NavbarItemWithDropdown>
                      {item.title} <NavbarDropdownArrow />
                    </NavbarItemWithDropdown>
                    <NavbarDropdownList
                      onClick={() => setDropdown(false)}
                      dropdown={dropdown}
                    >
                      {item.dropdown.map((subitem) => (
                        <NavbarSubitem key={subitem.id}>
                          <NavbarSubLink to={subitem.path}>
                            {subitem.title}
                          </NavbarSubLink>
                        </NavbarSubitem>
                      ))}
                    </NavbarDropdownList>
                  </NavbarItem>
                );
              }
              // Normal item
              return (
                <NavbarItem key={item.id}>
                  <NavbarLink to={item.path}>{item.title}</NavbarLink>
                </NavbarItem>
              );
            })}
          </NavbarList>

          <NavbarList>
            {user && (
              <NavbarItem>
                <NavbarLink to={`/user/${user.user_id}`}>
                  {user.username}
                </NavbarLink>
              </NavbarItem>
            )}
            <NavbarItem>
              {user ? (
                <NavbarButton onClick={logoutUser} type="button">
                  Log out
                </NavbarButton>
              ) : (
                <NavbarButton as="a" href={"/sign-up"}>
                  Sign in
                </NavbarButton>
              )}
            </NavbarItem>
          </NavbarList>
        </NavbarListWrapper>
      </NavbarMaxWidthWrapper>
    </NavbarStyled>
  );
};

export default Navbar;
