import styled from "styled-components";

export const FormInputContainer = styled.div`
  margin: 1rem 0;
`;
export const FormInputStyled = styled.input`
  display: block;
  padding: 0.5em 1rem;
  margin-top: 0.5rem;
  border-radius: 10px;
`;
export const FormTextAreaStyled = styled.textarea`
  display: block;
`;
export const FormLabelStyled = styled.label``;
export const FormErrorMessage = styled.span``;
export const FormSelect = styled.select`
  display: block;
`;
export const FormOption = styled.option``;

// .forminput > * {
//     display: block;
//   }

//   .forminput span {
//     font-size: var(--fs-xs);
//     color: red;
//     visibility: hidden;
//   }

//   .forminput__input {
//     padding: 1em;
//   }

//   .forminput__input[data-isfocused="true"]:invalid {
//     border: 1px solid red;
//   }

//   .forminput__input[data-isfocused="true"]:invalid ~ span {
//     visibility: visible;
//   }
