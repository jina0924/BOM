import React from "react";
import { Link } from "react-router-dom";

import {
  UilLayerGroup,
  UilUsersAlt,
  UilStethoscopeAlt,
  UilSyringe,
} from "@iconscout/react-unicons";

function MenuItem({ menu, children, isActive }) {
  return (
    <li className="px-3">
      {menu === "home" && (
        <Link to="/">
          <div
            className={
              isActive
                ? `list-none p-4 rounded-[10px] bg-back text-main outline-none`
                : `list-none p-4 rounded-[10px] text-font2 hover:bg-back hover:text-main`
            }
          >
            <UilLayerGroup className="inline mr-6 ml-1" size={30} />
            <span className=" text-sm font-suit font-medium">{children}</span>
          </div>
        </Link>
      )}
      {menu === "patient" && (
        <Link to="/patients">
          <div
            className={
              isActive
                ? `list-none p-4 rounded-[10px] bg-back text-main outline-none`
                : `list-none p-4 rounded-[10px] text-font2 hover:bg-back hover:text-main`
            }
          >
            <UilUsersAlt className="inline mr-6 ml-1" size={30} />
            <span className=" text-sm font-suit font-medium">{children}</span>
          </div>
        </Link>
      )}
      {menu === "doctor" && (
        <Link to="/doctors">
          <div
            className={
              isActive
                ? `list-none p-4 rounded-[10px] bg-back text-main outline-none`
                : `list-none p-4 rounded-[10px] text-font2 hover:bg-back hover:text-main`
            }
          >
            <UilStethoscopeAlt className="inline mr-6 ml-1" size={30} />
            <span className=" text-sm font-suit font-medium">{children}</span>
          </div>
        </Link>
      )}
      {menu === "nurse" && (
        <Link to="/nurses">
          <div
            className={
              isActive
                ? `list-none p-4 rounded-[10px] bg-back text-main outline-none`
                : `list-none p-4 rounded-[10px] text-font2 hover:bg-back hover:text-main`
            }
          >
            <UilSyringe className="inline mr-6 ml-1" size={30} />
            <span className=" text-sm font-suit font-medium">{children}</span>
          </div>
        </Link>
      )}
    </li>
  );
}

export default MenuItem;
