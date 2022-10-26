import styled from "styled-components";

export const FormInputContainer = styled.div`
  padding: 1rem 0.4rem;
`;

export const FormLabelStyled = styled.label`
  font-size: clamp(0.8rem, 0.6737rem + 0.5614vw, 1.2rem);
  & input:valid ~ span {
    color: #19c619;
  }

  & input:focus:invalid ~ span {
    color: red;
  }
`;

export const FormInputStyled = styled.input`
  font-family: var(--ff-body);
  font-size: 0.75em;
  width: 100%;
  display: block;
  padding: 0.75em 1rem;
  margin-top: 0.5rem;
  border-radius: 10px;
  border: none;
  outline: 2px var(--clr-pink) solid;
  transition: all 0.3s ease-in;

  &:focus,
  &:hover {
    outline: 3px var(--clr-orange-strong) solid;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;
export const FormTextAreaStyled = styled.textarea`
  font-family: var(--ff-body);
  font-size: 0.75em;
  width: 100%;
  display: block;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 10px;
  border: none;
  outline: 2px var(--clr-pink) solid;
  max-width: 100%;
  transition: all 0.3s ease-in;

  &:focus,
  &:hover {
    outline: 3px var(--clr-orange-strong) solid;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;
export const FormHint = styled.span`
  font-size: 0.75em;
  color: grey;
`;
export const FormSelect = styled.select`
  display: block;
  font-family: var(--ff-body);
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: white;
  border-radius: 10px;
  border: none;
  outline: 2px var(--clr-pink) solid;
  text-transform: capitalize;
`;
export const FormOption = styled.option`
  border-radius: 10px;
  text-transform: capitalize;
`;
