import React from "react";

function Btn({ className, content, onClickFunction }) {
  return (
    <button className={className} onClick={onClickFunction}>
      {content}
    </button>
  );
}

export default Btn;
