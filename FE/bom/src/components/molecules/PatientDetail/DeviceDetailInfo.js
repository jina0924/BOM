import React from "react";
import Title from "components/atoms/Title.js";
import { UilArrowDownLeft } from "@iconscout/react-unicons";

function DeviceDetailInfo({ onZoom }) {
  return (
    <div className="patient-device-detail-info w-full h-full bg-white p-3 rounded-lg shadow-box">
      <div className="top-box flex justify-between">
        <div className="title-box text-3xl font-extrabold p-3 flex items-center">
          <Title
            iconTag="UilMonitorHeartRate"
            iconTagClassName="text-sub1 inline mr-3"
            content="BMS 상세 정보"
            contentClassName="text-main font-bold text-lg"
          />
        </div>
        <div className="arrow-box p-3" onClick={onZoom}>
          <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer" />
        </div>
      </div>
      <div className="content-box"></div>
    </div>
  );
}

export default DeviceDetailInfo;
