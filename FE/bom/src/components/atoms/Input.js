import React from "react";

function Input({ type, className, placeholder, value, onKeyupFunction }) {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      onKeyUp={onKeyupFunction}
    />
  );
}

export default Input;
