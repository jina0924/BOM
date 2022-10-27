import React from "react";
import Title from "components/atoms/Title.js";

function PatientDetailInfo({}) {
  return (
    <div className="patient-detail-info w-full bg-white p-3">
      <div className="title-box flex justify-start text-3xl font-extrabold">
        <Title
          iconTag="UilMedicalDrip"
          iconTagClassName="text-sub1 w-[36px] h-[36px]"
          content="환자 상세 정보"
          contentClassName="text-main"
        />
      </div>
      <div className="content-box"></div>
    </div>
  );
}

export default PatientDetailInfo;
