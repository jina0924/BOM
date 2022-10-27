import React from "react";
import Title from "components/atoms/Title.js";

function PatientDetailInfo({}) {
  return (
    <div className="patient-detail">
      <div className="title-box">
        <Title
          iconTag="UilMedicalDrip"
          iconTagClassName="text-sub1"
          content="환자 상세 정보"
          contentClassName="text-main"
        />
      </div>
      <div className="content-box"></div>
    </div>
  );
}

export default PatientDetailInfo;
