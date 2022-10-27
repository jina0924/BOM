import React from "react";

import {
  UilTemperatureHalf,
  UilBatteryBolt,
  UilBatteryEmpty,
  UilCircuit,
} from "@iconscout/react-unicons";

function BMSIcon({ iconTag }) {
  return (
    <>
      {iconTag === "UilTemperatureHalf" && (
        <div className="aspect-square h-full flex justify-center items-center bg-sub1/20 rounded-full">
          <UilTemperatureHalf className="text-sub1 w-1/2 h-1/2" />
        </div>
      )}
      {iconTag === "UilBatteryBolt" && (
        <div className="aspect-square h-full flex justify-center items-center bg-[#FFB400]/20 rounded-full">
          <UilBatteryBolt className="text-[#FFB400] w-1/2 h-1/2" />
        </div>
      )}
      {iconTag === "UilBatteryEmpty" && (
        <div className="aspect-square h-full flex justify-center items-center bg-[#4F9DA6]/20 rounded-full">
          <UilBatteryEmpty className="text-[#4F9DA6] w-1/2 h-1/2" />
        </div>
      )}
      {iconTag === "UilCircuit" && (
        <div className="aspect-square h-full flex justify-center items-center bg-[#1A3263]/20 rounded-full">
          <UilCircuit className="text-[#1A3263] w-1/2 h-1/2" />
        </div>
      )}
    </>
  );
}

export default BMSIcon;
