import React from "react";

function LiveInfo({ isPC, value }) {
  return (
    <>
      {isPC && (
        <div className="h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <span className="text-font1 text-base mr-2">실시간</span>
            <span className="text-main text-lg font-extrabold ">{value}</span>
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
