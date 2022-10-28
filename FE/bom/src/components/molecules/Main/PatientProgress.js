import React from "react";

import Title from "components/atoms/Title";

function PatientProgress() {
  return (
    <div className="patient-progress shadow-box bg-white rounded-[20px] h-[20vh] pr-5">
      <div className="patient-progress-content p-5">
        <Title
          iconTag="UilChartLine"
          iconTagClassName="text-sub1 inline mr-3"
          content="입원 환자 추이"
          contentClassName="text-main font-bold text-lg"
        />
      </div>
    </div>
  );
}

export default PatientProgress;
