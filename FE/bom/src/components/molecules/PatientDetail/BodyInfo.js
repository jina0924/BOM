import React from "react";
import {
  UilArrowResizeDiagonal,
  UilArrowDownLeft,
} from "@iconscout/react-unicons";

// components
import Title from "components/atoms/Title.js";
import LiveInfo from "components/atoms/LiveInfo";
import Graph from "components/atoms/Graph";

function BodyInfo({
  part,
  onZoom,
  onOff = false,
  isPC = true,
  liveData,
  data,
  filter,
}) {
  return (
    <>
      {isPC && (
        <div className="patient-body-info w-full h-full bg-white rounded-lg shadow-box ">
          {part === "체온" && (
            <>
              <div className="title-box font-extrabold flex items-start justify-between px-6 py-4 h-1/6">
                <Title
                  iconTag="UilTemperatureHalf"
                  iconTagClassName="text-sub1 inline mr-3"
                  content="체온"
                  contentClassName="text-main text-lg"
                />
                <div className="arrow-box" onClick={onZoom}>
                  {!onOff && (
                    <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer transition ease-in-out delay-150 hover:scale-125 duration-300" />
                  )}
                  {onOff && (
                    <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer transition ease-in-out delay-150 hover:scale-125 duration-300" />
                  )}
                </div>
              </div>
              <div className="content-box grid grid-cols-4 px-3 h-5/6">
                <div className="live-info-box col-span-1 h-full pl-[36px]">
                  <LiveInfo isPC={isPC} value={`${liveData} ℃`} />
                </div>
                <div className="graph-box col-span-3 flex items-center  text-2xs">
                  <Graph part={part} isPC={isPC} data={data} filter={filter} />
                </div>
              </div>
            </>
          )}
          {part === "심박수" && (
            <>
              <div className="title-box font-extrabold flex items-start justify-between px-6 py-4 h-1/6">
                <Title
                  iconTag="UilHeartbeat"
                  iconTagClassName="text-sub1 inline mr-3"
                  content="심박수"
                  contentClassName="text-main text-lg"
                />
                <div className="arrow-box" onClick={onZoom}>
                  {!onOff && (
                    <UilArrowResizeDiagonal className="text-font2 inline h-[16px] transition ease-in-out delay-150 hover:cursor-pointer hover:scale-125 duration-300" />
                  )}
                  {onOff && (
                    <UilArrowDownLeft className="transition ease-in-out delay-150 text-font2 inline h-[20px] hover:cursor-pointer hover:scale-125 duration-300" />
                  )}
                </div>
              </div>
              <div className="content-box grid grid-cols-4 px-3 h-5/6">
                <div className="live-info-box col-span-1 h-full pl-[36px]">
                  <LiveInfo isPC={isPC} value={`${liveData} bpm`} />
                </div>
                <div className="graph-box col-span-3 flex items-center text-2xs">
                  <Graph part={part} isPC={isPC} data={data} filter={filter} />
                </div>
              </div>
            </>
          )}
          {part === "산소포화도" && (
            <>
              <div className="title-box font-extrabold flex items-start justify-between px-6 py-4 h-1/6">
                <Title
                  iconTag="UilPercentage"
                  iconTagClassName="text-sub1 inline mr-3"
                  content="산소포화도"
                  contentClassName="text-main text-lg"
                />
                <div className="arrow-box" onClick={onZoom}>
                  {!onOff && (
                    <UilArrowResizeDiagonal className="text-font2 inline h-[16px] hover:cursor-pointer transition ease-in-out delay-150 hover:scale-125 duration-300" />
                  )}
                  {onOff && (
                    <UilArrowDownLeft className="text-font2 inline h-[20px] hover:cursor-pointer transition ease-in-out delay-150 hover:scale-125 duration-300" />
                  )}
                </div>
              </div>
              <div className="content-box grid grid-cols-4 px-3 h-5/6">
                <div className="live-info-box col-span-1 h-full pl-[36px]">
                  <LiveInfo isPC={isPC} value={`${liveData} %`} />
                </div>
                <div className="graph-box col-span-3 flex items-center text-2xs">
                  <Graph part={part} isPC={isPC} data={data} filter={filter} />
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {!isPC && (
        <div className="patient-body-info w-full h-full bg-white rounded-lg shadow-box pb-5">
          {part === "체온" && (
            <>
              <div className="title-box font-extrabold flex items-start px-5 py-5">
                <Title
                  iconTag="UilTemperatureHalf"
                  iconTagClassName="text-sub1 inline mr-3"
                  content="체온"
                  contentClassName="text-main text-sm"
                />
              </div>
              <div className="content-box">
                <div className="graph-box text-2xs">
                  <Graph part={part} isPC={isPC} data={data} />
                </div>
                <div className="live-info-box px-6">
                  <LiveInfo isPC={isPC} value="36.5 ℃" />
                </div>
              </div>
            </>
          )}
          {part === "심박수" && (
            <>
              <div className="title-box font-extrabold flex items-start px-5 py-5">
                <Title
                  iconTag="UilHeartbeat"
                  iconTagClassName="text-sub1 inline mr-3"
                  content="심박수"
                  contentClassName="text-main text-sm"
                />
              </div>
              <div className="content-box">
                <div className="graph-box text-2xs">
                  <Graph part={part} isPC={isPC} data={data} />
                </div>
                <div className="live-info-box px-6">
                  <LiveInfo isPC={isPC} value="150 bpm" />
                </div>
              </div>
            </>
          )}
          {part === "산소포화도" && (
            <>
              <div className="title-box font-extrabold flex items-start px-5 py-5">
                <Title
                  iconTag="UilPercentage"
                  iconTagClassName="text-sub1 inline mr-3"
                  content="산소포화도"
                  contentClassName="text-main text-sm"
                />
              </div>
              <div className="content-box">
                <div className="graph-box text-2xs">
                  <Graph part={part} isPC={isPC} data={data} />
                </div>
                <div className="live-info-box px-6">
                  <LiveInfo isPC={isPC} value="95 %" />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default BodyInfo;
