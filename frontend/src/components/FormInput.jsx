import React, { useId, useState } from "react";
import {
  FormInputContainer,
  FormInputStyled,
  FormLabelStyled,
  FormErrorMessage,
} from "./styled/FormInput.styled";

const FormInput = (props) => {
  const randomId = useId();
  const { id, label, wrongInputMsg, ...otherProps } = props;

  return (
    <FormInputContainer>
      <FormLabelStyled htmlFor={randomId}>
        {label}
        <FormInputStyled id={randomId} {...otherProps} />
      </FormLabelStyled>
      {wrongInputMsg && <FormErrorMessage>{wrongInputMsg}</FormErrorMessage>}
    </FormInputContainer>
  );
};

export default FormInput;
