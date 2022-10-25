import React from "react";
import {
  UilLayerGroup,
  UilUsersAlt,
  UilStethoscopeAlt,
  UilSyringe,
} from "@iconscout/react-unicons";

function MenuItem({ menu, children }) {
  return (
    <div className="mx-5 my-10">
      {/* <span>아이콘 자리</span> */}
      <span className="text-font2 text-lg font-suit font-medium">
        {children}
      </span>
    </div>
  );
}

export default MenuItem;
