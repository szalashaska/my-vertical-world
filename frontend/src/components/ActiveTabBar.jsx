import React from "react";
import styled from "styled-components";
import { ButtonStyled } from "../constans/GlobalStyles";

const InactiveButton = styled(ButtonStyled)`
  outline: none;
  &:focus,
  &:hover {
    outline: 3px var(--clr-red-light) solid;
  }
`;

const ActiveTabBar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div>
      {tabs.map((tab, index) => {
        if (activeTab === tab) {
          return (
            <ButtonStyled
              primary
              key={`${tab}${index}`}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </ButtonStyled>
          );
        }

        return (
          <InactiveButton
            primary
            key={`${tab}${index}`}
            type="button"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </InactiveButton>
        );
      })}
    </div>
  );
};

export default ActiveTabBar;
