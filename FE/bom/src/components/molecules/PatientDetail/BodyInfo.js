import React from "react";
import {
  UilArrowResizeDiagonal,
  UilArrowDownLeft,
} from "@iconscout/react-unicons";

// components
import Title from "components/atoms/Title.js";
import LiveInfo from "components/atoms/LiveInfo";

function BodyInfo({ part, onZoom, onOff = false, isPC = true }) {
  return (
    <div
      className={`patient-body-info w-full h-full bg-white rounded-lg shadow-box ${
        !isPC && "pb-5"
      }`}
    >
      {part === "체온" && (
        <>
          <div
            className={`title-box font-extrabold flex items-start ${
              isPC ? "px-6 py-4 h-1/6" : "px-3 py-5"
            }`}
          >
            <Title
              iconTag="UilTemperatureHalf"
              iconTagClassName="text-sub1 inline mr-3"
              content="체온"
              contentClassName={`text-main ${isPC ? "text-lg" : "text-sm"}`}
            />

            <div className="arrow-box" onClick={onZoom}>
              {!onOff && isPC && (
                <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
              )}
              {onOff && isPC && (
                <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer" />
              )}
            </div>
          </div>
          <div
            className={`content-box grid grid-cols-5 ${
              isPC ? "px-3 h-5/6" : ""
            }`}
          >
            <div
              className={`live-info-box col-span-2 h-full ${
                isPC ? "pl-[36px]" : "pl-6"
              }`}
            >
              <LiveInfo isPC={isPC} value="36.5 ℃" />
            </div>
          </div>
        </>
      )}
      {part === "심박수" && (
        <>
          <div
            className={`title-box font-extrabold flex items-start ${
              isPC ? "px-6 py-4 h-1/6" : "px-3 py-5"
            }`}
          >
            <Title
              iconTag="UilHeartbeat"
              iconTagClassName="text-sub1 inline mr-3"
              content="심박수"
              contentClassName={`text-main ${isPC ? "text-lg" : "text-sm"}`}
            />
            <div className="arrow-box" onClick={onZoom}>
              {!onOff && isPC && (
                <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
              )}
              {onOff && isPC && (
                <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer" />
              )}
            </div>
          </div>
          <div
            className={`content-box grid grid-cols-5 ${
              isPC ? "px-3 h-5/6" : ""
            }`}
          >
            <div
              className={`live-info-box col-span-2 h-full ${
                isPC ? "pl-[36px]" : "pl-6"
              }`}
            >
              <LiveInfo isPC={isPC} value="150 bpm" />
            </div>
          </div>
        </>
      )}
      {part === "산소포화도" && (
        <>
          <div
            className={`title-box font-extrabold flex items-start ${
              isPC ? "px-6 py-4 h-1/6" : "px-3 py-5"
            }`}
          >
            <Title
              iconTag="UilPercentage"
              iconTagClassName="text-sub1 inline mr-3"
              content="산소포화도"
              contentClassName={`text-main ${isPC ? "text-lg" : "text-sm"}`}
            />
            <div className="arrow-box" onClick={onZoom}>
              {!onOff && isPC && (
                <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer" />
              )}
              {onOff && isPC && (
                <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer" />
              )}
            </div>
          </div>
          <div
            className={`content-box grid grid-cols-5 ${
              isPC ? "px-3 h-5/6" : ""
            }`}
          >
            <div
              className={`live-info-box col-span-2 h-full ${
                isPC ? "pl-[36px]" : "pl-6"
              }`}
            >
              <LiveInfo isPC={isPC} value="95%" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BodyInfo;
