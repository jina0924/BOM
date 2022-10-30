import React from "react";
import {
  UilArrowResizeDiagonal,
  UilArrowDownLeft,
} from "@iconscout/react-unicons";

// components
import Title from "components/atoms/Title.js";
import LiveInfo from "components/atoms/LiveInfo";

function BodyInfo({ part, onZoom, onOff = false }) {
  return (
    <div className="patient-body-info w-full h-full bg-white rounded-lg shadow-box">
      {part === "체온" && (
        <>
          <div className="top-box flex justify-between h-1/6 py-4 px-6">
            <Title
              iconTag="UilTemperatureHalf"
              iconTagClassName="text-sub1 inline mr-3"
              content="체온"
              contentClassName="text-main text-lg"
            />

            <div className="arrow-box" onClick={onZoom}>
              {!onOff && (
                <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
              )}
              {onOff && (
                <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer" />
              )}
            </div>
          </div>
          <div className="content-box h-5/6 grid grid-cols-5 px-3">
            <div className="live-info-box col-span-2 h-full pl-[36px]">
              <LiveInfo
                liveClassName="text-font1 text-lg"
                valueClassName="text-main text-2xl font-extrabold"
                value="36.5 ℃"
              />
            </div>
          </div>
        </>
      )}
      {part === "심박수" && (
        <>
          <div className="top-box flex justify-between h-1/6 py-4 px-6">
            <Title
              iconTag="UilHeartbeat"
              iconTagClassName="text-sub1 inline mr-3"
              content="심박수"
              contentClassName="text-main text-lg"
            />

            <div className="arrow-box" onClick={onZoom}>
              {!onOff && (
                <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
              )}
              {onOff && (
                <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer" />
              )}
            </div>
          </div>
          <div className="content-box h-5/6 grid grid-cols-5 px-3">
            <div className="live-info-box col-span-2 h-full pl-[36px]">
              <LiveInfo
                liveClassName="text-font1 text-lg"
                valueClassName="text-main text-2xl font-extrabold"
                value="150 bpm"
              />
            </div>
          </div>
        </>
      )}
      {part === "산소포화도" && (
        <>
          <div className="top-box flex justify-between h-1/6 py-4 px-6">
            <Title
              iconTag="UilPercentage"
              iconTagClassName="text-sub1 inline mr-3"
              content="산소포화도"
              contentClassName="text-main text-lg"
            />

            <div className="arrow-box" onClick={onZoom}>
              {!onOff && (
                <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
              )}
              {onOff && (
                <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer" />
              )}
            </div>
          </div>
          <div className="content-box h-5/6 grid grid-cols-5 px-3">
            <div className="live-info-box col-span-2 h-full pl-[36px]">
              <LiveInfo
                liveClassName="text-font1 text-lg "
                valueClassName="text-main text-2xl font-extrabold"
                value="95 %"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BodyInfo;
