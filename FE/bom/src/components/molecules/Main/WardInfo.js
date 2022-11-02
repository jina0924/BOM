import React from "react";

import Title from "components/atoms/Title";

function WardInfo({ wardInfoTitle, wardInfoDetail, wardNum }) {
  return (
    <div className="ward-info-card col-span-1 shadow-box bg-white rounded-[20px] h-[11vh] flex flex-col justify-center pl-5">
      <div className="ward-info-content">
        <div className="ward-info-title flex items-center">
          {wardInfoTitle === "wardName" && (
            <Title
              iconTag="UilHospital"
              iconTagClassName="text-sub1 inline mr-3"
              content="병동 정보"
              contentClassName="text-main font-bold text-lg"
            />
          )}
          {wardInfoTitle === "countPatients" && (
            <Title
              iconTag="UilMedicalDrip"
              iconTagClassName="text-sub1 inline mr-3"
              content="입원 환자 수"
              contentClassName="text-main font-bold text-lg"
            />
          )}
          {wardInfoTitle === "countDoctors" && (
            <Title
              iconTag="UilUserMd"
              iconTagClassName="text-sub1 inline mr-3"
              content="의사 수"
              contentClassName="text-main font-bold text-lg"
            />
          )}
          {wardInfoTitle === "countNurses" && (
            <Title
              iconTag="UilUserNurse"
              iconTagClassName="text-sub1 inline mr-3"
              content="간호사 수"
              contentClassName="text-main font-bold text-lg"
            />
          )}
        </div>
        <div className="ward-info-detail my-1">
          {wardInfoTitle === "wardName" && (
            <span className="font-suit text-main ml-9 text-base">
              {wardInfoDetail} 병동
            </span>
          )}
          {wardInfoTitle === "countPatients" && (
            <span className="font-suit text-main ml-9 text-base">
              {wardInfoDetail}
            </span>
          )}
          {wardInfoTitle === "countDoctors" && (
            <span className="font-suit text-main ml-9 text-base">
              {wardInfoDetail}
            </span>
          )}
          {wardInfoTitle === "countNurses" && (
            <span className="font-suit text-main ml-9 text-base">
              {wardInfoDetail}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default WardInfo;
