import React from "react";

const ActiveTabBar = ({ tabs, setActiveTab }) => {
  return (
    <div>
      {tabs.map((tab, index) => (
        <button
          key={`${tab}${index}`}
          type="button"
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ActiveTabBar;
