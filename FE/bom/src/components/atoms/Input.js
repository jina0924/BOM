import React from "react";

function Input({
  type,
  className,
  placeholder,
  value,
  onKeyupFunction,
  onChange,
}) {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      onKeyUp={onKeyupFunction}
      onChange={onChange}
    />
  );
}

export default Input;
