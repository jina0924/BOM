import React from "react";

function PatientInfoKeyValue({ isPC, key1, value }) {
  return (
    <div className="patient-info-key-value">
      <div
        className={
          isPC
            ? "key text-font2 border-b-[1px] px-5 flex justify-center"
            : "key text-font2 border-b-[1px] px-3 flex justify-center text-sm"
        }
      >
        <span>{key1}</span>
      </div>
      <div
        className={
          isPC
            ? "value text-font1 font-bold px-5 flex justify-center"
            : "value text-font1 font-bold px-3 flex justify-center text-sm"
        }
      >
        <span>{value}</span>
      </div>
    </div>
  );
}

export default PatientInfoKeyValue;
