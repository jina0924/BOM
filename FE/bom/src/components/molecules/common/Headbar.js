import React from "react";
import { UilBell } from "@iconscout/react-unicons";
import { UilAngleDown } from "@iconscout/react-unicons";

function HeadBar({ wardNum }) {
  return (
    <div className="headbar w-full rounded-tr-[20px] bg-white shadow-head h-[110px] flex justify-end items-center px-10 gap-8">
      <span className="text-main text-xl font-suit font-medium">
        {wardNum}병동
      </span>
      <UilBell className="text-main inline" size={35} />
      <UilAngleDown className="text-main inline" size={35} />
    </div>
  );
}

export default HeadBar;
