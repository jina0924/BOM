import React from "react";

function LiveInfo({ liveClassName, valueClassName, value }) {
  return (
    <div className="grid grid-cols-3 h-full">
      <div className="col-span-1 flex items-center h-full">
        <span className={` ${liveClassName}`}>실시간</span>
      </div>
      <div className="col-span-2 flex items-center h-full">
        <span className={` ${valueClassName}`}>{value}</span>
      </div>
    </div>
  );
}

export default LiveInfo;
