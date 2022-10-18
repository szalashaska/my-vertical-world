import React from "react";
import { HomeStyled } from "./Pages.styled";
import Search from "../components/Search";
import {
  H1Styled,
  H2Styled,
  H3Styled,
  PStyled,
} from "../constans/GlobalStyles";
import HeroHome from "../components/HeroHome";

const Home = () => {
  return (
    <HomeStyled>
      <HeroHome />
      <Search />
      <H1Styled>Some text to show how content look like</H1Styled>
      <H2Styled>Some text to show how content look like</H2Styled>
      <H3Styled>Some text to show how content look like</H3Styled>
      <PStyled>
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
        reprehenderit quisquam modi dolorum et quaerat, illum blanditiis dicta
        recusandae, sint exercitationem nesciunt quibusdam illo eum aliquam
        cumque accusamus repellendus, quam eligendi doloremque natus velit iusto
        minus hic? Odit voluptas, corrupti pariatur deserunt enim quam dolorum
        ullam reprehenderit! Est, dolor quibusdam.{" "}
      </PStyled>
    </HomeStyled>
  );
};

export default Home;
