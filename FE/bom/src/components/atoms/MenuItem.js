import React from "react";
import {
  UilLayerGroup,
  UilUsersAlt,
  UilStethoscopeAlt,
  UilSyringe,
} from "@iconscout/react-unicons";

function MenuItem({ menu, children }) {
  return (
    <div className="m-10 hover:bg-back">
      {/* <span>아이콘 자리</span> */}
      {menu === "home" && (
        <UilLayerGroup className="text-font2 inline mr-8" size={35} />
      )}
      {menu === "patient" && (
        <UilUsersAlt className="text-font2 inline mr-8" size={35} />
      )}
      {menu === "doctor" && (
        <UilStethoscopeAlt className="text-font2 inline mr-8" size={35} />
      )}
      {menu === "nurse" && (
        <UilSyringe className="text-font2 inline mr-8" size={35} />
      )}
      <span className="text-font2 text-lg font-suit font-medium">
        {children}
      </span>
    </div>
  );
}

export default MenuItem;
