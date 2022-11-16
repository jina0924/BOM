import React from "react";

function Input({ type, className, placeholder, value, onKeyPress, onChange }) {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      onKeyPress={onKeyPress}
      onChange={onChange}
    />
  );
}

export default Input;
