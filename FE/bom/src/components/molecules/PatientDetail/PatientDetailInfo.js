import React from "react";
import Title from "components/atoms/Title.js";
import PatientInfoKeyValue from "components/atoms/PatientInfoKeyValue";

function PatientDetailInfo({ isPC = true }) {
  return (
    <div
      className={`patient-detail-info w-full h-full bg-white rounded-lg shadow-box ${
        !isPC && "pb-5"
      }`}
    >
      <div
        className={`title-box font-extrabold h-1/6 flex items-start ${
          isPC ? "px-6 py-4" : "px-3 py-5"
        }`}
      >
        <Title
          iconTag="UilMedicalDrip"
          iconTagClassName="text-sub1 inline mr-3"
          content="환자 상세 정보"
          contentClassName={`text-main ${isPC ? "text-lg" : "text-sm"}`}
        />
      </div>
      <div className="content-box h-5/6 flex items-center justify-center">
        <div>
          <div className="first-box flex justify-center pb-2">
            <PatientInfoKeyValue isPC={isPC} key1="환자정보" value="1" />
            <PatientInfoKeyValue isPC={isPC} key1="이름" value="2" />
            <PatientInfoKeyValue isPC={isPC} key1="나이" value="3" />
            <PatientInfoKeyValue isPC={isPC} key1="성별" value="4" />
          </div>
          <div className="second-box flex justify-center pt-2">
            <PatientInfoKeyValue isPC={isPC} key1="보호자" value="5" />
            <PatientInfoKeyValue isPC={isPC} key1="보호자 연락처" value="6" />
            <PatientInfoKeyValue isPC={isPC} key1="주치의" value="7" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetailInfo;
