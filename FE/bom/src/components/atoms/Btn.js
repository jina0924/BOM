import React from "react";

function Btn({ className, content, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
}

export default Btn;
