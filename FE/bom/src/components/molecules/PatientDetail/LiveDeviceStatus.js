import React from "react";
import Title from "components/atoms/Title.js";

function LiveDeviceStatus() {
  return (
    <div className="patient-device-detail-info w-full h-full bg-white p-3 rounded-lg shadow-box">
      <div className="top-box flex justify-between">
        <div className="title-box text-3xl font-extrabold p-3 flex items-center">
          <Title
            iconTag="UilMonitorHeartRate"
            iconTagClassName="text-sub1 inline mr-3"
            content="실시간 BMS 상태"
            contentClassName="text-main font-bold text-base"
          />
        </div>
      </div>
      <div className="content-box"></div>
    </div>
  );
}

export default LiveDeviceStatus;
