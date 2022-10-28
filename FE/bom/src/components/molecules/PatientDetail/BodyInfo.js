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
          <div className="top-box flex justify-between h-1/6 p-3">
            <div className="title-box font-extrabold flex items-start">
              <Title
                iconTag="UilTemperatureHalf"
                iconTagClassName="text-sub1 inline mr-3"
                content="체온"
                contentClassName="text-main font-bold text-lg"
              />
            </div>
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
            <div className="live-info-box col-span-2 h-full flex items-center pl-[36px]">
              <LiveInfo liveClassName="" />
            </div>
          </div>
        </>
      )}
      {part === "심박수" && (
        <>
          <div className="top-box flex justify-between h-1/6 p-3">
            <div className="title-box font-extrabold flex items-start">
              <Title
                iconTag="UilHeartbeat"
                iconTagClassName="text-sub1 inline mr-3"
                content="심박수"
                contentClassName="text-main font-bold text-lg"
              />
            </div>
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
            <div className="live-info-box col-span-2 h-full">
              <LiveInfo />
            </div>
          </div>
        </>
      )}
      {part === "산소포화도" && (
        <>
          <div className="top-box flex justify-between h-1/6 p-3">
            <div className="title-box font-extrabold flex items-start">
              <Title
                iconTag="UilPercentage"
                iconTagClassName="text-sub1 inline mr-3"
                content="산소포화도"
                contentClassName="text-main font-bold text-lg"
              />
            </div>
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
            <div className="live-info-box col-span-2 h-full">
              <LiveInfo />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BodyInfo;
