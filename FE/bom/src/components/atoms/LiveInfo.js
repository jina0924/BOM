import React from "react";

function LiveInfo({ liveClassName, valueClassName, value }) {
  return (
    <div className="grid grid-cols-2">
      <span className={`col-span-1 ${liveClassName}`}>실시간</span>
      <span className={`col-span-1 ${valueClassName}`}>{value}</span>
    </div>
  );
}

export default LiveInfo;
