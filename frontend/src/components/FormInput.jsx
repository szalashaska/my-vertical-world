import React, { useId } from "react";
import {
  FormInputContainer,
  FormInputStyled,
  FormLabelStyled,
  FormHint,
  FormTextAreaStyled,
  FormSelect,
  FormOption,
} from "./styled/FormInput.styled";

const FormInput = (props) => {
  const randomId = useId();
  const { id, label, hint, type, ...otherProps } = props;

  if (type === "textarea") {
    return (
      <FormInputContainer>
        <FormLabelStyled htmlFor={randomId}>
          {label}
          <FormTextAreaStyled id={randomId} {...otherProps} />
        </FormLabelStyled>
      </FormInputContainer>
    );
  }

  if (type === "select") {
    const { options } = props;
    return (
      <FormInputContainer>
        <FormLabelStyled htmlFor={randomId}>
          {label}
          <FormSelect id={randomId} {...otherProps}>
            {options.map((option) => (
              <FormOption key={option} value={option}>
                {option}
              </FormOption>
            ))}
          </FormSelect>
        </FormLabelStyled>
      </FormInputContainer>
    );
  }

  return (
    <FormInputContainer>
      <FormLabelStyled htmlFor={randomId}>
        {label}
        <FormInputStyled
          id={randomId}
          type={type}
          {...otherProps}
          title={hint || ""}
        />
        {hint && <FormHint>{hint}</FormHint>}
      </FormLabelStyled>
    </FormInputContainer>
  );
};

export default FormInput;
