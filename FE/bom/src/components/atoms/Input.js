import React from "react";

function Input({ type, className, placeholder, value, onKeyup, onChange }) {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      // onKeyUp={onKeyup}
      onChange={onChange}
    />
  );
}

export default Input;
