import React from "react";
import Title from "components/atoms/Title.js";
import PatientInfoKeyValue from "components/atoms/PatientInfoKeyValue";

function PatientDetailInfo({}) {
  return (
    <div className="patient-detail-info w-full h-full bg-white rounded-lg shadow-box">
      <div className="title-box font-extrabold h-1/6 flex items-start py-4 px-6">
        <Title
          iconTag="UilMedicalDrip"
          iconTagClassName="text-sub1 inline mr-3"
          content="환자 상세 정보"
          contentClassName="text-main text-lg"
        />
      </div>
      <div className="content-box h-5/6 flex items-center justify-center">
        <div>
          <div className="first-box flex justify-center pb-1">
            <PatientInfoKeyValue key1="환자정보" value="1" />
            <PatientInfoKeyValue key1="이름" value="2" />
            <PatientInfoKeyValue key1="나이" value="3" />
            <PatientInfoKeyValue key1="성별" value="4" />
          </div>
          <div className="second-box flex justify-center pt-1">
            <PatientInfoKeyValue key1="보호자" value="5" />
            <PatientInfoKeyValue key1="보호자 연락처" value="6" />
            <PatientInfoKeyValue key1="주치의" value="7" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetailInfo;
