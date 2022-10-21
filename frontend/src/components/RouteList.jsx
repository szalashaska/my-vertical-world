import React from "react";
import styled from "styled-components";
import {
  LinkStyled,
  PStyled,
  UpperFirstLetter,
} from "../constans/GlobalStyles";

const RouteListContainer = styled.ul`
  margin-block: 1rem;
  padding: 1rem;
  list-style: none;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;
const RouteElement = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 0.5rem 0;
  border-radius: 10px;
  transition: all 0.4s ease-in;
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
  cursor: pointer;

  &.highlighted,
  &:hover,
  &:focus {
    background: linear-gradient(to right, white, #dab495, #a2557c, white);
  }
`;

const Circle = styled.span`
  font-size: 0.75em;
  margin-right: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2.5px black outset;
  width: 2.5em;
  aspect-ratio: 1 / 1;
`;

const Container = styled(LinkStyled)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled(UpperFirstLetter)`
  margin-right: 0.5rem;
`;

const Author = styled(LinkStyled)`
  color: grey;
`;

const RouteList = ({
  routes,
  redrawLine,
  listReference,
  highlightLine,
  normalLine,
}) => {
  return (
    <RouteListContainer>
      {routes.map((route, index) => (
        <RouteElement
          key={route.id}
          onMouseEnter={() => {
            redrawLine(index, route.path, highlightLine);
          }}
          onMouseLeave={() => {
            redrawLine(index, route.path, normalLine);
          }}
          ref={(ref) => (listReference[index] = ref)}
        >
          <Container to={`/routes/${route.id}`}>
            <Circle>{index + 1}</Circle>

            <Content>{route.name}</Content>

            {route.grade}
          </Container>
          <Author to={`/user/${route.author.id}`}>
            by <UpperFirstLetter>{route.author.username}</UpperFirstLetter>
          </Author>
        </RouteElement>
      ))}
    </RouteListContainer>
  );
};

export default RouteList;
