import React from "react";
import Title from "components/atoms/Title.js";
import { UilArrowResizeDiagonal } from "@iconscout/react-unicons";

function DeviceSummary({ onZoom }) {
  return (
    <>
      <div className="patient-device-summary w-full h-full bg-white rounded-lg shadow-box">
        <div className="top-box flex justify-between h-1/6 py-4 px-6">
          <Title
            iconTag="UilMonitorHeartRate"
            iconTagClassName="text-sub1 inline mr-3"
            content="디바이스 정보"
            contentClassName="text-main font-[900] text-lg"
          />
          <div className="arrow-box  h-1/6" onClick={onZoom}>
            <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
          </div>
        </div>
        <div className="content-box h-5/6 flex items-center justify-center"></div>
      </div>
    </>
  );
}

export default DeviceSummary;
