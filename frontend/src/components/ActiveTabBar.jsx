import React from "react";
import { ButtonStyled } from "../constans/GlobalStyles";

const ActiveTabBar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div>
      {tabs.map((tab, index) => {
        if (activeTab === tab) {
          return (
            <ButtonStyled
              style={{ backgroundColor: "yellow" }}
              key={`${tab}${index}`}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </ButtonStyled>
          );
        }

        return (
          <ButtonStyled
            key={`${tab}${index}`}
            type="button"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </ButtonStyled>
        );
      })}
    </div>
  );
};

export default ActiveTabBar;
