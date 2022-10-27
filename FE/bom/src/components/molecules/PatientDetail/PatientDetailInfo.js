import React from "react";
import Title from "components/atoms/Title.js";

function PatientDetailInfo({}) {
  return (
    <div className="patient-detail-info w-full h-full bg-white p-3 rounded-lg shadow-box">
      <div className="title-box text-3xl font-extrabold p-3 flex items-center">
        <Title
          iconTag="UilMedicalDrip"
          iconTagClassName="text-sub1 inline mr-3"
          content="환자 상세 정보"
          contentClassName="text-main font-bold text-base"
        />
      </div>
      <div className="content-box"></div>
    </div>
  );
}

export default PatientDetailInfo;
