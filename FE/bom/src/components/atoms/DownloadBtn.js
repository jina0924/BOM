import React from "react";
import { UilTable } from "@iconscout/react-unicons";

function Btn({}) {
  return (
    <button className={btnClassName} onClick={onClickFunction}>
      <UilTable className={iconTagClassName} />
      <span className={contentClassName}>XLS</span>
    </button>
  );
}

export default Btn;
