import React from "react";

import Title from "components/atoms/Title";

function PatientList({ patientListClassName }) {
  return (
    <div
      className={`patient-list shadow-box bg-white rounded-[20px] h-[62vh] pl-5 ${patientListClassName}`}
    >
      <div className="patient-list-content p-5">
        <Title
          iconTag="UilMedicalDrip"
          iconTagClassName="text-sub1 inline mr-3"
          content="환자 목록"
          contentClassName="text-main font-bold text-lg"
        />
      </div>
    </div>
  );
}

export default PatientList;
