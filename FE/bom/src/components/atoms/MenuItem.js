import React from "react";
import {
  UilLayerGroup,
  UilUsersAlt,
  UilStethoscopeAlt,
  UilSyringe,
} from "@iconscout/react-unicons";

function MenuItem({ menu, children }) {
  return (
    <li className="list-none p-5 m-3 rounded-[10px] text-font2 hover:bg-back hover:text-main active:bg-back active:text-main">
      {menu === "home" && (
        <UilLayerGroup className="inline mr-6 ml-1" size={30} />
      )}
      {menu === "patient" && (
        <UilUsersAlt className="inline mr-6 ml-1" size={30} />
      )}
      {menu === "doctor" && (
        <UilStethoscopeAlt className="inline mr-6 ml-1" size={30} />
      )}
      {menu === "nurse" && (
        <UilSyringe className="inline mr-6 ml-1" size={30} />
      )}
      <span className=" text-base font-suit font-medium">{children}</span>
    </li>
  );
}

export default MenuItem;
