import React from "react";
import Title from "components/atoms/Title.js";
import { UilArrowResizeDiagonal } from "@iconscout/react-unicons";

function DeviceSummary({ onZoom }) {
  return (
    <>
      <div className="patient-device-summary w-full h-full bg-white p-3 rounded-lg shadow-box">
        <div className="top-box flex justify-between">
          <div className="title-box text-3xl font-extrabold p-3 flex items-center">
            <Title
              iconTag="UilMonitorHeartRate"
              iconTagClassName="text-sub1 inline mr-3"
              content="디바이스 정보"
              contentClassName="text-main font-bold text-base"
            />
          </div>
          <div className="arrow-box p-3" onClick={onZoom}>
            <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="content-box"></div>
    </>
  );
}

export default DeviceSummary;
