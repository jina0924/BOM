import React from "react";

import {
  UilTemperatureHalf,
  UilBatteryBolt,
  UilBatteryEmpty,
  UilCircuit,
} from "@iconscout/react-unicons";

function BMSIcon({ iconTag, className, iconTagClassName }) {
  return (
    <>
      {iconTag === "UilTemperatureHalf" && (
        <div className={`aspect-square ${className}`}>
          <UilTemperatureHalf className={iconTagClassName} />
        </div>
      )}
      {iconTag === "UilBatteryBolt" && (
        <div className={`aspect-square ${className}`}>
          <UilBatteryBolt className={iconTagClassName} />
        </div>
      )}
      {iconTag === "UilBatteryEmpty" && (
        <div className={`aspect-square ${className}`}>
          <UilBatteryEmpty className={iconTagClassName} />
        </div>
      )}
      {iconTag === "UilCircuit" && (
        <div className={`aspect-square ${className}`}>
          <UilCircuit className={iconTagClassName} />
        </div>
      )}
    </>
  );
}

export default BMSIcon;
