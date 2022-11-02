import React from "react";

function LiveInfo({ isPC, value }) {
  return (
    <>
      {isPC && (
        <div className="grid grid-cols-3 h-full">
          <div className="col-span-1 flex items-center h-full">
            <span className="text-font1 text-lg">실시간</span>
          </div>
          <div className="col-span-2 flex items-center h-full">
            <span className="text-main text-2xl font-extrabold">{value}</span>
          </div>
        </div>
      )}
      {!isPC && (
        <div className="h-full">
          <div className="flex justify-center items-center">
            <span className="text-font1 text-sm mr-2">실시간</span>
            <span className="text-main font-extrabold text-base">{value}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default LiveInfo;
