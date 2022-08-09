import React, { useId } from "react";
import {
  FormInputContainer,
  FormInputStyled,
  FormLabelStyled,
  FormErrorMessage,
  FormTextAreaStyled,
  FormSelect,
  FormOption,
} from "./styled/FormInput.styled";

const FormInput = (props) => {
  const randomId = useId();
  const { id, label, wrongInputMsg, type, ...otherProps } = props;

  if (type === "textarea") {
    return (
      <FormInputContainer>
        <FormLabelStyled htmlFor={randomId}>
          {label}
          <FormTextAreaStyled id={randomId} {...otherProps} />
        </FormLabelStyled>
        {wrongInputMsg && <FormErrorMessage>{wrongInputMsg}</FormErrorMessage>}
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
        {wrongInputMsg && <FormErrorMessage>{wrongInputMsg}</FormErrorMessage>}
      </FormInputContainer>
    );
  }

  return (
    <FormInputContainer>
      <FormLabelStyled htmlFor={randomId}>
        {label}
        <FormInputStyled id={randomId} type={type} {...otherProps} />
      </FormLabelStyled>
      {wrongInputMsg && <FormErrorMessage>{wrongInputMsg}</FormErrorMessage>}
    </FormInputContainer>
  );
};

export default FormInput;

{
  /* <label htmlFor={`grade-${id}`}>
Grade:
<select
  id={`grade-${id}`}
  value={routeGrade}
  onChange={(e) => setRouteGrade(e.target.value)}
  required
>
  {routeGrades.map((grade) => (
    <option key={grade} value={grade}>
      {grade}
    </option>
  ))}
</select>
</label> */
}
