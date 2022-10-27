import React from "react";

import Title from "components/atoms/Title";

function WardInfo({ wardInfoTitle, wardInfoDetail, wardNum }) {
  return (
    <div className="ward-info-card col-span-1 p-5 shadow-box bg-white rounded-[20px]">
      <div className="ward-info-title flex items-center">
        {wardInfoTitle === "wardName" && (
          <Title
            iconTag="UilHospital"
            iconTagClassName="text-sub1 inline mr-3"
            content="병동 정보"
            contentClassName="text-main font-bold text-xl"
          />
        )}
        {wardInfoTitle === "countPatients" && (
          <Title
            iconTag="UilMedicalDrip"
            iconTagClassName="text-sub1 inline mr-3"
            content="입원 환자 수"
            contentClassName="text-main font-bold text-xl"
          />
        )}
        {wardInfoTitle === "countDoctors" && (
          <Title
            iconTag="UilUserMd"
            iconTagClassName="text-sub1 inline mr-3"
            content="주치의 수"
            contentClassName="text-main font-bold text-xl"
          />
        )}
        {wardInfoTitle === "countNurses" && (
          <Title
            iconTag="UilUserNurse"
            iconTagClassName="text-sub1 inline mr-3"
            content="간호사 수"
            contentClassName="text-main font-bold text-xl"
          />
        )}
      </div>
      <div className="ward-info-detail my-1">
        {wardInfoTitle === "wardName" && (
          <span className="font-suit text-main ml-9 text-lg">
            {wardInfoDetail} 병동
          </span>
        )}
        {wardInfoTitle === "countPatients" && (
          <span className="font-suit text-main ml-9 text-lg">
            {wardInfoDetail}
          </span>
        )}
        {wardInfoTitle === "countDoctors" && (
          <span className="font-suit text-main ml-9 text-lg">
            {wardInfoDetail}
          </span>
        )}
        {wardInfoTitle === "countNurses" && (
          <span className="font-suit text-main ml-9 text-lg">
            {wardInfoDetail}
          </span>
        )}
      </div>
    </div>
  );
}

export default WardInfo;
