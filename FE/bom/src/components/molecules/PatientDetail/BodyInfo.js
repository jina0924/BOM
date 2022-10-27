import React from "react";
import Title from "components/atoms/Title.js";
import {
  UilArrowResizeDiagonal,
  UilArrowDownLeft,
} from "@iconscout/react-unicons";

function BodyInfo({ part, onZoom, onOff = false }) {
  return (
    <div className="patient-body-info w-full h-full bg-white p-3 rounded-lg shadow-box">
      {part === "체온" && (
        <>
          <div className="top-box flex justify-between">
            <div className="title-box text-3xl font-extrabold p-3 flex items-center">
              <Title
                iconTag="UilTemperatureHalf"
                iconTagClassName="text-sub1 inline mr-3"
                content="체온"
                contentClassName="text-main font-bold text-base"
              />
            </div>
            <div className="arrow-box p-3" onClick={onZoom}>
              {!onOff && (
                <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
              )}
              {onOff && (
                <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer" />
              )}
            </div>
          </div>
          <div className="content-box"></div>
        </>
      )}
      {part === "심박수" && (
        <>
          <div className="top-box flex justify-between">
            <div className="title-box text-3xl font-extrabold p-3 flex items-center">
              <Title
                iconTag="UilHeartbeat"
                iconTagClassName="text-sub1 inline mr-3"
                content="심박수"
                contentClassName="text-main font-bold text-base"
              />
            </div>
            <div className="arrow-box p-3" onClick={onZoom}>
              {!onOff && (
                <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
              )}
              {onOff && (
                <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer" />
              )}
            </div>
          </div>
          <div className="content-box"></div>
        </>
      )}
      {part === "산소포화도" && (
        <>
          <div className="top-box flex justify-between">
            <div className="title-box text-3xl font-extrabold p-3 flex items-center">
              <Title
                iconTag="UilPercentage"
                iconTagClassName="text-sub1 inline mr-3"
                content="산소포화도"
                contentClassName="text-main font-bold text-base"
              />
            </div>
            <div className="arrow-box p-3" onClick={onZoom}>
              {!onOff && (
                <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
              )}
              {onOff && (
                <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer" />
              )}
            </div>
          </div>
          <div className="content-box"></div>
        </>
      )}
    </div>
  );
}

export default BodyInfo;
