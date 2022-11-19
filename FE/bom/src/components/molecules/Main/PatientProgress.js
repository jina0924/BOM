import React from "react";

import Title from "components/atoms/Title";

function PatientProgress() {
  return (
    <div className="patient-progress shadow-box bg-white rounded-[20px] pr-5 h-full">
      <div className="patient-progress-title h-1/6 py-4 px-6">
        <Title
          iconTag="UilChartLine"
          iconTagClassName="text-sub1 inline mr-3"
          content="입원 환자 추이"
          contentClassName="text-main font-bold text-lg"
        />
      </div>
      <div className="patient-progress-graph h-5/6"></div>
    </div>
  );
}

export default PatientProgress;
