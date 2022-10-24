import React from "react";
import styled from "styled-components";
import {
  ButtonStyled,
  PStyled,
  UpperFirstLetter,
} from "../constans/GlobalStyles";

export const UserContentWrapper = styled.div`
  min-height: 3rem;
  max-height: 20rem;
  overflow-y: auto;
  padding: 0.5rem;
  border-radius: 15px;
  margin-block: 1rem;
  box-shadow: 0 0 15px rgba(2, 14, 5, 0.431);
  @media screen and (min-width: 960px) {
    padding: 1rem;
  }
`;

const UsersContent = ({ data, content }) => {
  return (
    <UserContentWrapper>
      {data.length > 0 ? (
        data.map((item) => (
          <ButtonStyled as="a" key={item.id} href={`/${content}/${item.id}`}>
            <UpperFirstLetter>{item.name}</UpperFirstLetter>{" "}
            {item.grade && <>, {item.grade} </>}
          </ButtonStyled>
        ))
      ) : (
        <PStyled align="center"> No {content} to show.</PStyled>
      )}
    </UserContentWrapper>
  );
};

export default UsersContent;
