import React from "react";
import { HomeStyled } from "./Pages.styled";
import Video from "../components/Video";
import Search from "../components/Search";

const Home = () => {
  return (
    <HomeStyled>
      <Video />
      <Search />
    </HomeStyled>
  );
};

export default Home;
