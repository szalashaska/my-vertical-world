import styled from "styled-components";
import Cross from "../../assets/cross.svg";

export const PopupContainer = styled.div`
  border-radius: 0 25px 20px 25px;
  background: linear-gradient(
    135deg,
    #f55536,
    #b07a97,
    #c0a7b4,
    #efbf98,
    white,
    white
  );
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
  padding: 1.8rem 1.5rem 1.5rem 1.5rem;
  position: relative;
  @media only screen and (min-width: 800px) {
    padding: 2rem 1.2rem 1.2rem 1.2rem;
  }
`;

export const SinglePopupContent = styled.div`
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
  text-align: center;
  text-transform: capitalize;
`;

export const PopupContent = styled.div`
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
  text-align: center;
  text-transform: capitalize;
`;

export const CrossIcon = styled(Cross)`
  width: 25px;
  fill: black;
  transition: all 0.3s ease-in;
  &:hover,
  &:focus {
    fill: white;
  }
`;
export const PopupButton = styled.button`
  cursor: pointer;
  background: transparent;
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  outline: none;
  z-index: 5;
`;
