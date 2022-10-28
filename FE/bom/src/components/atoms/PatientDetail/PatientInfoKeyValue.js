import React from "react";

function PatientInfoKeyValue({ key1, value }) {
  return (
    <div className="patient-info-key-value">
      <div className="key text-font2 border-b-[1px] px-5 flex justify-center">
        <span>{key1}</span>
      </div>
      <div className="value text-font1 font-bold px-5 flex justify-center">
        <span>{value}</span>
      </div>
    </div>
  );
}

export default PatientInfoKeyValue;
