import React from "react";

function LiveInfo({ isPC, value }) {
  return (
    <div className={`${isPC ? "grid grid-cols-3 h-full" : "h-full"}`}>
      <div
        className={`${
          isPC
            ? "col-span-1 flex items-center h-full"
            : "flex items-center justify-center"
        }`}
      >
        <span
          className={` ${isPC ? "text-font1 text-lg" : "text-font1 text-sm"}`}
        >
          실시간
        </span>
      </div>
      <div
        className={`${
          isPC
            ? "col-span-2 flex items-center h-full"
            : "flex items-center justify-center"
        }`}
      >
        <span
          className={` ${
            isPC
              ? "text-main text-2xl font-extrabold"
              : "text-main font-extrabold text-base"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export default LiveInfo;
