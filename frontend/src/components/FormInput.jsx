import React, { useId, useState } from "react";
import "./FormInput.css";

const FormInput = (props) => {
  const randomId = useId();
  const [isFocused, setIsFocused] = useState(false);
  const { id, label, onChange, wrongInputMsg, ...otherProps } = props;

  const handleBluredInput = () => {
    setIsFocused(true);
  };

  // Handles last element in form
  const handleFocusedInput = () => {
    if (otherProps.name === "confirmPassword") {
      setIsFocused(true);
    }
  };

  return (
    <div className="forminput">
      <label htmlFor={randomId}>{label}</label>
      <input
        className="forminput__input"
        id={randomId}
        {...otherProps}
        data-isfocused={isFocused.toString()}
        onChange={onChange}
        onBlur={handleBluredInput}
        onFocus={handleFocusedInput}
      />
      {wrongInputMsg && <span>{wrongInputMsg}</span>}
    </div>
  );
};

export default FormInput;
