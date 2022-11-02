import React from "react";
import { UilBell } from "@iconscout/react-unicons";
import { UilAngleDown } from "@iconscout/react-unicons";

function HeadBar({ wardNum }) {
  return (
    <div className="headbar w-full rounded-tr-[20px] bg-white shadow-head h-[11vh] flex justify-end items-center px-10 gap-8">
      <span className="text-main text-lg font-suit font-bold">
        {wardNum} 병동
      </span>
      <div className="dropdown dropdown-bottom">
        <label
          tabIndex={0}
          className="btn bg-white border-0 hover:bg-white focus:outline-none px-0"
        >
          <UilBell className="text-main inline" size={30} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white rounded-box w-52 p-2 shadow-box"
        >
          <li>a</li>
          <li>b</li>
        </ul>
      </div>
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn bg-white border-0 hover:bg-white focus:outline-none px-0"
        >
          <UilAngleDown className="text-main inline" size={30} />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white rounded-box w-52 p-2 shadow-box"
        >
          <li>로그아웃</li>
        </ul>
      </div>
    </div>
  );
}

export default HeadBar;
